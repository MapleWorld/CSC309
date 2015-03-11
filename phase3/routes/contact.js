var express = require('express');
var router = express.Router();

router.get('/contact', function(req, res) {
	res.render('contact', {notif: req.flash('notif'),
					 auth: req.session.authenticated});		
});

module.exports = router;
