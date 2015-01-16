Route an HTTP request, where METHOD is the HTTP method of the request, such as GET, PUT, POST, and so on, in lowercase. The corresponding routing methods are then `app.get()`, `app.post()`, `app.put()`, and so on. For more information, see the [routing guide](/guide/routing.html).

You can provide multiple callback functions that behave just like middleware. The only exception is that these callbacks may invoke `next('route')` to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.

<div class="doc-box doc-info">
  <p>
    The following methods are supported by Express: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search`, and `connect`.
  </p>
  <p>
    Considering their popularity, only `app.()get`, `app.post()`, `app.put()`, and `app.delete()` have been included in the API documentation to help developers get a quick sense of how things work. Other methods like `app.()lock`, `app.subscribe()`, and so on, work as expected too.
  </p>
  <p>
    To route methods which translate to invalid JavaScript variable names, use the bracket notation:
    `app['m-search']('/', function () { ... })`.
  </p>
</div>
