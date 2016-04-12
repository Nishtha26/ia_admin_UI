
oTech.controller('TimeScheduleController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		$scope.selected = sessionStorage.selected;
		$scope.selected1 = sessionStorage.selected1;
        $scope.Market = sessionStorage.Market;
	    $scope.Values = sessionStorage.selectedDevices;
	    $scope.showTime = true;
		
		$scope.showMessage=false;
		$scope.errorMessage="";
		var errorReportMessage="";
		/*Time An date Variables*/
		$scope.todayDate = $rootScope.getTodayDate();
		$scope.currentTime = $rootScope.getCurrentTime();
		var startDate = $scope.todayDate;
		var endDate = $scope.todayDate;
		var startTime = $scope.currentTime;
		var endTime = $scope.currentTime;
		$rootScope.role = sessionStorage.getItem("role");
		
    //vm.alertCount = alertData.length;

		function validate(){
		if(startDate==endDate){
		$scope.showMessage=true;
		//$("#reportSubmit").prop("disabled",true);
		errorReportMessage="both dates are equal";
		
		}else
		if(startDate>endDate){
		$scope.showMessage=true;
//		$("#reportSubmit").prop("disabled",true);
		errorReportMessage="start date should not be beyond the end date";
		$scope.showMessage=true;
		}else
		if(endDate<startDate){
		$scope.showMessage=true;
//		$("#reportSubmit").prop("disabled",true);
		errorReportMessage="end date should be beyond the start date";
		$scope.showMessage=true;
		}else{
		errorReportMessage="";
		$scope.showMessage=false;
		}
	
//		$scope.errorMessage=$scope.errorReportMessage;
		console.log('message ' + errorReportMessage);
		}
		
		
		
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
	
		$scope.getResult = function(){
			sessionStorage.setItem('startDate', startDate);
			sessionStorage.setItem('endDate', endDate);
			sessionStorage.setItem('startTime', $('#startTime').val());
			sessionStorage.setItem('endTime', $('#endTime').val());
			$location.path('/dashboard/' + $stateParams.performance + '/' + $stateParams.smenus + "/performanceResult");
		
		}  
		
		
		/*Date And Time Picker*/
		$(function () {
			$("#datepicker, #datepicker1").datepicker({ 
				autoclose: true, 
				todayHighlight: true,
				format : 'yyyy-mm-dd'
			}).datepicker('update', new Date())
			.on('changeDate', function(e)
			{
				startDate = document.getElementById('startDate').value;
				endDate = document.getElementById('endDate').value;
				
				validate();
				
				
			});
		});
		$(function () {
            $('#datetimepicker3').datetimepicker({
				format: 'HH:mm'
            });
        });
		$(function () {
            $('#datetimepicker4').datetimepicker({
                format: 'HH:mm'
            });
        });  

	validate();
});
