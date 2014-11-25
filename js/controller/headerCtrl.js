'use strict';
app.controller('headerCtrl',function($scope,sessionServices,$location){
    
        $scope.logout = function(){
           sessionServices.destroy('user');
           $location.path('/login');
        }
    
});