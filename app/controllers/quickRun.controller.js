oTech.controller('quickRunController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		
		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		$rootScope.role = sessionStorage.getItem("role");
		
		$rootScope.slideContent();
		window.onresize = function(event) {
			$rootScope.slideContent();
		}
		$scope.name = sessionStorage.getItem("username");
		$rootScope.qdeviceId = 11;
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
		
		$scope.quicknext = function(){
			
			$location.path('/dashboard/quickbinding');
		}
		$scope.getDashBoardMenu();
		$scope.getFavouriteReports();
		
		$scope.quickrunGridOptions = oApp.config.quickrunGridOptions;
		$scope.quickrunGridOptions.onRegisterApi = function( gridApi ) { //extra code
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
				
				$rootScope.qdeviceId = row.entity.deviceId;
				console.log($rootScope.qdeviceId);
			}); 
	    };
		$scope.quickRunData = function(){
		$scope.dataLoading1 = true;
		$scope.err=false;
		promise = AppServices.GetquickRunData(userId, token);
		promise.then(
			function(data){
				$scope.dataLoading1 = false;
				$scope.quickrunGridOptions.data = data.devicesList;
				$scope.gridApi.selection.selectRow($scope.quickrunGridOptions.data[0]); //extra code
			},
			function(err){
			$scope.dataLoading1 = false;
				$scope.err=true;
			}
		);
	   }
	   
	   $scope.quickrunbindingGridOptions = oApp.config.quickrunbindingGridOptions;
		$scope.quickrunbindingGridOptions.onRegisterApi = function( gridApi ) { //extra code
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){

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
		
		
					$scope.quickRunTaskDependantData = function(){
						$scope.dataLoading2 = true;
						$scope.err2=false;
							promise = AppServices.GetTaskDepedantData(token,inputData);
							promise.then(
								function(data){
									$scope.dataLoading2 = false;
									var cList=[];
									for(var i in data)
									{
										var taskExe=data[i];
										for(var j in taskExe){
											var ce=taskExe[j];
											for(var k in ce){
												var cec=ce[k];
												for(var key in cec){
													var cl=cec[key];
													if(key=="commandExecutorCommandVOList"){
														for(var key in cl){
														cList.push(cl[key]);
														}
													}

												}
											}
										}
									};

									$scope.quickrunTaskDependantOptions.data = cList;

									if($scope.quickrunTaskDependantOptions.data==null){
										$scope.err2=true;
										$scope.dataLoading2 = false;
									}
								},
								function(err){
									$scope.err2=true;
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
	   
	$scope.quickRunData();
});