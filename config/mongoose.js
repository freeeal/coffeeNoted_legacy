// UPDATE configuration file to use Mongoose

// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
	mongoose = require('mongoose');	// require Mongoose module

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	var db = mongoose.connect(config.db); // connect to MongoDB instance using db property of configuration object

	var notes = require('../models/note');
	var coffees = require('../models/coffee');

	// Load the 'User' model 
	var User = require('../models/user');

	// Attach listener to connected event
	mongoose.connection.once('connected', function (err) {
		if (err) throw err;
	  	console.log("Connected to coffeenoted-" + process.env.NODE_ENV + " database...");
	});

	// Return the Mongoose connection instance
	return db;
}

