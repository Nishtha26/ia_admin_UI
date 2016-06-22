oTech.controller('replayMapsController', function($scope, $rootScope, $location, AppServices,MapServices, $stateParams, $timeout){
	$scope.name = sessionStorage.getItem("username");
	$rootScope.slideContent();
	window.onresize = function(event) {
		$rootScope.slideContent();
    }	
	var token = sessionStorage.token;
	var userId = sessionStorage.userId;
			/*
			To get dashboard menu data
		*/
	$(document).ready(function(){

		   $.getScript('//cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js',function(){
		    $("#deviceId").select2({
		    });
		  
		  });//script
		});
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
	
	/*repaly from to date for date picker */
   
   function getFormattedDate() {
		var time = '';
		var dateNow = new Date();
		var day = dateNow.getDate();
		var month = dateNow.getMonth() + 1;
		var year = dateNow.getFullYear();
		 time += dateNow.getHours() + ":";
		time +=dateNow.getMinutes();
		var dateFormatted =   month + "/" +  day + "/" + year + " " + time;
		return dateFormatted;
	}
	$(function() {
		
		$('#datetimepicker1').datetimepicker({
			format : 'MM/DD/YYYY HH:mm'
		});
		
		$('#fromDate').val(getFormattedDate());
	
		$("#datetimepicker1").on("dp.change", function(e) {
			$('#datetimepicker1').data("DateTimePicker");
		});
		
		
		$('#datetimepicker2').datetimepicker({
			format : 'MM/DD/YYYY HH:mm'
		});
		
		$('#toDate').val(getFormattedDate());
	
		$("#datetimepicker2").on("dp.change", function(e) {
			$('#datetimepicker2').data("DateTimePicker");
		});
	});	
	 /* to call replay map  */ 
	   $scope.DefaultReplayMap = true ;
	$scope.checkAjaxCall =function(){
	 var deviceId = $('#deviceId').val(); 
	

	 var fromDate = $('#fromDate').val();
	 var toDate = $('#toDate').val();
	 
	 var data = {"deviceId" : deviceId,"fromDate" : fromDate,"toDate" : toDate}; 
	 console.log(data);
	
		$scope.DefaultReplayMap = false ;
		$scope.rePlayMap = true;
		promise = MapServices.getreplay(token,data);
		promise.then(
			function(data){  if(data.length > 0){
				var lat = [];
				var lon = [];
				var deviceData = [];
				for(var s in data){
					if(data[s].deviceLogJson[1].Latitude!=0 && data[s].deviceLogJson[2].Longitude!=0){
						deviceData.push(data[s]);
					lat.push(data[s].deviceLogJson[1].Latitude);
					lon.push(data[s].deviceLogJson[2].Longitude);
					}
				}  
			//	 console.log("from replay js");
			//	 console.log("lon"+lon);
				MapServices.showReplayMap(deviceData,lat, lon);
				}
				else{
					     $scope.DefaultReplayMap = true ;
	  	                $scope.rePlayMap =false ;
					    alert('No Records Was Found')
					 	
				    }
			},
			function(err){
			}
		);
	}
	
	/* Default Replay Map */
	
	MapServices.defaultRepalyMap();
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
	$scope.showDeviceList();
	 
	});