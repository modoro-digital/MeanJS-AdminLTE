'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Mrdevnet = mongoose.model('Mrdevnet'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Mrdevnet
 */
exports.create = function(req, res) {
  var mrdevnet = new Mrdevnet(req.body);
  mrdevnet.user = req.user;

  mrdevnet.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mrdevnet);
    }
  });
};

/**
 * Show the current Mrdevnet
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var mrdevnet = req.mrdevnet ? req.mrdevnet.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  mrdevnet.isCurrentUserOwner = req.user && mrdevnet.user && mrdevnet.user._id.toString() === req.user._id.toString();

  res.jsonp(mrdevnet);
};

/**
 * Update a Mrdevnet
 */
exports.update = function(req, res) {
  var mrdevnet = req.mrdevnet;

  mrdevnet = _.extend(mrdevnet, req.body);

  mrdevnet.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mrdevnet);
    }
  });
};

/**
 * Delete an Mrdevnet
 */
exports.delete = function(req, res) {
  var mrdevnet = req.mrdevnet;

  mrdevnet.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mrdevnet);
    }
  });
};

/**
 * List of Mrdevnets
 */
exports.list = function(req, res) {
  Mrdevnet.find().sort('-created').populate('user', 'displayName').exec(function(err, mrdevnets) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mrdevnets);
    }
  });
};

/**
 * Mrdevnet middleware
 */
exports.mrdevnetByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mrdevnet is invalid'
    });
  }

  Mrdevnet.findById(id).populate('user', 'displayName').exec(function (err, mrdevnet) {
    if (err) {
      return next(err);
    } else if (!mrdevnet) {
      return res.status(404).send({
        message: 'No Mrdevnet with that identifier has been found'
      });
    }
    req.mrdevnet = mrdevnet;
    next();
  });
};
