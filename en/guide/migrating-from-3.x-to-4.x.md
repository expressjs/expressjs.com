# Migrating from 3.x to 4.x

Express 3.x to 4.0 migration guide. You may also be interested in [New features in 4.x][new-in-4x].

See [Express 4.x docs][4x-docs] for more examples and complete API documentation.

## Overview

**Express 4 no longer has Connect as a dependency.** This means that ALL bundled middleware (except `static`) is no longer available on the `express` module. Each middleware is available as a module. (More on this below.)

This change allows middleware to receive fixes, updates, and releases, without impacting Express release cycles (and vice-versa).

**These are not direct replacements. Please read their documentation _before_ blindly using them with old arguments.**

- `bodyParser` [body-parser](https://github.com/expressjs/body-parser)
- `cookieParser` [cookie-parser](https://github.com/expressjs/cookie-parser)
- `favicon` [serve-favicon](https://github.com/expressjs/serve-favicon)
- `session` [express-session](https://github.com/expressjs/session)

Others documented here: [https://github.com/senchalabs/connect#middleware](https://github.com/senchalabs/connect#middleware)

## Removed in Express 4

### `app.configure()`

This method is no longer available.

If you wish to configure different routes based on environment, use either an `if` statement or another module.

```js
app.configure('development', function() {
// configure stuff here
});
// becomes
var env \= process.env.NODE_ENV || 'development';
if ('development' \== env) {
// configure stuff here
}
```

### `app.routes()`

This method is no longer available. See [issue 2049](https://github.com/expressjs/express/issues/2049).

### `app.router`

The middleware stack has been overhauled! This reduces confusion with `.use` vs `.get` (or other HTTP verbs).

As a result, the need to manually do `app.use(app.router)` has been removed. See the Routers section (below) on the new middleware and routing API.

If you had code that looked like this:

```js
app.use(cookieParser());
app.use(bodyParser());
/// .. other middleware .. doesn't matter what
app.use(app.router); // \*\*this line will be removed\*\*

// more middleware (executes after routes)
app.use(function(req, res, next) {});
// error handling middleware
app.use(function(err, req, res, next) {});

app.get('/' ...);
app.post(...);
```

`app.router` has been removed. Middleware and routes are now executed in the order they're added.

Your code should move any calls to `app.use` that came after `app.use(app.router)` after any routes (HTTP verbs).

```js
app.use(cookieParser());
app.use(bodyParser());
/// .. other middleware .. doesn't matter what

app.get('/' ...);
app.post(...);

// more middleware (executes after routes)
app.use(function(req, res, next) {});
// error handling middleware
app.use(function(err, req, res, next) {});
```

### `express.createServer()`

_Long_ deprecated. Just create new apps with `express()`.

### Connect middleware

All Connect middleware lives in separate modules (with the exception of `express.static`, which is provided for convenience). Everything else benefits from being a separate module, with its own versioning.

### Connect's patches

Connect patched Node's prototypes globally. This is considered bad behavior, and was removed in Connect 3.

Some of these patches were:

- `res.on('header')`
- `res.charset`
- `res.headerSent` Uses Node's `res.headersSent` instead
- special handling of `res.setHeader` for `Set-Cookie` header

You should no longer use these in any Connect or Express libraries.

### `res.charset`

If you want Express to set a default charset (and you should!), use `res.set('content-type')` or `res.type()` to set the header.

A default charset will NOT be added when using `res.setHeader()`.

### `res.setHeader('Set-Cookie', val)`

This will no longer implicitly append `val` to the current list of `Set-Cookie` values. You will want to do that manually or use the `res.cookie` method to set cookies, which does this.

## Changed in Express 4

### `app.use`

`app.use` now accepts `:params`.

```js
app.use("/users/:user_id", function (req, res, next) {
  // req.params.user_id exists here
});
```

### `req.accepted()`

Use `req.accepts()` instead.

- `req.accepts()`
- `req.acceptsEncodings()`
- `req.acceptsCharsets()`
- `req.acceptsLanguages()`

All use [`accepts`](https://github.com/expressjs/accepts) internally. Please refer to `accepts` for any issues or documentation requests.

**Note:** these properties may have changed from arrays to functions. To continue using them as "arrays", call them without arguments. For example, `req.acceptsLanguages() // => ['en', 'es', 'fr']`.

### `res.location()`

No longer resolves relative URLs. Browsers will handle relative URLs themselves.

### `app.route` → `app.mountpath`

When mounting an Express app in another Express app.

### Changes to Configuration in Express 4

#### `json spaces`

In development, this is no longer enabled by default.

#### `req.params`

Is now an object instead of an array.

This won't break your app if you used the `req.params[##]` style for regexp routes where parameter names are unknown.

#### `res.locals`

Is now an object instead of a function.

#### `res.headerSent`

Changed to `headersSent` to match the Node.js `ServerResponse` object.

You probably never used this, so it probably won't be an issue.

#### `req.is`

Now uses [type-is](https://github.com/expressjs/type-is) internally. Please refer to `type-is` for any issues or documentation requests.

## Added in Express 4

### `app.route(path)`

Returns a new `Route` instance. A `Route` is invoked when a request matching the route `path` is received. Routes can have their own middleware stacks. They also have methods for the HTTP VERBS to process requests.

See the Routes and [Routing docs](http://expressjs.com/4x/api.html#router) for more details on creating routes in Express.

### Router and Route middleware

The Router has been overhauled. It is now a full-fledged middleware router.

The Router is a good way to separate your routes into files/modules—without sacrificing features like parameter matching and middleware.

## Deprecated since 3.x

The following have been deprecated since 4.0 and affect you when upgrading from 3.x to the latest 4.x version. Check the [Changelog](https://github.com/expressjs/express/blob/master/History.md) for the latest changes.

- Deprecate leading `:` in `name` for `app.param(name, fn)`
- Deprecate `req.param()` -- use `req.params`, `req.body`, or `req.query` instead
- Deprecate `app.param(fn)`
- deprecate `res.sendfile` -- use `res.sendFile` instead
- deprecate `res.json(status, obj)` -- use `res.status(status).json(obj)` instead
- deprecate `res.jsonp(status, obj)` -- use `res.status(status).jsonp(obj)` instead
- deprecate `res.json(obj, status)` -- use `res.status.json(obj)` instead
  - the edge-case `res.json(status, num)` requires `res.status(status).json(num)`
- deprecate `res.jsonp(obj, status)` -- use `res.status(status).jsonp(obj)` instead
- deprecate `res.send(status, body)` -- use `res.status(status).send(body)` instead
- deprecate `res.redirect(url, status)` -- use `res.redirect(status, url)` instead
- deprecate things with `depd` module
- deprecate `req.host` -- use `req.hostname` instead
- deprecate `app.del()` -- use `app.delete()` instead

[4x-docs]: http://expressjs.com/4x/api.html
[new-in-4x]: ./new-features-in-4x.md
