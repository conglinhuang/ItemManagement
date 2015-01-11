'use strict';

angular.module( 'itemManagementApp' )

.controller( 'MessageCtrl', [ '$scope', '$rootScope', 'MessageService',
                                    function( $scope, $rootScope, MessageService ){

	$scope.close = function( message ) {
		MessageService.removeMessage( message );
	};

}]);