'use strict';

var _showCount = 25;
/**
 * @ngdoc function
 * @name portalApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('SearchCtrl', function ($scope, portal) {

    // nel master metto un commento diverso
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
    $scope.showCount = _showCount;

  	portal.getFaculties().success(function(data) {
  		$scope.faculties = data.Data;
  		$scope.fillCdses();
  	});

    //portal.getSearch($scope.searchContext).success(function(data) {
    //  $scope.projectList = data.Data;
    //});


  	$scope.fillCdses = function() {
  		if ($scope.searchContext.FacultyKey) {
	  		portal.getCdses($scope.searchContext.FacultyKey).success(function(data) {
	  			$scope.cdses = data.Data === 'null' ? [] : data.Data;		
	  		});
  		}
  		else {
  			$scope.cdses = [];
  		}
  	};

  	$scope.search = function(selectedFacultyKey) {
      if (selectedFacultyKey) {
        $scope.searchContext.SelectedFacultyKey = selectedFacultyKey;
      }
      else {
        delete $scope.searchContext.SelectedFacultyKey;
      }
  		portal.setSearchContext($scope.searchContext);
      $scope.searchVerbose = getSearchVerbose();

      portal.getSearch($scope.searchContext).success(function(data) {
        $scope.projectList = data.Data;
        $scope.isSearchForm = false;
        $scope.showCount = _showCount;
        $scope.user = data.User;
      });
  	};

  	$scope.reset = function() {
  		$scope.searchContext = {};
      $scope.searchVerbose = getSearchVerbose();
  		$scope.cdses = [];
  	};

    $scope.showMore = function() {
      $scope.showCount += _showCount;
    };

    $scope.search();

  });
