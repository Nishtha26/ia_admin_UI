oTech.controller('assignReportController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {

		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		$rootScope.role = sessionStorage.role;
		var companyId = sessionStorage.companyId;
		$rootScope.slideContent();
		var screenId,screenName,luserId,unuserId,popuserId,popusername,popfirstName;
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
		
		$scope.availableReportsGridOptions = oApp.config.availableReportsGridOptions;	
			$scope.availableReportsGridOptions.onRegisterApi = function( gridApi ) { 
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
				console.log(row);
				screenId = row.entity.screenId;
				screenName = row.entity.screenName;
				
				$scope.usersNotHavingReportData();
				$scope.existingReportData();
			}); 
	     };
		/* To get Available Reports */
		$scope.availableReportsGrid = function(){
		promise = AppServices.getAvailableReportsData(userId, token);
		promise.then(
			function(data){
				
				$scope.availableReportsGridOptions.data = data;
			$scope.gridApi.selection.selectRow($scope.availableReportsGridOptions.data[0]); 
			},
			function(err){
				console.log(err);
			}
		);
	   }
	   
	   
	   	   
	   /*
			for all user group list
	   */
	   	$scope.allusersgroupGridOptions = oApp.config.allusersgroupGridOptions;
		$scope.allusersgroupGridOptions.onRegisterApi = function( gridApi ) { //extra code
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
				console.log(row);
				luserId = row.entity.userId;
				
			}); 
	     };

		
		$scope.allusersgroupData = function(){
		promise = AppServices.GetallusersgroupData( token , userId);
		promise.then(
		function(data){
				$scope.allusersgroupGridOptions.data = data;
				$scope.gridApi.selection.selectRow($scope.allusersgroupGridOptions.data[0]); //extra code
			},
			function(err){
				console.log("error");	
			}
		);
	   }
	   
	   /*
	   For users not have been assigned the selected report
	   */
	   
	   	$scope.usersNotHavingReportGridOptions = oApp.config.usersNotHavingReportGridOptions;
		$scope.usersNotHavingReportGridOptions.onRegisterApi = function( gridApi ) { //extra code
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
				console.log(row);
				luserId = row.entity.userId;
				
			}); 
	     };
		 
		 $scope.usersNotHavingReportData = function(){
		promise = AppServices.usersNotHavingReportData( token , userId,screenId,companyId);
		promise.then(
		function(data){
				$scope.usersNotHavingReportGridOptions.data = data;
				$scope.gridApi.selection.selectRow($scope.usersNotHavingReportGridOptions.data[0]); //extra code

				},
			function(err){
				console.log("error");	
			}
		);
	   }
	   
	   
	   /* for existing report of selected report */
	   
	   $scope.existingreportGridOptions = oApp.config.existingreportGridOptions;
		$scope.existingreportGridOptions.onRegisterApi = function( gridApi ) { //extra code
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
				console.log(row);
				unuserId = row.entity.userId;
				popuserId = row.entity.userId;
				popusername = row.entity.username;
				popfirstName = row.entity.firstName;
				
			}); 
	     };

		
		$scope.existingReportData = function(){
		promise = AppServices.GetexistingReportData( token , userId,screenId,companyId);
		promise.then(
		function(data){
				$scope.existingreportGridOptions.data = data;
				$scope.gridApi.selection.selectRow($scope.existingreportGridOptions.data[0]); //extra code
			},
			function(err){
				console.log("error");	
			}
		);
	   }
	   /* Function for assigning report to group */
	   $scope.assignReport = function(){
			var adata ={screenName:screenName,userId :luserId ,screenId:screenId};	
			//console.log(assigndata);
			promise = AppServices.GetAssignData(adata,token);
		         promise.then(
			     function(data){
					//alert(data.status);
					//$scope.existingreportGridOptions.data.push(adata);
					$scope.usersNotHavingReportData();
				$scope.existingReportData();
                 },
			     function(err){
					console.log("error");	
			     }
		       );
	   }
	   /* function for unassigning reports to user */
	   
	   	   $scope.unassignReport = function(){
			   
			   var undata ={screenName:screenName,userId :unuserId ,screenId:screenId};	
			//console.log(assigndata);
			promise = AppServices.GetunAssignData(undata,token);
		         promise.then(
			     function(data){
				//	alert(data.status);
				console.log(undata);
					$scope.usersNotHavingReportData();
				$scope.existingReportData();
                  
			     },
			     function(err){
					console.log("error");
			     }
		       );
			   
		   }
	   
	   
	   $scope.availableReportsGrid();
		//$scope.allusersgroupData();
		//$scope.existingReportData();
});