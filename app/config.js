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
			fillColor: "rgba(92, 107, 192,0.5)",
            strokeColor: "rgba(92, 107, 192,1)",
            pointColor: "rgba(135, 182, 161,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
		},
		{
			label: "",
			fillColor: "rgba(97,184,100,0.5)",
            strokeColor: "rgba(97,184,100,1)",
            pointColor: "rgba(97,184,100,1)",
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
	    enableFilter: false,
	    enableColResize: true,
		enableRowSelection: false,  // for selection
		enableColumnMenus: true, //to hide ascending and descending colomn menu names
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,
		enableGridMenu: true,		// for searching
		multiSelect:false,
		enableScrollbars : true,
		enableVerticalScrollbar :0,
		enableHorizontalScrollbar : 2,
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
			{displayName: "APN Id", field: "apnId", width: 110},
			{displayName: "Name", field: "apnName", width: 110},
			{displayName: "Numeric", field: "apnNumeric", width: 100},
			{displayName: "Mcc", field: "apnMcc", width: 100},
			{displayName: "Mnc", field: "apnMnc", width: 100},
			{headerName: "apnApn", field: "apnApn", width: 100},
			{displayName: "User", field: "apnUser", width: 100},
			{displayName: "Server", field: "apnServer", width: 100},
			{displayName: "Password", field: "apnPassword", width: 100},
			{displayName: "Proxy", field: "apnProxy", width: 100},
			{displayName: "Port", field: "apnPort", width: 100},
			{displayName: "MMS Proxy", field: "apnMmsProxy", width: 100},
			{displayName: "MMS Port", field: "apnMmsPort", width: 100},
			{displayName: "MMSC", field: "apnMmsc", width: 100},
			{displayName: "Auth Type", field: "apnAuthType", width: 100},
			{displayName: "Type", field: "apnType", width: 100},
			{displayName: "Current", field: "apnCurrent", width: 100},
			{displayName: "Current1", field: "apnCurrent1", width: 100},
			{displayName: "SIM Id", field: "apnSimId", width: 100},
			{displayName: "Protocol", field: "apnProtocol", width: 100},
			{displayName: "Profile Type", field: "apnProfileType", width: 100},
			{displayName: "Roaming Protocol", field: "apnRoamingProtocol", width: 150},
			{displayName: "Carrier Enabled", field: "apnCarrierEnabled", width: 150},
			{displayName: "Bearer", field: "apnBearer", width: 100},
			{displayName: "IF Preferred Apn", field: "apnIfPreferredApn", width: 150},
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

			{displayName: "Name", field: "appName", width: 110, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.appName + '';
	             }},
			{displayName: "RSS", field: "appRss", width: 100},
			{displayName: "Battery Level", field: "appBatteryLevel", width: 150},
			{displayName: "CPU Usage", field: "appCpuUsage", width: 100},
			{displayName: "DL Volumn", field: "appDlVolumn", width: 100},
			{displayName: "DL Speed", field: "appDlSpeed", width: 100},
			{displayName: "UL Volumn", field: "appUlVolumn", width: 100},
			{displayName: "UL Speed", field: "appUlSpeed", width: 100},
			{displayName: "Run Status", field: "appRunStatus", width: 100},
			{displayName: "App PSS", field: "appPss", width: 100},
			{displayName: "App USS", field: "appUss", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100, cellTooltip:
                function( row, col ) {
                return '' + row.entity.sessionId + '';
              }},
			{headerName: "testcaseId", field: "testcaseId", width: 100, cellTooltip:
                function( row, col ) {
                return '' + row.entity.testcaseId + '';
              }},
			{displayName: "Usage Time", field: "appUsageTime", width: 100},
			{displayName: "UTC Time", field: "utcTime", width: 100, cellTooltip:
                function( row, col ) {
                return '' + row.entity.utcTime + '';
              }},
			{headerName: "deviceTimeZone", field: "deviceTimeZone", width: 150},
			{displayName: "App State", field: "appState", width: 100},
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
			{displayName: "IP Public V4", field: "ipPublicV4", cellTooltip:
                function( row, col ) {
                return '' + row.entity.ipPublicV4 + '';
              }},
			{headerName: "dupId", field: "dupId"},
			{displayName: "IP Private V4", field: "ipPrivateV4", cellTooltip:
                function( row, col ) {
                return '' + row.entity.ipPrivateV4 + '';
              }},
			{displayName: "IP Public V6", field: "ipPublicV6", cellTooltip:
                function( row, col ) {
                return '' + row.entity.ipPublicV6 + '';
              }},
			{headerName: "IP Private V6", field: "ipPrivateV6", cellTooltip:
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
			{displayName: "Job StartTime(MS)", field: "jobStartTimeMs", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.jobStartTimeMs + '';
	             }},
			{displayName: "PCI", field: "pci"},
			{headerName: "cellId", field: "cellId", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.cellId + '';
	             }},
			{headerName: "cellName", field: "cellName", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.cellName + '';
	             }},
			{displayName: "Channel Bandwidth", field: "channelBandWidth", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.channelBandWidth + '';
	             }},
			{displayName: "File URL", field: "fileUrl", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.fileUrl + '';
	             }}
		],
		columnDefslocation : [
			// this row just shows the row index, doesn't use any data from the row

			{headerName: "deviceId", field: "deviceId" ,width:100,pinnedLeft:true},
			{headerName: "jobId", field: "jobId",width:100},
		   {headerName: "timeStamp", field: "timeStamp", width:250, cellTooltip:
               function( row, col ) {
               return '' + row.entity.timeStamp + '';
             }},
			{headerName: "locationProvider", field: "locationProvider" ,width:200, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.locationProvider + '';
	             }},
			{displayName: "Altitude", field: "collectAltitude" ,width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.collectAltitude + '';
	             }},
			{headerName: "sessionId", field: "sessionId" ,width:150, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.sessionId + '';
	             }},
			{displayName: "Longitude", field: "xParam",width:200},
			{displayName: "Latitude", field: "yParam" ,width:200},
			{headerName: "testcaseId", field: "testcaseId",width:300, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }},
			{headerName: "lastLocationTime", field: "lastLocationTime" ,width:250, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.lastLocationTime + '';
	             }}
		],
		columnDefsmms : [
			// this row just shows the row index, doesn't use any data from the row

			{displayName: "MMS Id", field: "mmsId",pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId" ,width:100},
		   {headerName: "jobId", field: "jobId",width:100},
			{headerName: "callingPartyNumber", field: "callingPartyNumber",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.callingPartyNumber + '';
	             }},
			{headerName: "calledPartyNumber",width:100, field: "calledPartyNumber", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.calledPartyNumber + '';
	             }},
			{headerName: "timeZone",width:100, field: "timeZone", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.timeZone + '';
	             }},
			{displayName: "MMS Time",width:100, field: "mmsTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.mmsTime + '';
	             }},
			{displayName: "UTC Time",width:100, field: "utcTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.utcTime + '';
	             }},
			{headerName: "deviceLocalTime",width:100, field: "deviceLocalTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.deviceLocalTime + '';
	             }},
			{displayName: "MMS Text",width:150, field: "mmsText", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.mmsText + '';
	             }},
			{displayName: "MMS File Size",width:50, field: "mmsFileSize"},
			{displayName: "MMS File Name",width:100, field: "mmsFileName", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.mmsFileName + '';
	             }},
			{headerName: "sendStatus",width:100, field: "sendStatus"},
			{headerName: "sessionId",width:100, field: "sessionId", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.sessionId + '';
	             }},
			{headerName: "testcaseId",width:150, field: "testcaseId", cellTooltip:
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
			{displayName: "UTC Time", field: "utcTime", cellTooltip:
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

			{headerName: "autoId", field: "autoId",width:100,pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId",width:100},
		   {headerName: "jobId", field: "jobId",width:100},
			{headerName: "timeStamp",width:150, field: "timeStamp", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.timeStamp + '';
	             }},
			{headerName: "deviceTime",width:150, field: "deviceTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.deviceTime + '';
	             }},
			{headerName: "deviceTimeZone",width:100, field: "deviceTimeZone"},
			{headerName: "nodeType",width:100, field: "nodeType"},
			{displayName: "Server IP",width:150, field: "serverIp", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.serverIp + '';
	             }},
			{headerName: "serverPort",width:100, field: "serverPort"},
			{displayName: "Client IP",width:100, field: "clientIp", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.clientIp + '';
	             }},
			{headerName: "clientPort",width:100, field: "clientPort"},
			{headerName: "timeDuration",width:100, field: "timeDuration"},
			{headerName: "dataTransfered",width:100, field: "dataTransfered"},
			{displayName: "Bandwidth",width:100, field: "bandWidth"},
			{displayName: "TCP Window Size",width:100, field: "tcpWindowSize"},
			{headerName: "networkType",width:100, field: "networkType"},
			{headerName: "testcaseId",width:250, field: "testcaseId", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}

		],
		columnDefsudpperformance : [
			// this row just shows the row index, doesn't use any data from the row

			{headerName: "autoId",width:100, field: "autoId",pinnedLeft:true},
			{headerName: "deviceId",width:100, field: "deviceId"},
		   {headerName: "jobId",width:100, field: "jobId"},
			{headerName: "timeStamp",width:100, field: "timeStamp", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.timeStamp + '';
	             }},
			{headerName: "deviceTime",width:100, field: "deviceTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.deviceTime + '';
	             }},
			{headerName: "deviceTimeZone",width:100, field: "deviceTimeZone"},
			{headerName: "nodeType",width:100, field: "nodeType"},
			{displayName: "Server IP",width:150, field: "serverIP", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.serverIP + '';
	             }},
			{headerName: "serverPort",width:100, field: "serverPort"},
			{displayName: "Client IP",width:150, field: "clientIP", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.clientIP + '';
	             }},
			{headerName: "clientPort",width:100, field: "clientPort"},
			{headerName: "timeDuration",width:100, field: "timeDuration"},
			{headerName: "dataTransfered",width:100, field: "dataTransfered"},
			{displayName: "Bandwidth",width:100, field: "bandWidth"},
			{displayName: "Datagram Size",width:100, field: "dataGramSize"},
			{displayName: "UDP BufferSize",width:100, field: "udpBufferSize"},
			{headerName: "jitter",width:100, field: "jitter"},
			{displayName: "Datagram Lost",width:150, field: "dataGramLost"},
			{displayName: "Datagram Total",width:100, field: "dataGramTotal"},
			{headerName: "networkType",width:100, field: "networkType"},
			{headerName: "testcaseId",width:250, field: "testcaseId", cellTooltip:
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
			{displayName: "Voice Call UTC Time", field: "voiceCallUTCTime", cellTooltip:
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

			{headerName: "autoId", field: "autoId" ,width:100,pinnedLeft:true},
			{headerName: "deviceId", field: "deviceId",width:100},
		   {headerName: "jobId", field: "jobId",width:100},
			{headerName: "timeStamp", field: "timeStamp",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.timeStamp + '';
	             }},
			{headerName: "APN", field: "wifiApn",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.wifiApn + '';
	             }},
			{displayName: "SSID", field: "wifiSsId",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.wifiSsId + '';
	             }},
			{displayName: "IP Address", field: "wifiIpAddress",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.wifiIpAddress + '';
	             }},
			{displayName: "Mac Address", field: "wifiMacAddress",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.wifiMacAddress + '';
	             }},
			{displayName: "BSS Id", field: "wifiBssId",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.wifiBssId + '';
	             }},
			{displayName: "Signal Level", field: "wifiSignalLevel",width:100},
			{displayName: "Frequency", field: "wifiFrequency",width:100},
			{displayName: "Security", field: "wifiSecurity",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.wifiSecurity + '';
	             }},
			{headerName: "Status", field: "wifiStatus",width:100},
			{displayName: "AP Time", field: "apTime",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.apTime + '';
	             }},
			{displayName: "AP DeviceLocationTime", field: "apDeviceLocationTime",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.apDeviceLocationTime + '';
	             }},
			{displayName: "AP UTC Time", field: "apUtcTime",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.apUtcTime + '';
	             }},
			{displayName: "AP Time Zone", field: "apTimeZone",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.apTimeZone + '';
	             }},
			{displayName: "Link Speed", field: "wifiLinkSpeed",width:100},
			{displayName: "AP Distance", field: "wifiApDistance",width:100},
			{displayName: "SNR", field: "wifiSnr",width:100},
			{displayName: "Testcase Id", field: "testcaseId",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }}
		],
		columnDefswifitrafficinfo : [
			// this row just shows the row index, doesn't use any data from the row

			{displayName: "Collect Id", field: "wifiCollectId" ,width:100,pinnedLeft:true},
			{headerName: "jobId", field: "jobId",width:100},
		   {headerName: "deviceId", field: "deviceId"},
			{headerName: "initialConnectedState", field: "initialConnectedState",width:100},
			{headerName: "finalConnectedState", field: "finalConnectedState",width:100},
			{headerName: "timeTakenToConnect", field: "timeTakenToConnect",width:100},
			{headerName: "timeTakenToDisconnect", field: "timeTakenToDisconnect",width:100},
			{displayName: "Info Time", field: "wifiInfoTime",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.wifiInfoTime + '';
	             }},
			{headerName: "timeZone", field: "timeZone",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.timeZone + '';
	             }},
			{displayName: "UTC Time", field: "utcTime",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.utcTime + '';
	             }},
			{displayName: "Device Local Time", field: "deviceLocalTime",width:100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.deviceLocalTime + '';
	             }},
			{headerName: "testcaseId", field: "testcaseId",width:100, cellTooltip:
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
			{displayName: "Session UTC Time", field: "sessionUTCTime", cellTooltip:
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
			{displayName: "Ping UTC Time", field: "pingUTCTime", width: 100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.pingUTCTime + '';
	             }},
			{headerName: "pingTimeZone", field: "pingTimeZone", width: 100, cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.pingTimeZone + '';
	             }},
			{headerName: "mobileNetworkType", field: "mobileNetworkType", width: 150},
			{displayName: "IP Address", field: "ipAddress", width: 100},
			{headerName: "noPktsTxed", field: "noPktsTxed", width: 100},
			{headerName: "noPktsRxed", field: "noPktsRxed", width: 100},
			{headerName: "totalTime", field: "totalTime", width: 100},
			{displayName: "RTT Min", field: "rttMin", width: 100},
			{displayName: "RTT Avg", field: "rttAvg", width: 100},
			{displayName: "RTT Max", field: "rttMax", width: 100},
			{displayName: "RTT Mdev", field: "rttMdev", width: 100},
			{displayName: "RTT Unit", field: "rttUnit", width: 100},
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
			{displayName: "Upload UTC Time", field: "uploadUTCTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.uploadUTCTime + '';
	             }},
			{headerName: "uploadType", field: "uploadType"},
			{headerName: "mobileNetworkType", field: "mobileNetworkType"},
			{headerName: "uploadProcess", field: "uploadProcess"},
			{displayName: "Upload File URL", field: "uploadFileUrl", cellTooltip:
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
			{displayName: "UTC Time", field: "utcTime", cellTooltip:
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
			{displayName: "IP Address", field: "ipAddress", cellTooltip:
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
			{displayName: "Mplayer UTC Time", field: "mplayerUTCTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.mplayerUTCTime + '';
	             }},
			{headerName: "mplayerType", field: "mplayerType"},
			{headerName: "mobileNetWorkType", field: "mobileNetWorkType"},
			{headerName: "mplayerProgress", field: "mplayerProgress"},
			{displayName: "Mplayer File URL", field: "mplayerFileUrl", cellTooltip:
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
			{displayName: "Job Id", field: "jobId" ,pinnedLeft:true},
			{displayName: "Device Id", field: "deviceId"},
		   {displayName: "Test Case Id", field: "testcaseId"},

			{displayName: "Click Time", field: "clickDeviceLocalTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.clickDeviceLocalTime + '';
	             }},
			{displayName: "Click Time (MS)", field: "clickTimeMs", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.clickTimeMs + '';
	             }},
			{displayName: "Click UTC Time", field: "clickUTCTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.clickUTCTime + '';
	             }},
			{displayName: "Time Zone", field: "clickTimeZone", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.clickTimeZone + '';
	             }},
			{headerName: "clickType", field: "clickType"},
			{headerName: "fileName", field: "fileName"},
			{displayName: "Position X", field: "positionX"},
			{displayName: "Position Y", field: "positionY"}




		],
		columnDefsaudio : [
			// this row just shows the row index, doesn't use any data from the row

			{headerName: "deviceId", field: "deviceId" ,pinnedLeft:true,width:100},
			{headerName: "jobId", field: "jobId",width:100},
		   {headerName: "time", field: "time",width:150, cellTooltip:
               function( row, col ) {
               return '' + row.entity.time + '';
             }},
			{headerName: "deviceLocalTime",width:150, field: "deviceLocalTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.deviceLocalTime + '';
	             }},
			{displayName: "UTC Time",width:100, field: "utcTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.utcTime + '';
	             }},
			{headerName: "timeZone",width:100, field: "timeZone", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.timeZone + '';
	             }},
			{headerName: "localAudioFilePath",width:150, field: "localAudioFilePath", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.localAudioFilePath + '';
	             }},
			{headerName: "startTime",width:100, field: "startTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.startTime + '';
	             }},
			{headerName: "endTime",width:100, field: "endTime"},
			{headerName: "ifPlayer",width:100, field: "ifPlayer", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.ifPlayer + '';
	             }},
			{headerName: "testcaseId",width:100, field: "testcaseId", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.testcaseId + '';
	             }},
			{displayName: "FTP Server",width:100, field: "ftpServer"},
			{displayName: "FTP Server Wave File Path",width:100, field: "ftpServerWaveFilePath", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.ftpServerWaveFilePath + '';
	             }},
			{headerName: "audioAnalyzed",width:100, field: "audioAnalyzed"}


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
			{displayName: "Download UTC Time", field: "downloadUTCTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.downloadUTCTime + '';
	             }},
			{headerName: "downloadType", field: "downloadType"},
			{headerName: "mobileNetworkType", field: "mobileNetworkType"},
			{headerName: "downloadProgress", field: "downloadProgress"},
			{displayName: "Download File URL", field: "downloadFileUrl", cellTooltip:
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

		         			{displayName: "Job Id", field: "jobId" ,width:100,pinnedLeft:true},
		         			{displayName: "Device Id", field: "deviceId",width:100},
		         		   {displayName: "Cell Id", field: "cellId",width:100},
		         			{displayName: "Lac Id", field: "lacId",width:100},
		         			{displayName: "SNR", field: "evdoSnr",width:100},
		         			{displayName: "MCC", field: "mcc",width:100},
		         			{displayName: "MNC", field: "mnc",width:100},
		         			{displayName: "RAN Type", field: "networkType",width:100},
		         			{displayName: "Local Time", field: "deviceLocalTime",width:150, cellTooltip:
			     	               function( row, col ) {
			     	               return '' + row.entity.deviceLocalTime + '';
			     	             }},
		         			{displayName: "Epoch Time", field: "time",width:150, cellTooltip:
			     	               function( row, col ) {
			     	               return '' + row.entity.time + '';
			     	             }},
		         			{displayName: "Time Zone", field: "timeZone",width:100, cellTooltip:
			     	               function( row, col ) {
			     	               return '' + row.entity.timeZone + '';
			     	             }},
		         			{displayName: "Signal Strength RSSI (dBm)",width:100, field: "signalStrenghRssi", cellTooltip:
			     	               function( row, col ) {
			     	               return '' + row.entity.signalStrenghRssi + '';
			     	             }},
		         			{displayName: "Quality Ber", field: "gsmRxQualityBer",width:100, cellTooltip:
			     	               function( row, col ) {
			     	               return '' + row.entity.gsmRxQualityBer + '';
			     	             }},
		         			{displayName: "Cdma Evdo", field: "cdmaEcIo",width:100, cellTooltip:
			     	               function( row, col ) {
			     	               return '' + row.entity.cdmaEcIo + '';
			     	             }},
		         			{displayName: "LTE PCI", field: "ltePci",width:100, cellTooltip:
			     	               function( row, col ) {
			     	               return '' + row.entity.ltePci + '';
			     	             }},
		         			{displayName: "LTE RSRQ", field: "lteRsrq",width:100, cellTooltip:
			     	               function( row, col ) {
			     	               return '' + row.entity.lteRsrq + '';
			     	             }},
		         			{displayName: "LTE RSSNR", field: "lteRssnr",width:100, cellTooltip:
		     	               function( row, col ) {
		     	               return '' + row.entity.lteRssnr + '';
		     	             }},
		         			{displayName: "TestCase Id", field: "testcaseId",width:250, cellTooltip:
		     	               function( row, col ) {
		     	               return '' + row.entity.testcaseId + '';
		     	             }}
		         		],
		columnDefsclickscreenxy : [
			// this row just shows the row index, doesn't use any data from the row
			{displayName: "Job Id", field: "jobId" ,pinnedLeft:true},
			{displayName: "Device Id", field: "deviceId"},
		   {displayName: "Test Case Id", field: "testcaseId"},

			{displayName: "Click Time", field: "clickDeviceLocalTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.clickDeviceLocalTime + '';
	             }},
			{displayName: "Click Time (MS)", field: "clickTimeMs", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.clickTimeMs + '';
	             }},
			{displayName: "Click UTC Time", field: "clickUTCTime", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.clickUTCTime + '';
	             }},
			{displayName: "Time Zone", field: "clickTimeZone", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.clickTimeZone + '';
	             }},
			{headerName: "clickType", field: "clickType"},
			{headerName: "fileName", field: "fileName"},
			{displayName: "Position X", field: "positionX"},
			{displayName: "Position Y", field: "positionY"}




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
			enableColumnMenus: false, //to hide ascending and descending column menu names
			enableRowHeaderSelection: false, // this is for check box to appear on grid options
			enableFiltering: false,
			enableGridMenu: false,		// for searching
			multiSelect:false,
			enableScrollbars : false,
			enableHorizontalScrollbar : 0,
			enableVerticalScrollbar : 0,

		columnDefs: [
			{ name: 'username' ,width:"14%"},
			{ name: 'status',width:"14%" },
			{ displayName:'Name', field: 'firstName' ,width:"14%", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.firstName + '';
	             }},
			/*{ name: 'lastName' ,width:"14%"},	*/
			{ name: 'email' ,width:"15%", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.email + '';
	             }},
			{ name: 'roleName' ,width:"14%", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.roleName + '';
	             }},
			{ name: 'companyName' ,width:"14.8%"},
	 {displayName:'Actions', enableRowSelection: false, field:'roleName', headerCellClass: 'header-grid-cell-button', enableFiltering: false, width: '14%',cellClass: 'ui-grid-cell-button',
				enableColumnMenu: false, enableSorting: false,cellTemplate:
         '<ul class="icons-list">'+
			'<li class="dropdown">'+
		'<a  class="dropdown-toggle" data-toggle="dropdown">'+
			'<i class="icon-menu9"></i>'+
		'</a>'+
		'<ul class="dropdown-menu dropdown-menu-right">'+
			'<li class="delete_user"><a  ng-click="grid.appScope.DeleteUserBtn()"><i class="icon-backspace2 text-warning-800"></i> Activate/Deactivate</a></li>'+
			'<li class="edit_user"><a ng-click="grid.appScope.UpdateUserBtn();"><i class="icon-pencil5 text-primary user_editor_link"></i> Edit User</a></li>'+
			'<li ng-if="row.entity.roleName != \'ROLE_REPORTING\' " ng-show="{{grid.appScope.role == \'ROLE_OTADMIN\'}}" class="assign_devices"><a  ng-click="grid.appScope.assignDeviceToUser()" ><i class=" icon-cart-add2 text-green-800"></i> Assign Devices</a></li>'+

		/*	'<li class="show_user"><a "><i class="icon-user text-muted"></i> Show Detail</a></li>'+*/
		'</ul>'+
	'</li>'+
'</ul>'}

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
	    enableFilter: false,
	    enableColResize: true,
		enableRowSelection: true,  // for selection
		enableColumnMenus: false, //to hide ascending and descending column menu names
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,
		enableGridMenu: false,		// for searching
		multiSelect:false,
		enableScrollbars : false,
		enableHorizontalScrollbar : 0,
		enableVerticalScrollbar : 0,
		columnDefs: [
			{ displayName:'Id', field: 'userGroupId' ,width:"10%"},
			{ displayName:'Name',  field: 'userGroupName',width:"25%" },
			{ displayName: 'Created By',field:"createdByName", width:"20%", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.createdByName + '';
	             }  },
			{ displayName:'Created On', field: 'createdDate',width:"30%",cellFilter: "date:'"+oApp.constant.GRID_DATE_TIME_FORMAT+"'", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.createdDate + '';
	             }  },
			{name:'Actions',
				enableRowSelection: false,headerCellClass: 'header-grid-cell-button', enableFiltering: false, width: '15%',cellClass: 'ui-grid-cell-button',
				enableColumnMenu: false, enableSorting: false,cellTemplate:
		         '<ul class="icons-list">'+
					'<li class="dropdown">'+
				'<a  class="dropdown-toggle" data-toggle="dropdown">'+
					'<i class="icon-menu9"></i>'+
				'</a>'+
				'<ul class="dropdown-menu dropdown-menu-right">'+
					'<li class="delete_user"><a  ng-click="grid.appScope.DeleteUserGroupBtn()"><i class="icon-backspace2 text-warning-800"></i> Delete User Group</a></li>'+
					'<li class="edit_user"><a ng-click="grid.appScope.UpdateUserGroupBtn()"><i class="icon-pencil5 text-primary user_editor_link"></i> Edit User Group</a></li>'+
					'<li class="show_user"><a ng-click="grid.appScope.assignUserOfGroup()" ><i class="icon-users4 text-green-800"></i> Assign Users</a></li>'+
				'</ul>'+
			'</li>'+
		'</ul>'}
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
		enableRowSelection: false,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,  // for searching
		multiSelect:false,
//		 paginationPageSizes: [20, 40, 60],
//			paginationPageSize: 20,
			enableSorting: false,
		    enableFilter: false,
//		    enableColResize: true,
			enableRowSelection: true,  // for selection
//			enableColumnMenus: true, //to hide ascending and descending column menu names
//			enableRowHeaderSelection: false, // this is for check box to appear on grid options
			enableFiltering: false,
//			enableGridMenu: true,		// for searching
			multiSelect:false,
			enableVerticalScrollbar :2,
			enableHorizontalScrollbar:0,
		columnDefs: [
			{ name: 'username' ,width:"45%"},
			/*{ name: 'firstName',width:"14%"},
			{ name: 'lastName' ,width:"14%"},*/
			{ displayName: 'Name',field: 'firstName', width:"45%",
				  cellTemplate: '<div class="ui-grid-cell-contents">'+
				'{{row.entity.firstName}} {{row.entity.lastName}}</div>}}'}
		]
	},
		existingusersGridOptions : {
//		paginationPageSizes: [1,25, 50, 75],

		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,  // for searching
		multiSelect:false,
		enableSorting: false,
	    enableFilter: false,
	    enableHorizontalScrollbar:0,
	    enableVerticalScrollbar :2,
		columnDefs: [
			//{ name: 'userGroupName' ,width:100},
			{ name: 'username',width:"45%" },
			{ displayName: 'Name',field: 'firstName', width:"45%",
				  cellTemplate: '<div class="ui-grid-cell-contents">'+
				'{{row.entity.firstName}} {{row.entity.lastName}}</div>}}'}
		/*	{ name: 'lastName' ,width:"14%"}*/


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
			{ name: 'deviceId' ,width:'20%', cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.deviceId + '';
	             }},
			{ name: 'userName',width:'20%', cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.userName + '';
	             }  },
			{ displayName:'MSISDN', field: 'msisdn' ,width:'30%', cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.msisdn + '';
	             }},
			{displayName:'IMEI',field: 'imei' ,width:'30%', cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.imei + '';
	             }}
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
			{ name: 'deviceId' ,width:"20%", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.deviceId + '';
	             } },
			{ name: 'userName',width:"20%", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.userName + '';
	             } },
			{displayName:'MSISDN', field: 'msisdn' ,width:"30%", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.msisdn + '';
	             }},
			{ displayName:'IMEI',field: 'imei' ,width:"30%", cellTooltip:
	               function( row, col ) {
	               return '' + row.entity.imei + '';
	             }}
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
		enableSorting: true,
	    enableFilter: false,
	    enableColResize: true,
		enableRowSelection: true,  // for selection
		enableRowSelection: false,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,			// for searching
		enableGridMenu: true,
		multiSelect:false,
		enableVerticalScrollbar :0,
		columnDefs: [
			{displayName: 'ID', field: 'deviceId' ,width:"18%",pinnedLeft:true,enableCellEdit: false , allowCellFocus : false},
			{displayName: 'Name', field: 'deviceName',enableCellEdit: true,width:"15%", cellTooltip:
                function( row, col ) {
                return '' + row.entity.deviceName + '';
              }},
			{ name: 'model' ,width:"22%",enableCellEdit: false, cellTooltip:
                function( row, col ) {
                return '' + row.entity.model + '';
               }},

			{ displayName: 'Job Status', field: 'statusFlag' ,width:"18%",enableCellEdit: false,
				  cellTemplate: '<div class="ui-grid-cell-contents">'+
					  '<span ng-if="row.entity.jobStatusCode ==  -1"><span class="label label-success">{{row.entity.statusFlag}}</span></span>'+
					  '<span ng-if="row.entity.jobStatusCode ==  -2"><span class="label label-default">{{row.entity.statusFlag}}</span></span>'+
					  '<span ng-if="row.entity.jobStatusCode ==  -3"><span class="label label-success ">{{row.entity.statusFlag}}</span></span>'+
					  '<span ng-if="row.entity.jobStatusCode ==  -4"><span class="label  label-warning ">{{row.entity.statusFlag}}</span></span>'+
					  '<span ng-if="row.entity.jobStatusCode ==  -5"><span class="label  label-warning">{{row.entity.statusFlag}}</span></span>'+
					  '<span ng-if="row.entity.jobStatusCode ==  -6"><span class="label  label-warning">{{row.entity.statusFlag}}</span></span>'+
					  '<span ng-if="row.entity.jobStatusCode >=  0"><span class="label  label-primary">{{row.entity.statusFlag}}</span>'+
					 ' </span></div>', cellTooltip:
			                function( row, col ) {
			                return '' + row.entity.statusFlag + '';
					 }},
			{ displayName: 'Last Ping', field: 'lastPing' ,width:"20%",enableCellEdit: false, cellTooltip:
                function( row, col ) {
                return '' + row.entity.lastPing + '';
               } },
			{ name:'Actions', pinnedRight:true,multiSelect:false,headerCellClass: 'header-grid-cell-button', enableFiltering: false, width: '10%',enableCellEdit: false,
							cellClass: 'ui-grid-cell-button task_detailed_viewer',
				enableColumnMenu: false, enableSorting: false,cellTemplate:
					'<span class="pointer-link"   ng-click="grid.appScope.deviceAvailabilityBody(row);"><i class="pt icon-circle-right2 text-orange-600"></i></span>'},
        /* '<ul class="icons-list">'+
			'<li class="dropdown">'+
		'<a  class="dropdown-toggle" data-toggle="dropdown">'+
			'<i class="icon-menu9"></i>'+
		'</a>'+
		'<ul class="dropdown-menu dropdown-menu-right">'+
			'<li ><a class="device_availability_link"  ng-click="grid.appScope.availabilityDeviceBody()"><i class="icon-map text-success"></i> Availability</a></li>'+
			'<li ><a ng-click="grid.appScope.UpdateUserBtn();"><i class="icon-wrench2 text-primary user_editor_link"></i> Device  Map</a></li>'+

		'</ul>'+
	'</li>'+
'</ul>'},*/
			/*{displayName:'Device Status', field: 'deviceStatus' ,width:150,enableCellEdit: false,
						cellTemplate: '<div id="deviceStatus_{{row.entity.deviceId}}" class="ui-grid-cell-contents">'+
						'{{row.entity.firstName}} {{row.entity.deviceStatus}}</div>}}'
			},*/
			{ name: 'manufacturer' ,field : 'manufacturer' ,width:150,enableCellEdit: false},
			{ displayName:'Default Job ID', field: 'defaultJobId' ,width:150,enableCellEdit: false},
			{ displayName:'User Name', field: 'fullName' ,width:150,enableCellEdit: false},
			{ name: 'deviceType' ,width:150,enableCellEdit: false},
			{ headerName: 'Carrier' ,width:150,field:'carrier',enableCellEdit: false, cellTooltip:
                function( row, col ) {
                return '' + row.entity.carrier + '';
               }},
			{ displayName:'IMSI', field: 'imsi' ,width:150,enableCellEdit: false, cellTooltip:
                function( row, col ) {
                return '' + row.entity.imsi + '';
               }},
			{ displayName:'IMEI', field: 'imei' ,width:150,enableCellEdit: true, cellTooltip:
                function( row, col ) {
                return '' + row.entity.imei + '';
               }},
			{ displayName:'MSISDN', field: 'msisdn' ,width:"15%",enableCellEdit: true, cellTooltip:
                function( row, col ) {
                return '' + row.entity.msisdn + '';
               }},
			{ name: 'networkType' ,width:"15%",enableCellEdit: false},
			{ name: 'region' ,width:"15%", cellTooltip:
                function( row, col ) {
                return '' + row.entity.region + '';
               }},
           	{ displayName:'Work URL',field: 'workUrl' ,width:100, cellTooltip:
                function( row, col ) {
                return '' + row.entity.workUrl + '';
               }},

			{ name: 'jobId' ,width:100,enableCellEdit: false},
			{ name: 'jobName' ,width:150,enableCellEdit: false, cellTooltip:
                function( row, col ) {
                return '' + row.entity.jobName + '';
               }},
			{ displayName:'Job Status Time', field: 'jobStatusDateTime' ,width:"20%" ,enableCellEdit: false, cellTooltip:
                function( row, col ) {
                return '' + row.entity.jobStatusDateTime + '';
               } },
			{ displayName: 'Job Start Date Time' ,field: 'jobStartDate' ,width:"20%",enableCellEdit: false, cellTooltip:
                function( row, col ) {
                return '' + row.entity.jobStartDate + '';
               } },
               { displayName: 'Job End Date Time' , field: 'jobEndDate' ,width:"20%" ,enableCellEdit: false, cellTooltip:
                   function( row, col ) {
                   return '' + row.entity.jobEndDate + '';
                  }},
           { displayName: 'Device HeartBeat Status' , field: 'heartBeatStatus' ,width:"20%" ,enableCellEdit: false,  cellTemplate: '<div class="ui-grid-cell-contents">'+
					  '<span ng-if="row.entity.heartBeatStatus ==  -1"><span class="label label-default">Device not monitored</span></span>'+
					  '<span ng-if="row.entity.heartBeatStatus ==  0"><span class="label label-success">Heart Beat received</span></span>'+
					  '<span ng-if="row.entity.heartBeatStatus ==  1"><span class="label label-warning">Heart Beat not received</span></span>'+
					  '</span></div>', cellTooltip:
			                function( row, col ) {
						 var stat = row.entity.heartBeatStatus;
						 if(stat == 0)
							 return 'Heart Beat received';
						 if(stat == -1)
							 return 'Device not monitored for Heart Beat';
						 if(stat == 1)
							 return 'Heart Beat not received';
						 /*
						  	 * HeartBeatStatus = -1 device not monitored for heart beat
							 * HeartBeatStatus = 0 heart beat received in configured time
							 * HeartBeatStatus = 1 heart beat not received in configured time
							 */
					 }}
		]
	},
	webETLSchedulerMappingGrid : {
		enableSorting: false,
	    enableFilter: false,
	    enableColResize: false,
		enableRowSelection: false,  // for selection
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,			// for searching
		enableGridMenu: false,		
		multiSelect:false,
		enableVerticalScrollbar :1,
		enableHorizontalScrollbar :0, 
		
		columnDefs: [
			{displayName: 'Begin-Date', field: 'beginDate' },
			{displayName: 'End-Date', field: 'endDate' },
			{displayName: 'Schedule Date Time', field: 'scheduleDateTime'},
			{displayName: 'Current Status', field: 'currentStatus', enableCellEdit: false,  cellTemplate: '<div class="ui-grid-cell-contents">'+
				  '<span ng-if="row.entity.currentStatus ==  \'SCHEDULED\'"><span class="label label-default">SCHEDULED</span></span>'+
				  '<span ng-if="row.entity.currentStatus ==  \'RUNNING\'"><span class="label label-primary">RUNNING</span></span>'+
				  '<span ng-if="row.entity.currentStatus ==  \'FINISHED\'"><span class="label label-success">FINISHED</span></span>'+
				  '<span ng-if="row.entity.currentStatus ==  \'FORCEFULLY STOPPED\'"><span class="label label-warning">FORCEFULLY STOPPED</span></span>'+
				  '<span ng-if="row.entity.currentStatus ==  \'ABRUPTLY STOPPED\'"><span class="label label-danger">ABRUPTLY STOPPED</span></span>'+
				  '</span></div>'}
			,{displayName: 'Action', field: 'stat', cellTemplate: '<div class="ui-grid-cell-contents">'+
				'<div ng-if="row.entity.currentStatus == \'RUNNING\'"><button style="padding:1px 12px" class="stopbtn btn btn-danger" ng-click="grid.appScope.stopETL()">Stop ETL</button></div>' + 
				'<div ng-if="row.entity.currentStatus == \'SCHEDULED\'"><button id="{{row.entity.id}}" style="padding:1px 12px" class="btn btn-info" ng-click="grid.appScope.deleteETLInfo($event)">Delete</button></div>' +
				'<div ng-if="row.entity.currentStatus != \'RUNNING\'">----</div>' + 
				'</div>'
			},
		]
	},
	loadingImageName : 'images/loading_new.gif',
	menuData : null
}
	