(function(){
	'use strict';	
	var app = angular.module('main', [ 'ngMaterial' ]);
	
	app.controller('JobController', [ '$http', function($http){
        
		var job = this;
        
        job.resources = resources;
        job.activeElement = resources[0];
        job.jobPositions = [];
        
        this.setActiveElement = function(element){
            job.activeElement = element;
        };
        
        this.listAll = function(){
            var url = job.activeElement.where;
            $http.get(url).success(function(data){
                job.jobPositions = data.job_positions;
            });
        };
        
        this.clear = function (){
            job.jobPositions = [];
        };
	}]);
    
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
        
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
              controller: DialogController,
              controllerAs: 'dialogCtrl',
              templateUrl: 'views/pages/addElement.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
        };
        
        function DialogController($scope, $mdDialog, $http) {
            
            $scope.element = { };
            $scope.master = { };
            
            $scope.categories = ["Software","Management","Sport","Music"];
    
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            
            $scope.refresh = function() {
                $scope.element = angular.copy($scope.master);
            };

            $scope.add = function() {
                console.log(data);
                var url = '/job_positions/categories/' + $scope.element.category;
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



