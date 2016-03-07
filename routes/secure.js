// ROUTER THAT HANDLES ALL SECURE PAGES, WHERE USER IS AUTHENTICATED
var Review = require('../models/review');
var Book = require('../models/book');
var User = require('../models/user');
// CONFIGURE THE MULTER =============================================== for parsing multipart/form-data
var config = require('../config/config');

module.exports = function(router, passport){
    // make sure a user is logged in
    router.use(function(req, res, next) {
        // if user is authenticated in the session, call the next() to call the next request handler; Passport adds this method to request object. 
        if (req.isAuthenticated())
            return next();
        // if the user is not authenticated then redirect him to the auth/login page
        res.redirect('/auth');
    });

    // working here....
    // PROFILE SECTION =========================
    router.get('/profile', function(req, res) {
        res.render('profile', { 
            user : req.user,                  // get the user out of session and pass to template
            message : req.flash('message')
        }); 
    });

    // // PROFILE SECTION =========================
    // router.get('/profile', function(req, res) {
    //     res.redirect('/:username');
    // });
    router.param('username', function (req, res, next, username) {
        // perform database query that returns user w/ username when done
        User.findOne({$or: [ 
                                { 'local.username' : username },
                                { 'twitter.username' : username }
                            ]
                    }, function(err, user) {

                        if (err) return next(err);

                        if (!user) {
                            console.log('blah');
                            res.end();
                        } //no such users.

                        else {
                            req.user = user;
                            console.log('user found with username ', username);
                            return next();
                        } 
                    }
        );

    });

    router.get('/users/:username', function(req, res, next) {
        return res.render('user', { user: req.user });
    });


    // // ACCEPT REVIEW POSTS TO PROFILE PAGE ======
    // router.post('/profile', function(req, res, bookName) {

    //     var bookName = req.body.bookName;
    //         // find if the book is in db
    //         Book.findOne({ 'bookName' : bookName }, function(err, book, review, user, rating) {

    //             var user = req.user;

    //             if (err) {
    //                 console.log('error while finding book');
    //                 throw err;
    //             }

    //             if (!book) {
    //                 console.log('cannot find the book: ' + bookName);
    //                 req.flash('message', 'could not find that book. try again!');
    //                 res.redirect('/profile');
    //             }

    //             else {
    //                 // see if user has already reviewed the book before
    //                 var query = Review.where({
    //                     'bookName' : bookName,
    //                     'reviewer' : req.user.local.fullName || req.user.facebook.fullName || req.user.twitter.fullName || req.user.google.fullName
    //                 });

    //                 query.findOne(function(err, review) {
    //                     if (err) {
    //                         console.log('error while finding review');
    //                         throw err;
    //                     }

    //                     if (review) {
    //                         console.log('you have already reviewed this book');
    //                         req.flash('message', 'you have already reviewed that book! click the reviews tab in the navbar above to see your review');
    //                         res.redirect('/profile');
    //                     }

    //                     else {

    //                         var newReview = new Review();

    //                         newReview.reviewer = req.user.local.fullName || req.user.facebook.fullName || req.user.twitter.fullName || req.user.google.fullName;
    //                         newReview.reviewBody = req.body.reviewBody;
    //                         newReview.bookName = book.bookName;
    //                         newReview.ratingValue = req.body.rating;
    //                         newReview.imageUrl = book.imageUrl;
    //                         newReview.authorName = book.authorName;

    //                         newReview.save(function(err) {
    //                             if (err) {
    //                                 console.log('error in saving review: ' + err);  
    //                                 throw err;  
    //                             }

    //                             console.log('book review complete.');    
    //                             console.log('book reviewer is ' + newReview.reviewer);
    //                             console.log('book review: ' + newReview.reviewBody);
    //                             console.log('book rating is ' + newReview.ratingValue);
    //                             console.log('book image url is ' + newReview.imageUrl);

    //                             user.update(
    //                                 { $push: { reviews: newReview }},
    //                                 { upsert: true }, function(err) {
    //                                     if (err) {
    //                                         console.log(err);
    //                                     }
    //                                     else {
    //                                         console.log('review added to user collection reviews array');
    //                                     }
    //                                 }
    //                             )

    //                             book.update(
    //                                 { $push: { reviews: newReview }},
    //                                 { upsert: true }, function(err) {
    //                                     if (err) {
    //                                         console.log(err);
    //                                     }
    //                                     else {
    //                                         console.log('review added to book collection reviews array');
    //                                     }
    //                                 }
    //                             )
                                
    //                             return user, book;
    //                         });

    //                         res.redirect('/reviews');
    //                     }
    //                 })
    //             }
    //         })

    // });

    // catch-all route, redirects all invalid paths to the profile
    router.get('/*', function(req, res) {
        res.redirect('/profile');
    });

}