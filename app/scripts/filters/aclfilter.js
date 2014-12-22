'use strict';

/**
 * @ngdoc filter
 * @name arielPortalApp.filter:aclFilter
 * @function
 * @description
 * # aclFilter
 * Filter in the portalApp.
 */
angular.module('portalApp')
  .filter('aclFilter', function () {
    return function (items, search) {
    	var retn = [];

    	if (search && search.projectKey) {
	    	angular.forEach(items, function(item) {
    			angular.forEach(item.Projects, function(p) {
    				if (p.ProjectKey === search.projectKey) {
			    		retn.push(item);
    				}
				});
	    	});
    	}
    	else {
    		retn = items;
    	}
      	return retn;
    };
  });
