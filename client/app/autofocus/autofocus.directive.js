'use strict';

angular.module('itemManagementApp')

.directive( 'ngAutofocus', function( $timeout ) {

	return {

		scope : { trigger : '@ngAutofocus' },

		link : function( scope, element ) {

			scope.$watch( 'trigger', function() {

				// timeout must be used for modal to work
				$timeout( function() {
					element[0].focus();
				});
			});

		}

	};

});