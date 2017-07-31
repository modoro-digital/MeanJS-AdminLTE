(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ArticlesAdminListController', ArticlesAdminListController);

  ArticlesAdminListController.$inject = ['$window', 'ArticlesService'];

  function ArticlesAdminListController($window, ArticlesService) {
    var vm = this;
    vm.articles = ArticlesService.query();
  }
}());
