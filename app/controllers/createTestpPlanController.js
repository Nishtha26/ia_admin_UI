oTech.controller('createTestPlanController',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices,
              $stateParams, testScriptService, uiGridConstants, $cookieStore, $uibModal, $log, $timeout) {

        //
        // var TestPlanId = $cookieStore.get('TestPLANId');
        // $scope.TestPlanId = TestPlanId;
        // $scope.TestplanName = $cookieStore.get('TestplanName');

        $scope.my_tree_handler = function (branch, size) {
            var data = branch.ids ? branch.ids[0] : {};
            if (data.superparentId) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'app/views/myModalContent.html',
                    controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                        $scope.createTestPlanOptions = {
                            enableFiltering: true,
                            enableRowHeaderSelection: false,
                            enableRowSelection: true,
                            multiSelect: false,
                            columnDefs: [
                                {field: 'commandName', headerCellClass: $scope.highlightFilteredHeader},
                                {field: 'commandCategoryType', headerCellClass: $scope.highlightFilteredHeader}
                            ]
                        };
                        promise = testScriptService.FetchCommands(userId, token);
                        promise.then(
                            function (data) {
                                $scope.createTestPlanOptions.data = data;
                            },
                            function (err) {
                                console.log(err);
                            }
                        );


                        $scope.addCommand = function () {
                            var superParentIndex = 0;
                            for (var i = 0; i < $rootScope.tree_data[0].children.length; i++) {
                                if (data.superparentId == $rootScope.tree_data[0].children[i].id) {
                                    superParentIndex = i;
                                }
                            }
                            var ParentIndex = 0;
                            for (var i = 0; i < $rootScope.tree_data[0].children[superParentIndex].children.length; i++) {
                                if (data.parentId == $rootScope.tree_data[0].children[superParentIndex].children[i].id) {
                                    ParentIndex = i;
                                }
                            }

                            var id = 0;
                            for (var i = 0; i < $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children.length; i++) {

                                if (data.id == $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children[i].id) {
                                    id = i;

                                }
                            }

                            if ($scope.entity) {
                                $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children[id].title = $scope.entity.commandName;
                                $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children[id].entity = $scope.entity
                            }

                            $uibModalInstance.dismiss('cancel');

                        };

                        $scope.closePopup = function () {
                            $uibModalInstance.dismiss('cancel');
                        };


                        $scope.createTestPlanOptions.onRegisterApi = function (gridApi) {
                            $scope.gridApi = gridApi;
                            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                                $scope.entity = row.entity;
                            });
                            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                            });
                        };

                    }],
                    size: 'md'
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        };

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
            promise2 = testScriptService.fetchVirtualDevices(token, userId);
            promise2.then(
                function (data) {
                    $scope.virtualDeviceGridOptions.data = data;
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
        $scope.createTestPlanService = function () {

            if (!$scope.createTestPlan.jobName) {
                $scope.validateTestPlanData("Please Enter TestPlan Name");
                return 0;
            }
            if (assignVirtualDevice_Data.virtualDeviceVoList.length <= 0) {
                $scope.validateTestPlanData("Please Select Virtual Device");
                return 0;

            }

            var superParentObject, parentObject = {}, childObject = {};
            superParentObject = $rootScope.tree_data[0].children;
            for (var i = 0; i < $rootScope.tree_data[0].children.length; i++) {
                parentObject[i] = $rootScope.tree_data[0].children[i].children;
                childObject[i] = {};
                if ($rootScope.tree_data[0].children[i].children.length <= 0) {
                    $scope.validateTestPlanData(" child's or not existed");
                    return 0;
                }

                for (var j = 0; j < $rootScope.tree_data[0].children[i].children.length; j++) {
                    childObject[i][j] = $rootScope.tree_data[0].children[i].children[j].children;

                    if ($rootScope.tree_data[0].children[i].children[j].children.length <= 0) {
                        $scope.validateTestPlanData(1 + i + "   child Add Command  not existed");
                        return 0;

                    }
                    else if (!$rootScope.tree_data[0].children[i].children[j].children[0].entity) {
                        $scope.validateTestPlanData("Please Select Parameters ");
                        return 0;

                    }
                }
            }
            sendCreateData.jobName = $scope.createTestPlan.jobName;
            sendCreateData.jobCreatedBy = userId;
            sendCreateData.taskVOList = [];
            sendCreateData.taskVOList[0] = {};
            sendCreateData.taskVOList[0].taskName = $rootScope.tree_data[0].title;
            sendCreateData.taskVOList[0].taskLoop = $rootScope.tree_data[0].loop;

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
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r].commandId = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].entity.commandId;
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r].commandSeqNo = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].entity.commandSeqNo;
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r].commandParams = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].entity.commandParams;
                        sendCreateData.taskVOList[0].taskExecutorVOList[p].commandExecutorVOList[q].commandExecutorCommandVOList[r].commandName = childObject[childSuperParentKeys[p]][childParentKeys[q]][childKeys[r]].entity.commandName;
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


            var assignVirtualDevice = function (token, assignVirtualDevice_Data) {

                promise1 = testScriptService.assignVirtualDevice(userId, token, JSON.stringify(assignVirtualDevice_Data));
                promise1.then(
                    function (data) {
                        if (data.status == "success") {
                            $location.path('/CreateTestRun/MappingTestRun');
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


        };
        $scope.testPlanDate = new Date();
        $scope.animationsEnabled = true;

        $rootScope.tree_data = [{
            'loop': 1, 'sequenceNo': 1010101,
            'title': 'Task Plan_name' + new Date(),
            'children': [{
                'id': 1,
                'loop': 1, 'sequenceNo': 1,
                'title': 'Task Executor',
                'ids': [{'id': 1}],
                'children': [{
                    'id': 1, 'loop': 1, 'sequenceNo': 1,
                    'title': 'Command Executor',
                    'ids': [{'id': 1, 'parentId': 1}],
                    'children': [{
                        'id': 1, 'loop': 1, 'sequenceNo': 1,
                        'title': 'Add Command',
                        'ids': [{'id': 1, 'parentId': 1, 'superparentId': 1}]

                    }
                    ]
                }]


            }]
        }];


        $scope.col_defs = [
            {
                field: "ids",
                displayName: " ",
                cellTemplate: "<span>&nbsp;&nbsp;</span> <span ng-repeat='data  in row.branch[col.field]'  > <span   class='glyphicon glyphicon-search' ng-if = 'data.superparentId'   ng-click='cellTemplateScope.click({{data}})'  >  </span> </span>",
                cellTemplateScope: {
                    click: function (data) {
                        var modalInstance = $uibModal.open({
                            animation: $scope.animationsEnabled,
                            templateUrl: 'app/views/myModalContent.html',
                            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                                $scope.createTestPlanOptions = {
                                    enableFiltering: true,
                                    enableRowHeaderSelection: false,
                                    enableRowSelection: true,
                                    multiSelect: false,
                                    columnDefs: [
                                        {field: 'commandName', headerCellClass: $scope.highlightFilteredHeader},
                                        {field: 'commandCategoryType', headerCellClass: $scope.highlightFilteredHeader}
                                    ]
                                };
                                promise = testScriptService.FetchCommands(userId, token);
                                promise.then(
                                    function (data) {
                                        $scope.createTestPlanOptions.data = data;
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                );


                                $scope.addCommand = function () {
                                    var superParentIndex = 0;
                                    for (var i = 0; i < $rootScope.tree_data[0].children.length; i++) {
                                        if (data.superparentId == $rootScope.tree_data[0].children[i].id) {
                                            superParentIndex = i;
                                        }
                                    }
                                    var ParentIndex = 0;
                                    for (var i = 0; i < $rootScope.tree_data[0].children[superParentIndex].children.length; i++) {
                                        if (data.parentId == $rootScope.tree_data[0].children[superParentIndex].children[i].id) {
                                            ParentIndex = i;
                                        }
                                    }

                                    var id = 0;
                                    for (var i = 0; i < $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children.length; i++) {

                                        if (data.id == $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children[i].id) {
                                            id = i;

                                        }
                                    }

                                    if ($scope.entity) {
                                        $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children[id].title = $scope.entity.commandName;
                                        $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children[id].entity = $scope.entity
                                    }

                                    $uibModalInstance.dismiss('cancel');

                                };

                                $scope.closePopup = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };


                                $scope.createTestPlanOptions.onRegisterApi = function (gridApi) {
                                    $scope.gridApi = gridApi;
                                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                                        $scope.entity = row.entity;
                                    });
                                    gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                                    });
                                };

                            }],
                            size: 'md'
                        });

                        modalInstance.result.then(function (selectedItem) {
                            $scope.selected = selectedItem;
                        }, function () {
                            $log.info('Modal dismissed at: ' + new Date());
                        });

                    }
                }
            },

            {
                field: "loop",
                displayName: "Loop",
                cellTemplate: "<span ng-if='row.branch[col.field] != 1010101'> <input  type='number'  min='1'  ng-model='row.branch[col.field]' style='width: 4em' />  </span>"

            },
            {
                field: "sequenceNo",
                displayName: "Seq No",
                cellTemplate: " <span ng-if='row.branch[col.field] != 1010101' > <input type='number' min='1'   ng-model='row.branch[col.field]'  style='width: 4em' /> </span>",
                cellTemplateScope: {
                    click: function (data) {         // this works too: $scope.someMethod;

                    }
                }
            },
            {
                field: "ids",
                displayName: " ",
                cellTemplate: " <a href='#'  ng-if='row.branch[col.field]'>        <span  ng-click='cellTemplateScope.click({{row.branch[col.field]}})'>  <span class='glyphicon glyphicon-plus'></span>  </span>      </a> ",

                cellTemplateScope: {
                    click: function (ids) {


                        if (ids[0].id && !ids[0].parentId && !ids[0].superparentId) {
                            var largeNumber = 0;
                            for (var i = 0; i < $rootScope.tree_data[0].children.length; i++) {
                                for (var j = i + 1; j < $rootScope.tree_data[0].children.length; j++)
                                    if ($rootScope.tree_data[0].children[i].id < $rootScope.tree_data[0].children[j].id) {
                                        largeNumber = $rootScope.tree_data[0].children[j].id;
                                    } else {
                                        largeNumber = $rootScope.tree_data[0].children[i].id;
                                        break;
                                    }
                            }

                            if ($rootScope.tree_data[0].children.length == 1) {
                                largeNumber = $rootScope.tree_data[0].children[0].id
                            }

                            $rootScope.tree_data[0].children.push({
                                'id': largeNumber + 1,
                                'title': 'Task Executor',
                                'loop': 1,
                                'sequenceNo': 1,
                                'ids': [{'id': largeNumber + 1}],
                                'children': [{
                                    'id': 1,
                                    'title': 'Command Executor',
                                    'loop': 1,
                                    'sequenceNo': 1,
                                    'ids': [{'id': 1, 'parentId': largeNumber + 1}],
                                    'children': [{
                                        'id': 1,
                                        'title': 'Add Command',
                                        'loop': 1,
                                        'sequenceNo': 1,
                                        'ids': [{'id': 1, 'parentId': 1, 'superparentId': largeNumber + 1}]
                                    }]
                                }]

                            });
                        }
                        else if (ids[0].id && ids[0].parentId && !ids[0].superparentId) {

                            var parentIndex = 0;
                            for (var i = 0; i < $rootScope.tree_data[0].children.length; i++) {
                                if (ids[0].parentId == $rootScope.tree_data[0].children[i].id) {
                                    parentIndex = i;
                                }
                            }

                            var largeNumber = 0;
                            for (var i = 0; i < $rootScope.tree_data[0].children[parentIndex].children.length; i++) {
                                for (var j = i + 1; j < $rootScope.tree_data[0].children[parentIndex].children.length; j++)
                                    if ($rootScope.tree_data[0].children[parentIndex].children[i].id < $rootScope.tree_data[0].children[parentIndex].children[j].id) {
                                        largeNumber = $rootScope.tree_data[0].children[parentIndex].children[j].id;
                                    } else {
                                        largeNumber = $rootScope.tree_data[0].children[parentIndex].children[i].id;
                                        break;
                                    }
                            }


                            if ($rootScope.tree_data[0].children[parentIndex].children.length == 1) {
                                largeNumber = $rootScope.tree_data[0].children[parentIndex].children[0].id;
                            }

                            $rootScope.tree_data[0].children[parentIndex].children.push({
                                'id': largeNumber + 1, 'title': 'Command Executor', 'loop': 1, 'sequenceNo': 1,
                                'ids': [{'id': largeNumber + 1, 'parentId': ids[0].parentId}],
                                'children': [{
                                    'id': 1, 'title': 'Add Command', 'loop': 1, 'sequenceNo': 1,
                                    'ids': [{'id': 1, 'parentId': largeNumber + 1, 'superparentId': ids[0].parentId}]

                                }]
                            });
                        }

                        if (ids[0].id && ids[0].parentId && ids[0].superparentId) {
                            var superParentIndex = 0;
                            for (var i = 0; i < $rootScope.tree_data[0].children.length; i++) {
                                if (ids[0].superparentId == $rootScope.tree_data[0].children[i].id) {
                                    superParentIndex = i;
                                }
                            }
                            var ParentIndex = 0;
                            for (var i = 0; i < $rootScope.tree_data[0].children[superParentIndex].children.length; i++) {
                                if (ids[0].parentId == $rootScope.tree_data[0].children[superParentIndex].children[i].id) {
                                    ParentIndex = i;
                                }
                            }
                            var largeNumber = 0;
                            for (var i = 0; i < $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children.length; i++) {
                                for (var j = i + 1; j < $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children.length; j++)
                                    if ($rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children[i].id < $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children[j].id) {
                                        largeNumber = $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children[j].id;
                                    } else {
                                        largeNumber = $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children[i].id;
                                        break;
                                    }
                            }

                            if ($rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children.length == 1) {
                                largeNumber = $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children[0].id;
                            }
                            $rootScope.tree_data[0].children[superParentIndex].children[ParentIndex].children.push(
                                {
                                    'id': largeNumber + 1, 'title': 'Add Command', 'loop': 1, 'sequenceNo': 1,
                                    'ids': [{
                                        'id': largeNumber + 1,
                                        'parentId': ids[0].parentId,
                                        'superparentId': ids[0].superparentId
                                    }]
                                });

                        }

                    }
                }
            },

            {
                field: "ids",
                displayName: " ",
                cellTemplate: "  <a href='#'> <span  ng-if='row.branch[col.field]' ng-click='cellTemplateScope.deleteRow({{row.branch[col.field]}})'> <span class='glyphicon glyphicon-minus'></span></span></a> ",

                cellTemplateScope: {
                    deleteRow: function (ids) {

                        if (ids[0].id && !ids[0].parentId && !ids[0].superparentId) {
                            var id = 0;
                            for (var i = 0; i < $rootScope.tree_data[0].children.length; i++) {
                                if ($rootScope.tree_data[0].children[i].id == ids[0].id) {
                                    id = i;
                                    break;
                                }
                            }
                            $rootScope.tree_data[0].children.splice(id, 1);
                        }

                        else if (ids[0].id && ids[0].parentId && !ids[0].superparentId) {
                            var id = 0, parentId = 0;

                            for (var i = 0; i < $rootScope.tree_data[0].children.length; i++) {
                                if ($rootScope.tree_data[0].children[i].id == ids[0].parentId) {
                                    parentId = i;
                                    break;
                                }
                            }
                            for (var i = 0; i < $rootScope.tree_data[0].children[parentId].children.length; i++) {

                                if ($rootScope.tree_data[0].children[id].children[i].id == ids[0].id) {
                                    id = i;
                                    break;
                                }
                            }

                            $rootScope.tree_data[0].children[parentId].children.splice(id, 1);

                        }

                        else if (ids[0].id && ids[0].parentId && ids[0].superparentId) {
                            var id = 0, parentId = 0, superparentId = 0;

                            for (var i = 0; i < $rootScope.tree_data[0].children.length; i++) {
                                if ($rootScope.tree_data[0].children[i].id == ids[0].superparentId) {
                                    superparentId = i;
                                    break;
                                }
                            }
                            for (var i = 0; i < $rootScope.tree_data[0].children[superparentId].children.length; i++) {

                                if ($rootScope.tree_data[0].children[superparentId].children[i].id == ids[0].parentId) {
                                    parentId = i;
                                    break;
                                }
                            }

                            for (var i = 0; i < $rootScope.tree_data[0].children[superparentId].children.length; i++) {
                                if ($rootScope.tree_data[0].children[superparentId].children[i].id == ids[0].parentId) {
                                    parentId = i;
                                    break;
                                }
                            }

                            for (var i = 0; i < $rootScope.tree_data[0].children[superparentId].children[parentId].children.length; i++) {

                                if ($rootScope.tree_data[0].children[superparentId].children[parentId].children[i].id == ids[0].id) {
                                    id = i;
                                    break;
                                }
                            }
                            $rootScope.tree_data[0].children[superparentId].children[parentId].children.splice(id, 1);
                        }
                    }
                }
            }
        ];


        $scope.validateTestPlanData = function (flag) {


            $rootScope.Message = flag;
            $('#MessageColor').css("color", "red");
            $('#MessagePopUp').modal('show');
            $timeout(function () {
                $('#MessagePopUp').modal('hide');
            }, 2000);

        };


    });