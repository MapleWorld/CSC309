var express = require('express');
var router = express.Router();

router.get('/user', function(req, res) {
	if(req.session.authenticated) {
    	res.render('user_profile', {notif: req.flash('notif')});
    }else{
    	req.flash('notif', 'You are not log in.');
    	res.redirect('/login');
    }
});

module.exports = router;
