<h3 id='app.put.method'>app.put(path, callback [, callback ...])</h3>

Roteia requisições HTTP PUT para um path especificado com funções callback específicadas.
Para mais informações, veja o [guia roteamento](/guide/routing.html).

Você pode fornecer múltiplos callbacks que se comportaram como middlewares, exceto que esses callbacks poderão chamar `next('route')` para ignorar os callbacks restantes da rota. Você pode utilizar esse mecanismo para impor pré condições em uma rota e passar o controle para as rotas subsequentes quando não houver mais razão para continuar processando a rota atual.

~~~js
app.put('/', function (req, res) {
  res.send('PUT request to homepage');
});
~~~
