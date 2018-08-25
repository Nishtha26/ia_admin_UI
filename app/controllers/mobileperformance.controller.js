'use strict';
oTech.controller('MobilePerformanceController', function ($scope, $rootScope, $location, AppServices, MobilePerformanceService, $stateParams, $timeout, $uibModal, $element) {
    $scope.name = sessionStorage.getItem("username");
    $rootScope.slideContent();
    var market;
    var kpislider;
    var dataPerformanceList;
    var coordinateDetailsList;
    var centerInfo;
    var metricsTableData = [];
    var tableData = [];
    var newDateList = [];
    window.onresize = function (event) {
        $rootScope.slideContent();
    }
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

    $scope.radioChanged = function () {
        console.log($scope.locationData.group);
        updateDashboardContent(false)
    };

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
        console.log('has changed with ' + $scope.rangeSlider.value + " Max Value " + $scope.rangeSlider.maxValue);
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
        var datavalues = {
            values: []
        };
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
        //var ssidarray = [];
        //var bssidarray = [];
        var fulldatearray = [];
        var datavalues = {
            values: []
        };
        var newTempArray = [];
        var kpiTableArray = [];
        for (var i in $scope.dataPerformanceList) {
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
                // if (data.mobilePerformanceDataList[i].wifiSSID != null) {
                //     ssidarray.push(data.mobilePerformanceDataList[i].wifiSSID);
                // }
                // if (data.mobilePerformanceDataList[i].wifiBSSID != null) {
                //     bssidarray.push(data.mobilePerformanceDataList[i].wifiBSSID);
                // }
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
                //  && ((typeof ($scope.bssid) === 'undefined') ? item.wifiBSSID != null : (item.wifiBSSID != null && item.wifiBSSID.toLowerCase() == $scope.bssid.toLowerCase()))
                //  && ((typeof ($scope.ssid) === 'undefined') ? item.wifiSSID != null : (item.wifiSSID != null && item.wifiSSID.toLowerCase() == $scope.ssid.toLowerCase()))
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
                                        //updateCoordinateList.push(mobilePerformanceDataList[i])
                                        updatedPerformanceDataList.push(item)
                                    }
                                }//Tagged/Indoor
                            } else if ($scope.locationData.group == "Tagged") {
                                if (item.indoorLatitude != 0 && item.indoorLongitude != 0) {
                                    if (!mapTempArray.contains(item.indoorLatitude + " " + item.indoorLongitude)) {
                                        mapTempArray.push(item.indoorLatitude + " " + item.indoorLongitude)
                                        //updateCoordinateList.push(mobilePerformanceDataList[i])
                                        updatedPerformanceDataList.push(item)
                                    }
                                }
                            }
                            if (!tempArray.contains(item.fulldate + " " + item.signalStrength)) {
                                tempArray.push(item.fulldate + " " + item.signalStrength)
                                if (item.signalStrength != 0) {
                                    datavalues.values.push({
                                        "label": item.fulldate, "value": item.signalStrength,
                                    });
                                }
                            }
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
                    //ssidarray.push(item.wifiSSID);
                    //bssidarray.push(item.wifiBSSID);
                    if (item.mnc != null && item.mnc != 0 && item.mnc != -1) mncarray.push(item.mnc)
                    if (item.cellId != null && item.cellId != 0 && item.cellId != -1) cellarray.push(item.cellId)
                }

            }
        }

        if (isFirstPull) {
            $scope.locationTypeList = filterDuplicateArray(locationarray)
            $scope.kpinameList = filterDuplicateArray(kpinamearray)
            $scope.deviceList = filterDuplicateArray(deviceIdarray)
            $scope.kpivalueList = filterDuplicateArray(kpivaluearray)
            // $scope.ssidList = filterDuplicateArray(ssidarray)
            // $scope.bssidList = filterDuplicateArray(bssidarray)
            // $scope.ssidCount = $scope.ssidList.length
            // $scope.bssidCount = $scope.bssidList.length
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
        // $scope.bssidCount = (filterDuplicateArray(bssidarray)).length
        //console.log("Updated mnc list " + filterDuplicateArray(mncarray))
        //console.log("Updated mnc list " + filterDuplicateArray(cellarray))
        $scope.cellCount = (filterDuplicateArray(cellarray)).length
        $scope.mncCount = (filterDuplicateArray(mncarray)).length

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

        //console.log(" After Avg " + JSON.stringify($scope.metricsTableData))
        updateChart(datavalues);
        updateMapData(updatedPerformanceDataList)
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

    function updateChart(datavalues) {
        console.log("updated graph list " + JSON.stringify(datavalues.values))
        console.log("updated graph length " + datavalues.values.length)
        $scope.options1 = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin: {
                    top: 40,
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
        $scope.data1 = [{
            key: "Cumulative Return",
            values: datavalues.values
        }];
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
        console.log(minDate + " " + maxDate)
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
        var deviceId = $scope.deviceId
        var kpiname = $scope.kpiname
        //var bssid = $scope.bssid
        //  var ssid = $scope.ssid
        var locationType = $scope.locationType

        if (typeof (kpiname) === 'undefined' && typeof (deviceId) === 'undefined' && typeof (locationType) === 'undefined') {
            //return;
        }

        //alert("Updated values are deviceId " + deviceId + " kpiname " + kpiname + " bssid " + bssid + " ssid " + ssid + " locationType " + locationType)
        updateDashboardContent(false)
    }

    function updateMapData(updatedPerformanceDataList) {
        MobilePerformanceService.showMobilePerformanceMap($scope.centerInfo, updatedPerformanceDataList);
    }

    /*
		To get device availability data
	*/
    $scope.mobilePerformance = function () {
        // alert('hi')
        //$scope.marketDataLoading = true;
        promise = MobilePerformanceService.mobilePerformance(userId, token);
        promise.then(
            function (data) {
                var val1 = JSON.stringify(data)
                $scope.dataPerformanceList = data.mobilePerformanceDataList
                $scope.centerInfo = data.centerInfo
                updateDashboardContent(true)
                //$scope.marketDataLoading = false;
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

    /*
		To get device availability data
	*/
    $scope.wifiPerformance = function () {
        promise = MobilePerformanceService.wifiPerformance(userId, token);
        promise.then(
            function (data) {
                var val1 = JSON.stringify(data)
                console.log("JSON STRINGIFY " + val1)
            },
            function (err) {

            }
        );
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
    $scope.mobilePerformance();
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

    MobilePerformanceService.defaultHeatMap();
    $scope.showMarketList = function () {
        $scope.marketDataLoading = true;
        //	$scope.dataLoading = true;
        promise = MobilePerformanceService.GetMarketData(userId, token);
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
        promise = MobilePerformanceService.GetDeviceListForMarket(userId, token, market);
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
        promise = MobilePerformanceService.getHeatMapCalgories(userId, token);
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

            promise = MobilePerformanceService.populateMap(token, data);
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
                            MobilePerformanceService.showHeatMap(heatMapInput, data.centerInfo, data.coordinateDetails, data.deviceInformation);
                        }
                        else {
                            //	alert('No Records Was Found')
                            $scope.showErrorMessage("heat_map_error", "No Records Was Found");

                            MobilePerformanceService.defaultHeatMap();
                        }
                    }
                    else {
                        // alert('No Records Was Found')
                        $scope.showErrorMessage("heat_map_error", "No Records Was Found");
                        MobilePerformanceService.defaultHeatMap();
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

