var express = require('express');
var router = express.Router();

// Get specific user data
router.get('/user/:user_id', function(req, res, next) {

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
				return res.send("user Not found");
			}

			res.render('user', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data:rows,
					 user_id: req.session.data.id,
					 admin: req.session.data.admin});	
		});
	});
});

module.exports = router;
