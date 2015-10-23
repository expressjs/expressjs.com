---
layout: page
title: Migrating to Express 5
menu: guide
lang: en
---

# Moving to Express 5

<h2 id="overview">Overview</h2>

Express 5.0 is still in the alpha release stage, but we want to give you a brief look at the  changes that will be in the release and how you can migrate your Express 4 app to Express 5.

Express 5 is not very different from Express 4: The changes to the API are not as significant as from 3.0 to 4.0.  Although the basic API remains the same, there are still breaking changes; in other words an existing Express 4 program may not work if you update it to use Express 5.

To install the latest alpha and preview Express 5, enter this command in your application root directory:

~~~sh
$ npm install express@5.0.0-alpha.2 --save
~~~

After you do this, run your automated tests to see what fails, and fix them according to the updates listed below. You do have tests, don't you?  This is a good example of why having tests is a good idea! After addressing test failures, run your app to see what errors occur. You'll find out right away if the app uses any methods or properties that are not supported.

<h2 id="changes">Changes in Express 5</h2>

Following is the list of changes that will affect you as a user of Express. Currently, Express 5 is still in alpha release, so there are likely to be further changes. We'll make every effort to update this list as the [planned features](https://github.com/strongloop/express/pull/2237) land on the releases.

**Removed methods and properties**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#pluralized">Pluralized method names</a></li>
  <li><a href="#leading">Leading : in name for app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**Changed**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**Improvements**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>Removed methods and properties</h3>

If you use any of these methods or properties in your app, it will crash. So, you'll need to go through and change your app once you update to version 5.

<h4 id="app.del">app.del()</h4>

Express 5 no longer supports `app.del()`. Using it will throw an error. For registering HTTP DELETE routes, use `app.delete()` instead.

Initially `del` was used instead of `delete` considering delete is a reserved keyword in JavaScript. However, as of ECMAScript 6, `delete` and other reserved keywords can legally be used as a property names. You can read the discussion which lead to the deprecation of `app.del` here.

<h4 id="app.param">app.param(fn)</h4>

The `app.param(fn)` signature was used for modifying the behavior of `app.param(name, fn)`. It has been deprecated since v4.11.0, and Express 5 no longer supports it at all.

<h4 id="plural">Pluralized method names</h4>

The following method names have been pluralized. In Express 4, using the old methods resulted in a deprecation warning.  Express 5 no longer supports them at all:

`req.acceptsCharset()` is replaced by `req.acceptsCharsets()`.

`req.acceptsEncoding()` is replaced by `req.acceptsEncodings()`.

`req.acceptsLanguage()` is replaced by `req.acceptsLanguages()`.

<h4 id="leading">Leading colon (:) in name for app.param(name, fn)</h4>

A leading colon character (:) in name for `app.param(name, fn)` is remnant of Express 3, and for the sake of backwards compatibility, Express 4 supported it with a deprecation notice. Express 5 will silently ignore it; use the name parameter without prefixing it with a colon.

This should not affect your code, if you have been following the Express 4 documentation of app.param, as it makes no mention of the leading colon.

<h4 id="req.param">req.param(name)</h4>

This potentially confusing and dangerous method of retrieving form data has been removed. You will now need to specifically look for the submitted parameter name in `req.params`, `req.body`, or `req.query`.

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 no longer supports the signature `res.json(obj, status)`. Instead, set the status and then chain it to the `res.json()` method like this: `res.status(status).json(obj)`.

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 no longer supports the signature `res.jsonp(obj, status)`. Instead, set the status and then chain it to the `res.jsonp()` method like this: `res.status(status).jsonp(obj)`.

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 no longer supports the signature `res.send(obj, status)`. Instead, set the status and then chain it to the `res.send()` method like this: `res.status(status).send(obj)`.

<h4 id="res.send.status">res.send(status)</h4>

Express 5 no longer supports the signature res.send(status), where status is a number. Instead, use res.sendStatus(status), which sets the HTTP response header code and sends the text version of the code: "Not Found", "Internal Server Error", and so on.

If you need to send a number using `res.send()`, quote the number to convert it to a string, so that Express does not interpret it as an attempt at using the unsupported old signature.

<h4 id="res.sendfile">res.sendfile()</h4>

`res.sendfile()` has been replaced by a camel-cased version `res.sendFile()` in Express 5.

<h3>Changed</h3>

<h4 id="app.router">app.router</h4>

The `app.router` object, which was removed in Express 4, has made a comeback in Express 5. In the new version, it is a just a reference to the base Express router, unlike in Express 3, where an app had to explicitly load it.

<h4 id="req.host">req.host</h4>

In Express 4, `req.host` incorrectly stripped off the port number if it was present. In Express 5 the port number is maintained.

<h4 id="req.query">req.query</h4>

In Express 4.7 and Express 5 onwards, the query parser option can accept false to disable query string parsing, and instead use your own function for query string parsing logic.

<h3>Improvements</h3>

<h4 id="res.render">res.render()</h4>

This method now enforces asynchronous behavior for all view engines, avoiding bugs caused by view engines which had a synchronous implementation and violated the recommended interface.

<h2>Conclusion</h2>

We've given you a quick preview of the changes that will be in the Express 5 release, and a general path to upgrade your apps. Since version 5 is still in alpha stage, there are sure to be some further changes before the final release, so keep checking the StrongLoop blog for the latest news. We'll keep you updated on the progress of the 5.0 release, as well as future Express releases.
