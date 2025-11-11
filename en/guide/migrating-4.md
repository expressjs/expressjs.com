---
layout: page
title: Migrating to Express 4
description: A guide to migrating your Express.js applications from version 3 to 4, covering changes in middleware, routing, and how to update your codebase effectively.
menu: guide
order: 9
redirect_from: "/guide/migrating-4.html"
---

# Moving to Express 4

<h2 id="overview">Overview</h2>

Express 4 is a breaking change from Express 3. That means an existing Express 3 app will _not_ work if you update the Express version in its dependencies.

This article covers:

<ul class="doclist">
  <li><a href="#changes">Changes in Express 4</a>.</li>
  <li><a href="#example-migration">An example</a> of migrating an Express 3 app to Express 4.</li>
  <li><a href="#app-gen">Upgrading to the Express 4 app generator</a>.</li>
</ul>

<h2 id="changes">Changes in Express 4</h2>

There are several significant changes in Express 4:

<ul class="doclist">
  <li><a href="#core-changes">Changes to Express core and middleware system.</a> The dependencies on Connect and built-in middleware were removed, so you must add middleware yourself.
  </li>
  <li><a href="#routing">Changes to the routing system.</a></li>
  <li><a href="#other-changes">Various other changes.</a></li>
</ul>

See also:

* [New features in 4.x.](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [Migrating from 3.x to 4.x.](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Changes to Express core and middleware system
</h3>

Express 4 no longer depends on Connect, and removes all built-in
middleware from its core, except for the `express.static` function. This means that
Express is now an independent routing and middleware web framework, and
Express versioning and releases are not affected by middleware updates.

Without built-in middleware, you must explicitly add all the
middleware that is required to run your app. Simply follow these steps:

1. Install the module: `npm install --save <module-name>`
2. In your app, require the module: `require('module-name')`
3. Use the module according to its documentation: `app.use( ... )`

The following table lists Express 3 middleware and their counterparts in Express 4.

<table class="doctable" border="1">
<tr><th>Express 3</th><th>Express 4</th></tr>
<tr><td><code>express.bodyParser</code></td>
<td><a href="https://github.com/expressjs/body-parser">body-parser</a> +
<a href="https://github.com/expressjs/multer">multer</a></td></tr>
<tr><td><code>express.compress</code></td>
<td><a href="https://github.com/expressjs/compression">compression</a></td></tr>
<tr><td><code>express.cookieSession</code></td>
<td><a href="https://github.com/expressjs/cookie-session">cookie-session</a></td></tr>
<tr><td><code>express.cookieParser</code></td>
<td><a href="https://github.com/expressjs/cookie-parser">cookie-parser</a></td></tr>
<tr><td><code>express.logger</code></td>
<td><a href="https://github.com/expressjs/morgan">morgan</a></td></tr>
<tr><td><code>express.session</code></td>
<td><a href="https://github.com/expressjs/session">express-session</a></td></tr>
<tr><td><code>express.favicon</code></td>
<td><a href="https://github.com/expressjs/serve-favicon">serve-favicon</a></td></tr>
<tr><td><code>express.responseTime</code></td>
<td><a href="https://github.com/expressjs/response-time">response-time</a></td></tr>
<tr><td><code>express.errorHandler</code></td>
<td><a href="https://github.com/expressjs/errorhandler">errorhandler</a></td></tr>
<tr><td><code>express.methodOverride</code></td>
<td><a href="https://github.com/expressjs/method-override">method-override</a></td></tr>
<tr><td><code>express.timeout</code></td>
<td><a href="https://github.com/expressjs/timeout">connect-timeout</a></td></tr>
<tr><td><code>express.vhost</code></td>
<td><a href="https://github.com/expressjs/vhost">vhost</a></td></tr>
<tr><td><code>express.csrf</code></td>
<td><a href="https://github.com/expressjs/csurf">csurf</a></td></tr>
<tr><td><code>express.directory</code></td>
<td><a href="https://github.com/expressjs/serve-index">serve-index</a></td></tr>
<tr><td><code>express.static</code></td>
<td><a href="https://github.com/expressjs/serve-static">serve-static</a></td></tr>
</table>

Here is the [complete list](https://github.com/senchalabs/connect#middleware) of Express 4 middleware.

In most cases, you can simply replace the old version 3 middleware with
its Express 4 counterpart. For details, see the module documentation in
GitHub.

<h4 id="app-use"><code>app.use</code> accepts parameters</h4>

In version 4 you can use a variable parameter to define the path where middleware functions are loaded, then read the value of the parameter from the route handler.
For example:

```js
app.use('/book/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
})
