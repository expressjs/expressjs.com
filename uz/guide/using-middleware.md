---
layout: page
title: Using Express middleware
menu: guide
lang: uz
---

# Using middleware

An Express application is essentially a series of middleware calls.

Middleware is a function with access to the request object (`req`), the response object (`res`), and the next middleware in line in the request-response cycle of an Express application, commonly denoted by a variable named `next`. Middleware can:

 - Execute any code.
 - Make changes to the request and the response objects.
 - End the request-response cycle.
 - Call the next middleware in the stack.

If the current middleware does not end the request-response cycle, it must call `next()` to pass control to the next middleware, otherwise the request will be left hanging.

With an optional mount path, middleware can be loaded at the application level or at the router level.
Also, a series of middleware functions can be loaded together, creating a sub-stack of the middleware system at a mount point.

An Express application can use the following kinds of middleware:

 - [Application-level middleware](#middleware.application)
 - [Router-level middleware](#middleware.router)
 - [Built-in middleware](#middleware.built-in)
 - [Third-party middleware](#middleware.third-party)

<h3 id='middleware.application'>Application level middleware</h3>

Application level middleware are bound to an instance of `express`, using `app.use()` and `app.VERB()`.

<pre><code class="language-javascript" translate="no">
var app = express();

// a middleware with no mount path; gets executed for every request to the app
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware mounted on /user/:id; will be executed for any type of HTTP request to /user/:id
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a route and its handler function (middleware system) which handles GET requests to /user/:id
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
</code></pre>

Here is an example of loading a series of middleware at a mount point with a mount path.

<pre><code class="language-javascript" translate="no">
// a middleware sub-stack which prints request info for any type of HTTP request to /user/:id
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code></pre>

Route handlers, being a middleware system, makes it possible to define multiple routes for a path. In the example below, two routes are defined for GET requests to `/user/:id`. The second router will not cause any problems, however it will never get called, because the first route ends the request-response cycle.

<pre><code class="language-javascript" translate="no">
// a middleware sub-stack which handles GET requests to /user/:id
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for /user/:id which prints the user id
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
</code></pre>

If you need to skip the rest of the middleware from a router middleware stack, call `next('route')` to pass on the control to the next route. Note: `next('route')` will work only in middleware loaded using `app.VERB()` or `router.VERB()`.

<pre><code class="language-javascript" translate="no">
// a middleware sub-stack which handles GET requests to /user/:id
app.get('/user/:id', function (req, res, next) {
  // if user id is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // else pass the control to the next middleware in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for /user/:id which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
</code></pre>

<h3 id='middleware.router'>Router level middleware</h3>

Router level middleware work just like application level middleware except they are bound to an instance of `express.Router()`.

<pre><code class="language-javascript" translate="no">
var router = express.Router();
</code></pre>
Router level middleware are loaded using `router.use()` and `router.VERB()`.

The middleware system created at the application level in the example above, can be replicated at the router level using the following code.

<pre><code class="language-javascript" translate="no">
var app = express();
var router = express.Router();

// a middleware with no mount path, gets executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to /user/:id
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack which handles GET requests to /user/:id
router.get('/user/:id', function (req, res, next) {
  // if user id is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // else pass the control to the next middleware in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for /user/:id which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
</code></pre>

<h3 id='middleware.built-in'>Built-in middleware</h3>

As of 4.x, Express no longer depends on Connect. Except for `express.static`, all of Express' previously included middleware are now in separate repos. Please view [the list of middleware](https://github.com/senchalabs/connect#middleware).

<h4 id='express.static'>express.static(root, [options])</h4>

`express.static` is based on [serve-static](https://github.com/expressjs/serve-static), and is responsible for serving the static assets of an Express application.

The `root` argument refers to the root directory from which the static assets are to be served.

The optional `options` object can have the following properties.

* `dotfiles` option for serving dotfiles. Possible values are "allow", "deny", and "ignore"; defaults to "ignore".
* `etag` enable or disable etag generation, defaults to `true`.
* `extensions` sets file extension fallbacks, defaults to `false`.
* `index` sends directory index file, defaults to "index.html". Set `false` to disable directory indexing.
* `lastModified` enabled by default, sets the `Last-Modified` header to the last modified date of the file on the OS. Set `false` to disable it.
* `maxAge` sets the max-age property of the Cache-Control header in milliseconds or a string in [ms format](https://www.npmjs.org/package/ms), defaults to 0.
* `redirect` redirects to trailing "/" when the pathname is a dir, defaults to `true`.
* `setHeaders` function for setting HTTP headers to serve with the file.

Here is an example of using the `express.static` middleware with an elaborate options object.

<pre><code class="language-javascript" translate="no">
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
};

app.use(express.static('public', options));
</code></pre>

You can have more than one static directory per app.

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
</code></pre>

For more details about `serve-static` and its options, visit the [serve-static](https://github.com/expressjs/serve-static) documentation.

<h3 id='middleware.third-party'>Third-party middleware</h3>

Express is a routing and middleware web framework with minimal functionality of its own. Functionality to Express apps are added via third-party middleware.

Install the node module for the required functionality and loaded it in your app at the application level or at the router level.

In the following example, `cookie-parser`, a cookie parsing middleware is installed and loaded in the app.

```console
$ npm install cookie-parser
```

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie parsing middleware
app.use(cookieParser());
</code></pre>

See [Third-party middleware](../resources/middleware.html) for a partial list of third-party middleware commonly used with Express.
