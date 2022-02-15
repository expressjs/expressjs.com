<h3 id='app.use'>app.use([path,] callback [, callback...])</h3>

Mounts the specified [middleware](/guide/using-middleware.html) function or functions
at the specified path:
the middleware function is executed when the base of the requested path matches `path`.

{% include api/en/5x/routing-args.html %}

#### Description

A route will match any path that follows its path immediately with a "`/`".
For example: `app.use('/apple', ...)` will match "/apple", "/apple/images",
"/apple/images/news", and so on.

Since `path` defaults to "/", middleware mounted without a path will be executed for every request to the app.  
For example, this middleware function will be executed for _every_ request to the app:

```js
app.use((req, res, next) => {
  console.log('Time: %d', Date.now())
  next()
})
```

<div class="doc-box doc-info" markdown="1">
**NOTE**

Sub-apps will:

* Not inherit the value of settings that have a default value.  You must set the value in the sub-app.
* Inherit the value of settings with no default value.

For details, see [Application settings](/en/5x/api.html#app.settings.table).
</div>

Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.

```js
// this middleware will not allow the request to go beyond it
app.use((req, res, next) => {
  res.send('Hello World')
})

// requests will never reach this route
app.get('/', (req, res) => {
  res.send('Welcome')
})
```

**Error-handling middleware**

Error-handling middleware always takes _four_ arguments.  You must provide four arguments to identify it as an error-handling middleware function. Even if you don't need to use the `next` object, you must specify it to maintain the signature. Otherwise, the `next` object will be interpreted as regular middleware and will fail to handle errors. For details about error-handling middleware, see: [Error handling](/{{ page.lang }}/guide/error-handling.html).

Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature `(err, req, res, next)`):

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

#### Path examples

The following table provides some simple examples of valid `path` values for
mounting middleware.

<div class="table-scroller">
<table class="doctable" border="1">

<thead>
<tr>
<th>Type</th>
<th>Example</th>
</tr>
</thead>

<tbody>

<tr>
<td>Path</td>
<td markdown="1">
This will match paths starting with `/abcd`:

```js
app.use('/abcd', (req, res, next) => {
  next()
})
```

</td>
</tr>

<tr>
<td>Path Pattern</td>
<td markdown="1">
This will match paths starting with `/abcd` and `/abd`:

```js
app.use('/ab(c?)d', (req, res, next) => {
  next()
})
```

</td>
</tr>

<tr>
<td>Regular Expression</td>
<td markdown="1">
This will match paths starting with `/abc` and `/xyz`:

```js
app.use(/\/abc|\/xyz/, (req, res, next) => {
  next()
})
```

</td>
</tr>

<tr>
<td>Array</td>
<td markdown="1">
This will match paths starting with `/abcd`, `/xyza`, `/lmn`, and `/pqr`:

```js
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], (req, res, next) => {
  next()
})
```

</td>
</tr>

</tbody>

</table>
</div>

#### Middleware callback function examples

The following table provides some simple examples of middleware functions that
can be used as the `callback` argument to `app.use()`, `app.METHOD()`, and `app.all()`.
Even though the examples are for `app.use()`, they are also valid for `app.use()`, `app.METHOD()`, and `app.all()`.

<table class="doctable" border="1">

<thead>
<tr>
<th>Usage</th>
<th>Example</th>
</tr>
</thead>
<tbody>

<tr>
<td>Single Middleware</td>
<td markdown="1">
You can define and mount a middleware function locally.

```js
app.use((req, res, next) => {
  next()
})
```

A router is valid middleware.

```js
const router = express.Router()
router.get('/', (req, res, next) => {
  next()
})
app.use(router)
```

An Express app is valid middleware.
```js
const subApp = express()
subApp.get('/', (req, res, next) => {
  next()
})
app.use(subApp)
```

</td>
</tr>

<tr>
<td>Series of Middleware</td>
<td markdown="1">
You can specify more than one middleware function at the same mount path.

```js
const r1 = express.Router()
r1.get('/', (req, res, next) => {
  next()
})

const r2 = express.Router()
r2.get('/', (req, res, next) => {
  next()
})

app.use(r1, r2)
```

</td>
</tr>

<tr>
<td>Array</td>
<td markdown="1">
Use an array to group middleware logically.

```js
const r1 = express.Router()
r1.get('/', (req, res, next) => {
  next()
})

const r2 = express.Router()
r2.get('/', (req, res, next) => {
  next()
})

app.use([r1, r2])
```

</td>
</tr>

<tr>
<td>Combination</td>
<td markdown="1">
You can combine all the above ways of mounting middleware.

```js
function mw1 (req, res, next) { next() }
function mw2 (req, res, next) { next() }

const r1 = express.Router()
r1.get('/', (req, res, next) => { next() })

const r2 = express.Router()
r2.get('/', (req, res, next) => { next() })

const subApp = express()
subApp.get('/', (req, res, next) => { next() })

app.use(mw1, [mw2, r1, r2], subApp)
```

</td>
</tr>

</tbody>

</table>

Following are some examples of using the [express.static](/guide/using-middleware.html#middleware.built-in)
middleware in an Express app.

Serve static content for the app from the "public" directory in the application directory:

```js
// GET /style.css etc
app.use(express.static(path.join(__dirname, 'public')))
```

Mount the middleware at "/static" to serve static content only when their request path is prefixed with "/static":

```js
// GET /static/style.css etc.
app.use('/static', express.static(path.join(__dirname, 'public')))
```

Disable logging for static content requests by loading the logger middleware after the static middleware:

```js
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger())
```

Serve static files from multiple directories, but give precedence to "./public" over the others:

```js
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'files')))
app.use(express.static(path.join(__dirname, 'uploads')))
```
