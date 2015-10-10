---
layout: page
title: Migrating to Express 5
menu: guide
lang: en
---

# Moving to Express 5

<h2 id="overview">Overview</h2>

While Express 5 is not released yet, this document is meant to give you a heads up of what is coming and how you can migrate your Express 4 app to Express 5.

You can install the latest beta and preview the upcoming features and changes in Express 5.

~~~sh
$ npm install express@5.0.0-alpha.2 --save
~~~

Express 5 is not very different from Express 4, the basic API remains the same. However, it is still a breaking change, that means an existing Express 4 app may not work if you update the Express version in its dependencies.

<h2 id="changes">Changes in Express 5</h2>

Following is the list of changes that will affect you as a user of Express. The list will be continually updated as the [planned features](https://github.com/strongloop/express/pull/2237) land on the releases.

**Removed**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.acceptsCharset">req.acceptsCharset()</a></li>
  <li><a href="#req.acceptsEncoding">req.acceptsEncoding()</a></li>
  <li><a href="#req.acceptsLanguage">req.acceptsLanguage()</a></li>
  <li><a href="#req.param-name-fn">Leading : in name for app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json-obj-status">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp-obj-status">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send-body-status">res.send(body, status)</a></li>
  <li><a href="#res.send-status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**Changed**

<ul class="doclist">
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**Improvements**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>Removed</h3>

<h4 id="app.del">app.del()</h4>

`app.del()` is no longer supported in Express 5. Trying to use it will throw an error. For registering HTTP DELETE routes, use `app.delete()` instead.

<h4 id="app.param">app.param(fn)</h4>

The `app.param(fn)` signature was used for modifying the behavior of `app.param(name, fn)`. It has been decprecated since v4.11.0. In Express 5, it is no longer supported.

<h4 id="app.router">app.router</h4>

The `app.router` object, which was removed in Express 4, has made a comeback in Express 5. In the new avatar, it is a just a reference to the base Express router, unlike in Express 3, where it had to be explicitly loaded in the app.

<h4 id="req.acceptsCharset">req.acceptsCharset()</h4>

`req.acceptsCharset()` is replaced by a pluralized `req.acceptsCharsets()` in Express 5.

<h4 id="req.acceptsEncoding">req.acceptsEncoding()</h4>

`req.acceptsEncoding()` is replaced by a pluralized `req.acceptsEncodings()` in Express 5.

<h4 id="req.acceptsLanguage">req.acceptsLanguage()</h4>

`req.acceptsLanguage()` is replaced by a pluralized `req.acceptsLanguages()` in Express 5.

<h4 id="req.param-name-fn">Leading : in name for app.param(name, fn)</h4>

A leading `:` in `name` for `app.param(name, fn)` is remnant of Express 3, which was still supported in Express 4 with a deprecation for the sake of backwards compatibility. In Express 5, this will be silently ignored - use the `name` parameter without prefixing it with a colon.

This should not affect your code, if you have been following the Express 4 documentation of [app.param](/4x/api.html#app.param), as it makes no mention of the leading colon.

<h4 id="req.param">req.param(name)</h4>

This potentially confusing and dangerous method of retrieving form data has been removed. You will now need to specifically look for the submitted parameter `name` in `req.params`, `req.body`, or `req.query`.

<h4 id="res.json-obj-status">res.json(obj, status)</h4>

The signature `res.json(obj, status)` is not longer supported, you will need to set the status and then chain it to the `res.json()` method - res.status(status).json(obj).

<h4 id="res.jsonp-obj-status">res.jsonp(obj, status)</h4>

The signature `res.jsonp(obj, status)` is not longer supported, you will need to set the status and then chain it to the `res.jsonp()` method - res.status(status).jsonp(obj).

<h4 id="res.send-body-status">res.send(body, status)</h4>

The signature `res.send(obj, status)` is not longer supported, you will need to set the status and then chain it to the `res.send()` method - res.status(status).send(obj).

<h4 id="res.send-status">res.send(status)</h4>

The signature `res.send(status)`, where `status` is a number, is not longer supported. You can use`res.sendStatus(status)`, it sets the HTTP response header code and sends the text version of the code: "Not Found", "Internal Server Error" and so on.

If you need to send a number using `res.send()`, you can quote the number to convert it to a string, so that Express does not interpret it as an attempt at using the unsupported old signature.

<h4 id="res.sendfile">res.sendfile()</h4>

`res.sendfile()` has been replaced by a camelcased version `res.sendFile()` in Express 5.

<h3>Changed</h3>

<h4 id="req.host">req.host</h4>

In Express 4, `req.host` used to incorrectly strip off the port number, if it was present. In Express 5, the port number is maintained.

<h4 id="req.query">req.query</h4>

Express 4.7 and Express 5 onwards, the `query parser` option can accept `false` to disable query string parsing, and a function for implementaing your own query string parsing logic.

<h3>Improvements</h3>

<h4 id="res.render">res.render()</h4>

Enforces async behavior for all view engines, thereby avoiding bugs caused by view engines which had a synchronous implementation and violated the recommended interface.
