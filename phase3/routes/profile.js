var express = require('express');
var router = express.Router();

router.get('/profile', function(req, res) {
	if(req.session.authenticated) {
    	res.render('profile', {notif: req.flash('notif'),
					 auth: req.session.authenticated});		
    }else{
    	req.flash('notif', 'You are not log in.');
    	res.render('login', {notif: req.flash('notif'),
					 auth: req.session.authenticated});	
    }
});

module.exports = router;
