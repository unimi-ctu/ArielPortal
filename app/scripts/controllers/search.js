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
        items.push('facoltà: <strong>' + $scope.faculties[$scope.searchContext.FacultyKey].Description + '</strong>');
      }
      if ($scope.searchContext.CdsKey) {
        items.push('codice corso di studi: <strong>' + $scope.searchContext.CdsKey + '</strong>');
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
        if ($rootScope.user.IsBaseStudent && $scope.searchContext.SearchFlags.IsW4Visible) {
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

    $scope.projectCardId = -1;

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


      portal.getSearch($scope.searchContext).then(function(data) {
        $scope.projectCardId = -1;

        $scope.result = data.Data;
        $scope.isSearchForm = false;
        $scope.showCount = _showCount;
        //$scope.user = data.User;
  
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

    $scope.resetSearch = function() {
      $scope.reset();
      $scope.search();
    };


    $scope.showMore = function() {
      $scope.showCount += _showCount;
    };

    $scope.toggleFavorite = function(p) {
      //var p = $scope.result.ProjectList[index];

      portal.toggleFavorite(p.Project.Id).then(function(data) {
        p.IsFavorite = data.Data;  
      });
    };
	
    $scope.getProject = function(p) {
      if ($scope.projectCardId === p.Project.Id) {
        $scope.projectCardId = -1;
      }
      else {

        portal.getProject(p.Project.Id).then(function(data) {
          $scope.projectCardId = p.Project.Id;

          $scope.projectCard = data.Data;
  		    $scope.projectCard.StudentAccessAllowed = $scope.projectCard.GuestAccessAllowed = false;
  		    
          // verifico la presenza di regole per l'accesso studente
  		    if ($scope.projectCard.Project.AccessRuleList.some(function (obj) {  
            if (obj.ArielRoleString === 'User') { 
              return true; 
            } 
            return false;
          })) { 
            $scope.projectCard.StudentAccessAllowed = true; 
          }
  		
          // verifico la presenza di regole per l'accesso guest
  		    if ($scope.projectCard.Project.AccessRuleList.some(function (obj) {  
            if (obj.ArielRoleString === 'Guest') { 
              return true; 
            } 
            return false;
          })) { 
            $scope.projectCard.GuestAccessAllowed = true;
          }

  		    $scope.projectCard.erasmusFacList = [];
  		    $scope.projectCard.Project.AccessRuleList.forEach(function(rule) { 
            if (rule.ArielRoleString === 'User' && !rule.noErasmus && rule.CdS !== null && rule.CdS.FacultyKey !== null && $scope.projectCard.erasmusFacList.indexOf(rule.CdS.FacultyKey) === -1) { 
              $scope.projectCard.erasmusFacList.push(rule.CdS.FacultyKey);
            } 
          });
        });
      }
    };

    $scope.getPool = function(p) {
      $scope.searchContext.isPoolMode = true;
      $scope.isBack = true;

      portal.getPool(p.Project.Id).then(function(data) {
        $scope.result = data.Data; 
      });     
    };

    $scope.$on('quicksearch', function(event, keyword) {
      $scope.searchContext = { SearchFlags: {}, Keyword: keyword };
      $scope.search();
    });

    $scope.search();

  });
