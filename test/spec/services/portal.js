'use strict';

describe('Service: portal', function () {

  // load the service's module
  beforeEach(module('portalApp'));

  // instantiate service
  var portal;
  beforeEach(inject(function (_portal_) {
    portal = _portal_;
  }));

  it('should do something', function () {
    expect(!!portal).toBe(true);
  });

});
