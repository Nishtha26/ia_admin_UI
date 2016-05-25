
oTech.controller('MyDevicesController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		$scope.loading = true;
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		$rootScope.role = sessionStorage.role;
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
		
		$scope.openDevicedata =function(e){
			
			// alert($(e.currentTarget).text());
		}
		
		var columns = oApp.config.mydeviceColumns;
                            

    $scope.gridOptions = {
        columnDefs: columns,
        rowSelection: 'multiple',
        rowData: null,
        onRowSelected: rowSelectedFunc,
		enableFilter: true,
		enableSorting: true

       // onRowDeselected: rowDeselectedFunc,
       // onSelectionChanged: selectionChangedFunc
    };
	
    function rowDeselectedFunc(event) {
        window.alert("row " + event.node.data.deviceId + " de-selected");
    }

    function rowSelectedFunc(event) {
      // window.alert("row " + event.node.data.deviceId + " selected");
		$scope.devicename =event.node.data.deviceName;
		$scope.devicetype =event.node.data.deviceType;
		$scope.iacversion =event.node.data.iacVersion;
		$scope.imei =event.node.data.imei;
		$scope.imsi =event.node.data.imsi;
		$scope.lastping =event.node.data.lastPing;
    }

   function selectionChangedFunc(event) {
       window.alert('selection changed, ' + event.selectedRows.length + ' rows selected');
    }
	
	
	 /* Devices list */
   $scope.myDevicesGridOptions = oApp.config.myDevicesGridOptions;
	$scope.myDevicesGridOptions.onRegisterApi = function( gridApi ) { //extra code
	 $scope.gridApi = gridApi;
	  $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
	    console.log(row);
	    }); 
    };
   
		$scope.showDeviceList = function(){
			$scope.dataLoading = true;
			promise = AppServices.GetDeviceData(userId, token);
			promise.then(
			function(data){
				$scope.myDevicesGridOptions.data = data.devicesList;
				$scope.dataLoading = false;
			},
			function(err){
				console.log(err);
			}
		);
	}

   $scope.showDeviceList();
		
	});