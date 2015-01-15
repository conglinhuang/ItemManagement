'use strict';

angular.module('itemManagementApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

  // Auth, returns a function
  $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = '密码已修改';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = '密码错误';
          $scope.message = '';
        });
      }
		};
  });
