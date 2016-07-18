oTech.controller('editTestPlanController',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices,
              $stateParams, testScriptService, uiGridConstants, $cookieStore, $uibModal, $timeout) {


        $rootScope.editTestplanDevices = [];
        var TestPlanId = $cookieStore.get('TestPLANId');
		$scope.dataLoading = true;
		if($rootScope.uiTreeJSON !=null && $rootScope.uiTreeJSON !='undefined')	 {
			$.cookie("uiTreeJSON", JSON.stringify($rootScope.uiTreeJSON));
		$scope.uiTreeJSON = $rootScope.uiTreeJSON;
		$rootScope.uiTreeJSON = $scope.uiTreeJSON;
		}else{
			$scope.uiTreeJSON= JSON.parse($.cookie("uiTreeJSON"));
			$rootScope.uiTreeJSON = $scope.uiTreeJSON;
		}
		
		

		$rootScope.Row = null;
        $rootScope.RowDevice = null;

        $rootScope.VirtualDevicesOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: true,
            columnDefs: [
                {field: 'deviceName', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };

        $rootScope.userId = sessionStorage.getItem('userId');
        var userId = sessionStorage.getItem('userId');
        var token = sessionStorage.getItem('token');
        $rootScope.role = sessionStorage.getItem("role");
        var commandName = [];
        $scope.Names = [];


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

        var getTestplanService = function (token, userId, TestPlanId) {
            console.log(userId);
            console.log(token);
            console.log(TestPlanId);
            promise = testScriptService.getTestplan(token, userId, TestPlanId);
            promise.then(
                function (data) {
						$rootScope.uiTreeJSON = data.jobVO;
						$scope.uiTreeJSON = data.jobVO;
                        $cookieStore.put('uiTreeJSON', $rootScope.uiTreeJSON);
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
                    if ($rootScope.tree_data) {
                        setTimeout(function () {
                            $rootScope.$apply($rootScope.uiTreeJSON.expand_all());
                        }, 10);
                    }
                    $cookieStore.put('uiTreeJSON', $scope.uiTreeJSON);
					
					$scope.dataProcessing = false;
					$(".btn-info").removeClass("disabled");
                },
                function (err) {
                    console.log(err);
                }
            );
        }

       // getTestplanService(token, userId, TestPlanId);

        promise = testScriptService.FetchCommands(userId, token);
        promise.then(
            function (data) {
                $scope.Commands = data;

            },
            function (err) {
                console.log(err);
            }
        );
       

        //Edit Test plan table
        $scope.TestPlanOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {field: 'testplanId', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'testplanName', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };

        //Row selection
        $scope.TestPlanOptions.onRegisterApi = function (gridApi) {
            // console.log(gridApi.selection.getSelectedGridRows());
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                console.log("Edit Test plan grid: " + JSON.stringify(row.entity))
                var TestPlanId = row.entity.testplanId;
                $cookieStore.put('TestPLANId', TestPlanId);
                $scope.TestplanName = row.entity.testplanName;
                $cookieStore.put('TestplanName', row.entity.testplanName);
                $cookieStore.put('tesplanId', TestPlanId)
				$rootScope.tesplanId = TestPlanId;
                //Calling getTestplan service and looping data as tree structure
                $rootScope.editTaskPlanJSON = $scope.editTaskPlanJSON;
                // $rootScope.tree_data = $cookieStore.get('treedata');
				$scope.dataProcessing = true;
				$(".btn-info").addClass("disabled");
                getTestplanService(token, userId, TestPlanId);

                $rootScope.Row = row.entity;


                if (row.isSelected == false) {
                    alert("test")
                }


            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                var msg = 'rows changed ' + rows.length;

            });
        };

        $scope.SelectTesplanEdit = function () {
            console.log($rootScope.Row)
            if ($rootScope.Row != null) {
                $location.path('/dashboard/testScript/EditTestplan/EditCommandParameters')
            }
            else {
                $rootScope.Message = "Please Select Testplan";
                $('#MessageColor').css("color", "red");
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }

        }

        //Column definations
        $scope.editTestPlanCmdPrmtrsPopup = function (branch, size) {
            $scope.Names = [];
            $rootScope.result = [];
            $rootScope.StringCmndPrm = [];
            $rootScope.commandparams = branch.CommandParams;
            console.log("BranchCommand prms: " + $rootScope.commandparams);
            if (branch.CommandParams != null && branch.CommandParams != '') {
                var params = branch.CommandParams;
                var parmSplit = params.split(",")
                var i;
                $scope.res = parmSplit;

                angular.forEach(parmSplit, function (value) {
                    $scope.res2 = value.split("=");
                    $scope.Names.push({
                        "CmdPrmtrsName": $scope.res2[0],
                        "Cmds": $scope.res2[1]
                    })
                });

                //modal Dialog
                $scope.animationsEnabled = true;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    keyboard: true,
                    backdrop: 'static',
                    templateUrl: 'app/views/CommandParametrsModal.html',
                    controller: ['$scope', 'Names', '$uibModalInstance', function ($scope, Names, $uibModalInstance) {

                        //Update function of Popup
                        $scope.UpdateComndPrms = function () {
                            $scope.Names = [];
                            $rootScope.result = [];
                            $rootScope.StringCmndPrm = [];
                            angular.forEach(Names, function (Params) {

                                $rootScope.result.push(Params.CmdPrmtrsName + '=' + Params.Cmds);


                                //to join array to string
                                $rootScope.StringCmndPrm = $rootScope.result.join(',')
                                console.log(JSON.stringify($rootScope.StringCmndPrm))
                            });

                            //Parms Data
                            $scope.ParamsData = JSON.stringify({
                                "jobDeviceCommandExecutorCommandId": branch.jobDeviceCommandExecutorCommandId,
                                "commandId": branch.commandId,
                                "commandSeqNo": branch.Sequence,
                                "jobDeviceCommandExecutorId": branch.jobDeviceCommandExecutorId,
                                "commandParams": $rootScope.StringCmndPrm,
                                "commandExecutorCommandId": branch.commandExecutorCommandId,
                            })

                            //Update functionality
                            var ParamsData = $scope.ParamsData;
                            promise = testScriptService.setDefaultParams(ParamsData, userId, token);
                            promise.then(
                                function (data) {
                                    if (data.status == 'success') {
                                        $rootScope.Message = "Command Parameters Updated Successfully";
                                    }

                                    $('#MessageColor').css("color", "green");
                                    $('#MessagePopUp').modal('show');
                                    $timeout(function () {
                                        $('#MessagePopUp').modal('hide');
                                    }, 2000);
//                                                $rootScope.Message = data.status
                                },
                                function (err) {
                                    $rootScope.Message = err.statusText;
                                    $('#MessageColor').css("color", "green");
                                    $('#MessagePopUp').modal('show');
                                    $timeout(function () {
                                        $('#MessagePopUp').modal('hide');
                                    }, 2000);

                                }
                            );

                            $rootScope.StringCmndPrm = [];
                            $uibModalInstance.dismiss('cancel');

                            //Calling getTestplan service and looping data as tree structure
                            $scope.NewTreeLst = [];

                            getTestplanService(token, userId, TestPlanId);
                        }

                        $scope.Names = Names;
                        $scope.cancel = function () {
                            $scope.Names = [];
                            $rootScope.StringCmndPrm = [];
                            $uibModalInstance.dismiss('cancel');
                        };
                    }],
                    size: size,
                    resolve: {
                        Names: function () {
                            return $scope.Names;
                        }
                    }
                });


            }
        }
//            $scope.UpdateComndPrms();
//         $rootScope.tree_data = $cookieStore.get('treedata');
        $scope.col_defs = [
            {
                field: "Loop",
                sortable: true,
                filterable: true
            },
            {
                field: "Sequence",
                displayName: "Sequence No.",
                sortable: true,
                filterable: true
            },
            {
                field: "CommandParams",
                displayName: "Default Params",
                cellTemplate: '',
                sortable: true,
                filterable: true
            },
        ];
		
		// added for the pagination
		
		$scope.itemsPerPage = 10;
					$scope.currentPage = 0;
					$scope.endLimit=$scope.itemsPerPage;
					var allOfTheData;
					$scope.totalRecords=0;
					
					
					$scope.range = function() {
								var rangeSize = 6;
								var ps = [];
								var start;

								start = $scope.currentPage;
								if ( start > $scope.pageCount()-rangeSize ) {
								start = $scope.pageCount()-rangeSize+1;
								}

								for (var i=start; i<start+rangeSize; i++) {
								if(i>=0) 
								ps.push(i);
								}
								return ps;
							};

							$scope.prevPage = function() {
							if ($scope.currentPage > 0) {
								$scope.setPagePrev($scope.currentPage-1);
								//$scope.currentPage--;
								}
							};
											
							$scope.DisablePrevPage = function() {
								return $scope.currentPage === 0 ? "disabled" : "";
							 };
							 
							 $scope.pageCount = function() {
								return Math.ceil($scope.totalRecords/$scope.itemsPerPage)-1;
							};
							
							$scope.nextPage = function() {
								if ($scope.currentPage < $scope.pageCount()) {
								$scope.setPageNext($scope.currentPage+1);
								//$scope.currentPage++;
								}
							};
							
							$scope.DisableNextPage = function() {
								return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
							};
							
							 $scope.setPage = function(n) {
								 $scope.dataLoading = true;
								$scope.endLimit = ($scope.itemsPerPage*(n+1));
								if($scope.endLimit > $scope.totalRecords){
									var reminder = $scope.totalRecords % $scope.itemsPerPage;
									if(reminder > 0){
										$scope.endLimit = $scope.endLimit - ($scope.itemsPerPage-reminder);
									}
								}
								 
								startLimit = ($scope.itemsPerPage*n);
								$scope.createNewDatasource();
								$scope.currentPage = n;
							};
							
							 $scope.setPagePrev = function(n) {
								 $scope.dataLoading = true;
								$scope.endLimit = ($scope.itemsPerPage*(n+1));
								if($scope.endLimit > $scope.totalRecords){
									var reminder = $scope.totalRecords % $scope.itemsPerPage;
									if(reminder > 0){
										$scope.endLimit = $scope.endLimit - ($scope.itemsPerPage-reminder);
									}
								}
								 
								startLimit = ($scope.itemsPerPage*n);
								$scope.createNewDatasource();
								$scope.currentPage = n;
							};
							 $scope.setPageNext = function(n) {
								 $scope.dataLoading = true;
								$scope.endLimit = ($scope.itemsPerPage*(n+1));
								if($scope.endLimit > $scope.totalRecords){
									var reminder = $scope.totalRecords % $scope.itemsPerPage;
									if(reminder > 0){
										$scope.endLimit = $scope.endLimit - ($scope.itemsPerPage-reminder);
									}
								}
								 
								startLimit = ($scope.itemsPerPage*(n));
								$scope.createNewDatasource();
								$scope.currentPage = n;
							};
		
		
		

        //Test plan table Service
        promise = testScriptService.FetchingTestService(userId, token);
        promise.then(
            function (data) {
                $scope.dataLoading = true;
				$(".btn-info").addClass("disabled");
				$scope.totalRecords = data.length;
				allOfTheData = data;
				$scope.TestPlanOptions.data = data.slice( 0, $scope.itemsPerPage);
				$scope.dataLoading = false;
				$(".btn-info").removeClass("disabled");
            },
            function (err) {
                console.log(err);
            }
        );
		
		 $scope.createNewDatasource = function() {
						$scope.dataLoading = true;
						$scope.TestPlanOptions.data = allOfTheData.slice( startLimit, $scope.endLimit);
						$scope.dataLoading = false;
					}

        //Virtual Devices Table
        promise = testScriptService.getVirtualDevices(TestPlanId, token, userId);
        promise.then(
            function (data) {
				$scope.TestplanName =$cookieStore.get('TestplanName');
				$(".btn-info").addClass("disabled");
                $rootScope.VirtualDevicesOptions.data = data;

                $scope.PlusVirtualDevice = function (size) {

                    //For Fetching Virtual Devices in Modal Popup
                    //modal Dialog
                    $scope.animationsEnabled = true;
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        keyboard: true,
//                                backdrop: 'static',
                        templateUrl: 'app/views/fetchingVirtualDevicesTestplan.html',
                        controller: ['$scope', '$uibModalInstance', 'testScriptService', 'Options', '$rootScope', function ($scope, $uibModalInstance, testScriptService, Options, $rootScope) {


                            $scope.FetchVirtualDevicesOptions = {
                                enableFiltering: true,
                                enableRowHeaderSelection: false,
                                enableRowSelection: true,
                                multiSelect: true,
                                columnDefs: [
                                    {field: 'name', headerCellClass: $scope.highlightFilteredHeader},
                                ]
                            };

                            $rootScope.DataGrid = [];
                            $scope.FetchVirtualDevicesOptions.onRegisterApi = function (gridApi) {
                                $scope.gridApi = gridApi;
                                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                                    $rootScope.DataGrid.push(row);
                                    console.log('DataGrid: ' + $rootScope.DataGrid)
                                });
                                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                                    angular.forEach(rows, function (row, index) {
                                        $rootScope.DataGrid.push(row);
                                    })


                                });
                            };


                            var fetchVirtualDeviceService = function (token, userId) {
                                promise = testScriptService.fetchVirtualDevices(token, userId);
                                promise.then(
                                    function (data) {

                                        $scope.FetchVirtualDevicesOptions.data = data;

                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                );

                            }
                            fetchVirtualDeviceService(token, $rootScope.userId);
                            $scope.updateTable = function () {

                                if ($rootScope.DataGrid.length != 0) {


                                    angular.forEach($rootScope.DataGrid, function (obj, index) {
                                        // console.log(' iterating ',obj.entity.name);

                                        var test = {};
                                        test.deviceId = obj.entity.id;
                                        test.deviceName = obj.entity.name;
                                        $rootScope.VirtualDevicesOptions.data.push(test);
                                    });


                                    for (var i = 0; i < $rootScope.VirtualDevicesOptions.data.length; i++) {
                                        for (var j = i + 1; j < $rootScope.VirtualDevicesOptions.data.length; j++) {

                                            if ($rootScope.VirtualDevicesOptions.data[i].deviceId == $rootScope.VirtualDevicesOptions.data[j].deviceId) {
                                                $rootScope.VirtualDevicesOptions.data.splice(j, 1);

                                            }
                                        }

                                    }

                                    // console.log("After update: " + JSON.stringify($rootScope.VirtualDevicesOptions.data));

                                }
                                ;

                                $rootScope.DataGrid = [];

                                $uibModalInstance.dismiss('cancel');
                            };

                            $scope.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };


                        }],
                        size: size,
                        resolve: {
                            Options: function () {
                                return $rootScope.VirtualDevicesOptions.data;
                            }
                        }
                    });
                }
				$scope.dataLoading = false;
				$(".btn-info").removeClass("disabled");
            },
            function (err) {
                console.log(err);
            }
        );

        $rootScope.VirtualDevicesOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                console.log(row.entity.deviceName)
                $rootScope.VirtualDeviceId = row.entity.deviceId;
                $rootScope.RowDevice = row.entity;
				
				var deviceName = row.entity.deviceName;
				if(row.isSelected){
                $rootScope.editTestplanDevices.push({"name": row.entity.deviceName});
				}else{
					for (var i = 0; i < $rootScope.editTestplanDevices.length; i++){
						if($rootScope.editTestplanDevices[i].name == deviceName){
							$rootScope.editTestplanDevices.splice(i, 1);
						}
					}
				}

            });


            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {

            });
        };

        $scope.editTestplan = function (size) {
			$scope.dataProcessing = true;
			$(".btn-info").addClass("disabled");
            if ($rootScope.RowDevice != null) {
			var jobVo = {};	
			//prepare the edit test plan data 
			
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
            jobVo.jobCreatedBy = userId;
			jobVo.jobId = $scope.uiTreeJSON[0].jobId;
            jobVo.jobDeviceVOList = [];
            jobVo.jobDeviceVOList[0] = {};
            jobVo.jobId = $scope.uiTreeJSON[0].jobId;

            jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList = [];

            var superParentObjectKeys = Object.keys(superParentObject);

            for (var i = 0; i < superParentObjectKeys.length; i++) {

                jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i] = {};
				
				jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceTaskExecutorId = superParentObject[i].jobDeviceTaskExecutorId;
                jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].taskExecutorName = superParentObject[i].Name;
                jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].taskExecutorSeqNo = superParentObject[i].Sequence;
				jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].taskExecutorLoop = superParentObject[i].Loop;
                jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceId = superParentObject[i].jobDeviceId;
                jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].taskExecutorId = superParentObject[i].taskExecutorId;

            }

            var parentObjectKeys = Object.keys(parentObject);
            for (var i = 0; i < parentObjectKeys.length; i++) {
                var childKeys = Object.keys(parentObject[parentObjectKeys[i]]);
                jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList = [];
                for (var j = 0; j < childKeys.length; j++) {
                    jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j] = {};
                    jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j].jobDeviceCommandExecutorId = parentObject[parentObjectKeys[i]][childKeys[j]].jobDeviceCommandExecutorId;
                    jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j].commandExecutorName = parentObject[parentObjectKeys[i]][childKeys[j]].Name;
                    jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j].commandExecutorSeqNo = parentObject[parentObjectKeys[i]][childKeys[j]].Sequence;
					jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j].commandExecutorLoop = parentObject[parentObjectKeys[i]][childKeys[j]].Loop;
                    jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j].jobDeviceTaskExecutorId = parentObject[parentObjectKeys[i]][childKeys[j]].jobDeviceTaskExecutorId;
                    jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[i].jobDeviceCommandExecutorVOList[j].commandExecutorId = parentObject[parentObjectKeys[i]][childKeys[j]].commandExecutorId;

                }
            }


            var childSuperParentKeys = Object.keys(childObject);
            for (var p = 0; p < childSuperParentKeys.length; p++) {
                var childParentKeys = Object.keys(childObject[childSuperParentKeys[p]]);
                for (var q = 0; q < childParentKeys.length; q++) {
                    var childKeys = Object.keys(childObject[childSuperParentKeys[p]][childParentKeys[q]]);
                    jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList = [];
                    for (var r = 0; r < childKeys.length; r++) {
                        jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r] = {};
						jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].jobDeviceCommandExecutorCommandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].jobDeviceCommandExecutorCommandId;

						jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandId;

						jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandSeqNo = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].Sequence;

						jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].jobDeviceCommandExecutorId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].jobDeviceCommandExecutorId;

						jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandParams = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].CommandParams;

						jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandExecutorCommandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].commandExecutorCommandId;

						jobVo.jobDeviceVOList[0].jobDeviceTaskExecutorVOList[p].jobDeviceCommandExecutorVOList[q].jobDeviceCommandExecutorCommandVOList[r].commandName = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].Name;
                    }
                }
            }
			
            var jsonData = JSON.stringify(jobVo);
				//end edit test plan data
				
				
				
                var editTestPlanData = JSON.stringify({
                    "jobVo": {"jobId": TestPlanId,"jobDeviceVOList":jobVo.jobDeviceVOList},
                    "virtualDeviceVoList":  $rootScope.editTestplanDevices
                })
                console.log()
				
                promise = testScriptService.editTestplan(editTestPlanData, token, userId);
                promise.then(
                    function (data) {

                        if (data.status == 'success') {
							$rootScope.tesplanId = TestPlanId;
							$scope.dataProcessing = false;
							$(".btn-info").removeClass("disabled");
//                                        $rootScope.Message = "Test Plan Updated Successfully";
                            $location.path('/dashboard/testScript/createTestPlan/testPlanEdited');
                        }
                        if (data.status == 'error') {
                            $rootScope.Message = "Error occured while updating the testplan";
							$scope.dataProcessing = false;
							$(".btn-info").removeClass("disabled");
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
            else {
                $rootScope.Message = "Please Select Device";
				$scope.dataProcessing = false;
				$(".btn-info").removeClass("disabled");
                $('#MessageColor').css("color", "red");
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }


//                        $location.path('/CreateTestRun/MappingTestRun');
        }
		
		$scope.rePlanEdit = function(){
			$location.path('/dashboard/testScript/EditTestplan');
		}
		
		$scope.editNextTestPlan = function(){
			$location.path('/dashboard/testScript/EditTestplan');
		}
		$scope.testPlanGoForTestRun = function(){
			$location.path('/CreateTestRun/MappingTestRun/MappingDevices');
		}
    })




