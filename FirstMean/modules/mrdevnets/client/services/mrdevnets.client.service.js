// Mrdevnets service used to communicate Mrdevnets REST endpoints
(function () {
  'use strict';

  angular
    .module('mrdevnets')
    .factory('MrdevnetsService', MrdevnetsService);

  MrdevnetsService.$inject = ['$resource'];

  function MrdevnetsService($resource) {
    return $resource('api/mrdevnets/:mrdevnetId', {
      mrdevnetId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
