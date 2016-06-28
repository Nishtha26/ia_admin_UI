oTech.controller('editTestRunController',
    function ($scope, $rootScope, $location, AppServices, $stateParams, uiGridConstants, $cookieStore, uiGridTreeViewConstants, $interval, $uibModal, testScriptService, $timeout) {
        var userId = sessionStorage.getItem('userId');
        var token = sessionStorage.getItem('token');
        var TestPlanId = $cookieStore.get('TestPLANId');
        $scope.TestPlanId = TestPlanId;
        $scope.testRunName = $cookieStore.get('testRunName');
        $scope.Names = [];
        $scope.commandValues = ' ';
        $rootScope.tree_data = $cookieStore.get('NewTreeLst');
        $scope.notAvailableMsg = $cookieStore.get('notAvailableMsg')
        var TestRunID = $cookieStore.get('TestRuId');
        $rootScope.my_tree ={};
        $rootScope.role = sessionStorage.getItem("role");
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


        $scope.TestRunForTestPlans = function () {
            $location.path('/TestRunSelect/editCommandParameters/TestRunforTestplans')
        }
		
		$scope.selectTestRun = function () {
            $location.path('/TestRunSelect')
        }

        //Test Run Grid
        $scope.TestRunGridOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {field: 'testrunName', name: 'Test Run ID', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'testrunDescription', name: 'Test Run Name', headerCellClass: $scope.highlightFilteredHeader}
            ]
        };
		
		
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

        promise = testScriptService.getAllTestRuns(token, userId);
        promise.then(
            function (data) {
				$scope.dataLoading = true;
				$scope.totalRecords = data.testRunsForTestPlan.length;
				allOfTheData = data.testRunsForTestPlan;
				$scope.TestRunGridOptions.data = data.testRunsForTestPlan.slice( 0, $scope.itemsPerPage);
				$scope.dataLoading = false;

            },
            function (err) {
                console.log(err);
            }
        );
		
		 $scope.createNewDatasource = function() {
						$scope.dataLoading = true;
						$scope.TestRunGridOptions.data = allOfTheData.slice( startLimit, $scope.endLimit);
						$scope.dataLoading = false;
					}

        $scope.TestRunGridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				$scope.dataProcessing = true;
				$(".btn-info").addClass("disabled");
                $rootScope.RowTestRunGrid = row.entity;
                var TestRunGridData = row.entity;
				$scope.testRunName = row.entity.testrunName;
                console.log("Row Data: " + JSON.stringify(row.entity));
                $cookieStore.put('TestRunGridData', TestRunGridData);
//                    console.log("Row Selected: "+JSON.stringify(TestRunGridData))
                var TestRuId = row.entity.testrunId;
                $cookieStore.put('TestRuId', TestRuId);
                var testrunName = row.entity.testrunName;
                $cookieStore.put('testRunName', testrunName);
                console.log(JSON.stringify(row.entity.testrunName));
				
				$rootScope.Row = row.entity;
                //Test Run tree
                promise = testScriptService.getTestRunDependantData(token, testrunName, userId);
                promise.then(
                    function (data) {
                        $cookieStore.put('notAvailableMsg', data.status)
                        if (data.status == "No TestRun Exists") {
							$scope.dataProcessing = false;
							$(".btn-info").removeClass("disabled");
                            $scope.notAvailableMsg = "No test runs available for this device"
                        } else {
                            $scope.NewTreeLst = [];
                            $scope.TemptreeData = data.testRunDependantData;

                            $scope.jobDeviceVOLst = [];
//                                $scope.tree_data = $scope.NewTreeLst;
                            angular.forEach($scope.TemptreeData.jobDeviceVOList, function (item1) {
                                $scope.jobDeviceTaskExecutorVOList = [];
                                angular.forEach(item1.jobDeviceTaskExecutorVOList, function (item2) {
                                    $scope.jobDeviceCommandExecutorVOList = [];
                                    angular.forEach(item2.jobDeviceCommandExecutorVOList, function (item3) {
                                        $scope.jobDeviceCommandExecutorCommandVOList = [];
                                        angular.forEach(item3.jobDeviceCommandExecutorCommandVOList, function (item4) {
                                            var jobDeviceCommandExecutorCommandout = {
                                                "Name": item4.commandName,
                                                "Loop": null,
                                                "CommandParams": item4.commandParams,
                                                "Sequence": item4.commandSeqNo,
                                                "jobDeviceCommandExecutorCommandId": item4.jobDeviceCommandExecutorCommandId,
                                                "commandId": item4.commandId,
                                                "jobDeviceCommandExecutorId": item4.jobDeviceCommandExecutorId,
                                                "commandExecutorCommandId": item4.commandExecutorCommandId,
                                                "children": []
                                            };
                                            $scope.jobDeviceCommandExecutorCommandVOList.push(jobDeviceCommandExecutorCommandout);
                                        });
                                        var jobDeviceCommandExecutorout = {
                                            "Name": item3.commandExecutorName,
                                            "Loop": item3.commandExecutorLoop,
                                            "CommandParams": null,
                                            "Sequence": item3.commandExecutorSeqNo,
                                            "type": "jobDeviceCommandExecutor",
                                            "children": $scope.jobDeviceCommandExecutorCommandVOList
                                        };
                                        $scope.jobDeviceCommandExecutorVOList.push(jobDeviceCommandExecutorout);
                                    });
                                    var jobDeviceTaskout = {
                                        "Name": item2.taskExecutorName,
                                        "Loop": item2.taskExecutorLoop,
                                        "CommandParams": null,
                                        "Sequence": item2.taskExecutorSeqNo,
                                        "type": "jobDeviceTask",
                                        "children": $scope.jobDeviceCommandExecutorVOList
                                    };

                                    $scope.jobDeviceTaskExecutorVOList.push(jobDeviceTaskout);
                                });
                                var jobDeviceout = {
                                    "id": item1.jobDeviceId,
                                    "Name": item1.deviceName,
                                    "Loop": item1.taskLoop,
                                    "CommandParams": null,
                                    "Sequence": null,
                                    "type": "JobDevice",
                                    "children": $scope.jobDeviceTaskExecutorVOList
                                };
                            });

                            var jobout = {
                                "Name": $scope.TemptreeData.jobName,
                                "type": "Job",
                                "children": $scope.jobDeviceTaskExecutorVOList
                            };
                            $scope.NewTreeLst.push(jobout);
                            $rootScope.tree_data = $scope.NewTreeLst;
                            $cookieStore.put('NewTreeLst', $rootScope.tree_data);
                            console.log("tree_data: " + JSON.stringify($rootScope.tree_data))
							// for expanding tree
								if ($scope.tree_data !== null && $scope.tree_data !== undefined) {
									// if($scope.treedata.length){
									setTimeout(function () {
										$rootScope.$apply($rootScope.my_tree.expand_all);
									}, 10);

								}
                        }
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            });
             gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                var msg = 'rows changed ' + rows.length;

            });

        };

        $scope.editTestrunPlanNext = function () {
            if ($rootScope.RowTestRunGrid != null) {
                $location.path('/TestRunSelect/editCommandParameters');
            }
            else {
                $rootScope.Message = "Please Select TestRun";
                $('#MessageColor').css("color", "red");
                console.log($('#MessageColor').css("color", "red"))
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }

        }


        $scope.TestRunCmndPrms = function (branch, size) {
            var result = [];
            $rootScope.StringCmndPrm = [];
            if (branch.CommandParams != null) {
                var params = branch.CommandParams;
                var parmSplit = params.split(",")
                console.log('parmSplit: ' + parmSplit[0])
                console.log(parmSplit);
                var i;
                $scope.res = parmSplit;

                angular.forEach(parmSplit, function (value) {
                    $scope.res2 = value.split("=");
                    $scope.Names.push({
                        "CmdPrmtrsName": $scope.res2[0],
                        "Cmds": $scope.res2[1]
                    })
                });

                //Moda dialogue
                var TestRunInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    keyboard: true,
                    backdrop: 'static',
                    templateUrl: 'app/views/commandPrametersTestRunModal.html',
                    controller: ['$scope', 'Names', '$uibModalInstance', function ($scope, Names, $uibModalInstance) {

                         var expandTreeData =function(){
                         if( $rootScope.tree_data !== null && $rootScope.tree_data !== undefined ) {
                         setTimeout(function() {
                          $rootScope.$apply($rootScope.my_tree.expand_all);
                                  }, 10);
                              }
                           }

                        $scope.UpdateTestRunComndPrms = function () {
                            angular.forEach(Names, function (Params) {
                                result.push(Params.CmdPrmtrsName + '=' + Params.Cmds)

                                //to join array to string
                                $rootScope.StringCmndPrm = result.join(',')
                                console.log($rootScope.StringCmndPrm)
                            });
                            console.log($rootScope.StringCmndPrm)
                            //Parms Test Run Data
                            $scope.ParamsData = JSON.stringify({
                                "jobDeviceCommandExecutorCommandId": branch.jobDeviceCommandExecutorCommandId,
                                "commandId": branch.commandId,
                                "commandSeqNo": branch.Sequence,
                                "jobDeviceCommandExecutorId": branch.jobDeviceCommandExecutorId,
                                "commandParams": $rootScope.StringCmndPrm,
                                "commandExecutorCommandId": branch.commandExecutorCommandId,
                            })

                            console.log($scope.ParamsData);

                            //Update Test Run Command Params functionality
                            var ParamsData = $scope.ParamsData;
                            console.log('ParamsData: ' + ParamsData);
                            promise = testScriptService.PostUpdate(ParamsData, token, userId);
                            promise.then(
                                function (data) {
//                                                alert(data.status)
                                    $rootScope.Message = "Command Parameters Edited Successfully";
                                    $('#MessageColor').css("color", "green");
                                    $('#MessagePopUp').modal('show');
                                    $timeout(function () {
                                        $('#MessagePopUp').modal('hide');
                                        expandTreeData();

                                    }, 2000);
                                    //Test Run tree
                                    promise = testScriptService.getTestRunDependantData(token, TestRunName, userId);
                                    promise.then(
                                        function (data) {

                                            $scope.NewTreeLst = [];
                                            $scope.TemptreeData = data.testRunDependantData;

                                            $scope.jobDeviceVOLst = [];
//                                $scope.tree_data = $scope.NewTreeLst;
                                            angular.forEach($scope.TemptreeData.jobDeviceVOList, function (item1) {
                                                $scope.jobDeviceTaskExecutorVOList = [];
                                                angular.forEach(item1.jobDeviceTaskExecutorVOList, function (item2) {
                                                    $scope.jobDeviceCommandExecutorVOList = [];
                                                    angular.forEach(item2.jobDeviceCommandExecutorVOList, function (item3) {
                                                        $scope.jobDeviceCommandExecutorCommandVOList = [];
                                                        angular.forEach(item3.jobDeviceCommandExecutorCommandVOList, function (item4) {
                                                            var jobDeviceCommandExecutorCommandout = {
                                                                "Name": item4.commandName,
                                                                "Loop": null,
                                                                "CommandParams": item4.commandParams,
                                                                "Sequence": item4.commandSeqNo,
                                                                "jobDeviceCommandExecutorCommandId": item4.jobDeviceCommandExecutorCommandId,
                                                                "commandId": item4.commandId,
                                                                "jobDeviceCommandExecutorId": item4.jobDeviceCommandExecutorId,
                                                                "commandExecutorCommandId": item4.commandExecutorCommandId,
                                                                "children": []
                                                            };
                                                            $scope.jobDeviceCommandExecutorCommandVOList.push(jobDeviceCommandExecutorCommandout);
                                                        });
                                                        var jobDeviceCommandExecutorout = {
                                                            "Name": item3.commandExecutorName,
                                                            "Loop": item3.commandExecutorLoop,
                                                            "CommandParams": null,
                                                            "Sequence": item3.commandExecutorSeqNo,
                                                            "type": "jobDeviceCommandExecutor",
                                                            "children": $scope.jobDeviceCommandExecutorCommandVOList
                                                        };
                                                        $scope.jobDeviceCommandExecutorVOList.push(jobDeviceCommandExecutorout);
                                                    });
                                                    var jobDeviceTaskout = {
                                                        "Name": item2.taskExecutorName,
                                                        "Loop": item2.taskExecutorLoop,
                                                        "CommandParams": null,
                                                        "Sequence": item2.taskExecutorSeqNo,
                                                        "type": "jobDeviceTask",
                                                        "children": $scope.jobDeviceCommandExecutorVOList
                                                    };

                                                    $scope.jobDeviceTaskExecutorVOList.push(jobDeviceTaskout);
                                                });
                                                var jobDeviceout = {
                                                    "id": item1.jobDeviceId,
                                                    "Name": item1.deviceName,
                                                    "Loop": item1.taskLoop,
                                                    "CommandParams": null,
                                                    "Sequence": null,
                                                    "type": "JobDevice",
                                                    "children": $scope.jobDeviceTaskExecutorVOList
                                                };
                                            });

                                            var jobout = {
                                                "Name": $scope.TemptreeData.jobName,
                                                "type": "Job",
                                                "children": $scope.jobDeviceTaskExecutorVOList
                                            };
                                            $scope.NewTreeLst.push(jobout);
                                            $rootScope.tree_data = $scope.NewTreeLst;
                                            $cookieStore.put('NewTreeLst', $rootScope.tree_data);
                                            console.log("tree_data: " + JSON.stringify($rootScope.tree_data))

                                        },
                                        function (err) {
                                            console.log(err);
                                        }
                                    );
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
                            $uibModalInstance.dismiss('cancel');
                        }
                        $scope.Names = Names;
                        $scope.cancel = function () {
                            $scope.Names = [];
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

//Test Run real devices
        $scope.TestRunRealDevicesOption = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {field: 'deviceId', name: 'Device ID', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceName', name: 'Device Name', headerCellClass: $scope.highlightFilteredHeader}
            ]
        };

        promise = testScriptService.getDevicesForTestRun(token, TestRunID, userId);
        promise.then(
            function (data) {
                console.log(JSON.stringify(data.testRunDeviceData))
                $scope.TestRunRealDevicesOption.data = data.testRunDeviceData;

            },
            function (err) {
                console.log(err);
            }
        );

        //No.of TestRuns
        promise = testScriptService.getTestRunsForTestPlan(TestPlanId, token, userId);
        promise.then(
            function (data) {

                var testrun = parseInt(data.testRunsForTestPlan.length) + 1
                $scope.TestRuns = TestPlanId + '_' + testrun;
                console.log("TestRuns: " + $scope.TestRuns)

            },
            function (err) {
                console.log(err);
            }
        );


    });

