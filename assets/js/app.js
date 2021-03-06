
angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngDialog',
    'restangular',
    'ui.bootstrap',
    'ui.paging',
    'app.controllers',
    'ui.gravatar'
])

.config(['$stateProvider', '$urlRouterProvider', 'ngDialogProvider', 'RestangularProvider', 'gravatarServiceProvider',
  function($stateProvider, $urlRouterProvider, ngDialogProvider, RestangularProvider, gravatarServiceProvider) {
  RestangularProvider.setBaseUrl('https://sahara-health-api.herokuapp.com/');

  RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
      if (data.response && data.response.data) {
          var returnedData = data.response.data;
          return returnedData;
      } else {
          return data;
      };
  });
  
  $stateProvider
    .state('home', {
    url: '',
    templateUrl: 'modules/home.html',
    controller: 'appCtrl',
  })
    .state('article', {
      url: '/:id',
      templateUrl: 'modules/article.html',
      controller: 'articleReadCtrl'
    })  

  $urlRouterProvider.otherwise('/home')

  ngDialogProvider.setDefaults({
      className: 'ngdialog-theme-plain',
      showClose: false,
  });

  gravatarServiceProvider.defaults = {
      size     : 100,
      "default": 'mm'  // Mystery man as default for missing avatars
  };
  
}]);