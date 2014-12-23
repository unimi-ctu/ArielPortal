'use strict';

/**
 * @ngdoc service
 * @name portalApp.portal
 * @description
 * # portal
 * Service in the portalApp.
 */
angular.module('portalApp')
  .service('portal', function portal($http, $rootScope, ENV) {

  	var _searchContext = { searchParams: { SearchFlags: {} } };

    // var pipeline = function(promise) {
    //   return promise.then(function(response) {
    //     if (!response.data.User && $rootScope.user) {
    //       angular.element('body').prepend('<div>Sei uscito</div>');
    //       // alert
    //     }
    //     $rootScope.user = response.data.User;
    //     return response.data;

    //   });
    // };



  	this.getSearchContext = function() {
  		return angular.copy(_searchContext);
  	};

  	this.setSearchContext = function(context) {
  		_searchContext = angular.copy(context);
  	};

    this.checkUser = function() {
      return $http.get(ENV.apiEndPoint + 'checkuser');
    };

  	this.getFaculties = function() {
  		return $http.get(ENV.apiEndPoint + 'faculties', {cache: true });
  	};

    // this.getFacultiesWithCounts = function() {
    //   return pipeline($http.get(ENV.apiEndPoint + 'faculties/withcounts', {cache: true }));
    // };

  	this.getCdses = function(facultyKey) {
  		return $http.get(ENV.apiEndPoint + 'faculty/' + facultyKey + '/cdses');
  	};

    this.getSearch = function(searchContext) {
      var data = window.btoa(JSON.stringify(searchContext));
      return $http.get(ENV.apiEndPoint + 'search/' + data);
    };

    this.getPool = function(projectId) {
      return $http.get(ENV.apiEndPoint + 'pool/' + projectId);
    };

    this.getFavorites = function() {
      return $http.get(ENV.apiEndPoint + 'favorites');
    };

    this.toggleFavorite = function(projectId) {
      return $http.get(ENV.apiEndPoint + 'project/' + projectId + '/toggleFavorite');
    };

    this.setFavoriteColor = function(projectId, color) {
      return $http.get(ENV.apiEndPoint + 'project/' + projectId + '/setFavoriteColor/' + color);
    };
	
  	this.getProject = function(projectId) {
  	  return $http.get(ENV.apiEndPoint + 'project/' + projectId);
  	};

    this.getAcl = function() {
      return $http.get(ENV.apiEndPoint + 'acl');
    };

  });
