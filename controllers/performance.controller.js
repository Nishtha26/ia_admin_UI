
oTech.controller('PerformanceController',
	function ($scope, $rootScope, $location, AppServices, $stateParams,$timeout) {
		$scope.name = sessionStorage.getItem("username");
		var token = sessionStorage.token;
		$scope.popup =false;
		$scope.performance = $stateParams.performance;
	
		$scope.performanceText = $scope.performance.charAt(0).toUpperCase() + $scope.performance.substr(1).replace( /([a-z])([A-Z])/g, "$1 $2");
		
		var aq = {};
		angular.forEach(JSON.parse(sessionStorage.reportsubmenus),function(value ,key){
			var a = key.replace(/ /g,"");
			a = a.charAt(0).toLowerCase()+a.substr(1);
			aq[a] = value;
		});
		$scope.performanceList = aq;
		
		
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
			To get favourite reports
		*/
		$scope.getFavouriteReports = function(){
			if($rootScope.Favourites == undefined){
				$rootScope.getFavouriteReports();
			}
		}
		$scope.getDashBoardMenu();
		$scope.getFavouriteReports();

		$scope.getSubmenuAvailability =function(e,p)
		{
		
		 $("#parent-list li").removeClass('active');
		 $(e.currentTarget).addClass('active');	
		}
		
		$scope.goToNext = function(){
			var SamePage = $('.active').children().val() ;
			var edit = window.location.hash.split('/')[1] ;
            var ID = window.location.hash.split('/')[2];
			$scope.checkedItem = $('.active').text().replace(/ /g,"");
			$scope.checkedItem = $scope.checkedItem.charAt(0).toLowerCase() + $scope.checkedItem.substr(1);
			sessionStorage.setItem('selected1',$scope.checkedItem);
			if(SamePage == "no" ){
			$location.path('/' + edit + '/' + ID ) ;
			 $scope.popup =true;
			 $('#pavan').modal('show');
				$timeout(function(){ $('#pavan').modal('hide'); }, 3000);		
			}
			else{
			$location.path('/dashboard/' + $stateParams.performance + '/' + $scope.checkedItem); 	
			}
			
		}
});