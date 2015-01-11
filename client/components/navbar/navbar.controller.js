'use strict';

angular.module('itemManagementApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': '主页',
        'link': '/'
      }, {
        'title' : '物品管理',
        'link' : '/item'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });