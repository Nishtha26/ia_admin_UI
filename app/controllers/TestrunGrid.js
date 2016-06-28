oTech.controller('TestRunGrids',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, uiGridConstants, $cookieStore, $timeout) {

        var userId = sessionStorage.getItem('userId');
        var token = sessionStorage.getItem('token');
        var TestPlanId = $cookieStore.get('TestPLANId');
        var TestRunName = $cookieStore.get('TestRunName');
		var TestRunId = $cookieStore.get('TestRunId');
		$scope.TestRunId = $cookieStore.get('TestRunId');
        $scope.TestRunName = $cookieStore.get('TestRunName');
        $scope.VirtualSelectedName = $cookieStore.get('VirtualDeviceNamesel');
        $scope.testRunName = $cookieStore.get('TestRunName');
        var TestRunSelectedData = $cookieStore.get('TestRunGridData');
        $rootScope.role = sessionStorage.getItem("role");
		var TestRunID = $cookieStore.get('TestRuId');
		$scope.TestRuId = TestRunID;


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


        console.log("DAta: " + JSON.stringify(TestRunSelectedData))

        $scope.gridOptions = {
            data: [TestRunSelectedData],
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
        //Get Devices grid
        $scope.gridOptions2 = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {field: 'deviceId', name: 'Device ID', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceName', name: 'Device Name', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceMsisdn', name: ' MSISDN', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceManufacturer', name: ' Manufacturer', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'devcieImei', name: ' IMIE', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };

        //Row selection For testrun id
        $scope.gridOptions.onRegisterApi = function (gridApi) {

            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $rootScope.grid1Row = row.entity;
                $scope.TestRunName = row.entity.testrunName;
                $cookieStore.put('TestRunName', $scope.TestRunName);
                $cookieStore.put('TestRunDescription', row.entity.testrunDescription);
                console.log(row.entity.testrunDescription)
                var testrunID = row.entity.testrunId;
                $cookieStore.put('TestRunId', testrunID);

                var testrunID = $cookieStore.get('TestRunId');
                //Get devices service
                promise = testScriptService.ViewTestRunDeviceService(userId, token, testrunID);
                promise.then(
                    function (data) {
                        $scope.gridOptions2.data = data.testRunDeviceData;
                    },
                    function (err) {
                        console.log(err);
                    }
                );


            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {


            });
        };
        $scope.gridOptions2.onRegisterApi = function (gridApi) {

            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $rootScope.Rowgrid2 = row.entity;
                var selectdata = row.entity.testrunId;
				
                console.log(JSON.stringify(row.entity))
                $cookieStore.put('JobDeviceId', row.entity.deviceId);
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {


            });
        };


        $scope.ScheduleTestrunNext = function () {
            if ($rootScope.grid1Row != null && $rootScope.Rowgrid2 != null) {
                $location.path('/TestRunSelect/editCommandParameters/TestRunforTestplans/TestRunSchedule');
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
                {field: 'jobStartDate', name: 'Test Run Created Date', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };

        promise = testScriptService.getTestRunDependantData(token, TestRunName, userId);
        promise.then(
            function (data) {
                $scope.CreateTestRunVirtualDeviceOptions.data = data;
                console.log("Fetch Test Plan: " + JSON.stringify(data))
                sessionStorage.setItem('TestplanId', data.testplanId);
            },
            function (err) {
                console.log(err);
            }
        );

        $scope.CreateTestRunVirtualDeviceOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var testrunID = $cookieStore.get('TestRunId');
				$scope.testRunID = $cookieStore.get('TestRunId');
                //Get devices service
                promise = testScriptService.ViewTestRunDeviceService(userId, token, testrunID);
                promise.then(
                    function (data) {
                        $scope.gridOptions2.data = data.testRunDeviceData;


                    },
                    function (err) {
                        console.log(err);
                    }
                );
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
        };
    });


