var express = require('express');
var router = express.Router();

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

module.exports = router;
