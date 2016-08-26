oTech.controller('editTestPlanController',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices,
              $stateParams, testScriptService, uiGridConstants, $cookieStore, $uibModal, $timeout) {


        $rootScope.editTestplanDevices = [];
        var TestPlanId = $cookieStore.get('TestPLANId');
        $scope.TestplanName = $cookieStore.get('TestplanName');
		$scope.dataLoading = true;
		
        $rootScope.userId = sessionStorage.getItem('userId');
        var userId = sessionStorage.getItem('userId');
        var token = sessionStorage.getItem('token');
        $rootScope.role = sessionStorage.getItem("role");
        var commandName = [];
        $scope.Names = [];

        var sendCreateData = {};
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
        
        $scope.tabs = [];
		var VirtualDevice = [];
		jsonArray = [];
		var deepCopyObject = "";
		$scope.counter = 1;
		var cloneCopyOfJobDevice = "";
		
		promise2 = testScriptService.fetchVirtualDevices(token, userId);
        promise2.then(
            function (data) {
                VirtualDevice = data;
            },
            function (err) {
                console.log(err);
            }
        );

        var VirtualJobsOptions = [];
            promise = testScriptService.getTestplan(token, userId, TestPlanId);
            promise.then(
                function (data) {
                	VirtualJobsOptions.push({
                        'jobId': data.jobId,
						'jobName': data.jobName,
                        'jobDescription': data.jobDescription,
                        'jobCreateDate': data.jobCreateDate,
						'jobCreatedByName': data.jobCreatedByName,
						'useCaseName': data.useCaseName,
						
                    });
                	$scope.jobId = data.jobId;
                	$scope.taskId = data.taskId;
                	$scope.VirtualJob = VirtualJobsOptions;
						$scope.uiTreeJSON =jQuery.makeArray( data.jobVO[0] );
						cloneCopyOfJobDevice = jQuery.extend(true, new Object(), jQuery.makeArray( data.jobVO[0]) );
						cloneCopyOfJobDevice[0].jobDeviceId=0;
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
                    if ($rootScope.tree_data) {
                        setTimeout(function () {
                            $rootScope.$apply($rootScope.uiTreeJSON.expand_all());
                        }, 10);
                    }
                    $cookieStore.put('uiTreeJSON', $scope.uiTreeJSON);
                    
                    deepCopyObject = jQuery.extend(true, new Object(), data);
                    for(var i=0; i < deepCopyObject.jobVO.length; i++){
                    	
                    	if(VirtualDevice[i].id == deepCopyObject.jobVO[i].deviceId){
                    		VirtualDevice.splice(i,1);
                    	}
                    	var arr = jQuery.makeArray( deepCopyObject.jobVO[i] );
					$scope.tabs.push({'deviceProfileName':deepCopyObject.jobVO[i].deviceProfileName,'id':deepCopyObject.jobVO[i].deviceName,
						'deviceId':deepCopyObject.jobVO[i].deviceId,'content':arr});
						$scope.counter++;
                    }
                    $scope.dataLoading = false;
					$(".btn-info").removeClass("disabled");
                },
                function (err) {
                    console.log(err);
                }
            );
            
            /** Function to add a new tab **/
    		$scope.addTab = function(){
    			
    			var temp = {};
    			temp['deviceProfileName'] = "Device Profile Name "+$scope.counter;
    			temp['id'] = VirtualDevice[$scope.counter].name;
    			temp['deviceId'] = VirtualDevice[$scope.counter].id;
    			temp['content'] = jQuery.extend(true, new Object(), cloneCopyOfJobDevice);
    			$scope.tabs.push(temp);
    			$scope.selectedTab = $scope.tabs.length - 1; 
    			$scope.counter++;
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
        

            $scope.update = function() {
                
    			$scope.dataProcessing = true;
    			$(".btn-info").addClass("disabled");
    			sendCreateData.jobDeviceVOList = [];
    			sendCreateData.jobId = $scope.jobId;
    			sendCreateData.taskId = $scope.taskId;
    			// started for the job device
    			
    			for (var i = 0; i < $scope.tabs.length; i++) {
    				sendCreateData.jobDeviceVOList[i] = {};
    				sendCreateData.jobDeviceVOList[i].deviceId = $scope.tabs[i].deviceId;
    				sendCreateData.jobDeviceVOList[i].deviceName = $scope.tabs[i].id;
    				sendCreateData.jobDeviceVOList[i].deviceProfileName = $scope.tabs[i].deviceProfileName;
    				sendCreateData.jobDeviceVOList[i].jobDeviceId = $scope.tabs[i].content[0].jobDeviceId;
    				sendCreateData.jobDeviceVOList[i].jobId = $scope.tabs[i].content[0].jobId;
    				sendCreateData.jobDeviceVOList[i].taskId = $scope.tabs[i].content[0].taskId;    	
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
    				sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].jobDeviceId = superParentObject[j].jobDeviceId;
    				sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].taskExecutorId = superParentObject[j].taskExecutorId;
    				sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[j].jobDeviceTaskExecutorId = superParentObject[j].jobDeviceTaskExecutorId;


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
    					sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j].jobDeviceCommandExecutorId = parentObject[parentObjectKeys[k]][childKeys[j]].jobDeviceCommandExecutorId;
    					sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[k].jobDeviceCommandExecutorVOList[j].commandExecutorId = parentObject[parentObjectKeys[k]][childKeys[j]].commandExecutorId;

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
                            sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandName = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].title;
    						 sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].jobDeviceCommandExecutorCommandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].jobDeviceCommandExecutorCommandId;
    						 sendCreateData.jobDeviceVOList[i].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandExecutorCommandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandExecutorCommandId;
                        }
                    }
                }


                }
    			


    			 var jsonData = JSON.stringify(sendCreateData);
    				var jobDeviceId = "";
    				var jobId = "";
    				promise = testScriptService.updateCommandParametersJobDevice(token, userId, jsonData);
    				
    				promise.then(
    	                function (data) {
    	                    if (data.status == "Success") {
    							$scope.dataProcessing = false;
    							
    	                       $(".btn-info").removeClass("disabled");
    	                       $("#jobIsExitsSuccess").text("Test plan has been updated successfully ....")
    	                        $scope.jobIsExitsSuccess=true;
    	                       $timeout(function () {
    								 $location.path('/dashboard/testScript');
    		                        }, 2000);
    	                      
    	                    }
    	                    else {
    							$scope.dataProcessing = false;
    							$("#jobIsExitsSuccess").text("Error Occuring while updating ...")
    							$scope.jobIsExitsSuccess=true;
    	                        $timeout(function () {
    	                            $('#MessagePopUp').modal('hide');
    	                        }, 2000);
    							$(".btn-info").removeClass("disabled");

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
		
				
    })




