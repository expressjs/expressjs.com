<h3 id='app.listen_path_callback'>app.listen(path, [callback])</h3>

Starts a UNIX socket and listens for connections on the given path.
The forms accepted by this method are the same as Node's [http.Server.listen()](https://nodejs.org/api/http.html#http_server_listen),
but the optional `callback` is invoked with Express-specific arguments — see
the note about callback signatures below.

```js
const express = require('express')
const app = express()
app.listen('/tmp/sock')
```

<h3 id='app.listen'>app.listen([port[, host[, backlog]]][, callback])</h3>

Binds and listens for connections on the specified host and port.
The forms accepted by this method are the same as Node's [http.Server.listen()](https://nodejs.org/api/http.html#http_server_listen),
but the optional `callback` is invoked with Express-specific arguments — see
the note about callback signatures below.

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

{% include admonitions/note.html content="All the forms of Node's [http.Server.listen()](https://nodejs.org/api/http.html#http_server_listen) method are in fact actually supported." %}

#### Callback signature

In Express 5, the `callback` passed to `app.listen()` is **not** invoked with
the same arguments as Node's [`http.Server.listen()`](https://nodejs.org/api/http.html#http_server_listen) callback. Express forwards
its own startup result to the callback, so don't rely on the parameters being
identical to the `'listening'` event handler signature. If you need to detect
errors such as `EADDRINUSE`, attach an `'error'` listener to the returned
`http.Server` rather than reading them off the callback. See the [Express 5
migration guide](/{{ page.lang }}/guide/migrating-5.html) and
[expressjs/express#6191](https://github.com/expressjs/express/issues/6191) for
details on the differences.

```js
const express = require('express')
const app = express()

const server = app.listen(3000, () => {
  // Express invokes this callback once the underlying http.Server is
  // listening; do not depend on Node's listen-callback parameters here.
  console.log('listening on', server.address())
})

server.on('error', (err) => {
  // Detect e.g. EADDRINUSE here, not in the app.listen callback.
  console.error('failed to start:', err)
})
```
