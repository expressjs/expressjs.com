<h3 id='req.body'>req.body</h3>

Contains key-value pairs of data submitted in the request body.
By default, it is `undefined`, and is populated when you use body-parsing middleware such
as [`express.json()`](#express.json) or [`express.urlencoded()`](#express.urlencoded).

<div class="doc-box doc-warn" markdown="1">
As `req.body`'s shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting. For example, `req.body.foo.toString()` may fail in multiple ways, for example `foo` may not be there or may not be a string, and `toString` may not be a function and instead a string or other user-input.
</div>

The following example shows how to use body-parsing middleware to populate `req.body`.

```js
var express = require('express')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
})
```
