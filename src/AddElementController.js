(function(){
    
    angular.module('main').controller('AddElementController', function($scope, $mdDialog, $http){
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
                console.log(data);
                $http.post(url,data).success(function(data){
                    console.log(data);
                    $mdDialog.cancel();
                });
            };
        };
    });
})();
