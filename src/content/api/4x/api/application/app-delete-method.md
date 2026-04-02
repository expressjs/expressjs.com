---
title: app.delete
description: Routes HTTP DELETE requests to the specified path with the specified callback functions.
---

# app.delete(path, callback [, callback ...])

Routes HTTP DELETE requests to the specified path with the specified callback functions.
For more information, see the [routing guide](/en/guide/routing).

## Arguments

| Argument   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Default           |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `path`     | The path for which the middleware function is invoked; can be any of: a string representing a path, a path pattern, a regular expression pattern to match paths, or an array of combinations of any of the above. For examples, see [Path examples](#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `'/'` (root path) |
| `callback` | Callback functions; can be: a middleware function, a series of middleware functions (separated by commas), an array of middleware functions, or a combination of all of the above. You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke `next('route')` to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route. Since [router](#router) and [app](#application) implement the middleware interface, you can use them as you would any other middleware function. For examples, see [Middleware callback function examples](#middleware-callback-function-examples). | None              |

## Example

```js
app.delete('/', function (req, res) {
  res.send('DELETE request to homepage');
});
```
