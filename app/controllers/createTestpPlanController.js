oTech.controller('createTestPlanController',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices,
              $stateParams, testScriptService, uiGridConstants, $cookieStore, $uibModal, $log, $timeout) {

			  var token = sessionStorage.getItem("token");
					var userId = sessionStorage.getItem("userId");
					$rootScope.role = sessionStorage.getItem("role");

			 
        $rootScope.slideContent();
      

        window.onresize = function (event) {
            $rootScope.slideContent();
        }
        $scope.name = sessionStorage.getItem("username");
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
			  
       //added for the tree compnent     	  
		if($rootScope.tree2!=null && $rootScope.tree2!='undefined')	 {
			$.cookie("taskJson", JSON.stringify($rootScope.tree2));
		$scope.tree2 = $rootScope.tree2;
		}else{
			$scope.tree2= JSON.parse($.cookie("taskJson"));
		}

		$scope.createTestPlanPrev = function () {
                $location.path('/dashboard/initiateTestPlan');
        }
       

        var userId = sessionStorage.userId;
        var token = sessionStorage.token;
        var assignVirtualDevice_Data = {};
        assignVirtualDevice_Data.virtualDeviceVoList = [];
        // var TestPlanId = $cookieStore.get('TestPLANId');
        $scope.TestplanName = $cookieStore.get('TestplanName');


        $scope.virtualDeviceGridOptions = oApp.config.virtualDeviceGridOptions;
        $scope.virtualDeviceGridOptions.onRegisterApi = function (gridApi) { //extra code
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {

                var name = row.entity.name;
                assignVirtualDevice_Data.virtualDeviceVoList.push({"name": name});

            });
        };

        var fetchVirtualDevices = function (token, userId) {
			$scope.dataLoading = true;
            promise2 = testScriptService.fetchVirtualDevices(token, userId);
            promise2.then(
                function (data) {
                    $scope.virtualDeviceGridOptions.data = data;
					$scope.dataLoading = false;
                },
                function (err) {
                    console.log(err);
                }
            );

        };

        fetchVirtualDevices(token, userId);
        $scope.createTestPlan = {};
        var sendCreateData = {};

        $scope.createTestPlan.jobName = "";
        $scope.testPlanDate = new Date();
        $scope.animationsEnabled = true;

        $scope.validateTestPlanData = function (flag) {


            $rootScope.Message = flag;
            $('#MessageColor').css("color", "red");
            $('#MessagePopUp').modal('show');
            $timeout(function () {
                $('#MessagePopUp').modal('hide');
            }, 2000);

        };
		
		$scope.createTestPlanService = function () {
			$scope.dataProcessing = true;
			$(".btn-info").addClass("disabled");

            if (!$scope.createTestPlan.jobName) {
				$scope.dataProcessing = false;
				$(".btn-info").removeClass("disabled");
                $scope.validateTestPlanData("Please Enter TestPlan Name");
                return 0;
            }
            if (assignVirtualDevice_Data.virtualDeviceVoList.length <= 0) {
				$scope.dataProcessing = false;
				$(".btn-info").removeClass("disabled");
                $scope.validateTestPlanData("Please Select Virtual Device");
                return 0;

            }

            var superParentObject, parentObject = {}, childObject = {};
            superParentObject = $rootScope.tree2[0].nodes;
            for (var i = 0; i < $rootScope.tree2[0].nodes.length; i++) {
                parentObject[i] = $rootScope.tree2[0].nodes[i].nodes;
                childObject[i] = {};
                if ($rootScope.tree2[0].nodes[i].nodes.length <= 0) {
                    $scope.validateTestPlanData(" child's or not existed");
                    return 0;
                }

                for (var j = 0; j < $rootScope.tree2[0].nodes[i].nodes.length; j++) {
                    childObject[i][j] = $rootScope.tree2[0].nodes[i].nodes[j].nodes;

                    if ($rootScope.tree2[0].nodes[i].nodes[j].nodes.length <= 0) {
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
                        $scope.validateTestPlanData(1 + i + "   child Add Command  not existed");
                        return 0;

                    }
                    else if (!$rootScope.tree2[0].nodes[i].nodes[j].nodes[0].id) {
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
                        $scope.validateTestPlanData("Please Select Parameters ");
                        return 0;

                    }
                }
            }
            sendCreateData.jobName = $scope.createTestPlan.jobName;
            sendCreateData.jobCreatedBy = userId;
            sendCreateData.taskVOList = [];
            sendCreateData.taskVOList[0] = {};
            sendCreateData.taskVOList[0].taskName = $rootScope.tree2[0].title;
            sendCreateData.taskVOList[0].taskLoop = $rootScope.tree2[0].loop;

            sendCreateData.taskVOList[0].taskCreatedBy = userId;
            sendCreateData.taskVOList[0].taskExecutorVOList = [];

            var superParentObjectKeys = Object.keys(superParentObject);

            for (var i = 0; i < superParentObjectKeys.length; i++) {

                sendCreateData.taskVOList[0].taskExecutorVOList[i] = {};
                sendCreateData.taskVOList[0].taskExecutorVOList[i].taskExecutorName = superParentObject[i].title;
                sendCreateData.taskVOList[0].taskExecutorVOList[i].taskExecutorLoop = superParentObject.loop;
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
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r].commandSeqNo = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandSeqNo;
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r].commandParams = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandParams;
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r].commandName = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandName;
                    }
                }
            }


            var jsonData = JSON.stringify(sendCreateData);
            promise = testScriptService.CreateSrvc(userId, jsonData, token);


            promise.then(
                function (data) {
                    if (data.status == "Success") {
                        assignVirtualDevice_Data.jobVo = {"jobId": data.NewTestPlan.jobId};
                        $cookieStore.put('TestPLANId', data.NewTestPlan.jobId);
                        $cookieStore.put('TestplanName', data.NewTestPlan.jobName);
                        assignVirtualDevice(token, assignVirtualDevice_Data);
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


            var assignVirtualDevice = function assignVirtualDevice(token, assignVirtualDevice_Data) {

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
            }
		}
		
		
		
		
		
    });