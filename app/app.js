var oTech = angular.module("oTech", ['ui.router', 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.grid.pagination', 'ui.grid.treeView', 'ngSanitize', "agGrid", 'ngCookies', 'ui.bootstrap', 'angularjs-datetime-picker', 'treeGrid', 'ncy-angular-breadcrumb', 'angular.filter', 'ui.tree']).filter('oTech', function () {});


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
                })
                .state("myDevices", {
                    url: "/dashboard/myDevices",
                    templateUrl: "app/views/mydevices.html",
                    controller: 'MyDevicesController'
                })
                .state("testScript", {
                    url: "/dashboard/testScript",
                    templateUrl: "app/views/testScript.html",
                    controller: 'testScriptController'
                })
                .state("createTestPlan", {
                    url: "/dashboard/testScript/createTestPlan",
                    templateUrl: "app/views/createTestPlan.html",
                    controller: 'createTestPlanController',
                    ncyBreadcrumb: {
                        label: 'Create Test Plan'
                    }
                })
                .state("EditTestplan", {
                    url: "/dashboard/testScript/EditTestplan",
                    templateUrl: "app/views/editTestPlan.html",
                    controller: 'editTestPlanController',
                    ncyBreadcrumb: {
                        label: '{{TestplanName}}'
                    }
                })
                .state('EditTestplan.EditCommandParameters', {
                    url: '/EditCommandParameters',
                    views: {
                        "@": {
                            templateUrl: 'app/views/editTestplanCmndprmtrs.html',
                            controller: 'editTestPlanController'
                        }
                    },
                    ncyBreadcrumb: {
                        label: 'Edit Test Plan'
                    }
                })
                .state("CreateTestRun", {
                    url: "/CreateTestRun",
                    templateUrl: "app/views/editTestRun1.html",
                    controller: 'createTestRunController',
                    ncyBreadcrumb: {
                        label: '{{TestplanName}}'
                    }
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
                    templateUrl: "app/views/SelectTestRun.html",
                    controller: 'editTestRunController',
                    ncyBreadcrumb: {
                        label: '{{testRunName}}'
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

oTech.run(function ($rootScope, $location, $stateParams, $sce, AppServices, $timeout, $cookieStore, $cookies, createTestRunScheduleService) {

    $rootScope.$on('$locationChangeStart', function (event, next, current) {

        if ($location.path() !== '/login' && sessionStorage.getItem('isLogin') == null) {
            $location.path('/login');
        }

    });


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
    /* Test Script navigation */
    $rootScope.testscript = function () {

        $location.path('/dashboard/testScript');
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
            $location.path('/dashboard/reportsCategory');
        } else if (key == 'Measurements') {
            $location.path('/dashboard/deviceMeasurements');
        }

    }
    /*
     Function to show reports page
     */
    $rootScope.ShowReports = function (menuUrl, screenName) {
        console.log();
        var name = screenName.replace(/ /g, "");

        if (menuUrl != null && menuUrl !="" && name != 'DriveRoutes') {
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
                        console.log('favourite menu id: ',$rootScope.Favourites[i].menu_id);
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

});
oTech.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});




