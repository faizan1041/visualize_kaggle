(function(){
  'use strict';

  angular
  .module('djangular.routes')
  .config(config);

  config.$inject=['$routeProvider'];

  function config($routeProvider){
    $routeProvider.when('/register',{
    controller:'RegisterController',
    controllerAs:'vm',
    templateUrl:'/static/templates/authentication/register.html'
  }).when('/login',{
    controller:'LoginController',
    controllerAs:'vm',
    templateUrl:'/static/templates/authentication/login.html'
  }).when('/hr_analytics',{
    controller:'HRAnalyticsController',
    controllerAs:'vm',
    templateUrl:'/static/templates/layout/index.html'
  }).when('/scrape_kaggle',{
    controller:'ScrapeKaggleController',
    controllerAs:'vm',
    templateUrl:'/static/templates/scrape_kaggle/index.html'
  }).when('/',{
    controller:'HRAnalyticsController',
    controllerAs:'vm',
    templateUrl:'/static/templates/layout/index.html'
  }).otherwise({
    redirectTo: "/"
  });
  }
})();
