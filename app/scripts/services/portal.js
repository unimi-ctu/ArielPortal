'use strict';

var basePath = 'http://api.unimi.it/ArielPortalAPI/api/user/';

/**
 * @ngdoc service
 * @name portalApp.portal
 * @description
 * # portal
 * Service in the portalApp.
 */
angular.module('portalApp')
  .service('portal', function portal($http) {

  	var _searchContext = {};

  	this.getSearchContext = function() {
  		return angular.copy(_searchContext);
  	};

  	this.setSearchContext = function(context) {
  		_searchContext = angular.copy(context);
  	};

  	this.getFaculties = function() {
  		return $http.get(basePath + 'faculties', {cache: true });
  	};

    this.getFacultiesWithCounts = function() {
      return $http.get(basePath + 'faculties/withcounts', {cache: true });
    };

  	this.getCdses = function(facultyKey) {
  		return $http.get(basePath + 'faculty/' + facultyKey + '/cdses');
  	};

    this.getSearch = function(searchContext) {
      var data = window.btoa(JSON.stringify(searchContext));
      return $http.get(basePath + 'search/' + data);
    };
  });
