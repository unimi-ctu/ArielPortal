'use strict';

describe('Filter: aclFilter', function () {

  // load the filter's module
  beforeEach(module('arielPortalApp'));

  // initialize a new instance of the filter before each test
  var aclFilter;
  beforeEach(inject(function ($filter) {
    aclFilter = $filter('aclFilter');
  }));

  it('should return the input prefixed with "aclFilter filter:"', function () {
    var text = 'angularjs';
    expect(aclFilter(text)).toBe('aclFilter filter: ' + text);
  });

});
