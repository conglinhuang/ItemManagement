'use strict';

angular.module('itemManagementApp')

.directive( 'ngConfirmClick', function( $modal ) {

	return {

		restrict: 'A',

		/**
		 * since we can't use scope.$apply inside of another $digest,
		 * we use use isolated scope and invoke it directly
		 *
		 * http://docs.angularjs.org/error/$rootScope/inprog?p0=$apply
		 * http://stackoverflow.com/questions/15896985/angular-js-callback-function-inside-directive-attr-defined-in-different-attr
		 */
		scope : {
			confirmCallback : '&ngConfirmClick'
		},

		link: function( scope, element, attrs ) {

			element.bind( 'click', function() {

				var title = attrs.ngConfirmTitle;
				var message = attrs.ngConfirmMessage;

				var modalInstance = $modal.open({

					templateUrl : 'components/confirm/confirm.html',
					controller : 'ConfirmCtrl',
					resolve : {
						message : function() { return message; },
						title : function() { return title; }
					}

				});

				modalInstance.result.then( function(){
					scope.confirmCallback();
				});

			});

		}

	};

});