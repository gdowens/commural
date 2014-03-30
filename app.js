/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , MuralSchema = require('./models/Mural.js').MuralSchema;

var app = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'commural');
var Mural = db.model('Mural', MuralSchema);

//initialize Mural
var initialMural = new Mural({
	stanza: ['death', 'is', 'patient'],
	life: [3, 3, 3],
	empty: [false, false, false]
});

initialMural.save();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/mural', routes.mural(initialMural));
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});