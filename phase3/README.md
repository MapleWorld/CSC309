## NOTE:
Source Code might not align due to the setting of the tab in github and the type of editior that we use.

To see a live version, visit http://ec2-52-1-96-34.compute-1.amazonaws.com:8080/

To run locally, follow the steps below:

## Configuration (database)
server.js Change user and password to your database user name and password

	app.use(connection(mysql,{
		host     		: 'localhost',
		database 	: 'communityFund',
		user     		: 'root',
		password 	: 'root'
		},'request')
	)
	
Create the database table communityFund by executing

	-- Create the database first before executing the table query
	CREATE database communityFund;

After that, create the table by executing create_db.sql.


## Installation
Clone or download this folder 
Navigate to this folder then type to install the dependencies:

	npm install

Then run the server.js file 

	node server.js
	
Then in your browser, navigate to

	localhost:8080
	
