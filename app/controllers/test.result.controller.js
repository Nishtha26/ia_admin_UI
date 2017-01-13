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
    	 var scDTime = $("#scheduleDate").val();
    	 if(typeof scDTime === "undefined" || scDTime == ''){
				alert("Select Correct Scheduled Date Time");
		    	$("#dataLoadingUpdate").hide();
		    	return false;
		 }
    	 data.scheduledTime = scDTime;
    	 data.commandParamString = [];
    	 for (var i = 0; i < $scope.paramlength; i++) {
    		 data.commandParamString[i] = {};
    		 data.commandParamString[i].param_index = m[$("#" + i).attr("name")].paramIndex;
    		 if("beginDate" === $("#" + i).attr("name")){
    			 var v = $("#" + i).val();
    			 if(typeof v === "undefined" || v == ''){
    				alert("Select Correct beginDate");
    		    	$("#dataLoadingUpdate").hide();
    		    	return false;
    			 }
    			 beginDate = new Date($("#" + i).val());
    		 }
    		 if("endDate" === $("#" + i).attr("name")){
    			 var v = $("#" + i).val();
    			 if(typeof v === "undefined" || v == ''){
    				alert("Select Correct endDate");
    		    	$("#dataLoadingUpdate").hide();
    		    	return false;
    			 }
    			 endDate = new Date($("#" + i).val());
    		 }
    		 data.commandParamString[i].param_name = $("#" + i).attr("name");
    		 data.commandParamString[i].param_abbreviation = m[$("#" + i).attr("name")].paramAbbreviation;
    		 data.commandParamString[i].param_values = $("#" + i).val();
    	}
    	
    	data.isExecuted = 0;
    	if(beginDate > endDate ){
    		alert("Select Correct beginDate and endDate");
    		$("#dataLoadingUpdate").hide();
    		return false;
    	}
    	if(new Date(data.scheduledTime) < new Date()) {
    		alert("Select Correct Schedule Date and Time");
    		$("#dataLoadingUpdate").hide();
    		return false;
    	}
        var json = JSON.stringify(data);
        promise = AppServices.postWebETLSchedulerData(json, token, userId);
        promise.then(
        	function(data) {
        		$("#dataLoadingUpdate").hide();
        		alert("Successfully scheduled");

        	},
    		function(err){
    			$("#dataLoadingUpdate").hide();
    			alert("error " + err.status);
    		});
     });
     
     $scope.webETLSchedulerMappingGrid = oApp.config.webETLSchedulerMappingGrid;
     $scope.webETLSchedulerMappingGrid.onRegisterApi = function( gridApi ) {
    	 $scope.gridApi = gridApi;
    	 $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
    		 console.log(row);
 		});
     };
     
     
     $("#dataLoadingUpdate").show();
     promise = AppServices.getWebETLSchedulerMapping();
     promise.then(
     	function(data) {
     		$("#dataLoadingUpdate").hide();
     		$scope.webETLSchedulerMappingGrid.data = data;
     	},
 		function(err){
 			$("#dataLoadingUpdate").hide();
 			alert("error " + err.status);
 		});

     $scope.stopETL=function() {
    	 $("#dataLoadingUpdate").show();
    	 promise = AppServices.stopRunningETL();
         promise.then(
         	function(data) {
         		$("#dataLoadingUpdate").hide();
         		if(data.status != 'success')
         			alert("Some error occured");
         		
         	},
     		function(err){
     			$("#dataLoadingUpdate").hide();
     			alert("error " + err.status);
     		});
     };
});