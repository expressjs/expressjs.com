---
layout: page
title: Migrating to Express 4
menu: guide
lang: uz
---

# Moving to Express 4

<h2 id="overview">Overview</h2>

Express 4 is a breaking change from Express 3. That means an existing Express 3 app will not work if you update the Express version in its dependencies.

This article covers:

<ul class="doclist">
  <li><a href="#changes">Changes in Express 4.</a></li>
  <li><a href="#example-migration">An example</a> of migrating an Express 3 app to Express 4.</li>
  <li><a href="#app-gen">Upgrading to the Express 4 app generator.</a></li>
</ul>

<h2 id="changes">Changes in Express 4</h2>

The main changes in Express 4 are:

<ul class="doclist">
  <li><a href="#core-changes">Changes to Express core and middleware system: </a>The dependency on Connect and built-in middleware were removed, so you must add middleware yourself.
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

Express 4 no longer depends on Connect, and removes all the built-in
middleware from its core, except `express.static`. This means
Express is now an independent routing and middleware web framework, and
Express versioning and releases are not affected by middleware updates.

With the built-in middleware gone, you must explicitly add all the
middleware required to run your app.  Simply follow these steps:

1. Install the module: `npm install --save <module-name>`
2. In your app, require the module: `require('module-name')`
3. Use the module according to its documentation: `app.use( ... )`

The following table lists Express 3 middleware and their counterparts in Express 4.

<table class="doctable" border="1">
<tr><th>Express 3</th><th>Express 4</th></tr>
<tr><td>express.bodyParser</td>
<td><a href="https://github.com/expressjs/body-parser">body-parser</a> +
<a href="https://github.com/expressjs/multer">multer</a></td></tr>
<tr><td>express.compress</td>
<td><a href="https://github.com/expressjs/compression">compression</a></td></tr>
<tr><td>express.cookieSession</td>
<td><a href="https://github.com/expressjs/cookie-session">cookie-session</a></td></tr>
<tr><td>express.cookieParser</td>
<td><a href="https://github.com/expressjs/cookie-parser">cookie-parser</a></td></tr>
<tr><td>express.logger</td>
<td><a href="https://github.com/expressjs/morgan">morgan</a></td></tr>
<tr><td>express.session</td>
<td><a href="https://github.com/expressjs/session">express-session</a></td></tr>
<tr><td>express.favicon</td>
<td><a href="https://github.com/expressjs/serve-favicon">serve-favicon</a></td></tr>
<tr><td>express.responseTime</td>
<td><a href="https://github.com/expressjs/response-time">response-time</a></td></tr>
<tr><td>express.errorHandler</td>
<td><a href="https://github.com/expressjs/errorhandler">errorhandler</a></td></tr>
<tr><td>express.methodOverride</td>
<td><a href="https://github.com/expressjs/method-override">method-override</a></td></tr>
<tr><td>express.timeout</td>
<td><a href="https://github.com/expressjs/timeout">connect-timeout</a></td></tr>
<tr><td>express.vhost</td>
<td><a href="https://github.com/expressjs/vhost">vhost</a></td></tr>
<tr><td>express.csrf</td>
<td><a href="https://github.com/expressjs/csurf">csurf</a></td></tr>
<tr><td>express.directory</td>
<td><a href="https://github.com/expressjs/serve-index">serve-index</a></td></tr>
<tr><td>express.static</td>
<td><a href="https://github.com/expressjs/serve-static">serve-static</a></td></tr>
</table>

Here is the [complete list](https://github.com/senchalabs/connect#middleware) of Express 4 middleware.

In most cases, you can simply replace the old version 3 middleware with
its Express 4 counterpart. For details, see the module documentation in
GitHub.

<h4 id="app-use">app.use accepts parameters</h4>

In version 4 you can now load middleware on a path with a variable
parameter and read the parameter value from the route handler.
For example:

<pre><code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
})
</code></pre>
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

<h4 id="app-route">app.route() method</h4>

The new `app.route()` method enables you to create chainable route handlers
for a route path. Since the path is specified in a single location, it
helps to create modular routes and reduce redundancy and typos. For more
information on routes, see [Router() documentation](/4x/api.html#router).

Here is an example of chained route handlers defined using `app.route()`.

<pre><code class="language-javascript" translate="no">
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  })
</code></pre>

<h4 id="express-router">express.Router class</h4>

The other feature to help organize routes is a new class,
`express.Router`, that you can use to create modular mountable
route handlers. A `Router` instance is a complete middleware and
routing system; for this reason it is often referred to as a "mini-app".

The following example creates a router as a module, loads a middleware in
it, defines some routes, and mounts it on a path on the main app.

Create a router file named `birds.js` in the app directory,
with the following content:

<pre><code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
})
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
})

module.exports = router;
</code></pre>

Then, load the router module in the app:

<pre><code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code></pre>

The app will now be able to handle requests to `/birds` and
`/birds/about`, along with calling the `timeLog`
middleware specific to the route.

<h3 id="other-changes">
Other changes
</h3>

The following table lists other small but important changes in Express 4.

<table class="doctable" border="1">
<tr>
<th>Object</th>
<th>Description</th>
</tr>
<tr>
<td>Node</td>
<td>Express 4 requires Node 0.10.x or later and has dropped support for
Node 0.8.x.</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
The http module is no longer needed. The app is started using
`app.listen()`.
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
`app.configure()` has been removed.  Use
`process.env.NODE_ENV` or
`app.get('env')` to detect the environment and configure the app accordingly.
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
Was an array, is now an object.
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
Was a function, is now an object.
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

<h4 id="">app.js</h4>

Consider an Express v.3 application with the following `app.js` file:

<pre><code class="language-javascript" translate="no">
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code></pre>

<h4 id="">package.json</h4>

The accompanying version 3 `package.json` file might look
  something like this:

<pre><code class="language-javascript" translate="no">
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
</code></pre>

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

1. The `http` module is longer required, so remove
    `var http = require('http');`

2. The built-in Express middleware `express.favicon`,
    `express.logger`, `express.methodOverride`,
    `express.session`, `express.bodyParser` and
    `express.errorHandler` are no longer available on the
    `express` object.  You must install their alternatives
    manually and load them in the app.

3. You no longer need to load `app.router`.
    It is not a valid Express 4 app object, so remove
    `app.use(app.router);`

4. Make sure the middleware are loaded in the right order - load `errorHandler` after loading the app routes.

5. Start the app with `app.listen()` instead of
    `http.createServer`.

<h3 id="">Version 4 app</h3>

<h4 id="">package.json</h4>

Running the above `npm` command will update `package.json` as follows:

<pre><code class="language-javascript" translate="no">
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
    "pug": "^2.0.0-beta6",
    "method-override": "^2.1.2",
    "morgan": "^1.2.2",
    "multer": "^0.1.3",
    "serve-favicon": "^2.0.1"
  }
}
</code></pre>

<h4 id="">app.js</h4>

Then, remove invalid code, load the required middleware, and make other
changes as necessary. Then `app.js` will look like this:

<pre><code class="language-javascript" translate="no">
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code></pre>

<h3 id="">Run the app</h3>

With that, the migration process is complete, and the app is now an
Express 4 app. To confirm, start the app with the following command:

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
you must uninstall it  as follows:

```console
$ npm uninstall -g express
```

Depending on how your file and directory privileges are configured,
you may need to run this command with `sudo`.

Now install the new generator:

```console
$ npm install -g express-generator
```

Depending on how your file and directory privileges are configured,
you may need to run this command with `sudo`.

Now the `express` command on your system is updated to the
Express 4 generator.

<h3 id="">Changes to the app generator </h3>

Command options and use largely remain the same, with the following exceptions:

{: .doclist }
* The `--sessions` option has been removed.
* The `--jshtml` option has been removed.
* The `--hogan` option has been added to support [Hogan.js](http://twitter.github.io/hogan.js/).

<h3 id="">Example</h3>

Execute the following command to create an Express 4 app:

```console
$ express app4
```

If you look at the contents of the `app.js` file in the
`app4` directory, you will notice that all the middleware
(except `express.static`) required for the app are loaded as
independent modules and the `router` middleware
is no longer explicitly loaded in the app.

You will also notice that the `app.js` file is now a Node module,
compared to the standalone app generated by the old generator.

After installing the dependencies, start the app using the following command:

```console
$ npm start
```

If you peek at the npm start script in `package.json` file,
you will notice that the actual command that starts the app is
`node ./bin/www`, which used to be `node app.js`
in Express 3.

Since the `app.js` file generated by the Express 4 generator
is now a Node module, it can no longer be started independently as an app
(unless you modify the code). It has to be to be loaded in a Node file
and started via the Node file. The Node file is `./bin/www`
in this case.

Neither the `bin` directory nor the extensionless `www`
file is mandatory for creating an Express app or starting the app. They are
just suggestions by the generator, so feel free to modify them to suit your
needs.

To get rid of the `www` directory and keep things the "Express 3 way",
delete the line that says `module.exports = app;` at the end of
`app.js`, and paste the following code in its place.

<pre><code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code></pre>

Make sure to load the `debug` module at the top of `app.js` with the following code.

<pre><code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code></pre>

Next, change `"start": "node ./bin/www"` in the `package.json` file to `"start": "node app.js"`.

With that, you just moved the functionality of `./bin/www` back to
`app.js`.  Not that it is recommended, but the exercise helps
to understand how `./bin/www` works and why `app.js`
won't start on its own anymore.
