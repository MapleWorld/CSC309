var express = require('express');
var router = express.Router();

router.get('/user', function(req, res) {
	res.render('user_profile', {notif: req.flash('notif')});
});

module.exports = router;
