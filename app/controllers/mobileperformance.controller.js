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
    var newDateList = [];
    window.onresize = function (event) {
        $rootScope.slideContent();
    }
    var token = sessionStorage.token;
    var userId = sessionStorage.userId;
    $rootScope.role = sessionStorage.role;
    $scope.dataLoading3 = true;
    $scope.loadingImageName = oApp.config.loadingImageName;

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

    $scope.onSliderChange = function (sliderId) {
        console.log(sliderId, 'has changed with ', $scope.rangeSlider.value);
        $scope.kpislider = $scope.rangeSlider.value;
    };

    $scope.onDateSliderChange = function (sliderId) {
        //console.log(sliderId, 'has changed with ', $scope.slider.value + " " + $scope.slider.minValue + " " + $scope.slider.maxValue);
        $scope.newDateList = updateDateSliderList($scope.slider.value, $scope.slider.maxValue)
        $scope.newDateList = $scope.newDateList
            .map(function (date) { return date.getTime() })
            .filter(function (date, i, array) {
                return array.indexOf(date) === i;
            })
            .map(function (time) { return new Date(time); });
        console.log("new date list " + $scope.newDateList)
        updateChart($scope.newDateList);
        updateMapData($scope.newDateList, $scope.coordinateDetailsList, $scope.dataPerformanceList)
    };

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

    function updateChart(dateList) {
        var datavalues = {
            values: []
        };
        var tempArray = [];
        for (var i in $scope.dataPerformanceList) {
            var item = $scope.dataPerformanceList[i];
            if (item.fulldate != null &&
                !tempArray.contains(item.fulldate + " " + item.signalStrength)
            ) {
                var date = new Date(item.fulldate)
                date = new Date(date.getTime())
                //console.log("date obj " + date)
                if (isInArray(dateList, date)) {
                    //console.log(" matched date obj " + date)
                    tempArray.push(item.fulldate + " " + item.signalStrength)
                    datavalues.values.push({
                        "label": item.fulldate, "value": item.signalStrength,
                    });
                }
            }
        }
        $scope.options1 = {
            chart: {
                type: 'discreteBarChart',
                height: 400,
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
                    axisLabel: 'Full Date'
                },
                yAxis: {
                    axisLabel: 'Signal Strength (dbm)',
                    axisLabelDistance: -10
                }
            }
        };
        $scope.data1 = [{
            key: "Cumulative Return",
            values: datavalues.values
        }];
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

    function updateMapData(newDateList, coordinateDetails, mobilePerformanceDataList) {
        var updateCoordinateList = [];
        var updatedPerformanceDataList = [];
        var tempArray = [];
        for (var i in mobilePerformanceDataList) {
            var item = mobilePerformanceDataList[i];
            if (item.fulldate != null && coordinateDetails[i] != null &&
                !tempArray.contains(item.fulldate + " " + coordinateDetails[i].latitude + " " + coordinateDetails[i].longitude)
            ) {
                var date = new Date(item.fulldate)
                date = new Date(date.getTime())
                if (isInArray(newDateList, date)) {
                    tempArray.push(item.fulldate + " " + coordinateDetails[i].latitude + " " + coordinateDetails[i].longitude)
                    updateCoordinateList.push(coordinateDetails[i])
                    updatedPerformanceDataList.push(item)
                }
            }
        }
        console.log("Updated Coordinates are " + updateCoordinateList[0].latitude + "  " + updateCoordinateList[0].longitude)
        //updateCoordinateList = filterDuplicateArray(updateCoordinateList)
        //updatedPerformanceDataList = filterDuplicateArray(updatedPerformanceDataList)
        MobilePerformanceService.showMobilePerformanceMap($scope.centerInfo, updateCoordinateList, updatedPerformanceDataList);
    }

    /*
		To get device availability data
	*/
    $scope.mobilePerformance = function () {
        // alert('hi')
        $scope.marketDataLoading = true;
        promise = MobilePerformanceService.mobilePerformance(userId, token);
        promise.then(
            function (data) {
                //$scope.DeviceAvailabilityData = data;
                var val1 = JSON.stringify(data)
                $scope.dataPerformanceList = data.mobilePerformanceDataList.slice()
                $scope.coordinateDetailsList = data.coordinateDetails.slice()
                $scope.centerInfo = data.centerInfo
                //console.log("JSON STRINGIFY " + val1)
                MobilePerformanceService.showMobilePerformanceMap($scope.centerInfo, data.coordinateDetails, data.mobilePerformanceDataList);

                var locationarray = [];
                var kpinamearray = [];
                var deviceIdarray = [];
                var kpivaluearray = [];
                var ssidarray = [];
                var bssidarray = [];
                var fulldatearray = [];
                var datavalues = {
                    values: []
                };
                var tempArray = [];
                for (var i in data.mobilePerformanceDataList) {

                    var item = data.mobilePerformanceDataList[i];
                    if (data.mobilePerformanceDataList[i].locationType != null) {
                        locationarray.push(data.mobilePerformanceDataList[i].locationType);
                    }
                    if (data.mobilePerformanceDataList[i].kpiname != null) {
                        kpinamearray.push(data.mobilePerformanceDataList[i].kpiname);
                    }
                    if (data.mobilePerformanceDataList[i].deviceId != null) {
                        deviceIdarray.push(data.mobilePerformanceDataList[i].deviceId);
                    }
                    if (data.mobilePerformanceDataList[i].kpivalue != null) {
                        kpivaluearray.push(parseFloat(data.mobilePerformanceDataList[i].kpivalue));
                    }
                    if (data.mobilePerformanceDataList[i].wifiSSID != null) {
                        ssidarray.push(data.mobilePerformanceDataList[i].wifiSSID);
                    }
                    if (data.mobilePerformanceDataList[i].wifiBSSID != null) {
                        bssidarray.push(data.mobilePerformanceDataList[i].wifiBSSID);
                    }
                    if (item.signalStrength == null) {
                        item.signalStrength = "0"
                    }
                    if (item.fulldate != null &&
                        !tempArray.contains(item.fulldate + " " + item.signalStrength)
                    ) {
                        tempArray.push(item.fulldate + " " + item.signalStrength)
                        fulldatearray.push(new Date(data.mobilePerformanceDataList[i].fulldate))
                        // console.log("full date "+item.fulldate)
                        //console.log("signal strength "+item.signalStrength)
                        datavalues.values.push({
                            "label": item.fulldate, "value": item.signalStrength,
                        });
                    }
                }
                locationarray = filterDuplicateArray(locationarray)
                kpinamearray = filterDuplicateArray(kpinamearray)
                deviceIdarray = filterDuplicateArray(deviceIdarray)
                kpivaluearray = filterDuplicateArray(kpivaluearray)
                ssidarray = filterDuplicateArray(ssidarray)
                bssidarray = filterDuplicateArray(bssidarray)
                fulldatearray = fulldatearray
                    .map(function (date) { return date.getTime() })
                    .filter(function (date, i, array) {
                        return array.indexOf(date) === i;
                    })
                    .map(function (time) { return new Date(time); });

                $scope.locationTypeList = locationarray
                $scope.kpinameList = kpinamearray
                $scope.deviceList = deviceIdarray
                $scope.kpivalueList = kpivaluearray
                $scope.ssidList = ssidarray
                $scope.bssidList = bssidarray
                $scope.dateList = fulldatearray
                //  console.log($scope.locationTypeList);
                // console.log($scope.kpinameList);
                //  console.log($scope.deviceList);
                // console.log($scope.kpivalueList);
                //  console.log($scope.ssidList);
                // console.log($scope.bssidList);
                console.log($scope.dateList);
                console.log(JSON.stringify(datavalues.values))
                //  console.log(Math.min.apply(Math, kpivaluearray));
                //  console.log(Math.max.apply(Math, kpivaluearray));

                $scope.metricsTableData = [
                    {
                        kpiName: 'HTTP DL (Mbps)',
                        kpiAvg: '10,392'
                    },
                    {
                        kpiName: 'Latency (ms)',
                        kpiAvg: '7,873'
                    },
                    {
                        kpiName: 'Time to connect WiFi (s)',
                        kpiAvg: '10,392'
                    },
                    {
                        kpiName: 'WiFi RSSI (dbm)',
                        kpiAvg: '7,873'
                    },
                ]

                updateDateSlider();
                $scope.rangeSlider = {
                    minValue: Math.min.apply(Math, kpivaluearray),
                    maxValue: Math.max.apply(Math, kpivaluearray),
                    value: Math.min.apply(Math, kpivaluearray),
                    options: {
                        floor: Math.min.apply(Math, kpivaluearray),
                        ceil: Math.max.apply(Math, kpivaluearray),
                        id: 'RangeSlider',
                        step: 1,
                        onChange: $scope.onSliderChange
                    },
                }

                //    discrete Bar Chart
                $scope.options1 = {
                    chart: {
                        type: 'discreteBarChart',
                        height: 400,
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
                            axisLabel: 'Full Date'
                        },
                        yAxis: {
                            axisLabel: 'Signal Strength (dbm)',
                            axisLabelDistance: -10
                        }
                    }
                };
                $scope.data1 = [{
                    key: "Cumulative Return",
                    values: datavalues.values
                }];
                $scope.marketDataLoading = false;
            },
            function (err) {
                $scope.marketDataLoading = false;
            }
        );
    }

    function filterDuplicateArray(array) {
        return array.filter(function (item, index, inputArray) {
            return inputArray.indexOf(item) == index;
        });
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
            type: 'discreteBarChart',
            height: 450,
            margin: {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function (d) { return d.label; },
            y: function (d) { return d.value; },
            showValues: true,
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
        {
            browser: 'Google Chrome',
            visits: '10,392'
        },
        {
            browser: 'Mozilla Firefox',
            visits: '7,873'
        },
        {
            browser: 'Internet Explorer',
            visits: '5,890'
        },
        {
            browser: 'Safari',
            visits: '4,001'
        },
        {
            browser: 'Opera',
            visits: '1,833'
        }
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

