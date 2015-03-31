var express = require('express');
var router = express.Router();

// Get all projects
router.get('/projects', function(req, res, next) {

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM project', function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

			res.render('projects', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data:rows});	
         });
    });
})


// Get top k project data
router.get('/projects/best/:k', function(req, res, next) {

	var best_k = req.params.k;
	
    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM project ORDER BY likes DESC LIMIT ' + best_k, function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

			res.render('projects', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data:rows});	
         });
    });
})

// Sort projects by date
router.get('/projects/date', function(req, res, next) {
	
    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM project ORDER BY created_date DESC', function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

			res.render('projects', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data:rows});	
         });

    });
})

// Sort projects by likes
router.get('/projects/likes', function(req, res, next) {

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM project ORDER BY likes DESC', function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

			res.render('projects', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data:rows});	
         });

    });
})

// Find projects given user inputs
router.post('/projects/find', function(req, res) {

	// Validation
	req.assert('number_k', 'Number k is required').notEmpty();
	req.assert('starting_date','Starting Date is required').notEmpty();
	req.assert('ending_date','Ending Date is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.status(422).json(errors);
		return;
	}
	
	start_time = findDate(req.body.starting_date);
	end_time = findDate(req.body.ending_date);
	query_string = 'SELECT * FROM project ' + 
        	'WHERE comparable_date >= ' + start_time + 
        	' AND comparable_date <= ' + end_time + 
        	' ORDER BY likes DESC LIMIT ' + req.body.number_k;
	
    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query(query_string, function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

			req.flash('notif', 'Successful');
			res.send({redirect: '/projects/find/' + query_string,
					auth: req.session.authenticated,
					data:rows});	
			
         });
    });
    
})

// Find project by Given Query
router.get('/projects/find/:query', function(req, res, next) {

	var queryString = req.params.query;
	
    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query(queryString, function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

			res.render('projects', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data:rows});	
         });
    });
})

function findDate(input){
	var temp = input.split("/");
	var month = temp[0];
	var day = temp[1];
	var year = temp[2]

	time = year +  month + day;
	return time;
}

module.exports = router;
