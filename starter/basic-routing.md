# Basic routing tutorial

This tutorial is a basic introduction to routing with Express.  _Routing_ refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or _path_) and a specific HTTP request method (GET, POST, and so on).

Each route has a handler function, executed when the route is matched. 

Route definition takes the following structure `app.VERB(PATH, HANDLER)`, where `app` is an instance of `express`, `VERB` is an [HTTP request method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), `PATH` is a path on the server, and `HANDLER` is the function executed when the route is matched.

<div class="doc-box doc-notice">
This tutorial assumes that an instance of `express` named `app` is created and the server is running. If you are nor familiar with creating an app and starting it, refer to the [Hello world example](/starter/hello-world.html).
</div>

The following code illustrates some example routes in an app.

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
<!--
For all the details about routing, see [routing guide](/en/guide/routing.html).
-->
