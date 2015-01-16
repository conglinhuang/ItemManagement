'use strict';

angular.module('itemManagementApp')

.controller( 'AdminCtrl', function ( $scope, $http, $modal, $route, Auth, User ) {

	// Use the User $resource to fetch all users
	$scope.users = User.query();

	// Auth, returns a function
	$scope.isLoggedIn = Auth.isLoggedIn;

	$scope.edit = function( user ) {

		user = user ? user : {};
		var initial = angular.copy( user );

		// open a modal popover
		var modalInstance = $modal.open({

			templateUrl : 'app/admin/user/user.edit.html',
			controller : 'UserCtrlEdit',
			resolve : {
				user : function() {
					return user;
				}
			}

		});

		// reload when modal is closed or cancelled
		modalInstance.result.then(

			// when modal is closed (OK)
			function() {
				$route.reload();
			},

			// when modal is cancelled (Cancel)
			function() {
				angular.copy( initial, user );
			}

		);

	};


	$scope.delete = function(user) {

		User.remove({ id: user._id });

		angular.forEach( $scope.users, function(u, i) {

			if (u === user) {
				$scope.users.splice(i, 1);
			}

		});

	};
});