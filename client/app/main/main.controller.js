'use strict';

angular.module('itemManagementApp')

.controller( 'MainCtrl', function ( $scope, $http, $modal, $route, $timeout, Auth, MessageService ) {
	
	$scope.transactions = [];
	$scope.dateFormat = 'yyyy/MM/dd HH:mm';
	$scope.dateFormatNoTime = 'yyyy/MM/dd';
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	// Initialize criteria.
	if(!$scope.criteria) {

		$scope.criteria = {

			pageSize : 100,
			sort : 'createDate',
			sortOrder : -1,
			startDate : new Date(),
			endDate : new Date()

		};

		$scope.criteria.startDate.setHours(0);
		$scope.criteria.startDate.setMinutes(0);
		$scope.criteria.startDate.setSeconds(0);
		$scope.criteria.endDate.setHours(23);
		$scope.criteria.endDate.setMinutes(59);
		$scope.criteria.endDate.setSeconds(59);

	}

	// Auth, returns a function
	$scope.isLoggedIn = Auth.isLoggedIn;
	$scope.isAdmin = Auth.isAdmin;

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

				if( transaction.type === 'SELL' ) {

					$scope.totalPrice += transaction.item.price * transaction.quantity;
					$scope.totalQuantity += transaction.quantity;

				}

			});

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

	$scope.edit = function( transaction, type ) {

		transaction = transaction ? transaction : { quantity : 1, type : type };
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

		$scope.find(1);

	};

});

angular.module( 'itemManagementApp' )

.controller( 'TransactionCtrlEdit', function ( $scope, $http, $modalInstance, transaction, MessageService ) {
	
	$scope.transaction = transaction;
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