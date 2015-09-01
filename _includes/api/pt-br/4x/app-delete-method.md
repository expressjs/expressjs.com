<h3 id='app.delete.method'>app.delete(path, callback [, callback ...])</h3>

Routes HTTP DELETE requisitam à path específica com as funções callback específicas.
Para mais informações, veja o [routing guide](/guide/routing.html).

Você pode fornecer multiplas funções callback que se comportam como middleware, com exceção de
que esses callbacks podem chamar `next('route')` para ignorar a(s) restante(s) route
callback(s). Você pode usar este mecanismo para impor condições prévias em uma route, então passar
o controle para routes subsequentes se não houver razão para continuar na route atual.

~~~js
app.delete('/', function (req, res) {
  res.send('DELETE request to homepage');
});
~~~
