(function () {
  'use strict';

  // angular
  //   .module('djangular.layout.controllers')
  //   .controller('HRAnalyticsController', HRAnalyticsController);

  angular
    .module('djangular.layout.controllers')
    .controller('HRAnalyticsController', function($scope,$http) {
    
      //console.log($http.get('/api/v1/hr_analytics'));


      // Simple GET request example:
      $http({
        method: 'GET',
        url: '/api/v1/hr_analytics'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously




          var df = response.data;

          $scope.columns = Object.keys(df);

          // $scope.xvals = '';

          // var xvals = $scope.xvals;
          //var yvals = 'average_montly_hours';
          
          

          $scope.plot = function(xvals,yvals) {

              if(!xvals || !yvals) {
                return false;
              }

            
              console.log(yvals);
                  

              var xvals_label = labelize(xvals);
              var yvals_label = labelize(yvals);


              var xvals_arr = objToArr(df[xvals]);
              xvals_arr.unshift(xvals_label);


              
              
              var yvals_arr = objToArr(df[yvals]);
              yvals_arr.unshift(yvals_label);
              

              

              


              
              var chart = c3.generate({
                  size: {
                        height: 500
                      },
                  data: {
                      xs: {
                          [yvals_label]: xvals_label,
                      },
                      columns: [
                          xvals_arr,
                          yvals_arr
                      ],
                      type: 'scatter',
                      
                  },
                  axis: {
                          x: {
                              label: xvals_label,
                              tick: {
                                  fit: false
                              }
                          },
                          y: {
                              label: yvals_label
                          }
                      }
                  });
         }
          
          

    



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

 function labelize(str){
    return str.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
 }


 



})();
