<h3 id='req.body'>req.body</h3>

Contains key-value pairs of data submitted in the request body.
By default, it is `undefined`, and is populated when you use body-parsing middleware such
as [`express.json()`](#express.json) or [`express.urlencoded()`](#express.urlencoded).

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
