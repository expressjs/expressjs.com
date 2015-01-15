The `app.METHOD()` methods provide the routing functionality in Express, where **METHOD** is derived from 
one of the HTTP or augmented methods, and lowercased. These methods look like `app.get()`, `app.post()`, `app.patch()`, and so on.

The following methods are supported by Express: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search`, and `connect`.

<div class="doc-box doc-info">
To route methods which translate to invalid JavaScript variable names, use the bracket notation:
`app['m-search']('/', function () { ... })`
</div>

Multiple callbacks may be given; all are treated
equally, and behave just like middleware. The only exception is that
these callbacks may invoke `next('route')` to bypass the
remaining route callback(s). This mechanism can be used to perform pre-conditions
on a route, then pass control to subsequent routes if there's no reason to proceed
with the current route.
