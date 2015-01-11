'use strict';

angular.module( 'itemManagementApp' )

.service( 'MessageService', [ '$rootScope', '$sce', '$interval',
                              function( $rootScope, $sce, $interval ){

	var scope = this;
	
	scope.showMessage = function( html, type ) {

		if( !$rootScope.messages ) {
			$rootScope.messages = [];
		}

		var message = { html : $sce.trustAsHtml( html ), type : type };
		$rootScope.messages.push( message );

		// auto dismiss message after 5 secs
		// must use $interval here instead of $timeout because protractor waits for all $timeout
		// so test cases to check if message is shown will fail because it will be removed by the time the test cases check
		$interval( function() {
			scope.removeMessage( message );
		}, 5000, 1 );

		return message;
	};

	scope.removeMessage = function( message ) {

		var index = $rootScope.messages.indexOf( message );
		$rootScope.messages.splice( index, 1 );

	};

}]);