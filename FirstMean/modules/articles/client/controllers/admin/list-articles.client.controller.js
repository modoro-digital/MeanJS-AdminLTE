(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ArticlesAdminListController', ArticlesAdminListController);

  ArticlesAdminListController.$inject = ['$state', '$window', 'ArticlesService', 'Notification'];

  function ArticlesAdminListController($state, $window, ArticlesService, Notification) {
    var vm = this;
    vm.articles = ArticlesService.query();
    vm.remove = remove;

    function remove(article) {
      if ($window.confirm('Are you sure you want to delete?')) {
        article.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article deleted successfully!' });
        });
      }
    }
  }
}());
