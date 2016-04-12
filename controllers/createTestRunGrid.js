oTech.controller('createTestRunGridController',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, uiGridConstants, $cookieStore, $timeout) {

        var userId = sessionStorage.getItem('userId');
        var token = sessionStorage.getItem('token');
        $rootScope.role = sessionStorage.getItem("role");

        var TestPlanId = $cookieStore.get('TestPLANId');

        $scope.TestPlanId = TestPlanId;
        $scope.TestplanName = $cookieStore.get('TestplanName');
        var TestRunName = $cookieStore.get('DependantTestRunName');
        $cookieStore.remove('TestRunName');
        $scope.TestRunName = $cookieStore.get('TestRunName');
        $scope.VirtualSelectedName = $cookieStore.get('VirtualDeviceNamesel');

        $scope.testRunName = $cookieStore.get('TestRunName');
        var TestRunSelectedData = $cookieStore.get('TestRunGridData');
        $scope.TestplanName = $cookieStore.get('TestplanName');
        var deviceId = $cookieStore.get('JobDeviceId');

        promise = testScriptService.getTestRunDependantData(token, TestRunName, userId);
        promise.then(
            function (data) {
                $scope.CreateTestRunVirtualDeviceOptions.data = [data.testRunDependantData];
                console.log($scope.CreateTestRunVirtualDeviceOptions.data)
            },
            function (err) {
                console.log(err);
            }
        );


        $rootScope.slideContent();
        window.onresize = function (event) {
            $rootScope.slideContent();
        };

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


//Create Test Run Virtual Device
        $scope.CreateTestRunVirtualDeviceOptions = {
            enableColumnResize: true,
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {field: 'jobId', name: 'Test Run Id', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'jobName', name: 'Test Run Name', headerCellClass: $scope.highlightFilteredHeader},
                {
                    field: 'jobDescription',
                    name: 'Test Run Description',
                    headerCellClass: $scope.highlightFilteredHeader
                },
                {
                    field: 'jobCreateDate',
                    name: 'Test Run Created Date',
                    headerCellClass: $scope.highlightFilteredHeader
                },
            ]
        };

        //Get Devices grid
        $scope.CreateTestRunRealDeviceOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {field: 'deviceId', name: 'Device ID', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceName', name: 'Device Name', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceMsisdn', name: ' MSISDN', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceManufacturer', name: ' Manufacturer', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'devcieImei', name: ' IMEI', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };


        $scope.CreateTestRunVirtualDeviceOptions.onRegisterApi = function (gridApi) {

            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $rootScope.RowCreateTestRunVirtualDevice = row.entity;
//                    console.log("Row Selection: " + JSON.stringify(row.entity))
                $scope.TestRunName = row.entity.jobName;
                $cookieStore.put('TestRunName', $scope.TestRunName);
                $cookieStore.put('TestRunDescription', row.entity.jobDescription);
                var testrunID = row.entity.jobId;
                $cookieStore.put('TestRunId', testrunID);
//

                var testrunID = $cookieStore.get('TestRunId');
                //Get devices service
                promise = testScriptService.ViewTestRunDeviceService(userId, token, testrunID);
                promise.then(
                    function (data) {

                        console.log(JSON.stringify(data.testRunDeviceData));
                        $scope.CreateTestRunRealDeviceOptions.data = data.testRunDeviceData;


                    },
                    function (err) {
                        console.log(err);
                    }
                );
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {


            });
        };


        $scope.CreateTestRunRealDeviceOptions.onRegisterApi = function (gridApi) {

            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $rootScope.RowCreateTestRunRealDevice = row.entity;
                console.log(row.entity);
                var selectdata = row.entity.testrunId;
                console.log(JSON.stringify(row.entity));
                $cookieStore.put('JobDeviceId', row.entity.deviceId);
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {


            });
        };


        //Schedule virtual Devices
        $scope.ScheduleVirtualDevices = {
            enableColumnResize: true,
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {field: 'testrunId', name: 'Test Run Id', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'testrunName', name: 'Test Run Name', headerCellClass: $scope.highlightFilteredHeader},
                {
                    field: 'testrunDescription',
                    name: 'Test Run Description',
                    headerCellClass: $scope.highlightFilteredHeader
                },
                {
                    field: 'testrunCreatedDate',
                    name: 'Test Run Created Date',
                    headerCellClass: $scope.highlightFilteredHeader
                },
            ]
        };
        $scope.ScheduleRealDevices = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {field: 'deviceId', name: 'Device ID', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceName', name: 'Device Name', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceMsisdn', name: ' MSISDN', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceManufacturer', name: ' Manufacturer', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'devcieImei', name: ' IMEI', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };

        promise = testScriptService.getAllTestRunsForSchedule(token, userId);
        promise.then(
            function (data) {
                console.log(JSON.stringify(data));
                $scope.ScheduleVirtualDevices.data = data.testRunsForTestPlan;
//                        console.log($scope.CreateTestRunVirtualDeviceOptions.data)
            },
            function (err) {
                console.log(err);
            }
        );

        $scope.ScheduleVirtualDevices.onRegisterApi = function (gridApi) {

            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $rootScope.RowScheduleVirtual = row.entity;
                $scope.TestRunName = row.entity.testrunName;
                $cookieStore.put('TestRunName', $scope.TestRunName);
                $cookieStore.put('TestRunDescription', row.entity.testrunDescription);
                var testrunID = row.entity.testrunId;
                $cookieStore.put('TestRunId', testrunID);
                var testrunID = $cookieStore.get('TestRunId');

                //Get devices service
                promise = testScriptService.ViewTestRunDeviceService(userId, token, testrunID);
                promise.then(
                    function (data) {

                        console.log(JSON.stringify(data.testRunDeviceData));
                        $scope.ScheduleRealDevices.data = data.testRunDeviceData;


                    },
                    function (err) {
                        console.log(err);
                    }
                );


            });

            $scope.ScheduleRealDevices.onRegisterApi = function (gridApi) {

                //set gridApi on scope
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $rootScope.RowScheduleReal = row.entity;
                    var selectdata = row.entity.testrunId;
                    console.log(JSON.stringify(row.entity));
                    $cookieStore.put('JobDeviceId', row.entity.deviceId);

                });

                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {


                });
            };

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {


            });
        };

        $scope.Schedule = function () {
            if ($rootScope.RowScheduleVirtual != null && $rootScope.RowScheduleReal != null) {
                $location.path('/Schedule/CreateTestRunSchedule')
            }
            else {
                $rootScope.Message = "Please Select Devices";
                $('#MessageColor').css("color", "red");
                console.log($('#MessageColor').css("color", "red"))
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }
        }
        $scope.ScheduleNext = function () {
            if ($rootScope.RowCreateTestRunVirtualDevice != null && $rootScope.RowCreateTestRunRealDevice != null) {
                $location.path('/CreateTestRun/MappingTestRun/MappingDevices/createTestRunScheduleSel/CreateTestRunSchedule');
            }
            else {
                $rootScope.Message = "Please Select Devices";
                $('#MessageColor').css("color", "red");
                console.log($('#MessageColor').css("color", "red"))
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }


        }

    });




