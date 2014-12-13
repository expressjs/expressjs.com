Returns an instance of a single route which can then be used to handle HTTP verbs with optional middleware. Using `router.route()` is a recommended approach to avoiding duplicate route naming and thus typo errors.

Building on the `router.param()` example from before, we see how `router.route()` allows us to easily specify the various HTTP verb handlers.

```js
var router = express.Router();

router.param('user_id', function(req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: 'TJ'
  };
  next();
});

router.route('/users/:user_id')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  console.log('CALLED FOR ANY VERB BEFORE THE SPECIFIC VERB ROUTE');
  next();
})
.get(function(req, res, next) {
  res.json(req.user);
})
.put(function(req, res, next) {
  // just an example of maybe updating the user
  req.user.name = req.params.name;
  // save user ... etc
  res.json(req.user);
})
.post(function(req, res, next) {
  next(new Error('not implemented'));
})
.delete(function(req, res, next) {
  next(new Error('not implemented'));
})
```

This apporach re-uses the single '/users/:user_id' path and add handlers for the various HTTP verbs.
