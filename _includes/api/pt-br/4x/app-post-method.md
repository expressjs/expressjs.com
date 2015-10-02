<h3 id='app.post.method'>app.post(path, callback [, callback ...])</h3>

Roteia requisições HTTP POST para um `path` especificando funções callback.
Para mais informações, veja o guia [roteamento](/guide/routing.html).

Você pode fornecer múltiplas funções callbacks que se comportam como middlewares, porém esses callbacks podem invocar `next('route')` para ignorar os callbacks restantes da rota. Você pode usar esse mecanismo para impor pré condições em uma rota, e então passar o controle para as rotas na sequência se não é mais necessário continuar na rota atual. 

~~~js
app.post('/', function (req, res) {
  res.send('POST request to homepage');
});
~~~
