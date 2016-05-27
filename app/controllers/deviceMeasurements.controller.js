oTech
		.controller(
				'deviceMeasurementsController',
				function($scope, $rootScope, $location, AppServices,
						$stateParams) {
					$scope.dataLoading = true;
					$scope.listItem = 'apn';
					var link = "apn";
					var startLimit = 1;
					var token = sessionStorage.getItem("token");
					var userId = sessionStorage.getItem("userId");
					$rootScope.role = sessionStorage.getItem("role");

					
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
						promise = AppServices.getmeasurementList(token);
						promise.then(function(data) {
							$scope.devices = data;

						}, function(err) {
							console.log(err);
						});
					}
					$scope.itemsPerPage = 10;
					$scope.currentPage = 0;
					$scope.endLimit=$scope.itemsPerPage;
					var allOfTheData;
					$scope.totalRecords=0;
					
					$scope.reset = function() {
						$scope.currentPage = 0;
						allOfTheData="";
						$scope.totalRecords=0;
						$scope.endLimit=$scope.itemsPerPage;
					}
					
					$scope.range = function() {
								var rangeSize = 6;
								var ps = [];
								var start;

								start = $scope.currentPage;
								if ( start > $scope.pageCount()-rangeSize ) {
								start = $scope.pageCount()-rangeSize+1;
								}

								for (var i=start; i<start+rangeSize; i++) {
								if(i>=0) 
								ps.push(i);
								}
								return ps;
							};

							$scope.prevPage = function() {
							if ($scope.currentPage > 0) {
								startLimit = (startLimit*($scope.currentPage-1));
								$scope.showDeviceList(link);
							  $scope.currentPage--;
								}
							};
											
							$scope.DisablePrevPage = function() {
								return $scope.currentPage === 0 ? "disabled" : "";
							 };
							 
							 $scope.pageCount = function() {
								return Math.ceil($scope.totalRecords/$scope.itemsPerPage)-1;
							};
							
							$scope.nextPage = function() {
								if ($scope.currentPage < $scope.pageCount()) {
								startLimit = ($scope.itemsPerPage*($scope.currentPage-1));
								$scope.showDeviceList(link);
								  $scope.currentPage++;
								}
							};
							
							$scope.DisableNextPage = function() {
								return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
							};
							
							 $scope.setPage = function(n) {
								 $scope.dataLoading = true;
								$scope.endLimit = ($scope.itemsPerPage*(n+1));
								if($scope.endLimit > $scope.totalRecords){
									var reminder = $scope.totalRecords % $scope.itemsPerPage;
									if(reminder > 0){
										$scope.endLimit = $scope.endLimit - ($scope.itemsPerPage-reminder);
									}
								}
								 
								startLimit = ($scope.itemsPerPage*n);
								$scope.showDeviceList(link);
								$scope.currentPage = n;
							};
					
					
					
					
					
					
					$scope.devicesMeasurementGridOptions = oApp.config.deviceListGridOptionsapn;
					/* measurement list apn */
					$scope.showDeviceList = function(link) {
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
								token, $scope.itemsPerPage, startLimit, link);
						promise.then(function(data) {
							$scope.dataLoading = true;
							$scope.err = false;
							$scope.totalRecords = data.totalRecords;
							$scope.datalists = data.apnData;
							// start logic for new pagination 

							if (data.apnData.length > 0) {
								
								$scope.DeviceList = data;
								allOfTheData = data.apnData;

								$scope.createNewDatasource();
							$scope.dataLoading = false;
							} else {
								$scope.dataLoading = false;
								$scope.err = true;
							}
						}, function(err) {
							$scope.err = true;
								$scope.dataLoading = false;
							console.log(err);
						});
					}

					/* call to grid view for device list */
					$scope.createNewDatasource = function() {
						$scope.devicesMeasurementGridOptions.data = allOfTheData;
					}

					$scope.getDashBoardMenu();
					$scope.getFavouriteReports();
					$scope.getmeasurementList();
					$scope.showDeviceList(link);
					$scope.openDevicedata = function(e) {
						$scope.dataLoading = true;
						link = $(e.currentTarget).text();
						$scope.listItem = link;
						$scope.reset();
						$scope.showDeviceList(link);
					}

				});