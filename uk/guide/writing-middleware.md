---
layout: page
title: Створення проміжних обробників для використання у Express застосунках
menu: guide
lang: uk
---

# Створення проміжних обробників для використання у Express застосунках

<h2>Overview</h2>

_Middleware_ functions are functions that have access to the [request object](/4x/api.html#req)  (`req`), the [response object](/4x/api.html#res) (`res`), and the next middleware function in the application's request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

Middleware functions can perform the following tasks:

* Execute any code.
* Make changes to the request and the response objects.
* End the request-response cycle.
* Call the next middleware in the stack.

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

The following figure shows the elements of a middleware function call:

<table id="mw-fig">
<tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">HTTP method for which the middleware function applies.</div>

<div class="callout" id="callout2">Path (route) for which the middleware function applies.</div>

<div class="callout" id="callout3">The middleware function.</div>

<div class="callout" id="callout4">Callback argument to the middleware function, called "next" by convention.</div>

<div class="callout" id="callout5">HTTP <a href="/en/4x/api.html#res">response</a> argument to the middleware function, called "res" by convention.</div>

<div class="callout" id="callout6">HTTP <a href="/en/4x/api.html#req">request</a> argument to the middleware function, called "req" by convention.</div>
</td></tr>
</table>

<h2>Example</h2>

Here is an example of a simple "Hello World" Express application. 
The remainder of this article will define and add two middleware functions to the application:
one called `myLogger` that prints a simple log message and another called `requestTime` that
displays the timestamp of the HTTP request.

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code></pre>

<h3>Middleware function myLogger</h3>
Here is a simple example of a middleware function called "myLogger". This function just prints "LOGGED" when a request to the app passes through it. The middleware function is assigned to a variable named `myLogger`.

<pre><code class="language-javascript" translate="no">
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
</code></pre>

<div class="doc-box doc-notice" markdown="1">
Notice the call above to `next()`.  Calling this function invokes the next middleware function in the app.
The `next()` function is not a part of the Node.js or Express API, but is the third argument that is passed to the middleware function.  The `next()` function could be named anything, but by convention it is always named "next". 
To avoid confusion, always use this convention.
</div>

To load the middleware function, call `app.use()`, specifying the middleware function.
For example, the following code loads the `myLogger` middleware function before the route to the root path (/).

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code></pre>

Every time the app receives a request, it prints the message "LOGGED" to the terminal.

The order of middleware loading is important: middleware functions that are loaded first are also executed first.

If `myLogger` is loaded after the route to the root path, the request never reaches it and the app doesn't print "LOGGED", because the route handler of the root path terminates the request-response cycle.

The middleware function `myLogger` simply prints a message, then passes on the request to the next middleware function in the stack by calling the `next()` function.

<h3>Middleware function requestTime</h3>

Next, we'll create a middleware function called "requestTime" and add it as a property called `requestTime` 
to the request object. 

<pre><code class="language-javascript" translate="no">
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
</code></pre>

The app now uses the `requestTime` middleware function. Also, the callback function of the root path route uses the property that the middleware function adds to `req` (the request object).

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.listen(3000);
</code></pre>

When you make a request to the root of the app, the app now displays the timestamp of your request in the browser.

Because you have access to the request object, the response object, the next middleware function in the stack, and the whole Node.js API, the possibilities with middleware functions are endless.

For more information about Express middleware, see: [Using Express middleware](/guide/using-middleware.html).
