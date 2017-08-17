(function () {
  'use strict';

  angular.module('core')
    .directive('pageTitle', pageTitle);

  pageTitle.$inject = ['$rootScope', '$interpolate', '$state', '$translate'];

  function pageTitle($rootScope, $interpolate, $state, $translate) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;
    function link(scope, element) {
      $rootScope.$on('$stateChangeSuccess', listener);
      function listener(event, toState) {
        var applicationCoreTitle = 'Cyber Air',
          separeteBy = ' - ';
        if (toState.data && toState.data.pageTitle) {
          var stateTitle = $interpolate(toState.data.pageTitle)($state.$current.locals.globals);
          $translate(stateTitle).then(function (headtitle) {
            element.html(applicationCoreTitle + separeteBy + headtitle);
          }, function (translationId) {
            element.html(applicationCoreTitle + separeteBy + translationId);
          });
        } else {
          element.html(applicationCoreTitle);
        }
      }
    }
  }
}());
