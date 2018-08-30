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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.saveDraftTestPlan = function (userId, createData, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/saveDraftTestPlan",
                type: "POST",
                data: createData,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }


        service.isTestPlanExist = function (userId, createData, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/isTestPlanExist",
                type: "POST",
                data: createData,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.FetchingDraftTestService = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/fetchDraftTestplans ",
                type: "POST",
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.FetchingTestPlanTemplateService = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/fetchTestplanTemplates ",
                type: "POST",
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.createCopyTestplan = function (token, userId, TestPlanId) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/createCopyTestplan",
                type: "POST",
                data: {token: token, testplanId: TestPlanId, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.editDraftTestplan = function (token, userId, TestPlanId) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/editDraftTestplan",
                type: "POST",
                data: {token: token, testplanId: TestPlanId, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.createCloneTestplan = function (token, userId, TestPlanId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/createCloneTestplan",
                type: "POST",
                data: {token: token, testplanId: TestPlanId, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        service.FetchCommands = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/fetchCommands ",
                type: "POST",
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.FetchCommandsTree = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/fetchCommandsTree",
                type: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId
                },
                success: function (data) {
                    deferred.resolve($.parseJSON(data.items));

                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });

            /*$.ajax({
                    url: "/IAAPORTAL/json/test.json",
                    //force to handle it as text
                    dataType: "text",
                    success: function(data) {
                        
                      
                       deferred.resolve($.parseJSON(data));
                       
                    }
                });*/


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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }


//create test run table
        service.getTestplan = function (token, userId, testplanId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/getTestplan",
                type: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId,
                    'testplanId': testplanId
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve($.parseJSON(data.items));
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.getTestRunsDetails = function (token, userId, batchRunId, json) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/batchRun/getTestRunDetails?userId=" + userId + "&batchRunId=" + batchRunId,
                type: "POST",
                data: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId,
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.cloneBatchRun = function (token, userId, batchRunId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/batchRun/cloneBatchRun",
                type: "POST",
                data: {token: token, batchRunId: batchRunId, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }


        service.createBatchRun = function (token, userId, batchRunName,batchRunDesc) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/batchRun/createBatchRun",
                type: "POST",
                data: {token: token, batchRunName: batchRunName,batchRunDesc:batchRunDesc, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.startBatchRun = function (token, userId, batchRunId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/batchRun/startBatchRun",
                type: "POST",
                data: {token: token, batchRunId: batchRunId, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.stopBatchRun = function (token, userId, batchRunId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/batchRun/stopBatchRun",
                type: "POST",
                data: {token: token, batchRunId: batchRunId, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.delBatchRun = function (token, userId, batchRunId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/batchRun/deleteBatchRun",
                type: "POST",
                data: {token: token, batchRunId: batchRunId, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.delTestplan = function (token, userId, testplanId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/delTestplan",
                type: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId,
                    'testplanId': testplanId
                },
                success: function (data) {
                    console.log(data);
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.getAllTestRuns = function (token, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/getAllTestRuns",
                type: "POST",
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.getAllBatchRuns = function (token, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/batchRun/getAllBatchRuns",
                type: "POST",
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
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
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.replaceTestRunFromBatchRun = function (token, userId, batchRunId, oldTestRunId, newTestRunId, active) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/batchRun/replaceTestRunFromBatchRun",
                type: "POST",
                data: {
                    token: token,
                    userId: userId,
                    batchRunId: batchRunId,
                    oldTestRunId: oldTestRunId,
                    newTestRunId: newTestRunId,
                    active: active
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.editTestRunStartTime = function (token, userId, batchRunId, testRunId, startDateTime) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/batchRun/editTestRunStartTime",
                type: "POST",
                data: {
                    token: token,
                    userId: userId,
                    batchRunId: batchRunId,
                    testRunId: testRunId,
                    startDateTime: startDateTime,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.addTestRunToBatchRun = function (token, userId, batchRunId, testRunId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/batchRun/addTestRunToBatchRun",
                type: "POST",
                data: {
                    token: token,
                    userId: userId,
                    batchRunId: batchRunId,
                    testRunId: testRunId
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.removeTestRunFromBatchRun = function (token, userId, batchRunId, testRunId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/batchRun/removeTestRunFromBatchRun",
                type: "POST",
                data: {
                    token: token,
                    userId: userId,
                    batchRunId: batchRunId,
                    testRunId: testRunId
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        service.getTestRuns = function (token, TestPlanId, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/getTestRuns",
                type: "POST",
                data: {token: token, userId: userId, testPlanId: TestPlanId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.getVirtualJob = function (token, userId, jobId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlanCommandOverride/getVirtualJobs",
                type: "POST",
                data: {token: token, userId: userId, jobId: jobId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.getVirtualDevicesForJob = function (token, userId, jobId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlanCommandOverride/getVirtualDevicesForJob",
                type: "POST",
                data: {token: token, userId: userId, jobId: jobId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.getVirtualJobsTask = function (token, userId, jobId, jobDeviceId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlanCommandOverride/getVirtualJobsTask",
                type: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId,
                    'jobDeviceId': jobDeviceId,
                    'jobId': jobId
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve($.parseJSON(data.items));
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.updateCommandParametersJobDevice = function (token, userId, createData) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlanCommandOverride/updateCommandParametersJobDevice",
                type: "POST",
                data: createData,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.fetchingUseCaseService = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/fetchUseCase ",
                type: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId
                },
                success: function (data) {
                    deferred.resolve($.parseJSON(data.items));

                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }


        service.showDeviceLogDetails = function (userId, token, deviceId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/getIaDeviceLog",
                type: "POST",
                data: {token: token, userId: userId, deviceId: deviceId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {

                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.showDeviceStatusDetails = function (userId, token, deviceId, jobId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/getIaDeviceStatus",
                type: "POST",
                data: {token: token, userId: userId, deviceId: deviceId, jobId: jobId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {

                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.showDeviceTestStatusLogDetails = function (userId, token, deviceId, jobId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/getIaDeviceStatus",
                type: "POST",
                data: {token: token, userId: userId, deviceId: deviceId, jobId: jobId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {

                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.showDeviceNotificationLogDetails = function (userId, token, deviceId, jobId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/getIaDeviceNotifications",
                type: "POST",
                data: {token: token, userId: userId, deviceId: deviceId, jobId: jobId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {

                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.commonServiceForJobSheduling = function (ScheduleData, userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/performJobFunction",
                type: "POST",
                data: ScheduleData,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.showJobStatusOnDeviceList = function (userId, token, deviceId, testRunId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/jobStatus",
                type: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId,
                    'testRunId': testRunId,
                    'deviceId': deviceId
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve($.parseJSON(data.jobStatusList));
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }


        service.countTestUsage = function (token, userId, startDateTime, endDateTime) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/countNewTestPlanTestRunTestRunActive",
                type: "POST",
                data: {token: token, startDateTime: startDateTime, endDateTime: endDateTime, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'

                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }


        //create test run table
        service.getTestplanForQuickRun = function (token, userId, testplanId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/getTestplanForQuickRun",
                type: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId,
                    'testplanId': testplanId
                },
                success: function (data) {
                    //alert("success");
                    deferred.resolve($.parseJSON(data.items));
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.scheduleTestplan = function (token, userId, testplanId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/getTestplanForQuickRun",
                type: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId,
                    'testplanId': testplanId
                },
                success: function (data) {
                    alert("success");
                    deferred.resolve($.parseJSON(data.items));
                },
                error: function (err) {
                    console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        // edit test plan name

        service.updateTestPlanTestRunName = function (token, selectedTestPlanId, testPlanName) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/updateTestPlanTestRunName",
                type: "POST",
                data: {token: token, testPlanId: selectedTestPlanId, testPlanName: testPlanName},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.deActivateTestRun = function (token, selectedTestRunId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testRun/deActivateTestRun",
                type: "POST",
                data: {token: token, testRunId: selectedTestRunId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        return service;
    }])

