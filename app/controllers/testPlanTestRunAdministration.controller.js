
oTech.controller('testPlanTestRunAdministration',
    function ($scope, $rootScope,$timeout, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, uiGridConstants, $cookieStore,$filter) {
        var userId = sessionStorage.getItem("userId");
        var token = sessionStorage.getItem("token");
        $scope.name = sessionStorage.getItem("username");
        $rootScope.role = sessionStorage.getItem("role");
        console.log('Role: '+$rootScope.role)
		$scope.createTestPlan = {};
        var sendCreateData = {};
        
        var TestPlanId ="";
        
        var Devices = [];
        var createTestRunDevices = [];
        var realDevices = [];
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
		

		$scope.quickRun = function () {
               $location.path('/dashboard/quickRun');
        }
		
		$scope.scrollToTestRunDiv = function(){
			// scroll set to test run 
			$('html,body').animate({
		        scrollTop: $(".test_runs_div").offset().top},
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
				enableSorting: true,
			    enableFilter: true,
			    enableColResize: true,
				enableRowSelection: false,  // for selection
				enableColumnMenus: false, //to hide ascending and descending column menu names
				enableRowHeaderSelection: false, // this is for check box to appear on grid options
				enableFiltering: false,
				enableGridMenu: false,		// for searching
				multiSelect:false,
				enableScrollbars : false,
				enableHorizontalScrollbar : 0,
				enableVerticalScrollbar : 0,
          columnDefs: [
                         {name:'Id',field: 'testplanId', width: '10%'},
                         {name:'Name',field: 'testplanName',width: '25%', cellTooltip: 
                             function( row, col ) {
                             return '' + row.entity.testplanName + '';
                           }},
                         {name:'Use Case',field: 'useCaseName', width: '20%', cellTooltip: 
                             function( row, col ) {
                             return '' + row.entity.useCaseName + '';
                           }},
                     	{name:'Created Date',field: 'createdDate', width: '20%'},
         				{name:'Created By',field: 'createdByName', width: '15%'},
         				{name:'Actions', enableRowSelection: false,headerCellClass: 'header-grid-cell-button', enableFiltering: false, width: '14%',cellClass: 'ui-grid-cell-button',
         					enableColumnMenu: false, enableSorting: false,cellTemplate:
         	         '<ul class="icons-list">'+
         				'<li class="dropdown">'+
         			'<a  class="dropdown-toggle" data-toggle="dropdown">'+
         				'<i class="icon-menu9"></i>'+
         			'</a>'+
         			'<ul class="dropdown-menu dropdown-menu-right">'+
         			'<li ><a  ng-click="grid.appScope.viewTestPlan(row)" ><i class="icon-file-stats text-primary"></i> View Test Plan</a></li>'+
         				'<li ng-if="row.entity.exitTestRuns"><a  ng-click="grid.appScope.viewTestRuns(row)" class="scrollSetToTestRun"><i class="icon-file-stats text-primary"></i> View Test Runs</a></li>'+
         				'<li ng-if="row.entity.exitTestRuns"><a ng-click="grid.appScope.editTestPlan(row);" class="scrollSetToTestRun"><i class="icon-file-text2 text-primary user_editor_link"></i> Edit Test Plan</a></li>'+
         				'<li ><a ng-click="grid.appScope.createTestRun(row);" class="scrollSetToTestRun"><i class="icon-pen-plus text-primary"></i> Create Test Run</a></li>'+
         				'<li ><a ng-click="grid.appScope.clone(row);"><i class="icon-copy4 text-primary"></i> Clone Test Plan</a></li>'+
         			'</ul>'+
         		'</li>'+
         	'</ul>'},
         			
                     ]
        };

        //Row selection
        $scope.TestPlanOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				if($scope.isAction){
					$scope.dataLoading = true;
					row.isSelected = false;
					$scope.isAction = false;
					$cookieStore.put('TestPLANId', row.entity.testplanId);
			promise = testScriptService.getTestRuns(token, row.entity.testplanId, userId);
			promise.then(
				function (data) {
					if(data.status == 'No TestRun Exists' || data.testRunsForTestPlan.length == 0){
					$rootScope.Message = "No Test Run Exists";
					$('#MessageColor').css("color", "red");
					$('#MessagePopUp').modal('show');
					$timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 3000);
				$scope.dataLoading = false;
					}else{
						$rootScope.getTestRuns = data.testRunsForTestPlan;
						$location.path('/Schedule');
					}
					
				},
				function (err) {
					console.log(err);
				}
			);
					
				}else{
				$scope.dataProcessing = true;
				$(".btn").addClass("disabled");
                $rootScope.RowCreateTestrun = row.entity;
                var TestPlanId = row.entity.testplanId;

                $cookieStore.put('TestPLANId', TestPlanId);
                $rootScope.TestplanId = row.entity.testplanId;
                $cookieStore.put('TestPLANId', row.entity.testplanId);

                $scope.testplan_name = row.entity.testplanName;
				$scope.testplan_name1 = row.entity.testplanName;
                $cookieStore.put('TestplanName', row.entity.testplanName);


//                    var TestPlanId = $cookieStore.get('selected_testplanid');
                $cookieStore.put('TestPlan_Name', $scope.testplan_name);
//                    $cookieStore.remove('selected_testplanid');
				$rootScope.Row = row.entity;

                $scope.testplanId_selected = $cookieStore.get('selected_testplanid');
                var msg = 'row selected ' + row.isSelected;
                //Calling getTestplan service and looping data as tree structure
				if(row.isSelected){
                promise = testScriptService.getTestplan(token, userId, TestPlanId);
                promise.then(
                    function (data) {
                        $scope.treedata = data.jobVO;
						$rootScope.uiTreeJSON = data.jobVO;
						if(data.isMappedTestPlanTestRun.length > 0){
						$rootScope.isMappedTestPlanTestRun = data.isMappedTestPlanTestRun[0].isMappedTestPlanTestRun;
						}
                        $cookieStore.put('uiTreeJSON', $rootScope.uiTreeJSON);
						$scope.dataProcessing = false;
						$(".btn").removeClass("disabled");
                    },
                    function (err) {
                        console.log(err);
                    }
                );
				}
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

				$scope.totalRecords = data.length;
				allOfTheData = data;
				$scope.TestPlanOptions.data = data.slice( 0, $scope.itemsPerPage);
				

            },
            function (err) {
                console.log(err);
            }
        );
        
        $scope.getTableHeight = function() {
		       var rowHeight = 40; // your row height
		       var headerHeight = 58; // your header height
		       return {
		          height: ($scope.TestPlanOptions.data.length * rowHeight + headerHeight) + "px"
		       };
		    };
		
		 $scope.createNewDatasource = function() {
						$scope.TestPlanOptions.data = allOfTheData.slice( startLimit, $scope.endLimit);
					}
		 
		 $scope.singleFilter = function() {
			    $scope.TestPlanOptions.data = $filter('filter')(allOfTheData, $scope.searchText, undefined);
			    $scope.TestPlanOptions.data = $scope.TestPlanOptions.data.slice( 0, $scope.endLimit);
			   
			};
			

		
			/* pagination code  start ****************/
			
			var startLimit = 1;
			$scope.itemsPerPage = 10;
			$scope.currentPage = 0;
			$scope.endLimit=$scope.itemsPerPage;
			var allOfTheData;
			$scope.totalRecords=0;


			$scope.range = function() {
						var rangeSize = 4;
						var ps = [];
						var start;

						start = $scope.currentPage;
						if ( start > $scope.pageCount()-rangeSize ) {
						start = $scope.pageCount()-rangeSize+1;
						}

						for (var i=start; i<start+rangeSize; i++) {
						if(i>=0) 
						ps.push(i);
						}
						return ps;
					};

					$scope.prevPage = function() {
					if ($scope.currentPage > 0) {
						$scope.setPagePrev($scope.currentPage-1);
						//$scope.currentPage--;
						}
					};
									
					$scope.DisablePrevPage = function() {
						return $scope.currentPage == 0 ? "disabled" : "";
					 };
					 
					 $scope.pageCount = function() {
						return Math.ceil($scope.totalRecords/$scope.itemsPerPage)-1;
					};
					
					$scope.nextPage = function() {
						if ($scope.currentPage < $scope.pageCount()) {
						$scope.setPageNext($scope.currentPage+1);
						//$scope.currentPage++;
						}
					};
					
					$scope.DisableNextPage = function() {
						return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
					};
					
					 $scope.setPage = function(n) {
						 $scope.dataLoading = true;
						$scope.endLimit = ($scope.itemsPerPage*(n+1));
						if($scope.endLimit > $scope.totalRecords){
							var reminder = $scope.totalRecords % $scope.itemsPerPage;
							if(reminder > 0){
								$scope.endLimit = $scope.endLimit - ($scope.itemsPerPage-reminder);
							}
						}
						 
						startLimit = ($scope.itemsPerPage*n);
						$scope.createNewDatasource();
						$scope.currentPage = n;
					};
					
					 $scope.setPagePrev = function(n) {
						 $scope.dataLoading = true;
						$scope.endLimit = ($scope.itemsPerPage*(n+1));
						if($scope.endLimit > $scope.totalRecords){
							var reminder = $scope.totalRecords % $scope.itemsPerPage;
							if(reminder > 0){
								$scope.endLimit = $scope.endLimit - ($scope.itemsPerPage-reminder);
							}
						}
						 
						startLimit = ($scope.itemsPerPage*n);
						$scope.createNewDatasource();
						$scope.currentPage = n;
					};
					 $scope.setPageNext = function(n) {
						 $scope.dataLoading = true;
						$scope.endLimit = ($scope.itemsPerPage*(n+1));
						if($scope.endLimit > $scope.totalRecords){
							var reminder = $scope.totalRecords % $scope.itemsPerPage;
							if(reminder > 0){
								$scope.endLimit = $scope.endLimit - ($scope.itemsPerPage-reminder);
							}
						}
						 
						startLimit = ($scope.itemsPerPage*(n));
						$scope.createNewDatasource();
						$scope.currentPage = n;
					};
		
			
			/* pagination code  end ***********************/
							
							
							
							
		
		$scope.viewTestPlanTestRun = function (TestPlanId) {
			$scope.isAction = true;
		}
		
								
		
		
		$scope.viewTestRuns = function(row){
			
			promise = testScriptService.getTestRuns(token, row.entity.testplanId, userId);
			promise.then(
				function (data) {
					if(data.status == 'No TestRun Exists' || data.testRunsForTestPlan.length == 0){
						$scope.errorMsg = true;
	                    $scope.Message = "No Test Run Exists..";
	                    $timeout(function () {
	                    	$scope.errorMsg = false;
	                    }, 3000);
	                    return false;
					}else{
						
						$scope.mainTab = 3;
						$scope.loadAllTestRuns = true;
						$scope.hideFilter = false;
						$scope.testRunMappedDevices.data = [];
						// scroll set to test run 
						$('html,body').animate({
					        scrollTop: $(".test_runs_div").offset().top},
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
		
		$scope.clone = function(row){
			$scope.dataProcessingTestPlan = true;
			promise = testScriptService.createCloneTestplan(token, userId, row.entity.testplanId);
            promise.then(
                function (data) {
					$scope.totalRecords = data.length;
					allOfTheData = data;
					$scope.TestPlanOptions.data = [];
					$scope.TestPlanOptions.data = data.slice( 0, $scope.itemsPerPage);
					$scope.dataProcessingTestPlan = false;
                },
                function (err) {
                    console.log(err);
                }
            );
			
		}
		
		
		$scope.mainTab = 1;

	    $scope.setTab = function(newTab){
	      $scope.mainTab = newTab;
	    };

	    $scope.isSet = function(tabNum){
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
				multiSelect:false,
				enableScrollbars : false,
				enableVerticalScrollbar :3,
			    enableHorizontalScrollbar:0,
	            columnDefs: [
	                {field: 'testrunId', name: 'Test Run Id', headerCellClass: $scope.highlightFilteredHeader/*,width: '10%'*/},
	                {field: 'testrunName', name: 'Test Run Name', headerCellClass: $scope.highlightFilteredHeader, cellTooltip: 
                        function( row, col ) {
                        return '' + row.entity.testrunName + '';
                      }},
	                {
	                    field: 'testPlanId',
	                    name: 'Test Plan Id',
	                    headerCellClass: $scope.highlightFilteredHeader
	                   /* width: '10%'*/
	                },
	                {
	                    field: 'testPlanName',
	                    name: 'Test Plan Name',
	                    headerCellClass: $scope.highlightFilteredHeader
	                    , cellTooltip: 
	                        function( row, col ) {
	                        return '' + row.entity.testPlanName + '';
	                      }},
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
		
		$scope.viewAllTestRuns = function(){
			$scope.testRunMappedDevices.data = [];
			$scope.loadAllTestRuns = false;
			$scope.hideFilter = true;
			$scope.allTestRuns.data = [];
			$scope.allTestRuns.data = $scope.allTestRunsTemp;
			$scope.searchTestRuns = $scope.allTestRunsTemp;
		}
		
		
		$scope.singleFilterForTestRuns = function() {
		    $scope.allTestRuns.data = $filter('filter')($scope.searchTestRuns, $scope.searchTextForTestRuns, undefined);
		   
		};
		
		
		 $scope.allTestRuns.onRegisterApi = function (gridApi) {

			
	            
	            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
	    				Devices = [];
	    				notificationTypes = [];
	    				$scope.dataProcessing = true;
	    				
	                    //Get devices service
	    				if(row.isSelected){
	    					$rootScope.jobId = row.entity.testrunId;
	    					promise = testScriptService.ViewTestRunDeviceService(userId, token, row.entity.testrunId);
		                    promise.then(
		                        function (data) {
		                        	$scope.dataProcessing = false;
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
					}else{
						$rootScope.jobId = "";
						$scope.testRunMappedDevices.data = [];
						 $scope.searchTestRunMappedDevices = [];
					}
	                    
	                  

	                });
	            
	           
	            $scope.testRunMappedDevices.onRegisterApi = function (gridApi) {

	             
	               
	                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
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

	                });
	                
	                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {


	                });

	            };

	            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {


	            });
	              
	           
	        };
	        
	       
	        
            
	    
	    
	    
	    
	    
	    $scope.testRunMappedDevices = {
	    		enableSorting: true,
			    enableFilter: true,
			    enableColResize: true,
				enableRowSelection: true,  // for selection
				enableColumnMenus: false, //to hide ascending and descending column menu names
				enableRowHeaderSelection: false, // this is for check box to appear on grid options
				enableFiltering: false,
				enableGridMenu: false,		// for searching
				multiSelect:true,
				enableScrollbars : false,
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
	         	         '<ul class="icons-list">'+
	         				'<li class="dropdown">'+
	         			'<a  class="dropdown-toggle" data-toggle="dropdown">'+
	         				'<i class="icon-menu9"></i>'+
	         			'</a>'+
	         			'<ul class="dropdown-menu dropdown-menu-right">'+
	         				'<li ><a  ng-click="grid.appScope.showDeviceNotificationLogDetails({{row.entity.deviceId}},{{row.entity.jobId}});" data-toggle="modal" data-target="#DeviceNotification_List"><i class="icon-info22 text-primary"></i> Device Ack. Status</a></li>'+
	         				'<li ><a ng-click="grid.appScope.showDeviceLogDetails({{row.entity.deviceId}});" data-toggle="modal" data-target="#Device_List"><i class="icon-list-unordered text-primary user_editor_link"></i> View Device Log</a></li>'+
	         				'<li ><a ng-click="grid.appScope.showJobStatusOnDeviceList({{row.entity.deviceId}},{{row.entity.jobId}});" data-toggle="modal" data-target="#jobStatus"><i class=" icon-calendar5 text-primary"></i> View Shedule Info</a></li>'+
	         			'</ul>'+
	         		'</li>'+
	         	'</ul>'},
					/*{field: 'notificationType', name: ' Device Notification Type', headerCellClass: $scope.highlightFilteredHeader},
					{field: 'runNumDesc', name: ' Command Counts', headerCellClass: $scope.highlightFilteredHeader, cellTemplate:'<div>' +'<a href="{{row.entity.showScheduleUrlForRunNum}}" target="_blank">{{row.entity.runNumDesc}}</a>' +'</div>'},*/
	            ]
	        };
	    
	    
	    $scope.singleFilterForTestRunMappedDevice = function() {
		    $scope.testRunMappedDevices.data = $filter('filter')($scope.searchTestRunMappedDevices, $scope.searchTextForTestRunMappedDevice, undefined);
		   
		};
	    
	    /*/test Run code started***/
		
		$scope.startJob = function(){
			$(".btn").addClass("disabled");
			$scope.dataProcessing = true;
			
			if($rootScope.jobId == undefined || $rootScope.jobId == ""){
				$scope.dataProcessing = false;
				$scope.errorMsg = true;
				 $timeout(function () {
					 $scope.errorMsg = false;
                    }, 3000);
				$(".btn").removeClass("disabled");
				return false;
			}
			if(Devices.length <= 0){
				$scope.dataProcessing = false;
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
					"deviceList":Devices,
					"notificationTypes":notificationTypes,
	                "operation": "trigger_job",
	            })
			promise = testScriptService.commonServiceForJobSheduling(ScheduleData, userId, token);
			promise.then(
				function(data){
	                   
	                    	$scope.dataProcessing = false;
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
				function(err){
					$scope.dataProcessing = false;
					$(".btn").removeClass("disabled");
					console.log(err);
				}
			);
		}
		
		
		$scope.stopJob = function(){
			$(".btn").addClass("disabled");
			$scope.dataProcessing = true;
			
			if($rootScope.jobId == undefined || $rootScope.jobId == ""){
							$scope.dataProcessing = false;
							$scope.errorMsg = true;
							 $timeout(function () {
								 $scope.errorMsg = false;
		                        }, 3000);
							$(".btn").removeClass("disabled");
							return false;
			}
			
			if(Devices.length <= 0){
							$scope.dataProcessing = false;
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
					"deviceList":Devices,
					"notificationTypes":notificationTypes,
	                "operation": "stop_job",
	            })
			promise = testScriptService.commonServiceForJobSheduling(ScheduleData, userId, token);
			promise.then(
				function(data){
	                   
							$scope.dataProcessing = false;
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
				function(err){
					$scope.dataProcessing = false;
					$(".btn").removeClass("disabled");
					console.log(err);
				}
			);
		}
		
		
		$scope.reStartJob = function(){
			$(".btn").addClass("disabled");
			$scope.dataProcessing = true;
			
			if($rootScope.jobId == undefined || $rootScope.jobId == ""){
				$scope.dataProcessing = false;
				$scope.errorMsg = true;
				 $timeout(function () {
					 $scope.errorMsg = false;
                    }, 3000);
							return false;
			}
			if(Devices.length <= 0){
				$scope.dataProcessing = false;
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
					"deviceList":Devices,
					"notificationTypes":notificationTypes,
	                "operation": "trigger_restart_job",
	            })
			promise = testScriptService.commonServiceForJobSheduling(ScheduleData, userId, token);
			promise.then(
				function(data){
	                    
	                    	$scope.dataProcessing = false;
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
				function(err){
					$scope.dataProcessing = false;
					$(".btn").removeClass("disabled");
					console.log(err);
				}
			);
		}
		
		// job progress interval call till 100% job compleate
						$scope.refreshCallForJobProgress = function(userId, token, testrunID) {
							promise = testScriptService.ViewTestRunDeviceService(userId, token, testrunID);
			                promise.then(
			                    function (data) {
			                    	$scope.testRunMappedDevices.data = [];
			                    	$scope.testRunMappedDevices.data = data.testRunDeviceData;
			                        
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
											$scope.refreshCallForJobProgress(userId, token, testrunID);
									}, function() {
										console.log("Timer rejected!");
									});
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
			$scope.dataLoadingPopup = true;
			promise = testScriptService.showDeviceStatusDetails(userId,token,scope.deviceStatusLogListGridOptions.data[0].deviceId,scope.deviceStatusLogListGridOptions.data[0].jobId);
			promise.then(
				function(data){
					$scope.deviceStatusLogListGridOptions.data = [];
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
			$scope.header = "Device Log"
			promise = testScriptService.showDeviceLogDetails(userId, token,scope.deviceLogListGridOptions.data[0].deviceId);
			promise.then(
				function(data){
					$scope.deviceLogListGridOptions.data = [];
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
			promise = testScriptService.showDeviceNotificationLogDetails(userId,token,scope.deviceNotificationLogListGridOptions.data[0].deviceId,$scope.deviceNotificationLogListGridOptions.data[0].jobId);
			promise.then(
				function(data){
			    $scope.deviceNotificationLogListGridOptions.data = [];	
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
		
		 $scope.showJobStatusOnDeviceList = function(deviceId,jobId){
	    		$scope.dataLoadingPopup = true;
	    	 $scope.header = "Job Status"
	    	// $scope.jobStatusList = [];
	    		promise = testScriptService.showJobStatusOnDeviceList(userId,token,deviceId,jobId);
	    		promise.then(
	    			function(data){
	    				$scope.commandInfoList = $.parseJSON(data.commandInfo);
	    				$scope.testRunID = data.jobId;
	    				$scope.deviceID = data.deviceID;
	    				$scope.distinctCommandSize = data.distinctCommandSize;
	    				$scope.scheduledCommandsCount = data.scheduledCommandsCount;
	    				$scope.testRunName = data.jobName;
	    				$scope.jobStartDate = data.jobStartDate;
	    				$scope.jobStatusList.data = $scope.commandInfoList;
	    				$scope.dataLoadingPopup = false;
	    				if($scope.jobStatusList.data.length <= 25)
	    					$('.ui-grid-pager-panel').hide();
	    				else
	    					$('.ui-grid-pager-panel').show();
	    			},
	    			function(err){
	    				$scope.dataLoadingPopup = false;
	    			}
	    		);
	    	}
	        
	        $scope.jobStatusList = {
	                enableFiltering: true,
	                enableRowHeaderSelection: false,
	                enableRowSelection: true,
	                multiSelect: false,
	                enableHorizontalScrollbar:0,
	                columnDefs: [
	                    {field: 'scheduleDateAndTime', name: 'Schedule Date & Time', headerCellClass: $scope.highlightFilteredHeader},
	                   // {field: 'commandId', name: 'CommandId', headerCellClass: $scope.highlightFilteredHeader},
	                    {field: 'name', name: 'name', headerCellClass: $scope.highlightFilteredHeader},
	    				{field: 'actionDuration', name: 'Action Duration', headerCellClass: $scope.highlightFilteredHeader,cellTooltip: 
	                        function( row, col ) {
	                        return '' + row.entity.actionDuration + '';
	                      }},
	    				{field: 'testCaseId', name: 'Test Case Id', headerCellClass: $scope.highlightFilteredHeader,cellTooltip: 
	                        function( row, col ) {
	                        return '' + row.entity.testCaseId + '';
	                      }},
	    				{field: 'parameters', name: 'Parameters', headerCellClass: $scope.highlightFilteredHeader,cellTooltip: 
	                        function( row, col ) {
	                        return '' + row.entity.parameters + '';
	                      }},
	                ]
	            };
	        
	        var TestPlanId = ""; 
	        $scope.deviceProfileList = [];
	        var deepCopyObject = "";
	        $scope.createTestRun = function(row) {
	        	$scope.dataLoading = true;
	        	$(".save").addClass("disabled");
	        	$scope.scrollToTestRunDiv();
	        	$scope.createNewTestRunTab = true;
	        	$scope.mainTab = 1;
	        	TestPlanId = ""; 
	 	        $scope.deviceProfileList = [];
	 	        deepCopyObject = "";
	 	        $scope.RealDevicesOptions.data = [];
	 	       $scope.DeviceMapping.data = [];
	 	       
	 	      $("#mappingDataTable").css("display","block");
	 	     $("#testRunDeviceDataTable").css("display","none");
	 	     $scope.CreateTestRunRealDeviceOptions.data = [];
	 	       
	 	      $('#tableForTaskAndCommandGroup > tbody').empty();
	        	TestPlanId = row.entity.testplanId;
	        	
	        	 promise = testScriptService.getTestplan(token, userId, TestPlanId);
	             promise.then(
	                 function (data) {
		              
		                
		                deepCopyObject = jQuery.extend(true, new Object(), data);
	                    for(var i=0; i < deepCopyObject.jobVO.length; i++){
	                    	var arr = jQuery.makeArray( deepCopyObject.jobVO[i] );
							$scope.deviceProfileList.push({'deviceProfileName':deepCopyObject.jobVO[i].deviceProfileName,'deviceId':deepCopyObject.jobVO[i].deviceId,'deviceName':deepCopyObject.jobVO[i].deviceName,'content':arr});
	                    }
	                    
	                    $scope.selectedOption = $scope.deviceProfileList[0];
	                    $scope.taskTableArray = $scope.deviceProfileList[0].content[0].nodes;
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
		    	        
		               
		            },
		            function (err) {
		                console.log(err);
		            }
		        );
			   
			};
			
			$scope.renderHtmlForTask = function(taskTableArray){
				var html = "";
                angular.forEach(taskTableArray, function (node, index) {
                	if(node.loop != '0'){
                    html += '<tr class="border-double" style="background-color: #CCD0DA;">'+
					        	'<td class="text-semibold text-italic">'+node.title+'</td>'+
					        	'<td class="text-right"><input type="text"  style="width: 40px;" maxlength="4" value="'+node.sequenceNo+'" readonly/></td>'+
					        	'<td class="text-right"><input type="text" style="width: 40px;" maxlength="4" value="'+node.loop+'" readonly/></td>'+
					        '</tr>';
                    if ('nodes' in node) {
                        angular.forEach(node.nodes, function (node, index) {
					         html += '<tr class="border-double" >'+
					        	'<td class="text-semibold text-italic">'+node.title+'</td>'+
					        	'<td class="text-right"><input type="text" value="'+node.sequenceNo+'"  style="width: 40px;" maxlength="4"  readonly/></td>'+
					        	'<td class="text-right"><input type="text" value="'+node.loop+'" style="width: 40px;" maxlength="4"  readonly/></td>'+
					        '</tr>';
	        			if ('nodes' in node) {
	                            angular.forEach(node.nodes, function (node, index) {
	        						 html += '<tr>'+
							        	'<td class="text-left">'+node.title+'</td>'+
							        	'<td class="text-right"><input type="text" value="'+node.sequenceNo+'"  style="width: 40px;" maxlength="4"  readonly/></td>'+
							        	'<td class="text-right"><input type="text" value="'+node.loop+'" style="width: 40px;" maxlength="4"  readonly/></td>'+
							        '</tr>'+
							        '<tr style="background-color: #F9FCF1;">'+
							        	'<td colspan="3"><span class="text-italic" style="word-wrap: break-word;">'+node.commandParams+'</span></td>'+
							        	
							        '</tr>';
	                            });
	        			}
                        });
                     }
                   }
                });
                $('#tableForTaskAndCommandGroup > tbody').empty();
                $('#tableForTaskAndCommandGroup > tbody').append(html);
			}
			
			 $scope.changeDeviceProfile = function(){
				 $scope.taskTableArray = [];
				 $scope.taskTableArray =  $scope.selectedOption.content[0].nodes;
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
					multiSelect:true,
					enableScrollbars : false,
					enableVerticalScrollbar :3,
					enableHorizontalScrollbar:0,
	            columnDefs: [
	                {field: 'deviceId', name: 'Id', headerCellClass: $scope.highlightFilteredHeader,width:"20%"},
	                {field: 'deviceName', name: 'Name', headerCellClass: $scope.highlightFilteredHeader,width:"20%", cellTooltip: 
	 	               function( row, col ) {
	 	               return '' + row.entity.deviceName + '';
	 	             }},
	                {field: 'msisdn', name: 'MSISDN', headerCellClass: $scope.highlightFilteredHeader,width:"30%", cellTooltip: 
		 	               function( row, col ) {
		 	               return '' + row.entity.msisdn + '';
		 	             }},
					//{field: 'region', name: 'city', headerCellClass: $scope.highlightFilteredHeader},
					//{field: 'model', name: 'Model', headerCellClass: $scope.highlightFilteredHeader},
					//{field: 'network', name: 'network', headerCellClass: $scope.highlightFilteredHeader},
					{field: 'manufacturer', name: 'manufacturer', headerCellClass: $scope.highlightFilteredHeader,width:"30%", cellTooltip: 
		 	               function( row, col ) {
		 	               return '' + row.entity.manufacturer + '';
		 	             }},
	            ]
	        };
	        
	        
	        
	        $scope.singleFilterForRealDevices = function() {
			    $scope.RealDevicesOptions.data = $filter('filter')($scope.tempRealDeviceList, $scope.searchTextForRealDevices, undefined);
			   
			};

	        $scope.RealDevicesOptions.onRegisterApi = function (gridApi) {
	            $scope.gridApi1 = gridApi;
	            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
					$scope.dataProcessing = true;
					$scope.msg="";
	                $rootScope.RowRealDevices = row.entity;
	                $rootScope.RealDeviceId = row.entity.deviceId;
					var VirtualDeviceName = $scope.selectedOption.deviceName;
					var VirtualDeviceId = $scope.selectedOption.deviceId;
					var deviceProfileName = $scope.selectedOption.deviceProfileName;
					var RealDeviceName = row.entity.deviceName;
					var RealDeviceId =  row.entity.deviceId;
					if(row.isSelected && VirtualDeviceName != undefined){
					realDevices.push({
	                                'VirtualDeviceName': VirtualDeviceName,
	                                'deviceProfileName': deviceProfileName,
									'VirtualDeviceId': VirtualDeviceId,
	                                'deviceName': RealDeviceName,
	                                'deviceId': RealDeviceId,
									'model': row.entity.model,
									'manufacturer': row.entity.manufacturer,
									'msisdn': row.entity.msisdn,
									'row' : row,
									'testplanId': TestPlanId,
									'testrunId': 0,
									'virtualDeviceId': VirtualDeviceId,
									'realDeviceId': RealDeviceId
	                            });
						VirtualDevicelist.push({
									'testplanId': TestPlanId,
									'testrunId': 0,
									'virtualDeviceId': VirtualDeviceId,
									'realDeviceId': RealDeviceId
						});
					}else{
						for (var i = 0; i < realDevices.length; i++){
							if(realDevices[i].realDeviceId == row.entity.deviceId){
								realDevices.splice(i, 1);
								VirtualDevicelist.splice(i, 1);
							}
						}
					}
					$scope.addRealDevices = function () {
						 $scope.DeviceMapping.data =  jQuery.makeArray(realDevices);
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
					multiSelect:true,
					enableScrollbars : false,
					enableVerticalScrollbar :0,
					enableHorizontalScrollbar:0,
	                columnDefs: [
	                    {field: 'deviceProfileName', name: 'Device Profile', headerCellClass: $scope.highlightFilteredHeader,width:"30%", cellTooltip: 
			 	               function( row, col ) {
			 	               return '' + row.entity.deviceProfileName + '';
			 	             }},
	    				{field: 'deviceId', name: 'Id', headerCellClass: $scope.highlightFilteredHeader,width:"20%"},
	                    {field: 'deviceName', name: 'Name', headerCellClass: $scope.highlightFilteredHeader,width:"20%", cellTooltip: 
			 	               function( row, col ) {
			 	               return '' + row.entity.deviceName + '';
			 	             }},
	                    //{field: 'msisdn', name: 'MSISDN', headerCellClass: $scope.highlightFilteredHeader},
	    				{field: 'manufacturer', name: 'manufacturer', headerCellClass: $scope.highlightFilteredHeader,width:"30%", cellTooltip: 
			 	               function( row, col ) {
			 	               return '' + row.entity.manufacturer + '';
			 	             }},
	                ]
	            };
	        
	        $scope.DeviceMapping.onRegisterApi = function (gridApi) {
	            $scope.gridApi2 = gridApi;
	            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
					$scope.removeMappings = function () {
						 angular.forEach($scope.gridApi2.selection.getSelectedRows(), function (data, index) {
							 for (var i = 0; i < realDevices.length; i++){
									if(realDevices[i].deviceId == data.deviceId){
										realDevices.splice(i, 1);
										VirtualDevicelist.splice(i, 1);
									}
								}
							 $scope.RealDevicesOptions.data.push( data);
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
					multiSelect:true,
					enableScrollbars : false,
					enableVerticalScrollbar :0,
					enableHorizontalScrollbar:0,
	            columnDefs: [
	                {field: 'deviceId', name: 'Device ID', headerCellClass: $scope.highlightFilteredHeader,width:"20%", cellTooltip: 
		 	               function( row, col ) {
		 	               return '' + row.entity.deviceId + '';
		 	             }},
	                {field: 'deviceName', name: 'Device Name', headerCellClass: $scope.highlightFilteredHeader,width:"20%", cellTooltip: 
		 	               function( row, col ) {
		 	               return '' + row.entity.deviceName + '';
		 	             }},
	                {field: 'deviceMsisdn', name: ' MSISDN', headerCellClass: $scope.highlightFilteredHeader,width:"30%", cellTooltip: 
		 	               function( row, col ) {
		 	               return '' + row.entity.deviceMsisdn + '';
		 	             }},
	                {field: 'deviceManufacturer', name: 'Manufacturer', headerCellClass: $scope.highlightFilteredHeader,width:"30%", cellTooltip: 
		 	               function( row, col ) {
		 	               return '' + row.entity.deviceManufacturer + '';
		 	             }},
	            ]
	        };
	        
	        

	        $scope.CreateTestrun = function () {
	        	$(".save").addClass("disabled");
	        	$scope.waitMsgForSchedule = true;
	        	if($scope.deviceProfileList.length == 0){
	        		$scope.deviceProfileListError = true;
	        		  $timeout(function () {
	        			  $scope.deviceProfileListError = false;
                    }, 3000);
	        		  return false;
	        	}
	        	
	        	if($scope.DeviceMapping.data.length == 0){
	        		$scope.errorMsgForRealVirtualMapping = true;
	        		  $timeout(function () {
	        			  $scope.errorMsgForRealVirtualMapping = false;
                      }, 3000);
	        		  return false;
	        	}
	        	VirtualDevicelist = [];
	        	for(var i=0; i < $scope.DeviceMapping.data.length; i++){
			        	VirtualDevicelist.push({
							'testplanId': $scope.DeviceMapping.data[i].testplanId,
							'testrunId': 0,
							'virtualDeviceId': $scope.DeviceMapping.data[i].VirtualDeviceId,
							'realDeviceId': $scope.DeviceMapping.data[i].realDeviceId
			        	});
	        	}
	        	$rootScope.CreateTestRun_Data = JSON.stringify({
	                "testplanVo": {"testplanId": TestPlanId},
	                "jobVo": {},
	                "virtualRealDeviceList": VirtualDevicelist
	            });
	        	
	            if ($rootScope.RowRealDevices != null) {
					$(".btn-info").addClass("disabled");
	                var TestRunData = $rootScope.CreateTestRun_Data;
	                promise = testScriptService.CreateTestRun(TestRunData, token, userId);
	                promise.then(
	                    function (data) {
	                    	$scope.waitMsgForSchedule = false;
	                        var DependantTestRunName = data.NewTestRun.jobName;
							$(".schedule").removeAttr("disabled")
							$(".save").addClass("disabled");
							//Get devices service
							$scope.testRunIdShcedule = data.NewTestRun.jobId;
							$scope.TestRunName = data.NewTestRun.jobName;
							$scope.jobTemplateDescription = data.NewTestRun.jobDescription;
			                promise = testScriptService.ViewTestRunDeviceService(userId, token, data.NewTestRun.jobId);
			                promise.then(
			                    function (data) {
			                        console.log(JSON.stringify(data.testRunDeviceData));
			                        $("#mappingDataTable").css("display","none");
			                        $scope.CreateTestRunRealDeviceOptions.data = data.testRunDeviceData;
			                        $("#testRunDeviceDataTable").css("display","block");
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
	                
	                if(row.isSelected){
	                	createTestRunDevices.push(row.entity.deviceId);
				}else{
					for (var i = 0; i < createTestRunDevices.length; i++){
						if(createTestRunDevices[i] == row.entity.deviceId){
							createTestRunDevices.splice(i, 1);
						}
					}
				}
	            });

	            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {


	            });
				$scope.dataProcessing = false;
	        };
	        
	        
	      

	        $scope.schedule = function () {
	        	
	        	$scope.setErrorMessage = function(errorMessage){
	        		$scope.error=errorMessage;
	        	}
	        	
	    		
	    		if(($scope.Datendtime == undefined || $scope.Datendtime == "")){
	    			$scope.datentimeError = true;
					$(".schedule").removeAttr("disabled");
					 $timeout(function () {
						 $scope.datentimeError = false;
                     }, 3000);
					return false;
	    		}
	    		
	    		if( ($scope.EndDate == undefined || $scope.EndDate == "")){
	    			$scope.endDateError = true;
	    			 $timeout(function () {
						 $scope.endDateError = false;
                     }, 3000);
					$(".schedule").removeAttr("disabled");
					return false;
	    		}
	    		if($scope.testRunIdShcedule == undefined || $scope.testRunIdShcedule == ""){
	                           
	    		}
	    		
	    		if(createTestRunDevices.length <= 0){
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
	                "jobName": $scope.TestRunName,
	                "jobDescription": $scope.jobTemplateDescription,
	                "jobCreatedBy": userId,
	                "jobStartDate": "2016-02-08",
	                "jobStartDateTime": $scope.Datendtime,
//	                    "jobStartDate": $scope.StartDate,
	                "jobEndDate": $scope.EndDate,
	                "recurrence": $scope.recurrence,
	                "deviceList": createTestRunDevices,
	                "operation": "trigger_job",
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
	                    	$scope.waitMsgForSchedule1 = false;
	                        $rootScope.errorMsgForScheduleModel = data.errorDescription;
	                        $scope.errorMsgForSchedule = true;
	                       
	                        $timeout(function () {
	                        	$scope.errorMsgForSchedule = false;
	                        }, 3000);
	                        $scope.dataProcessing = false;
	                        $(".schedule").removeAttr("disabled");
	                    }

	                    if (data.status == "success") {
	                    	$scope.waitMsgForSchedule1 = false;
	                    	$scope.successMsgForSchedule = true;
	                        $rootScope.successMsgForScheduleModel = "Test Run has been Scheduled Successfully";

	                       
	                        $(".schedule").removeAttr("disabled");
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
	    		if(createTestRunDevices.length <= 0){
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
	                "operation": "trigger_job",
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
	        $scope.editTestPlan = function(row){
	        	$scope.dataProcessing = true;
	        	editVirtualDevice = [];
		        $scope.deviceProfileListForEdit = [];
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
	                	
	                	if(data.isMappedTestPlanTestRun.length > 0){
							$scope.isMappedTestPlanTestRun = data.isMappedTestPlanTestRun[0].isMappedTestPlanTestRun;
							
							if ($scope.isMappedTestPlanTestRun == "notExist") {
								$scope.scrollToTestRunDiv();
								$scope.mainTab = 2;
								cloneCopyOfJobDevice = jQuery.extend(true, new Object(), jQuery.makeArray( data.jobVO[0]) );
								cloneCopyOfJobDevice[0].jobDeviceId=0;
			                	
			                    deepCopyObjectForEditTestPlan = jQuery.extend(true, new Object(), data);
			                    for(var i=0; i < deepCopyObjectForEditTestPlan.jobVO.length; i++){
			                    	
			                    	if(editVirtualDevice[i].id == deepCopyObjectForEditTestPlan.jobVO[i].deviceId){
			                    		editVirtualDevice.splice(i,1);
			                    	}
			                    	var arr = jQuery.makeArray( deepCopyObjectForEditTestPlan.jobVO[i] );
								$scope.deviceProfileListForEdit.push({'deviceProfileName':deepCopyObjectForEditTestPlan.jobVO[i].deviceProfileName,'id':deepCopyObjectForEditTestPlan.jobVO[i].deviceName,'index':$scope.deviceProfileCounter,
									'deviceId':deepCopyObjectForEditTestPlan.jobVO[i].deviceId,'content':arr});
									$scope.deviceProfileCounter++;
			                    }
			                    // for default view of tree on 0th index
			                    $scope.tree2 =  $scope.deviceProfileListForEdit[0].content;
								$scope.activeProfile = 0;
								$scope.dataProcessing = false;
		                    }
		                    else if($scope.isMappedTestPlanTestRun == "isExist"){
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
	                    console.log(err);
	                }
	            );
	            // loaded test plan
				
			}
	        
	        
	        /** Function to add a new tab **/
	           $scope.boolean = false;
	            $scope.deviceProvileName = function() {
	            	$scope.boolean = false;
	            	$scope.err = false;
				};
	           
			$scope.addTab = function(){
				
				if($scope.deviceProfileListForEdit.length > 0){
				for (var i = 0; i < $scope.deviceProfileListForEdit.length; i++){
					if($scope.deviceProfileListForEdit[i].deviceProfileName == $scope.deviceProfileName){
						
						$scope.boolean = true;
						$scope.addProfileErrorMsg = "Please provide unique profile.."
						$scope.err = true;
						$timeout(function () {
							$scope.err = false;
                        }, 3000);
					}
				}
				
				if($scope.deviceProfileName == undefined || $scope.deviceProfileName == ""){
					$scope.addProfileErrorMsg = "Blank not allowed.."
						$scope.err = true;
					$timeout(function () {
						$scope.err = false;
                    }, 3000);
					return false;
				}
				

				if(!$scope.boolean){
					var temp = {};
					temp['deviceProfileName'] = $scope.deviceProfileName;
					temp['id'] = editVirtualDevice[$scope.deviceProfileCounter].name;
					temp['index'] = $scope.deviceProfileCounter;
					temp['deviceId'] = editVirtualDevice[$scope.deviceProfileCounter].id;
					temp['content'] =  jQuery.extend(true, new Object(), cloneCopyOfJobDevice);
					$scope.deviceProfileListForEdit.push(temp);
					$scope.tree2 =  $scope.deviceProfileListForEdit[$scope.deviceProfileCounter].content;
					$scope.activeProfile = $scope.deviceProfileCounter;
					$scope.deviceProfileCounter++;
					}
				
				}else{
					var temp = {};
					temp['deviceProfileName'] = $scope.deviceProfileName;
					temp['id'] = editVirtualDevice[$scope.deviceProfileCounter].name;
					temp['index'] = $scope.deviceProfileCounter;
					temp['deviceId'] = editVirtualDevice[$scope.deviceProfileCounter].id;
					temp['content'] =  jQuery.extend(true, new Object(), cloneCopyOfJobDevice);
					$scope.deviceProfileListForEdit.push(temp);
					$scope.tree2 =  $scope.deviceProfileListForEdit[$scope.deviceProfileCounter].content;
					$scope.activeProfile = $scope.deviceProfileCounter;
					$scope.deviceProfileCounter++;
					
				}
				
				
			}
			
			/** Function to delete a tab **/
			$scope.removeFancyTree = function(mapping){
				$scope.deviceProfileListForEdit.splice(mapping.index,1);
				$scope.deviceProfileCounter--;
			}
			
			$scope.selectedTab = 0; 
			
			/** Function to set selectedTab **/
			$scope.veiwFancyTree = function(mapping){
				$scope.tree2 =  $scope.deviceProfileListForEdit[mapping.index].content;
				$scope.activeProfile = mapping.index;
			
			}
	        
	        $scope.update = function() {
                
    			$scope.dataProcessing = true;
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
    			


    			 var jsonData = JSON.stringify(sendCreateData);
    				var jobDeviceId = "";
    				var jobId = "";
    				promise = testScriptService.updateCommandParametersJobDevice(token, userId, jsonData);
    				
    				promise.then(
    	                function (data) {
    	                    if (data.status == "Success") {
    						   $scope.dataProcessing = false;
    	                       $(".editTestPlan").removeClass("disabled");
    	                       $scope.successMessageEditTestPlanId = true;
    	                       $scope.successMessageEditTestPlan = "Test plan has been updated successfully ....";
    	                       $timeout(function () {
    	                    	   $scope.successMessageEditTestPlanId = false;
    	                    	   $scope.editTestPlanTab = false;
   	                        }, 3000);
    	                      
    	                      
    	                    }
    	                    else {
    							$scope.dataProcessing = false;
    							$scope.errMessageEditTestPlanId = true;
    	                       $scope.errMessageEditTestPlan = "Error Occuring while updating ...";
    							$(".editTestPlan").removeClass("disabled");
    							 $timeout(function () {
    								 $scope.errMessageEditTestPlanId = false;
     	                        }, 3000);

    	                    }

    	                },
    	                function (err) {
    	                    console.log(err);
    	                }
    	            );


            }
	       /* end edit test plan*/
	        
	        /* view test plan */
	        $scope.viewTestPlan = function(row){
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
							angular.forEach($scope.testPlanView.nodes , function (children) {
								var temp = {};
								var i = 0;
								$scope.testPlanViewCommandDetails = [];
								angular.forEach(children.nodes , function (childNode) {
									
									angular.forEach(childNode.nodes , function (childOfChildNode) {
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
	        
	        
	        $scope.viewCommands = function(listOfCommandsTemp,totalCommandsCountTemp){
	        	$scope.testCaseDetails = false;
	        	$scope.commandsDetails = true;
	        	$scope.listOfCommands = [];
	        	$scope.totalCommandsCount = totalCommandsCountTemp;
	        	$scope.listOfCommands = listOfCommandsTemp;
	        	
	        	
	        }
	        
	        $scope.backToTestCaseGroup = function(){
	        	$scope.testCaseDetails = true;
	        	$scope.commandsDetails = false;
	        }
	       
	        /* view test plan */
	        
	        /* popover for the edit the test plan */
	        
	        $scope.createFrom = function (scope,e) {
				$scope.showPopover = true;
					overrideNode= scope;
					commandIndex=0;
					var updateCommandParameters = scope.$modelValue.commandParams;
					$(".editable-input").empty();
					//$("#updateCommandParametersForm").append('<input type="hidden" value="'+inputFiledId+'" id="test"/>');
					updateCommandParameters.split(",").forEach(function(updateCommandParameters,i){
							
						//		$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="'+updateCommandParameters+'" /></div><br/>');
	//console.log("updateCommandParameters"+updateCommandParameters);
						if (updateCommandParameters.indexOf("=") >= 0){
							
							var commandParam=updateCommandParameters.split('=');
							console.log("commandParam: "+commandParam);
							$(".editable-input").append('<div class="editable-address form-group col-md-12"><div class="col-md-6"><input name="commandLabel[' + i + '].Name" type="text" value="'+commandParam[0]+'" class="form-control  form-control-label"/></div><div class="col-md-6"><input name="command[' + i + '].Name" type="text" value="'+commandParam[1]+'" class="form-control"/></div></div>');

						}
					//	$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="'+updateCommandParameters+'" /></div><br/>');
						commandIndex=i;
						  });
					$('.popover').css("top", $(e.target).offset().top+24);
					 
	        }
			
			$scope.addField = function (formID) {
//				$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="" /></div><br/>');
				 commandIndex++;
				$(".editable-input").append('<div class="editable-address form-group col-md-12 "><div class="col-md-6"><input class="form-control" name="commandLabel[' + commandIndex + '].Name" type="text" value="" /></div><div class="col-md-6"><input class="form-control" name="command[' + commandIndex + '].Name" type="text" value="" /></div></div>');
				$("input[name='commandLabel["+ commandIndex +"].Name']").focus(); 
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
				for(var index=0;index<=commandIndex;index++){
					if($("input[name='commandLabel["+ index +"].Name']").val()!=undefined && $("input[name='commandLabel["+ index +"].Name']").val() != '' && $("input[name='command[" + index +"].Name']").val() != undefined && $("input[name='command[" + index +"].Name']").val() != '')
					updatedParametrs+=$("input[name='commandLabel["+ index +"].Name']").val()+"="+$("input[name='command[" + index +"].Name']").val()+",";
				}
			//	console.log("updatedParametrs"+updatedParametrs);
			if(overrideNode.$modelValue.commandParams != updatedParametrs.substring(0,updatedParametrs.length-1)){
				 overrideNode.$modelValue.commandParams = updatedParametrs.substring(0,updatedParametrs.length-1);
				 $scope.isUpdatable =true;
				 
			}
			$scope.showPopover = false;
	        }
			
			$scope.updateCommandParametersClose = function () {
				$scope.showPopover = false;
			}
			/* end popover */
		
      
      
	   
});

	
		
		
    


