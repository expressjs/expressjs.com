<h3 id='router'>Router([options])</h3>

Cria um novo Router conforme o seguinte:

~~~js
var router = express.Router([options]);
~~~

O parâmetro opcional `options` especifica o comportamento do roteador.

<div class="table-scroller" markdown="1">

| Property        | Description                                     | Default     | Availability  |
|-----------------|-------------------------------------------------|-------------|---------------|
| `caseSensitive` | Habilita a diferenciação de maiúsculas e minúsculas. | Desabilitado por padrão, tratando "/Foo" e "/foo" como o mesmo.|  |
| `mergeParams`   | Preserva os valores `req.params` do roteador pai. Se o pai e o filho possuem nomes conflitantes, o valor do filho tem precedência.| `false` | 4.5.0+ |
| `strict`        | Habilita a rota estrita. | Desabilitado por padrão, "/foo" e "/foo/" são tratados como o mesmo peo roteador.| &nbsp; |

</div>

Você pode adicionar middlewares e métodos de rotas HTTP (tais como `get`, `put`, `post`, e assim por diante)
ao `router` assim como uma aplicação.

~~~js
// invocado para quaisquer requisições passadas a esse router
router.use(function(req, res, next) {
  // .. alguma lógica aqui .. como qualquer outro middleware
  next();
});

// irá tratar qualquer requisição que termine em /events
// depende onde o roteador é "use()'d"
router.get('/events', function(req, res, next) {
  // ..
});
~~~

Você pode usa um roteador para uma URL raiz em particular dessa maneira separando suas rotas em arquivos ou até mini-apps.

~~~js
// somente requisições para /calendar/* serão enviadas para o nosso "router"
app.use('/calendar', router);
~~~
