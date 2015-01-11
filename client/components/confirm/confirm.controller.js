'use strict';

angular.module( 'itemManagementApp' )

.controller( 'ConfirmCtrl', function( $scope, $modalInstance, message, title ) {

	// set title
	$scope.title = title ? title : '你确定吗?';

	// set message
	$scope.message = message;

	$scope.yes = function() {
		$modalInstance.close();
	};

	$scope.no = function() {
		$modalInstance.dismiss();
	};


});