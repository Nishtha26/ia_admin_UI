oTech
		.controller(
				'deviceMeasurementsController',
				function($scope, $rootScope, $location, AppServices,
						$stateParams) {
					$scope.dataLoading = true;
					$scope.listItem = 'APN';
					var link = "APN";
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
								$scope.setPagePrev($scope.currentPage-1);
								//$scope.currentPage--;
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
								$scope.setPageNext($scope.currentPage+1);
								//$scope.currentPage++;
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
							
							 $scope.setPagePrev = function(n) {
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
							 $scope.setPageNext = function(n) {
								 $scope.dataLoading = true;
								$scope.endLimit = ($scope.itemsPerPage*(n+1));
								if($scope.endLimit > $scope.totalRecords){
									var reminder = $scope.totalRecords % $scope.itemsPerPage;
									if(reminder > 0){
										$scope.endLimit = $scope.endLimit - ($scope.itemsPerPage-reminder);
									}
								}
								 
								startLimit = ($scope.itemsPerPage*(n));
								$scope.showDeviceList(link);
								$scope.currentPage = n;
							};
					
					
					
					
					
					
					$scope.devicesMeasurementGridOptions = oApp.config.deviceListGridOptionsapn;
					/* measurement list apn */
					$scope.showDeviceList = function(link) {
						if(link == 'APN')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsapn;
						else if (link == 'Applications')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsapplications;
						else if(link == 'IPAddress')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsipaddress;
						else if(link == 'L1LOG')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsl1log;
						else if(link == 'Location')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefslocation;
						else if(link == 'MMS')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsmms;
						else if(link == 'Neighborcellinfo')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsneighborcellinfo;
						else if(link == 'SMS')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefssms;
						else if(link == 'Tcpperformance')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefstcpperformance;
						else if(link == 'Udpperformance')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsudpperformance;
						else if(link == 'Voice')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsvoice;
						else if(link == 'Wifiinfo')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefswifiinfo;
						else if(link == 'Wifitrafficinfo')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefswifitrafficinfo;
						else if(link == 'Attach')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsattach;
						else if(link == 'Latency')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefslatency;
						else if(link == 'Upload')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsupload;
						else if(link == 'Email')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsemail;
						else if(link == 'Datausage')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsdatausage;
						else if(link == 'Video')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsvideo;
						else if(link == 'Clickscreenimage')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsclickscreenimage;
						else if(link == 'Audio')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsaudio;
						else if(link == 'ClickScreenXY')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsclickscreenxy;
						else if(link == 'Download')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsdownload;
						else if(link == 'Radio')
							$scope.devicesMeasurementGridOptions.columnDefs = oApp.config.columnDefsradio;
						if(startLimit==1){
							startLimit=0;
						}
						
						promise = AppServices.GetMeasurementsapnData(userId,
								token, $scope.itemsPerPage, startLimit, link);
						promise.then(function(data) {
							$scope.dataLoading = true;
							$scope.err = false;
							$scope.totalRecords = data.totalRecords;
							$scope.datalists = data.apnData;
							// start logic for new pagination 

							if (data.apnData.length > 0) {
								$('.ui-grid-viewport').css("display","block");
								$scope.DeviceList = data;
								allOfTheData = data.apnData;

								$scope.createNewDatasource();
							$scope.dataLoading = false;
							} else {
								
								$('.ui-grid-viewport').css("display","none");
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
					$scope.openDevicedata = function(id,value) {
						$scope.dataLoading = true;
						
						link = id;
						$scope.listItem = value;
						$scope.reset();
						$scope.showDeviceList(link);
					}

				});