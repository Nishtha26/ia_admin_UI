
oTech.controller('ReportscategoryController',
	function ($scope, $rootScope, $location, AppServices,ReportServices, $stateParams) {
		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		$rootScope.role = sessionStorage.getItem("role");
		$scope.name = sessionStorage.getItem("username");
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
		/*To get reports from report services*/

        $scope.getReportCategory = function(){
		promise = ReportServices.GetReportCategory(userId, token);
		promise.then(
			function(data){
				    $scope.reports = data;
					sessionStorage.setItem('reportsubmenus',JSON.stringify(data)); /*to set report data in reportsubmenus */	
			},
			function(err){
				
			}
		);
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
		 $scope.getReportCategory();
		
	     /* To make default as active and removing and adding  class Active */
    	$scope.checkedItem = 'voiceQuality';
		$('#parent-list').on('click', 'li', function (e) {
			$("#parent-list li").removeClass('active');
			$(e.currentTarget).addClass('active');
			$scope.checkedItem = $(e.currentTarget).text().replace(/ /g,"");
			$scope.checkedItem = $scope.checkedItem.charAt(0).toLowerCase() + $scope.checkedItem.substr(1);
			
		});
		$scope.goToNext = function(){
			if($scope.checkedItem == 'callPerformance'){
				sessionStorage.setItem('selected', $('.active').text());
				$location.path('/dashboard/'+$scope.checkedItem);
			}
			else if($scope.checkedItem == 'voiceQuality'){
				sessionStorage.setItem('selected', $('.active').text());
				$location.path('/dashboard/'+$scope.checkedItem);
			}
			else if($scope.checkedItem == 'dataPerformance'){
				sessionStorage.setItem('selected', $('.active').text());
				$location.path('/dashboard/'+$scope.checkedItem);
			}
			else if($scope.checkedItem == 'videoQuality'){
				sessionStorage.setItem('selected', $('.active').text());
				$location.path('/dashboard/'+$scope.checkedItem);
			}
			if($scope.checkedItem == 'rFPerformance'){
				sessionStorage.setItem('selected', $('.active').text());
				$location.path('/dashboard/'+$scope.checkedItem);
			}
			else if($scope.checkedItem == 'mobility'){
				sessionStorage.setItem('selected', $('.active').text());
				$location.path('/dashboard/'+$scope.checkedItem);
			}
			else if($scope.checkedItem == 'wIFIPerformance'){
				sessionStorage.setItem('selected', $('.active').text());
				$location.path('/dashboard/'+$scope.checkedItem);
			}
			
		}
	});