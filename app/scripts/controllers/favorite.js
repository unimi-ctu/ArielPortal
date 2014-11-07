'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:FavoriteCtrl
 * @description
 * # FavoriteCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('FavoriteCtrl', function ($scope, portal) {

  	if ($scope.user) {
  		portal.getFavorites().then(function(data) {
  			$scope.favorites = data.Data;
	  	});
  	}
  });
