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
     
     $scope.callBeginCalender = function(){
    	 $('#blankclassBeginDiv').fadeToggle();
    	 $('#blankclassBeginDiv').datetimepicker({
    		 date: new Date(),
    		 viewMode: 'YMDHMS',
    		 onDateUpdate: function(){
    			 console.log("yoyo"  + this);
    			 ($('.blankclassBegin')[0]).value = this.getText();
    		 },
    		 onOk: function() {
    			 $('#blankclassBeginDiv').fadeToggle();
    		 },
    		 onToday: function() {
    			 $('#blankclassBeginDiv').fadeToggle();
    		 }
    		 
		});
     }
     $scope.callEndCalender = function(){
    	 $('#blankclassEndDiv').fadeToggle();
    	 $('#blankclassEndDiv').datetimepicker({
    		 date: new Date(),
    		 viewMode: 'YMDHMS',
    		 onDateUpdate: function(){
    			 console.log("yoyo"  + this);
    			 ($('.blankclassend')[0]).value = this.getText();
    		 },
    		 onOk: function() {
    			 $('#blankclassEndDiv').fadeToggle();
    		 },
    		 onToday: function() {
    			 $('#blankclassEndDiv').fadeToggle();
    		 }
		});
     }
     
     $scope.callscheduleDateCalender = function(){
    	 $('#blankclassscheduleDateDiv').fadeToggle();
    	 $('#blankclassscheduleDateDiv').datetimepicker({
			date: new Date(),
			viewMode: 'YMDHMS',
			onDateUpdate: function(){
            console.log("yoyo"  + this);
            ($('#scheduleDate')[0]).value = this.getText();
			},
			onOk: function() {
				$('#blankclassscheduleDateDiv').fadeToggle();
			},
	   		 onToday: function() {
				 $('#blankclassscheduleDateDiv').fadeToggle();
			 }
		});
     }
    /*$(document).on("click",function(event){
    	 if( $(event.target).closest("#blankclassBeginDiv").length != 1) {
 	    	$('#blankclassBeginDiv').fadeToggle();
 	    }
    	if( $(event.target).closest("#blankclassEndDiv").length != 1){
 	    	$('#blankclassEndDiv').fadeToggle();
 	    }
    	if( $(event.target).closest("#blankclassscheduleDateDiv").length != 1){
    		$('#blankclassscheduleDateDiv').fadeToggle();
 	    }
    });*/
     
     
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
    		 
    		 if(("beginDate" === $("#" + i).attr("name")) ||  ("endDate" === $("#" + i).attr("name"))){
    			 data.commandParamString[i].param_values = $("#" + i).val().replace("/", "-").replace("/", "-");
    			 continue;
    		 }
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
    	data.scheduledTime = data.scheduledTime.replace("/", "-").replace("/", "-");
        var json = JSON.stringify(data);
        promise = AppServices.postWebETLSchedulerData(json, token, userId);
        promise.then(
        	function(data) {
        		$("#dataLoadingUpdate").hide();
        		if(data.status != 'success')
         			alert("Some error occured");
        		else
        			alert("Successfully scheduled");
        		$scope.webETLSchedulerMappingGrid.data = [];
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
        	     $('.blankclass input[type="text"]').val('');
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