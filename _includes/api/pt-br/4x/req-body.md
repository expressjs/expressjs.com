<h3 id='req.body'>req.body</h3>

Contains key-value pairs of data submitted in the request body.
By default, it is `undefined`, and is populated when you use body-parsing middleware such
as [body-parser](https://www.npmjs.org/package/body-parser) and [multer](https://www.npmjs.org/package/multer).

This example shows how to use body-parsing middleware to populate `req.body`.

~~~js
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.post('/', function (req, res) {
  console.log(req.body);
  res.json(req.body);
})
~~~
