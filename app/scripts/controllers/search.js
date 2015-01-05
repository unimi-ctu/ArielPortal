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
      if ($scope.searchContext.searchParams.FacultyKey) {
        items.push('facoltà: <strong>' + $scope.faculties[$scope.searchContext.searchParams.FacultyKey].Description + '</strong>');
      }
      if ($scope.searchContext.searchParams.CdsKey) {
        items.push('codice corso di studi: <strong>' + $scope.searchContext.searchParams.CdsKey + '</strong>');
      }
      if ($scope.searchContext.searchParams.Keyword) {
        var pre = $scope.searchContext.searchParams.Keyword.split(' ').length === 1 ? 'parola chiave' : 'parole chiave';
        items.push(pre + ': \'<strong>' + $scope.searchContext.searchParams.Keyword + '</strong>\'');
      }
      if ($scope.searchContext.searchParams.Teacher) {
        items.push('docente: \'<strong>' + $scope.searchContext.searchParams.Teacher + '</strong>\'');
      }
      if (items.length) {
        return '<kbd>Contesto ricerca</kbd> ' + items.join(', ');
      }
      return null;
    }

    function getSearchFilterVerbose() {
      var items = [];
      if ($rootScope.user && $scope.searchContext.searchParams.SearchFlags) {
        if ($rootScope.user.IsBaseStudent && $scope.searchContext.searchParams.SearchFlags.IsCDSRuleComplying) {
          items.push('CdS compatibili');
        }
        if ($rootScope.user.IsBaseStudent && $scope.searchContext.searchParams.SearchFlags.IsW4Visible) {
          items.push('W4 compatibili');
        }
        if ($scope.searchContext.searchParams.SearchFlags.IsEnrolled) {
          items.push('Visitati');
        }
        if ($scope.searchContext.searchParams.SearchFlags.IsFavorite) {
          items.push('Preferiti');
        }
        if ($rootScope.user.IsBaseStudent && $scope.searchContext.searchParams.SearchFlags.IsInfaculty) {
          items.push('Della facoltà');
        }
        if ($rootScope.user.IsOwner && $scope.searchContext.searchParams.SearchFlags.IsOwner) {
          items.push('Titolare');
        }
        if ($scope.searchContext.searchParams.SearchFlags.IsRuleComplying) {
          items.push('Accessibili');
        }
      }
      if (items.length) {
        return '<kbd>Filtri</kbd> ' + items.join(', ');
      }
      return null;
    }

    if ($routeParams.keyword) {
      $scope.searchContext = { searchParams: { Keyword: $routeParams.keyword }};
    }
    else {
      $scope.searchContext = portal.getSearchContext();
    }
    $scope.searchVerbose = getSearchVerbose();
    $scope.searchFilterVerbose = getSearchFilterVerbose();
    $scope.showCount = _showCount;

    $scope.projectCardId = -1;

    // lo spostiamo in app.js e centralizziamo $scope.faculties
  	// portal.getFaculties().success(function(data) {
  	// 	$scope.faculties = data.Data;
  	// 	$scope.fillCdses();
  	// });

    //portal.getSearch($scope.searchContext).success(function(data) {
    //  $scope.projectList = data.Data;
    //});

    $scope.isFilter = false;
    var getIsFilter = function() {
      // controlla il searchContext
      if (!$scope.searchContext || !$scope.searchContext.searchParams ) {
        return false; // ovviamente;
      }
      if (
        $scope.searchContext.searchParams.FacultyKey || 
        $scope.searchContext.searchParams.CdsKey || 
        $scope.searchContext.searchParams.Keyword || 
        $scope.searchContext.searchParams.Teacher) {
        return true;
      }
      if ($scope.searchContext.searchParams.SearchFlags) {
        if (
          $scope.searchContext.searchParams.SearchFlags.IsCDSRuleComplying ||
          $scope.searchContext.searchParams.SearchFlags.IsW4Visible ||
          $scope.searchContext.searchParams.SearchFlags.IsEnrolled ||
          $scope.searchContext.searchParams.SearchFlags.IsFavorite ||
          $scope.searchContext.searchParams.SearchFlags.IsInfaculty ||
          $scope.searchContext.searchParams.SearchFlags.IsOwner ||
          $scope.searchContext.searchParams.SearchFlags.IsRuleComplying) {
          return true;
        }

      }
      return false;
    };

  	$scope.fillCdses = function() {
  		if ($scope.searchContext.FacultyKey) {
	  		portal.getCdses($scope.searchContext.searchParams.FacultyKey).success(function(data) {
	  			$scope.cdses = data.Data === 'null' ? [] : data.Data;		
	  		});
  		}
  		else {
  			$scope.cdses = [];
  		}
  	};

    //
    $scope.back = function() {
      var facultyKey = $scope.searchContext.isPoolMode ? $scope.searchContext.SelectedFacultyKey : null;
      $scope.search(facultyKey);
    };

    //
  	$scope.search = function(selectedFacultyKey) {

      $scope.searchContext.isPoolMode = false;

      if (selectedFacultyKey) {
        $scope.searchContext.SelectedFacultyKey = selectedFacultyKey;
        $scope.isBack = true;
      }
      else {
        delete $scope.searchContext.SelectedFacultyKey;
        $scope.isBack = false;
      }


      portal.getSearch($scope.searchContext).success(function(data) {
        $scope.isFilter = getIsFilter();
        $scope.projectCardId = -1;

        $scope.result = data.Data;
        $scope.isSearchForm = false;
        $scope.showCount = _showCount;
        //$scope.user = data.User;
  
        if (!$rootScope.user) {
          $scope.searchContext.searchParams.SearchFlags = null;
        }
  
        portal.setSearchContext($scope.searchContext);
        $scope.searchVerbose = getSearchVerbose();
        $scope.searchFilterVerbose = getSearchFilterVerbose();
      });
  	};

  	$scope.reset = function() {
  		$scope.searchContext.searchParams = {};
  		$scope.cdses = [];
  	};

    $scope.resetSearch = function() {
      $scope.reset();
      $scope.search($scope.searchContext.SelectedFacultyKey);
    };


    $scope.showMore = function() {
      $scope.showCount += _showCount;
    };

    $scope.toggleFavorite = function(p) {
      portal.toggleFavorite(p.Project.Id).success(function(data) {
        p.IsFavorite = data.Data;  
        $scope.confirmindex = -1;
      });
    };
	
    $scope.getProject = function(p) {
      return portal.getProjectCard(p, $scope);
    };

    $scope.getPool = function(p) {
      $scope.searchContext.isPoolMode = true;
      $scope.isBack = true;

      portal.getPool(p.Project.Id).success(function(data) {
        $scope.result = data.Data; 
      });     
    };

    $scope.getW4 = function() {
      $scope.searchContext = { searchParams: { SearchFlags: { IsW4Visible: true } }};
      $scope.search();
    };

    $scope.openconfirm = function(index) {
      $scope.confirmindex = $scope.confirmindex === index ? -1 : index;
    };

    $scope.closeconfirm = function() {
      $scope.confirmindex = -1;
    };


    $scope.$on('quicksearch', function(event, keyword) {
      $scope.searchContext = { searchParams: { SearchFlags: {}, Keyword: keyword } };
      $scope.search();
    });

    $scope.search();

  });
