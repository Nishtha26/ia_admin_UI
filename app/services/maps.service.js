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
		service.DahsboardShowMap = function(lat, lon){
			var marker = [];
			var secheltLoc = new google.maps.LatLng(lat[10], lon[10]);

			var myMapOptions = {
				zoom: 10
				,center: secheltLoc
				,mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var theMap = new google.maps.Map(document.getElementById("Map"), myMapOptions);
			for(var i=0;i < lat.length;i++)
			{
				marker[i] = new google.maps.Marker({
					map: theMap,
					draggable: true,
					position: new google.maps.LatLng(lat[i], lon[i]), 
					visible: true,
					icon: 'images/location.png'
				});
			
				var boxText = document.createElement("div");
				boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
		
	
				var myOptions = {
					content: boxText
					,disableAutoPan: false
					,maxWidth: 0
					,pixelOffset: new google.maps.Size(-140, 0)
					,zIndex: null
					,boxStyle: { 
						background: "url('images/tipbox.gif') no-repeat"
						,opacity: 0.75
						,width: "280px"
					}
					,closeBoxMargin: "10px 2px 2px 2px"
					,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
					,infoBoxClearance: new google.maps.Size(1, 1)
					,isHidden: false
					,pane: "floatPane"
					,enableEventPropagation: false
				};
				google.maps.event.addListener(marker[i], "click", function (e) {
					//console.log(this);
					 var lat = parseFloat(this.internalPosition.lat());
					var lng = parseFloat(this.internalPosition.lng());
					//console.log(this);
					var llng = new google.maps.LatLng(lat, lng); 
					var geocoder = geocoder = new google.maps.Geocoder();
					geocoder.geocode({ 'latLng': llng }, function (results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							if (results[1]) {
								boxText.innerHTML = results[1].formatted_address;
							}
						}
					});
					ib.open(theMap, this);
				});

				var ib = new InfoBox(myOptions);
			}
			
		}
		
		
		/*Replay Map  */ 
		service.showReplayMap = function(lat,lan){
			
	
 var markers = [];
 for(i =0 ;i < lat.length ;i++)
	{
	  markers.push({lat:lat[i],lng:lan[i]});
	}
			
		//console.log(markers);	
			  var mapOptions = {
            center: new google.maps.LatLng(markers[10].lat, markers[10].lng),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("rePlayMap"), mapOptions);
        var infoWindow = new google.maps.InfoWindow();
        var lat_lng = new Array();
        var latlngbounds = new google.maps.LatLngBounds();
        for (i = 0; i < markers.length; i++) {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title
            });
            latlngbounds.extend(marker.position);
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
				 var lat = parseFloat(this.internalPosition.lat());
					var lng = parseFloat(this.internalPosition.lng());
					//console.log(this);
					var llng = new google.maps.LatLng(lat, lng); 
					var geocoder = geocoder = new google.maps.Geocoder();
					geocoder.geocode({ 'latLng': llng }, function (results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							if (results[1]) {
								var pavan = results[1].formatted_address;
								infoWindow.setContent(pavan);
								infoWindow.open(map, marker);
							}
						}
					});
				
				
				
                    
                    
                });
            })(marker, data);
        }
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
 
        //***********ROUTING****************//
 
        //Initialize the Path Array
        var path = new google.maps.MVCArray();
 
        //Initialize the Direction Service
        var service = new google.maps.DirectionsService();
 
        //Set the Path Stroke Color
        var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
 
        //Loop and Draw Path Route between the Points on MAP
        for (var i = 0; i < lat_lng.length; i++) {
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
        }
		}
		/*show defalut  */ 
		service.defaultRepalyMap = function(){
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
	return service;
}])