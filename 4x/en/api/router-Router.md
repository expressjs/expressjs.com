A router is an isolated instance of middleware and routes. Routers can be thought of as "mini" applications, capable only of performing middleware and routing functions. Every express application has a built-in app router.

Routers behave like middleware themselves and can be ".use()'d" by the app or in other routers.

Create a new router with `express.Router()`:

```js
var router = express.Router([options]);
```

Options is an optional object to alter the behavior of the router.

* `caseSensitive` Enable case sensitivity, disabled by default, treating "/Foo" and "/foo" as the same
* `strict`  Enable strict routing, by default "/foo" and "/foo/" are treated the same by the router
* `mergeParams` *Since Express.js v4.5.0.* Ensure the `req.params` values from the parent router are preserved. If the parent and the child have conflicting param names, the child's value take precedence. Defaults to `false`.

The router can have middleware and http VERB routes added just like an application.

```js
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
```

You can then use a router for a particular root url in this way separating your routes into files or even mini apps.

```js
// only requests to /calendar/* will be sent to our "router"
app.use('/calendar', router);
```
