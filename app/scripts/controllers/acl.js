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
		portal.getAcl().then(function(data) {
			$scope.acl = data.Data;
		});
	};


	$scope.loadacl();
  });
