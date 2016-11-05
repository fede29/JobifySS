(function(){
	'use strict';	
	var app = angular.module('main', [ 'ngMaterial' ]);
    
    /*app.controller('DelElementController', function($scope, $mdDialog, $http){
        $scope.status = '  ';
        $scope.customFullscreen = false;
        
        $scope.resource = {};
        $scope.element = {};
        
        $scope.showAdvanced = function(ev,res,elmnt) {
            //$scope.resource = res;
            //$scope.element = elmnt;
            $mdDialog.show({
              controller: DeldialogController,
              controllerAs: 'deldialogCtrl',
              templateUrl: 'views/pages/delElement.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
              locals: {
                  resource: res,
                  element: elmnt
                  },
              
            })
            .then(function(answer) {
              $scope.status = 'You said the information was ' + answer + '.';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
        };
        
        function DeldialogController($scope, $mdDialog, $http, resource, element) {
            $scope.resource = resource;
            $scope.element = element;
            console.log(element);
    
            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.del = function() {
                var url = $scope.resource.where + "/categories/" + $scope.element.category + "/" + $scope.element.name;
                console.log (url);
                $http.delete(url).success(function(data){
                    console.log("Im deleting!");
                    $mdDialog.cancel();
                });
            };
        };
    });*/
    
    
    app.controller('AppController', [ '$http', '$scope', '$mdDialog', function($http, $scope, $mdDialog){
        var self = this;
        
        self.resources = resources;
        self.activeElement = {};
        self.activeResource = {};   
        self.elements = [];
        self.hideContent = true;
        
        $scope.status = '';
		
		this.selectResource = function(resource) {
            self.activeResource = resource;
            self.listAll();
            self.hideContent = false;
		};
		
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};
        
        this.listAll = function(){
            var url = self.activeResource.where;
            var name = self.activeResource.name;
            console.log(url);
            $http.get(url).success(function(data){
                if (url == "job_positions") self.elements = data.job_positions;
                if (url == "skills") self.elements = data.skills;
                if (url == "categories") self.elements = data.categories;
                self.elements.sort(function(a,b){
                    return a.name.localeCompare(b.name);
                });
            });
            
        };
        
        this.clearElements = function (){
            self.elements = [];
        };
        
        this.deleteElement = function (element){
            var url = self.activeResource.where + "/categories/" + element.category + "/" + element.name;
            console.log (url);
            /*$http.delete(url).success(function(data){
                console.log("Im deleting!");
                $mdDialog.cancel();
            });*/
        };
        
        $scope.showDelDialog = function(ev,res,elmnt){
            $mdDialog.show({
              controller: DeldialogController,
              controllerAs: 'deldialogCtrl',
              templateUrl: 'views/pages/delElement.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
              locals: {
                  resource: res,
                  element: elmnt
                  },
              
            })
            .then(function(answer) {
              $scope.status = 'You said the information was ' + answer + '.';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
        };
        
        function DeldialogController($scope, $mdDialog, $http, resource, element) {
            $scope.resource = resource;
            $scope.element = element;
            console.log(element);
    
            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.del = function() {
                var url = $scope.resource.where + "/categories/" + $scope.element.category + "/" + $scope.element.name;
                console.log (url);
                $http.delete(url).success(function(data){
                    console.log("Im deleting!");
                    $mdDialog.cancel();
                });
            };
        };
        
	}]);    

    var resources = [
        {
            name: "Job Positions",
            image: "images/group.svg",
            where: "job_positions",
            num: 1,
        },
        {
            name: "Skills",
            image: "images/suitcase.svg",
            where: "skills",
            add: "skills/categories",
            num: 2,
        },
        {
            name: "Categories",
            image: "images/hierarchy.svg",
            where: "categories",
            num: 3,
        }
    ];

})();



