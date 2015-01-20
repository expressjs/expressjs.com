Route an HTTP request, where METHOD is the HTTP method of the request, such as GET, PUT, POST, and so on, in lowercase. The corresponding routing methods are then `app.get()`, `app.post()`, `app.put()`, and so on. For more information, see the [routing guide](/guide/routing.html).

Express supports the following routing methods corresponding to HTTP methods: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search`, and `connect`.

<div class="doc-box doc-info">
  To route methods which translate to invalid JavaScript variable names, use the bracket notation. For example, 
  `app['m-search']('/', function ...`.
</div>

You can provide multiple callback functions that behave just like middleware. The only exception is that these callbacks may invoke `next('route')` to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.

<div class="doc-box doc-info">
  The API documentation explicitly includes only the most popular HTTP methods `app.get()`, `app.post()`, `app.put()`, and `app.delete()` to provide a quick sense of how things work. Other methods like `app.lock()`, `app.subscribe()`, and so on, work in exactly the same way.
</div>

There is a special routing method, `app.all()`, which is not derived from any HTTP method. It is used for loading middleware at a path for all request methods.

In the following example, the handler will be executed for requests to "/secret" whether using GET, POST, PUT, DELETE, or any other HTTP request method.

```js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```
