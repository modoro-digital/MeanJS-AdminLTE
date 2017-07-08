'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Mrdevnets Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/mrdevnets',
      permissions: '*'
    }, {
      resources: '/api/mrdevnets/:mrdevnetId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/mrdevnets',
      permissions: ['get', 'post']
    }, {
      resources: '/api/mrdevnets/:mrdevnetId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/mrdevnets',
      permissions: ['get']
    }, {
      resources: '/api/mrdevnets/:mrdevnetId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Mrdevnets Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Mrdevnet is being processed and the current user created it then allow any manipulation
  if (req.mrdevnet && req.user && req.mrdevnet.user && req.mrdevnet.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
