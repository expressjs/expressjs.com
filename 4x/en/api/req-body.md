Contains the key-value pairs of data submitted in the request body. It is `undefined` by default, and is 
populated with the use of a body-parsing middleware such as [body-parser](https://www.npmjs.org/package/body-parser) and [multer](https://www.npmjs.org/package/multer).

The example below shows the use of body-parsing middleware to populate `req.body`.

```js
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
```
