---
layout: page
title: Migrating From 2.x to 3.x
menu: guide
lang: en
redirect_from: "/guide/migrating-from-2x-to-3x.html"
---
# Migrating From 2.x to 3.x
## Removed

-   `res.render()` "status" option (use node's `res.statusCode=` or `res.status(code).render(...)`)
-   `res.render()` "charset" option (use `res.charset=`)
-   `res.local(foo, bar)` (use `res.locals.foo = bar` or `res.locals({ foo: bar })` instead)
-   `app.dynamicHelpers()` (use middleware + `res.locals`)
-   `app.helpers()` (use `app.locals`)
-   the concept of a "layout" (template engine specific now)
-   `partial()` (template engine specific)
-   `res.partial()`
-   "view options" setting, use `app.locals`
-   "hints" setting
-   `req.isXMLHttpRequest` (use `req.xhr`)
-   `app.error()` (use middleware with (err, req, res, next))
-   `req.flash()` (just use sessions: `req.session.messages = ['foo']` or similar)
-   [connect-flash](https://github.com/jaredhanson/connect-flash) can be used as middleware to provide req.flash()
-   the `jsonp callback` setting was removed (use `res.jsonp()`)

## Changed

-   `req.header(field[, defaultValue])` replaced by `req.get(field)` (remains for backwards compatibility)
-   `res.header(field[, value])` replaced by `res.set(field, value)` / `res.get(field)` (remains for backwards compatibility)
-   renamed `app.register()` to `app.engine()`
-   template engine compliance from `engine.compile(str, options) => Function` to `engine.__express(filename, options, callback)`
-   `express.createServer()` is now simply `express()` (but remains for BC).
    -   Keep in mind that the return value of `express()` is **no longer an `http.Server` instance**. (See the **Application function** section below for more details)

## View options

The "view options" setting is no longer necessary, `app.locals` are the local variables merged with `res.render()`'s, so `app.locals.pretty = true` is the same as passing `res.render(view, { pretty: true })`.

## Application function

The return value of `express()` is a JavaScript `Function`, encapsulating everything that makes an Express app tick. This means you can easily setup HTTP and HTTPS versions of your application by passing it to node's `http.createServer()` and `https.createServer()`:

```js
var app = express();
http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
```

For convenience, and smaller applications the `app.listen()` method takes the same arguments, wrapping in an HTTP server. The following are equivalent:

```js
var app = express();
app.listen(3000);
```

and

```js
var app = express()
  , http = require('http');

http.createServer(app).listen(3000);
```

This however means that methods that are on node's `http.Server.prototype` are no longer present on `app`, for example `app.address()` must now be called on the server returned by `app.listen()` or the one you have wrapped with `http.createServer(app)`.

## Socket.IO compatibility

Socket.IO's `.listen()` method takes an `http.Server` instance as an argument. As of 3.x, the return value of `express()` is not an `http.Server` instance. (See the **Application function** section above.) To get Socket.IO working with Express 3.x, make sure you manually create and pass your `http.Server` instance to Socket.IO's `.listen()` method.

```js
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);
```

## Template engine integration

Express 2x template engine compatibility required the following module export:

```js
exports.compile = function(templateString, options) {
  return a Function;
};
```

Express 3x template engines should export the following:

```js
exports.\_\_express = function(filename, options, callback) {
  callback(err, string);
};
```

If a template engine does not expose this method, you're not out of luck, the `app.engine()` method allows you to map any function to an extension. Suppose you had a markdown library and wanted to render `.md` files, but this library did not support Express, your `app.engine()` call may look something like this:

```js
var markdown = require('some-markdown-library');

app.engine('md', function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    str = markdown.parse(str).toString();
    fn(null, str);
  });
});
```

## View system changes

By removing the concept of a "layout" & partials in Express 3.x template engines will have greater control over file I/O. This means integration with template engines much easier, and greatly simplify the view system's internals.

This also enables template engines to supply their own means of inheritance, for example later releases of Jade provide Django-inspired template inheritance, where the view being rendered specifies the layout it wants to extend. For an example of this using the Jade engine visit [http://www.devthought.com/code/use-jade-blocks-not-layouts/](http://www.devthought.com/code/use-jade-blocks-not-layouts/)

Post-release we may end up building an Express extension to support the old `partial()` concept.

To get back layout functionality with EJS you can use [express-partials](https://github.com/publicclass/express-partials) or [ejs-locals](https://github.com/RandomEtc/ejs-locals).

## Error handling middleware

The `app.error(callback)` method in 2.x was effectively the same as the following:

```js
app.error = function(fn){
  this.use(function(err, req, res, next){
    fn.apply(this, arguments);
  });
};
```

The reason for this is that Connect differentiates between "regular" middleware, and "error-handling" middleware via the `fn.length`. A regular middleware has a `fn.length` of `<= 3`, aka `(req, res, next)`, whereas error-handling middleware must have exactly `4` `(err, req, res, next)`. So the reason 2.x wrapped this functionality was to simply provide a bit of sugar on-top of this API making the parameters optional.

In short all you need to do to "catch" these errors that are passed along is to define another middleware, but with `4` arguments. Note that this middleware should be defined _below_ all the others, so that they may invoke `next(err)` in order to pass an error to it like so:

```js
app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.session())
app.use(app.router) // the router itself (app.get(), app.put() etc)
app.use(function(err, req, res, next){
  // if an error occurs Connect will pass it down
  // through these "error-handling" middleware
  // allowing you to respond however you like
  res.send(500, { error: 'Sorry something bad happened!' });
})
```

## App- & Request-level local variables

Do not use `name` as a key in app.locals or res.locals because those objects are Function object instances. Any attempt to set them will be silently ignored. Other unstable or unusable top level keys are listed here: [Function Instance Properties](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function#Function_instance-Properties).