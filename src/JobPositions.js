(function(){
	'use strict';	
	var app = angular.module('jobPositions', [ 'ngMaterial' ]);
	
	app.controller('JobController', [ '$http', function($http){
		var job = this
        
        job.jobPositions = [];
        
        $http.get('/job_positions').success(function(data){
            job.jobPositions = data.job_positions;
        });
        
	}]);
    
    app.controller('TabController', function(){
		this.tab = 1;
		this.sidenavView = true;
		
		this.selectTab = function(setTab) {
			this.tab = setTab;
		};
		
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};

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
    
	var positions = [
	{
		name: "Position 1",
		description: "Una descripcion para la posicion 1",
		category: "Categoria 1",
		show: true,
	},
	{
		name: "Position 2",
		description: "Una descripcion para la posicion 2",
		category: "Categoria 2",
		show: true,
	},
	{
		name: "Position 3",
		description: "Una descripcion para la posicion 3",
		category: "Categoria 3",
		show: true,
	},
	{
		name: "Position 4",
		description: "Una descripcion para la posicion 4",
		category: "Categoria 4",
		show: false,
	}];
	
})();
