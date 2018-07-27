oTech.controller('testPlanTestRunAdministration',
    function ($scope, $rootScope, $timeout, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, $q, uiGridConstants, $cookieStore, $filter, $templateCache, toastr, messages) {
        var userId = sessionStorage.getItem("userId");
        var token = sessionStorage.getItem("token");
        $scope.name = sessionStorage.getItem("username");
        $rootScope.role = sessionStorage.getItem("role");
        console.log('Role: ' + $rootScope.role)
        $scope.createTestPlan = {};
        var sendCreateData = {};
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
        var selectedRowsOfTestPlan = []

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


        $scope.TestPlanOptions = {
            paginationPageSizes: [10,20,30,50],
            paginationPageSize: 10,
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
                {name: 'Id', field: 'testplanId', enableCellEdit: false, width: '10%'},
                {
                    name: 'Name',
                    field: 'testplanName',
                    width: '25%',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true,
                    cellTooltip: function (row, col) {
                        return '' + row.entity.testplanName + '';
                    }
                },
                {
                    name: 'Use Case',
                    field: 'useCaseName',
                    enableCellEdit: false,
                    width: '20%',
                    cellTooltip: function (row, col) {
                        return '' + row.entity.useCaseName + '';
                    }
                },
                {name: 'Created Date', field: 'createdDate', enableCellEdit: false, width: '20%'},
                {name: 'Created By', field: 'createdByName', enableCellEdit: false, width: '10%'},
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
                    '<li ng-click="grid.appScope.viewTestPlan(row)"><a><i class="icon-file-eye2 text-primary"></i> View Test Plan</a></li>' +
                    '<li ng-if="row.entity.isExitTestRuns == 1" ng-click="grid.appScope.viewTestRuns(row)"><a   class="scrollSetToTestRun"><i class="icon-file-stats text-primary"></i> View Test Runs</a></li>' +
                    '<li ng-if="row.entity.isExitTestRuns == 0 || row.entity.isExistOneTestRun == 1" ng-click="grid.appScope.editTestPlan(row);"><a  class="scrollSetToTestRun"><i class="icon-file-text2 text-primary user_editor_link"></i> Edit Test Plan</a></li>' +
                    '<li ng-if="row.entity.isExitTestRuns == 1" ng-click="grid.appScope.addDeviceProfileToTestPlan(row)"><a   class="scrollSetToTestRun"><i class="icon-file-stats text-primary"></i> Add Device Profile</a></li>' +
                    '<li ng-click="grid.appScope.createTestRun(row);"><a class="scrollSetToTestRun"><i class="icon-pen-plus text-primary"></i> Create Test Run</a></li>' +
                    '<li ng-click="grid.appScope.clone(row);"><a><i class="icon-copy4 text-primary"></i> Clone Test Plan</a></li>' +
                    '<li ng-click="grid.appScope.copyTestPlan(row);"><a><i class="icon-copy4 text-primary"></i> Copy Test Plan</a></li>' +
                    '<li ng-if="row.entity.isExitTestRuns == 0" ng-click="grid.appScope.delTestPlan(row);"><a><i class="icon-box-remove text-primary"></i> Delete Test Plan</a></li>' +
                    '</ul>' +
                    '</li>' +
                    '</ul>'
                },

            ],

        };

        $scope.TestPlanOptions.onRegisterApi = function (gridApi) {
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


        $scope.TestPlanQuickRun = {
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            enableRowSelection: true,  // for selection
            enableColumnMenus: false, //to hide ascending and descending column menu names
            enableRowHeaderSelection: false, // this is for check box to appear on grid options
            enableFiltering: false,
            enableGridMenu: false,		// for searching
            multiSelect: false,
            enableScrollbars: true,
            enableVerticalScrollbar: 3,
            enableHorizontalScrollbar: 0,
            columnDefs: [
                {name: 'Id', field: 'testplanId', width: '10%'},
                {
                    name: 'Name', field: 'testplanName', width: '30%', cellTooltip: function (row, col) {
                        return '' + row.entity.testplanName + '';
                    }
                },
                {
                    name: 'Use Case', field: 'useCaseName', width: '20%', cellTooltip: function (row, col) {
                        return '' + row.entity.useCaseName + '';
                    }
                },
                /*{name:'Created Date',field: 'createdDate', width: '20%'},*/
                {name: 'Created By', field: 'createdByName', width: '20%'},
                {
                    name: 'Actions',
                    enableRowSelection: false,
                    enableCellEdit: false,
                    headerCellClass: 'header-grid-cell-button',
                    enableFiltering: false,
                    width: '20%',
                    cellClass: 'ui-grid-cell-button',
                    enableColumnMenu: false,
                    enableSorting: false,
                    cellTemplate: '<ul class="icons-list">' +
                    '<li class="dropdown">' +
                    '<a  class="dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="icon-menu9"></i>' +
                    '</a>' +
                    '<ul class="dropdown-menu dropdown-menu-right">' +
                    '<li ><a  ng-click="grid.appScope.viewTestPlanForQuickRun(row);" data-toggle="modal" data-target="#TestPlanQuickView"><i class="icon-file-eye2 text-primary"></i> View Test Plan Info</a></li>' +
                    '</ul>' +
                    '</li>' +
                    '</ul>'
                },


            ]
        };

        // view test plan View

        $scope.viewTestPlanForQuickRun = function (row) {
            $scope.dataLoadingForQuickArea = true;
            $scope.testPlanView = [];
            promise = testScriptService.getTestplan(token, userId, row.entity.testplanId);
            promise.then(
                function (data) {
                    $scope.testPlanView = data.jobVO[0].nodes;
                    $scope.dataLoadingForQuickArea = false;
                },
                function (err) {
                    $scope.dataLoadingForQuickArea = false;
                    console.log(err);
                }
            );
        }

        //Row selection
        $scope.TestPlanQuickRun.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                List = [];
                $scope.msg = "";
                $scope.errorMsgForDevice = false;
                //Get devices service
                if (row.isSelected) {
                    // load test plan
                    promise = testScriptService.getTestplanForQuickRun(token, userId, row.entity.testplanId);
                    promise.then(
                        function (data) {
                            quickRunRealDevices = [];
                            $scope.quickTestPlanId = data.jobVO[0].jobId;
                            $scope.quickDeviceProfileId = data.jobVO[0].jobDeviceId;
                            $scope.quickRunDeviceId = data.jobVO[0].deviceId;
                        },
                        function (err) {
                            $scope.dataProcessingForEditTestPlan = false;
                            console.log(err);
                        }
                    );
                    // loaded test plan
                } else {
                    $scope.quickTestPlanId = "";
                    $scope.quickDeviceProfileId = "";
                    $scope.quickRunDeviceId = "";
                }


            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                var msg = 'rows changed ' + rows.length;

            });
        };

        //Test plan table Service
        promise = testScriptService.FetchingTestService(userId, token);
        promise.then(
            function (data) {
                console.log(data);
                $scope.totalRecords = data.length;
                allOfTheData = data;
                $scope.TestPlanOptions.data = data;

            },
            function (err) {
                console.log(err);
            }
        );

        //Test plan table Service
        promise = testScriptService.FetchingTestPlanTemplateService(userId, token);
        promise.then(
            function (data) {
                $scope.allOfTheDataForQuickRun = data;
                $scope.TestPlanQuickRun.data = data;
            },
            function (err) {
                console.log(err);
            }
        );


        $scope.getTableHeight = function () {
            var rowHeight = 40; // your row height
            var headerHeight = 44; // your header height
            var footerPage = 15;
            var gridHeight = 0;
            var dataCount = 10;
            gridHeight = ($scope.TestPlanOptions.data.length * rowHeight + headerHeight + footerPage);
            //$(".ui-grid-viewport").css("height",gridHeight-headerHeight);
            //$(".")
            return {
                height: gridHeight + "px"
            };
        };


        $scope.createNewDatasource = function () {
            $scope.TestPlanOptions.data = allOfTheData.slice(startLimit, $scope.endLimit);
        }

        $scope.singleFilter = function () {
            $scope.TestPlanOptions.data = $filter('filter')(allOfTheData, $scope.searchText, undefined);
            //$scope.TestPlanOptions.data = $scope.TestPlanOptions.data.slice(0, $scope.endLimit);

        };

        $scope.singleFilterQuickRun = function () {
            $scope.TestPlanQuickRun.data = $filter('filter')($scope.allOfTheDataForQuickRun, $scope.searchTextQuick, undefined);
            //$scope.TestPlanQuickRun.data = $scope.TestPlanQuickRun.data.slice( 0, $scope.endLimit);

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


        /* pagination code  end ***********************/


        $scope.viewTestPlanTestRun = function (TestPlanId) {
            $scope.isAction = true;
        }

        $scope.refreshTestRuns = function () {
            console.log("Inside refresh test runs");
            if ($scope.currentTestPlanRow != -1) {
                $scope.viewTestRuns($scope.currentTestPlanRow);
            }
        }

        $scope.refreshAllTestRuns = function(){
            console.log("Refresh All test runs");
            promise = testScriptService.getAllTestRunsForSchedule(token, userId);
            promise.then(
                function (data) {
                    $scope.loadAllTestRuns = false;
                    $scope.hideFilter = true;
                    $scope.allTestRuns.data = [];
                    $scope.allTestRunsTemp = data.testRunsForTestPlan
                    $scope.allTestRuns.data = $scope.allTestRunsTemp;
                    $scope.searchTestRuns = $scope.allTestRunsTemp;
                },
                function (err) {
                    console.log(err);
                }
            );
        }

        $scope.refreshTestRunMappedDevice = function(){
            console.log("Refresh TestRunMappedDevice");
            $scope.dataProcessingOfAllTestRuns = true;
            promise = testScriptService.ViewTestRunDeviceService(userId, token,$rootScope.jobId);
            promise.then(
                function (data) {
                    $scope.dataProcessingOfAllTestRuns = false;
                    $scope.testRunMappedDevices.data = data.testRunDeviceData;
                    $scope.searchTestRunMappedDevices = data.testRunDeviceData
                    /*$timeout(function () {
                     $scope.refreshCallForJobProgress(userId, token, testrunID);
                     }, 3000);*/
                },
                function (err) {
                    console.log(err);
                    $scope.dataProcessingOfAllTestRuns = false;
                }
            );
        }

        $scope.currentTestPlanRow = -1;
        $scope.viewTestRuns = function (row) {
            $scope.currentTestPlanRow = row;
            promise = testScriptService.getTestRuns(token, row.entity.testplanId, userId);
            promise.then(
                function (data) {
                    console.log(JSON.stringify(data));
                    if (data.status == 'No TestRun Exists' || data.testRunsForTestPlan.length == 0) {
                        $scope.errorMsg = true;
                        $scope.Message = "No Test Run Exists..";
                        $timeout(function () {
                            $scope.errorMsg = false;
                        }, 3000);
                        return false;
                    } else {

                        $scope.mainTab = 3;
                        $scope.loadAllTestRuns = true;
                        $scope.hideFilter = false;
                        $scope.testRunMappedDevices.data = [];
                        // scroll set to test run
                        $('html,body').animate({
                                scrollTop: $(".test_runs_div").offset().top
                            },
                            'slow');
                        $scope.allTestRunsTemp = $scope.allTestRuns.data;
                        $scope.testRunMappedDevices.data = [];
                        $scope.searchTestRunMappedDevices = [];
                        $scope.allTestRuns.data = [];
                        $scope.allTestRuns.data = data.testRunsForTestPlan;


                    }

                },
                function (err) {
                    console.log(err);
                }
            );
        }

        $scope.copyTestPlan = function (row) {

            $scope.dataProcessingTestPlan = true;
            promise = testScriptService.createCopyTestplan(token, userId, row.entity.testplanId);
            promise.then(
                function (data) {

                    $scope.shareData = [];
                    $scope.shareData.push({'key': 'treeJson', 'value': data.CopiedTestPlan.taskVOList});
                    $scope.shareData.push({'key': 'testPlanName', 'value': data.CopiedTestPlan.jobName});
                    $scope.shareData.push({'key': 'testPlanDescription', 'value': data.CopiedTestPlan.jobDescription});
                    $scope.shareData.push({'key': 'usecaseId', 'value': data.CopiedTestPlan.useCaseId});
                    $scope.shareData.push({'key': 'useCaseName', 'value': data.CopiedTestPlan.useCaseName});

                    if (messages.length == 1) {
                        messages.splice(0, 1);
                    }

                    messages.add($scope.shareData);

                    $location.path('/dashboard/copyTestPlan');
                    $scope.dataProcessingTestPlan = false;
                },
                function (err) {
                    console.log(err);
                }
            );

        }

        $scope.clone = function (row) {
            $scope.dataProcessingTestPlan = true;
            promise = testScriptService.createCloneTestplan(token, userId, row.entity.testplanId);
            promise.then(
                function (data) {
                    $scope.totalRecords = data.length;
                    allOfTheData = data;
                    $scope.TestPlanOptions.data = [];
                    $scope.TestPlanOptions.data = data.slice(0, $scope.itemsPerPage);
                    $scope.dataProcessingTestPlan = false;
                },
                function (err) {
                    console.log(err);
                }
            );

        }


        $scope.mainTab = 1;

        $scope.setTab = function (newTab) {
            $scope.mainTab = newTab;
        };

        $scope.isSet = function (tabNum) {
            return $scope.mainTab === tabNum;
        };

        /* test Run code started***/

        $scope.allTestRuns = {
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            enableRowSelection: true,  // for selection
            enableColumnMenus: false, //to hide ascending and descending column menu names
            enableRowHeaderSelection: false, // this is for check box to appear on grid options
            enableFiltering: false,
            enableGridMenu: false,		// for searching
            multiSelect: false,
            enableScrollbars: false,
            enableVerticalScrollbar: 3,
            enableHorizontalScrollbar: 0,
            columnDefs: [
                {
                    field: 'testrunId',
                    name: 'Test Run Id',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: '15%'
                },
                {
                    field: 'testrunName',
                    name: 'Test Run Name',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: '20%',
                    cellTooltip: function (row, col) {
                        return '' + row.entity.testrunName + '';
                    }
                },
                {
                    field: 'testPlanId',
                    name: 'Test Plan Id',
                    headerCellClass: $scope.highlightFilteredHeader
                    , width: '15%'
                },
                {
                    field: 'testPlanName',
                    name: 'Test Plan Name',
                    headerCellClass: $scope.highlightFilteredHeader, width: '15%'
                    , cellTooltip: function (row, col) {
                        return '' + row.entity.testPlanName + '';
                    }
                },
                {
                    field: 'testrunUserName',
                    name: 'User',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: '15%'
                },
                {
                    field: 'testrunCreatedDate', width: '15%',
                    name: 'Created On',
                    headerCellClass: $scope.highlightFilteredHeader
                },
            ]
        };


        promise = testScriptService.getAllTestRunsForSchedule(token, userId);
        promise.then(
            function (data) {
                $scope.loadAllTestRuns = false;
                $scope.hideFilter = true;
                $scope.allTestRuns.data = [];
                $scope.allTestRunsTemp = data.testRunsForTestPlan
                $scope.allTestRuns.data = $scope.allTestRunsTemp;
                $scope.searchTestRuns = $scope.allTestRunsTemp;
            },
            function (err) {
                console.log(err);
            }
        );

        $scope.viewAllTestRuns = function () {
            $scope.testRunMappedDevices.data = [];
            $scope.loadAllTestRuns = false;
            $scope.hideFilter = true;
            $scope.allTestRuns.data = [];
            $scope.allTestRuns.data = $scope.allTestRunsTemp;
            $scope.searchTestRuns = $scope.allTestRunsTemp;
        }

        $scope.singleFilterForTestRuns = function () {
            $scope.allTestRuns.data = $filter('filter')($scope.searchTestRuns, $scope.searchTextForTestRuns, undefined);
        };

        $scope.allTestRuns.onRegisterApi = function (gridApi) {

            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                Devices = [];
                notificationTypes = [];
                $scope.deleteTestRun = true;
                $scope.jobName = row.entity.testrunName;
                //Get devices service
                if (row.isSelected) {
                    if ($('#scheduleparam').css('display') != 'none')
                        $('#scheduleparam').toggle();
                    $scope.dataProcessingOfAllTestRuns = true;
                    $rootScope.jobId = row.entity.testrunId;
                    $scope.testRunIdForDelete = row.entity.testrunId;
                    promise = testScriptService.ViewTestRunDeviceService(userId, token, row.entity.testrunId);
                    promise.then(
                        function (data) {
                            $scope.dataProcessingOfAllTestRuns = false;
                            $scope.testRunMappedDevices.data = data.testRunDeviceData;
                            $scope.searchTestRunMappedDevices = data.testRunDeviceData
                            /*$timeout(function () {
                             $scope.refreshCallForJobProgress(userId, token, testrunID);
                             }, 3000);*/
                        },
                        function (err) {
                            console.log(err);
                        }
                    );
                } else {
                    $rootScope.jobId = "";
                    $scope.testRunIdForDelete = "";
                    $scope.testRunMappedDevices.data = [];
                    $scope.searchTestRunMappedDevices = [];
                }
            });

            $scope.testRunMappedDevices.onRegisterApi = function (gridApi) {
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $rootScope.jobId = row.entity.jobId;
                    $scope.testRunIdShcedule = row.entity.jobId;
                    if (row.isSelected) {
                        Devices.push(row.entity.deviceId);
                        notificationTypes.push(row.entity.notificationType);
                    } else {
                        for (var i = 0; i < Devices.length; i++) {
                            if (Devices[i] == row.entity.deviceId) {
                                Devices.splice(i, 1);
                                notificationTypes.splice(i, 1);
                            }
                        }
                    }
                    if (Devices.length > 0 && ($('#scheduleparam').css('display') === 'none')) {
                        $('#scheduleparam').toggle();
                        return;
                    }
                    if (Devices.length == 0)
                        $('#scheduleparam').toggle();
                });

                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                });
            };
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
        };

        // delete test run
        $scope.deActivateTestRun = function () {
            if ($scope.testRunIdForDelete != "" && $scope.testRunIdForDelete != undefined) {
                promise = testScriptService.deActivateTestRun(token, $scope.testRunIdForDelete);
                promise.then(
                    function (data) {
                        if (data.status == "success") {

                            $scope.deleteMsg = true;
                            $rootScope.testPlanDeleteMsgSucc = "Successfully Deleted !!!";
                            $timeout(function () {
                                $scope.deleteMsg = false;
                            }, 3000);
                            $scope.allTestRuns.data = [];
                            $scope.deleteTestRun = false;
                            promise = testScriptService.getAllTestRunsForSchedule(token, userId);
                            promise.then(
                                function (data) {
                                    $scope.loadAllTestRuns = false;
                                    $scope.hideFilter = true;
                                    $scope.allTestRuns.data = [];
                                    $scope.allTestRunsTemp = data.testRunsForTestPlan
                                    $scope.allTestRuns.data = $scope.allTestRunsTemp;
                                    $scope.searchTestRuns = $scope.allTestRunsTemp;
                                },
                                function (err) {
                                    console.log(err);
                                }
                            );
                            promise = testScriptService.FetchingTestService(userId, token);
                            promise.then(
                                function (data) {
                                    console.log(data);
                                    $scope.totalRecords = data.length;
                                    allOfTheData = data;
                                    $scope.TestPlanOptions.data = data.slice(0, $scope.itemsPerPage);

                                },
                                function (err) {
                                    console.log(err);
                                }
                            );
                        }
                        else {

                            $scope.deleteMsgerr = true;
                            $rootScope.testPlanDeleteMsgFel = "Error Occured !!!";
                            $timeout(function () {
                                $scope.deleteMsgerr = false;
                            }, 3000);
                        }

                    },
                    function (err) {

                        $scope.deleteMsgerr = true;
                        $rootScope.testPlanDeleteMsgFel = "Error Occured !!!";
                        $timeout(function () {
                            $scope.deleteMsgerr = false;
                        }, 3000);
                    }
                );
            }

            $scope.testRunIdForDelete = "";
        };

        $scope.testRunMappedDevices = {
            paginationPageSizes: [10,20,30,50],
            paginationPageSize: 10,
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            enableRowSelection: true,  // for selection
            enableColumnMenus: false, //to hide ascending and descending column menu names
            enableRowHeaderSelection: false, // this is for check box to appear on grid options
            enableFiltering: false,
            enableGridMenu: false,		// for searching
            multiSelect: true,
            enableScrollbars: false,
            enableVerticalScrollbar: 0,
            enableHorizontalScrollbar: 0,
            columnDefs: [
                {field: 'deviceId', name: 'Device ID', headerCellClass: $scope.highlightFilteredHeader},
                {
                    field: 'deviceName',
                    name: 'Device Name',
                    headerCellClass: $scope.highlightFilteredHeader/*,cellTemplate:'<div data-toggle="modal" data-target="#Device_List" ng-click="grid.appScope.showDeviceLogDetails({{row.entity.deviceId}});">'+'<a>{{row.entity.deviceName}}</a>' +'</div>'*/
                },
                {field: 'deviceModel', name: ' Device Model', headerCellClass: $scope.highlightFilteredHeader},
                {
                    field: 'deviceManufacturer',
                    name: 'Device Manufacturer',
                    headerCellClass: $scope.highlightFilteredHeader
                },
                /* {field: 'notificationStatusName', name: ' Request status', headerCellClass: $scope.highlightFilteredHeader, cellTemplate:'<div data-toggle="modal" data-target="#DeviceNotification_List" ng-click="grid.appScope.showDeviceNotificationLogDetails({{row.entity.deviceId}},{{row.entity.jobId}});">'+'<a>{{row.entity.notificationStatusName}}</a>' +'</div>'},*/
                {
                    field: 'jobStatusName',
                    name: 'Test Run Monitoring',
                    headerCellClass: $scope.highlightFilteredHeader,
                    cellTemplate: '<div title=\"{{row.entity.jobStatusName}}\" ng-if=\"row.entity.jobStatusName.indexOf(\'%\') > -1\" class="ui-grid-progress-strip"><uib-progressbar animate="false" value=\"row.entity.jobStatusName\" type="success"><b style="position: absolute;left: 10%;color: #3d3d3d;">{{row.entity.jobStatusName}}</b></uib-progressbar></div><div class="ui-grid-cell-contents ng-binding ng-scope" title=\"{{row.entity.jobStatusName}}\" ng-if=\"row.entity.jobStatusName.indexOf(\'%\') < 0\">{{row.entity.jobStatusName}}</div>'
                },
                /*{field: 'action', name: 'Action', cellTemplate:'<div>' +'<a href="{{row.entity.showScheduleUrl}}" target="_blank">{{row.entity.action}}</a>' +'</div>' },
                 {field: 'deviceLogLevel', name: ' Device Log Level', headerCellClass: $scope.highlightFilteredHeader},*/
                {
                    name: 'Action',
                    enableRowSelection: false,
                    enableFiltering: false,
                    width: '15%',
                    enableColumnMenu: false,
                    enableSorting: false,
                    cellTemplate: '<ul class="icons-list">' +
                    '<li class="dropdown">' +
                    '<a  class="dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="icon-menu9"></i>' +
                    '</a>' +
                    '<ul class="dropdown-menu dropdown-menu-right">' +
                    '<li ><a  ng-click="grid.appScope.showDeviceTestStatusLogDetails(row);" data-toggle="modal" data-target="#DeviceTestStatus_List"><i class="icon-info22 text-primary"></i> Device Test Status</a></li>' +
                    '<li ><a  ng-click="grid.appScope.showDeviceNotificationLogDetails(row);" data-toggle="modal" data-target="#DeviceNotification_List"><i class="icon-info22 text-primary"></i> Device Ack. Status</a></li>' +
                    '<li ><a ng-click="grid.appScope.showDeviceLogDetails(row);" data-toggle="modal" data-target="#Device_List"><i class="icon-list-unordered text-primary user_editor_link"></i> View Device Log</a></li>' +
                    '<li ><a ng-click="grid.appScope.showJobStatusOnDeviceList(row);" data-toggle="modal" data-target="#jobStatus"><i class=" icon-calendar5 text-primary"></i> View Shedule Info</a></li>' +
                    '</ul>' +
                    '</li>' +
                    '</ul>'
                },
                /*{field: 'notificationType', name: ' Device Notification Type', headerCellClass: $scope.highlightFilteredHeader},
                 {field: 'runNumDesc', name: ' Command Counts', headerCellClass: $scope.highlightFilteredHeader, cellTemplate:'<div>' +'<a href="{{row.entity.showScheduleUrlForRunNum}}" target="_blank">{{row.entity.runNumDesc}}</a>' +'</div>'},*/
            ]
        };


        $scope.singleFilterForTestRunMappedDevice = function () {
            $scope.testRunMappedDevices.data = $filter('filter')($scope.searchTestRunMappedDevices, $scope.searchTextForTestRunMappedDevice, undefined);

        };

        /*/test Run code started***/

        $scope.startJob = function () {
            $(".btn").addClass("disabled");
            $scope.dataProcessingOfAllTestRuns = true;

            if ($rootScope.jobId == undefined || $rootScope.jobId == "") {
                $scope.dataProcessingOfAllTestRuns = false;
                $scope.errorMsg = true;
                $timeout(function () {
                    $scope.errorMsg = false;
                }, 3000);
                $(".btn").removeClass("disabled");
                return false;
            }
            if (Devices.length <= 0) {
                $scope.dataProcessingOfAllTestRuns = false;
                $scope.errorMsgForDevice = true;
                $scope.msg = "Please select Device..";
                $timeout(function () {
                    $scope.errorMsgForDevice = false;
                }, 3000);
                $(".btn").removeClass("disabled");

                return false;
            }
            var ScheduleData = JSON.stringify({
                "jobId": $rootScope.jobId,
                "deviceList": Devices,
                "notificationTypes": notificationTypes,
                "operation": "trigger_job",
            })
            promise = testScriptService.commonServiceForJobSheduling(ScheduleData, userId, token);
            promise.then(
                function (data) {

                    $scope.dataProcessingOfAllTestRuns = false;
                    $scope.successMsg = true;
                    $rootScope.msg1 = "";
                    $rootScope.msg1 = " " + data.message;
                    $timeout(function () {
                        $scope.successMsg = false;
                    }, 3000);
                    $(".btn").removeClass("disabled");

                    //Get devices service
                    $scope.dataLoading1 = true;
                    Devices = [];
                    notificationTypes = [];
                    promise = testScriptService.ViewTestRunDeviceService(userId, token, $rootScope.jobId);
                    promise.then(
                        function (data) {
                            $scope.testRunMappedDevices.data = [];
                            console.log(JSON.stringify(data.testRunDeviceData));
                            $scope.testRunMappedDevices.data = data.testRunDeviceData;

                            $timeout(function () {
                                $scope.refreshCallForJobProgress(userId, token, $rootScope.jobId);
                            }, 5000);

                        },
                        function (err) {
                            console.log(err);
                        }
                    );
                },
                function (err) {
                    $scope.dataProcessingOfAllTestRuns = false;
                    $(".btn").removeClass("disabled");
                    console.log(err);
                }
            );
        }


        $scope.stopJob = function () {
            $(".btn").addClass("disabled");
            $scope.dataProcessingOfAllTestRuns = true;

            if ($rootScope.jobId == undefined || $rootScope.jobId == "") {
                $scope.dataProcessingOfAllTestRuns = false;
                $scope.errorMsg = true;
                $timeout(function () {
                    $scope.errorMsg = false;
                }, 3000);
                $(".btn").removeClass("disabled");
                return false;
            }

            if (Devices.length <= 0) {
                $scope.dataProcessingOfAllTestRuns = false;
                $scope.errorMsgForDevice = true;
                $rootScope.msg = "Please select device.. ";
                $timeout(function () {
                    $scope.errorMsgForDevice = false;
                }, 3000);
                $(".btn").removeClass("disabled");

                return false;
            }
            var ScheduleData = JSON.stringify({
                "jobId": $rootScope.jobId,
                "deviceList": Devices,
                "notificationTypes": notificationTypes,
                "operation": "stop_job",
            })
            promise = testScriptService.commonServiceForJobSheduling(ScheduleData, userId, token);
            promise.then(
                function (data) {

                    $scope.dataProcessingOfAllTestRuns = false;
                    $(".btn").removeClass("disabled");
                    $scope.successMsg = true;
                    $rootScope.msg1 = "";
                    $rootScope.msg1 = " " + data.message;
                    $timeout(function () {
                        $scope.successMsg = false;
                    }, 3000);
                    //Get devices service
                    Devices = [];
                    notificationTypes = [];
                    promise = testScriptService.ViewTestRunDeviceService(userId, token, $rootScope.jobId);
                    promise.then(
                        function (data) {
                            $scope.testRunMappedDevices.data = [];
                            console.log(JSON.stringify(data.testRunDeviceData));
                            $scope.testRunMappedDevices.data = data.testRunDeviceData;

                        },
                        function (err) {
                            console.log(err);
                        }
                    );
                },
                function (err) {
                    $scope.dataProcessingOfAllTestRuns = false;
                    $(".btn").removeClass("disabled");
                    console.log(err);
                }
            );
        }


        $scope.reStartJob = function () {
            $(".btn").addClass("disabled");
            $scope.dataProcessingOfAllTestRuns = true;

            if ($rootScope.jobId == undefined || $rootScope.jobId == "") {
                $scope.dataProcessingOfAllTestRuns = false;
                $scope.errorMsg = true;
                $timeout(function () {
                    $scope.errorMsg = false;
                }, 3000);
                return false;
            }
            if (Devices.length <= 0) {
                $scope.dataProcessingOfAllTestRuns = false;
                $scope.errorMsgForDevice = true;
                $rootScope.msg = "Please select device.. ";
                $timeout(function () {
                    $scope.errorMsgForDevice = false;
                }, 3000);
                $(".btn").removeClass("disabled");
                return false;
            }

            var ScheduleData = JSON.stringify({
                "jobId": $rootScope.jobId,
                "deviceList": Devices,
                "notificationTypes": notificationTypes,
                "operation": "trigger_restart_job",
            })
            promise = testScriptService.commonServiceForJobSheduling(ScheduleData, userId, token);
            promise.then(
                function (data) {

                    $scope.dataProcessingOfAllTestRuns = false;
                    $scope.successMsg = true;
                    $rootScope.msg1 = "";
                    $rootScope.msg1 = " " + data.message;
                    $timeout(function () {
                        $scope.successMsg = false;
                    }, 3000);
                    $(".btn").removeClass("disabled");

                    //Get devices service
                    $scope.dataLoading1 = true;
                    Devices = [];
                    notificationTypes = [];
                    promise = testScriptService.ViewTestRunDeviceService(userId, token, $rootScope.jobId);
                    promise.then(
                        function (data) {
                            $scope.testRunMappedDevices.data = [];
                            console.log(JSON.stringify(data.testRunDeviceData));
                            $scope.testRunMappedDevices.data = data.testRunDeviceData;

                            $timeout(function () {
                                $scope.refreshCallForJobProgress(userId, token, $rootScope.jobId);
                            }, 5000);

                        },
                        function (err) {
                            console.log(err);
                        }
                    );

                },
                function (err) {
                    $scope.dataProcessingOfAllTestRuns = false;
                    $(".btn").removeClass("disabled");
                    console.log(err);
                }
            );
        }

        // job progress interval call till 100% job compleate
        $scope.refreshCallForJobProgress = function (userId, token, testrunID) {
            promise = testScriptService.ViewTestRunDeviceService(userId, token, testrunID);
            promise.then(
                function (data) {
                    if ($scope.testRunMappedDevices.data.length > 0 && $scope.testRunMappedDevices.data[0].jobId == testrunID) {
                        $scope.testRunMappedDevices.data = [];
                        $scope.testRunMappedDevices.data = data.testRunDeviceData;
                    }

                },
                function (err) {
                    console.log(err);
                }
            );

            $scope.timer = $timeout(function () {
                console.log("Timeout executed", Date.now());
            }, 50000);

            $scope.timer.then(
                function () {
                    $scope.refreshCallForJobProgress(userId, token, testrunID);
                }, function () {
                    console.log("Timer rejected!");
                });

        }


        $scope.deviceLogListGridOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            enableScrollbars: true,
            enableVerticalScrollbar: 1,
            enableHorizontalScrollbar: 0,
            columnDefs: [
                {field: 'level', name: 'Level', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'tag', name: 'Tag', headerCellClass: $scope.highlightFilteredHeader},
                {
                    field: 'message',
                    name: 'Message',
                    headerCellClass: $scope.highlightFilteredHeader,
                    cellTooltip: function (row, col) {
                        return '' + row.entity.message + '';
                    }
                },
                {
                    field: 'time',
                    name: 'Time',
                    headerCellClass: $scope.highlightFilteredHeader,
                    cellFilter: 'date:"yyyy-MM-dd hh:mm:ss UTC Z"'
                },
            ]
        };


        $scope.showDeviceLogDetails = function (row) {
            $scope.header = "Device Log"
            $scope.dataLoadingPopup = true;
            $scope.deviceLogListGridOptions.data = [];
            $scope.header = "Device Log"
            promise = testScriptService.showDeviceLogDetails(userId, token, row.entity.deviceId);
            promise.then(
                function (data) {
                    $scope.deviceLogList = data;
                    $scope.deviceLogListGridOptions.data = data.deviceLogList;
                    for (var i = 0; i < $scope.deviceLogListGridOptions.data.length; i++) {
                        $scope.deviceLogListGridOptions.data[i].time = new Date($scope.deviceLogListGridOptions.data[i].time);
                    }
                    $scope.dataLoadingPopup = false;
                    if ($scope.deviceLogListGridOptions.data.length <= 25)
                        $('.ui-grid-pager-panel').hide();
                    else
                        $('.ui-grid-pager-panel').show();
                },
                function (err) {
                    $scope.dataLoadingPopup = false;
                }
            );


        }


        $scope.showDeviceStatusRefresh = function (scope) {
            $scope.header = "Device Status Log Details"
            $scope.dataLoadingPopup = true;
            promise = testScriptService.showDeviceStatusDetails(userId, token, scope.deviceStatusLogListGridOptions.data[0].deviceId, scope.deviceStatusLogListGridOptions.data[0].jobId);
            promise.then(
                function (data) {
                    $scope.deviceStatusLogListGridOptions.data = [];
                    $scope.deviceStatusLogList = data;
                    $scope.deviceStatusLogListGridOptions.data = data.deviceStausLogList;
                    $scope.dataLoadingPopup = false;
                    if ($scope.deviceStatusLogListGridOptions.data.length <= 25)
                        $('.ui-grid-pager-panel').hide();
                    else
                        $('.ui-grid-pager-panel').show();
                },
                function (err) {
                    $scope.dataLoadingPopup = false;
                }
            );
        }

        $scope.showDeviceLogDetailsRefresh = function (scope) {
            $scope.dataLoadingPopup = true;
            $scope.header = "Device Log"
            promise = testScriptService.showDeviceLogDetails(userId, token, scope.deviceLogListGridOptions.data[0].ia_device_id);
            promise.then(
                function (data) {
                    $scope.deviceLogListGridOptions.data = [];
                    $scope.deviceLogList = data;
                    $scope.deviceLogListGridOptions.data = data.deviceLogList;
                    $scope.dataLoadingPopup = false;
                    if ($scope.deviceLogListGridOptions.data.length <= 25)
                        $('.ui-grid-pager-panel').hide();
                    else
                        $('.ui-grid-pager-panel').show();
                },
                function (err) {
                    $scope.dataLoadingPopup = false;
                }
            );
        }

        /**
         * Device TestRun Status GridOptions
         *
         */
        $scope.deviceTestStatusLogListGridOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            paginationPageSizes: [25, 50, 75, 100],
            columnDefs: [
                {
                    field: 'jobStatus',
                    name: 'Test Status',
                    headerCellClass: $scope.highlightFilteredHeader
                },
                {
                    field: 'jobStatusTime',
                    name: 'Test Status Time',
                    headerCellClass: $scope.highlightFilteredHeader,
                    cellFilter: 'date:"yyyy-MM-dd hh:mm:ss UTC Z"'
                },
                {
                    field: 'iaCommandName',
                    name: 'Command Name',
                    headerCellClass: $scope.highlightFilteredHeader,
                }
            ]
        };

        $scope.showDeviceTestStatusLogDetails = function (row) {
            $scope.dataLoadingPopup = true;
            $scope.header = "Device TestStatus Log Details"
            $scope.deviceTestStatusLogListGridOptions.data = [];
            promise = testScriptService.showDeviceTestStatusLogDetails(userId, token, row.entity.deviceId, row.entity.jobId);
            promise.then(
                function (data) {
                    console.log(JSON.stringify(data));
                    $scope.deviceTestStatusLogList = data;
                    $scope.deviceTestStatusLogListGridOptions.data = data.deviceStausLogList;
                    // for (var i = 0; i < $scope.deviceTestStatusLogListGridOptions.data.length; i++) {
                    // $scope.deviceTestStatusLogListGridOptions.data[i].jobStatusTime = new Date($scope.deviceTestStatusLogListGridOptions.data[i].jobStatusTime);
                    // console.log($scope.deviceTestStatusLogListGridOptions.data[i].jobStatusTime);
                    //}
                    $scope.dataLoadingPopup = false;
                    if ($scope.deviceTestStatusLogListGridOptions.data.length <= 25)
                        $('.ui-grid-pager-panel').hide();
                    else
                        $('.ui-grid-pager-panel').show();
                },
                function (err) {
                    $scope.dataLoadingPopup = false;
                }
            );
        }

        $scope.showDeviceTestStatusLogDetailsRefresh = function (scope) {
            $scope.dataLoadingPopup = true;
            $scope.header = "Device TestStatus Log Details"
            promise = testScriptService.showDeviceTestStatusLogDetails(userId, token, scope.deviceTestStatusLogListGridOptions.data[0].iaDeviceId, scope.deviceTestStatusLogListGridOptions.data[0].iaJobId);
            promise.then(
                function (data) {
                    $scope.deviceTestStatusLogListGridOptions.data = [];
                    $scope.deviceTestStatusLogList = data;
                    $scope.deviceTestStatusLogListGridOptions.data = data.deviceStausLogList;
                    for (var i = 0; i < $scope.deviceTestStatusLogListGridOptions.data.length; i++) {
                        $scope.deviceTestStatusLogListGridOptions.data[i].testStatusTime = new Date($scope.deviceTestStatusLogListGridOptions.data[i].testStatusTime);
                    }
                    $scope.dataLoadingPopup = false;
                    if ($scope.deviceTestStatusLogListGridOptions.data.length <= 25)
                        $('.ui-grid-pager-panel').hide();
                    else
                        $('.ui-grid-pager-panel').show();
                },
                function (err) {
                    $scope.dataLoadingPopup = false;
                }
            );
        }


        $scope.deviceNotificationLogListGridOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            enableVerticalScrollbar: 1,
            enableHorizontalScrollbar: 0,
            columnDefs: [
                {
                    field: 'iaNotofocationStatusByName',
                    name: 'Request Status',
                    headerCellClass: $scope.highlightFilteredHeader
                },
                {
                    field: 'createdDate',
                    name: 'Request Time',
                    headerCellClass: $scope.highlightFilteredHeader,
                    cellFilter: 'date:"yyyy-MM-dd hh:mm:ss UTC Z"'
                },
                {
                    field: 'ackDate',
                    type: 'date',
                    name: 'Request Ack Time',
                    headerCellClass: $scope.highlightFilteredHeader,
                    cellFilter: 'date:"yyyy-MM-dd hh:mm:ss UTC Z"'
                },
                {field: 'retryCount', name: 'Retry Count', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };

        $scope.showDeviceNotificationLogDetails = function (row) {
            $scope.dataLoadingPopup = true;
            $scope.header = "Device Notification Log Details"
            $scope.deviceNotificationLogListGridOptions.data = [];
            promise = testScriptService.showDeviceNotificationLogDetails(userId, token, row.entity.deviceId, row.entity.jobId);
            promise.then(
                function (data) {
                    $scope.deviceNotificationLogList = data;
                    $scope.deviceNotificationLogListGridOptions.data = data.deviceNotificationLogList;
                    for (var i = 0; i < $scope.deviceNotificationLogListGridOptions.data.length; i++) {
                        $scope.deviceNotificationLogListGridOptions.data[i].ackDate = new Date($scope.deviceNotificationLogListGridOptions.data[i].ackDate);
                        $scope.deviceNotificationLogListGridOptions.data[i].createdDate = new Date($scope.deviceNotificationLogListGridOptions.data[i].createdDate);
                    }
                    $scope.dataLoadingPopup = false;
                    if ($scope.deviceNotificationLogListGridOptions.data.length <= 25)
                        $('.ui-grid-pager-panel').hide();
                    else
                        $('.ui-grid-pager-panel').show();
                },
                function (err) {
                    $scope.dataLoadingPopup = false;
                }
            );
        }

        $scope.showDeviceNotificationLogDetailsRefresh = function (scope) {
            $scope.dataLoadingPopup = true;
            $scope.header = "Device Notification Log Details"
            promise = testScriptService.showDeviceNotificationLogDetails(userId, token, scope.deviceNotificationLogListGridOptions.data[0].iaDeviceId, scope.deviceNotificationLogListGridOptions.data[0].iaJobId);
            promise.then(
                function (data) {
                    $scope.deviceNotificationLogListGridOptions.data = [];
                    $scope.deviceNotificationLogList = data;
                    $scope.deviceNotificationLogListGridOptions.data = data.deviceNotificationLogList;
                    for (var i = 0; i < $scope.deviceNotificationLogListGridOptions.data.length; i++) {
                        $scope.deviceNotificationLogListGridOptions.data[i].ackDate = new Date($scope.deviceNotificationLogListGridOptions.data[i].ackDate);
                        $scope.deviceNotificationLogListGridOptions.data[i].createdDate = new Date($scope.deviceNotificationLogListGridOptions.data[i].createdDate);
                    }
                    $scope.dataLoadingPopup = false;
                    if ($scope.deviceNotificationLogListGridOptions.data.length <= 25)
                        $('.ui-grid-pager-panel').hide();
                    else
                        $('.ui-grid-pager-panel').show();
                },
                function (err) {
                    $scope.dataLoadingPopup = false;
                }
            );
        }

        $scope.showJobStatusOnDeviceList = function (row) {
            $scope.dataLoadingPopup = true;
            $scope.header = "Test Run Status"
            // $scope.jobStatusList = [];
            promise = testScriptService.showJobStatusOnDeviceList(userId, token, row.entity.deviceId, row.entity.jobId);
            promise.then(
                function (data) {
                    $scope.commandInfoList = $.parseJSON(data.commandInfo);
                    $scope.testRunID = data.jobId;
                    $scope.deviceID = data.deviceID;
                    $scope.distinctCommandSize = data.distinctCommandSize;
                    $scope.scheduledCommandsCount = data.scheduledCommandsCount;
                    $scope.testRunName = data.jobName;
                    $scope.jobStartDate = data.jobStartDate;
                    $scope.jobStatusList.data = $scope.commandInfoList;
                    $scope.dataLoadingPopup = false;
                    if ($scope.jobStatusList.data.length <= 25)
                        $('.ui-grid-pager-panel').hide();
                    else
                        $('.ui-grid-pager-panel').show();
                },
                function (err) {
                    $scope.dataLoadingPopup = false;
                }
            );
        }

        $scope.jobStatusList = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            enableScrollbars: true,
            enableVerticalScrollbar: 1,
            enableHorizontalScrollbar: 0,
            columnDefs: [
                {
                    field: 'scheduleDateAndTime',
                    name: 'Schedule Date & Time',
                    headerCellClass: $scope.highlightFilteredHeader,
                    cellTooltip: function (row, col) {
                        return '' + row.entity.scheduleDateAndTime + '';
                    }
                },
                // {field: 'commandId', name: 'CommandId', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'name', name: 'name', headerCellClass: $scope.highlightFilteredHeader},
                {
                    field: 'actionDuration',
                    name: 'Action Duration',
                    headerCellClass: $scope.highlightFilteredHeader,
                    cellTooltip: function (row, col) {
                        return '' + row.entity.actionDuration + '';
                    }
                },
                {
                    field: 'testCaseId',
                    name: 'Test Case Id',
                    headerCellClass: $scope.highlightFilteredHeader,
                    cellTooltip: function (row, col) {
                        return '' + row.entity.testCaseId + '';
                    }
                },
                {
                    field: 'parameters',
                    name: 'Parameters',
                    headerCellClass: $scope.highlightFilteredHeader,
                    cellTooltip: function (row, col) {
                        return '' + row.entity.parameters + '';
                    }
                },
            ]
        };

        var TestPlanId = "";
        $scope.deviceProfileList = [];
        var deepCopyObject = "";
        $scope.createTestRun = function (row) {
            $scope.searchTextForRealDevices = "";
            $scope.dataLoading = true;
            $(".save").addClass("disabled");
            $scope.checkBoxMonitor = true;
            $scope.isEnableMonitor = false;
            $(".schedule").attr("disabled", "disabled");
            $scope.scrollToTestRunDiv();
            $scope.createNewTestRunTab = true;
            $scope.mainTab = 1;
            TestPlanId = "";
            $scope.deviceProfileList = [];
            deepCopyObject = "";
            realDevices = [];
            VirtualDevicelist = [];
            $scope.RealDevicesOptions.data = [];
            $scope.DeviceMapping.data = [];
            $scope.phoneNo = "";

            $("#mappingDataTable").css("display", "block");
            $("#testRunDeviceDataTable").css("display", "none");
            $scope.CreateTestRunRealDeviceOptions.data = [];

            $('#tableForTaskAndCommandGroup > tbody').empty();
            TestPlanId = row.entity.testplanId;

            promise = testScriptService.getTestplan(token, userId, TestPlanId);
            promise.then(
                function (data) {


                    deepCopyObject = jQuery.extend(true, new Object(), data);
                    for (var i = 0; i < deepCopyObject.jobVO.length; i++) {
                        $scope.makeVioceCallPhoneNo = false;
                        $scope.answerVioceCallPhoneNo = false;
                        $scope.sendSms = false;
                        var arr = jQuery.makeArray(deepCopyObject.jobVO[i]);

                        angular.forEach(arr[0].nodes, function (node, index) { // test case level
                            if ('nodes' in node) {
                                angular.forEach(node.nodes, function (node, index) { // command group level
                                    if (node.sequenceNo != '0') {
                                        if ('nodes' in node) { // command level
                                            angular.forEach(node.nodes, function (node, index) {
                                                if (node.commandParams != undefined && node.commandParams != null && node.commandParams.toLowerCase().indexOf("phonenumber=") >= 0 && node.commandParams.toLowerCase().indexOf("phoneno") >= 0 && node.title == 'MakeVoiceCall') {
                                                    $scope.makeVioceCallPhoneNo = true;
                                                }
                                                if (node.commandParams != undefined && node.commandParams != null && node.commandParams.toLowerCase().indexOf("phonenumber=") >= 0 && node.commandParams.toLowerCase().indexOf("phoneno") >= 0 && node.title == 'AnswerVoiceCall') {
                                                    $scope.answerVioceCallPhoneNo = true;
                                                }
                                                if (node.commandParams != undefined && node.commandParams != null && node.commandParams.toLowerCase().indexOf("phoneno=") >= 0 && node.commandParams.toLowerCase().indexOf("phoneno") >= 0 && node.title == 'SendSMS') {
                                                    $scope.sendSms = true;
                                                }
                                            });
                                        }
                                    }
                                });
                            }

                        });
                        if ($scope.makeVioceCallPhoneNo) {
                            $scope.deviceProfileList.push({
                                'deviceProfileName': deepCopyObject.jobVO[i].deviceProfileName,
                                'deviceId': deepCopyObject.jobVO[i].deviceId,
                                'deviceName': deepCopyObject.jobVO[i].deviceName,
                                'content': arr,
                                'phoneNo': $scope.makeVioceCallPhoneNo
                            });
                        }
                        if ($scope.answerVioceCallPhoneNo) {
                            $scope.deviceProfileList.push({
                                'deviceProfileName': deepCopyObject.jobVO[i].deviceProfileName,
                                'deviceId': deepCopyObject.jobVO[i].deviceId,
                                'deviceName': deepCopyObject.jobVO[i].deviceName,
                                'content': arr,
                                'phoneNo': $scope.answerVioceCallPhoneNo
                            });
                        }
                        if ($scope.sendSms) {
                            $scope.deviceProfileList.push({
                                'deviceProfileName': deepCopyObject.jobVO[i].deviceProfileName,
                                'deviceId': deepCopyObject.jobVO[i].deviceId,
                                'deviceName': deepCopyObject.jobVO[i].deviceName,
                                'content': arr,
                                'phoneNo': $scope.sendSms
                            });
                        }
                        if (!$scope.answerVioceCallPhoneNo && !$scope.makeVioceCallPhoneNo && !$scope.sendSms) {
                            $scope.deviceProfileList.push({
                                'deviceProfileName': deepCopyObject.jobVO[i].deviceProfileName,
                                'deviceId': deepCopyObject.jobVO[i].deviceId,
                                'deviceName': deepCopyObject.jobVO[i].deviceName,
                                'content': arr,
                                'phoneNo': false
                            });
                        }

                    }
                    console.log($scope.deviceProfileList);
                    if ($scope.deviceProfileList.length == 0) {
                        toastr.error('Create Device Profile First', 'Device Profile not Found!')
                        console.log("No Device Profile Found !");
                        $scope.dataLoading = false;
                    }
                    else {
                        $scope.selectedOption = $scope.deviceProfileList[0];
                        $scope.taskTableArray = $scope.deviceProfileList[0].content[0].nodes;
                        if ($scope.deviceProfileList[0].phoneNo) {
                            $scope.showOnlyDeviceProfileAndPhoneNo = true;
                            $scope.showOnlyDeviceProfile = false;
                        } else {
                            $scope.showOnlyDeviceProfileAndPhoneNo = false;
                            $scope.showOnlyDeviceProfile = true;
                        }

                        $scope.renderHtmlForTask($scope.taskTableArray);
                        promise = testScriptService.getRealDevices(token, userId);
                        promise.then(
                            function (data) {
                                $scope.dataLoading = false;
                                $(".save").removeClass("disabled");
                                $scope.RealDevicesOptions.data = data.devicesList;
                                $scope.tempRealDeviceList = data.devicesList;
                            },
                            function (err) {
                                console.log(err);
                            }
                        );
                    }

                },
                function (err) {
                    console.log(err);
                }
            );

        };

        $scope.renderHtmlForTask = function (taskTableArray) {
            var html = "";
            angular.forEach(taskTableArray, function (node, index) {
                if (node.loop != '0') {
                    html += '<tr class="border-double" style="background-color: #CCD0DA;">' +
                        '<td class="text-semibold text-italic">' + node.title + '</td>' +
                        '<td class="text-right"><input type="text" style="width: 40px;" maxlength="4" value="' + node.loop + '" readonly/></td>' +
                        '<td class="text-right"><input type="text"  style="width: 40px;" maxlength="4" value="' + node.sequenceNo + '" readonly/></td>' +
                        '</tr>';
                    if ('nodes' in node) {
                        angular.forEach(node.nodes, function (node, index) {
                            if (node.sequenceNo != '0') {
                                html += '<tr class="border-double" >' +
                                    '<td class="text-semibold text-italic">' + node.title + '</td>' +
                                    '<td class="text-right"><input type="text" value="' + node.loop + '" style="width: 40px;" maxlength="4"  readonly/></td>' +
                                    '<td class="text-right"><input type="text" value="' + node.sequenceNo + '"  style="width: 40px;" maxlength="4"  readonly/></td>' +
                                    '</tr>';
                                if ('nodes' in node) {
                                    angular.forEach(node.nodes, function (node, index) {
                                        html += '<tr>' +
                                            '<td class="text-left">' + node.title + '</td>' +
                                            '<td class="text-right"><input type="text" value="' + node.loop + '" style="width: 40px;" maxlength="4"  readonly/></td>' +
                                            '<td class="text-right"><input type="text" value="' + node.sequenceNo + '"  style="width: 40px;" maxlength="4"  readonly/></td>' +
                                            '</tr>' +
                                            '<tr style="background-color: #F9FCF1;">' +
                                            '<td colspan="3"><span class="text-italic" style="word-wrap: break-word;">' + node.commandParams + '</span></td>' +

                                            '</tr>';
                                    });
                                }
                            }
                        });
                    }
                }
            });
            $('#tableForTaskAndCommandGroup > tbody').empty();
            $('#tableForTaskAndCommandGroup > tbody').append(html);
        }

        $scope.changeDeviceProfile = function () {
            $scope.phoneNo = "";
            $scope.taskTableArray = [];
            $scope.taskTableArray = $scope.selectedOption.content[0].nodes;
            if ($scope.selectedOption.phoneNo) {
                $scope.showOnlyDeviceProfileAndPhoneNo = true;
                $scope.showOnlyDeviceProfile = false;
            } else {
                $scope.showOnlyDeviceProfileAndPhoneNo = false;
                $scope.showOnlyDeviceProfile = true;
            }
            for(rowIndex in selectedRowsOfTestPlan){
                selectedRowsOfTestPlan[rowIndex].isSelected = false;
            }
            selectedRowsOfTestPlan = [];
            $scope.renderHtmlForTask($scope.taskTableArray);
        }

        //Real Devices
        $scope.RealDevicesOptions = {
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            enableRowSelection: true,  // for selection
            enableColumnMenus: false, //to hide ascending and descending column menu names
            enableRowHeaderSelection: false, // this is for check box to appear on grid options
            enableFiltering: false,
            enableGridMenu: false,		// for searching
            multiSelect: true,
            enableScrollbars: false,
            enableVerticalScrollbar: 3,
            enableHorizontalScrollbar: 0,
            columnDefs: [
                {field: 'deviceId', name: 'Id', headerCellClass: $scope.highlightFilteredHeader, width: "20%"},
                {
                    field: 'deviceName',
                    name: 'Name',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "20%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.deviceName + '';
                    }
                },
                {
                    field: 'msisdn',
                    name: 'MSISDN',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "30%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.msisdn + '';
                    }
                },
                //{field: 'region', name: 'city', headerCellClass: $scope.highlightFilteredHeader},
                //{field: 'model', name: 'Model', headerCellClass: $scope.highlightFilteredHeader},
                //{field: 'network', name: 'network', headerCellClass: $scope.highlightFilteredHeader},
                {
                    field: 'manufacturer',
                    name: 'manufacturer',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "25%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.manufacturer + '';
                    }
                },
            ]
        };


        $scope.singleFilterForRealDevices = function () {
            $scope.RealDevicesOptions.data = $filter('filter')($scope.tempRealDeviceList, $scope.searchTextForRealDevices, undefined);

        };

        $scope.RealDevicesOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi1 = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.dataProcessing = true;
                $scope.msg = "";
                $rootScope.RowRealDevices = row.entity;
                $rootScope.RealDeviceId = row.entity.deviceId;
                var VirtualDeviceName = $scope.selectedOption.deviceName;
                var VirtualDeviceId = $scope.selectedOption.deviceId;
                var deviceProfileName = $scope.selectedOption.deviceProfileName;
                var phoneNumber = "";
                if ($scope.selectedOption.phoneNo && $scope.phoneNo != undefined && $scope.phoneNo != "") {
                    phoneNumber = $scope.phoneNo;
                } else if ($scope.selectedOption.phoneNo) {
                    row.isSelected = false;
                    $scope.errorForPhoneNo = true;
                    $timeout(function () {
                        $scope.errorForPhoneNo = false;
                    }, 3000);
                    return false;
                }
                if (row.isSelected){
                    selectedRowsOfTestPlan.push(row);
                }
                else{
                    let index = selectedRowsOfTestPlan.indexOf(row);
                    if (index > -1) {
                        selectedRowsOfTestPlan.splice(index, 1);
                    } 
                }
                var RealDeviceName = row.entity.deviceName;
                var RealDeviceId = row.entity.deviceId;
                if (row.isSelected && VirtualDeviceName != undefined) {
                    realDevices.push({
                        'VirtualDeviceName': VirtualDeviceName,
                        'deviceProfileName': deviceProfileName,
                        'VirtualDeviceId': VirtualDeviceId,
                        'deviceName': RealDeviceName,
                        'deviceId': RealDeviceId,
                        'model': row.entity.model,
                        'manufacturer': row.entity.manufacturer,
                        'msisdn': row.entity.msisdn,
                        'row': row,
                        'testplanId': TestPlanId,
                        'testrunId': 0,
                        'virtualDeviceId': VirtualDeviceId,
                        'realDeviceId': RealDeviceId,
                        'phoneNumber': phoneNumber
                    });
                    VirtualDevicelist.push({
                        'testplanId': TestPlanId,
                        'testrunId': 0,
                        'virtualDeviceId': VirtualDeviceId,
                        'realDeviceId': RealDeviceId
                    });
                } else {
                    for (var i = 0; i < realDevices.length; i++) {
                        if (realDevices[i].realDeviceId == row.entity.deviceId) {
                            realDevices.splice(i, 1);
                            VirtualDevicelist.splice(i, 1);
                        }
                    }
                }
                $scope.addRealDevices = function () {
                    if ($scope.selectedOption.phoneNo && ($scope.phoneNo == undefined || $scope.phoneNo == "")) {
                        $scope.errorForPhoneNo = true;
                        $timeout(function () {
                            $scope.errorForPhoneNo = false;
                        }, 3000);
                        return false;
                    }
                    if (realDevices.length == 0) {
                        $scope.deviceProfileListError = true;
                        $timeout(function () {
                            $scope.deviceProfileListError = false;
                        }, 3000);
                        return false;
                    }

                    $scope.DeviceMapping.data = jQuery.makeArray(realDevices);
                    //$scope.DeviceMapping.data = jQuery.extend(true, new Object(), Devices);
                    angular.forEach($scope.gridApi1.selection.getSelectedRows(), function (data, index) {
                        //angular.copy(data, $scope.DeviceMapping.data);
                        $scope.RealDevicesOptions.data.splice($scope.RealDevicesOptions.data.lastIndexOf(data), 1);
                    });
                }

                //$scope.TestRunCreate_Data(VirtualDevicelist);
                $scope.dataProcessing = false;
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
        };

        $scope.DeviceMapping = {
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            enableRowSelection: true,  // for selection
            enableColumnMenus: false, //to hide ascending and descending column menu names
            enableRowHeaderSelection: false, // this is for check box to appear on grid options
            enableFiltering: false,
            enableGridMenu: false,		// for searching
            multiSelect: true,
            enableScrollbars: false,
            enableVerticalScrollbar: 0,
            enableHorizontalScrollbar: 0,
            columnDefs: [
                {
                    field: 'deviceProfileName',
                    name: 'Device Profile',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "30%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.deviceProfileName + '';
                    }
                },
                {field: 'deviceId', name: 'Id', headerCellClass: $scope.highlightFilteredHeader, width: "20%"},
                {
                    field: 'deviceName',
                    name: 'Name',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "20%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.deviceName + '';
                    }
                },
                //{field: 'msisdn', name: 'MSISDN', headerCellClass: $scope.highlightFilteredHeader},
                {
                    field: 'phoneNumber',
                    name: 'phoneNumber',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "30%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.phoneNumber + '';
                    }
                },
            ]
        };

        $scope.DeviceMapping.onRegisterApi = function (gridApi) {
            $scope.gridApi2 = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.removeMappings = function () {
                    angular.forEach($scope.gridApi2.selection.getSelectedRows(), function (data, index) {
                        for (var i = 0; i < realDevices.length; i++) {
                            if (realDevices[i].deviceId == data.deviceId) {
                                realDevices.splice(i, 1);
                                VirtualDevicelist.splice(i, 1);
                            }
                        }
                        $scope.RealDevicesOptions.data.push(data);
                        $scope.DeviceMapping.data.splice($scope.DeviceMapping.data.lastIndexOf(data), 1);
                    });
                }
            });

        };

        //Get Devices grid
        $scope.CreateTestRunRealDeviceOptions = {
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            enableRowSelection: true,  // for selection
            enableColumnMenus: false, //to hide ascending and descending column menu names
            enableRowHeaderSelection: false, // this is for check box to appear on grid options
            enableFiltering: false,
            enableGridMenu: false,		// for searching
            multiSelect: true,
            enableScrollbars: false,
            enableVerticalScrollbar: 0,
            enableHorizontalScrollbar: 0,
            columnDefs: [
                {
                    field: 'deviceId',
                    name: 'Device ID',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "20%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.deviceId + '';
                    }
                },
                {
                    field: 'deviceName',
                    name: 'Device Name',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "20%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.deviceName + '';
                    }
                },
                {
                    field: 'deviceMsisdn',
                    name: ' MSISDN',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "30%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.deviceMsisdn + '';
                    }
                },
                {
                    field: 'deviceManufacturer',
                    name: 'Manufacturer',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "30%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.deviceManufacturer + '';
                    }
                },
            ]
        };

        $scope.CreateTestrun = function () {
            if ($scope.deviceProfileList.length == 0) {
                $scope.deviceProfileListError = true;
                $timeout(function () {
                    $scope.deviceProfileListError = false;
                }, 3000);
                return false;
            }

            if ($scope.DeviceMapping.data.length == 0) {
                $scope.errorMsgForRealVirtualMapping = true;
                $timeout(function () {
                    $scope.errorMsgForRealVirtualMapping = false;
                }, 3000);
                return false;
            }
            VirtualDevicelist = [];
            for (var i = 0; i < $scope.DeviceMapping.data.length; i++) {
                VirtualDevicelist.push({
                    'testplanId': $scope.DeviceMapping.data[i].testplanId,
                    'testrunId': 0,
                    'virtualDeviceId': $scope.DeviceMapping.data[i].VirtualDeviceId,
                    'realDeviceId': $scope.DeviceMapping.data[i].realDeviceId,
                    'phoneNumber': $scope.DeviceMapping.data[i].phoneNumber
                });
            }
            if ($scope.isEnableMonitor) {
                $scope.isEnableMonitorTemp = "Y";
            } else {
                $scope.isEnableMonitorTemp = "N";
            }
            $rootScope.CreateTestRun_Data = JSON.stringify({
                "testplanVo": {"testplanId": TestPlanId},
                "jobVo": {"isEnableMonitor": $scope.isEnableMonitorTemp},
                "virtualRealDeviceList": VirtualDevicelist
            });

            if ($rootScope.RowRealDevices != null) {
                $(".save").addClass("disabled");
                $scope.waitMsgForSchedule = true;
                var TestRunData = $rootScope.CreateTestRun_Data;
                promise = testScriptService.CreateTestRun(TestRunData, token, userId);
                promise.then(
                    function (data) {
                        $scope.waitMsgForSchedule = false;
                        var DependantTestRunName = data.NewTestRun.jobName;
                        $(".schedule").removeAttr("disabled")
                        $(".save").addClass("disabled");
                        $scope.checkBoxMonitor = false;
                        //Get devices service
                        $scope.testRunIdShcedule = data.NewTestRun.jobId;
                        $scope.TestRunName = data.NewTestRun.jobName;
                        $scope.jobTemplateDescription = data.NewTestRun.jobDescription;
                        promise = testScriptService.ViewTestRunDeviceService(userId, token, data.NewTestRun.jobId);
                        promise.then(
                            function (data) {
                                console.log(JSON.stringify(data.testRunDeviceData));
                                $("#mappingDataTable").css("display", "none");
                                $scope.CreateTestRunRealDeviceOptions.data = data.testRunDeviceData;
                                $("#testRunDeviceDataTable").css("display", "block");
                                promise = testScriptService.getAllTestRunsForSchedule(token, userId);
                                promise.then(
                                    function (data) {
                                        $scope.loadAllTestRuns = false;
                                        $scope.hideFilter = true;
                                        $scope.allTestRuns.data = [];
                                        $scope.allTestRunsTemp = data.testRunsForTestPlan
                                        $scope.allTestRuns.data = $scope.allTestRunsTemp;
                                        $scope.searchTestRuns = $scope.allTestRunsTemp;
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                );
                            },
                            function (err) {
                                console.log(err);
                            }
                        );
                        promise = testScriptService.FetchingTestService(userId, token);
                        promise.then(
                            function (data) {
                                console.log(data);
                                $scope.totalRecords = data.length;
                                allOfTheData = data;
                                $scope.TestPlanOptions.data = data.slice(0, $scope.itemsPerPage);

                            },
                            function (err) {
                                console.log(err);
                            }
                        );
                    },
                    function (err) {
                        console.log(err);
                    }
                );                
            }
        }


        $scope.CreateTestRunRealDeviceOptions.onRegisterApi = function (gridApi) {
            $scope.dataProcessing = true;
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {

                if (row.isSelected) {
                    createTestRunDevices.push(row.entity.deviceId);
                } else {
                    for (var i = 0; i < createTestRunDevices.length; i++) {
                        if (createTestRunDevices[i] == row.entity.deviceId) {
                            createTestRunDevices.splice(i, 1);
                        }
                    }
                }
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {


            });
            $scope.dataProcessing = false;
        };

        $scope.schedule = function ($event) {
            var v;
            if ($event != undefined) {
                v = $event.currentTarget.id;
            }
            var devs;

            $scope.setErrorMessage = function (errorMessage) {
                $scope.error = errorMessage;
            }


            if (($scope.Datendtime == undefined || $scope.Datendtime == "")) {
                $scope.datentimeError = true;
                $(".schedule").removeAttr("disabled");
                $timeout(function () {
                    $scope.datentimeError = false;
                }, 3000);
                return false;
            }

            if (($scope.EndDate == undefined || $scope.EndDate == "")) {
                $scope.endDateError = true;
                $timeout(function () {
                    $scope.endDateError = false;
                }, 3000);
                $(".schedule").removeAttr("disabled");
                return false;
            }
            if ($scope.testRunIdShcedule == undefined || $scope.testRunIdShcedule == "") {

            }
            var jName;
            if (v === "Scheduleone") {
                $scope.dataProcessingOfAllTestRuns = true;
                devs = Devices;
                jName = $scope.jobName;
            }
            else {
                devs = createTestRunDevices;
                jName = $scope.TestRunName;
            }
            if (devs.length <= 0) {
                $scope.errorMsgForSchedule = true;
                $scope.errorMsgForScheduleModel = "Please select devices..";
                $timeout(function () {
                    $scope.errorMsgForSchedule = false;
                }, 3000);
                $(".schedule").removeAttr("disabled");
                return false;
            }
            function getUTCTime(dateString) {
                Number.prototype.padLeft = function(base,chr){
                    var  len = (String(base || 10).length - String(this).length)+1;
                    return len > 0? new Array(len).join(chr || '0')+this : this;
                }
                var date = new Date()
                var timeZoneOffset = date.getTimezoneOffset() * 60 * 1000;
                var timeStamp = new Date(dateString).getTime();
                var utcTimeStamp = timeStamp + timeZoneOffset;
                var utcDate = new Date(utcTimeStamp);
                var str = utcDate.getFullYear() + "-" + (utcDate.getMonth() + 1).padLeft() + "-" + utcDate.getDate().padLeft() + " " +  utcDate.getHours().padLeft() + ":" + utcDate.getMinutes().padLeft() + ":" + utcDate.getSeconds().padLeft();
                return str;
            }

            var ScheduleData = JSON.stringify({
                "jobId": $scope.testRunIdShcedule,
                "jobName": jName,
                "jobDescription": $scope.jobTemplateDescription,
                "jobCreatedBy": userId,
                "jobStartDate": "2016-02-08",
                //"jobStartDateTime": $scope.Datendtime,
                "jobStartDateTime": getUTCTime($scope.Datendtime),
//	                    "jobStartDate": $scope.StartDate,
                "jobEndDate": $scope.EndDate,
                "recurrence": $scope.recurrence,
                "deviceList": devs,
                "operation": "schedule",
            })
            $scope.waitMsgForSchedule1 = true;
            $(".schedule").attr("disabled", "disabled");
            $scope.dataProcessing = true;
            console.log(ScheduleData);
            promise = testScriptService.Schedule(ScheduleData, userId, token);
            promise.then(
                function (data) {
                    console.log(JSON.stringify(data));

                    if (data.status == "error") {
                        if (v === "Scheduleone") {
                            $scope.dataProcessingOfAllTestRuns = false;
                            $scope.scheduleError_msg = true;
                            $rootScope.msg3 = "";
                            $rootScope.msg3 = "Some error occured";
                            $timeout(function () {
                                $scope.scheduleError_msg = false;
                            }, 3000);
                        }
                        else {
                            $scope.waitMsgForSchedule1 = false;
                            $rootScope.errorMsgForScheduleModel = data.errorDescription;
                            $scope.errorMsgForSchedule = true;
                            $timeout(function () {
                                $scope.errorMsgForSchedule = false;
                            }, 3000);
                            $scope.dataProcessing = false;
                        }
                        $(".schedule").removeAttr("disabled");
                    }

                    if (data.status == "success") {
                        if (v === "Scheduleone") {
                            $scope.dataProcessingOfAllTestRuns = false;
                            $scope.scheduleMsg1 = true;
                            $rootScope.msg2 = "";
                            $rootScope.msg2 = "Test Run has been Scheduled Successfully";
                            $timeout(function () {
                                $scope.scheduleMsg1 = false;
                            }, 3000);
                        }
                        else {
                            $scope.waitMsgForSchedule1 = false;
                            $scope.successMsgForSchedule = true;
                            $rootScope.successMsgForScheduleModel = "Test Run has been Scheduled Successfully";
                            $timeout(function () {
                                $scope.successMsgForSchedule = false;
                                $scope.mainTab = 3;
                                $('html, body').animate({scrollTop: '+=1080px'}, 800);
                            }, 3000);
                        }
                    }

                },
                function (err) {
                    console.log(err);
                    $scope.waitMsgForSchedule1 = false;
                    $scope.dataProcessing = false;
                    $(".schedule").removeAttr("disabled");
                }
            );
        }

        $scope.startnow = function () {
            if (createTestRunDevices.length <= 0) {
                $scope.errorMsgForSchedule = true;
                $scope.errorMsgForScheduleModel = "Please select devices..";
                $timeout(function () {
                    $scope.errorMsgForSchedule = false;
                }, 3000);
                $(".schedule").removeAttr("disabled");
                return false;
            }

            var ScheduleData = JSON.stringify({
                "jobId": $scope.testRunIdShcedule,
                "jobDescription": $scope.jobTemplateDescription,
                "jobCreatedBy": userId,
                "deviceList": createTestRunDevices,
                "operation": "start_now",
            })

            $(".schedule").attr("disabled", "disabled");
            $scope.waitMsgForSchedule = true;
            console.log(ScheduleData);
            promise = testScriptService.Schedule(ScheduleData, userId, token);
            promise.then(
                function (data) {

                    if (data.status == "error") {
                        $scope.waitMsgForSchedule = false;
                        $scope.errorMsgForSchedule = true;
                        $rootScope.errorMsgForScheduleModel = data.errorDescription;
                        $(".schedule").removeAttr("disabled");
                        $timeout(function () {
                            $scope.errorMsgForSchedule = true;
                        }, 3000);

                        $scope.dataProcessing = false;
                        $(".btn-info").removeClass("disabled");
                    }

                    if (data.status == "success") {
                        $scope.waitMsgForSchedule = false;
                        $scope.successMsgForSchedule = true;
                        $rootScope.successMsgForScheduleModel = " Test run started successfully ";
                        $timeout(function () {
                            $scope.successMsgForSchedule = false;
                        }, 3000);
                        $(".schedule").removeAttr("disabled");
                    }

                },
                function (err) {
                    $scope.dataProcessing = false;
                    $scope.waitMsgForSchedule1 = false;
                    $(".schedule").removeAttr("disabled");
                    console.log(err);
                }
            );
        }

        /* edit test plan */
        var editVirtualDevice = [];
        $scope.deviceProfileListForEdit = [];
        var deepCopyObjectForEditTestPlan = "";
        $scope.deviceProfileCounter = 0;
        var cloneCopyOfJobDevice = "";
        $scope.editTestPlan = function (row) {
            $scope.deviceProfileName = "";
            $scope.editTestPlanTab = true;
            $scope.dataProcessingForEditTestPlan = true;
            $scope.isDeviceProfileEdit = true;
            $scope.isDeviceProfileAdd = false;
            editVirtualDevice = [];
            $scope.deviceProfileListForEdit = [];
            deepCopyObjectForEditTestPlan = "";
            $scope.deviceProfileCounter = 0;
            cloneCopyOfJobDevice = "";
            $scope.tree2 = 0;
            var customerListArray = [];
            var selectedCustomersList = [];
            //load all virtual device

            promise2 = testScriptService.fetchVirtualDevices(token, userId);
            promise2.then(
                function (data) {
                    editVirtualDevice = data;
                },
                function (err) {
                    console.log(err);
                }
            );

            // fetching customer lists
            if (userId == -2) {
                promise2 = AppServices.GetCustomerListOfTestPlan(row.entity.testplanId, token);
                promise2.then(
                    function (data) {
                        $scope.selectedCustomersList = data.customerList;
                        console.log($scope.selectedCustomersList);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
                promise2 = AppServices.GetcustomerList(userId, token);
                promise2.then(function (data) {
                    $(".btn-info").addClass("disabled");
                    $scope.customerListArray = [];
                    $.map(data.customerDetails, function (item, index) {
                        var temp = {};
                        temp['customerId'] = item.customerId;
                        temp['customerName'] = item.customerName;
                        $scope.customerListArray.push(temp);
                    });
                    $scope.customers = $scope.customerListArray;
                    $scope.dataLoading = false;
                    $(".btn-info").removeClass("disabled");
                },
                function (err) {
                    $scope.dataLoading = false;
                    console.log(err);
                });
            }
            // virtual device loaded
            $scope.editTestPlanTab = true;
            // load test plan
            promise = testScriptService.getTestplan(token, userId, row.entity.testplanId);
            promise.then(
                function (data) {

                    if (data.isMappedTestPlanTestRun.length > 0) {
                        $scope.isMappedTestPlanTestRun = data.isMappedTestPlanTestRun[0].isMappedTestPlanTestRun;

                        if ($scope.isMappedTestPlanTestRun == "notExist") {
                            $scope.scrollToTestRunDiv();
                            $scope.mainTab = 2;
                            cloneCopyOfJobDevice = jQuery.extend(true, new Object(), jQuery.makeArray(data.jobVO[0]));
                            cloneCopyOfJobDevice[0].jobDeviceId = 0;

                            deepCopyObjectForEditTestPlan = jQuery.extend(true, new Object(), data);
                            for (var i = 0; i < deepCopyObjectForEditTestPlan.jobVO.length; i++) {
                                $scope.update_btn = true;
                                if (editVirtualDevice[i].id == deepCopyObjectForEditTestPlan.jobVO[i].deviceId) {
                                    editVirtualDevice.splice(i, 1);
                                }
                                var arr = jQuery.makeArray(deepCopyObjectForEditTestPlan.jobVO[i]);
                                $scope.deviceProfileListForEdit.push({
                                    'deviceProfileName': deepCopyObjectForEditTestPlan.jobVO[i].deviceProfileName,
                                    'id': deepCopyObjectForEditTestPlan.jobVO[i].deviceName,
                                    'index': $scope.deviceProfileCounter,
                                    'deviceId': deepCopyObjectForEditTestPlan.jobVO[i].deviceId,
                                    'content': arr
                                });
                                $scope.deviceProfileCounter++;
                            }
                            // for default view of tree on 0th index
                            $scope.tree2 = $scope.deviceProfileListForEdit[0].content;
                            $scope.activeProfile = 0;
                            $scope.dataProcessingForEditTestPlan = false;
                        }
                        else if ($scope.isMappedTestPlanTestRun == "isExist") {
                            $scope.errorMsg = true;
                            $scope.Message = "You can't edit, Test Plan having Test Runs!!";
                            $timeout(function () {
                                $scope.errorMsg = false;
                            }, 3000);
                            return false;
                        }
                    }


                },
                function (err) {
                    $scope.dataProcessingForEditTestPlan = false;
                    console.log(err);
                }
            );
            // loaded test plan

        }

        /**del Test Plan **/
        $scope.delTestPlan = function (row) {
            // $log.debug("Deleting Row");
            promise = testScriptService.delTestplan(token, userId, row.entity.testplanId);
            promise.then(
                function (data) {
                    if (data.status == "success") {
                        var index = $scope.TestPlanOptions.data.indexOf(row.entity);
                        $scope.TestPlanOptions.data.splice(index, 1);
                        toastr.success('Test Plan Deleted !', 'Success!')
                    } else {
                        toastr.error('Cannot able to delete !', 'Error!')
                    }
                },
                function (err) {
                    console.log(err);
                }
            );

        }

        /** add device profile **/
        $scope.addDeviceProfileToTestPlan = function (row) {
            $scope.deviceProfileName = "";
            $scope.editTestPlanTab = true;
            $scope.dataProcessingForEditTestPlan = true;
            $scope.isDeviceProfileAdd = true;
            $scope.isDeviceProfileEdit = false;
            editVirtualDevice = [];
            $scope.deviceProfileListForEdit = [];
            $scope.deviceProfileListForAdd = [];
            deepCopyObjectForEditTestPlan = "";
            $scope.deviceProfileCounter = 0;
            cloneCopyOfJobDevice = "";
            $scope.tree2 = 0;
            //load all virtual device

            promise2 = testScriptService.fetchVirtualDevices(token, userId);
            promise2.then(
                function (data) {
                    editVirtualDevice = data;
                },
                function (err) {
                    console.log(err);
                }
            );
            // virtual device loaded
            $scope.editTestPlanTab = true;
            // load test plan
            promise = testScriptService.getTestplan(token, userId, row.entity.testplanId);
            promise.then(
                function (data) {

                    if (data.isMappedTestPlanTestRun.length > 0) {
                        $scope.isMappedTestPlanTestRun = data.isMappedTestPlanTestRun[0].isMappedTestPlanTestRun;


                        $scope.scrollToTestRunDiv();
                        $scope.mainTab = 2;
                        cloneCopyOfJobDevice = jQuery.extend(true, new Object(), jQuery.makeArray(data.jobVO[0]));
                        cloneCopyOfJobDevice[0].jobDeviceId = 0;
                        deepCopyObjectForEditTestPlan = jQuery.extend(true, new Object(), data);
                        var cloneCopyOfeditVirtualDevice = [];
                        for (var i = 0; i < deepCopyObjectForEditTestPlan.jobVO.length; i++) {
                            cloneCopyOfeditVirtualDevice.push(deepCopyObjectForEditTestPlan.jobVO[i].deviceId)
                        }
                        for (var i = 0; i < cloneCopyOfeditVirtualDevice.length; i++) {
                            for (var j = 0; j < editVirtualDevice.length; j++) {
                                if (cloneCopyOfeditVirtualDevice[i] == editVirtualDevice[j].id) {
                                    editVirtualDevice.splice(j, 1);
                                    break;
                                }
                            }
                        }

                        for (var i = 0; i < deepCopyObjectForEditTestPlan.jobVO.length; i++) {

                            var arr = jQuery.makeArray(deepCopyObjectForEditTestPlan.jobVO[i]);
                            $scope.deviceProfileListForAdd.push({'deviceProfileName': deepCopyObjectForEditTestPlan.jobVO[i].deviceProfileName});
                        }

                        $scope.dataProcessingForEditTestPlan = false;
                    }


                },
                function (err) {
                    $scope.dataProcessingForEditTestPlan = false;
                    console.log(err);
                }
            );
            // loaded test plan

        }


        /** Function to add a new tab **/
        $scope.boolean = false;
        $scope.deviceProvileName = function () {
            $scope.boolean = false;
            $scope.err = false;
        };

        $scope.addTab = function () {

            if ($scope.deviceProfileListForEdit.length > 0) {
                for (var i = 0; i < $scope.deviceProfileListForEdit.length; i++) {
                    if ($scope.deviceProfileListForEdit[i].deviceProfileName == $scope.deviceProfileName) {

                        $scope.boolean = true;
                        $scope.addProfileErrorMsg = "Please provide unique profile.."
                        $scope.err = true;
                        $timeout(function () {
                            $scope.err = false;
                        }, 3000);
                    }
                }

                if ($scope.deviceProfileName == undefined || $scope.deviceProfileName == "") {
                    $scope.addProfileErrorMsg = "Blank not allowed.."
                    $scope.err = true;
                    $timeout(function () {
                        $scope.err = false;
                    }, 3000);
                    return false;
                }


                if (!$scope.boolean) {
                    var temp = {};
                    temp['deviceProfileName'] = $scope.deviceProfileName;
                    temp['id'] = editVirtualDevice[$scope.deviceProfileCounter].name;
                    temp['index'] = $scope.deviceProfileCounter;
                    temp['deviceId'] = editVirtualDevice[$scope.deviceProfileCounter].id;
                    temp['content'] = jQuery.extend(true, new Object(), cloneCopyOfJobDevice);
                    $scope.deviceProfileListForEdit.push(temp);
                    $scope.tree2 = $scope.deviceProfileListForEdit[$scope.deviceProfileCounter].content;
                    $scope.activeProfile = $scope.deviceProfileCounter;
                    $scope.deviceProfileCounter++;
                }

            } else {
                var temp = {};
                temp['deviceProfileName'] = $scope.deviceProfileName;
                temp['id'] = editVirtualDevice[$scope.deviceProfileCounter].name;
                temp['index'] = $scope.deviceProfileCounter;
                temp['deviceId'] = editVirtualDevice[$scope.deviceProfileCounter].id;
                temp['content'] = jQuery.extend(true, new Object(), cloneCopyOfJobDevice);
                $scope.deviceProfileListForEdit.push(temp);
                $scope.tree2 = $scope.deviceProfileListForEdit[$scope.deviceProfileCounter].content;
                $scope.activeProfile = $scope.deviceProfileCounter;
                $scope.deviceProfileCounter++;

            }


        }

        $scope.addTabForDeviceProfile = function () {

            if ($scope.deviceProfileListForAdd.length > 0) {
                for (var i = 0; i < $scope.deviceProfileListForAdd.length; i++) {
                    if ($scope.deviceProfileListForAdd[i].deviceProfileName == $scope.deviceProfileName) {

                        $scope.boolean = true;
                        $scope.addProfileErrorMsg = "Please provide unique profile.."
                        $scope.err = true;
                        $timeout(function () {
                            $scope.err = false;
                        }, 3000);
                    }
                }

                if ($scope.deviceProfileName == undefined || $scope.deviceProfileName == "") {
                    $scope.addProfileErrorMsg = "Blank not allowed.."
                    $scope.err = true;
                    $timeout(function () {
                        $scope.err = false;
                    }, 3000);
                    return false;
                }


                if (!$scope.boolean) {
                    $scope.deviceProfileListForAdd.push({'deviceProfileName': $scope.deviceProfileName});
                    var temp = {};
                    temp['deviceProfileName'] = $scope.deviceProfileName;
                    temp['id'] = editVirtualDevice[$scope.deviceProfileCounter].name;
                    temp['index'] = $scope.deviceProfileCounter;
                    temp['deviceId'] = editVirtualDevice[$scope.deviceProfileCounter].id;
                    temp['content'] = jQuery.extend(true, new Object(), cloneCopyOfJobDevice);
                    $scope.deviceProfileListForEdit.push(temp);
                    $scope.tree2 = $scope.deviceProfileListForEdit[$scope.deviceProfileCounter].content;
                    $scope.activeProfile = $scope.deviceProfileCounter;
                    $scope.deviceProfileCounter++;
                }

            } else {

                var temp = {};
                temp['deviceProfileName'] = $scope.deviceProfileName;
                temp['id'] = editVirtualDevice[$scope.deviceProfileCounter].name;
                temp['index'] = $scope.deviceProfileCounter;
                temp['deviceId'] = editVirtualDevice[$scope.deviceProfileCounter].id;
                temp['content'] = jQuery.extend(true, new Object(), cloneCopyOfJobDevice);
                $scope.deviceProfileListForEdit.push(temp);
                $scope.tree2 = $scope.deviceProfileListForEdit[$scope.deviceProfileCounter].content;
                $scope.activeProfile = $scope.deviceProfileCounter;
                $scope.deviceProfileListForAdd.push({'deviceProfileName': $scope.deviceProfileName});
                $scope.deviceProfileCounter++;


            }


        }

        /** Function to delete a tab **/
        $scope.removeFancyTree = function (mapping) {
            if ($scope.deviceProfileListForAdd != undefined && $scope.deviceProfileListForAdd.length > 0) {
                for (var i = 0; i < $scope.deviceProfileListForAdd.length; i++) {
                    if ($scope.deviceProfileListForAdd[i].deviceProfileName == mapping.deviceProfileName) {
                        var index = $scope.deviceProfileListForAdd.indexOf(mapping.deviceProfileName)
                        $scope.deviceProfileListForAdd.splice(index, 1);
                    }
                }

            }
            for (var i = mapping.index + 1; i < $scope.deviceProfileListForEdit.length; i++) {
                $scope.deviceProfileListForEdit[i].index = $scope.deviceProfileListForEdit[i].index - 1;
            }
            $scope.deviceProfileListForEdit.splice(mapping.index, 1);
            $scope.deviceProfileCounter--;
            //$scope.tree2 = "";
        }

        $scope.selectedTab = 0;

        /** Function to set selectedTab **/
        $scope.veiwFancyTree = function (mapping) {
            $scope.tree2 = $scope.deviceProfileListForEdit[mapping.index].content;
            $scope.activeProfile = mapping.index;

        }

        $scope.update = function () {

            $scope.dataProcessingForEditTestPlan = true;
            $(".editTestPlan").addClass("disabled");
            sendCreateData.jobDeviceVOList = [];
            sendCreateData.jobId = $scope.tree2[0].jobId;
            sendCreateData.taskId = $scope.tree2[0].taskId;
            // started for the job device

            for (var i = 0; i < $scope.deviceProfileListForEdit.length; i++) {
                sendCreateData.jobDeviceVOList[i] = {};
                sendCreateData.jobDeviceVOList[i].deviceId = $scope.deviceProfileListForEdit[i].deviceId;
                sendCreateData.jobDeviceVOList[i].deviceName = $scope.deviceProfileListForEdit[i].id;
                sendCreateData.jobDeviceVOList[i].deviceProfileName = $scope.deviceProfileListForEdit[i].deviceProfileName;
                sendCreateData.jobDeviceVOList[i].jobDeviceId = $scope.deviceProfileListForEdit[i].content[0].jobDeviceId;
                sendCreateData.jobDeviceVOList[i].jobId = $scope.deviceProfileListForEdit[i].content[0].jobId;
                sendCreateData.jobDeviceVOList[i].taskId = $scope.deviceProfileListForEdit[i].content[0].taskId;
                sendCreateData.jobDeviceVOList[i].taskLoop = $scope.deviceProfileListForEdit[i].content[0].loop;

                var superParentObject, parentObject = {}, childObject = {};
                superParentObject = $scope.deviceProfileListForEdit[i].content[0].nodes;

                for (var k = 0; k < $scope.deviceProfileListForEdit[i].content[0].nodes.length; k++) {
                    parentObject[k] = $scope.deviceProfileListForEdit[i].content[0].nodes[k].nodes;
                    childObject[k] = {};

                    for (var j = 0; j < $scope.deviceProfileListForEdit[i].content[0].nodes[k].nodes.length; j++) {
                        childObject[k][j] = $scope.deviceProfileListForEdit[i].content[0].nodes[k].nodes[j].nodes;
                    }
                }

                var superParentObjectKeys = Object.keys(superParentObject);
                sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList = [];
                for (var j = 0; j < superParentObjectKeys.length; j++) {
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j] = {};
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].taskExecutorName = superParentObject[j].title;
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].taskExecutorLoop = superParentObject[j].loop;
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].taskExecutorSeqNo = superParentObject[j].sequenceNo;
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].jobDeviceId = superParentObject[j].jobDeviceId;
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].taskExecutorId = superParentObject[j].taskExecutorId;
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].jobDeviceTaskExecutorId = superParentObject[j].jobDeviceTaskExecutorId;

                }

                var parentObjectKeys = Object.keys(parentObject);
                for (var k = 0; k < parentObjectKeys.length; k++) {
                    var childKeys = Object.keys(parentObject[parentObjectKeys[k]]);
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList = [];
                    for (var j = 0; j < childKeys.length; j++) {
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j] = {};
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j].commandExecutorName = parentObject[parentObjectKeys[k]][childKeys[j]].title;
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j].commandExecutorLoop = parentObject[parentObjectKeys[k]][childKeys[j]].loop;
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j].commandExecutorSeqNo = parentObject[parentObjectKeys[k]][childKeys[j]].sequenceNo;
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j].jobDeviceCommandExecutorId = parentObject[parentObjectKeys[k]][childKeys[j]].jobDeviceCommandExecutorId;
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j].commandExecutorId = parentObject[parentObjectKeys[k]][childKeys[j]].commandExecutorId;

                    }
                }


                var childSuperParentKeys = Object.keys(childObject);
                for (var p = 0; p < childSuperParentKeys.length; p++) {
                    var childParentKeys = Object.keys(childObject[childSuperParentKeys[p]]);
                    for (var q = 0; q < childParentKeys.length; q++) {
                        var childKeys = Object.keys(childObject[childSuperParentKeys[p]][childParentKeys[q]]);
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList = [];
                        for (var r = 0; r < childKeys.length; r++) {
                            sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r] = {};
                            sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandId;
                            sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandSeqNo = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].sequenceNo;
                            sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandParams = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandParams;
                            sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandName = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].title;
                            sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].jobDeviceCommandExecutorCommandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].jobDeviceCommandExecutorCommandId;
                            sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandExecutorCommandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandExecutorCommandId;
                        }
                    }
                }


            }
            let customerListId = [];
            for (let i = 0; i < $scope.customersValue.length; i++) {
                customerListId.push(parseInt($scope.customersValue[i]));
            }
            sendCreateData.customerListId = customerListId;

            var jsonData = JSON.stringify(sendCreateData);
            var jobDeviceId = "";
            var jobId = "";
            promise = testScriptService.updateCommandParametersJobDevice(token, userId, jsonData);

            promise.then(
                function (data) {
                    if (data.status == "Success") {
                        $scope.dataProcessingForEditTestPlan = false;
                        $scope.successMessageEditTestPlanId = true;
                        $scope.successMessageEditTestPlan = "Test plan has been updated successfully ....";
                        $timeout(function () {
                            $scope.successMessageEditTestPlanId = false;
                            $scope.editTestPlanTab = false;
                            $(".editTestPlan").removeClass("disabled");
                        }, 3000);


                    }
                    else {
                        $scope.dataProcessingForEditTestPlan = false;
                        $scope.errMessageEditTestPlanId = true;
                        $scope.errMessageEditTestPlan = "Error Occuring while updating ...";
                        $(".editTestPlan").removeClass("disabled");
                        $timeout(function () {
                            $scope.errMessageEditTestPlanId = false;
                        }, 3000);

                    }

                },
                function (err) {
                    $scope.dataProcessingForEditTestPlan = false;
                    console.log(err);
                }
            );

        }
        /* end edit test plan*/

        /* view test plan */
        $scope.viewTestPlan = function (row) {
            $scope.testPlanView = true;
            $scope.dataLoadingForTestPlanView = true;
            $scope.testPlanViewDetails = [];
            promise = testScriptService.getTestplan(token, userId, row.entity.testplanId);
            promise.then(
                function (data) {
                    $scope.dataLoadingForTestPlanView = false;

                    $scope.testCaseDetails = true;
                    $scope.commandsDetails = false;
                    $scope.testPlanView = data.jobVO[0];
                    $scope.testRunCountForTestPlan = data.isMappedTestPlanTestRun[0].testRunCountForTestPlan;
                    $scope.testRunDeviceAllocatedCount = data.isMappedTestPlanTestRun[0].testRunDeviceAllocatedCount;
                    angular.forEach($scope.testPlanView.nodes, function (children) {
                        var temp = {};
                        var i = 0;
                        $scope.testPlanViewCommandDetails = [];
                        angular.forEach(children.nodes, function (childNode) {

                            angular.forEach(childNode.nodes, function (childOfChildNode) {
                                var tempArrayForCommandGroupAndCommand = {};
                                tempArrayForCommandGroupAndCommand['commandGroupLoop'] = childNode.loop;
                                tempArrayForCommandGroupAndCommand['commandGroupName'] = childNode.title;
                                tempArrayForCommandGroupAndCommand['CommandName'] = childOfChildNode.title;
                                tempArrayForCommandGroupAndCommand['commandLoop'] = childOfChildNode.loop;
                                tempArrayForCommandGroupAndCommand['commandParams'] = childOfChildNode.commandParams;
                                tempArrayForCommandGroupAndCommand['index'] = i;
                                i++;
                                $scope.testPlanViewCommandDetails.push(tempArrayForCommandGroupAndCommand);
                            });


                        });

                        temp['node'] = $scope.testPlanViewCommandDetails;
                        temp['testCaseName'] = children.title;
                        temp['commandGroupCount'] = children.nodes.length;
                        temp['commandGroupName'] = "Command Groups";
                        temp['commandCount'] = i;
                        temp['commands'] = "Commands";
                        $scope.testPlanViewDetails.push(temp);
                    });
                },
                function (err) {
                    console.log(err);
                }
            );
        }


        $scope.viewCommands = function (listOfCommandsTemp, totalCommandsCountTemp) {
            $scope.testCaseDetails = false;
            $scope.commandsDetails = true;
            $scope.listOfCommands = [];
            $scope.totalCommandsCount = totalCommandsCountTemp;
            $scope.listOfCommands = listOfCommandsTemp;


        }

        $scope.backToTestCaseGroup = function () {
            $scope.testCaseDetails = true;
            $scope.commandsDetails = false;
        }

        /* view test plan */

        /* popover for the edit the test plan */

        $scope.createFrom = function (scope, e) {
            overrideNode = "";
            $scope.showPopover = true;
            overrideNode = scope;
            commandIndex = 0;
            var updateCommandParameters = scope.commandParams;
            $(".editable-input").empty();
            //$("#updateCommandParametersForm").append('<input type="hidden" value="'+inputFiledId+'" id="test"/>');
            updateCommandParameters.split(",").forEach(function (updateCommandParameters, i) {

                //		$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="'+updateCommandParameters+'" /></div><br/>');
                //console.log("updateCommandParameters"+updateCommandParameters);
                if (updateCommandParameters.indexOf("=") >= 0) {

                    var commandParam = updateCommandParameters.split('=');
                    commandParam[1] = commandParam[1].replace('"','\''); 
                    console.log("commandParam: " + commandParam);
                    $(".editable-input").append('<div class="editable-address form-group col-md-12"><div class="col-md-6"><input name="commandLabel[' + i + '].Name" type="text" value="' + commandParam[0] + '" class="form-control  form-control-label"/></div><div class="col-md-6"><input name="command[' + i + '].Name" type="text" value="' + commandParam[1] + '" class="form-control"/></div></div>');

                }
                //	$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="'+updateCommandParameters+'" /></div><br/>');
                commandIndex = i;
            });
            $('.popover').css("top", $(e.target).offset().top + 24);

        }

        $scope.addField = function (formID) {
//				$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="" /></div><br/>');
            commandIndex++;
            $(".editable-input").append('<div class="editable-address form-group col-md-12 "><div class="col-md-6"><input class="form-control" name="commandLabel[' + commandIndex + '].Name" type="text" value="" /></div><div class="col-md-6"><input class="form-control" name="command[' + commandIndex + '].Name" type="text" value="" /></div></div>');
            $("input[name='commandLabel[" + commandIndex + "].Name']").focus();
        }

        $scope.updateCommandParametersAction = function (formID) {
            var updatedParametrs = "";
            /*	$('#'+formID+' input').each(
             function(index){
             var input = $(this);
             if(input.attr('type')!='hidden' && input.val() !='' && input.val() != undefined)
             updatedParametrs+=input.val()+",";
             }
             );*/
            for (var index = 0; index <= commandIndex; index++) {
                if ($("input[name='commandLabel[" + index + "].Name']").val() != undefined && $("input[name='commandLabel[" + index + "].Name']").val() != '' && $("input[name='command[" + index + "].Name']").val() != undefined && $("input[name='command[" + index + "].Name']").val() != '')
                    updatedParametrs += $("input[name='commandLabel[" + index + "].Name']").val() + "=" + $("input[name='command[" + index + "].Name']").val().replace('\'','\"') + ",";
            }
            //	console.log("updatedParametrs"+updatedParametrs);
            if (overrideNode.commandParams != updatedParametrs.substring(0, updatedParametrs.length - 1)) {
                overrideNode.commandParams = updatedParametrs.substring(0, updatedParametrs.length - 1);
                $scope.isUpdatable = true;

            }
            $scope.showPopover = false;
        }

        $scope.updateCommandParametersClose = function () {
            $scope.showPopover = false;
        }
        /* end popover */

        //Real Devices
        $scope.RealDevicesOptionsForQuickRun = {
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            enableRowSelection: true,  // for selection
            enableColumnMenus: false, //to hide ascending and descending column menu names
            enableRowHeaderSelection: false, // this is for check box to appear on grid options
            enableFiltering: false,
            enableGridMenu: false,		// for searching
            multiSelect: true,
            enableScrollbars: false,
            enableVerticalScrollbar: 3,
            enableHorizontalScrollbar: 0,
            columnDefs: [
                {field: 'deviceId', name: 'Id', headerCellClass: $scope.highlightFilteredHeader, width: "20%"},
                {
                    field: 'deviceName',
                    name: 'Name',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "20%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.deviceName + '';
                    }
                },
                {
                    field: 'msisdn',
                    name: 'MSISDN',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "30%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.msisdn + '';
                    }
                },
                //{field: 'region', name: 'city', headerCellClass: $scope.highlightFilteredHeader},
                //{field: 'model', name: 'Model', headerCellClass: $scope.highlightFilteredHeader},
                //{field: 'network', name: 'network', headerCellClass: $scope.highlightFilteredHeader},
                {
                    field: 'manufacturer',
                    name: 'manufacturer',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: "25%",
                    cellTooltip: function (row, col) {
                        return '' + row.entity.manufacturer + '';
                    }
                },
            ]
        };


        $scope.singleFilterForQuickRunRealDevices = function () {
            $scope.RealDevicesOptionsForQuickRun.data = $filter('filter')($scope.tempRealDeviceListForQuickRun, $scope.searchTextForQuickRunRealDevices, undefined);

        };
        promise = testScriptService.getRealDevices(token, userId);
        $(".quickRun").addClass("disabled");
        promise.then(
            function (data) {
                $(".quickRun").removeClass("disabled");
                $scope.RealDevicesOptionsForQuickRun.data = data.devicesList;
                $scope.tempRealDeviceListForQuickRun = data.devicesList;
            },
            function (err) {
                console.log(err);
            }
        );

        $scope.CreateQuickTestrun = function () {

            if (quickRunRealDevices.length < 1) {
                $scope.errorMsgForDevice = true;
                $rootScope.msg = "Please select device.. ";
                $timeout(function () {
                    $scope.errorMsgForDevice = false;
                }, 3000);
                $(".btn").removeClass("disabled");
                return false;
            }

            $scope.CreateTestRun_Data = JSON.stringify({
                "testplanVo": {"testplanId": $scope.quickTestPlanId},
                "jobVo": {},
                "virtualRealDeviceList": quickRunRealDevices
            });


            var TestRunData = $scope.CreateTestRun_Data;
            promise = testScriptService.CreateTestRun(TestRunData, token, userId);
            promise.then(
                function (data) {
                    var DependantTestRunName = data.NewTestRun.jobName;
                    Devices = [];
                    notificationTypes = [];
                    //Get devices service
                    $scope.testRunIdShcedule = data.NewTestRun.jobId;
                    $scope.TestRunName = data.NewTestRun.jobName;
                    $scope.jobTemplateDescription = data.NewTestRun.jobDescription;


                    $rootScope.jobId = data.NewTestRun.jobId;
                    for (var i = 0; i < quickRunRealDevices.length; i++) {
                        Devices.push(quickRunRealDevices[i].realDeviceId);
                        notificationTypes.push("PACKET");
                    }
                    // call re-start API
                    $scope.reStartJob();

                    promise = testScriptService.getAllTestRunsForSchedule(token, userId);
                    promise.then(
                        function (data) {
                            $scope.loadAllTestRuns = false;
                            $scope.hideFilter = true;
                            $scope.allTestRuns.data = [];
                            $scope.allTestRunsTemp = data.testRunsForTestPlan
                            $scope.allTestRuns.data = $scope.allTestRunsTemp;
                            $scope.searchTestRuns = $scope.allTestRunsTemp;
                        },
                        function (err) {
                            console.log(err);
                        }
                    );


                },
                function (err) {
                    console.log(err);
                }
            );

        }

        $scope.RealDevicesOptionsForQuickRun.onRegisterApi = function (gridApi) {
            $scope.gridApi1 = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.isUniqueDevice = false;
                if ($scope.quickTestPlanId == undefined || $scope.quickTestPlanId == "") {
                    $scope.errorMsgForDevice = true;
                    row.isSelected = false;
                    $scope.msg = "Please Select Test Plan!!"
                    return false;
                }
                if (row.isSelected && $scope.quickTestPlanId != undefined && $scope.quickRunDeviceId != undefined) {
                    if (quickRunRealDevices.length > 0) {
                        for (var i = 0; i < quickRunRealDevices.length; i++) {
                            if (quickRunRealDevices[i].realDeviceId == row.entity.deviceId) {
                                $scope.isUniqueDevice = true;
                                break;
                            }
                        }
                        if (!$scope.isUniqueDevice) {
                            quickRunRealDevices.push({
                                'testplanId': $scope.quickTestPlanId,
                                'testrunId': 0,
                                'virtualDeviceId': $scope.quickRunDeviceId,
                                'realDeviceId': row.entity.deviceId,
                            });
                        }

                    } else {
                        quickRunRealDevices.push({
                            'testplanId': $scope.quickTestPlanId,
                            'testrunId': 0,
                            'virtualDeviceId': $scope.quickRunDeviceId,
                            'realDeviceId': row.entity.deviceId,
                        });
                    }


                } else {
                    for (var i = 0; i < quickRunRealDevices.length; i++) {
                        if (quickRunRealDevices[i].realDeviceId == row.entity.deviceId) {
                            quickRunRealDevices.splice(i, 1);
                        }
                    }

                }
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
        };


    });

	
		
		
    

