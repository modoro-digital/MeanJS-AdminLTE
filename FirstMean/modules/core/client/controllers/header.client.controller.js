(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function HeaderController($scope, $state, Authentication, menuService) {
    var vm = this;
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.signOut = function () {
      window.location.href  = '/api/auth/signout';
    }
  }
}());
