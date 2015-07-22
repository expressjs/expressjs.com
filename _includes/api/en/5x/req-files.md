<h3 id='req.files'>req.files</h3>

`req.files` is not a native Express object. It is a conventionally named object on the request object, populated by multipart-handling middleware like [busboy](https://www.npmjs.com/package/busboy), [multer](https://www.npmjs.com/package/multer), [formidable](https://www.npmjs.com/package/formidable), [multiparty](https://www.npmjs.com/package/multiparty), [connect-multiparty](https://www.npmjs.com/package/connect-multiparty), or [pez](https://www.npmjs.com/package/pez). Refer to the respective middleware for the nature of the `req.files` object.

When populated, `req.files` contains the files uploaded in the request body.

This example shows how to use a body-parsing middleware to populate `req.files`.

~~~js
var app = require('express')();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({storage: storage});

app.post('/', upload.fields([{name:'profile'}, {name:'avatar'}]), function (req, res) {
  console.log(req.files);
  res.json(req.files);
})
~~~
