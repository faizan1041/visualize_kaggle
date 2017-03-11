(function () {
  'use strict';

  // angular
  //   .module('djangular.layout.controllers')
  //   .controller('IndexController', IndexController);

  angular
    .module('djangular.layout.controllers')
    .controller('IndexController', function($scope,$http) {
    
      //console.log($http.get('/api/v1/hr_analytics'));


      // Simple GET request example:
      $http({
        method: 'GET',
        url: '/api/v1/hr_analytics'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          var df = response.data;


          var average_montly_hours = objToArr(df.average_montly_hours);
          average_montly_hours.unshift('Average Monthly Hours');

          var satisfaction_level = objToArr(df.satisfaction_level);
          satisfaction_level.unshift('Satisfaction Level');

          
          var chart = c3.generate({
              size: {
                    height: 600
                  },
              data: {
                  xs: {
                      'Satisfaction Level': 'Average Monthly Hours',
                  },
                  // iris data from R
                  columns: [
                      satisfaction_level,
                      average_montly_hours
                  ],
                  type: 'scatter',
                  
              },
              axis: {
                      x: {
                          label: 'Average Monthly Hours',
                          tick: {
                              fit: false
                          }
                      },
                      y: {
                          label: 'Satisfaction Level'
                      }
                  }
              });

    



          //console.log(average_montly_hours);
          // when the response is available
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });


      



    });

 
 function objToArr(obj){
    return Object.keys(obj).map(function (key) { return obj[key]; });
 }



})();
