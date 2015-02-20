var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     		: 'localhost',
	port     		: 3306,
	database	: 'csc309',
	user     		: 'root',
	password 	: 'root'
});

connection.connect();

// Selecting Query
/*
connection.query('SELECT * FROM user', function(err, result, fields) {
	if (err) throw err;
	console.log('The solution is: ', result);
});
*/

// Need to change the user data dynamically
/*
var postData = {username: 'user4', 
	firstname: 'first', 
	lastname: 'last', 
	password: 'password', 
	email: 'test223@email.com'};
*/
	
// Inserting Query
/*
var query = connection.query('INSERT INTO user SET ?', postData, function(err, result) {
	console.log('The solution is: ', result);
});
console.log(query.sql);
*/

connection.end();


















