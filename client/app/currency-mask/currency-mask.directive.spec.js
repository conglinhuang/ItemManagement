'use strict';

describe('Directive: currencyMask', function () {

  // load the directive's module
  beforeEach(module('itemManagementApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<currency-mask></currency-mask>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the currencyMask directive');
  }));
});