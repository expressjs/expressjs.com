# Routing

Routing refers to the definition of end points (URIs) to an application and how it responds to client requests.

A route is a combination of a URI, a HTTP request method (GET, POST, and so on), and one or more handlers for the endpoint. It takes the following structure `app.METHOD(path, [callback...], callback)`, where `app` is an instance of `express`, `METHOD` is an [HTTP request method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), `path` is a path on the server, and `callback` is the function executed when the route is matched.

The following is an example of a very basic route.

```js
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world')
})
```

## Route methods

A route method is derived from one of the HTTP methods, and is attached to an instance of `express`.

The following is an example of routes defined for the GET and the POST methods to the root of the app.

```js
var express = require('express')
var app = express()

// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

```

Express supports the following routing methods corresponding to HTTP methods: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search`, and `connect`.

<div class="doc-box doc-info">
To route methods which translate to invalid JavaScript variable names, use the bracket notation. For example, 
`app['m-search']('/', function ...`
</div>

## Route paths

<div class="doc-box doc-warn">
Query strings are *not* considered when peforming these matches. For example, "GET /"
would match the following route, as would "GET /?name=tobi":
</div>

...


## Route handlers

You can provide multiple callback functions that behave just like [middleware](/guide/using-middleware.html) to handle a request. The only exception is that these callbacks may invoke `next('route')` to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there's no reason to proceed with the current route.

Route handlers can come in the form of a function, an array of functions, or various combinations of both, as shown the following examples.

A route can be handled using a single callback function:

```js
app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})
```

A route can be handled using a more than one callback function (make sure to specify the `next` object):

```js
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
```

A route can be handled using an array of callback functions:
```js

var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

A route can be handled using a combination of array of functions and independent functions:

```js
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})
```

## Response methods

...

## `app.route()`

`app.route()` method enables you to create chainable route handlers
for a route path. Since the path is specified in a single location, it
helps to create modular routes and reduce redundancy and typos. For more
information on routes, see [Router() documentation](/4x/api.html#router).

Here is an example of chained route handlers defined using `app.route()`.

```js
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
```

## `express.Router`

You can use the `express.Router` class to create modular mountable
route handlers. A `Router` instance is a complete middleware and
routing system; for this reason it is often referred to as a "mini-app".

The following example creates a router as a module, loads a middleware in
it, defines some routes, and mounts it on a path on the main app.

Create a router file named `birds.js` in the app directory,
with the following content:

```js
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
```

Then, load the router module in the app:

```js
var birds = require('./birds');
...
app.use('/birds', birds);
```

The app will now be able to handle requests to `/birds` and
`/birds/about`, along with calling the `timeLog`
middleware specific to the route.


---


Regular expressions may also be used, and can be useful
if you have very specific restraints, for example the following
would match "GET /commits/71dbb9c" as well as "GET /commits/71dbb9c..4c084f9".

```js
app.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || 'HEAD';
  res.send('commit range ' + from + '..' + to);
});
```

Several callbacks may also be passed, useful for re-using middleware
that load resources, perform validations, etc.

```js
app.get('/user/:id', user.load, function(){
  // ... 
})
```

If you have multiple common middleware for a route, you can use the route API with `all`.

```js
var middleware = [loadForum, loadThread];

app.route('/forum/:fid/thread/:tid')
.all(loadForum)
.all(loadThread)
.get(function() { //... });
.post(function() { //... });
```

Both middleware will be run for GET and POST requests.

