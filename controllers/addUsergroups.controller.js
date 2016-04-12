oTech.controller('addUsergroupsController',
	function ($scope, $rootScope, $location, AppServices, $stateParams,$timeout) {

		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		$rootScope.role = sessionStorage.role;
		var userGroupId,groupName,customerId,luserId,lusername,lastName;
		var usergroup = "";
		$scope.assignuser= true;
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
		
			$scope.addUsergroupsGridOptions = oApp.config.addUsergroupsGridOptions;
			$scope.addUsergroupsGridOptions.onRegisterApi = function( gridApi ) { 
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
				console.log(row);
				userGroupId = row.entity.userGroupId ;
				groupName = row.entity.userGroupName;
				$scope.allusersgroupData();
				$scope.existingusersData();
			}); 
	     };

		//  for displaying usergroups list
		
		$scope.availableUsergroupsGrid = function(){
		promise = AppServices.getAvailableUsergroupsData(userId, token);
		promise.then(
			function(data){
				
				$scope.addUsergroupsGridOptions.data = data;
				$scope.gridApi.selection.selectRow($scope.addUsergroupsGridOptions.data[0]); 
			},
			function(err){
				
			}
		);
	   }
	   
	   
      /*To Show Add User groups Div*/	  
	  
	  $scope.showUsergroups =function(){
		   $scope.userDiv =true;
		  $scope.assignuser= false;
	   }
	   
	   /*Cancel button */
	   
	  $scope.cancel =function(){
		   $scope.userDiv =false;
		   $scope.assignuser= true;
		   $scope.user_group="";
	   }
	   /*Function Call  to create New User groups */
	   
	   $scope.addUsergroup =function(){
		   usergroup =$("#user_group").val();
		   var userid =userId; //$("#user_id").val();
	       console.log("user group"+":"+usergroup + ","+"userid"+":"+userid);
		    promise = AppServices.addUsers(token,usergroup,userid);
	       promise.then(
			function(data){
				
				$scope.availableUsergroupsGrid();
				if(data.status=="success"){
				 $rootScope.Message = "successfully created the usergroup";
				 $('#MessageColor').css("color", "green");
				 $scope.user_group="";
			//	 $scope.cancel();
				 }
				 if(data.status=="failure"){
				 $rootScope.Message = "error occured while creating the usergroup";
				 $('#MessageColor').css("color", "red");
				 }
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
				 $scope.cancel();
			},
			function(err){
				
				$rootScope.Message = "error occured while creating the usergroup";
				 $('#MessageColor').css("color", "red");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
			}
		);
	   }
	   /*
				Function to add user to list
	   */
	   $scope.addUser = function(){
	   
		   $scope.addinguserData();
		   
	   }
	   /* unassign user */
	   $scope.removeUser = function(){
		//   alert("unassign");
		   $scope.unassignUserData();
	   }
	   
	   /*
			for all user group list
	   */
	   	$scope.allusersgroupGridOptions = oApp.config.allusersgroupGridOptions;
		$scope.allusersgroupGridOptions.onRegisterApi = function( gridApi ) { //extra code
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
				console.log(row);
				luserId = row.entity.userId ;
				customerId = row.entity.customerId;
				lusername = row.entity.username ;
				lastName = row.entity.lastName;
			}); 
	     };

		
		$scope.allusersgroupData = function(){
		promise = AppServices.GetallusersgroupData( token , userGroupId);
		promise.then(
		function(data){
				$scope.allusersgroupGridOptions.data = data;
				$scope.gridApi.selection.selectRow($scope.allusersgroupGridOptions.data[0]); //extra code
			},
			function(err){
				
			}
		);
	   }
	   /*
			for existing users
	   
	   */
	   $scope.existingusersGridOptions = oApp.config.existingusersGridOptions;
		
		 $scope.existingusersGridOptions.onRegisterApi = function( gridApi ) { //extra code
		
		    $scope.gridApi = gridApi;
		  $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
					luserId=row.entity.userId;
					userGroupId=row.entity.userGroupId;
		            console.log(row);
					//console.log(row.entity.userGroupName);
					console.log(row.entity.userId);
					console.log(groupName);
					console.log(row.entity.customerId);
					
					
		      }); 
	     };

		
		$scope.existingusersData = function(){
			
		promise = AppServices.GetexistingusersData( token,userGroupId,groupName);
		promise.then(
			function(data){
				console.log(data);
				$scope.existingusersGridOptions.data = data;
				
				$scope.gridApi.selection.selectRow($scope.existingusersGridOptions.data[0]); //extra code
			},
			function(err){
				
			}
		);
	   }
	   /*
				Function for adding user to already existing users
	   */
	   $scope.addinguserData = function(){
		   
		var adddata ={userGroupName:groupName,username:lusername,lastName:lastName};
		promise = AppServices.GetadduserData( token,groupName,luserId,customerId);
		promise.then(
			function(data){
				
				if (data.status =="success")
				{
					//alert(data.status);
					$scope.existingusersData();
					$scope.allusersgroupData();
					//$scope.existingusersGridOptions.data.push(adddata);
				}
				
				else
					console.log(data.status);
				
			},
			function(err){
				
			}
		);
	   }
	    /*
				Function for unassigning user from user group
	   */
   $scope.unassignUserData = function(){
		   console.log(token);
		   console.log(groupName);
		   console.log(luserId);
		   
		var adddata ={userGroupName:groupName,username:lusername,lastName:lastName};
		promise = AppServices.GetunassignUserData( token,groupName,luserId);
		
		promise.then(
			function(data){
				
				if (data.status =="success"){
					//alert(data.status);
					$scope.existingusersData();
					$scope.allusersgroupData();
					}
				else
					console.log(error);
				
			},
			function(err){
				
			}
		);
	   } 
	   
	    $scope.availableUsergroupsGrid();
	//	$scope.allusersgroupData();
	
});