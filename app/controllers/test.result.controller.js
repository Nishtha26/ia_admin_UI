oTech.controller('TestController',
	function ($scope, $rootScope,$timeout, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, uiGridConstants, $cookieStore,$filter,$templateCache) {
	 var userId = sessionStorage.getItem("userId");
     var token = sessionStorage.getItem("token");
     $scope.name = sessionStorage.getItem("username");
     $rootScope.role = sessionStorage.getItem("role");
     $rootScope.slideContent();
     window.onresize = function (event) {
         $rootScope.slideContent();
     }
     /*
      To get dashboard menu data
      */
     $scope.getDashBoardMenu = function () {
         if ($rootScope.menuData == undefined) {
             $rootScope.getMenuData();
         }
     }
     /*
      To get favourite reports
      */
     $scope.getFavouriteReports = function () {
         if ($rootScope.Favourites == undefined) {
             $rootScope.getFavouriteReports();
         }
     }
     $scope.getDashBoardMenu();
     $("#dataLoadingUpdate").show();
     promise = AppServices.getWebETLSchedulerData();
     promise.then(
    	function(data) {
    		$("#dataLoadingUpdate").hide();
    		$scope.etlParameterList = data;
    		$scope.paramlength = data.length;
    		var map = new Object();
    		for (var i = 0; i < data.length; i++) {
    			map[data[i].paramName] = data[i];
    		}
    		$scope.map = map;
    	},
		function(err){
			$("#dataLoadingUpdate").hide();
			alert("error");
		}
	);
     $("#submitbtn").on('click', function(){
    	 $("#dataLoadingUpdate").show();
    	 jsonObj = {};
    	 jsonArray = [];
    	 var m = $scope.map;
    	 var data = {};
    	 data.commandParamString = [];
    	 for (var i = 0; i < $scope.paramlength; i++) {
    		 data.commandParamString[i] = {};
    		 data.commandParamString[i].param_index = m[$("#" + i).attr("name")].paramIndex;
    		 data.commandParamString[i].param_name = $("#" + i).attr("name");
    		 data.commandParamString[i].param_abbreviation = m[$("#" + i).attr("name")].paramAbbreviation;
    		 data.commandParamString[i].param_values = $("#" + i).val();
    	}
    	 data.scheduledTime = $("#scheduleDate").val();
    	 data.isExecuted = 0;   	 
         var json = JSON.stringify(data);
    	 promise = AppServices.postWebETLSchedulerData(json, token, userId);
         promise.then(
        	function(data) {
        		$("#dataLoadingUpdate").hide();
        		alert("Successfully scheduled");
        		$location.path('/dashboard/etlPerformance');
        	},
    		function(err){
    			$("#dataLoadingUpdate").hide();
    			alert("error " + err.status);
    		});
         
     });     
});