---
layout: page
title: Express "Hello World" example
menu: starter
lang: en
redirect_from: "/starter/hello-world.html"
---

# Hello world example

<div class="doc-box doc-info" markdown="1">
This is essentially going to be the simplest Express app you can create. It is a single file app &mdash; _not_ what you'd get if you use the [Express generator](/{{ page.lang }}/starter/generator.html), which creates the scaffolding for a full app with numerous JavaScript files, Jade templates, and sub-directories for various purposes.
</div>

First create a directory named `myapp`, change to it and run `npm init`. Then install `express` as a dependency, as per the [installation guide](/{{ page.lang }}/starter/installing.html).

In the `myapp` directory, create a file named `app.js` and add the following code:

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

The app starts a server and listens on port 3000 for connections. The app responds with "Hello World!" for requests
to the root URL (`/`) or _route_. For every other path, it will respond with a **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
The `req` (request) and `res` (response) are the exact same objects that Node provides, so you can invoke
`req.pipe()`, `req.on('data', callback)`, and anything else you would do without Express involved.
</div>

Run the app with the following command:

```sh
$ node app.js
```

Then, load `http://localhost:3000/` in a browser to see the output.
