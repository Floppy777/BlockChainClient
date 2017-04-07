'use strict';

/**
 * @ngdoc overview
 * @name blockChainClientApp
 * @description
 * # blockChainClientApp
 *
 * Main module of the application.
 */
angular
  .module('blockChainClientApp', [
    'restangular',
    'ngSanitize',
    'ngRoute'
  ])


  .constant('Config',{
    version : config.version,
    serverAddress : config.serverAddress,
    pathUri : config.pathUri
  }) 

  .config(function ($routeProvider,RestangularProvider,Config) {

    RestangularProvider.setBaseUrl(Config.serverAddress + Config.pathUri);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .otherwise({
        redirectTo: '/'
      })
  });
