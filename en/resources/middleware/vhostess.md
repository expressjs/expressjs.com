---
layout: middleware
title: Express vhostess middleware
menu: resources
lang: en
redirect_from: '/resources/middleware/vhostess.html'
name: vhostess
---

# Virtual Hostess [![Build Status](https://travis-ci.org/expressjs/vhostess.png)](https://travis-ci.org/expressjs/vhostess)

Virtual host sub-domain mapping. This is semi-extracted from [connect.vhost()](http://www.senchalabs.org/connect/vhost.html).

This is different than connect's `vhost` as it sits between the HTTP server and any "apps" instead of being used within an app.

## Example

```js
var koaApp = require('koa')()
var expressApp = require('express')()
var connectApp = require('connect')()

var hostess = require('vhostess')()

http.createServer(hostess).listen(3000)

hostess.use('koa.app.com', koaApp.callback())
hostess.use('express.app.com', expressApp)
hostess.use('connect.app.com', connectApp)
hostess.use(function (req, res) {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('subdomain needed')
})
```

## API

### var hostess = Hostess()

```js
var hostess = require('vhostess')()
http.createServer(hostess).listen()
```

Returns a `(req, res)` function to be passed to `http.createServer()` or to `app.use()` in Connect/Express.

### hostess.use(hostname, fn)

`hostname` such as `example.com`, `*.example.com`, etc. `fn` is a callback function with the signature `(req, res)`.

Notes:

- `next` is __not__ supported.
- Mounting HTTP servers is __not__ supported either.
- Order matters.

### hostess.use(fn)

Default callback. You __must__ supply one, otherwise the server will throw.

## License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.