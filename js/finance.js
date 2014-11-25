'use strict';
// Declare app level module which depends on filters, and services
var app= angular.module('app',['ngRoute','ngTable','ui.bootstrap']);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
          when('/login',{templateUrl:'partials/login.html',controller:'loginCtrl'}).
         
          when('/home',{templateUrl:'partials/salesTransaction.html',controller:'salesCtrl'}).
          when('/expense',{templateUrl:'partials/expenseTransaction.html',controller:'expenseCtrl'}).
          when('/demo',{templateUrl:'partials/demo.html',controller:'demoCtrl'}).
          otherwise({redirectTo: '/login'});
}]);


app.run(function($rootScope, $location, loginServices){
   
       var routespermission = ['/home']; //route that require login
       $rootScope.$on('$routeChangeStart',function(){
           console.log('exit tab:'+routespermission.indexOf($location.path()));
           console.log('logged:'+loginServices.islogged());
           if( routespermission.indexOf($location.path()) !==-1 && !loginServices.islogged()){
                    $location.path('/login');    
                }
       });
});
