var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');

/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

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

app.get('/',function(req,res){
	res.sendFile(__dirname + '/views/register.html');
});

// Routes
var router = express.Router();
var register = require('./routes/register');
app.use('/register', register);

//start Server
var server = app.listen(3000,function(){
   console.log("Listening to port %s",server.address().port);
});
