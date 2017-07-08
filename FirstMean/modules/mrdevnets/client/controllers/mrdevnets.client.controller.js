(function () {
  'use strict';

  // Mrdevnets controller
  angular
    .module('mrdevnets')
    .controller('MrdevnetsController', MrdevnetsController);

  MrdevnetsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'mrdevnetResolve'];

  function MrdevnetsController ($scope, $state, $window, Authentication, mrdevnet) {
    var vm = this;

    vm.authentication = Authentication;
    vm.mrdevnet = mrdevnet;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Mrdevnet
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.mrdevnet.$remove($state.go('mrdevnets.list'));
      }
    }

    // Save Mrdevnet
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.mrdevnetForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.mrdevnet._id) {
        vm.mrdevnet.$update(successCallback, errorCallback);
      } else {
        vm.mrdevnet.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('mrdevnets.view', {
          mrdevnetId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
