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
    'config',
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
    $httpProvider.interceptors.push('interceptor');

    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/search/:keyword?', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/favorite', {
        templateUrl: 'views/favorite.html',
        controller: 'FavoriteCtrl'
      })
      .when('/acl', {
        templateUrl: 'views/acl.html',
        controller: 'AclCtrl'
      })
      .when('/quicksearch', {
        templateUrl: 'views/quicksearch.html',
        controller: 'QuicksearchCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });
  })
  .run(function ($rootScope, $route, $location, $sce, portal, ENV) {
    $rootScope.logoutUrl = ENV.authUrl + 'logout.aspx?backurl=' + $location.absUrl();
    $rootScope.loginUrl = $sce.trustAsResourceUrl(ENV.authUrl + ENV.authSkin + 'login.aspx?url=' + $location.absUrl());
	

    $rootScope.isDebug = false;
    // serve per definire il profilo
    $rootScope.userAttrs = [
      'IsStaff', 'IsOwner', 'IsBaseTeacher', 'IsBaseStudent', 'IsTeacher', 'IsResearchStaff', 
      'IsUnimi', 'IsStudent', 'IsEmployee', 'IsGuest', 'IsPhd', 'IsSilsis', 'IsUnknownRadius'
    ];

    $rootScope.userAttrsLabel = [
      'Staff', 'Titolare', 'B Docente', 'B Studente', 'Docente', 'Staff ricerca',
      'Unimi', 'Studente', 'Personale Unimi', 'Ospite', 'Phd', 'Silsis', 'Altro'
    ];

    $rootScope.projectAttrs = [
      'IsCDSRuleComplying', 
      'IsW4Visible',
      'IsEnrolled',
      'IsFavorite',
      'IsInfaculty',
      'IsOwner',
      'IsRuleComplying'
    ];

    $rootScope.unimiTypes = {
      0: 'Utente Ariel',
      1: 'Studente',
      2: null,
      3: 'Docente',
      4: 'Ricercatore',
      5: 'Staff Unimi',
      6: 'Studente Silsis',
      7: 'Guest Unimi',
      8: 'Utente Unimi',
      9: 'Dottorando / Specializzando'
    };

    $rootScope.colorSchemes = [0,1,2,3,4,5,6,7,8];

    // console.log($route);

    $rootScope.getw4 = function() {
      if ($route.current.$$route.controller !== 'SearchCtrl') {
        $location.path('/search');
      }
      $rootScope.$broadcast('getw4', $rootScope.qsKeyword);
    };

    $rootScope.quickSearch = function() {
      if ($route.current.$$route.controller === 'SearchCtrl') {
        $rootScope.$broadcast('quicksearch', $rootScope.qsKeyword);
      }
      else {
        $location.path('/search/' + $rootScope.qsKeyword);
      }
      $rootScope.qsKeyword = '';
    };

    // per ora a vuoto
    portal.checkUser().success(function() {
    });

    portal.getFaculties().success(function(data) {
      $rootScope.faculties = data.Data;
	  $rootScope.facultiesMap = {};
	  $rootScope.faculties.forEach(function(fac){ $rootScope.facultiesMap[fac.Key] = fac.Description;});
    });

  });

