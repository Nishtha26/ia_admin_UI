oTech.controller('ReportsTableauController',
		function ($scope, $rootScope, $location, AppServices,ReportServices, $stateParams) {
		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		$rootScope.role = sessionStorage.getItem("role");
		$scope.name = sessionStorage.getItem("username");
		
		var tableauURL=oApp.config.REPORT_HOST_URL+"views/"+oApp.config.REPORT_NAME+"?:embed=y&:showShareOptions=true&:display_count=no&:showVizHome=no";
		$rootScope.slideContent();
		window.onresize = function(event) {
			$rootScope.slideContent();
		}
		
		/*
			To get dashboard menu data
		*/
		$scope.getDashBoardMenu = function(){
		
			if($rootScope.menuData == undefined){
				$rootScope.getMenuData();
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
		/*To get reports  url*/

        $scope.loadTableauUrl = function(){
//        $scope.hostName=oApp.config.REPORT_HOST_URL;
//        $scope.reportName=oApp.config.REPORT_NAME;
//        #("#loadframe").html("<iframe src="+)
				
			}
   	 $scope.loadTableauUrl();
	
        $scope.inNewWindow = function(){
        	//alert(tableauURL);
        	window.open(tableauURL,'mywin','left=180,top=10,width=1500,height=auto,toolbar=1,resizable=0');
	/*	promise = ReportServices.GetReportCategory(userId, token);
		promise.then(
			function(data){
				    $scope.reports = data;
					sessionStorage.setItem('reportsubmenus',JSON.stringify(data)); to set report data in reportsubmenus 	
			},
			function(err){
				
			}
		);*/
	}	
		$scope.getDashBoardMenu();
		$scope.getFavouriteReports();
	
		
    	
	});