<h3 id='req.body'>req.body</h3>

Contém dados do tipo chave-valor enviados no corpo da requisição.
Por padrão é `undefined` e é populado quando você usa um middleware body-parser
como por exemplo [body-parser](https://www.npmjs.org/package/body-parser) and [multer](https://www.npmjs.org/package/multer).

Esse exemplo mostra como usar o middleware body-parser para popular o atributo
`req.body`.

~~~js
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // para realizar o parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // para realizar o parsing application/x-www-form-urlencoded
app.use(multer()); // para realizar o parsing multipart/form-data

app.post('/', function (req, res) {
  console.log(req.body);
  res.json(req.body);
})
~~~
