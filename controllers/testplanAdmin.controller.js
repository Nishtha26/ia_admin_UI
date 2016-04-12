oTech.controller('testplanAdminController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {

		var token = sessionStorage.getItem("token");
		var userId = sessionStorage.getItem("userId");
		$rootScope.role = sessionStorage.getItem("role");
		var selectedTestplan = "";
		var testPlanuser = "";
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
		
		// To get selected test plan user data
		
	   $scope.testplanUserSelectedGridOptions = oApp.config.testplanUserSelectedGridOptions;
		$scope.testplanUserSelectedGridOptions.onRegisterApi = function( gridApi ) { //extra code
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
				console.log(row);
				testPlanuser=row.entity.userId;
			}); 
	     };

		
		$scope.testplanUserSelected = function(){
		promise = AppServices.selectedTestPlanUserTableData(selectedTestplan,userId, token);
		promise.then(
		function(data){
				$scope.testplanUserSelectedGridOptions.data = data;
				$scope.gridApi.selection.selectRow($scope.testplanUserSelectedGridOptions.data[0]); //extra code
			},
			function(err){
				
			}
		);
	   }
	 // To get available test plan user data
	  $scope.testplanUserAvailableGridOptions = oApp.config.testplanUserAvailableGridOptions;
		$scope.testplanUserAvailableGridOptions.onRegisterApi = function( gridApi ) { //extra code
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
				testPlanuser=row.entity.userId;
			}); 
	     };

		
		$scope.testplanUserAvailable = function(){
		promise = AppServices.availableTestPlanUserTableData(selectedTestplan,userId, token);
		promise.then(
		function(data){
				$scope.testplanUserAvailableGridOptions.data = data;
				$scope.gridApi.selection.selectRow($scope.testplanUserAvailableGridOptions.data[0]); //extra code
			},
			function(err){
				console.log(err);
			}
		);
	   }
	   
		$scope.testplanAdminGridOptions = oApp.config.testplanAdminGridOptions;
		$scope.testplanAdminGridOptions.onRegisterApi = function( gridApi ) { //extra code
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
				selectedTestplan=row.entity.testplanId;
				//testPlanuser=row.entity.createdBy;
				
				$scope.testplanUserAvailable();
				$scope.testplanUserSelected();
			
			}); 
	     };

		$scope.getTestplanAdminData = function(){
		promise = AppServices.getTestplanAdminData(userId, token);
		promise.then(
		function(data){
				$scope.testplanAdminGridOptions.data = data;
				$scope.gridApi.selection.selectRow($scope.testplanAdminGridOptions.data[0]); //extra code
			},
			function(err){
				console.log("error with testPlanId"+testPlanId);
			}
		);
	   }
	   
	    /*
				Function to add user to testplan
	   */
	   $scope.addUser = function(){
			$scope.addTestplanAccessToUser();
		   
	   }
	   /* unassign user from testplan*/
	   $scope.removeUser = function(){
		   $scope.removeTestplanAccessToUser();
	   }
 /* Function for assigning test plan to user */
	   $scope.addTestplanAccessToUser = function(){
			promise = AppServices.addTestplanAccessToUser(selectedTestplan, testPlanuser, token);
		         promise.then(
			     function(data){
					$scope.testplanUserSelected();
					$scope.testplanUserAvailable();
                 },
			     function(err){
					console.log("error with testPlanId"+selectedTestplan);	
			     }
		       );
	   }
	   /* function for remove test plan from user */
	   
	   	   $scope.removeTestplanAccessToUser = function(){
			promise = AppServices.removeTestplanAccessToUser(selectedTestplan, testPlanuser, token);
		         promise.then(
			     function(data){ 
					$scope.testplanUserSelected();
					$scope.testplanUserAvailable();
			     },
			     function(err){
					console.log("error with testPlanId"+selectedTestplan);	
			     }
		       );
			   
		   }
	   $scope.getTestplanAdminData();   
});