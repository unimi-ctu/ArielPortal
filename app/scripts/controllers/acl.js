'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:AclCtrl
 * @description
 * # AclCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('AclCtrl', function ($scope, portal) {
  	$scope.loadacl = function() {
  		$scope.acl = [];
  		portal.getAcl().success(function(data) {
        $scope.hasFavorites = data.Data.HasFavorites;
  			$scope.acl = data.Data.Messages;

  			// barbatrukking
  			var projects = [];

  			angular.forEach(data.Data.Projects, function(value, key) {
  				projects.push({ key: key, value: value});
  			});
  			$scope.projects = projects;
  		});
  	};

  	$scope.loadacl();

  });
