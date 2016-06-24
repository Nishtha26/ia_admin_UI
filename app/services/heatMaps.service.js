 oTech.service('HeatMapsService',
    ['$http', '$rootScope', '$timeout', '$location', '$q', function ( $http,  $location, $rootScope,  $timeout, $q) {
		var service = {};
		var token = sessionStorage.getItem("token");
		/*
			Function to get Market data
		*/
		
	
		service.GetMarketData = function(userId, token){
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/heatMaps/getMarketsListForUser",
				    type: "POST",
					data : {token:token, userId:userId},
					headers :{
					'Content-Type': 'application/x-www-form-urlencoded'
					},
				    success: function(data)
				    {
						
						deferred.resolve(data);
				    },
				    error: function (err)
				    {
						deferred.reject(err);
				    }
			    });	
			return deferred.promise; 
		}
		 /*
		Function to get the Market device list for heat map
	*/
		
	       service.GetDeviceListForMarket = function( userId,token,market ){
				var deferred = $q.defer();
				$.ajax({
					    url : oApp.config.BASE_URL + "rest/heatMaps/getDeviceListForMarket",
					    type: "POST",
						data : {token:token, userId:userId,market:market},
						headers :{
						'Content-Type': 'application/x-www-form-urlencoded'
						},
					    success: function(data)
					    {
							deferred.resolve(data);
					    },
					    error: function (err)
					    {
							deferred.reject(err);
					    }
				    });	
				return deferred.promise; 
			}
	
			 /*
			Function to get the Heat map category list 
		*/
			
		       service.getHeatMapCalgories = function( userId,token ){
					var deferred = $q.defer();
					$.ajax({
						    url : oApp.config.BASE_URL + "rest/heatMaps/getHeatMapCalgories",
						    type: "POST",
							data : {token:token, userId:userId},
							headers :{
							'Content-Type': 'application/x-www-form-urlencoded'
							},
						    success: function(data)
						    {
								deferred.resolve(data);
						    },
						    error: function (err)
						    {
								deferred.reject(err);
						    }
					    });	
					return deferred.promise; 
				}
		
		
		/*show defalut  */ 
		service.defaultHeatMap = function(){
		var myCenter = new google.maps.LatLng(39.8333, -98.5833);
		 var mapProp = {
			center : myCenter,
			zoom : 13,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById("DefaultReplayMap"), mapProp);
		google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
       });
		
		
	}
		service.populateMap = function(token, data){
			console.log(data);
			var datas=JSON.stringify(data);
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/heatMaps/getPopulateDeviceLocation",
				    type: "POST",
					
					data : {token:token,datas:datas},
					headers :{
					/*'X-Auth-Token': token,*/
					'Content-Type': 'application/x-www-form-urlencoded'
					},
				    success: function(data)
				    {
						deferred.resolve(data);
						console.log(data);
				    },
				    error: function (err)
				    {
						deferred.reject(err);
					//	alert(""+err);
				    }
			    });	
			return deferred.promise; 
		}
	
		service.showHeatMap = function(heatMapInput,centerInfo,coordinateDetails, deviceInfo){
var kpi=heatMapInput.category;
var startDate=heatMapInput.fromDate;
	var endDate=heatMapInput.toDate;
var device =heatMapInput.deviceId;
var technology=heatMapInput.technology;
	var location=heatMapInput.location;
	       var markers = [];
	       /*for(i =0 ;i < lat.length ;i++)
	      	{
	      	  markers.push({lat:lat[i],lng:lan[i]});
	      	}*/
			/*  draw the route based on location */
	      		
	      			  var mapOptions = {
	                  center: new google.maps.LatLng(centerInfo.xCenter, centerInfo.yCenter),
	                 /* zoom: 5,*/
	                  mapTypeControl: true,
					    mapTypeControlOptions: {
					        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
					        position: google.maps.ControlPosition.TOP_RIGHT
					    }
	                  //mapTypeId: google.maps.MapTypeId.ROADMAP
	              };
	              var map = new google.maps.Map(document.getElementById("DefaultReplayMap"), mapOptions);
	              var infoWindow = new google.maps.InfoWindow();
	              var lat_lng = new Array();
	              var latlngbounds = new google.maps.LatLngBounds();
/*	              for (var index = 0; index < coordinateDetails.length; index++) {
	            	   
//		                  console.log("Lat :"+coordinateDetails[index].latitude+"Long "+coordinateDetails[index].longitude)
		                 var  myLatlng = new google.maps.LatLng(coordinateDetails[index].latitude, coordinateDetails[index].longitude );
		                  lat_lng.push(myLatlng);
		                  
					
	             
	                  var replayPath = new google.maps.Polyline({
		                  path: lat_lng,
		                  geodesic: true,
		                  strokeColor: '#900C3F',
		                  strokeOpacity: 1.0,
		                  strokeWeight: 2
		                });
		              replayPath.setMap(map)
					}*/
				
				    for(var index =0;index<deviceInfo.length;index++){
				    	var deviceDetail=deviceInfo[index];
//				    	console.log("deviceDetail.xParamR,deviceDetail.yParamR"+deviceDetail.xParamR+" "+deviceDetail.yParamR)
				    	if(checkForTechnology(technology,location,deviceDetail.networkType,deviceDetail.locationProvider)){
				    	var point = new google.maps.LatLng(deviceDetail.xParamR,deviceDetail.yParamR);
						var img = createPointMarker(kpi,deviceDetail);
						if(img==""){
							img='images/red.png';
						}
	                  var marker = new google.maps.Marker({
	                      position: point,
	                      map: map,
	                  //    title: data.title,
	                      icon: img
	                  });
	                  
	                  latlngbounds.extend(marker.position);
	                  (function (marker, deviceDetail) {
	                      google.maps.event.addListener(marker, "click", function (e) {
	      				 var lat = parseFloat(this.internalPosition.lat());
	      					var lng = parseFloat(this.internalPosition.lng());
	      					//console.log(this);
	      					var llng = new google.maps.LatLng(lat, lng); 
	      					var geocoder = geocoder = new google.maps.Geocoder();
	      					geocoder.geocode({ 'latLng': llng }, function (results, status) {
	      						if (status == google.maps.GeocoderStatus.OK) {
	      							if (results[1]) {
//	      								var address = results[1].formatted_address;
	      								infoWindow.setContent(deviceDetailBox(deviceDetail,device,kpi,startDate,endDate));
	      								infoWindow.open(map, marker);
	      							}
	      						}
	      					});
	      				
	      				
	      				
	                          
	                          
	                      });
	                  })(marker, deviceDetail);
	           
	              google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
	              	  //this.setZoom(map.getZoom()-1);

	              	  if (this.getZoom() > 18) {
	              	    this.setZoom(18);
	              	  }
	              	});
	              map.setCenter(latlngbounds.getCenter());
	              map.fitBounds(latlngbounds);
	       
	            
				    }
				    }
			
		}
		function checkForTechnology(technology,location,networkType, locationProvider){
			
			var displayDot = true;
			
			if("LTE"==networkType && "3G"==technology){
				displayDot = false;
			
			}else if ("LTE"!=networkType && "4G"==technology){
				displayDot = false;
			}
			
			if( "indoor"==locationProvider && "gps"==location){
				displayDot = false;
			
			} else if("indoor"!=locationProvider && "indoor"==location){
				displayDot = false;
				
			}
			return displayDot;
			
		}
		function createPointMarker(kpi, deviceInfo)
		{
			var strImage = "";
			var rssi=deviceInfo.rssi;
			var rsrq=deviceInfo.rsrq;
			var sinr=deviceInfo.sinr;
			var cqi=deviceInfo.cqi;
			var ping=deviceInfo.ping;
			var pci=deviceInfo.pci;
			var psc=deviceInfo.psc;
			var pn=deviceInfo.pn;
			var ftpul=deviceInfo.ftpul;
			var ftpdl=deviceInfo.ftpdl;
			var httpul=deviceInfo.httpul;
			var httpdl=deviceInfo.httpdl;
			
			var networkType=deviceInfo.networkType;
			if(kpi=="RSSI") {            //RSSI
				if(rssi>=-51 && rssi<0)
					strImage = "images/green1.png";
				else if(rssi>=-61 && rssi<=-51)
					strImage = "images/green2.png";
				else if(rssi>=-71 && rssi<=-61)
					strImage = "images/green3.png";
				else if(rssi>=-81 && rssi<=-71)
					strImage = "images/yellow1.png";
				else if(rssi>=-91 && rssi<=-81)
					strImage = "images/yellow2.png";
				else if(rssi>=-101 && rssi<=-91)
					strImage = "images/yellow3.png";
				else if(rssi>=-111 && rssi<=-101)
					strImage = "images/orange.png";
				else if(rssi>=-145 && rssi<=-111)
					strImage = "images/red.png";
				else
					strImage = "images/black.png";
			} else if(kpi=="RSRQ") {            //RSRQ
				if(rsrq>=-4 && rsrq<0)
					strImage = "images/green1.png";
				else if(rsrq>=-7 && rsrq<=-4)
					strImage = "images/green2.png";
				else if(rsrq>=-10 && rsrq<=-7)
					strImage = "images/green3.png";
				else if(rsrq>=-13 && rsrq<=-10)
					strImage = "images/yellow1.png";
				else if(rsrq>=-16 && rsrq<=-13)
					strImage = "images/yellow2.png";
				else if(rsrq>=-19 && rsrq<=-16)
					strImage = "images/yellow3.png";
				else if(rsrq>=-22 && rsrq<=-19)
					strImage = "images/orange.png";
				else if(rsrq>=-24 && rsrq<=-22)
					strImage = "images/red.png";
				else
					strImage = "images/black.png";
			} else if(kpi=="SINR") {            //SINR
				if(sinr>=20 && sinr<30)
					strImage = "images/green1.png";
				else if(sinr>=15 && sinr<=20)
					strImage = "images/green2.png";
				else if(sinr>=10 && sinr<=15)
					strImage = "images/green3.png";
				else if(sinr>=5 && sinr<=10)
					strImage = "images/yellow1.png";
				else if(sinr>=0 && sinr<=5)
					strImage = "images/yellow2.png";
				else if(sinr>=-5 && sinr<=0)
					strImage = "images/yellow3.png";
				else if(sinr>=-10 && sinr<=-5)
					strImage = "images/orange.png";
				else if(sinr>=-20 && sinr<=-10)
					strImage = "images/red.png";
				else
					strImage = "images/black.png";
			} else if(kpi=="CQI") {            //CQI_PUCCH
				if(cqi>=10 && cqi<20)
					strImage = "images/green1.png";
				else if(cqi>=8 && cqi<=10)
					strImage = "images/green2.png";
				else if(cqi>=6 && cqi<=8)
					strImage = "images/green3.png";
				else if(cqi>=5 && cqi<=6)
					strImage = "images/yellow1.png";
				else if(cqi>=4 && cqi<=5)
					strImage = "images/yellow2.png";
				else if(cqi>=3 && cqi<=4)
					strImage = "images/yellow3.png";
				else if(cqi>=2 && cqi<=3)
					strImage = "images/orange.png";
				else if(cqi>=1 && cqi<=2)
					strImage = "images/red.png";
				//else
				//	strImage = "images/black.png";
			} else  if(kpi=="PING") {      //PING
				
				if(ping>0 && ping<=40)
					strImage = "images/green1.png";
				else if(ping>=40 && ping<=46)
					strImage = "images/green2.png";
				else if(ping>=46.01 && ping<=52)
					strImage = "images/green3.png";
				else if(ping>=52.01 && ping<=58)
					strImage = "images/yellow1.png";
				else if(ping>=58.01 && ping<=66)
					strImage = "images/yellow2.png";
				else if(ping>=66.01 && ping<=72)
					strImage = "images/yellow3.png";
				else if(ping>=72.01 && ping<=80)
					strImage = "images/orange.png";
				else if(ping>=80.01 && ping<10000)
					strImage = "images/red.png";
				else
					strImage = "images/black.png";
			}else if(kpi=="HTTPDL" || kpi=="HTTPUL"|| kpi=="FTPDL"||kpi=="FTPUL") { 
					
				var commonImgIcon ;
				if(kpi=="HTTPDL")
					commonImgIcon = httpdl;
				else if (kpi=="HTTPUL") 
					commonImgIcon = httpul;
				else if (kpi=="FTPDL") 
					commonImgIcon = ftpdl;
				else if (kpi=="FTPUL") 
					commonImgIcon = ftpul;
				if(commonImgIcon>=10.0)
					strImage = "images/green1.png";
				else if(commonImgIcon>=8.5 && commonImgIcon<=10.0)
					strImage = "images/green2.png";
				else if(commonImgIcon>=7.0 && commonImgIcon<=8.5)
					strImage = "images/green3.png";
				else if(commonImgIcon>=5.5 && commonImgIcon<=7.0)
					strImage = "images/yellow1.png";
				else if(commonImgIcon>=4.0 && commonImgIcon<=5.5)
					strImage = "images/yellow2.png";
				else if(commonImgIcon>=2.5 && commonImgIcon<=4.0)
					strImage = "images/yellow3.png";
				else if(commonImgIcon>=1.0 && commonImgIcon<=2.5)
					strImage = "images/orange.png";
				else if(commonImgIcon>=0.0 && commonImgIcon<1.0)
					strImage = "images/red.png";
				else
					strImage = "images/black.png";
					}
			
				
			else  if(kpi=="HANDOVER") {      //HANDOVER
				
			/*	if(deviceInfo.cellId!=cur_cell_id) {
					if(cell_id_count_map.get(deviceInfo.cellId)!=null) {
						cur_count=cell_id_count_map.get(deviceInfo.cellId);
					} else {
						cur_count = cur_count+1;
						if(cur_count==9)
							cur_count = 0;
						cell_id_count_map.put(deviceInfo.cellId,cur_count);
					}
					cur_cell_id = deviceInfo.cellId;
				}*/ 
				
//				strImage = "images/"+cur_count+".png";
			} else  if(kpi=="LOSTIP") {      
				strImage = "images/red.png";
			} else  if (kpi=="CELLID") {
				if("LTE"==networkType && pci > 0){
					if (pci >= 0 && pci <= 100)
						strImage = "images/green1.png";
					else if (pci >= 101 && pci <= 200)
						strImage = "images/green2.png";
					else if (pci >= 201 && pci <= 300)
						strImage = "images/green3.png";
					else if (pci >= 301 && pci <= 400)
						strImage = "images/yellow1.png";
					else if (pci >= 401 && pci <= 450)
						strImage = "images/yellow2.png";
					else if (pci >= 451 && pci <= 500)
						strImage = "images/yellow3.png";
					else if (pci >= 501 && pci <= 550)
						strImage = "images/orange.png";
					else if (pci >= 551)
						strImage = "images/red.png";
					else
						strImage = "images/black.png";
				}else if("WCDMA"==networkType || "HSPA"==networkType
						|| "HSPAP"==networkType || "HSDPA"==networkType
						|| "UMTS"==networkType && psc > 0){
					if (psc >= 0 && psc <= 100)
						strImage = "images/green1.png";
					else if (psc >= 101 && psc <= 200)
						strImage = "images/green2.png";
					else if (psc >= 201 && psc <= 300)
						strImage = "images/green3.png";
					else if (psc >= 301 && psc <= 400)
						strImage = "images/yellow1.png";
					else if (psc >= 401 && psc <= 450)
						strImage = "images/yellow2.png";
					else if (psc >= 451 && psc <= 500)
						strImage = "images/yellow3.png";
					else if (psc >= 501 && psc <= 550)
						strImage = "images/orange.png";
					else if (psc >= 551)
						strImage = "images/red.png";
					else
						strImage = "images/black.png";
				}else if("CDMA"==networkType || "EHRPD"==networkType
						|| "1xRTT"==networkType || "EVDOA"==networkType || "EVDO"==networkType && pn!=0){
					if (pn >= 0 && pn <= 100)
						strImage = "images/green1.png";
					else if (pn >= 101 && pn <= 200)
						strImage = "images/green2.png";
					else if (pn >= 201 && pn <= 300)
						strImage = "images/green3.png";
					else if (pn >= 301 && pn <= 400)
						strImage = "images/yellow1.png";
					else if (pn >= 401 && pn <= 450)
						strImage = "images/yellow2.png";
					else if (pn >= 451 && pn <= 500)
						strImage = "images/yellow3.png";
					else if (pn >= 501 && pn <= 550)
						strImage = "images/orange.png";
					else if (pn >= 551)
						strImage = "images/red.png";
					else
						strImage = "images/black.png";
				}else{
					/*if (deviceInfo.cellId > 0 )
						strImage = "images/green2.png";
					else if (pn == 551)
						strImage = "images/red.png";
					else
						strImage = "images/black.png";*/
				}
			}
			return strImage;
		}
		function deviceDetailBox(deviceDetail,device,kpi,startDate,endDate){
			var boxText = document.createElement("div");
			boxText.style.cssText = "background-color: #fff; border-radius: 2px; box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.3); ";
			deviceDataHTML=deviceDetailContent(kpi,device,startDate,endDate,deviceDetail);
			
			
			
			
			boxText.innerHTML=deviceDataHTML; 
			return boxText;
			
		}
	function deviceDetailContent(kpi,device,start_date,end_date, deviceInfo){
		var geoUrlWithParameter;
		
		var start_time=""; var end_time="";
		var r = 0.0001;
		if(kpi=="RSSI" /*&& device!=null && (str_devices_3g.contains(device)*/ || (!"LTE"==deviceInfo.networkType &&  deviceInfo.lacId!=0)) {     //RSSI, 3G, LAC ID not 0
			var cellLabel = "";
			var cellValue = "";
			if(("WCDMA"==deviceInfo.networkType || "HSPA"== deviceInfo.networkType)
					|| "HSPAP"== deviceInfo.networkType || "HSDPA"== deviceInfo.networkType
					|| "UMTS"== deviceInfo.networkType && deviceInfo.psc!= 0){
				cellLabel = "PSC";
				cellValue = (deviceInfo.psc == 0 ? "" : ""+deviceInfo.psc);
				
			}else if(("CDMA"== deviceInfo.networkType || "EHRPD"== deviceInfo.networkType
					|| "1xRTT"== deviceInfo.networkType || "EVDOA"== deviceInfo.networkType || "EVDO"== deviceInfo.networkType)
					&& deviceInfo.pn!=0){
				cellLabel = "PN";
				cellValue = (deviceInfo.pn == 0 ? "" : ""+deviceInfo.pn);
			}				
			var str = 
				 "<table class='tg'>                                       "+
				 "  <tr>                                                   "+
				 "    <th class='tg-s6z2' colspan='2'>Device ID<br></th>               "+
				 "    <th class='tg-031e' colspan='1'>Timestamp<br></th>               "+
				 "    <th class='tg-s6z2' colspan='2'>Cell ID</th>             "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+
				 "   <td class='tg-5hgy' colspan='2'> ";
				 if("LTE"== deviceInfo.networkType){
					  geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
					 console.log("p"+geoUrlWithParameter);
					 str = str + " <a  onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></u></a></td> ";
				 }else{
					 str = str + device+"</td>";;
				 }
				 str = str + "    <td class='tg-5hgy' colspan='1'>"+deviceInfo.timestamp+"</td>           ";
				
			if(deviceInfo.cellId==0)
				str = str + "    <td class='tg-5hgy' colspan='2'>  </td>    ";
			else
				str = str + "    <td class='tg-5hgy' colspan='2'>"+deviceInfo.cellId+"</td>    ";

			str = str +	
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+

				 "  <tr>                                                   "+
				 "    <th class='tg-5klj'>Signal Strength</th>             ";
			str = str + "    <th class='tg-5klj'>"+cellLabel+"</th>             ";

			str = str +
				 "    <th class='tg-5klj'>Network Type</th>                "+
				 "    <th class='tg-5klj'>MNC</th>                         "+
				 "    <th class='tg-5klj'>LAC ID</th>                      "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   ";

			if(deviceInfo.rssi<-1)
				str += "    <td class='tg-5hgy'>"+deviceInfo.rssi+"dBm</td>  ";
			else 
				str += "    <td class='tg-5hgy'></td>      ";
		
			if(cellValue != null && !"0"==cellValue)
                str += "<td class='tg-5hgy'>"+cellValue+"</td>  ";
            else
                str += "<td class='tg-5hgy'></td>  ";

			str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.mnc == 0 ? "" : deviceInfo.mnc)+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.lacId == 0 ? "" : deviceInfo.lacId)+"</td>  ";
			str += "  </tr>   ";
			str += "  </table>   ";
		} else if((kpi=="RSSI" && device!=null) /*&& (str_devices_3g.contains(device)*/ || (!"LTE"== deviceInfo.networkType)) {     //RSSI, 3G, LAC ID is 0

			var cellLabel = "";
			var cellValue = "";
			if(("WCDMA"== deviceInfo.networkType || "HSPA"== deviceInfo.networkType
					|| "HSPAP"== deviceInfo.networkType || "HSDPA"== deviceInfo.networkType
					|| "UMTS"== deviceInfo.networkType) && deviceInfo.psc!= 0){
				cellLabel = "PSC";
				cellValue = (deviceInfo.psc == 0 ? "" : ""+deviceInfo.psc);
				
			}else if(("CDMA"== deviceInfo.networkType || "EHRPD"== deviceInfo.networkType
					|| "1xRTT"== deviceInfo.networkType || "EVDOA"== deviceInfo.networkType || "EVDO"== deviceInfo.networkType)
					&& deviceInfo.pn!=0){
				cellLabel = "PN";
				cellValue = (deviceInfo.pn == 0 ? "" : ""+deviceInfo.pn);
			}
			
			str = 
				 "<table class='tg'>                                       "+
				 "  <tr>                                                   "+
				 "    <th class='tg-s6z2' colspan='2'>Device ID<br></th>               "+
				 "    <th class='tg-031e' colspan='1'>Timestamp<br></th>               "+
				 "    <th class='tg-s6z2' colspan='1'>Cell ID</th>             "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+
				 "   <td class='tg-5hgy' colspan='1'> ";
				 if("LTE"== deviceInfo.networkType){
					 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
				 	str = str + " <a onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></u></a></td>                  ";
				 }else{
					 str = str + device+"</td>";
				 }
				 str = str + "    <td class='tg-5hgy' colspan='2'>"+deviceInfo.timestamp+"</td>           ";
				if(deviceInfo.cellId==0)
					str = str + "    <td class='tg-5hgy' colspan='2'>  </td>    ";
				else
					str = str + "    <td class='tg-5hgy' colspan='2'>"+deviceInfo.cellId+"</td>    ";

				str = str +	
			
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+

				 "  <tr>                                                   "+
				 "    <th class='tg-5klj'>Signal Strength</th>             ";
                str = str + "    <th class='tg-5klj'>"+cellLabel+"</th>             ";

				 str += "    <th class='tg-5klj'>Network Type</th>                "+
				 		"    <th class='tg-5klj'>MNC</th>                         "+
			
				 		"  </tr>                                                  "+
				 		"  <tr>                                                   ";

			if(deviceInfo.rssi<-1)
				str += "    <td class='tg-5hgy'>"+deviceInfo.rssi+"dBm</td>  ";
			else 
				str += "    <td class='tg-5hgy'></td>      ";
			
			if(cellValue != null && !"0"==cellValue)
                str += "<td class='tg-5hgy'>"+cellValue+"</td>  ";
            else
                str += "<td class='tg-5hgy'></td>  ";

			str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.mnc == 0 ? "" : deviceInfo.mnc)+"</td>  ";
		
			str += "  </tr>   ";
			str += "  </table>   ";
		} else if(kpi=="RSSI" && deviceInfo.lacId!=0) {   //RSSI, 4G, LAC ID not 0
			 
			
			str = 
				 "<table class='tg'>                                       "+
				 "  <tr>                                                   "+
				 "    <th class='tg-s6z2' colspan='4'>Device ID<br></th>               "+
				 "    <th class='tg-031e' colspan='3'>Timestamp<br></th>               "+
				 "    <th class='tg-s6z2' colspan='2'>Cell ID</th>             "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+
				 "   <td class='tg-5hgy' colspan='4'> ";
				 if("LTE"== deviceInfo.networkType){
					 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
					 str = str + " <a onClick=\"window.open("+geoUrlWithParameter+" )\"> <font color=#0000FF style='cursor:pointer'>"+device+"</font></u></a></td>                  ";
				 }else{
					 str = str + device+"</td>";
				 }
				 str = str + "    <td class='tg-5hgy' colspan='3'>"+deviceInfo.timestamp+"</td>           ";
				if(deviceInfo.cellId==0)
					str = str + "    <td class='tg-5hgy' colspan='2'>  </td>    ";
				else
					str = str + "    <td class='tg-5hgy' colspan='2'>"+deviceInfo.cellId+"</td>    ";

				str = str +	
			
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+

				 "  <tr>                                                   "+
				 "    <th class='tg-5klj'>Signal Strength</th>             "+
				 "    <th class='tg-5klj'>RSRQ</th>             "+
				 "    <th class='tg-5klj'>EARFCN</th>             "+
				 "    <th class='tg-5klj'>PCI</th>             "+
				 "    <th class='tg-5klj'>SINR</th>             "+
				 "    <th class='tg-5klj'>CQI</th>             "+
				 "    <th class='tg-5klj'>Network Type</th>                "+
				 "    <th class='tg-5klj'>MNC</th>                         "+
				 "    <th class='tg-5klj'>LAC ID</th>                      "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   ";

			if(deviceInfo.rssi<-1)
				str += "    <td class='tg-5hgy'>"+deviceInfo.rssi+"dBm</td>  ";
			else 
				str += "    <td class='tg-5hgy'></td>      ";
			
			if(deviceInfo.rsrq==0)
				str += "    <td class='tg-5hgy'> </td>  ";
			else
			str += "    <td class='tg-5hgy'>"+deviceInfo.rsrq+"dB</td>  ";
			if(deviceInfo.arfcn==0)
				str += "    <td class='tg-5hgy'> </td>  ";
			else
			str += "    <td class='tg-5hgy'>"+deviceInfo.arfcn+"</td>  ";
			if(deviceInfo.pci==0)
				str += "    <td class='tg-5hgy'> </td>  ";
			else
			str += "    <td class='tg-5hgy'>"+deviceInfo.pci+"</td>  ";
			if(deviceInfo.sinr==0)
				str += "    <td class='tg-5hgy'> </td>  ";
			else
				str += "    <td class='tg-5hgy'>"+deviceInfo.sinr+"dB</td>  ";
				
			if(deviceInfo.cqi==0)
				str += "    <td class='tg-5hgy'> </td>  ";
			else
				str += "    <td class='tg-5hgy'>"+deviceInfo.cqi+"</td>  ";
			
			str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.mnc == 0 ? "" : deviceInfo.mnc)+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.lacId == 0 ? "" : deviceInfo.lacId)+"</td>  ";
			str += "  </tr>   ";
			str += "  </table>   ";
		} else if(kpi=="RSSI") {   //RSSI, 4G, LAC ID is 0

			str = 
				 "<table class='tg'>                                       "+
				 "  <tr>                                                   "+
				 "    <th class='tg-s6z2' colspan='4'>Device ID<br></th>               "+
				 "    <th class='tg-031e' colspan='3'>Timestamp<br></th>               "+
				 "    <th class='tg-s6z2' colspan='1'>Cell ID</th>             "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+
				 "   <td class='tg-5hgy' colspan='4'> ";
				 if("LTE"== deviceInfo.networkType){
					 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
						
					str = str + " <a onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</u></font></a></td>                  ";
				 }else{
					 str = str + device+"</td>";
				 }
				 str = str + "  <td class='tg-5hgy' colspan='3'>"+deviceInfo.timestamp+"</td>           ";
				if(deviceInfo.cellId==0)
					str = str + "    <td class='tg-5hgy' colspan='2'>  </td>    ";
				else
					str = str + "    <td class='tg-5hgy' colspan='2'>"+deviceInfo.cellId+"</td>    ";

				str = str +	
			
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+

				 "  <tr>                                                   "+
				 "    <th class='tg-5klj'>Signal Strength</th>             "+
				 "    <th class='tg-5klj'>RSRQ</th>             "+
				 "    <th class='tg-5klj'>EARFCN</th>             "+
				 "    <th class='tg-5klj'>PCI</th>             "+
				 "    <th class='tg-5klj'>SINR</th>             "+
				 "    <th class='tg-5klj'>CQI</th>             "+
				 "    <th class='tg-5klj'>Network Type</th>                "+
				 "    <th class='tg-5klj'>MNC</th>                         "+
			
				 "  </tr>                                                  "+
				 "  <tr>                                                   ";

			if(deviceInfo.rssi<-1)
				str += "    <td class='tg-5hgy'>"+deviceInfo.rssi+"dBm</td>  ";
			else 
				str += "    <td class='tg-5hgy'></td>      ";
			
			str += "    <td class='tg-5hgy'>"+deviceInfo.rsrq+"dB</td>  ";
			str += "    <td class='tg-5hgy'>"+deviceInfo.arfcn+"</td>  ";
			str += "    <td class='tg-5hgy'>"+deviceInfo.pci+"</td>  ";
			if(deviceInfo.sinr==0)
				str += "    <td class='tg-5hgy'> </td>  ";
			else
				str += "    <td class='tg-5hgy'>"+deviceInfo.sinr+"dB</td>  ";
	
			if(deviceInfo.cqi==0)
				str += "    <td class='tg-5hgy'> </td>  ";
			else
				str += "    <td class='tg-5hgy'>"+deviceInfo.cqi+"</td>  ";
			
			str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
			
			if(deviceInfo.mnc==0)
				str += "    <td class='tg-5hgy'> </td>  ";
			else	
				str += "<td class='tg-5hgy'>"+deviceInfo.mnc+"</td>  ";
		
			str += "  </tr>   ";
			str += "  </table>   ";
		}  else if(kpi=="RSRQ") {
			 
			str = 
				 "<table class='tg'>                                       "+
				 "  <tr>                                                   "+
				 "    <th class='tg-s6z2'>Device ID<br></th>               "+
				 "    <th class='tg-031e'>Timestamp<br></th>               "+
				 "    <th class='tg-s6z2' colspan='2'>MCC</th>             "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+
				 "   <td class='tg-5hgy' > ";
				 if("LTE"== deviceInfo.networkType){
					 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
						
					str = str + " <a onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</u></font></a></td>                  ";
				 }else{
					 str = str + device+"</td>";
				 }
				 str = str + " <td class='tg-5hgy'>"+deviceInfo.timestamp+"</td>           "+
				 "    <td class='tg-5hgy' colspan='2'>"+ (deviceInfo.mcc == 0 ? "" : deviceInfo.mcc) +"</td>    "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+

				 "  <tr>                                                   "+
				 "    <th class='tg-5klj'>RSRQ</th>             "+
				 "    <th class='tg-5klj'>Network Type</th>                "+
				 "    <th class='tg-5klj'>MNC</th>                         "+
				 "    <th class='tg-5klj'>LAC ID</th>                      "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   ";

			if(deviceInfo.rsrq<-1)
				str += "    <td class='tg-5hgy'>"+deviceInfo.rsrq+"dB</td>  ";
			else 
				str += "    <td class='tg-5hgy'></td>      ";
			
			str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.mnc == 0 ? "" : deviceInfo.mnc)+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.lacId == 0 ? "" : deviceInfo.lacId)+"</td>  ";
			str += "  </tr>   ";
			str += "  </table>   ";
		} else if(kpi=="SINR") {
			
			if( !"3G"==technology && "LTE"== deviceInfo.networkType){
			
				str = 
					 "<table class='tg'>                                       "+
					 "  <tr>                                                   "+
					 "    <th class='tg-s6z2'>Device ID<br></th>               "+
					 "    <th class='tg-031e'>Timestamp<br></th>               "+
					 "    <th class='tg-s6z2' colspan='2'>MCC</th>             "+
					 "  </tr>                                                  "+
					 "  <tr>                                                   "+
					 "   <td class='tg-5hgy' > ";
					 if("LTE"== deviceInfo.networkType){
						 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
							
							str = str + "<a onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></u></div></td>                  ";
					 }else{
						 str = str + device+"</td>";
					 }
					 str = str + "  <td class='tg-5hgy'>"+deviceInfo.timestamp+"</td>           "+
					 "    <td class='tg-5hgy' colspan='2'>"+(deviceInfo.mcc == 0 ? "" : deviceInfo.mcc)+"</td>    "+
					 "  </tr>                                                  "+
					 "  <tr>                                                   "+

					 "  <tr>                                                   "+
					 "    <td class='tg-5klj'>SINR</td>             "+
					 "    <td class='tg-5klj'>Network Type</td>                "+
					 "    <td class='tg-5klj'>MNC</td>                         "+
					 "    <td class='tg-5klj'>LAC ID</td>                      "+
					 "  </tr>                                                  "+
					 "  <tr>                                                   ";

				if(deviceInfo.sinr<100){
					//str += "    <td class='tg-5hgy'>"+deviceInfo.sinr+"dB</td>  ";
				 str +="   <td class='tg-5hgy' > ";
					 if("LTE"== deviceInfo.networkType){
						 geoUrlWithParameter=showDeviceViewUrl(device,deviceInfo.startDate,deviceInfo.endDate,deviceInfo.startTime,deviceInfo.endTime,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
							
						 str = str + " <a  onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+deviceInfo.sinr+"</font></u></a></td> ";
						 
//						str = str + "<div onclick=showDeviceView("+device+",'"+deviceInfo.startDate+"','"+deviceInfo.endDate+"','"+deviceInfo.startTime+"','"+deviceInfo.endTime+"',"+deviceInfo.xParamR+","+deviceInfo.yParamR+",1.0,"+deviceInfo.locationProvider+")><u><font color=#0000FF style='cursor:pointer'>"+deviceInfo.sinr+"dB</font></div></td>                  ";
					 }else{
						 str = str + deviceInfo.sinr+"dB</td>";
					 }
				 
				}	
				else {
					str += "    <td class='tg-5hgy'></td>      ";
				}
				
				str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
				str += "<td class='tg-5hgy'>"+(deviceInfo.mnc == 0 ? "" : deviceInfo.mnc)+"</td>  ";
				str += "<td class='tg-5hgy'>"+(deviceInfo.lacId == 0 ? "" : deviceInfo.lacId)+"</td>  ";
				str += "  </tr>   ";
				str += "  </table>   ";
			}else {
				str = 
						 "<table class='tg'>                                       "+
						 "  <tr>                                                   "+
						 "    <th class='tg-s6z2'>Device ID<br></th>               "+
						 "    <th class='tg-031e'>Timestamp<br></th>               "+
						 "    <th class='tg-s6z2' colspan='2'>MCC</th>             "+
						 "  </tr>                                                  "+
						 "  <tr>                                                   "+
						 "   <td class='tg-5hgy' > ";
						 if("LTE"== deviceInfo.networkType){
							 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
								
							 str = str + " <a  onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></u></a></td> ";
							 
//								str = str + " <div onclick=showDeviceView("+device+",'"+start_date+"','"+end_date+"','"+start_time+"','"+end_time+"',"+deviceInfo.xParamR+","+deviceInfo.yParamR+","+r+",'"+deviceInfo.locationProvider+"')><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></div></td>                  ";
						 }else{
							 str = str + device+"</td>";
						 }
						 str = str + "  <td class='tg-5hgy'>"+deviceInfo.timestamp+"</td>           "+
						 "    <td class='tg-5hgy' colspan='2'>"+(deviceInfo.mcc == 0 ? "" : deviceInfo.mcc)+"</td>    "+
						 "  </tr>                                                  "+
						 "  <tr>                                                   "+

						 "  <tr>                                                   "+
						 "    <td class='tg-5klj'>ECIO</td>             			"+
						 "    <td class='tg-5klj'>Network Type</td>                "+
						 "    <td class='tg-5klj'>MNC</td>                         "+
						 "    <td class='tg-5klj'>LAC ID</td>                      "+
						 "  </tr>                                                  "+
						 "  <tr>                                                   ";

					if(deviceInfo.ecio != 0){
						//str += "    <td class='tg-5hgy'>"+deviceInfo.sinr+"dB</td>  ";
						 str +="   <td class='tg-5hgy' > ";
							 if("LTE"== deviceInfo.networkType){
								  geoUrlWithParameter=showDeviceViewUrl(device,deviceInfo.startDate,deviceInfo.endDate,deviceInfo.startTime,deviceInfo.endTime,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
									
								 
									str = str + " <div onClick=\"window.open("+geoUrlWithParameter+" )\")><u><font color=#0000FF style='cursor:pointer'>"+deviceInfo.ecio+"dB</font></div></td>";
							 }else{
								 str = str +deviceInfo.ecio+"dB</td>";
							 }
					}
					
					else if(deviceInfo.pilotstr != 0){
						//str += "    <td class='tg-5hgy'>"+deviceInfo.sinr+"dB</td>  ";
						 str +="   <td class='tg-5hgy' > ";
							 if("LTE"== deviceInfo.networkType){
								  geoUrlWithParameter=showDeviceViewUrl(device,deviceInfo.startDate,deviceInfo.endDate,deviceInfo.startTime,deviceInfo.endTime,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
									
									str = str + " <a onClick=\"window.open("+geoUrlWithParameter+" ><u><font color=#0000FF style='cursor:pointer'>"+deviceInfo.pilotstr+"dB</font></u></a></td>";
							 }else{
								 str = str +deviceInfo.pilotstr+"dB</td>";
							 }
					}										
					else 
						str += "    <td class='tg-5hgy'></td> ";
					
					str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
					str += "<td class='tg-5hgy'>"+(deviceInfo.mnc == 0 ? "" : deviceInfo.mnc)+"</td>  ";
					str += "<td class='tg-5hgy'>"+(deviceInfo.lacId == 0 ? "" : deviceInfo.lacId)+"</td>  ";
					str += "  </tr>   ";
					str += "  </table>   ";
			}	
		} else if(kpi=="CQI") {
			 
			str = 
				 "<table class='tg'>                                       "+
				 "  <tr>                                                   "+
				 "    <th class='tg-s6z2'>Device ID<br></th>               "+
				 "    <th class='tg-031e'>Timestamp"+deviceInfo.xParamR+"<br></th>               "+
				 "    <th class='tg-s6z2' colspan='2'>MCC"+deviceInfo.yParamR+"</th>             "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+
				 "   <td class='tg-5hgy' > ";
				 if("LTE"== deviceInfo.networkType){
					 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
						
					 str = str + " <a  onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></u></a></td> "; 
//					str = str + " <div onclick=showDeviceView("+device+",'"+start_date+"','"+end_date+"','"+start_time+"','"+end_time+"',"+deviceInfo.xParamR+","+deviceInfo.yParamR+","+r+",'"+deviceInfo.locationProvider+"')><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></div></td>                  ";
				 }else{
					 str = str + device+"</td>";
				 }
				 str = str + " <td class='tg-5hgy'>"+deviceInfo.timestamp+"</td>           "+
				 "    <td class='tg-5hgy' colspan='2'>"+(deviceInfo.mcc == 0 ? "" : deviceInfo.mcc)+"</td>    "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+

				 "  <tr>                                                   "+
				 "    <td class='tg-5klj'>CQI</td>             "+
				 "    <td class='tg-5klj'>Network Type</td>                "+
				 "    <td class='tg-5klj'>MNC</td>                         "+
				 "    <td class='tg-5klj'>LAC ID</td>                      "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   ";

		
			str += "    <td class='tg-5hgy'>"+deviceInfo.cqi+"</td>  ";
			
			str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.mnc == 0 ? "" : deviceInfo.mnc)+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.lacId == 0 ? "" : deviceInfo.lacId)+"</td>  ";
			str += "  </tr>   ";
			str += "  </table>   ";
		}  else if(kpi=="PING" /*&& ((device!=null && str_devices_3g.contains(device))*/ || !"LTE"== deviceInfo.networkType) {  // Latency, 3G
			
			str = "<table class='tg'>                                       "+
				"  <tr>                                                   "+
				"    <th class='tg-s6z2'>Device ID<br></th>                 "+
				"    <th class='tg-031e'>Time<br></th>       "+
				"    <th class='tg-s6z2' colspan='2'>MCC</th>     "+
				"  </tr>                                                  "+
				"  <tr>                                                   "+
				 "   <td class='tg-5hgy' > ";
				 if("LTE"== deviceInfo.networkType){
					 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
						
					 str = str + " <a  onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></u></a></td> ";
//					str = str + " <div onclick=showDeviceView("+device+",'"+start_date+"','"+end_date+"','"+start_time+"','"+end_time+"',"+deviceInfo.xParamR+","+deviceInfo.yParamR+","+r+",'"+deviceInfo.locationProvider+"')><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></div></td>                  ";
				 }else{
					 str = str + device+"</td>";
				 }
				 str = str + " <td class='tg-5hgy'>"+deviceInfo.timestamp+"</td>           "+
				 "    <td class='tg-5hgy' colspan='2'>"+(deviceInfo.mcc == 0 ? "" : deviceInfo.mcc)+"</td>    "+
					"  </tr>                                                  "+
				"  <tr>                                                   "+

				"  <tr>                                                   "+
				"    <th class='tg-5klj'>Signal Strength</th>                 "+
				"    <th class='tg-5klj'>Network Type</th>          "+
				"    <th class='tg-5klj'>Latency</th>                 "+

				"  </tr>                                                  "+
				"  <tr>                                                   ";
			if(deviceInfo.rssi<-1)
				str += "    <td class='tg-5hgy'>"+deviceInfo.rssi+"dBm</td>  ";
			else 
				str += "    <td class='tg-5hgy'></td>      ";
			str += "    <td class='tg-5hgy'>"+deviceInfo.networkType+"</td>        ";
			if(deviceInfo.ping<0.0)
				str += 	"    <td class='tg-5hgy'> <font color=red>Failed</font> </td>               ";
			else
				str +=  "    <td class='tg-5hgy'>"+deviceInfo.ping+"</td>               ";
			str += 	"  </tr>                                                ";
			str += 	"</table>                                               ";


			
		} else if(kpi=="PING") {  // Latency, LTE
			str = "<table class='tg'>                                       "+
				"  <tr>                                                   "+
				"    <th class='tg-s6z2' colspan='2'>Device ID<br></th>                 "+
				"    <th class='tg-031e' colspan='2'>Time<br></th>       "+
				"    <th class='tg-s6z2' >MCC</th>     "+
				"  </tr>                                                  "+
				"  <tr>                                                   "+
				 "   <td class='tg-5hgy' colspan='2'> ";
				 if("LTE"== deviceInfo.networkType){
					 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
						
					 str = str + " <a  onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></u></a></td> ";
//					str = str + " <div onclick=showDeviceView("+device+",'"+start_date+"','"+end_date+"','"+start_time+"','"+end_time+"',"+deviceInfo.xParamR+","+deviceInfo.yParamR+","+r+",'"+deviceInfo.locationProvider+"')><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></div></td>                  ";
				 }else{
					 str = str + device+"</td>";
				 }
				 str = str + " <td class='tg-5hgy' colspan='2'>"+deviceInfo.timestamp+"</td>           "+
				 "    <td class='tg-5hgy' >"+(deviceInfo.mcc == 0 ? "" : deviceInfo.mcc)+"</td>    "+
					"  </tr>                                                  "+
				"  <tr>                                                   "+

				"  <tr>                                                   "+
				"    <th class='tg-5klj'>Signal Strength</th>                 "+
				"    <th class='tg-5klj'>RSRQ</th>             "+
				 "   <th class='tg-5klj'>SINR</th>             "+
				"    <th class='tg-5klj'>Network Type</th>          "+
				"    <th class='tg-5klj'>Latency</th>                 "+

				"  </tr>                                                  "+
				"  <tr>                                                   ";
			if(deviceInfo.rssi<-1)
				str += "    <td class='tg-5hgy'>"+deviceInfo.rssi+"dBm</td>  ";
			else 
				str += "    <td class='tg-5hgy'></td>      ";
			
			if(deviceInfo.rsrq==0)
				str += "    <td class='tg-5hgy'></td>  ";
			else
				str += "    <td class='tg-5hgy'>"+deviceInfo.rsrq+"dB</td>  ";
			if(deviceInfo.sinr==0)
				str += "    <td class='tg-5hgy'></td>  ";
			else
				str += "    <td class='tg-5hgy'>"+deviceInfo.sinr+"dB</td>  ";
			str += "    <td class='tg-5hgy'>"+deviceInfo.networkType+"</td>        ";
			if(deviceInfo.ping<0.0001)
				str += 	"    <td class='tg-5hgy'> <font color=red>Failed</font> </td>               ";
			else
				str +=  "    <td class='tg-5hgy'>"+deviceInfo.ping+"</td>               ";
			str += 	"  </tr>                                                ";
			str += 	"</table>                                               ";


			
		} else if(kpi=="HANDOVER") {  // HANDOVER
			 str = 
				 "<table class='tg'>                                       "+
				 "  <tr>                                                   "+
				 "    <th class='tg-s6z2' colspan='1'>Device ID<br></th>               "+
				 "    <th class='tg-031e' colspan='1'>Timestamp<br></th>               "+
				 "    <th class='tg-s6z2' colspan='2'>Cell ID</th>             "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+
				 "   <td class='tg-5hgy' colspan='1'> ";
				 if("LTE"== deviceInfo.networkType){
					 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
						
					 str = str + " <a  onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></u></a></td> ";
//					str = str + " <div onclick=showDeviceView("+device+",'"+start_date+"','"+end_date+"','"+start_time+"','"+end_time+"',"+deviceInfo.xParamR+","+deviceInfo.yParamR+","+r+",'"+deviceInfo.locationProvider+"')><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></div></td>                  ";
				 }else{
					 str = str + device+"</td>";
				 }
				 str = str + " <td class='tg-5hgy' colspan='1'>"+deviceInfo.timestamp+"</td>           ";
				
			if(deviceInfo.cellId==0)
				str = str + "    <td class='tg-5hgy' colspan='2'>  </td>    ";
			else
				str = str + "    <td class='tg-5hgy' colspan='2'>"+deviceInfo.cellId+"</td>    ";

			str = str +	
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+

				 "  <tr>                                                   "+
				 "    <th class='tg-5klj'>Signal Strength</th>             ";
			
			str = str +
				 "    <th class='tg-5klj'>Network Type</th>                "+
				 "    <th class='tg-5klj'>MNC</th>                         "+
				 "    <th class='tg-5klj'>LAC ID</th>                      "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   ";

			if(deviceInfo.rssi<-1 && deviceInfo.rssi>-300)
				str += "    <td class='tg-5hgy'>"+deviceInfo.rssi+"dBm</td>  ";
			else 
				str += "    <td class='tg-5hgy'></td>      ";
		
			str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.mnc == 0 ? "" : deviceInfo.mnc)+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.lacId == 0 ? "" : deviceInfo.lacId)+"</td>  ";
			str += "  </tr>   ";
			str += "  </table>   ";
			
		} else if(kpi=="LOSTIP"){  // HANDOVER

			 str = 
				 "<table class='tg'>                                       "+
				 "  <tr>                                                   "+
				 "    <th class='tg-s6z2' colspan='1'>Device ID<br></th>               "+
				 "    <th class='tg-031e' colspan='1'>Timestamp<br></th>               "+
				 "    <th class='tg-s6z2' colspan='2'>Cell ID</th>             "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+
				 "   <td class='tg-5hgy' colspan='1'> ";
				 if("LTE"== deviceInfo.networkType){
					 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
						
					 str = str + " <a  onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></u></a></td> ";
//					str = str + " <div onclick=showDeviceView("+device+",'"+start_date+"','"+end_date+"','"+start_time+"','"+end_time+"',"+deviceInfo.xParamR+","+deviceInfo.yParamR+","+r+",'"+deviceInfo.locationProvider+"')><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></div></td>                  ";
				 }else{
					 str = str + device+"</td>";
				 }
				 str = str + " <td class='tg-5hgy' colspan='1'>"+deviceInfo.timestamp+"</td>           ";
				
			if(deviceInfo.cellId==0)
				str = str + "    <td class='tg-5hgy' colspan='2'>  </td>    ";
			else
				str = str + "    <td class='tg-5hgy' colspan='2'>"+deviceInfo.cellId+"</td>    ";

			str = str +	
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+

				 "  <tr>                                                   "+
				 "    <th class='tg-5klj'>Data Session Status</th>             ";
			
			str = str +
				 "    <th class='tg-5klj'>Network Type</th>                "+
				 "    <th class='tg-5klj'>MNC</th>                         "+
				 "    <th class='tg-5klj'>LAC ID</th>                      "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   ";

				str += "    <td class='tg-5hgy'>"+deviceInfo.dss+"dBm</td>  ";
			
			str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.mnc == 0 ? "" : deviceInfo.mnc)+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.lacId == 0 ? "" : deviceInfo.lacId)+"</td>  ";
			str += "  </tr>   ";
			str += "  </table>   ";
			
		} else if(kpi=="CELLID") {  // Cell ID

			var cellLabel = "";
			var cellValue = "";
			if("LTE"== deviceInfo.networkType & deviceInfo.pci != 0){
				cellLabel = "PCI";
				cellValue = (deviceInfo.pci == 0 ? "" : ""+deviceInfo.pci);
			}else if(("WCDMA"== deviceInfo.networkType || "HSPA"== deviceInfo.networkType
					|| "HSPAP"== deviceInfo.networkType || "HSDPA"== deviceInfo.networkType
					|| "UMTS"== deviceInfo.networkType) && deviceInfo.psc!= 0){
				cellLabel = "PSC";
				cellValue = (deviceInfo.psc == 0 ? "" : ""+deviceInfo.psc);
				
			}else if(("CDMA"== deviceInfo.networkType || "EHRPD"== deviceInfo.networkType
					|| "1xRTT"== deviceInfo.networkType || "EVDOA"== deviceInfo.networkType || "EVDO"== deviceInfo.networkType)
					&& deviceInfo.pn!=0){
				cellLabel = "PN";
				cellValue = (deviceInfo.pn == 0 ? "" : ""+deviceInfo.pn);
			}else{
				cellLabel = "Cell ID";
				cellValue = (deviceInfo.cellId == 0 ? "" : ""+deviceInfo.cellId);
			}
			
			
			 str = 
				 "<table class='tg'>                                       "+
				 "  <tr>                                                   "+
				 "    <th class='tg-s6z2' colspan='1'>Device ID<br></th>               "+
				 "    <th class='tg-031e' colspan='2'>Timestamp<br></th>               "+
				 "    <th class='tg-s6z2' colspan='1'>MCC</th>             "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+
				 "   <td class='tg-5hgy' colspan='1'> ";
				 if("LTE"== deviceInfo.networkType){
					 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
						
					 str = str + " <a  onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></u></a></td> ";
//					str = str + " <div onclick=showDeviceView("+device+",'"+start_date+"','"+end_date+"','"+start_time+"','"+end_time+"',"+deviceInfo.xParamR+","+deviceInfo.yParamR+","+r+",'"+deviceInfo.locationProvider+"')><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></div></td>                  ";
				 }else{
					 str = str + device+"</td>";
				 }
				 str = str + "    <td class='tg-5hgy' colspan='2'>"+deviceInfo.timestamp+"</td>"+
				 " <td class='tg-5hgy' colspan='1'>"+deviceInfo.mcc+"</td>";
			str = str +	
				 "  </tr>                                                  "+
				 "  <tr>                                                   "+

				 "  <tr>                                                   "+
				 "    <th class='tg-5klj'>"+cellLabel+"</th>             ";
			
			str = str +
				 "    <th class='tg-5klj'>Network Type</th>                "+
				 "    <th class='tg-5klj'>MNC</th>                         "+
				 "    <th class='tg-5klj'>LAC ID</th>                      "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   ";
			str = str + "    <td class='tg-5hgy' colspan='1'> "+cellValue+" </td>    ";
			str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.mnc == 0 ? "" : deviceInfo.mnc)+"</td>  ";
			str += "<td class='tg-5hgy'>"+(deviceInfo.lacId == 0 ? "" : deviceInfo.lacId)+"</td>  ";
			str += "  </tr>   ";
			str += "  </table>   ";
			
		} else {

			str =
				 "<table class='tg'>                                       "+
				 "  <tr>                                                   "+
				 "    <th class='tg-s6z2'>Device ID<br></th>                 "+
				 "    <th class='tg-031e'>Time<br></th>       ";
				 
				 if(kpi=="HTTPDL") {
					str += "    <th class='tg-s6z2' colspan='2'>HTTP DL Throughput</th>     ";
				 } else if(kpi=="HTTPUL") {
					str += "    <th class='tg-s6z2' colspan='2'>HTTP UL Throughput</th>     ";
				 } else if(kpi=="FTPUL") {
					str += "    <th class='tg-s6z2' colspan='2'>FTP UL Throughput</th>     ";
				 }else if(kpi=="FTPDL") {
					str += "    <th class='tg-s6z2' colspan='2'>FTP DL Throughput</th>     ";
				 } else {
					 str += "    <th class='tg-s6z2' colspan='2'>";
					 str += kpi;
					 str += " Throughput</th>     ";
				 }
				 
				
				 str += "  </tr>                                                  ";
				 str += "  <tr>                                                   ";
				 str += "   <td class='tg-5hgy' > ";
				 if("LTE"== deviceInfo.networkType){
					 geoUrlWithParameter=showDeviceViewUrl(device,start_date,end_date,start_time,end_time,deviceInfo.xParamR,deviceInfo.yParamR,r,deviceInfo.locationProvider);
						
					 str = str + " <a  onClick=\"window.open("+geoUrlWithParameter+" )\"><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></u></a></td> ";
//					str = str + " <div onclick=showDeviceView("+device+",'"+start_date+"','"+end_date+"','"+start_time+"','"+end_time+"',"+deviceInfo.xParamR+","+deviceInfo.yParamR+","+r+",'"+deviceInfo.locationProvider+"')><u><font color=#0000FF style='cursor:pointer'>"+device+"</font></div></td>                  ";
				 }else{
					 str = str + device+"</td>";
				 }
				 str += "    <td class='tg-5hgy'>"+deviceInfo.timestamp+"</td>           ";
				 
			if(kpi=="HTTPDL")
				str +=	"    <td class='tg-5hgy' colspan='2'>"+(deviceInfo.httpdl==0.0?"":(deviceInfo.httpdl+" Mbps"))+ "</td>   ";
			else if(kpi=="HTTPUL")
				str +=	"    <td class='tg-5hgy' colspan='2'>"+(deviceInfo.httpul==0.0?"":(deviceInfo.httpul+" Mbps"))+ "</td>   ";
			else if(kpi=="FTPDL")
				str +=	"    <td class='tg-5hgy' colspan='2'>"+(deviceInfo.ftpdl==0.0?"":(deviceInfo.ftpdl+" Mbps"))+ " </td>   ";
			else if(kpi=="FTPUL")
				str +=	"    <td class='tg-5hgy' colspan='2'>"+(deviceInfo.ftpul==0.0?"":(deviceInfo.ftpul+" Mbps"))+" </td>   ";
		
					
			str +=
				"  </tr>                                                  "+
				 "  <tr>                                                   "+

				 "  <tr>                                                   "+
				 "    <th class='tg-5klj'>Network Type</th>                 "+
				 "    <th class='tg-5klj'>Location</th>                 "+
				 "    <th class='tg-5klj'>MNC</th>          "+

				 "    <th class='tg-5klj'>Signal Strength</th>          "+
				 "  </tr>                                                  "+
				 "  <tr>                                                   ";
			
			str += "<td class='tg-5hgy'>"+deviceInfo.networkType+"</td>  ";
			str += "<td class='tg-5hgy'>"+deviceInfo.locationProvider+"</td>  ";
			if(deviceInfo.mnc==0)
				str += "<td class='tg-5hgy'></td>  ";
			else
				str += "<td class='tg-5hgy'>"+(deviceInfo.mnc == 0 ? "" : deviceInfo.mnc)+"</td>  ";
			
			if(deviceInfo.rssi<-1 && deviceInfo.rssi> -1000)
				str += "    <td class='tg-5hgy'>"+deviceInfo.rssi+"dBm</td>  ";
			else 
				str += "    <td class='tg-5hgy'></td>      ";
			str += 	"  </tr>                                                ";
			str += 	"</table>                                               ";

			
			
		}
	return str;
	}
	function showDeviceViewUrl(deviceId, startDate, endDate,startTime,endTime,x,y,r,location_type){
		var appurlFull=window.location.href;
		var edit = appurlFull.split('#');
        var appurl = edit[0];
     // console.log("appurl"+appurl);
		var  geoUrlWithParameter="'"+appurl+"app/views/geo_device.html?BASE_URL="+oApp.config.BASE_URL+"&token="+token+"&DeviceIdSelect="+deviceId+"&StartDateSelect="+startDate+"&EndDateSelect="+endDate+"&StartTimeSelect="+startTime+"&EndTimeSelect="+endTime+"&x="+x+"&y="+y+"&r="+r+"&location="+location_type;
//		window.open("http://localhost:8080/IAAPORTAL1/app/views/geo_device.html?token="+token+"&DeviceIdSelect="+deviceId+"&StartDateSelect="+startDate+"&EndDateSelect="+endDate+"&StartTimeSelect="+startTime+"&EndTimeSelect="+endTime+"&x="+x+"&y="+y+"&r="+r+"&location="+location_type, 'mywin','left=180,top=180,width=1500,height=500,toolbar=1,resizable=0'); 
		geoUrlWithParameter+="', 'mywin','left=180,top=180,width=1500,height=auto,toolbar=1,resizable=0'";
return geoUrlWithParameter;
	}
		
	return service;
}])