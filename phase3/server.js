var express  			= require('express');
var path      			= require('path');
var bodyParser 			= require('body-parser');
var app 				= express();
var expressValidator 	= require('express-validator');
var flash 				= require('connect-flash');
var cookieParser 		= require('cookie-parser');
var session 			= require('express-session');
var connection  		= require('express-myconnection');
var mysql 				= require('mysql');

/*Set EJS template Engine*/
app.engine('html', require('ejs').__express);
app.set('views','./views');
app.set('view engine','html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(cookieParser('secretString'));
app.use(session({
	cookieName: "session",
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	secret: 'Lonely Boy',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
	}	
));
app.use(flash());

/*MySql connection*/
/* Comment this part if don't have database install'*/
app.use(connection(mysql,{
		host     	: 'localhost',
		database	: 'communityFund',
		user     	: 'root',
		password 	: 'root'
    },'request')
);

// Routes
var router 		= express.Router();
var home 		= require('./routes/home');
var register 	= require('./routes/register');
var login 		= require('./routes/login');
var about 		= require('./routes/about');
var logout		= require('./routes/logout');
var profile 	= require('./routes/profile');
var contact 	= require('./routes/contact');
var community 	= require('./routes/community');

app.use('/', home);
app.use('/', login);
app.use('/', about);
app.use('/', logout);
app.use('/', profile);
app.use('/', contact);
app.use('/', register);
app.use('/', community);

//start Server
var server = app.listen(8080,function(){
   console.log("Listening to port %s",server.address().port);
});





