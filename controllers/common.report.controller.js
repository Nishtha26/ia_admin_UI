
oTech.controller('CommomReportController',
	function ($scope, $rootScope, $location, AppServices,ReportServices, $stateParams) {
		$scope.selected = sessionStorage.selected;
		$scope.selected1 = sessionStorage.selected1;
		$scope.Market = sessionStorage.Market;
		$rootScope.role = sessionStorage.getItem("role");
		
	    var market = sessionStorage.Market;
	    market =market.replace(/ /g,""); /*to remove spaces between words*/ 
		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		
		var selectedKey = "Device";
		
		$rootScope.slideContent();
		  
		window.onresize = function(event) {
			$rootScope.slideContent();
		}
		$scope.name = sessionStorage.getItem("username");
		/*
			Function to get Dashboard Menu Data
		*/
		$scope.getDashBoardMenu = function(){
			if($rootScope.menuData == undefined){
				$rootScope.getMenuData();
			}
		}
		/*
			Function to get Market Device List 
		*/
		$scope.getMarketDevices = function(){
		   $scope.configuarationDiv =false;
		   $scope.deviceGroupDiv =false;
		   $scope.errdiv =false ;
		   $scope.dataLoading3 = true;
			promise = ReportServices.GetMarketDevices(userId,token,market);
			promise.then(
				function(data){
					if(data.length > 0){
					$scope.dataLoading3 = false;
					$scope.deviceDiv =true;
					//console.log(data);
					$scope.deviceList = data;
					}
					else{
					$scope.deviceDiv =false;
                    $scope.dataLoading3 = false;
     				$scope.errdiv =true ;	
					}
					//$("#target").val($("#target option:last").val());
				},
				function(err){
				}
			);
		}
		
		/*
			Function to get Market Configuration List 
		*/
		$scope.getMarketConfiguration = function(){
		    $scope.deviceDiv =false;
			$scope.deviceGroupDiv =false;
			$scope.errdiv =false ;
			$scope.dataLoading3 = true;
			
			promise = ReportServices.GetMarketConfiguration(userId,token,market);
			promise.then(
				function(data){
					if(data.length > 0 ){
					$scope.dataLoading3 = false;
					$scope.configuarationDiv =true;
					//console.log(data);
					$scope.configMarket = data;
					}
					else{
						$scope.configuarationDiv =false;
						$scope.dataLoading3 = false;
						$scope.errdiv =true ;
					  }
					//$("#target").val($("#target option:last").val());
				},
				function(err){
				}
			);
		}
		/*
			Function to get Device Group Market  
		*/
		$scope.getDeviceGroupMarket = function(){
		    $scope.deviceDiv =false;
			$scope.configuarationDiv =false;
			$scope.errdiv =false ;
			$scope.dataLoading3 = true;
			
			promise = ReportServices.GetDeviceGroupMarket(userId,token,market);
			promise.then(
				function(data){
					if(data.length > 0 ){
					$scope.dataLoading3 = false;
					$scope.deviceGroupDiv =true;
					//console.log(data);
					$scope.deviceGroupMarket = data;
					}
					else{
						$scope.deviceGroupDiv =false;
						$scope.dataLoading3 = false;
						$scope.errdiv =true ;
					  }
					//$("#target").val($("#target option:last").val());
				},
				function(err){
				}
			);
		}
		/*
			To get favourite reports
		*/
		$scope.getFavouriteReports = function(){
			if($rootScope.Favourites == undefined)
			{
				$rootScope.getFavouriteReports();
			}
		}
		
		
		$scope.selectItem = function(e)
		{
			$(e.currentTarget).siblings().removeClass("active");
			$(e.currentTarget).addClass("active");
		}
		$scope.selectItem1 = function(e)
		{
			$(e.currentTarget).siblings().removeClass("active");
			$(e.currentTarget).addClass("active");
		}
		$scope.getDashBoardMenu();
		$scope.getFavouriteReports();
		$scope.getMarketDevices ();
		/*to get select key is pressed */
		$scope.getSelectedKey =function(e)
		{
			$(e.currentTarget).siblings().removeClass("active");
			$(e.currentTarget).addClass("active");
		    
			if( $(e.currentTarget).text() == "Configuration"  )
			 {
				selectedKey="Configuration" ;
				$scope.getMarketConfiguration();
		     }
			 else if( $(e.currentTarget).text() == "Device" )
			 {
			    selectedKey ="Device" ;
				$scope.getMarketDevices (); 
			 }	 
			 else if( $(e.currentTarget).text() == "Device Group" )
			 {
				 selectedKey ="Device Group" ;
				$scope.getDeviceGroupMarket();  
			 }
		}
		 
				
		$scope.goToNext = function(){
			/*For Device Market */
			var deviceId = $('#table .active').find('td:eq(0)').text();
			var deviceName = $('#table .active').find('td:eq(1)').text();
			var imsi = $('#table1 .active').find('td:eq(0)').text();
			var msisdn =$('#table1 .active').find('td:eq(1)').text();
			/*For Config Market */
			var jobId =$('#table2 .active').find('td:eq(0)').text();
			var configuration =$('#table2 .active').find('td:eq(1)').text();
			var dutId =$('#table3 .active').find('td:eq(0)').text();
			var jobType =$('#table3 .active').find('td:eq(1)').text();
			if(selectedKey =="Device")
			{
				
				 sessionStorage.setItem('selectedDevices', deviceId + '  ;  ' + deviceName + '  ;  ' + imsi + '  ;  ' + msisdn);
			}
			else 
			{
				
			 sessionStorage.setItem('selectedDevices', jobId + '  ;  ' + configuration + '  ;  ' + dutId + '  ;  ' + jobType);	
//			 alert(dutId);
			}
				
				
				
				$location.path('/dashboard/' + $stateParams.performance + '/' + $stateParams.smenus + '/timeSchedule'  ) ;
	
		}
	});