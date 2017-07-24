(function () {
  'use strict';

  angular
    .module('core.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidebar', {
      title: 'Admin',
      state: 'admin',
      roles: ['admin'],
      type: 'dropdown'
    });
  }
}());
