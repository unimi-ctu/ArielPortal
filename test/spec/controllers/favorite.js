'use strict';

describe('Controller: FavoriteCtrl', function () {

  // load the controller's module
  beforeEach(module('arielPortalApp'));

  var FavoriteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FavoriteCtrl = $controller('FavoriteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
