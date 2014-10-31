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
  .service('portal', function portal($http, $rootScope) {

  	var _searchContext = { SearchFlags: {} };

    var pipeline = function(promise) {
      return promise.then(function(response) {
        if (!response.data.User && $rootScope.user) {
          angular.element('body').prepend('<div>Sei uscito</div>');
          // alert
        }
        $rootScope.user = response.data.User;
        return response.data;

      });
    };



  	this.getSearchContext = function() {
  		return angular.copy(_searchContext);
  	};

  	this.setSearchContext = function(context) {
  		_searchContext = angular.copy(context);
  	};

    this.checkUser = function() {
      return pipeline($http.get(basePath + 'checkuser'));
    };

  	this.getFaculties = function() {
  		return pipeline($http.get(basePath + 'faculties', {cache: true }));
  	};

    this.getFacultiesWithCounts = function() {
      return pipeline($http.get(basePath + 'faculties/withcounts', {cache: true }));
    };

  	this.getCdses = function(facultyKey) {
  		return pipeline($http.get(basePath + 'faculty/' + facultyKey + '/cdses'));
  	};

    this.getSearch = function(searchContext) {
      var data = window.btoa(JSON.stringify(searchContext));
      return pipeline($http.get(basePath + 'search/' + data));
    };
  });
