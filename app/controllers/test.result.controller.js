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

     $('#SchedulerType').on( "change", function() {
    	 //var selected = $(this).find(":selected").text();
    	 if($(this).find(":selected").val() == "1") {
    		 $('#OverlapTime').val("").prop("disabled", true);
    		 $('#RunningInterval').val("-1").prop("disabled", true);
    		 $('#ETLExpiryTime1').val("").prop("disabled", true);
    		 $(".begindatetodisable").prop("disabled", false);
    		 $(".enddatetodisable").prop("disabled", false);    		 
    	 }
    	 if($(this).find(":selected").val() == "3") {
    		 $('#OverlapTime').val("").prop("disabled", false);
    		 $('#RunningInterval').val("30").prop("disabled", false);
    		 $('#ETLExpiryTime1').val("").prop("disabled", false);
    		 $(".enddatetodisable").val("").prop("disabled", true);
    		 $(".begindatetodisable").prop("disabled", false);
    	 }
    	 if($(this).find(":selected").val() == "2") {
    		 $('#OverlapTime').val("").prop("disabled", false);
    		 $('#RunningInterval').val("30").prop("disabled", false);
    		 $('#ETLExpiryTime1').val("").prop("disabled", false);
    		 $(".begindatetodisable").prop("disabled", true);
    		 $(".enddatetodisable").val("").prop("disabled", true);    		 
    	 }
     });
     
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
    			 if($(".begindatetodisable").prop("disabled") == true) {
    				data.commandParamString[i].param_abbreviation = "-b";
    				data.commandParamString[i].param_name = "beginDate";
    			 	data.commandParamString[i].param_values = "";
    				continue;
    			 }
    			 var v = $("#" + i).val();
    			 if(typeof v === "undefined" || v == ''){
    				alert("Select Correct beginDate");
    		    	$("#dataLoadingUpdate").hide();
    		    	return false;
    			 }
    			 beginDate = new Date($("#" + i).val());
    		 }
    		 if("endDate" === $("#" + i).attr("name")){
    			 if($(".enddatetodisable").prop("disabled") == true) {
    				data.commandParamString[i].param_abbreviation = "-e";
     				data.commandParamString[i].param_name = "endDate";
     			 	data.commandParamString[i].param_values = "";
     				continue;
    			 }
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
    		 
    		 if(("beginDate" === $("#" + i).attr("name"))){
    			 data.commandParamString[i].param_values = $("#" + i).val().replace("/", "-").replace("/", "-");
    			 continue;
    		 }
    			 
    		if("endDate" === $("#" + i).attr("name")) {
    			 data.commandParamString[i].param_values = $("#" + i).val().replace("/", "-").replace("/", "-");
    			 continue;
    		 }
    		 data.commandParamString[i].param_values = $("#" + i).val();
    	}
    	
    	data.isExecuted = 0;
    	
    	if(($('#SchedulerType').val() == 1) && (beginDate > endDate) ){
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
    	
     	if($('#SchedulerType').val() == -1){
     		alert("Select Correct Scheduler Type");
      		$("#dataLoadingUpdate").hide();
      		return false;
     	}
     	
     	if(($('#RunningInterval').val() == -1) && ($('#SchedulerType').val() != 1)){
     		alert("Select Correct Scheduler Type");
      		$("#dataLoadingUpdate").hide();
      		return false; 
     	}
    	var overlapTime = $('#OverlapTime').val();
    	if((typeof overlapTime === "undefined" || overlapTime == '') && ($('#SchedulerType').val() == 2 || $('#SchedulerType').val() == 3)){
    		
    		alert("Select Correct Overlap Time");
     		$("#dataLoadingUpdate").hide();
     		return false; 
    	}
    	var expireTime = ($('#ETLExpiryTime1')[0]).value;
    	if(($('#ETLExpiryTime1').prop("disabled") == false) && (typeof expireTime === "undefined" || expireTime == '') ) {
    		alert("Select Correct Expire Date and Time");
    		$("#dataLoadingUpdate").hide();
    		return false;
    	}
    	data.schedulerType = parseInt($('#SchedulerType').val());
    	data.interval = parseInt($('#RunningInterval').val());
    	data.overlapTime = parseInt(overlapTime);
    	data.expiryTime = expireTime.replace("/", "-").replace("/", "-");
    	
    	var schedulerType = $('#SchedulerType').find(":selected").text();
    	var runningInterval = $('#RunningInterval').find(":selected").text();
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
    	 /*$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
    		 console.log(row);
 		});*/
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
     $scope.deleteETLInfo=function($event) {
    	 console.log($event.target.id);
    	 $("#dataLoadingUpdate").show();
    	 promise = AppServices.deleteWebETLSchedulerMapping($event.target.id);
         promise.then(
         	function(data) {
         		$("#dataLoadingUpdate").hide();
         		if(data.status != 'success')
         			alert("Some error occured");
         		else
         			alert("Deleted Successfully");
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
         	},
     		function(err){
     			$("#dataLoadingUpdate").hide();
     			alert("error " + err.status);
     		});
     };
     
     $scope.callExpiryDateCalender = function(){
    	 $('#blankclassExpiryDiv').fadeToggle();
    	 $('#blankclassExpiryDiv').datetimepicker({
			date: new Date(),
			viewMode: 'YMDHMS',
			onDateUpdate: function(){
				($('#ETLExpiryTime1')[0]).value = this.getText();
			},
			onOk: function() {
				$('#blankclassExpiryDiv').fadeToggle();
			},
	   		onToday: function() {
	   			$('#blankclassExpiryDiv').fadeToggle();
			}
		});
     };
});