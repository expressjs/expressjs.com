# response-time

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-image]][node-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Response time for Node.js servers.

This module creates a middleware that records the response time for
requests in HTTP servers. The "response time" is defined here as the
elapsed time from when a request enters this middleware to when the
headers are written out to the client.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install response-time
```

## API

<!-- eslint-disable no-unused-vars -->

```js
var responseTime = require('response-time')
```

### responseTime([options])

Create a middleware that adds a `X-Response-Time` header to responses. If
you don't want to use this module to automatically set a header, please
see the section about [`responseTime(fn)`](#responsetimefn).

#### Options

The `responseTime` function accepts an optional `options` object that may
contain any of the following keys:

##### digits

The fixed number of digits to include in the output, which is always in
milliseconds, defaults to `3` (ex: `2.300ms`).

##### header

The name of the header to set, defaults to `X-Response-Time`.

##### suffix

Boolean to indicate if units of measurement suffix should be added to
the output, defaults to `true` (ex: `2.300ms` vs `2.300`).

### responseTime(fn)

Create a new middleware that records the response time of a request and
makes this available to your own function `fn`. The `fn` argument will be
invoked as `fn(req, res, time)`, where `time` is a number in milliseconds.

## Examples

### express/connect

```js
var express = require('express')
var responseTime = require('response-time')

var app = express()

app.use(responseTime())

app.get('/', function (req, res) {
  res.send('hello, world!')
})
```

### vanilla http server

```js
var finalhandler = require('finalhandler')
var http = require('http')
var responseTime = require('response-time')

// create "middleware"
var _responseTime = responseTime()

http.createServer(function (req, res) {
  var done = finalhandler(req, res)
  _responseTime(req, res, function (err) {
    if (err) return done(err)

    // respond to request
    res.setHeader('content-type', 'text/plain')
    res.end('hello, world!')
  })
})
```

### response time metrics

```js
var express = require('express')
var responseTime = require('response-time')
var StatsD = require('node-statsd')

var app = express()
var stats = new StatsD()

stats.socket.on('error', function (error) {
  console.error(error.stack)
})

app.use(responseTime(function (req, res, time) {
  var stat = (req.method + req.url).toLowerCase()
    .replace(/[:.]/g, '')
    .replace(/\//g, '_')
  stats.timing(stat, time)
}))

app.get('/', function (req, res) {
  res.send('hello, world!')
})
```

## License

[MIT](LICENSE)

[npm-version-image]: https://badgen.net/npm/v/response-time
[npm-url]: https://npmjs.org/package/response-time
[npm-downloads-image]: https://badgen.net/npm/dm/response-time
[node-image]: https://badgen.net/npm/node/response-time
[node-url]: https://nodejs.org/en/download
[ci-image]: https://badgen.net/github/checks/express/response-time/master?label=ci
[ci-url]: https://github.com/express/response-time/actions/workflows/ci.yml
[coveralls-image]: https://badgen.net/coveralls/c/github/express/response-time/master
[coveralls-url]: https://coveralls.io/r/express/response-time?branch=master
