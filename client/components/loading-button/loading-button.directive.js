'use strict';

angular.module('itemManagementApp')

.directive( 'btnLoading', function () {

	return {
		link:function (scope, element, attrs) {
			scope.$watch(
				function () {
					return scope.$eval(attrs.btnLoading);
				},
				function (value) {

					var disabled = scope.$eval(attrs.ngDisabled);

					if(value) {
						if (!disabled) {
							element.addClass('disabled').attr('disabled', 'disabled');
						}

						var loadingText = attrs.loadingText;
						loadingText = loadingText ? loadingText : 'Loading...';

						element.data('resetText', element.html());
						element.html( '<i class="fa fa-spin fa-refresh button-spinner"></i> ' + loadingText );

					} else {
						if (!disabled) {
							element.removeClass('disabled').removeAttr('disabled');
						}

						element.html(element.data('resetText'));
					}
				}
			);
		}
	};

});