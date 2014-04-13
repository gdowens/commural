/**
 * Module dependencies.

 * TODO: USE MEAN.IO
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
var Mural = db.model('mural', MuralSchema);

//initialize Mural
var initialMural = new Mural({
	stanza: [ 
  'Oh', 'promptly', 'he', '\n',
  'appears', 'and', 'takes', 'his', 'earthly', 'nature', '\n',
  '\t', 'instantly', 'instantly', 'falls', '\n',
  '\t', 'victim', 'of', 'long', 'intrigue,', '\n',
  '\t', 'assuming', 'memory', 'and', 'mortal', '\n',
  '\t', 'mortal', 'fatigue.', '\n',
  '\n',
  'What', 'suffers', 'our', 'uses', 'and', 'abuses', '\n',
  'sinks', 'through', 'the', 'drift', 'of', 'bodies', '\n',
  'sinks', 'through', 'the', 'drift', 'of', 'classes', '\n',
  'who,', 'weary,', 'without', 'lamp', 'or', 'book', '\n',
  '\t', 'prepares', 'stupendous', 'studies:', '\n',
  '\t', 'the', 'fiery', 'event', '\n', 
  '\t', 'of', 'every', 'day', 'in', 'endless', '\n',
  '\t', 'endless', 'assent.'
  ],
	life: [3, 3, 3, 0,
  3, 3, 3, 3, 3, 3, 0,
  0, 3, 3, 3, 0,
  0, 3, 3, 3, 3, 0,
  0, 3, 3, 3, 3, 0,
  0, 3, 3, 0,
  0,
  3, 3, 3, 3, 3, 3, 0,
  3, 3, 3, 3, 3, 3, 0,
  3, 3, 3, 3, 3, 3, 0,
  3, 3, 3, 3, 3, 3, 0,
  0, 3, 3, 3, 0,
  0, 3, 3, 3, 0,
  0, 3, 3, 3, 3, 3, 0,
  0, 3, 3],
	empty: [false, false, false, true,
  false, false, false, false, false, false, true,
  true, false, false, false, true,
  true, false, false, false, false, true,
  true, false, false, false, false, true,
  true, false, false, true,
  true,
  false, false, false, false, false, false, true,
  false, false, false, false, false, false, true,
  false, false, false, false, false, false, true,
  false, false, false, false, false, false, true,
  true, false, false, false, true,
  true, false, false, false, true,
  true, false, false, false, false, false, true,
  true, false, false ]
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