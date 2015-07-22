<h3 id='req.body'>req.body</h3>

`req.body` is not a native Express object. It is a conventionally named object on the request object, populated when you use body-parsing middleware such
as [body-parser](https://www.npmjs.org/package/body-parser) and [multer](https://www.npmjs.org/package/multer).

When populated, `req.body` contains key-value pairs of data submitted in the request body.

This example shows how to use a body-parsing middleware to populate `req.body`.

~~~js
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/', upload.array(), function (req, res) {
  console.log(req.body);
  res.json(req.body);
})
~~~
