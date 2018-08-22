oTech.controller('batchRun',
    function ($scope, $rootScope, $timeout, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, $q, uiGridConstants, $cookieStore, $filter, $templateCache, toastr, messages) {
        var userId = sessionStorage.getItem("userId");
        var token = sessionStorage.getItem("token");
        $scope.name = sessionStorage.getItem("username");
        $rootScope.role = sessionStorage.getItem("role");
        console.log('Role: ' + $rootScope.role)
        $scope.createTestPlan = {};
        $scope.selectedBatchRun = {};
        $scope.selectedTestRun = {};
        $scope.selectedBatchRunForEdit = {};
        $scope.selectedBatchRunDetails = {};
        $scope.selectedBatchRunForEditDetails = {};
        var sendCreateData = {};
        $scope.allTestRuns = {};
        $scope.testRunIdForDelete = "";
        $scope.update_btn = false;
        var TestPlanId = "";
        $templateCache.put('ui-grid/uiGridViewport',
            "<div role=\"rowgroup\" class=\"ui-grid-viewport\" ><!-- tbody --><div class=\"ui-grid-canvas\"><div ng-repeat=\"(rowRenderIndex, row) in rowContainer.renderedRows track by $index\" class=\"ui-grid-row\" ng-style=\"Viewport.rowStyle(rowRenderIndex)\"><div role=\"row\" ui-grid-row=\"row\" row-render-index=\"rowRenderIndex\"></div></div></div></div>"
        );
        var Devices = [];
        var createTestRunDevices = [];
        var realDevices = [];
        var quickRunRealDevices = [];
        var VirtualDevicelist = [];
        var notificationTypes = [];
        $scope.dataProcessing = false;


        $rootScope.slideContent();


        window.onresize = function (event) {
            $rootScope.slideContent();
        }

        /*
         To get dashboard menu data
         */
        $scope.getDashBoardMenu = function () {
            if ($rootScope.menuData == undefined) {
                $rootScope.getMenuData();
            }
        }
        /*
         To get favourite reports
         */
        $scope.getFavouriteReports = function () {
            if ($rootScope.Favourites == undefined) {
                $rootScope.getFavouriteReports();
            }
        }
        $scope.getDashBoardMenu();
        $scope.getFavouriteReports();

        $scope.quickRun = function () {
            $location.path('/dashboard/quickRun');
        }

        $scope.scrollToTestRunDiv = function () {
            // scroll set to test run
            $('html,body').animate({
                    scrollTop: $(".test_runs_div").offset().top
                },
                'slow');
        }


        /*Navigate Between Menus*/

        $scope.navigatememus = function (e) {
            if (e.currentTarget.id == "menu1") {
                $("#plan").addClass("in active");
                $("#Run").removeClass("in active");
            } else {
                $("#plan").removeClass("in active");
                $("#Run").addClass("in active");
            }
        }


        $scope.BatchRunOptions = {
            enableSorting: true,
            paginationPageSizes: [10, 20, 30, 50],
            paginationPageSize: 10,
            enableFilter: true,
            enableColResize: true,
            enableRowSelection: false,
            enableCellEdit: false,// for selection
            enableColumnMenus: false, //to hide ascending and descending column menu names
            enableRowHeaderSelection: false, // this is for check box to appear on grid options
            enableFiltering: false,
            enableGridMenu: false,		// for searching
            multiSelect: false,
            enableScrollbars: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            columnDefs: [
                {name: 'Id', field: 'id', enableCellEdit: false, width: '10%'},
                {
                    name: 'BatchRun Name',
                    field: 'batchRunName',
                    width: '20%',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true,
                    cellTooltip: function (row, col) {
                        return '' + row.entity.batchRunName + '';
                    }
                },
                {
                    name: 'Description',
                    field: 'batchRunDesc',
                    enableCellEdit: false,
                    width: '25%',
                    cellTooltip: function (row, col) {
                        return '' + row.entity.batchRunDesc + '';
                    }
                },
                {name: 'Created Date', field: 'batchRunCreatedTime', enableCellEdit: false, width: '20%'},
                {name: 'Created By', field: 'createdBy', enableCellEdit: false, width: '10%'},
                {
                    name: 'Actions',
                    enableRowSelection: false,
                    enableCellEdit: false,
                    headerCellClass: 'header-grid-cell-button',
                    enableFiltering: false,
                    width: '10%',
                    cellClass: 'ui-grid-cell-button',
                    enableColumnMenu: false,
                    enableSorting: false,
                    cellTemplate: '<ul class="icons-list">' +
                    '<li class="dropdown">' +
                    '<a  class="dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="icon-menu9"></i>' +
                    '</a>' +
                    '<ul class="dropdown-menu dropdown-menu-right">' +
                    '<li ng-click="grid.appScope.viewBatchRun(row)"><a><i class="icon-file-eye2 text-primary"></i> View Batch Run</a></li>' +
                    '<li ng-click="grid.appScope.editBatchRun(row);"><a class="scrollSetToTestRun"><i class="icon-file-text2 text-primary user_editor_link"></i> Edit Batch Run</a></li>' +
                    '<li ng-click="grid.appScope.cloneBatchRun(row);"><a><i class="icon-copy4 text-primary"></i> Clone Batch Plan</a></li>' +
                    '<li ng-click="grid.appScope.startBatchRun(row);"><a class="scrollSetToTestRun"><i class="icon-pen-plus text-primary"></i> Start Batch Run</a></li>' +
                    '<li ng-click="grid.appScope.stopBatchRun(row);"><a class="scrollSetToTestRun"><i class="icon-pen-plus text-primary"></i> Stop Batch Run</a></li>' +
                    '<li ng-click="grid.appScope.delBatchRun(row);"><a><i class="icon-box-remove text-primary"></i> Delete Batch Run</a></li>' +
                    '</ul>' +
                    '</li>' +
                    '</ul>'
                },

            ],

        };

        $scope.BatchRunDetailsOptions = {
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            enableRowSelection: false,
            enableCellEdit: false,// for selection
            enableColumnMenus: false, //to hide ascending and descending column menu names
            enableRowHeaderSelection: false, // this is for check box to appear on grid options
            enableFiltering: false,
            enableGridMenu: false,		// for searching
            multiSelect: false,
            enableScrollbars: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            columnDefs: [
                {
                    name: 'Id',
                    field: 'jobId', enableCellEdit: false, width: '10%',
                    cellTooltip: function (row, col) {
                        return '' + row.entity.jobId + '';
                    }
                },
                {
                    name: 'TestRunName',
                    field: 'jobName',
                    width: '20%',
                    enableCellEdit: false,
                    enableCellEditOnFocus: true,
                    cellTooltip: function (row, col) {
                        return '' + row.entity.jobName + '';
                    }
                },
                {
                    name: 'Devices',
                    field: 'deviceList.toString()',
                    enableCellEdit: false,
                    width: '20%',
                    cellTooltip: function (row, col) {
                        return '' + row.entity.deviceList.toString() + '';
                    }
                },
                {
                    name: 'Start Time', field: 'jobStartDateTime', enableCellEdit: false, width: '20%',
                    cellTooltip: function (row, col) {
                        return '' + row.entity.jobStartDateTime + '';
                    }
                },
                {
                    name: 'End Time', field: 'jobEndDateTime', enableCellEdit: false,
                    cellTooltip: function (row, col) {
                        return '' + row.entity.jobEndDateTime + '';
                    },
                    width: '20%'
                },
                {
                    name: 'Status',
                    field: 'status',
                    cellTooltip: function (row, col) {
                        return '' + row.entity.status + '';
                    },
                    enableCellEdit: false,
                    width: '10%'
                },
            ],

        };

        $scope.BatchRunDetailsEditOptions = {
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            enableRowSelection: false,
            //enableCellEdit: false,// for selection
            enableColumnMenus: false, //to hide ascending and descending column menu names
            enableRowHeaderSelection: false, // this is for check box to appear on grid options
            enableFiltering: false,
            enableGridMenu: false,		// for searching
            multiSelect: false,
            enableScrollbars: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            columnDefs: [
                {
                    name: 'TestPlan Id', field: 'jobId', enableCellEdit: true, width: '8%',
                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    editDropdownOptionsArray: $scope.allTestRuns,
                    editDropdownIdLabel: 'testrunId',
                    editDropdownValueLabel: 'testrunId'
                },
                {
                    name: 'TestRunName',
                    field: 'jobName',
                    width: '30%',
                    enableCellEdit: false,
                    enableCellEditOnFocus: true,
                    cellTooltip: function (row, col) {
                        return '' + row.entity.jobName + '';
                    }
                },
                {
                    name: 'Devices',
                    field: 'deviceList.toString()',
                    enableCellEdit: false,
                    width: '18%',
                    cellTooltip: function (row, col) {
                        return '' + row.entity.deviceList.toString() + '';
                    }
                },
                {
                    name: 'Start Time',
                    field: 'jobStartDateTime',
                    cellFilter: 'date:"yyyy-MM-dd hh:mm:ss"',
                    enableCellEdit: true,
                    width: '15%'
                },
                {
                    width: '15%',
                    name: 'End Date',
                    cellFilter: 'date:"yyyy-MM-dd hh:mm:ss"',
                    field: 'jobEndDateTime',
                    enableCellEdit: false,
                },
                {
                    name: 'Status', field: 'status', width: '8%', enableCellEdit: true,
                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    editDropdownOptionsArray: [
                        {id: 'Enabled', status: 'Enabled'},
                        {id: 'Disabled', status: 'Disabled'}
                    ],
                    editDropdownIdLabel: 'id',
                    editDropdownValueLabel: 'status'
                },
                {
                    name: 'Actions',
                    enableRowSelection: false,
                    enableCellEdit: false,
                    headerCellClass: 'header-grid-cell-button',
                    enableFiltering: false,
                    width: '6%',
                    cellClass: 'ui-grid-cell-button',
                    enableColumnMenu: false,
                    enableSorting: false,
                    cellTemplate: '<ul class="icons-list">' +
                    '<li class="dropdown">' +
                    '<a  class="dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="icon-menu9"></i>' +
                    '</a>' +
                    '<ul class="dropdown-menu dropdown-menu-right">' +
                    '<li ng-click="grid.appScope.editTestRunStartTime(row);"><a ><i class="icon-file-text2 text-primary user_editor_link"></i> Edit StartTime</a></li>' +
                    '<li ng-click="grid.appScope.removeTestRunFromBatchRun(row);"><a ><i class="icon-box-remove text-primary user_editor_link"></i>Delete TestRun</a></li>' +
                    '</ul>' +
                    '</li>' +
                    '</ul>'
                },
            ],

        };

        $scope.BatchRunDetailsEditOptions.onRegisterApi = function (gridApi) {

            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                var isActive = rowEntity.active;
                var batchRunId = $scope.selectedBatchRunForEdit.id;
                var oldValue = oldValue;
                var newValue = newValue;
                console.log("Row Entity ::" + JSON.stringify(rowEntity));
                console.log("ColDef ::" + JSON.stringify(colDef));
                console.log("BatchRunId ::" + JSON.stringify(batchRunId));
                if (colDef.field == "jobStartDateTime") {
                    var testRunId = rowEntity.jobId;
                    var startDateTime = newValue;
                    promise = testScriptService.editTestRunStartTime(token, userId, batchRunId,testRunId,startDateTime);
                    promise.then(
                        function (data) {
                            console.log(JSON.stringify(data));
                            rowEntity.jobEndDateTime = data;
                            toastr.success('TestRun StartTime Updated', 'Success')
                        },
                        function (err) {
                            console.log(err);
                            toastr.error('Something , try again!', 'Error')
                            rowEntity[colDef.name] = oldValue;
                        }
                    );
                } else {
                    promise = testScriptService.replaceTestRunFromBatchRun(token, userId, batchRunId, oldValue, newValue, isActive);
                    promise.then(
                        function (data) {
                            console.log(JSON.stringify(data));
                            toastr.success('TestRun Changed', 'Success')
                        },
                        function (err) {
                            console.log(err);
                            toastr.error('Something , try again!', 'Error')
                            rowEntity[colDef.name] = oldValue;
                        }
                    );
                }
                $scope.$apply();
            });
        };
        $scope.BatchRunOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.edit.on.afterCellEdit($scope, $scope.saveRow, this);
        };
        $scope.saveRow = function (rowEntity) {
            $scope.dataProcessingTestPlan = true;
            promise = testScriptService.updateTestPlanTestRunName(token, rowEntity.testplanId, rowEntity.testplanName);
            promise.then(
                function (data) {
                    if (data.status == "success") {
                        $scope.dataProcessingTestPlan = false;
                        $scope.testPlanName = true;
                        $rootScope.testPlanNameMsg = "Successfully updated!!!";
                        $timeout(function () {
                            $scope.testPlanName = false;
                        }, 3000);
                    }
                    else {
                        $scope.dataProcessingTestPlan = false;
                        $scope.errorMsg = true;
                        $rootScope.Message = "Error Occured!!!";
                        $timeout(function () {
                            $scope.errorMsg = false;
                        }, 3000);
                    }
                    //		$scope.deviceAdminData();
                },
                function (err) {
                    $scope.dataProcessingTestPlan = false;
                    $scope.errorMsg = true;
                    $rootScope.Message = "Error Occured!!!";
                    $timeout(function () {
                        $scope.errorMsg = false;
                    }, 3000);
                }
            );
        };


        //Test plan table Service
        promise = testScriptService.getAllBatchRuns(token, userId);
        promise.then(
            function (data) {
                data = data.batchRunsForTestPlan;
                console.log(data);
                $scope.totalRecords = data.length;
                allOfTheData = data;
                $scope.BatchRunOptions.data = data;
            },
            function (err) {
                console.log(err);
            }
        );

        $scope.refreshBatchRuns = function () {
            //Test plan table Service
            promise = testScriptService.getAllBatchRuns(token, userId);
            promise.then(
                function (data) {
                    data = data.batchRunsForTestPlan;
                    console.log(data);
                    $scope.totalRecords = data.length;
                    allOfTheData = data;
                    $scope.BatchRunOptions.data = data;
                },
                function (err) {
                    console.log(err);
                }
            );
        }


        $scope.getTableHeight = function () {
            var rowHeight = 40; // your row height
            var headerHeight = 44; // your header height
            var footerPage = 15;
            var gridHeight = 0;
            var dataCount = 10;
            gridHeight = (10 * rowHeight + headerHeight + footerPage);
            //$(".ui-grid-viewport").css("height",gridHeight-headerHeight);
            //$(".")
            return {
                height: gridHeight + "px"
            };
        };


        $scope.createNewDatasource = function () {
            $scope.BatchRunOptions.data = allOfTheData;
        }

        $scope.singleFilter = function () {
            $scope.BatchRunOptions.data = $filter('filter')(allOfTheData, $scope.searchText, undefined);

        };


        /* pagination code  start ****************/

        var startLimit = 1;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 0;
        $scope.endLimit = $scope.itemsPerPage;
        var allOfTheData;
        $scope.totalRecords = 0;


        $scope.range = function () {
            var rangeSize = 4;
            var ps = [];
            var start;

            start = $scope.currentPage;
            if (start > $scope.pageCount() - rangeSize) {
                start = $scope.pageCount() - rangeSize + 1;
            }

            for (var i = start; i < start + rangeSize; i++) {
                if (i >= 0)
                    ps.push(i);
            }
            return ps;
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.setPagePrev($scope.currentPage - 1);
                //$scope.currentPage--;
            }
        };

        $scope.DisablePrevPage = function () {
            return $scope.currentPage == 0 ? "disabled" : "";
        };

        $scope.pageCount = function () {
            return Math.ceil($scope.totalRecords / $scope.itemsPerPage) - 1;
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pageCount()) {
                $scope.setPageNext($scope.currentPage + 1);
                //$scope.currentPage++;
            }
        };

        $scope.DisableNextPage = function () {
            return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
        };

        $scope.setPage = function (n) {
            $scope.dataLoading = true;
            $scope.endLimit = ($scope.itemsPerPage * (n + 1));
            if ($scope.endLimit > $scope.totalRecords) {
                var reminder = $scope.totalRecords % $scope.itemsPerPage;
                if (reminder > 0) {
                    $scope.endLimit = $scope.endLimit - ($scope.itemsPerPage - reminder);
                }
            }

            startLimit = ($scope.itemsPerPage * n);
            $scope.createNewDatasource();
            $scope.currentPage = n;
        };

        $scope.setPagePrev = function (n) {
            $scope.dataLoading = true;
            $scope.endLimit = ($scope.itemsPerPage * (n + 1));
            if ($scope.endLimit > $scope.totalRecords) {
                var reminder = $scope.totalRecords % $scope.itemsPerPage;
                if (reminder > 0) {
                    $scope.endLimit = $scope.endLimit - ($scope.itemsPerPage - reminder);
                }
            }

            startLimit = ($scope.itemsPerPage * n);
            $scope.createNewDatasource();
            $scope.currentPage = n;
        };
        $scope.setPageNext = function (n) {
            $scope.dataLoading = true;
            $scope.endLimit = ($scope.itemsPerPage * (n + 1));
            if ($scope.endLimit > $scope.totalRecords) {
                var reminder = $scope.totalRecords % $scope.itemsPerPage;
                if (reminder > 0) {
                    $scope.endLimit = $scope.endLimit - ($scope.itemsPerPage - reminder);
                }
            }
            startLimit = ($scope.itemsPerPage * (n));
            $scope.createNewDatasource();
            $scope.currentPage = n;
        };


        $scope.addTestRunInBatchRun = function (testRunId) {
            var batchRunId = $scope.selectedBatchRun.id;
            $('#add_test_run').modal('toggle');
            promise = testScriptService.addTestRunToBatchRun(token, userId, batchRunId, testRunId);
            promise.then(
                function (data) {
                    console.log(JSON.stringify(data));
                    var batchRun = $scope.selectedBatchRun;
                    batchRun.testRuns.push({"testrunId": testRunId})
                    var row = {entity: batchRun}
                    $scope.editBatchRun(row);
                    $scope.refreshBatchRuns();
                    toastr.success('TestRun Changed', 'Success')
                },
                function (err) {
                    console.log(err);
                    toastr.error('Something Wrong , try again!', 'Error')
                }
            );

        }

        $scope.removeTestRunFromBatchRun = function (row) {
            var batchRunId = $scope.selectedBatchRun.id;
            var testRunId = row.entity.jobId;
            promise = testScriptService.removeTestRunFromBatchRun(token, userId, batchRunId, testRunId);
            promise.then(
                function (data) {
                    console.log(JSON.stringify(data));
                    var index = $scope.BatchRunDetailsEditOptions.data.indexOf(row.entity);
                    $scope.BatchRunDetailsEditOptions.data.splice(index, 1);
                    toastr.success('TestRun Removed', 'Success')
                },
                function (err) {
                    console.log(err);
                    toastr.error('Something Wrong , try again!', 'Error')
                }
            );
        }


        /* pagination code  end ***********************/

        promise = testScriptService.getAllTestRunsForSchedule(token, userId);
        promise.then(
            function (data) {
                $scope.allTestRuns = data.testRunsForTestPlan.slice(0, 100);
            },
            function (err) {
                console.log(err);
            }
        );


        /* view batch run */
        $scope.viewBatchRun = function (row) {
            var testRunsObj = row.entity.testRuns;
            var testRuns = [];
            angular.forEach(testRunsObj, function (value, key) {
                testRuns.push(value.testrunId)
            });
            if (testRuns.length == 0) {
                toastr.error('No test run exists for this batch run', 'Error')
                return;
            }

            $scope.testPlanView = true;
            $scope.dataLoadingForTestRunDetailsView = true;
            $scope.testPlanViewDetails = [];
            $scope.selectedBatchRun = row.entity;
            console.log(JSON.stringify(testRuns));
            promise = testScriptService.getTestRunsDetails(token, userId, $scope.selectedBatchRun.id, testRuns);
            promise.then(
                function (data) {
                    console.log(data);
                    $scope.selectedBatchRunDetails = data;
                    $scope.dataLoadingForTestRunDetailsView = false;
                    $scope.BatchRunDetailsOptions.data = data.batchRunsList;

                },
                function (err) {
                    console.log(err);
                }
            );
        }

        /* clone batch run */
        $scope.cloneBatchRun = function (row) {
            console.log("Inside CloneBatchRun");
            var batchRunObj = row.entity;
            $scope.dataProcessingBatchRun = true;
            promise = testScriptService.cloneBatchRun(token, userId, batchRunObj.id);
            promise.then(
                function (data) {
                    console.log(data);
                    $scope.dataProcessingBatchRun = false;
                    $scope.BatchRunOptions.data.unshift(data.batchRun);

                },
                function (err) {
                    console.log(err);
                    $scope.dataProcessingBatchRun = false;
                }
            );
        }

        /* start batch run */
        $scope.startBatchRun = function (row) {
            console.log("Inside StartBatchRun");
            var batchRunObj = row.entity;
            $scope.dataProcessingBatchRun = true;
            promise = testScriptService.startBatchRun(token, userId, batchRunObj.id);
            promise.then(
                function (data) {
                    console.log(data);
                    $scope.dataProcessingBatchRun = false;
                    if (data.batchRunStarted) {
                        toastr.success('Test Run Started', 'Success');
                        if (batchRunObj.id == $scope.selectedBatchRun.id) {
                            $scope.selectedBatchRun.executionStatus = 1;
                        }
                    } else {
                        toastr.error('Unable to stop Stoped', 'Error');
                    }

                },
                function (err) {
                    console.log(err);
                    $scope.dataProcessingBatchRun = false;
                }
            );
        }

        /* stop batch run */
        $scope.stopBatchRun = function (row) {
            console.log("Inside StopBatchRun");
            var batchRunObj = row.entity;
            $scope.dataProcessingBatchRun = true;
            promise = testScriptService.stopBatchRun(token, userId, batchRunObj.id);
            promise.then(
                function (data) {
                    console.log(data);
                    $scope.dataProcessingBatchRun = false;
                    if (data.batchRunStoped) {
                        toastr.success('Test Run Stoped', 'Success');
                        if (batchRunObj.id == $scope.selectedBatchRun.id) {
                            $scope.selectedBatchRun.executionStatus = 0;
                        }
                    } else {
                        toastr.error('Unable to stop TestRun', 'Error');
                    }

                },
                function (err) {
                    console.log(err);
                    $scope.dataProcessingBatchRun = false;
                }
            );
        }


        /* delete batch run */
        $scope.delBatchRun = function (row) {
            console.log("Inside DelBatchRun");
            var batchRunObj = row.entity;
            $scope.dataProcessingBatchRun = true;
            promise = testScriptService.delBatchRun(token, userId, batchRunObj.id);
            promise.then(
                function (data) {
                    console.log(data);
                    $scope.dataProcessingBatchRun = false;
                    if (data.batchRunDeleted) {
                        toastr.success('BatchRun Deleted', 'Success');
                        var index = $scope.BatchRunOptions.data.indexOf(row.entity);
                        allOfTheData.splice(index, 1);
                        $scope.BatchRunOptions.data = allOfTheData;
                    } else {
                        toastr.error('Unable to delete batchRun', 'Error');
                    }

                },
                function (err) {
                    console.log(err);
                    $scope.dataProcessingBatchRun = false;
                }
            );
        }

        /* view test plan */
        $scope.editBatchRun = function (row) {
            var testRunsObj = row.entity.testRuns;
            var testRuns = [];
            angular.forEach(testRunsObj, function (value, key) {
                testRuns.push(value.testrunId)
            });
            /*if (testRuns.length == 0) {
                toastr.error('No test run exists for this batch run', 'Error')
                return;
            }*/
            $scope.testRunEditView = true;
            $scope.selectedBatchRun = row.entity;
            console.log("editbatch plan method :: " + $scope.selectedBatchRun);
            $scope.dataLoadingForTestRunDetailsForEditView = true;
            $scope.selectedBatchRunForEdit = row.entity;
            console.log(JSON.stringify(testRuns));
            promise = testScriptService.getTestRunsDetails(token, userId, $scope.selectedBatchRun.id, testRuns);
            promise.then(
                function (data) {
                    console.log(data);
                    if (data.status === "No TestRunDetails Exists") {
                        console.log("No TestRunDetails Exists");
                        $scope.selectedBatchRunForEditDetails = {};
                        $scope.BatchRunDetailsEditOptions.data = [];
                    } else {
                        $scope.selectedBatchRunForEditDetails = data;
                        $scope.BatchRunDetailsEditOptions.data = data.batchRunsList;
                    }
                    $scope.dataLoadingForTestRunDetailsForEditView = false;
                    $scope.BatchRunDetailsEditOptions.columnDefs[0].editDropdownOptionsArray = $scope.allTestRuns;

                },
                function (err) {
                    console.log(err);
                }
            );
        }


    }
);

	
		
		
    

