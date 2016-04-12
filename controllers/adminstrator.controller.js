
oTech.controller('AdminstartorController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		var token = sessionStorage.getItem("token");
		$rootScope.slideContent();
		$rootScope.one =false;
		$rootScope.two = true;
		$rootScope.three =false;
		
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
		/*Navigation Within page in Administration */ 
		
		$scope.showdiv =function(e){
			if(e.currentTarget.id =='_two'){
				$("#User").removeClass("in active");
				$("#Device").addClass("in active");
				$("#Jobs").removeClass("in active");			 
			   }
			if(e.currentTarget.id =='_three'){
				$("#User").removeClass("in active");
				$("#Device").removeClass("in active");
				$("#Jobs").addClass("in active");		
			   }
			if(e.currentTarget.id == '_one'){
				$("#User").addClass("in active");
				$("#Device").removeClass("in active");
				$("#Jobs").removeClass("in active");			
			   }
		}
		/*to show sub dives for user Administration*/
		$scope.showSubDiv =function(e){
			
			if(e.currentTarget.id =='subdiv2'){
				$("#home").removeClass("in active");
				$("#menu1").addClass("in active");
				$("#menu2").removeClass("in active");
					
			  }
			if(e.currentTarget.id =='subdiv3'){
				$("#home").removeClass("in active");
				$("#menu1").removeClass("in active");
				$("#menu2").addClass("in active");		
			  }
			if(e.currentTarget.id == 'subdiv1'){
				$("#home").addClass("in active");
				$("#menu1").removeClass("in active");
				$("#menu2").removeClass("in active");		
					
			  }
		}
		
	/*Show sub div of Device Administration*/
	 
	  $scope. showDeviceAdministrationSubDiv =function(e){
			
		     	if(e.currentTarget.id =='deviceone'){
			       
                   $("#deviceid").addClass("in active");
				   $("#devicegroup").removeClass("in active");
					 
			        }
			   if(e.currentTarget.id =='devicetwo'){
			     	$("#deviceid").removeClass("in active");
				   
				    $("#devicegroup").addClass("in active");
					
								
			       }
			
		}
		/*Show form pages */ 
		$scope.showformpages =function(e){
			
			if(e.currentTarget.id =='form2'){
				$("#account").removeClass("in active");
				$("#assign").addClass("in active");
				$("#reports").removeClass("in active");
					
			  }
			if(e.currentTarget.id =='form3'){
				$("#account").removeClass("in active");
				$("#assign").removeClass("in active");
				$("#reports").addClass("in active");		
			  }
			if(e.currentTarget.id == 'form1'){
				$("#account").addClass("in active");
				$("#assign").removeClass("in active");
				$("#reports").removeClass("in active");		
					
			  }
		}
		
		/*
			To get User Favourites
		*/
		$scope.getFavouriteReports = function(){
			if($rootScope.Favourites == undefined){
				$rootScope.getFavouriteReports();
			}
		}
		$scope.getDashBoardMenu();
		$scope.getFavouriteReports();
		 $('.table-AdministrationAdd').click(function(){
				alert("tableadminstrator");
				$('.AdministrationAdd').slideToggle();
			 });
			 $('.table-emailAdd').click(function(){
				 alert("email")
				$('.emailAdd').slideToggle();
			 });
			 
			 
			$('tr .setting-open').click(function() {
				alert("settings");
				$('tr').find('ul').removeClass('active-data');
				$(this).siblings('ul').addClass('active-data');
			});

			$('.icon-close').click(function() {
				alert("iconclose");
				$(this).parent().parent('ul').removeClass('active-data');
			}); 
		
		
	});