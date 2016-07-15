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
		
		/* pagination code  start ****************/
		
		var startLimit = 1;
		$scope.itemsPerPage = 10;
		$scope.currentPage = 0;
		$scope.endLimit=$scope.itemsPerPage;
		var allOfTheData;
		$scope.totalRecords=0;

	/*	$(document).ready(function(){

			   $.getScript('//cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js',function(){
			    $("#customer-8").select2({
			    });
			  
			  });//script
			});*/
		
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
					$scope.setPagePrev($scope.currentPage-1);
					//$scope.currentPage--;
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
					$scope.setPageNext($scope.currentPage+1);
					//$scope.currentPage++;
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
					$scope.createNewDatasource();
					$scope.currentPage = n;
				};
				
				 $scope.setPagePrev = function(n) {
					 $scope.dataLoading = true;
					$scope.endLimit = ($scope.itemsPerPage*(n+1));
					if($scope.endLimit > $scope.totalRecords){
						var reminder = $scope.totalRecords % $scope.itemsPerPage;
						if(reminder > 0){
							$scope.endLimit = $scope.endLimit - ($scope.itemsPerPage-reminder);
						}
					}
					 
					startLimit = ($scope.itemsPerPage*n);
					$scope.createNewDatasource();
					$scope.currentPage = n;
				};
				 $scope.setPageNext = function(n) {
					 $scope.dataLoading = true;
					$scope.endLimit = ($scope.itemsPerPage*(n+1));
					if($scope.endLimit > $scope.totalRecords){
						var reminder = $scope.totalRecords % $scope.itemsPerPage;
						if(reminder > 0){
							$scope.endLimit = $scope.endLimit - ($scope.itemsPerPage-reminder);
						}
					}
					 
					startLimit = ($scope.itemsPerPage*(n));
					$scope.createNewDatasource();
					$scope.currentPage = n;
				};

	
		
		/* pagination code  end ***********************/
		
		
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
			
				$scope.totalRecords = data.length;
				allOfTheData = data;
//				$scope.userTableGridOptions.data = data;
				$scope.userTableGridOptions.data = data.slice( 0, $scope.itemsPerPage);
				$scope.gridApi.selection.selectRow($scope.userTableGridOptions.data[0]); //extra code
			},
			function(err){
				
			}
		);
	   }
	$scope.userTableData();
});