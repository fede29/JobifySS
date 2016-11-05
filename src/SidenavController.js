(function(){
    
    angular.module('main').controller('SidenavController', function(){
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
})();
