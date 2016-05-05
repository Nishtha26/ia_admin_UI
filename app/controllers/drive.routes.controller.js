
oTech.controller('DriveRoutesController',
	function ($scope, $rootScope, $location, AppServices,ReportServices,MapServices, $stateParams ,$sce) {


		// init jquery functions and plugins
$(document).ready(function(){

   $.getScript('//cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js',function(){
    $("#mySel").select2({
    });
  
  });//script
  
});


		var token = sessionStorage.getItem("token");
		var userId = sessionStorage.getItem("userId");
		$rootScope.role=sessionStorage.getItem("role");
		$rootScope.slideContent();
		window.onresize = function(event) {
			$rootScope.slideContent();
		}
		$scope.name = sessionStorage.getItem("username");
		$scope.DefaultReplayMap = true ;
		$scope.rePlayMap = false;
		
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
		$scope.getDashBoardMenu();
		$scope.getFavouriteReports();
		
		
		   function getFormattedDate() {
		var time = '';
		var dateNow = new Date();
		var day = dateNow.getDate();
		var month = dateNow.getMonth() + 1;
		var year = dateNow.getFullYear();
		
		var dateFormatted =    year + "-" + month   + "-" + day ;
		return dateFormatted;
	}
	$(function() {
		
		$('#datetimepicker1').datetimepicker({
			format : 'YYYY-MM-DD '
		});
		
		$('#fromDate').val(getFormattedDate());
	
		$("#datetimepicker1").on("dp.change", function(e) {
			$('#datetimepicker1').data("DateTimePicker");
		});
		
		
		$('#datetimepicker2').datetimepicker({
			format : 'YYYY-MM-DD '
		});
		
		$('#toDate').val(getFormattedDate());
	
		$("#datetimepicker2").on("dp.change", function(e) {
			
			$('#datetimepicker2').data("DateTimePicker");
		});
	});	
	   
		 var fromDate = $('#fromDate').val();
	     var toDate = $('#toDate').val();
     	
	$scope.showDeviceList = function(){
		$scope.dataLoading = true;
		promise = AppServices.GetDeviceData(userId, token);
		promise.then(
			function(data){
				$scope.DeviceList = data;
				$scope.devices = data.devicesList;
				
			},
			function(err){
				console.log(err);
			}
		);
	}
	$scope.checkAjaxCall =function(){
	 var deviceId = $('#mySel').val(); 
	 var fromDate = $('#fromDate').val();
	 var toDate = $('#toDate').val();
	 $scope.DefaultReplayMap = false ;
	 $scope.rePlayMap = true;
     var url=sessionStorage.DriveroutesmenuUrl;
	 url = url +'&startdate=' + fromDate + '&enddate=' + toDate + '&device=' + deviceId ;	
	 $scope.ReportUrl =url ;
	 $scope.ReportUrl = $sce.trustAsResourceUrl($scope.ReportUrl);
}
	$scope.showDeviceList();
	MapServices.defaultRepalyMap();
	
});