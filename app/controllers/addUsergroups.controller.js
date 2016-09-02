oTech.controller('addUsergroupsController',
	function ($scope, $rootScope, $location, AppServices, $stateParams,$timeout) {

		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		$rootScope.role = sessionStorage.role;
		var userGroupId,groupName,customerId,luserId,lusername,lastName;
		var usergroup = "";
		$scope.loading = true;
		$scope.assignuser= true;
		$rootScope.slideContent();
		
		var deletePopupMsg="Are you want to delete this user group?";
		$scope.currentRow;
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
	/* pagination code  start ****************/
		
		var startLimit = 1;
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
			$scope.addUsergroupsGridOptions = oApp.config.addUsergroupsGridOptions;
			$scope.addUsergroupsGridOptions.onRegisterApi = function( gridApi ) { 
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
				console.log(row);
				
				console.log("row select status "+row.isSelected);
				if(row.isSelected){
				$scope.currentRow=row.entity;
				userGroupId = row.entity.userGroupId ;
				groupName = row.entity.userGroupName;
				$scope.isUpdateDisabled = false;
				$scope.isDeleteDisabled = false;
				$scope.isAssignDisabled = false;
				
				}
				else{
					$scope.pageReset();	
				}
				$scope.assignuser= false;
//				$scope.allusersgroupData();
//				$scope.existingusersData();
				
			}); 
	     };

		//  for displaying usergroups list
		
	 	$scope.pageReset=function(){
			$scope.isUpdateDisabled = true;
			$scope.isDeleteDisabled = true;
			$scope.isAssignDisabled = true;
				 
		}
	 	$scope.pageReset();
		$scope.availableUsergroupsGrid = function(){
			  $scope.userDataLoading = true;
		promise = AppServices.getAvailableUsergroupsData(userId, token);
		promise.then(
			function(data){
				$scope.totalRecords = data.length;
				$scope.addUsergroupsGridOptions.data = data;
				allOfTheData = data;
				$scope.addUsergroupsGridOptions.data = data.slice( 0, $scope.itemsPerPage);
				$scope.gridApi.selection.selectRow($scope.addUsergroupsGridOptions.data[0]);
				  $scope.userDataLoading = false;
			},
			function(err){
				  $scope.userDataLoading = false;
			}
		);
	   }
	   
	   
      /*To Show Add User groups Div*/	  
	  
	  $scope.showUsergroups =function(){
		   $scope.userDiv =true;
		  $scope.assignuser= false;
		  $scope.updateButton =false;
		 $scope.createButton =true;
	  }
	   
	   /*Cancel button */
	   
	  $scope.cancel =function(){
		   $scope.userDiv =false;
		   $scope.assignuser= false;
		   $scope.user_group="";
	   }
	   /*Function Call  to create New User groups */
	   
	   $scope.addUsergroup =function(){
		   usergroup =$("#user_group").val();
		   var userid =userId; //$("#user_id").val();
	       console.log("user group"+":"+usergroup + ","+"userid"+":"+userid);
	       $scope.userDataLoading = true;
		    promise = AppServices.addUsers(token,usergroup,userid);
	       promise.then(
			function(data){
				
				$scope.availableUsergroupsGrid();
				$scope.pageReset();
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
				  $scope.userDataLoading = false;
			},
			function(err){
				
				$rootScope.Message = "error occured while creating the usergroup";
				 $('#MessageColor').css("color", "red");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
				  $scope.userDataLoading = false;
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
			$scope.userDataLoading=true;
		promise = AppServices.GetallusersgroupData( token , userGroupId);
		promise.then(
		function(data){
				$scope.allusersgroupGridOptions.data = data;
				$scope.gridApi.selection.selectRow($scope.allusersgroupGridOptions.data[0]); //extra code
				$scope.userDataLoading=false;
			},
			function(err){
				$scope.userDataLoading=false;
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
			$scope.userDataLoading=true;
		promise = AppServices.GetexistingusersData( token,userGroupId,groupName);
		promise.then(
			function(data){
				console.log(data);
				$scope.existingusersGridOptions.data = data;
				
				$scope.gridApi.selection.selectRow($scope.existingusersGridOptions.data[0]); //extra code
				$scope.userDataLoading=false;
			},
			function(err){
				$scope.userDataLoading=false;
			}
		);
	   }
	   /*
				Function for adding user to already existing users
	   */
	   $scope.addinguserData = function(){
		   $scope.userDataLoading=true;
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
				
				else{
					console.log(data.status);}
				$scope.userDataLoading=false;
				
			},
			function(err){
				$scope.userDataLoading=false;
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
			$scope.userDataLoading=true;  
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
				$scope.userDataLoading=false;
			},
			function(err){
				$scope.userDataLoading=false;
			}
		);
	   } 
	   
	    $scope.availableUsergroupsGrid();
	//	$scope.allusersgroupData();
	    
	    $scope.assignUsersLoad=function(){
	    	  $scope.userDiv =false;
	    	 $scope.assignuser= true;
	    	$scope.allusersgroupData();
			$scope.existingusersData();
	    }
	    
	    $scope.UpdateUserGroupBtn=function(){
	    	
	    	  $scope.userDiv =true;
			  $scope.assignuser= false;
			  $scope.updateButton =true;
			  $scope.createButton =false;
			  $("#user_group").val(groupName);
	    }
	    $scope.updateUserGroup=function(){
	    //	userGroupId
	    	 /* $scope.userDiv =true;
			  $scope.assignuser= false;
			  $scope.updateButton =true;
			  $scope.createButton =false;
			  $("#user_group").val(groupName);*/
	    	
	    	var groupNameNew= $("#user_group").val();
	    	if(!$scope.usergroupform.$invalid){
	    		
	    		  $scope.userDataLoading = true;
			promise = AppServices.updateUsergroupData( token , userGroupId,groupNameNew);
			promise.then(
			function(data){
				
				$scope.availableUsergroupsGrid();
				$scope.pageReset();
				if(data.status=="success"){
				 $rootScope.Message = "successfully update the usergroup";
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
				  $scope.userDataLoading = false;
			},
			function(err){
				
				$rootScope.Message = "error occured while creating the usergroup";
				 $('#MessageColor').css("color", "red");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
				  $scope.userDataLoading = false;
			}
			);
	    }
	    	else{
	    		//alert("Error..");
	    		$(this).parent().parent().find(".errors").show();
	    		$("#user_group").focus();
	    	}
			
	    }
	    $scope.deleteUsergroup=function(){
	    	  $scope.userDataLoading = true;
				promise = AppServices.deleteUsergroupData( token , userGroupId);
				promise.then(
				function(data){
					
					$scope.availableUsergroupsGrid();
					$scope.pageReset();
					if(data.status=="success"){
					 $rootScope.Message = "Successfully delete the usergroup";
					 $('#MessageColor').css("color", "green");
					 $scope.user_group="";
				//	 $scope.cancel();
					 }
					 if(data.status=="failure"){
					 $rootScope.Message = "Error occured while creating the usergroup";
					 $('#MessageColor').css("color", "red");
					 }
					 $('#MessagePopUp').modal('show');
					$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
					 $scope.cancel();
					  $scope.userDataLoading = false;
				},
				function(err){
					
					$rootScope.Message = "Error occured while creating the usergroup";
					 $('#MessageColor').css("color", "red");
					 $('#MessagePopUp').modal('show');
					$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
					  $scope.userDataLoading = false;
				}
				);
				
		    }    
	    
	    $scope.DeleteUserGroupBtn=function(){
	    	if(userGroupId!=''){
	   	 if ( window.confirm(deletePopupMsg) ) {
	   		 $scope.deleteUsergroup();
	        }
	    	}
	    	else{
	    		$rootScope.Message = "Usergroup is not selected ";
				 $('#MessageColor').css("color", "red");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
	    	}
	   		 
	   }

});