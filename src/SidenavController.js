(function(){
    
    angular.module('main').controller('SidenavController', function($scope, $timeout, $mdSidenav){
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
            return function() {
            $mdSidenav(componentId).toggle();
            }
        }
    });
    
})();
