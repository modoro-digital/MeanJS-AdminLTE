(function () {
  'use strict';

  angular
    .module('mrdevnets')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('mrdevnets', {
        abstract: true,
        url: '/mrdevnets',
        template: '<ui-view/>'
      })
      .state('mrdevnets.list', {
        url: '',
        templateUrl: 'modules/mrdevnets/client/views/list-mrdevnets.client.view.html',
        controller: 'MrdevnetsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Mrdevnets List'
        }
      })
      .state('mrdevnets.create', {
        url: '/create',
        templateUrl: 'modules/mrdevnets/client/views/form-mrdevnet.client.view.html',
        controller: 'MrdevnetsController',
        controllerAs: 'vm',
        resolve: {
          mrdevnetResolve: newMrdevnet
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mrdevnets Create'
        }
      })
      .state('mrdevnets.edit', {
        url: '/:mrdevnetId/edit',
        templateUrl: 'modules/mrdevnets/client/views/form-mrdevnet.client.view.html',
        controller: 'MrdevnetsController',
        controllerAs: 'vm',
        resolve: {
          mrdevnetResolve: getMrdevnet
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Mrdevnet {{ mrdevnetResolve.name }}'
        }
      })
      .state('mrdevnets.view', {
        url: '/:mrdevnetId',
        templateUrl: 'modules/mrdevnets/client/views/view-mrdevnet.client.view.html',
        controller: 'MrdevnetsController',
        controllerAs: 'vm',
        resolve: {
          mrdevnetResolve: getMrdevnet
        },
        data: {
          pageTitle: 'Mrdevnet {{ mrdevnetResolve.name }}'
        }
      });
  }

  getMrdevnet.$inject = ['$stateParams', 'MrdevnetsService'];

  function getMrdevnet($stateParams, MrdevnetsService) {
    return MrdevnetsService.get({
      mrdevnetId: $stateParams.mrdevnetId
    }).$promise;
  }

  newMrdevnet.$inject = ['MrdevnetsService'];

  function newMrdevnet(MrdevnetsService) {
    return new MrdevnetsService();
  }
}());
