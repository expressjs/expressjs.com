<h3 id='router.METHOD'>router.METHOD(path, [callback, ...] callback)</h3>

The `router.METHOD()` methods provide the routing functionality in Express,
where METHOD is one of the HTTP methods, such as GET, PUT, POST, and so on,
in lowercase.  Thus, the actual methods are `router.get()`, `router.post()`,
`router.put()`, and so on.

<div class="doc-box doc-info" markdown="1">
  The `router.get()` function is automatically called for the HTTP `HEAD` method in
  addition to the `GET` method if `router.head()` was not called for the
  path before `router.get()`.
</div>

You can provide multiple callbacks, and all are treated equally, and behave just
like middleware, except that these callbacks may invoke `next('route')`
to bypass the remaining route callback(s).  You can use this mechanism to perform
pre-conditions on a route then pass control to subsequent routes when there is no
reason to proceed with the route matched.

The following snippet illustrates the most simple route definition possible.
Express translates the path strings to regular expressions, used internally
to match incoming requests. Query strings are _not_ considered when performing
these matches, for example "GET /" would match the following route, as would
"GET /?name=tobi".

```js
router.get('/', (req, res) => {
  res.send('hello world')
})
```

You can also use regular expressions&mdash;useful if you have very specific
constraints, for example the following would match "GET /commits/71dbb9c" as well
as "GET /commits/71dbb9c..4c084f9".

```js
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, (req, res) => {
  const from = req.params[0]
  const to = req.params[1] || 'HEAD'
  res.send(`commit range ${from}..${to}`)
})
```

You can use `next` primitive to implement a flow control between different
middleware functions, based on a specific program state. Invoking `next` with
the string `'router'` will cause all the remaining route callbacks on that router
to be bypassed.

The following example illustrates `next('router')` usage.

```js
function fn (req, res, next) {
  console.log('I come here')
  next('router')
}
router.get('/foo', fn, (req, res, next) => {
  console.log('I dont come here')
})
router.get('/foo', (req, res, next) => {
  console.log('I dont come here')
})
app.get('/foo', (req, res) => {
  console.log(' I come here too')
  res.end('good')
})
```
