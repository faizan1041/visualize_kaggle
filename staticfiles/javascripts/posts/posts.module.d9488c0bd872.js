(function(){
  'use strict';

  angular
    .module('djangular.posts',[
      'djangular.posts.controllers',
      'djangular.posts.directives',
      'djangular.posts.services'
    ]);

  angular
    .module('djangular.posts.controllers',[]);

  angular
    .module('djangular.posts.directives',['ngDialog']);

  angular
    .module('djangular.posts.services',[]);
})();
