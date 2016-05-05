oTech.controller('serverSettingController',
	function ($scope, $rootScope, $location, AppServices, $stateParams) {
		var pv;
		var ie,cd,lm,ml,pk;
		
		var token = sessionStorage.token;
		var userId = sessionStorage.userId;
		$rootScope.role = sessionStorage.getItem("role");
		
		var settingvariable = "server" ;
		
		$rootScope.slideContent();
		
		window.onresize = function(event) {
			$rootScope.slideContent();
		}
		$scope.name = sessionStorage.getItem("username");
		/*
			To get dashboard menu data
		*/
		$scope.getDashBoardMenu = function(){
			if($rootScope.menuData == undefined){
				$rootScope.getMenuData();
			}
		}
		/*
			To get favourite reports
		*/
		$scope.getFavouriteReports = function(){
			if($rootScope.Favourites == undefined){
				$rootScope.getFavouriteReports();
			}
		}
		$scope.getDashBoardMenu();
		$scope.getFavouriteReports();
		
		$scope.openDevicedata =function(e){
			
			//alert($(e.currentTarget).text());
		}
		$scope.serverSettingsGridOptions = oApp.config.serverSettingsGridOptions;
		
		 $scope.serverSettingsGridOptions.onRegisterApi = function( gridApi ) { //extra code

		  $scope.gridApi = gridApi;
		  $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){ // on row selection
			    $('#pavan').modal('show');
		        document.getElementById('pv').value = row.entity.propertyValue ;
				document.getElementById('ie').value = row.entity.isEncrypted ;
				document.getElementById('cd').value = row.entity.createdDate ;
				document.getElementById('lm').value = row.entity.lastModified ;
				document.getElementById('ml').value = row.entity.modLog ;
				   
				$scope.save = function(){                          // on save button click event
					if (settingvariable == "server"){
					pv = document.getElementById('pv').value;
					ie = document.getElementById('ie').value;
					cd = document.getElementById('cd').value;
					lm = document.getElementById('lm').value;
					ml = document.getElementById('ml').value;
					pk = row.entity.propertyKey;
					console.log(pk+" ,"+pv+", "+ie+", "+cd+", "+lm+" ,"+ml);
					$('#pavan').modal('hide');
					var data = {
						"propertyKey" : pk ,
						"propertyValue" : pv,
						"isEncrypted" : ie,
						"createdDate": cd,
						"lastModified" : lm,
						"modLog" : ml
						};
						var promise = AppServices.GetserverEditData(token, data);
						promise.then(
						function(data){
							console.log(data);
							row.entity.propertyValue = pv;
							row.entity.isEncrypted = ie;
							row.entity.createdDate = cd;
							row.entity.lastModified = lm;
							row.entity.modLog = ml;
						},
						function(err){
							console.log(err);
						}
						);
					
				}
				else{
					
					pv = document.getElementById('pv').value;
					ie = document.getElementById('ie').value;
					cd = document.getElementById('cd').value;
					lm = document.getElementById('lm').value;
					ml = document.getElementById('ml').value;
					pk = row.entity.propertyKey;
					console.log(pk+" ,"+pv+", "+ie+", "+cd+", "+lm+" ,"+ml);
					$('#pavan').modal('hide');
					var data = {
						"propertyKey" : pk ,
						"propertyValue" : pv,
						"isEncrypted" : ie,
						"createdDate": cd,
						"lastModified" : lm,
						"modLog" : ml
						};
						var promise = AppServices.GetadminEditData(token, data);
						promise.then(
						function(data){
							console.log(data);
							row.entity.propertyValue = pv;
							row.entity.isEncrypted = ie;
							row.entity.createdDate = cd;
							row.entity.lastModified = lm;
							row.entity.modLog = ml;
						},
						function(err){
							console.log(err);
						}
						);
					
				}
				}
				 
				
					$scope.cancel = function(){
						$('#pavan').modal('hide');
					}

		      }); 
	     };

		
		$scope.serverSettingsData = function(){
		 $scope.adminheader = false;
		  $scope.serverheader = true;
		promise = AppServices.GetServerSettingsData(userId, token);
		promise.then(
			function(data){
				$scope.serverSettingsGridOptions.data = data;	
				//console.log($scope.serverSettingsGridOptions.data[0]);
				$scope.gridApi.selection.selectRow($scope.serverSettingsGridOptions.data[0]); //extra code
				
			},
			function(err){
				console.log(err);
			}
		);
	   }
	   //admin service
	   		$scope.adminSettingsData = function(){
				promise = AppServices.GetadminSettingsData(userId, token);
				promise.then(
				function(data){
					$scope.serverSettingsGridOptions.data = data;
					$scope.gridApi.selection.selectRow($scope.serverSettingsGridOptions.data[0]); //extra code
				},
				function(err){
				console.log(err);
				}
			);
		}
	   
	   // for admins
	   $scope.admindrop = function (){
		  $scope.adminSettingsData();
		  settingvariable = "admin";
		  $scope.adminheader = true;
		  $scope.serverheader = false;
		}
		$scope.serverdrop = function(){
			$scope.serverSettingsData();
			settingvariable = "server";
			 $scope.adminheader = false;
		  $scope.serverheader = true;
		}
		
		$scope.serverSettingsData();
});