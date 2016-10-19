
oTech.controller('MyDevicesController',
	function ($scope, $rootScope, $location, AppServices,GraphMaximizeServices,MapServices, $stateParams,$filter,uiGridConstants,$templateCache) {
		$scope.loading = true;
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		$rootScope.role = sessionStorage.role;
		$rootScope.slideContent();
		var startLimit = 1;
		window.onresize = function(event) {
			$rootScope.slideContent();
		}
		$scope.loadingImageName= oApp.config.loadingImageName;
		$scope.name = sessionStorage.getItem("username");
		 $templateCache.put('ui-grid/uiGridViewport',
				    "<div role=\"rowgroup\" class=\"ui-grid-viewport\" ng-style=\"colContainer.getViewportStyle()\"><!-- tbody --><div class=\"ui-grid-canvas\"><div ng-repeat=\"(rowRenderIndex, row) in rowContainer.renderedRows track by $index\" class=\"ui-grid-row\" ng-style=\"Viewport.rowStyle(rowRenderIndex)\"><div role=\"row\" ui-grid-row=\"row\" row-render-index=\"rowRenderIndex\"></div></div></div></div>"
				  );
		/*
			To get dashboard menu data
		*/
		$scope.getDashBoardMenu = function(){
			if($rootScope.menuData == undefined){
				$rootScope.getMenuData();
			}
		}
		$scope.showErrorMessage = function(divId,msg){
			
			$rootScope.showErrorMessage(divId,msg);
		
	}
	$scope.showSuccessMessage = function (divId,msg) {
		$rootScope.showSuccessMessage(divId,msg);
}
		/*
			To get favourite reports
		*/
	/*	$scope.getFavouriteReports = function(){
			if($rootScope.Favourites == undefined){
				$rootScope.getFavouriteReports();
			}
		}*/
		$scope.getDashBoardMenu();
	//	$scope.getFavouriteReports();
		/* pagination start */
					$scope.itemsPerPage = 10;
					$scope.currentPage = 0;
					$scope.endLimit=$scope.itemsPerPage;
					var allOfTheData;
					$scope.totalRecords=0;
					
					
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
								$scope.createNewDatasource();
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
								$scope.createNewDatasource();
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
								$scope.createNewDatasource();
								$scope.currentPage = n;
							};
		
		
                            
							$scope.singleFilter = function() {
								 // var allFilterdata=allOfTheData;
								    $scope.myDevicesGridOptions.data = $filter('filter')(allOfTheData, $scope.searchText, undefined);
								    var datalen=$scope.myDevicesGridOptions.data.length;
								    var limit=$scope.endLimit;
								    if(datalen<$scope.endLimit){
								    	limit=datalen;
								    }
								    $scope.myDevicesGridOptions.data = $scope.myDevicesGridOptions.data.slice( 0,limit);
								 
								   
								};
	/* pagination end*/
   

	
	 /* Devices list */
							  $scope.deviceId="";
							  $scope.startDate="";
							  $scope.endDate="";
							  $scope.dataLoadingMap=false;
							  $scope.dataLoadingAvailability=false;
							  $scope.dataLoadingReplayMap=false;
   $scope.myDevicesGridOptions = oApp.config.myDevicesGridOptions;
	$scope.myDevicesGridOptions.onRegisterApi = function( gridApi ) { //extra code
	 $scope.gridApi = gridApi;
	 //$scope.gridApi.noUnselect = true;
	//   $scope.gridApi.selection.clearSelectedRows();
	  $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
	    console.log(row);
	    }); 
    };
   
		$scope.showDeviceList = function(){
			$scope.dataLoading = true;
			promise = AppServices.GetDeviceData(userId, token);
			promise.then(
			function(data){
				$scope.totalRecords = data.devicesList.length;
				allOfTheData = data.devicesList;
				$scope.myDevicesGridOptions.data = data.devicesList.slice( 0, $scope.itemsPerPage);
				$scope.dataLoading = false;
			},
			function(err){
				console.log(err);
			}
		);
	}

   $scope.showDeviceList();
   
   $scope.createNewDatasource = function() {
						$scope.dataLoading = true;
						$scope.myDevicesGridOptions.data = allOfTheData.slice( startLimit, $scope.endLimit);
						$scope.dataLoading = false;
					}
   
  

	$scope.getTableHeight = function() {
	    var rowHeight = 41; // your row height
	    var headerHeight = 45; // your header height
	    var footerPage=5;
	    var gridHeight=0;
	    var dataCount=$scope.myDevicesGridOptions.data.length;
	    gridHeight=($scope.myDevicesGridOptions.data.length * rowHeight + headerHeight+footerPage);
	    $(".ui-grid-viewport").css("height",gridHeight-headerHeight);
	    $(".ui-grid-menu-mid").css("height","450px;");
	    console.log("gh:"+gridHeight);
	    //$(".")
	    return {
	       height:  gridHeight + "px"
	    };
	 };
	 
	 
		$scope.deviceAvailabilityBody = function(row) {
			/*$("#create_new_device_label").hide();
		 	$("#device_list_label").hide();
		 	$("#device_edit_label").show();
		 	$("#create_device_body_div").hide();*/
		 	$("#device_facets_container").show();
		 	$("#live_device_map_container").hide();
		 	$(".tab-pane").hide();
		 	$("#availability").show();
		 	
		 $(".d_tab").removeClass("active");
		 	$("#availability_tab").addClass("active");/* for showing default active tab*/
		// 	$scope.populateAdminCommand();
		 	$scope.gridApi.selection.clearSelectedRows();
		 	row.isSelected=!row.isSelected;
	 	  $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);

	      $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
		 	
           $scope.gridApi.selection.selectRow(row);
		       	$("#device_facets_container").fadeOut('left slow');
			 	$("#device_facets_container").fadeOut('left slow');
			 	$.when($("#device_facets_container").slideUp('slow')).then(function() {
			 		$("#device_facets_container").fadeIn('slow');
			 	});
			 	 $scope.deviceId=row.entity.deviceId;
			 	 $scope.adminMessageToDevice=row.entity.adminMessageToDevice;
			 	 $scope.newWorkUrl=row.entity.workUrl;
			 	
			 	 $scope.deviceStatusFlag=row.entity.deviceStatusFlag;
			 	 $scope.userFullName=row.entity.fullName+" ( "+row.entity.userName+" ) ";
			 	$('#deviceStatusFlag').bootstrapSwitch('state', row.entity.deviceStatusFlag, row.entity.deviceStatusFlag);
			 	 
			 	var dateNow=new Date();
			 	var backDate = new Date();
				var backDate =backDate.setDate(backDate.getDate() - 1);
				 var fromDate=jQuery.format.date(backDate, "MM/dd/yyyy HH:mm");
					$scope.startDate=fromDate;
					
					 var toDate=jQuery.format.date(dateNow, "MM/dd/yyyy HH:mm");
						$scope.endDate=toDate;	
				 
			 	//$scope.startDate=("")
				  $scope.showAvailabilityChart($scope.deviceId,$scope.startDate, $scope.endDate);
			 	
		     //    }
		 /*	$("#device_table_list_div").hide();*/
		 };
		 $scope.availabilityProcessByTab=function(){
			 
			 $("#device_facets_container").show();
			 	$("#live_device_map_container").hide();
			 	$("#availability").show();
				$("#device_maps").hide();
				$scope.startDate=$("#startDate").val();
				$scope.endDate=$("#endDate").val();	
			 	  $scope.showAvailabilityChart($scope.deviceId,$scope.startDate, $scope.endDate);
			 	  
		 }
		 $scope.deviceMapBody = function() {
				 	$("#device_facets_container").show();
				 	$("#availability").show();
				 	$("#device_maps").hide();
				           $scope.gridApi.selection.selectRow(row);
				       	$("#device_facets_container").fadeOut('left slow');
					 	$("#device_facets_container").fadeOut('left slow');
					 	$.when($("#device_facets_container").slideUp('slow')).then(function() {
					 		$("#device_facets_container").fadeIn('slow');
					 	});
					 	 var deviceId=$scope.deviceId;
					 	var dateNow=new Date();
					 	var backDate = new Date();
						var backDate =backDate.setDate(backDate.getDate() - 1);
						 var startDate=jQuery.format.date(backDate, "MM/dd/yyyy HH:mm");
							$scope.startDate=startDate;
							
							 var toDate=jQuery.format.date(dateNow, "MM/dd/yyyy HH:mm");
								$scope.endDate=endDate;	
						 
					 	//$scope.startDate=("")
						  $scope.showAvailabilityChart($scope.deviceId,$scope.startDate, $scope.endDate);
					 	
				     //    }
				 /*	$("#device_table_list_div").hide();*/
				 };
		
		 $scope.showAvailabilityChart = function(deviceId,startDate,endDate) {
			 $scope.dataLoadingAvailability=true;
				
						promise = GraphMaximizeServices.GetDeviceAvailabilityDataPerDevice(userId, token,deviceId,startDate,endDate);
						
						promise.then(
							function(data){
									$scope.DeviceAvailabilityData = data;
									GraphMaximizeServices.DahsboardDevicesAvailability(data,startDate,endDate);
									 $scope.dataLoadingAvailability=false;
									
									$('.highcharts-container').css({"height":"475px"});
									
								},
								function(err){
									 $scope.dataLoadingAvailability=false;
								}
						);
					 	
				     //    }
				 /*	$("#device_table_list_div").hide();*/
				 };
	 
			 $(document).ready(function() {
				/*	var d=new Date();
				 	
					 var startDate=jQuery.format.date(d, "MM/dd/yyyy HH:mm");
					 	$("#startDate").val(startDate);
					 	
					 	$scope.startDate=startDate;
					 	*/

				 /*			  $('#daterange-timeAV').daterangepicker({
						  startDate: moment().subtract('days', 1),
				            endDate: moment(),
					        timePicker: true,
					        
					        applyClass: 'bg-slate-600',
					        cancelClass: 'btn-default',
					        locale: {
					        	 applyLabel: 'Show',
					            format: 'MM/DD/YYYY HH:mm'
					        }, function(start, end) {
					            console.log("Callback has been called!"+start+"E"+end);
					        
					            $scope.startDate = start;
					            $scope.endDate = end;    

					           }
					    });*/
				 
				 $('#deviceStatusFlag').on('switchChange.bootstrapSwitch', function(event, state) {
					 // console.log(this); // DOM element
					//  console.log(event); // jQuery event
					  console.log("status Value :" +state); // true | false
					  if(state){
						  $scope.approve($scope.deviceId);
					  }else{
						  $scope.reject($scope.deviceId);
					  }
					});
				});
			 $scope.deviceMapDefault=function(){
				    $(".tab-pane").hide();
				 	$("#device_maps").show();
				 	$("#rePlayMap").hide();
				 	$("#DefaultReplayMap").show();
				 	
				 	$scope.dataLoadingReplayMap=true;
				 MapServices.defaultRepalyMap();
					$scope.dataLoadingReplayMap=false;
				 
			 }
			 /*To get Live Map Data */	
				
			 $scope.ShowLive = function(){
					$scope.ShowMapDiv = false;
					$scope.ShowLiveMap = true;	
				
				//	$("#replayMapLink").removeClass("viewimage_links-active");
				//	$("#liveMapLink").addClass("viewimage_links-active");
					$("#device_facets_container").hide();
				 	$("#live_device_map_container").show();
				 	if($scope.gridApi!=undefined){
				 	 $scope.gridApi.selection.clearSelectedRows();
				 	}
			}
			 $scope.getMapData = function(){
				 $scope.ShowLive();
					$scope.dataLoadingMap=true;
			 		promise = MapServices.GetMapLocations(userId, token);
			 		promise.then(
			 			function(data){
			 				var lat = [];
			 				var lon = [];
			 				var deviceData=[];
			 				for(var s in data){
			 					if(data[s].deviceLogJson){
			 					if(data[s].deviceLogJson[1].Latitude!=0 && data[s].deviceLogJson[2].Longitude!=0){
			 					lat.push(data[s].deviceLogJson[1].Latitude);
			 					lon.push(data[s].deviceLogJson[2].Longitude);
			 					deviceData[s]=data[s];
			 					}
			 				}
			 				}
			 			//	$("#liveMapLink").attr("class","viewimage_links-active");
			 				MapServices.DahsboardShowMap(deviceData,lat, lon);
			 				$scope.dataLoadingMap=false;
			 			},
			 			function(err){
			 				$scope.dataLoadingMap=false;
			 			}
			 		);
			 	}
			 /*On load or refresh call for live map*/
			 $scope.getMapData();
				 
			 /*To get Replay Map*/	
			 $scope.checkAjaxCall =function(){
			 	     var deviceId = $scope.deviceId;
			 	     var fromDate = $('#fromDateMap').val();
			 	     var toDate = $('#toDateMap').val();
			 	     var data = {"deviceId" : deviceId,"fromDate" : fromDate,"toDate" : toDate}; 
			 		$scope.dataLoadingReplayMap=true;
			 	    $scope.DefaultReplayMap=false;
			 		     $scope.ShowLiveMap = false;
			 		    $("#rePlayMap").hide();
					 	$("#DefaultReplayMap").show();
			 		     $scope.one =false;
			 		     $scope.two =true;
			 		   //  $scope.dataLoading=true;
			 		promise = MapServices.getreplay(token,data);
			 		promise.then(
			 			function(data){
			 			   $("#rePlayMap").show();
						 	$("#DefaultReplayMap").hide();
			 				if(data.length > 0){
			 				var lat = [];
			 				var lon = [];
			 				var deviceData = [];
			 				for(var s in data){
			 					if(data[s].deviceLogJson[1].Latitude!=0 && data[s].deviceLogJson[2].Longitude!=0){
			 						deviceData.push(data[s]);
			 					lat[s] = data[s].deviceLogJson[1].Latitude;
			 					lon[s] = data[s].deviceLogJson[2].Longitude;
			 					}
			 				}  
			 				MapServices.showReplayMap(deviceData,lat, lon);
			 			
			 				}
			 				else{
			 					  MapServices.clearReplayMap();
			 					// alert('No Records Was Found')
			 					 
			 					$scope.showErrorMessage("replay_map_error","No Records Was Found");
			 					 //	$scope.one =true;
			 		                $scope.two =true;
			 		              
			 				    }
			 				$scope.dataLoadingReplayMap=false;
			 			},
			 			function(err){
			 				$scope.dataLoadingReplayMap=false;
			 			}
			 		);
			 }
			 $scope.populateAdminCommand=function(){
				 $(".tab-pane").hide();
				 $("#admin_operation_body").show();
				 $("#commandId").val( $scope.adminMessageToDevice);
				 if($scope.adminMessageToDevice==8){
					 
					 $("#update_url").show();
			
				 }
			 }
			 $scope.adminCommandOperation=function(commandId){
				
				 $("#dataLoadingAC").show();
					promise = AppServices.adminCommandOperation( token ,$scope.deviceId,commandId);
					promise.then(
					function(data){
						if(data.status=="success"){
							 $("#dataLoadingAC").hide();
						}
						else{
							
						}
				//		$scope.deviceAdminData();
					},
					function(err){
						alert("error");
						 $("#dataLoadingAC").hide();
					}
					);
				 
				 
			 }
		 	
				$scope.approve = function(selectDeviceId){
					promise = AppServices.GetapproveData(userId, token ,selectDeviceId);
					promise.then(
					function(data){
						
				//		$scope.deviceAdminData();
					},
					function(err){
						alert("error");
					}
					);
				}
			
			$scope.reject = function(selectDeviceId){
				promise = AppServices.GetrejectData(userId, token ,selectDeviceId);
				promise.then(
				function(data){
					
				//	$scope.deviceAdminData();
				},
					function(err){
						alert("error");
					}
					);
				} 
			
			 $scope.populateAdminCommandList=function(){
				promise = AppServices.populateAdminCommands( token );
				promise.then(
						function(data){
						$scope.adminCommands=data;
						$("#commandId").val("0");
					
				},
				function(err){
					alert("error");
				}
				);
			 
		 }
			 $scope.populateAdminCommandList();
			 $('#commandId').change(function() {
						var commandId = $(this).val();
						if (commandId == 8) {

							$("#update_url").show();

						} else {
							$("#update_url").hide();
							$scope.adminCommandOperation(commandId);
						}
					});
			 
			 $scope.populateAdminCommandList();
			 
			 $scope.adminCommandUpdateUrl=function(){
				 var workUrl=$("#newWorkUrl").val();
				 var commandID=$("#commandId").val();
				 $("#dataLoadingAC").show();
				 //if(workUrl!=""){
					promise = AppServices.adminCommandUpdateUrl( token ,$scope.deviceId,commandID, workUrl);
					promise.then(
					function(data){
						if(data.status=="success"){
							$("#dataLoadingAC").hide();
						}
						else{
							
						}
				//		$scope.deviceAdminData();
					},
					function(err){
						alert("error");
					}
					); 
				 //}
				// else{
					 
			//	 }
				 }
			
	});