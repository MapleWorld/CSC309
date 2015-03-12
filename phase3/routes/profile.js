var express = require('express');
var router = express.Router();

router.get('/profile', function(req, res) {
	if(req.session.authenticated) {
    	res.render('profile', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data: [req.session.data],
					 user_id: req.session.data.id});		
    }else{
    	req.flash('notif', 'You are not log in.');
    	res.render('login', {notif: req.flash('notif'),
					 auth: req.session.authenticated});	
    }
});

// Get all user data
router.get('/profile/users', function(req, res, next) {

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM user', function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

			res.render('profile', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data:rows});	
         });

    });

});

//Get specific user data
router.get('/profile/:user_id', function(req, res, next) {

	var user_id = req.params.user_id;
	req.getConnection(function(err,conn){
		if (err){
			console.log(err);
			return next("Cannot Connect");
		}

		var query = conn.query("SELECT * FROM user WHERE id = ? ",[user_id], function(err,rows){

			if(err){
				console.log(err);
				return next("Mysql error, check your query");
			}

			//if user not found
			if(rows.length < 1){
				return res.send("User Not found");
			}

			res.render('profile', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data:rows});	
		});
		
	});
	
});


module.exports = router;
