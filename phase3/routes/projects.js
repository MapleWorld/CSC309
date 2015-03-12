var express = require('express');
var router = express.Router();

router.get('/projects', function(req, res) {
	res.render('projects', {notif: req.flash('notif'),
					 auth: req.session.authenticated});					
});

module.exports = router;
