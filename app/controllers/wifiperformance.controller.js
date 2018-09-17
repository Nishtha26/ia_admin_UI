'use strict';
oTech.controller('WifiPerformanceController', function ($scope, $rootScope, $location, AppServices, WiFiPerformanceService, $stateParams, $timeout, $uibModal, $element) {
    $scope.name = sessionStorage.getItem("username");
    $rootScope.slideContent();
    var market;
    $scope.options1 = { /* see examples */ };
    $scope.data1 = []; //can leave empty
    var kpislider;
    var dataPerformanceList;
    var coordinateDetailsList;
    var centerInfo;
    var metricsTableData = [];
    var tableData = [];
    var newDateList = [];
    var fulldatearray = [];
    var listCount = 0
    var pageIndex = 1
    var graphType = "Bar"
    var datavalues = {
        values: []
    };
    var dateTimeMap = new Map();
    window.onresize = function (event) {
        $rootScope.slideContent();
    }
$("#backButton").hide();
$("#radioGroup").hide();

    var token = sessionStorage.token;
    var userId = sessionStorage.userId;
    $rootScope.role = sessionStorage.role;
    $scope.dataLoading3 = true;
    $scope.loadingImageName = oApp.config.loadingImageName;
    $scope.mapDataLoading = true;
    var date1 = new Date(2017, 3, 1);
    var date2 = new Date();
    var day;
    var dateArray = [date1];
    while (date1 <= date2) {
        day = date1.getDate()
        date1 = new Date(date1.setDate(++day));
        dateArray.push(date1);
    }
    $scope.slider = {
        minValue: dateArray[0],
        maxValue: dateArray[dateArray.length - 1],
        value: dateArray[0], // or new Date(2016, 7, 10) is you want to use different instances
        options: {
            stepsArray: dateArray,
            translate: function (date) {
                if (date != null)
                    return getFormattedDate(date);
                return '';
            }
        }
    };

    $scope.locationData = {
        group: 'Network',
    };

    $scope.graph = {
        type: 'Bar',
    };

    $scope.radioChanged = function () {
        console.log($scope.locationData.group);
        updateDashboardContent(false)
    };

    $scope.graphChanged = function () {
        graphType = $scope.graph.type
        updateChart(datavalues)
    }

    $scope.onSliderChange = function (sliderId) {
        console.log(sliderId, 'has changed with ', $scope.rangeSlider.value);
        $scope.kpislider = $scope.rangeSlider.value;
        updateDashboardContent(false)
    };

    $scope.onDateSliderChange = function (sliderId) {
        //console.log(sliderId, 'has changed with ', $scope.slider.value + " " + $scope.slider.minValue + " " + $scope.slider.maxValue);
        updateDashboardContent(false)
    };

    function between(x, min, max) {
        var isthere = x >= min && x <= max
        //console.log(isthere)
        return isthere;
    }

    function updateDashboardContent(isFirstPull) {
        $scope.mapDataLoading = true;
        //console.log('has changed with ' + $scope.rangeSlider.value + " Max Value " + $scope.rangeSlider.maxValue);
        if (!isFirstPull) {
            $scope.newDateList = updateDateSliderList($scope.slider.value, $scope.slider.maxValue)
            $scope.newDateList = $scope.newDateList
                .map(function (date) { return date.getTime() })
                .filter(function (date, i, array) {
                    return array.indexOf(date) === i;
                })
                .map(function (time) { return new Date(time); });
        }
        //console.log("new date list " + $scope.newDateList)
        var updatedPerformanceDataList = [];
        var tempArray = [];
        var mapTempArray = [];
        //var ssidarray = [];
        //var bssidarray = [];
        var mncarray = [];
        var cellarray = [];
        var locationarray = [];
        var kpinamearray = [];
        var deviceIdarray = [];
        var kpivaluearray = [];
        var ssidarray = [];
        var bssidarray = [];
        fulldatearray.length = 0
        var tempDatavalues = {
            values: []
        };
        var newTempArray = [];
        var kpiTableArray = [];
        for (var i = 0, len = $scope.dataPerformanceList.length; i < len; ++i) {
            var item = $scope.dataPerformanceList[i];
            if (isFirstPull) {
                if (item.locationType != null) {
                    locationarray.push(item.locationType);
                }
                if (item.kpiname != null) {
                    kpinamearray.push(item.kpiname);
                }
                if (item.deviceId != null) {
                    deviceIdarray.push(item.deviceId);
                }
                if (item.kpivalue != null) {
                    kpivaluearray.push(parseFloat(item.kpivalue));
                }
                if (item.timeStamp != null && item.signalStrength != null) {
                    //console.log(item.timeStamp)
                    // if(!dateTimeMap.has(item.timeStamp).has(item.signalStrength))
                    dateTimeMap.set(item.timeStamp, item.signalStrength)
                }
                if (item.wifiSSID != null) {
                    ssidarray.push(item.wifiSSID);
                }
                if (item.wifiBSSID != null) {
                    bssidarray.push(item.wifiBSSID);
                }
                if (item.signalStrength == null) {
                    item.signalStrength = "0"
                }
                if (item.fulldate != null &&
                    !newTempArray.contains(item.fulldate + " " + item.signalStrength)
                ) {
                    newTempArray.push(item.fulldate + " " + item.signalStrength)
                    fulldatearray.push(new Date(item.fulldate))
                    // console.log("full date "+item.fulldate)
                    //console.log("signal strength "+item.signalStrength)
                    // datavalues.values.push({
                    //     "label": item.fulldate, "value": item.signalStrength,
                    // });
                }
            }
            if (((typeof ($scope.deviceId) === 'undefined') ? item.deviceId != null : item.deviceId == $scope.deviceId)
                && ((typeof ($scope.locationType) === 'undefined') ? item.locationType != null : (item.locationType != null && item.locationType.toLowerCase() == $scope.locationType.toLowerCase()))
                  && ((typeof ($scope.bssid) === 'undefined') ? item.wifiBSSID != null : (item.wifiBSSID != null && item.wifiBSSID.toLowerCase() == $scope.bssid.toLowerCase()))
                  && ((typeof ($scope.ssid) === 'undefined') ? item.wifiSSID != null : (item.wifiSSID != null && item.wifiSSID.toLowerCase() == $scope.ssid.toLowerCase()))
                // && ((typeof ($scope.rangeSlider.value) === 'undefined') ? item.kpivalue != null : (item.kpivalue != null && parseFloat(item.kpivalue) == $scope.rangeSlider.value))
                && ((typeof ($scope.kpiname) === 'undefined') ? item.kpiname != null : (item.kpiname != null && item.kpiname.toLowerCase() == $scope.kpiname.toLowerCase()))) {
                if ((typeof ($scope.kpiname) === 'undefined') ? (item.kpivalue != null || item.kpivalue != "") : between(item.kpivalue, $scope.rangeSlider.value, $scope.rangeSlider.maxValue)) {
                    if (item.fulldate != null) {
                        var date = new Date(item.fulldate)
                        date = new Date(date.getTime())
                        //console.log("date obj " + date)
                        if (isFirstPull ? true : isInArray($scope.newDateList, date)) {
                            //GPS/Network
                            if ($scope.locationData.group == "Network") {
                                if (item.latitude != 0 && item.longitude != 0) {
                                    if (!mapTempArray.contains(item.latitude + " " + item.longitude)) {
                                        mapTempArray.push(item.latitude + " " + item.longitude)
                                        //updateCoordinateList.push(wifiPerformanceDataList[i])
                                        updatedPerformanceDataList.push(item)
                                    }
                                }//Tagged/Indoor
                            } else if ($scope.locationData.group == "Tagged") {
                                if (item.indoorLatitude != 0 && item.indoorLongitude != 0) {
                                    if (!mapTempArray.contains(item.indoorLatitude + " " + item.indoorLongitude)) {
                                        mapTempArray.push(item.indoorLatitude + " " + item.indoorLongitude)
                                        //updateCoordinateList.push(wifiPerformanceDataList[i])
                                        updatedPerformanceDataList.push(item)
                                    }
                                }
                            }
                            if (!tempArray.contains(item.fulldate + " " + item.signalStrength)) {
                                tempArray.push(item.fulldate + " " + item.signalStrength)
                                if (item.signalStrength != 0) {
                                    tempDatavalues.values.push({
                                        "label": item.fulldate, "value": item.signalStrength,
                                    });
                                }
                            }
                            if ((item.kpiname != null && item.kpivalue != null) || (item.kpiname != "" && item.kpivalue != "")) {
                                var kpi_name = item.kpiname
                                var kpi_value = parseFloat(item.kpivalue)
                                if ((!(typeof (kpi_name) === 'undefined'))) {
                                    kpiTableArray.push(
                                        {
                                            [kpi_name]: kpi_value
                                        }
                                    )
                                }
                            }
                           // ssidarray.push(item.wifiSSID);
                           // bssidarray.push(item.wifiBSSID);
                             if (item.wifiSSID != null && item.wifiSSID != 0 && item.wifiSSID != -1) ssidarray.push(item.wifiSSID)
                             if (item.wifiBSSID != null && item.wifiBSSID != 0 && item.wifiBSSID != -1) bssidarray.push(item.wifiBSSID)
                        }
                    }
                }

            }
        }

        if (isFirstPull) {
            $scope.locationTypeList = filterDuplicateArray(locationarray)
            $scope.kpinameList = filterDuplicateArray(kpinamearray)
            $scope.deviceList = filterDuplicateArray(deviceIdarray)
            $scope.kpivalueList = filterDuplicateArray(kpivaluearray)
            $scope.ssidList = filterDuplicateArray(ssidarray)
            $scope.bssidList = filterDuplicateArray(bssidarray)
            $scope.ssidCount = $scope.ssidList.length
            $scope.bssidCount = $scope.bssidList.length
            $scope.dateList = fulldatearray
                .map(function (date) { return date.getTime() })
                .filter(function (date, i, array) {
                    return array.indexOf(date) === i;
                })
                .map(function (time) { return new Date(time); });
            // console.log($scope.dateList);
            updateDateSlider()
            updateKPIValueArray()
        }

       // $scope.ssidCount = (filterDuplicateArray(ssidarray)).length
        //$scope.bssidCount = (filterDuplicateArray(bssidarray)).length
        //console.log("Updated mnc list " + filterDuplicateArray(mncarray))
        //console.log("Updated mnc list " + filterDuplicateArray(cellarray))
       // $scope.cellCount = (filterDuplicateArray(cellarray)).length
       // $scope.mncCount = (filterDuplicateArray(mncarray)).length

        // console.log(" Before Avg " + JSON.stringify($scope.metricsTableData))
        $scope.metricsTableData = Array.from(kpiTableArray.reduce(
            (acc, obj) => Object.keys(obj).reduce(
                (acc, key) => typeof obj[key] == "number"
                    ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
                    : acc,
                acc),
            new Map()),
            ([name, values]) =>
                ({ name, average: (values.reduce((a, b) => a + b) / values.length).toFixed(2) })
        );
        datavalues = tempDatavalues
        var mapData = updatedPerformanceDataList
        console.log("Date Count " + $scope.dateList.length)
        console.log("Market Count " + $scope.locationTypeList.length)
        console.log("KPIName Count " + $scope.kpinameList.length)
        console.log("Device Count " + $scope.deviceList.length)
        console.log("KPI Value Count " + $scope.kpivalueList.length)
        console.log(" KPI Table" + $scope.metricsTableData.length + " Cell Count " + $scope.cellCount + " mncCount " + $scope.mncCount)
        updateChart(datavalues);
        updateMapData(mapData)
        $scope.mapDataLoading = false;
    }
    Array.prototype.contains = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }

    function isInArray(array, value) {
        return !!array.find(item => { return item.getTime() == value.getTime() });
    }

    function updateChart(datavalues, isDateTime) {
        $scope.options1 = { /* see examples */ };
        $scope.data1 = []; //can leave empty
        console.log("updated graph list " + JSON.stringify(datavalues.values))
        if (graphType == "Line") {
            updateLineChart(datavalues)
            return;
        }
        console.log("updated graph length " + datavalues.values.length)
        var arr = [];
        for (var i = 0; i < datavalues.values.length; i++) {
            arr.push(parseFloat(datavalues.values[i].value))
        }
        var min = Math.min.apply(Math, arr)
        var max = Math.max.apply(Math, arr)
        console.log(parseFloat(min) + " " + parseFloat(max))
        //clearChart();
        $scope.options1 = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin: {
                    top: 0,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                dispatch: {
                    tooltipShow: function (e) { },
                    tooltipHide: function (e) { },
                    beforeUpdate: function (e) { }
                },
                discretebar: {
                    dispatch: {
                        //chartClick: function(e) {console.log("! chart Click !")},
                        // elementClick: function(e) {console.log("! element Click !")},
                        elementDblClick: function (e) {
                            console.log(e.data.label)
                            updateGraphView(e.data.label)
                        },
                        elementMouseout: function (e) { },
                        elementMouseover: function (e) { }
                    }
                },
                callback: function (e) { console.log('! callback !') },
                x: function (d) { return d.label },
                y: function (d) { return d.value },
                showControls: true,
                showValues: false,
                staggerLabels: false,
                showLegend: true,
                valueFormat: function (d) {
                    return d3.format(',.4f')(d);
                },
                forceY: [min - 20, max],
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Date',
                    rotateLabels: -45,
                    margin: {
                        top: 0,
                        right: 10,
                        bottom: 0,
                        left: 10
                    }
                },
                yAxis: {
                    axisLabel: 'WiFi RSSI (dbm)',
                    axisLabelDistance: -10
                }
            }
        };
        $scope.data1 = [{
            key: "WiFi Performance",
            values: datavalues.values
        }];
        if (isDateTime) {
            $("div.outer").css({"overflow-x": "auto"});
            $("div.outer .inner").css({"width": "1000%"});
            $timeout(function () {
                window.dispatchEvent(new Event('resize'));
            }, 0);
        }else 
        {
            $("div.outer").css({"overflow-x": "auto"});
            $("div.outer .inner").css({"width": "100%"});
        }
    }

    $scope.clicked = function () {
        $("#backButton").hide();
    //     $('#backButton').fadeOut('slow', function() {
    //         $(this).css({"visibility":"hidden"});
    //         $(this).css({"display":"block"});
    //   });
      updateChart(datavalues);
    };

    function updateGraphView(label) {
        var tempDatavalues = {
            values: []
        };
        $("#backButton").show();
        for (let [key, value] of dateTimeMap) {
            // console.log(key + " - " + value);
            var date = key.split(' ');
            if (date[0] == label && value != 0) {
                //console.log("Map Found")
                // console.log("Time "+date[1]+" Value "+value);
                tempDatavalues.values.push({
                    "label": date[1], "value": value,
                });
            }

        }
        updateChart(tempDatavalues, true)

    }

    function updateLineChart(datavalues) {
        // console.log("updated graph list " + JSON.stringify(datavalues.values))
        console.log("updated graph length " + datavalues.values.length)
        var arr = [];
        var lineChartArray = [];
        for (var i = 0; i < datavalues.values.length; i++) {
            arr.push(parseFloat(datavalues.values[i].value))
            lineChartArray.push({ x: new Date(datavalues.values[i].label), y: datavalues.values[i].value })
        }
        var min = Math.min.apply(Math, arr)
        var max = Math.max.apply(Math, arr)
        console.log(parseFloat(min) + " " + parseFloat(max))
        //clearChart();
        $scope.options1 = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin: {
                    top: 0,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function (d) { return d.x; },
                y: function (d) { return d.y; },
                isArea: false,
                clipVoronoi: true,
                interpolate: "monotone",
                useInteractiveGuideline: true,
                // showControls: true,
                // showValues: false,
                // staggerLabels: false,
                showLegend: true,
                // valueFormat: function (d) {
                //     return d3.format(',.4f')(d);
                // },
                forceY: [min, max],
                transitionDuration: 500,
                xAxis: {
                    showMaxMin: false,
                    axisLabel: 'Date',
                    axisLabelDistance: 10,
                    rotateLabels: -45,
                    tickFormat: function (d) {
                        return d3.time.format('%Y-%m-%d')(new Date(d))
                    },
                },
                //xScale: d3.time.scale(),
                yAxis: {
                    axisLabel: 'Signal Strength (dbm)',
                    tickFormat: function (d) {
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                }
            },
            title: {
                enable: false,
                text: 'Title for Line Chart'
            },
            subtitle: {
                enable: false,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
        };
        $scope.data1 = [{
            key: 'Mobile Performance',
            values: lineChartArray,
            color: '#ff7f0e'
        }];
    }

    var clearChart = function () {
        var svg = d3.select("#chart svg");
        svg.selectAll("*").remove();
    }

    var colorCategory = d3.scale.category20b()
    $scope.colorFunction = function () {
        return function (d, i) {
            return colorCategory(i);
        };
    }

    $scope.xAxisTickFormatFunction = function () {
        return function (d) {
            return d3.time.format('%b')(new Date(d));
        }
    }

    function sortDates(a, b) {
        return a.getTime() - b.getTime();
    }

    function updateDateSliderList(startDate, endDate) {
        var updatedDateList = $scope.dateList.slice()
        for (var i in $scope.dateList) {
            var item = $scope.dateList[i];
            if (startDate > item || item > endDate) {
                var index = updatedDateList.indexOf(item)
                if (index > -1) {
                    updatedDateList.splice(index, 1)
                }
            }
        }
        return updatedDateList;

    }

    function updateDateSlider() {
        var sorted = $scope.dateList.sort(sortDates);
        var minDate = sorted[0];
        var maxDate = sorted[sorted.length - 1];
        //  console.log(minDate + " " + maxDate)
        $scope.slider = {
            minValue: minDate,
            maxValue: maxDate,
            value: minDate, // or new Date(2016, 7, 10) is you want to use different instances
            options: {
                stepsArray: sorted,
                id: 'DateSlider',
                onChange: $scope.onDateSliderChange,
                translate: function (date) {
                    if (date != null)
                        return getFormattedDate(date);
                    return '';
                }
            }
        };
    }

    $scope.updateDashboard = function () {
        updateDashboardContent(false)
    }

    function updateMapData(updatedPerformanceDataList) {
        WiFiPerformanceService.showWiFiPerformanceMap($scope.centerInfo, updatedPerformanceDataList);
    }

    /*
		To get device availability data
	*/
    $scope.wifiPerformance = function () {
        // alert('hi')
        //$scope.marketDataLoading = true;
        promise = WiFiPerformanceService.wifiPerformance(userId, pageIndex);
        promise.then(
            function (data) {
                var val1 = JSON.stringify(data)
                console.log(val1)
                if (typeof ($scope.dataPerformanceList) === 'undefined') {
                    $scope.dataPerformanceList = data.wifiPerformanceDataList
                } else {
                    $scope.dataPerformanceList = $scope.dataPerformanceList.concat(data.wifiPerformanceDataList)
                }
                $scope.centerInfo = data.centerInfo
                listCount = data.records
                if(listCount == 0)
                {
                    $scope.mapDataLoading = false;
                    return;
                }
                $("#radioGroup").show();
                updateDashboardContent(true)
                console.log("before Page Index is " + pageIndex + " Total Count " + parseInt(listCount / 10000))
                //$scope.marketDataLoading = false;
                if (parseInt(listCount / 10000) >= pageIndex) {
                    pageIndex++
                    console.log("after Page Index is " + pageIndex)
                    $scope.wifiPerformance();
                }

            },
            function (err) {
                $scope.mapDataLoading = false;
            }
        );
    }

    function filterDuplicateArray(array) {
        return array.filter(function (item, index, inputArray) {
            return inputArray.indexOf(item) == index;
        });
    }

    function updateKPIValueArray() {
        $scope.rangeSlider = {
            minValue: Math.min.apply(Math, $scope.kpivalueList),
            maxValue: Math.max.apply(Math, $scope.kpivalueList),
            value: Math.min.apply(Math, $scope.kpivalueList),
            options: {
                floor: Math.min.apply(Math, $scope.kpivalueList),
                ceil: Math.max.apply(Math, $scope.kpivalueList),
                id: 'RangeSlider',
                step: 1,
                onChange: $scope.onSliderChange
            },
        }
    }
    //    discrete Bar Chart
    $scope.options2 = {
        chart: {
            type: 'multiBarChart',
            height: 450,
            margin: {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function (d) { return d.label; },
            y: function (d) { return d.value; },
            showValues: false,
            valueFormat: function (d) {
                return d3.format(',.4f')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: -10
            }
        }
    };
    $scope.data2 = [{
        key: "Cumulative Return",
        values: [
            { "label": "A", "value": -29.765957771107 },
            { "label": "A", "value": -19.765957771107 },
            { "label": "A", "value": -9.765957771107 },
            { "label": "A", "value": 29.765957771107 },
            { "label": "A", "value": -39.765957771107 },
            { "label": "B", "value": 0 },
            { "label": "C", "value": 32.807804682612 },
            { "label": "D", "value": 196.45946739256 },
            { "label": "E", "value": 0.19434030906893 },
            { "label": "F", "value": -98.079782601442 },
            { "label": "G", "value": -13.925743130903 },
            { "label": "H", "value": -5.1387322875705 },
            { "label": "I", "value": -29.765957771107 },
            { "label": "J", "value": 0 },
            { "label": "K", "value": 32.807804682612 },
            { "label": "L", "value": 196.45946739256 },
            { "label": "M", "value": 0.19434030906893 },
            { "label": "N", "value": -98.079782601442 },
            { "label": "O", "value": -13.925743130903 },
            { "label": "P", "value": -5.1387322875705 },
            { "label": "Q", "value": -29.765957771107 },
            { "label": "R", "value": 0 },
            { "label": "S", "value": 32.807804682612 },
            { "label": "T", "value": 196.45946739256 },
            { "label": "U", "value": 0.19434030906893 },
            { "label": "V", "value": -98.079782601442 },
            { "label": "W", "value": -13.925743130903 },
            { "label": "X", "value": -5.1387322875705 },
            { "label": "Y", "value": -29.765957771107 },
            { "label": "Z", "value": 0 }
        ]
    }];
    $scope.minSlider = {
        value: 10,
    }
    $scope.debugSlider = {
        value: 50,
        options: {
            showTicks: 5,
            showTicksValues: 10,
            floor: 0,
            ceil: 100,
            step: 5,
            showSelectionBar: true,
        },
    }

    //Range slider config
    $scope.rangeSlider = {
        minValue: 10,
        maxValue: 90,
        value: 10,
        options: {
            floor: 0,
            ceil: 100,
            step: 1,
        },
    }

    $scope.customSlider = {
        minValue: 10,
        maxValue: 90,
        options: {
            floor: 0,
            ceil: 100,
            step: 10,
            showTicks: true,
        },
    }

    //Range slider with minLimit and maxLimit config
    $scope.minMaxLimitSlider = {
        value: 50,
        options: {
            floor: 0,
            ceil: 100,
            step: 1,
            minLimit: 10,
            maxLimit: 90,
        },
    }

    //Range slider with minRange and maxRange config
    $scope.minMaxRangeSlider = {
        minValue: 40,
        maxValue: 60,
        options: {
            floor: 0,
            ceil: 100,
            step: 1,
            minRange: 10,
            maxRange: 50,
        },
    }

    $scope.metricsTableData = [

    ];

    $scope.showErrorMessage = function (divId, msg) {

        $rootScope.showErrorMessage(divId, msg);

    }
    $scope.showSuccessMessage = function (divId, msg) {
        $rootScope.showSuccessMessage(divId, msg);
    }

    /*
     To get dashboard menu data
     */

    $scope.getDashBoardMenu = function () {
        if ($rootScope.menuData == undefined) {
            $rootScope.getMenuData();
        }
    }
    /*
     To get favourite reports
     */
    $scope.getFavouriteReports = function () {
        if ($rootScope.Favourites == undefined) {
            $rootScope.getFavouriteReports();
        }
    }
    $scope.getDashBoardMenu();
  //  $scope.mobilePerformance();
    $scope.wifiPerformance();
    //                                    			$scope.getFavouriteReports();

    /*repaly from to date for date picker */

    function getFormattedDate() {
        var time = '';
        var dateNow = new Date();
        var day = dateNow.getDate();
        var month = dateNow.getMonth() + 1;
        var year = dateNow.getFullYear();
        time += dateNow.getHours() + ":";
        time += dateNow.getMinutes();
        var dateFormatted = year + "-" + month + "-" + day + " " + time;
        return dateFormatted;
    }

    function getFormattedDate(date) {
        var time = '';
        // var dateNow = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        time += date.getHours() + ":";
        time += date.getMinutes();
        if (month < 10) month = "0" + month
        if (day < 10) day = "0" + day
        var dateFormatted = year + "-" + month + "-" + day;
        return dateFormatted;
    }

    //generateChart();

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
    $scope.DefaultReplayMap = true;
    $scope.checkAjaxCall = function () {
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

    WiFiPerformanceService.defaultHeatMap();
    $scope.showMarketList = function () {
        $scope.marketDataLoading = true;
        //	$scope.dataLoading = true;
        promise = WiFiPerformanceService.GetMarketData(userId, token);
        promise.then(
            function (data) {
                $scope.marketList = data;
                $scope.marketDataLoading = false;
                //	alert(data);

            },
            function (err) {
                console.log(err);
                $scope.marketDataLoading = false;
            }
        );
    }
    $scope.showMarketList();

    /*
     Function to get Market Device List
     */
    $scope.getMarketDevices = function () {
        $scope.configuarationDiv = false;
        $scope.deviceGroupDiv = false;
        $scope.errdiv = false;
        $scope.deviceDataLoading = true;
        promise = WiFiPerformanceService.GetDeviceListForMarket(userId, token, market);
        promise.then(
            function (data) {
                if (data.length > 0) {
                    $scope.deviceDataLoading = false;
                    //	$scope.deviceDiv =true;
                    console.log(data);
                    $scope.deviceList = data;
                }
                else {
                    $scope.deviceDiv = false;
                    $scope.deviceDataLoading = false;
                    $scope.errdiv = true;
                }
                //$("#target").val($("#target option:last").val());
            },
            function (err) {
                $scope.deviceDataLoading = false;
            }
        );
    }

    $scope.showDeviceByMarket = function (selectValue) {
        //	alert("s"+selectValue);
        market = selectValue;
        $scope.getMarketDevices();
    }


    $scope.showHeatMapCategory = function () {
        $scope.dataLoading = true;
        promise = WiFiPerformanceService.getHeatMapCalgories(userId, token);
        promise.then(
            function (data) {
                $scope.heatMapCateogoryList = data;
                $scope.dataLoading3 = false;
                //	alert(data);

            },
            function (err) {
                console.log(err);
            }
        );
    }
    $scope.showHeatMapCategory();


    //$(document).ready(function() {

    function getCheckBoxValue(fieldName) {
        var technologyVal = [];
        $.each($("input[name='" + fieldName + "']:checked"), function () {
            technologyVal.push($(this).val());
        });
        if (technologyVal.length > 0) {
            if (technologyVal.length == 2) {
                return "all";
            }
            if (technologyVal.length == 1) {
                return technologyVal[0];
            }
        }
        return "";
    }

    //	  });
    $scope.generateHeatMap = function () {
        var marketName = $('#marketName').val();
        var deviceId = $('#deviceId').val();

        var fromDate = $('#fromDate').val();
        var toDate = $('#toDate').val();
        var category = $('#category').val();
        //                                			    var location=$('#location').val();
        var location = getCheckBoxValue('location');
        //	    var technology=$('#technology').val();
        var technology = getCheckBoxValue('technology');


        if (!$scope.heatmap_form.$invalid) {
            $scope.mapDataLoading = true;
            var data = {
                "marketName": marketName,
                "deviceId": deviceId,
                "fromDate": fromDate,
                "toDate": toDate,
                "category": category,
                "location": location,
                "technology": technology
            };
            var heatMapInput = data;

            //   $scope.ShowLiveMap = false;
            //     $scope.ShowMapDiv = true;
            //     $scope.one =false;
            //     $scope.two =true;

            promise = WiFiPerformanceService.populateMap(token, data);
            promise.then(
                function (data) {
                    /*	console.log("centerInfo"+data.centerInfo);
                     console.log("centerInfo"+data.coordinateDetails);*/
                    if (data.coordinateDetails.length > 0) {
                        $scope.mapDataLoading = false;
                        var showTechnologyFilter = data.showTechnologyFilter;
                        $(".mashupContainer2").css("display", '');
                        $("#kpiImage").attr("src", data.kpiImage);
                        $(".kpiTitle").text(data.kpiTitle);
                        //$("#technology").val(data.technology);
                        //	$("#location").val(data.location);
                        if (showTechnologyFilter) {
                            $("#panel1").hide();
                            $("#panel").show();
                        }
                        else {

                            $("#panel1").show();
                            $("#panel").hide();
                        }
                        if (data.deviceInformation.length > 0) {
                            WiFiPerformanceService.showHeatMap(heatMapInput, data.centerInfo, data.coordinateDetails, data.deviceInformation);
                        }
                        else {
                            //	alert('No Records Was Found')
                            $scope.showErrorMessage("heat_map_error", "No Records Was Found");

                            WiFiPerformanceService.defaultHeatMap();
                        }
                    }
                    else {
                        // alert('No Records Was Found')
                        $scope.showErrorMessage("heat_map_error", "No Records Was Found");
                        WiFiPerformanceService.defaultHeatMap();
                        $scope.mapDataLoading = false;
                    }

                },
                function (err) {
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

