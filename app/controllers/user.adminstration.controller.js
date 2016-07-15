oTech.controller('userAdminstrationController',
	function ($scope, $rootScope, $location, AppServices, $stateParams,$timeout) {
				var token = sessionStorage.getItem("token");
				var userId = sessionStorage.getItem("userId");
				$rootScope.role =sessionStorage.getItem("role");
				$scope.loading = true;
				var customerList = [];
				var userGroupList=[];
				var clickedItem;
				var row,customerName;
				$scope.error=false;
				$scope.errormsg="";
				$scope.selectedUserGroup=[];
				
			//	$scope.role ="ROLE_IAADMIN"
			$scope.addCustomer = true;		
		    $rootScope.slideContent();
		$scope.roleList = {
			ROLE_OTADMIN : ['ROLE_OTADMIN', 'ROLE_IAADMIN','ROLE_REPORTING'],
			ROLE_IAADMIN : ['ROLE_IAADMIN','ROLE_REPORTING'],
			ROLE_REPORTING : ['ROLE_REPORTING']	
		};
		var deletePopupMsg="Are you want to delete this user(s)?"
		$scope.accountDiv =false;
		$scope.addCustomer = false; 
		$scope.role1 = false; 
		$scope.role2 = false;
		$scope.createCompanyId = false;
		$scope.tableCompanyId = false;
		$scope.status =false;
//		 $(".update-btn").addClass("disabled");
		/* $(".delete-btn").addClass("disabled");*/
		 $scope.isUpdateDisabled = true;
		 $scope.isDeleteDisabled = true;
		 $scope.deleteLabel="Activate/Deactivate";
		 $scope.accountEnableStatus;
		$scope.selectedUsers;
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
		
				$scope.pageReset=function(){
					$scope.isUpdateDisabled = true;
					$scope.isDeleteDisabled = true;
					$scope.deleteLabel="Activate/Deactivate";
						 
				}
		
		/*	 $('.table-AdministrationAdd').click(function(){
				//$('.AdministrationAdd').slideToggle();
				$scope.addCustomer = false;
				$scope.accountDiv =true;
				
			 }); */
			 $scope.toCreateNewUserAccount =function(){
                    $scope.updateButton =false;
				    $scope.createButton =true;				   
				     clickedItem ="createuser";
					$scope.accountDiv =true;
		            $scope.addCustomer = true;
					$scope.role1 = true; 
                    $scope.role2 = false;
					$scope.createCompanyId = true;
		             $scope.tableCompanyId = false;
					 $scope.status =true;
					$("#firstname").focus();
					$('#email-8').attr('readonly', false);
					$("#username-7").attr('readonly', false);
					$("#username-7").val("") ;
					$("#firstname").val("") ;
					$("#lastname").val("") ;
					$("#password").val("") ;
					$("#cnfpassword").val("") ;
					$("#email-8").val("") ;
					$("#role-8").val("");
					$("#companyId").val("");
					if($rootScope.role=="ROLE_OTADMIN"){
//					$("#customer-8").val("");
					$("#customer-8").select2().select2('val','');
//					$('#customer-8').attr('readonly', false);
					}
					else{
						$("#customer-8").val("");	
					}
					$scope.selectedUserGroup=[];
					$(".errors").hide();
			 }
			 $('.table-emailAdd').click(function(){
				
				$('.emailAdd').slideToggle();
			 });
			 
			 
			$('tr .setting-open').click(function() {
				$('tr').find('ul').removeClass('active-data');
				$(this).siblings('ul').addClass('active-data');
			});

			$('.icon-close').click(function() {
				$(this).parent().parent('ul').removeClass('active-data');
			}); 

$scope.userTableGridOptions = oApp.config.userTableGridOptions;
/*on grid row clicked*/
$scope.userTableGridOptions.onRegisterApi = function( gridApi ) { //extra code
		// console.log(gridApi);
		    $scope.gridApi = gridApi;
		  $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
			  
		$scope.currentRow=row;
		$scope.selectedUsers=$scope.gridApi.selection.getSelectedRows();
		var numRows=$scope.gridApi.selection.getSelectedRows().length;
		 var msg = 'rows changed ' + $scope.gridApi.selection.getSelectedRows().length;
		 $scope.accountDiv =false;
		 if(numRows==1){
			 console.log("row"+ $scope.gridApi.selection.getSelectedRows()+"::"+$scope.gridApi.selection.getSelectedRows().username);
			 $scope.currentRow=$scope.gridApi.selection.getSelectedRows()
			 $scope.isUpdateDisabled = false;
//			 $scope.isDeleteDisabled = false;
				$scope.DeleteBtnLabel();
//			 $(".update-btn").removeClass("disabled");
//			 $(".delete-btn").removeClass("disabled");
		 }
		 else if(numRows>=2){
			 $scope.isUpdateDisabled = true;
//			 $scope.isDeleteDisabled = false;
			 $scope.DeleteBtnLabel();
//			 $(".update-btn").addClass("disabled");
//			 $(".delete-btn").remove("disabled");
		 }
		 else{
			 $scope.isUpdateDisabled = true;
			 $scope.isDeleteDisabled = true;
//			 $(".update-btn").addClass("disabled");
//			 $(".delete-btn").addClass("disabled");
		 }
		 console.log(msg);
		
 
	$scope.UpdateUserBtn=function(){
		var row=$scope.currentRow;
	     clickedItem ="updateuser";
		 $scope.updateButton =true;
		 $scope.createButton =false;
		 console.log(row);
         console.log(row[0].companyName);
				$scope.accountDiv =true;
            $scope.addCustomer = false; 
			$scope.role1 = false; 
            $scope.role2 = true;
			$scope.createCompanyId = false;
            $scope.tableCompanyId = false;
			$scope.status =false;
			/* To Display Values in Form Elements  When Table Row is Clicked*/
			$scope.activeUserGroups=	userGroupList;
			$("#firstname").val(row[0].firstName) ;
			$("#lastname").val(row[0].lastName) ;
			$("#password").val(row[0].password) ;
			$("#cnfpassword").val(row[0].password) ;
			$("#email-8").val(row[0].email) ;
			$('#email-8').attr('readonly', true);
			$("#username-7").val(row[0].username) ;
			$("#username-7").attr('readonly', true) ;
//			$("#customer-8").val(row.entity.companyName);
			
			$scope.tablerole =row[0].roleName;
//			$("#customer-8").select2().select2('val',row.entity.companyName);
			if($rootScope.role=="ROLE_OTADMIN"){
				$("#customer-8").select2().select2('val',row[0].companyName);
			}
			else{
				$("#customer-8").val(row[0].companyName);
			}
		//	$('#customer-8').attr('readonly', true);
			$("#role-8").val(row[0].status);
			$scope.selectedUserGroup=row[0].userGroupName;
			$(".errors").hide();
			if($scope.myForm.$invalid){
				$(this).parent().parent().find(".errors").show();
			}
			

			
		
			
	}
	
	$scope.UpdateUser =function(){
		//alert("hai");
			 var username         = $("#username-7").val() ;
			 var password         = $("#password").val() ;
			 var matchingPassword =	$("#cnfpassword").val() ;
			 var status           =$("#role-8").val();
			 var firstName        =$("#firstname").val() ;
			 var lastName         =	$("#lastname").val() ;
			 var companyId        =	 $("#companyId").val();
			 var email            =	$("#email-8").val() ;	
			 var roleName         =	$(".edit-role").val() ;
//			 var companyName      = $("#customer-8").select2().select2('val');
			 var companyName ;
				if($rootScope.role=="ROLE_OTADMIN"){
					companyName = $("#customer-8").select2().select2('val');
				}
				else{
					companyName=	$("#customer-8").val();
				}
			 var userGroupName=$scope.selectedUserGroup;
			
			/*To Update User in Useradminstration*/
			if(clickedItem =="createuser"){
			}
			else{
				
				 var data ={username:username,password :password ,confirmPassword:matchingPassword,firstName:firstName,lastName:lastName,email:email,companyName:companyName,userGroupName:userGroupName,roleName:roleName};	
		          console.log(data);			    
				promise = AppServices.UpdateUserInUserAdminstration(data,token);
		         promise.then(
			     function(data){
				
				  row.entity.firstName = firstName;
				  row.entity.lastName =lastName;
				  row.entity.username =username
				  row.entity.status =status;
				  row.entity.email=email;
				  row.entity.roleName=roleName;
				  row.entity.companyName=companyName;	
				  	$rootScope.Message = "user updated successfully";
				 $('#MessageColor').css("color", "green");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
				
			
		          
			     },
			     function(err){
						$rootScope.Message = "error occured during updation";
				 $('#MessageColor').css("color", "green");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
					
			     }
		       );
				
			} 
		}
		  });
}; 
/*Create user*/	
$scope.CreateUser =function(){
	
	 var username = $("#username-7").val() ;
			 var password         = $("#password").val() ;
			 var matchingPassword =	$("#cnfpassword").val() ;
			 var status           =$("#role-8").val();
			 var firstName        =$("#firstname").val() ;
			 var lastName         =	$("#lastname").val() ;
			 var companyId        =	 $("#companyId").val();
			 var email            =	$("#email-8").val() ;	
			 var roleName         =	$("#role").val() ;
			 var companyName ;
				if($rootScope.role=="ROLE_OTADMIN"){
					companyName = $("#customer-8").select2().select2('val');
				}
				else{
					companyName=	$("#customer-8").val();
				}
			 var userGroupName=$scope.selectedUserGroup;
			 
	var newuserdata ={username:username,status:status,firstName:firstName,lastName:lastName,email :email,roleName:roleName,companyName:companyName,userGroupName:userGroupName  };	
   if(clickedItem =="createuser"){
	   
			if($scope.myForm.$valid){
			  var data ={username:username,password :password ,matchingPassword:matchingPassword,status:status,firstName:firstName,lastName:lastName,companyId:companyId,email :email,roleName:roleName,companyName:companyName,userGroupName:userGroupName }	;	
		      
			   promise = AppServices.CreateUserinUserAaminstration(data,token);
		       promise.then(
			   function(data){
               
				
				$rootScope.Message = data.status;
				if(data.status=="error"){
				$rootScope.Message=data.errorDescription;
				$('#MessageColor').css("color", "red");
				 $('#MessagePopUp').modal('show');
				 
				}
				if(data.status=="success"){
				$scope.userTableGridOptions.data.push(newuserdata);
				$rootScope.Message="user created successfully";
				 $('#MessageColor').css("color", "green");
				 $('#MessagePopUp').modal('show');
				 $scope.cancel();
				 }
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
				
			   },
			   function(err){
				   $rootScope.Message = err.responseJSON.message; //"An error occured while creating the user. Please try later..";
				 $('#MessageColor').css("color", "red");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
				
			   }
		       ); 

		   }
			
			}	
	 
}	 
		 

		/*  To get User Table data For Useradminstration */
		$scope.userTableData = function(){
			$scope.dataLoading=true;
			$scope.pageReset();
		promise = AppServices.GetuserTableData(userId, token);
		promise.then(
			function(data){
				$scope.totalRecords = data.length;
				allOfTheData = data;
//				$scope.userTableGridOptions.data = data;
				$scope.userTableGridOptions.data = data.slice( 0, $scope.itemsPerPage);
				//console.log($scope.serverSettingsGridOptions.data[0]);
				$scope.gridApi.selection.selectRow($scope.userTableGridOptions.data[0]); //extra code
				$scope.dataLoading=false;
			},
			function(err){
				$scope.dataLoading=false;
			}
		);
	   }
		   $scope.createNewDatasource = function() {
				$scope.dataLoading = true;
				$scope.userTableGridOptions.data = allOfTheData.slice( startLimit, $scope.endLimit);
				$scope.dataLoading = false;
			}
	  $scope.cancel = function(){
		  $scope.accountDiv = false;
	   }
		/*
			Function to get list of customers
		*/
		$scope.customerList = function(){
		promise = AppServices.GetcustomerList(userId, token);
		promise.then(
			function(data){
			
			for(var i=0;i<data.customerDetails.length;i++){
					
					customerList[i] = data.customerDetails[i].customerName;
					
				}
			$scope.customers=customerList;
				if($rootScope.role=="ROLE_OTADMIN"){
					
					 $.getScript('//cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js',function(){
						    $("#customer-8").select2({
						    });
					 });
			/*	 $( "#customer-8" ).autocomplete({
				source: customerList
   				 }); */
				}else{
					$( "#customer-8" ).val(customerList); 
				}
				
			},
			function(err){
				console.log(err);
			}
		);
	   }
		
		$scope.userTableData();
        $scope.customerList(); 
/*Create Customer*/
$scope.createCustomer =function(){
	
				
	
	
		customerName = $("#customer_name").val();
		if(customerName==''){
			$("#customer_name-msg").show();
			return;
		}
		else{
			$scope.dataLoading=true;
		promise = AppServices.createCustomerUserAdministration(customerName, token);
		promise.then(
			function(data){
				customerList.push(customerName);
				if(data.errorDescription == "customer already exists"){
					//$scope.errorMessage = true;
						$rootScope.Message = data.errorDescription;
				 $('#MessageColor').css("color", "green");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
				}
				if(data.status=="success"){

				//	$("#customer_name").val("");
				//	$( "#customer-8" ).val(customerName);
//					$("#customer-8").select2().select2('val',customerName);
						if($rootScope.role=="ROLE_OTADMIN"){
							$("#customer-8").select2().select2('val',customerName);
						}
						else{
							$("#customer-8").val(customerName);
						}
					
				}
				$scope.dataLoading=false;
			},
			function(err){
				$scope.dataLoading=false;
			}
		);
	   
		}
	
	$('.emailAdd').slideToggle();
}	
/*Close Create Customer popup*/
$scope.closerCreatePop =function(){
	
	$("#customer_name").val("");
	$('.emailAdd').slideToggle();
}	

$scope.userGroupList =function(){
	
	
	
	
	promise = AppServices.GetActiveuserGroupsData(userId, token);
	promise.then(
		function(data){
			$scope.activeUserGroups=data;
			userGroupList=$scope.activeUserGroups;
			
		},
		function(err){
			
		}
	);
   


}	
$scope.userGroupList();

$scope.getCheckedUserGroup =function(usergroup){
	 var idx = $scope.selectedUserGroup.indexOf(usergroup);

	    // is currently selected
	    if (idx > -1) {
	      $scope.selectedUserGroup.splice(idx, 1);
	    }

	    // is newly selected
	    else {
	      $scope.selectedUserGroup.push(usergroup);
	    }
	/* alert(""+checkvalue);
	 $scope.selectedUserGroup.push(checkvalue);*/
 }
$scope.deleteUser =function(userNames,accountEnableStatus){
	$scope.dataLoading=true;
//	var userNames=$(".d-username").val();
	promise = AppServices.deleteUserAdministration(token,userNames, accountEnableStatus);
	promise.then(
		function(data){
			$rootScope.Message = data.status;
			if(data.status=="error"){
			$rootScope.Message=data.errorDescription;
			$('#MessageColor').css("color", "red");
			 $('#MessagePopUp').modal('show');
			 $timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
			}
			if(data.status=="success"){
			
			$rootScope.Message="User update successfully";
			 $('#MessageColor').css("color", "green");
			 $('#MessagePopUp').modal('show');
			 $scope.cancel();
			 $timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
			 $scope.userTableData();
			 }
			$scope.dataLoading=false;
		},
		function(err){
			  $rootScope.Message = err.responseJSON.message; //"An error occured while creating the user. Please try later..";
				 $('#MessageColor').css("color", "red");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
				$scope.dataLoading=false;
		}
	);
	
	
}
$scope.DeleteUserBtn=function(){
	 var userNames;
	 var isComma=false;
	 for(var uIndex in $scope.selectedUsers){
//		 console.log(""+$scope.selectedUsers[uIndex].username);
//	userNames.push($scope.selectedUsers[uIndex].username);	
		 if(isComma){
			 userNames=	 userNames+","+ "'"+$scope.selectedUsers[uIndex].username+ "'";
			
		 }
		 else{
			 userNames= "'"+$scope.selectedUsers[uIndex].username+"'";
			 isComma=true;
		 }
	 }
	 console.log("userNames "+userNames);
	 if ( window.confirm(deletePopupMsg) ) {
		 $scope.deleteUser(userNames,$scope.accountEnableStatus);
     }
		 
}
$scope.DeleteBtnLabel=function(){
	 $scope.isDeleteDisabled = true;
	 $scope.deleteLabel="Activate/Deactivate";
	var isActiveCount=0;
	var isDeactiveCount=0;
	 for(var uIndex in $scope.selectedUsers){
		 if($scope.selectedUsers[uIndex].status=='ACTIVE'){
//			 userNames=	 userNames+","+ "'"+$scope.selectedUsers[uIndex].username+ "'";
			 isActiveCount++;
		 }
		 else{
			 isDeactiveCount++;
		 }
	 }
	if($scope.selectedUsers.length==isActiveCount){
		$scope.deleteLabel="Deactivate";
		deletePopupMsg="Are you want to deactivate this user(s)?"
		 $scope.isDeleteDisabled = false;
		 $scope.accountEnableStatus=0;
	}
	if($scope.selectedUsers.length==isDeactiveCount){
		$scope.deleteLabel="Activate";
		deletePopupMsg="Are you want to activate this user(s)?"
		 $scope.accountEnableStatus=1;
		 $scope.isDeleteDisabled = false;
	}
		 
}

$scope.pageReset();
$('#myForm input ' ).blur(function() {
	if($scope.myForm.$invalid){
		$(this).parent().parent().find(".errors").show();
	}
//	  alert( "Handler for .blur() called." );
	});
});