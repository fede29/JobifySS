angular.module('MyApp',['ngMaterial','main'])
    .config(function($mdThemingProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('red');
        $mdThemingProvider.theme('dark')
            .primaryPalette('indigo')
            .dark();
        $mdThemingProvider.theme('delete')
            .primaryPalette('red')
            .accentPalette('indigo');
    })
    .run(function(){
        console.log("MyApp is ready!");
    });


