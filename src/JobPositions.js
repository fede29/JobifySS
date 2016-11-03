(function(){
	'use strict';	
	var app = angular.module('main', [ 'ngMaterial' ]);
    
    app.controller('SidenavController', function(){
        this.sidenavView = true;
        
        this.hideSidenav = function(){
			this.sidenavView = false;
		};

		this.showSidenav = function(){
			this.sidenavView = true;
		};

		this.toggleSidenav = function(){
			this.sidenavView = !this.sidenavView;
		};
    });
    
    app.controller('AddElementController', function($scope, $mdDialog, $http){
        $scope.status = '  ';
        $scope.customFullscreen = false;
        $scope.resource = {};
        $scope.showAdvanced = function(ev,res) {
            $scope.resource = res;
            $mdDialog.show({
              controller: DialogController,
              controllerAs: 'dialogCtrl',
              templateUrl: 'views/pages/addElement.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
              locals: {resource: $scope.resource}
              
            })
            .then(function(answer) {
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
        };
        
        function DialogController($scope, $mdDialog, $http, resource) {
            $scope.resource = resource;
            $scope.element = { };
            $scope.clean = { };
            
            $scope.categories = [];
            $http.get('/categories').success(function(data){
                $scope.categories = data.categories;
            });
    
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            
            $scope.refresh = function() {
                $scope.element = angular.copy($scope.clean);
            };

            $scope.add = function() {
                var url = $scope.resource.where + '/categories/' + $scope.element.category;
                var data = {
                    name: $scope.element.name,
                    description: $scope.element.description,
                };
                $http.post(url,data).success(function(data){
                    console.log(data);
                    $mdDialog.cancel();
                });
            };
        };
    });
    
    app.controller('AppController', [ '$http', function($http){
        
        this.resources = resources;
        this.activeResource = this.resources[0];
        this.elements = [];
		this.tab = 1;
        
        var appCtrl = this;
		
		this.selectTab = function(setTab) {
			this.tab = setTab;
            this.activeResource = this.resources[setTab-1];
            this.listAll();
		};
		
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};
        
        this.listAll = function(){
            var url = appCtrl.activeResource.where;
            var name = appCtrl.activeResource.name;
            console.log(url);
            $http.get(url).success(function(data){
                if (url == "job_positions") appCtrl.elements = data.job_positions;
                if (url == "skills") appCtrl.elements = data.skills;
                if (url == "categories") appCtrl.elements = data.categories;
                appCtrl.elements.sort(function(a,b){
                    return a.name.localeCompare(b.name);
                });
            });
            
        };
        
        this.clearElements = function (){
            appCtrl.elements = [];
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



