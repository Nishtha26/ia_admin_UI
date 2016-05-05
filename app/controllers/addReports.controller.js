oTech.controller('addReportsController',
	function ($scope, $rootScope, $location, AppServices, $stateParams,$timeout) {

		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		$rootScope.role=sessionStorage.role;
		
		$scope.menuTypeList=[];
		
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
		
		$scope.availableReportsGridOptions = oApp.config.availableReportsGridOptions;	
		/* To get Available Reports */
		$scope.availableReportsGrid = function(){
		promise = AppServices.getAvailableReportsData(userId, token);
		promise.then(
			function(data){
				$scope.availableReportsGridOptions.data = data;
			
			},
			function(err){
				console.log(err);
			}
		);
	   }
	   $scope.availableReportsGrid();
      /*To Show Add Reports Div*/	  
	  $scope.showAddReportDiv =function(){
		   $scope.reportDiv =true;
	   }
	   /*Function Call  to create New Report */
	   $scope.addNewReport =function(){
		   var screenName =$("#report_name").val();
		   var menuUrl =$("#report_url").val();
	       var menuType =$("#report_type").val();
		   var data ={screenName:screenName,menuUrl:menuUrl,menuType:menuType,userId:userId,iconUrl:'dashboard-icon.png'};
		  
		  promise = AppServices.addReport(data, token);
	       promise.then(
			function(data){
			
			 $scope.availableReportsGrid();
			 $scope.report_name = "";
			 $scope.report_url = "";
			 $rootScope.Message = data.status;
				 $('#MessageColor').css("color", "green");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
			},
			function(err){
				$rootScope.Message = err.statusText;
				 $('#MessageColor').css("color", "green");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
			}
		); 
	   }
	   
	   /*
	   *	for retrieving menu types in add reports 
	   */
	   $scope.menuType = function(){
		promise = AppServices.GetMenuTypeList(userId, token);
		promise.then(
			function(data){
				
				$scope.menuTypeList=data.menuTypeDetails;
			console.log(" menuType : "+ $scope.menuTypeList);
			},
			function(err){
				console.log(err);
			}
		);
	   }
	   
	   /* cancel button functionality */
	   $scope.canceladdReport = function(){
		    $scope.reportDiv = false;
			$scope.report_name = "";
			$scope.report_url = "";
	   }
	   
	   $scope.menuType();
});