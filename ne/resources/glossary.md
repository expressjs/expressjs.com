---
layout: page
title: Express glossary
menu: resources
lang: en
redirect_from: "/resources/glossary.html"
---

# Glossary

### application

In general, one or more programs that are designed to carry out operations for a specific purpose.  In the context of Express, a program that uses the Express API running on the Node.js platform.  Might also refer to an [app object](/{{ page.lang }}/api.html#express).

### API

Application programming interface.  Spell out the abbreviation when it is first used.

### Express

A fast, un-opinionated, minimalist web framework for Node.js applications.  In general, "Express" is preferred to "Express.js," though the latter is acceptable.

### libuv

A multi-platform support library which focuses on asynchronous I/O, primarily developed for use by Node.js.

### middleware 

A function that is invoked by the Express routing layer before the final request handler, and thus sits in the middle between a raw request and the final intended route.  A few fine points of terminology around middleware:

  * `var foo = require('middleware')` is called _requiring_ or _using_ a Node.js module. Then the statement `var mw = foo()`  typically returns the middleware.
  * `app.use(mw)` is called _adding the middleware to the global processing stack_.
  * `app.get('/foo', mw, function (req, res) { ... })` is called _adding the middleware to the "GET /foo" processing stack_.

### Node.js

A software platform that is used to build scalable network applications. Node.js uses JavaScript as its scripting language, and achieves high throughput via non-blocking I/O and a single-threaded event loop.  See [nodejs.org](https://nodejs.org/en/). **Usage note**: Initially, "Node.js," thereafter "Node".

### open-source, open source

When used as an adjective, hyphenate; for example: "This is open-source software." See [Open-source software on Wikipedia](http://en.wikipedia.org/wiki/Open-source_software). Note: Although it is common not to hyphenate this term, we are using the standard English rules for hyphenating a compound adjective.

### request

An HTTP request.  A client submits an HTTP request message to a server, which returns a response.  The request must use one of several [request methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) such as GET, POST, and so on.

### response

An HTTP response. A server returns an HTTP response message to the client. The response contains completion status information about the request and might also contain requested content in its message body.

### route

Part of a URL that identifies a resource.  For example, in `http://foo.com/products/id`, "/products/id" is the route.

### router

See [router](/{{ page.lang }}/api.html#router) in the API reference.
