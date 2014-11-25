'use strict';

app.controller('salesCtrl',function($scope, ngTableParams,salesRecordServices,$filter,$route){
    
    
    // boolean variable will save the data either edit data or save data.
    
    var saveRecord = true;
//    var filterCol = false;
    $scope.newRecords = [];
//    var UserIDclicked=1;
//    var remarkClicked = 1;
    var insertId;

    var records=salesRecordServices.salesRecord();
    records.then(function(msg)
        {
         //console.log(msg.data+'controller');
         $scope.header = true;     
         //$scope.users = msg.data;
         //$scope.header = true;        
         // console.log($scope.users);
        
        $scope.records = msg.data;
        var data = $scope.records;
        $scope.columns = [
               
                { title: 'Transaction Date', field: 'date_of_transaction', visible: true },
                { title: 'User ID', field: 'user_id', visible: false },
                { title: 'Transaction Type', field: 'type_transaction', visible: true },
                { title: 'Transaction Ref.No.', field: 'refrence_no_transaction', visible: true },
                { title: 'Name', field: 'customer_name', visible: true },
                { title: 'Description', field: 'description', visible: true },
                { title: 'Remark', field: 'remark', visible: false },
                { title: 'Amount', field: 'amount', visible: true },
                { title: 'Status', field: 'status', visible: false }
            ];
             $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                filter: {
                    name: 'M'       // initial filter
                }
            }, {
                total: data.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ?
                            $filter('orderBy')(data, params.orderBy()) :
                            data;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
    //-------------------------------------------------------------        
            $('.dropdown-menu').on('click', function(e) {   
            /*     console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'); 
                 UserIDclicked = UserIDclicked+1;
                 remarkClicked = remarkClicked+1;
                // console.log(UserIDclicked+'clickedddd');
                // this condition will trigger when userID is filterd with reloading page..
                 if(UserIDclicked==3){
                      var data1 = $scope.newRecords;
                     UserIDclicked = 1;
                     $('#11'+insertId).remove();
                     console.log('row deleted');
                     $('#table #fbody tr').first().before("<tr id=11"+insertId+"><td id=1"+insertId+"></td><td id=2"+insertId+"></td><td id=3"+insertId+"></td><td id=4"+insertId+"></td><td id=5"+insertId+"></td><td id=6"+insertId+"></td><td id=7"+insertId+" style='display:none;'></td><td id=8"+insertId+"></td><td id=9"+insertId+" style='display:none;'></td><td><a href='' ng-click='edit(user)' data-toggle='modal' data-target='#myModal'> Edit</a> | <a href='' ng-click='del(user)'>Delete</td></tr>");
                    $("#1"+insertId).text(data1.date_of_transaction);
                    $("#2"+insertId).text(data1.user_id);
                    $("#3"+insertId).text(data1.type_transaction);
                    $("#4"+insertId).text(data1.refrence_no_transaction);
                    $("#5"+insertId).text(data1.customer_name);
                    $("#6"+insertId).text(data1.description);
                    //$("#7"+insertId).text(data.remark);
                    $("#8"+insertId).text(data1.amount);
                     //   $("#9"+insertId).text(data.status);
                 }
                 
                 // This condition will trigger when remark is selected form filter col
                 
                if(remarkClicked==3){
                    var data1 = $scope.newRecords;
                    remarkClicked = 1;
                    $('#11'+insertId).remove();
                    console.log('row deleted');
                    $('#table #fbody tr').first().before("<tr id=11"+insertId+"><td id=1"+insertId+"></td><td id=2"+insertId+" style='display:none;'></td><td id=3"+insertId+"></td><td id=4"+insertId+"></td><td id=5"+insertId+"></td><td id=6"+insertId+"></td><td id=7"+insertId+"></td><td id=8"+insertId+"></td><td id=9"+insertId+" style='display:none;'></td><td><a href='' ng-click='edit(user)' data-toggle='modal' data-target='#myModal'> Edit</a> | <a href='' ng-click='del(user)'>Delete</td></tr>");
                    $("#1"+insertId).text(data1.date_of_transaction);
                //  $("#2"+insertId).text(data1.user_id);
                    $("#3"+insertId).text(data1.type_transaction);
                    $("#4"+insertId).text(data1.refrence_no_transaction);
                    $("#5"+insertId).text(data1.customer_name);
                    $("#6"+insertId).text(data1.description);
                    $("#7"+insertId).text(data.remark);
                    $("#8"+insertId).text(data1.amount);
                     //   $("#9"+insertId).text(data.status);
                 } */
                 
            if($(this).hasClass('dropdown-menu-form')) {
                e.stopPropagation();
                    
              }  
            });   
              
         });
         
    
       //export the data of the table into the excel sheel
         
       $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable11').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };
    
    //----------------Filter code------------------------//
    
                $("#searchInput").keyup(function () {
                //split the current value of searchInput
                var data = this.value.split(" ");
                //create a jquery object of the rows
                var jo = $("#fbody").find("tr");
                if (this.value == "") {
                    jo.show();
                    return;
                }
                //hide all the rows
                jo.hide();

                //Recusively filter the jquery object to get results.
                jo.filter(function (i, v) {
                    var $t = $(this);
                    for (var d = 0; d < data.length; ++d) {
                        if ($t.is(":contains('" + data[d] + "')")) {
                            return true;
                        }
                    }
                    return false;
                })
                //show the rows that match.
                .show();
            }).focus(function () {
                this.value = "";
                $(this).css({
                    "color": "black"
                });
                $(this).unbind('focus');
            }).css({
                "color": "#C0C0C0"
            });
            
    //----------------------------------------------------------------//
    //     function which will be trigged after cliking on the edit   //
    //----------------------------------------------------------------//    
       $scope.edit = function(user){
           console.log(user);
            var editRecords=salesRecordServices.editRecord(user);
            editRecords.then(function(msg){
            saveRecord = false;
            console.log(msg.data+"sdffffffffffffffffffffffffffffffffffffffffffffffffffffff");
     
            $scope.updateRecords = [];
            $scope.updateRecords = msg.data;
            var updated = $scope.updateRecords;
            console.log(updated.type_transaction+'type');
            $scope.type = {
                    value: updated.type_transaction
                }
            var type1 = $scope.type;
            console.log(type1);
                        
            $scope.user = { date: updated.date_of_transaction, 
                            type: type1, 
                            userRef : updated.refrence_no_transaction, 
                            name: updated.customer_name, 
                            description: updated.description, 
                            status: updated.status, 
                            remark: updated.remark, 
                            amt: updated.amount,
                            user_id: updated.user_id,
                            old:'Edit'
                        }; 
                 //console.log($scope.type+'editedtype'); 
            });
       },
    
        // below function for update the data form the database..
        $scope.save = function(user){
            // this condition will check that save button is click when user's records edited.
            if(saveRecord==false){
                console.log(user);
                var item = user.type;
                console.log(item.value+'drop down value');
               // console.log(user.name+'name');
                //console.log(user.userRef+'refNO');
                $scope.user1 = {
                    name:user.name,
                    transaction_type : item.value,
                    userRef : user.userRef, 
                    description: user.description, 
                    status: user.status, 
                    remark: user.remark, 
                    amt: user.amt,
                    user_id: user.user_id,
                    date : user.date
                }
                var user2 = $scope.user1;
                console.log(user2.userRef+'ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp');
                //console.log($scope.user1);
           
                var updaterecords=salesRecordServices.updateRecord(user2);
                updaterecords.then(function(msg){
                   
                   console.log(msg.data);
                   console.log(msg.data+'date');
                   var data = msg.data;
                   console.log(data.date+" "+data.id);
                    var id = data.id;
                    var date = data.date;
                    //console.log(user2.transaction_type);
                   
                    
                        $("#1"+id).text(date);
                        $("#2"+id).text(user2.user_id);
                        $("#3"+id).text(user2.transaction_type);
                        $("#4"+id).text(user2.userRef);
                        $("#5"+id).text(user2.name);
                        $("#6"+id).text(user2.description);
                        $("#7"+id).text(user2.remark);
                        $("#8"+id).text(user2.amt);
                        $("#9"+id).text(user2.status);
                   
                    //  $scope.PopulateData(); 
                }); 
                saveRecord = true; 
                $('#myModal').modal('hide');
            }
            // this condition will trigger when new records is inserted..
            else{
                   
                /*    var saleType = user.type;
                    //console.log(date);
                     var newUser = $scope.a = {
                            date : user.date,
                            type : saleType.value,
                            userRef : user.userRef,
                            name: user.name, 
                            description: user.description, 
                            status: user.status, 
                            remark: user.remark, 
                            amt: user.amt   
                    };
                    console.log(newUser);
                    console.log(newUser.date); */
                   
                if ($scope.form.$valid){ 
                    console.log(saveRecord);
                    console.log(user);
                    var item = user.type;
                    console.log(item.value);
                    $scope.user1 = {
                    name:user.name,
                    transaction_type : item.value,
                    userRef : user.userRef, 
                    description: user.description, 
                    status: user.status, 
                    remark: user.remark, 
                    amt: user.amt,
                    date : user.date
                }
                    var user2 = $scope.user1;
                    var newRecords=salesRecordServices.newRecord(user2);
                    newRecords.then(function(msg){
                        console.log(msg.data);
                        console.log(msg.data+"sdfsffffffffffffffffffffffff");
                        //$scope.newRecords = [];
                        $scope.newRecords = msg.data;
                        var data = $scope.newRecords;
                        console.log(data.user_id +'controller');
                        insertId = data.user_id;
                        $('#table #fbody tr').first().before("<tr id=11"+insertId+"><td id=1"+insertId+"></td><td id=2"+insertId+" style='display:none;'></td><td id=3"+insertId+"></td><td id=4"+insertId+"></td><td id=5"+insertId+"></td><td id=6"+insertId+"></td><td id=7"+insertId+" style='display:none;'></td><td id=8"+insertId+"></td><td id=9"+insertId+" style='display:none;'></td><td><a href='' ng-click='edit(user)' data-toggle='modal' data-target='#myModal'> Edit</a> | <a href='' ng-click='del(user)'>Delete</td></tr>");
                        $("#1"+insertId).text(data.date_of_transaction);
                     //   $("#2"+insertId).text(data.user_id);
                        $("#3"+insertId).text(data.type_transaction);
                        $("#4"+insertId).text(data.refrence_no_transaction);
                        $("#5"+insertId).text(data.customer_name);
                        $("#6"+insertId).text(data.description);
                     //   $("#7"+insertId).text(data.remark);
                        $("#8"+insertId).text(data.amount);
                     //   $("#9"+insertId).text(data.status);
                        
                      
                        
                      
                        //====================================
                        
            
            //==============================================
                        //filterCol = true;
                         
                        $('#myModal').modal('hide'); 
                    }); 
                
                }  
                 
            }   
          
        },
        
        // below function will delete the date form the database
        
        $scope.del = function(user2){
            bootbox.confirm("Do You really want to delete the user's details !!!",function(didConfirm){
                     	if (didConfirm === true) {
                            console.log(user2);
                            var deleteRecords=salesRecordServices.deleteRecord(user2);
                            deleteRecords.then(function(msg){
                                var id=msg.data;
                                //$('#11'+id).remove();
                               $('#11'+id).remove();
                               console.log(id+"hello");
                            }); 
                        }
                    });
            
        },
        
        $scope.openPopup = function(){
                $scope.user = {
                                new : 'Create New'
                            };
                
                $("#datetime").val("");
              
        }
        
    //--------For date picker --------------
        
       
      

          // Disable weekend selection
          $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
          };

          $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
          };
          $scope.toggleMin();

          $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
          };

          $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
          };
          $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
          $scope.format = $scope.formats[2];
          
    // combobox code---
    
    var listData=salesRecordServices.itemsCombobx();
    listData.then(function(msg){
        
        $scope.type_transaction = msg.data;
        //console.log(msg.data+'drop down');
   
        
    });
        
      
     
       
});