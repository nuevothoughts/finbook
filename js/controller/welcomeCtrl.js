'use strict';
app.controller('welcomeCtrl',function($scope,loginServices){
    console.log('hello welcome page');
     
    // function for logout.
    $scope.logout=function(){
        loginServices.logout();
    }
    
});