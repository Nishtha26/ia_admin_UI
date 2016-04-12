oTech.controller('userTableController',
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
		$scope.userTableGridOptions = oApp.config.userTableGridOptions;
		$scope.userTableGridOptions.onRegisterApi = function( gridApi ) { //extra code
		 $scope.gridApi = gridApi;
		  $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
		    console.log(row);
		    }); 
	     };
		$scope.userTableData = function(){
		promise = AppServices.GetuserTableData(userId, token);
		promise.then(
			function(data){
				$scope.userTableGridOptions.data = data;
				$scope.gridApi.selection.selectRow($scope.userTableGridOptions.data[0]); //extra code
			},
			function(err){
				
			}
		);
	   }
	$scope.userTableData();
});