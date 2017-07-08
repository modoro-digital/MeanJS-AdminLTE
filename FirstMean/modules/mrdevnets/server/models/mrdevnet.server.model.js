'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Mrdevnet Schema
 */
var MrdevnetSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Mrdevnet name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Mrdevnet', MrdevnetSchema);
