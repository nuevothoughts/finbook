'use strict'

app.factory('expenseRecordServices',function($http){
    
    return{
        
         //This function will show the data to the table from the database
        
            expenseRecord:function(){
                var $records = $http.get('data/expenseRecords.php') //get the records from php page
                $records.then(function(msg){
                   console.log(msg.data+'sale recordsoooooooooooooooooooo');
                  // console.log('hi');
                });
                return $records;
            },
            
            //Below function will fetch the data from the db when the edit button is clicked.
        
            editExpenseRecord:function(user){
                var $editRecords = $http.post('data/editExpenseRecords.php',user)
                    $editRecords.then(function(msg){
                        //console.log(msg.data);
                       //  console.log(msg.data+'sale recordsoooooooooooooooooooowwwwwwwwwww');
                    });
                    return $editRecords; 
            },
            
            //This funtion will delete particular record from the database
        
            deleteExpenseRecord:function(user){
                var $delRecords = $http.post('data/deleteExpenseRecords.php',user)
                $delRecords.then(function(msg){
                    console.log(msg.data+'delete');
                });
                return $delRecords;
            },
            
            //This function will edit the records of any particualr user
        
            updateExpenseRecord:function(user){
                var $updateRecords = $http.post('data/updateExpenseRecords.php',user) //get the records from php page
                $updateRecords.then(function(msg){
                    console.log(msg.data);
                   //console.log(msg.data+'sale recordsoooooooooooooooooooo');
                   //console.log(msg.data +'services update');
                   //console.log(msg.data +'services function');
                });
                return $updateRecords;
            },
            
            newExpenseRecord:function(user){
                var $newExpenseRecords = $http.post('data/newExpenseRecords.php',user)
                    $newExpenseRecords.then(function(msg){
                        
                    });
                    return $newExpenseRecords;
                },
            
            
            //Below function will fetch the data form the db for Item of the combobx items.
       
            itemsCombobx:function(){
                var $items = $http.get('data/itemCombobox.php')
                    $items.then(function(msg){
                        
                    });
                    return $items;
            }
        
    }
    
});


