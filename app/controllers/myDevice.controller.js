
oTech.controller('MyDevicesController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		
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
		$scope.showDeviceList = function(){
			
			promise = AppServices.GetDeviceData(userId, token);
			promise.then(
			function(data){
				console.log(data);
				var data1 =data.devicesList;
			 $scope.gridOptions.api.setRowData(data1);
			// $scope.gridOptions.rowData=data.devicesList;

			},
			function(err){
				console.log(err);
			}
		);
	}

   $scope.showDeviceList();
		
	});