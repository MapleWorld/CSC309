var express = require('express');
var router = express.Router();

router.get('/community', function(req, res) {
	res.render('community', {notif: req.flash('notif'),
					 auth: req.session.authenticated});		
});

module.exports = router;
