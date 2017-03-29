(function(){
angular
  .module('djangular', [
    'djangular.config',
    'djangular.routes',
    'djangular.authentication',
    'djangular.layout',
    'djangular.utils'
  ]);

angular
  .module('djangular.routes',['ngRoute']);

angular
  .module('djangular.config',[]);

  angular
  .module('djangular')
  .run(run);

run.$inject = ['$http'];

/**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
function run($http) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
}


})();
