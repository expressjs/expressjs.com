# cookie-session

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Simple cookie-based session middleware.

A user session can be stored in two main ways with cookies: on the server or on
the client. This module stores the session data on the client within a cookie,
while a module like [express-session](https://www.npmjs.com/package/express-session)
stores only a session identifier on the client within a cookie and stores the
session data on the server, typically in a database.

The following points can help you choose which to use:

  * `cookie-session` does not require any database / resources on the server side,
    though the total session data cannot exceed the browser's max cookie size.
  * `cookie-session` can simplify certain load-balanced scenarios.
  * `cookie-session` can be used to store a "light" session and include an identifier
    to look up a database-backed secondary store to reduce database lookups.

**NOTE** This module does not encrypt the session contents in the cookie, only provides
signing to prevent tampering. The client will be able to read the session data by
examining the cookie's value. Secret data should not be set in `req.session` without
encrypting it, or use a server-side session instead.

**NOTE** This module does not prevent session replay, as the expiration set is that
of the cookie only; if that is a concern of your application, you can store an expiration
date in `req.session` object and validate it on the server, and implement any other logic
to extend the session as your application needs.

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install cookie-session
```

## API

```js
var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.use(cookieSession({
  name: 'session',
  keys: [/* secret keys */],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
```

### cookieSession(options)

Create a new cookie session middleware with the provided options. This middleware
will attach the property `session` to `req`, which provides an object representing
the loaded session. This session is either a new session if no valid session was
provided in the request, or a loaded session from the request.

The middleware will automatically add a `Set-Cookie` header to the response if the
contents of `req.session` were altered. _Note_ that no `Set-Cookie` header will be
in the response (and thus no session created for a specific user) unless there are
contents in the session, so be sure to add something to `req.session` as soon as
you have identifying information to store for the session.

#### Options

Cookie session accepts these properties in the options object.

##### name

The name of the cookie to set, defaults to `session`.

##### keys

The list of keys to use to sign & verify cookie values, or a configured
[`Keygrip`](https://www.npmjs.com/package/keygrip) instance. Set cookies are always
signed with `keys[0]`, while the other keys are valid for verification, allowing
for key rotation. If a `Keygrip` instance is provided, it can be used to
change signature parameters like the algorithm of the signature.

##### secret

A string which will be used as single key if `keys` is not provided.

##### Cookie Options

Other options are passed to `cookies.get()` and `cookies.set()` allowing you
to control security, domain, path, and signing among other settings.

The options can also contain any of the following (for the full list, see
[cookies module documentation](https://www.npmjs.org/package/cookies#readme):

  - `maxAge`: a number representing the milliseconds from `Date.now()` for expiry
  - `expires`: a `Date` object indicating the cookie's expiration date (expires at the end of session by default).
  - `path`: a string indicating the path of the cookie (`/` by default).
  - `domain`: a string indicating the domain of the cookie (no default).
  - `partitioned`: a boolean indicating whether to partition the cookie in Chrome for the [CHIPS Update](https://developers.google.com/privacy-sandbox/3pcd/chips) (`false` by default). If this is true, Cookies from embedded sites will be partitioned and only readable from the same top level site from which it was created.
  - `priority`: a string indicating the cookie priority. This can be set to `'low'`, `'medium'`, or `'high'`.
  - `sameSite`: a boolean or string indicating whether the cookie is a "same site" cookie (`false` by default). This can be set to `'strict'`, `'lax'`, `'none'`, or `true` (which maps to `'strict'`).
  - `secure`: a boolean indicating whether the cookie is only to be sent over HTTPS (`false` by default for HTTP, `true` by default for HTTPS). If this is set to `true` and Node.js is not directly over a TLS connection, be sure to read how to [setup Express behind proxies](https://expressjs.com/en/guide/behind-proxies.html) or the cookie may not ever set correctly.
  - `httpOnly`: a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (`true` by default).
  - `signed`: a boolean indicating whether the cookie is to be signed (`true` by default).
  - `overwrite`: a boolean indicating whether to overwrite previously set cookies of the same name (`true` by default).

### req.session

Represents the session for the given request.

#### .isChanged

Is `true` if the session has been changed during the request.

#### .isNew

Is `true` if the session is new.

#### .isPopulated

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

### Saving a session

Since the entire contents of the session is kept in a client-side cookie, the
session is "saved" by writing a cookie out in a `Set-Cookie` response header.
This is done automatically if there has been a change made to the session when
the Node.js response headers are being written to the client and the session
was not destroyed.

## Examples

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

app.get('/', function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1

  // Write response
  res.end(req.session.views + ' views')
})

app.listen(3000)
```

### Per-user sticky max age

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
  next()
})

// ... your logic here ...
```

### Extending the session expiration

This module does not send a `Set-Cookie` header if the contents of the session
have not changed. This means that to extend the expiration of a session in the
user's browser (in response to user activity, for example) some kind of
modification to the session needs be made.

```js
var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// Update a value in the cookie so that the set-cookie will be sent.
// Only changes every minute so that it's not sent with every request.
app.use(function (req, res, next) {
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
  next()
})

// ... your logic here ...
```

### Using a custom signature algorithm

This example shows creating a custom `Keygrip` instance as the `keys` option
to provide keys and additional signature configuration.

```js
var cookieSession = require('cookie-session')
var express = require('express')
var Keygrip = require('keygrip')

var app = express()

app.use(cookieSession({
  name: 'session',
  keys: new Keygrip(['key1', 'key2'], 'SHA384', 'base64')
}))

// ... your logic here ...
```

## Usage Limitations

### Max Cookie Size

Because the entire session object is encoded and stored in a cookie, it is
possible to exceed the maximum cookie size limits on different browsers. The
[RFC6265 specification](https://tools.ietf.org/html/rfc6265#section-6.1)
recommends that a browser **SHOULD** allow

> At least 4096 bytes per cookie (as measured by the sum of the length of
> the cookie's name, value, and attributes)

In practice this limit differs slightly across browsers. See a list of
[browser limits here](http://browsercookielimits.iain.guru). As a rule
of thumb **don't exceed 4093 bytes per domain**.

If your session object is large enough to exceed a browser limit when encoded,
in most cases the browser will refuse to store the cookie. This will cause the
following requests from the browser to either a) not have any session
information or b) use old session information that was small enough to not
exceed the cookie limit.

If you find your session object is hitting these limits, it is best to
consider if  data in your session should be loaded from a database on the
server instead of transmitted to/from the browser with every request. Or
move to an [alternative session strategy](https://github.com/expressjs/session#compatible-session-stores)

## License

[MIT](LICENSE)

[ci-image]: https://badgen.net/github/checks/expressjs/cookie-session/master?label=ci
[ci-url]: https://github.com/expressjs/cookie-session/actions?query=workflow%3Aci
[coveralls-image]: https://badgen.net/coveralls/c/github/expressjs/cookie-session/master
[coveralls-url]: https://coveralls.io/r/expressjs/cookie-session?branch=master
[npm-downloads-image]: https://badgen.net/npm/dm/cookie-session
[npm-url]: https://npmjs.org/package/cookie-session
[npm-version-image]: https://badgen.net/npm/v/cookie-session
