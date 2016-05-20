var User = require('../models/user');
var Coffee = require('../models/coffee');

module.exports = function(router, passport){

	router.get('/listCoffees', function(req, res){
		res.json({ SecretData: 'blegh'});
	});

	router.get('/listUsers', function(req, res){

	});

	// // log API access requests
 //    router.use(function(req, res, next) {
 //        fs.appendFile('logs.txt', req.path + " token: " + req.query.access_token + "\n",
 //        function(err) {
 //            next();
 //        });
 //    });

 //    // make secured admin route for uploading books to database (add "?access_token=559c8615e43c90302256d46d" to route)
 //    router.get('/upload', function(req, res, next) { 
 //        // if admin user, move to next middleware in chain
 //        console.log(config.adminToken)
 //        if (req.query.access_token === config.adminToken) next();
 //        // if not admin user, go to next route that shows that the user is not allowed to upload books to db
 //        else next('route');
 //    }, passport.authenticate('bearer', { session: false }),         
 //        function(req, res) {
 //            // render admin uploads page if authenticated with bearer token and is admin user
 //            res.render('admin-uploads', { 
 //                user : req.user
 //            }); 
 //        }
 //    );

 //    router.get('/upload', function(req, res){
 //        res.json({ userAccess: false });
 //    });

 //    router.post('/upload', upload.single('bookPhoto'), function(req, res, next) {
 //        console.log(req.file);
 //        console.log(req.body);

 //        var newBook = new Book();
 //        newBook.bookName = req.body.bookName;
 //        newBook.authorName = req.body.authorName;
 //        if (process.env.NODE_ENV === 'dev') {
 //            newBook.imageUrl = 'https://s3.amazonaws.com/readigs-bucket-dev/' + req.file.key;
 //            console.log(newBook.imageUrl);
 //        }
 //        else {
 //            newBook.imageUrl = 'https://s3.amazonaws.com/readigs-bucket/' + req.file.key;
 //            console.log(newBook.imageUrl);
 //        }
 //        newBook.save(function(err) {
 //            if(err) return next(err);
 //            console.log('Book has been saved with file!');
 //            res.redirect('/upload');
 //        });

 //    });
}