
oTech.controller('PerformanceResultController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		$scope.selected = sessionStorage.selected;
		$scope.selected1 = sessionStorage.selected1;
		 $scope.Market = sessionStorage.Market;
	    $scope.Values = sessionStorage.selectedDevices;
	//	$scope.selectedZones = sessionStorage.selectedZones.split(',');
		var token = sessionStorage.token;
		$scope.name = sessionStorage.getItem("username");
		$scope.start = sessionStorage.startDate;
		$scope.end = sessionStorage.endDate;
		var menuSelected =sessionStorage.selected.replace(/ /g,"");
		var subMenuSelected =sessionStorage.selected1.replace(/ /g,"");

		$rootScope.slideContent();
		window.onresize = function(event) {
			$rootScope.slideContent();
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
			To get Summary Performance Result for CallPeformance
		*/
		$scope.getCallPerformanceSummaryResult = function(){
			$scope.dataLoading = true;
			var Device_List = sessionStorage.selectedDevices.substr(0, (sessionStorage.selectedDevices).indexOf('  ;'));
			if(Device_List=="")
			{
				var data = {
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			    };
			}
			else{
				var data = {
			    "market" : sessionStorage.Market,
				"Device_List" : Device_List,
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			    };
			}
			
			var promise = AppServices.getPerformanceReport(token, data);
			promise.then(
				function(data){
					$scope.dataLoading = false;
					$("#performanceResult").html(data);
				},
				function(err){
				}
			);
		}
		/*
			To get TimeLine Performance Result for CallPerformance
		*/
		$scope.getCallPerformanceTimeLineResult = function(){
			$scope.dataLoading = true;
			var Device_List = sessionStorage.selectedDevices.substr(0, (sessionStorage.selectedDevices).indexOf('  ;'));
			if(Device_List=="")
			{
				var data = {
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			    };
			}
			else{
				var data = {
			    "market" : sessionStorage.Market,
				"Device_List" : Device_List,
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			    };
			}
		
			var promise = AppServices.getTimeLinePerformanceReport(token, data);
			promise.then(
				function(data){
					$scope.dataLoading = false;
					$("#performanceResult").html(data);
				},
				function(err){
				}
			);
		}
		/*
		   
		   To get   DataPerformance TimeLine Result
		
		*/
		$scope.getDataPerformanceTimelineResult = function(){
			//alert('kok');
			$scope.dataLoading = true;
			var Device_List = sessionStorage.selectedDevices.substr(0, (sessionStorage.selectedDevices).indexOf('  ;'));
			if(Device_List=="")
			{
				var data = {
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			    };
			}
			else{
				var data = {
			    "market" : sessionStorage.Market,
				"Device_List" : Device_List,
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			    };
			}
			var promise = AppServices.getTimeLinePerformanceReport_DataPerformance(token, data);
			promise.then(
				function(data){
					$scope.dataLoading = false;
					$("#performanceResult").html(data);
				},
				function(err){
				}
			);
		}
		/*
		
		To get Tabular Performance Result for DataPerformance
		
		*/
		$scope.getDataPerformanceTabularResult = function(){
			//alert('k');
			$scope.dataLoading = true;
			var Device_List = sessionStorage.selectedDevices.substr(0, (sessionStorage.selectedDevices).indexOf('  ;'));
			if(Device_List=="")
			{
				var data = {
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			    };
			}
			else{
				var data = {
			    "market" : sessionStorage.Market,
				"Device_List" : Device_List,
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			    };
			}
			var promise = AppServices.getTabularPerformanceReport_DataPerformance(token, data);
			promise.then(
				function(data){
					$scope.dataLoading = false;
					$("#performanceResult").html(data);
				},
				function(err){
				}
			);
		}
		/*
		
		To get voiceQuality Summary Report
		
		*/
		$scope.getVoiceQualitySummaryResult = function(){
			
			$scope.dataLoading = true;
			var Device_List = sessionStorage.selectedDevices.substr(0, (sessionStorage.selectedDevices).indexOf('  ;'));
			if(Device_List=="")
			{
				var data = {
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			    };
			}
			else{
				var data = {
			    "market" : sessionStorage.Market,
				"Device_List" : Device_List,
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			    };
			}
			
			var promise = AppServices.getSummaryPerformanceReport_VoiceQuality(token, data);
			promise.then(
				function(data){
					$scope.dataLoading = false;
					$("#performanceResult").html(data);
				},
				function(err){
				}
			);
		}
		/*
		
		To get voiceQuality Timeline Report
		
		*/
		$scope.getVoiceQualityTimelineResult = function(){
			//alert('k');
			$scope.dataLoading = true;
			var Device_List = sessionStorage.selectedDevices.substr(0, (sessionStorage.selectedDevices).indexOf('  ;'));
			var data = {
			    "market" : sessionStorage.Market,
				"Device_List" : Device_List,
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			};
			var promise = AppServices.getTimelinePerformanceReport_VoiceQuality(token, data);
			promise.then(
				function(data){
					$scope.dataLoading = false;
					$("#performanceResult").html(data);
				},
				function(err){
				}
			);
		}
			/*
		
		To get voiceQuality Tabular Report
		
		*/
		$scope.getVoiceQualityTabularResult = function(){
			//alert('k');
			$scope.dataLoading = true;
			var Device_List = sessionStorage.selectedDevices.substr(0, (sessionStorage.selectedDevices).indexOf('  ;'));
			var data = {
			    "market" : sessionStorage.Market,
				"Device_List" : Device_List,
				"Start Date" : sessionStorage.startDate,
				"End Date" : sessionStorage.endDate,
				"Start Time": sessionStorage.startTime + ':00',
				"End Time" : sessionStorage.endTime + ':00'
			};
			var promise = AppServices.getTabularPerformanceReport_VoiceQuality(token, data);
			promise.then(
				function(data){
					$scope.dataLoading = false;
					$("#performanceResult").html(data);
				},
				function(err){
				}
			);
		}
		
		/*
			To get favourite reports
		*/
		$scope.getFavouriteReports = function(){
			if($rootScope.Favourites == undefined){
				$rootScope.getFavouriteReports();
			}
		}
	
		$scope.getDashBoardMenu();
		$scope.getFavouriteReports();
		if(subMenuSelected == 'summary' && menuSelected == 'CallPerformance'){
			$scope.getCallPerformanceSummaryResult();}
		else if(subMenuSelected == 'timeline' && menuSelected == 'CallPerformance'){
			$scope.getCallPerformanceTimeLineResult();}
		else if(subMenuSelected == 'timeline' && menuSelected == 'DataPerformance'){
			$scope.getDataPerformanceTimelineResult(); }
		else if(subMenuSelected == 'tabular' && menuSelected == 'DataPerformance'){
			$scope.getDataPerformanceTabularResult(); }
		else if (subMenuSelected == 'summary' && menuSelected == 'VoiceQuality'){
			$scope.getVoiceQualitySummaryResult();
		}
		else if (subMenuSelected == 'timeline' && menuSelected == 'VoiceQuality'){
			$scope.getVoiceQualityTimelineResult();
		}
		else if (subMenuSelected == 'tabular' && menuSelected == 'VoiceQuality'){
			$scope.getVoiceQualityTabularResult();
		}
			
			
	});