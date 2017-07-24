(function () {
  'use strict';

  angular
    .module('chat')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('sidebar', {
      title: 'Chat',
      state: 'chat'
    });

    menuService.addSubMenuItem('sidebar','chat', {
      title: 'Chat box',
      state: 'chat'
    });
  }
}());
