---
layout: page
title: Express "Hello World" example
menu: starter
lang: en
---

# Hello world example

Make sure you've followed the instructions in [Installing](/starter/installing.html).

Now, you're going to create a very basic Express app.


<div class="doc-box doc-info" markdown="1">
NOTE: This is essentially the simplest Express app you can create.  It's a single file&mdash;_not_ what you'd get
if you use the [Express generator](/starter/generator.html), which creates the scaffolding for a full app with sub-directories for various
purposes. 
</div>

~~~js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
~~~

The app starts a server and listens on port 3000 for connection. It will respond with "Hello World!" for requests
to the root URL (`/`) or _route_. For every other path, it will respond with a **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
The `req` (request) and `res` (response) are the exact same objects that Node provides, so you can invoke
`req.pipe()`, `req.on('data', callback)`, and anything else you would do without Express involved.
</div>

Save the code in a file named `app.js` and run it with the following command.

~~~ sh
$ node app.js
~~~

Then, load [http://localhost:3000/](http://localhost:3000/) in a browser to see the output.
