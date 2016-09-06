var oApp = oApp || {};
oApp.constant={
	    GRID_DATE_TIME_FORMAT:'MM/dd/yy h:mm:ss a'
}
oApp.config = {

	programmingSkills:[
				{
					value: 20,
					label: 'jQuery',
					color: '#3399FF'
				},
				{
					value: 25,
					label: 'JavaScript',
					color: '#FFC575'
				},
				{
					value: 10,
					label: 'Ruby',
					color: '#99CC00'
				},
				{
					value: 15,
					label: 'Python',
					color: '#FF3300'
				},
				{
					value: 15,
					label: 'CSS3',
					color: '#944DDB'
				},
				{
					value: 10,
					label: 'CSS3',
					color: '#94434B'
				},
				{
					value: 5,
					label: 'CSS3',
					color: '#94445B'
				},
	],
	lineChartData : {
		labels : ["January","February","March","April","May","June"],
		datasets : [
		{
			label: "",
			fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
		},
		{
			label: "",
			fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
		}]
	},
	barChartData : {
		labels : ["January","February","March","April","May","June"],
		tooltipTxt : [],
		datasets : [
		{
			label: "% Job Progress",
			fillColor : "#4CC3FF",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : [5,6]
		},
		{
			label: "My First dataset",
			fillColor : "#FF8761",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : [1,3]
		},
		{
			label: "My First dataset",
			fillColor : "#B198DC",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : [4,6]
		},
		{
			label: "My First dataset",
			fillColor : "#FFC300",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : [5,1]
		}]
	},
	favourites : [
		{
			color : "yellow_bg_color",
			type : "call performance"
		},
		{
			color : "violet_bg_color",
			type : "Data performance"
		},
		{
			color : "lightblue_bg_color",
			type : "Voice Quality"
		},
		{
			color : "green_bg_color",
			type : "Voice Performanc"
		},
		{
			color : "black_bg_color",
			type : "Network Performance"
		}
	],
	BASE_URL:'http://test.orchestratec.net:8080/IAPORTAL/',
	MEASUREMENT_URL :'http://test.orchestratec.net:8080/IAPORTAL/rest/measurement/',
	REPORT_HOST_URL :'http://iareport.orchestratec.net/',
    REPORT_NAME:'ConsolidatedKPI5_13/HomePage',
	jobListGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		columnDefs: [
			{ name: 'jobName',width:150,
			displayName : 'Test Run Name' },
			{ name: 'jobDescription' ,width:150,
			displayName : 'Test Run Description' },
			{ name: 'taskId' ,width:150},
			{ name: 'jobPriority',width:150 },
			{ name: 'jobCreatedBy' ,width:150},
			{ name: 'jobCreateDate' ,width:150},
			{ name: 'jobStartDate' ,width:150},
			{ name: 'jobEndDate' ,width:150},
			{ name: 'scheuleGroupId"' ,width:150},
			{ name: 'jobStartDateTime' ,width:150},
			//{ name: 'deviceGroupId' ,width:150},
			{ name: 'recurrence' ,width:150},
			{ name: 'isCompleted' ,width:150},
			{ name: 'taskName' ,width:150},
			{ name: 'runNum' ,width:150},
			{ name: 'lastTriggeredRunDateTimeUTC' ,width:150}
		]
	},
	activeJobListGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		columnDefs: [
			{ name: 'jobName',width:150,
			displayName : 'Test Run Name'  },
			{ name: 'jobDescription' ,width:150,
		displayName : 'Test Run Description' },
			{ name: 'taskId' ,width:150},
			{ name: 'jobPriority',width:150 },
			{ name: 'jobCreatedBy' ,width:150},
			{ name: 'jobCreateDate' ,width:150},
			{ name: 'jobStartDate' ,width:150},
			{ name: 'jobEndDate' ,width:150},
			{ name: 'scheuleGroupId"' ,width:150},
			{ name: 'jobStartDateTime' ,width:150},
		//	{ name: 'deviceGroupId' ,width:150},
			{ name: 'recurrence' ,width:150},
			{ name: 'isCompleted' ,width:150},
			{ name: 'taskName' ,width:150},
			{ name: 'runNum' ,width:150},
			{ name: 'lastTriggeredRunDateTimeUTC' ,width:150},
			
		]
	},
	activeJobListGridOptionsNew : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		columnDefs: [
			{ name: 'jobName',width:150,
			displayName : 'Test Run Name'  },
			{ name: 'jobDescription' ,width:150,
		displayName : 'Test Run Description' },
		{ displayName : 'Device Id', name: 'deviceId' ,width:150},
			{ name: 'taskId' ,width:150},
			{ name: 'jobPriority',width:150 },
			{ name: 'jobCreatedBy' ,width:150},
			{ name: 'jobCreateDate' ,width:150},
			{ name: 'jobStartDate' ,width:150},
			{ name: 'jobEndDate' ,width:150},
			{ name: 'scheuleGroupId' ,width:150},
			{ name: 'jobStartDateTime' ,width:150},
		//	{ name: 'deviceGroupId' ,width:150},
			{ name: 'recurrence' ,width:150},
			{ name: 'isCompleted' ,width:150},
			{ name: 'taskName' ,width:150},
			{ name: 'runNum' ,width:150},
		
			
			
		]
	},
	activeDeviceGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		columnDefs: [
			{ name: 'deviceName' ,width:150},
			{ name: 'userId' ,width:150},
			{ name: 'customerName' ,width:150},
			{ name: 'workUrl',width:150 },
			{ name: 'msisdn' ,width:150},
			{ name: 'network' ,width:150},
			{ name: 'region',width:150 },
			{ name: 'model' ,width:150},
			{ name: 'manufacturer' ,width:150},
			{ name: 'imei' ,width:150},
			{ name: 'imsi' ,width:150},
			{ name: 'iacVersion' ,width:150},
			{ name: 'logLevel' ,width:150},
			{ name: 'notificationType' ,width:150},
			{ name: 'lastPing' ,width:150},
			
			{ name: 'loginTimestamp' ,width:150},
			{ name: 'loginDeviceTime' ,width:150},
			{ name: 'deviceType' ,width:150},
			{ name: 'networkType' ,width:150},
			{ name: 'statusFlag' ,width:150},
		]
	},
	deviceListGridOptions : {
		//paginationPageSizes: [1,25, 50, 75],
		//paginationPageSize: 25,
		enableVerticalScrollbar :0,
		columnDefs: [
		         	//	 {headerName: "Device", field: "deviceId", width: 90},
						{ name: 'deviceId' ,width:150},
						{ name: 'deviceName',width:150 },
						{ name: 'deviceType' ,width:150},
						{ displayName: 'Carrier' ,width:150,field:'carrier'},
						{ name: 'model' ,width:"20%"},
						{ name: 'manufacturer' ,width:"10%"},
						{displayName: 'IMSI' , field: 'imsi' ,width:150},
						{ displayName: 'IMEI' , field: 'imei' ,width:150},
						{ displayName: 'MSISDN' , name: 'msisdn' ,width:"15%"},
						{ name: 'networkType' ,width:"15%"},
						{ name: 'region' ,width:"15%"},
						{ name: 'statusFlag' ,width:"15%"},
						{ name: 'lastPing' ,width:150},
						{ name: 'jobId' ,width:150},
						{ name: 'jobName' ,width:150},
						{ name: 'jobStatusTime' ,width:"10%" },
						{ name: 'jobStartDate' ,width:"10%" },
						{ name: 'jobEndDate' ,width:"10%" },
				//	 {headerName: "workUrl", field: "workUrl", width: 100},
		/*	{ name: 'deviceName' ,width:150},
			{ name: 'workUrl',width:150 },
			{ name: 'msisdn' ,width:150},
			{ name: 'network' ,width:150},
			{ name: 'region',width:150 },
			{ name: 'model' ,width:150},
			{ name: 'manufacturer' ,width:150},
			{ name: 'imei' ,width:150},
			{ name: 'imsi' ,width:150},
			{ name: 'iacVersion' ,width:150},
			{ name: 'logLevel' ,width:150},
			{ name: 'notificationType' ,width:150},
			{ name: 'lastPing' ,width:150},
			{ name: 'userId' ,width:150},
			{ name: 'loginTimestamp' ,width:150},
			{ name: 'loginDeviceTime' ,width:150},
			{ name: 'deviceType' ,width:150},
			{ name: 'networkType' ,width:150},
			{ name: 'statusFlag' ,width:150},*/
		]
	},
			 mydeviceColumns : [
		//	 {headerName: "Device", field: "deviceId", width: 90},
			 {headerName: "Device Name", field: "deviceName", width: 150,
			sort : 'desc',
			 enableSorting: true

			 },
		//	 {headerName: "deviceType", field: "deviceType", width: 150},
			 {headerName: "IAC Version", field: "iacVersion", width: 100},
			 {headerName: "IMEI", field: "imei", width: 150},
			 {headerName: "IMSI", field: "imsi", width: 150},
		//	 {headerName: "lastPing", field: "lastPing", width: 150},
		//	 {headerName: "logLevel", field: "logLevel", width: 90},
		//	 {headerName: "loginDeviceTime", field: "loginDeviceTime", width: 150},
		//	 {headerName: "loginTimestamp", field: "loginTimestamp", width: 150},
			 {headerName: "Manufacturer", field: "manufacturer", width: 150},
		//	 {headerName: "model", field: "model", width: 150},
			 {headerName: "MSISDN", field: "msisdn", width: 150},
		//	 {headerName: "network", field: "network", width: 150},
		//	 {headerName: "networkType", field: "networkType", width: 150},
		//	 {headerName: "notificationType", field: "notificationType", width: 110},
		//	 {headerName: "region", field: "region", width: 150},
			 {headerName: "statusFlag", field: "statusFlag", width: 100},
			 {headerName: "User", field: "userId", width: 100,
			 filter: 'number'},
		//	 {headerName: "workUrl", field: "workUrl", width: 100},
		],
	deviceListGridOptionsapn : {
        paginationPageSizes: [25, 50, 75],
		paginationPageSize: 25,
		enableSorting: true,
	    enableFilter: true,
	    enableColResize: true,
		enableRowSelection: true,  // for selection
		enableColumnMenus: true, //to hide ascending and descending colomn menu names
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,
		enableGridMenu: true,		// for searching
		multiSelect:false,
		enableVerticalScrollbar :0,
        columnDefs: [  ]	
	},
	columnDefsapn : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "autoId", field: "autoId", width: 150, visible:false},
			{headerName: "deviceId", field: "deviceId", width: 100, pinnedLeft:true},
			{headerName: "jobId", field: "jobId", width: 120},
			{headerName: "timeStamp", field: "timeStamp", width: 90, cellTooltip: 
                function( row, col ) {
                return '' + row.entity.timeStamp + '';
              }},
			{headerName: "apnId", field: "apnId", width: 110},
			{headerName: "apnName", field: "apnName", width: 110},
			{headerName: "apnNumeric", field: "apnNumeric", width: 100},
			{headerName: "apnMcc", field: "apnMcc", width: 100},
			{headerName: "apnMnc", field: "apnMnc", width: 100},
			{headerName: "apnApn", field: "apnApn", width: 100},
			{headerName: "apnUser", field: "apnUser", width: 100},
			{headerName: "apnServer", field: "apnServer", width: 100},
			{headerName: "apnPassword", field: "apnPassword", width: 100},
			{headerName: "apnProxy", field: "apnProxy", width: 100},
			{headerName: "apnPort", field: "apnPort", width: 100},
			{headerName: "apnMmsProxy", field: "apnMmsProxy", width: 100},
			{headerName: "apnMmsPort", field: "apnMmsPort", width: 100},
			{headerName: "apnMmsc", field: "apnMmsc", width: 100},
			{headerName: "apnAuthType", field: "apnAuthType", width: 100},
			{headerName: "apnType", field: "apnType", width: 100},
			{headerName: "apnCurrent", field: "apnCurrent", width: 100},
			{headerName: "apnCurrent1", field: "apnCurrent1", width: 100},
			{headerName: "apnSimId", field: "apnSimId", width: 100},
			{headerName: "apnProtocol", field: "apnProtocol", width: 100},
			{headerName: "apnProfileType", field: "apnProfileType", width: 100},
			{headerName: "apnRoamingProtocol", field: "apnRoamingProtocol", width: 150},
			{headerName: "apnCarrierEnabled", field: "apnCarrierEnabled", width: 150},
			{headerName: "apnBearer", field: "apnBearer", width: 100},
			{headerName: "apnIfPreferredApn", field: "apnIfPreferredApn", width: 150},
			{headerName: "testcaseId", field: "testcaseId", width: 100, cellTooltip: 
                function( row, col ) {
                return '' + row.entity.testcaseId + '';
              }},
			{headerName: "sessionId", field: "sessionId", width: 100, cellTooltip: 
                function( row, col ) {
                return '' + row.entity.sessionId + '';
              }}
		],
		columnDefsapplications : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "deviceId", field: "deviceId", width: 150, pinnedLeft:true},
			{headerName: "jobId", field: "jobId", width: 90},
		   
			{headerName: "timeStamp", field: "timeStamp", width: 90, cellTooltip: 
                function( row, col ) {
                return '' + row.entity.timeStamp + '';
              }},
		 
			{headerName: "appName", field: "appName", width: 110},
			{headerName: "appRss", field: "appRss", width: 100},
			{headerName: "appBatteryLevel", field: "appBatteryLevel", width: 150},
			{headerName: "appCpuUsage", field: "appCpuUsage", width: 100},
			{headerName: "appDlVolumn", field: "appDlVolumn", width: 100},
			{headerName: "appDlSpeed", field: "appDlSpeed", width: 100},
			{headerName: "appUlVolumn", field: "appUlVolumn", width: 100},
			{headerName: "appUlSpeed", field: "appUlSpeed", width: 100},
			{headerName: "appRunStatus", field: "appRunStatus", width: 100},
			{headerName: "appPss", field: "appPss", width: 100},
			{headerName: "appUss", field: "appUss", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100, cellTooltip: 
                function( row, col ) {
                return '' + row.entity.sessionId + '';
              }},
			{headerName: "testcaseId", field: "testcaseId", width: 100, cellTooltip: 
                function( row, col ) {
                return '' + row.entity.testcaseId + '';
              }},
			{headerName: "appUsageTime", field: "appUsageTime", width: 100},
			{headerName: "utcTime", field: "utcTime", width: 100, cellTooltip: 
                function( row, col ) {
                return '' + row.entity.utcTime + '';
              }},
			{headerName: "deviceTimeZone", field: "deviceTimeZone", width: 150},
			{headerName: "appState", field: "appState", width: 100},
			{headerName: "numberThread", field: "numberThread", width: 100},
			{headerName: "appFbground", field: "appFbground", width: 100, cellTooltip: 
                function( row, col ) {
                return '' + row.entity.appFbground + '';
              }},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", width: 150, cellTooltip: 
                function( row, col ) {
                return '' + row.entity.deviceLocalTime + '';
              }}
		],
		columnDefsipaddress : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "autoId", field: "autoId" ,pinnedLeft:true },
			{headerName: "deviceId", field: "deviceId"},
		   {headerName: "jobId", field: "jobId" },
			{headerName: "timeStamp", field: "timeStamp" , cellTooltip: 
                function( row, col ) {
                return '' + row.entity.timeStamp + '';
              }},
			{headerName: "ipPublicV4", field: "ipPublicV4", cellTooltip: 
                function( row, col ) {
                return '' + row.entity.ipPublicV4 + '';
              }},
			{headerName: "dupId", field: "dupId"},
			{headerName: "ipPrivateV4", field: "ipPrivateV4", cellTooltip: 
                function( row, col ) {
                return '' + row.entity.ipPrivateV4 + '';
              }},
			{headerName: "ipPublicV6", field: "ipPublicV6", cellTooltip: 
                function( row, col ) {
                return '' + row.entity.ipPublicV6 + '';
              }},
			{headerName: "ipPrivateV6", field: "ipPrivateV6", cellTooltip: 
                function( row, col ) {
                return '' + row.entity.ipPrivateV6 + '';
              }},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
                function( row, col ) {
                return '' + row.entity.testcaseId + '';
              }}
		],
		columnDefsl1log : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "deviceId", field: "deviceId" ,pinnedLeft:true},
			{headerName: "jobId", field: "jobId"},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }},
		   {headerName: "jobStartTime", field: "jobStartTime", cellTooltip: 
               function( row, col ) {
               return '' + row.entity.jobStartTime + '';
             }},
			{headerName: "jobStartTimeMs", field: "jobStartTimeMs", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.jobStartTimeMs + '';
	             }},
			{headerName: "pci", field: "pci"},
			{headerName: "cellId", field: "cellId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.cellId + '';
	             }},
			{headerName: "cellName", field: "cellName", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.cellName + '';
	             }},
			{headerName: "channelBandWidth", field: "channelBandWidth", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.channelBandWidth + '';
	             }},
			{headerName: "fileUrl", field: "fileUrl", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.fileUrl + '';
	             }}
		],
		columnDefslocation : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "deviceId", field: "deviceId" ,pinnedLeft:true},
			{headerName: "jobId", field: "jobId"},
		   {headerName: "timeStamp", field: "timeStamp", cellTooltip: 
               function( row, col ) {
               return '' + row.entity.timeStamp + '';
             }},
			{headerName: "locationProvider", field: "locationProvider", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.locationProvider + '';
	             }},
			{headerName: "collectAltitude", field: "collectAltitude", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.collectAltitude + '';
	             }},
			{headerName: "sessionId", field: "sessionId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionId + '';
	             }},
			{headerName: "xParam", field: "xParam"},
			{headerName: "yParam", field: "yParam"},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }},
			{headerName: "lastLocationTime", field: "lastLocationTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.lastLocationTime + '';
	             }}
		],
		columnDefsmms : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "mmsId", field: "mmsId",pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId" },
		   {headerName: "jobId", field: "jobId"},
			{headerName: "callingPartyNumber", field: "callingPartyNumber", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.callingPartyNumber + '';
	             }},
			{headerName: "calledPartyNumber", field: "calledPartyNumber", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.calledPartyNumber + '';
	             }},
			{headerName: "timeZone", field: "timeZone", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.timeZone + '';
	             }},
			{headerName: "mmsTime", field: "mmsTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mmsTime + '';
	             }},
			{headerName: "utcTime", field: "utcTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.utcTime + '';
	             }},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.deviceLocalTime + '';
	             }},
			{headerName: "mmsText", field: "mmsText", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mmsText + '';
	             }},
			{headerName: "mmsFileSize", field: "mmsFileSize"},
			{headerName: "mmsFileName", field: "mmsFileName", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mmsFileName + '';
	             }},
			{headerName: "sendStatus", field: "sendStatus"},
			{headerName: "sessionId", field: "sessionId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionId + '';
	             }},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
		],
		columnDefsneighborcellinfo : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "autoId", name: "autoId",pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId" },
		   {headerName: "jobId", field: "jobId"},
			{displayName: "Event Capture Time", field: "timeStamp",width: 180, cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.timeStamp + '';
	             }},
			{displayName: "mcId", field: "mcId"},
			{displayName: "mLac", field: "mLac", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mLac + '';
	             }},
			{displayName: "Network Type", field: "mNetworkType", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mNetworkType + '';
	             }},
			{displayName: "mPsc Id", field: "mPsc", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mPsc + '';
	             }},
			{displayName: "RSSI", field: "rssi", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.rssi + '';
	             }},
			{displayName: "AP Time", field: "apTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.apTime + '';
	             }},
			{displayName: "AP Device Local Time", field: "apDeviceLocalTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.apDeviceLocalTime + '';
	             }},
			{displayName: "UTC Time", field: "utcTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.utcTime + '';
	             }},
			{displayName: "AP Time Zone", field: "apTimeZone", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.apTimeZone + '';
	             }},
			{displayName: "TestCase Id", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
			
		],
		columnDefssms : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "smsId", field: "smsId",pinnedLeft:true},
			{headerName: "jobId", field: "jobId"},
		   {headerName: "deviceId", field: "deviceId"},
			{headerName: "callingPartyNumber", field: "callingPartyNumber"},
			{headerName: "calledPartyNumber", field: "calledPartyNumber"},
			{headerName: "callingPartySMSC", field: "callingPartySMSC"},
			{headerName: "timeZone", field: "timeZone", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.timeZone + '';
	             }},
			{headerName: "smsTime", field: "smsTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.smsTime + '';
	             }},
			{headerName: "utcTime", field: "utcTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.utcTime + '';
	             }},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.deviceLocalTime + '';
	             }},
			{headerName: "textMsg", field: "textMsg"},
			{headerName: "sendStatus", field: "sendStatus"},
			{headerName: "sessionId", field: "sessionId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionId + '';
	             }},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
			
		],
		columnDefstcpperformance : [
			// this row just shows the row index, doesn't use any data from the row
		
			{headerName: "autoId", field: "autoId",pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId"},
		   {headerName: "jobId", field: "jobId"},
			{headerName: "timeStamp", field: "timeStamp", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.timeStamp + '';
	             }},
			{headerName: "deviceTime", field: "deviceTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.deviceTime + '';
	             }},
			{headerName: "deviceTimeZone", field: "deviceTimeZone"},
			{headerName: "nodeType", field: "nodeType"},
			{headerName: "serverIp", field: "serverIp", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.serverIp + '';
	             }},
			{headerName: "serverPort", field: "serverPort"},
			{headerName: "clientIp", field: "clientIp", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.clientIp + '';
	             }},
			{headerName: "clientPort", field: "clientPort"},
			{headerName: "timeDuration", field: "timeDuration"},
			{headerName: "dataTransfered", field: "dataTransfered"},
			{headerName: "bandWidth", field: "bandWidth"},
			{headerName: "tcpWindowSize", field: "tcpWindowSize"},
			{headerName: "networkType", field: "networkType"},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
			
		],
		columnDefsudpperformance : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "autoId", field: "autoId",pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId"},
		   {headerName: "jobId", field: "jobId"},
			{headerName: "timeStamp", field: "timeStamp", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.timeStamp + '';
	             }},
			{headerName: "deviceTime", field: "deviceTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.deviceTime + '';
	             }},
			{headerName: "deviceTimeZone", field: "deviceTimeZone"},
			{headerName: "nodeType", field: "nodeType"},
			{headerName: "serverIP", field: "serverIP", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.serverIP + '';
	             }},
			{headerName: "serverPort", field: "serverPort"},
			{headerName: "clientIP", field: "clientIP", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.clientIP + '';
	             }},
			{headerName: "clientPort", field: "clientPort"},
			{headerName: "timeDuration", field: "timeDuration"},
			{headerName: "dataTransfered", field: "dataTransfered"},
			{headerName: "bandWidth", field: "bandWidth"},
			{headerName: "dataGramSize", field: "dataGramSize"},
			{headerName: "udpBufferSize", field: "udpBufferSize"},
			{headerName: "jitter", field: "jitter"},
			{headerName: "dataGramLost", field: "dataGramLost"},
			{headerName: "dataGramTotal", field: "dataGramTotal"},
			{headerName: "networkType", field: "networkType"},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
			
		],
		columnDefsvoice : [
			// this row just shows the row index, doesn't use any data from the row
		
			{headerName: "voiceCallSeqNumber", field: "voiceCallSeqNumber"},
			{headerName: "deviceId", field: "deviceId" ,pinnedLeft:true},
		   {headerName: "jobId", field: "jobId"},
			{headerName: "callingPartyNumber", field: "callingPartyNumber"},
			{headerName: "calledPartyNumber", field: "calledPartyNumber"},
			{headerName: "voiceCallTime", field: "voiceCallTime"},
			{headerName: "voiceCallDeviceLocalTime", field: "voiceCallDeviceLocalTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.voiceCallDeviceLocalTime + '';
	             }},
			{headerName: "voiceCallUTCTime", field: "voiceCallUTCTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.voiceCallUTCTime + '';
	             }},
			{headerName: "voiceCallTimeZone", field: "voiceCallTimeZone"},
			{headerName: "eventType", field: "eventType"},
			{headerName: "sessionId", field: "sessionId"},
			{headerName: "voiceCallFile", field: "voiceCallFile"},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
		],
		columnDefswifiinfo : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "autoId", field: "autoId" ,pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId"},
		   {headerName: "jobId", field: "jobId"},
			{headerName: "timeStamp", field: "timeStamp", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.timeStamp + '';
	             }},
			{headerName: "wifiApn", field: "wifiApn", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.wifiApn + '';
	             }},
			{headerName: "wifiSsId", field: "wifiSsId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.wifiSsId + '';
	             }},
			{headerName: "wifiIpAddress", field: "wifiIpAddress", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.wifiIpAddress + '';
	             }},
			{headerName: "wifiMacAddress", field: "wifiMacAddress", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.wifiMacAddress + '';
	             }},
			{headerName: "wifiBssId", field: "wifiBssId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.wifiBssId + '';
	             }},
			{headerName: "wifiSignalLevel", field: "wifiSignalLevel"},
			{headerName: "wifiFrequency", field: "wifiFrequency"},
			{headerName: "wifiSecurity", field: "wifiSecurity", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.wifiSecurity + '';
	             }},
			{headerName: "wifiStatus", field: "wifiStatus"},
			{headerName: "apTime", field: "apTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.apTime + '';
	             }},
			{headerName: "apDeviceLocationTime", field: "apDeviceLocationTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.apDeviceLocationTime + '';
	             }},
			{headerName: "apUtcTime", field: "apUtcTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.apUtcTime + '';
	             }},
			{headerName: "apTimeZone", field: "apTimeZone", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.apTimeZone + '';
	             }},
			{headerName: "wifiLinkSpeed", field: "wifiLinkSpeed"},
			{headerName: "wifiApDistance", field: "wifiApDistance"},
			{headerName: "wifiSnr", field: "wifiSnr"},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
		],
		columnDefswifitrafficinfo : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "wifiCollectId", field: "wifiCollectId" ,pinnedLeft:true},
			{headerName: "jobId", field: "jobId"},
		   {headerName: "deviceId", field: "deviceId"},
			{headerName: "initialConnectedState", field: "initialConnectedState"},
			{headerName: "finalConnectedState", field: "finalConnectedState"},
			{headerName: "timeTakenToConnect", field: "timeTakenToConnect"},
			{headerName: "timeTakenToDisconnect", field: "timeTakenToDisconnect"},
			{headerName: "wifiInfoTime", field: "wifiInfoTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.wifiInfoTime + '';
	             }},
			{headerName: "timeZone", field: "timeZone", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.timeZone + '';
	             }},
			{headerName: "utcTime", field: "utcTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.utcTime + '';
	             }},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.deviceLocalTime + '';
	             }},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
			
		],
		columnDefsattach : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "deviceId", field: "deviceId" ,pinnedLeft:true},
			{headerName: "jobId", field: "jobId"},
		   {headerName: "sessionSeqNumber", field: "sessionSeqNumber"},
			{headerName: "sessionTime", field: "sessionTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionTime + '';
	             }},
			{headerName: "sessionDeviceLocalTime", field: "sessionDeviceLocalTime"},
			{headerName: "sessionUTCTime", field: "sessionUTCTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionUTCTime + '';
	             }},
			{headerName: "sessionTimeZone", field: "sessionTimeZone"},
			{headerName: "sessionType", field: "sessionType", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionType + '';
	             }},
			{headerName: "connectTechnology", field: "connectTechnology"},
			{headerName: "sessionStatus", field: "sessionStatus"},
			{headerName: "serviceStateStatus", field: "serviceStateStatus"},
			{headerName: "sessionSpeed", field: "sessionSpeed"},
			{headerName: "sessionVolumn", field: "sessionVolumn"},
			{headerName: "sessionLatency", field: "sessionLatency"},
			{headerName: "sessionCauseCode", field: "sessionCauseCode"},
			{headerName: "sessionId", field: "sessionId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionId + '';
	             }},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
			
		],
		columnDefslatency : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "deviceId", field: "deviceId", width: 150 ,pinnedLeft:true},
			{headerName: "jobId", field: "jobId", width: 90},
		   {headerName: "pingSeqNumber", field: "pingSeqNumber", width: 90},
			{headerName: "pingStartTime", field: "pingStartTime", width: 110, cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.pingStartTime + '';
	             }},
			{headerName: "pingDeviceLocalTime", field: "pingDeviceLocalTime", width: 150, cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.pingDeviceLocalTime + '';
	             }},
			{headerName: "pingUTCTime", field: "pingUTCTime", width: 100, cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.pingUTCTime + '';
	             }},
			{headerName: "pingTimeZone", field: "pingTimeZone", width: 100, cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.pingTimeZone + '';
	             }},
			{headerName: "mobileNetworkType", field: "mobileNetworkType", width: 150},
			{headerName: "ipAddress", field: "ipAddress", width: 100},
			{headerName: "noPktsTxed", field: "noPktsTxed", width: 100},
			{headerName: "noPktsRxed", field: "noPktsRxed", width: 100},
			{headerName: "totalTime", field: "totalTime", width: 100},
			{headerName: "rttMin", field: "rttMin", width: 100},
			{headerName: "rttAvg", field: "rttAvg", width: 100},
			{headerName: "rttMax", field: "rttMax", width: 100},
			{headerName: "rttMdev", field: "rttMdev", width: 100},
			{headerName: "rttUnit", field: "rttUnit", width: 100},
			{headerName: "wholeStr", field: "wholeStr", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100, cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionId + '';
	             }},
			{headerName: "testcaseId", field: "testcaseId", width: 100, cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
			
		],
		columnDefsupload : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "jobId", field: "jobId" ,pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId"},
		   {headerName: "uploadSeqNo", field: "uploadSeqNo"},
			{headerName: "uploadTime", field: "uploadTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.uploadTime + '';
	             }},
			{headerName: "uploadTimeZone", field: "uploadTimeZone"},
			{headerName: "uploadDeviceLocalTime", field: "uploadDeviceLocalTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.uploadDeviceLocalTime + '';
	             }},
			{headerName: "uploadUTCTime", field: "uploadUTCTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.uploadUTCTime + '';
	             }},
			{headerName: "uploadType", field: "uploadType"},
			{headerName: "mobileNetworkType", field: "mobileNetworkType"},
			{headerName: "uploadProcess", field: "uploadProcess"},
			{headerName: "uploadFileUrl", field: "uploadFileUrl", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.uploadFileUrl + '';
	             }},
			{headerName: "uploadedFileSize", field: "uploadedFileSize"},
			{headerName: "uploadedTotalFileSize", field: "uploadedTotalFileSize"},
			{headerName: "sessionId", field: "sessionId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionId + '';
	             }},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
		],
		columnDefsemail : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "emailId", field: "emailId" ,pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId"},
		   {headerName: "jobId", field: "jobId"},
			{headerName: "sendingFrom", field: "sendingFrom", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sendingFrom + '';
	             }},
			{headerName: "sendingTo", field: "sendingTo", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sendingTo + '';
	             }},
			{headerName: "emailTime", field: "emailTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.emailTime + '';
	             }},
			{headerName: "utcTime", field: "utcTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.utcTime + '';
	             }},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.deviceLocalTime + '';
	             }},
			{headerName: "timeZone", field: "timeZone"},
			{headerName: "emailSubject", field: "emailSubject", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.emailSubject + '';
	             }},
			{headerName: "emailMsg", field: "emailMsg", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.emailMsg + '';
	             }},
			{headerName: "emailHasAttachment", field: "emailHasAttachment", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.emailHasAttachment + '';
	             }},
			{headerName: "attachmentSize", field: "attachmentSize", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.attachmentSize + '';
	             }},
			{headerName: "sendStatus", field: "sendStatus", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sendStatus + '';
	             }},
			{headerName: "sessionId", field: "sessionId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionId + '';
	             }},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
		],
		columnDefsdatausage : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "deviceId", field: "deviceId" ,pinnedLeft:true},
			{headerName: "jobId", field: "jobId"},
		   {headerName: "timeStamp", field: "timeStamp", cellTooltip: 
               function( row, col ) {
               return '' + row.entity.timeStamp + '';
             }},
			{headerName: "intfName", field: "intfName"},
			{headerName: "intfOutband", field: "intfOutband"},
			{headerName: "intfInband", field: "intfInband"},
			{headerName: "sessionId", field: "sessionId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionId + '';
	             }},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }},
			{headerName: "ipAddress", field: "ipAddress", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.ipAddress + '';
	             }},
			{headerName: "bytes", field: "bytes"},
			{headerName: "sentOrReceive", field: "sentOrReceive", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sentOrReceive + '';
	             }}
			
		],
		columnDefsvideo : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "jobId", field: "jobId" ,pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId"},
		   {headerName: "mplayerSeqNo", field: "mplayerSeqNo"},
			{headerName: "mplayerTime", field: "mplayerTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mplayerTime + '';
	             }},
			{headerName: "mplayerTimeZone", field: "mplayerTimeZone", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mplayerTimeZone + '';
	             }},
			{headerName: "mplayerDeviceLocalTime", field: "mplayerDeviceLocalTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mplayerDeviceLocalTime + '';
	             }},
			{headerName: "mplayerUTCTime", field: "mplayerUTCTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mplayerUTCTime + '';
	             }},
			{headerName: "mplayerType", field: "mplayerType"},
			{headerName: "mobileNetWorkType", field: "mobileNetWorkType"},
			{headerName: "mplayerProgress", field: "mplayerProgress"},
			{headerName: "mplayerFileUrl", field: "mplayerFileUrl", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mplayerFileUrl + '';
	             }},
			{headerName: "mplayerBufferProgress", field: "mplayerBufferProgress"},
			{headerName: "mplayerTotalFileDuration", field: "mplayerTotalFileDuration", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mplayerTotalFileDuration + '';
	             }},
			{headerName: "mplayerCodeInfo", field: "mplayerCodeInfo"},
			{headerName: "mplayerSessionId", field: "mplayerSessionId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.mplayerSessionId + '';
	             }},
			{headerName: "testCaseId", field: "testCaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
			
		],
		columnDefsclickscreenimage : [
			// this row just shows the row index, doesn't use any data from the row
			
			
			
		],
		columnDefsaudio : [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "deviceId", field: "deviceId" ,pinnedLeft:true},
			{headerName: "jobId", field: "jobId"},
		   {headerName: "time", field: "time", cellTooltip: 
               function( row, col ) {
               return '' + row.entity.time + '';
             }},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.deviceLocalTime + '';
	             }},
			{headerName: "utcTime", field: "utcTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.utcTime + '';
	             }},
			{headerName: "timeZone", field: "timeZone", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.timeZone + '';
	             }},
			{headerName: "localAudioFilePath", field: "localAudioFilePath", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.localAudioFilePath + '';
	             }},
			{headerName: "startTime", field: "startTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.startTime + '';
	             }},
			{headerName: "endTime", field: "endTime"},
			{headerName: "ifPlayer", field: "ifPlayer", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.ifPlayer + '';
	             }},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }},
			{headerName: "ftpServer", field: "ftpServer"},
			{headerName: "ftpServerWaveFilePath", field: "ftpServerWaveFilePath", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.ftpServerWaveFilePath + '';
	             }},
			{headerName: "audioAnalyzed", field: "audioAnalyzed"}
			
			
		],
		columnDefsdownload: [
			// this row just shows the row index, doesn't use any data from the row
			
			{headerName: "jobId", field: "jobId" ,pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId"},
		   {headerName: "downloadSeqNo", field: "downloadSeqNo"},
			{headerName: "downloadTime", field: "downloadTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.downloadTime + '';
	             }},
			{headerName: "downloadTimeZone", field: "downloadTimeZone", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.downloadTimeZone + '';
	             }},
			{headerName: "downloadDeviceLocalTime", field: "downloadDeviceLocalTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.downloadDeviceLocalTime + '';
	             }},
			{headerName: "downloadUTCTime", field: "downloadUTCTime", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.downloadUTCTime + '';
	             }},
			{headerName: "downloadType", field: "downloadType"},
			{headerName: "mobileNetworkType", field: "mobileNetworkType"},
			{headerName: "downloadProgress", field: "downloadProgress"},
			{headerName: "downloadFileUrl", field: "downloadFileUrl", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.downloadFileUrl + '';
	             }},
			{headerName: "downloadedFileSize", field: "downloadedFileSize"},
			{headerName: "downloadTotalFileSize", field: "downloadTotalFileSize"},
			{headerName: "sessionId", field: "sessionId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.sessionId + '';
	             }},
			{headerName: "testcaseId", field: "testcaseId", cellTooltip: 
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
			
			
		],
		columnDefsradio: [
		         			// this row just shows the row index, doesn't use any data from the row
		         			
		         			{displayName: "Job Id", field: "jobId" ,pinnedLeft:true},
		         			{displayName: "Device Id", field: "deviceId"},
		         		   {displayName: "Cell Id", field: "cellId"},
		         			{displayName: "Lac Id", field: "lacId"},
		         			{displayName: "Signal2Noise", field: "evdoSnr"},
		         			{displayName: "MCC", field: "mcc"},
		         			{displayName: "MNC", field: "mnc"},
		         			{displayName: "RAN Type", field: "networkType"},
		         			{displayName: "Local Time", field: "deviceLocalTime", cellTooltip: 
			     	               function( row, col ) {
			     	               return '' + row.entity.deviceLocalTime + '';
			     	             }},
		         			{displayName: "Time From Epoch In Millis", field: "time", cellTooltip: 
			     	               function( row, col ) {
			     	               return '' + row.entity.time + '';
			     	             }},
		         			{displayName: "Time Zone", field: "timeZone", cellTooltip: 
			     	               function( row, col ) {
			     	               return '' + row.entity.timeZone + '';
			     	             }},
		         			{displayName: "Signal Strength Rssi (dBm)", field: "signalStrenghRssi", cellTooltip: 
			     	               function( row, col ) {
			     	               return '' + row.entity.signalStrenghRssi + '';
			     	             }},
		         			{displayName: "Quality Ber", field: "gsmRxQualityBer", cellTooltip: 
			     	               function( row, col ) {
			     	               return '' + row.entity.gsmRxQualityBer + '';
			     	             }},
		         			{displayName: "Cdma Evdo", field: "cdmaEcIo", cellTooltip: 
			     	               function( row, col ) {
			     	               return '' + row.entity.cdmaEcIo + '';
			     	             }},
		         			{displayName: "LTE PCI", field: "ltePci", cellTooltip: 
			     	               function( row, col ) {
			     	               return '' + row.entity.ltePci + '';
			     	             }},
		         			{displayName: "LTE RSRQ", field: "lteRsrq", cellTooltip: 
			     	               function( row, col ) {
			     	               return '' + row.entity.lteRsrq + '';
			     	             }},
		         			{displayName: "LTE RSSNR", field: "lteRssnr", cellTooltip: 
		     	               function( row, col ) {
		     	               return '' + row.entity.lteRssnr + '';
		     	             }},
		         			{displayName: "TestCaseId", field: "testcaseId", cellTooltip: 
		     	               function( row, col ) {
		     	               return '' + row.entity.testcaseId + '';
		     	             }}
		         		],
		columnDefsclickscreenxy : [
			// this row just shows the row index, doesn't use any data from the row
			
			
			
		],
		serverSettingsGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableRowSelection: true,  // for selection
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowHeaderSelection: true, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'propertyKey' ,width:250},
			{ name: 'propertyValue',width:250 },
			{ name: 'isEncrypted' ,width:80},
			{ name: 'createdDate' ,width:160},
			{ name: 'lastModified',width:160 },
			{ name: 'modLog' ,width:250}
			
		]
	},
	
	userTableGridOptions : {
	/*	paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 1,
		enableRowSelection: true,  // for selection
		enableColumnMenus: false, //to hide ascending and descending column menu names
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:false,*/
		 paginationPageSizes: [20, 40, 60],
			paginationPageSize: 20,
			enableSorting: true,
		    enableFilter: true,
		    enableColResize: true,
			enableRowSelection: true,  // for selection
			enableColumnMenus: true, //to hide ascending and descending column menu names
			enableRowHeaderSelection: false, // this is for check box to appear on grid options
			enableFiltering: true,
			enableGridMenu: true,		// for searching
			multiSelect:true,
			enableScrollbars : false,
			enableHorizontalScrollbar : 0,
			enableVerticalScrollbar : 0,
		columnDefs: [
			{ name: 'username' ,width:"14%"},
			{ name: 'status',width:"14%" },
			{ name: 'firstName' ,width:"14%"},
			{ name: 'lastName' ,width:"14%"},			
			{ name: 'email' ,width:"15%"},
			{ name: 'roleName' ,width:"14%"},
			{ name: 'companyName' ,width:"14.8%"},
			
		/*	{ name: 'username' ,width:"20%"},
			{ name: 'status',width:"10%" },
			{ name: 'firstName' ,width:"10%"},
			{ name: 'lastName' ,width:"10%"},			
			{ name: 'email' ,width:"20%"},
			{ name: 'roleName' ,width:"15%"},
			{ name: 'companyName' ,width:"15%"},*/
			
		]
	},
	userGroupsGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:false,
		enableScrollbars : false,
		enableHorizontalScrollbar : 0,
		enableVerticalScrollbar : 0,
		columnDefs: [
			{ name: 'userGroupId' ,width:'25%'},
			{ name: 'userGroupName',width:'25%' },
			{ name: 'createdBy',field:"createdByName",width:'24%' },
			{ name: 'createdDate',width:'24%' ,cellFilter: "date:'"+oApp.constant.GRID_DATE_TIME_FORMAT+"'" }
			
		]
	},
		availableReportsGridOptions: {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'screenName' ,width:450},
			{ name: 'menuUrl',width:450 }
			
		]
	},
addUsergroupsGridOptions :{
		/*paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending column menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:false,*/
	 paginationPageSizes: [20, 40, 60],
		paginationPageSize: 20,
		enableSorting: true,
	    enableFilter: true,
	    enableColResize: true,
		enableRowSelection: true,  // for selection
		enableColumnMenus: true, //to hide ascending and descending column menu names
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,
		enableGridMenu: true,		// for searching
		multiSelect:false,
		enableScrollbars : false,
		enableHorizontalScrollbar : 0,
		enableVerticalScrollbar : 0,
		columnDefs: [
			{ name: 'userGroupId' ,width:"25%"},
			{ name: 'userGroupName',width:"25%" },
			{ name: 'createdBy',field:"createdByName", width:"24%" },
			{ name: 'createdDate',width:"24%",cellFilter: "date:'"+oApp.constant.GRID_DATE_TIME_FORMAT+"'"  }		
		]	
	},

testplanAdminGridOptions :{
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending column menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'testplanId' ,width:450},
			{ name: 'testplanName',width:450 },
			{ name: 'createdBy',width:450 }
		]
	},
testplanUserSelectedGridOptions :{
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending column menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'userId' ,width:180},
			{ name: 'username',width:180 },
			{ name: 'firstName',width:180 }
		]
	},
	testplanUserAvailableGridOptions :{
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending column menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'userId' ,width:180},
			{ name: 'username',width:180 },
			{ name: 'firstName',width:180 }
		]
	},
quickrunGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending column menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:true,
		columnDefs: [
			{ name: 'deviceId' ,width:250},
			{ name: 'deviceName',width:250 },
			{ name: 'msisdn' ,width:250},
			{ name: 'imei' ,width:230},
		]
	},
	
	quickrunbindingGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending column menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'taskName' ,width:"80%"},
			{ name: 'taskId',width:"20%" },
			
			
		]
	},
	quickrunTaskDependantOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending column menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:true,
		columnDefs: [
			
			{ name: 'commandName',width:"100%" }
			
		]
	},
		allusersgroupGridOptions : {
//		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 6,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,  // for searching
		multiSelect:false,
//		 paginationPageSizes: [20, 40, 60],
//			paginationPageSize: 20,
			enableSorting: true,
		    enableFilter: true,
//		    enableColResize: true,
//			enableRowSelection: true,  // for selection
//			enableColumnMenus: true, //to hide ascending and descending column menu names
//			enableRowHeaderSelection: false, // this is for check box to appear on grid options
			enableFiltering: true,
//			enableGridMenu: true,		// for searching
			multiSelect:false,
			enableVerticalScrollbar :2,
		columnDefs: [
			{ name: 'username' ,width:"33%"},
			{ name: 'firstName',width:"31%"},
			{ name: 'lastName' ,width:"32%"},
		]
	},
		existingusersGridOptions : {
//		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 6,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,  // for searching
		multiSelect:false,
		enableSorting: true,
	    enableFilter: true,
		enableFiltering: true,
	    enableVerticalScrollbar :2,
		columnDefs: [
			//{ name: 'userGroupName' ,width:100},
			{ name: 'username',width:"33%" },
			{ name: 'firstName',width:"31%" },
			{ name: 'lastName' ,width:"32%"}
			
			
		]
	},
	allDeviceGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'deviceId' ,width:100},
			{ name: 'userName',width:100 },
			{ name: 'msisdn' ,width:100},
			{ name: 'imei' ,width:100}
		]
	},
	selectedDeviceGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'deviceId' ,width:100},
			{ name: 'userName',width:100 },
			{ name: 'msisdn' ,width:100},
			{ name: 'imei' ,width:100}
		]
	},
	deviceAdminGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'deviceName' ,width:150},
			{ name: 'network' ,width:150},
			{ name: 'region',width:150 },
			{ name: 'deviceId' ,width:150},
			{ name: 'deviceType' ,width:150},
			{ name: 'networkType' ,width:150},
			{ name: 'statusFlag' ,width:150},
		]
	},
	virtualDeviceGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,  // for searching
		multiSelect:true,
		enableVerticalScrollbar :0,
		enableHorizontalScrollbar:0,
		columnDefs: [
			{ name: 'id' },
			{ name: 'name'},
			
		]
	},
	usersNotHavingReportGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'username' ,width:100},
			{ name: 'firstName',width:100 },
			{ name: 'lastName' ,width:100},
		]
	},
	existingreportGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'userId' ,width:150},
			{ name: 'username' ,width:150},
			
			{ name: 'firstName' ,width:150}
			
		]
		
	},
	
	// added by punit
	myDevicesGridOptions : {
		paginationPageSizes: [20, 40, 60],
		paginationPageSize: 20,
		enableSorting: true,
	    enableFilter: true,
	    enableColResize: true,
		enableRowSelection: true,  // for selection
		enableColumnMenus: true, //to hide ascending and descending colomn menu names
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,
		enableGridMenu: true,		// for searching
		multiSelect:false,
		enableVerticalScrollbar :0,
		columnDefs: [
			{ name: 'deviceId' ,width:150,pinnedLeft:true},
			{ name: 'deviceName',width:150 },
			{ name: 'deviceType' ,width:150},
			{ headerName: 'Carrier' ,width:150,field:'carrier'},
			{ name: 'model' ,width:"20%"},
			{ name: 'manufacturer' ,width:"10%"},
			{displayName:'IMSI', name: 'imsi' ,width:150},
			{displayName:'IMEI', name: 'imei' ,width:150},
			{displayName:'MSISDN', name: 'msisdn' ,width:"15%"},
			{ name: 'networkType' ,width:"15%"},
			{ name: 'region' ,width:"15%"},
			{ name: 'statusFlag' ,width:"15%"},
			{displayName: 'Last Ping', name: 'lastPingDateTime' ,width:150,cellFilter: "date:'"+oApp.constant.GRID_DATE_TIME_FORMAT+"'" },
			{ name: 'jobId' ,width:150},
			{ name: 'jobName' ,width:150},
			{ displayName:'Job Status Time', name: 'jobStatusDateTime' ,width:"10%",cellFilter: "date:'"+oApp.constant.GRID_DATE_TIME_FORMAT+"'"  },
			{  displayName: 'Job Start Date Time' ,name: 'jobStartDate' ,width:"10%",cellFilter: "date:'"+oApp.constant.GRID_DATE_TIME_FORMAT+"'" },
			{displayName: 'Job End Date Time' , name: 'jobEndDate' ,width:"10%",cellFilter: "date:'"+oApp.constant.GRID_DATE_TIME_FORMAT+"'" },
			
			
		]
	},

	menuData : null
}
	