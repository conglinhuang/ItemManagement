'use strict';

angular.module('itemManagementApp')

.config(function ($routeProvider) {
	$routeProvider
		.when('/item', {
			templateUrl: 'app/item/item.html',
			controller: 'ItemCtrl'
		});
})