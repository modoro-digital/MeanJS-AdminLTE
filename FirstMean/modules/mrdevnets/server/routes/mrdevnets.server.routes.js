'use strict';

/**
 * Module dependencies
 */
var mrdevnetsPolicy = require('../policies/mrdevnets.server.policy'),
  mrdevnets = require('../controllers/mrdevnets.server.controller');

module.exports = function(app) {
  // Mrdevnets Routes
  app.route('/api/mrdevnets').all(mrdevnetsPolicy.isAllowed)
    .get(mrdevnets.list)
    .post(mrdevnets.create);

  app.route('/api/mrdevnets/:mrdevnetId').all(mrdevnetsPolicy.isAllowed)
    .get(mrdevnets.read)
    .put(mrdevnets.update)
    .delete(mrdevnets.delete);

  // Finish by binding the Mrdevnet middleware
  app.param('mrdevnetId', mrdevnets.mrdevnetByID);
};
