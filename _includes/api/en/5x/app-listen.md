<h3 id='app.listen_path_callback'>app.listen(path, [callback])</h3>

Starts a UNIX socket and listens for connections on the given path.
This method is identical to Node's [http.Server.listen()](https://nodejs.org/api/http.html#http_server_listen).

```js
const express = require('express')
const app = express()
app.listen('/tmp/sock')
```

<h3 id='app.listen'>app.listen([port[, host[, backlog]]][, callback])</h3>

Binds and listens for connections on the specified host and port.
This method is identical to Node's [http.Server.listen()](https://nodejs.org/api/http.html#http_server_listen).

If port is omitted or is 0, the operating system will assign an arbitrary unused
port, which is useful for cases like automated tasks (tests, etc.).

```js
const express = require('express')
const app = express()
app.listen(3000)
```

The `app` returned by `express()` is in fact a JavaScript
`Function`, designed to be passed to Node's HTTP servers as a callback
to handle requests. This makes it easy to provide both HTTP and HTTPS versions of
your app with the same code base, as the app does not inherit from these
(it is simply a callback):

```js
const express = require('express')
const https = require('https')
const http = require('http')
const app = express()

http.createServer(app).listen(80)
https.createServer(options, app).listen(443)
```

The `app.listen()` method returns an [http.Server](https://nodejs.org/api/http.html#http_class_http_server) object and (for HTTP) is a convenience method for the following:

```js
app.listen = function () {
  const server = http.createServer(this)
  return server.listen.apply(server, arguments)
}
```

<div class="doc-box doc-info" markdown="1">
NOTE: All the forms of Node's
[http.Server.listen()](https://nodejs.org/api/http.html#http_server_listen)
method are in fact actually supported.
</div>
