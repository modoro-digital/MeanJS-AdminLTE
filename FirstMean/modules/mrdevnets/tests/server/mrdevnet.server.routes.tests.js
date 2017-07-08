'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Mrdevnet = mongoose.model('Mrdevnet'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  mrdevnet;

/**
 * Mrdevnet routes tests
 */
describe('Mrdevnet CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Mrdevnet
    user.save(function () {
      mrdevnet = {
        name: 'Mrdevnet name'
      };

      done();
    });
  });

  it('should be able to save a Mrdevnet if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Mrdevnet
        agent.post('/api/mrdevnets')
          .send(mrdevnet)
          .expect(200)
          .end(function (mrdevnetSaveErr, mrdevnetSaveRes) {
            // Handle Mrdevnet save error
            if (mrdevnetSaveErr) {
              return done(mrdevnetSaveErr);
            }

            // Get a list of Mrdevnets
            agent.get('/api/mrdevnets')
              .end(function (mrdevnetsGetErr, mrdevnetsGetRes) {
                // Handle Mrdevnets save error
                if (mrdevnetsGetErr) {
                  return done(mrdevnetsGetErr);
                }

                // Get Mrdevnets list
                var mrdevnets = mrdevnetsGetRes.body;

                // Set assertions
                (mrdevnets[0].user._id).should.equal(userId);
                (mrdevnets[0].name).should.match('Mrdevnet name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Mrdevnet if not logged in', function (done) {
    agent.post('/api/mrdevnets')
      .send(mrdevnet)
      .expect(403)
      .end(function (mrdevnetSaveErr, mrdevnetSaveRes) {
        // Call the assertion callback
        done(mrdevnetSaveErr);
      });
  });

  it('should not be able to save an Mrdevnet if no name is provided', function (done) {
    // Invalidate name field
    mrdevnet.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Mrdevnet
        agent.post('/api/mrdevnets')
          .send(mrdevnet)
          .expect(400)
          .end(function (mrdevnetSaveErr, mrdevnetSaveRes) {
            // Set message assertion
            (mrdevnetSaveRes.body.message).should.match('Please fill Mrdevnet name');

            // Handle Mrdevnet save error
            done(mrdevnetSaveErr);
          });
      });
  });

  it('should be able to update an Mrdevnet if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Mrdevnet
        agent.post('/api/mrdevnets')
          .send(mrdevnet)
          .expect(200)
          .end(function (mrdevnetSaveErr, mrdevnetSaveRes) {
            // Handle Mrdevnet save error
            if (mrdevnetSaveErr) {
              return done(mrdevnetSaveErr);
            }

            // Update Mrdevnet name
            mrdevnet.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Mrdevnet
            agent.put('/api/mrdevnets/' + mrdevnetSaveRes.body._id)
              .send(mrdevnet)
              .expect(200)
              .end(function (mrdevnetUpdateErr, mrdevnetUpdateRes) {
                // Handle Mrdevnet update error
                if (mrdevnetUpdateErr) {
                  return done(mrdevnetUpdateErr);
                }

                // Set assertions
                (mrdevnetUpdateRes.body._id).should.equal(mrdevnetSaveRes.body._id);
                (mrdevnetUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Mrdevnets if not signed in', function (done) {
    // Create new Mrdevnet model instance
    var mrdevnetObj = new Mrdevnet(mrdevnet);

    // Save the mrdevnet
    mrdevnetObj.save(function () {
      // Request Mrdevnets
      request(app).get('/api/mrdevnets')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Mrdevnet if not signed in', function (done) {
    // Create new Mrdevnet model instance
    var mrdevnetObj = new Mrdevnet(mrdevnet);

    // Save the Mrdevnet
    mrdevnetObj.save(function () {
      request(app).get('/api/mrdevnets/' + mrdevnetObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', mrdevnet.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Mrdevnet with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/mrdevnets/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Mrdevnet is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Mrdevnet which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Mrdevnet
    request(app).get('/api/mrdevnets/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Mrdevnet with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Mrdevnet if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Mrdevnet
        agent.post('/api/mrdevnets')
          .send(mrdevnet)
          .expect(200)
          .end(function (mrdevnetSaveErr, mrdevnetSaveRes) {
            // Handle Mrdevnet save error
            if (mrdevnetSaveErr) {
              return done(mrdevnetSaveErr);
            }

            // Delete an existing Mrdevnet
            agent.delete('/api/mrdevnets/' + mrdevnetSaveRes.body._id)
              .send(mrdevnet)
              .expect(200)
              .end(function (mrdevnetDeleteErr, mrdevnetDeleteRes) {
                // Handle mrdevnet error error
                if (mrdevnetDeleteErr) {
                  return done(mrdevnetDeleteErr);
                }

                // Set assertions
                (mrdevnetDeleteRes.body._id).should.equal(mrdevnetSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Mrdevnet if not signed in', function (done) {
    // Set Mrdevnet user
    mrdevnet.user = user;

    // Create new Mrdevnet model instance
    var mrdevnetObj = new Mrdevnet(mrdevnet);

    // Save the Mrdevnet
    mrdevnetObj.save(function () {
      // Try deleting Mrdevnet
      request(app).delete('/api/mrdevnets/' + mrdevnetObj._id)
        .expect(403)
        .end(function (mrdevnetDeleteErr, mrdevnetDeleteRes) {
          // Set message assertion
          (mrdevnetDeleteRes.body.message).should.match('User is not authorized');

          // Handle Mrdevnet error error
          done(mrdevnetDeleteErr);
        });

    });
  });

  it('should be able to get a single Mrdevnet that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Mrdevnet
          agent.post('/api/mrdevnets')
            .send(mrdevnet)
            .expect(200)
            .end(function (mrdevnetSaveErr, mrdevnetSaveRes) {
              // Handle Mrdevnet save error
              if (mrdevnetSaveErr) {
                return done(mrdevnetSaveErr);
              }

              // Set assertions on new Mrdevnet
              (mrdevnetSaveRes.body.name).should.equal(mrdevnet.name);
              should.exist(mrdevnetSaveRes.body.user);
              should.equal(mrdevnetSaveRes.body.user._id, orphanId);

              // force the Mrdevnet to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Mrdevnet
                    agent.get('/api/mrdevnets/' + mrdevnetSaveRes.body._id)
                      .expect(200)
                      .end(function (mrdevnetInfoErr, mrdevnetInfoRes) {
                        // Handle Mrdevnet error
                        if (mrdevnetInfoErr) {
                          return done(mrdevnetInfoErr);
                        }

                        // Set assertions
                        (mrdevnetInfoRes.body._id).should.equal(mrdevnetSaveRes.body._id);
                        (mrdevnetInfoRes.body.name).should.equal(mrdevnet.name);
                        should.equal(mrdevnetInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Mrdevnet.remove().exec(done);
    });
  });
});
