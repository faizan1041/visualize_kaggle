/**
* Authentication
* @namespace djangular.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('djangular.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http) {
    /**
    * @name Authentication
    * @desc The Factory to be returned
    */
    var Authentication = {
      getAuthenticatedAccount: getAuthenticatedAccount,
      setAuthenticatedAccount: setAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      unauthenticate: unauthenticate,
      register: register,
      login: login,
      logout:logout
    };

    return Authentication;

    ////////////////////

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} username The username entered by the user
    * @param {string} password The password entered by the user
    * @param {string} email The email entered by the user
    * @returns {Promise}
    * @memberOf djangular.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      }).then(registerSuccessFn,registerErrorFn);

      function registerSuccessFn(data, status, headers, config){
        Authentication.login(email,password);
      }
      function registerErrorFn(data, status, headers, config){
        console.error('Cannot register user!');
      }
    }

    function login(email, password){
      return $http.post('/api/v1/auth/login/', {
        email: email,
        password: password
      }).then(loginSuccessFn, loginErrorFn);

      function loginSuccessFn(data, status, headers, config){
        Authentication.setAuthenticatedAccount(data.data);

        window.location= '/';
      }

      function loginErrorFn(data,status, headers,config){
        console.error('Error occured while logging in!');
      }
    }
    function logout(){
      return $http.post('/api/v1/auth/logout/')
    .then(logoutSuccessFn, logoutErrorFn);

      function logoutSuccessFn(data, status, headers, config){
        Authentication.unauthenticate();
        window.location='/';
      }
      function logoutErrorFn(data, status, headers, config){
        console.error('Failed to logout!');
      }
    }
    function getAuthenticatedAccount() {
      if(!$cookies.get('authenticatedAccount')){
        return;
      }
      return JSON.parse($cookies.get('authenticatedAccount'));
    }

    function isAuthenticated(){
      return !!$cookies.get('authenticatedAccount');
    }

    function setAuthenticatedAccount(account){
      $cookies.put('authenticatedAccount',JSON.stringify(account));
    }

    function unauthenticate(){
      $cookies.remove('authenticatedAccount');
    }
  }
})();
