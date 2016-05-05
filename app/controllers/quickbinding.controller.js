oTech.controller('quickbindingController',
	function ($scope, $rootScope, $location, AppServices, $stateParams,$timeout) {
		
		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		$rootScope.role = sessionStorage.getItem("role");
		
		var timezone = jstz.determine();
    console.log('current time zone '+timezone.name());
	
		$rootScope.slideContent();
		window.onresize = function(event) {
			$rootScope.slideContent();
		}
		$scope.name = sessionStorage.getItem("username");
		var deviceId = $rootScope.qdeviceId;
		var taskId=0;
		var taskName="";
		var commandName="";
		var inputData;
		$scope.err=false;
		
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
		
		if($scope.quickrunTaskDependantOptions==null || $scope.quickrunbindingGridOptions==null){
		console.log('the task or task dependant data is empty');
	//	$("#quickRun").prop("disabled",true);
		}
		
		if($scope.quickrunTaskDependantOptions!=null || $scope.quickrunbindingGridOptions!=null){
		
			$("#quickRun").prop("enabled",true);
		}
		
		
		$scope.quickrun =function(e){
			
					inputData={
	   "taskId" : taskId,
	   "commandName":commandName,
	   "deviceId":deviceId,
	   "jobCreatedBy":-2,
	   "clientTimeZone"  : jstz.determine().name()
	   //"clientTimeZone" : timezone.name()
	   
	   };
			
			
				promise = AppServices.createQuickRun(inputData, token);
		promise.then(
			function(data){
			//alert(data.status);
			if(data.status=="success"){
			
			$rootScope.Message="Quick job is created successfully for the task";
			 $('#MessageColor').css("color", "green");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
				
			}
			if(data.status=="error"){
			$rootScope.Message=data.errorDescription;
			 $('#MessageColor').css("color", "red");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
			}
			},
			function(err){
				$rootScope.Message=data.errorDescription;
			 $('#MessageColor').css("color", "red");
				 $('#MessagePopUp').modal('show');
				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
			}
		);
		
		};
		
		
	   
	   	   $scope.quickRunTaskDependantData = function(){
		   	$scope.depDataLoading = true;
		$scope.err=false;
		promise = AppServices.GetTaskDepedantData(token,inputData);
		promise.then(
			function(data){
				$scope.depDataLoading = false;
			//	$("#noData").prop("disabled",true);
		
			//console.log(data);
//				$scope.quickrunbindingGridOptions.data = data.devicesList;
				//$scope.quickrunTaskDependantOptions.data = data.taskExecutorVOList.commandExecutorVOList.commandExecutorCommandVOList;
			//	$scope.gridApi.selection.selectRow($scope.quickrunbinding1GridOptions.data[0]); //extra code
			
		//	var taskExeList=data.taskExecutorVOList;
			var cList=[];
			
			for(var i in data)
{
//console.log(data[i]);
var taskExe=data[i];
   
   for(var j in taskExe){
 //  console.log(taskExe[j]);
   
   var ce=taskExe[j];
   
   for(var k in ce){
   
   //console.log(ce[k]);
   var cec=ce[k];
   for(var key in cec){
   var cl=cec[key];
   if(key=="commandExecutorCommandVOList"){
    //  console.log(cec[key]);
	  for(var key in cl){
//	  console.log(cl[key].commandName);
	//console.log(cl[key]);
	  cList.push(cl[key]);
	  }
	  }
   
   }
   }
   }
};

$scope.quickrunTaskDependantOptions.data = cList;

if($scope.quickrunTaskDependantOptions.data==null){

$scope.err=true;
}
	
			},
			function(err){
				$scope.err=true;
			}
		);
	   };
	   
	   $scope.quickrunTaskDependantOptions = oApp.config.quickrunTaskDependantOptions;
		$scope.quickrunTaskDependantOptions.onRegisterApi = function( gridApi ) { //extra code
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
			
				console.log("selected command id :: " + row.entity.commandId);
				console.log("printing command name :: " + row.entity.commandName);
				commandName=row.entity.commandName;
				
			}); 
	    };
		

	   
	$scope.quickrunbindingGridOptions = oApp.config.quickrunbindingGridOptions;
		$scope.quickrunbindingGridOptions.onRegisterApi = function( gridApi ) { //extra code
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
			
				console.log("selected device id :: " + deviceId);
				console.log("printing task name :: " + row.entity.taskName);
				console.log("printing task id :: " + row.entity.taskId);
				taskName=row.entity.taskName;
				taskId=row.entity.taskId;
				
				inputData={
	   "taskId" : taskId
	   };
				$scope.quickRunTaskDependantData();
			}); 
	    };
		$scope.quickRunbindingData = function(){
			$scope.dataLoading = true;
		$scope.err=false;
		promise = AppServices.GetquickRunbindingData(userId, token);
		promise.then(
			function(data){
		$scope.dataLoading = false;
			
				$scope.quickrunbindingGridOptions.data = data;
				$scope.gridApi.selection.selectRow($scope.quickrunbindingGridOptions.data[0]); //extra code
				console.log("default selected :"+ JSON.stringify($scope.quickrunbindingGridOptions.data[0] ));
				
				if($scope.quickrunbindingGridOptions.data==null){
				$scope.err=true;
				}
			},
			function(err){
				
		$scope.err=true;
			}
		);
	   }
	   
	   
		
	  
	   $scope.quickRunbindingData();
	
});
