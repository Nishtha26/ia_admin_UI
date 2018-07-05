oTech.controller('userAdminstrationController',
    function ($scope, $rootScope, $location, AppServices, $stateParams, $timeout, $filter,$uibModal, $templateCache,toastr) {
        var token = sessionStorage.getItem("token");
        var userId = sessionStorage.getItem("userId");
        $rootScope.role = sessionStorage.getItem("role");
        $scope.loading = true;
        var customerList = [];
        var userGroupList = [];
        var clickedItem;
        var row, customerName;
        var deviceId, selectedUserId;
        $scope.error = false;
        $scope.errormsg = "";
        $scope.selectedUserGroup = [];
        $scope.emailPattern = "";

        //	$scope.role ="ROLE_IAADMIN"
        $scope.addCustomer = true;
        $rootScope.slideContent();
        $scope.roleList = {
            ROLE_OTADMIN: ['ROLE_OTADMIN', 'ROLE_IAADMIN', 'ROLE_REPORTING'],
            ROLE_IAADMIN: ['ROLE_IAADMIN', 'ROLE_REPORTING'],
            ROLE_REPORTING: ['ROLE_REPORTING']
        };
        $templateCache.put('ui-grid/uiGridViewport',
            "<div role=\"rowgroup\" class=\"ui-grid-viewport\" ><!-- tbody --><div class=\"ui-grid-canvas\"><div ng-repeat=\"(rowRenderIndex, row) in rowContainer.renderedRows track by $index\" class=\"ui-grid-row\" ng-style=\"Viewport.rowStyle(rowRenderIndex)\"><div role=\"row\" ui-grid-row=\"row\" row-render-index=\"rowRenderIndex\"></div></div></div></div>"
        );

        var deletePopupMsg = "Do you want to delete this user(s)?"
        $scope.accountDiv = false;
        $scope.addCustomer = false;
        $scope.role1 = false;
        $scope.role2 = false;
        $scope.createCompanyId = false;
        $scope.tableCompanyId = false;
        $scope.status = false;
//		 $(".update-btn").addClass("disabled");
        /* $(".delete-btn").addClass("disabled");*/
        $scope.isUpdateDisabled = true;
        $scope.isDeleteDisabled = true;
        $scope.deleteLabel = "Activate/Deactivate";
        $scope.accountEnableStatus;
        $scope.selectedUsers;
        $scope.currentRow;
        var lusername = "";
        window.onresize = function (event) {
            $rootScope.slideContent();
        }
        $scope.name = sessionStorage.getItem("username");
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
        //	$scope.getFavouriteReports();

        $scope.showErrorMessage = function (divId, msg) {

            $rootScope.showErrorMessage(divId, msg);

        }
        $scope.showSuccessMessage = function (divId, msg) {
            $rootScope.showSuccessMessage(divId, msg);
        }
        /* pagination code  start ****************/

        var startLimit = 1;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 0;
        $scope.endLimit = $scope.itemsPerPage;
        var allOfTheData;
        $scope.totalRecords = 0;


        $scope.range = function () {
            var rangeSize = 6;
            var ps = [];
            var start;

            start = $scope.currentPage;
            if (start > $scope.pageCount() - rangeSize) {
                start = $scope.pageCount() - rangeSize + 1;
            }

            for (var i = start; i < start + rangeSize; i++) {
                if (i >= 0)
                    ps.push(i);
            }
            return ps;
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.setPagePrev($scope.currentPage - 1);
                //$scope.currentPage--;
            }
        };

        $scope.DisablePrevPage = function () {
            return $scope.currentPage == 0 ? "disabled" : "";
        };

        $scope.pageCount = function () {
            return Math.ceil($scope.totalRecords / $scope.itemsPerPage) - 1;
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pageCount()) {
                $scope.setPageNext($scope.currentPage + 1);
                //$scope.currentPage++;
            }
        };

        $scope.DisableNextPage = function () {
            return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
        };

        $scope.setPage = function (n) {
            $scope.dataLoading = true;
            $scope.endLimit = ($scope.itemsPerPage * (n + 1));
            if ($scope.endLimit > $scope.totalRecords) {
                var reminder = $scope.totalRecords % $scope.itemsPerPage;
                if (reminder > 0) {
                    $scope.endLimit = $scope.endLimit - ($scope.itemsPerPage - reminder);
                }
            }

            startLimit = ($scope.itemsPerPage * n);
            $scope.createNewDatasource();
            $scope.currentPage = n;
        };

        $scope.setPagePrev = function (n) {
            $scope.dataLoading = true;
            $scope.endLimit = ($scope.itemsPerPage * (n + 1));
            if ($scope.endLimit > $scope.totalRecords) {
                var reminder = $scope.totalRecords % $scope.itemsPerPage;
                if (reminder > 0) {
                    $scope.endLimit = $scope.endLimit - ($scope.itemsPerPage - reminder);
                }
            }

            startLimit = ($scope.itemsPerPage * n);
            $scope.createNewDatasource();
            $scope.currentPage = n;
        };
        $scope.setPageNext = function (n) {
            $scope.dataLoading = true;
            $scope.endLimit = ($scope.itemsPerPage * (n + 1));
            if ($scope.endLimit > $scope.totalRecords) {
                var reminder = $scope.totalRecords % $scope.itemsPerPage;
                if (reminder > 0) {
                    $scope.endLimit = $scope.endLimit - ($scope.itemsPerPage - reminder);
                }
            }

            startLimit = ($scope.itemsPerPage * (n));
            $scope.createNewDatasource();
            $scope.currentPage = n;
        };


        /* pagination code  end ***********************/

        $scope.pageReset = function () {
            $scope.isUpdateDisabled = true;
            $scope.isDeleteDisabled = true;
            $scope.deleteLabel = "Activate/Deactivate";

        }

        /*	 $('.table-AdministrationAdd').click(function(){
                //$('.AdministrationAdd').slideToggle();
                $scope.addCustomer = false;
                $scope.accountDiv =true;

             }); */
        $scope.toCreateNewUserAccount = function () {
            $scope.updateButton = false;
            $scope.createButton = true;
            clickedItem = "createuser";
            $scope.accountDiv = true;
            $scope.addCustomer = true;
            $scope.role1 = true;
            $scope.role2 = false;
            $scope.createCompanyId = true;
            $scope.tableCompanyId = false;
            $scope.status = true;
            $("#firstname").focus();
            $('#email-8').attr('readonly', false);
            $("#username-7").attr('readonly', false);
            $("#username-7").val("");
            $("#firstname").val("");
            $("#lastname").val("");
            $("#password").val("");
            $("#cnfpassword").val("");
            $("#email-8").val("");
            $("#role-8").val("");
            $("#companyId").val("");
            $scope.roleName = $rootScope.role;
            if ($rootScope.role == "ROLE_OTADMIN") {
                $("#customer-8").val("");
//					$("#customer-8").select2()[0].value='';

//					$('#customer-8').attr('readonly', false);
            }
            else {
                $("#customer-8").val("");
            }
            $scope.selectedUserGroup = [];
            //	$(".errors").hide();

        }
        $('.table-emailAdd').click(function () {

            $('.emailAdd').slideToggle();
        });


        $('tr .setting-open').click(function () {
            $('tr').find('ul').removeClass('active-data');
            $(this).siblings('ul').addClass('active-data');
        });

        $('.icon-close').click(function () {
            $(this).parent().parent('ul').removeClass('active-data');
        });

        $scope.userTableGridOptions = oApp.config.userTableGridOptions;
        /*on grid row clicked*/
        $scope.userTableGridOptions.onRegisterApi = function (gridApi) { //extra code
            // console.log(gridApi);
            $scope.gridApi = gridApi;
            //   $scope.gridApi.grid.registerRowsProcessor( $scope.refreshData, 200 );
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {

                $scope.currentRow = row;
                $scope.selectedUsers = $scope.gridApi.selection.getSelectedRows();
                var numRows = $scope.gridApi.selection.getSelectedRows().length;
                selectedUserId = row.entity.userId;
                var msg = 'rows changed ' + $scope.gridApi.selection.getSelectedRows().length;
                $scope.accountDiv = false;
                if (numRows == 1) {
                    console.log("row" + $scope.gridApi.selection.getSelectedRows() + "::" + $scope.gridApi.selection.getSelectedRows().username);
                    // $scope.currentRow=$scope.gridApi.selection.getSelectedRows()

                    $scope.isUpdateDisabled = false;
//			 $scope.isDeleteDisabled = false;
                    $scope.DeleteBtnLabel();
//			 $(".update-btn").removeClass("disabled");
//			 $(".delete-btn").removeClass("disabled");
                }
                else if (numRows >= 2) {
                    $scope.isUpdateDisabled = true;
//			 $scope.isDeleteDisabled = false;
                    $scope.DeleteBtnLabel();
//			 $(".update-btn").addClass("disabled");
//			 $(".delete-btn").remove("disabled");
                }
                else {
                    $scope.isUpdateDisabled = true;
                    $scope.isDeleteDisabled = true;
//			 $(".update-btn").addClass("disabled");
//			 $(".delete-btn").addClass("disabled");
                }
                console.log(msg);


                $scope.UpdateUserBtn = function () {
                    var row = $scope.currentRow;
                    clickedItem = "updateuser";
                    $scope.updateButton = true;
                    $scope.createButton = false;
                    console.log(row);
//         console.log(row.entity.companyName);
                    $scope.accountDiv = true;
                    $scope.addCustomer = false;
                    $scope.role1 = false;
                    $scope.role2 = true;
                    $scope.createCompanyId = false;
                    $scope.tableCompanyId = false;
                    $scope.status = false;
                    /* To Display Values in Form Elements  When Table Row is Clicked*/
                    $scope.activeUserGroups = userGroupList;
                    $("#firstname").val(row.entity.firstName);
                    $scope.firstname = row.entity.firstName;
//			$scope.firstname=row.entity.firstName;
                    $("#lastname").val(row.entity.lastName);
//			$scope.lastname=row.entity.lastName;
                    $("#password").val(row.entity.password);
                    $scope.password = row.entity.password;
                    $("#cnfpassword").val(row.entity.password);
                    $scope.passwordConfirmation = row.entity.password;
                    $("#orgPassword").val(row.entity.password);// for check password is change for not

//			$("#email-8").val(row.entity.email) ;
                    $scope.mail = row.entity.email;
                    $('#email-8').attr('readonly', true);
//			$("#username-7").val(row.entity.username) ;
                    $scope.userName = row.entity.username;
                    $("#username-7").attr('readonly', true);
//			$("#customer-8").val(row.entity.companyName);

                    $scope.tablerole = row.entity.roleName;


                    //	$('#customer-8').attr('readonly', true);
                    $("#role-8").val(row.entity.status);
                    $scope.selectedUserGroup = row.entity.userGroupName;
//			$(".errors").hide();
                    if ($scope.myForm.$invalid) {
                        //		$(this).parent().parent().find(".errors").show();
                    }


                    updatePage();
                    //$("#edit_role").select2()[0].value=row.entity.roleName;
                    $scope.tablerole = row.entity.roleName;
//			$("#customer-8").select2().select2('val',row.entity.companyName);
                    if ($rootScope.role == "ROLE_OTADMIN") {
                        //	$("#customer-8").select2().select('val',row.entity.companyName);
//				$("#customer-8").select2()[0].value=row.entity.companyName;

                        $("#customer-8").val(row.entity.companyName);
                        $scope.customer = row.entity.companyName;

                    }
                    else {
                        $("#customer-8").val(row.entity.companyName);
                    }

                }

                function updatePage() {
                    $("#create_new_user_label").hide();
                    $("#user_list_label").hide();
                    //$("#user_edit_label").show();
                    //$("#create_device_body_div").hide();
                    $("#user_create_div").show();
                    $("#user_list_div").hide();
                    $("#cancel_user_edit_label").show();

                }


                $scope.UpdateUser = function () {
                    //alert("hai");
                    var username = $("#username-7").val();
                    var password = $("#password").val();
                    //var matchingPassword = $("#cnfpassword").val();
                    var status = $scope.currentRow.entity.status;
                    var firstName = $("#firstname").val();
                    var lastName = $("#lastname").val();
//			 var companyId        =	 $("#companyId").val();
                    var email = $("#email-8").val();
                    var roleName = $(".edit-role").val();
                    //var dbPassword = $("#orgPassword").val();
//			 var companyName      = $("#customer-8").select2().select2('val');
                    var companyName;
                    if ($rootScope.role == "ROLE_OTADMIN") {
                        companyName = $("#customer-8").val();
                    }
                    else {
                        companyName = $("#customer-8").val();
                    }
                    var userGroupName = $scope.selectedUserGroup;
                    $scope.dataLoading = true;
                    /*To Update User in Useradminstration*/
                    if (clickedItem == "createuser") {
                    }
                    else {


                        if ($scope.myForm.$valid) {
                            var data = {
                                username: username,
                                //password: password,
                                //confirmPassword: matchingPassword,
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                companyName: companyName,
                                userGroupName: userGroupName,
                                roleName: roleName,
                                //dbPassword: dbPassword
                            };
                            console.log(data);
                            promise = AppServices.UpdateUserInUserAdminstration(data, token);
                            promise.then(
                                function (data) {

                                    row.entity.firstName = firstName;
                                    row.entity.lastName = lastName;
                                    row.entity.username = username
                                    row.entity.status = status;
                                    row.entity.email = email;
                                    row.entity.roleName = roleName;
                                    row.entity.companyName = companyName;
                                    // 	$rootScope.Message = "user updated successfully";
                                    // $('#MessageColor').css("color", "green");
                                    // $('#MessagePopUp').modal('show');

                                    //$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);

                                    $scope.dataLoading = false;
                                    $("#cancel_user_edit_label").hide();
                                    $("#create_new_user_label").show();
                                    $("#user_create_div").hide();
                                    $("#user_edit_div").hide();
                                    $("#edit_device_body_div").hide();
                                    $("#user_list_div").show();
                                    $scope.showSuccessMessage('input_user_error_message', "User updated successfully");
                                },
                                function (err) {
                                    console.log(err);
                                    $scope.showErrorMessage('input_user_error_message', "Error occured during updation");
                                    //	$rootScope.Message = "error occured during updation";
                                    //	 $('#MessageColor').css("color", "green");
                                    //	 $('#MessagePopUp').modal('show');
                                    //	$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
                                    $scope.dataLoading = false;
                                }
                            );
                        }
                        else {
                            //	 $scope.showErrorMessage('input_user_error_message',"Error occured during updation");
                            $(this).parent().parent().find(".errors").show();
                            $scope.dataLoading = false;
                        }

                    }
                }
            });

        };
        /*$scope.filter = function() {
            $scope.gridApi.grid.refresh();
          };*/
//var allFilterdata=allOfTheData;
        var filterType = "";
        $scope.singleFilter = function () {
            // var allFilterdata=allOfTheData;
            filterType = function (item) {
                return item.companyName.toLowerCase().indexOf($scope.searchText.toLowerCase() || '') !== -1
                    || item.status.toLowerCase().indexOf($scope.searchText.toLowerCase() || '') !== -1
                    || item.firstName.toLowerCase().indexOf($scope.searchText.toLowerCase() || '') !== -1
                    || item.email.toLowerCase().indexOf($scope.searchText.toLowerCase() || '') !== -1
                    || item.roleName.toLowerCase().indexOf($scope.searchText.toLowerCase() || '') !== -1
                    || item.username.toLowerCase().indexOf($scope.searchText.toLowerCase() || '') !== -1;

            }
            $scope.userTableGridOptions.data = $filter('filter')(allOfTheData, filterType, $scope.searchText);
            //$scope.userTableGridOptions.data = $scope.userTableGridOptions.data.slice(0, $scope.endLimit);

        };
        $scope.cancelUserCreate = function () {
            $scope.myForm.$setPristine();
            $scope.myForm.$setUntouched();
        }

        //method for editing password
        $scope.editPassBtn = function(userId){
            //open Modal
            console.log("Inside Method, userId "+userId);
            $scope.openModal(userId);

        }

        $scope.modal = {};
        $scope.openModal = function (userId) {
            modal = $uibModal.open({
                templateUrl: 'editPassModal.html',
                scope: $scope
            });
            $scope.modalInstance = modal;
            $scope.modal.title = "Edit Password";
            $scope.modal.userId = userId;
            return modal.result
        };

        $scope.save = function () {
            var jsonArray = $("form#addRowForm").serializeArray();
            var result = {};
            for (var i in jsonArray) {
                var name = jsonArray[i].name;
                var value = jsonArray[i].value;
                result[name] = value;
            }
            $("#dataLoadingDM").show();
            console.log(JSON.stringify(result));
            console.log("UserId :: "+$scope.modal.userId);
            promise = AppServices.changePassword(token,$scope.modal.userId,result['pwd'],result['matchingPwd']);
            promise.then(function (data) {
                $scope.err = false;
                toastr.success('Password Changed Successfully !', 'Success!')
                console.info(JSON.stringify(data));
                //Hide page Loader
                $("#dataLoadingDM").hide();
            }, function (err) {
                $scope.err = true;
                toastr.error('Unable to change password !', 'Failure!')
                //Hide page Loader
                $("#dataLoadingDM").hide();
                console.log(err);
            });
            $scope.modalInstance.close('Saving Data !');
        };

        $scope.cancel = function () {
            $scope.modalInstance.close('Cancelled')
        };
        $scope.cancelUserEdit = function () {
            $("#cancel_user_edit_label").hide();
            $("#create_new_user_label").show();
            $("#user_create_div").hide();
            $("#user_edit_div").hide();
            $("#edit_device_body_div").hide();
            $("#user_list_div").show();
            $scope.myForm.$setPristine();
            $scope.myForm.$setUntouched();
        }
        $scope.showAllUsersLabel = function () {
            $("#user_list_div").show();
            $("#user_create_div").hide();
            $("#user_edit_div").hide();
            $("#user_list_label").hide();
            $("#show_user_details_div").hide();
            $("#create_new_user_label").show();
            $("#cancel_user_edit_label").hide();
            $("#cancel_user_create_label").hide();

        }

        $scope.assignUserOfGroup = function () {

            $("#assign_user").show();
            $("#user_list_div").hide();
            $("#user_create_div").hide();
            $("#user_edit_div").hide();
            $("#user_list_label").hide();
            $("#show_user_details_div").hide();
            $("#assign_user_cancel_label").show();
            $("#create_new_user_label").hide();
            $("#cancel_user_edit_label").hide();
            $("#cancel_user_create_label").hide();

        }
        $scope.cancelAssignUserLabel = function () {
            $("#user_list_div").show();
            $("#user_create_div").hide();

            $("#group_list_label").show();
            $("#user_edit_div").hide();
            $("#user_list_label").hide();
            $("#show_user_details_div").hide();
            $("#create_new_user_label").show();
            $("#cancel_user_edit_label").hide();
            $("#cancel_user_create_label").hide();
            $("#assign_user_cancel_label").hide();
            $("#assign_user").hide();

        }


        /*Create user*/
        $scope.CreateUser = function () {

            var username = $("#username-7").val();
            var password = $("#password").val();
            var matchingPassword = $("#cnfpassword").val();
            var status = $("#role-8").val();
            var firstName = $("#firstname").val();
            var lastName = $("#lastname").val();
            var companyId = $("#companyId").val();
            var email = $("#email-8").val();
            var roleName = $("#role").val();
            var companyName;
            if ($rootScope.role == "ROLE_OTADMIN") {
                companyName = $("#customer-8").val().trim();
            }
            else {
                companyName = $("#customer-8").val().trim();
            }
            var userGroupName = $scope.selectedUserGroup;

            var newuserdata = {
                username: username,
                status: status,
                firstName: firstName,
                lastName: lastName,
                email: email,
                roleName: roleName,
                companyName: companyName,
                userGroupName: userGroupName
            };
            if (clickedItem == "createuser") {

                if ($scope.myForm.$valid) {
                    var data = {
                        username: username,
                        password: password,
                        matchingPassword: matchingPassword,
                        status: status,
                        firstName: firstName,
                        lastName: lastName,
                        companyId: companyId,
                        email: email,
                        roleName: roleName,
                        companyName: companyName,
                        userGroupName: userGroupName
                    };

                    promise = AppServices.CreateUserinUserAaminstration(data, token);
                    promise.then(
                        function (data) {


                            $rootScope.Message = data.status;
                            if (data.status == "error") {
                                /*$rootScope.Message=data.errorDescription;
                                $('#MessageColor').css("color", "red");
                                 $('#MessagePopUp').modal('show');*/
                                $scope.showErrorMessage('input_user_error_message', data.errorDescription);

                            }
                            if (data.status == "success") {
                                $scope.userTableGridOptions.data.push(newuserdata);
                                /*$rootScope.Message="user created successfully";
                                 $('#MessageColor').css("color", "green");
                                 $('#MessagePopUp').modal('show');
                                 $scope.cancel();*/
                                //	 $("#input_group_error_message").text('User created successfully');
                                //		$("#input_group_error_message").css('color', 'green');
                                //		$("#input_group_error_message").show();

                                $scope.userTableData();

                                $scope.showAllUsersLabel();
                                $scope.showSuccessMessage('input_user_error_message', "User created successfully");
                            }

//				$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);

                        },
                        function (err) {
                            $scope.showErrorMessage('input_user_error_message', err.responseJSON.message);
                            /*   $rootScope.Message = err.responseJSON.message;
                             $('#MessageColor').css("color", "red");
                             $('#MessagePopUp').modal('show');
                            $timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);*/

                        }
                    );

                }
                else {
                    // $scope.showErrorMessage('input_user_error_message',"Error occured during updation");
                    //	$(this).parent().parent().find(".errors").show();
                    //	 $scope.dataLoading=false;
                }

            }

        }


        /*  To get User Table data For Useradminstration */
        $scope.userTableData = function () {
            $scope.dataLoading = true;
            $scope.pageReset();
            $scope.searchText = "";
            promise = AppServices.GetuserTableData(userId, token);
            promise.then(
                function (data) {
                    $scope.totalRecords = data.length;
                    //	allOfTheData = data;
                    $scope.userTableGridOptions.data = data;
                    allOfTheData = $scope.userTableGridOptions.data;
                   // $scope.userTableGridOptions.data = data.slice(0, $scope.itemsPerPage);
                    //console.log($scope.serverSettingsGridOptions.data[0]);
                    $scope.gridApi.selection.selectRow($scope.userTableGridOptions.data[0]); //extra code
                    $scope.dataLoading = false;

                },
                function (err) {
                    $scope.dataLoading = false;
                }
            );
        }
        $scope.getTableHeight = function () {
            var rowHeight = 40; // your row height
            var headerHeight = 58; // your header height
            return {
                height: ($scope.userTableGridOptions.data.length * rowHeight + headerHeight) + "px"
            };
        };
        $scope.createNewDatasource = function () {
            $scope.dataLoading = true;
            //$scope.userTableGridOptions.data = allOfTheData.slice(startLimit, $scope.endLimit);
            $scope.dataLoading = false;
        }
        $scope.cancel = function () {
            $scope.accountDiv = false;
        }
        /*
            Function to get list of customers
        */
        $scope.customerList = function () {
            promise = AppServices.GetcustomerList(userId, token);
            promise.then(
                function (data) {

                    for (var i = 0; i < data.customerDetails.length; i++) {

                        customerList[i] = data.customerDetails[i].customerName;

                    }
                    $scope.customers = customerList;
                    if ($rootScope.role == "ROLE_OTADMIN") {

                        /* $.getScript('//cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js',function(){
                                $("#customer-8").select2({
                                });
                         });*/
                        /*	 $( "#customer-8" ).autocomplete({
                            source: customerList
                                }); */
                    } else {
                        $("#customer-8").val(customerList);
                    }

                },
                function (err) {
                    console.log(err);
                }
            );
        }

        $scope.userTableData();
        $scope.customerList();
        /*Create Customer*/
        $scope.createCustomer = function () {


//	groupSelector.val(userGroupID).trigger("change"); 

            customerName = $("#customer_name").val();
            if (customerName == '') {
                $("#customer_name-msg").show();
                return;
            }
            else {
                $scope.dataLoadingCustomer = true;
                promise = AppServices.createCustomerUserAdministration(customerName, token);
                promise.then(
                    function (data) {

                        if (data.errorDescription == "customer already exists") {
                            //$scope.errorMessage = true;
                            /*		$rootScope.Message = data.errorDescription;
                             $('#MessageColor').css("color", "green");
                             $('#MessagePopUp').modal('show');
                            $timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);*/
                            $scope.showErrorMessage('input_user_error_message', data.errorDescription);
                        }
                        if (data.status == "success") {

                            //	$("#customer_name").val("");
                            //	$( "#customer-8" ).val(customerName);
//					$("#customer-8").select2().select2('val',customerName);
                            if ($rootScope.role == "ROLE_OTADMIN") {
                                //	$("#customer-8").select2().select2('val',customerName);
                                //	$("#customer-8").append ('<option value="' + customerName+ '">' + customerName+ '</option>')
                                //$("#customer-8").select2()[0].value =customerName;
                                customerList.push(customerName);
                                $("#customer-8").val(customerName);
                                $scope.customer = customerName;
                            }
                            else {
                                $("#customer-8").val(customerName);
                            }

                        }
                        $scope.dataLoadingCustomer = false;
                        $('.emailAdd').slideToggle();
                    },
                    function (err) {
                        $scope.dataLoadingCustomer = false;
                    }
                );

            }


        }
        /*Close Create Customer popup*/
        $scope.closerCreatePop = function () {

            $("#customer_name").val("");
            $('.emailAdd').slideToggle();
        }

        $scope.userGroupList = function () {


            promise = AppServices.GetActiveuserGroupsData(userId, token);
            promise.then(
                function (data) {
                    $scope.activeUserGroups = data;
                    userGroupList = $scope.activeUserGroups;

                },
                function (err) {

                }
            );


        }
        $scope.userGroupList();

        $scope.getCheckedUserGroup = function (usergroup) {
            var idx = $scope.selectedUserGroup.indexOf(usergroup);

            // is currently selected
            if (idx > -1) {
                $scope.selectedUserGroup.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.selectedUserGroup.push(usergroup);
            }
            /* alert(""+checkvalue);
             $scope.selectedUserGroup.push(checkvalue);*/
        }
        $scope.deleteUser = function (userNames, accountEnableStatus) {
            $scope.dataLoading = true;
//	var userNames=$(".d-username").val();
            var oldStatus = accountEnableStatus;
            promise = AppServices.deleteUserAdministration(token, userNames, accountEnableStatus);
            promise.then(
                function (data) {
                    $rootScope.Message = data.status;
                    if (data.status == "error") {
                        $scope.showErrorMessage('input_user_error_message', data.errorDescription);
                        /*	$rootScope.Message=data.errorDescription;
                            $('#MessageColor').css("color", "red");
                             $('#MessagePopUp').modal('show');
                             $timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);*/
                    }
                    if (data.status == "success") {

                        /*$rootScope.Message="User update successfully";
                         $('#MessageColor').css("color", "green");
                         $('#MessagePopUp').modal('show');
                         $scope.cancel();
                         $timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);*/
                        $scope.showSuccessMessage('input_user_error_message', "User update successfully");
                        if (oldStatus == 0) {
                            $scope.currentRow.entity.status = "INACTIVE";// for show status text after update in db
                        }
                        else if (oldStatus == 1) {
                            $scope.currentRow.entity.status = "ACTIVE";
                            ;
                        }
                        // $scope.userTableData();
                    }
                    $scope.dataLoading = false;
                },
                function (err) {
                    console.log("Error" + err.statusText)
                    $scope.showErrorMessage('input_user_error_message', "Unable to process");
                    /*	  $rootScope.Message = err.responseJSON.message;

                             $('#MessageColor').css("color", "red");
                             $('#MessagePopUp').modal('show');
                            $timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);*/
                    $scope.dataLoading = false;
                }
            );


        }
        $scope.DeleteUserBtn = function () {
            var userNames;
            var isComma = false;
            userNames = "'" + $scope.currentRow.entity.username + "'";
            /*	 for(var uIndex in $scope.selectedUsers){

                     if(isComma){
                         userNames=	 userNames+","+ "'"+$scope.selectedUsers[uIndex].username+ "'";

                     }
                     else{
                         userNames= "'"+$scope.selectedUsers[uIndex].username+"'";
                         isComma=true;
                     }
                 }*/
            console.log("userNames " + userNames);
            $scope.DeleteBtnLabel();
            if (window.confirm(deletePopupMsg)) {
                $scope.deleteUser(userNames, $scope.accountEnableStatus);
            }

        }
        $scope.DeleteBtnLabel = function () {
            $scope.isDeleteDisabled = true;
            $scope.deleteLabel = "Activate/Deactivate";
            var isActiveCount = 0;
            var isDeactiveCount = 0;
            // for(var uIndex in $scope.selectedUsers){
            if ($scope.currentRow.entity.status == 'ACTIVE') {
//			 userNames=	 userNames+","+ "'"+$scope.selectedUsers[uIndex].username+ "'";
                //	 isActiveCount++;
                $scope.deleteLabel = "Deactivate";
                deletePopupMsg = "Do you want to deactivate this user(s)?"
                $scope.isDeleteDisabled = false;
                $scope.accountEnableStatus = 0;
            }
            else {
                $scope.deleteLabel = "Activate";
                deletePopupMsg = "Do you want to activate this user(s)?"
                $scope.accountEnableStatus = 1;
                $scope.isDeleteDisabled = false;
                //	 isDeactiveCount++;
            }
            // }
            /*	if($scope.selectedUsers.length==isActiveCount){
                    $scope.deleteLabel="Deactivate";
                    deletePopupMsg="Do you want to deactivate this user(s)?"
                     $scope.isDeleteDisabled = false;
                     $scope.accountEnableStatus=0;
                }
                if($scope.selectedUsers.length==isDeactiveCount){
                    $scope.deleteLabel="Activate";
                    deletePopupMsg="Do you want to activate this user(s)?"
                     $scope.accountEnableStatus=1;
                     $scope.isDeleteDisabled = false;
                }*/

        }

        $scope.pageReset();
        /* assign devices to user starting */
        $scope.assignDeviceToUser = function () {
            $scope.allDeviceData();
            $scope.selectedDeviceData();
            $("#user_list_div").hide();
            $("#user_create_div").hide();
            $("#user_edit_div").hide();
            $("#user_list_label").hide();
            $("#show_user_details_div").hide();
            $("#create_new_user_label").hide();
            $("#cancel_user_edit_label").hide();
            $("#cancel_user_create_label").hide();
            $("#cancel_assign_device_label").show();
            $("#assign_device_div").show();

        }
        $scope.cancelAssignDeviceToUser = function () {

        }


        $scope.allDeviceGridOptions = oApp.config.allDeviceGridOptions;
        /*on grid row clicked*/
        $scope.allDeviceGridOptions.onRegisterApi = function (gridApi) { //extra code
            // console.log(gridApi);
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {

                console.log('allDeviceGridOptions ', row.entity);
                deviceId = row.entity.deviceId;

            });
        };

        $scope.allDeviceData = function () {
            promise = AppServices.getDevicesNotAvailableForUser(token, selectedUserId);
            promise.then(
                function (data) {
                    $scope.allDeviceGrid = data;
                    $scope.allDeviceGridOptions.data = data;
                    //console.log($scope.serverSettingsGridOptions.data[0]);
                    $scope.gridApi.selection.selectRow($scope.allDeviceGridOptions.data[0]); //extra code
                },
                function (err) {

                }
            );
        }

        $scope.selectedDeviceGridOptions = oApp.config.selectedDeviceGridOptions;
        /*on grid row clicked*/
        $scope.selectedDeviceGridOptions.onRegisterApi = function (gridApi) { //extra code
            // console.log(gridApi);
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {

                console.log('selectedDeviceGridOptions ', row.entity);
                deviceId = row.entity.deviceId;


            });
        };


        $scope.selectedDeviceData = function () {
            promise = AppServices.getDevicesAvailableForUser(token, selectedUserId);
            promise.then(
                function (data) {
                    $scope.selectedDeviceGrid = data;
                    $scope.selectedDeviceGridOptions.data = data;
                    //console.log($scope.serverSettingsGridOptions.data[0]);
                    $scope.gridApi.selection.selectRow($scope.selectedDeviceGridOptions.data[0]); //extra code
                },
                function (err) {

                }
            );
        }

        $scope.addDevice = function () {
            promise = AppServices.assignDeviceToUser(token, selectedUserId, deviceId);
            promise.then(
                function (data) {
                    if (data.status == "success") {

                        $scope.allDeviceData();
                        $scope.selectedDeviceData();
                    } else {
                        console.log("error occured");
                    }


                },
                function (err) {

                }
            );

        }

        $scope.removeDevice = function () {
            promise = AppServices.assignDeviceToUser(token, userId, deviceId);
            promise.then(
                function (data) {
                    if (data.status == "success") {

                        $scope.allDeviceData();
                        $scope.selectedDeviceData();
                    } else {
                        console.log("error occured");
                    }


                },
                function (err) {

                }
            );

        }


        /*Assign devices to user end*/
        /*$('#myForm input ' ).blur(function() {
            if($scope.myForm.$invalid){
                $(this).parent().parent().find(".errors").show();
            }
            });*/

        /*$scope.UpdateUserBtn=function(){
            var row=$scope.currentRow;
             clickedItem ="updateuser";
             $scope.updateButton =true;
             $scope.createButton =false;
             console.log(row);
             console.log(row[0].companyName);
                    $scope.accountDiv =true;
                $scope.addCustomer = false;
                $scope.role1 = false;
                $scope.role2 = true;
                $scope.createCompanyId = false;
                $scope.tableCompanyId = false;
                $scope.status =false;
                 To Display Values in Form Elements  When Table Row is Clicked
                $scope.activeUserGroups=	userGroupList;
                $("#firstname").val(row[0].firstName) ;
                $scope.firstname=row[0].firstName;
        //		$scope.firstname=row[0].firstName;
                $("#lastname").val(row[0].lastName) ;
        //		$scope.lastname=row[0].lastName;
        //		$("#password").val(row[0].password) ;
                $scope.password=row[0].password;
        //		$("#cnfpassword").val(row[0].password) ;
                $scope.passwordConfirmation=row[0].password;
                $("#orgPassword").varow.entity0].password) ;// for check password is change for not

        //		$("#email-8").val(row[0].email) ;
                $scope.mail=row[0].email;
                $('#email-8').attr('readonly', true);
        //		$("#username-7").val(row[0].username) ;
                $scope.userName=row[0].username;
                $("#username-7").attr('readonly', true) ;
        //		$("#customer-8").val(row.entity.companyName);

                $scope.tablerole =row[0].roleName;

                $("#edit_role").select2()[0].value=row[0].roleName;
        //		$("#customer-8").select2().select2('val',row.entity.companyName);
                if($rootScope.role=="ROLE_OTADMIN"){
                //	$("#customer-8").select2().select('val',row[0].companyName);
                    $("#customer-8").select2()[0].value=row[0].companyName;

                }
                else{
                    $("#customer-8").val(row[0].companyName);
                }
            //	$('#customer-8').attr('readonly', true);
                $("#role-8").val(row[0].status);
                $scope.selectedUserGroup=row.entity.userGroupName;
        //		$(".errors").hide();
                if($scope.myForm.$invalid){
            //		$(this).parent().parent().find(".errors").show();
                }



                updatePage();

        }*/
        /************************************************************************************************************************************************************/

        /*  user group data start */

        var startLimitUG = 1;
        $scope.itemsPerPageUG = 10;
        $scope.currentPageUG = 0;
        $scope.endLimitUG = $scope.itemsPerPage;
        var allOfTheDataUG;
        $scope.totalRecordsUG = 0;


        $scope.rangeUG = function () {
            var rangeSize = 6;
            var ps = [];
            var start;

            start = $scope.currentPage;
            if (start > $scope.pageCountUG() - rangeSize) {
                start = $scope.pageCountUG() - rangeSize + 1;
            }

            for (var i = start; i < start + rangeSize; i++) {
                if (i >= 0)
                    ps.push(i);
            }
            return ps;
        };

        $scope.prevPageUG = function () {
            if ($scope.currentPageUG > 0) {
                $scope.setPagePrevUG($scope.currentPageUG - 1);
                //$scope.currentPage--;
            }
        };

        $scope.DisablePrevPageUG = function () {
            return $scope.currentPageUG == 0 ? "disabled" : "";
        };

        $scope.pageCountUG = function () {
            return Math.ceil($scope.totalRecordsUG / $scope.itemsPerPageUG) - 1;
        };

        $scope.nextPageUG = function () {
            if ($scope.currentPageUG < $scope.pageCountUG()) {
                $scope.setPageNextUG($scope.currentPageUG + 1);
                //$scope.currentPage++;
            }
        };

        $scope.DisableNextPageUG = function () {
            return $scope.currentPageUG === $scope.pageCountUG() ? "disabled" : "";
        };

        $scope.setPageUG = function (n) {
            $scope.dataLoading = true;
            $scope.endLimitUG = ($scope.itemsPerPage * (n + 1));
            if ($scope.endLimitUG > $scope.totalRecordsUG) {
                var reminder = $scope.totalRecordsUG % $scope.itemsPerPageUG;
                if (reminder > 0) {
                    $scope.endLimitUG = $scope.endLimitUG - ($scope.itemsPerPageUG - reminder);
                }
            }

            startLimitUG = ($scope.itemsPerPageUG * n);
            $scope.createNewDatasourceUG();
            $scope.currentPageUG = n;
        };

        $scope.setPagePrevUG = function (n) {
            $scope.dataLoading = true;
            $scope.endLimitUG = ($scope.itemsPerPageUG * (n + 1));
            if ($scope.endLimitUG > $scope.totalRecordsUG) {
                var reminder = $scope.totalRecordsUG % $scope.itemsPerPageUG;
                if (reminder > 0) {
                    $scope.endLimitUG = $scope.endLimitUG - ($scope.itemsPerPageUG - reminder);
                }
            }

            startLimitUG = ($scope.itemsPerPageUG * n);
            $scope.createNewDatasourceUG();
            $scope.currentPageUG = n;
        };
        $scope.setPageNextUG = function (n) {
            $scope.dataLoading = true;
            $scope.endLimitUG = ($scope.itemsPerPageUG * (n + 1));
            if ($scope.endLimitUG > $scope.totalRecordsUG) {
                var reminder = $scope.totalRecordsUG % $scope.itemsPerPageUG;
                if (reminder > 0) {
                    $scope.endLimit = $scope.endLimitUG - ($scope.itemsPerPageUG - reminder);
                }
            }

            startLimitUG = ($scope.itemsPerPageUG * (n));
            $scope.createNewDatasourceUG();
            $scope.currentPageUG = n;
        };

        $scope.singleFilterUserGroup = function () {
            $scope.addUsergroupsGridOptions.data = $filter('filter')(allOfTheDataUG, $scope.searchTextUserGroup, undefined);
           // $scope.addUsergroupsGridOptions.data = $scope.addUsergroupsGridOptions.data.slice(0, $scope.endLimit);
        }
        $scope.singleFilterForAllUser = function () {
            $scope.allusersgroupGridOptions.data = $filter('filter')($scope.allusersgroupGrid, $scope.searchTextForAlluser, undefined);
           // $scope.allusersgroupGridOptions.data = $scope.allusersgroupGridOptions.data.slice(0, $scope.endLimit);
        }
        $scope.singleFilterForExistUser = function () {
            $scope.existingusersGridOptions.data = $filter('filter')($scope.existingusersGridData, $scope.searchTextForExistuser, undefined);
            //$scope.existingusersGridOptions.data = $scope.existingusersGridOptions.data.slice(0, $scope.endLimit);
        }
        $scope.singleFilterForAllDevice = function () {
            filterType = "";
            var searchText = $scope.searchTextForAllDevice.toLowerCase();
            filterType = function (item) {
                return item.deviceId.toString().indexOf(searchText || '') !== -1
                    || item.userName.toLowerCase().indexOf(searchText || '') !== -1
                    || (item.msisdn != null ? item.msisdn.toLowerCase() : "").indexOf(searchText || '') !== -1
                    || (item.imei != null ? item.imei.toLowerCase() : "").indexOf(searchText || '') !== -1;

            }
            $scope.allDeviceGridOptions.data = $filter('filter')($scope.allDeviceGrid, filterType, searchText);
            //$scope.allDeviceGridOptions.data = $scope.allDeviceGridOptions.data.slice(0, $scope.endLimit);
        }
        $scope.singleFilterForSelectedDevice = function () {

            filterType = "";
            var searchText = $scope.searchTextForSelectedDevice.toLowerCase();
            filterType = function (item) {
                return item.deviceId.toString().indexOf(searchText || '') !== -1
                    || item.userName.toLowerCase().indexOf(searchText || '') !== -1
                    || (item.msisdn != null ? item.msisdn.toLowerCase() : "").indexOf(searchText || '') !== -1
                    || (item.imei != null ? item.imei.toLowerCase() : "").indexOf(searchText || '') !== -1;

            }

            $scope.selectedDeviceGridOptions.data = $filter('filter')($scope.selectedDeviceGrid, filterType, searchText);
           // $scope.selectedDeviceGridOptions.data = $scope.selectedDeviceGridOptions.data.slice(0, $scope.endLimit);
        }

        $scope.createNewDatasourceUG = function () {
            $scope.dataLoading = true;
            //$scope.addUsergroupsGridOptions.data = allOfTheDataUG.slice(startLimitUG, $scope.endLimitUG);
            $scope.dataLoading = false;
        }
        var deletePopupMsg = "Are you want to delete this user group?";
        $scope.currentRowUserGroup;

        $scope.addUsergroupsGridOptions = oApp.config.addUsergroupsGridOptions;
        $scope.addUsergroupsGridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                console.log(row);

                console.log("row select status " + row.isSelected);
                if (row.isSelected) {
                    $scope.currentRowUserGroup = row.entity;
                    userGroupId = row.entity.userGroupId;
                    groupName = row.entity.userGroupName;
                    $scope.isUpdateDisabled = false;
                    $scope.isDeleteDisabled = false;
                    $scope.isAssignDisabled = false;

                }
                else {
                    $scope.pageReset();
                }
                $scope.assignuser = false;
//	$scope.allusersgroupData();
//	$scope.existingusersData();

            });
        };

//  for displaying usergroups list

        $scope.pageReset = function () {
            $scope.isUpdateDisabled = true;
            $scope.isDeleteDisabled = true;
            $scope.isAssignDisabled = true;

        }
        $scope.pageReset();
        $scope.availableUsergroupsGrid = function () {
            $scope.searchTextUserGroup = "";
            $scope.userDataLoading = true;
            promise = AppServices.getAvailableUsergroupsData(userId, token);
            promise.then(
                function (data) {
                    $scope.totalRecordsUG = data.length;
                    $scope.addUsergroupsGridOptions.data = data;
                    allOfTheDataUG = data;
                   // $scope.addUsergroupsGridOptions.data = data.slice(0, $scope.itemsPerPage);
                    $scope.gridApi.selection.selectRow($scope.addUsergroupsGridOptions.data[0]);
                    $scope.userDataLoading = false;
                },
                function (err) {
                    $scope.userDataLoading = false;
                }
            );
        }


        /*To Show Add User groups Div*/

        $scope.showUsergroups = function () {
            $scope.userDiv = true;
            $scope.assignuser = false;
            $scope.updateButton = false;
            $scope.createButton = true;
            $scope.createNewGroupLabel();
        }

        /*Cancel button */

        $scope.cancel = function () {
            $scope.userDiv = false;
            $scope.assignuser = false;
            $scope.user_group = "";
        }
        /*Function Call  to create New User groups */

        $scope.addUsergroup = function () {
            var usergroup = $("#user_group").val();
            var userid = userId; //$("#user_id").val();
            console.log("user group" + ":" + usergroup + "," + "userid" + ":" + userid);

            if ($scope.usergroupform.$valid) {
                $scope.userDataLoading = true;
                promise = AppServices.addUsers(token, usergroup, userid);
                promise.then(
                    function (data) {

                        $scope.availableUsergroupsGrid();
                        $scope.pageReset();
                        if (data.status == "success") {
                            // $rootScope.Message = "successfully created the usergroup";
                            //$('#MessageColor').css("color", "green");
                            $scope.showSuccessMessage('input_group_error_message', "Group created successfully");
                            /*$("#input_group_error_message").text('Group created successfully');
                             $("#input_group_error_message").css('color', 'green');
                             $("#input_group_error_message").show();*/
                            $scope.user_group = "";
//	 $scope.cancel();
                            $scope.groupListLabel();
                        }
                        if (data.status == "failure") {
//	 $rootScope.Message = "error occured while creating the usergroup";
                            $scope.showErrorMessage('input_group_error_message', "Error occured while creating the usergroup ... try again");
                            /* $("#input_group_error_message").text('Error occured while creating the usergroup ... try again');
                                $("#input_group_error_message").css('color', 'red');
                                 $("#input_group_error_message").show();*/
                            // $('#MessageColor').css("color", "red");
                        }
                        // $('#MessagePopUp').modal('show');
                        //$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
                        // $scope.cancel();
                        $scope.userDataLoading = false;
                    },
                    function (err) {
                        $("#input_group_error_message").text('Error occured while creating the usergroup ... try again');
                        $("#input_group_error_message").css('color', 'red');
                        $("#input_group_error_message").show();
                        //$rootScope.Message = "error occured while creating the usergroup";
                        // $('#MessageColor').css("color", "red");
                        // $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
                        $scope.userDataLoading = false;
                    }
                );
            }
            else {
                //$( "#usergroupform" ).submit();
                $("user_group").focus();
//	$scope.usergroupform.$error = true;
            }
        }


        /*
            Function to add user to list
        */
        $scope.addUser = function () {

            $scope.addinguserData();

        }
        /* unassign user */
        $scope.removeUser = function () {
//   alert("unassign");
            $scope.unassignUserData();
        }

        /*
        for all user group list
        */
        $scope.allusersgroupGridOptions = oApp.config.allusersgroupGridOptions;
        $scope.allusersgroupGridOptions.onRegisterApi = function (gridApi) { //extra code
            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                console.log(row);
                luserId = row.entity.userId;
                customerId = row.entity.customerId;
                lusername = row.entity.username;
                lastName = row.entity.lastName;
            });
        };


        $scope.allusersgroupData = function () {
            $scope.userDataLoading = true;
            promise = AppServices.GetallusersgroupData(token, userGroupId);
            promise.then(
                function (data) {
                    $scope.allusersgroupGrid = data;
                    $scope.allusersgroupGridOptions.data = data;
                    //$scope.gridApi.selection.selectRow($scope.allusersgroupGridOptions.data[0]); //extra code
                    //updateAlluserslist()
                    $scope.userDataLoading = false;
                },
                function (err) {
                    $scope.userDataLoading = false;
                }
            );
        }

        function updateAlluserslist() {
            $('.assign-user').append('<option value="apples">Apples</option><option value="oranges" selected>Oranges</option>');
            $('.assign-user').trigger('bootstrapDualListbox.refresh', true);

        }

        /*
        for existing users

        */
        $scope.existingusersGridOptions = oApp.config.existingusersGridOptions;

        $scope.existingusersGridOptions.onRegisterApi = function (gridApi) { //extra code

            $scope.gridApi = gridApi;
            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                luserId = row.entity.userId;
                userGroupId = row.entity.userGroupId;
                console.log(row);
                //console.log(row.entity.userGroupName);
                console.log(row.entity.userId);
                console.log(groupName);
                console.log(row.entity.customerId);


            });
        };


        $scope.existingusersData = function () {
            $scope.userDataLoading = true;
            promise = AppServices.GetexistingusersData(token, userGroupId, groupName);
            promise.then(
                function (data) {
                    console.log(data);
                    $scope.existingusersGridData = data;
                    $scope.existingusersGridOptions.data = data;

                    //$scope.gridApi.selection.selectRow($scope.existingusersGridOptions.data[0]); //extra code
                    $scope.userDataLoading = false;
                },
                function (err) {
                    $scope.userDataLoading = false;
                }
            );
        }
        /*
            Function for adding user to already existing users
        */
        $scope.addinguserData = function () {
            $scope.userDataLoading = true;
            var adddata = {userGroupName: groupName, username: lusername, lastName: lastName};
            promise = AppServices.GetadduserData(token, groupName, luserId, customerId);
            promise.then(
                function (data) {

                    if (data.status == "success") {
                        //alert(data.status);
                        $scope.existingusersData();
                        $scope.allusersgroupData();
                        //$scope.existingusersGridOptions.data.push(adddata);
                    }

                    else {
                        console.log(data.status);
                    }
                    $scope.userDataLoading = false;

                },
                function (err) {
                    $scope.userDataLoading = false;
                }
            );
        }
        /*
            Function for unassigning user from user group
        */
        $scope.unassignUserData = function () {
            console.log(token);
            console.log(groupName);
            console.log(luserId);
            $scope.userDataLoading = true;
            var adddata = {userGroupName: groupName, username: lusername, lastName: lastName};
            promise = AppServices.GetunassignUserData(token, groupName, luserId);

            promise.then(
                function (data) {

                    if (data.status == "success") {
                        //alert(data.status);
                        $scope.existingusersData();
                        $scope.allusersgroupData();
                    }
                    else
                        console.log(error);
                    $scope.userDataLoading = false;
                },
                function (err) {
                    $scope.userDataLoading = false;
                }
            );
        }

        $scope.availableUsergroupsGrid();
//	$scope.allusersgroupData();

        $scope.assignUsersLoad = function () {
            $scope.userDiv = false;
            $scope.assignuser = true;
            $scope.allusersgroupData();
            $scope.existingusersData();


        }

        $scope.UpdateUserGroupBtn = function () {

            $scope.userDiv = true;
            $scope.assignuser = false;
            $scope.updateButton = true;
            $scope.createButton = false;
            $("#user_group").val(groupName);
            $scope.groupEditLabel();
        }
        $scope.updateUserGroup = function () {
//	userGroupId
            /* $scope.userDiv =true;
             $scope.assignuser= false;
             $scope.updateButton =true;
             $scope.createButton =false;
             $("#user_group").val(groupName);*/

            var groupNameNew = $("#user_group").val();
            if (!$scope.usergroupform.$invalid) {

                $scope.userDataLoading = true;
                promise = AppServices.updateUsergroupData(token, userGroupId, groupNameNew);
                promise.then(
                    function (data) {

                        $scope.availableUsergroupsGrid();
                        $scope.pageReset();
                        if (data.status == "success") {
                            // $rootScope.Message = "successfully update the usergroup";
                            // $('#MessageColor').css("color", "green");
                            //$scope.user_group="";
                            $("#input_group_error_message").text('Group Update successfully');
                            $("#input_group_error_message").css('color', 'green');
                            $("#input_group_error_message").show();
                            $scope.user_group = "";
//	 $scope.cancel();
                            $scope.groupListLabel();
//	 $scope.cancel();
                        }
                        if (data.status == "failure") {
                            // $rootScope.Message = "error occured while creating the usergroup";
                            // $('#MessageColor').css("color", "red");
                            $("#input_group_error_message").text('Error occured while updating the usergroup');
                            $("#input_group_error_message").css('color', 'red');
                            $("#input_group_error_message").show();
                        }
                        $('#MessagePopUp').modal('show');
                        $timeout(function () {
                            $('#MessagePopUp').modal('hide');
                        }, 2000);
                        $scope.cancel();
                        $scope.userDataLoading = false;
                    },
                    function (err) {

//	$rootScope.Message = "error occured while creating the usergroup";
                        // $('#MessageColor').css("color", "red");
                        // $('#MessagePopUp').modal('show');
//	$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
                        $("#input_group_error_message").text('Error occured while updating the usergroup');
                        $("#input_group_error_message").css('color', 'red');
                        $("#input_group_error_message").show();
                        $scope.userDataLoading = false;
                    }
                );
            }
            else {
                //alert("Error..");
                $(this).parent().parent().find(".errors").show();
                $("#user_group").focus();
            }

        }
        $scope.deleteUsergroup = function () {
            $scope.userDataLoading = true;
            promise = AppServices.deleteUsergroupData(token, userGroupId);
            promise.then(
                function (data) {

                    $scope.availableUsergroupsGrid();
                    $scope.pageReset();
                    if (data.status == "success") {
                        $scope.showSuccessMessage('input_group_error_message', "Successfully delete the usergroup");
                        /* $rootScope.Message = "Successfully delete the usergroup";
                         $('#MessageColor').css("color", "green");*/
                        $scope.user_group = "";
                        //	 $scope.cancel();
                    }
                    if (data.status == "failure") {
                        $scope.showErrorMessage('input_group_error_message', "Error occured while creating the usergroup");
                        /* $rootScope.Message = "Error occured while creating the usergroup";
                         $('#MessageColor').css("color", "red");*/
                    }
                    // $('#MessagePopUp').modal('show');
                    //$timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);
                    $scope.cancel();
                    $scope.userDataLoading = false;
                },
                function (err) {
                    $scope.showErrorMessage('input_group_error_message', "Error occured while creating the usergroup");
                    /*$rootScope.Message = "Error occured while creating the usergroup";
                     $('#MessageColor').css("color", "red");
                     $('#MessagePopUp').modal('show');
                    $timeout(function(){ $('#MessagePopUp').modal('hide'); }, 2000);*/
                    $scope.userDataLoading = false;
                }
            );

        }

        $scope.DeleteUserGroupBtn = function () {
            if (userGroupId != '') {
                if (window.confirm(deletePopupMsg)) {
                    $scope.deleteUsergroup();
                }
            }
            else {
                $rootScope.Message = "Usergroup is not selected ";
                $('#MessageColor').css("color", "red");
                $('#MessagePopUp').modal('show');
                $timeout(function () {
                    $('#MessagePopUp').modal('hide');
                }, 2000);
            }

        }


        $scope.getTableHeightUserGroup = function () {
            var rowHeight = 40; // your row height
            var headerHeight = 58; // your header height
            var footerPage = 0;
            return {
                height: ($scope.addUsergroupsGridOptions.data.length * rowHeight + headerHeight + footerPage) + "px"
            };
        };

        $scope.groupListLabel = function () {
            $("#group_create_div").hide();
            $("#group_edit_div").hide();
            $("#group_list_div").show();
            $("#create_new_group_label").show();
            $("#group_list_label").show();
            $("#create_new_group_label").show();
            $("#group_cancel_edit_label").hide();
            $("#input_group_error_message").text('');
            $("#group_cancel_create_label").hide();
            $("#assign_user").hide();
            $("#assign_user_cancel_label").hide();

        }
// $("#create_new_group_label").click(function(){
        $scope.createNewGroupLabel = function () {

            $("#group_create_div").show();
            $("#group_edit_div").hide();
            $("#group_list_div").hide();
            $("#group_list_label").show();
            $("#create_new_group_label").hide();
            $("#group_cancel_edit_label").hide();
            $("#input_group_error_message").text('');
            $("#group_cancel_create_label").show();
            $("#input_group_error_message").text('');
            $("#assign_user").hide();
            $("#assign_user_cancel_label").hide();

        }

        $scope.groupEditLabel = function () {

            $("#group_create_div").show();
            $("#group_list_label").show();
            $("#group_edit_div").hide();
            $("#group_list_div").hide();
            $("#create_new_group_label").hide();
            $("#group_cancel_edit_label").show();
            $("#input_group_error_message").text('');
            $("#assign_user").hide();
            $("#assign_user_cancel_label").hide();
        }

        $scope.groupCancelEditLabel = function () {
            $("#group_create_div").hide();
            $("#group_edit_div").hide();
            $("#group_list_div").show();
            $("#group_list_label").show();
            $("#create_new_group_label").show();
            $("#group_edit_label").hide();
            $("#group_cancel_edit_label").hide();
            $("#assign_user").hide();
            $("#assign_user_cancel_label").hide();
            $("#input_group_error_message").text('');
        }

        $scope.groupCancelCreateLabel = function () {
            $("#group_create_div").hide();
            $("#group_edit_div").hide();
            $("#group_list_div").show();
            $("#group_list_label").show();
            $("#create_new_group_label").show();
            $("#group_edit_label").hide();
            $("#group_cancel_edit_label").hide();
            $("#assign_user").hide();
            $("#assign_user_cancel_label").hide();
            $("#input_group_error_message").text('');
            $("#group_cancel_create_label").hide();
            $scope.usergroupform.$setPristine();

        }
        $scope.DetailUserBtn = function () {
            $("#user_list_div").hide();
            $("#user_create_div").hide();
            $("#user_edit_div").hide();
            $("#user_list_label").show();
            $("#show_user_details_div").show();
            $("#create_new_user_label").hide();
            $("#cancel_user_edit_label").hide();
            $("#cancel_user_create_label").hide();
            $("#assign_user").hide();
            $("#assign_user_cancel_label").hide();
        }
        $scope.assignUserOfGroup = function () {

            $("#assign_user").show();
            $("#assign_user_cancel_label").show();
            $("#group_list_label").show();
            $("#group_create_div").hide();
            $("#group_edit_div").hide();
            $("#group_list_div").hide();

            $("#create_new_group_label").hide();
            $("#group_cancel_edit_label").hide();
            $("#input_group_error_message").text('');

            $scope.assignUsersLoad();
        }
        $scope.cancelAssignUserLabel = function () {
            $("#group_list_label").show();
            $("#create_new_group_label").show();
            $("#group_list_div").show();
            $("#assign_user").hide();
            $("#assign_user_cancel_label").hide();
            $("#group_create_div").hide();
            $("#group_edit_div").hide();
            //$("#group_list_div").hide();

            $("#group_cancel_edit_label").hide();
            $("#input_group_error_message").text('');

        }

        $(function () {

            var assignUser = $('.assign-user').bootstrapDualListbox({
                preserveSelectionOnMove: 'moved',
                moveOnSelect: false
            });


        });

        /* user group data  end*/

        /*************************************************************************************************/
// start datatable demo

        $scope.message = '';

        $scope.myCallback = function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td:eq(2)', nRow).bind('click', function () {
                $scope.$apply(function () {
                    $scope.someClickHandler(aData);
                });
            });
            return nRow;
        };

        $scope.someClickHandler = function (info) {
            $scope.message = 'clicked: ' + info.price;
        };

        $scope.columnDefs = [
            {"mDataProp": "category", "aTargets": [0]},
            {"mDataProp": "name", "aTargets": [1]},
            {"mDataProp": "price", "aTargets": [2]}
        ];

        $scope.overrideOptions = {
            "bStateSave": true,
            "iCookieDuration": 2419200, /* 1 month */
            "bJQueryUI": true,
            "bPaginate": true,
            "bLengthChange": true,
            "bFilter": true,
            "bInfo": true,
            "bDestroy": true
        };


        $scope.sampleProductCategories = [

            {
                "name": "1948 Porsche 356-A Roadster",
                "price": 53.9,
                "category": "Classic Cars",
                "action": "x"
            },
            {
                "name": "1948 Porsche Type 356 Roadster",
                "price": 62.16,
                "category": "Classic Cars",
                "action": "x"
            },
            {
                "name": "1949 Jaguar XK 120",
                "price": 47.25,
                "category": "Classic Cars",
                "action": "x"
            }
            ,
            {
                "name": "1936 Harley Davidson El Knucklehead",
                "price": 24.23,
                "category": "Motorcycles",
                "action": "x"
            },
            {
                "name": "1957 Vespa GS150",
                "price": 32.95,
                "category": "Motorcycles",
                "action": "x"
            },
            {
                "name": "1960 BSA Gold Star DBD34",
                "price": 37.32,
                "category": "Motorcycles",
                "action": "x"
            }
            ,
            {
                "name": "1900s Vintage Bi-Plane",
                "price": 34.25,
                "category": "Planes",
                "action": "x"
            },
            {
                "name": "1900s Vintage Tri-Plane",
                "price": 36.23,
                "category": "Planes",
                "action": "x"
            },
            {
                "name": "1928 British Royal Navy Airplane",
                "price": 66.74,
                "category": "Planes",
                "action": "x"
            },
            {
                "name": "1980s Black Hawk Helicopter",
                "price": 77.27,
                "category": "Planes",
                "action": "x"
            },
            {
                "name": "ATA: B757-300",
                "price": 59.33,
                "category": "Planes",
                "action": "x"
            }

        ];


    });