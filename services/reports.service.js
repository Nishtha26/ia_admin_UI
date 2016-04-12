oTech.service('ReportServices',
    ['$http', '$rootScope', '$timeout', '$location', '$q', function ( $http,  $location, $rootScope,  $timeout, $q) {
		var token = sessionStorage.getItem("token"); 
		var service = {};
		
		
		/*
			Function to get Markets for CallPerformance  Summary && CallPerformance Timeline
		*/
		service.GetMarkets = function(token){
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/reports/callPerformance/getMarkets",
				    type: "POST",
					data : {token:token},
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
			Function to get Device Role Data for CallPerformance Timeline
		*/
		service.GetDeviceRoleData = function(token, userId){
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/reports/callPerformance/getDeviceRoleData",
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
			Function to get Call Type Data for Callperformance Timeline
		*/
		service.GetCallTypeData = function(token, userId){
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/reports/callPerformance/getCallTypeData",
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
			Function to get the device list for data performance Timeline && Tabular 
		*/
		service.GetDeviceList = function(token, userId ){
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/repData/getDevicesForMarket",
				    type: "POST",
					data : {token:token, userId:userId,market:'Dallas'},
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
        
       /*to get reports in ReportCategory*/	
       service.GetReportCategory = function( userId,token ){
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/repData/getUserReports",
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
			
		/*Get Markets For User*/	
		 service.GetMarketsForUser = function( userId,token ){
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/repData/getMarketsForUser",
				    type: "POST",
					data : {token:token, userId:userId,market:'Dallas'},
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
	  /*Get Market Devices  */	
       service.GetMarketDevices = function( userId,token,market ){
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/repData/getDevicesForMarket",
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
		  /*Get Configuration Devices  */	
       service.GetMarketConfiguration = function( userId,token,market ){
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/repData/getMarketConfig",
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
			  /*Get  Device Group For Market  */	
       service.GetDeviceGroupMarket = function( userId,token,market ){
			var deferred = $q.defer();
			$.ajax({
				    url : oApp.config.BASE_URL + "rest/repData/getJobsForMarket",
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
		
			
			return service; 		
}])