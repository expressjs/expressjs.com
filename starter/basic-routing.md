---
layout: page
title: Express basic routing tutorial
menu: starter
lang: en
---

# Basic routing tutorial

This tutorial is a basic introduction to routing with Express. Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which is / are executed when the route is matched. 

Route definition takes the following structure `app.METHOD(PATH, HANDLER)`, where `app` is an instance of `express`, `METHOD` is an [HTTP request method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), `PATH` is a path on the server, and `HANDLER` is the function executed when the route is matched.

<div class="doc-box doc-notice" markdown="1">
This tutorial assumes that an instance of `express` named `app` is created and the server is running. If you are not familiar with creating an app and starting it, refer to the [Hello world example](/starter/hello-world.html).
</div>

The following code illustrates some example routes in an app.

~~~js
// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
~~~

For more details about routing, refer to the [routing guide](/guide/routing.html).
