'use strict';

app.controller('expenseCtrl',function($scope,expenseRecordServices,ngTableParams,$filter,$route){
      
    var saveRecord = true;
    $scope.newRecords = [];
    var insertId;
    
    var records=expenseRecordServices.expenseRecord();
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
                { title: 'User ID', field: 'id', visible: false },
                { title: 'Transaction Type', field: 'type_transaction', visible: true },
                { title: 'Transaction Ref.No.', field: 'refrence_no_transaction', visible: true },
                { title: 'Paid To', field: 'paid_to', visible: true },
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
            if($(this).hasClass('dropdown-menu-form')) {
                e.stopPropagation();
                }
            });   
                    
         });
         
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
            var editRecords=expenseRecordServices.editExpenseRecord(user);
            editRecords.then(function(msg){
            saveRecord = false;
            $scope.updateRecords = [];
            $scope.updateRecords = msg.data;
            var updated = $scope.updateRecords;
            console.log(updated);
            $scope.type = {
                    value: updated.type_transaction
                }
            var type1 = $scope.type;
            console.log(type1);
                        
            $scope.user = { date: updated.date_of_transaction, 
                            type: type1, 
                            userRef : updated.refrence_no_transaction, 
                            paid: updated.paid, 
                            description: updated.description, 
                            status: updated.status, 
                            remark: updated.remark, 
                            amt: updated.amount,
                            user_id: updated.id,
                            old:'Edit'
                        }; 
                 //console.log($scope.type+'editedtype'); 
            });
       },
       
       
        // below function for update the data form the database..
        $scope.save = function(user){
            // this condition will check that save button is click when user's records edited.
            if(saveRecord==false){
                //console.log(user);
                 var item = user.type;
                 $scope.user1 = {
                    paid:user.paid,
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
                console.log('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd');
                console.log(user2);
               // console.log(user2);
                var updaterecords=expenseRecordServices.updateExpenseRecord(user2);
                updaterecords.then(function(msg){
                   var data = msg.data;
                   console.log(data.date+" "+data.id);
                    var id = data.id;
                    var date = data.date;
                  
                    
                    //console.log(user2.transaction_type);
                    $("#1"+id).text(date);
                    $("#2"+id).text(user2.user_id);
                    $("#3"+id).text(user2.transaction_type);
                    $("#4"+id).text(user2.userRef);
                    $("#5"+id).text(user2.paid);
                    $("#6"+id).text(user2.description);
                    $("#7"+id).text(user2.remark);
                    $("#8"+id).text(user2.amt);
                    $("#9"+id).text(user2.status);
                    //  $scope.PopulateData();
                    saveRecord = true; 
                    $('#myModal').modal('hide');
                }); 
               
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
                        //console.log(saveRecord);
                        console.log(user);
                        var item = user.type;
                        console.log(item.value);
                        $scope.user1 = {
                            paid:user.paid,
                            transaction_type : item.value,
                            userRef : user.userRef, 
                            description: user.description, 
                            status: user.status, 
                            remark: user.remark, 
                            amt: user.amt,
                            date : user.date
                        }
                        var user2 = $scope.user1;
                        var newRecords=expenseRecordServices.newExpenseRecord(user2);
                        newRecords.then(function(msg){
                            console.log(msg.data);
                            $scope.newRecords = msg.data;
                            var data = $scope.newRecords;
                            console.log(data.user_id +'controller');
                            insertId = data.user_id;
                            $('#table #fbody tr').first().before("<tr id=11"+insertId+"><td id=1"+insertId+"></td><td id=2"+insertId+" style='display:none;'></td><td id=3"+insertId+"></td><td id=4"+insertId+"></td><td id=5"+insertId+"></td><td id=6"+insertId+"></td><td id=7"+insertId+" style='display:none;'></td><td id=8"+insertId+"></td><td id=9"+insertId+" style='display:none;'></td><td><a href='' ng-click='edit(user)' data-toggle='modal' data-target='#myModal'> Edit</a> | <a href='' ng-click='del(user)'>Delete</td></tr>");
                            $("#1"+insertId).text(data.transaction_date);
                         //   $("#2"+insertId).text(data.user_id);
                            $("#3"+insertId).text(data.type_transaction);
                            $("#4"+insertId).text(data.transaction_refrence_no);
                            $("#5"+insertId).text(data.Paid_to);
                            $("#6"+insertId).text(data.description);
                         //   $("#7"+insertId).text(data.remark);
                            $("#8"+insertId).text(data.amount);
                         //   $("#9"+insertId).text(data.status);
                            saveRecord = true; 
                            $('#myModal').modal('hide'); 
                        });
                    }   
                }   
          
        },
        
        // below function will delete a particular row from the table
        $scope.del = function(user){
            console.log(user);
            bootbox.confirm("Do You really want to delete the user's details !!!",function(didConfirm){
                     	if (didConfirm === true) {
                            
                            var deleteRecords=expenseRecordServices.deleteExpenseRecord(user);
                            deleteRecords.then(function(msg){
                               
                                var id=msg.data;
                                //$('#11'+id).remove();
                                $('#11'+id).remove();
                                console.log(id+"hello");

                            });
                        }
                    });
        }, 
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
    
        var listData=expenseRecordServices.itemsCombobx();
        listData.then(function(msg){

            $scope.type_transaction = msg.data;


        });


});
