---
layout: page
title: Writing middleware for use in Express apps
menu: guide
lang: en
---

# Writing middleware for use in Express apps

<h2>Overview</h2>

Middleware is a function with access to the request object (`req`), the response object (`res`), and the next middleware in the application's request-response cycle, commonly denoted by a variable named `next`.

Middleware can:

* Execute any code.
* Make changes to the request and the response objects.
* End the request-response cycle.
* Call the next middleware in the stack.

If the current middleware does not end the request-response cycle, it must call `next()` to pass control to the next middleware, otherwise the request will be left hanging.

Elements of Middleware 

~~~
var express = require('express');
var app = express();

    http verb to which the middleware function shall be applied
    |    path to which the middleware function shall be applied
    |    |   middleware function
    |    |   |         request argument passed to middleware function, commonly called "req"
    |    |   |         |     response argument passed to middleware function, commonly called "res"
    |    |   |         |     |   callback to the next middleware, commonly called "next"
    |    |   |         |     |   |
    ▼    ▼   ▼         ▼     ▼   ▼
app.get('/', function (req, res, next) {
  next();
});

app.listen(3000);
~~~

To learn how to write and use Express middleware, we will write two middleware for the following minimalistic app:

~~~js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
~~~

<h2>Development</h2>

Here is a simple example of middleware called "myLogger". All it does is print "LOGGED", when a request to the app passes through it. The middleware is assigned to a variable named `myLogger`.

~~~js
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
~~~

To load middleware, use the `app.use()` method. For example, the following code loads this middleware before the route to the root path (/).

~~~js
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
~~~

Now every time the app receives a request, it will print "LOGGED" to the terminal.

The order of middleware loading is important: middleware loaded first are executed first.

If myLogger was loaded after the route to the root path, the request would have never reached it, and the app wouldn't print "LOGGED", because the route handler of the root path would have terminated the request-response cycle.

The middleware myLogger simply printed a message and passed on the request to the next middleware in the stack by calling `next()`.

The next example adds a property called `requestTime` to the request object. So, we'll call this middleware "requestTime".

~~~js
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
~~~

The app now uses the requestTime middleware, and the callback function of the root path route uses the property that the middleware adds to `req` (the request object).

~~~js
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
~~~

On making a request to the root of the app now, the app displays the timestamp of request in the browser.

With access to the request object, the response object, the next middleware in stack, and the whole Node.js API, the possibilities with middleware are endless.

For more information about Express middleware, refer to the article "[Using Express middleware](/guide/using-middleware.html)".
