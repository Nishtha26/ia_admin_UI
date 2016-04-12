oTech.controller('editTestPlanController',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices,
              $stateParams, testScriptService, uiGridConstants, $cookieStore, $uibModal, $timeout) {

        $scope.TestplanName = $cookieStore.get('TestplanName');
        $scope.NewTreeLst = [];
        $rootScope.editTestplanDevices = [];
        var TestPlanId = $cookieStore.get('TestPLANId');
        $rootScope.tree_data = $cookieStore.get('treedata');
        $rootScope.my_tree = {};
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
        var TestPlanId = $cookieStore.get('tesplanId');
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

        $scope.getDashBoardMenu();
        $scope.getFavouriteReports();

        var getTestplanService = function (token, userId, TestPlanId) {
            console.log(userId);
            console.log(token);
            console.log(TestPlanId);
            $scope.NewTreeLst = [];
            promise = testScriptService.getTestplan(token, userId, TestPlanId);
            promise.then(
                function (data) {
                    console.log(JSON.stringify(data))
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
                    if ($rootScope.tree_data) {
                        setTimeout(function () {
                            $rootScope.$apply($rootScope.my_tree.expand_all());
                        }, 10);
                    }
                    $cookieStore.put('treedata', $scope.treedata);
                },
                function (err) {
                    console.log(err);
                }
            );
        }

        getTestplanService(token, userId, TestPlanId);

        promise = testScriptService.FetchCommands(userId, token);
        promise.then(
            function (data) {
                $scope.Commands = data;

            },
            function (err) {
                console.log(err);
            }
        );
        //Example
        $scope.Data = [];
        commandName.push({name: $scope.Data.commandName});

        $scope.col_defs = [
            {
                field: "name",
                displayName: "NAME",
                cellTemplate: "<img ng-src='{{ row.branch[col.field] }}' />"
            }
        ];

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
                //Calling getTestplan service and looping data as tree structure
                $rootScope.tree_data = $scope.NewTreeLst;
                // $rootScope.tree_data = $cookieStore.get('treedata');
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

        //Test plan table Service
        promise = testScriptService.FetchingTestService(userId, token);
        promise.then(
            function (data) {
                $scope.TestPlanOptions.data = data;
            },
            function (err) {
                console.log(err);
            }
        );

        //Virtual Devices Table
        promise = testScriptService.getVirtualDevices(TestPlanId, token, userId);
        promise.then(
            function (data) {
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
                var flag = true;
                for (var y = 0; y < $rootScope.editTestplanDevices.length; y++) {
                    if ($rootScope.editTestplanDevices[y].name == row.entity.deviceName) {
                        flag = false;
                    }
                }
                if (flag) {
                    $rootScope.editTestplanDevices.push({"name": row.entity.deviceName});
                }

            });


            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {

            });
        };

        $scope.editTestplan = function (size) {
            if ($rootScope.RowDevice != null) {
                var editTestPlanData = JSON.stringify({
                    "jobVo": {"jobId": TestPlanId},
                    "virtualDeviceVoList":  $rootScope.editTestplanDevices
                })
                console.log()

                promise = testScriptService.editTestplan(editTestPlanData, token, userId);
                promise.then(
                    function (data) {

                        if (data.status == 'success') {

//                                        $rootScope.Message = "Test Plan Updated Successfully";
                            $location.path('/CreateTestRun/MappingTestRun');
                        }
                        if (data.status == 'error') {
                            $rootScope.Message = "Error occured while updating the testplan";

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
                $('#MessageColor').css("color", "red");
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }


//                        $location.path('/CreateTestRun/MappingTestRun');
        }
    })




