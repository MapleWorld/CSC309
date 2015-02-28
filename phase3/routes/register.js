var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.send('Welcome');
});

//post data to DB | POST
router.post('/', function (req, res) {

	// Validation
	req.assert('user_name', 'User Name is required').notEmpty();
	req.assert('first_name','First Name is required').notEmpty();
	req.assert('last_name','Last Name is required').notEmpty();
	req.assert('email','A valid email is required').isEmail();
	req.assert('password','Enter a password 6 - 20').len(6,20);

	var errors = req.validationErrors();
	if (errors) {
		res.status(422).json(errors);
		return;
	}

	// Get data
	var data = {
		username : req.body.user_name,
		firstname : req.body.first_name,
		lastname : req.body.last_name,
		password : req.body.password,
		email : req.body.email
	};

	/* EMAIL AND USERNAME MUST BE UNIQUE */
	/*
	var data = {username: '1user6',
	firstname: 'first',
	lastname: 'last',
	password: 'password',
	email: 'test22312s3@email.com'
	};
	 */

	// Inserting into MySQL
	req.getConnection(function (err, conn) {

		if (err)
			return next("Cannot Connect");

		var query = conn.query("INSERT INTO user SET ? ", data, function (err, rows) {

				if (err) {
					console.log(err);
					// return next("MySQL error, check your query");
				}

				res.sendStatus(200);

			});

	});

});

module.exports = router;
