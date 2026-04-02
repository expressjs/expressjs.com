---
title: app.all
description: This method is like the standard [app.METHOD()](#app.METHOD) methods,
---

# app.all(path, callback [, callback ...])

This method is like the standard [app.METHOD()](#app.METHOD) methods,
except it matches all HTTP verbs.

## Arguments

| Argument   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Default           |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `path`     | The path for which the middleware function is invoked; can be any of: a string representing a path, a path pattern, a regular expression pattern to match paths, or an array of combinations of any of the above. For examples, see [Path examples](#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `'/'` (root path) |
| `callback` | Callback functions; can be: a middleware function, a series of middleware functions (separated by commas), an array of middleware functions, or a combination of all of the above. You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke `next('route')` to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route. Since [router](#router) and [app](#application) implement the middleware interface, you can use them as you would any other middleware function. For examples, see [Middleware callback function examples](#middleware-callback-function-examples). | None              |

## Examples

The following callback is executed for requests to `/secret` whether using
GET, POST, PUT, DELETE, or any other HTTP request method:

```js
app.all('/secret', function (req, res, next) {
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
app.all('*', requireAuthentication, loadUser);
```

Or the equivalent:

```js
app.all('*', requireAuthentication);
app.all('*', loadUser);
```

Another example is white-listed "global" functionality.
The example is similar to the ones above, but it only restricts paths that start with
"/api":

```js
app.all('/api/*', requireAuthentication);
```
