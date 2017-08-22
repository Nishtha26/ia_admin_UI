oTech.controller('ReportConfigController',
    function ($scope, $rootScope, $location, AppServices, $stateParams, $uibModal, $log) {
        //Controller Initialization
        var token = sessionStorage.token;
        var userId = sessionStorage.userId;
        var pwd, matchingPwd;
        var table = "";
        $scope.msg = {};
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
            "getDevicesTimeZoneOffset": "Device Timezone Configuration",
            "getAlertHBDeviceDetails": "Alert Configuration",
            "getTabDashboardConfig": "Tableau Email Reporter",
            "getMarketBuildConfig": "Market Building Config",
            "getTWCJobTestType": "Job config",
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
        $scope.reportConfigGridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {

                $scope.msg.lastCellEdited = 'Column: ' + colDef.name +
                    ', New Value: ' + newValue + ', Old Value: ' + oldValue;
                $scope.editRow(rowEntity, colDef, newValue, oldValue);
                $scope.$apply();
            });

        };

        //Methods of Controller
        //Populate Data and change column Defs on basis of Table name
        //get current Selected Table Name
        $scope.getCurrentTableDisplayName = function () {
            return $("#category option:selected").text();
        };
        $scope.getCurrentTableName = function () {
            return $("#category").val();
        };

        $scope.getCurrentTableDef = function () {
            var table = $("#category").val();
            var columnDef = {};
            if (table == "getDeviceMarketConfig")
                columnDef = oApp.config.columnDefdeviceMarketConfig;
            if (table == "getGeoMarketConfig")
                columnDef = oApp.config.columnDefgeoMarketConfig;
            if (table == "getVQTBoxData")
                columnDef = oApp.config.columnDefVQTBoxTable;
            if (table == "getL1Config")
                columnDef = oApp.config.columnDefL1Config;
            if (table == "getDevicesTimeZoneOffset")
                columnDef = oApp.config.columnDefDeviceTimeZoneOffset;
            if (table == "getAlertHBDeviceDetails")
                columnDef = oApp.config.columnDefAlertHBDevice;
            if (table == "getTabDashboardConfig")
                columnDef = oApp.config.columnDefTabDashboardConfig;
            if (table == "getMarketBuildConfig")
                columnDef = oApp.config.columnDefMarketBuildingConfig;
            if (table == "getTWCJobTestType")
                columnDef = oApp.config.columnDefTWCJobTestType;
            return columnDef
        };

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
            if (table == "getAlertHBDeviceDetails")
                $scope.reportConfigGridOptions.columnDefs = oApp.config.columnDefAlertHBDevice;
            if (table == "getTabDashboardConfig")
                $scope.reportConfigGridOptions.columnDefs = oApp.config.columnDefTabDashboardConfig;
            if (table == "getMarketBuildConfig")
                $scope.reportConfigGridOptions.columnDefs = oApp.config.columnDefMarketBuildingConfig;
            if (table == "getTWCJobTestType")
                $scope.reportConfigGridOptions.columnDefs = oApp.config.columnDefTWCJobTestType;
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
            table = "getDeviceMarketConfig";
        });

        $scope.openDevicedata = function (id, value) {
            table = id
            $scope.listItem = value;
            $scope.showData(table);
        }
        $('#category').change(function () {
            $scope.openDevicedata($(this).val(), $("#category option:selected").text());
        });

        //open Modal
        $scope.modal = {};
        $scope.openModal = function () {
            modal = $uibModal.open({
                templateUrl: 'editTableModal.html',
                scope: $scope
            });

            $scope.modalInstance = modal;
            $scope.modal.title = $scope.getCurrentTableDisplayName();
            $scope.modal.fields = $scope.getCurrentTableDef();

            return modal.result
        };


        $scope.modalPopupTrigger = function () {
            $scope.modalPopup()
                .then(function (data) {
                    $scope.handleSuccess(data);
                })
                .then(null, function (reason) {
                    $scope.handleDismiss(reason);
                });
        };

        $scope.save = function () {
            var jsonArray = $("form#addRowForm").serializeArray();
            var result = {};
            for (var i in jsonArray) {
                var name = jsonArray[i].name;
                var value = jsonArray[i].value;
                result[name] = value;
            }
            var tableName = $scope.getCurrentTableName();
            $scope.saveData(tableName.replace("get", "add"), JSON.stringify(result),token);
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('Cancelled')
        };

        //Send Data to Server
        $scope.saveData = function (table, json,token) {
            $("#dataLoadingDM").show();
            promise = AppServices.addRow(table, json,token);
            promise.then(function (data) {
                $scope.err = false;
                $log.info(json);
                $scope.reportConfigGridOptions.data.push(JSON.parse(json));
                $log.info(JSON.stringify(data));
                //Hide page Loader
                $("#dataLoadingDM").hide();
            }, function (err) {
                $scope.err = true;
                //Hide page Loader
                $("#dataLoadingDM").hide();
                console.log(err);
            });
            $scope.modalInstance.close('Saving Data !');
        }

        //Del Popup
        $scope.delPopup = function (row) {
            modal = $uibModal.open({
                templateUrl: 'delPopup.html',
                scope: $scope
            });

            $scope.modalInstance = modal;
            $scope.modal.row = row;
            return modal.result
        }

        //Del Row
        $scope.delRow = function (row,token) {
            var table = $scope.getCurrentTableName();
            var json = {};
            if (table == "getDeviceMarketConfig") {
                json["projectName"] = row.entity.projectName;
                json["marketName"] = row.entity.marketName;
                json["deviceId"] = row.entity.deviceId;
                json["jobId"] = row.entity.jobId;
            }
            if (table == "getGeoMarketConfig") {
                json["id"] = row.entity.id;
            }
            if (table == "getVQTBoxData") {
                json["a"] = row.entity.a;
                json["a1"] = row.entity.a1;
                json["active"] = row.entity.active;
                json["b"] = row.entity.b;
                json["b1"] = row.entity.b1;
                json["configuration"] = row.entity.configuration;
                json["host_url"] = row.entity.host_url;
                json["jobId"] = row.entity.jobId;
            }
            if (table == "getL1Config") {
                json["deviceId"] = row.entity.deviceId;
            }
            if (table == "getDevicesTimeZoneOffset") {
                json["deviceId"] = row.entity.deviceId;
            }
            if (table == "getAlertHBDeviceDetails") {
                json["deviceId"] = row.entity.deviceId;
            }
            if (table == "getTabDashboardConfig") {
                json["id"] = row.entity.id;
            }
            if (table == "getMarketBuildConfig") {
                json["buildingName"] = row.entity.buildingName;
                json["marketName"] = row.entity.buildingName;
                json["lat"] = row.entity.lat;
                json["lng"] = row.entity.lng;
            }
            if (table == "getTWCJobTestType") {
                json["jobId"] = row.entity.jobId;
                json["testType"] = row.entity.testType;
            }
            $("#dataLoadingDM").show();
            table = table.replace("get", "del");
            //Dismiss Modal
            $scope.modalInstance.dismiss('Cancelled')
            promise = AppServices.delRow(table, JSON.stringify(json),token);
            promise.then(function (data) {
                $scope.err = false;
                $log.info(JSON.stringify(data));
                var index = $scope.reportConfigGridOptions.data.indexOf(row.entity);
                $scope.reportConfigGridOptions.data.splice(index, 1);
                //Hide page Loader
                $("#dataLoadingDM").hide();
            }, function (err) {
                $scope.err = true;
                //Hide page Loader
                $("#dataLoadingDM").hide();
                console.log(err);
            });
        }

        //Update Row
        $scope.editRow = function (rowEntity, colDef, newValue, oldValue) {
            var table = $scope.getCurrentTableName();
            var json = {};
            if (table == "getDeviceMarketConfig") {
                var result = {};
                json["projectName"] = rowEntity.projectName;
                json["marketName"] = rowEntity.marketName;
                json["deviceId"] = rowEntity.deviceId;
                json["deviceName"] = rowEntity.deviceName;
                json["jobId"] = rowEntity.jobId;
                json["deviceRole"] = rowEntity.deviceRole;
                json["timeZoneOffset"] = rowEntity.timeZoneOffset;
                json["groupName"] = rowEntity.groupName;
                json["startTime"] = rowEntity.startTime;
                json["endTime"] = rowEntity.endTime;
                json["operator"] = rowEntity.operator;
                json["pairedOperator"] = rowEntity.pairedOperator;
                json["kpiGroup"] = rowEntity.kpiGroup;
                json["testAreaSubset"] = rowEntity.testAreaSubset;
                result["new"] = Object.assign({}, json);
                json[colDef.name] = oldValue;
                result["old"] = Object.assign({}, json);
                json = result;
            }
            if (table == "getGeoMarketConfig") {
                json["id"] = rowEntity.id;
                json["projectName"] = rowEntity.projectName;
                json["marketName"] = rowEntity.marketName;
                json["x_param_min"] = rowEntity.x_param_min;
                json["x_param_max"] = rowEntity.x_param_max;
                json["y_param_min"] = rowEntity.y_param_min;
                json["y_param_max"] = rowEntity.y_param_max;
                json["x_param_center"] = rowEntity.x_param_center;
                json["y_param_center"] = rowEntity.y_param_center;
                json["zoom"] = rowEntity.zoom;
            }
            if (table == "getVQTBoxData") {
                var result = {};
                json["a"] = rowEntity.a;
                json["a1"] = rowEntity.a1;
                json["active"] = rowEntity.active;
                json["b"] = rowEntity.b;
                json["b1"] = rowEntity.b1;
                json["configuration"] = rowEntity.configuration;
                json["host_url"] = rowEntity.host_url;
                json["jobId"] = rowEntity.jobId;
                result["new"] = Object.assign({}, json);
                json[colDef.name] = oldValue;
                result["old"] = Object.assign({}, json);
                json = result;
            }
            if (table == "getL1Config") {
                json["deviceId"] = rowEntity.deviceId;
                json["timeZone"] = rowEntity.timeZone;
                json["timeZoneOffset"] = rowEntity.timeZoneOffset;
            }
            if (table == "getDevicesTimeZoneOffset") {
                json["deviceId"] = rowEntity.deviceId;
                json["timeZone"] = rowEntity.timeZone;
                json["timeZoneOffset"] = rowEntity.timeZoneOffset;
            }
            if (table == "getAlertHBDeviceDetails") {
                json["deviceId"] = rowEntity.deviceId;
                json["deviceName"] = rowEntity.deviceName;
                json["operator"] = rowEntity.operator;
                json["networkType"] = rowEntity.networkType;
                json["description"] = rowEntity.description;
                json["xParam"] = rowEntity.xParam;
                json["yParam"] = rowEntity.yParam;
                json["moving"] = rowEntity.moving;
                json["highlight"] = rowEntity.highlight;
                json["voice"] = rowEntity.voice;
                json["data"] = rowEntity.data;
                json["vqt"] = rowEntity.vqt;
                json["gsm"] = rowEntity.gsm;
                json["location"] = rowEntity.location;
                json["wifi"] = rowEntity.wifi;
                json["heartbeat"] = rowEntity.heartbeat;
            }
            if (table == "getTabDashboardConfig") {
                json["id"] = rowEntity.id;
                json["dashboardName"] = rowEntity.dashboardName;
                json["dashboardURL"] = rowEntity.dashboardURL;
                json["notifyURL"] = rowEntity.notifyURL;
                json["printFlag"] = rowEntity.printFlag;
            }

            if (table == "getMarketBuildConfig") {
                var result = {};
                json["buildingName"] = rowEntity.buildingName;
                json["marketName"] = rowEntity.buildingName;
                json["lat"] = rowEntity.lat;
                json["lng"] = rowEntity.lng;
                result["new"] = Object.assign({}, json);
                json[colDef.name] = oldValue;
                result["old"] = Object.assign({}, json);
                json = result;
            }

            if (table == "getTWCJobTestType") {
                var result = {};
                json["testType"] = rowEntity.testType;
                json["jobId"] = rowEntity.jobId;
                result["new"] = Object.assign({}, json);
                json[colDef.name] = oldValue;
                result["old"] = Object.assign({}, json);
                json = result;
            }
            $("#dataLoadingDM").show();
            table = table.replace("get", "update");
            promise = AppServices.updateRow(table, JSON.stringify(json),token);
            promise.then(function (data) {
                $scope.err = false;
                $log.info(JSON.stringify(data));
                //Hide page Loader
                $("#dataLoadingDM").hide();
            }, function (err) {
                $scope.err = true;
                //Hide page Loader
                $("#dataLoadingDM").hide();
                console.log(err);
            });
        }
    }
);