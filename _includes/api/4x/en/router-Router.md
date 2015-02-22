<h3 id='router'>Router([options])</h3>

Create a new router as follows:

~~~js
var router = express.Router([options]);
~~~

The optional `options` parameter specifies the behavior of the router.

<div class="table-scroller" markdown="1">

| Property        | Description                                     | Default     | Availability  |
|-----------------|-------------------------------------------------|-------------|---------------|
| `caseSensitive` | Enable case sensitivity. | Disabled by default, treating "/Foo" and "/foo" as the same.|  |
| `mergeParams`   | Preserve the `req.params` values from the parent router. If the parent and the child have conflicting param names, the child's value take precedence.| `false` | 4.5.0+ |
| `strict`        | Enable strict routing. | Disabled by default, "/foo" and "/foo/" are treated the same by the router.| &nbsp; |

</div>

You can add middleware and HTTP method routes (such as `get`, `put`, `post`, and
so on) to `router` just like an application.

~~~js
// invoked for any requests passed to this router
router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function(req, res, next) {
  // ..
});
~~~

You can then use a router for a particular root URL in this way separating your routes into files or even mini-apps.

~~~js
// only requests to /calendar/* will be sent to our "router"
app.use('/calendar', router);
~~~
