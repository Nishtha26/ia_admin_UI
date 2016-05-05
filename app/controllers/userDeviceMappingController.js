oTech.controller('userDeviceMappingController',
    function ($scope, $rootScope, $location, AppServices, $stateParams,$timeout) {
        var token = sessionStorage.getItem("token");
        var userId = sessionStorage.getItem("userId");
        $rootScope.role =sessionStorage.getItem("role");
       
       var deviceId,selectedUserId;
        $scope.error=false;
        $scope.errormsg="";
        
        $rootScope.slideContent();
        
        window.onresize = function(event) {
            $rootScope.slideContent();
        }
        $scope.name = sessionStorage.getItem("username");
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


        $scope.userTableGridOptions = oApp.config.userTableGridOptions;
        /*on grid row clicked*/
        $scope.userTableGridOptions.onRegisterApi = function( gridApi ) { //extra code
            // console.log(gridApi);
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
                
                console.log(row.entity);
                selectedUserId=row.entity.userId;
                $scope.allDeviceData();
                $scope.selectedDeviceData();
              

            });
        };



        /*  To get User Table data For Useradminstration */
        $scope.userTableData = function(){
            promise = AppServices.GetuserTableData(userId, token);
            promise.then(
                function(data){

                    $scope.userTableGridOptions.data = data;
                    //console.log($scope.serverSettingsGridOptions.data[0]);
                    $scope.gridApi.selection.selectRow($scope.userTableGridOptions.data[0]); //extra code
                },
                function(err){

                }
            );
        }

        $scope.userTableData();
    

  $scope.allDeviceGridOptions = oApp.config.allDeviceGridOptions;
        /*on grid row clicked*/
        $scope.allDeviceGridOptions.onRegisterApi = function( gridApi ) { //extra code
            // console.log(gridApi);
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
                
                console.log('allDeviceGridOptions ',row.entity);
                deviceId=row.entity.deviceId;

            });
        };

  $scope.allDeviceData = function(){
            promise = AppServices.getDevicesNotAvailableForUser(token,selectedUserId);
            promise.then(
                function(data){

                    $scope.allDeviceGridOptions.data = data;
                    //console.log($scope.serverSettingsGridOptions.data[0]);
                    $scope.gridApi.selection.selectRow($scope.allDeviceGridOptions.data[0]); //extra code
                },
                function(err){

                }
            );
        }

        $scope.selectedDeviceGridOptions = oApp.config.selectedDeviceGridOptions;
        /*on grid row clicked*/
        $scope.selectedDeviceGridOptions.onRegisterApi = function( gridApi ) { //extra code
            // console.log(gridApi);
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
                
                console.log('selectedDeviceGridOptions ',row.entity);
                deviceId=row.entity.deviceId;
              

            });
        };


         $scope.selectedDeviceData = function(){
            promise = AppServices.getDevicesAvailableForUser(token,selectedUserId);
            promise.then(
                function(data){

                    $scope.selectedDeviceGridOptions.data = data;
                    //console.log($scope.serverSettingsGridOptions.data[0]);
                    $scope.gridApi.selection.selectRow($scope.selectedDeviceGridOptions.data[0]); //extra code
                },
                function(err){

                }
            );
        }

        $scope.addDevice = function(){
            promise = AppServices.assignDeviceToUser(token,selectedUserId,deviceId);
            promise.then(
                function(data){
                    if(data.status =="success"){

                    $scope.allDeviceData();
                    $scope.selectedDeviceData();
                    }else{
                        console.log("error occured");
                    }

                   
                },
                function(err){

                }
            );

        }

        $scope.removeDevice = function(){
            promise = AppServices.assignDeviceToUser(token,userId,deviceId);
            promise.then(
                function(data){
                    if(data.status =="success"){
                        
                        $scope.allDeviceData();
                    $scope.selectedDeviceData();
                    }else{
                        console.log("error occured");
                    }

                    
                },
                function(err){

                }
            );

        }


    });