oTech.controller('TestRun_CreateTestRunController',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, uiGridConstants, $cookieStore, uiGridTreeViewConstants, $interval, $uibModal, $state) {
        var userId = sessionStorage.getItem("userId");
        var token = sessionStorage.getItem("token");
        $rootScope.role = sessionStorage.getItem("role");
        $rootScope.createTestRunData = {};
        $rootScope.my_tree = {};

        $scope.TestplanName = $cookieStore.get('TestplanName');
        var virtualDeviceName = '';
        var Devices = [];
        $scope.VirtualDevicelist1 = [];
        var VirtualDevicelist = [];
        $scope.VirtualSelectedName = $cookieStore.get('VirtualDeviceNamesel');
        $scope.commandValues = ' ';
        $scope.TestplanName = $cookieStore.get('TestplanName');
        //Grid options for test plan table
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

        $scope.getFavouriteReports = function () {
            if ($rootScope.Favourites == undefined) {
                $rootScope.getFavouriteReports();
            }
        }
        $scope.getDashBoardMenu();
        $scope.getFavouriteReports();

        //Test plan table Service
        promise = testScriptService.FetchingTestService(userId, token);
        promise.then(
            function (data) {
//                        $scope.tesplanData = data;
                $scope.TestPlanOptions.data = data;
                // console.log("Fetch Test Plan: " + JSON.stringify(data))
                sessionStorage.setItem('TestplanId', data.testplanId);
                //Fetching test plans

            },
            function (err) {
                console.log(err);
            }
        );


        $scope.TestPlanOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var TestPlanId = row.entity.testplanId;
                $cookieStore.put('TestPLANId', TestPlanId);
                // $rootScope.TestplanId = row.entity.testplanId;
                $scope.TestPlanId = row.entity.testplanId;
                $cookieStore.put('TestPLANId', row.entity.testplanId);
                $scope.testplan_name = row.entity.testplanName;
                $cookieStore.put('TestplanName', row.entity.testplanName);
//                    var TestPlanId = $cookieStore.get('selected_testplanid');
                $cookieStore.put('TestPlan_Name', $scope.testplan_name);
//                    $cookieStore.remove('selected_testplanid');
                $scope.testplanId_selected = $cookieStore.get('selected_testplanid');
                var msg = 'row selected ' + row.isSelected;
                $scope.view_testrun = function () {
//                        $location.path('/dashboard/testScript/Mapping')

                }

                //Calling getTestplan service and looping data as tree structure
                $scope.NewTreeLst = [];
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                var msg = 'rows changed ' + rows.length;

            });
        };


        //No.of TestRuns

        var getNo_ofTestRuns = function (TestPlanId) {
            promise = testScriptService.ViewTestRunService(TestPlanId, userId);
            promise.then(
                function (data) {
                    console.log("No.of runs: " + JSON.stringify(data));
                    console.log(data.testRunsForTestPlan);
                    console.log("scope.TestRuns");
                    if (data.testRunsForTestPlan.length > 0) {
                        $rootScope.createTestRunData.testRuns = TestPlanId + "_" + (data.testRunsForTestPlan.length + 1);
                        console.log($rootScope.createTestRunData.testRuns);
                    }
                    else {
                        $rootScope.createTestRunData.testRuns = TestPlanId + "_1";
                    }
                },
                function (err) {
                    console.log(err);
                }
            );

        }


        $scope.getTestplanService = function (TestPlanId) {
            console.log(token, userId, TestPlanId);
            $scope.NewTreeLst = [];
            promise = testScriptService.getTestplan(token, userId, TestPlanId);
            promise.then(function (data) {
                    $scope.TemptreeData = data;
                    $scope.jobDeviceVOLst = [];
                    angular.forEach($scope.TemptreeData.jobDeviceVOList, function (item1) {
                        $scope.jobDeviceTaskExecutorVOLst = [];
                        angular.forEach(item1.jobDeviceTaskExecutorVOList, function (item2) {
                            $scope.jobDeviceCommandExecutorVOLst = [];
                            angular.forEach(item2.jobDeviceCommandExecutorVOList, function (item3) {
                                $scope.jobDeviceCommandExecutorCommandVOLst = [];
                                angular.forEach(item3.jobDeviceCommandExecutorCommandVOList, function (item4) {
                                    var jobDeviceCommandExecutorCommandout = {
                                        "Name": item4.commandName,
                                        "Loop": null,
                                        "CommandParams": item4.commandParams,
                                        "Sequence": item4.commandSeqNo,
                                        "type": "jobDeviceCommandExecutorCommand",
                                        "jobDeviceCommandExecutorCommandId": item4.jobDeviceCommandExecutorCommandId,
                                        "commandId": item4.commandId,
                                        "jobDeviceCommandExecutorId": item4.jobDeviceCommandExecutorId,
                                        "commandExecutorCommandId": item4.commandExecutorCommandId,
                                        "children": []
                                    };
                                    $scope.jobDeviceCommandExecutorCommandVOLst.push(jobDeviceCommandExecutorCommandout);
                                });

                                var jobDeviceCommandExecutorout = {
                                    "Name": item3.commandExecutorName,
                                    "Loop": item3.commandExecutorLoop,
                                    "CommandParams": null,
                                    "Sequence": item3.commandExecutorSeqNo,
                                    "type": "jobDeviceCommandExecutor",
                                    "children": $scope.jobDeviceCommandExecutorCommandVOLst
                                };
                                $scope.jobDeviceCommandExecutorVOLst.push(jobDeviceCommandExecutorout);
                            });
                            var jobDeviceTaskout = {
                                "Name": item2.taskExecutorName,
                                "Loop": item2.taskExecutorLoop,
                                "CommandParams": null,
                                "Sequence": item2.taskExecutorSeqNo,
                                "type": "jobDeviceTask",
                                "children": $scope.jobDeviceCommandExecutorVOLst
                            };
                            $scope.jobDeviceTaskExecutorVOLst.push(jobDeviceTaskout);
                        });
                        var jobDeviceout = {
                            "id": item1.jobDeviceId,
                            "Name": item1.deviceName,
                            "Loop": item1.taskLoop,
                            "CommandParams": null,
                            "Sequence": null,
                            "type": "JobDevice",
                            "children": $scope.jobDeviceTaskExecutorVOLst
                        };
                    });
                    var jobout = {
                        "Name": $scope.TemptreeData.jobName,
                        "type": "Job",
                        "children": $scope.jobDeviceTaskExecutorVOLst
                    };
                    $scope.NewTreeLst.push(jobout);
                    $scope.treedata = $scope.NewTreeLst;
                    $rootScope.tree_data = $scope.NewTreeLst;
                    console.log($rootScope.tree_data);

                    $cookieStore.put('treedata', $scope.treedata);
                    getNo_ofTestRuns(TestPlanId);

                    // $state.go('CreateNewTestRun.mappingTestRun');

                    //setTimeout(function() {
                    //$rootScope.$apply($rootScope.my_tree.expand_all);
                    //}, 20);

                },

                function (err) {
                    console.log(err);
                }
            );
        }


//Column definations
        $scope.my_tree_handler = function (branch, size) {
            $scope.Names = [];
            $rootScope.result = [];
            $rootScope.StringCmndPrm = [];
            $rootScope.commandparams = branch.CommandParams;
            if (branch.CommandParams != null) {
                var params = branch.CommandParams;
                console.log(params)
                var parmSplit = params.split(",")
                var i;
                $scope.res = parmSplit;
                $scope.Names = [];
                angular.forEach(parmSplit, function (value) {
                    $scope.res2 = value.split("=");
                    $scope.Names.push({
                        "CmdPrmtrsName": $scope.res2[0],
                        "Cmds": $scope.res2[1]
                    })
                });
                console.log("Names:-----> " + $scope.Names)
                //modal Dialog
                $scope.animationsEnabled = true;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    keyboard: true,
                    backdrop: 'static',
                    templateUrl: 'app/views/CommandParametrsModal.html',
                    controller: ['$scope', 'Names', '$uibModalInstance', function ($scope, Names, $uibModalInstance) {

                        $scope.Names = Names;

                        //Update function of Popup
                        $scope.UpdateComndPrms = function () {

                            $rootScope.result = [];
                            angular.forEach($scope.Names, function (Params) {
                                $rootScope.result.push(Params.CmdPrmtrsName + '=' + Params.Cmds);
                            });
                            $rootScope.StringCmndPrm = $rootScope.result.join(',')
                            console.log(JSON.stringify($rootScope.StringCmndPrm))

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
                            console.log("ParamsDataParamsDataParamsData");
                            console.log(ParamsData);

                            promise = testScriptService.PostUpdate(ParamsData, token, userId);
                            promise.then(
                                function (data) {
                                    //alert(data.status)
                                    getTestplanService(token, userId, TestPlanId);
                                    console.log("2: ", $rootScope.tree_data);
                                },
                                function (err) {
                                    console.log(err);
                                }
                            );

                            $rootScope.StringCmndPrm = [];
                            $uibModalInstance.dismiss('cancel');

                            //Calling getTestplan service and looping data as tree structure
                            $scope.NewTreeLst = [];
                            // $rootScope.tree_data =   $scope.NewTreeLst ;

                            // promise = testScriptService.getTestplan(token, userId, TestPlanId);


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


    });