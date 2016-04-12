oTech.service('testScriptService',
    ['$http', '$rootScope', '$timeout', '$location', '$q', '$cookieStore', function ($http, $location, $rootScope, $timeout, $q, $cookieStore) {
        var token = sessionStorage.getItem('token');
        var username = sessionStorage.getItem('username');
        var userId = sessionStorage.getItem('userId');
        var testrunID = $cookieStore.get('testrunId');
        var testRunName = $cookieStore.get('TestRunName');
        var TestPlanId = $cookieStore.get('TestPLANId');

        var service = {};

        service.CreateSrvc = function (userId, createData, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/createTestplan",
                type: "POST",
                data: createData,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId
                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.FetchingTestService = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/fetchTestplans ",
                type: "POST",
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        // service.ViewTestRunService = function (TestRunName, userId) {
        //     var deferred = $q.defer();
        //     $.ajax({
        //         url: oApp.config.BASE_URL + "rest/testRun/getTestRunDependantData",
        //         type: "POST",
        //         data: {token: token, userId: userId, testRunName: TestRunName},
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //
        //         },
        //         success: function (data)
        //         {
        //             //alert("success");
        //             deferred.resolve(data);
        //         },
        //         error: function (err)
        //         {
        //             console.log(err);
        //             deferred.reject(err);
        //         }
        //     });
        //     return deferred.promise;
        // }
        service.ViewTestRunDeviceService = function (userId, token, testrunID) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + " rest/testRun/getDevicesForTestRun ",
                type: "POST",
                data: {token: token, userId: userId, testRunId: testrunID},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        service.FetchCommands = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + " rest/testPlan/fetchCommands ",
                type: "POST",
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.Schedule = function (ScheduleData, userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/scheduleTestRun",
                type: "POST",
                data: ScheduleData,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId
                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }


//create test run table
        service.getTestplan = function (token,userId, testplanId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/getTestplan",
                type: "POST",
                data: {token: token, userId: userId, testplanId: testplanId, },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.getVirtualDevices = function (TestPlanId, token, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/getTestplanVirtualDevices ",
                type: "POST",
                data: {token: token, testplanId: TestPlanId, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        service.getRealDevices = function (token, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/fetchRealDevices",
                type: "POST",
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.getTestRunsForTestPlan = function (TestPlanId, token, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/getTestRunsForTestPlan ",
                type: "POST",
                data: {token: token, testPlanId: TestPlanId, userId: userId},
                headers: {
                    'X-Auth-Token': token,
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        service.PostUpdate = function (ParamsData, token, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/editTestRun",
                type: "POST",
                data: ParamsData,
                headers: {
                    'X-Auth-Token': token,
                    'Content-Type': 'application/json',
                    'userId': userId

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        service.CreateTestRun = function (TestRunData, token, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/createTestRun",
                type: "POST",
                data: TestRunData,
                headers: {
                    'X-Auth-Token': token,
                    'Content-Type': 'application/json',
                    'userId': userId

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.getAllTestRuns = function (token,userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/getAllTestRuns",
                type: "POST",
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        service.getTestRunDependantData = function (token, TestRunName, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/getTestRunDependantData ",
                type: "POST",
                data: {token: token, userId: userId, testRunName: TestRunName},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        service.getDevicesForTestRun = function (token, TestRunId, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/getDevicesForTestRun ",
                type: "POST",
                data: {token: token, userId: userId, testRunId: TestRunId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.fetchVirtualDevices = function (token, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/fetchVirtualDevices",
                type: "POST",
                data: {token: token, userId:userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.editTestplan = function (editTestPlanData, token, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/editTestplan",
                type: "POST",
                data: editTestPlanData,
                headers: {
                    'X-Auth-Token': token,
                    'Content-Type': 'application/json',
                    'userId': userId

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.setDefaultParams = function (ParamsData, userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/setDefaultParams",
                type: "POST",
                data: ParamsData,
                headers: {
                    'X-Auth-Token': token,
                    'Content-Type': 'application/json',
                    'userId': userId

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
    /*    service.fetchVirtualDevices = function (token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/fetchVirtualDevices",
                type: "POST",
                data: {token: token, userId: userID},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }*/


        service.assignVirtualDevice = function (userId, token, data) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/assignVirtualDevice",
                type: "POST",
                data: data,
                headers: {
                    'X-Auth-Token': token,
                    'Content-Type': 'application/json',
                    'userId': userId

                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.getAllTestRunsForSchedule = function (token, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/getAllTestRuns",
                type: "POST",
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data)
                {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err)
                {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }



        return service;
    }])

