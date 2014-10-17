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
    function getSearchVerbose() {
      var items = [];
      if ($scope.searchContext.FacultyKey) {
        items.push('codice facoltà: \'<strong>' + $scope.searchContext.FacultyKey + '</strong>\'');
      }
      if ($scope.searchContext.CdsKey) {
        items.push('codice corso di studi: \'<strong>' + $scope.searchContext.CdsKey + '</strong>\'');
      }
      if ($scope.searchContext.Keyword) {
        var pre = $scope.searchContext.Keyword.split(' ').length === 1 ? 'parola chiave' : 'parole chiave';
        items.push(pre + ': \'<strong>' + $scope.searchContext.Keyword + '</strong>\'');
      }
      if ($scope.searchContext.Teacher) {
        items.push('docente: \'<strong>' + $scope.searchContext.Teacher + '</strong>\'');
      }
      if (items.length) {
        return '<kbd>Contesto ricerca</kbd> ' + items.join(', ');
      }
      return null;
    }

  	$scope.searchContext = portal.getSearchContext();
    $scope.searchVerbose = getSearchVerbose();

  	portal.getFaculties().success(function(data) {
  		$scope.faculties = data;
  		$scope.fillCdses();
  	});

    portal.getSearch($scope.searchContext).success(function(data) {
      $scope.projectList = data;
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
      $scope.searchVerbose = getSearchVerbose();

      portal.getSearch($scope.searchContext).success(function(data) {
        $scope.projectList = data;
      });
  	};

  	$scope.reset = function() {
  		$scope.searchContext = {};
      $scope.searchVerbose = getSearchVerbose();
  		$scope.cdses = [];
  	};

  });
