/**
 * Created by mrdevnet on 7/21/2017 AD.
 */
(function () {
  'use strict';

  angular
    .module('core')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function SidebarController($scope, $state, Authentication, menuService) {
    var vm = this;
    vm.authentication = Authentication;
    vm.menu = menuService.getMenu('sidebar');
  }
}());
