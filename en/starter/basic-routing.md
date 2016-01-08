---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Express basic routing
menu: starter
lang: en
redirect_from: "/starter/basic-routing.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Basic routing

_Routing_ refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

Route definition takes the following structure:
<pre><code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code></pre>

Where:

- `app` is an instance of `express`.
- `METHOD` is an [HTTP request method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
- `PATH` is a path on the server.
- `HANDLER` is the function executed when the route is matched.

<div class="doc-box doc-notice" markdown="1">
This tutorial assumes that an instance of `express` named `app` is created and the server is running. If you are not familiar with creating an app and starting it, see the [Hello world example](/{{ page.lang }}/starter/hello-world.html).
</div>

The following examples illustrate defining simple routes.

Respond with `Hello World!` on the homepage:

<pre><code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code></pre>

Respond to POST request on the root route (`/`), the application's home page:

<pre><code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
</code></pre>

Respond to a PUT request to the `/user` route:

<pre><code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
</code></pre>

Respond to a DELETE request to the `/user` route:

<pre><code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
</code></pre>

For more details about routing, see the [routing guide](/{{ page.lang }}/guide/routing.html).
