<h3 id='router.param'>router.param([name,] callback)</h3>

Add callback triggers to route parameters, where `name` is the name of the parameter or an array of them, and `function` is the callback function. The parameters of the callback function are the request object, the response object, the next middleware, and the value of the parameter, in that order.

If `name` is an array, the `callback` trigger is registered for each parameter declared in it, in the order in which they are declared. Furthermore, for each declared parameter except the last one, a call to `next` inside the callback will call the callback for the next declared parameter. For the last parameter, a call to `next` will call the next middleware in place for the route currently being processed, just like it would if `name` were just a string.

For example, when `:user` is present in a route path, you may map user loading logic to automatically provide `req.user` to the route, or perform validations on the parameter input.

~~~js
router.param('user', function(req, res, next, id) {

  // try to get the user details from the User model and attach it to the request object
  User.find(id, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});
~~~

Param callback functions are local to the router on which they are defined. They are not inherited by mounted apps or routers. Hence, param callbacks defined on `router` will be triggered only by route parameters defined on `router` routes.

A param callback will be called only once in a request-response cycle, even if the parameter is matched in multiple routes, as shown in the following examples.

~~~js
router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
})

app.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

app.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
~~~

On `GET /user/42`, the following is printed:

~~~
CALLED ONLY ONCE
although this matches
and this matches too
~~~

~~~js
router.param(['id', 'page'], function (req, res, next, value) {
  console.log('CALLED ONLY ONCE with', value);
  next();
})

app.get('/user/:id/:page', function (req, res, next) {
  console.log('although this matches');
  next();
});

app.get('/user/:id/:page', function (req, res) {
  console.log('and this matches too');
  res.end();
});
~~~

On `GET /user/42/3`, the following is printed:

~~~
CALLED ONLY ONCE with 42
CALLED ONLY ONCE with 3
although this matches
and this matches too
~~~

<div class="doc-box doc-warn" markdown="1">
The following section describes `router.param(callback)`, which is deprecated as of v4.11.0.
</div>

The behavior of the `router.param(name, callback)` method can be altered entirely by passing only a function to `router.param()`. This function is a custom implementation of how `router.param(name, callback)` should behave - it accepts two parameters and must return a middleware.

The first parameter of this function is the name of the URL parameter that should be captured, the second parameter can be any JavaScript object which might be used for returning the middleware implementation.

The middleware returned by the function decides the behavior of what happens when a URL parameter is captured.

In this example, the `router.param(name, callback)` signature is modified to `router.param(name, accessId)`. Instead of accepting a name and a callback, `router.param()` will now accept a name and a number.

~~~js
var express = require('express');
var app = express();
var router = express.Router();

// customizing the behavior of router.param()
router.param(function(param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

// using the customized router.param()
router.param('id', 1337);

// route to trigger the capture
router.get('/user/:id', function (req, res) {
  res.send('OK');
})

app.use(router);

app.listen(3000, function () {
  console.log('Ready');
})
~~~

In this example, the `router.param(name, callback)` signature remains the same, but instead of a middleware callback, a custom data type checking function has been defined to validate the data type of the user id.

~~~js
router.param(function(param, validator) {
  return function (req, res, next, val) {
    if (validator(val)) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
})

router.param('id', function (candidate) {
  return !isNaN(parseFloat(candidate)) && isFinite(candidate);
});
~~~
