oTech.controller('draftTestPlan',
    function ($scope, $rootScope, $timeout, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, $q, uiGridConstants, $cookieStore, $filter, $templateCache, toastr, messages) {
        var userId = sessionStorage.getItem("userId");
        var token = sessionStorage.getItem("token");
        $scope.name = sessionStorage.getItem("username");
        $rootScope.role = sessionStorage.getItem("role");
        console.log('Role: ' + $rootScope.role)
        $scope.createTestPlan = {};
        var sendCreateData = {};
        $scope.testRunIdForDelete = "";
        $scope.update_btn=false;
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


        $scope.DraftTestPlanOptions = {
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
                    '<li ng-click="grid.appScope.editDraftTestplan(row);"><a><i class="icon-copy4 text-primary"></i> Edit Test Plan</a></li>' +
                    '</ul>' +
                    '</li>' +
                    '</ul>'
                },

            ],

        };

        $scope.DraftTestPlanOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.edit.on.afterCellEdit($scope, $scope.saveRow, this);
        };
        
        //Test plan table Service
        promise = testScriptService.FetchingDraftTestService(userId, token);
        promise.then(
            function (data) {
                console.log(data);
                $scope.totalRecords = data.length;
                allOfTheData = data;
                $scope.DraftTestPlanOptions.data = data.slice(0, $scope.itemsPerPage);

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
            var dataCount = $scope.DraftTestPlanOptions.data.length;
            gridHeight = ($scope.DraftTestPlanOptions.data.length * rowHeight + headerHeight + footerPage);
            //$(".ui-grid-viewport").css("height",gridHeight-headerHeight);
            //$(".")
            return {
                height: gridHeight + "px"
            };
        };


        $scope.createNewDatasource = function () {
            $scope.DraftTestPlanOptions.data = allOfTheData.slice(startLimit, $scope.endLimit);
        }

        $scope.singleFilter = function () {
            $scope.DraftTestPlanOptions.data = $filter('filter')(allOfTheData, $scope.searchText, undefined);
            $scope.DraftTestPlanOptions.data = $scope.DraftTestPlanOptions.data.slice(0, $scope.endLimit);

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
        
        $scope.editDraftTestplan = function (row) {
        	           
            $scope.dataProcessingTestPlan = true;
            promise = testScriptService.editDraftTestplan(token, userId, row.entity.testplanId);
            promise.then(
                function (data) {
                	
                	$scope.shareData = [];									
                    $scope.shareData.push({'key': 'treeJson', 'value': data.editedDraftTestPlan.taskVOList});
                    $scope.shareData.push({'key': 'testPlanName', 'value': data.editedDraftTestPlan.jobName});
                    $scope.shareData.push({'key': 'testPlanDescription', 'value': data.editedDraftTestPlan.jobDescription});
                    $scope.shareData.push({'key': 'usecaseId', 'value': data.editedDraftTestPlan.useCaseId});
                    $scope.shareData.push({'key': 'useCaseName', 'value': data.editedDraftTestPlan.useCaseName});
                    $scope.shareData.push({'key': 'jobId', 'value': data.editedDraftTestPlan.jobId});
                    
                    if (messages.length == 1) {
                        messages.splice(0, 1);
                    }

                    messages.add($scope.shareData);
                   
                	$location.path('/dashboard/editDraftTestPlan');
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
                    $scope.DraftTestPlanOptions.data = [];
                    $scope.DraftTestPlanOptions.data = data.slice(0, $scope.itemsPerPage);
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

          
 });

	
		
		
    

