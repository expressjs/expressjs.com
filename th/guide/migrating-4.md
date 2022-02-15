---
layout: page
title: Migrating to Express 4
menu: guide
lang: th
---
# Moving to Express 4

<h2 id="overview">Overview</h2>

Express 4 is a breaking change from Express 3. That means an existing Express 3 app will _not_ work if you update the Express version in its dependencies.

This article covers:

<ul class="doclist">
  <li><a href="#changes">Changes in Express 4</a>.</li>
  <li><a href="#example-migration">An example</a> of migrating an Express 3 app to Express 4.</li>
  <li><a href="#app-gen">Upgrading to the Express 4 app generator</a>.</li>
</ul>

<h2 id="changes">Changes in Express 4</h2>

There are several significant changes in Express 4:

<ul class="doclist">
  <li><a href="#core-changes">Changes to Express core and middleware system.</a> The dependencies on Connect and built-in middleware were removed, so you must add middleware yourself.
  </li>
  <li><a href="#routing">Changes to the routing system.</a></li>
  <li><a href="#other-changes">Various other changes.</a></li>
</ul>

See also:

* [New features in 4.x.](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [Migrating from 3.x to 4.x.](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Changes to Express core and middleware system
</h3>

Express 4 no longer depends on Connect, and removes all built-in
middleware from its core, except for the `express.static` function. This means that
Express is now an independent routing and middleware web framework, and
Express versioning and releases are not affected by middleware updates.

Without built-in middleware, you must explicitly add all the
middleware that is required to run your app. Simply follow these steps:

1. Install the module: `npm install --save <module-name>`
2. In your app, require the module: `require('module-name')`
3. Use the module according to its documentation: `app.use( ... )`

The following table lists Express 3 middleware and their counterparts in Express 4.

<table class="doctable" border="1">
<tr><th>Express 3</th><th>Express 4</th></tr>
<tr><td><code>express.bodyParser</code></td>
<td><a href="https://github.com/expressjs/body-parser">body-parser</a> +
<a href="https://github.com/expressjs/multer">multer</a></td></tr>
<tr><td><code>express.compress</code></td>
<td><a href="https://github.com/expressjs/compression">compression</a></td></tr>
<tr><td><code>express.cookieSession</code></td>
<td><a href="https://github.com/expressjs/cookie-session">cookie-session</a></td></tr>
<tr><td><code>express.cookieParser</code></td>
<td><a href="https://github.com/expressjs/cookie-parser">cookie-parser</a></td></tr>
<tr><td><code>express.logger</code></td>
<td><a href="https://github.com/expressjs/morgan">morgan</a></td></tr>
<tr><td><code>express.session</code></td>
<td><a href="https://github.com/expressjs/session">express-session</a></td></tr>
<tr><td><code>express.favicon</code></td>
<td><a href="https://github.com/expressjs/serve-favicon">serve-favicon</a></td></tr>
<tr><td><code>express.responseTime</code></td>
<td><a href="https://github.com/expressjs/response-time">response-time</a></td></tr>
<tr><td><code>express.errorHandler</code></td>
<td><a href="https://github.com/expressjs/errorhandler">errorhandler</a></td></tr>
<tr><td><code>express.methodOverride</code></td>
<td><a href="https://github.com/expressjs/method-override">method-override</a></td></tr>
<tr><td><code>express.timeout</code></td>
<td><a href="https://github.com/expressjs/timeout">connect-timeout</a></td></tr>
<tr><td><code>express.vhost</code></td>
<td><a href="https://github.com/expressjs/vhost">vhost</a></td></tr>
<tr><td><code>express.csrf</code></td>
<td><a href="https://github.com/expressjs/csurf">csurf</a></td></tr>
<tr><td><code>express.directory</code></td>
<td><a href="https://github.com/expressjs/serve-index">serve-index</a></td></tr>
<tr><td><code>express.static</code></td>
<td><a href="https://github.com/expressjs/serve-static">serve-static</a></td></tr>
</table>

Here is the [complete list](https://github.com/senchalabs/connect#middleware) of Express 4 middleware.

In most cases, you can simply replace the old version 3 middleware with
its Express 4 counterpart. For details, see the module documentation in
GitHub.

<h4 id="app-use"><code>app.use</code> accepts parameters</h4>

In version 4 you can use a variable parameter to define the path where middleware functions are loaded, then read the value of the parameter from the route handler.
For example:

```js
app.use('/book/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
})
```
<h3 id="routing">
The routing system
</h3>

Apps now implicitly load routing middleware, so you no longer have to
worry about the order in which middleware is loaded with respect to
the `router` middleware.

The way you define routes is unchanged, but the routing system has two
new features to help organize your routes:

{: .doclist }
* A new method, `app.route()`, to create chainable route handlers for a route path.
* A new class, `express.Router`, to create modular mountable route handlers.

<h4 id="app-route"><code>app.route()</code> method</h4>

The new `app.route()` method enables you to create chainable route handlers
for a route path. Because the path is specified in a single location, creating modular routes is helpful, as is reducing redundancy and typos. For more
information about routes, see [`Router()` documentation](/{{ page.lang }}/4x/api.html#router).

Here is an example of chained route handlers that are defined by using the `app.route()` function.

```js
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })
```

<h4 id="express-router"><code>express.Router</code> class</h4>

The other feature that helps to organize routes is a new class,
`express.Router`, that you can use to create modular mountable
route handlers. A `Router` instance is a complete middleware and
routing system; for this reason it is often referred to as a "mini-app".

The following example creates a router as a module, loads middleware in
it, defines some routes, and mounts it on a path on the main app.

For example, create a router file named `birds.js` in the app directory,
with the following content:

```js
var express = require('express')
var router = express.Router()

// middleware specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
```

Then, load the router module in the app:

```js
var birds = require('./birds')

// ...

app.use('/birds', birds)
```

The app will now be able to handle requests to the `/birds` and
`/birds/about` paths, and will call the `timeLog`
middleware that is specific to the route.

<h3 id="other-changes">
Other changes
</h3>

The following table lists other small but important changes in Express 4:

<table class="doctable" border="1">
<tr>
<th>Object</th>
<th>Description</th>
</tr>
<tr>
<td>Node.js</td>
<td>Express 4 requires Node.js 0.10.x or later and has dropped support for
Node.js 0.8.x.</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
The `http` module is no longer needed, unless you need to directly work with it (socket.io/SPDY/HTTPS). The app can be started by using the
`app.listen()` function.
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
The `app.configure()` function has been removed.  Use the
`process.env.NODE_ENV` or
`app.get('env')` function to detect the environment and configure the app accordingly.
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
The `json spaces` application property is disabled by default in Express 4.
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
Use `req.accepts()`, `req.acceptsEncodings()`,
`req.acceptsCharsets()`, and `req.acceptsLanguages()`.
</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
No longer resolves relative URLs.
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
Was an array; now an object.
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
Was a function; now an object.
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
Changed to `res.headersSent`.
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
Now available as `app.mountpath`.
</td>
</tr>
<tr>
<td markdown="1">
`res.on('header')`
</td>
<td markdown="1">
Removed.
</td>
</tr>
<tr>
<td markdown="1">
`res.charset`
</td>
<td markdown="1">
Removed.
</td>
</tr>
<tr>
<td markdown="1">
`res.setHeader('Set-Cookie', val)`
</td>
<td markdown="1">
Functionality is now limited to setting the basic cookie value. Use
`res.cookie()` for added functionality.
</td>
</tr>
</table>

<h2 id="example-migration">Example app migration</h2>

Here is an example of migrating an Express 3 application to Express 4.
The files of interest are `app.js` and `package.json`.

<h3 id="">
Version 3 app
</h3>

<h4 id=""><code>app.js</code></h4>

Consider an Express v.3 application with the following `app.js` file:

```js
var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var http = require('http')
var path = require('path')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.methodOverride())
app.use(express.session({ secret: 'your secret here' }))
app.use(express.bodyParser())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/users', user.list)

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})
```

<h4 id=""><code>package.json</code></h4>

The accompanying version 3 `package.json` file might look
  something like this:

```json
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.12.0",
    "pug": "*"
  }
}
```

<h3 id="">
Process
</h3>

Begin the migration process by installing the required middleware for the
Express 4 app and updating Express and Pug to their respective latest
version with the following command:

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

Make the following changes to `app.js`:

1. The built-in Express middleware functions `express.favicon`,
    `express.logger`, `express.methodOverride`,
    `express.session`, `express.bodyParser` and
    `express.errorHandler` are no longer available on the
    `express` object.  You must install their alternatives
    manually and load them in the app.

2. You no longer need to load the `app.router` function.
    It is not a valid Express 4 app object, so remove the
    `app.use(app.router);` code.

3. Make sure that the middleware functions are loaded in the correct order - load `errorHandler` after loading the app routes.

<h3 id="">Version 4 app</h3>

<h4 id=""><code>package.json</code></h4>

Running the above `npm` command will update `package.json` as follows:

```json
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "body-parser": "^1.5.2",
    "errorhandler": "^1.1.1",
    "express": "^4.8.0",
    "express-session": "^1.7.2",
    "pug": "^2.0.0",
    "method-override": "^2.1.2",
    "morgan": "^1.2.2",
    "multer": "^0.1.3",
    "serve-favicon": "^2.0.1"
  }
}
```

<h4 id=""><code>app.js</code></h4>

Then, remove invalid code, load the required middleware, and make other
changes as necessary. The `app.js` file will look like this:

```js
var http = require('http')
var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var path = require('path')

var favicon = require('serve-favicon')
var logger = require('morgan')
var methodOverride = require('method-override')
var session = require('express-session')
var bodyParser = require('body-parser')
var multer = require('multer')
var errorHandler = require('errorhandler')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))
app.use(logger('dev'))
app.use(methodOverride())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', routes.index)
app.get('/users', user.list)

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

var server = http.createServer(app)
server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})
```

<div class="doc-box doc-info" markdown="1">
Unless you need to work directly with the `http` module (socket.io/SPDY/HTTPS), loading it is not required, and the app can be simply started this way:

```js
app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})
```
</div>

<h3 id="">Run the app</h3>

The migration process is complete, and the app is now an
Express 4 app. To confirm, start the app by using the following command:

```console
$ node .
```

Load [http://localhost:3000](http://localhost:3000)
  and see the home page being rendered by Express 4.

<h2 id="app-gen">Upgrading to the Express 4 app generator</h2>

The command-line tool to generate an Express app is still
  `express`, but to upgrade to the new version, you must uninstall
  the Express 3 app generator and then install the new
  `express-generator`.

<h3 id="">Installing </h3>

If you already have the Express 3 app generator installed on your system,
you must uninstall it:

```console
$ npm uninstall -g express
```
Depending on how your file and directory privileges are configured,
you might need to run this command with `sudo`.

Now install the new generator:

```console
$ npm install -g express-generator
```

Depending on how your file and directory privileges are configured,
you might need to run this command with `sudo`.

Now the `express` command on your system is updated to the
Express 4 generator.

<h3 id="">Changes to the app generator </h3>

Command options and use largely remain the same, with the following exceptions:

{: .doclist }
* Removed the `--sessions` option.
* Removed the `--jshtml` option.
* Added the `--hogan` option to support [Hogan.js](http://twitter.github.io/hogan.js/).

<h3 id="">Example</h3>

Execute the following command to create an Express 4 app:

```console
$ express app4
```

If you look at the contents of the `app4/app.js` file, you will notice
that all the middleware functions (except `express.static`) that are required for
the app are loaded as independent modules, and the `router` middleware
is no longer explicitly loaded in the app.

You will also notice that the `app.js` file is now a Node.js module, in contrast to the standalone app that was generated by the old generator.

After installing the dependencies, start the app by using the following command:

```console
$ npm start
```

If you look at the npm start script in the `package.json` file,
you will notice that the actual command that starts the app is
`node ./bin/www`, which used to be `node app.js`
in Express 3.

Because the `app.js` file that was generated by the Express 4 generator
is now a Node.js module, it can no longer be started independently as an app
(unless you modify the code). The module must be loaded in a Node.js file
and started via the Node.js file. The Node.js file is `./bin/www`
in this case.

Neither the `bin` directory nor the extensionless `www`
file is mandatory for creating an Express app or starting the app. They are
just suggestions made by the generator, so feel free to modify them to suit your
needs.

To get rid of the `www` directory and keep things the "Express 3 way",
delete the line that says `module.exports = app;` at the end of the
`app.js` file, then paste the following code in its place:

```js
app.set('port', process.env.PORT || 3000)

var server = app.listen(app.get('port'), () => {
  debug('Express server listening on port ' + server.address().port)
})
```

Ensure that you load the `debug` module at the top of the `app.js` file by using the following code:

```js
var debug = require('debug')('app4')
```

Next, change `"start": "node ./bin/www"` in the `package.json` file to `"start": "node app.js"`.

You have now moved the functionality of `./bin/www` back to
`app.js`.  This change is not recommended, but the exercise helps you
to understand how the `./bin/www` file works, and why the `app.js` file
no longer starts on its own.
