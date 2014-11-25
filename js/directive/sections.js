'use strict';

console.log("section");
app.directive('section1', function () 
{
 
    return {
       
        templateUrl: "partials/sections/section1.html",
        controller: "headerCtrl"
    }
});

app.directive('section2', function () {
   // console.log("footer");
    return {
     
        templateUrl: "partials/sections/section2.html",
        
    }
});

app.directive('section3', function () {
   // console.log("footer");
    return {
       
        templateUrl: "partials/sections/section3.html",
       
    }
});

app.directive('section4', function () {
   // console.log("footer");
    return {
       
        templateUrl: "partials/sections/section4.html",
       
    }
});

app.directive('section5', function () {
   // console.log("footer");
    return {
       
        templateUrl: "partials/sections/section5.html",
       
    }
});