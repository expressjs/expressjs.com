# Routing

Routing refers to the definition of end points (URIs) to an application and how it responds to client requests.

A route is a combination of a URI, a HTTP request method (GET, POST, and so on), and one or more handlers for the endpoint. It takes the following structure `app.METHOD(path, [callback...], callback)`, where `app` is an instance of `express`, `METHOD` is an [HTTP request method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), `path` is a path on the server, and `callback` is the function executed when the route is matched.

<div class="doc-box doc-info">
Express supports the following methods: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search`, and `connect`.
</div>

<div class="doc-box doc-info">
To route methods which translate to invalid JavaScript variable names, use the bracket notation:
`app['m-search']('/', function () { ... })`
</div>

## Defining route paths

The following snippet illustrates the most simple route definition possible. Express
translates the path strings to regular expressions, used internally to match incoming requests.

<div class="doc-box doc-warn">
Query strings are *not* considered when peforming these matches. For example, "GET /"
would match the following route, as would "GET /?name=tobi":
</div>

```js
app.get('/', function(req, res){
  res.send('hello world');
});
```

Regular expressions may also be used, and can be useful
if you have very specific restraints, for example the following
would match "GET /commits/71dbb9c" as well as "GET /commits/71dbb9c..4c084f9".

```js
app.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || 'HEAD';
  res.send('commit range ' + from + '..' + to);
});
```

Several callbacks may also be passed, useful for re-using middleware
that load resources, perform validations, etc.

```js
app.get('/user/:id', user.load, function(){
  // ... 
})
```

If you have multiple common middleware for a route, you can use the route API with `all`.

```js
var middleware = [loadForum, loadThread];

app.route('/forum/:fid/thread/:tid')
.all(loadForum)
.all(loadThread)
.get(function() { //... });
.post(function() { //... });
```

Both middleware will be run for GET and POST requests.

## Defining route handlers

Multiple callbacks may be given; all are treated equally, and behave just like middleware. The only exception is that these callbacks may invoke `next('route')` to bypass the remaining route callback(s). This mechanism can be used to perform pre-conditions on a route, then pass control to subsequent routes if there's no reason to proceed
with the current route.

