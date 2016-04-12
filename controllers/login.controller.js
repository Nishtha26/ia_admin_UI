
oTech.controller('LoginController',['$scope', '$rootScope', '$location', 'AuthenticationService',
	function ($scope, $rootScope, $location, AuthenticationService) {
	
		/*
			Function to Login
		*/
		$scope.login = function () {
        $scope.dataLoading = true; //show loading image
		
		$scope.setErrorMessage = function(errorMessage){
		
		console.log(errorMessage);
		$scope.error=errorMessage;
	
	}
		/*
			Service call for authentication
		*/
		var promise = AuthenticationService.Login($scope.username, $scope.password);
		promise.then(
			function(data){
				console.log(data);
				
				if(data.success){
					console.log("Entering");
					/*
						Successfully logged in
					*/
					/*setting session variables*/
					sessionStorage.setItem('username', $scope.username);
					sessionStorage.setItem('token', data.token);
					sessionStorage.setItem('isLogin', true);
					sessionStorage.setItem('userId', data.userId);
					sessionStorage.setItem('role', data.role);
					sessionStorage.setItem('companyId', data.companyId);
					sessionStorage.setItem('email', data.email);
					sessionStorage.setItem('landingPageId', data.landingPageId);
					/*Redirecting to Dashboard page*/
					var dashboardPath  = '/dashboard';
					console.log(data);
						var landingPage=sessionStorage.getItem('landingPageId');
			
					console.log(' landingPage id : '+data.landingPageId);
					console.log(' from session landingPage id : '+landingPage);
	
				if(landingPage){
						$location.path('/dashboard/landingPage');
					}else{
					$location.path(dashboardPath);
					}
					
				//	$location.path('/dashboard/landingPage');
					
				//	$location.path(dashboardPath);
				}
				else{
					/*
						Invalid credentials
					*/
					$scope.dataLoading = false;
					$scope.error = "Invalid Username or Password";
				}
			},function(err){
				/*
					Error in service call for authentication
				*/
				$scope.dataLoading = false;
				$scope.error = "Invalid Username or Password";
			}
		);
    };
}]);