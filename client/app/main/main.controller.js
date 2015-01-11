'use strict';

angular.module('itemManagementApp')

.controller( 'MainCtrl', function ( $scope, $http, $modal, $route, $timeout, MessageService ) {
	
	$scope.transactions = [];
	$scope.dateFormat = 'yyyy/MM/dd HH:mm';
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	// Initialize criteria.
	if(!$scope.criteria) {
		$scope.criteria = {};
	}
	if(!$scope.criteria.pageSize) {
		$scope.criteria.pageSize = 10;
	}
	if(!$scope.criteria.sort) {
		$scope.criteria.sort = 'createDate';
		$scope.criteria.sortOrder = -1;
	}

	$scope.find = function( page ) {

		if( page ) {
			$scope.criteria.page = page;	
		}

		$http.get( '/api/transactions', { params : $scope.criteria } )
		.success( function( data ) {

			$scope.totalElements = data.totalElements;
			$scope.transactions = data.content;

			// calculate totalAmount
			$scope.totalPrice = 0;
			$scope.totalQuantity = 0;

			angular.forEach( $scope.transactions, function( transaction ) {
				$scope.totalPrice += transaction.item.price * transaction.quantity;
				$scope.totalQuantity += transaction.quantity;
			});

		})
		.error( function( data) {
			MessageService.showMessage( "无法载入数据", 'alert-danger' );
		});

	};

	$scope.thresholdFind = function( page ) {

		// cancel the current timeout
		if( $scope.searchTimeout ) {
			$timeout.cancel( $scope.searchTimeout );
		}

		$scope.searchTimeout = $timeout( function() {
			$scope.find( page );
		}, 300);

	};

	$scope.onSort = function(sortBy, sortDir) {

		$scope.criteria.sort = sortBy;
		$scope.criteria.sortOrder = sortDir;
		$scope.find(1);

	};

	$scope.find(1);

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

	$scope.openDatePicker = function( $event, property ) {

		$event.preventDefault();
		$event.stopPropagation();

		$scope.startDateOpened = false;
		$scope.endDateOpened = false;

		$scope[property] = true;

	};

	$scope.shiftEndDate = function() {

		var endDate = $scope.criteria.endDate;

		if( endDate ) {

			endDate.setHours(23);
			endDate.setMinutes(59);
			endDate.setSeconds(59);

		}

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

	$scope.filterParentItem = function() {
		
		return function( item ) {

			// only allow parent to show
			if( item.childItems && item.childItems.length > 0 ) {
				return true;
			}

			return false;

		};

	}

});