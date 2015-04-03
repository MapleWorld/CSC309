var express = require('express');
var router = express.Router();

router.get('/initiator', function(req, res) {
	if(req.session.authenticated) {
		res.render('initiator', {notif: req.flash('notif'),
						user_id: req.session.data.id,
						auth: req.session.authenticated});	
		return ;		
	}
	req.flash('notif', 'You are not login.');
	res.render('login', {notif: req.flash('notif'),
					 auth: req.session.authenticated});					
});

// Put data to DB | PUT
router.put('/initiator/update', function (req, res) {

	// Validation
	req.assert('initiator_firstname', 'First Name is required').notEmpty();
	req.assert('initiator_last','Last Name' is required').notEmpty();
	req.assert('initiator_address', 'Mailing Address is required').notEmpty();
	req.assert('initiator_phone','Phone Number is required').notEmpty();
	req.assert('initiator_gender','Gender is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.status(422).json(errors);
		return;
	}

	var data = {
		firstname 		: req.body.initiator_firstname,
		lastname		: req.body.initiator_lastname,
		mailing_address	: req.body.initiator_address,
		gender		 	: req.body.initiator_gender,
		phone	 		: req.body.initiator_phone,
		initiator_ready	: 1
	};

	req.getConnection(function (err, conn) {

		if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE user set ? WHERE id = ? ",[data,req.session.data.id], function(err, rows){
			if(err){
				console.log(err);
				return next("Mysql error, check your query");
			}

			// Update the user session
			var sql = 'SELECT * FROM user WHERE id =' + conn.escape(req.session.data.id);
						
			conn.query(sql, function(err, rows) {
				if (err) {
					console.log(err);
				}
				
				if (rows.length == 0){
					console.log("Can't update user session");
					return ;
				} 
				
				req.flash('notif', 'You have successfully completed the initiator form');
				req.session.data = rows[0];
	            req.session.authenticated = true;
				res.send({redirect: '/profile'});
			});
        });
	});
});

module.exports = router;
