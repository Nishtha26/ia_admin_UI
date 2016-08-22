oTech.controller('DashBoardController', function($timeout, $scope, $rootScope, $location, AppServices, $stateParams, MapServices, GraphServices, $timeout,$interval){
	$rootScope.name = sessionStorage.getItem("username");
	$scope.email = sessionStorage.getItem("email");
	$rootScope.role = sessionStorage.getItem("role");
	
	$rootScope.slideContent();
	window.onresize = function(event) {
		$rootScope.slideContent();
    };	
	var token = sessionStorage.getItem("token");
	var userId = sessionStorage.getItem("userId");
	
	 var allOfTheData;
	 
	 $scope.signOut = function(){
		sessionStorage.clear();
		console.log('logging out');
	
		$rootScope.menuData=null;
		$rootScope.role=null;
		$location.path('/login');
	
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
				$scope.activeDeviceCount = data.activeDevicesList.length;
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
	$scope.getExecutiveStatusData = function(date){
		
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
			},
			function(err){
			}
		);
	}
	$scope.findDeviceCount();
	$scope.findActiveDeviceCount();
	$scope.findScheduledJobCount();
	$scope.findActiveJobCount();
	$scope.getDashBoardMenu();
	$scope.getFavouriteReports();
	$scope.getDeviceUsageData();
	$scope.getDeviceAvailabilityData();
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
				var date = document.getElementById('dat').value;
				$scope.getExecutiveStatusData(date)
			});
	});
	
	
	$scope.jobListGridOptions = oApp.config.jobListGridOptions;//For Jobs Grid View
	
	$scope.activeJobListGridOptions = oApp.config.activeJobListGridOptions;//For Active Jobs Grid View
	
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
				$scope.activeJobListGridOptions.data = data.activeJobList;
				$scope.dataLoading = false;
				if($scope.activeJobListGridOptions.data.length <= 25){
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
		promise = AppServices.GetActiveDeviceData(userId, token);
		promise.then(
			function(data){
				$scope.ActiveDeviceList = data;
				$scope.activeDeviceGridOptions.data = data.activeDevicesList;
				$scope.dataLoading = false;
				if($scope.activeDeviceGridOptions.data.length <= 25)
					$('.ui-grid-pager-panel').hide();
				else
					$('.ui-grid-pager-panel').show();
			},
			function(err){
				
			}
		);
	}
	

	$scope.showDeviceList = function(){
		$scope.dataLoading = true;
		promise = AppServices.GetDeviceData(userId, token);
		promise.then(
			function(data){
				$scope.DeviceList = data;
				$scope.deviceListGridOptions.data = data.devicesList;
				$scope.dataLoading = false;
				if($scope.deviceListGridOptions.data.length <= 25)
					$('.ui-grid-pager-panel').hide();
				else
					$('.ui-grid-pager-panel').show();
			},
			function(err){
				
			}
		);
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
	$scope.findActiveDeviceCount();
	$scope.findScheduledJobCount();
	$scope.findActiveJobCount();
	$scope.getDeviceAvailabilityData();
	//$scope.getDeviceUsageData();
//	$scope.getExecutiveStatusData(date);
	$scope.getMapData();
	
	},60 * 1000);

	 $scope.$on("$destroy",function( event ) {
		 
		 if(angular.isDefined(timer))
          {
            $interval.cancel(timer);
			console.log('cancel timer...');
            timer=undefined;
          }
		  
                        });
						
	   
});
