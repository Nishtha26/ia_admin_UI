
oTech.controller('testScriptController',
    function ($scope, $rootScope,$timeout, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, uiGridConstants, $cookieStore) {
        var userId = sessionStorage.getItem("userId");
        var token = sessionStorage.getItem("token");
        $rootScope.role = sessionStorage.getItem("role");
        $scope.radioValue = 'createTestPlan';
        $scope.content = 'Create Test Run';
        $scope.testplan_name = $cookieStore.get('TestPlan_Name');
        $scope.TestRunName = $cookieStore.get('TestRunName');
        $rootScope.role = sessionStorage.getItem("role");
        console.log('Role: '+$rootScope.role)
		var usecaselist = [];
		$scope.isAction = false;
		$scope.commandError=false;
		$scope.createTestPlan = {};
        var sendCreateData = {};
		if($.cookie("testPlanName") != undefined && $.cookie("testPlanDescription") != undefined && $.cookie("usecaseId") != undefined){
				$scope.testPlanName = $.cookie("testPlanName");
				$scope.testPlanDescription = $.cookie("testPlanDescription");
				$scope.usecaseVal = $.cookie("usecaseId");
		}else{
			$scope.usecaseVal= "1";
		}

        //To remove cookies on go
        $scope.removeCookies = function () {
            $cookieStore.remove('TestPlan_Name');
        }
        var testrun;
        $rootScope.slideContent();
        $scope.createTestPlan = " ";
        $scope.editTestPlan = " ";
//            var cmd = ' ';

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
		
		getTreeDataForCommands();
		

	 $scope.createTestPlan = function() {
						$cookieStore.remove('testPlanName');
						$cookieStore.remove('testPlanDescription');
						$cookieStore.remove('usecaseId');
						$cookieStore.remove('usecaseDescription');
						$rootScope.testPlanName = "";
						$rootScope.testPlanDescription = "";
						$rootScope.usecaseId = '';
						$.removeCookie('testPlanName');
						$.removeCookie('usecaseId');
						$.removeCookie('testPlanDescription');

						$location.path('/dashboard/initiateTestPlan');
		}
		
		$scope.planTest = function () {
		
				if (!$scope.testPlanName) {
				$scope.dataProcessing = false;
				$(".btn-info").removeClass("disabled");
                $scope.validateTestPlanData("Please Enter TestPlan Name");
                return 0;
				}else{
					$rootScope.testPlanName=$scope.testPlanName;
					$.cookie("testPlanName", $scope.testPlanName);
					$rootScope.usecaseId=$scope.usecaseVal;
					$.cookie("usecaseId", $scope.usecaseVal);
					//$rootScope.usecaseDescription=$scope.usecaseList.label;
					//$.cookie("usecaseDescription", $scope.usecaseList.label);
					$rootScope.testPlanDescription=$scope.testPlanDescription;
					$.cookie("testPlanDescription", $scope.testPlanDescription);
				}
				
				
			
                $location.path('/dashboard/initiateTestPlan/createTestPlan');

        }
		
		$scope.validateTestPlanData = function (flag) {


            $rootScope.Message = flag;
            $('#MessageColor').css("color", "red");
            $('#MessagePopUp').modal('show');
            $timeout(function () {
                $('#MessagePopUp').modal('hide');
            }, 2000);

        };
		
		$scope.SelectTesplanEdit = function () {
            console.log($rootScope.Row)
            if ($rootScope.Row != null && $rootScope.isMappedTestPlanTestRun == "notExist") {
                $location.path('/dashboard/testScript/EditTestplan/EditCommandParameters')
            }
            else if($rootScope.isMappedTestPlanTestRun == "isExist"){
                $rootScope.Message = "You can't edit, Test Plan having Test Runs!!";
                $('#MessageColor').css("color", "red");
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            } else {
                $rootScope.Message = "Please Select Testplan";
                $('#MessageColor').css("color", "red");
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }

        }
		
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
		$scope.createTestRunNext = function () {
            if ($rootScope.RowCreateTestrun) {
                $location.path('/CreateTestRun/MappingTestRun/MappingDevices');
            } else {
                $rootScope.Message = "Please Select Test Plan";
                $('#MessageColor').css("color", "red");
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }
        }
		$scope.scheduleTestRun = function(){
			$cookieStore.remove('TestPLANId');
			$location.path('/Schedule');
		}
		
		

        $scope.testPlanGo = function () {

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
		
		$scope.testRunEdit = function () {
			cookieStore.put('TestRuId', "");
           $location.path('/TestRunSelect');
        }
		
		$scope.testScript = function () {

           $location.path('/dashboard/testScript');
        }
		
		$scope.testPlanGo = function () {

            if ($scope.radioValue == "createTestPlan") {
                $location.path('TestRunSelect');

            } else {
                $location.path('/dashboard/testScript/EditTestplan');
            }
        }
		
		$scope.quickRun = function () {
               $location.path('/dashboard/quickRun');
        }

        $scope.testRunGo = function () {

            if ($scope.content == 'Edit Test Run') {
                $location.path('/TestRunSelect');
            }
            if ($scope.content == 'Schedule Test Run') {

                $location.path('/Schedule');
            }
            if ($scope.content == 'Create Test Run') {
                $location.path('/CreateTestRun');
            }
			 else if ($scope.content == "Quick Run") {
                $location.path('/dashboard/quickRun');
            }
        }

        $scope.go = function () {
            if (document.getElementById('runtest').checked) {
                testrun = document.getElementById('runtest').value;

            }
            if (document.getElementById('Schedule').checked) {
                testrun = document.getElementById('Schedule').value;

            }
            if (document.getElementById('Quick').checked) {
                testrun = document.getElementById('Quick').value;

            }
            if ($scope.content == "Schedule Test Run") {
                $location.path('/CreateTestRun/MappingTestRun/MappingDevices/TestRunSelect/editCommandParameters/TestRunforTestplans/TestRunSchedule');
            }
            if ($scope.content == "Edit Test Run") {
                $location.path('/CreateTestRun/MappingTestRun/MappingDevices/TestRunSelect');
            } else if (testrun == "Quick Run") {
                $location.path('/dashboard/quickRun');
            } else {

                $location.path('/dashboard/testScript/createTestRun');
            }
        }
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

        $scope.create = function () {

            $location.path('/dashboard/testScript/create')
        };

        $scope.commandParameters_next = function () {
            $location.path('/dashboard/testScript/commandParameters')
        }

        $scope.editTestplans = function () {
            $location.path('/dashboard/testScript/editTestRun');
        }
		
		
		
		

	//added for the tree compnent
		$scope.remove = function (scope) {
        scope.remove();
      };

      $scope.toggle = function (scope) {
        scope.toggle();
      };
	  
	  function getTreeDataForCommands() {
		  $scope.dataLoading = true;
		 promise = testScriptService.FetchCommandsTree(userId, token);
			promise.then(
				function (data) {
					getTreeDataForCommands1(data);
					$scope.dataLoading = false;

				},
				function (err) {
					console.log(err);
				}
			);
		}

	  $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
		if(nodeData.id >=1 && nodeData.id< 10){
			 nodeData.nodes.push({
				 "id": (nodeData.nodes.length+1)*10,
					"title": "Task Executor",
					"nodrop": true,
					"sequenceNo":1,
					"loop":1,
					"nodes": [
					  {
						"id": (nodeData.nodes.length+1)*100,
						"title": "Command Executor",
						"sequenceNo":1,
						"loop":1,
						"commandId":-1,
						 "nodes": [{
						"id": (nodeData.nodes.length+1)*1000,
						"title": "Add Command",
						"sequenceNo":1,
						"loop":1,
						"commandParams":"",
						"commandId":100000,
						 "nodes": []
					  }]
					  }
					]
				});
			}
			if(nodeData.id >=10 && nodeData.id < 100){
			 nodeData.nodes.push({ "id": (nodeData.nodes.length+1)*100,
				"title": "Command Executor",
				"sequenceNo":1,
				"loop":1,
				"commandId":-1,
				"nodes": [{
						"id": (nodeData.nodes.length+1)*1000,
						"title": "Add Command",
						"sequenceNo":1,
						"loop":1,
						"commandParams":"",
						"commandId":100000,
						 "nodes": []
					  }]
				});
			}
			
			if(nodeData.id >= 100){
			 nodeData.nodes.push({
						"id": (nodeData.nodes.length+1)*1000,
						"title": "Add Command",
						"sequenceNo":1,
						"loop":1,
						"commandParams":"",
						"commandId":100000,
						 "nodes": []
					  });
			}
      };
function getTreeDataForCommands1(data){
	$scope.tree1 = data;
}
      
	  $rootScope.tree2 = [{
        "id": 1,
        "title": 'Task Plan_name ' + new Date(),
		"nodrop": true,
		"sequenceNo":1,
		"loop":1,
        "nodes": [{
				"id": 10,
				"title": "Task Executor",
				"nodrop": true,
				"sequenceNo":1,
				"loop":1,
				"nodes": [
					  {
						"id": 100,
						"title": "Command Executor",
						"sequenceNo":1,
						"loop":1,
						"commandId":-1,
						 "nodes": [{
						"id": 1000,
						"title": "Add Command",
						"sequenceNo":1,
						"loop":1,
						"commandParams":"",
						"commandId":100000,
						 "nodes": []
					  }]
					  }
					]
				}]
      }];
	  

		$scope.TestPlanOptions = {
            enableFiltering: true,
            enableRowHeaderSelection: false,
            enableRowSelection: false,
            multiSelect: false,
			enableVerticalScrollbar :0,
			enableHorizontalScrollbar:0,
            columnDefs: [
                         {name:'Id',field: 'testplanId', headerCellClass: $scope.highlightFilteredHeader,headerCellClass: $scope.highlightFilteredHeader},
                         {name:'Name',field: 'testplanName',headerCellClass: $scope.highlightFilteredHeader},
                         {name:'Use Case',field: 'useCaseName', headerCellClass: $scope.highlightFilteredHeader},
                     	{name:'Created Date',field: 'createdDate', headerCellClass: $scope.highlightFilteredHeader},
         				{name:'Created By',field: 'createdByName', headerCellClass: $scope.highlightFilteredHeader,},
         				  /* {name:'Action', enableRowSelection: false, headerCellClass: $scope.highlightFilteredHeader, cellTemplate:
                            '<a href="" ng-click="grid.appScope.viewTestPlanTestRun({{row.entity.testplanId}})">View Test Runs</a>'},*/
         				   {name:'Take Action', enableRowSelection: false, headerCellClass: $scope.highlightFilteredHeader, cellTemplate:
                            '<select class="btn btn-default btn-xs btn-group dropdown" style=" border-color: #eaeaea;" ng-model="actions" ng-change="grid.appScope.update(this,row)">'+
         					  '<option value="">Action</option>' +
         					  '<option value="{{row.entity.testplanId}}-View">View Test Runs</option>'+
         					  '<option value="{{row.entity.testplanId}}-Create">Create Test Run</option>'+
         					  '<option value="{{row.entity.testplanId}}-Edit">Edit Test Plan</option> '+
         					  '<option value="{{row.entity.testplanId}}-Clone">Clone Test Plan</option> '+
         					'</select>'},
         			
                     ]
        };

        //Row selection
        $scope.TestPlanOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
				if($scope.isAction){
					$scope.dataLoading = true;
					row.isSelected = false;
					$scope.isAction = false;
					$cookieStore.put('TestPLANId', row.entity.testplanId);
			promise = testScriptService.getTestRuns(token, row.entity.testplanId, userId);
			promise.then(
				function (data) {
					if(data.status == 'No TestRun Exists' || data.testRunsForTestPlan.length == 0){
					$rootScope.Message = "No Test Run Exists";
					$('#MessageColor').css("color", "red");
					$('#MessagePopUp').modal('show');
					$timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
				$scope.dataLoading = false;
					}else{
						$rootScope.getTestRuns = data.testRunsForTestPlan;
						$location.path('/Schedule');
					}
					
				},
				function (err) {
					console.log(err);
				}
			);
					
				}else{
				$scope.dataProcessing = true;
				$(".btn-info").addClass("disabled");
                $rootScope.RowCreateTestrun = row.entity;
                var TestPlanId = row.entity.testplanId;

                $cookieStore.put('TestPLANId', TestPlanId);
                $rootScope.TestplanId = row.entity.testplanId;
                $cookieStore.put('TestPLANId', row.entity.testplanId);

                $scope.testplan_name = row.entity.testplanName;
				$scope.testplan_name1 = row.entity.testplanName;
                $cookieStore.put('TestplanName', row.entity.testplanName);


//                    var TestPlanId = $cookieStore.get('selected_testplanid');
                $cookieStore.put('TestPlan_Name', $scope.testplan_name);
//                    $cookieStore.remove('selected_testplanid');
				$rootScope.Row = row.entity;

                $scope.testplanId_selected = $cookieStore.get('selected_testplanid');
                var msg = 'row selected ' + row.isSelected;
                //Calling getTestplan service and looping data as tree structure
				if(row.isSelected){
                promise = testScriptService.getTestplan(token, userId, TestPlanId);
                promise.then(
                    function (data) {
                        $scope.treedata = data.jobVO;
						$rootScope.uiTreeJSON = data.jobVO;
						if(data.isMappedTestPlanTestRun.length > 0){
						$rootScope.isMappedTestPlanTestRun = data.isMappedTestPlanTestRun[0].isMappedTestPlanTestRun;
						}
                        $cookieStore.put('uiTreeJSON', $rootScope.uiTreeJSON);
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
                    },
                    function (err) {
                        console.log(err);
                    }
                );
				}
				}


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
				$scope.dataLoading = true;
				$(".btn-info").addClass("disabled");
				$scope.totalRecords = data.length;
				allOfTheData = data;
				$scope.TestPlanOptions.data = data.slice( 0, $scope.itemsPerPage);
				$scope.dataLoading = false;
                sessionStorage.setItem('TestplanId', data.testplanId);
                //Fetching test plans
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

        $scope.testplan_name = $cookieStore.get('TestPlan_Name');
		
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
							
							$scope.optionsTree1 = {
							   accept: function(sourceNodeScope, destNodesScope, destIndex) {
								   
									   return true;
								   
									
								}
							};
							
							$scope.optionsTree2 = {
							   accept: function(sourceNodeScope, destNodesScope, destIndex) {
								   $scope.commandError=false;
									if(destNodesScope.$modelValue[0].commandId >= 0 && sourceNodeScope.$modelValue.commandId){
										if(destNodesScope.$modelValue[0].title == "Add Command"){
										destNodesScope.$modelValue[0].title = sourceNodeScope.$modelValue.title;
										destNodesScope.$modelValue[0].commandParams = sourceNodeScope.$modelValue.commandParams;
										destNodesScope.$modelValue[0].commandId = sourceNodeScope.$modelValue.commandId;
										return false;
										}else if(destNodesScope.$modelValue[0].commandId != sourceNodeScope.$modelValue.commandId){
											$scope.scrollTreeDown("scroll_commands");
										return true;
										}
									}else{
										return false;
									}
									
									
								}
							};
							
							$scope.test = function (scope) {

								//alert(scope);
							};
							
							 //feching usecase list
							promise = testScriptService.fetchingUseCaseService(userId, token);
							promise.then(
								function (data) {
									$scope.dataLoading = true;
									$(".btn-info").addClass("disabled");
									
									$scope.usecases=data;
									$scope.dataLoading = false;
									$(".btn-info").removeClass("disabled");
								},
								function (err) {
									$scope.dataLoading = false;
									console.log(err);
								}
							);
		
		$scope.createCloneTestPlan = function () {
            if ($rootScope.TestplanId != undefined) {
				$scope.dataProcessing = true;
				$(".btn-info").addClass("disabled");
				promise = testScriptService.createCloneTestplan(token, userId, $rootScope.TestplanId);
                promise.then(
                    function (data) {
						$scope.totalRecords = data.length;
						allOfTheData = data;
						$scope.TestPlanOptions.data = [];
						$scope.TestPlanOptions.data = data.slice( 0, $scope.itemsPerPage);
						$scope.dataProcessing = false;
						sessionStorage.setItem('TestplanId', data.testplanId);
						//Fetching test plans
						$(".btn-info").removeClass("disabled");
                    },
                    function (err) {
                        console.log(err);
                    }
                );
                
            } else {
                $rootScope.Message = "Please Select Test Plan";
                $('#MessageColor').css("color", "red");
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }
        }
		
		$scope.viewTestPlanTestRun = function (TestPlanId) {
			$scope.isAction = true;
			
		}
		
		$scope.createTestPlanService = function () {
			if($scope.createtestplan.$valid){
			$scope.dataProcessing = true;
			$(".btn-info").addClass("disabled");
			$rootScope.uiTreeJSON = $scope.tree2;
		var vd = ["VD1" , "VD2" , "VD3" , "VD4" , "VD5" , "VD6" , "VD7" , "VD8" , "VD9" , "VD10"];
			var assignVirtualDevice_Data = {};
		assignVirtualDevice_Data.virtualDeviceVoList = [];
			
			for(var i=0; i< $scope.noOfVirtualDevice ; i++){
				 assignVirtualDevice_Data.virtualDeviceVoList.push({"name": vd[i]});
			}
            if ($scope.testPlanName == "" || $scope.testPlanName == undefined) {
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
            superParentObject = $scope.tree2[0].nodes;
            for (var i = 0; i < $scope.tree2[0].nodes.length; i++) {
                parentObject[i] = $scope.tree2[0].nodes[i].nodes;
                childObject[i] = {};
                if ($scope.tree2[0].nodes[i].nodes.length <= 0) {
                    $scope.validateTestPlanData(" child's or not existed");
                    return 0;
                }

                for (var j = 0; j < $scope.tree2[0].nodes[i].nodes.length; j++) {
                    childObject[i][j] = $scope.tree2[0].nodes[i].nodes[j].nodes;

                    if ($scope.tree2[0].nodes[i].nodes[j].nodes.length <= 0) {
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
                        $scope.validateTestPlanData(1 + i + "   child Add Command  not existed");
                        return 0;

                    }
                    else if ($scope.tree2[0].nodes[i].nodes[j].nodes[0].title == "Add Command") {
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
						$("#command_error").text("Please Add Commands !!!")
						$scope.commandError=true;
						
                      //  $scope.validateTestPlanData("Please Add Commands !!!");
                        return 0;

                    }
                }
            }
            sendCreateData.jobName = $scope.testPlanName;
			sendCreateData.jobDescription = $scope.testPlanDescription;
            sendCreateData.jobCreatedBy = userId;
            sendCreateData.taskVOList = [];
            sendCreateData.taskVOList[0] = {};
            sendCreateData.taskVOList[0].taskName = $scope.tree2[0].title;
            sendCreateData.taskVOList[0].taskLoop = $scope.tree2[0].loop;
			sendCreateData.taskVOList[0].useCaseId = $scope.usecaseVal;
			$rootScope.usecaseId=$scope.usecaseVal;
			$.cookie("usecaseId", $scope.usecaseVal);

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
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
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
			else{
				  $scope.createtestplan.submitted=true;  
			}
		}						
		$scope.update = function(selectedContext,row) {
			var viewAction = row.entity.testplanId+"-View";
			var createAction = row.entity.testplanId+"-Create";
			var editAction = row.entity.testplanId+"-Edit";
			var cloneAction = row.entity.testplanId+"-Clone";
			if(viewAction == selectedContext.actions){
				$scope.dataProcessing = true;
			$cookieStore.put('TestPLANId', row.entity.testplanId);
			$(".btn-info").addClass("disabled");
			promise = testScriptService.getTestRuns(token, row.entity.testplanId, userId);
			promise.then(
				function (data) {
					if(data.status == 'No TestRun Exists' || data.testRunsForTestPlan.length == 0){
					$rootScope.Message = "No Test Run Exists";
					$('#MessageColor').css("color", "red");
					$('#MessagePopUp').modal('show');
					$timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
				$scope.dataProcessing = false;
				$(".btn-info").removeClass("disabled");
					}else{
						$rootScope.getTestRuns = data.testRunsForTestPlan;
						$location.path('/Schedule');
					}
					
				},
				function (err) {
					console.log(err);
				}
			);
			}
			if(createAction == selectedContext.actions){
				$rootScope.RowCreateTestrun = row.entity;
                $location.path('/CreateTestRun/MappingTestRun/MappingDevices');
			}
			if(editAction == selectedContext.actions){
				$scope.dataProcessing = true;
				$(".btn-info").addClass("disabled");
                $rootScope.RowCreateTestrun = row.entity;
                var TestPlanId = row.entity.testplanId;

                $cookieStore.put('TestPLANId', TestPlanId);
                $rootScope.TestplanId = row.entity.testplanId;
                $cookieStore.put('TestPLANId', row.entity.testplanId);

                $scope.testplan_name = row.entity.testplanName;
				$scope.testplan_name1 = row.entity.testplanName;
                $cookieStore.put('TestplanName', row.entity.testplanName);

                $cookieStore.put('TestPlan_Name', $scope.testplan_name);
				$rootScope.Row = row.entity;

                promise = testScriptService.getTestplan(token, userId, TestPlanId);
                promise.then(
                    function (data) {
                        $scope.treedata = data.jobVO;
						$rootScope.uiTreeJSON = data.jobVO;
						if(data.isMappedTestPlanTestRun.length > 0){
						$rootScope.isMappedTestPlanTestRun = data.isMappedTestPlanTestRun[0].isMappedTestPlanTestRun;
						}
                        $cookieStore.put('uiTreeJSON', $rootScope.uiTreeJSON);
						$scope.dataProcessing = false;
						$(".btn-info").removeClass("disabled");
					   if ($rootScope.isMappedTestPlanTestRun == "notExist") {
							$location.path('/dashboard/testScript/EditTestplan/EditCommandParameters')
						}
						else if($rootScope.isMappedTestPlanTestRun == "isExist"){
							$rootScope.Message = "You can't edit, Test Plan having Test Runs!!";
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
			
			if(cloneAction == selectedContext.actions){
				$scope.dataProcessing = true;
				$(".btn-info").addClass("disabled");
				promise = testScriptService.createCloneTestplan(token, userId, row.entity.testplanId);
                promise.then(
                    function (data) {
						$scope.totalRecords = data.length;
						allOfTheData = data;
						$scope.TestPlanOptions.data = [];
						$scope.TestPlanOptions.data = data.slice( 0, $scope.itemsPerPage);
						$scope.dataProcessing = false;
						sessionStorage.setItem('TestplanId', data.testplanId);
						//Fetching test plans
						$(".btn-info").removeClass("disabled");
                    },
                    function (err) {
                        console.log(err);
                    }
                );
				
			}
			
		}
		
		$scope.scrollTreeDown=function(id){
			
			var wtf = $('#'+id);
		    var height = wtf[0].scrollHeight;
		    wtf.scrollTop(height);
		}
	   
});

	
		
		
    


