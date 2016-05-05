
oTech.controller('deviceAvailabilityController',
	function ($scope, $rootScope, $location, AppServices,GraphServices,GraphMaximizeServices, $stateParams) {
		
			var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		$rootScope.role = sessionStorage.getItem("role");
		
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
		$('#parent-list').on('click', 'li', function (e) {
			$("#parent-list li").removeClass('active');
			$(e.currentTarget).addClass('active');
		});
		/*
		To get device availability data
	*/
	$scope.getDeviceAvailabilityData = function(){
		promise = GraphServices.GetDeviceAvailabilityData(userId, token);
		promise.then(
			function(data){
				$scope.DeviceAvailabilityData = data;
				GraphMaximizeServices.DahsboardDevicesAvailability(data);
				$('.highcharts-container').css({"height":"500px"});
			},
			function(err){
			
			}
		);
	}
		$scope.getDeviceAvailabilityData();
	});