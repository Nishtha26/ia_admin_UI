oTech.controller('deviceAdminController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		
		var token = sessionStorage.getItem("token");
		var userId = sessionStorage.getItem("userId");
		$rootScope.role = sessionStorage.getItem("role");
		var deviceId;
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

		$("#restartIac").prop("disabled",true);
		 $("#registerIac").prop("disabled",true);
		 $("#unregisterIac").prop("disabled",true);
		
		$scope.openDevicedata =function(e){
			
			// alert($(e.currentTarget).text());
		}
		$scope.deviceAdminGridOptions = oApp.config.deviceAdminGridOptions;
		
		 $scope.deviceAdminGridOptions.onRegisterApi = function( gridApi ) { //extra code
		
		    $scope.gridApi = gridApi;
		  $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
		         //console.log(row);
			deviceId =	row.entity.deviceId;
				$scope.approve = function(){
					promise = AppServices.GetapproveData(userId, token ,deviceId);
					promise.then(
					function(data){
						
						$scope.deviceAdminData();
					},
					function(err){
						alert("error");
					}
					);
				}
			
			$scope.reject = function(){
				promise = AppServices.GetrejectData(userId, token ,deviceId);
				promise.then(
				function(data){
					
					$scope.deviceAdminData();
				},
					function(err){
						alert("error");
					}
					);
				} 
	   
		      }); 
	     };

		
		$scope.deviceAdminData = function(){
		promise = AppServices.GetdeviceAdminData(userId, token);
		$scope.dataLoading = true;
		promise.then(
			function(data){
		
				$scope.dataLoading = false;		
				$scope.deviceAdminGridOptions.data = data.devicesList;
				for(var i=0; i<$scope.deviceAdminGridOptions.data.length; i++){
					$scope.deviceAdminGridOptions.data[i].statusFlag =  $scope.deviceAdminGridOptions.data[i].statusFlag === 0 ?  "Yet to be approved/Rejected" :  "Approved" ;                           
               }
				$scope.gridApi.selection.selectRow($scope.deviceAdminGridOptions.data[0]); //extra code
			},
			function(err){
				
			}
		);
	   }
	   
		
		$scope.deviceAdminData();
});
