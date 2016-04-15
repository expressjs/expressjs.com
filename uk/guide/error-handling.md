---
layout: page
title: Обробка помилок в Express
menu: guide
lang: uk
---

# Обробка помилок

Define error-handling middleware functions in the same way as other middleware functions,
except error-handling functions have four arguments instead of three:
`(err, req, res, next)`. For example:

<pre><code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code></pre>

You define error-handling middleware last, after other `app.use()` and routes calls; for example:

<pre><code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
</code></pre>

Responses from within a middleware function can be in any format that you prefer, such as an HTML error page, a simple message, or a JSON string.

For organizational (and higher-level framework) purposes, you can define
several error-handling middleware functions, much like you would with
regular middleware functions. For example, if you wanted to define an error-handler
for requests made by using `XHR`, and those without, you might use the following commands:

<pre><code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
</code></pre>

In this example, the generic `logErrors` might write request and
error information to `stderr`, for example:

<pre><code class="language-javascript" translate="no">
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
</code></pre>

Also in this example, `clientErrorHandler` is defined as follows; in this case, the error is explicitly passed along to the next one:

<pre><code class="language-javascript" translate="no">
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
</code></pre>

The "catch-all" `errorHandler` function might be implemented as follows:

<pre><code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
</code></pre>

If you pass anything to the `next()` function (except the string `'route'`), Express regards the current request as being in error and will skip any remaining non-error handling routing and middleware functions. If you want to handle that error in some way, you'll have to create an error-handling route as described in the next section.

If you have a route handler with multiple callback functions you can use the `route` parameter to skip to the next route handler.  For example:

<pre><code class="language-javascript" translate="no">
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
</code></pre>

In this example, the `getPaidContent` handler will be skipped but any remaining handlers in `app` for `/a_route_behind_paywall` would continue to be executed.

<div class="doc-box doc-info" markdown="1">
Calls to `next()` and `next(err)` indicate that the current handler is complete and in what state.  `next(err)` will skip all remaining handlers in the chain except for those that are set up to handle errors as described above.
</div>

## The Default Error Handler

Express comes with an in-built error handler, which takes care of any errors that might be encountered in the app. This default error-handling middleware function is added at the end of the middleware function stack.

If you pass an error to `next()` and you do not handle it in
an error handler, it will be handled by the built-in error handler; the error will be written to the client with the
stack trace. The stack trace is not included in the production environment.

<div class="doc-box doc-info" markdown="1">
Set the environment variable `NODE_ENV` to `production`, to run the app in production mode.
</div>

If you call `next()` with an error after you have started writing the
response (for example, if you encounter an error while streaming the
response to the client) the Express default error handler closes the
connection and fails the request.

So when you add a custom error handler, you will want to delegate to
the default error handling mechanisms in Express, when the headers
have already been sent to the client:

<pre><code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
</code></pre>
