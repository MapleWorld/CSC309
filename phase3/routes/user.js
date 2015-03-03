var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('user_profile');
});

module.exports = router;
