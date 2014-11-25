'use strict';

app.controller('loginCtrl',function($scope,$location,loginServices){
    //console.log('heeeeelllooooo');
     $scope.login = function(user) {
    // if every thing valid from the login form (frm)
    if ($scope.frm.$valid) {
            loginServices.login(user); //call login Services
        }
    };
    
    // below condition will check that if user is logged in then it will not allow to go back and vice-versa.
    
    if(!loginServices.islogged()){
           $location.path('/login'); 
    }
    else{
        $location.path('/home');
    }
    

    
});