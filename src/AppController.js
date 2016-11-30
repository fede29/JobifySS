(function(){
	'use strict';	
	var app = angular.module('main', [ 'ngMaterial' ]);
    
    app.controller('AppController', [ '$http', '$scope', '$mdDialog', '$timeout', '$mdSidenav', '$q',
                    function($http, $scope, $mdDialog, $timeout, $mdSidenav, $q){
        var self = this;
        
        self.resources = resources;
        self.activeElement = {};
        self.activeResource = {};   
        self.elements = [];
        self.hideContent = true;
        self.activeSearch = false;
        self.selectedItemSearch = null;
        self.searchText = null;
        self.categories = [];

        self.categoriesSearch = [];
        
        $scope.status = '';
        
        $scope.toggleLeft = buildToggler('left');
        $scope.isSidenavOpen = false;

		this.selectResource = function(resource) {
            self.loadCategories();
            self.activeResource = resource;
            self.listAll();
            self.hideContent = false;
            self.categoriesSearch = [];
            self.activeSearch = false;
		};
		
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};
        
        this.listAll = function(){
            var url = self.activeResource.where;
            var name = self.activeResource.name;

            self.categoriesSearch = [];
            self.activeSearch = false;
            
            $http.get(url).success(function(data){
                self.elements = [];
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
            self.categoriesSearch = [];
            self.activeSearch = false;
        };

        this.toggleSearch = function (){
            self.activeSearch=!self.activeSearch;
        };

        this.addCategoryToElements = function (category){
            var url = self.activeResource.where + '/categories/' + category;
            $http.get(url).success(function(data){
                self.elements = self.elements.concat(data.job_positions);
            });
        };

        this.findByCategories = function (){
            self.elements = [];
            self.categoriesSearch.forEach(function(category){
                self.addCategoryToElements(category.name);
            });
        };

        this.loadCategories = function (){
            self.categories = [];
            $http.get('categories').success(function(data){
                self.categories = self.categories.concat(data.categories);
            });
        };

        this.queryCategorySearch = function(query){
            var results = query ? self.categories.filter(createFilterFor(query)) : [];
            return results;
        };

        function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
            return function filterFn(category) {
                return (category.name.toLowerCase().indexOf(lowercaseQuery) === 0);
            };
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

        $scope.showMoreDialog = function(ev,res,elmt) {
            $mdDialog.show({
              controller: ShowmoreController,
              controllerAs: 'moreCtrl',
              templateUrl: 'views/pages/showMore.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
              locals: {
                  resource: res,
                  element: elmt
                  }
              
            })
            .then(function(answer) {
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
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

            if (resource.name === 'Categories') element.category = $scope.categories[0];
    
            $scope.cancel = function(answer) {
                $scope.element.name = $scope.originalElement.name;
                $scope.element.description = $scope.originalElement.description;
                $scope.element.category = $scope.originalElement.category;
                if (resource.name === 'Categories' && element.hasOwnProperty('category')) delete element.category;
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

                if (resource.name === 'Categories'){
                    url = $scope.resource.where + '/' + $scope.originalElement.name;

                    data = {
                        name: $scope.element.name,
                        description: $scope.element.description,
                    };
                 }
                 
                $http.put(url,data).success(function(data){
                    console.log(data);
                    $mdDialog.cancel();
                });
            };
        };
        
        function DeldialogController($scope, $mdDialog, $http, resource, element) {
            $scope.resource = resource;
            $scope.element = element;
    
            $scope.cancel = function(answer) {
                $mdDialog.cancel(answer);
            };

            $scope.del = function() {
                var url = $scope.resource.where + "/categories/" + $scope.element.category + "/" + $scope.element.name;
                if ($scope.resource.name === "Categories") url = $scope.resource.where + "/" + $scope.element.name;
                $http.delete(url).success(function(data){
                    $scope.satus = "Success";
                    var index = self.elements.indexOf($scope.element);
                    console.log(index);
                    self.elements.splice(index,1);
                    $mdDialog.cancel();
                });
                
            };
        };

        function ShowmoreController($scope, $mdDialog, resource, element){
            $scope.resource = resource;
            $scope.element = element;

            $scope.cancel = function(){
                $mdDialog.cancel();
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
        },
        {
            name: "Skills",
            image: "images/suitcase.svg",
            where: "skills",
        },
        {
            name: "Categories",
            image: "images/hierarchy.svg",
            where: "categories",
        }
    ];

})();



