oTech.controller('changePasswordController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		
		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		var pwd,matchingPwd;
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
		
		$scope.saveChange = function(){
		 
			pwd = document.getElementById("password").value;
			matchingPwd = document.getElementById("conformpassword").value;
			
			if (pwd != matchingPwd) {
   				 alert("wrong password");
 			 }
  			else{
				 promise = AppServices.changePassword(token,userId,pwd,matchingPwd);
				promise.then(
				function(data){
					document.getElementById("password").value = "";
					document.getElementById("conformpassword").value = "";
				},
				function(err){
					console.log(err);
				}
				);
			}
			
		}
		/*
			cancel button
		
		*/
		$rootScope.back = function(){
		$location.path('/dashboard');
	}
		 
		
		
		
});