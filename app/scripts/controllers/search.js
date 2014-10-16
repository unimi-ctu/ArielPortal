'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('SearchCtrl', function ($scope, portal) {
  	console.log($scope.searchContext);
  	$scope.searchContext = portal.getSearchContext();

  	portal.getFaculties().success(function(data) {
  		$scope.faculties = data;
  		$scope.fillCdses();
  	});

  	$scope.fillCdses = function() {
  		if ($scope.searchContext.FacultyKey) {
	  		portal.getCdses($scope.searchContext.FacultyKey).success(function(data) {
	  			$scope.cdses = data === 'null' ? [] : data;		
	  		});
  		}
  		else {
  			$scope.cdses = [];
  		}
  	};

  	$scope.search = function() {
  		$scope.setSearchContext(portal.searchContext);
  	};

  	$scope.reset = function() {
  		$scope.searchContext = {};
  		$scope.cdses = [];
  	};
  });
