var express = require('express');
var router = express.Router();

router.get('/funder', function(req, res) {
	if(req.session.authenticated) {
		res.render('funder', {notif: req.flash('notif'),
						auth: req.session.authenticated});	
		return ;	
	}
	req.flash('notif', 'You are not login.');
	res.render('login', {notif: req.flash('notif'),
					 auth: req.session.authenticated});		
});

// Put data to DB | PUT
router.put('/funder/update', function (req, res) {

	// Validation
	req.assert('funder_organization', 'Organization is required').notEmpty();
	req.assert('funder_interest','Interest is required').notEmpty();
	req.assert('funder_money','Money is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.status(422).json(errors);
		return;
	}

	var data = {
		organization	: req.body.funder_organization,
		interest 		: req.body.funder_interest,
		money		 	: req.body.funder_money
	};

	req.getConnection(function (err, conn) {

		if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE user set ? WHERE id = ? ",[data,req.session.data.id], function(err, rows){
			if(err){
				console.log(err);
				return next("Mysql error, check your query");
			}

			req.flash('notif', 'You have successfully completed the funder form');
			res.send({redirect: '/profile'});
        });
	});
});

module.exports = router;
