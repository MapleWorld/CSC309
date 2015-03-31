var express = require('express');
var router = express.Router();

router.get('/industry/:idea_industry', function(req, res) {
	
	var idea_industry = req.params.idea_industry;

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM idea WHERE industry = ?',[idea_industry] , function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

			res.render('industry', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data:rows});	
         });

    });

});

module.exports = router;
