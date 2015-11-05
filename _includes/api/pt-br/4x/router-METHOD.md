<h3 id='router.METHOD'>router.METHOD(path, [callback, ...] callback)</h3>

Os métodos `router.METHOD()` fornecem a funcionalidade de roteamento no Express, onde METHOD é um dos métodos HTTP, como GET, PUT, POST e assim por diante (todos em minúsculas). Assim, os métodos atualmente disponíveis são `router.get()`, `router.post()`, `router.put()` e etc. 

Você pode fornecer múltiplos callbacks, e todos serão tratatos igualmente, e se comportarão como middlewares, exceto que esses callbacks podem invocar `next('route')` para pular os callbacks restantes na rota. Você pode utilizar essa funcionalidade para criar pré condições em uma rota e então passar o controle para rotas seguintes quando não houver mais razão para continuar na rota atual.

O trecho seguinte ilustra a definição de rota mais simples possível.
O Express traduz a string path para uma expressão regular, usada internamente para casas entradas de requisições.
Query strings _não_ são consideradas quando executando esses casamentos de entradas de requisições, por exemplo, "GET /" casará com a seguinte rota, tal como "GET /?name=tobi".


~~~js
router.get('/', function(req, res){
  res.send('hello world');
});
~~~

Você pode também utilizar expressões regulares &mdash; úteis quando você tem uma regra bem específica. O exemplo seguinte casa com "GET /commits/71dbb9c" e também com "GET /commits/71dbb9c..4c084f9".


~~~js
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || 'HEAD';
  res.send('commit range ' + from + '..' + to);
});
~~~
