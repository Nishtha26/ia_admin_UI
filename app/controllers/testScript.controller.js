
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
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [
                {name:'Id',field: 'testplanId', headerCellClass: $scope.highlightFilteredHeader},
                {name:'Name',field: 'testplanName', headerCellClass: $scope.highlightFilteredHeader},
                {name:'Use Case',field: 'useCaseName', headerCellClass: $scope.highlightFilteredHeader},
            	{name:'Created Date',field: 'createdDate', headerCellClass: $scope.highlightFilteredHeader},
				{name:'Created By',field: 'createdByName', headerCellClass: $scope.highlightFilteredHeader},
			
            ]
        };

        //Row selection
        $scope.TestPlanOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
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
                promise = testScriptService.getTestplan(token, userId, TestPlanId);
                promise.then(
                    function (data) {
                        $scope.treedata = data.jobVO;
						$rootScope.uiTreeJSON = data.jobVO;
                        $cookieStore.put('uiTreeJSON', $rootScope.uiTreeJSON);
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
									if(destNodesScope.$modelValue[0].commandId >= 0 && sourceNodeScope.$modelValue.commandId){
										if(destNodesScope.$modelValue[0].title == "Add Command"){
										destNodesScope.$modelValue[0].title = sourceNodeScope.$modelValue.title;
										destNodesScope.$modelValue[0].commandParams = sourceNodeScope.$modelValue.commandParams;
										destNodesScope.$modelValue[0].commandId = sourceNodeScope.$modelValue.commandId;
										return false;
										}else if(destNodesScope.$modelValue[0].commandId != sourceNodeScope.$modelValue.commandId){
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
							
		
	   
});

	
		
		
    


