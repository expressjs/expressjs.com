<h3 id='app.route'>app.route(path)</h3>

Retorna uma instância de uma única rota, que você pode usar para lidar com verbos HTTP com middleware opcional.
Use `app.route()` para evitar nomes duplicados de rota (e assim, erros de digitação).

~~~js
var app = express();

app.route('/events')
.all(function(req, res, next) {
  // roda para todos os verbos de HTTP primeiro
  // pense nisso como um middleware específico da rota!
})
.get(function(req, res, next) {
  res.json(...);
})
.post(function(req, res, next) {
  // talvez adicionar um novo evento...
})
~~~
