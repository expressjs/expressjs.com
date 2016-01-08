<h3 id='app.get.method'>app.get(path, callback [, callback ...])</h3>

Rotas de requisições HTTP GET para o caminho especificado com as funções de *callback* especificados.
Para obter mais informações, consulte o [guia de roteamento](/guide/routing.html).

Você pode oferecer múltiplas funções de *callback* que se comportam exatamente como *middleware*,
exceto esses *callbacks* podem chamar `next('route')` para ignorar o(s) *callback(s)* restante(s).
Você pode usar esse mecanismo para impor pré-condições em uma rota, em seguida, passar o controle
de rotas subseqüentes, se não há nenhuma razão para continuar com a rota atual.

~~~js
app.get('/', function (req, res) {
  res.send('GET request to homepage');
});
~~~
