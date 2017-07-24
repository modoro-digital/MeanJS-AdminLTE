(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('sidebar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });
  }
}());
