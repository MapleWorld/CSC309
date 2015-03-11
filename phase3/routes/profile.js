var express = require('express');
var router = express.Router();

router.get('/profile', function(req, res) {
	if(req.session.authenticated) {
    	res.render('profile', {notif: req.flash('notif')});
    }else{
    	req.flash('notif', 'You are not log in.');
    	res.redirect('/login');
    }
});

module.exports = router;
