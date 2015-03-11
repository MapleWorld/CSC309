var express = require('express');
var router = express.Router();

router.get('/logout', function (req, res) {

    if(req.session.authenticated) {
    	req.session.destroy();
        req.flash('notif', 'You are logged out.');
    	res.redirect('/');
    	return ;
    }
    
    req.flash('notif', 'You are not login.');
	res.render('login', {notif: req.flash('notif')});
});

module.exports = router;
