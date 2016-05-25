oTech
		.controller(
				'deviceMeasurementsController',
				function($scope, $rootScope, $location, AppServices,
						$stateParams) {

					$scope.listItem = 'apn';
					var token = sessionStorage.getItem("token");
					var userId = sessionStorage.getItem("userId");
					$rootScope.role = sessionStorage.getItem("role");

					var startLimit = 1;
					var displayLength = 20;
					var totalRecords = 0;

					var link = "apn";
					var count = 0;
					$scope.pageSize = '20';
					var allOfTheData;
					$rootScope.slideContent();
					window.onresize = function(event) {
						$rootScope.slideContent();
					}
					$scope.name = sessionStorage.getItem("username");
					/*
					 * To get dashboard menu data
					 */
					$scope.getDashBoardMenu = function() {
						if ($rootScope.menuData == undefined) {
							$rootScope.getMenuData();
						}
					}
					/*
					 * To get favourite reports
					 */
					$scope.getFavouriteReports = function() {
						if ($rootScope.Favourites == undefined) {
							$rootScope.getFavouriteReports();
						}
					}

					/* show measurement list */
					$scope.getmeasurementList = function() {
						$scope.dataLoading = true;
						promise = AppServices.getmeasurementList(token);
						promise.then(function(data) {
							$scope.devices = data;

						}, function(err) {
							console.log(err);
						});
					}
					
					document.getElementById("previous").disabled = true;
					var endLimit = 20;
					
					
					// function for next and previous button in measurement grid 
					$scope.reset = function() {
						startLimit = 1;
						endLimit = 20;
						document.getElementById('info').innerHTML = 'Showing '
								+ startLimit + ' to ' + endLimit + ' of '
								+ totalRecords;
						//displayLength = endLimit;
						// $scope.showDeviceList(link);
					}
					$scope.next = function() {
						// alert(startLimit);
						$scope.loading = true;
						startLimit = startLimit + 20;
						endLimit = endLimit + 20;
						count = count + 1;
						if(endLimit > totalRecords){
							endLimit = startLimit+(19-(endLimit - totalRecords));
						}
						
						document.getElementById("previous").disabled = false;
						document.getElementById('info').innerHTML = 'Showing '
								+ startLimit + ' to ' + endLimit + ' of '
								+ totalRecords;
						//displayLength = endLimit;
						$scope.showDeviceList(link);
						
						if (totalRecords == endLimit || totalRecords < endLimit) {
							console.log("count" + count);
							console.log("startLimit" + startLimit);
							console.log("endLimit" + endLimit);
							document.getElementById("next").disabled = true;
						}
					}
					$scope.previous = function() {
						document.getElementById("next").disabled = false;
						count = count - 1;
						startLimit = startLimit - 20;
						// added by punit
						if(totalRecords == endLimit)
						{
							var reminder = totalRecords % displayLength;
							if(reminder > 0){
								endLimit = totalRecords - reminder;
							}else{
								endLimit = endLimit - 20;
							}
						}
						
						
						//displayLength = endLimit;
						document.getElementById('info').innerHTML = 'Showing '
								+ startLimit + ' to ' + endLimit + ' of '
								+ totalRecords;
						$scope.showDeviceList(link);
						console.log("count" + count);
						console.log("startLimit" + startLimit);
						console.log("endLimit" + endLimit);
						if (count == 0 || (startLimit == 1 && endLimit == 20)) {
							console.log("count" + count);
							console.log("startLimit" + startLimit);
							console.log("endLimit" + endLimit);
							document.getElementById("previous").disabled = true;
						}
					}

					$scope.openDevicedata = function(e) {

						// alert($(e.currentTarget).text());
					}

					var columns = oApp.config.mydeviceColumns;

					$scope.gridOptions = {
						columnDefs : columns,
						rowSelection : 'multiple',
						rowData : null,
						onRowSelected : rowSelectedFunc,
						enableFilter : true,
						enableSorting : true

					// onRowDeselected: rowDeselectedFunc,
					// onSelectionChanged: selectionChangedFunc
					};

					function rowDeselectedFunc(event) {
						window.alert("row " + event.node.data.deviceId
								+ " de-selected");
					}

					function rowSelectedFunc(event) {
						// window.alert("row " + event.node.data.deviceId + "
						// selected");
						$scope.devicename = event.node.data.deviceName;
						$scope.devicetype = event.node.data.deviceType;
						$scope.iacversion = event.node.data.iacVersion;
						$scope.imei = event.node.data.imei;
						$scope.imsi = event.node.data.imsi;
						$scope.lastping = event.node.data.lastPing;
					}

					function selectionChangedFunc(event) {
						window.alert('selection changed, '
								+ event.selectedRows.length + ' rows selected');
					}
					
					$scope.devicesMeasurementGridOptions = oApp.config.deviceListGridOptionsapn;
					/* measurement list apn */
					$scope.showDeviceList = function(link) {
						$scope.dataLoading = true;
						$scope.one = false;
						$scope.err = false;
						// $scope.noerr = true;
						
						if($scope.listItem == 'apn')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsapn;
						else if ($scope.listItem == 'applications')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsapplications;
						else if($scope.listItem == 'ipaddress')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsipaddress;
						else if($scope.listItem == 'l1log')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsl1log;
						else if($scope.listItem == 'location')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefslocation;
						else if($scope.listItem == 'mms')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsmms;
						else if($scope.listItem == 'neighborcellinfo')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsneighborcellinfo;
						else if($scope.listItem == 'sms')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefssms;
						else if($scope.listItem == 'tcpperformance')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefstcpperformance;
						else if($scope.listItem == 'udpperformance')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsudpperformance;
						else if($scope.listItem == 'voice')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsvoice;
						else if($scope.listItem == 'wifiinfo')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefswifiinfo;
						else if($scope.listItem == 'wifitrafficinfo')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefswifitrafficinfo;
						else if($scope.listItem == 'attach')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsattach;
						else if($scope.listItem == 'latency')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefslatency;
						else if($scope.listItem == 'upload')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsupload;
						else if($scope.listItem == 'email')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsemail;
						else if($scope.listItem == 'datausage')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsdatausage;
						else if($scope.listItem == 'video')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsvideo;
						else if($scope.listItem == 'clickscreanimage')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsclickscreanimage;
						else if($scope.listItem == 'audio')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsaudio;
						else if($scope.listItem == 'clickscreanxy')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsclickscreanxy;
						else if($scope.listItem == 'download')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsdownload;

						promise = AppServices.GetMeasurementsapnData(userId,
								token, displayLength, startLimit, link);
						promise.then(function(data) {
							totalRecords = data.totalRecords;
							if (data.totalRecords == 0) {

								$scope.butn = false;

							}

							if (data.apnData.length > 0) {
								$scope.one = true;
								$scope.butn = true;
								$scope.DeviceList = data;
								allOfTheData = data.apnData;
								$scope.dataLoading = false;

								if (data.totalRecords == endLimit) {
									$scope.nextButton = false;
									// document.getElementById("next").disabled
									// = false;
								} else {
									$scope.nextButton = true;
								}
								$scope.createNewDatasource();

							} else {
								$scope.nextButton = false;
								$scope.dataLoading = false;
								$scope.err = true;
								$scope.one = false;
								// document.getElementById("next").disabled =
								// true;
							}
						}, function(err) {
							console.log(err);
						});
					}

					/* call to grid view for device list */
					$scope.createNewDatasource = function() {

						if (!allOfTheData) {

							// in case user selected 'onPageSizeChanged()' before the json was loaded
							return;
						}
						if(startLimit == 1){
						document.getElementById('info').style.marginLeft = '30px';
						document.getElementById('info').innerHTML = 'Showing '
								+ startLimit + ' to ' + displayLength + ' of '
								+ totalRecords;
						}

						$scope.devicesMeasurementGridOptions.data = allOfTheData;

						//$scope.gridOptions.api.setDatasource(allOfTheData);

					}

					$scope.getDashBoardMenu();
					$scope.getFavouriteReports();
					$scope.getmeasurementList();
					$scope.showDeviceList(link);
					$scope.openDevicedata = function(e) {
						link = $(e.currentTarget).text();
						$scope.listItem = link;
						$scope.showDeviceList(link);
						$scope.reset();
					}

				});