oTech.controller('createTestRunController',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, uiGridConstants, $cookieStore, uiGridTreeViewConstants, $interval, $uibModal, $timeout) {
        var userId = sessionStorage.getItem('userId');
        var token = sessionStorage.getItem('token');
        $rootScope.role = sessionStorage.getItem("role");
        var TestPlanId = $cookieStore.get('TestPLANId');
        $scope.TestPlanId = TestPlanId;
        $scope.TestplanName = $cookieStore.get('TestplanName');
        var virtualDeviceName = ''
        var Devices = [];
        $scope.VirtualDevicelist1 = [];
        var VirtualDevicelist = [];
        $rootScope.tree_data = $cookieStore.get('treedata');
        $scope.VirtualSelectedName = $cookieStore.get('VirtualDeviceNamesel');
        $scope.commandValues = ' ';
        $scope.TestplanName = $cookieStore.get('TestplanName');
        var TestRunName = $cookieStore.get('DependantTestRunName');
        var DeviceName = [];
        $rootScope.my_tree = {};

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

        //Global Tree Structure
        var getTestplanService = function (token, userId, TestPlanId) {

            //Calling getTestplan service and looping data as tree structure
            $scope.NewTreeLst = [];
            $rootScope.tree_data = $scope.NewTreeLst;
            promise = testScriptService.getTestplan(token, userId, TestPlanId);
            promise.then(
                function (data) {
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

                    // for expanding tree
                    if ($scope.treedata !== null && $scope.treedata !== undefined) {
                        // if($scope.treedata.length){
                        setTimeout(function () {
                            $rootScope.$apply($rootScope.my_tree.expand_all);
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

        //Row selection
        $scope.TestPlanOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {

                $rootScope.RowCreateTestrun = row.entity;
                var TestPlanId = row.entity.testplanId;

                $cookieStore.put('TestPLANId', TestPlanId);
                $rootScope.TestplanId = row.entity.testplanId;
                $cookieStore.put('TestPLANId', row.entity.testplanId);

                $scope.testplan_name = row.entity.testplanName;
                $cookieStore.put('TestplanName', row.entity.testplanName);


//                    var TestPlanId = $cookieStore.get('selected_testplanid');
                $cookieStore.put('TestPlan_Name', $scope.testplan_name);
//                    $cookieStore.remove('selected_testplanid');


                $scope.testplanId_selected = $cookieStore.get('selected_testplanid');
                var msg = 'row selected ' + row.isSelected;
                //Calling getTestplan service and looping data as tree structure
                $scope.NewTreeLst = [];
                $rootScope.tree_data = $scope.NewTreeLst;
                promise = testScriptService.getTestplan(token, userId, TestPlanId);
                promise.then(
                    function (data) {
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


                        $cookieStore.put('treedata', $scope.treedata);
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
        $scope.testrunNext = function () {
            if ($rootScope.RowCreateTestrun) {
                $location.path('/CreateTestRun/MappingTestRun');
            } else {
                $rootScope.Message = "Please Select Test Plan";
                $('#MessageColor').css("color", "red");
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }
        }

        $scope.testplan_id = sessionStorage.getItem("TestplanId");
        var testplanId = sessionStorage.selected_testplanid;
        $scope.testplanname = sessionStorage.getItem("TestPlan_Name");

        //Test plan table Service
        promise = testScriptService.FetchingTestService(userId, token);
        promise.then(
            function (data) {
//                        $scope.tesplanData = data;
                $scope.TestPlanOptions.data = data;
                sessionStorage.setItem('TestplanId', data.testplanId);
                //Fetching test plans

            },
            function (err) {
                console.log(err);
            }
        );

        $scope.testplan_name = $cookieStore.get('TestPlan_Name');

        //Deleting each row For Mapping devices
        $scope.deleteDevices = function (Device) {
            var index = $scope.DeviceMapping.indexOf(Device);
            $scope.DeviceMapping.splice(index, 1);
            $scope.$emit('customerDeleted', Device);
            for (var x = 0; x < DeviceName.length; x++) {
                if (DeviceName[x] == Device.VirtulaDeviceName) {
                    DeviceName.splice(x, 1);
                }


            }
            $scope.VirtualSelectedName = DeviceName.join(',');
            // $cookieStore.put('VirtualDeviceNamesel', $scope.VirtualSelectedName)
        };

        $scope.TestRunforTestplans = function () {
            $location.path('/dashboard/testScript/TestRunforTestplans');
        }


        //Column definations
        $scope.my_tree_handler = function (branch, size) {
            $scope.Names = [];
            $rootScope.result = [];
            $rootScope.StringCmndPrm = [];
            $rootScope.commandparams = branch.CommandParams;
            if (branch.CommandParams != null) {
                var params = branch.CommandParams;
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
                //modal Dialog
                $scope.animationsEnabled = true;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    keyboard: true,
                    backdrop: 'static',
                    templateUrl: 'app/views/CommandParametrsModal.html',
                    controller: ['$scope', 'Names', '$uibModalInstance', function ($scope, Names, $uibModalInstance) {

                         var treeGridCollapse = function() {
                             if ($rootScope.tree_data !== null && $rootScope.tree_data !== undefined) {

                                 setTimeout(function () {
                                     $rootScope.$apply($rootScope.my_tree.expand_all);
                                 }, 10);

                             }
                         }

                        //Update function of Popup
                        $scope.UpdateComndPrms = function () {

                            $rootScope.result = [];
                            angular.forEach(Names, function (Params) {
                                $rootScope.result.push(Params.CmdPrmtrsName + '=' + Params.Cmds);
                            });
                            $rootScope.StringCmndPrm = $rootScope.result.join(',');

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
                            promise = testScriptService.PostUpdate(ParamsData, token, userId);
                            promise.then(
                                function (data) {

                                    $rootScope.Message = "Command Parameters Updated Successfully";
                                    $('#MessageColor').css("color", "green");
                                    $('#MessagePopUp').modal('show');
                                    $timeout(function () {
                                        $('#MessagePopUp').modal('hide');
                                    }, 2000);
                                    treeGridCollapse();



                                    //Calling getTestplan service and looping data as tree structure
                                    $scope.NewTreeLst = [];
                                    $rootScope.tree_data = $scope.NewTreeLst;
                                    promise = testScriptService.getTestplan(token, userId, TestPlanId);
                                    promise.then(
                                        function (data) {
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


                                            $cookieStore.put('treedata', $scope.treedata);
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
                                    console.log(err);
                                }
                            );

                            $rootScope.StringCmndPrm = [];
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


        //Virtual Devices Table
        $scope.VirtualDevicesOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {field: 'deviceName', name: 'Device Name', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };
        promise = testScriptService.getVirtualDevices(TestPlanId, token, userId);
        promise.then(
            function (data) {
                $scope.VirtualDevicesOptions.data = data;
            },
            function (err) {
                console.log(err);
            }
        );

        $scope.VirtualDevicesOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $rootScope.RowVirtualDevices = row.entity;

                $rootScope.VirtualDeviceId = row.entity.deviceId;
                $cookieStore.put('JobDeviceId', row.entity.jobDeviceId);
                $cookieStore.put('virtulaDevice', row.entity.deviceName);
                if ($scope.VirtualDevicelist1.indexOf(row.entity.deviceName) == -1) {
                    $scope.VirtualDevicelist1.push(row.entity.deviceName);
                }
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {

            });
        };

        //Real Devices
        $scope.RealDevicesOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {field: 'deviceId', name: 'RealDevice Id', headerCellClass: $scope.highlightFilteredHeader},
                {field: 'deviceName', name: 'RealDevice Name', headerCellClass: $scope.highlightFilteredHeader},
            ]
        };
        promise = testScriptService.getRealDevices(token, userId);
        promise.then(
            function (data) {
                $scope.RealDevicesOptions.data = data.devicesList;
            },
            function (err) {
                console.log(err);
            }
        );

        $scope.RealDevicesOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $rootScope.RowRealDevices = row.entity;

                $rootScope.RealDeviceId = row.entity.deviceId;
                $scope.addRealDevices = function () {
                    var VirtualDevicName = $cookieStore.get('virtulaDevice');
                    var RealDeviceName = row.entity.deviceName;
                    var RealDeviceId =  row.entity.deviceId;
                    if (VirtualDevicName != null) {
                        var dataCheck = true;
                        for (var i = 0; i < Devices.length; i++) {
                            if (Devices[i].VirtulaDeviceName == VirtualDevicName) {
                                dataCheck = false;
                                $scope.msg = "Duplicate Virtual Devices Names are Entered";
                                break;
                            }
                            if (Devices[i].RealDeviceId == RealDeviceId) {
                                $scope.msg = "Duplicate RealDeviceName are Entered";
                                dataCheck = false;
                                break;
                            }

                        }
                        if (dataCheck) {
                            $rootScope.RealDevice = row.entity.deviceName;
                            $cookieStore.put('RealDevice', row.entity.deviceName);
                            Devices.push({
                                'VirtulaDeviceName': VirtualDevicName,
                                'RealDeviceName': RealDeviceName,
                                'RealDeviceId': RealDeviceId
                            });
                            var VirtualDevicName = $cookieStore.get('virtulaDevice');
                            DeviceName.push(VirtualDevicName)
                            $scope.VirtualSelectedName = DeviceName.join(',');
                            $scope.TestRunCreate_Data();
                        }
                        console.log(Devices)
                    }
                    $scope.DeviceMapping = Devices;
                }
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
        };

        //Create Testrun
        $scope.TestRunCreate_Data = function () {
            VirtualDevicelist.push({
                "testplanId": TestPlanId,
                "testrunId": 0,
                "virtualDeviceId": $rootScope.VirtualDeviceId,
                "realDeviceId": $rootScope.RealDeviceId
            })

            $rootScope.CreateTestRun_Data = JSON.stringify({
                "testplanVo": {"testplanId": TestPlanId},
                "jobVo": {},
                "virtualRealDeviceList": VirtualDevicelist
            });


        }

        $scope.CreateTestrun = function () {
            if ($rootScope.RowRealDevices != null && $rootScope.RowVirtualDevices != null) {
                var TestRunData = $rootScope.CreateTestRun_Data;
                promise = testScriptService.CreateTestRun(TestRunData, token, userId);
                promise.then(
                    function (data) {
                        var DependantTestRunName = data.NewTestRun.jobName
                        $cookieStore.put('DependantTestRunName', DependantTestRunName);
                        $location.path('/CreateTestRun/MappingTestRun/MappingDevices/createTestRunScheduleSel');

                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }
            else {
                $rootScope.Message = "Please Select Devices";

                $('#MessageColor').css("color", "red");
                console.log($('#MessageColor').css("color", "red"))
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }


//
        }

        //No.of TestRuns
        promise = testScriptService.getTestRunsForTestPlan(TestPlanId, token, userId);
        promise.then(
            function (data) {

                var testrun = parseInt(data.testRunsForTestPlan.length) + 1
                $scope.TestRuns = TestPlanId + '_' + testrun;
            },
            function (err) {
                console.log(err);
            }
        );


        if ($rootScope.treedata !== null && $rootScope.treedata !== undefined) {

            setTimeout(function () {
                $rootScope.$apply($rootScope.my_tree.expand_all);
            }, 10);

        }

        if ($rootScope.tree_data !== null && $rootScope.tree_data !== undefined) {

            setTimeout(function () {
                $rootScope.$apply($rootScope.my_tree.expand_all);
            }, 10);

        }


    });



