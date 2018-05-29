oTech
    .controller(
        'editDraftTestPlan',
        function ($scope, $rootScope, $timeout, $location, AppServices,
                  GraphServices, GraphMaximizeServices, $stateParams,
                  testScriptService, $cookieStore, messages) {
        
            var userId = sessionStorage.getItem("userId");
            var token = sessionStorage.getItem("token");
            $rootScope.role = sessionStorage.getItem("role");
            $scope.name = sessionStorage.getItem("username");
            var usecaselist = [];
            $scope.isAction = false;
            $scope.commandError = false;
            $scope.createTestPlan = {};
            var sendCreateData = {};
            if (messages.length == 1) {
            	var temp = {};
            	$scope.useCaseArray = [];
                for (var i = 0; i < messages[0].length; i++) {
                    if (messages[0][i].key == "testPlanName")
                        $scope.testPlanName = messages[0][i].value;
                    if (messages[0][i].key == "testPlanDescription")
                        $scope.testPlanDescription = messages[0][i].value;
                    if (messages[0][i].key == "treeJson")
                        $scope.taskVOList = messages[0][i].value;
                    if (messages[0][i].key == "usecaseId")
                        temp['id'] = messages[0][i].value;
                    if (messages[0][i].key == "usecaseName")
                        temp['name'] =  messages[0][i].value;
                    if (messages[0][i].key == "jobId")
                        $scope.jobId = messages[0][i].value;
                        
                    }
                $scope.useCaseArray.push(temp);
                $scope.usecaseVal = $scope.useCaseArray[0];
                        
            } else {
                messages.splice(0, 1);
            }

            $scope.setErrorMessage = function (errorMessage) {

                $scope.error = errorMessage;

            }


            window.onresize = function (event) {
                $rootScope.slideContent();
            }
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

            getTreeDataForCommands();
            
            fillTreeDataForCommands();

            $scope.getDashBoardMenu();
            $scope.getFavouriteReports();

            /*Navigate Between Menus*/

            $scope.navigatememus = function (e) {
                if (e.currentTarget.id == "menu1") {
                    $("#plan").addClass("in active");
                    $("#Run").removeClass("in active");
                } else {
                    $("#plan").removeClass("in active");
                    $("#Run").addClass("in active");
                }
            }

            //added for the tree compnent
            $scope.removeNode = function (scope) {
                scope.remove();
            };

            $scope.toggle = function (scope) {
                scope.toggle();
            };


            function getTreeDataForCommands() {
                $scope.dataLoading = true;
                promise = testScriptService.FetchCommandsTree(userId,
                    token);
                promise.then(function (data) {
                    getTreeDataForCommands1(data);
                    $scope.dataLoading = false;

                }, function (err) {
                    console.log(err);
                });
            }
            
            function fillTreeDataForCommands() {
            	            	                 
            	var superParentObject, parentObject = {}, childObject = {};
                            	
                $scope.tree2 = [];
                $scope.tree2[0] = {};
                $scope.tree2[0].id = 1; 
                $scope.tree2[0].title = $scope.taskVOList[0].taskName;
                $scope.tree2[0].nodrop = true ;
                $scope.tree2[0].sequenceNo = 1;
                $scope.tree2[0].loop = $scope.taskVOList[0].taskLoop;
                $scope.tree2[0].nodes = [];
                
                var superParentObjectKeys = $scope.taskVOList[0].taskExecutorVOList;

                for (var i = 0; i < superParentObjectKeys.length; i++) {
                	
                	superParentObject = {};
                	superParentObject.id = (superParentObjectKeys.length + 1) * 10,
                	superParentObject.title = superParentObjectKeys[i].taskExecutorName;
                    superParentObject.loop = superParentObjectKeys[i].taskExecutorLoop;
                    superParentObject.sequenceNo = superParentObjectKeys[i].taskExecutorSeqNo; 
                    superParentObject.nodes=[];
                    
                    var parentObjectKeys = superParentObjectKeys[i].commandExecutorVOList;

                    for (var j = 0; j < parentObjectKeys.length; j++) {
                    
                    	parentObject = {};
                    	parentObject.id = (parentObjectKeys.length + 1) * 100;
                    	parentObject.title = parentObjectKeys[j].commandExecutorName;
                        parentObject.loop = parentObjectKeys[j].commandExecutorLoop;
                        parentObject.sequenceNo = parentObjectKeys[j].commandExecutorSeqNo; 
                        parentObject.nodes=[];
                    	
                    	var childKeys = parentObjectKeys[j].commandExecutorCommandVOList;
                    	
                    	for (var k = 0; k < childKeys.length; k++) {
                    		
                    		childObject = {};
                    		childObject.id = (childKeys.length + 1) * 1000;
                            childObject.commandId = childKeys[k].commandId;
                            childObject.sequenceNo = childKeys[k].commandSeqNo;
                            childObject.commandParams = childKeys[k].commandParams;
                            childObject.title = childKeys[k].commandName;
                            childObject.isCommand = true; 
                            childObject.loop = 1 ;
                            
                            parentObject.nodes.push(childObject);
                    	}
                    	
                    	superParentObject.nodes.push(parentObject);
                    	
                    }
                }
                
                $scope.tree2[0].nodes.push(superParentObject);
                
            }            

            
            $scope.newSubItem = function (scope) {
                var totalPixcelToScroll = "";
                var nodeData = scope.$modelValue;
                if (nodeData.id >= 1 && nodeData.id < 10) {
                    var totalNodes = nodeData.nodes.length;
                    angular.forEach(nodeData.nodes, function (node, index) {
                        totalNodes += node.nodes.length;
                        angular.forEach(node.nodes, function (node, index) {
                            totalNodes += node.nodes.length;

                        });
                    });
                    totalPixcelToScroll = 267 * totalNodes + "px";
                    $('html, body').animate({scrollTop: totalPixcelToScroll}, 800);
                    //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
                    var nodenamePostFix = nodeData.nodes.length + 1;
                    nodeData.nodes
                        .push({
                            "id": (nodeData.nodes.length + 1) * 10,
                            "title": "Task Case #"
                            + nodenamePostFix,
                            "nodrop": true,
                            "sequenceNo": 1,
                            "loop": 1,
                            "nodes": [{
                                "id": (nodeData.nodes.length + 1) * 100,
                                "title": "Command Group",
                                "sequenceNo": 1,
                                "isFirst": true,
                                "loop": 1,
                                "commandId": -1,
                                "nodes": [{
                                    "id": (nodeData.nodes.length + 1) * 1000,
                                    "title": "Add Command",
                                    "sequenceNo": 1,
                                    "isCommand": true,
                                    "loop": 1,
                                    "commandParams": "",
                                    "commandId": 100000,
                                    "nodes": []
                                }]
                            }]
                        });
                }
                if (nodeData.id >= 10 && nodeData.id < 100) {
                    totalPixcelToScroll = 267 * nodeData.nodes.length + "px";
                    $('html, body').animate({scrollTop: totalPixcelToScroll}, 800);
                    //$("html, body").animate({ scrollTopscrollTop: '+=1080px'}, 1000);
                    nodeData.nodes.push({
                        "id": (nodeData.nodes.length + 1) * 100,
                        "title": "Command Group",
                        "sequenceNo": 1,
                        "loop": 1,
                        "commandId": -1,
                        "nodes": [{
                            "id": (nodeData.nodes.length + 1) * 1000,
                            "title": "Add Command",
                            "sequenceNo": 1,
                            "isCommand": true,
                            "loop": 1,
                            "commandParams": "",
                            "commandId": 100000,
                            "nodes": []
                        }]
                    });
                }

                if (nodeData.id >= 100) {
                    totalPixcelToScroll = 267 * nodeData.nodes.length + "px";
                    ;
                    $('html, body').animate({scrollTop: totalPixcelToScroll}, 800);
                    nodeData.nodes.push({
                        "id": (nodeData.nodes.length + 1) * 1000,
                        "title": "Add Command",
                        "sequenceNo": 1,
                        "isCommand": true,
                        "loop": 1,
                        "commandParams": "",
                        "commandId": 100000,
                        "nodes": []
                    });
                }
            };
            function getTreeDataForCommands1(data) {
                $scope.commandCategoryList = data;
            }

            $scope.onCategoryChange = function (commands) {
                $scope.commands = commands;

            }
            if ($scope.tree2 == "" || $scope.tree2 == undefined) {
                $scope.tree2 = [{
                    "id": 1,
                    "title": 'Test Plan name',
                    "nodrop": true,
                    "sequenceNo": 1,
                    "loop": 1,
                    "nodes": [{
                        "id": 10,
                        "title": "Task Case #1",
                        "nodrop": true,
                        "sequenceNo": 1,
                        "loop": 1,
                        "nodes": [{
                            "id": 100,
                            "title": "Command Group",
                            "sequenceNo": 1,
                            "loop": 1,
                            "isFirst": true,
                            "commandId": -1,
                            "nodes": [{
                                "id": 1000,
                                "title": "Add Command",
                                "sequenceNo": 1,
                                "isCommand": true,
                                "loop": 1,
                                "commandParams": "",
                                "commandId": 100000,
                                "nodes": []
                            }]
                        }]
                    }]
                }];
            }


            //Test plan table Service
            promise = testScriptService.FetchingTestService(userId,
                token);
            promise.then(function (data) {/*
             $scope.dataLoading = true;
             $(".btn-info").addClass("disabled");
             $scope.totalRecords = data.length;
             allOfTheData = data;
             $scope.TestPlanOptions.data = data.slice(0,
             $scope.itemsPerPage);
             $scope.dataLoading = false;
             sessionStorage.setItem('TestplanId', data.testplanId);
             //Fetching test plans
             $(".btn-info").removeClass("disabled");

             */
            }, function (err) {
                console.log(err);
            });


            $scope.optionsTree1 = {
                accept: function (sourceNodeScope, destNodesScope,
                                  destIndex) {

                    return true;

                },

                dragStart: function (event) {
                    $scope.isFirstNode = false;
                }
            };
            $scope.isFirstNode = false;
            $scope.optionsTree2 = {

                accept: function (sourceNodeScope, destNodesScope,
                                  destIndex) {
                    $scope.err = false;
                    $scope.jobIsExitsError = false;
                    if (destNodesScope.$modelValue[0].title == "Add Command") {
                        $scope.isFirstNode = true;
                    }

                    if (destNodesScope.$modelValue[0].commandId >= 0
                        && sourceNodeScope.$modelValue.commandId) {
                        if (destNodesScope.$modelValue[0].title == "Add Command"
                            && destNodesScope.$modelValue.length == 1) {
                            destNodesScope.$modelValue[0].title = sourceNodeScope.$modelValue.title;
                            destNodesScope.$modelValue[0].commandParams = sourceNodeScope.$modelValue.commandParams;
                            destNodesScope.$modelValue[0].commandId = sourceNodeScope.$modelValue.commandId;
                            return false;
                        } else if (destNodesScope.$modelValue.length == 1
                            && destNodesScope.$modelValue[0].title != "Add Command"
                            && !$scope.isFirstNode) {

                            return true;
                        } else if (destNodesScope.$modelValue.length > 1) {

                            return true;
                        }
                    } else {
                        return false;
                    }

                },

                dropped: function (event) {

                },
                beforeDrop: function (event) {
                    $scope.isFirstNode = false;
                },

                removed: function (node) {
                    var test = node;
                }

            };

            $scope.test = function (scope) {

                var test = scope;
            };

            $("#mySel").select2({});


            //feching usecase list
            promise = testScriptService.fetchingUseCaseService(userId,
                token);
            promise.then(function (data) {
                $scope.dataLoading = true;
                $(".btn-info").addClass("disabled");
                $scope.useCaseArray = [];
                $.map(data, function (n, i) {
                    var temp = {};
                    temp['id'] = i;
                    temp['name'] = n;
                    $scope.useCaseArray.push(temp);
                });
                $scope.usecases = $scope.useCaseArray;
                if ($scope.usecaseVal == "" || $scope.usecaseVal == undefined)
                    $scope.usecaseVal = $scope.useCaseArray[0];

                $scope.dataLoading = false;
                $(".btn-info").removeClass("disabled");
            }, function (err) {
                $scope.dataLoading = false;
                console.log(err);
            });
       

            $scope.createTestPlanService = function () {
                $scope.err = false;
                //$rootScope.uiTreeJSON = $scope.tree2;
                $scope.shareData = [];
                $scope.shareData.push({'key': 'treeJson', 'value': $scope.tree2});
                $scope.shareData.push({'key': 'testPlanName', 'value': $scope.testPlanName});
                $scope.shareData.push({'key': 'testPlanDescription', 'value': $scope.testPlanDescription});
                $scope.shareData.push({'key': 'usecase', 'value': $scope.usecaseVal});
                $scope.shareData.push({'key': 'jobId', 'value': $scope.jobId});
                $scope.shareData.push({'key': 'action', 'value': 'editDraft'});
                if (messages.length == 1) {
                    messages.splice(0, 1);
                }

                messages.add($scope.shareData);
                $(".btn").addClass("disabled");
                sendCreateData.jobName = $scope.testPlanName;
                sendCreateData.jobId = $scope.jobId;
                var superParentObject, parentObject = {}, childObject = {};
                superParentObject = $scope.tree2[0].nodes;
                for (var i = 0; i < $scope.tree2[0].nodes.length; i++) {
                    parentObject[i] = $scope.tree2[0].nodes[i].nodes;
                    childObject[i] = {};
                    if ($scope.tree2[0].nodes[i].nodes.length <= 0) {
                        $scope.err = true;
                        return false;
                    }

                    for (var j = 0; j < $scope.tree2[0].nodes[i].nodes.length; j++) {
                        childObject[i][j] = $scope.tree2[0].nodes[i].nodes[j].nodes;

                        if ($scope.tree2[0].nodes[i].nodes[j].nodes.length <= 0) {
                            $scope.dataProcessing = false;
                            $(".btn").removeClass("disabled");
                            $scope.err = true;
                            return false;

                        } else if ($scope.tree2[0].nodes[i].nodes[j].nodes[0].title == "Add Command") {
                            $scope.dataProcessing = false;
                            $(".btn").removeClass("disabled");
                            $scope.err = true;
                            return false;

                        }
                    }
                }
                
                $location.path('/dashboard/createTestPlanFinal');

            }

            $scope.scrollTreeDown = function (id) {

                var wtf = $('#' + id);
                var height = wtf[0].scrollHeight;
                wtf.scrollTop(height);
            }

            $scope.copyToTestPlanName = function () {
                $scope.tree2[0].title = $scope.testPlanName;
            };

            $scope.selectTab = function (event) {
                if (event == 'Test Plan') {
                    $location.path('/dashboard/testScript');
                }
                if (event == 'Test Run') {
                    $cookieStore.remove('TestPLANId');
                    $location.path('/Schedule');
                }
            }

        });