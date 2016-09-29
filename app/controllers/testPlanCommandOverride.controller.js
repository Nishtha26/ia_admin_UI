oTech.controller('testPlanCommandOverride',
    function ($scope,$compile, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices,
              $stateParams, testScriptService, uiGridConstants, $cookieStore, $uibModal, $log, $timeout,messages) {
		
		var userId = sessionStorage.getItem("userId");
        var token = sessionStorage.getItem("token");
		$rootScope.role = sessionStorage.getItem("role");
		var overrideNode;
		var commandIndex = 0;
		 var sendCreateData = {};
		 var VirtualJobsOptions = [];
		 $scope.dataLoading = true;
		 $scope.isUpdatable = false;
		 
		 $rootScope.my_tree = {};
		
		
		
		
		if(messages.length==1){
			for(var i=0; i < messages[0].length; i++){
			      if(messages[0][i].key == "testPlanName")
			    	  $scope.testPlanName = messages[0][i].value;
			      if(messages[0][i].key == "testPlanDescription")
			    	  $scope.testPlanDescription = messages[0][i].value;
			      if(messages[0][i].key == "treeJson")
			    	  $scope.uiTreeJSON = messages[0][i].value;
			      if(messages[0][i].key == "usecase")
			    	  $scope.usecaseVal = messages[0][i].value.id;
			      
			   }
		}else if(messages.length > 1){
			angular.forEach(messages[0], function(value, key){
			      if(value.key == "testPlanName")
			    	  $scope.testPlanName = value.value;
			      if(value.key == "testPlanDescription")
			    	  $scope.testPlanDescription = value.value;
			      if(value.key == "treeJson")
			    	  $scope.uiTreeJSON = value.value;
			      if(value.key == "usecase")
			    	  $scope.usecaseVal = value.value.id;
			      
			   });
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
		
		
		
		$scope.updateCommandParameters = function () {
			
			$scope.finalizeTestPlan = true;
			$(".btn").addClass("disabled");
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
						$(".btn").removeClass("disabled");
                        $scope.validateTestPlanData(1 + i + "   child Add Command  not existed");
                        return 0;

                    }
                    else if (!$rootScope.uiTreeJSON[0].nodes[i].nodes[j].nodes[0].id) {
						$scope.dataProcessing = false;
						$(".btn").removeClass("disabled");
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
						$scope.successMessageTestPlanFinalId = true;
                        $scope.successMessageTestPlanFinal = "Updated Successfully...";
                        $timeout(function () {
                        	$scope.finalizeTestPlan = false;
                        	$scope.successMessageTestPlanFinalId = false;
                        }, 2000);
                       $(".btn").removeClass("disabled");
                    }
                    else {
                        $scope.errMessageTestPlanFinalId = true;
                        $scope.errMessageTestPlanFinal = data.status;
                        $timeout(function () {
                        	$scope.finalizeTestPlan = false;
                        	$scope.errMessageTestPlanFinalId = false;
                        }, 2000);
						$(".btn").removeClass("disabled");

                    }

                },
                function (err) {
                	$(".btn").removeClass("disabled");
                    console.log(err);
                }
            );

			
			
		}
		
		
		$scope.createFrom = function (scope,e) {
			$scope.showPopover = true;
				overrideNode= scope;
				commandIndex=0;
				var updateCommandParameters = scope.$modelValue.commandParams;
				$(".editable-input").empty();
				//$("#updateCommandParametersForm").append('<input type="hidden" value="'+inputFiledId+'" id="test"/>');
				updateCommandParameters.split(",").forEach(function(updateCommandParameters,i){
						
					//		$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="'+updateCommandParameters+'" /></div><br/>');
//console.log("updateCommandParameters"+updateCommandParameters);
					if (updateCommandParameters.indexOf("=") >= 0){
						
						var commandParam=updateCommandParameters.split('=');
						console.log("commandParam: "+commandParam);
						$(".editable-input").append('<div class="editable-address form-group col-md-12"><div class="col-md-6"><input name="commandLabel[' + i + '].Name" type="text" value="'+commandParam[0]+'" class="form-control  form-control-label"/></div><div class="col-md-6"><input name="command[' + i + '].Name" type="text" value="'+commandParam[1]+'" class="form-control"/></div></div>');

					}
				//	$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="'+updateCommandParameters+'" /></div><br/>');
					commandIndex=i;
					  });
				$('.popover').css("top", $(e.target).offset().top+24);
				 
        }
		
		$scope.addField = function (formID) {
//			$("#updateCommandParametersForm").append('<div><input name="command[' + commandIndex + '].Name" type="text" value="" /></div><br/>');
			 commandIndex++;
			$(".editable-input").append('<div class="editable-address form-group col-md-12 "><div class="col-md-6"><input class="form-control" name="commandLabel[' + commandIndex + '].Name" type="text" value="" /></div><div class="col-md-6"><input class="form-control" name="command[' + commandIndex + '].Name" type="text" value="" /></div></div>');
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
		$scope.showPopover = false;
        }
		
		$scope.updateCommandParametersClose = function () {
			$scope.showPopover = false;
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
		$scope.counter = 0;
		
		$scope.tree2 = [];
		promise2 = testScriptService.fetchVirtualDevices(token, userId);
            promise2.then(
                function (data) {
					$scope.inputcommand=true;
                    VirtualDevice = data;
					for(var i=0; i< data.length ; i++){
						/*$scope.tree2 = [];
						angular.forEach($scope.uiTreeJSON, function (item1) {
	                        
							 $scope.taskExecuter = [];
	                        angular.forEach(item1.nodes, function (item2) {
	                        	$scope.commandExecuter = [];
	                            angular.forEach(item2.nodes, function (item3) {
	                            	$scope.commandExecuterCommand = [];
	                                angular.forEach(item3.nodes, function (item4) {
	                                	
	                                    var commandExecuterCommandDesc = {
	                                    		 "id": item4.id,
	 	 	                                    "title": item4.title,
	 	 	                                    "sequenceNo": item4.sequenceNo,
	 	 	                                    "loop": item4.loop,
	 	 	                                  "commandParams": item4.commandParams,
	 	 	                                "commandId": item4.commandId,
	                                        "children": []
	                                    };
	                                    $scope.commandExecuterCommand.push(commandExecuterCommandDesc);
	                                });

	                                var commandExecuterDesc = {
	                                		 "id": item3.id,
	 	                                    "title": item3.title,
	 	                                    "sequenceNo": item3.sequenceNo,
	 	                                    "loop": item3.loop,
	 	                                    "children": $scope.commandExecuterCommand
	                                };
	                                $scope.commandExecuter.push(commandExecuterDesc);
	                            });
	                            
	                            var taskExecuterDesc = {
	                                    "id": item2.id,
	                                    "title": item2.title,
	                                    "sequenceNo": item2.sequenceNo,
	                                    "loop": item2.loop,
	                                    "children": $scope.commandExecuter
	                                };
	                            $scope.taskExecuter.push(taskExecuterDesc);
	                           
	                        });
	                        
	                        var testPlan = {
                                    "id": item1.id,
                                    "title": item1.title,
                                    "sequenceNo": item1.sequenceNo,
                                    "loop": item1.loop,
                                    "children": $scope.taskExecuter
                                };
                            $scope.tree2.push(testPlan);
	                        
	                    });*/
						
							jsonArray.push({id:VirtualDevice[i].name,deviceId:VirtualDevice[i].id,content:$scope.uiTreeJSON});
					}
					deepCopyObject = jQuery.extend(true, {}, jsonArray);
					
					$scope.dataLoading = false;
                },
                function (err) {
                    console.log(err);
                }
            );
            
            $scope.tree_col_defs = [
								{
								    field: "commandParams",
								    displayName: "Default Params",
								    cellTemplate: '',
								    sortable: true,
								    filterable: true
								},
                               {
                                   field: "loop",
                                   sortable: true,
                                   filterable: true
                               },
                               {
                                   field: "sequenceNo",
                                   displayName: "Sequence No.",
                                   sortable: true,
                                   filterable: true
                               },
                               
                           ];

		
		/** Function to add a new tab **/
           $scope.boolean = false;
            $scope.deviceProvileName = function() {
            	$scope.boolean = false;
            	$scope.err = false;
			};
           
		$scope.addTab = function(){
			
			if($scope.deviceProfileName == undefined || $scope.deviceProfileName == ""){
				$scope.addProfileErrorMsg = "Blank not allowed.."
					$scope.err = true;
				$timeout(function () {
					$scope.err = false;
                }, 3000);
				return false;
			}
			
			if($scope.tabs.length > 0){
			for (var i = 0; i < $scope.tabs.length; i++){
				if($scope.tabs[i].deviceProfileName == $scope.deviceProfileName){
					
					$scope.boolean = true;
					$scope.addProfileErrorMsg = "Please provide unique profile.."
					$scope.err = true;
					$timeout(function () {
						$scope.err = false;
                    }, 3000);
				}
			}
			if(!$scope.boolean){
				var temp = {};
				temp['deviceProfileName'] = $scope.deviceProfileName;
				temp['id'] = deepCopyObject[$scope.counter].id;
				temp['index'] = $scope.counter;
				temp['deviceId'] = deepCopyObject[$scope.counter].deviceId;
				temp['content'] =  jQuery.extend(true, new Object(), deepCopyObject[$scope.counter].content);
				$scope.tabs.push(temp);
				$scope.counter++;
				}
			
			}else{
				var temp = {};
				temp['deviceProfileName'] = $scope.deviceProfileName;
				temp['id'] = deepCopyObject[$scope.counter].id;
				temp['index'] = $scope.counter;
				temp['deviceId'] = deepCopyObject[$scope.counter].deviceId;
				temp['content'] =  jQuery.extend(true, new Object(), deepCopyObject[$scope.counter].content);
				$scope.tabs.push(temp);
				$scope.tree2 =  $scope.tabs[$scope.counter].content;
				$scope.counter++;
				$scope.activeProfile = $scope.tabs[0].index;
			}
			
			
		}
		
		/** Function to delete a tab **/
		$scope.removeFancyTree = function(mapping){
			// $scope.selectedTab = mapping.id;
			$scope.tabs.splice(mapping.index,1);
			$scope.counter--;//remove the object from the array based on index
		}
		
		$scope.selectedTab = 0; //set selected tab to the 1st by default.
		
		/** Function to set selectedTab **/
		$scope.veiwFancyTree = function(mapping){
			$scope.tree2 =  $scope.tabs[mapping.index].content;
			
			$scope.activeProfile = mapping.index;
			
			/*if ($rootScope.tree_data) {
                setTimeout(function () {
                    $rootScope.$apply($rootScope.my_tree.expand_all());
                }, 10);
            }*/
			//$scope.rows = $scope.tabs[mapping.id].content;
			//$scope.renderRowForTree($scope.rows) ;
		}
		
		

		 $scope.saveTestPlan = function() {
          
			 $scope.finalizeTestPlan = true;
			$(".btn").addClass("disabled");
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
						$(".btn").removeClass("disabled");
                        $scope.validateTestPlanData(1 + i + "   child Add Command  not existed");
                        return 0;

                    }
                    else if (!$scope.uiTreeJSON[0].nodes[i].nodes[j].nodes[0].id) {
						$scope.dataProcessing = false;
						$(".btn").removeClass("disabled");
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

            sendCreateData.taskVOList[0].taskCreatedBy = userId;
            sendCreateData.taskVOList[0].taskExecutorVOList = [];

            var superParentObjectKeys = Object.keys(superParentObject);

            for (var i = 0; i < superParentObjectKeys.length; i++) {

                sendCreateData.taskVOList[0].taskExecutorVOList[i] = {};
                sendCreateData.taskVOList[0].taskExecutorVOList[i].taskExecutorName = superParentObject[i].title;
                sendCreateData.taskVOList[0].taskExecutorVOList[i].taskExecutorLoop = superParentObject[i].loop;
                sendCreateData.taskVOList[0].taskExecutorVOList[i].taskExecutorSeqNo = superParentObject[i].sequenceNo;

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
				sendCreateData.jobDeviceVOList[i].deviceProfileName = $scope.tabs[i].deviceProfileName;
				sendCreateData.jobDeviceVOList[i].taskLoop = $scope.tabs[i].content[0].loop;
				
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
                sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].taskExecutorSeqNo = superParentObject[j].sequenceNo;


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
			$(".btn").addClass("disabled");
            promise.then(
                function (data) {
                    if (data.status == "Success") {

                    	$scope.successMessageTestPlanFinalId = true;
                        $scope.successMessageTestPlanFinal = "Test plan has been created with Id : "+data.NewTestPlan.jobId
                        $timeout(function () {
                        	$scope.finalizeTestPlan = false;
                        	$scope.successMessageTestPlanFinalId = false;
                        	 $location.path('/dashboard/testPlanTestRunAdministration');
                        }, 2000);
                    	$(".btn").removeClass("disabled");
                    }
                    else {
                    	
                    	$scope.errMessageTestPlanFinalId = true;
                        $scope.errMessageTestPlanFinal = "This test plan already created...";
                        $timeout(function () {
                        	$scope.finalizeTestPlan = false;
                        	$scope.errMessageTestPlanFinalId = false;
                        }, 2000);
						$(".btn").removeClass("disabled");
                    }


                },
                function (err) {
                 	$scope.errMessageTestPlanFinalId = true;
                    $scope.errMessageTestPlanFinal = "Error Occuring While creating the Test Plan..";
                    $timeout(function () {
                    	$scope.finalizeTestPlan = false;
                    	$scope.errMessageTestPlanFinalId = false;
                    }, 2000);
					$(".btn").removeClass("disabled");
                    console.log(err);
                }
            );
        }
		 
		
		
		 

		
	});
