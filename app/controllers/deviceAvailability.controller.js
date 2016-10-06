
oTech.controller('deviceAvailabilityController',
	function ($scope, $rootScope, $location, AppServices,GraphServices,GraphMaximizeServices, $stateParams) {
		
			var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		$rootScope.role = sessionStorage.getItem("role");
		$scope.loading = true;
		$scope.dataLoading=false;
		
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
//		$scope.getFavouriteReports();
		$('#parent-list').on('click', 'li', function (e) {
			$("#parent-list li").removeClass('active');
			$(e.currentTarget).addClass('active');
		});
		/*
		To get device availability data
	*/
		$(document).ready(function(){

			   $.getScript('//cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js',function(){
			    $("#deviceId").select2({
			    });
			  
			  });//script
			   
			   
			   $("#device_av_btn").on("click", function(e) {
			     //  alert("you selected :" +);
					var startDate=$("#fromDate").val();
					if(startDate==""){
						$("#fromDate_invalid").show();
						return true;
					}
					else{
						$("#fromDate_invalid").hide();
					}
					var endDate=$("#toDate").val();
					if(startDate==""){
						$("#toDate_required").show();
						return true;
					}
					else{
						$("#toDate_required").hide();
					}
					 var deviceId=$("#deviceId").val();
					if(deviceId==""){
						$("#deviceId_required").show();
						return true;
					}
					else{
						$("#deviceId_required").hide();
					}
				   $scope.dataLoadingMap=true;
				  
				   $("#dataLoadingMap").show();
			       $scope.getDeviceAvailabilityData(startDate,endDate,deviceId);
			   });
			   $(".errors").hide();
			});
		$(function() {
			
			$('#datetimepicker1').datetimepicker({
				format : 'MM/DD/YYYY HH:mm',
				maxDate: new Date()
			});
			$("#datetimepicker1").blur(function(){
			    val = $(this).val();
			    val1 = Date.parse(val);
			    
			    if (isNaN(val1)==true && val!==''){
			    	$("#fromDate_required").show();
			    }
			    else{
			    	$("#fromDate_required").hide();
			    }
			});
			var dateNow = new Date();
			dateNow.setDate(dateNow.getDate() - 1);
			$('#fromDate').val(getFormattedDate(dateNow));
		
			$("#datetimepicker1").on("dp.change", function(e) {
				$('#datetimepicker1').data("DateTimePicker");
			});
			
			
			$('#datetimepicker2').datetimepicker({
				format : 'MM/DD/YYYY HH:mm',
				maxDate: new Date()
			});
			var dateNow = new Date();
			$('#toDate').val(getFormattedDate(dateNow));
		
			$("#datetimepicker2").on("dp.change", function(e) {
				$('#datetimepicker2').data("DateTimePicker");
			});
		});	
		   function getFormattedDate( dateNow) {
				var time = '';
				//var dateNow = new Date();
				var day = dateNow.getDate();
				var month = dateNow.getMonth() + 1;
				var year = dateNow.getFullYear();
				 time += dateNow.getHours() + ":";
				time +=dateNow.getMinutes();
				var dateFormatted =   month + "/" +  day + "/" + year + " " + time;
				return dateFormatted;
			}
	$scope.getDeviceAvailabilityData = function(startDate,endDate,deviceId){
//		 var deviceId = $('#deviceId').val(); 
//		var data="";

		promise = GraphMaximizeServices.GetDeviceAvailabilityDataPerDevice(userId, token,deviceId,startDate,endDate);
	
	promise.then(
		function(data){
				$scope.DeviceAvailabilityData = data;
				GraphMaximizeServices.DahsboardDevicesAvailability(data,startDate,endDate);
				$scope.dataLoadingMap=false;
				  $("#dataLoadingMap").hide();
				$('.highcharts-container').css({"height":"500px"});
				
			},
			function(err){
				$scope.dataLoadingMap=false;
			}
	);
	}
	
		
		$scope.showDeviceList = function(){
			$scope.dataLoading = true;
			promise = AppServices.GetDeviceData(userId, token);
			promise.then(
				function(data){
					$scope.DeviceList = data;
					$scope.devices = data.devicesList;
					$scope.dataLoading=false;
				},
				function(err){
					console.log(err);
				}
			);
		}
		$scope.showDeviceList();
//		$scope.getDeviceAvailabilityData('1409');
		
	});