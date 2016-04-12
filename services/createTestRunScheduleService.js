oTech.service('createTestRunScheduleService',
        ['$http', '$rootScope', '$timeout', '$location', '$q', '$cookieStore','testScriptService', function ( $http, $location, $rootScope, $timeout, $q, $cookieStore,testScriptService) {
               
                var service = {};



                   service.getTestRunDependantData = function (token,TestRunName, userId) {
                    var deferred = $q.defer(); 
                     promise = testScriptService.getTestRunDependantData(token, TestRunName, userId);
                    promise.then(
                            function (data) {
                                $cookieStore.put('notAvailableMsg', data.status)
                                if (data.status == "No TestRun Exists") {
                                    var notAvailableMsg = "No test runs available for this device"
                                } else {
                                    var NewTreeLst = [];
                                   var TemptreeData = data.testRunDependantData;

                                     var jobDeviceVOLst = [];
//                                $scope.tree_data = $scope.NewTreeLst;
                                    angular.forEach(TemptreeData.jobDeviceVOList, function (item1) {
                                       jobDeviceTaskExecutorVOList = [];
                                        angular.forEach(item1.jobDeviceTaskExecutorVOList, function (item2) {
                                           jobDeviceCommandExecutorVOList = [];
                                            angular.forEach(item2.jobDeviceCommandExecutorVOList, function (item3) {
                                             jobDeviceCommandExecutorCommandVOList = [];
                                                angular.forEach(item3.jobDeviceCommandExecutorCommandVOList, function (item4) {
                                                    var jobDeviceCommandExecutorCommandout = {
                                                        "Name": item4.commandName,
                                                        "Loop": null,
                                                        "CommandParams": item4.commandParams,
                                                        "Sequence": item4.commandSeqNo,
                                                        "jobDeviceCommandExecutorCommandId": item4.jobDeviceCommandExecutorCommandId,
                                                        "commandId": item4.commandId,
                                                        "jobDeviceCommandExecutorId": item4.jobDeviceCommandExecutorId,
                                                        "commandExecutorCommandId": item4.commandExecutorCommandId,
                                                        "children": []
                                                    };
                                                   jobDeviceCommandExecutorCommandVOList.push(jobDeviceCommandExecutorCommandout);
                                                });
                                                var jobDeviceCommandExecutorout = {
                                                    "Name": item3.commandExecutorName,
                                                    "Loop": item3.commandExecutorLoop,
                                                    "CommandParams": null,
                                                    "Sequence": item3.commandExecutorSeqNo,
                                                    "type": "jobDeviceCommandExecutor",
                                                    "children": jobDeviceCommandExecutorCommandVOList
                                                };
                                              jobDeviceCommandExecutorVOList.push(jobDeviceCommandExecutorout);
                                            });
                                            var jobDeviceTaskout = {
                                                "Name": item2.taskExecutorName,
                                                "Loop": item2.taskExecutorLoop,
                                                "CommandParams": null,
                                                "Sequence": item2.taskExecutorSeqNo,
                                                "type": "jobDeviceTask",
                                                "children": jobDeviceCommandExecutorVOList
                                            };

                                           jobDeviceTaskExecutorVOList.push(jobDeviceTaskout);
                                        });
                                        var jobDeviceout = {
                                            "id": item1.jobDeviceId,
                                            "Name": item1.deviceName,
                                            "Loop": item1.taskLoop,
                                            "CommandParams": null,
                                            "Sequence": null,
                                            "type": "JobDevice",
                                            "children": jobDeviceTaskExecutorVOList
                                        };
                                    });

                                    var jobout = {
                                        "Name":TemptreeData.jobName,
                                        "type": "Job",
                                        "children": jobDeviceTaskExecutorVOList
                                    };

                                deferred.resolve(jobout);
                                /*    
                                    $scope.NewTreeLst.push(jobout);
                                    $rootScope.tree_data = $scope.NewTreeLst;
                                    $cookieStore.put('NewTreeLst', $rootScope.tree_data);
                                    console.log("tree_data: " + JSON.stringify($rootScope.tree_data));*/

                                }
                            },
                            function (err) {
                            	  deferred.reject(err);
                                console.log(err);
                            }
                    );
   return deferred.promise;

}

                return service;
            }])

