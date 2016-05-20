// ROUTER THAT HANDLES ALL SECURE PAGES, WHERE USER IS AUTHENTICATED
var User = require('../models/user');
var Coffee = require('../models/coffee');
var Note = require('../models/note');
var config = require('../config/config');

module.exports = function(router, passport){
    // make sure a user is logged in
    router.use(function(req, res, next) {
        // if user is authenticated in the session, call the next() to call the next request handler; Passport adds this method to request object. 
        if (req.isAuthenticated())
            return next();
        // if the user is not authenticated then redirect them to the auth/login page
        res.redirect('/auth');
    });

    // PROFILE SECTION =========================
    // all param callbacks are called before any handler of any route in which the param occurs, and they will be called only once in a req-resp cycle
    router.param('username', function (req, res, next, username) {
        // perform database query from User model and returns user as a reqeust object w/ username when done'
        User.findOne({ 'local.username' : username }, function(err, user) {

            if (err) {
                return next(err);
            } else if (user) {
                req.user = user;
                // console.log('user found with username:', username);
                // console.log(user);
                return next();
            } else {
                console.log('failed to load user');
                res.end();
            }
        });

    });

    // route with parameters (/users/:username)
    router.get('/users/:username', function(req, res) {
        // console.log("this is the user obj: " + req.user);
        // return res.json(req.user);
        return res.render('profile', { user : req.user }); // get the user out of session and pass to template
    });

    // ACCEPT COFFEE REVIEWS TO PROFILE PAGE ======
    router.post('/users/:username', function(req, res) { 
        var coffeeName = req.body.coffeeName;

        // find if coffee is in DB
        Coffee.findOne({ 'coffeeName' : coffeeName }, function(err, user, coffee) {
            var user = req.user;

            if (err) {
                console.log('error while finding coffee');
            }

            if (!coffee) {
                console.log('cannot find the coffee: ' + coffeeName);
                var newCoffee = new Coffee();
                newCoffee.coffeeName = coffeeName;
                newCoffee.roaster = req.body.roaster;
                newCoffee.producer = req.body.producer;
                newCoffee.region = req.body.region;
                newCoffee.elevation = req.body.elevation;
                newCoffee.varietals = req.body.varietals;
                newCoffee.harvest = req.body.harvest;
                newCoffee.process = req.body.process;

                newCoffee.save(function(err, user) {
                    if (err) {
                        console.log('error in saving coffee: ' + err);  
                        throw err;  
                    }

                    var newNote = new Note();
                    newNote.coffee = newCoffee;
                    newNote.author = user;
                    newNote.text = req.body.note;
                    newNote.save(function(err, user) {
                        if (err) {
                            console.log('error in saving note: ' + err);
                            throw err;
                        }
                        console.log('coffee note complete.');
                    });

                    user.update(
                        { $push: { coffees: newCoffee }}, { upsert: true }, function(err) {
                            if (err) {
                                    console.log(err);
                            } else {
                                    console.log('coffee added to user collection coffees array');
                            }
                        }
                    );

                    newCoffee.update(
                        { $push: { notes: newNote }}, { upsert: true }, function(err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('note added to coffee collection notes array');
                            }
                        }
                    );
     
                    return user, newCoffee;
                });

                res.redirect('/');
            }

            // see if user has already noted that coffee before
            else {
                console.log('you have already reviewed the coffee before so you just added another note');
                var newNote = new Note();
                newNote.coffee = coffee;
                newNote.author = user;
                newNote.text = req.body.note;
                newNote.save(function(err, user) {
                    if (err) {
                        console.log('error in saving note: ' + err);
                        throw err;
                    }
                    console.log('coffee note complete.');
                });

                coffee.update(
                    { $push: { notes: newNote }}, { upsert: true }, function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('note added to coffee collection notes array');
                        }
                    }
                );

                return coffee;
            }

        });
    });

    // catch-all route, redirects all invalid paths to the profile
    router.get('/*', function(req, res) {
        res.redirect('/users/' + req.user.local.username);
    });

}