Bind and listen for connections on the given host and port.
This method is identical to node's [http.Server#listen()](http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback)</a>.

```js
var express = require('express');
var app = express();
app.listen(3000);
```

The `app` returned by `express()` is in fact a JavaScript
`Function`, designed to be passed to node's HTTP servers as a callback
to handle requests. This allows you to provide both HTTP and HTTPS versions of
your app with the same codebase easily, as the app does not inherit from these
(it is simply a callback):

```js
var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
```

The `app.listen()` method is a convenience method for the following
(if you wish to use HTTPS or provide both, use the technique above):

```js
app.listen = function(){
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```
