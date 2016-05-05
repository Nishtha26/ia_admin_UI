oTech.controller('userAdminstrationController',
	function ($scope, $rootScope, $location, AppServices, $stateParams,$timeout) {
				var token = sessionStorage.getItem("token");
				var userId = sessionStorage.getItem("userId");
				$rootScope.role =sessionStorage.getItem("role");
				var customerList = [];
				var clickedItem;
				var row,customerName;
				$scope.error=false;
				$scope.errormsg="";
			//	$scope.role ="ROLE_IAADMIN"
			$scope.addCustomer = true;		
		    $rootScope.slideContent();
		$scope.roleList = {
			ROLE_OTADMIN : ['ROLE_OTADMIN', 'ROLE_IAADMIN','ROLE_REPORTING'],
			ROLE_IAADMIN : ['ROLE_IAADMIN','ROLE_REPORTING'],
			ROLE_REPORTING : ['ROLE_REPORTING']	
		};
		
		$scope.accountDiv =false;
		$scope.addCustomer = false; 
		$scope.role1 = false; 
		$scope.role2 = false;
		$scope.createCompanyId = false;
		$scope.tableCompanyId = false;
		$scope.status =false;
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
					$('#customer-8').attr('readonly', false);
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
			     clickedItem ="updateuser";
				 $scope.updateButton =true;
				 $scope.createButton =false;
				 console.log(row.entity);
		         console.log(row.entity.companyName);
						$scope.accountDiv =true;
		            $scope.addCustomer = false; 
					$scope.role1 = false; 
                    $scope.role2 = true;
					$scope.createCompanyId = false;
		            $scope.tableCompanyId = false;
					$scope.status =false;
					/* To Display Values in Form Elements  When Table Row is Clicked*/
					$("#firstname").val(row.entity.firstName) ;
					$("#lastname").val(row.entity.lastName) ;
					$("#password").val(row.entity.password) ;
					$("#cnfpassword").val(row.entity.password) ;
					$("#email-8").val(row.entity.email) ;
					$('#email-8').attr('readonly', true);
					$("#username-7").val(row.entity.username) ;
					$("#username-7").attr('readonly', true) ;
					$("#customer-8").val(row.entity.companyName);
					
					$scope.tablerole =row.entity.roleName;
					$('#customer-8').attr('readonly', true);
					$("#role-8").val(row.entity.status);
					
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
			 var roleName         =	$("#role").val() ;
			 var companyName      = $("#customer-8").val();
			 
			
			/*To Update User in Useradminstration*/
			if(clickedItem =="createuser"){
			}
			else{
				
				 var data ={username:username,password :password ,confirmPassword:matchingPassword,firstName:firstName,lastName:lastName,email:email};	
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
			 var companyName      = $("#customer-8").val();
			 
	var newuserdata ={username:username,status:status,firstName:firstName,lastName:lastName,email :email,roleName:roleName,companyName:companyName  };	
   if(clickedItem =="createuser"){
	   
			if($scope.myForm.$valid){
			  var data ={username:username,password :password ,matchingPassword:matchingPassword,status:status,firstName:firstName,lastName:lastName,companyId:companyId,email :email,roleName:roleName,companyName:companyName }	;	
		      
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
		promise = AppServices.GetuserTableData(userId, token);
		promise.then(
			function(data){
				
				$scope.userTableGridOptions.data = data;
				//console.log($scope.serverSettingsGridOptions.data[0]);
				$scope.gridApi.selection.selectRow($scope.userTableGridOptions.data[0]); //extra code
			},
			function(err){
				
			}
		);
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
				
				if($rootScope.role=="ROLE_OTADMIN"){
			
				 $( "#customer-8" ).autocomplete({
				source: customerList
   				 }); 
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

					$("#customer_name").val("");
					$( "#customer-8" ).val(customerName);
				}
				
			},
			function(err){
				
			}
		);
	   
	
	
	$('.emailAdd').slideToggle();
}	
/*Close Create Customer popup*/
$scope.closerCreatePop =function(){
	
	$("#customer_name").val("");
	$('.emailAdd').slideToggle();
}	



});