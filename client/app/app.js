'use strict';

angular.module('itemManagementApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ui.bootstrap',
	'ngAnimate'
])
.config(function ($routeProvider, $locationProvider) {

	$routeProvider
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);

});