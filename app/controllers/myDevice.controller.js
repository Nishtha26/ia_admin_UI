
oTech.controller('MyDevicesController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		$scope.loading = true;
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		$rootScope.role = sessionStorage.role;
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
		
					$scope.itemsPerPage = 10;
					$scope.currentPage = 0;
					$scope.endLimit=$scope.itemsPerPage;
					var allOfTheData;
					$scope.totalRecords=0;
					
					
					$scope.range = function() {
								var rangeSize = 6;
								var ps = [];
								var start;

								start = $scope.currentPage;
								if ( start > $scope.pageCount()-rangeSize ) {
								start = $scope.pageCount()-rangeSize+1;
								}

								for (var i=start; i<start+rangeSize; i++) {
								if(i>=0) 
								ps.push(i);
								}
								return ps;
							};

							$scope.prevPage = function() {
							if ($scope.currentPage > 0) {
								startLimit = (startLimit*($scope.currentPage-1));
								$scope.showDeviceList();
							  $scope.currentPage--;
								}
							};
											
							$scope.DisablePrevPage = function() {
								return $scope.currentPage === 0 ? "disabled" : "";
							 };
							 
							 $scope.pageCount = function() {
								return Math.ceil($scope.totalRecords/$scope.itemsPerPage)-1;
							};
							
							$scope.nextPage = function() {
								if ($scope.currentPage < $scope.pageCount()) {
								startLimit = ($scope.itemsPerPage*($scope.currentPage-1));
								$scope.showDeviceList();
								  $scope.currentPage++;
								}
							};
							
							$scope.DisableNextPage = function() {
								return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
							};
							
							 $scope.setPage = function(n) {
								 $scope.dataLoading = true;
								$scope.endLimit = ($scope.itemsPerPage*(n+1));
								if($scope.endLimit > $scope.totalRecords){
									var reminder = $scope.totalRecords % $scope.itemsPerPage;
									if(reminder > 0){
										$scope.endLimit = $scope.endLimit - ($scope.itemsPerPage-reminder);
									}
								}
								 
								startLimit = ($scope.itemsPerPage*n);
								$scope.showDeviceList();
								$scope.currentPage = n;
							};
		
		
                            

	
   

	
	 /* Devices list */
   $scope.myDevicesGridOptions = oApp.config.myDevicesGridOptions;
	$scope.myDevicesGridOptions.onRegisterApi = function( gridApi ) { //extra code
	 $scope.gridApi = gridApi;
	  $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
	    console.log(row);
	    }); 
    };
   
		$scope.showDeviceList = function(){
			$scope.dataLoading = true;
			promise = AppServices.GetDeviceData(userId, token);
			promise.then(
			function(data){
				$scope.totalRecords = data.deviceCount
				$scope.myDevicesGridOptions.data = data.devicesList;
				$scope.dataLoading = false;
			},
			function(err){
				console.log(err);
			}
		);
	}

   $scope.showDeviceList();
		
	});