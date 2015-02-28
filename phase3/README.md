## Installation
Clone or download this folder 
Navigate to this folder then type

	npm install

Then run the server.js file 

	node server.js
	
Then in your browser, type in 

	localhost:3000
	
## Configuration (database)
server.js Change user and password to your database user name and password

        host: 'localhost',
        user: 'root',
        password : 'root',
        port : 3306, //port mysql
        database:'csc309'	
	
Create the database table csc309 by importing create_db.sql, then import the test case through test_data.sql
