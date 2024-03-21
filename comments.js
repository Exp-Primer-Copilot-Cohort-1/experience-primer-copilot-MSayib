// Create web server
// Run with node.js

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var path = require('path');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), uri);
  var body = '';
  request.on('data', function (chunk) {
    body += chunk;
  });
  request.on('end', function () {
    var data = querystring.parse(body);
    if (uri == '/comment') {
      var comment = data['comment'];
      console.log('Comment: ' + comment);
      response.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      response.end('Comment: ' + comment);
    } else {
      fs.readFile(filename, 'binary', function (err, file) {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          response.write(err + '\n');
          response.end();
          return;
        }
        response.writeHead(200);
        response.write(file, 'binary');
        response.end();
      });
    }
  });
});

// Listen on port 8000, IP defaults to