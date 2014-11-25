'use strict';

app.factory('loginServices',function($http,$location,sessionServices){
    
     return{
        login:function(user){
            var $loginCheck = $http.post('data/login.php',user) //send data to login.php
            $loginCheck.then(function(msg){
                var uid=msg.data;
                console.log(uid);
                if(uid!=0){
                       sessionServices.set('user',uid);
                       $location.path('/home');
                   }
                else{
                       bootbox.alert("your email id or password is wrong!!");                                                             
                       $location.path('/login');
                    }

            });
       },
        islogged:function(){
                    if(sessionServices.get('user')){
                        console.log(sessionServices.get('user')+'sessionServices');
                        return true;  
                    }  
                    else 
                        return false;
                },
        logout:function(){
           sessionServices.destroy('user');
           $location.path('/login');
        }
   }
    
});