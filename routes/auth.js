// ROUTER THAT HANDLES ALL AUTHENTICATION PAGES

// define routes for application in this module which takes the instance of Passport created in app.js
module.exports = function(router, passport, db){

    // show the home page (will also have our login links)
    // localhost:3000/auth/
    router.get('/', function(req, res) {
		res.render('index', { message: req.flash('message'),
							  user: req.user });
	});

// =============================================================================
// AUTHENTICATICATION (FOR FIRST LOGIN) ========================================
// =============================================================================

  	// locally --------------------------------
        // LOGIN ===============================
        // render the login form
        // localhost:3000/auth/login
		router.get('/login', function(req, res) {
			res.render('login', { message: req.flash('message') });
		});
		// handle login POST
		router.post('/login', passport.authenticate('local-login', { // this is the static authenticate method of model in LocalStrategy, used as middleware to authenticate the request
			successRedirect: '/profile', 
			failureRedirect: '/auth/login',
			failureFlash : true  
		}));

		// SIGNUP =================================
		// render the signup form
		// localhost:3000/auth/register
		router.get('/register', function(req, res){
			res.render('register', { message: req.flash('message') });
		});
		// handle signup POST
		router.post('/register', passport.authenticate('local-signup', {
			successRedirect: '/profile',
			failureRedirect: '/auth/register',
			failureFlash : true 
		}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // // locally --------------------------------
    //     router.get('/connect/local', function(req, res) {
    //         res.render('local-connect', { message: req.flash('message') });
    //     });
    //     router.post('/connect/local', passport.authenticate('local-signup', {
    //         successRedirect : '/account', // redirect to the secure profile section
    //         failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
    //         failureFlash : true // allow flash messages
    //     }));

	// HANDLE LOGOUT ==============================
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
}