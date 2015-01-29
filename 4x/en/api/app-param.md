Maps logic to route parameters. For example, when `:user` is present in a route
path, you may map user loading logic to automatically provide `req.user` to the
route, or perform validations on the parameter input.

_Note_

* Param callback functions are local to the router on which they are defined.  Mounted apps or routers do not inherit them.
Hence, param callbacks defined on `app` will be triggered only by route parameters defined on `app` routes.
* A param callback will be called only once in a request-response cycle, even if the parameter is matched in multiple routes.

```js
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
```

The following snippet illustrates how the `callback` is much like middleware,
thus supporting asynchronous operations. However, it provides the additional
value of the parameter (here named as `id`), derived from the corresponding
parameter in the `req.params` object.  An attempt to load the user is then
performed, assigning `req.user`;  otherwise an error is passed to `next(err)`.

```js
app.param('user', function(req, res, next, id){
  User.find(id, function(err, user){
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
```

<div class="doc-box doc-warn">`app.param(callback)` is deprecated as of v4.11.0.</div>

Alternatively, you can pass only a `callback`, in which
case you have the opportunity to alter the `app.param()` API.
For example the [express-params](http://github.com/expressjs/express-params)
defines the following callback which allows you to restrict parameters to a given
regular expression. 

This example is a bit more advanced. It checks if the second argument is a regular
expression, and if so returns the callback function, that acts much like the "user" param example.

```js
app.param(function(name, fn){
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

Now, you could use the method to effectively validate parameters (and
optionally parse them to provide capture groups):

```js
app.param('id', /^\d+$/);

app.get('/user/:id([0-9]+)', function(req, res){
  res.send('user ' + req.params.id);
});

app.param('range', /^(\w+)\.\.(\w+)?$/);

app.get('/range/:range(\\w+\\.\\.\\w+)', function(req, res){
  var range = req.params.range.split('..');
  res.send('from ' + range[0] + ' to ' + range[1]);
});
```
