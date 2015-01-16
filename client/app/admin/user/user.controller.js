angular.module( 'itemManagementApp' )

.controller( 'UserCtrlEdit', function ( $scope, $http, $modalInstance, user, MessageService ) {
	
	$scope.user = user;

	$scope.save = function() {

		$scope.saving = true;

		var userBeforeSave = angular.copy( $scope.user );
		var url = $scope.user._id ? '/api/users/' + $scope.user._id : '/api/users';

		$http.post( url, $scope.user )
			.success( function( data ) {

				$modalInstance.close( $scope.user );
				MessageService.showMessage( "用户已保存", 'alert-success' );

			})
			.error( function( data ) {

				MessageService.showMessage( "用户保存失败", 'alert-danger' );

				$scope.saving = false;
				$scope.user = userBeforeSave;

			});
		
	};

	$scope.cancel = function() {
		$modalInstance.dismiss( 'cancel' );
	};

	$scope.setFormScope = function( scope ) {
		$scope.formScope = scope;
	};

});