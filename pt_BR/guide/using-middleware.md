---
layout: page
title: Using Express middleware
menu: guide
lang: en
---

# Using middleware

Express is a routing and middleware web framework with minimal functionality of its own: An Express application is essentially a series of middleware calls.

_Middleware_ is a function with access to the [request object](/4x/api.html#req) (`req`), the [response object](/4x/api.html#res) (`res`), and the next middleware in the application's request-response cycle, commonly denoted by a variable named `next`.

Middleware can:

 - Execute any code.
 - Make changes to the request and the response objects.
 - End the request-response cycle.
 - Call the next middleware in the stack.

If the current middleware does not end the request-response cycle, it must call `next()` to pass control to the next middleware, otherwise the request will be left hanging.

An Express application can use the following kinds of middleware:

 - [Application-level middleware](#middleware.application)
 - [Router-level middleware](#middleware.router)
 - [Error-handling middleware](#middleware.error-handling)
 - [Built-in middleware](#middleware.built-in)
 - [Third-party middleware](#middleware.third-party)

You can load application-level and router-level middleware with an optional mount path.
Also, you can load a series of middleware functions together, creating a sub-stack of the middleware system at a mount point.

<h2 id='middleware.application'>Application-level middleware</h2>

Bind application-level middleware to an instance of the [app object](/4x/api.html#app) with `app.use()` and `app.METHOD()`,
where `METHOD` is is the HTTP method of the request that it handles, such as GET, PUT, POST, and so on, in lowercase.
For example:

~~~js
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
~~~

Here is an example of loading a series of middleware at a mount point with a mount path:

~~~js
// a middleware sub-stack which prints request info for any type of HTTP request to /user/:id
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
~~~

Route handlers enable you to define multiple routes for a path. The example below defines two routes for GET requests to `/user/:id`. The second router will not cause any problems, however it will never get called, because the first route ends the request-response cycle.

~~~js
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
~~~

To skip the rest of the middleware from a router middleware stack, call `next('route')` to pass control to the next route.
**NOTE**: `next('route')` will work only in middleware loaded using `app.METHOD()` or `router.METHOD()`.

~~~js
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
~~~

<h2 id='middleware.router'>Router-level middleware</h2>

Router-level middleware works just like application-level middleware except it is bound to an instance of `express.Router()`.

~~~js
var router = express.Router();
~~~
Load router-level middleware using `router.use()` and `router.METHOD()`.

The following example code replicates the middleware system shown above for application-level middleware
using router-level middleware:

~~~js
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
~~~

<h2 id='middleware.error-handling'>Error-handling middleware</h2>

<div class="doc-box doc-notice" markdown="1">
Error-handling middleware always takes _four_ arguments.  You must provide four arguments to identify it as an error-handling middleware. Even if you don't need to use the `next` object, you must specify it to maintain the signature, otherwise it will be interpreted as regular middleware and fail to handle errors.
</div>

Define error-handling middleware like other middleware, except with four arguments instead of three, specifically with the signature `(err, req, res, next)`):

~~~js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
~~~

For details about error-handling middleware, see [Error handling](/guide/error-handling.html).

<h2 id='middleware.built-in'>Built-in middleware</h2>

As of 4.x, Express no longer depends on [Connect](https://github.com/senchalabs/connect). Except for `express.static`, all of the middleware
previously included with Express' are now in separate modules. Please view [the list of middleware](https://github.com/senchalabs/connect#middleware).

<h4 id='express.static'>express.static(root, [options])</h4>

Express' only built-in middleware is `express.static`. It is based on [serve-static](https://github.com/expressjs/serve-static), and is responsible for serving the static assets of an Express application.

The `root` argument specifies the root directory from which to serve static assets.

The optional `options` object can have the following properties.

| Property      | Description                                                           |   Type      | Default         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | Option for serving dotfiles. Possible values are "allow", "deny", and "ignore" | String | "ignore" |
| `etag`        | Enable or disable etag generation  | Boolean | `true` |
| `extensions`  | Sets file extension fallbacks. | Array | `[]` |
| `index`       | Sends directory index file. Set `false` to disable directory indexing. | Mixed | "index.html" |
 `lastModified` | Set the `Last-Modified` header to the last modified date of the file on the OS. Possible values are `true` or `false`. | Boolean | `true` |
| `maxAge`      | Set the max-age property of the Cache-Control header in milliseconds or a string in [ms format](https://www.npmjs.org/package/ms) | Number | 0 |
| `redirect`    | Redirect to trailing "/" when the pathname is a directory. | Boolean | `true` |
| `setHeaders`  | Function for setting HTTP headers to serve with the file. | Function |  |

Here is an example of using the `express.static` middleware with an elaborate options object.

~~~js
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
~~~

You can have more than one static directory per app.

~~~js
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
~~~

For more details about `serve-static` and its options, see the [serve-static](https://github.com/expressjs/serve-static) documentation.

<h2 id='middleware.third-party'>Third-party middleware</h2>

Use third-party middleware to add functionality to Express apps.

Install the Node module for the required functionality and load it in your app at the application level or at the router level.

The following example illustrates installing and loading cookie-parsing middleware `cookie-parser`.

~~~sh
$ npm install cookie-parser
~~~

~~~js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie parsing middleware
app.use(cookieParser());
~~~

See [Third-party middleware](../resources/middleware.html) for a partial list of third-party middleware commonly used with Express.
