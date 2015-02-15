<h3 id='router.use'>router.use([path], [function, ...] function)</h3>

Uses the given middleware `function`, with optional mount path `path`, that defaults to "/".

This method is similar to [app.use()](#app.use). A simple example and usecase is described below.
See [app.use()](#app.use) for more information.

Middleware is like a plumbing pipe, requests start at the first middleware you define
and work their way "down" the middleware stack processing for each path they match.

~~~js
var express = require('express');
var app = express();
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function(req, res, next) {
  // ... maybe some additional /bar logging ...
  next();
});

// always invoked
router.use(function(req, res, next) {
  res.send('Hello World');
});

app.use('/foo', router);

app.listen(3000);
~~~

The "mount" path is stripped and is _not_ visible to the middleware `function`.
The main effect of this feature is that mounted middleware may operate without
code changes regardless of its "prefix" pathname.

The order in which you define middleware with `router.use()` is very important.
They are invoked sequentially, thus the order defines middleware precedence. For example,
usually a logger is the very first middleware you would use, so every request is logged.

~~~js
var logger = require('morgan');

router.use(logger());
router.use(express.static(__dirname + '/public'));
router.use(function(req, res){
  res.send('Hello');
});
~~~

Now suppose you wanted to ignore logging requests for static files, but to continue
logging routes and middleware defined after `logger()`.  You would simply move `static()` above:

~~~js
router.use(express.static(__dirname + '/public'));
router.use(logger());
router.use(function(req, res){
  res.send('Hello');
});
~~~

Another concrete example is serving files from multiple directories,
giving precedence to "./public" over the others:

~~~js
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
~~~

The `router.use()` method also supports named parameters so that your mount points
for other routers can benefit from preloading using named parameters.
