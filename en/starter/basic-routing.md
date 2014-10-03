# Basic routing tutorial

This tutorial is a basic introduction to the concept of routing in express.

<div class="doc-box doc-notice">
The code in the tutorial is written with the assumption that an instance of express named `app` is created and the server is running. If you are nor familiar with creating an app and starting it, refer to the [Hello World! example](/en/starter/hello-world.html).
</div>

Routing is the definition of endpoints for clients to interact with an express app. It is accomplished with the use of an HTTP request method and a path. Each route has a handler function, which is executed when the route is matched.

Route definition takes the following structure `app.VERB(PATH, HANDLER)`, where `app` is an instance of express, `VERB` is an [HTTP request method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), `PATH` is a path on the server, and `HANDLER` is the function which is executed when the route is matched.

The following is an example routes in an app, the comments are descriptive of what they do.

```js
// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!')
})

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request')
})

// accept PUT request at /user
app.put('/', function (req, res) {
  res.send('Got a PUT request at /user')
})

// accept DELETE request at /user
app.delete('/', function (req, res) {
  res.send('Got a DELETE request at /user')
})

```

For all the details about routing, refer the [routing guide](/en/guide/routing.html).
