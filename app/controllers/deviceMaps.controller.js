oTech.controller('deviceMapsController', function($scope, $rootScope, $location, AppServices, $stateParams, MapServices, GraphServices, $timeout){
	$scope.name = sessionStorage.getItem("username");
	$rootScope.role = sessionStorage.getItem("role");
	
	$rootScope.slideContent();
	window.onresize = function(event) {
		$rootScope.slideContent();
    };	
	var token = sessionStorage.token;
	var userId = sessionStorage.userId;
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
		
	/*To Make live map as ddefault visible*/	
	
	$scope.ShowLiveMap = true;
	/*
		To get Map data
		
	*/
$scope.ShowReplay = function(){
		$scope.ShowLiveMap = false;
		$scope.ShowMapDiv = true;
		$scope.one =true;
		$scope.two =false;
		$(document).ready(function(){

			   $.getScript('//cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js',function(){
			    $("#deviceId").select2({
			    });
			  
			  });//script
			});
		MapServices.defaultRepalyMap();
}
/*Show Live Map*/

$scope.ShowLive = function(){
		$scope.ShowMapDiv = false;
		$scope.ShowLiveMap = true;	
		$("#replayMapLink").removeClass("viewimage_links-active");
		$("#liveMapLink").addClass("viewimage_links-active");
}
	
/*To get Live Map Data */	
	
	
$scope.getMapData = function(){
		promise = MapServices.GetMapLocations(userId, token);
		promise.then(
			function(data){
				var lat = [];
				var lon = [];
				var deviceData=[];
				for(var s in data){
					if(data[s].deviceLogJson){
					if(data[s].deviceLogJson[1].Latitude!=0 && data[s].deviceLogJson[2].Longitude!=0){
					lat.push(data[s].deviceLogJson[1].Latitude);
					lon.push(data[s].deviceLogJson[2].Longitude);
					deviceData[s]=data[s];
					}
				}
				}
				$("#liveMapLink").attr("class","viewimage_links-active");
				MapServices.DahsboardShowMap(deviceData,lat, lon);
			},
			function(err){
			}
		);
	}
/*On load or refresh call for live map*/	
		
$scope.getMapData();
	
/*To get Form Input data*/
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
	
	
/*To get Replay Map*/	
$scope.checkAjaxCall =function(){
	     var deviceId = $('#deviceId').val(); 
	     var fromDate = $('#fromDate').val();
	     var toDate = $('#toDate').val();
	     var data = {"deviceId" : deviceId,"fromDate" : fromDate,"toDate" : toDate}; 
		
	
		     $scope.ShowLiveMap = false;
		     $scope.ShowMapDiv = true;
		     $scope.one =false;
		     $scope.two =true;
		
		promise = MapServices.getreplay(token,data);
		promise.then(
			function(data){  if(data.length > 0){
				var lat = [];
				var lon = [];
				var deviceData = [];
				for(var s in data){
					if(data[s].deviceLogJson[1].Latitude!=0 && data[s].deviceLogJson[2].Longitude!=0){
						deviceData.push(data[s]);
					lat[s] = data[s].deviceLogJson[1].Latitude;
					lon[s] = data[s].deviceLogJson[2].Longitude;
					}
				}  
				MapServices.showReplayMap(deviceData,lat, lon);
				}
				else{
					 alert('No Records Was Found')
					 	$scope.one =true;
		                $scope.two =false;
				    }
			},
			function(err){
			}
		);
}
	
	
});
