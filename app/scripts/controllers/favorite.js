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
  	$scope.editcolor = -1;

  	$scope.opencolor = function(index) {
  		$scope.editcolor = $scope.editcolor === index ? -1 : index;
  	};

  	$scope.closecolor = function() {
  		$scope.editcolor = -1;
  	};

  	$scope.changecolor = function(color, pw) {
  		pw.ColorScheme = color;
	  	$scope.editcolor = -1;
  	};

    $scope.toggleFavorite = function(projectId) {
      portal.toggleFavorite(projectId).then(function(data) {
	      if (data) {
	      	loadData();
		  }
      });
    };

    var loadData = function() {
	  	if ($scope.user) {
	  		portal.getFavorites().then(function(data) {
	  			$scope.favorites = data.Data;
		  	});
	  	}
    };

    loadData();
});
