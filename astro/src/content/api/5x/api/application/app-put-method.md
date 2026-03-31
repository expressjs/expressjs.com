---
title: app.put
description: Routes HTTP PUT requests to the specified path with the specified callback functions.
---

# app.put(path, callback [, callback ...])

Routes HTTP PUT requests to the specified path with the specified callback functions.

## Arguments

| Argument   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `path`     | The path for which the middleware function is invoked. It can be any of the following: a string representing a path, a path pattern, a regular expression pattern to match paths, or an array containing any combination of the above. For examples, see [Path examples](#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `'/'` (root path) |
| `callback` | One or more callback functions. Accepted formats: a single middleware function, multiple middleware functions separated by commas, an array of middleware functions, or a combination of the above. You may provide multiple callbacks that behave like middleware. These can call `next('route')` to skip remaining callbacks for the current route. This is useful for conditional routing logic. If a callback throws an error or returns a rejected promise, `next(err)` is invoked automatically. Since both [router](#router) and [app](#application) implement the middleware interface, they can also be used as callback middleware. For examples, see [Middleware callback function examples](#middleware-callback-function-examples). | _None_            |

## Example

```js
app.put('/', (req, res) => {
  res.send('PUT request to homepage');
});
```
