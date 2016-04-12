oTech.controller('UserGroupsController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		
		var token = sessionStorage.getItem("token");
		var userId = sessionStorage.getItem("userId");
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
		
		$scope.openDevicedata =function(e){
			
			// alert($(e.currentTarget).text());
		}
		$scope.userGroupsGridOptions = oApp.config.userGroupsGridOptions;
		
		 $scope.userGroupsGridOptions.onRegisterApi = function( gridApi ) { //extra code
		
		    $scope.gridApi = gridApi;
		  $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
		            console.log(row);
		      }); 
	     };

		
		$scope.userGroupsData = function(){
		promise = AppServices.GetuserGroupsData(userId, token);
		promise.then(
			function(data){
				
				$scope.userGroupsGridOptions.data = data;
				
				$scope.gridApi.selection.selectRow($scope.userGroupsGridOptions.data[0]); //extra code
			},
			function(err){
				
			}
		);
	   }
		
		$scope.userGroupsData();
});