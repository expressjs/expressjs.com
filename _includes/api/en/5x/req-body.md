<h3 id='req.body'>req.body</h3>

Contains key-value pairs of data submitted in the request body.
By default, it is `undefined`, and is populated when you use body-parsing middleware such
as [body-parser](https://www.npmjs.org/package/body-parser) and [multer](https://www.npmjs.org/package/multer).

<div class="doc-box doc-warn" markdown="1">
As `req.body`'s shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting. For example, `req.body.foo.toString()` may fail in multiple ways, for example `foo` may not be there or may not be a string, and `toString` may not be a function and instead a string or other user-input.
</div>

The following example shows how to use body-parsing middleware to populate `req.body`.

```js
const app = require('express')()
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', upload.array(), (req, res, next) => {
  console.log(req.body)
  res.json(req.body)
})
```
