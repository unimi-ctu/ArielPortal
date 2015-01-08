'use strict';

describe('Controller: QuicksearchCtrl', function () {

  // load the controller's module
  beforeEach(module('arielPortalApp'));

  var QuicksearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuicksearchCtrl = $controller('QuicksearchCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
