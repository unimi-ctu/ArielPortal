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

    $routeProvider
      .when('/', {
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
      .otherwise({
        redirectTo: '/'
      });

      var $http,
          interceptor = ['$q', '$injector', function ($q, $injector) {
            function success(response) {
                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                if($http.pendingRequests.length < 1) {
                    angular.element('#loadingWidget').hide();
                }
                return response;
            }

            function error(response) {
                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                if($http.pendingRequests.length < 1) {
                    angular.element('#loadingWidget').hide();
                }
                console.log('error detected');
                return $q.reject(response);
            }

            return function (promise) {
                angular.element('#loadingWidget').show();
                return promise.then(success, error);
            };
          }];

      $httpProvider.responseInterceptors.push(interceptor);
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
    portal.checkUser();


  });

