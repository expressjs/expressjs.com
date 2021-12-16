---
layout: page
title: Використання проміжних обробників Express
menu: guide
lang: uk
---

# Використання проміжних обробників

Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

_Middleware_ functions are functions that have access to the [request object](/{{ page.lang }}/4x/api.html#req)  (`req`), the [response object](/{{ page.lang }}/4x/api.html#res) (`res`), and the next middleware function in the application's request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

Middleware functions can perform the following tasks:

* Execute any code.
* Make changes to the request and the response objects.
* End the request-response cycle.
* Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

 - [Application-level middleware](#middleware.application)
 - [Router-level middleware](#middleware.router)
 - [Error-handling middleware](#middleware.error-handling)
 - [Built-in middleware](#middleware.built-in)
 - [Third-party middleware](#middleware.third-party)

You can load application-level and router-level middleware with an optional mount path.
You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.

<h2 id='middleware.application'>Application-level middleware</h2>

Bind application-level middleware to an instance of the [app object](/{{ page.lang }}/4x/api.html#app) by using the `app.use()` and `app.METHOD()` functions, where `METHOD` is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.

This example shows a middleware function with no mount path. The function is executed every time the app receives a request.

<pre><code class="language-javascript" translate="no">
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
</code></pre>

This example shows a middleware function mounted on the `/user/:id` path. The function is executed for any type of
HTTP request on the `/user/:id` path.

<pre><code class="language-javascript" translate="no">
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code></pre>

This example shows a route and its handler function (middleware system). The function handles GET requests to the `/user/:id` path.

<pre><code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
</code></pre>

Here is an example of loading a series of middleware functions at a mount point, with a mount path.
It illustrates a middleware sub-stack that prints request info for any type of HTTP request to the `/user/:id` path.

<pre><code class="language-javascript" translate="no">
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code></pre>

Route handlers enable you to define multiple routes for a path. The example below defines two routes for GET requests to the `/user/:id` path. The second route will not cause any problems, but it will never get called because the first route ends the request-response cycle.

This example shows a middleware sub-stack that handles GET requests to the `/user/:id` path.

<pre><code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
</code></pre>

To skip the rest of the middleware functions from a router middleware stack, call `next('route')` to pass control to the next route.
**NOTE**: `next('route')` will work only in middleware functions that were loaded by using the `app.METHOD()` or `router.METHOD()` functions.

This example shows a middleware sub-stack that handles GET requests to the `/user/:id` path.

<pre><code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
</code></pre>

<h2 id='middleware.router'>Router-level middleware</h2>

Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of `express.Router()`.

<pre><code class="language-javascript" translate="no">
var router = express.Router();
</code></pre>
Load router-level middleware by using the `router.use()` and `router.METHOD()` functions.

The following example code replicates the middleware system that is shown above for application-level middleware, by using router-level middleware:

<pre><code class="language-javascript" translate="no">
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
</code></pre>

<h2 id='middleware.error-handling'>Error-handling middleware</h2>

<div class="doc-box doc-notice" markdown="1">
Error-handling middleware always takes _four_ arguments.  You must provide four arguments to identify it as an error-handling middleware function. Even if you don't need to use the `next` object, you must specify it to maintain the signature. Otherwise, the `next` object will be interpreted as regular middleware and will fail to handle errors.
</div>

Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature `(err, req, res, next)`):

<pre><code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code></pre>

For details about error-handling middleware, see: [Error handling](/{{ page.lang }}/guide/error-handling.html).

<h2 id='middleware.built-in'>Built-in middleware</h2>

Starting with version 4.x, Express no longer depends on [Connect](https://github.com/senchalabs/connect). With the exception of `express.static`, all of the middleware
functions that were previously included with Express' are now in separate modules. Please view [the list of middleware functions](https://github.com/senchalabs/connect#middleware).

The only built-in middleware function in Express is `express.static`. This function is based on [serve-static](https://github.com/expressjs/serve-static), and is responsible for serving static assets such as HTML files, images, and so on.

The function signature is:
<pre><code class="language-javascript" translate="no">
express.static(root, [options])
</code></pre>

The `root` argument specifies the root directory from which to serve static assets.

For information on the `options` argument and more details on this middleware function, see [express.static](/en/4x/api.html#express.static).

Here is an example of using the `express.static` middleware function with an elaborate options object:

<pre><code class="language-javascript" translate="no">
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
</code></pre>

You can have more than one static directory per app:

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
</code></pre>

For more details about the `serve-static` function and its options, see: [serve-static](https://github.com/expressjs/serve-static) documentation.

<h2 id='middleware.third-party'>Third-party middleware</h2>

Use third-party middleware to add functionality to Express apps.

Install the Node.js module for the required functionality, then load it in your app at the application level or at the router level.

The following example illustrates installing and loading the cookie-parsing middleware function `cookie-parser`.

```console
$ npm install cookie-parser
```

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
</code></pre>

For a partial list of third-party middleware functions that are commonly used with Express, see: [Third-party middleware](../resources/middleware.html).
