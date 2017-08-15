---
layout: middleware
title: Express cookie-session middleware
menu: resources
lang: en
redirect_from: '/resources/middleware/cookie-session.html'
name: cookie-session
---
<div id="page-doc" markdown="1">
# cookie-session

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Gratipay][gratipay-image]][gratipay-url]

  Simple cookie-based session middleware.

## Semantics

  This module provides "guest" sessions, meaning any visitor will have a session,
  authenticated or not. If a session is _new_ a `Set-Cookie` will be produced regardless
  of populating the session.

## Install

```bash
$ npm install cookie-session
```

## API

```js
var cookieSession = require('cookie-session')
```

### cookieSession(options)

Create a new cookie session middleware with the provided options.

#### Options

Cookie session accepts these properties in the options object.

##### name

The name of the cookie to set, defaults to `express:sess`.

##### keys

The list of keys to use to sign & verify cookie values. Set cookies are always
signed with `keys[0]`, while the other keys are valid for verification, allowing
for key rotation.

##### secret

A string which will be used as single key if `keys` is not provided.

##### Cookie Options

Other options are passed to `cookies.get()` and `cookies.set()` allowing you
to control security, domain, path, and signing among other settings.

The options can also contain any of the follow (for the full list, see
[cookies module documentation](https://www.npmjs.org/package/cookies#readme):

  - `maxAge`: a number representing the milliseconds from `Date.now()` for expiry
  - `expires`: a `Date` object indicating the cookie's expiration date (expires at the end of session by default).
  - `path`: a string indicating the path of the cookie (`/` by default).
  - `domain`: a string indicating the domain of the cookie (no default).
  - `secure`: a boolean indicating whether the cookie is only to be sent over HTTPS (`false` by default for HTTP, `true` by default for HTTPS).
  - `secureProxy`: a boolean indicating whether the cookie is only to be sent over HTTPS (use this if you handle SSL not in your node process).
  - `httpOnly`: a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (`true` by default).
  - `signed`: a boolean indicating whether the cookie is to be signed (`false` by default). If this is true, another cookie of the same name with the `.sig` suffix appended will also be sent, with a 27-byte url-safe base64 SHA1 value representing the hash of _cookie-name_=_cookie-value_ against the first [Keygrip](https://github.com/expressjs/keygrip) key. This signature key is used to detect tampering the next time a cookie is received.
  - `overwrite`: a boolean indicating whether to overwrite previously set cookies of the same name (`true` by default). If this is true, all cookies set during the same request with the same name (regardless of path or domain) are filtered out of the Set-Cookie header when setting this cookie.

### req.session

Represents the session for the given request.

#### .isNew

Is `true` if the session is new.

#### .populated

Determine if the session has been populated with data or is empty.

### req.sessionOptions

Represents the session options for the current request. These options are a
shallow clone of what was provided at middleware construction and can be
altered to change cookie setting behavior on a per-request basis.

### Destroying a session

  To destroy a session simply set it to `null`:

```js
req.session = null
```

## Example

### Simple view counter example

```js
var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.use(function (req, res, next) {
  var n = req.session.views || 0
  req.session.views = n++
  res.end(n + ' views')
})

app.listen(3000)
```

## Per-user sticky max age

```js
var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// This allows you to set req.session.maxAge to let certain sessions
// have a different value than the default.
app.use(function (req, res, next) {
  req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge
})

// ... your logic here ...
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/cookie-session.svg
[npm-url]: https://npmjs.org/package/cookie-session
[travis-image]: https://img.shields.io/travis/expressjs/cookie-session/master.svg
[travis-url]: https://travis-ci.org/expressjs/cookie-session
[coveralls-image]: https://img.shields.io/coveralls/expressjs/cookie-session.svg
[coveralls-url]: https://coveralls.io/r/expressjs/cookie-session?branch=master
[downloads-image]: https://img.shields.io/npm/dm/cookie-session.svg
[downloads-url]: https://npmjs.org/package/cookie-session
[gratipay-image]: https://img.shields.io/gratipay/dougwilson.svg
[gratipay-url]: https://www.gratipay.com/dougwilson/
</div>
