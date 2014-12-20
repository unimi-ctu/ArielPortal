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

  			for (var i = 0; i < data.Data.length; i++) {
  				for (var j = 0; j < data.Data[i].Projects.length; j++) {
  					console.log(data.Data[i].Projects[j].ProjectKey);
  				}
  			}
  		});
  	};

  	$scope.loadacl();

  });
