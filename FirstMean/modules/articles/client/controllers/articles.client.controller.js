(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', '$sce', 'articleResolve', 'Authentication'];

  function ArticlesController($scope, $sce, article, Authentication) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.deliberatelyTrustDangerousSnippet = function() {
      return $sce.trustAsHtml(vm.article.content);
    };
  }
}());
