<h3 id='res.headersSent'>res.headersSent</h3>

Propriedade boleana que indica se a app enviou cabeçalhos HTTP para a resposta.

~~~js
app.get('/', function (req, res) {
  console.log(res.headersSent); // false
  res.send('OK');
  console.log(res.headersSent); // true
})
~~~
