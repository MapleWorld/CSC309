var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     		: 'localhost',
  port     		: 3306,
  database		: 'csc309',
  user     		: 'root',
  password 	: 'root'
});

connection.connect();

connection.query('SELECT * FROM user', function(err, result, fields) {
	if (err) throw err;
	console.log('The solution is: ', result);
});

connection.end();