Maps logic to route parameters. For example, when `:user` is present in a route
path you can map user-loading logic to automatically provide `req.user` to the
route or perform validations on the parameter input.
  
*Note*

  * Param callback functions are local to the router on which they are defined.
  They are not inherited by mounted apps or routers. Hence, param callbacks
  defined on `router` will be trigerred only by route parameters defined on
  `router` routes.

  * A param callback is called only once in a request-response cycle,
  even if multiple routes match the parameter.

    ```js
    router.param('id', function (req, res, next, id) {
      console.log('CALLED ONLY ONCE');
      next();
    })

    router.get('/user/:id', function (req, res, next) {
      console.log('although this matches');
      next();
    });

    router.get('/user/:id', function (req, res) {
      console.log('and this matches too');
      res.end();
    });
    ```
    
The following snippet illustrates how the `callback` is much like middleware,
thus supporting asynchronous operations. However, it provides the additional value
of the parameter (here named `id`), derived from the corresponding parameter
in the `req.params` object. The callback function then attempts to load the user,
and assign it to `req.user`, otherwise passing an error to `next(err)`.

It is important to realize that any route that triggered a named parameter
function will only be run if the named parameter handler did not call `next`
with an error.

```js
router.param('user', function(req, res, next, id){
  User.find(id, function(err, user){
    if (err) {
      return next(err);
    }
    else if (!user) {
      return next(new Error('failed to load user'));
    }

    req.user = user;
    next();
  });
});

// this route uses the ":user" named parameter
// which will cause the 'user' param callback to be triggered
router.get('/users/:user', function(req, res, next) {
  // req.user WILL be defined here
  // if there was an error, normal error handling will be triggered
  // and this function will NOT execute
});
```

Alternatively you may pass only a `callback`, in which case you have the opportunity
to alter the `router.param()` API. For example 
[express-params](http://github.com/expressjs/express-params) defines the following
callback which allows you to restrict parameters to a given regular expression.
It checks whether the second argument is a regular
expression, returning the callback (which acts much like the "user" param example).

```js
router.param(function(name, fn){
  if (fn instanceof RegExp) {
    return function(req, res, next, val){
      var captures;
      if (captures = fn.exec(String(val))) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    }
  }
});
```

You could then use this method to effectively validate parameters (and optionally
parse them to provide capture groups):

```js
router.param('id', /^\d+$/);

router.get('/user/:id', function(req, res){
  res.send('user ' + req.params.id);
});

router.param('range', /^(\w+)\.\.(\w+)?$/);

router.get('/range/:range', function(req, res){
  var range = req.params.range;
  res.send('from ' + range[1] + ' to ' + range[2]);
});
```

The `router.use()` method also supports named parameters so that your mount points
for other routers can benefit from preloading using named parameters.
