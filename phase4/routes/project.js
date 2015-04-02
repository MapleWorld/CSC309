var express = require('express');
var router = express.Router();

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

		var query = conn.query("SELECT * FROM project WHERE id = ? ",[project_id], function(err,rows){

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
					 admin: req.session.data.admin});	
		});
	});
});

// Delete this project
router.delete('/delete_project/:project_id', function (req, res) {
	
    var project_id = req.params.project_id;

     req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");

        var query = conn.query("DELETE FROM project WHERE id = ? ",[project_id], function(err, rows){

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

		var query = conn.query("SELECT * FROM project WHERE id = ? ",[project_id], function(err,rows){

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

        var query = conn.query("UPDATE project set ? WHERE id = ? ",[data,project_id], function(err, rows){
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
	
		var query = conn.query("SELECT * FROM project WHERE id = ? ",[project_id], function(err,rows){
			if(err){
				console.log(err);
				return next("Mysql error, check your query");
			}
		
			var data = rows[0];
			data.likes += 1;
			
			var updateQuery = conn.query("UPDATE project set ? WHERE id = ? ",[data,project_id], function(err, rows){
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


module.exports = router;
