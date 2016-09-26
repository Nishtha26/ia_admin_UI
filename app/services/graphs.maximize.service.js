oTech.service('GraphMaximizeServices',
    ['$http', '$rootScope', '$timeout', '$location'  ,'$q', function ( $http,  $location, $rootScope,  $timeout, $q) {
		var service = {};
		var token = sessionStorage.getItem("token");
		/*
		Function to get the device availability data and device id
	*/
	service.GetDeviceAvailabilityDataPerDevice = function(userId,token,deviceId,startDate,endDate){
		var deferred = $q.defer();
		$.ajax({
			    url : oApp.config.BASE_URL + "rest/devices/deviceAvailabilityDataPerDevice",
			    type: "POST",
				data : {token:token,userId:userId,deviceId:deviceId,startDate:startDate,endDate:endDate},
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
			Function to show Device availability graph
		*/
		service.DahsboardDevicesAvailability = function(data){
			console.log("data.");
			var dataDevice = data.deviceAvailabilityData;
			var startDate=new Date(data.startDateTime);
			var endDate=new Date(data.endDateTime);
			var colsizevalue=data.colsize;
			var chartData = "";
			$.each(dataDevice, function(i, point) {
				var row  = point.split(',');
//			  var date = row[0].split('-');
			  var x    = row[0];
			  var y    = row[1];
			  var val  = row[2];
			  chartData=chartData+x+","+y+","+val+"\n";
				//chartData.push([x,y,val]);
			});
			console.log(chartData);
		
//			$('#device_availability_device').highcharts({
			var chartConfig ={
				  data:	
				  {
		            csv: chartData
				  }
		        ,

		        chart: {
		            type: 'heatmap'/*,
		            inverted: true*/
		           /* ,  
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
		                stops: [
		                    [0, '#fff'],
		                    [1, '#57bdde']
		                ]
		            }*/
		        },


		        title: {
		            text: ''
		        },

		        subtitle: {
		            text: ''
		           
		        },

		        xAxis: {
		        	 /*labels:
                        {
                            enabled: false
                        } */ 
//		             tickPixelInterval: 150,
		        	 lineColor:'#000',
			         lineWidth:1,
			       //  tickPositions: [1],
			      //      tickWidth: 0,
//		            tickPixelInterval: 50,
			           dateTimeLabelFormats: {
			                day: '%b %e',
			                week: '%b %e',
			                
			            },
			      /*  tickInterval: 60 * 1000,
		            min: Date.UTC(2016, 7, 18),
		            max: Date.UTC(2016, 7,19)*/
			         type: 'datetime',
			            tickInterval: 3600 * 1000,
			            min: Date.UTC(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),startDate.getHours(),startDate.getMinutes()),
			            max: Date.UTC(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),endDate.getHours(),endDate.getMinutes())
		        },

		        yAxis: {
		            title: {
		                text: null
		            },
		            labels: {
		                format: '{value}'
		            },
		            lineColor:'#000',
		            lineWidth:1,
		            minPadding: 0,
		            maxPadding: 0,
		            
		     //       startOnTick: false,
		   //         endOnTick: false,
		            categories: [''],
		            tickWidth: 0/*,
		            min: 0,
		            max: 23*/
		        },

		   /*     colorAxis: {
		            stops: [
		                [0, '#FFC300'],
		                [1, '#FF5733'],
		                [2, '#DAF7A6']
		            ]
		            
		        },*/
		        
		        colorAxis: {
		        	
                    dataClasses: [{
                        from: 1,
                        to: 1,
                        color: '#C5E65C',
                        
                        name: 'Heart Beat'
                    }, 
                    {
                        from: 0,
                        to: 0,
                        color: '#DB020D',
                        name: 'No Heart Beat'
                    },
                    {
                        from: 2,
                        to: 2,
                      
                        color: '#0767A3',
                        name: 'Job Running'
                    }
                    ]
                },

		        series: [{
		            borderWidth: 0,
		            borderColor:'#FFFFFF',
		            colsize: colsizevalue,
		        //    pointInterval: 3600 * 1000,// one day
//		            pointStart: Date.UTC(2016, 08, 18),
		          //  pointInterval: 24 * 900 * 1000 ,
//		            pointInterval: 24 * 3600 * 1000, // one day
		            
		            tooltip: {
		                headerFormat: 'Date : <br/>',
		                pointFormat: '{point.x:%e %b, %Y %H:%M}'
		            }
		        }]

		    };
			var chart1 = $.extend({}, chartConfig);
			$('#device_availability_device').highcharts(chart1);
			if(chartData==""){
			
				var chart = $('#device_availability_device').highcharts();
				if(chart!=undefined){
		        var seriesLength = chart.series.length;
		        for(var i = seriesLength -1; i > -1; i--) {
		            chart.series[i].remove();
		        }
				}
			}
			else{
				
			$('#device_availability_device').highcharts(chart1);
			}
	console.log("done");

		}
	
		
		
				return service;
}])