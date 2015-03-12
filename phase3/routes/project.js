var express = require('express');
var router = express.Router();

router.get('/project', function(req, res) {
	res.render('project', {notif: req.flash('notif'),
					 auth: req.session.authenticated});					
});

module.exports = router;
