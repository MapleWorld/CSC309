var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	if(req.session.authenticated){
		res.render('home', {notif: req.flash('notif'),
						auth: req.session.authenticated});		
	}else{
		req.flash('notif', 'You need to login first.');
		res.render('login', {notif: req.flash('notif'),
						auth: req.session.authenticated});	
	}
});

module.exports = router;
