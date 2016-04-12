 oTech.service('sharedProperties', function () {
        var callPerformanceSelected = '';

        return {
            callPerformance_getProperty: function () {
                return callPerformanceSelected;
            },
            callPerformance_setProperty: function(value) {
                callPerformanceSelected = value;
            }
        };
    });