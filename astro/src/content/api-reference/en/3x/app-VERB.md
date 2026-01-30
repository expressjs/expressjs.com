<h3 id='app.VERB'>app.VERB(path, [callback...], callback)</h3>

The `app.VERB()` methods provide the routing functionality
in Express, where <strong>VERB</strong> is one of the HTTP verbs, such
as `app.post()`. Multiple callbacks may be given, all are treated
equally, and behave just like middleware, with the one exception that
these callbacks may invoke `next('route')` to bypass the
remaining route callback(s). This mechanism can be used to perform pre-conditions
on a route then pass control to subsequent routes when there is no reason to proceed
with the route matched.

The following snippet illustrates the most simple route definition possible. Express
translates the path strings to regular expressions, used internally to match incoming requests.
Query strings are <em>not</em> considered when peforming these matches, for example "GET /"
would match the following route, as would "GET /?name=tobi".

```js
app.get('/', function (req, res) {
  res.send('hello world')
})
```

Regular expressions may also be used, and can be useful
if you have very specific restraints, for example the following
would match "GET /commits/71dbb9c" as well as "GET /commits/71dbb9c..4c084f9".

```js
app.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function (req, res) {
  var from = req.params[0]
  var to = req.params[1] || 'HEAD'
  res.send('commit range ' + from + '..' + to)
})
```

Several callbacks may also be passed, useful for re-using middleware
that load resources, perform validations, etc.

```js
app.get('/user/:id', user.load, function () {
  // ...
})
```

These callbacks may be passed within arrays as well, these arrays are
simply flattened when passed:

```js
var middleware = [loadForum, loadThread]

app.get('/forum/:fid/thread/:tid', middleware, function () {
  // ...
})

app.post('/forum/:fid/thread/:tid', middleware, function () {
  // ...
})
```
