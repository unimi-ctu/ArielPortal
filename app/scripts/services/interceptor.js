'use strict';

/**
 * @ngdoc service
 * @name arielPortalApp.interceptor
 * @description
 * # interceptor
 * Factory in the portalApp.
 */
angular.module('portalApp')
  .factory('interceptor', function ($q, $rootScope) {
    return {
      response: function (response) {
        if (response.config.url.indexOf('.html') >= 0) {
          return response;
        }
        if (!response.  data.User && $rootScope.user) {
          angular.element('body').prepend('<div>Sei uscito</div>');
          // alert
        }
        $rootScope.user = response.data.User;
        return response;
      },
      responseError: function(response) {
        console.log('errore');
        return $q.reject(response);
      }
    };
  });
