(function(){
  'use strict';

  angular.module('djangular.layout.controllers')
  .controller('NavbarController',NavbarController);

  NavbarController.$inject=['$scope','Authentication','$http'];

  function NavbarController($scope,Authentication,$http){
    var vm=this;
    vm.logout=logout;

    function logout(){
      Authentication.logout();
    }

    

    $scope.getDataSets = function() {

      

      $http({
        method: 'GET',
        url: '/api/v1/scrape_kaggle'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously


          $scope.datasets = JSON.parse(response.data.datasets);

          console.log($scope.datasets);

          return $scope.datasets;
          

          
          
          

    



          //console.log(average_montly_hours);
          // when the response is available
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    }

    

  }
})();
