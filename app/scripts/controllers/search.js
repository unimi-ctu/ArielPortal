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
  	$scope.searchContext = portal.getSearchContext();
    console.log(portal.getSearchContext());
    console.log($scope.searchContext);

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
  		portal.setSearchContext($scope.searchContext);
  	};

  	$scope.reset = function() {
  		$scope.searchContext = {};
  		$scope.cdses = [];
  	};

    $scope.$watch('searchContext', function() {
      console.log('some change');
    });
  });
