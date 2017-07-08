(function () {
  'use strict';

  angular
    .module('mrdevnets')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Mrdevnets',
      state: 'mrdevnets',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'mrdevnets', {
      title: 'List Mrdevnets',
      state: 'mrdevnets.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'mrdevnets', {
      title: 'Create Mrdevnet',
      state: 'mrdevnets.create',
      roles: ['user']
    });
  }
}());
