---
layout: page
title: Express routerlar
menu: guide
lang: uz
---

# Routerlar

Routing refers to the definition of end points (URIs) to an application and how it responds to client requests.

A route is a combination of a URI, a HTTP request method (GET, POST, and so on), and one or more handlers for the endpoint. It takes the following structure `app.METHOD(path, [callback...], callback)`, where `app` is an instance of `express`, `METHOD` is an [HTTP request method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), `path` is a path on the server, and `callback` is the function executed when the route is matched.

The following is an example of a very basic route.

<pre><code class="language-javascript" translate="no">
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world')
})
</code></pre>

<h2 id="route-methods">Route methods</h2>

A route method is derived from one of the HTTP methods, and is attached to an instance of `express`.

The following is an example of routes defined for the GET and the POST methods to the root of the app.

<pre><code class="language-javascript" translate="no">
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

</code></pre>

Express supports the following routing methods corresponding to HTTP methods: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search`, and `connect`.

<div class="doc-box doc-info" markdown="1">
To route methods which translate to invalid JavaScript variable names, use the bracket notation. For example,
`app['m-search']('/', function ...`
</div>

There is a special routing method, `app.all()`, which is not derived from any HTTP method. It is used for loading middleware at a path for all request methods.

In the following example, the handler will be executed for requests to "/secret" whether using GET, POST, PUT, DELETE, or any other HTTP request method.

<pre><code class="language-javascript" translate="no">
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
</code></pre>

<h2 id="route-paths">Route paths</h2>

Route paths, in combination with a request method, define the endpoints at which requests can be made to. They can be strings, string patterns, or regular expressions.

<div class="doc-box doc-warn" markdown="1">
Query strings are not a part of the route path.
</div>

Examples of route paths based on strings:

<pre><code class="language-javascript" translate="no">
// with match request to the root
app.get('/', function (req, res) {
  res.send('root')
})

// will match requests to /about
app.get('/about', function (req, res) {
  res.send('about')
})

// will match request to /random.text
app.get('/random.text', function (req, res) {
  res.send('random.text')
})
</code></pre>

Examples of route paths based on string patterns:

<pre><code class="language-javascript" translate="no">
// will match acd and abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd')
})

// will match abcd, abbcd, abbbcd, and so on
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd')
})

// will match abcd, abxcd, abRABDOMcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd')
})

// will match /abe and /abcde
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e')
})
</code></pre>

<div class="doc-box doc-info" markdown="1">
The characters ?, +, *, and () are subsets of their Regular Expression counterparts. The hyphen (-) and the dot (.) are interpreted literally by string-based paths.
</div>

Examples of route paths based on regular expressions:

<pre><code class="language-javascript" translate="no">
// will match anything with an a in the route name:
app.get(/a/, function(req, res) {
  res.send('/a/')
})

// will match butterfly, dagonfly; but not butterflyman, dragonfly man, and so on
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/')
})
</code></pre>

<h2 id="route-handlers">Route handlers</h2>

You can provide multiple callback functions that behave just like [middleware](/guide/using-middleware.html) to handle a request. The only exception is that these callbacks may invoke `next('route')` to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there's no reason to proceed with the current route.

Route handlers can come in the form of a function, an array of functions, or various combinations of both, as shown the following examples.

A route can be handled using a single callback function:

<pre><code class="language-javascript" translate="no">
app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})
</code></pre>

A route can be handled using a more than one callback function (make sure to specify the `next` object):

<pre><code class="language-javascript" translate="no">
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
</code></pre>

A route can be handled using an array of callback functions:

<pre><code class="language-javascript" translate="no">
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
</code></pre>

A route can be handled using a combination of array of functions and independent functions:

<pre><code class="language-javascript" translate="no">
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
</code></pre>

<h2 id="response-methods">Response methods</h2>

The methods on the response object (`res`) in the following table can send a response to the client and terminate the request response cycle. If none of them is called from a route handler, the client request will be left hanging.

| Method               | Description
|----------------------|--------------------------------------
| [res.download()](/4x/api.html#res.download)   | Prompt a file to be downloaded.
| [res.end()](/4x/api.html#res.end)        | End the response process.
| [res.json()](/4x/api.html#res.json)       | Send a JSON response.
| [res.jsonp()](/4x/api.html#res.jsonp)      | Send a JSON response with JSONP support.
| [res.redirect()](/4x/api.html#res.redirect)   | Redirect a request.
| [res.render()](/4x/api.html#res.render)     | Render a view template.
| [res.send()](/4x/api.html#res.send)       | Send a response of various types.
| [res.sendFile](/4x/api.html#res.sendFile)     | Send a file as an octet stream.
| [res.sendStatus()](/4x/api.html#res.sendStatus) | Set the response status code and send its string representation as the response body.

<h2 id="app-route">app.route()</h2>

Chainable route handlers for a route path can be created using `app.route()`.
Since the path is specified at a single location, it
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

<h2 id="express-router">express.Router</h2>

The `express.Router` class can be used to create modular mountable
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
