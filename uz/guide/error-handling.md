---
layout: page
title: Express error handling
menu: guide
lang: uz
---

# Error handling

Define error-handling middleware like other middleware,
except with four arguments instead of three, specifically with the signature
`(err, req, res, next)`):

<pre><code class="language-javascript" translate="no">
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code></pre>

You define error-handling middleware last, after other `app.use()` and routes calls;
For example:

<pre><code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next){
  // logic
});
</code></pre>

Responses from within the middleware are completely arbitrary. You may
wish to respond with an HTML error page, a simple message, a JSON string,
or anything else you prefer.

For organizational (and higher-level framework) purposes, you may define
several error-handling middleware, much like you would with
regular middleware. For example suppose you wanted to define an error-handler
for requests made via XHR, and those without, you might do:

<pre><code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
</code></pre>

Where the more generic `logErrors` may write request and
error information to stderr, loggly, or similar services:

<pre><code class="language-javascript" translate="no">
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
</code></pre>

Where `clientErrorHandler` is defined as the following (note
that the error is explicitly passed along to the next):

<pre><code class="language-javascript" translate="no">
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}
</code></pre>

The following `errorHandler` "catch-all" implementation may be defined as:

<pre><code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
</code></pre>
