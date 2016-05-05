oTech.service('GraphMaximizeServices',
    ['$http', '$rootScope', '$timeout', '$location' , function ( $http,  $location, $rootScope,  $timeout) {
		var service = {};
		
		/*
			Function to show Device availability graph
		*/
		service.DahsboardDevicesAvailability = function(data){
			var chartConfig = {
				chart: {
					type: 'pie'
				},
				credits: {
					enabled: false
				},
				title: {
					text: null
				},
				plotOptions: {
					series: {
						center: ['47%', '47%'],
						borderWidth: 0,
						dataLabels: {
							enabled: false
						}
					}
				},
				tooltip: {
					useHTML: true,
					formatter: function() {
						if(this.key != undefined)
							return ("<div class='toolti'>" + this.point.msg + ':  ' + this.key + "</div>");
						else
							return false;
					}
				},
				xAxis: {
					labels: {
						enabled: false
					}
				},
				yAxis: {
					labels: {
						enabled: false
					}
				},
				series: [
					{
						name: 'Inner',
						data: [],
						size: '18%',
						innerSize: '70%',
						slicedOffset: 0
					},
					{
						name: 'Outer',
						data: [],
						size: '31%',
						innerSize: '80%',
						slicedOffset: 0
					},
					{
						name: 'Outer1',
						data: [],
						size: '44%',
						innerSize: '90%',
						slicedOffset: 0
					},
					{
						name: 'Outer2',
						data: [],
						size: '57%',
						innerSize: '95%',
						slicedOffset: 0
					}
				]
			},
			rgb = function (color) {
				return 'rgb(' + color + ')';
			};

			var data = {
				inner: [{
					y: (351/data.registered)*100,
					msg: 1,
					color: rgb('255, 135, 97'),
					sliced: true,
					name:'Active'
				},
				{
					y: 100-((351/data.registered)*100),
					msg: 1,
					color: rgb('255,255,255'),
					sliced: true,
					name:''
				}],
				outer: [{
					y: (351/data.registered)*100, 
					msg: 1,
					color: rgb('87, 189, 222'),
					sliced: true,
					name:'Availabile'
				},
				{
					y: 100-((351/data.registered)*100),
					msg: 1,
					color: rgb('255,255,255'),
					sliced: true,
					name:''
				}],
				outer1: [{
					y: (data.approved/data.registered)*100, 
					msg: data.approved,
					color: rgb('177, 152, 220'),
					sliced: true,
					name:'Licenced'
				},
				{
					y: 100-((data.approved/data.registered)*100),
					msg: 1,
					color: rgb('255,255,255'),
					sliced: true,
					name:''
				}],
				outer2: [{
					y: data.registered, 
					msg: data.registered,
					color: rgb('255, 153, 0'),
					sliced: true,
					name:'Registered'
				}]
			};
			var chart1 = $.extend({}, chartConfig);

			chart1.series[0].data = data.inner;
			chart1.series[1].data = data.outer;
			chart1.series[2].data = data.outer1;
			chart1.series[3].data = data.outer2;

			$('#chart1').highcharts(chart1);
		}
		
		
				return service;
}])