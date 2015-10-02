<h3 id='req.app'>req.app</h3>
Esta propriedade faz uma referência à instância da aplicação Express que está utilizando o middleware.

Se você seguir o padrão em que você cria um módulo que apenas exporta um middleware para requisitá-lo dentro do arquivo principal, então esse middleware pode acessar a instância do Express utilizando `req.app`.


Por exemplo:

~~~js
//index.js
app.get("/viewdirectory", require("./mymiddleware.js"))
~~~

~~~js
//mymiddleware.js
module.exports = function (req, res) {
  res.send("The views directory is " + req.app.get("views"));
});
~~~
