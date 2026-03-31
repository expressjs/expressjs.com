---
title: app.all
description: This method is like the standard [app.METHOD()](#app.METHOD) methods,
---

# app.all(path, callback [, callback ...])

This method is like the standard [app.METHOD()](#app.METHOD) methods,
except it matches all HTTP verbs.

## Arguments

| Argument   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `path`     | The path for which the middleware function is invoked. It can be any of the following: a string representing a path, a path pattern, a regular expression pattern to match paths, or an array containing any combination of the above. For examples, see [Path examples](#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `'/'` (root path) |
| `callback` | One or more callback functions. Accepted formats: a single middleware function, multiple middleware functions separated by commas, an array of middleware functions, or a combination of the above. You may provide multiple callbacks that behave like middleware. These can call `next('route')` to skip remaining callbacks for the current route. This is useful for conditional routing logic. If a callback throws an error or returns a rejected promise, `next(err)` is invoked automatically. Since both [router](#router) and [app](#application) implement the middleware interface, they can also be used as callback middleware. For examples, see [Middleware callback function examples](#middleware-callback-function-examples). | _None_            |

## Examples

The following callback is executed for requests to `/secret` whether using
GET, POST, PUT, DELETE, or any other HTTP request method:

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
```

The `app.all()` method is useful for mapping "global" logic for specific path prefixes or arbitrary matches. For example, if you put the following at the top of all other
route definitions, it requires that all routes from that point on
require authentication, and automatically load a user. Keep in mind
that these callbacks do not have to act as end-points: `loadUser`
can perform a task, then call `next()` to continue matching subsequent
routes.

```js
app.all('{*splat}', requireAuthentication, loadUser);
```

Or the equivalent:

```js
app.all('{*splat}', requireAuthentication);
app.all('{*splat}', loadUser);
```

Another example is white-listed "global" functionality.
The example is similar to the ones above, but it only restricts paths that start with
"/api":

```js
app.all('/api/{*splat}', requireAuthentication);
```
