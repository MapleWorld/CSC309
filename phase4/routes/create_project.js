var express = require('express');
var router = express.Router();
// Include external javascript functions 
var tools = require('../public/js/tools');

router.get('/create_project', function(req, res) {
	
	
	if(req.session.authenticated) {
		res.render('create_project', {notif: req.flash('notif'),
						auth: req.session.authenticated});	
		return ;		
	}
	req.flash('notif', 'You are not login.');
	res.render('login', {notif: req.flash('notif'),
					 auth: req.session.authenticated});					
});


//post data to DB | POST
router.post('/create_project', function (req, res) {

	// Validation
	req.assert('project_name', 'Name is required').notEmpty();
	req.assert('project_description','Description is required').notEmpty();
	req.assert('project_community','Community is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.status(422).json(errors);
		return;
	}

	/* EMAIL AND USERNAME MUST BE UNIQUE */
	// Get data
	var data = {
		name 			: req.body.project_name,
		community 		: req.body.project_community,
		description 	: req.body.project_description,
		initiator_id	: req.session.data.id,
		created_date 	: tools.currentTime()[0],
		comparable_date	: tools.currentTime()[1]
	};

	// Inserting into MySQL
	req.getConnection(function (err, conn) {

		if (err){
			console.log(err);
			return next("Cannot Connect");
		}
		var query = conn.query("INSERT INTO project SET ? ", data, function (err, rows) {

			if (err) {
			
				var errors = {
					msg: err.code
				};
				res.status(422).json([errors]);
				return ;
			}
			
			req.flash('notif', 'You have successfully submitted an project');
			res.send({redirect: '/profile'});
		});

	});

});


module.exports = router;
