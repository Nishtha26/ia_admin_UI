oTech.service('AuthenticationService',
	['$http', '$rootScope', '$timeout', '$location', '$q',
		function ( $http,  $location, $rootScope,  $timeout, $q) {
		
		return{
			/*
				Function for authentication service call
			*/
			Login : function (username, password) {
				var deferred = $q.defer();
				$.ajax({
				    url : oApp.config.BASE_URL + "/user/authenticate",
				    type: "POST",
					data : {username:username, password:password},
					headers :{
					'Content-Type': 'application/x-www-form-urlencoded'
					},
				    success: function(data)
				    { 
						deferred.resolve({
							success: data.token != null,
							userId : data.userId,
							token : data.token,
							role:data.role,
							companyId:data.companyId,
							landingPageId:data.defaultLandingPageId
							
						});
				    },
				    error: function (err)
				    {
						deferred.reject(err);
				    }
			    });	
				return deferred.promise;				
			}
		}
}]);