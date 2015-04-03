var express = require('express');
var router = express.Router();
// Include external javascript functions 
var tools = require('../public/js/tools');

router.get('/project', function(req, res) {
	res.render('project', {notif: req.flash('notif'),
					 auth: req.session.authenticated});					
});


// Get specific project data
router.get('/project/:project_id', function(req, res, next) {

	var project_id = req.params.project_id;
	req.getConnection(function(err,conn){
		if (err){
			console.log(err);
			return next("Cannot Connect");
		}

		var query = conn.query("SELECT * FROM project LEFT JOIN funding ON project.p_id = funding.project_id WHERE project.p_id = ? ",[project_id], function(err,rows){

			if(err){
				console.log(err);
				return next("Mysql error, check your query");
			}

			//if user not found
			if(rows.length < 1){
				return res.send("Project Not found");
			}

			res.render('project', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data:rows,
					 user_id: req.session.data.id,
					 admin: req.session.data.admin});	
		});
	});
});

// Delete this project
router.delete('/delete_project/:project_id', function (req, res) {
	
    var project_id = req.params.project_id;

     req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("DELETE FROM project WHERE p_id = ? ",[project_id], function(err, rows){

			if(err){
				console.log(err);
				return next("Mysql error, check your query");
			}

			req.flash('notif', 'You have successfully deleted this project.');
			res.send({redirect: '/profile'});

        });
	});
});

// Get specific project data
router.get('/edit_project/:project_id', function(req, res, next) {

	var project_id = req.params.project_id;
	req.getConnection(function(err,conn){
		if (err){
			console.log(err);
			return next("Cannot Connect");
		}

		var query = conn.query("SELECT * FROM project WHERE p_id = ? ",[project_id], function(err,rows){

			if(err){
				console.log(err);
				return next("Mysql error, check your query");
			}

			//if user not found
			if(rows.length < 1){
				return res.send("Project Not found");
			}

			res.render('edit_project', {notif: req.flash('notif'),
					 auth: req.session.authenticated,
					 data:rows});	
		});
		
	});
	
});

// Update this project 
router.put('/edit_project/:project_id', function (req, res) {
    var project_id = req.params.project_id;

    var data = {
        name			:req.body.project_name,
        description		:req.body.project_description,
        community		:req.body.project_community,
        goal			:req.body.project_goal
	};

	req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE project set ? WHERE p_id = ? ",[data,project_id], function(err, rows){
			if(err){
				console.log(err);
				return next("Mysql error, check your query");
			}

			req.flash('notif', 'You have successfully updated this project.');
			res.send({redirect: '/profile'});
        });
	});
});

// Update the number of like for this project 
router.put('/like/:project_id', function (req, res) {

	// Increment like by 1 for this project
    var project_id = req.params.project_id;
    
    req.getConnection(function (err, conn) {
	
	    if (err) return next("Cannot Connect");
	
		var query = conn.query("SELECT * FROM project WHERE p_id = ? ",[project_id], function(err,rows){
			if(err){
				console.log(err);
				return next("Mysql error, check your query");
			}
		
			var data = rows[0];
			data.likes += 1;
			
			var updateQuery = conn.query("UPDATE project set ? WHERE p_id = ? ",[data,project_id], function(err, rows){
				if(err){
					console.log(err);
					return next("Mysql error, check your query");
				}
			
				req.flash('notif', 'You liked this project.');
				res.send({redirect: '/'});
			
			});
		});
	});
});

// Add fund to project to the DB || POST
router.post('/project/fund/:project_funder_id', function (req, res) {

    var projectID = req.params.project_funder_id.split("-")[0];
    var funderID = req.params.project_funder_id.split("-")[1];
    
	// Validation
	req.assert('project_fund_amount', 'A number is required').notEmpty();
	req.assert('project_fund_option','An option is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.status(422).json(errors);
		return;
	}
	// Create JSON Data Set
	var data = {
		project_id 				: projectID,
		funder_id 				: funderID,
		fund_amount 			: req.body.project_fund_amount,
		fund_option 			: req.body.project_fund_option,
		fund_date 				: tools.currentTime()[0],
		fund_comparable_date	: tools.currentTime()[1]
	};

	if (req.session.data.funder_ready == 0){
		req.flash('notif', 'You are not a funder.');
		res.send({redirect: '/'});
	}
	else if (req.session.data.money - data.fund_amount < 0){
		req.flash('notif', 'You do not have enough money in your account');
		res.send({redirect: '/'});
	}else{
		// Inserting into MySQL
		req.getConnection(function (err, conn) {
	
			if (err){
				console.log(err);
				return next("Cannot Connect");
			}
	
			var query = conn.query("INSERT INTO funding SET ? ", data, function (err, rows) {
	
				if (err) {
				
					var register_error = {
						msg: err.code
					};
		
					res.status(422).json([register_error]);
					return ;
				}
				
				req.session.data.money -= data.fund_amount;
				
				var updateQuery = conn.query("UPDATE user set ? WHERE id = ? ",[req.session.data,req.session.data.id], function(err, rows){
					if(err){
						console.log(err);
						return next("Mysql error, check your query");
					}
					req.flash('notif', 'You have successfully funded this project');
					res.send({redirect: '/'});
				});
			});
		});
	}
});

module.exports = router;
