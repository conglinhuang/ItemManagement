'use strict';

describe('Directive: sortby', function () {

  // load the directive's module and view
  beforeEach(module('itemManagementApp'));
  beforeEach(module('components/sortby/sortby.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sortby></sortby>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the sortby directive');
  }));
});