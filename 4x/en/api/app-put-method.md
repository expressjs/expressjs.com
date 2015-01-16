Route HTTP PUT requests to the specified path with the specified callback functions. For more information, see the [routing guide](/guide/routing.html).

You can provide multiple callback functions that behave just like middleware. The only exception is that these callbacks may invoke `next('route')` to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there's no reason to proceed with the current route.

```js
app.put('/', function (req, res) {
  res.send('PUT request to homepage');
});
```
