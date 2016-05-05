
oTech.controller('MarketController',
	function ($scope, $rootScope, $location, AppServices,ReportServices, $stateParams) {
		$scope.selected = sessionStorage.selected;
		$scope.selected1 = sessionStorage.selected1;
	
	   
	    $scope.zone2Market = false;
		$scope.zone3Market = false;
		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		
		
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
			Markkets for Market List
		*/
		$scope.getMarketForUser = function(){
		    $scope.dataLoading3 =true;
			promise = ReportServices.GetMarketsForUser(userId,token );
			promise.then(
				function(data){
					$scope.dataLoading3 =false;
					 $scope.zoneMarket =true;
					$scope.marketList = data;
					
					
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
	
		/*
		  Add class active to selected key	
		*/
		$scope.getSelectedKey = function(e){
			$("#parent-list li").removeClass('active');
			$(e.currentTarget).addClass('active');
			
		}
		
		/*
		  Add class active to selected market	
		*/
		$scope.selectItem = function(e){
			$(e.currentTarget).siblings().removeClass("active");
			$(e.currentTarget).addClass("active");
		}
		/*
		onpage load calls
		*/
		$scope.getMarketForUser();
		$scope.getDashBoardMenu();
		$scope.getFavouriteReports();
		$rootScope.slideContent();
	   
	   /*
	    onselection chnage making zone div hide and show 
	   */
		$('#locationSelectd').on('change', function() {
			var location =$(this).val() ;
			if(location == 'Zone'){
				$scope.getMarketForUser();
			
				$scope.zone2Market = false;
				$scope.zone3Market = false;
			}
			else if(location == 'Radius'){
				$scope.dataLoading3 =false;
				$scope.zoneMarket = false;
				$scope.zone2Market = true;
				$scope.zone3Market= false;
		
			}
			else{
				$scope.dataLoading3 =false;
				$scope.zoneMarket = false;
				$scope.zone2Market = false;
				$scope.zone3Market = true;
				
			}
			
			 $scope.$apply();
           
      
       });
		
	/*
	onclick next button goto next page
	*/
		
		$scope.goToNext = function(){
			var selectedMarket= $("#target option:selected").text();
			sessionStorage.setItem('Market', selectedMarket);
			$location.path('/dashboard/' + $stateParams.performance + '/' + $stateParams.zoneMarket + '/commomReport'  ) ;
	
		}
});