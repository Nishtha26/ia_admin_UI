oTech.controller('testPlanCommandOverride',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices,
              $stateParams, testScriptService, uiGridConstants, $cookieStore, $uibModal, $log, $timeout) {
		
		var userId = sessionStorage.getItem("userId");
        var token = sessionStorage.getItem("token");
		$rootScope.role = sessionStorage.getItem("role");
		var overrideNode;
		var commandIndex = 0;
		 var sendCreateData = {};
		 var VirtualJobsOptions = [];
		 $scope.dataLoading = true;
		if($rootScope.tesplanId !=null && $rootScope.tesplanId !='undefined')	 {
			
		$scope.tesplanId = $rootScope.tesplanId;
		$rootScope.tesplanId = $scope.tesplanId;
		}else{
			
			$rootScope.tesplanId = $scope.tesplanId;
		}
		
		$rootScope.slideContent();
        window.onresize = function (event) {
            $rootScope.slideContent();
        };

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
        $scope.getFavouriteReports();
		
		$scope.VirtualJobsOptions = {
			enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
			columnDefs: [
                {headerName: "Test Plan Id",field: 'jobId', headerCellClass: $scope.highlightFilteredHeader},
                {headerName: "Test Plan Name",field: 'jobName', headerCellClass: $scope.highlightFilteredHeader},
				{headerName: "Test Plan Description",field: 'jobDescription', headerCellClass: $scope.highlightFilteredHeader},
				{headerName: "Test Plan Created On",field: 'jobCreateDate', headerCellClass: $scope.highlightFilteredHeader},
				{headerName: "Test Plan Created By",field: 'jobCreatedByName', headerCellClass: $scope.highlightFilteredHeader},
				{headerName: "Use case Name",field: 'useCaseName', headerCellClass: $scope.highlightFilteredHeader},
            ]
		};
		
		//Row selection
        $scope.VirtualJobsOptions.onRegisterApi = function (gridApi) {
			$scope.gridApi = gridApi;
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				$scope.dataProcessing = true;
				$(".btn-info").addClass("disabled");
                //$rootScope.RowCreateTestrun = row.entity;	
                
				var JobId = row.entity.jobId;
				$cookieStore.put('JobId', JobId);
                $rootScope.JobId = row.entity.jobId;
				$rootScope.Row = row.entity;

			});
		}
		

		var JobId =  $cookieStore.get('TestPLANId');
        promise = testScriptService.getVirtualJob(token, userId, JobId);
				promise.then(
                    function (data) {
						$scope.dataLoading = false;
						sessionStorage.setItem('JobId', data.jobId);
						for (var i = 0; i < data.length; i++){
						VirtualJobsOptions.push({
                                'jobId': data[i].jobId,
								'jobName': data[i].jobName,
                                'jobDescription': data[i].jobDescription,
                                'jobCreateDate': data[i].jobCreateDate,
								'jobCreatedByName': data[i].jobCreatedByName,
								'useCaseName': data[i].useCaseName,
								
                            });
						}
						
						$scope.VirtualJob = VirtualJobsOptions;
						$scope.dataLoading = false;
						$(".btn-info").removeClass("disabled");
                    },
                    function (err) {
                        console.log(err);
                    }
                );
				
				
				promise = testScriptService.getVirtualDevicesForJob(token, userId, JobId);
				promise.then(
                    function (data) {
                        $scope.VirtualJobsDevicesOptions.data = data;
						$(".btn-info").removeClass("disabled");
                    },
                    function (err) {
                        console.log(err);
                    }
                );
				
				// To get the list of virtual devices that are associted with the virtual devices
		    $scope.VirtualJobsDevicesOptions = {
			enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
			columnDefs: [
                {headerName: "Virtual Device Id", field: 'deviceId', headerCellClass: $scope.highlightFilteredHeader},
				{ name: 'Virtual Device Name', field: 'deviceName', haderCellClass: $scope.highlightFilteredHeader},
            ]
		};
		
		//Row selection
        $scope.VirtualJobsDevicesOptions.onRegisterApi = function (gridApi) {
			$scope.gridApi = gridApi;
			gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				$scope.dataProcessing = true;
				$(".btn-info").addClass("disabled");
                //$rootScope.RowCreateTestrun = row.entity;	
                $('.treeSection').css("display", "none");
				var jobDeviceId = row.entity.jobDeviceId;
				var jobId = row.entity.jobId;
				$rootScope.JobId = row.entity.jobId;
				$rootScope.jobDeviceId = row.entity.jobDeviceId;
				promise = testScriptService.getVirtualJobsTask(token, userId, jobId, jobDeviceId);
				promise.then(
                    function (data) {
                        $scope.uiTreeJSON = data.jobVO;
						$rootScope.uiTreeJSON = data.jobVO;
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
                    },
                    function (err) {
                        console.log(err);
                    }
                );

			});
		}
		
		$scope.updateCommandParameters = function () {
			
			$scope.dataProcessing = true;
			$(".btn-info").addClass("disabled");
			var jobDeviceId = $rootScope.jobDeviceId;
			var jobId = $rootScope.JobId;
			$scope.uiTreeJSON = $rootScope.uiTreeJSON;
			
			// prepareModelTo send back To controller
			
			 var superParentObject, parentObject = {}, childObject = {};
            superParentObject = $rootScope.uiTreeJSON[0].nodes;
            for (var i = 0; i < $rootScope.uiTreeJSON[0].nodes.length; i++) {
                parentObject[i] = $rootScope.uiTreeJSON[0].nodes[i].nodes;
                childObject[i] = {};
                if ($rootScope.uiTreeJSON[0].nodes[i].nodes.length <= 0) {
                    $scope.validateTestPlanData(" child's or not existed");
                    return 0;
                }

                for (var j = 0; j < $rootScope.uiTreeJSON[0].nodes[i].nodes.length; j++) {
                    childObject[i][j] = $rootScope.uiTreeJSON[0].nodes[i].nodes[j].nodes;

                    if ($rootScope.uiTreeJSON[0].nodes[i].nodes[j].nodes.length <= 0) {
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
                        $scope.validateTestPlanData(1 + i + "   child Add Command  not existed");
                        return 0;

                    }
                    else if (!$rootScope.uiTreeJSON[0].nodes[i].nodes[j].nodes[0].id) {
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
                        $scope.validateTestPlanData("Please Select Parameters ");
                        return 0;

                    }
                }
            }
            sendCreateData.jobDeviceVOList = [];
            sendCreateData.jobDeviceVOList[0] = {};
            sendCreateData.jobDeviceVOList[0].taskLoop = $rootScope.uiTreeJSON[0].Loop;
			

            sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList = [];

            var superParentObjectKeys = Object.keys(superParentObject);

            for (var i = 0; i < superParentObjectKeys.length; i++) {

                sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i] = {};
                sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].taskExecutorName = superParentObject[i].Name;
                sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].taskExecutorLoop = superParentObject[i].Loop;
                sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].taskExecutorSeqNo = superParentObject[i].Sequence;
				sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceId = superParentObject[i].jobDeviceId;
				sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].taskExecutorId = superParentObject[i].taskExecutorId;
				sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceTaskExecutorId = superParentObject[i].jobDeviceTaskExecutorId;

                //  sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].commandExecutorVOList =[];


            }

            var parentObjectKeys = Object.keys(parentObject);
            for (var i = 0; i < parentObjectKeys.length; i++) {
                var childKeys = Object.keys(parentObject[parentObjectKeys[i]]);
                sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList = [];
                for (var j = 0; j < childKeys.length; j++) {
                    sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j] = {};
                    sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j].commandExecutorName = parentObject[parentObjectKeys[i]][childKeys[j]].Name;
                    sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j].commandExecutorLoop = parentObject[parentObjectKeys[i]][childKeys[j]].Loop;
                    sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j].commandExecutorSeqNo = parentObject[parentObjectKeys[i]][childKeys[j]].Sequence;
					sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j].jobDeviceCommandExecutorId = parentObject[parentObjectKeys[i]][childKeys[j]].jobDeviceCommandExecutorId;

                }
            }


            var childSuperParentKeys = Object.keys(childObject);
            for (var p = 0; p < childSuperParentKeys.length; p++) {
                var childParentKeys = Object.keys(childObject[childSuperParentKeys[p]]);
                for (var q = 0; q < childParentKeys.length; q++) {
                    var childKeys = Object.keys(childObject[childSuperParentKeys[p]][childParentKeys[q]]);
                    sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList = [];
                    for (var r = 0; r < childKeys.length; r++) {
                        sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r] = {};
                        sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandId;
                        sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandSeqNo = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].Sequence;
                        sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandParams = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].CommandParams;
                        sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandName = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].Name;
						 sendCreateData.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].jobDeviceCommandExecutorCommandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].jobDeviceCommandExecutorCommandId;
						
                    }
                }
            }


            var jsonData = JSON.stringify(sendCreateData);
			
			promise = testScriptService.updateCommandParametersJobDevice(token, userId, jsonData, jobId, jobDeviceId);
			
			promise.then(
                function (data) {
                    if (data.status == "Success") {
						$scope.dataProcessing = false;
                        $rootScope.Message = "  Updated Successfully";
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						
                       $(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");
                    }
                    else {
						$scope.dataProcessing = false;
                        $rootScope.Message = " " + data.status;
                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
						$(".btn-info").removeClass("disabled");
						$('.treeSection').css("display", "block");

                    }

                },
                function (err) {
                    console.log(err);
                }
            );

			
			
		}
		$scope.createFrom = function (scope) {
				overrideNode= scope;
				var updateCommandParameters = scope.$modelValue.CommandParams;
				$("#updateCommandParametersForm").empty();
				//$("#updateCommandParametersForm").append('<input type="hidden" value="'+inputFiledId+'" id="test"/>');
				updateCommandParameters.split(",").forEach(function(updateCommandParameters){
						
							$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="'+updateCommandParameters+'" /></div><br/>');
						
					  });
					  commandIndex++;
				 
        }
		
		$scope.addField = function (formID) {
			$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="" /></div><br/>');
			 commandIndex++;
        }
		
		$scope.updateCommandParametersAction = function (formID) {
			var updatedParametrs = "";
			$('#'+formID+' input').each(
				function(index){  
				var input = $(this);
				if(input.attr('type')!='hidden' && input.val() !='' && input.val() != undefined)
				updatedParametrs+=input.val()+",";
			}
			);
			 overrideNode.$modelValue.CommandParams = updatedParametrs.substring(0,updatedParametrs.length-1);
        }
		
		
		$scope.testPlanGoForTestRun = function () {

                $location.path('/CreateTestRun/MappingTestRun/MappingDevices');
        }
		
		$scope.nextTestPlan = function(){
			$location.path('/dashboard/testScript');
		}

			
	});