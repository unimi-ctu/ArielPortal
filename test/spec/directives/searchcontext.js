'use strict';

describe('Directive: searchContext', function () {

  // load the directive's module
  beforeEach(module('portalApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<search-context></search-context>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the searchContext directive');
  }));
});
