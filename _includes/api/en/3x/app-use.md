<h3 id='app.use'>app.use([path], function)</h3>

Use the given middleware `function`, with optional mount `path`,
defaulting to "/".

```js
var express = require('express')
var app = express()

// simple logger
app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url)
  next()
})

// respond
app.use(function (req, res, next) {
  res.send('Hello World')
})

app.listen(3000)
```

The "mount" path is stripped and is <strong>not</strong> visible
to the middleware `function`. The main effect of this feature is that
mounted middleware may operate without code changes regardless of its "prefix"
pathname.

<div class="doc-box doc-notice" markdown="1">
A route will match any path that follows its path immediately with either a "`/`" or a "`.`". For example: `app.use('/apple', ...)` will match _/apple_, _/apple/images_, _/apple/images/news_, _/apple.html_, _/apple.html.txt_, and so on.
</div>

Here's a concrete example, take the typical use-case of serving files in ./public
using the `express.static()` middleware:

```js
// GET /javascripts/jquery.js
// GET /style.css
// GET /favicon.ico
app.use(express.static(path.join(__dirname, 'public')))
```

Say for example you wanted to prefix all static files with "/static", you could
use the "mounting" feature to support this. Mounted middleware functions are _not_
invoked unless the `req.url` contains this prefix, at which point
it is stripped when the function is invoked. This affects this function only,
subsequent middleware will see `req.url` with "/static" included
unless they are mounted as well.

```js
// GET /static/javascripts/jquery.js
// GET /static/style.css
// GET /static/favicon.ico
app.use('/static', express.static(path.join(__dirname, 'public')))
```

The order of which middleware are "defined" using `app.use()` is
very important, they are invoked sequentially, thus this defines middleware
precedence. For example usually `express.logger()` is the very
first middleware you would use, logging every request:

```js
app.use(express.logger())
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res) {
  res.send('Hello')
})
```

Now suppose you wanted to ignore logging requests for static files, but to
continue logging routes and middleware defined after `logger()`,
you would simply move `static()` above:

```js
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.logger())
app.use(function (req, res) {
  res.send('Hello')
})
```

Another concrete example would be serving files from multiple directories,
giving precedence to "./public" over the others:

```js
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'files')))
app.use(express.static(path.join(__dirname, 'uploads')))
```
