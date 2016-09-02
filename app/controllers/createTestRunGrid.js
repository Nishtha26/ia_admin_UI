oTech.controller('createTestRunGridController',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, uiGridConstants, $cookieStore, $timeout) {

        var userId = sessionStorage.getItem('userId');
        var token = sessionStorage.getItem('token');
        $rootScope.role = sessionStorage.getItem("role");
		$scope.dataLoading = true;
        var TestPlanId = $cookieStore.get('TestPLANId');
		$rootScope.jobId = "";
		var Devices = [];
		var notificationTypes = [];
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
        $scope.timer;
        promise = testScriptService.getTestRunDependantData(token, TestRunName, userId);
        promise.then(
            function (data) {
				$scope.dataLoading = false;
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
		
		$scope.testScript = function () {

           $location.path('/dashboard/testScript');
        }
		
		 $scope.createTestPlan = function() {
				$cookieStore.remove('testPlanName');
				$cookieStore.remove('testPlanDescription');
				$cookieStore.remove('usecaseId');
				$cookieStore.remove('usecaseDescription');
				$rootScope.testPlanName = "";
				$rootScope.testPlanDescription = "";
				$rootScope.usecaseId = '';
				$.removeCookie('testPlanName');
				$.removeCookie('usecaseId');
				$.removeCookie('testPlanDescription');

				$location.path('/dashboard/initiateTestPlan');
}

		
		  $scope.selectTab=function(event){
				if(event == 'Test Plan'){
					$location.path('/dashboard/testScript');
				}
				if(event == 'Test Run'){
					$location.path('/Schedule');
				}
			}

//Create Test Run Virtual Device
        $scope.CreateTestRunVirtualDeviceOptions = {
            enableColumnResize: true,
            //enableFiltering: true,
            enableRowHeaderSelection: false,
            //enableRowSelection: true,
            multiSelect: false,
			enableVerticalScrollbar :0,
			enableHorizontalScrollbar:0,
            columnDefs: [
                {field: 'jobId', name: 'Test Run Id', headerCellClass: $scope.highlightFilteredHeader, width: '20%'},
                {field: 'jobName', name: 'Test Run Name', headerCellClass: $scope.highlightFilteredHeader, width: '30%'},
                {
                    field: 'jobDescription',
                    name: 'Test Run Description',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: '30%'
                },
                {
                    field: 'jobCreateDate',
                    name: 'Test Run Created Date',
                    headerCellClass: $scope.highlightFilteredHeader,
                    width: '20%'
                },
            ]
        };

        //Get Devices grid
        $scope.CreateTestRunRealDeviceOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: true,
			enableVerticalScrollbar :0,
		    enableHorizontalScrollbar:0,
            columnDefs: [
                {field: 'deviceId', name: 'Device ID', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceName', name: 'Device Name', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceMsisdn', name: ' MSISDN', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceManufacturer', name: ' Manufacturer', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'devcieImei', name: ' IMEI', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };


        $scope.CreateTestRunVirtualDeviceOptions.onRegisterApi = function (gridApi) {
			$scope.dataProcessing = true;
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
				Devices = [];

                var testrunID = $cookieStore.get('TestRunId');
                //Get devices service
                promise = testScriptService.ViewTestRunDeviceService(userId, token, testrunID);
                promise.then(
                    function (data) {
						$scope.dataProcessing = false;
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
			$scope.dataProcessing = true;
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $rootScope.RowCreateTestRunRealDevice = row.entity;
                console.log(row.entity);
                var selectdata = row.entity.testrunId;
                console.log(JSON.stringify(row.entity));
                $cookieStore.put('JobDeviceId', row.entity.deviceId);
                
                if(row.isSelected){
					Devices.push(row.entity.deviceId);
			}else{
				for (var i = 0; i < Devices.length; i++){
					if(Devices[i] == row.entity.deviceId){
						Devices.splice(i, 1);
					}
				}
			}
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {


            });
			$scope.dataProcessing = false;
        };


        //Schedule virtual Devices
        $scope.ScheduleVirtualDevices = {
            enableColumnResize: true,
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
			enableVerticalScrollbar :3,
		    enableHorizontalScrollbar:0,
            columnDefs: [
                {field: 'testrunId', name: 'Test Run Id', headerCellClass: $scope.highlightFilteredHeader/*,width: '10%'*/},
                {field: 'testrunName', name: 'Test Run Name', headerCellClass: $scope.highlightFilteredHeader/*,width: '20%'*/},
                {
                    field: 'taskId',
                    name: 'Task Id',
                    headerCellClass: $scope.highlightFilteredHeader
                   /* width: '10%'*/
                },
                {
                    field: 'taskName',
                    name: 'Task Name',
                    headerCellClass: $scope.highlightFilteredHeader
                    /*width: '30%'*/
                },
				{
                    field: 'testrunUserName',
                    name: 'User',
                    headerCellClass: $scope.highlightFilteredHeader
                    /*width: '10%'*/
                },
				{
                    field: 'testrunCreatedDate',
                    name: 'Created On',
                    headerCellClass: $scope.highlightFilteredHeader,
                },
            ]
        };
        
        $scope.ScheduleRealDevices = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: true,
			enableVerticalScrollbar :0,
			enableHorizontalScrollbar:0,
            columnDefs: [
                {field: 'deviceId', name: 'Device ID', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceName', name: 'Device Name', headerCellClass: $scope.highlightFilteredHeader/*,cellTemplate:'<div data-toggle="modal" data-target="#Device_List" ng-click="grid.appScope.showDeviceLogDetails({{row.entity.deviceId}});">'+'<a>{{row.entity.deviceName}}</a>' +'</div>'*/},
                {field: 'deviceModel', name: ' Device Model', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceManufacturer', name: 'Device Manufacturer', headerCellClass: $scope.highlightFilteredHeader},
               /* {field: 'notificationStatusName', name: ' Request status', headerCellClass: $scope.highlightFilteredHeader, cellTemplate:'<div data-toggle="modal" data-target="#DeviceNotification_List" ng-click="grid.appScope.showDeviceNotificationLogDetails({{row.entity.deviceId}},{{row.entity.jobId}});">'+'<a>{{row.entity.notificationStatusName}}</a>' +'</div>'},*/
				{field: 'jobProgress', name: 'Job Monitoring', headerCellClass: $scope.highlightFilteredHeader, cellTemplate:'<div class="ui-grid-progress-strip"><uib-progressbar animate="false" value=\"row.entity.jobProgress\" type="success"><b>{{row.entity.jobProgress}}%</b></uib-progressbar></div>'},
				/*{field: 'action', name: 'Action', cellTemplate:'<div>' +'<a href="{{row.entity.showScheduleUrl}}" target="_blank">{{row.entity.action}}</a>' +'</div>' },
				{field: 'deviceLogLevel', name: ' Device Log Level', headerCellClass: $scope.highlightFilteredHeader},*/
				{name:'Action', enableRowSelection: false, enableFiltering: false, width: '15%',enableColumnMenu: false, enableSorting: false,cellTemplate:
                    '<select class="form-control" style=" border-color: #eaeaea;margin-left:7%;margin-top:2%;width: 80%;height:75%;padding-top:1%" ng-model="actions"  ng-change="grid.appScope.takeAction(this,row)">'+
 					  '<option value="">Select Action</option>' +
 					  '<option data-target="#DeviceNotification_List" value="DeviceNotification_List">Device Ack. Status</option>'+
 					  '<option data-target="#Device_List" value="Device_List" >View Device Log</option>'+
 					  '<option value="{{row.entity.testplanId}}-Edit">View Shedule Info</option> '+
 					'</select>'},
				/*{field: 'notificationType', name: ' Device Notification Type', headerCellClass: $scope.highlightFilteredHeader},
				{field: 'runNumDesc', name: ' Command Counts', headerCellClass: $scope.highlightFilteredHeader, cellTemplate:'<div>' +'<a href="{{row.entity.showScheduleUrlForRunNum}}" target="_blank">{{row.entity.runNumDesc}}</a>' +'</div>'},*/
            ]
        };

        
		
		if($scope.TestPlanId != undefined){
			if($rootScope.getTestRuns != undefined){
				$scope.dataLoading = false;
				$scope.ScheduleVirtualDevices.data = $rootScope.getTestRuns;
			}else{
			promise = testScriptService.getTestRuns(token, TestPlanId, userId);
			promise.then(
				function (data) {
					$scope.dataLoading = false;
					$scope.ScheduleVirtualDevices.data = data.testRunsForTestPlan;
				},
				function (err) {
					console.log(err);
				}
			);
			}
		} else {
				promise = testScriptService.getAllTestRunsForSchedule(token, userId);
				promise.then(
					function (data) {
						console.log(JSON.stringify(data));
						$scope.ScheduleVirtualDevices.data = data.testRunsForTestPlan;
						$scope.dataLoading = false;
					},
					function (err) {
						console.log(err);
					}
				);
		}

        $scope.ScheduleVirtualDevices.onRegisterApi = function (gridApi) {

            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				$scope.dataProcessing = true;
                $rootScope.RowScheduleVirtual = row.entity;
                $scope.TestRunName = row.entity.testrunName;
                $cookieStore.put('TestRunName', $scope.TestRunName);
                $cookieStore.put('TestRunDescription', row.entity.testrunDescription);
                var testrunID = row.entity.testrunId;
				$rootScope.jobId = row.entity.testrunId;
                $cookieStore.put('TestRunId', testrunID);
                var testrunID = $cookieStore.get('TestRunId');
				Devices = [];
				notificationTypes = [];

                //Get devices service
                promise = testScriptService.ViewTestRunDeviceService(userId, token, testrunID);
                promise.then(
                    function (data) {

                        console.log(JSON.stringify(data.testRunDeviceData));
                        $scope.ScheduleRealDevices.data = data.testRunDeviceData;
						$scope.dataProcessing = false;
						$timeout(function () {
	                    	$scope.refreshCallForJobProgress(userId, token, testrunID);
	                    }, 3000);
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
					$rootScope.jobId = row.entity.jobId;
					if(row.isSelected){
						Devices.push(row.entity.deviceId);
						notificationTypes.push(row.entity.notificationType);
				}else{
					for (var i = 0; i < Devices.length; i++){
						if(Devices[i] == row.entity.deviceId){
							Devices.splice(i, 1);
							notificationTypes.splice(i, 1);
						}
					}
				}
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
       

		$scope.deviceLogListGridOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            enableHorizontalScrollbar:0,
            columnDefs: [
                {field: 'level', name: 'Level', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'tag', name: 'Tag', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'message', name: 'Message', headerCellClass: $scope.highlightFilteredHeader,cellTooltip: 
                    function( row, col ) {
                    return '' + row.entity.message + '';
                  }},
                {field: 'time', name: 'Time', headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'date:"yyyy-MM-dd hh:mm:ss UTC Z"'},
            ]
        };
		
		$scope.deviceStatusLogListGridOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {field: 'jobStatus', name: 'Job Status', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'jobStatusTime', name: 'Job Status Time', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'iaCommandName', name: 'Command Name', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };

	$scope.showDeviceLogDetails = function(deviceId,jobId){
		$scope.header = "Device Log"
		$scope.dataLoadingPopup = true;
		if(jobId == undefined || jobId == '' || jobId == null){
			$scope.deviceLogListGridOptions.data = [];
		$scope.header = "Device Log"
		promise = testScriptService.showDeviceLogDetails(userId, token,deviceId);
		promise.then(
			function(data){
				$scope.deviceLogList = data;
				$scope.deviceLogListGridOptions.data = data.deviceLogList;
				for(var i=0; i < $scope.deviceLogListGridOptions.data.length; i++ ){
					$scope.deviceLogListGridOptions.data[i].time = new Date($scope.deviceLogListGridOptions.data[i].time);
				}
				$scope.dataLoadingPopup = false;
				if($scope.deviceLogListGridOptions.data.length <= 25)
					$('.ui-grid-pager-panel').hide();
				else
					$('.ui-grid-pager-panel').show();
			},
			function(err){
				$scope.dataLoadingPopup = false;
			}
		);
	 }
	 
	 if(jobId != undefined){
		$scope.header = "Device Status Log Details"
		$scope.deviceStatusLogListGridOptions.data = [];
		promise = testScriptService.showDeviceStatusDetails(userId,token,deviceId,jobId);
		promise.then(
			function(data){
				$scope.deviceStatusLogList = data;
				$scope.deviceStatusLogListGridOptions.data = data.deviceStausLogList;
				$scope.dataLoadingPopup = false;
				if($scope.deviceStatusLogListGridOptions.data.length <= 25)
					$('.ui-grid-pager-panel').hide();
				else
					$('.ui-grid-pager-panel').show();
			},
			function(err){
				$scope.dataLoadingPopup = false;
			}
		);
	 }
	}
	
	$scope.showDeviceStatusRefresh = function(scope){
		$scope.header = "Device Status Log Details"
		$scope.deviceStatusLogListGridOptions.data = [];
		$scope.dataLoadingPopup = true;
		promise = testScriptService.showDeviceStatusDetails(userId,token,scope.ScheduleRealDevices.data[0].deviceId,scope.ScheduleRealDevices.data[0].jobId);
		promise.then(
			function(data){
				$scope.deviceStatusLogList = data;
				$scope.deviceStatusLogListGridOptions.data = data.deviceStausLogList;
				$scope.dataLoadingPopup = false;
				if($scope.deviceStatusLogListGridOptions.data.length <= 25)
					$('.ui-grid-pager-panel').hide();
				else
					$('.ui-grid-pager-panel').show();
			},
			function(err){
				$scope.dataLoadingPopup = false;
			}
		);
	}
	
	$scope.showDeviceLogDetailsRefresh = function(scope){
		$scope.header = "Device Log"
		$scope.dataLoadingPopup = true;
		$scope.deviceLogListGridOptions.data = [];
		$scope.header = "Device Log"
		promise = testScriptService.showDeviceLogDetails(userId, token,scope.ScheduleRealDevices.data[0].deviceId);
		promise.then(
			function(data){
				$scope.deviceLogList = data;
				$scope.deviceLogListGridOptions.data = data.deviceLogList;
				$scope.dataLoadingPopup = false;
				if($scope.deviceLogListGridOptions.data.length <= 25)
					$('.ui-grid-pager-panel').hide();
				else
					$('.ui-grid-pager-panel').show();
			},
			function(err){
				$scope.dataLoadingPopup = false;
			}
		);
	}
	
	
	$scope.deviceNotificationLogListGridOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            enableHorizontalScrollbar:0,
            columnDefs: [
                {field: 'iaNotofocationStatusByName', name: 'Request Status', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'createdDate', name: 'Request Time', headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'date:"yyyy-MM-dd hh:mm:ss UTC Z"'},
                {field: 'ackDate',type: 'date', name: 'Request Ack Time', headerCellClass: $scope.highlightFilteredHeader, 
                    cellFilter: 'date:"yyyy-MM-dd hh:mm:ss UTC Z"'},
				{field: 'retryCount', name: 'Retry Count', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };
	$scope.showDeviceNotificationLogDetails = function(deviceId,jobId){
		$scope.dataLoadingPopup = true;
	 $scope.header = "Device Notification Log Details"
	 $scope.deviceNotificationLogListGridOptions.data = [];
		promise = testScriptService.showDeviceNotificationLogDetails(userId,token,deviceId,jobId);
		promise.then(
			function(data){
				$scope.deviceNotificationLogList = data;
				$scope.deviceNotificationLogListGridOptions.data = data.deviceNotificationLogList;
				for(var i=0; i < $scope.deviceNotificationLogListGridOptions.data.length; i++){
					$scope.deviceNotificationLogListGridOptions.data[i].ackDate = new Date($scope.deviceNotificationLogListGridOptions.data[i].ackDate);
					$scope.deviceNotificationLogListGridOptions.data[i].createdDate = new Date($scope.deviceNotificationLogListGridOptions.data[i].createdDate);
				}
				$scope.dataLoadingPopup = false;
				if($scope.deviceNotificationLogListGridOptions.data.length <= 25)
					$('.ui-grid-pager-panel').hide();
				else
					$('.ui-grid-pager-panel').show();
			},
			function(err){
				$scope.dataLoadingPopup = false;
			}
		);
	}
	
	$scope.showDeviceNotificationLogDetailsRefresh = function(scope){
		$scope.dataLoadingPopup = true;
	 $scope.header = "Device Notification Log Details"
	 $scope.deviceNotificationLogListGridOptions.data = [];
		promise = testScriptService.showDeviceNotificationLogDetails(userId,token,scope.ScheduleRealDevices.data[0].deviceId,scope.ScheduleRealDevices.data[0].jobId);
		promise.then(
			function(data){
				$scope.deviceNotificationLogList = data;
				$scope.deviceNotificationLogListGridOptions.data = data.deviceNotificationLogList;
				$scope.dataLoadingPopup = false;
				if($scope.deviceNotificationLogListGridOptions.data.length <= 25)
					$('.ui-grid-pager-panel').hide();
				else
					$('.ui-grid-pager-panel').show();
			},
			function(err){
				$scope.dataLoadingPopup = false;
			}
		);
	}
	
	
	
	$scope.startJob = function(){
		$(".btn-info").addClass("disabled");
		$scope.dataProcessing = true;
		
		if($rootScope.jobId == undefined || $rootScope.jobId == ""){
						$scope.dataProcessing = false;
                        $rootScope.Message = " Please Select JOB!! ";
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
						return false;
		}
		if(Devices.length <= 0){
						$scope.dataProcessing = false;
                        $rootScope.Message = " Please select device!! ";
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
						return false;
		}
		var ScheduleData = JSON.stringify({
                "jobId": $rootScope.jobId,
				"deviceList":Devices,
				"notificationTypes":notificationTypes,
                "operation": "trigger_job",
            })
		promise = testScriptService.commonServiceForJobSheduling(ScheduleData, userId, token);
		promise.then(
			function(data){
                    if (data.status == "Success") {
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						
                       $(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
                    }
                    else {
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");

                    }
						//Get devices service
						 $scope.dataLoading1 = true;
						 Devices = [];
						notificationTypes = [];
						promise = testScriptService.ViewTestRunDeviceService(userId, token, $rootScope.jobId);
						promise.then(
							function (data) {

								console.log(JSON.stringify(data.testRunDeviceData));
								$scope.ScheduleRealDevices.data = data.testRunDeviceData;
								$scope.dataLoading1 = false;

							},
							function (err) {
								console.log(err);
							}
						);
                },
			function(err){
				$scope.dataProcessing = false;
				$(".btn-info").removeClass("disabled");
				console.log(err);
			}
		);
	}
	
	
	$scope.stopJob = function(){
		$(".btn-info").addClass("disabled");
		$scope.dataProcessing = true;
		
		if($rootScope.jobId == undefined || $rootScope.jobId == ""){
						$scope.dataProcessing = false;
                        $rootScope.Message = " Please Select JOB!! ";
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
						return false;
		}
		
		if(Devices.length <= 0){
						$scope.dataProcessing = false;
                        $rootScope.Message = " Please select device!! ";
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
						return false;
		}
		var ScheduleData = JSON.stringify({
                "jobId": $rootScope.jobId,
				"deviceList":Devices,
				"notificationTypes":notificationTypes,
                "operation": "stop_job",
            })
		promise = testScriptService.commonServiceForJobSheduling(ScheduleData, userId, token);
		promise.then(
			function(data){
                    if (data.status == "Success") {
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						
                       $(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
                    }
                    else {
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");

                    }
						//Get devices service
						 $scope.dataLoading1 = true;
						 Devices = [];
						notificationTypes = [];
						promise = testScriptService.ViewTestRunDeviceService(userId, token, $rootScope.jobId);
						promise.then(
							function (data) {

								console.log(JSON.stringify(data.testRunDeviceData));
								$scope.ScheduleRealDevices.data = data.testRunDeviceData;
								$scope.dataLoading1 = false;

							},
							function (err) {
								console.log(err);
							}
						);
                },
			function(err){
				$scope.dataProcessing = false;
				$(".btn-info").removeClass("disabled");
				console.log(err);
			}
		);
	}
	
	$scope.reStartJob = function(){
		$(".btn-info").addClass("disabled");
		$scope.dataProcessing = true;
		
		if(Devices == undefined || $rootScope.jobId == ""){
						$scope.dataProcessing = false;
                        $rootScope.Message = " Please Select JOB!! ";
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
						return false;
		}
		if(Devices.length <= 0){
						$scope.dataProcessing = false;
                        $rootScope.Message = " Please select device!! ";
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
						return false;
		}
		
		var ScheduleData = JSON.stringify({
                "jobId": $rootScope.jobId,
				"deviceList":Devices,
				"notificationTypes":notificationTypes,
                "operation": "trigger_restart_job",
            })
		promise = testScriptService.commonServiceForJobSheduling(ScheduleData, userId, token);
		promise.then(
			function(data){
                    if (data.status == "Success") {
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						
                       $(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
                    }
                    else {
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");

                    }
					//Get devices service
						 $scope.dataLoading1 = true;
						 Devices = [];
						notificationTypes = [];
						promise = testScriptService.ViewTestRunDeviceService(userId, token, $rootScope.jobId);
						promise.then(
							function (data) {

								console.log(JSON.stringify(data.testRunDeviceData));
								$scope.ScheduleRealDevices.data = data.testRunDeviceData;
								$scope.dataLoading1 = false;

							},
							function (err) {
								console.log(err);
							}
						);

                },
			function(err){
				$scope.dataProcessing = false;
				$(".btn-info").removeClass("disabled");
				console.log(err);
			}
		);
	}
	
	$scope.getJobStatus = function(){
		$(".btn-info").addClass("disabled");
		$scope.dataProcessing = true;
		
		if(Devices == undefined || $rootScope.jobId == ""){
						$scope.dataProcessing = false;
                        $rootScope.Message = " Please Select JOB!! ";
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
						return false;
		}
		
		if(Devices.length <= 0){
						$scope.dataProcessing = false;
                        $rootScope.Message = " Please select device!! ";
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
						return false;
		}
		var ScheduleData = JSON.stringify({
                "jobId": $rootScope.jobId,
				"deviceList":Devices,
				"notificationTypes":notificationTypes,
                "operation": "get_job_status_in_device",
            })
		promise = testScriptService.commonServiceForJobSheduling(ScheduleData, userId, token);
		promise.then(
			function(data){
                    if (data.status == "Success") {
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						
                       $(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
                    }
                    else {
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");

                    }
					//Get devices service
						 $scope.dataLoading1 = true;
						 Devices = [];
						notificationTypes = [];
						promise = testScriptService.ViewTestRunDeviceService(userId, token, $rootScope.jobId);
						promise.then(
							function (data) {

								console.log(JSON.stringify(data.testRunDeviceData));
								$scope.ScheduleRealDevices.data = data.testRunDeviceData;
								$scope.dataLoading1 = false;

							},
							function (err) {
								console.log(err);
							}
						);

                },
			function(err){
				$scope.dataProcessing = false;
				$(".btn-info").removeClass("disabled");
				console.log(err);
			}
		);
	}
	
	
	$scope.reStartIAC = function(){
		$(".btn-info").addClass("disabled");
		$scope.dataProcessing = true;
		
		if(Devices == undefined || $rootScope.jobId == ""){
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
						return false;
		}
		
		if(Devices.length <= 0){
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
						return false;
		}
		var ScheduleData = JSON.stringify({
                "jobId": $rootScope.jobId,
				"deviceList":Devices,
				"notificationTypes":notificationTypes,
                "operation": "restart_iac",
            })
		promise = testScriptService.commonServiceForJobSheduling(ScheduleData, userId, token);
		promise.then(
			function(data){
                    if (data.status == "Success") {
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						
                       $(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
                    }
                    else {
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.message;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");

                    }
					//Get devices service
						$scope.dataLoading1 = true;
						Devices = [];
						notificationTypes = [];
						promise = testScriptService.ViewTestRunDeviceService(userId, token, $rootScope.jobId);
						promise.then(
							function (data) {

								console.log(JSON.stringify(data.testRunDeviceData));
								$scope.ScheduleRealDevices.data = data.testRunDeviceData;
								$scope.dataLoading1 = false;

							},
							function (err) {
								console.log(err);
							}
						);

                },
			function(err){
				$scope.dataProcessing = false;
				$(".btn-info").removeClass("disabled");
				console.log(err);
			}
		);
	}
	
	$scope.takeAction = function(context,row) {
		if(context.actions == "DeviceStatus_List"){
			$('#'+context.actions+'').modal('show');
		}
		if(context.actions == "Device_List"){
			$scope.showDeviceLogDetails(row.entity.deviceId);
			$('#'+context.actions+'').modal('show');	
				}
			if(context.actions == "DeviceNotification_List"){
				$scope.showDeviceNotificationLogDetails(row.entity.deviceId,row.entity.jobId);
				$('#'+context.actions+'').modal('show');	
			}
	}
	

	// job progress interval call till 100% job compleate
	$scope.isJobInProgress = false;
					$scope.refreshCallForJobProgress = function(userId, token, testrunID) {

						promise = testScriptService.ViewTestRunDeviceService(userId, token, testrunID);
		                promise.then(
		                    function (data) {

		                        console.log(JSON.stringify(data.testRunDeviceData));
		                        $scope.ScheduleRealDevices.data = data.testRunDeviceData;
		                        for(var i =0; i < $scope.ScheduleRealDevices.data.length; i++){
		                        	if($scope.ScheduleRealDevices.data[i].jobProgress < '100' && $scope.ScheduleRealDevices.data[i].jobProgress > '0'){
		                        		$scope.isJobInProgress = true;
		                        	}else{
		                        		$scope.isJobInProgress = false;
		                        	}
		                        }
		                    },
		                    function (err) {
		                        console.log(err);
		                    }
		                );
						
		                $scope.timer = $timeout(function() {
							console.log("Timeout executed", Date.now());
						}, 50000);

		                $scope.timer.then(
								function() {

									if($scope.isJobInProgress){
										$scope.refreshCallForJobProgress(userId, token, testrunID);
										}else{
											$timeout.cancel( $scope.timer );
										}

								}, function() {
									console.log("Timer rejected!");
								});
					}
					
					
					
					  $scope.stop = function () {
						  
						  $(".btn-info").addClass("disabled");
				    		$scope.dataProcessing = true;
				    		
				    		if(Devices == undefined || testRunID == ""){
				    						$scope.dataProcessing = false;
				                            $rootScope.Message = " Please Select JOB!! ";
				                            $('#MessageColor').css("color", "red");
				                            $('#MessagePopUp').modal('show');
				                            $timeout(function () {
				                                $('#MessagePopUp').modal('hide');
				                            }, 2000);
				    						$(".btn-info").removeClass("disabled");
				    						$('.treeSection').css("display", "block");
				    						return false;
				    		}
				    		
				    		if(Devices.length <= 0){
				    						$scope.dataProcessing = false;
				                            $rootScope.Message = " Please select device!! ";
				                            $('#MessageColor').css("color", "red");
				                            $('#MessagePopUp').modal('show');
				                            $timeout(function () {
				                                $('#MessagePopUp').modal('hide');
				                            }, 2000);
				    						$(".btn-info").removeClass("disabled");
				    						$('.treeSection').css("display", "block");
				    						return false;
				    		}
				            var ScheduleData = JSON.stringify({
				                "jobId": testRunID,
				                "jobName": $scope.testRunName,
				                "jobDescription": $scope.jobTemplateDescription,
				                "jobCreatedBy": userId,
//				                    "jobStartDate": $scope.StartDate,
				                "jobStartDateTime": $scope.Datendtime,
				                "jobEndDate": $scope.EndDate,
				                "recurrence": $scope.recurrence,
				                "deviceList": Devices,
				                "operation": "stop",
				            })
				            console.log(ScheduleData);
				            promise = testScriptService.Schedule(ScheduleData, userId, token);
				            promise.then(
				                function (data) {
				                    console.log('schedule');
				                    console.log(data);
				                    if (data.status == "error") {

				                        $rootScope.Message = "Error occured during Test run stop ";

				                        $('#MessageColor').css("color", "red");
				                        $('#MessagePopUp').modal('show');
				                        $timeout(function () {
				                            $('#MessagePopUp').modal('hide');
				                        }, 2000);
				                        $scope.dataProcessing = false;
				        				$(".btn-info").removeClass("disabled");
				                    }

				                    if (data.status == "success") {

				                        $rootScope.Message = " Test run stopped successfully ";

				                        $('#MessageColor').css("color", "green");
				                        $('#MessagePopUp').modal('show');
				                        $timeout(function () {
				                            $('#MessagePopUp').modal('hide');
				                        }, 2000);
				                        $scope.dataProcessing = false;
				        				$(".btn-info").removeClass("disabled");
				                    }

				                },
				                function (err) {
				                    console.log(err);
				                    $scope.dataProcessing = false;
				    				$(".btn-info").removeClass("disabled");
				                }
				            );
				        }

				        $scope.schedule = function () {
				        	$(".btn-info").addClass("disabled");
				    		$scope.dataProcessing = true;
				    		
				    		if(Devices == undefined || $cookieStore.get('TestRunId') == ""){
				    						$scope.dataProcessing = false;
				                            $rootScope.Message = " Please Select JOB!! ";
				                            $('#MessageColor').css("color", "red");
				                            $('#MessagePopUp').modal('show');
				                            $timeout(function () {
				                                $('#MessagePopUp').modal('hide');
				                            }, 2000);
				    						$(".btn-info").removeClass("disabled");
				    						$('.treeSection').css("display", "block");
				    						return false;
				    		}
				    		
				    		if(Devices.length <= 0){
				    						$scope.dataProcessing = false;
				                            $rootScope.Message = " Please select device!! ";
				                            $('#MessageColor').css("color", "red");
				                            $('#MessagePopUp').modal('show');
				                            $timeout(function () {
				                                $('#MessagePopUp').modal('hide');
				                            }, 2000);
				    						$(".btn-info").removeClass("disabled");
				    						$('.treeSection').css("display", "block");
				    						return false;
				    		}
				            var ScheduleData = JSON.stringify({
				                "jobId": $cookieStore.get('TestRunId'),
				                "jobName": $cookieStore.get('TestRunName'),
				                "jobDescription": $scope.jobTemplateDescription,
				                "jobCreatedBy": userId,
				                "jobStartDate": "2016-02-08",
				                "jobStartDateTime": $scope.Datendtime,
//				                    "jobStartDate": $scope.StartDate,
				                "jobEndDate": $scope.EndDate,
				                "recurrence": $scope.recurrence,
				                "deviceList": Devices,
				                "operation": "schedule",
				            })
				            console.log(ScheduleData);
				            promise = testScriptService.Schedule(ScheduleData, userId, token);
				            promise.then(
				                function (data) {
				                    console.log(JSON.stringify(data));

				                    if (data.status == "error") {

				                        $rootScope.Message = data.errorDescription;

				                        $('#MessageColor').css("color", "red");
				                        $('#MessagePopUp').modal('show');
				                        $timeout(function () {
				                            $('#MessagePopUp').modal('hide');
				                        }, 2000);
				                        $scope.dataProcessing = false;
				        				$(".btn-info").removeClass("disabled");
				                    }

				                    if (data.status == "success") {

				                        $rootScope.Message = "Test Run has been Scheduled Successfully";

				                        $('#MessageColor').css("color", "green");
				                        $('#MessagePopUp').modal('show');
				                        $timeout(function () {
				                            $('#MessagePopUp').modal('hide');
				                        }, 2000);
				                        $scope.dataProcessing = false;
				        				$(".btn-info").removeClass("disabled");
				                    }

				                },
				                function (err) {
				                    console.log(err);
				                    $scope.dataProcessing = false;
				    				$(".btn-info").removeClass("disabled");
				                }
				            );
				        }

				        $scope.startnow = function () {
				        	
				        	$(".btn-info").addClass("disabled");
				    		$scope.dataProcessing = true;
				    		
				    		if(Devices == undefined || $cookieStore.get('TestRunId') == ""){
				    						$scope.dataProcessing = false;
				                            $rootScope.Message = " Please Select JOB!! ";
				                            $('#MessageColor').css("color", "red");
				                            $('#MessagePopUp').modal('show');
				                            $timeout(function () {
				                                $('#MessagePopUp').modal('hide');
				                            }, 2000);
				    						$(".btn-info").removeClass("disabled");
				    						$('.treeSection').css("display", "block");
				    						return false;
				    		}
				    		
				    		if(Devices.length <= 0){
				    						$scope.dataProcessing = false;
				                            $rootScope.Message = " Please select device!! ";
				                            $('#MessageColor').css("color", "red");
				                            $('#MessagePopUp').modal('show');
				                            $timeout(function () {
				                                $('#MessagePopUp').modal('hide');
				                            }, 2000);
				    						$(".btn-info").removeClass("disabled");
				    						$('.treeSection').css("display", "block");
				    						return false;
				    		}
				        	
				            var ScheduleData = JSON.stringify({
				                "jobId": $cookieStore.get('TestRunId'),
				                // "jobName": $scope.testRunName,
				                "jobDescription": $scope.jobTemplateDescription,
				                "jobCreatedBy": userId,
				                // "jobStartDateTime": $scope.Datendtime,
//				                    "jobStartDate": $scope.StartDate,
//				                 "jobEndDate": $scope.EndDate,
//				                 "recurrence": $scope.recurrence,
				                "deviceList": Devices,
				                "operation": "start_now",
				            })
				            console.log(ScheduleData);
				            promise = testScriptService.Schedule(ScheduleData, userId, token);
				            promise.then(
				                function (data) {

				                    if (data.status == "error") {

				                        $rootScope.Message = data.errorDescription;

				                        $('#MessageColor').css("color", "red");
				                        $('#MessagePopUp').modal('show');
				                        $timeout(function () {
				                            $('#MessagePopUp').modal('hide');
				                        }, 2000);
				                        
				                        $scope.dataProcessing = false;
				        				$(".btn-info").removeClass("disabled");
				                    }

				                    if (data.status == "success") {

				                        $rootScope.Message = " Test run started successfully ";

				                        $('#MessageColor').css("color", "green");
				                        $('#MessagePopUp').modal('show');
				                        $timeout(function () {
				                            $('#MessagePopUp').modal('hide');
				                        }, 2000);
				                        
				                        $scope.dataProcessing = false;
				        				$(".btn-info").removeClass("disabled");
				                    }

				                },
				                function (err) {
				                	$scope.dataProcessing = false;
				    				$(".btn-info").removeClass("disabled");
				                    console.log(err);
				                }
				            );
				        }
	
	
	

    });




