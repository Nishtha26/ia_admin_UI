oTech.controller('HeatMapsController', function($scope, $rootScope, $location, AppServices,HeatMapsService, $stateParams, $timeout){
                                    		$scope.name = sessionStorage.getItem("username");
                                    		$rootScope.slideContent();
                                    		var market;
                                    		window.onresize = function(event) {
                                    			$rootScope.slideContent();
                                    	    }	
                                    		var token = sessionStorage.token;
                                    		var userId = sessionStorage.userId;
                                    		$rootScope.role = sessionStorage.role;
                                    		$scope.dataLoading3 = true;
                                    		$scope.loadingImageName= oApp.config.loadingImageName;
                                    		
                                    		$scope.showErrorMessage = function(divId,msg){
                                    			
                                				$rootScope.showErrorMessage(divId,msg);
                                			
                                		}
                                		$scope.showSuccessMessage = function (divId,msg) {
                                			$rootScope.showSuccessMessage(divId,msg);
                                	}
                                		
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
                                    		
                                    		/*repaly from to date for date picker */
                                    	   
                                    	   function getFormattedDate() {
                                    			var time = '';
                                    			var dateNow = new Date();
                                    			var day = dateNow.getDate();
                                    			var month = dateNow.getMonth() + 1;
                                    			var year = dateNow.getFullYear();
                                    			 time += dateNow.getHours() + ":";
                                    			time +=dateNow.getMinutes();
                                    			var dateFormatted =  year + "-" + month  + "-" + day + " " + time;
                                    			return dateFormatted;
                                    		}
                                    	/*	$(function() {
                                    			$('#datetimepicker1').datetimepicker({
                                    				format : 'YYYY-MM-DD HH:mm'
                                    			});
                                    			
                                    			$('#fromDate').val(getFormattedDate());
                                    		
                                    			$("#datetimepicker1").on("dp.change", function(e) {
                                    				$('#datetimepicker1').data("DateTimePicker");
                                    			});
                                    			
                                    			
                                    			$('#datetimepicker2').datetimepicker({
                                    				format : 'YYYY-MM-DD HH:mm'
                                    			});
                                    			
                                    			$('#toDate').val(getFormattedDate());
                                    		
                                    			$("#datetimepicker2").on("dp.change", function(e) {
                                    				$('#datetimepicker2').data("DateTimePicker");
                                    			});
                                    		});*/	
                                    		 /* to call replay map  */ 
                                    		   $scope.DefaultReplayMap = true ;
                                    		$scope.checkAjaxCall =function(){
                                    	/*	 var deviceId = $('#deviceId').val(); 
                                    		

                                    		 var fromDate = $('#fromDate').val();
                                    		 var toDate = $('#toDate').val();
                                    		 
                                    		 var data = {"deviceId" : deviceId,"fromDate" : fromDate,"toDate" : toDate}; 
                                    		 console.log(data);
                                    		
                                    			$scope.DefaultReplayMap = false ;
                                    			$scope.rePlayMap = true;
                                    			promise = MapServices.getreplay(token,data);
                                    			promise.then(
                                    				function(data){  if(data.length > 0){
                                    					var lat = [];
                                    					var lon = [];
                                    					var deviceData = [];
                                    					for(var s in data){
                                    						if(data[s].deviceLogJson[1].Latitude!=0 && data[s].deviceLogJson[2].Longitude!=0){
                                    							deviceData.push(data[s]);
                                    						lat.push(data[s].deviceLogJson[1].Latitude);
                                    						lon.push(data[s].deviceLogJson[2].Longitude);
                                    						}
                                    					}  
                                    					 console.log("from replay js");
                                    					 console.log("lon"+lon);
                                    					MapServices.showReplayMap(deviceData,lat, lon);
                                    					}
                                    					else{
                                    						     $scope.DefaultReplayMap = true ;
                                    		  	                $scope.rePlayMap =false ;
                                    						    alert('No Records Was Found')
                                    						 	
                                    					    }
                                    				},
                                    				function(err){
                                    				}
                                    			);*/
                                    		}
                                    		
                                    		/* Default Replay Map */
                                    		
                                    		HeatMapsService.defaultHeatMap();
                                    		$scope.showMarketList = function(){
                                    			$scope.marketDataLoading = true;
                                    		//	$scope.dataLoading = true;
                                    			promise = HeatMapsService.GetMarketData(userId, token);
                                    			promise.then(
                                    				function(data){
                                    					$scope.marketList = data;
                                    					$scope.marketDataLoading = false;
                                    				//	alert(data);
                                    					
                                    				},
                                    				function(err){
                                    					console.log(err);
                                    					$scope.marketDataLoading = false;
                                    				}
                                    			);
                                    		}
                                    		$scope.showMarketList();
                                    		
                                    		/*
                                			Function to get Market Device List 
                                		*/
                                		$scope.getMarketDevices = function(){
                                		   $scope.configuarationDiv =false;
                                		   $scope.deviceGroupDiv =false;
                                		   $scope.errdiv =false ;
                                		   $scope.deviceDataLoading = true;
                                			promise = HeatMapsService.GetDeviceListForMarket(userId,token,market);
                                			promise.then(
                                				function(data){
                                					if(data.length > 0){
                                						  $scope.deviceDataLoading  = false;
                                				//	$scope.deviceDiv =true;
                                					console.log(data);
                                					$scope.deviceList = data;
                                					}
                                					else{
                                					$scope.deviceDiv =false;
                                					  $scope.deviceDataLoading = false;
                                     				$scope.errdiv =true ;	
                                					}
                                					//$("#target").val($("#target option:last").val());
                                				},
                                				function(err){
                                					  $scope.deviceDataLoading = false;
                                				}
                                			);
                                		}
                                    		
                                		$scope.showDeviceByMarket = function(selectValue){
                                		//	alert("s"+selectValue);
                                			market=selectValue;
                                			$scope.getMarketDevices();
                                		}                 		
                                    		
                                    		
                                		$scope.showHeatMapCategory = function(){
                                			$scope.dataLoading = true;
                                			promise = HeatMapsService.getHeatMapCalgories(userId, token);
                                			promise.then(
                                				function(data){
                                					$scope.heatMapCateogoryList = data;
                                					$scope.dataLoading3 = false;
                                				//	alert(data);
                                					
                                				},
                                				function(err){
                                					console.log(err);
                                				}
                                			);
                                		}
                                		$scope.showHeatMapCategory();         		
                                		  
                                		  //$(document).ready(function() {
                                			  
                                		function getCheckBoxValue(fieldName){
                                			var technologyVal = [];
                                		  $.each($("input[name='"+fieldName+"']:checked"), function(){            
                                			  technologyVal.push($(this).val());
                                          });
                                		  if(technologyVal.length>0){
                                			  if(technologyVal.length==2)
                                				  {
                                				  return "all";
                                				  }
                                			  if(technologyVal.length==1){
                                				  return technologyVal[0];
                                			  }
                                		  }
                                		  return "";
                                		}
                                	//	  });
                                		$scope.generateHeatMap =function(){
                                			     var marketName = $('#marketName').val(); 
                                			     var deviceId = $('#deviceId').val();
                                			     
                                			     var fromDate = $('#fromDate').val();
                                			     var toDate = $('#toDate').val();
                                			    var  category=$('#category').val();
//                                			    var location=$('#location').val();
                                			    var location=getCheckBoxValue('location');
                                		//	    var technology=$('#technology').val();
                                			    var technology=getCheckBoxValue('technology');
                                			    
                                				   $scope.mapDataLoading = true;
                                					if(!$scope.heatmap_form.$invalid){
                                			     var data = {"marketName" : marketName, "deviceId":deviceId ,"fromDate" : fromDate,"toDate" : toDate,"category":category, "location":location,"technology":technology}; 
                                			     var heatMapInput=data;
                                			
                                				  //   $scope.ShowLiveMap = false;
                                				//     $scope.ShowMapDiv = true;
                                				//     $scope.one =false;
                                				//     $scope.two =true;
                                				
                                				promise = HeatMapsService.populateMap(token,data);
                                				promise.then(
                                					function(data){
                                					/*	console.log("centerInfo"+data.centerInfo);
                                						console.log("centerInfo"+data.coordinateDetails);*/
                                						if(data.coordinateDetails.length> 0){
                                							$scope.mapDataLoading = false;
                                						var	showTechnologyFilter=data.showTechnologyFilter;
                                							$(".mashupContainer2").css("display",'');
                                							$("#kpiImage").attr("src",data.kpiImage);
                                							$(".kpiTitle").text(data.kpiTitle);
                                							$("#technology").val(data.technology);
                                							$("#location").val(data.location);
                                							if(showTechnologyFilter){
                                								$("#panel1").hide();
                                								$("#panel").show();
                                							}
                                							else{
                                							
                                								$("#panel1").show();
                                								$("#panel").hide();
                                							}
                                							if(data.deviceInformation.length> 0){
                                							HeatMapsService.showHeatMap(heatMapInput,data.centerInfo,data.coordinateDetails,data.deviceInformation);
                                							}
                                							else{
                                							//	alert('No Records Was Found')
                                								$scope.showErrorMessage("heat_map_error","No Records Was Found");
                                								
                                								HeatMapsService.defaultHeatMap();
                                							}
                                						}
                                						else{
                                							// alert('No Records Was Found')
                                							 $scope.showErrorMessage("heat_map_error","No Records Was Found");
                                							HeatMapsService.defaultHeatMap();
                                				            	$scope.mapDataLoading = false;
                                						    }
                                						
                                					},
                                					function(err){
                                					}
                                				);
                                					}
                                		}
                                		
                                	/*	$scope.isCheckboxRequired = function(fieldName){
                                			  return !$scope.technology.some(function(options){
                                			    return options.selected;
                                			  });
                                			}*/
                                		
                                    		});

