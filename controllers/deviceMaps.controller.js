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
		MapServices.defaultRepalyMap();
}
/*Show Live Map*/

$scope.ShowLive = function(){
		$scope.ShowMapDiv = false;
		$scope.ShowLiveMap = true;		
}
	
/*To get Live Map Data */	
	
	
$scope.getMapData = function(){
		promise = MapServices.GetMapLocations(userId, token);
		promise.then(
			function(data){
				var lat = [];
				var lon = [];
				for(var s in data){
					if(data[s].deviceLogJson){
					lat[s] =  data[s].deviceLogJson[1].Latitude;
					lon[s] = data[s].deviceLogJson[2].Longitude;
				}
				}
				MapServices.DahsboardShowMap(lat, lon);
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
				for(var s in data){
					lat[s] = data[s].deviceLogJson[1].Latitude;
					lon[s] = data[s].deviceLogJson[2].Longitude;
				}  
				MapServices.showReplayMap(lat, lon);
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
