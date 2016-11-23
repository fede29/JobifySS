(function(){
	'use strict';	
	var app = angular.module('main', [ 'ngMaterial' ]);
    
    app.controller('AppController', [ '$http', '$scope', '$mdDialog', '$timeout', '$mdSidenav',
                    function($http, $scope, $mdDialog, $timeout, $mdSidenav){
        var self = this;
        
        self.resources = resources;
        self.activeElement = {};
        self.activeResource = {};   
        self.elements = [];
        self.hideContent = true;
        
        $scope.status = '';
        
        $scope.toggleLeft = buildToggler('left');
        $scope.isSidenavOpen = false;

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
              console.log(answer);
            }, function() {
              console.log("I canceled");
            });
        };
        
        $scope.showModifyDialog = function(ev,res,elmnt){
            $mdDialog.show({
              controller: ModdialogController,
              controllerAs: 'moddialogCtrl',
              templateUrl: 'views/pages/modifyElement.html',
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
              console.log('You cancelled the dialog.');
            });
        };
        
        function ModdialogController ($scope, $mdDialog, $http, resource, element) {
            
            $scope.resource = resource;
            $scope.originalElement = angular.copy(element);
            $scope.element = element;
            $scope.clean = { };
            
            $scope.categories = [];
            
            $http.get('/categories').success(function(data){
                $scope.categories = data.categories;
            });
    
            $scope.cancel = function(answer) {
                $mdDialog.cancel(answer);
            };
            
            $scope.refresh = function() {
                $scope.element = angular.copy($scope.clean);
            };

            $scope.confirm = function() {
                var url = $scope.resource.where + '/categories/' + $scope.originalElement.category + '/' + $scope.originalElement.name ;
                var data = {
                    name: $scope.element.name,
                    description: $scope.element.description,
                    category: $scope.element.category
                };
                $http.put(url,data).success(function(data){
                    console.log(data);
                    $mdDialog.cancel();
                });
            };
        };
        
        function DeldialogController($scope, $mdDialog, $http, resource, element) {
            $scope.resource = resource;
            $scope.element = element;
            console.log(element);
    
            $scope.cancel = function(answer) {
                $mdDialog.cancel(answer);
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

        function buildToggler(componentId) {
            return function() {
            $mdSidenav(componentId).toggle();
            $scope.isSidenavOpen = !$scope.isSidenavOpen;
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



