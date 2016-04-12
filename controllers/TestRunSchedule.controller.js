oTech.controller('TestRunScheduleController',
    function ($scope, $rootScope, $timeout, $location, AppServices, GraphServices, GraphMaximizeServices, $stateParams, testScriptService, uiGridConstants, $cookieStore) {

        var userId = sessionStorage.getItem('userId');
        var token = sessionStorage.getItem('token');
        var TestPlanId = $cookieStore.get('TestPLANId');
        $scope.testplanname = sessionStorage.getItem("TestPlan_Name");
        var TestPlanId = $cookieStore.get('TestPLANId');
        $scope.TestPlanId = TestPlanId;
        $scope.testRunName = $cookieStore.get('TestRunName');
        $scope.jobTemplateDescription = $cookieStore.get('TestRunDescription');
        console.log("description: " + $scope.jobTemplateDescription)
        var deviceId = $cookieStore.get('JobDeviceId');
        $scope.testplan_name = $cookieStore.get('TestPlan_Name');
        $scope.TestRunName = $cookieStore.get('TestRunName');
        $scope.VirtualSelectedName = $cookieStore.get('VirtualDeviceNamesel')
        $scope.TestplanName = $cookieStore.get('TestplanName');
        var testRunID = $cookieStore.get('TestRunId');

        $rootScope.role = sessionStorage.getItem("role");
  $rootScope.slideContent();
    window.onresize = function(event) {
        $rootScope.slideContent();
    };  

    /*
        To get dashboard menu data
    */
    $scope.getDashBoardMenu = function(){
        if($rootScope.menuData == undefined){
            $rootScope.getMenuData();
        }
    }
    /*
        To get favourite reports
    */
    $scope.getFavouriteReports = function(){
        if($rootScope.Favourites == undefined){
            $rootScope.getFavouriteReports();
        }
    }

    $scope.getDashBoardMenu();
    $scope.getFavouriteReports();

    
        $scope.stop = function () {
            var ScheduleData = JSON.stringify({
                "jobId": testRunID,
                "jobName": $scope.testRunName,
                "jobDescription": $scope.jobTemplateDescription,
                "jobCreatedBy": userId,
//                    "jobStartDate": $scope.StartDate,
                "jobStartDateTime": $scope.Datendtime,
                "jobEndDate": $scope.EndDate,
                "recurrence": $scope.recurrence,
                "deviceId": deviceId,
                "operation": "stop",
            })
            console.log(ScheduleData);
            promise = testScriptService.Schedule(ScheduleData, userId, token);
            promise.then(
                function (data) {
                    console.log('schedule');
                    console.log(data);
                    if (data.status == "error") {

                        $rootScope.Message = "Error occured during Test run stop ";

                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
                    }

                    if (data.status == "success") {

                        $rootScope.Message = " Test run stopped successfully ";

                        $('#MessageColor').css("color", "green");
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

        $scope.schedule = function () {
            var ScheduleData = JSON.stringify({
                "jobId": testRunID,
                "jobName": $scope.testRunName,
                "jobDescription": $scope.jobTemplateDescription,
                "jobCreatedBy": userId,
                "jobStartDate": "2016-02-08",
                "jobStartDateTime": $scope.Datendtime,
//                    "jobStartDate": $scope.StartDate,
                "jobEndDate": $scope.EndDate,
                "recurrence": $scope.recurrence,
                "deviceId": deviceId,
                "operation": "schedule",
            })
            console.log(ScheduleData);
            promise = testScriptService.Schedule(ScheduleData, userId, token);
            promise.then(
                function (data) {
                    console.log(JSON.stringify(data));

                    if (data.status == "error") {

                        $rootScope.Message = data.errorDescription;

                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
                    }

                    if (data.status == "success") {

                        $rootScope.Message = "Test Run has been Scheduled Successfully";

                        $('#MessageColor').css("color", "green");
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

        $scope.startnow = function () {
            var ScheduleData = JSON.stringify({
                "jobId": testRunID,
                // "jobName": $scope.testRunName,
                "jobDescription": $scope.jobTemplateDescription,
                "jobCreatedBy": userId,
                // "jobStartDateTime": $scope.Datendtime,
//                    "jobStartDate": $scope.StartDate,
//                 "jobEndDate": $scope.EndDate,
//                 "recurrence": $scope.recurrence,
                "deviceId": deviceId,
                "operation": "start_now",
            })
            console.log(ScheduleData);
            promise = testScriptService.Schedule(ScheduleData, userId, token);
            promise.then(
                function (data) {

                    if (data.status == "error") {

                        $rootScope.Message = data.errorDescription;

                        $('#MessageColor').css("color", "red");
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
                    }

                    if (data.status == "success") {

                        $rootScope.Message = " Test run started successfully ";

                        $('#MessageColor').css("color", "green");
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



    })