// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

var useragent = require('express-useragent');
app.use(useragent.express());
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
 
});

var api = '/api/whoami';
app.get('/api/whoami', function(req, res, next){
  console.log('100');
  // console.log(req);
  var language = req.acceptsLanguages();
  var software = 'Os: ' + req.useragent.os + ', browser:' + req.useragent.browser;
  var ipaddress = req.ip;
  res.json({'ipaddress': ipaddress, 'language': language[0], 'software': software});
  next();
})

// listen for requests :) process.env.PORT
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});