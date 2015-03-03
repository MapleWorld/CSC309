var express = require('express');
var router = express.Router();

router.get('/login', function (req, res) {
	res.render('login', {notif: req.flash('notif')});
});

//post data to DB | POST
router.post('/login', function (req, res) {
	
	// Validation
	req.assert('user_name', 'User Name is required').notEmpty();
	req.assert('password','Enter a password 6 - 20').len(6,20);

	var errors = req.validationErrors();
	
	if (errors) {
		res.status(422).json(errors);
		return;
	}

	// Get data
	var data = {
		username : req.body.user_name,
		password : req.body.password
	};
	
	var login_error = {
		msg: "Wrong User name or Password"
	};

	// Check with data in MySQL
	req.getConnection(function (err, conn) {

		if (err){
			return next("Cannot Connect");
		}
		
		var sql    = 'SELECT password FROM user WHERE username  =' + 
								conn.escape(data.username) + ' and password=' + conn.escape(data.password) ;
		conn.query(sql, function(err, rows) {

			if (err) {
				console.log(err);
			}
			
			if (rows.length == 0){
				res.status(422).json([login_error]);
				return ;
			}
			
			req.flash('notif', 'You have successfully logged in.');
			res.send({redirect: '/'});
		});

	});
	
});

module.exports = router;
