<h3 id='app.param'>app.param([name], callback)</h3>

Add callback triggers to route parameters, where `name` is the name of the parameter or an array of them, and `function` is the callback function. The parameters of the callback function are the request object, the response object, the next middleware, and the value of the parameter, in that order.

For example, when `:user` is present in a route path, you may map user loading logic to automatically provide `req.user` to the route, or perform validations on the parameter input.

~~~js
app.param('user', function(req, res, next, id) {

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

Param callback functions are local to the router on which they are defined. They are not inherited by mounted apps or routers. Hence, param callbacks defined on `app` will be triggered only by route parameters defined on `app` routes.

A param callback will be called only once in a request-response cycle, even if the parameter is matched in multiple routes, as shown in the following example.

~~~js
app.param('id', function (req, res, next, id) {
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

<div class="doc-box doc-warn" markdown="1">
`app.param(callback)` is deprecated as of v4.11.0.
</div>

By passing only a callback function, you can alter the `app.param()` API. For example the [express-params](http://github.com/expressjs/express-params) defines the following callback which allows you to restrict parameters to a given regular expression.

<div class="doc-box doc-info" markdown="1">
The code in the next section can be migrated using the following, without the use of `app.param(callback)`:

<pre>
router.get('/user/:id([0-9]+)', function(req, res){
  res.send('user ' + req.params.id);
});

router.get('/range/:range(\\w+\.\.\\w+)', function(req, res){
  var range = req.params.range.split('..');
  res.send('from ' + range[0] + ' to ' + range[1]);
});
</pre>

</div>

~~~js
app.param(function(name, fn) {
  if (fn instanceof RegExp) {
    return function(req, res, next, val) {
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
~~~

The method could now be used to effectively validate parameters (and optionally parse them to provide capture groups):

~~~js
// validation rule for id: should be one or more digits
app.param('id', /^\d+$/);

app.get('/user/:id', function(req, res) {
  res.send('user ' + req.params.id);
});

// validation rule for range: should start with one more alphanumeric characters, followed by two dots, and end with one more alphanumeric characters
app.param('range', /^(\w+)\.\.(\w+)?$/);

app.get('/range/:range', function(req, res) {
  var range = req.params.range;
  res.send('from ' + range[1] + ' to ' + range[2]);
});
~~~
