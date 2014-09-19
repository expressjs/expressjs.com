An Express application is essentially a stack of middleware which are executed serially.

A middleware is a function with access to the request object (`req`), the response object (`res`), and the next middleware in line in the request-response cycle of an Express application. It is commonly denoted by a variable named `next`. Each middleware has the capacity to execute any code, make changes to the request and the reponse object, end the request-response cycle, and call the next middleware in the stack. Since middleware are execute serially, their order of inclusion is important.

If the current middleware is not ending the request-response cycle, it is important to call `next()` to pass on the control to the next middleware, else the request will be left hanging.

With an optional mount path, middleware can be loaded at the application level or at the router level. Also, a series of middleware functions can be loaded together, creating a sub-stack of middleware system at a mount point.

<h3 id='middleware.application'>Application level middleware</h3>

Application level middleware are bound to an instance of `express`, using `app.use()` and `app.VERB()`.

```
var app = express();

// a middleware with no mount path; gets executed for every request to the app
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware mounted on /user/:id; will be executed for any type of HTTP request to /user/:id
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a route and its handler function (middleware system) which handles GET requests to /user/:id
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```

Here is an example of loading a series of middleware at a mount point with a mount path.

```
// a middleware sub-stack which prints request info for any type of HTTP request to /user/:id
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

Route handlers, being a middleware system, makes it possible to define multiple routes for a path. In the example below, two routes are defined for GET requests to `/user/:id`. The second router will not cause any problems, however it will never get called, because the first route ends the request-response cycle.

```
// a middleware sub-stack which handles GET requests to /user/:id
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for /user/:id which prints the user id
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
```

If you need to skip the rest of the middleware from a router middleware stack, call `next('route')` to pass on the control to the next route. Note: `next('route')` will work only in middleware loaded using `app.VERB()` or `router.VERB()`.

```
// a middleware sub-stack which handles GET requests to /user/:id
app.get('/user/:id', function (req, res, next) {
  // if user id is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // else pass the control to the next middleware in this stack
  else next(); // 
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for /user/:id which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
```

<h3 id='middleware.router'>Router level middleware</h3>

Router level middleware work just like application level middleware except they are bound to an instance of `express.Router()`.

```
var router = express.Router();
```
Router level middleware are loaded using `router.use()` and `router.VERB()`.

The middleware system created at the application level in the example above, can be replicated at the router level using the following code.

```
var app = express();
var router = express.Router();

// a middleware with no mount path, gets executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to /user/:id
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack which handles GET requests to /user/:id
router.get('/user/:id', function (req, res, next) {
  // if user id is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // else pass the control to the next middleware in this stack
  else next(); // 
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for /user/:id which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
```
