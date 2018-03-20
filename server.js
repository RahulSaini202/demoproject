var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Routes = express.Router();
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json({ type: 'application/json' }));
app.use(morgan('dev'));



if ('local' == app.get('env')) {
    console.log("local phase");
    mongoose.connect("mongodb://localhost/demoTest")
} else if ('development' == app.get('env')) {
    console.log("development");
    mongoose.connect("mongodb://localhost/demoTest")
} 

mongoose.connection.on('error', function() {
    console.log('There is an issue with your MongoDB connection.  Please make sure MongoDB is running.');
    process.exit(1);
});

var index = require('./routes/index.js')(app)
console.log("port==>", port);
app.listen(port);

