'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:QuicksearchCtrl
 * @description
 * # QuicksearchCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('QuicksearchCtrl', function ($scope, $rootScope) {
		$scope.updateRootScopeProp = function()  {
			//$rootScope.qsKeyword = $scope.qsKeyword;
		};
  });
