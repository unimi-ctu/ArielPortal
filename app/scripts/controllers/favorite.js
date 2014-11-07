'use strict';

/**
 * @ngdoc function
 * @name arielPortalApp.controller:FavoriteCtrl
 * @description
 * # FavoriteCtrl
 * Controller of the arielPortalApp
 */
angular.module('arielPortalApp')
  .controller('FavoriteCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
