var oApp = oApp || {};

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
	BASE_URL:'http://dev.orchestratec.net:8080/IAPORTAL/',
	MEASUREMENT_URL :'http://dev.orchestratec.net:8080/IAPORTAL/rest/measurement/',

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
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		columnDefs: [
			{ name: 'deviceName' ,width:150},
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
			{ name: 'statusFlag' ,width:150},
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
        // note - we do not set 'virtualPaging' here, so the grid knows we are doing standard paging
        enableSorting: true,
        enableFilter: true,
        enableColResize: true,
        columnDefs: [
			
		]	
	},
	columnDefsapn : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "autoId", field: "autoId", width: 150, visible:false},
			{headerName: "deviceId", field: "deviceId", width: 90},
			{headerName: "jobId", field: "jobId", width: 120},
			{headerName: "timeStamp", field: "timeStamp", width: 90},
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
			{headerName: "testcaseId", field: "testcaseId", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100}
		],
		columnDefsapplications : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "deviceId", field: "deviceId", width: 150},
			{headerName: "jobId", field: "jobId", width: 90},
		   
			{headerName: "timeStamp", field: "timeStamp", width: 90},
		 
			{headerName: "apnName", field: "apnName", width: 110},
			{headerName: "apnRss", field: "apnRss", width: 100},
			{headerName: "appBatteryLevel", field: "appBatteryLevel", width: 150},
			{headerName: "appCpuUsage", field: "appCpuUsage", width: 100},
			{headerName: "appDlVolumn", field: "appDlVolumn", width: 100},
			{headerName: "appDlSpeed", field: "appDlSpeed", width: 100},
			{headerName: "appUlVolumn", field: "appUlVolumn", width: 100},
			{headerName: "appUlSpeed", field: "appUlSpeed", width: 100},
			{headerName: "appRunStatus", field: "appRunStatus", width: 100},
			{headerName: "appPss", field: "appPss", width: 100},
			{headerName: "appUss", field: "appUss", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100},
			{headerName: "appUsageTime", field: "appUsageTime", width: 100},
			{headerName: "utcTime", field: "utcTime", width: 100},
			{headerName: "deviceTimeZone", field: "deviceTimeZone", width: 150},
			{headerName: "appState", field: "appState", width: 100},
			{headerName: "numberThread", field: "numberThread", width: 100},
			{headerName: "appFbground", field: "appFbground", width: 100},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", width: 150}
		],
		columnDefsipaddress : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "autoId", field: "autoId", width: 150},
			{headerName: "deviceId", field: "deviceId", width: 90},
		   {headerName: "jobId", field: "jobId", width: 90},
			{headerName: "timeStamp", field: "timeStamp", width: 110},
			{headerName: "ipPublicV4", field: "ipPublicV4", width: 100},
			{headerName: "dupId", field: "dupId", width: 100},
			{headerName: "ipPrivateV4", field: "ipPrivateV4", width: 100},
			{headerName: "ipPublicV6", field: "ipPublicV6", width: 100},
			{headerName: "ipPrivateV6", field: "ipPrivateV6", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
		],
		columnDefsl1log : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "deviceId", field: "deviceId", width: 150},
			{headerName: "testcaseId", field: "testcaseId", width: 90},
		   {headerName: "jobStartTime", field: "jobStartTime", width: 90},
			{headerName: "jobStartTimeMs", field: "jobStartTimeMs", width: 110},
			{headerName: "pci", field: "pci", width: 100},
			{headerName: "cellId", field: "cellId", width: 100},
			{headerName: "cellName", field: "cellName", width: 100},
			{headerName: "channelBandWidth", field: "channelBandWidth", width: 150}
		],
		columnDefslocation : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "deviceId", field: "deviceId", width: 150},
			{headerName: "jobId", field: "jobId", width: 90},
		   {headerName: "timeStamp", field: "timeStamp", width: 90},
			{headerName: "locationProvider", field: "locationProvider", width: 110},
			{headerName: "collectAltitude", field: "collectAltitude", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100},
			{headerName: "xParam", field: "xParam", width: 100},
			{headerName: "yParam", field: "yParam", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100},
			{headerName: "lastLocationTime", field: "lastLocationTime", width: 150}
		],
		columnDefsmms : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "mmsId", field: "mmsId", width: 150},
			{headerName: "deviceId", field: "deviceId", width: 90},
		   {headerName: "jobId", field: "jobId", width: 90},
			{headerName: "callingPartyNumber", field: "callingPartyNumber", width: 150},
			{headerName: "calledPartyNumber", field: "calledPartyNumber", width: 150},
			{headerName: "timeZone", field: "timeZone", width: 100},
			{headerName: "mmsTime", field: "mmsTime", width: 100},
			{headerName: "utcTime", field: "utcTime", width: 100},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", width: 100},
			{headerName: "mmsText", field: "mmsText", width: 100},
			{headerName: "mmsFileSize", field: "mmsFileSize", width: 100},
			{headerName: "mmsFileName", field: "mmsFileName", width: 100},
			{headerName: "sendStatus", field: "sendStatus", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
		],
		columnDefsneighborcellinfo : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "autoId", field: "autoId", width: 150},
			{headerName: "deviceId", field: "deviceId", width: 90},
		   {headerName: "jobId", field: "jobId", width: 90},
			{headerName: "timeStamp", field: "timeStamp", width: 110},
			{headerName: "mcId", field: "mcId", width: 100},
			{headerName: "mLac", field: "mLac", width: 100},
			{headerName: "mNetworkType", field: "mNetworkType", width: 150},
			{headerName: "mPsc", field: "mPsc", width: 100},
			{headerName: "rssi", field: "rssi", width: 100},
			{headerName: "apTime", field: "apTime", width: 100},
			{headerName: "apDeviceLocalTime", field: "apDeviceLocalTime", width: 150},
			{headerName: "utcTime", field: "utcTime", width: 100},
			{headerName: "apTimeZone", field: "apTimeZone", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
			
		],
		columnDefssms : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "smsId", field: "smsId", width: 150},
			{headerName: "jobId", field: "jobId", width: 90},
		   {headerName: "deviceId", field: "deviceId", width: 90},
			{headerName: "callingPartyNumber", field: "callingPartyNumber", width: 150},
			{headerName: "calledPartyNumber", field: "calledPartyNumber", width: 150},
			{headerName: "callingPartySMSC", field: "callingPartySMSC", width: 150},
			{headerName: "timeZone", field: "timeZone", width: 100},
			{headerName: "smsTime", field: "smsTime", width: 100},
			{headerName: "utcTime", field: "utcTime", width: 100},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", width: 100},
			{headerName: "textMsg", field: "textMsg", width: 100},
			{headerName: "sendStatus", field: "sendStatus", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
			
		],
		columnDefstcpperformance : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "autoId", field: "autoId", width: 150},
			{headerName: "deviceId", field: "deviceId", width: 90},
		   {headerName: "jobId", field: "jobId", width: 90},
			{headerName: "timeStamp", field: "timeStamp", width: 110},
			{headerName: "deviceTime", field: "deviceTime", width: 150},
			{headerName: "deviceTimeZone", field: "deviceTimeZone", width: 150},
			{headerName: "nodeType", field: "nodeType", width: 100},
			{headerName: "serverIp", field: "serverIp", width: 100},
			{headerName: "serverPort", field: "serverPort", width: 100},
			{headerName: "clientIp", field: "clientIp", width: 100},
			{headerName: "clientPort", field: "clientPort", width: 100},
			{headerName: "timeDuration", field: "timeDuration", width: 100},
			{headerName: "dataTransfered", field: "dataTransfered", width: 150},
			{headerName: "bandWidth", field: "bandWidth", width: 100},
			{headerName: "tcpWindowSize", field: "tcpWindowSize", width: 100},
			{headerName: "networkType", field: "networkType", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
			
		],
		columnDefsudpperformance : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "autoId", field: "autoId", width: 150},
			{headerName: "deviceId", field: "deviceId", width: 90},
		   {headerName: "jobId", field: "jobId", width: 90},
			{headerName: "timeStamp", field: "timeStamp", width: 110},
			{headerName: "deviceTime", field: "deviceTime", width: 100},
			{headerName: "deviceTimeZone", field: "deviceTimeZone", width: 150},
			{headerName: "nodeType", field: "nodeType", width: 100},
			{headerName: "serverIp", field: "serverIp", width: 100},
			{headerName: "serverPort", field: "serverPort", width: 100},
			{headerName: "clientIp", field: "clientIp", width: 100},
			{headerName: "clientPort", field: "clientPort", width: 100},
			{headerName: "timeDuration", field: "timeDuration", width: 100},
			{headerName: "dataTransfered", field: "dataTransfered", width: 100},
			{headerName: "bandWidth", field: "bandWidth", width: 100},
			{headerName: "dataGramSize", field: "dataGramSize", width: 100},
			{headerName: "udpBufferSize", field: "udpBufferSize", width: 150},
			{headerName: "jitter", field: "jitter", width: 100},
			{headerName: "dataGramLost", field: "dataGramLost", width: 100},
			{headerName: "dataGramTotal", field: "dataGramTotal", width: 100},
			{headerName: "networkType", field: "networkType", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
			
		],
		columnDefsvoice : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "voiceCallSeqNumber", field: "voiceCallSeqNumber", width: 150},
			{headerName: "deviceId", field: "deviceId", width: 90},
		   {headerName: "jobId", field: "jobId", width: 90},
			{headerName: "callingPartyNumber", field: "callingPartyNumber", width: 150},
			{headerName: "calledPartyNumber", field: "calledPartyNumber", width: 150},
			{headerName: "voiceCallTime", field: "voiceCallTime", width: 100},
			{headerName: "voiceCallDeviceLocalTime", field: "voiceCallDeviceLocalTime", width: 150},
			{headerName: "voiceCallUTCTime", field: "voiceCallUTCTime", width: 150},
			{headerName: "voiceCallTimeZone", field: "voiceCallTimeZone", width: 150},
			{headerName: "eventType", field: "eventType", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100},
			{headerName: "voiceCallFile", field: "voiceCallFile", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
		],
		columnDefswifiinfo : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "autoId", field: "autoId", width: 150},
			{headerName: "deviceId", field: "deviceId", width: 90},
		   {headerName: "jobId", field: "jobId", width: 90},
			{headerName: "timeStamp", field: "timeStamp", width: 110},
			{headerName: "wifiApn", field: "wifiApn", width: 100},
			{headerName: "wifiSsId", field: "wifiSsId", width: 100},
			{headerName: "wifiIpAddress", field: "wifiIpAddress", width: 150},
			{headerName: "wifiMacAddress", field: "wifiMacAddress", width: 150},
			{headerName: "wifiBssId", field: "wifiBssId", width: 100},
			{headerName: "wifiSignalLevel", field: "wifiSignalLevel", width: 100},
			{headerName: "wifiFrequency", field: "wifiFrequency", width: 100},
			{headerName: "wifiSecurity", field: "wifiSecurity", width: 100},
			{headerName: "wifiStatus", field: "wifiStatus", width: 100},
			{headerName: "apTime", field: "apTime", width: 100},
			{headerName: "apDeviceLocationTime", field: "apDeviceLocationTime", width: 150},
			{headerName: "apUtcTime", field: "apUtcTime", width: 100},
			{headerName: "apTimeZone", field: "apTimeZone", width: 100},
			{headerName: "wifiLinkSpeed", field: "wifiLinkSpeed", width: 100},
			{headerName: "wifiApDistance", field: "wifiApDistance", width: 100},
			{headerName: "wifiSnr", field: "wifiSnr", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
		],
		columnDefswifitrafficinfo : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "wifiCollectId", field: "wifiCollectId", width: 150},
			{headerName: "jobId", field: "jobId", width: 90},
		   {headerName: "deviceId", field: "deviceId", width: 90},
			{headerName: "initialConnectedState", field: "initialConnectedState", width: 150},
			{headerName: "finalConnectedState", field: "finalConnectedState", width: 150},
			{headerName: "timeTakenToConnect", field: "timeTakenToConnect", width: 150},
			{headerName: "timeTakenToDisconnect", field: "timeTakenToDisconnect", width: 150},
			{headerName: "wifiInfoTime", field: "wifiInfoTime", width: 100},
			{headerName: "timeZone", field: "timeZone", width: 100},
			{headerName: "utcTime", field: "utcTime", width: 100},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
			
		],
		columnDefsattach : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "deviceId", field: "deviceId", width: 150},
			{headerName: "jobId", field: "jobId", width: 90},
		   {headerName: "sessionSeqNumber", field: "sessionSeqNumber", width: 150},
			{headerName: "sessionTime", field: "sessionTime", width: 110},
			{headerName: "sessionDeviceLocalTime", field: "sessionDeviceLocalTime", width: 150},
			{headerName: "sessionUTCTime", field: "sessionUTCTime", width: 150},
			{headerName: "sessionTimeZone", field: "sessionTimeZone", width: 150},
			{headerName: "sessionType", field: "sessionType", width: 100},
			{headerName: "connectTechnology", field: "connectTechnology", width: 100},
			{headerName: "sessionStatus", field: "sessionStatus", width: 100},
			{headerName: "serviceStateStatus", field: "serviceStateStatus", width: 150},
			{headerName: "sessionSpeed", field: "sessionSpeed", width: 100},
			{headerName: "sessionVolumn", field: "sessionVolumn", width: 100},
			{headerName: "sessionLatency", field: "sessionLatency", width: 100},
			{headerName: "sessionCauseCode", field: "sessionCauseCode", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
			
		],
		columnDefslatency : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "deviceId", field: "deviceId", width: 150},
			{headerName: "jobId", field: "jobId", width: 90},
		   {headerName: "pingSeqNumber", field: "pingSeqNumber", width: 90},
			{headerName: "pingStartTime", field: "pingStartTime", width: 110},
			{headerName: "pingDeviceLocalTime", field: "pingDeviceLocalTime", width: 150},
			{headerName: "pingUTCTime", field: "pingUTCTime", width: 100},
			{headerName: "pingTimeZone", field: "pingTimeZone", width: 100},
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
			{headerName: "sessionId", field: "sessionId", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
			
		],
		columnDefsupload : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "jobId", field: "jobId", width: 150},
			{headerName: "deviceId", field: "deviceId", width: 90},
		   {headerName: "uploadSeqNo", field: "uploadSeqNo", width: 90},
			{headerName: "uploadTime", field: "uploadTime", width: 110},
			{headerName: "uploadTimeZone", field: "uploadTimeZone", width: 100},
			{headerName: "uploadDeviceLocalTime", field: "uploadDeviceLocalTime", width: 100},
			{headerName: "uploadUTCTime", field: "uploadUTCTime", width: 100},
			{headerName: "uploadType", field: "uploadType", width: 100},
			{headerName: "mobileNetworkType", field: "mobileNetworkType", width: 100},
			{headerName: "uploadProcess", field: "uploadProcess", width: 100},
			{headerName: "uploadFileUrl", field: "uploadFileUrl", width: 100},
			{headerName: "uploadedFileSize", field: "uploadedFileSize", width: 150},
			{headerName: "uploadedTotalFileSize", field: "uploadedTotalFileSize", width: 150},
			{headerName: "sessionId", field: "sessionId", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
		],
		columnDefsemail : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "emailId", field: "emailId", width: 150},
			{headerName: "deviceId", field: "deviceId", width: 90},
		   {headerName: "jobId", field: "jobId", width: 90},
			{headerName: "sendingFrom", field: "sendingFrom", width: 110},
			{headerName: "sendingTo", field: "sendingTo", width: 100},
			{headerName: "emailTime", field: "emailTime", width: 100},
			{headerName: "utcTime", field: "utcTime", width: 100},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", width: 100},
			{headerName: "timeZone", field: "timeZone", width: 100},
			{headerName: "emailSubject", field: "emailSubject", width: 100},
			{headerName: "emailMsg", field: "emailMsg", width: 100},
			{headerName: "emailHasAttachment", field: "emailHasAttachment", width: 150},
			{headerName: "attachmentSize", field: "attachmentSize", width: 100},
			{headerName: "sendStatus", field: "sendStatus", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
		],
		columnDefsdatausage : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "deviceId", field: "deviceId", width: 150},
			{headerName: "jobId", field: "jobId", width: 90},
		   {headerName: "timeStamp", field: "timeStamp", width: 90},
			{headerName: "intfName", field: "intfName", width: 110},
			{headerName: "intfOutband", field: "intfOutband", width: 100},
			{headerName: "intfInband", field: "intfInband", width: 100},
			{headerName: "sessionId", field: "sessionId", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100},
			{headerName: "ipAddress", field: "ipAddress", width: 100},
			{headerName: "bytes", field: "bytes", width: 100},
			{headerName: "sentOrRevice", field: "sentOrRevice", width: 100}
			
		],
		columnDefsvideo : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "jobId", field: "jobId", width: 150},
			{headerName: "deviceId", field: "deviceId", width: 90},
		   {headerName: "mplayerSeqNo", field: "mplayerSeqNo", width: 90},
			{headerName: "mplayerTime", field: "mplayerTime", width: 110},
			{headerName: "mplayerTimeZone", field: "mplayerTimeZone", width: 150},
			{headerName: "mplayerDeviceLocalTime", field: "mplayerDeviceLocalTime", width: 150},
			{headerName: "mplayerUTCTime", field: "mplayerUTCTime", width: 150},
			{headerName: "mplayerType", field: "mplayerType", width: 100},
			{headerName: "mobileNetWorkType", field: "mobileNetWorkType", width: 150},
			{headerName: "mplayerProgress", field: "mplayerProgress", width: 100},
			{headerName: "mplayerFileUrl", field: "mplayerFileUrl", width: 100},
			{headerName: "mplayerBufferProgress", field: "mplayerBufferProgress", width: 150},
			{headerName: "mplayerTotalFileDuration", field: "mplayerTotalFileDuration", width: 150},
			{headerName: "mplayerCodeInfo", field: "mplayerCodeInfo", width: 100},
			{headerName: "mplayerSessionId", field: "mplayerSessionId", width: 130},
			{headerName: "testCaseId", field: "testCaseId", width: 100}
			
		],
		columnDefsclickscreanimage : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} }
			
			
		],
		columnDefsaudio : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "deviceId", field: "deviceId", width: 150},
			{headerName: "jobId", field: "jobId", width: 90},
		   {headerName: "time", field: "time", width: 90},
			{headerName: "deviceLocalTime", field: "deviceLocalTime", width: 110},
			{headerName: "utcTime", field: "utcTime", width: 100},
			{headerName: "timeZone", field: "timeZone", width: 100},
			{headerName: "localAudioFilePath", field: "localAudioFilePath", width: 180},
			{headerName: "startTime", field: "startTime", width: 100},
			{headerName: "endTime", field: "endTime", width: 100},
			{headerName: "ifPlayer", field: "ifPlayer", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100},
			{headerName: "ftpServer", field: "ftpServer", width: 100},
			{headerName: "ftpServerWaveFilePath", field: "ftpServerWaveFilePath", width: 150},
			{headerName: "audioAnalyzed", field: "audioAnalyzed", width: 100}
			
			
		],
		columnDefsdownload: [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} },
			{headerName: "jobId", field: "jobId", width: 150},
			{headerName: "deviceId", field: "deviceId", width: 90},
		   {headerName: "downloadSeqNo", field: "downloadSeqNo", width: 90},
			{headerName: "downloadTime", field: "downloadTime", width: 110},
			{headerName: "downloadTimeZone", field: "downloadTimeZone", width: 100},
			{headerName: "downloadDeviceLocalTime", field: "downloadDeviceLocalTime", width: 100},
			{headerName: "downloadUTCTime", field: "downloadUTCTime", width: 180},
			{headerName: "downloadType", field: "downloadType", width: 100},
			{headerName: "mobileNetworkType", field: "mobileNetworkType", width: 100},
			{headerName: "downloadProgress", field: "downloadProgress", width: 100},
			{headerName: "downloadFileUrl", field: "downloadFileUrl", width: 100},
			{headerName: "downloadedFileSize", field: "downloadedFileSize", width: 100},
			{headerName: "downloadTotalFileSize", field: "downloadTotalFileSize", width: 150},
			{headerName: "sessionId", field: "sessionId", width: 100},
			{headerName: "testcaseId", field: "testcaseId", width: 100}
			
			
		],
		columnDefsclickscreanxy : [
			// this row just shows the row index, doesn't use any data from the row
			{headerName: "#", width: 50, cellRenderer: function(params) {
				return params.node.id + 1;
			} }
			
			
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
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableRowSelection: true,  // for selection
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'username' ,width:150},
			{ name: 'status',width:150 },
			{ name: 'firstName' ,width:150},
			{ name: 'lastName' ,width:150},			
			{ name: 'email' ,width:150},
			{ name: 'roleName' ,width:150},
			{ name: 'companyName' ,width:150},
			
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
		columnDefs: [
			{ name: 'userGroupId' ,width:200},
			{ name: 'userGroupName',width:250 },
			{ name: 'createdBy',width:200 },
			{ name: 'createdDate',width:230 }
			
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
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending column menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: true,  // for searching
		multiSelect:false,
		columnDefs: [
			{ name: 'userGroupId' ,width:200},
			{ name: 'userGroupName',width:250 },
			{ name: 'createdBy',width:200 },
			{ name: 'createdDate',width:230 }		
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
		multiSelect:false,
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
		multiSelect:false,
		columnDefs: [
			
			{ name: 'commandName',width:"100%" }
			
		]
	},
		allusersgroupGridOptions : {
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
		existingusersGridOptions : {
		paginationPageSizes: [1,25, 50, 75],
		paginationPageSize: 25,
		enableColumnMenus: false, //to hide ascending and descending colomn menu names
		enableRowSelection: true,  // for selection
		enableRowHeaderSelection: false, // this is for check box to appear on grid options
		enableFiltering: false,  // for searching
		multiSelect:false,
		columnDefs: [
			//{ name: 'userGroupName' ,width:100},
			{ name: 'username',width:100 },
			{ name: 'firstName',width:100 },
			{ name: 'lastName' ,width:100}
			
			
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
		columnDefs: [
			{ name: 'id' ,width:100},
			{ name: 'name' ,width:100},
			
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
	menuData : null
}
	