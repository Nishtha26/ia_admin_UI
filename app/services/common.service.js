oTech.service('AppServices',
    ['$http', '$rootScope', '$timeout', '$location', '$q', function ($http, $location, $rootScope, $timeout, $q) {
        var token = sessionStorage.getItem("token");
        var username = sessionStorage.getItem("username");
        var userId = sessionStorage.getItem("userId");
        var service = {};

        /*
         Function to remove user Favourites
         */
        service.RemoveUserFavourites = function (userId, screen_id, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/removeFromFavourites",
                type: "POST",
                data: {token: token, userId: userId, screenId: screen_id},
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
        /*
         Function to get the dashboard menu data
         */
        service.GetDashboardMenu = function (userId, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getUserMenu ",
                type: "POST",
                data: {token: token, userId: userId},
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
        /*
         Function to get the device data
         */
        service.GetDeviceData = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/deviceData",
                type: "POST",
                data: {token: token, userId: userId},
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

        /*
         Function to get the active device data
         */
        service.GetActiveDeviceData = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/activeDeviceData",
                type: "POST",
                data: {token: token, userId: userId},
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

        /*
         Function to get the favourite reports
         */
        service.GetFavouriteReports = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getUserFavourites",
                type: "POST",
                data: {token: token, userId: userId},
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

        /*
         Function to get the job list data
         */
        service.GetJobListData = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/job/getScheduledJobData",
                type: "POST",
                data: {token: token, userId: userId},
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

        /*
         Function to get the active job list data
         */
        service.GetActiveJobListData = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/job/getActiveJobData",
                type: "POST",
                data: {token: token, userId: userId},
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


        /*
         Function to get device count
         */

        service.DeviceCount = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/deviceCount?userId=" + userId,
                type: "GET",
                data: {token: token},
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
        /*
         Function to get Active device count
         */
        service.ActiveDeviceCount = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/activeDeviceCount",
                type: "POST",
                data: {token: token, userId: userId},
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

        /*
         Function to get Scheduled Job count
         */
        service.ScheduledJobCount = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/job/getScheduledJobCount",
                type: "POST",
                data: {token: token, userId: userId},
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
        /*
         Function to get Active Job count
         */
        service.ActiveJobCount = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/job/getActiveJobCount",
                type: "POST",
                data: {token: token, userId: userId},
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
        /*
         Function to add user Favourites
         */
        service.AddUserFavourites = function (userId, screenId, screenName, menuUrl, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/addToFavourites",
                type: "POST",
                data: {token: token, userId: userId, screenId: screenId, screenName: screenName, menu_url: menuUrl},
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
        /*
         Function to get the device list
         */
        service.GetDeviceList = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/reports/callPerformance/getDeviceList",
                type: "POST",
                data: {token: token, userId: userId},
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
        /* Function to get the measurements tab*/
        service.getmeasurementList = function (token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/measurement/getMeasurementsData",
                type: "POST",
                data: {token: token},
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
        /*
         Function to get CallPerformance Summary Reports
         */
        service.getPerformanceReport = function (token, data) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/reports/callPerformance/summary",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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


        /*
         Function to get  CallPerformance TimeLine Reports
         */
        service.getTimeLinePerformanceReport = function (token, data) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/reports/callPerformance/timeline",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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
        /*
         Function to get  Data Performance TimeLine Reports
         */
        service.getTimeLinePerformanceReport_DataPerformance = function (token, data) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/reports/dataPerformance/timeline",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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
        /*
         Function to get Tabular Performance Reports _ Data Performance
         */
        service.getTabularPerformanceReport_DataPerformance = function (token, data) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/reports/dataPerformance/tabular",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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
        /*
         Function to get VoiceQuality Summary Report
         */
        service.getSummaryPerformanceReport_VoiceQuality = function (token, data) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/reports/vqp/summary",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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
        /*
         Function to get VoiceQuality Timeline Report
         */
        service.getTimelinePerformanceReport_VoiceQuality = function (token, data) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/reports/vqp/timeline",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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
        /*
         Function to get VoiceQuality Tabular Report
         */
        service.getTabularPerformanceReport_VoiceQuality = function (token, data) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/reports/vqp/tabular",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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

        /* all data */
        service.GetMeasurementsapnData = function (userId, token, displayLength, startLimit, link) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.MEASUREMENT_URL + link,
                type: "POST",
                data: {token: token, userId: userId, startLimit: startLimit, displayLength: displayLength},
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
        /*
         drive routes data
         */
        service.getDriveRoutes = function (deviceId, fromDate, toDate) {
            var deferred = $q.defer();
            $.ajax({
                url: "http://172.20.106.125:8080/birt/drive_test/jsp/heatmap_cellular_animation_portal_device_pc.jsp?maptype=all",
                type: "POST",
                data: {startdate: fromDate, enddate: toDate, device: deviceId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                    console.log(err);
                }
            });
            return deferred.promise;
        }

        /*get Sever Settings data*/

        service.GetServerSettingsData = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/settings/serverSystem",
                type: "POST",
                data: {token: token, userId: userId, username: username},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //console.log(data);
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        /*get  admin settings data*/

        service.GetadminSettingsData = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/settings/adminSystem",
                type: "POST",
                data: {token: token, userId: userId, username: username},
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
        /*
         Function to get Landing Page Url
         */
        service.LandingPageUrl = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getUserLandingPage",
                type: "POST",
                data: {token: token, userId: userId},
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
        /* Test Plan Administration */

        service.getTestplanAdminData = function (userId, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/fetchTestplans",
                type: "POST",
                data: {token: token, userId: userId},
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

        /* Selected Testplan user table */

        service.selectedTestPlanUserTableData = function (testPlanId, userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/getUsersAccessibleToTestplan",
                type: "POST",
                data: {
                    token: token,
                    userId: userId,
                    testplanId: testPlanId
                },
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

        /* Available testplan user table */
        service.availableTestPlanUserTableData = function (testPlanId, userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/getUsersNotAccessibleToTestplan",
                type: "POST",
                data: {
                    token: token,
                    userId: userId,
                    testplanId: testPlanId
                },
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

        /* Add Testplan access to user*/

        service.addTestplanAccessToUser = function (testPlanId, userId, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/addTestplanAccessToUser",
                type: "POST",
                data: {
                    token: token,
                    userId: userId,
                    testplanId: testPlanId
                },
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
        /* Remove Testplan access to user*/

        service.removeTestplanAccessToUser = function (testPlanId, userId, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/testPlan/removeTestplanAccessToUser",
                type: "POST",
                data: {
                    token: token,
                    userId: userId,
                    testplanId: testPlanId
                },
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
        /* user table page*/

        service.GetuserTableData = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getUserList",
                type: "POST",
                data: {token: token, userId: userId},
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
        /* user groups page*/

        service.GetuserGroupsData = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getAllUserGroups",
                type: "POST",
                data: {token: token, userId: userId},
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
        /*
         Function to server edited data
         */
        service.GetserverEditData = function (token, data) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/settings/editServerSystem",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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
        /*
         Function to admin edited data
         */
        service.GetadminEditData = function (token, data) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/settings/editAdminSystem",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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
        /* create user in userAdminstration*/

        service.CreateUserinUserAaminstration = function (data, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/createUser",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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
        /* update user in userAdminstration*/

        service.UpdateUserInUserAdminstration = function (data, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/updateUser",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
                },
                success: function (data) {
                    deferred.resolve(data);
                    //console.log(data);

                },
                error: function (err) {

                    //	console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        /*to Display Available Reports*/

        service.getAvailableReportsData = function (userId, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getUserAvailableScreens",
                type: "POST",
                data: {token: token, userId: userId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    // alert("err");
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        /*Add  new  Report to existing reports*/

        service.addReport = function (data, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/addScreen",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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
        /*already exisiting user groups*/

        service.getAvailableUsergroupsData = function (userId, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getAllUserGroups",
                type: "POST",
                data: {token: token, userId: userId},
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


        /* create user in usergroups*/
        service.addUsers = function (token, usergroup, userid) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/createUserGroup",
                type: "POST",
                data: {token: token, usergroup: usergroup, userid: userid},
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
        /*
         Change password
         */
        service.changePassword = function (token, userId, pwd, matchingPwd) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/changePassword",
                type: "POST",
                data: {token: token, userId: userId, pwd: pwd, matchingPwd: matchingPwd},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                   // alert("Password changed successfully");
                    deferred.resolve(data);
                },
                error: function (err) {
                    //alert("error");
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        /*
         Function to get the quick run data
         */
        service.GetquickRunData = function (userId, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/deviceData",
                type: "POST",
                data: {token: token, userId: userId},
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
        /*
         Function to get all user group data

         */
        service.GetallusersgroupData = function (token, userGroupId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getUsersNotInGroup",
                type: "POST",
                data: {token: token, userGroupId: userGroupId},
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

        /*
         Function to retrieve users not having the selected report

         */
        service.usersNotHavingReportData = function (token, userId, screenId, companyId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getUsersNotHavingScreen",
                type: "POST",
                data: {token: token, userId: userId, screenId: screenId, companyId: companyId},
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

        /*
         Function to get existing user

         */
        service.GetexistingusersData = function (token, userGroupId, groupName) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getUsersOfUserGroup",
                type: "POST",
                data: {token: token, userGroupId: userGroupId, groupName: groupName},
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
        /*
         device administration
         */
        service.GetdeviceAdminData = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/deviceData",
                type: "POST",
                data: {token: token, userId: userId},
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

        /*
         approve
         */
        service.GetapproveData = function (userId, token, deviceId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/approveOrReject",
                type: "POST",
                data: {token: token, userId: userId, deviceId: deviceId, deviceStatus: "APPROVE"},
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


        /*
         reject
         */
        service.GetrejectData = function (userId, token, deviceId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/approveOrReject",
                type: "POST",
                data: {token: token, userId: userId, deviceId: deviceId, deviceStatus: "REJECT"},
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
        //for fcm push
        service.MonitorDeviceForHeartBeat = function (userId, token, deviceId, state) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/monitorDeviceForHeartBeat",
                type: "POST",
                data: {token: token, userId: userId, deviceId: deviceId, monitorDeviceFlag: state},
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
        /*
         adding users to user group

         */
        service.GetadduserData = function (token, groupName, luserId, customerId) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/addUserToGroup",
                type: "POST",
                data: {token: token, usergroup: groupName, userId: luserId, customerId: customerId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {

                    //	console.log(data);
                    deferred.resolve(data);
                },
                error: function (err) {
                    //alert("error");
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        /*
         for retrieving menu types in add reports
         */
        service.GetMenuTypeList = function (userId, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getMenuTypes",
                type: "POST",
                data: {userId: userId, token: token},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //console.log(data);
                    //	console.log(data);
                    deferred.resolve(data);
                },
                error: function (err) {
                    //alert("error");
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }


        /*
         customer list in user administration
         */
        service.GetcustomerList = function (userId, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/customer/getCustomerOfUser",
                type: "POST",
                data: {userId: userId, token: token},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //console.log(data);
                    //	console.log(data);
                    deferred.resolve(data);
                },
                error: function (err) {
                    //alert("error");
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        /*
         customer list in user administration
         */
        service.GetCustomerListOfTestPlan = function (testPlanId, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/customer/getCustomerOfTestPlan",
                type: "POST",
                data: {testPlanId: testPlanId, token: token},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //console.log(data);
                    //	console.log(data);
                    deferred.resolve(data);
                },
                error: function (err) {
                    //alert("error");
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        /* function for creating new customer in user administration */


        service.createCustomerUserAdministration = function (customerName, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/customer/create",
                type: "POST",
                data: {customerName: customerName, token: token},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //console.log(data);
                    //	console.log(data);
                    deferred.resolve(data);
                },
                error: function (err) {
                    //alert("error");
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }


        /* Function for getting already existing report data on selection of report */


        service.GetexistingReportData = function (token, userId, screenId, companyId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getUsersOfMenu",
                type: "POST",
                data: {token: token, userId: userId, screenId: screenId, companyId: companyId},
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
        /* assign report to group*/

        service.GetAssignData = function (data, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/addScreenAccessToUser",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
                },
                success: function (data) {
                    deferred.resolve(data);
                    //console.log(data);

                },
                error: function (err) {

                    //	console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }
        /* unassign report to group*/

        service.GetunAssignData = function (data, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/removeScreenAccessToUser",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
                },
                success: function (data) {
                    //alert("csucess");
                    deferred.resolve(data);
                    //console.log(data);

                },
                error: function (err) {
                    //alert("cerror")
                    //console.log(err);
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        /*
         function to unassign user from usergroup
         */
        service.GetunassignUserData = function (token, groupName, luserId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/deleteUserFromGroup",
                type: "POST",
                data: {token: token, usergroup: groupName, userId: luserId},
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
        /*
         Function to get the quick run binf=ding data
         */
        service.GetquickRunbindingData = function (userId, token) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/quickrun/getTasks",
                type: "POST",
                data: {token: token, userId: userId},
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


        /*
         Function to get the create quick run
         */

        service.createQuickRun = function (data, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/quickrun/createQuickJob",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
                },
                success: function (data) {
                    //console.log(data);
                    //	console.log(data);
                    deferred.resolve(data);
                },
                error: function (err) {
                    //alert("error");
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }


        /*
         Function to get the quick run binf=ding111 data
         */
        service.GetTaskDepedantData = function (token, data) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/quickrun/getTaskDependants",
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    'X-Auth-Token': token,
                    'Content-Type': 'application/json'
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


        service.getDevicesAvailableForUser = function (token, userId) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/getDevicesAvailableForUser",
                type: "POST",
                data: {userId: userId, token: token},
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

        service.getDevicesNotAvailableForUser = function (token, userId) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/getDevicesNotAvailableForUser",
                type: "POST",
                data: {userId: userId, token: token},
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

        service.assignDeviceToUser = function (token, userId, deviceId) {

            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/assignDeviceToUser",
                type: "POST",
                data: {userId: userId, deviceId: deviceId, token: token},
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
        service.GetActiveuserGroupsData = function (userId, token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/getAllActiveUserGroups",
                type: "POST",
                data: {token: token},
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
        service.deleteUserAdministration = function (token, usernames, accountEnableStatus) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/deleteUser",
                type: "POST",
                data: {token: token, usernames: usernames, accountEnableStatus: accountEnableStatus},
                /*	headers :{
                 'X-Auth-Token': token,
                 "Content-Type" : "application/json"
                 }*/
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
        service.updateUsergroupData = function (token, userGroupId, groupName) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/updateUserGroup",
                type: "POST",
                data: {token: token, userGroupId: userGroupId, groupName: groupName},
                /*	headers :{
                 'X-Auth-Token': token,
                 "Content-Type" : "application/json"
                 }*/
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
        service.deleteUsergroupData = function (token, userGroupId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/usergroup/deleteUserGroup",
                type: "POST",
                data: {token: token, userGroupId: userGroupId},
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
        service.adminCommandOperation = function (token, selectDeviceId, commandId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/updateAdminCommand",
                type: "POST",
                data: {token: token, deviceId: selectDeviceId, commandId: commandId},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    if (data.status == "Device not registered")
                        alert(data.status);
                    if (data.status == "Successfully Restarted")
                        alert(data.status);
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }
            });
            return deferred.promise;
        }

        service.populateAdminCommands = function (token) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/populateAdminCommands",
                type: "POST",
                data: {token: token},
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
        service.adminCommandUpdateUrl = function (token, selectDeviceId, commandId, workUrl) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/updateURLAdminCommand",
                type: "POST",
                data: {token: token, deviceId: selectDeviceId, commandId: commandId, workURL: workUrl},
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
        service.updateDefaultJob = function (token, selectDeviceId, defaultJobId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/updateDefaultJob",
                type: "POST",
                data: {token: token, deviceId: selectDeviceId, defaultJobId: defaultJobId},
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

        service.deviceInfo = function (token, selectDeviceId, deviceName, deviceIMIE, deviceMSISDN) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/devices/deviceInfo",
                type: "POST",
                data: {
                    token: token,
                    deviceId: selectDeviceId,
                    deviceName: deviceName,
                    deviceIMIE: deviceIMIE,
                    deviceMSISDN: deviceMSISDN
                },
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

        service.getWebETLSchedulerData = function () {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "/rest/etl/webETLScheduler",
                type: "GET",
                data: {},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                    console.log(err);
                }
            });
            return deferred.promise;
        }

        service.postWebETLSchedulerData = function (webETLSchedulerMapping, token, userId) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/etl/postWebETLSchedulerMapping",
                type: "POST",
                data: webETLSchedulerMapping,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token,
                    'userId': userId
                },
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                    console.log(err);
                }
            });
            return deferred.promise;
        }

        service.getWebETLSchedulerMapping = function () {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/etl/getWebETLSchedulerMapping",
                type: "GET",
                data: {},
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                    console.log(err);
                }
            });
            return deferred.promise;
        }

        service.stopRunningETL = function () {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/etl/stopCurrentRunningETL",
                type: "GET",
                data: {},
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                    console.log(err);
                }
            });
            return deferred.promise;
        }
        service.deleteWebETLSchedulerMapping = function (id) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/etl/deleteETLInfo/" + id,
                type: "GET",
                data: {},
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                    console.log(err);
                }
            });
            return deferred.promise;
        }
        service.GetReportData = function (userId, token, displayLength, startLimit, tablename, link) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.MEASUREMENT_URL + link,
                type: "POST",
                data: {token: token, userId: userId, startLimit: startLimit, displayLength: displayLength},
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
        service.GetReportData = function (userId, token, displayLength, startLimit, table) {
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "/rest/repData/" + table,
                type: "POST",
                data: {token: token, userId: userId, startLimit: startLimit, displayLength: displayLength},
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

        service.addRow = function (table, json,token) {
            console.log(JSON.stringify(json));
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/repData/" +table + "?userId=-2",
                type: "POST",
                data: json,
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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

        service.delRow = function (table, json,token) {
            console.log(JSON.stringify(json));
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/repData/" + table + "?userId=-2",
                type: "POST",
                data: json,
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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

        service.updateRow = function (table, json,token) {
            console.log(JSON.stringify(json));
            var deferred = $q.defer();
            $.ajax({
                url: oApp.config.BASE_URL + "rest/repData/" + table + "?userId=-2",
                type: "POST",
                data: json,
                headers: {
                    'X-Auth-Token': token,
                    "Content-Type": "application/json"
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