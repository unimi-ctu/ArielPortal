'use strict';

/**
 * @ngdoc overview
 * @name portalApp
 * @description
 * # portalApp
 *
 * Main module of the application.
 */
angular
  .module('portalApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider) {

    // ATTENZIONE: senza questa riga di configurazione 
    // non vengono inviati i cookie con le richieste $http
    // http://stackoverflow.com/questions/17064791/http-doesnt-send-cookie-in-requests
    $httpProvider.defaults.withCredentials = true;

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope) {
    // serve per definire il profilo
    $rootScope.userAttrs = [
      'IsStaff', 'IsOwner', 'IsBaseTeacher', 'IsBaseStudent', 'IsTeacher', 'IsResearchStaff', 
      'IsUnimi', 'IsStudent', 'IsEmployee', 'IsGuest', 'IsPhd', 'IsSilsis', 'IsUnknownRadius'
    ];
  });
