
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

        $scope.testPlanGo = function () {

            if ($scope.radioValue == "createTestPlan") {
                $location.path('/dashboard/testScript/createTestPlan');

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
		 promise = testScriptService.FetchCommandsTree(userId, token);
			promise.then(
				function (data) {
					getTreeDataForCommands1(data);

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
						 "nodes": []
					  }
					]
				});
			}
			if(nodeData.id >=10 && nodeData.id< 100){
			 nodeData.nodes.push({ "id": (nodeData.nodes.length+1)*100,
				"title": "Command Executor",
				"sequenceNo":1,
				"loop":1,
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
						 "nodes": []
					  }
					]
				}]
      }];
	  
	  
	     
	   
});

	
		
		
    


