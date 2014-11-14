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
  .controller('SearchCtrl', function ($scope, $rootScope, $routeParams, portal) {
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

    function getSearchFilterVerbose() {
      var items = [];
      if ($rootScope.user && $scope.searchContext.SearchFlags) {
        if ($rootScope.user.IsBaseStudent && $scope.searchContext.SearchFlags.IsCDSRuleComplying) {
          items.push('CdS compatibili');
        }
        if ($rootScope.user.IsBaseStudent && $scope.searchContext.SearchFlags.IsCDSRuleComplying) {
          items.push('W4 compatibili');
        }
        if ($scope.searchContext.SearchFlags.IsEnrolled) {
          items.push('Visitati');
        }
        if ($scope.searchContext.SearchFlags.IsFavorite) {
          items.push('Preferiti');
        }
        if ($rootScope.user.IsBaseStudent && $scope.searchContext.SearchFlags.IsInfaculty) {
          items.push('Della facoltà');
        }
        if ($rootScope.user.IsOwner && $scope.searchContext.SearchFlags.IsOwner) {
          items.push('Titolare');
        }
        if ($scope.searchContext.SearchFlags.IsRuleComplying) {
          items.push('Accessibili');
        }
      }
      if (items.length) {
        return '<kbd>Filtri</kbd> ' + items.join(', ');
      }
      return null;
    }

    if ($routeParams.keyword) {
      $scope.searchContext = { Keyword: $routeParams.keyword };
    }
    else {
      $scope.searchContext = portal.getSearchContext();
    }
    $scope.searchVerbose = getSearchVerbose();
    $scope.searchFilterVerbose = getSearchFilterVerbose();
    $scope.showCount = _showCount;

  	portal.getFaculties().then(function(data) {
  		$scope.faculties = data.Data;
  		$scope.fillCdses();
  	});

    //portal.getSearch($scope.searchContext).success(function(data) {
    //  $scope.projectList = data.Data;
    //});


  	$scope.fillCdses = function() {
  		if ($scope.searchContext.FacultyKey) {
	  		portal.getCdses($scope.searchContext.FacultyKey).then(function(data) {
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

      portal.getSearch($scope.searchContext).then(function(data) {
        $scope.projectList = data.Data;
        $scope.isSearchForm = false;
        $scope.showCount = _showCount;
        $scope.user = data.User;
  
        if (!$rootScope.user) {
          $scope.searchContext.SearchFlags = null;
        }
  
        portal.setSearchContext($scope.searchContext);
        $scope.searchVerbose = getSearchVerbose();
        $scope.searchFilterVerbose = getSearchFilterVerbose();
      });
  	};

  	$scope.reset = function() {
  		$scope.searchContext = {};
      //$scope.searchVerbose = getSearchVerbose();
      //$scope.searchFilterVerbose = getSearchFilterVerbose();
  		$scope.cdses = [];
  	};

    $scope.showMore = function() {
      $scope.showCount += _showCount;
    };

    $scope.toggleFavorite = function(index) {
      var p = $scope.projectList.ProjectList[index];

      portal.toggleFavorite(p.Project.Id).then(function(data) {
        p.IsFavorite = data.Data;  
      });
    };

    $scope.$on('quicksearch', function(event, keyword) {
      $scope.searchContext = { SearchFlags: {}, Keyword: keyword };
      $scope.search();
    });

    $scope.search();

  });
