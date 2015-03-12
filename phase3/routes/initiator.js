var express = require('express');
var router = express.Router();

router.get('/initiator', function(req, res) {
	if(req.session.authenticated) {
		res.render('initiator', {notif: req.flash('notif'),
						auth: req.session.authenticated});	
		return ;		
	}
	req.flash('notif', 'You are not login.');
	res.render('initiator', {notif: req.flash('notif'),
					 auth: req.session.authenticated});					
});

module.exports = router;
