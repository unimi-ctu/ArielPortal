'use strict';

/**
 * @ngdoc directive
 * @name portalApp.directive:searchContext
 * @description
 * # searchContext
 */
angular.module('portalApp')
  .directive('searchContext', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the searchContext directive');
      }
    };
  });
