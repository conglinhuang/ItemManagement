'use strict';

angular.module('itemManagementApp')

.controller( 'MainCtrl', function ( $scope, $http, $modal, $route, MessageService ) {
	
	$scope.transactions = [];
	$scope.sort = {
		predicate : 'item.name',
		reverse : false
	}

	$http.get( '/api/transactions' ).success( function( transactions ) {
		$scope.transactions = transactions;
	});

	$scope.edit = function( transaction ) {

		var initial = angular.copy( transaction );

		// open a modal popover
		var modalInstance = $modal.open({

			templateUrl : 'app/main/transaction.edit.html',
			controller : 'TransactionCtrlEdit',
			resolve : {
				transaction : function() {
					return transaction;
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
				angular.copy( initial, transaction );
			}

		);

	};

	$scope.deleteTransaction = function( transaction ) {

		$http.delete( '/api/transactions/' + transaction._id )
			.success( function() {
				$route.reload();
				MessageService.showMessage( "交易已删除", 'alert-success' );
			})
			.error( function() {
				MessageService.showMessage( "交易删除失败", 'alert-danger' );
			});
	};

});

angular.module( 'itemManagementApp' )

.controller( 'TransactionCtrlEdit', function ( $scope, $http, $modalInstance, transaction, MessageService ) {
	
	$scope.transaction = transaction ? transaction : { quantity : 1 };
	$scope.items = [];
	$http.get( '/api/items' ).success( function( items ) {
		$scope.items = items;
	});

	$scope.save = function() {

		$scope.saving = true;

		var transactionBeforeSave = angular.copy( $scope.transaction );
		var url = $scope.transaction._id ? '/api/transactions/' + $scope.transaction._id : '/api/transactions';

		$http.post( url, $scope.transaction )
			.success( function( data ) {

				$modalInstance.close( $scope.transaction );
				MessageService.showMessage( "交易已保存", 'alert-success' );

			})
			.error( function( data ) {

				MessageService.showMessage( data ? data : "交易保存失败", 'alert-danger' );

				$scope.saving = false;
				$scope.transaction = transactionBeforeSave;

			});
		
	};

	$scope.cancel = function() {
		$modalInstance.dismiss( 'cancel' );
	};

	$scope.setFormScope = function( scope ) {
		$scope.formScope = scope;
	};

});