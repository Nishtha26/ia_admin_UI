oTech.controller('deviceMeasurementsController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		$scope.listItem = 'apn';
		var token = sessionStorage.getItem("token");
		var userId = sessionStorage.getItem("userId");
		$rootScope.role = sessionStorage.getItem("role");
		
		var startLimit = 1;
		var displayLength = 10;
		var totalRecords = 0;
		
		var link = "apn";
		var option = oApp.config.deviceListGridOptionsapn;
		var count = 0;
		$scope.pageSize = '10';
		var allOfTheData;
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
		/*show measurement list*/
		$scope.getmeasurementList = function(){
		$scope.dataLoading = true;
		promise = AppServices.getmeasurementList(token);
		promise.then(
			function(data){
				$scope.devices = data;

			},
			function(err){
				console.log(err);
			}
		);
	}
	$scope.gridOptions = oApp.config.deviceListGridOptionsapn;
	 /* measurement list apn */
		$scope.showDeviceList = function(link){
			$scope.dataLoading = true;
			$scope.one = false;
			$scope.err = false;
			//$scope.noerr = true;
			promise = AppServices.GetMeasurementsapnData(userId, token,displayLength,startLimit, link);
			promise.then(
			function(data){
				totalRecords = data.totalRecords;
				if(data.totalRecords == 0)
				{
					
					$scope.butn = false;
					
				}
				
				if(data.apnData.length > 0){
					$scope.one =true;
					$scope.butn = true;
					$scope.DeviceList = data;
					allOfTheData = data.apnData;
					$scope.dataLoading = false;
					
					if(data.totalRecords == endLimit)
					{
						$scope.nextButton = false;
						//document.getElementById("next").disabled = false;
					} else {
						$scope.nextButton = true;
					}
					$scope.createNewDatasource();
					
				}
				else{
					$scope.nextButton = false;
					$scope.dataLoading = false;
					$scope.err = true;
					$scope.one =false;
					//document.getElementById("next").disabled = true;
				}
			},
			function(err){
				console.log(err);
			}
		);
	}
	
	 $scope.onPageSizeChanged = function() {
        $scope.createNewDatasource();
    };
	document.getElementById("previous").disabled = true;
	var endLimit = 10;
	document.getElementById('info').style.marginLeft = '30px';
	document.getElementById('info').innerHTML = 'Showing ' + startLimit + ' to ' + displayLength+' of '+totalRecords ;
	
	/* function for next and previous button in measurement grid*/
	$scope.reset = function() {
		startLimit = 1;
		endLimit = 10;
		document.getElementById('info').innerHTML ='Showing ' + startLimit + ' to ' + endLimit+' of '+totalRecords ;
		displayLength = endLimit;
		//$scope.showDeviceList(link);
	}
	$scope.next = function(){
		//alert(startLimit);
		startLimit = startLimit + 10;
		endLimit = endLimit + 10;
		count = count + 1;
		document.getElementById("previous").disabled = false;
		document.getElementById('info').innerHTML ='Showing ' + startLimit + ' to ' + endLimit +' of '+totalRecords;
		displayLength = endLimit;
		$scope.showDeviceList(link);
		
	}
	$scope.previous = function(){
		count = count - 1;
		startLimit = startLimit-10;
		endLimit = endLimit-10;
		displayLength = endLimit;
		document.getElementById('info').innerHTML = 'Showing' + startLimit + ' to ' + endLimit+' of '+totalRecords ;
		$scope.showDeviceList(link);
		console.log("count" + count);
		console.log("startLimit" + startLimit);
		console.log("endLimit" + endLimit);
		if(count == 0 || (startLimit== 1 && endLimit == 10))
		{
			console.log("count" + count);
			console.log("startLimit" + startLimit);
			console.log("endLimit" + endLimit);
			document.getElementById("previous").disabled = true;
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
		/*call to grid view for device list*/
		$scope.createNewDatasource = function() {
			
        if (!allOfTheData) {
		
            // in case user selected 'onPageSizeChanged()' before the json was loaded
            return;
        }

        var dataSource = {
            //rowCount: ???, - not setting the row count, infinite paging will be used
            pageSize: parseInt($scope.pageSize), // changing to number, as scope keeps it as a string
            getRows: function (params) {
                // this code should contact the server for rows. however for the purposes of the demo,
                // the data is generated locally, a timer is used to give the experience of
                // an asynchronous call
               // console.log('asking for ' + params.startRow + ' to ' + params.endRow);
			//	document.getElementById('mo').innerHTML = 'asking for ' + params.startRow + ' to ' + params.endRow ;
                //$timeout( function() {
                    // take a chunk of the array, matching the start and finish times
                    var rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
                    // see if we have come to the last page. if we have, set lastRow to
                    // the very last row of the last page. if you are getting data from
                    // a server, lastRow could be returned separately if the lastRow
                    // is not in the current page.
                    var lastRow = -1;
                    if (allOfTheData.length <= params.endRow) {
                        lastRow = allOfTheData.length;
                    }
                    params.successCallback(rowsThisPage, lastRow);
				//}, 2000);
            }
        };
		if($scope.listItem == 'apn')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsapn);
		else if ($scope.listItem == 'applications')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsapplications);
		else if($scope.listItem == 'ipaddress')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsipaddress);
		else if($scope.listItem == 'l1log')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsl1log);
		else if($scope.listItem == 'location')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefslocation);
		else if($scope.listItem == 'mms')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsmms);
		else if($scope.listItem == 'neighborcellinfo')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsneighborcellinfo);
		else if($scope.listItem == 'sms')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefssms);
		else if($scope.listItem == 'tcpperformance')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefstcpperformance);
		else if($scope.listItem == 'udpperformance')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsudpperformance);
		else if($scope.listItem == 'voice')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsvoice);
		else if($scope.listItem == 'wifiinfo')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefswifiinfo);
		else if($scope.listItem == 'wifitrafficinfo')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefswifitrafficinfo);
		else if($scope.listItem == 'attach')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsattach);
		else if($scope.listItem == 'latency')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefslatency);
		else if($scope.listItem == 'upload')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsupload);
		else if($scope.listItem == 'email')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsemail);
		else if($scope.listItem == 'datausage')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsdatausage);
		else if($scope.listItem == 'video')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsvideo);
		else if($scope.listItem == 'clickscreanimage')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsclickscreanimage);
		else if($scope.listItem == 'audio')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsaudio);
		else if($scope.listItem == 'clickscreanxy')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsclickscreanxy);
		else if($scope.listItem == 'download')
			$scope.gridOptions.api.setColumnDefs(oApp.config.columnDefsdownload);
		
		$scope.gridOptions.api.setDatasource(dataSource);
    }
		$scope.getDashBoardMenu();
		$scope.getFavouriteReports();
		$scope.getmeasurementList();
		$scope.showDeviceList(link);
		$scope.openDevicedata =function(e){
			link = $(e.currentTarget).text();
			$scope.listItem = link;
			$scope.showDeviceList(link);
			$scope.reset();
		}
			
	});