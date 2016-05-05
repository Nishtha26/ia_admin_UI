
oTech.controller('ReportsController',
	function ($scope, $rootScope, $location, AppServices, $stateParams, $sce, $timeout) {
		var token = sessionStorage.token;
		$rootScope.role = sessionStorage.getItem("role");
		
		$scope.ReportUrl = $sce.trustAsResourceUrl(sessionStorage.getItem('menuUrl'));
		console.log($scope.ReportUrl);
		$rootScope.slideContent();
		window.onresize = function(event) {
			$rootScope.slideContent();
		}
		$scope.name = sessionStorage.getItem("username");
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
		

	});