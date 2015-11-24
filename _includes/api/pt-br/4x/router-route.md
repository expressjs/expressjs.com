<h3 id='router.route'>router.route(path)</h3>

Retorna uma instância de uma única rota a qual você pode então usar para manusear
verbos HTTP com um middleware opcional. Use `router.route()` para evitar nomes de
rota duplicados e assim erros de grafia.

Constuído com base no exemplo `router.param()` acima, o seguinte código demonstra a
utilização de `router.route()` para especificar vários métodos manipuladores HTTP.

~~~js
var router = express.Router();

router.param('user_id', function(req, res, next, id) {
  // usuário exemplo, seria na verdade buscado do DB, etc...
  req.user = {
    id: id,
    name: 'TJ'
  };
  next();
});

router.route('/users/:user_id')
.all(function(req, res, next) {
  // roda para todos os verbos HTTP primeiro
  // pense nisso como uma rota middleware específica!
  next();
})
.get(function(req, res, next) {
  res.json(req.user);
})
.put(function(req, res, next) {
  // apenas um exemplo de talvez atualizar o usuário
  req.user.name = req.params.name;
  // salvando o usuário ... etc
  res.json(req.user);
})
.post(function(req, res, next) {
  next(new Error('not implemented'));
})
.delete(function(req, res, next) {
  next(new Error('not implemented'));
})
~~~

Essa abordagem reutiliza o único caminho '/users/:user_id' e adiciona manipuladores
para vários métodos HTTP.
