var oTech = angular.module("oTech", ['toastr', 'ui.grid.selection', 'ui.router', 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.pagination', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.grid.pagination', 'ui.grid.treeView', 'ui.grid.autoResize', 'ngSanitize', 'ngCookies', 'ui.bootstrap', 'angularjs-datetime-picker', 'treeGrid', 'ncy-angular-breadcrumb', 'angular.filter', 'ui.tree', 'ngMessages']).filter('oTech', function () {
});


oTech.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $q, $location) {

    $urlRouterProvider

    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "app/views/login.html",
            controller: 'LoginController'
        })
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "app/views/dashboard.html",
            controller: 'DashBoardController'
        })
        .state("changePassword", {
            url: "/dashboard/changePassword",
            templateUrl: "app/views/changePassword.html",
            controller: 'changePasswordController'
        })
        .state("deviceAvailability", {
            url: "/dashboard/deviceAvailability",
            templateUrl: "app/views/deviceAvailability.html",
            controller: 'deviceAvailabilityController'
        })

        .state("deviceMaps", {
            url: "/dashboard/deviceMaps",
            templateUrl: "app/views/deviceMaps.html",
            controller: 'deviceMapsController'
        })
        .state("userTable", {
            url: "/dashboard/userTable",
            templateUrl: "app/views/userTable.html",
            controller: 'userTableController'
        })
        .state("UserGroups", {
            url: "/dashboard/UserGroups",
            templateUrl: "app/views/userGroups.html",
            controller: 'UserGroupsController'
        })
        .state("adminstrator", {
            url: "/dashboard/administrator",
            templateUrl: "app/views/adminstrator.html",
            controller: 'AdminstartorController'
        })
        .state("serversetting", {
            url: "/dashboard/serverSetting",
            templateUrl: "app/views/serverSetting.html",
            controller: 'serverSettingController'
        })
        .state("landingpage", {
            url: "/dashboard/landingPage",
            templateUrl: "app/views/landingPage.html",
            controller: 'landingPageController'
        })
        .state("useradminstration", {
            url: "/dashboard/userAdminstration",
            templateUrl: "app/views/useradminstrator.html",
            controller: 'userAdminstrationController'
        })
        .state("userDeviceMapping", {
            url: "/dashboard/userDeviceMapping",
            templateUrl: "app/views/userDeviceMapping.html",
            controller: 'userDeviceMappingController'
        })
        .state("deviceAdmin", {
            url: "/dashboard/deviceAdmin",
            templateUrl: "app/views/deviceAdmin.html",
            controller: 'deviceAdminController'
        })
        .state("addreports", {
            url: "/dashboard/addReports",
            templateUrl: "app/views/addReports.html",
            controller: 'addReportsController'
        })
        .state("assignReport", {
            url: "/dashboard/assignReport",
            templateUrl: "app/views/assignReport.html",
            controller: 'assignReportController'
        })
        .state("addUsergroups", {
            url: "/dashboard/addUsergroups",
            templateUrl: "app/views/addUsergroups.html",
            controller: 'addUsergroupsController'
        })
        .state("quickRun", {
            url: "/dashboard/quickRun",
            templateUrl: "app/views/quickRun.html",
            controller: 'quickRunController'
        })
        .state("quickbinding", {
            url: "/dashboard/quickbinding",
            templateUrl: "app/views/quickbinding.html",
            controller: 'quickbindingController'
        })

        .state("testplanAdmin", {
            url: "/dashboard/testplanAdmin",
            templateUrl: "app/views/testplanAdmin.html",
            controller: 'testplanAdminController'
        })

        .state("replayMap", {
            url: "/dashboard/replayMap",
            templateUrl: "app/views/replay.map.html",
            controller: 'replayMapsController'
        })
        .state("deviceMeasurements", {
            url: "/dashboard/deviceMeasurements",
            templateUrl: "app/views/deviceMeasurements.html",
            controller: 'deviceMeasurementsController'
        }).state("heatMaps", {
        url: "/dashboard/heatMaps",
        templateUrl: "app/views/heatMaps.html",
        controller: 'HeatMapsController'
    })
        .state("driveRoutes", {
            url: "/dashboard/driveRoutes",
            templateUrl: "app/views/driveroutes.html",
            controller: 'DriveRoutesController'
        })
        .state("reports", {
            url: "/dashboard/reports",
            templateUrl: "app/views/reports.html",
            controller: 'ReportsController'
        })
        .state("reportCategory", {
            url: "/dashboard/reportsCategory",
            templateUrl: "app/views/reportsCategory.html",
            controller: 'ReportscategoryController'

        }).state("reportTableau", {
        url: "/dashboard/reportsTableau",
        templateUrl: "app/views/reportsTableau.html",
        controller: 'ReportsTableauController'
    }).state("reportTableau1", {
        url: "/dashboard/DataPerformance",
        templateUrl: "app/views/dataPerformanceReport.html",
        controller: 'ReportsTableauController'
    }).state("reportTableau2", {
        url: "/dashboard/MMS",
        templateUrl: "app/views/MMSReport.html",
        controller: 'ReportsTableauController'
    }).state("reportTableau3", {
        url: "/dashboard/SMS",
        templateUrl: "app/views/SMSReport.html",
        controller: 'ReportsTableauController'
    }).state("reportTableau4", {
        url: "/dashboard/Mobility",
        templateUrl: "app/views/MobilityReport.html",
        controller: 'ReportsTableauController'
    }).state("reportTableau6", {
        url: "/dashboard/VideoQuality",
        templateUrl: "app/views/VideoQualityReport.html",
        controller: 'ReportsTableauController'
    }).state("reportTableau7", {
        url: "/dashboard/VoiceQuality",
        templateUrl: "app/views/VoiceQualityReport.html",
        controller: 'ReportsTableauController'
    }).state("reportTableau8", {
        url: "/dashboard/WiFiPerformance",
        templateUrl: "app/views/WiFiPerformanceReport.html",
        controller: 'ReportsTableauController'
    }).state("reportTableau9", {
        url: "/dashboard/RadioPerformance",
        templateUrl: "app/views/RadioPerformanceReport.html",
        controller: 'ReportsTableauController'
    }).state("droolRuleTemplete", {
        url: "/dashboard/droolruleTemplete",
        templateUrl: "app/views/create_drools_rule.html",
        controller: 'DroolruleTempleteController',
        ncyBreadcrumb: {
            label: 'Test Plan'
        }
    })
        .state("myDevices", {
            url: "/dashboard/myDevices",
            templateUrl: "app/views/mydevices.html",
            controller: 'MyDevicesController'
        })
        .state("createTestPlan", {
            url: "/dashboard/createTestPlan",
            templateUrl: "app/views/createTestPlan.html",
            controller: 'createTestPlan',
            ncyBreadcrumb: {
                label: 'Test Plan'
            }
        })
        .state("copyTestPlan", {
            url: "/dashboard/copyTestPlan",
            templateUrl: "app/views/copyTestPlan.html",
            controller: 'copyTestPlan',
            ncyBreadcrumb: {
                label: 'Test Plan'
            }
        })
        .state("editDraftTestPlan", {
            url: "/dashboard/editDraftTestPlan",
            templateUrl: "app/views/editDraftTestPlan.html",
            controller: 'editDraftTestPlan',
            ncyBreadcrumb: {
                label: 'Edit Draft Test Plan'
            }
        })
        .state("createTestPlanTemplate", {
            url: "/dashboard/createTestPlanTemplate",
            templateUrl: "app/views/createTestPlanTemplate.html",
            controller: 'createTestPlanTemplate',
            ncyBreadcrumb: {
                label: 'Test Plan'
            }
        })
        .state("createTestPlanFinal", {
            url: '/dashboard/createTestPlanFinal',
            views: {
                "@": {
                    templateUrl: 'app/views/createTestPlanFinal.html',
                    controller: 'testPlanCommandOverride'
                }
            },
            ncyBreadcrumb: {
                label: 'Test Plan final'
            }
        })
        .state("createTestPlanTemplateFinal", {
            url: '/dashboard/createTestPlanTemplateFinal',
            views: {
                "@": {
                    templateUrl: 'app/views/createTestPlanTemplateFinal.html',
                    controller: 'testPlanTemplateCommandOverride'
                }
            },
            ncyBreadcrumb: {
                label: 'Test Plan final'
            }
        })
        .state("testPlanTestRunAdministration", {
            url: '/dashboard/testPlanTestRunAdministration',
            templateUrl: 'app/views/testPlanTestRunAdministration.html',
            controller: 'testPlanTestRunAdministration',
            ncyBreadcrumb: {
                label: 'Administration'
            }

        })
        .state("batchRun", {
            url: '/dashboard/batchRun',
            templateUrl: 'app/views/batchRun.html',
            controller: 'batchRun',
            ncyBreadcrumb: {
                label: 'Administration'
            }

        })
        .state("draftTestPlan", {
            url: '/dashboard/draftTestPlan',
            templateUrl: 'app/views/draftTestPlan.html',
            controller: 'draftTestPlan',
            ncyBreadcrumb: {
                label: 'Draft Administration'
            }

        })
        .state("CreateTestRun", {
            url: "/CreateTestRun",
            templateUrl: "app/views/editTestRun1.html",
            controller: 'createTestRunController',
            ncyBreadcrumb: {
                label: '{{TestplanName}}'
            }
        }).state("etlPerformance", {
        url: "/dashboard/etlPerformance",
        templateUrl: "app/views/etlPerfomance.html",
        controller: 'TestController'
    }).state("reportConfig", {
        url: "/dashboard/reportConfig",
        templateUrl: "app/views/reportConfig.html",
        controller: 'ReportConfigController'
    })
        .state('CreateTestRun.MappingTestRun', {
            url: '/MappingTestRun',
            views: {
                "@": {
                    templateUrl: 'app/views/createTestRun.html',
                    controller: 'createTestRunController'
                }
            },
            ncyBreadcrumb: {
                label: '{{TestPlanId}}'
            }
        })
        .state("initiateTestPlan", {
            url: "/dashboard/initiateTestPlan",
            templateUrl: "app/views/initiateTestPlan.html",
            controller: 'createTestPlan',
            ncyBreadcrumb: {
                label: 'Create Test Plan'
            }
        })
        .state('CreateTestRun.MappingTestRun.MappingDevices', {
            url: '/MappingDevices',
            views: {
                "@": {
                    templateUrl: 'app/views/MappingDevices.html',
                    controller: 'createTestRunController'
                }
            },
            ncyBreadcrumb: {
                label: 'Select Devices'
            }
        })
        .state('CreateTestRun.MappingTestRun.MappingDevices.createTestRunScheduleSel', {
            url: '/createTestRunScheduleSel',
            views: {
                "@": {
                    templateUrl: 'app/views/createTestRunScheduleSel.html',
                    controller: 'createTestRunGridController'
                }
            },
            ncyBreadcrumb: {
                label: '{{TestRunName}}'
            }
        })
        .state('CreateTestRun.MappingTestRun.MappingDevices.createTestRunScheduleSel.CreateTestRunSchedule', {
            url: '/CreateTestRunSchedule',
            views: {
                "@": {
                    templateUrl: 'app/views/TestRunSchedule.html',
                    controller: 'TestRunScheduleController'
                }
            },
            ncyBreadcrumb: {
                label: 'Schedule'
            }
        })
        .state("TestRunSelect", {
            url: "/TestRunSelect",
            views: {
                "@": {
                    templateUrl: "app/views/SelectTestRun.html",
                    controller: 'editTestRunController',
                }
            },
            ncyBreadcrumb: {
                label: '{{TestRuId}}'
            }
        })
        .state('TestRunSelect.editCommandParameters', {
            url: '/editCommandParameters',
            views: {
                "@": {
                    templateUrl: 'app/views/editCommandParameters.html',
                    controller: 'editTestRunController'
                }
            },
            ncyBreadcrumb: {
                label: 'Edit Command Parameters'
            }
        })
        .state('TestRunSelect.editCommandParameters.TestRunforTestplans', {
            url: '/TestRunforTestplans',
            views: {
                "@": {
                    templateUrl: 'app/views/TestRunforTestplans.html',
                    controller: 'TestRunGrids'
                }
            },
            ncyBreadcrumb: {
                label: '{{TestRunName}}'
            }
        })
        .state('TestRunSelect.editCommandParameters.TestRunforTestplans.TestRunSchedule', {
            url: '/TestRunSchedule',
            views: {
                "@": {
                    templateUrl: 'app/views/TestRunSchedule.html',
                    controller: 'TestRunScheduleController'
                }
            },
            ncyBreadcrumb: {
                label: 'Test Run Schedule'
            }
        })
        .state("Schedule", {
            url: "/Schedule",
            templateUrl: "app/views/ScheduleSel.html",
            controller: 'createTestRunGridController',
            ncyBreadcrumb: {
                label: 'TestRunName: {{TestRunName}}'
            }
        })
        .state('Schedule.CreateTestRunSchedule', {
            url: '/CreateTestRunSchedule',
            views: {
                "@": {
                    templateUrl: 'app/views/TestRunSchedule.html',
                    controller: 'TestRunScheduleController'
                }
            },
            ncyBreadcrumb: {
                label: 'Test Run Schedule'
            }
        })
        .state("Performance", {
            url: "/dashboard/:performance",
            templateUrl: "app/views/performance.html",
            controller: 'PerformanceController'
        })
        .state("zoneMarket", {
            url: "/dashboard/:performance/:zoneMarket",
            templateUrl: "app/views/zonemarket.html",
            controller: 'MarketController'
        })
        .state("CommomReport", {
            url: "/dashboard/:performance/:zoneMarket/commomReport",
            templateUrl: "app/views/commonReport.html",
            controller: 'CommomReportController'
        })
        .state("timeSchedule", {
            url: "/dashboard/:performance/:zoneMarket/timeSchedule",
            templateUrl: "app/views/timeSchedule.html",
            controller: 'TimeScheduleController'
        })
        .state("performanceResult", {
            url: "/dashboard/:performance/:zoneMarket/performanceResult",
            templateUrl: "app/views/performanceResult.html",
            controller: 'PerformanceResultController'
        })


    $urlRouterProvider.otherwise('/login');

    $.ajaxSetup({
        statusCode: {
            401: function () {

                console.log('401 error :: ');
                var scope = angular.element(document.getElementById('logoutDiv')).scope();
                var $body = angular.element(document.body);
                console.log('scope from body ', $body);
                var $rootScope = $body.scope().$root;
                console.log('root scope from body ', $rootScope);
                console.log('scope on signout ', scope);
                $rootScope.signOut();

            },
            200: function () {

                //   console.log('response 200');

            },
            error: function (xhr, status, error) {
                console.log('error :: ' + status);
            }
        }
    });

}]);

oTech.run(function ($rootScope, $location, $stateParams, $sce, AppServices, $timeout, $cookieStore, $cookies, testScriptService, toastr) {

    var token = sessionStorage.getItem("token");
    $rootScope.$on('$locationChangeStart', function (event, next, current) {

        if ($location.path() !== '/login' && sessionStorage.getItem('isLogin') == null) {
            $location.path('/login');
        }

    });
    /**
     * Function for IAS Version
     */
    $rootScope.getServerVersion = function () {
        var token = sessionStorage.getItem("token");
        $.ajax({
            url: oApp.config.BASE_URL + "rest/testRun/getServerVersion",
            type: "POST",
            data: {token: token},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                console.log(data.status);
                toastr.info(data.status + "<br/>" + "IAA Version : " + oApp.config.IAAVersion, 'Powered by Orchestratec', {
                    allowHtml: true
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    /*
     Function for menu toggle
     */
    $rootScope.toggleMenu = function () {
        //if($location.url().substring(1,$location.url().length) == 'dashboard'){
        if ($('.orchestra_menu').css('display') == "none") {
            $('.orchestra_menu').slideDown('slow');
            $('.maincontent').addClass('menumargin');
            $('.reports ul li').css('width', '18.7%');
        } else {
            $('.orchestra_menu').slideUp('slow');
            $('.maincontent').removeClass('menumargin');
            $('.reports ul li').css('width', '');
        }
        //}
        //else{
        //	$location.path('/dashboard');
        //}
    }
    /*
     Function to goto DashBoard
     */
    $rootScope.gotoDashBoard = function () {
        $location.path('/dashboard');
    }

    /*
     Function for submenu toggle
     */
    $rootScope.toggleSubMenu = function (e, key) {
        $rootScope.headerStyle = {};
        $rootScope.headerStyle[key] = 'display: block;';
        if (key != 'Reports' && key != 'Heat Maps' && key != 'Measurements') {
            if ($(e.currentTarget).parent().children('ul').css('display') == "none") {
                // $(e.currentTarget).parent().children('ul').slideDown('slow');
                $(e.currentTarget).parent().children('a').children('em').removeClass('glyphicon-plus').addClass('glyphicon-minus');
            } else if ($(e.currentTarget).parent().children('ul').css('display') != "none") {
                // $(e.currentTarget).parent().children('ul').slideUp('slow');
                $(e.currentTarget).parent().children('a').children('em').removeClass('glyphicon-minus').addClass('glyphicon-plus');
            }
        } else if (key == 'Reports') {
            //  $location.path('/dashboard/reportsCategory');
            sessionStorage.setItem('REPORT_HOST_URL', oApp.config.REPORT_HOST_URL);
            $location.path('/dashboard/reportsTableau');

        } else if (key == 'Measurements') {
            $location.path('/dashboard/deviceMeasurements');
        }
        else if (key == 'Heat Maps') {
            $location.path('/dashboard/heatMaps');
        }


    }
    /*
     Function to show reports page
     */
    $rootScope.ShowReports = function (menuUrl, screenName) {
        console.log();
        var name = screenName.replace(/ /g, "");

        if (menuUrl != null && menuUrl != "" && name != 'DriveRoutes') {
            sessionStorage.setItem('menuUrl', menuUrl);
            $location.path('/dashboard/reports');
        } else if (name == 'System') {
            $location.path('/dashboard');
        }
        //$location.path('/dashboard/'+$stateParams.userId+'/reports');
        else if (name == 'Availability') {
            $location.path('/dashboard/deviceAvailability');
        }
        //
        else if (name == 'DeviceMap') {
            $location.path('/dashboard/deviceMaps');
        }
        //
        else if (name == 'ReplayMap') {
            $location.path('/dashboard/replayMap');
        } else if (name == 'MyDevices') {
            $location.path('/dashboard/myDevices');

        } else if (name == 'DriveRoutes') {
            sessionStorage.setItem('DriveroutesmenuUrl', menuUrl);
            $location.path('/dashboard/driveRoutes');

        } else if (name == 'UsersTable') {

            $location.path('/dashboard/userTable');
        } else if (name == 'UserGroups') {

            $location.path('/dashboard/UserGroups');
        }
        else if (name == 'Measurements') {

            $location.path('/dashboard/deviceMeasurements');
        }

    }

    /*
     Function to show reports page
     */
    $rootScope.actionCalledURL = function (key, menuUrl, screenName) {
        console.log();
        var name = screenName.replace(/ /g, "");
        var keyVal = key.replace(/ /g, "");
        if (keyVal == "Reports") {
            sessionStorage.setItem('tableauURL', menuUrl);
            $location.path("/dashboard/reportsTableau");
            location.reload();

        }
        else {
            if (name == 'Logout') {
                $rootScope.signOut();

            }
            else if (menuUrl != null && menuUrl != "") {


                $location.path(menuUrl);
            }

        }


    }

    /*
     function for signout
     */

    $rootScope.signOut = function () {
        var cookies = $cookies.getAll();
        console.log(cookies);
        angular.forEach(cookies, function (v, k) {
            $cookies.remove(k);
        });
        console.log('cleared cookie store');
        sessionStorage.clear();
        console.log('logging out');

        console.log($rootScope);
        $rootScope.menuData = null;
        $rootScope.role = null;

        $location.path('/login');
        //$rootScope=null;

    }
    /*
     function for change Password
     */
    $rootScope.changePassword = function () {
        $location.path('/dashboard/changePassword');
    }

    /* administrator tab*/
    $rootScope.newPage = function () {
        $location.path('/dashboard/administrator');
    }
    /* Server setting tab*/
    $rootScope.server = function () {
        $location.path('/dashboard/serverSetting');
    }
    /*user Adminstration Tab*/
    $rootScope.useradminstration = function () {
        $location.path('/dashboard/userAdminstration');
    }
    /*user Landingpage Tab*/
    $rootScope.landingpage = function () {

        $location.path('/dashboard/landingPage');
    }
    /*add Reports Tab*/
    $rootScope.addreports = function () {

        $location.path('/dashboard/addReports');
    }
    /*  add user groups */
    $rootScope.addUsergroups = function () {

        $location.path('/dashboard/addUsergroups');
    }

    /* Test Plan Administration */

    $rootScope.testplanAdmin = function () {
        $location.path('/dashboard/testplanAdmin');
    }
    /*
     device administration
     */

    $rootScope.deviceAdmin = function () {
        $location.path('/dashboard/deviceAdmin');
    }
    /*
     Function for assign reports

     */
    $rootScope.assignReport = function () {
        $location.path('/dashboard/assignReport');
    }

    $rootScope.userDeviceMapping = function () {
        $location.path('/dashboard/userDeviceMapping');
    }

    $rootScope.slideContent = function () {
        if ($(window).width() < 970) {

            $('.maincontent').removeClass('menumargin');
        } else {
            $('.maincontent').addClass('menumargin');
        }
    }
    $rootScope.getMenuData = function () {
        promise = AppServices.GetDashboardMenu(sessionStorage.userId, sessionStorage.token);
        promise.then(
            function (data) {
                console.log("Menu:" + data);
                $rootScope.menuData = data;

            },
            function (err) {
            }
        );
    }
    $rootScope.getTodayDate = function () {
        var date = '';
        var d = new Date();
        date += d.getFullYear() + '-';
        date += (d.getMonth() + 1) + '-';
        date += d.getDate();
        return date;
    }
    $rootScope.getCurrentTime = function () {
        var time = '';
        var d = new Date();
        time += d.getHours() + ":";
        time += d.getMinutes();
        return time;
    }
    $rootScope.goBack = function (page) {
        page = page.replace(/ /g, "");
        page = page.charAt(0).toLowerCase() + page.substr(1);
        if (page == $stateParams.performance)
            $location.path('/dashboard/' + page);
        else if (page == 'reportsCategory')
            $location.path('/dashboard/reportsCategory');
        else if (page == 'commomReport')
            $location.path('/dashboard/' + $stateParams.performance + '/' + $stateParams.zoneMarket + '/commomReport');
        else if (page == 'timeSchedule')
            $location.path('/dashboard/' + $stateParams.performance + '/' + $stateParams.zoneMarket + '/timeSchedule');
        else
            $location.path('/dashboard/' + $stateParams.performance + '/' + page);
    }
    /*
     To get favourite reports
     */
    $rootScope.getFavouriteReports = function () {
        promise = AppServices.GetFavouriteReports(sessionStorage.userId, sessionStorage.token);
        promise.then(
            function (data) {
                $rootScope.Favourites = data;
            },
            function (err) {

            }
        );
    }

    /*
     Add User Favourites
     */
    $rootScope.AddFavourite = function (screenId, screenName, menuUrl) {
        promise = AppServices.AddUserFavourites(sessionStorage.userId, screenId, screenName, menuUrl, sessionStorage.token);
        promise.then(
            function (data) {
                //$scope.show = true;
                if (data.status != "error") {
                    $rootScope.FavouritesResponseMessage = data.status;
                    var newFav = {"menu_id": screenId, "screen_name": screenName, "menu_url": menuUrl};
                    $rootScope.Favourites.push(newFav);
                    $('#FavouritesResponseMessageColor').css("color", "green");
                } else {
                    $rootScope.FavouritesResponseMessage = data.errorDescription;
                    $('#FavouritesResponseMessageColor').css("color", "red");
                }
                $('#FavouritesResponseMessagePopUp').modal('show');
                $timeout(function () {
                    $('#FavouritesResponseMessagePopUp').modal('hide');
                }, 2000);
            },
            function (err) {

            });
    }
    /*
     Remove user Favourites
     */
    $rootScope.isRemoveFavorite = false;
    $rootScope.favourites = function (e, screen_id) {

        $rootScope.isRemoveFavorite = true;
        promise = AppServices.RemoveUserFavourites(sessionStorage.getItem("userId"), screen_id, sessionStorage.getItem("token"));
        promise.then(
            function (data) {
                for (var i = 0; i < $rootScope.Favourites.length; i++) {
                    console.log('favourite menu id: ', $rootScope.Favourites[i].menu_id);
                    if ($rootScope.Favourites[i].menu_id == screen_id) {

                        $rootScope.Favourites.splice(i, 1);
                    }
                }
                $rootScope.isRemoveFavorite = false;
            },
            function (err) {

            }
        );
        e.stopPropagation();
    }
    /*
     To show Error / message into screen 
     */
    $rootScope.showErrorMessage = function (divId, msg) {
        $("#" + divId).text(msg);
        $("#" + divId).css('color', 'red');
        $("#" + divId).show();
        setTimeout(function () {
            $('#' + divId).hide();
        }, 4000);
    }
    $rootScope.showSuccessMessage = function (divId, msg) {
        $("#" + divId).text(msg);
        $("#" + divId).css('color', 'green');
        $("#" + divId).show();
        setTimeout(function () {
            $('#' + divId).hide();
        }, 4000);
    }
    $rootScope.inNewWindowTableauURL = function (tableauURL) {
        //alert(tableauURL);
        window.open(tableauURL, 'mywin', 'left=180,top=10,width=1500,height=auto,toolbar=1,resizable=0');
        /*	promise = ReportServices.GetReportCategory(userId, token);
         promise.then(
         function(data){
         $scope.reports = data;
         sessionStorage.setItem('reportsubmenus',JSON.stringify(data)); to set report data in reportsubmenus 	
         },
         function(err){

         }
         );*/
    }
});


oTech.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
oTech.filter('capitalizeFirstWord', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() : '';
    }
});
oTech.filter('footerYear', function () {
    return function (input) {
        return new Date().getFullYear();
    }
});
oTech.filter('headerIcon', function () {
    return function (headerNameStr) {
        var headerName = headerNameStr.replace(/ /g, "");
        var iconName = "";
        if (headerName == "Dashboard") {
            iconName = "icon-home2 position-left text-slate-600";

        }
        else if (headerName == "Reports") {
            iconName = "icon-pie-chart3 position-left text-orange-800";

        }
        else if (headerName == "MySettings") {
            iconName = "icon-equalizer3 position-left text-teal-300";

        }
        else if (headerName == "Admin") {
            iconName = "icon-pie-chart3 position-left text-brown-300";

        }


        return iconName;
    }
});

oTech.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {

                //set the form control to valid if both 
                //passwords are the same, else invalid
                control.$setValidity("passwordMatch", n);
            });
        }
    };
}]);

oTech.directive('contenteditable', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            elm.bind('blur', function () {
                scope.$apply(function () {
                    ctrl.$setViewValue(elm.html());
                });
            });
            ctrl.$render = function () {
                elm.html(ctrl.$viewValue);
            };

        }
    };
});

oTech.directive('dateParser', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            var dateFormat = scope.format;

            ctrl.$formatters.push(function (modelValue) {
                return "01/01/1900";
            });

            ctrl.$parsers.unshift(function (viewValue) {
                //convert string input into moment data model
                var isValueADate = (viewValue === null) ? false : angular.isDate(viewValue);
                var parsedMoment = (isValueADate) ? moment(viewValue) : moment(viewValue, dateFormat);

                //toggle validity
                ctrl.$setValidity(attrs.ngModel, parsedMoment.isValid());

                //return model value
                return parsedMoment.isValid() ? parsedMoment.toDate() : undefined;
            });
        }
    };
});
oTech.directive('myTable', function () {
    return function (scope, element, attrs) {

        // apply DataTable options, use defaults if none specified by user
        var options = {};
        if (attrs.myTable.length > 0) {
            options = scope.$eval(attrs.myTable);
        } else {
            options = {
                "bStateSave": true,
                "iCookieDuration": 2419200, /* 1 month */
                "bJQueryUI": true,
                "bPaginate": false,
                "bLengthChange": false,
                "bFilter": false,
                "bInfo": false,
                "bDestroy": true
            };
        }

        // Tell the dataTables plugin what columns to use
        // We can either derive them from the dom, or use setup from the controller           
        var explicitColumns = [];
        element.find('th').each(function (index, elem) {
            // explicitColumns.push($(elem).text());
            explicitColumns.push({name: $(elem).text()});
        });
        if (explicitColumns.length > 0) {
            options["aoColumns"] = explicitColumns;
        } else if (attrs.aoColumns) {
            options["aoColumns"] = scope.$eval(attrs.aoColumns);
        }

        // aoColumnDefs is dataTables way of providing fine control over column config
        if (attrs.aoColumnDefs) {
            options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
        }

        if (attrs.fnRowCallback) {
            options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
        }

        // apply the plugin
        var dataTable = element.dataTable(options);


        // watch for any changes to our data, rebuild the DataTable
        scope.$watch(attrs.aaData, function (value) {
            var val = value || null;
            if (val) {
                dataTable.fnClearTable();
                dataTable.fnAddData(scope.$eval(attrs.aaData));
            }
        });
    };
});
oTech.directive('gridtableHeight', function () {
    return function (scope, element, attrs) {
        var rowHeight = 40; // your row height
        var headerHeight = 58; // your header height
        var footerPage = 0;
        return {
            height: ($scope.addUsergroupsGridOptions.data.length * rowHeight + headerHeight + footerPage) + "px"
        };

    };
});

angular.module('oTech').factory('messages', function () {
    var messages = [];

    messages.add = function (message) {
        messages.push(message);
    };
    return messages;

});

angular.module('oTech').factory('messagesTemplate', function () {
    var messages = [];

    messages.add = function (message) {
        messages.push(message);
    };
    return messages;

});

oTech.directive('selectBoxPreSelected', function ($timeout) {
    return {
        restrict: 'AC',
        link: function (scope, element, attrs) {
            $timeout(function () {
                element.show();
                $(element).select2();
            });
        }
    };
});

oTech.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9-]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }

            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});


oTech.directive('uiGridEditDatepicker', ['$timeout', '$document', 'uiGridConstants', 'uiGridEditConstants', function($timeout, $document, uiGridConstants, uiGridEditConstants) {
    return {
        template: function(element, attrs) {
            var html = '<div class="datepicker-wrapper" ><input type="text" uib-datepicker-popup datepicker-options="datepickerOptions" datepicker-append-to-body="true" is-open="isOpen" ng-model="datePickerValue" ng-change="changeDate($event)" ng-keydown="editDate($event)" popup-placement="auto top"/></div>';
            return html;
        },
        require: ['?^uiGrid', '?^uiGridRenderContainer'],
        scope: true,
        compile: function() {
            return {
                pre: function($scope, $elm, $attrs) {
                    if ($attrs.datepickerOptions){
                        if ($scope.col.grid.appScope[$attrs.datepickerOptions]){
                            $scope.datepickerOptions = $scope.col.grid.appScope[$attrs.datepickerOptions];
                        }
                    }
                },
                post: function($scope, $elm, $attrs, controllers) {
                    var setCorrectPosition = function() {
                        var gridElement = $('.ui-grid-viewport');
                        var gridPosition = {
                            width: gridElement.outerWidth(),
                            height: gridElement.outerHeight(),
                            offset: gridElement.offset()
                        };

                        var cellElement = $($elm);
                        var cellPosition = {
                            width: cellElement.outerWidth(),
                            height: cellElement.outerHeight(),
                            offset: cellElement.offset()
                        };

                        var datepickerElement = $('body > .dropdown-menu, body > div > .dropdown-menu');
                        var datepickerPosition = {
                            width: datepickerElement.outerWidth(),
                            height: datepickerElement.outerHeight()
                        };

                        var setCorrectTopPositionInGrid = function() {
                            var topPosition;
                            var freePixelsOnBottom = gridPosition.height - (cellPosition.offset.top - gridPosition.offset.top) - cellPosition.height;
                            var freePixelsOnTop = gridPosition.height - freePixelsOnBottom - cellPosition.height;
                            var requiredPixels = (datepickerPosition.height - cellPosition.height) / 2;
                            if (freePixelsOnBottom >= requiredPixels && freePixelsOnTop >= requiredPixels) {
                                topPosition = cellPosition.offset.top - requiredPixels + 10;
                            } else if (freePixelsOnBottom >= requiredPixels && freePixelsOnTop < requiredPixels) {
                                topPosition = cellPosition.offset.top - freePixelsOnTop + 10;
                            } else {
                                topPosition = gridPosition.height - datepickerPosition.height + gridPosition.offset.top - 20;
                            }
                            return topPosition;
                        };

                        var setCorrectTopPositionInWindow = function() {
                            var topPosition;
                            var windowHeight = window.innerHeight - 10;

                            var freePixelsOnBottom = windowHeight - cellPosition.offset.top;
                            var freePixelsOnTop = windowHeight - freePixelsOnBottom - cellPosition.height;
                            var requiredPixels = (datepickerPosition.height - cellPosition.height) / 2;
                            if (freePixelsOnBottom >= requiredPixels && freePixelsOnTop >= requiredPixels) {
                                topPosition = cellPosition.offset.top - requiredPixels;
                            } else if (freePixelsOnBottom >= requiredPixels && freePixelsOnTop < requiredPixels) {
                                topPosition = cellPosition.offset.top - freePixelsOnTop;
                            } else {
                                topPosition = windowHeight - datepickerPosition.height - 10;
                            }
                            return topPosition;
                        };


                        var newOffsetValues = {};

                        var isFreeOnRight = (gridPosition.width - (cellPosition.offset.left - gridPosition.offset.left) - cellPosition.width) > datepickerPosition.width;
                        if (isFreeOnRight) {
                            newOffsetValues.left = cellPosition.offset.left + cellPosition.width;
                        } else {
                            newOffsetValues.left = cellPosition.offset.left - datepickerPosition.width;
                        }

                        if (datepickerPosition.height < gridPosition.height) {
                            newOffsetValues.top = setCorrectTopPositionInGrid();
                        } else {
                            newOffsetValues.top = setCorrectTopPositionInWindow();
                        }

                        datepickerElement.offset(newOffsetValues);
                        datepickerElement.css("visibility", "visible");
                    };

                    $timeout(function() {
                        setCorrectPosition();
                    }, 0);



                    $scope.datePickerValue = new Date($scope.row.entity[$scope.col.field]);
                    $scope.isOpen = true;
                    var uiGridCtrl = controllers[0];
                    var renderContainerCtrl = controllers[1];

                    var onWindowClick = function (evt) {
                        var classNamed = angular.element(evt.target).attr('class');
                        if (classNamed) {
                            var inDatepicker = (classNamed.indexOf('datepicker-calendar') > -1);
                            if (!inDatepicker && evt.target.nodeName !== "INPUT") {
                                $scope.stopEdit(evt);
                            }
                        }
                        else {
                            $scope.stopEdit(evt);
                        }
                    };

                    var onCellClick = function (evt) {
                        angular.element(document.querySelectorAll('.ui-grid-cell-contents')).off('click', onCellClick);
                        $scope.stopEdit(evt);
                    };

                    $scope.editDate = function(evt) {
                        if (evt.keyCode > 48){
                            $scope.datePickerValue = new Date($scope.row.entity[$scope.col.field]);
                        }
                    };

                    $scope.changeDate = function (evt) {
                        if (angular.isDate($scope.datePickerValue)) {
                            $scope.row.entity[$scope.col.field] = $scope.datePickerValue;
                            $scope.stopEdit(evt);
                        } else {
                            $scope.datePickerValue = new Date($scope.row.entity[$scope.col.field]);
                        }
                    };

                    $scope.$on(uiGridEditConstants.events.BEGIN_CELL_EDIT, function () {
                        if (uiGridCtrl.grid.api.cellNav) {
                            uiGridCtrl.grid.api.cellNav.on.navigate($scope, function (newRowCol, oldRowCol) {
                                $scope.stopEdit();
                            });
                        } else {
                            angular.element(document.querySelectorAll('.ui-grid-cell-contents')).on('click', onCellClick);
                        }
                        angular.element(window).on('click', onWindowClick);
                    });

                    $scope.$on('$destroy', function () {
                        angular.element(window).off('click', onWindowClick);
                        $('body > .dropdown-menu, body > div > .dropdown-menu').remove();
                    });

                    $scope.stopEdit = function(evt) {
                        $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                    };

                    $elm.on('keydown', function(evt) {
                        switch (evt.keyCode) {
                            case uiGridConstants.keymap.ESC:
                                evt.stopPropagation();
                                $scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
                                break;
                        }
                        if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                            evt.uiGridTargetRenderContainerId = renderContainerCtrl.containerId;
                            if (uiGridCtrl.cellNav.handleKeyDown(evt) !== null) {
                                $scope.stopEdit(evt);
                            }
                        } else {
                            switch (evt.keyCode) {
                                case uiGridConstants.keymap.ENTER:
                                case uiGridConstants.keymap.TAB:
                                    evt.stopPropagation();
                                    evt.preventDefault();
                                    $scope.stopEdit(evt);
                                    break;
                            }
                        }
                        return true;
                    });
                }
            };
        }
    };
}]);

angular.module('ui.grid').factory('InlineEdit', ['$interval', '$rootScope', 'uiGridRowEditService',
    function ($interval, $rootScope, uiGridRowEditService) {
        function inlineEdit(entity, index, grid) {
            this.grid = grid;
            this.index = index;
            this.entity = {};
            this.isEditModeOn = false;
            this.init(entity);
        }

        inlineEdit.prototype = {
            init: function (rawEntity) {
                var self = this;

                for (var prop in rawEntity) {
                    self.entity[prop] = {
                        value: rawEntity[prop],
                        isValueChanged: false,
                        isSave: false,
                        isCancel: false,
                        isEdit: false
                    }
                }
            },

            enterEditMode: function (event) {
                event && event.stopPropagation();
                var self = this;
                self.isEditModeOn = true;

                // cancel all rows which are in edit mode
                self.grid.rows.forEach(function (row) {
                    if (row.inlineEdit && row.inlineEdit.isEditModeOn && row.uid !== self.grid.rows[self.index].uid) {
                        row.inlineEdit.cancelEdit();
                    }
                });

                // Reset all the values
                for (var prop in self.entity) {
                    self.entity[prop].isSave = false;
                    self.entity[prop].isCancel = false;
                    self.entity[prop].isEdit = true;
                }
            },

            saveEdit: function (event) {
                event && event.stopPropagation();
                var self = this;

                self.isEditModeOn = false;

                for (var prop in self.entity) {
                    self.entity[prop].isSave = true;
                    self.entity[prop].isEdit = false;
                }

                uiGridRowEditService.saveRow(self.grid, self.grid.rows[self.index])();
            },

            cancelEdit: function (event) {
                event && event.stopPropagation();
                var self = this;

                self.isEditModeOn = false;
                for (var prop in self.entity) {
                    self.entity[prop].isCancel = true;
                    self.entity[prop].isEdit = false;
                }
            }
        }

        return inlineEdit;
    }]);



