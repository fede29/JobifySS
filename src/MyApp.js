angular.module('MyApp',['ngMaterial','main'])
    .config(function($mdThemingProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('red');
        $mdThemingProvider.theme('dark')
            .primaryPalette('indigo')
            .dark();
    })
    .run(function(){
        console.log("MyApp is ready!");
    });


