# cookie-session

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Gratipay][gratipay-image]][gratipay-url]

  Simple cookie-based session middleware.

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
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
  - `httpOnly`: a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (`true` by default).
  - `signed`: a boolean indicating whether the cookie is to be signed (`true` by default). If this is true, another cookie of the same name with the `.sig` suffix appended will also be sent, with a 27-byte url-safe base64 SHA1 value representing the hash of _cookie-name_=_cookie-value_ against the first [Keygrip](https://github.com/expressjs/keygrip) key. This signature key is used to detect tampering the next time a cookie is received.
  - `overwrite`: a boolean indicating whether to overwrite previously set cookies of the same name (`true` by default). If this is true, all cookies set during the same request with the same name (regardless of path or domain) are filtered out of the Set-Cookie header when setting this cookie.

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

```
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

app.get('/', function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1

  // Write response
  res.end(req.session.views + ' views')
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

## Usage Limitations

### Max Cookie Size

Because the entire session object is encoded and stored in a cookie, it is
possible to exceed the maxium cookie size limits on different browsers. The
[RFC6265 specification](https://tools.ietf.org/html/rfc6265#section-6.1)
reccomends that a browser **SHOULD** allow

> At least 4096 bytes per cookie (as measured by the sum of the length of
> the cookie's name, value, and attributes)

In practice this limit differs slightly across browsers. See a list of
[browser limits here](http://browsercookielimits.squawky.net/). As a rule
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
