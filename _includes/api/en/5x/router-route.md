<h3 id='router.route'>router.route(path)</h3>

Returns an instance of a single route which you can then use to handle HTTP verbs
with optional middleware. Use `router.route()` to avoid duplicate route naming and
thus typing errors.

Building on the `router.param()` example above, the following code shows how to use
`router.route()` to specify various HTTP method handlers.

```js
const router = express.Router()

router.param('user_id', (req, res, next, id) => {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id,
    name: 'TJ'
  }
  next()
})

router.route('/users/:user_id')
  .all((req, res, next) => {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
    next()
  })
  .get((req, res, next) => {
    res.json(req.user)
  })
  .put((req, res, next) => {
  // just an example of maybe updating the user
    req.user.name = req.params.name
    // save user ... etc
    res.json(req.user)
  })
  .post((req, res, next) => {
    next(new Error('not implemented'))
  })
  .delete((req, res, next) => {
    next(new Error('not implemented'))
  })
```

This approach re-uses the single `/users/:user_id` path and adds handlers for
various HTTP methods.

<div class="doc-box doc-info" markdown="1">
NOTE: When you use `router.route()`, middleware ordering is based on when the _route_ is created, not when method handlers are added to the route. For this purpose, you can consider method handlers to belong to the route to which they were added.
</div>
