'use strict';

angular.module( 'itemManagementApp' )

.controller( 'ItemCtrl', function ( $scope, $http, $modal, $timeout, Auth, MessageService ) {
	
	$scope.items = [];
	$scope.sort = {
		predicate : 'name',
		reverse : false
	}

	// Auth, returns a function
	$scope.isLoggedIn = Auth.isLoggedIn;
	$scope.isAdmin = Auth.isAdmin;

	$scope.load = function() {

		// cancel the current timeout
		if( $scope.loadTimeout ) {
			$timeout.cancel( $scope.loadTimeout );
		}

		$scope.loadTimeout = $timeout( function() {
			
			$scope.items = [];
			$scope.loading = true;

			$http.get( '/api/items' ).success( function( items ) {

				$scope.items = items;

				angular.forEach( $scope.items, function( item ) {
					item.isLow = item.quantity <= item.lowQuantity;
				});

				$scope.loading = false;

			});

		}, 300);

	};

	$scope.load();

	$scope.edit = function( item ) {

		var initial = angular.copy( item );

		// open a modal popover
		var modalInstance = $modal.open({

			templateUrl : 'app/item/item.edit.html',
			controller : 'ItemCtrlEdit',
			resolve : {
				item : function() {
					return item;
				},
				items : function() {
					return $scope.items;
				}
			}

		});

		// reload when modal is closed or cancelled
		modalInstance.result.then(

			// when modal is closed (OK)
			function() {
				$scope.load();
			},

			// when modal is cancelled (Cancel)
			function() {
				angular.copy( initial, item );
			}

		);

	};

	$scope.deleteItem = function( item ) {

		$http.delete( '/api/items/' + item._id )
			.success( function() {
				MessageService.showMessage( "物品已删除", 'alert-success' );
				$scope.load();
			})
			.error(	function() {
				MessageService.showMessage( "物品删除失败", 'alert-danger' );
			});
	};

});

angular.module( 'itemManagementApp' )

.controller( 'ItemCtrlEdit', function ( $scope, $http, $modalInstance, item, items, MessageService ) {
	
	$scope.item = item ? item : {};

	if( items ) {

		$scope.items = angular.copy( items );

		// remove this item
		var index = items.indexOf( item );
		if( index > 0) {
			$scope.items.splice( index , 1 );
		};

	}

	$scope.save = function() {

		$scope.saving = true;

		var itemBeforeSave = angular.copy( $scope.item );

		// set child item ids

		if( $scope.item.childItems ) {

			angular.forEach( $scope.item.childItems, function( childItem ) {

				if( childItem && childItem.item && !childItem.item.id ) {
					childItem.item.id = childItem.item._id;
				}

			});

		}

		// post data

		var url = $scope.item._id ? '/api/items/' + $scope.item._id : '/api/items';

		$http.post( url, $scope.item )
			.success( function( data ) {

				$modalInstance.close( $scope.item );
				MessageService.showMessage( "物品已保存", 'alert-success' );

			})
			.error( function( data ) {

				MessageService.showMessage( "物品保存失败", 'alert-danger' );

				$scope.saving = false;
				$scope.item = itemBeforeSave;

			});
		
	};

	$scope.cancel = function() {
		$modalInstance.dismiss( 'cancel' );
	};

	$scope.setFormScope = function( scope ) {
		$scope.formScope = scope;
	};

	$scope.filterSelectedChild = function() {
		
		return function( listItem ) {

			// only allow one level of parent-child

			if( listItem.childItems && listItem.childItems.length > 0 ) {
				return false;
			}

			// check when item is already selected

			if(  $scope.item.childItems ) {

				for( var i = 0; i < $scope.item.childItems.length; i++ ) {

					var childItem = $scope.item.childItems[i].item;

					if( childItem.id === listItem._id || childItem._id === listItem._id ) {
						return false;
					}

				}

			}

			return true;

		};

	}

	$scope.selectChildItem = function( item ) {

		if( !$scope.item.childItems ) {
			$scope.item.childItems = [];
		}

		$scope.item.childItems.push({
			item : item,
			quantity : 1
		});

		$scope.childItem = null;
	}

	$scope.deleteChildItem = function( childItem ) {

		var index = $scope.item.childItems.indexOf( childItem );
		$scope.item.childItems.splice( index , 1 );

	}

});