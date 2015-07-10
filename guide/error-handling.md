---
layout: page
title: Express error handling
menu: guide
lang: en
---

# Error handling

Define error-handling middleware like other middleware,
except with four arguments instead of three, specifically with the signature
`(err, req, res, next)`. For example:

~~~js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
~~~

You define error-handling middleware last, after other `app.use()` and routes calls; for example:

~~~js
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
~~~

Responses from within the middleware are completely arbitrary. You may
wish to respond with an HTML error page, a simple message, a JSON string,
or anything else you prefer.

For organizational (and higher-level framework) purposes, you may define
several error-handling middleware, much like you would with
regular middleware. For example suppose you wanted to define an error-handler
for requests made via XHR, and those without, you might do:

~~~js
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
~~~

Where the more generic `logErrors` may write request and
error information to stderr, loggly, or similar services:

~~~js
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
~~~

Where `clientErrorHandler` is defined as the following (note
that the error is explicitly passed along to the next):

~~~js
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}
~~~

The following `errorHandler` "catch-all" implementation may be defined as:

~~~js
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
~~~

If you pass anything to the `next()` function (except the string `'route'`) Express will regard the current request as having errored out and will skip any remaining non-error handling routing/middleware functions.  If you want to handle that error in some way you'll have to create an error-handling route as described in the next section.

If you have a route handler with multiple callback functions you can use the 'route' parameter to skip to the next route handler.  For example:

~~~js
app.get('/a_route_behind_paywall', 
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) { 
    
      // continue handling this request 
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });
~~~ 

In this example, the `getPaidContent` handler will be skipped but any remaining handlers in `app` for `/a_route_behind_paywall` would continue to be executed.

<div class="doc-box doc-info" markdown="1">
`next()` and `next(err)` are analogous to `Promise.resolve()` and `Promise.reject()`.  They allow you to signal to Express that this current handler is complete and in what state.  `next(err)` will skip all remaining handlers in the chain except for those that are set up to handle errors as described in the next section.
</div>
