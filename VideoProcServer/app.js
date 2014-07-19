
/**
 * Module dependencies.
 */
var addons = require('./node_modules/videoproc/videoproc');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
 
app.configure(function () 
	{
		app.use(express.static(path.join(__dirname, 'public')));
	});

app.get('/', function(req, res)
	{
		res.sendfile('index.html');
	});
	
app.get('/detail', function(req, res)
	{
		res.sendfile('detail.html');
	});

/* io.on('connection', function(socket)
	{
		socket.on('get image', function()
		{
			var nodeBuffer = addons.getImage();
			io.emit('send image', nodeBuffer);
		});
	}); */

io.on('connection', function(socket)
	{
		socket.on('get location', function()
		{
			//var location = addons.getLocationFromFile();
			var location = addons.getLocation();
			io.emit('send location', location);
		});
	});
	
http.listen(3000, function()
{
  console.log('Express server listening on port ' + app.get('port'));
  console.log('C/C++ addons.hello() =', addons.hello());
});
