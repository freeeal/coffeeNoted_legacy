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
                console.log('user found with username:', username);
                console.log(user);
                return next();
            } else {
                console.log('failed to load user');
                res.end();
            }
        });

    });

    // route with parameters (/users/:username)
    router.get('/users/:username', function(req, res) {
        console.log("this is the user obj: " + req.user);
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
                var newCoffee = new Coffee();
                newCoffee.roaster = req.body.roaster;
                newCoffee.producer = req.body.producer;
                newCoffee.region = req.body.region;
                newCoffee.elevation = req.body.elevation;
                newCoffee.varietals = req.body.varietals;
                newCoffee.harvest = req.body.harvest;
                newCoffee.process = req.body.process;

                var newNote = new Note();
                newNote.author = req.user.local.username;
                newNote.text = req.body.note;

                newCoffee.save(function(err, user, coffee) {
                    if (err) {
                        console.log('error in saving coffee: ' + err);  
                        throw err;  
                    }

                    console.log('coffee note complete.');

                    user.update(
                        { $push: { coffees: newCoffee }}, { upsert: true }, function(err) {
                            if (err) {
                                    console.log(err);
                            } else {
                                    console.log('coffee added to user collection coffees array');
                            }
                        }
                    )

                    // coffee.update(
                    //     { $push: { notes: newNote }}, { upsert: true }, function(err) {
                    //         if (err) {
                    //             console.log(err);
                    //         } else {
                    //             console.log('note added to coffee collection notes array');
                    //         }
                    //     ]
                    // )
                    // FIGURE OUT HOW TO UPDATE COFFEE COLLECTION NOTES ARRAY:
                    // 1. IF NEW COFFEE
                    // 2. IF EXISTING COFFEE
                    
                    return user;      
                    // return user, coffee;
                });

                res.redirect('/users/:username');
            }
        });
    });

    // catch-all route, redirects all invalid paths to the profile
    router.get('/*', function(req, res) {
        res.redirect('/users/' + req.user.local.username);
    });

}