'use strict';

angular.module('itemManagementApp')

.directive('sortBy', function () {
	return {
		templateUrl: 'app/sortby/sortby.directive.html',
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			sortdir: '=',
			sortedby: '=',
			sortvalue: '@',
			onsort: '='
		},
		link: function (scope) {
			scope.sort = function () {
				if (scope.sortedby === scope.sortvalue) {
					scope.sortdir = scope.sortdir === '1' ? '-1' : '1';
				}
				else {
					scope.sortedby = scope.sortvalue;
					scope.sortdir = '1';
				}
				scope.onsort(scope.sortedby, scope.sortdir);
			};
		}
	};

});