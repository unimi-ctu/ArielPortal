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
  	$scope.confirmindex = -1;

  	$scope.opencolor = function(index) {
  		$scope.editcolor = $scope.editcolor === index ? -1 : index;
	  	$scope.confirmindex = -1;
  	};

  	$scope.closecolor = function() {
  		$scope.editcolor = -1;
  	};

  	$scope.changecolor = function(color, pw) {
  		portal.setFavoriteColor(pw.Project.Id, color).success(function() {
	  		pw.ColorScheme = color;
		  	$scope.editcolor = -1;
		  });
  	};

  	$scope.openconfirm = function(index) {
  		$scope.confirmindex = $scope.confirmindex === index ? -1 : index;
	  	$scope.editcolor = -1;
  	};

  	$scope.closeconfirm = function() {
  		$scope.confirmindex = -1;
  	};


    $scope.toggleFavorite = function(pw) {
      portal.toggleFavorite(pw.Project.Id).success(function(data) {
	      if (data) {
	      	loadData();
	  		$scope.confirmindex = -1;
		  }
      });
    };

    var loadData = function() {
	  	if ($scope.user) {
	  		portal.getFavorites().success(function(data) {
	  			$scope.result = data.Data;
		  	});
	  	}
    };

    loadData();
});
