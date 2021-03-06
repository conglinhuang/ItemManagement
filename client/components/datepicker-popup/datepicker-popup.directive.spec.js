'use strict';

describe('Directive: datepickerPopup', function () {

  // load the directive's module
  beforeEach(module('itemManagementApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<datepicker-popup></datepicker-popup>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the datepickerPopup directive');
  }));
});