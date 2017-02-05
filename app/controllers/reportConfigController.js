oTech.controller('ReportConfigController',
    function ($scope, $rootScope, $location, AppServices, $stateParams) {
        //Controller Initialization
        var token = sessionStorage.token;
        var userId = sessionStorage.userId;
        var pwd, matchingPwd;
        var table = "";
        $rootScope.slideContent();
        window.onresize = function (event) {
            $rootScope.slideContent();
        };
        $scope.name = sessionStorage.getItem("username");
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

        //Default Setting of View
        $scope.dataLoadingImage = oApp.config.loadingImageName;
        $scope.getTableHeight = function () {
            var rowHeight = 40; // your row height
            var headerHeight = 44; // your header height
            var footerPage = 10;
            var gridHeight = 0;
            var dataCount = $scope.reportConfigGridOptions.data.length;
            gridHeight = ((dataCount * rowHeight) + headerHeight + footerPage);
           // $(".ui-grid-viewport").css("height", gridHeight - headerHeight);
            //$(".ui-grid-menu-mid").css("height", "450px;");
            //$(".")
            return {
                height: gridHeight + "px"
            };
        };
        $scope.singleFilterForDM = function () {
            $scope.devicesMeasurementGridOptions.data = $filter('filter')(allOfTheData, $scope.searchText, undefined);
            $scope.devicesMeasurementGridOptions.data = $scope.devicesMeasurementGridOptions.data.slice(0, $scope.endLimit);
        }

        //Set Tables List Here
        $scope.devices = {
            "getDeviceMarketConfig": "Device Market Mapping",
            "getGeoMarketConfig": "Geo Market Mapping",
            "getVQTBoxData": "VQT Configuration",
            "getL1Config": "L1 Timezone Configuration",
            "getDevicesTimeZoneOffset": "Device Timezone Configuration"
        };

        //Table Setting Here
        $scope.reportConfigGridOptions = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableSorting: true,
            enableFilter: false,
            enableColResize: true,
            enableRowSelection: false,  // for selection
            enableColumnMenus: true, //to hide ascending and descending colomn menu names
            enableRowHeaderSelection: false, // this is for check box to appear on grid options
            enableFiltering: false,
            enableGridMenu: true,		// for searching
            multiSelect: false,
            enableScrollbars: true,
            enableVerticalScrollbar: 3,
            enableHorizontalScrollbar: 0,
        };


        //Methods of Controller
        //Populate Data and change column Defs on basis of Table name
        $scope.showData = function (table) {
            //Show Data Loader
            $("#dataLoadingDM").show();
            $scope.reportConfigGridOptions.data = [];
            if (table == "getDeviceMarketConfig")
                $scope.reportConfigGridOptions.columnDefs = oApp.config.columnDefdeviceMarketConfig;
            if (table == "getGeoMarketConfig")
                $scope.reportConfigGridOptions.columnDefs = oApp.config.columnDefgeoMarketConfig;
            if (table == "getVQTBoxData")
                $scope.reportConfigGridOptions.columnDefs = oApp.config.columnDefVQTBoxTable;
            if (table == "getL1Config")
                $scope.reportConfigGridOptions.columnDefs = oApp.config.columnDefL1Config;
            if (table == "getDevicesTimeZoneOffset")
                $scope.reportConfigGridOptions.columnDefs = oApp.config.columnDefDeviceTimeZoneOffset;
            promise = AppServices.GetReportData(userId,
                token, 0, 0, table);
            promise.then(function (data) {
                $scope.err = false;
                $scope.totalRecords = data.totalRecords;
                $scope.reportConfigGridOptions.data = data.records;
                //Hide page Loader
                $("#dataLoadingDM").hide();
            }, function (err) {
                $scope.err = true;
                //Hide page Loader
                $("#dataLoadingDM").hide();
                console.log(err);
            });
        };

        //Table Pagination

        $scope.itemsPerPage = 10;
        $scope.currentPage = 0;
        $scope.endLimit = $scope.itemsPerPage;
        var allOfTheData;
        $scope.totalRecords = 0;

        $scope.reset = function () {
            $scope.currentPage = 0;
            allOfTheData = "";
            $scope.totalRecords = 0;
            $scope.endLimit = $scope.itemsPerPage;
        }

        $scope.range = function () {
            var rangeSize = 6;
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
            return $scope.currentPage === 0 ? "disabled" : "";
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
            $scope.showData(table);
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
            $scope.showData(table);
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
            $scope.showData(table);
            $scope.currentPage = n;
        };

        //On Document Ready
        $(document).ready(function () {
            $scope.showData("getDeviceMarketConfig");
            table="getDeviceMarketConfig";
        });

        $scope.openDevicedata = function (id, value) {
            table = id
            $scope.listItem = value;
            $scope.showData(table);
        }
        $('#category').change(function () {
            $scope.openDevicedata($(this).val(), $("#category option:selected").text());
        });

    });