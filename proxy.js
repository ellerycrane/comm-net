//var http = require('http'),
//  RoutingProxy = require('routing-proxy'),
//  finalhandler = require('finalhandler'),
//  serveStatic = require('serve-static'),
//  crypto = require('crypto'),
//  fs = require('fs')
//
//var credentials
//
//
////http.createServer(
////  RoutingProxy()
////    .add('http://localhost:8090', '*').router()
////).listen(9999)
//
//
//// Serve up public/ftp folder
//var serve = serveStatic('.', {'index': ['index.html', 'index.htm']}),
//  server = http.createServer(function (req, res) {
//    var done = finalhandler(req, res)
//    serve(req, res, done)
//  })
//fs.stat('certificates/server.key', function(err, stat) {
//  if(err == null) {
//    var credentials = crypto.createCredentials({
//      key: fs.readFileSync('certificates/server.key'),
//      cert: fs.readFileSync('certificates/server.crt')
//    })
//    server.setSecure(credentials)
//    console.warn('\nNOTE: Running HTTP server has been removed as ' +
//      'getUserMedia() has been deprecated for HTTP on Chrome 42 and above. ' +
//      'Please run demo on HTTPS as recommended\n\n-\n')
//    console.log('HTTPS server instance running @ 8090')
//  } else {
//    console.warn('HTTPS server instance failed to start as' +
//      + ' certificate failed to load\n' +
//      'Error (for certificates/server.key): ' + err.code)
//  }
//})
//
//server.listen(8090)

/* Copyright Temasys Communications, 2014 */
var connect = require('connect')
var fs = require('fs')
var http = require('http')
var https = require('https')
var app = connect()
var port = 9090
var securePort = 9091
serveStatic = require('serve-static')
app.use(serveStatic('.', {'index': ['index.html', 'index.htm']}))


console.log('HTTP server instance running @ '+port)
http.createServer(app).listen(port)

fs.stat('certificates/server.key', function(err, stat) {
  if(err == null) {
    https.createServer({
      key: fs.readFileSync('certificates/server.key'),
      cert: fs.readFileSync('certificates/server.crt')
    }, app).listen(securePort)
    console.warn('\nNOTE: Running HTTP server has been removed as ' +
      'getUserMedia() has been deprecated for HTTP on Chrome 42 and above. ' +
      'Please run demo on HTTPS as recommended\n\n-\n')
    console.log('HTTPS server instance running @ '+securePort)
  } else {
    console.warn('HTTPS server instance failed to start as' +
      + ' certificate failed to load\n' +
      'Error (for certificates/server.key): ' + err.code)
  }
})