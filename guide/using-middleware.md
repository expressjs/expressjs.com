# Using middleware

An Express application is essentially a series of middleware, executed in the order they occur.  

Middleware is a function with access to the request object (`req`), the response object (`res`), and the next middleware in line in the request-response cycle of an Express application, commonly denoted by a variable named `next`.  Middleware can:
 - Execute any code.
 - Make changes to the request and the reponse objects.
 - End the request-response cycle.
 - Call the next middleware in the stack. 

If the current middleware does not end the request-response cycle, it must call `next()` to pass control to the next middleware, otherwise the request will be left hanging.

With an optional mount path, middleware can be loaded at the application level or at the router level.
Also, a series of middleware functions can be loaded together, creating a sub-stack of middleware system at a mount point.

An Express application can use the following kinds of middleware:
 - [Application-level middleware](#middleware.application)
 - [Router-level middleware](#middleware.router)
 - [Built-in middleware](#middleware.built-in)
 - [Third-party middleware](#middleware.third-party)

<h3 id='middleware.application'>Application level middleware</h3>

Application level middleware are bound to an instance of `express`, using `app.use()` and `app.VERB()`.

```js
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
```

Here is an example of loading a series of middleware at a mount point with a mount path.

```js
// a middleware sub-stack which prints request info for any type of HTTP request to /user/:id
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

Route handlers, being a middleware system, makes it possible to define multiple routes for a path. In the example below, two routes are defined for GET requests to `/user/:id`. The second router will not cause any problems, however it will never get called, because the first route ends the request-response cycle.

```js
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
```

If you need to skip the rest of the middleware from a router middleware stack, call `next('route')` to pass on the control to the next route. Note: `next('route')` will work only in middleware loaded using `app.VERB()` or `router.VERB()`.

```js
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
```

<h3 id='middleware.router'>Router level middleware</h3>

Router level middleware work just like application level middleware except they are bound to an instance of `express.Router()`.

```js
var router = express.Router();
```
Router level middleware are loaded using `router.use()` and `router.VERB()`.

The middleware system created at the application level in the example above, can be replicated at the router level using the following code.

```js
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
```

<h3 id='middleware.third-party'>Third-party middleware</h3>

Express is a routing and middleware web framework with minimal functionality of its own. Functionality to Express apps are added via third-party middleware.

Install the node module for the required functionality and loaded it in your app at the application level or at the router level.

In the following example, `cookie-parser`, a cookie parsing middleware is installed and loaded in the app.

```sh
$ npm install cookie-parser
```

```js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie parsing middleware
app.use(cookieParser);
```

See [Third-party middleware](../resources/middleware.html) for a partial list of third-party middleware commonly used with Express.
