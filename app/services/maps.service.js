 oTech.service('MapServices',
    ['$http', '$rootScope', '$timeout', '$location', '$q', function ( $http,  $location, $rootScope,  $timeout, $q) {
		var service = {};
		var token = sessionStorage.getItem("token");
		/*
			Function to get Map data
		*/
		service.GetMapLocations = function(userId,token){
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/devices/deviceLastLocation",
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
		service.getreplay = function(token, data){
			console.log(data);
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/devices/fetchMarkersUsingAJAX",
				    type: "POST",
					
					data : JSON.stringify(data),
					headers :{
					'X-Auth-Token': token,
					"Content-Type" : "application/json"
					},
				    success: function(data)
				    {
						deferred.resolve(data);
						console.log(data);
				    },
				    error: function (err)
				    {
						deferred.reject(err);
				    }
			    });	
			return deferred.promise; 
		}
		
		/*
			Function To Integrate Google Maps
		*/

		
		
		var infoContents = new Array();
		service.DahsboardShowMap = function(deviceData, lat, lon){
			var marker ;
			var markers =new Array();
			var ib ;
			var myCenter = new google.maps.LatLng(39.8333, -98.5833);
		//	var secheltLoc = new google.maps.LatLng(lat[10], lon[10]);
			var bounds = new google.maps.LatLngBounds();
			var myMapOptions = {
				zoom: 10
				,center: myCenter
				,mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var theMap = new google.maps.Map(document.getElementById("Map"), myMapOptions);
			var deviceDataHTML="";
			for(var i=0;i < deviceData.length;i++)
			{
				deviceDataHTML=""
					if(deviceData[i]!=undefined)
					{	
				marker = new google.maps.Marker({
					map: theMap,
					draggable: true,
					position: new google.maps.LatLng(deviceData[i].deviceLogJson[1].Latitude, deviceData[i].deviceLogJson[2].Longitude), 
					visible: true,
					icon: 'images/mobile.png'
				});
				markers.push(marker);
			//	console.log("deviceData[i] "+deviceData[i]);
			//	console.log("deviceData[i].deviceId "+deviceData[i].deviceId);
				
				device=deviceData[i];
				var boxText = document.createElement("div");
			
				boxText.style.cssText = "background-color: #fff; border-radius: 2px; box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.3);border-radius: 10px; ";
				deviceDataHTML='<table class="table table-striped">'
					+ '<thead><tr>' + '<th>Device Details</th>'
					+ '</tr></thead>' + '<tbody>'
					+ '<tr><td>Active Date (MM/dd/yyyy hh:mm) </td><td>' + getFormattedDate(device.lastMsgRecvTimeStamp)
					+ '</td></tr>' 
					+ '<tr><td>Device ID           </td><td>' + device.deviceId
					+ '</td></tr>' + '<tr><td>Latitude            </td><td>'
					+ device.deviceLogJson[1].Latitude + '</td></tr>'
					+ '<tr><td>Longitude           </td><td>'
					+ device.deviceLogJson[2].Longitude + '</td></tr>'
					+ '<tr><td>Battery Level       </td><td>'
					+ device.deviceLogJson[5].BatteryLevel + '</td></tr>'
					+ '<tr><td>Connected Data type  </td><td>'
					+ device.deviceLogJson[4].ConnectedDataType + '</td></tr>'
					+ '<tr><td>Cell Id  </td><td>'
					+ device.deviceLogJson[6].CellId + '</td></tr>'
					+ '<tr><td>RSSI  </td><td>'
					+ device.deviceLogJson[7].RSSI + '</td></tr>'
					+ '</tbody></table>';
				boxText.innerHTML=deviceDataHTML; 
				infoContents[i]=boxText;
				var myOptions = {
					content: boxText
					,disableAutoPan: false
					,maxWidth: 0
					,pixelOffset: new google.maps.Size(-140, 0)
					,zIndex: null
					,boxStyle: { 
						background: "url('images/tipbox.gif') no-repeat"
						/*,opacity: 0.75*/
						,width: "290px"
					}
					,closeBoxMargin: "10px 19px 2px 2px"
					,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
					,infoBoxClearance: new google.maps.Size(1, 1)
					,isHidden: false
					,pane: "floatPane"
					,enableEventPropagation: false
				};
				//now fit the map to the newly inclusive bounds
			
				 var ib = new InfoBox(myOptions);
				 google.maps.event.addListener(marker, 'click', (function(marker, i) {
					 return function() {
					console.log("index"+i)
					ib.setContent(infoContents[i]);
					
					ib.open(theMap, marker);
					 }
				 })(marker, i));

				 //extend the bounds to include each marker's position
				bounds.extend(new google.maps.LatLng(deviceData[i].deviceLogJson[1].Latitude,
						deviceData[i].deviceLogJson[2].Longitude))
			
				
				
			}
			}
			theMap.fitBounds(bounds);
		//	theMap.setCenter(bounds.getCenter());
			//theMap.setZoom(map.getZoom()-1);
			
		}
		
		
		
		/*Replay Map  */ 
		service.showReplayMap = function(deviceData,lat,lan){
			
	
 var markers = [];
 /*for(i =0 ;i < lat.length ;i++)
	{
	  markers.push({lat:lat[i],lng:lan[i]});
	}*/
			
		//console.log(markers);	
			  var mapOptions = {
            /*center: new google.maps.LatLng(markers[10].lat, markers[10].lng),*/
            zoom: 5,
            
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("rePlayMap"), mapOptions);
        var infoWindow = new google.maps.InfoWindow();
        var lat_lng = new Array();
        var latlngbounds = new google.maps.LatLngBounds();
        for (i = 0; i < deviceData.length; i++) {
        	
            var data = deviceData[i];
            markers.push({lat:data.deviceLogJson[1].Latitude,lng:data.deviceLogJson[2].Longitude});
//            console.log("Lat :"+data.deviceLogJson[1].Latitude+"Long "+data.deviceLogJson[2].Longitude)
            var myLatlng = new google.maps.LatLng(data.deviceLogJson[1].Latitude, data.deviceLogJson[2].Longitude );
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title,
                icon: 'images/mobile.png'
            });
            latlngbounds.extend(marker.position);
            (function (marker, data,deviceData) {
                google.maps.event.addListener(marker, "click", function (e) {
				 var lat = parseFloat(this.internalPosition.lat());
					var lng = parseFloat(this.internalPosition.lng());
					//console.log(this);
					var llng = new google.maps.LatLng(lat, lng); 
					var geocoder = geocoder = new google.maps.Geocoder();
					geocoder.geocode({ 'latLng': llng }, function (results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							if (results[1]) {
								var address = results[1].formatted_address;
								infoWindow.setContent(replyContentInfo(data,address));
								infoWindow.open(map, marker);
							}
						}
					});
				
				
				
                    
                    
                });
            })(marker, data,deviceData);
        }
        google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
        	  //this.setZoom(map.getZoom()-1);

        	  if (this.getZoom() > 18) {
        	    this.setZoom(18);
        	  }
        	});
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
 
        //***********ROUTING****************//
 
        //Initialize the Path Array
     //   var path = new google.maps.MVCArray();
 
        //Initialize the Direction Service
        //var service = new google.maps.DirectionsService();
 
        //Set the Path Stroke Color
       // var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
 
        //Loop and Draw Path Route between the Points on MAP
        var replayPath = new google.maps.Polyline({
            path: lat_lng,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 3
          });
        replayPath.setMap(map);
/*        for (var i = 0; i < lat_lng.length; i++) {
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                path.push(src);
                poly.setPath(path);
                service.route({
                    origin: src,
                    destination: des,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
            }
        }*/
        
		}
		
		function replyContentInfo(device, address){
			
			var boxText = document.createElement("div");
			boxText.style.cssText = "background-color: #fff; border-radius: 2px; box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.3); ";
			deviceDataHTML='<table class="table table-striped">'
				+ '<thead><tr>' + '<th>Device Details</th>'
				+ '</tr></thead>' + '<tbody>'
				+ '<tr><td>Device ID           </td><td>' + device.deviceId
				+ '</td></tr>' + '<tr><td>Latitude            </td><td>'
				+ device.deviceLogJson[1].Latitude + '</td></tr>'
				+ '<tr><td>Longitude           </td><td>'
				+ device.deviceLogJson[2].Longitude + '</td></tr>'
				+ '<tr><td>Battery Level       </td><td>'
				+ device.deviceLogJson[5].BatteryLevel + '</td></tr>'
				+ '<tr><td>Connected Data type  </td><td>'
				+ device.deviceLogJson[4].ConnectedDataType + '</td></tr>'
				+ '<tr><td>Cell Id  </td><td>'
				+ device.deviceLogJson[6].CellId + '</td></tr>'
				+ '<tr><td>RSSI  </td><td>'
				+ device.deviceLogJson[7].RSSI + '</td></tr>'
				+ '<tr><td>Location  </td><td>'
				+ address + '</td></tr>'
				+ '</tbody></table>';
			boxText.innerHTML=deviceDataHTML; 
			return boxText;
			
		}
		/*show defalut  */ 
		service.defaultRepalyMap = function(){
		var myCenter = new google.maps.LatLng(39.8333, -98.5833);
		 var mapProp = {
			center : myCenter,
			zoom : 13,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};

	var	map = new google.maps.Map(document.getElementById("DefaultReplayMap"), mapProp);
		google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
       });
		$("#replayMapLink").addClass("viewimage_links-active");
		$("#liveMapLink").removeClass("viewimage_links-active");
		
	}
		service.clearReplayMap = function(){
			var myCenter = new google.maps.LatLng(39.8333, -98.5833);
			 var mapProp = {
				center : myCenter,
				zoom : 13,
				mapTypeId : google.maps.MapTypeId.ROADMAP
			};

		var	map = new google.maps.Map(document.getElementById("rePlayMap"), mapProp);
			google.maps.event.addListenerOnce(map, 'idle', function() {
	        google.maps.event.trigger(map, 'resize');
	       });
			$("#replayMapLink").addClass("viewimage_links-active");
			$("#liveMapLink").removeClass("viewimage_links-active");
			
		}
		function getFormattedDate(strDate) {
			 var time = '';
		     var deviceDate = new Date(strDate);
		     var day = deviceDate.getDate();
		     var month = deviceDate.getMonth() + 1;
		     var year = deviceDate.getFullYear();
		     time += deviceDate.getHours() + ":";
		     time +=deviceDate.getMinutes();
		     var dateFormatted =   month + "/" +  day + "/" + year + " " + time;
		     return dateFormatted;
}
	return service;
}])