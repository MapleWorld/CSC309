var express = require('express');
var router = express.Router();

router.get('/initiator', function(req, res) {
	if(req.session.authenticated) {
		res.render('initiator', {notif: req.flash('notif'),
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
	req.assert('initiator_address', 'Mailing Address is required').notEmpty();
	req.assert('initiator_phone','Phone Number is required').notEmpty();
	req.assert('initiator_gender','Gender is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.status(422).json(errors);
		return;
	}

	var data = {
		mailing_address	: req.body.initiator_address,
		phone	 		: req.body.initiator_phone,
		gender		 	: req.body.initiator_gender
	};

	req.getConnection(function (err, conn) {

		if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE user set ? WHERE id = ? ",[data,req.session.data.id], function(err, rows){
			if(err){
				console.log(err);
				return next("Mysql error, check your query");
			}

			req.flash('notif', 'You have successfully completed the initiator form');
			res.send({redirect: '/profile'});
        });
	});
});

module.exports = router;
