'use strict'

app.factory('salesRecordServices',function($http){
    
     return{
        
        //This function will show the data to the table from the database
        
            salesRecord:function(){
                var $records = $http.get('data/saleRecords.php') //get the records from php page
                $records.then(function(msg){
                   console.log(msg.data+'sale recordsoooooooooooooooooooo');
                  // console.log('hi');
                });
                return $records;
            },
        
        //This function will edit the records of any particualr user
        
            updateRecord:function(user){
                var $updateRecords = $http.post('data/updateRecords.php',user) //get the records from php page
                $updateRecords.then(function(msg){
                   //console.log(msg.data+'sale recordsoooooooooooooooooooo');
                   //console.log(msg.data +'services update');
                   console.log(msg.data +'services function');
                });
                return $updateRecords;
            },
            
        //This funtion will delete particular record from the database
        
            deleteRecord:function(user){
                var $delRecords = $http.post('data/deleteRecords.php',user)
                $delRecords.then(function(msg){
                    console.log(msg.data+'delete');
                });
                return $delRecords;
            },
            
        //This function will enter the new records to the database
        
            newRecord:function(user){
                var $newRecords = $http.post('data/newRecords.php',user)
                $newRecords.then(function(msg){
                   // console.log(msg.data.date_of_transaction);
                });
                return $newRecords;
            },
            
        //Below function will fetch the data from the db when the edit button is clicked.
        
            editRecord:function(user){
                var $editRecords = $http.post('data/editRecords.php',user)
                    $editRecords.then(function(msg){
                        //console.log(msg.data);
                       //  console.log(msg.data+'sale recordsoooooooooooooooooooowwwwwwwwwww');
                    });
                    return $editRecords; 
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


