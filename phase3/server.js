var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');

/*Set EJS template Engine*/
app.engine('html', require('ejs').__express);
app.set('views','./views');
app.set('view engine','html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(
    connection(mysql,{
		host     		: 'localhost',
		database	: 'csc309',
		user     		: 'root',
		password 	: 'root'
    },'request')
);

// Routes
var router = express.Router();
var home = require('./routes/home');
var register = require('./routes/register');
var login = require('./routes/login');
var about = require('./routes/about');
var user = require('./routes/user');
var contact = require('./routes/contact');
var community = require('./routes/community');

app.use('/', home);
app.use('/login', login);
app.use('/user', user);
app.use('/about', about);
app.use('/contact', contact);
app.use('/register', register);
app.use('/community', community);

//start Server
var server = app.listen(3000,function(){
   console.log("Listening to port %s",server.address().port);
});





