---
layout: page
title: Express "Hello World" example
menu: starter
lang: en
redirect_from: "/starter/hello-world.html"
---

# Hello world example

<div class="doc-box doc-info" markdown="1">
Embedded below is essentially the simplest Express app you can create. It is a single file app &mdash; _not_ what you'd get if you use the [Express generator](/{{ page.lang }}/starter/generator.html), which creates the scaffolding for a full app with numerous JavaScript files, Jade templates, and sub-directories for various purposes.
</div>

<script src="https://embed.runkit.com" data-element-id="hello-example" data-mode="endpoint" async defer></script>
<div id="hello-example"><pre><code class="language-js">
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
</code></pre></div>

This app starts a server and listens on port 3000 for connections. The app responds with "Hello World!" for requests
to the root URL (`/`) or _route_. For every other path, it will respond with a **404 Not Found**.

The example above is actually a working server: Go ahead and click on the URL shown. You'll get a response, with real-time logs on the page, and any changes you make will be reflected in real time. This is powered by [RunKit](https://runkit.com), which provides an interactive JavaScript playground connected to a complete Node environment that runs in your web browser.
Below are instructions for running the same app on your local machine.

<div class="doc-box doc-info" markdown="1">
RunKit is a third-party service not affiliated with the Express project.
</div>

### Running Locally

First create a directory named `myapp`, change to it and run `npm init`. Then install `express` as a dependency, as per the [installation guide](/{{ page.lang }}/starter/installing.html).

In the `myapp` directory, create a file named `app.js` and copy in the code from the example above.

<div class="doc-box doc-notice" markdown="1">
The `req` (request) and `res` (response) are the exact same objects that Node provides, so you can invoke
`req.pipe()`, `req.on('data', callback)`, and anything else you would do without Express involved.
</div>

Run the app with the following command:

```console
$ node app.js
```

Then, load `http://localhost:3000/` in a browser to see the output.

###  [Previous: Installing ](/{{ page.lang }}/starter/installing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Express Generator ](/{{ page.lang }}/starter/generator.html)
