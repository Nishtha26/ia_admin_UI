
oTech.controller('DashBoardController', function($timeout, $scope, $rootScope, $location, AppServices, $stateParams, MapServices, GraphServices,testScriptService, $timeout,$interval){
	$rootScope.name = sessionStorage.getItem("username");
	$scope.email = sessionStorage.getItem("email");
	$rootScope.role = sessionStorage.getItem("role");
	
	$rootScope.slideContent();
	window.onresize = function(event) {
		$rootScope.slideContent();
    };	
	var token = sessionStorage.getItem("token");
	var userId = sessionStorage.getItem("userId");
	$scope.loadingImageName= oApp.config.loadingImageName;
	 var allOfTheData;
	 
	 $scope.signOut = function(){
		sessionStorage.clear();
		console.log('logging out');
	
		$rootScope.menuData=null;
		$rootScope.role=null;
		$location.path('/login');
		$scope.listTypeForPagination = "";
	
	}
	 $scope.startUsageDate = "";
	  $scope.dtmax = new Date();
	 $scope.createTestPlan = function () {

         $location.path('/dashboard/createTestPlan');
      }
		/* pagination code  start ****************/
		
		var startLimit = 1;
		$scope.itemsPerPage = 10;
		$scope.currentPage = 0;
		$scope.endLimit=$scope.itemsPerPage;
		var allOfTheData;
		$scope.totalRecords=0;

		
		$scope.range = function() {
					var rangeSize = 6;
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
					return $scope.currentPage === 0 ? "disabled" : "";
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
				 $scope.createNewDatasource = function() {
						$scope.dataLoading = true;
						if($scope.listTypeForPagination=="deviceList"){
						$scope.deviceListGridOptions.data = allOfTheData.slice( startLimit, $scope.endLimit);
						}
						else if($scope.listTypeForPagination=="activeDeviceList"){
							$scope.activeDeviceGridOptions.data = allOfTheData.slice( startLimit, $scope.endLimit);	
						}
						$scope.dataLoading = false;
					}
	/*
		To find Devices count
	*/
	$scope.findDeviceCount = function(){
		var promise = AppServices.DeviceCount(userId, token);
		promise.then(
			function(data){
				$scope.deviceCount = data.deviceCount;
			},
			function(err){
				$scope.deviceCount = 0;
			}
		);
	}
	/*
		To find active devices count
	*/
	$scope.findActiveDeviceCount = function(){
		promise = AppServices.ActiveDeviceCount(userId, token);
		promise.then(
			function(data){
				$scope.activeDeviceCount = data.activeCount;
			},
			function(err){
				$scope.activeDeviceCount = 0;
			}
		);
	}
	/*
		To find job count
	*/
	$scope.findScheduledJobCount = function(){
		promise = AppServices.ScheduledJobCount(userId, token);
		promise.then(
			function(data){
				$scope.scheduledJobCount = data.jobCount;
			},
			function(err){
				$scope.scheduledJobCount = 0;
			}
		);
	}
	/*
		To find active job count
	*/
	$scope.findActiveJobCount = function(){
		promise = AppServices.ActiveJobCount(userId, token);
		promise.then(
			function(data){
				$scope.activeJobCount = data.jobCount;
			},
			function(err){
				$scope.activeJobCount = 0;
			}
		);
	}
	/*
		To get dashboard menu data
	*/
	$scope.getDashBoardMenu = function(){
		if($rootScope.menuData == undefined){
			$rootScope.getMenuData();
		}
	}
	/*
		To get favourite reports
	*/
	$scope.getFavouriteReports = function(){
		if($rootScope.Favourites == undefined){
			$rootScope.getFavouriteReports();
		}
	}
	/*
		To get device usage data
	*/
	$scope.getDeviceUsageData = function(){
		promise = GraphServices.GetDeviceUsageData(userId, token);
		promise.then(
			function(data){
				console.log(data);
				$scope.DeviceUsageData = data;
				GraphServices.DahsboardDevicesUsage(data);
			},
			function(err){
			
			}
		);
	}
	/*
		To get device availability data
	*/
	$scope.getDeviceAvailabilityData = function(){
		promise = GraphServices.GetDeviceAvailabilityData(userId, token);
		promise.then(
			function(data){
				$scope.DeviceAvailabilityData = data;
				GraphServices.DahsboardDevicesAvailability(data);
				$('.highcharts-container').css({"height":"240px"});
			},
			function(err){
			
			}
		);
	}
	/*
		To get Executive status data
	*/
	$scope.getExecutiveStatusData = function(date)
	{
		
		 // promise = GraphServices.GetExecutiveStatusData(userId,'2015-05-19', token);
		promise = GraphServices.GetExecutiveStatusData(userId,date, token);
		console.log('getExecutiveStatusData : '+date);
		promise.then(
			function(data){
				$scope.ExecutiveStatusData = data;
				
				
	if(!data.status.length|| !data.labels.length || !data.execStatusList.length){
	console.log(' response data array is not empty');
	 GraphServices.DahsboardExecutiveStatus(data);
	}

					if(data.status.length && data.labels.length && data.execStatusList.length){
				GraphServices.DahsboardExecutiveStatus(data);
				}
			},
			function(err){
				
			}
		);
	}
	/*
		To get Map data
	*/
	$scope.getMapData = function(){
		$("#replay_content").hide();
		$scope.dataLoadingMap=true;
		$scope.live_heading=true;
		$scope.replay_heading=false;
		$scope.livemap_container=true;
		$scope.replaymap_container=false;
		$("#live_span").addClass("map-active");
		$("#replay_span").removeClass("map-active");
		promise = MapServices.GetMapLocations(userId, token);
		promise.then(
			function(data){
				var lat = [];
				var lon = [];
				var deviceData=[];
				for(var s in data){
					if(data[s].deviceLogJson){
				if(data[s].deviceLogJson[1].Latitude!=0 && data[s].deviceLogJson[2].Longitude!=0){
					lat.push(data[s].deviceLogJson[1].Latitude);
					lon.push(data[s].deviceLogJson[2].Longitude);
					deviceData[s]=data[s];
						}
				}
				}
				MapServices.DahsboardShowMap(deviceData, lat, lon);
				$scope.dataLoadingMap=false;
			},
			function(err){
				$scope.dataLoadingMap=false;
			}
		);
	}
	
	$scope.deviceCountInfo = function(){
		promise = GraphServices.deviceCountInfo(userId, token);
		promise.then(
			function(data){
				$scope.registeredDeviceCount = data.registered;
				$scope.approvedDeviceCount = data.approved;
				$scope.availableDeviceCount = data.available;
				$scope.activeDeviceCount = data.activeDevice;
				var approvedDevicePer=($scope.approvedDeviceCount*100)/$scope.registeredDeviceCount;
				$scope.approvedDeviceCountPer=(!isNaN(approvedDevicePer))? parseFloat(approvedDevicePer).toFixed(2):0;
				var availableDevicePer=($scope.availableDeviceCount*100)/$scope.approvedDeviceCount;
				$scope.availableDeviceCountPer=(!isNaN(availableDevicePer))? parseFloat(availableDevicePer).toFixed(2):0;
				var activeDeviceCountPer=($scope.activeDeviceCount*100)/$scope.approvedDeviceCount;
				$scope.activeDeviceCountPer=(!isNaN(activeDeviceCountPer))? parseFloat(activeDeviceCountPer).toFixed(2):0.00;;
			},
			function(err){
			}
		);
	}
	

	$scope.testUsageLoad = function(){
		var today=new Date()
//		var today2=new Date();
//		var endDateTime=today;
		//today2.setDate(today2.getDate() - 1);
//		var startDateTime=today;/*today*/
		
		var start = today;

		$('.daterange-basic').daterangepicker({
			  startDate: start,
		      endDate: start,
			locale: {
			      format: 'YYYY-MM-DD'
			    },
			    
		    applyClass: 'bg-slate-600',
		    cancelClass: 'btn-default'
		});
		
		var endDateTimeStr =jQuery.format.date(start, "yyyy-MM-dd 23:59");
			var startDateTimeStr =jQuery.format.date(start, "yyyy-MM-dd 00:00");
		//$("#testRunDate").val(jQuery.format.date(startDateTime, "yyyy-MM-dd"))
			
			$scope.testUsage(startDateTimeStr,endDateTimeStr);
	}
	
	$scope.testUsage= function(startDateTimeStr,endDateTimeStr){
		$("#dataLoadingTest").show();
		promise = testScriptService.countTestUsage( token,userId, startDateTimeStr,endDateTimeStr);
		promise.then(
			function(data){
				$scope.totalActiveTestRunCount = data[0].totalActiveTestRunCount;
				$scope.totalDevicesAllocatedForTestRunCount = data[0].totalDevicesAllocatedForTestRunCount;
				$scope.totalTestPlanCount = data[0].totalTestPlanCount;
				$scope.totalTestRunCount = data[0].totalTestRunCount;
				$("#dataLoadingTest").hide();
				/*var approvedDevicePer=($scope.approvedDeviceCount*100)/$scope.registeredDeviceCount;
				$scope.approvedDeviceCountPer=(!isNaN(approvedDevicePer))? parseFloat(approvedDevicePer).toFixed(2):0;
				var availableDevicePer=($scope.availableDeviceCount*100)/$scope.approvedDeviceCount;
				$scope.availableDeviceCountPer=(!isNaN(availableDevicePer))? parseFloat(availableDevicePer).toFixed(2):0;
				var activeDeviceCountPer=($scope.activeDeviceCount*100)/$scope.approvedDeviceCount;
				$scope.activeDeviceCountPer=(!isNaN(activeDeviceCountPer))? parseFloat(activeDeviceCountPer).toFixed(2):0.00;;*/
			},
			function(err){
				$("#dataLoadingTest").hide();
			}
		);
	}
	
	$scope.testUsageLoad();
//	$scope.findDeviceCount();
	$scope.deviceCountInfo();
	$scope.getDeviceUsageData();
/*	$scope.findActiveDeviceCount();
	$scope.findScheduledJobCount();
	$scope.findActiveJobCount();
	
	$scope.getFavouriteReports();
	
	$scope.getDeviceAvailabilityData();*/
	$scope.getDashBoardMenu();
	var date = $rootScope.getTodayDate();
	$scope.getExecutiveStatusData(date);
	$scope.getMapData();
	
	  
	 $(function () {
		$("#datepicker").datepicker({ 
			autoclose: true, 
			todayHighlight: true,
			format : 'yyyy-mm-dd'
		}).datepicker('update', new Date())
		.on('changeDate', function(e)
			{
				 date = document.getElementById('dat').value;
				$scope.getExecutiveStatusData(date)
			});
		
		
/*		var start = moment();
		$scope.startUsageDate=start;
		$('.daterange-basic').daterangepicker({
			  startDate: start,
		      endDate: start,
			locale: {
			      format: 'YYYY-MM-DD'
			    },
		    applyClass: 'bg-slate-600',
		    cancelClass: 'btn-default'
		});*/
	});

	
	$scope.jobListGridOptions = oApp.config.jobListGridOptions;//For Jobs Grid View
	
	$scope.activeJobListGridOptions = oApp.config.activeJobListGridOptions;//For Active Jobs Grid View
	$scope.activeJobListGridOptionsNew = oApp.config.activeJobListGridOptionsNew;//For Active Jobs Grid View new 
	
	
	$scope.activeDeviceGridOptions = oApp.config.activeDeviceGridOptions;//For Active Devices Grid View
	
	$scope.deviceListGridOptions = oApp.config.deviceListGridOptions;//For Devices Grid View
	
	/*
		Function to show Job List Grid
	*/
	$scope.showJobList = function(){
		$scope.dataLoading = true;
		promise = AppServices.GetJobListData(userId, token);
		promise.then(
			function(data){
				$scope.JobList = data;
				$scope.jobListGridOptions.data = data.scheduledJobList;
				$scope.dataLoading = false;
				if($scope.jobListGridOptions.data.length <= 25){
					$('.ui-grid-pager-panel').hide();
				}
				else
					$('.ui-grid-pager-panel').show();
			},
			function(err){
				
			}
		);
	}
	
	/*
		Function to show Active Job List Grid
	*/
	$scope.showActiveJobList = function(){
		$scope.dataLoading = true;
		promise = AppServices.GetActiveJobListData(userId, token);
		promise.then(
			function(data){
				$scope.ActiveJobList = data;
				$scope.activeJobListGridOptionsNew.data = data.activeJobList;
				$scope.dataLoading = false;
				if($scope.activeJobListGridOptionsNew.data.length <= 25){
					$('.ui-grid-pager-panel').hide();
				}
				else
					$('.ui-grid-pager-panel').show();
			},
			function(err){
				
			}
		);
	}
	  
	/*
		Function to show Active Device List Grid
	*/
	
	$scope.showActiveDeviceList = function(){
		$scope.dataLoading = true;
		startLimit=1;
		$scope.listTypeForPagination="activeDeviceList";
		promise = AppServices.GetActiveDeviceData(userId, token);
		promise.then(
			function(data){
				$scope.ActiveDeviceList = data;
				//$scope.activeDeviceGridOptions.data = data.activeDevicesList;
				$scope.totalRecords = data.activeDevicesList;
				allOfTheData = data.activeDevicesList;
				$scope.activeDeviceGridOptions.data = data.activeDevicesList.slice( 0, $scope.itemsPerPage);
				$scope.dataLoading = false;
				/*if($scope.activeDeviceGridOptions.data.length <= 25)
					$('.ui-grid-pager-panel').hide();
				else
					$('.ui-grid-pager-panel').show();*/
			},
			function(err){
				
			}
		);
	}
	

	$scope.showDeviceList = function(){
		$scope.dataLoading = true;
		startLimit=1;
		$scope.listTypeForPagination="deviceList";
		promise = AppServices.GetDeviceData(userId, token);
		promise.then(
			function(data){
				$scope.DeviceList = data;
				$scope.totalRecords = data.deviceCount;
				allOfTheData = data.devicesList;
				$scope.deviceListGridOptions.data = data.devicesList.slice( 0, $scope.itemsPerPage);
				//$scope.deviceListGridOptions.data = data.devicesList;
				$scope.dataLoading = false;
			/*	if($scope.deviceListGridOptions.data.length <= 25)
					$('.ui-grid-pager-panel').hide();
				else
					$('.ui-grid-pager-panel').show();*/
			},
			function(err){
				
			}
		);
	}
	$scope.populateDeviceList = function(){
		$scope.dataLoading = true;
		startLimit=1;
		promise = AppServices.GetDeviceData(userId, token);
		promise.then(
			function(data){
				$scope.DeviceList =  data.devicesList;
			
			},
			function(err){
				
			}
		);
	}
	$scope.populateDeviceList();
	
	$scope.showReplayMap = function(){
	 	if(!$scope.replayform.$invalid){
    		
		var deviceId = $('#deviceId').val(); 
		
		$scope.dataLoadingMap=true;
		$scope.live_heading=false;
		$scope.replay_heading=true;
		$scope.livemap_container=false;
		$scope.replaymap_container=true;
		$("#live_span").removeClass("map-active");
		$("#replay_span").addClass("map-active");
		
		
		
		 var fromDate = $('#fromDate').val();
		 var toDate = $('#toDate').val();
		 
		 var data = {"deviceId" : deviceId,"fromDate" : fromDate,"toDate" : toDate}; 
		 console.log(data);
		
			$scope.DefaultReplayMap = false ;
			$scope.rePlayMap = true;
			promise = MapServices.getreplay(token,data);
			promise.then(
				function(data){  if(data.length > 0){
					var lat = [];
					var lon = [];
					var deviceData = [];
					for(var s in data){
						if(data[s].deviceLogJson[1].Latitude!=0 && data[s].deviceLogJson[2].Longitude!=0){
							deviceData.push(data[s]);
						lat.push(data[s].deviceLogJson[1].Latitude);
						lon.push(data[s].deviceLogJson[2].Longitude);
						}
					}  
				//	 console.log("from replay js");
				//	 console.log("lon"+lon);
					MapServices.showReplayMap(deviceData,lat, lon);
					 $("#replay_content").toggle();
					}
					else{
						   MapServices.clearReplayMap();
						     $scope.DefaultReplayMap = true ;
		  	                $scope.rePlayMap =false ;
						 //   alert('No Records Was Found')
						    $scope.showErrorMessage("replay_map_error","No Records Was Found");
						 
					    }
				$scope.dataLoadingMap=false;
				},
				function(err){
					$scope.dataLoadingMap=false;
				}
			);
	 	}
	}
	 $scope.closeReplayDropDown=function(){
		  $("#replay_content").toggle();
	}
	 $scope.onPageSizeChanged = function() {
        $scope.createNewDatasource();
    };
	
	/* redirection to replay map*/
	 $scope.gotoReplayMap = function(){
		 
          $location.path('/dashboard/replayMap');		
	}
	
	
	/* redirection to Live map*/
	 $scope.gotoLiveMap = function(){

		
      $location.path('/dashboard/deviceMaps');	

      
	}

	
	var timer=$interval(function(){
	
	console.log('updating divs after 30 seconds.....');
	$scope.findDeviceCount();
//	$scope.findActiveDeviceCount();
//	$scope.findScheduledJobCount();
//	$scope.findActiveJobCount();
//	$scope.getDeviceAvailabilityData();
	//$scope.getDeviceUsageData();
	$scope.getExecutiveStatusData(date);
	if($scope.livemap_container){
	$scope.getMapData();
	}
	
	},60 * 1000);

	 $scope.$on("$destroy",function( event ) {
		 
		 if(angular.isDefined(timer))
          {
            $interval.cancel(timer);
			console.log('cancel timer...');
            timer=undefined;
          }
		  
                        });
	 
	
	  
	 $(function () {
		
		
		var startDateTimeStr=""
			var	endDateTimeStr="";

		$('.daterange-basic').on('apply.daterangepicker', function(ev, picker) {
			
			startDateTimeStr=picker.startDate.format('YYYY-MM-DD 00:00')
			  console.log("startDateTimeStr "+startDateTimeStr);
			endDateTimeStr=picker.endDate.format('YYYY-MM-DD 23:59')
			  console.log("endDateTimeStr: "+endDateTimeStr);
			$scope.testUsage(startDateTimeStr,endDateTimeStr);
			});
		
	});
	 
						
	   
});
