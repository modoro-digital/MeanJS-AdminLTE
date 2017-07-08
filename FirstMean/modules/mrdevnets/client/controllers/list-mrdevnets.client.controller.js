(function () {
  'use strict';

  angular
    .module('mrdevnets')
    .controller('MrdevnetsListController', MrdevnetsListController);

  MrdevnetsListController.$inject = ['MrdevnetsService'];

  function MrdevnetsListController(MrdevnetsService) {
    var vm = this;

    vm.mrdevnets = MrdevnetsService.query();
  }
}());
