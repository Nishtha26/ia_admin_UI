
oTech.controller('landingPageController',
	function ($scope, $rootScope, $location, AppServices, $stateParams, $sce, $timeout) {
		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		$scope.ReportUrl = $sce.trustAsResourceUrl(sessionStorage.getItem('menuUrl'));
		$rootScope.role = sessionStorage.getItem("role");
		$rootScope.slideContent();
		window.onresize = function(event) {
			$rootScope.slideContent();
		};
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
		

		
		/*
		    To Find get Landing page url
	    */
	$scope.getLandingPage = function(){
		promise = AppServices.LandingPageUrl(userId, token);
		promise.then(
			function(data){
			console.log('landing page controller :: landing page details : '+ data.landingPageDetails);
			
			if(data.landingPageDetails === null){
			console.log('landing page details are not available..');
			
	/*			$rootScope.Message="Landing page is not set for the user.. redirecting to dashboard..";
				$('#MessageColor').css("color", "red");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 4000);  */
			
			$location.path('/dashboard');			
			}else{
			sessionStorage.setItem('menuUrl', data.landingPageDetails.menuUrl);
				$scope.ReportUrl = sessionStorage.getItem('menuUrl');
				$scope.ReportUrl = $sce.trustAsResourceUrl($scope.ReportUrl);
			}
				//$scope.activeDeviceCount = data.activeDevicesList.length;
			
				
			},
			function(err){
				//$scope.activeDeviceCount = 0;
			}
		);
	}
	$scope.getLandingPage();
});