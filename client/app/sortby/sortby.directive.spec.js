'use strict';

describe('Directive: sortby', function () {

  // load the directive's module
  beforeEach(module('itemManagementApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sortby></sortby>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sortby directive');
  }));
});