
oTech.controller('testScriptController',
    function ($scope, $rootScope, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, uiGridConstants, $cookieStore) {
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
    });


