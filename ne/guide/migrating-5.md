---
layout: page
title: Migrating to Express 5
menu: guide
lang: en
redirect_from: "/guide/migrating-5.html"
---
# Moving to Express 5

<h2 id="overview">Overview</h2>

Express 5.0 is still in the beta release stage, but here is a preview of the changes that will be in the release and how to migrate your Express 4 app to Express 5.

To install the latest beta and to preview Express 5, enter the following command in your application root directory:

```console
$ npm install "express@>=5.0.0-beta.1" --save
```

You can then run your automated tests to see what fails, and fix problems according to the updates listed below. After addressing test failures, run your app to see what errors occur. You'll find out right away if the app uses any methods or properties that are not supported.

<h2 id="changes">Changes in Express 5</h2>

**Removed methods and properties**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Pluralized method names</a></li>
  <li><a href="#leading">Leading colon in name argument to app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**Changed**

<ul class="doclist">
  <li><a href="#path-syntax">Path route matching syntax</a></li>
  <li><a href="#rejected-promises">Rejected promises handled from middleware and handlers</a></li>
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**Improvements**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>Removed methods and properties</h3>

If you use any of these methods or properties in your app, it will crash. So, you'll need to change your app after you update to version 5.

<h4 id="app.del">app.del()</h4>

Express 5 no longer supports the `app.del()` function. If you use this function an error is thrown. For registering HTTP DELETE routes, use the `app.delete()` function instead.

Initially `del` was used instead of `delete`, because `delete` is a reserved keyword in JavaScript. However, as of ECMAScript 6, `delete` and other reserved keywords can legally be used as property names.

<h4 id="app.param">app.param(fn)</h4>

The `app.param(fn)` signature was used for modifying the behavior of the `app.param(name, fn)` function. It has been deprecated since v4.11.0, and Express 5 no longer supports it at all.

<h4 id="plural">Pluralized method names</h4>

The following method names have been pluralized. In Express 4, using the old methods resulted in a deprecation warning.  Express 5 no longer supports them at all:

`req.acceptsCharset()` is replaced by `req.acceptsCharsets()`.

`req.acceptsEncoding()` is replaced by `req.acceptsEncodings()`.

`req.acceptsLanguage()` is replaced by `req.acceptsLanguages()`.

<h4 id="leading">Leading colon (:) in the name for app.param(name, fn)</h4>

A leading colon character (:) in the name for the `app.param(name, fn)` function is a remnant of Express 3, and for the sake of backwards compatibility, Express 4 supported it with a deprecation notice. Express 5 will silently ignore it and use the name parameter without prefixing it with a colon.

This should not affect your code if you follow the Express 4 documentation of [app.param](/{{ page.lang }}/4x/api.html#app.param), as it makes no mention of the leading colon.

<h4 id="req.param">req.param(name)</h4>

This potentially confusing and dangerous method of retrieving form data has been removed. You will now need to specifically look for the submitted parameter name in the `req.params`, `req.body`, or `req.query` object.

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 no longer supports the signature `res.json(obj, status)`. Instead, set the status and then chain it to the `res.json()` method like this: `res.status(status).json(obj)`.

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 no longer supports the signature `res.jsonp(obj, status)`. Instead, set the status and then chain it to the `res.jsonp()` method like this: `res.status(status).jsonp(obj)`.

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 no longer supports the signature `res.send(obj, status)`. Instead, set the status and then chain it to the `res.send()` method like this: `res.status(status).send(obj)`.

<h4 id="res.send.status">res.send(status)</h4>

Express 5 no longer supports the signature <code>res.send(<em>status</em>)</code>, where _`status`_ is a number. Instead, use the `res.sendStatus(statusCode)` function, which sets the HTTP response header status code and sends the text version of the code: "Not Found", "Internal Server Error", and so on.
If you need to send a number by using the `res.send()` function, quote the number to convert it to a string, so that Express does not interpret it as an attempt to use the unsupported old signature.

<h4 id="res.sendfile">res.sendfile()</h4>

The `res.sendfile()` function has been replaced by a camel-cased version `res.sendFile()` in Express 5.

<h3>Changed</h3>

<h4 id="path-syntax">Path route matching syntax</h4>

Path route matching syntax is when a string is supplied as the first parameter to the `app.all()`, `app.use()`, `app.METHOD()`, `router.all()`, `router.METHOD()`, and `router.use()` APIs. The following changes have been made to how the path string is matched to an incoming request:

- Add new `?`, `*`, and `+` parameter modifiers.
- Matching group expressions are only RegExp syntax.
  * `(*)` is no longer valid and must be written as `(.*)`, for example.
- Named matching groups no longer available by position in `req.params`.
  * `/:foo(.*)` only captures as `req.params.foo` and not available as `req.params[0]`.
- Regular expressions can only be used in a matching group.
  * `/\\d+` is no longer valid and must be written as `/(\\d+)`.
- Special `*` path segment behavior removed.
  * `/foo/*/bar` will match a literal `*` as the middle segment.

<h4 id="rejected-promises">Rejected promises handled from middleware and handlers</h4>

Request middleware and handlers that return rejected promises are now handled by forwarding the rejected value as an `Error` to the error handling middleware. This means that using `async` functions as middleware and handlers are easier than ever. When an error is thrown in an `async` function or a rejected promise is `await`ed inside an async function, those errors will be passed to the error handler as if calling `next(err)`.

Details of how Express handles errors is covered in the [error handling documentation](/en/guide/error-handling.html).

<h4 id="app.router">app.router</h4>

The `app.router` object, which was removed in Express 4, has made a comeback in Express 5. In the new version, this object is a just a reference to the base Express router, unlike in Express 3, where an app had to explicitly load it.

<h4 id="req.host">req.host</h4>

In Express 4, the `req.host` function incorrectly stripped off the port number if it was present. In Express 5 the port number is maintained.

<h4 id="req.query">req.query</h4>

The `req.query` property is no longer a writable property and is instead a getter. The default query parser has been changed from "extended" to "simple".

<h3>Improvements</h3>

<h4 id="res.render">res.render()</h4>

This method now enforces asynchronous behavior for all view engines, avoiding bugs caused by view engines that had a synchronous implementation and that violated the recommended interface.
