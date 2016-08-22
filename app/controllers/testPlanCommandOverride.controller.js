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
		 $scope.isUpdatable = false;
		
		
		if($.cookie("testPlanName") != undefined && $.cookie("testPlanDescription") != undefined && $.cookie("usecaseDescription") != undefined && $.cookie("usecaseId") != undefined){
				$scope.testPlanName = $.cookie("testPlanName");
				$scope.testPlanDescription = $.cookie("testPlanDescription");
				$scope.usecaseVal = $.cookie("usecaseId");
				
				VirtualJobsOptions.push({
								'jobName': $.cookie("testPlanName"),
                                'jobDescription': $.cookie("testPlanDescription"),
								'useCaseName': $.cookie("usecaseDescription"),
								
                            });
							$scope.VirtualJob = VirtualJobsOptions;
						$scope.uiTreeJSON	= $rootScope.uiTreeJSON;
		}else{
			$scope.usecaseVal= "1";
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
		
		$scope.testScript = function () {

           $location.path('/dashboard/testScript');
        }
		
		
		 $scope.getDashBoardMenu();
        $scope.getFavouriteReports();
		
		/*$scope.VirtualJobsOptions = {
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
			enableVerticalScrollbar :0,
		enableHorizontalScrollbar:0,
			columnDefs: [
                {name: 'Id',headerName: "Id", field: 'deviceId', headerCellClass: $scope.highlightFilteredHeader},
				{ name: 'Name', field: 'deviceName', haderCellClass: $scope.highlightFilteredHeader},
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
		}*/
		
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
				commandIndex=0;
				var updateCommandParameters = scope.$modelValue.commandParams;
				$("#updateCommandParametersForm").empty();
				//$("#updateCommandParametersForm").append('<input type="hidden" value="'+inputFiledId+'" id="test"/>');
				updateCommandParameters.split(",").forEach(function(updateCommandParameters,i){
						
					//		$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="'+updateCommandParameters+'" /></div><br/>');
//console.log("updateCommandParameters"+updateCommandParameters);
					if (updateCommandParameters.indexOf("=") >= 0){
						
						var commandParam=updateCommandParameters.split('=');
						console.log("commandParam: "+commandParam);
						$("#updateCommandParametersForm").append('<div><input name="commandLabel[' + i + '].Name" type="text" value="'+commandParam[0]+'" />=<input name="command[' + i + '].Name" type="text" value="'+commandParam[1]+'" /></div><br/>');

					}
				//	$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="'+updateCommandParameters+'" /></div><br/>');
					commandIndex=i;
					  });
					  
				 
        }
		
		$scope.addField = function (formID) {
//			$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="" /></div><br/>');
			 commandIndex++;
			$("#updateCommandParametersForm").append('<div><input name="commandLabel[' + commandIndex + '].Name" type="text" value="" />=<input name="command[' + commandIndex + '].Name" type="text" value="" /></div><br/>');
			$("input[name='commandLabel["+ commandIndex +"].Name']").focus(); 
        }
		
		$scope.updateCommandParametersAction = function (formID) {
			var updatedParametrs = "";
		/*	$('#'+formID+' input').each(
				function(index){  
				var input = $(this);
				if(input.attr('type')!='hidden' && input.val() !='' && input.val() != undefined)
				updatedParametrs+=input.val()+",";
			}
			);*/
			for(var index=0;index<=commandIndex;index++){
				if($("input[name='commandLabel["+ index +"].Name']").val()!=undefined && $("input[name='commandLabel["+ index +"].Name']").val() != '' && $("input[name='command[" + index +"].Name']").val() != undefined && $("input[name='command[" + index +"].Name']").val() != '')
				updatedParametrs+=$("input[name='commandLabel["+ index +"].Name']").val()+"="+$("input[name='command[" + index +"].Name']").val()+",";
			}
		//	console.log("updatedParametrs"+updatedParametrs);
		if(overrideNode.$modelValue.commandParams != updatedParametrs.substring(0,updatedParametrs.length-1)){
			 overrideNode.$modelValue.commandParams = updatedParametrs.substring(0,updatedParametrs.length-1);
			 $scope.isUpdatable =true;
			 
		}
        }
		
		
		$scope.testPlanGoForTestRun = function () {

                $location.path('/CreateTestRun/MappingTestRun/MappingDevices');
        }
		
		$scope.nextTestPlan = function(){
			$location.path('/dashboard/testScript');
		}
		
		$scope.tabs = [];
		var VirtualDevice = [];
		jsonArray = [];
		var deepCopyObject = "";
		$scope.counter = 1;
		
		promise2 = testScriptService.fetchVirtualDevices(token, userId);
            promise2.then(
                function (data) {
					$scope.inputcommand=true;
                    VirtualDevice = data;
					for(var i=0; i< data.length ; i++){
							jsonArray.push({id:VirtualDevice[i].name,deviceId:VirtualDevice[i].id,content:$scope.uiTreeJSON});
					}
					deepCopyObject = jQuery.extend(true, new Object(), jsonArray);
					var temp = {};
					temp['deviceProfileName'] = "Device Profile Name 1";
					temp['id'] = VirtualDevice[0].name;
					temp['deviceId'] = VirtualDevice[0].id;
					temp['content'] = $scope.uiTreeJSON;
					$scope.tabs.push(temp);
					$scope.dataLoading = false;
                },
                function (err) {
                    console.log(err);
                }
            );

		
		/** Function to add a new tab **/
		$scope.addTab = function(){
			$scope.counter++;
			var temp = {};
			temp['deviceProfileName'] = "Device Profile Name "+$scope.counter;
			temp['id'] = deepCopyObject[$scope.tabs.length].id;
			temp['deviceId'] = deepCopyObject[$scope.tabs.length].deviceId;
			temp['content'] = deepCopyObject[$scope.tabs.length].content;
			$scope.tabs.push(temp);
			$scope.selectedTab = $scope.tabs.length - 1; 
		}
		
		/** Function to delete a tab **/
		$scope.deleteTab = function(index){
			 $scope.selectedTab = index;
			$scope.tabs.splice(index,1); //remove the object from the array based on index
		}
		
		$scope.selectedTab = 0; //set selected tab to the 1st by default.
		
		/** Function to set selectedTab **/
		$scope.selectTab = function(index){
			$scope.selectedTab = index;
		}
		
		//Functions
        $scope.gotoStep = function(index) {
          $scope.selectedTab = index;
        }
		
		 $scope.save = function() {
          
			$scope.dataProcessing = true;
			$(".btn-info").addClass("disabled");
			$rootScope.uiTreeJSON = $scope.uiTreeJSON;
            

            var superParentObject, parentObject = {}, childObject = {};
            superParentObject = $scope.uiTreeJSON[0].nodes;
            for (var i = 0; i < $scope.uiTreeJSON[0].nodes.length; i++) {
                parentObject[i] = $scope.uiTreeJSON[0].nodes[i].nodes;
                childObject[i] = {};
                if ($scope.uiTreeJSON[0].nodes[i].nodes.length <= 0) {
                    $scope.validateTestPlanData(" child's or not existed");
                    return 0;
                }

                for (var j = 0; j < $scope.uiTreeJSON[0].nodes[i].nodes.length; j++) {
                    childObject[i][j] = $scope.uiTreeJSON[0].nodes[i].nodes[j].nodes;

                    if ($scope.uiTreeJSON[0].nodes[i].nodes[j].nodes.length <= 0) {
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
                        $scope.validateTestPlanData(1 + i + "   child Add Command  not existed");
                        return 0;

                    }
                    else if (!$scope.uiTreeJSON[0].nodes[i].nodes[j].nodes[0].id) {
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
                        $scope.validateTestPlanData("Please Select Parameters ");
                        return 0;

                    }
                }
            }
            sendCreateData.jobName = $scope.testPlanName;
			sendCreateData.jobDescription = $scope.testPlanDescription;
            sendCreateData.jobCreatedBy = userId;
            sendCreateData.taskVOList = [];
			sendCreateData.jobDeviceVOList = [];
            sendCreateData.taskVOList[0] = {};
            sendCreateData.taskVOList[0].taskName = $scope.uiTreeJSON[0].title;
            sendCreateData.taskVOList[0].taskLoop = $scope.uiTreeJSON[0].loop;
			sendCreateData.taskVOList[0].useCaseId = $scope.usecaseVal;
			$rootScope.usecaseId=$scope.usecaseVal;
			$.cookie("usecaseId", $scope.usecaseVal);

            sendCreateData.taskVOList[0].taskCreatedBy = userId;
            sendCreateData.taskVOList[0].taskExecutorVOList = [];

            var superParentObjectKeys = Object.keys(superParentObject);

            for (var i = 0; i < superParentObjectKeys.length; i++) {

                sendCreateData.taskVOList[0].taskExecutorVOList[i] = {};
                sendCreateData.taskVOList[0].taskExecutorVOList[i].taskExecutorName = superParentObject[i].title;
                sendCreateData.taskVOList[0].taskExecutorVOList[i].taskExecutorLoop = superParentObject[i].loop;
                sendCreateData.taskVOList[0].taskExecutorVOList[i].taskExecutorSeqNo = 1;

                //  sendCreateData.taskVOList[0].taskExecutorVOList[i].commandExecutorVOList =[];


            }

            var parentObjectKeys = Object.keys(parentObject);
            for (var i = 0; i < parentObjectKeys.length; i++) {
                var childKeys = Object.keys(parentObject[parentObjectKeys[i]]);
                sendCreateData.taskVOList[0].taskExecutorVOList[i].commandExecutorVOList = [];
                for (var j = 0; j < childKeys.length; j++) {
                    sendCreateData.taskVOList[0].taskExecutorVOList[i].commandExecutorVOList[j] = {};
                    sendCreateData.taskVOList[0].taskExecutorVOList[i].commandExecutorVOList[j].commandExecutorName = parentObject[parentObjectKeys[i]][childKeys[j]].title;
                    sendCreateData.taskVOList[0].taskExecutorVOList[i].commandExecutorVOList[j].commandExecutorLoop = parentObject[parentObjectKeys[i]][childKeys[j]].loop;
                    sendCreateData.taskVOList[0].taskExecutorVOList[i].commandExecutorVOList[j].commandExecutorSeqNo = parentObject[parentObjectKeys[i]][childKeys[j]].sequenceNo;

                }
            }


            var childSuperParentKeys = Object.keys(childObject);
            for (var p = 0; p < childSuperParentKeys.length; p++) {
                var childParentKeys = Object.keys(childObject[childSuperParentKeys[p]]);
                for (var q = 0; q < childParentKeys.length; q++) {
                    var childKeys = Object.keys(childObject[childSuperParentKeys[p]][childParentKeys[q]]);
                    sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList = [];
                    for (var r = 0; r < childKeys.length; r++) {
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r] = {};
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r].commandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandId;
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r].commandSeqNo = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].sequenceNo;
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r].commandParams = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandParams;
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r].commandName = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandName;
                    }
                }
            }
			// started for the job device
			
			for (var i = 0; i < $scope.tabs.length; i++) {
				sendCreateData.jobDeviceVOList[i] = {};
				sendCreateData.jobDeviceVOList[i].deviceId = $scope.tabs[i].deviceId;
				sendCreateData.jobDeviceVOList[i].deviceName = $scope.tabs[i].id;
				
				var superParentObject, parentObject = {}, childObject = {};
				superParentObject = $scope.tabs[i].content[0].nodes;
				
				for (var k = 0; k < $scope.tabs[i].content[0].nodes.length; k++) {
					parentObject[k] = $scope.tabs[i].content[0].nodes[k].nodes;
					childObject[k] = {};

					for (var j = 0; j < $scope.tabs[i].content[0].nodes[k].nodes.length; j++) {
						childObject[k][j] = $scope.tabs[i].content[0].nodes[k].nodes[j].nodes;
					}
				}
				
				var superParentObjectKeys = Object.keys(superParentObject);
				sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList = [];
            for (var j = 0; j < superParentObjectKeys.length; j++) {
                sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j] = {};
                sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].taskExecutorName = superParentObject[j].title;
                sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].taskExecutorLoop = superParentObject[j].loop;
                sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].taskExecutorSeqNo = 1;


            }

            var parentObjectKeys = Object.keys(parentObject);
            for (var k = 0; k < parentObjectKeys.length; k++) {
                var childKeys = Object.keys(parentObject[parentObjectKeys[k]]);
                sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList = [];
                for (var j = 0; j < childKeys.length; j++) {
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j] = {};
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j].commandExecutorName = parentObject[parentObjectKeys[k]][childKeys[j]].title;
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j].commandExecutorLoop = parentObject[parentObjectKeys[k]][childKeys[j]].loop;
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j].commandExecutorSeqNo = parentObject[parentObjectKeys[k]][childKeys[j]].sequenceNo;

                }
            }


            var childSuperParentKeys = Object.keys(childObject);
            for (var p = 0; p < childSuperParentKeys.length; p++) {
                var childParentKeys = Object.keys(childObject[childSuperParentKeys[p]]);
                for (var q = 0; q < childParentKeys.length; q++) {
                    var childKeys = Object.keys(childObject[childSuperParentKeys[p]][childParentKeys[q]]);
                    sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList = [];
                    for (var r = 0; r < childKeys.length; r++) {
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r] = {};
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandId;
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandSeqNo = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].sequenceNo;
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandParams = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandParams;
                        sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandName = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandName;
                    }
                }
            }


            }
			


            var jsonData = JSON.stringify(sendCreateData);
            promise = testScriptService.CreateSrvc(userId, jsonData, token);

			$scope.dataProcessing = true;
			$(".btn-info").addClass("disabled");
            promise.then(
                function (data) {
                    if (data.status == "Success") {
						$scope.jobIsExitsError=false;
                        $cookieStore.put('TestPLANId', data.NewTestPlan.jobId);
                        $cookieStore.put('TestplanName', data.NewTestPlan.jobName);
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
						$("#jobIsExitsSuccess").text("Test plan has been created successfully with Id :"+data.NewTestPlan.jobId+" ...");
						 $timeout(function () {
							 $location.path('/dashboard/testScript');
	                        }, 4000);
						$scope.jobIsExitsSuccess=true;
                    }
                    else {
						$scope.jobIsExitsSuccess=false;
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
						$("#jobIsExitsError").text("This test plan allready created...")
						$scope.jobIsExitsError=true;
                    }


                },
                function (err) {
                    console.log(err);
                }
            );


            /*var assignVirtualDevice = function assignVirtualDevice(token, assignVirtualDevice_Data) {

                promise1 = testScriptService.assignVirtualDevice(userId, token, JSON.stringify(assignVirtualDevice_Data));
                promise1.then(
                    function (data) {
                        if (data.status == "success") {
                            $location.path('/dashboard/testScript/createTestPlan/testPlanCreated');
							$scope.dataProcessing = false;
                        }
                        else {
                            $rootScope.Message = " " + data.status;
                            $('#MessageColor').css("color", "red");
                            $('#MessagePopUp').modal('show');
                            $timeout(function () {
                                $('#MessagePopUp').modal('hide');
                            }, 2000);

                        }

                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }*/
        }
		
		

		
	});