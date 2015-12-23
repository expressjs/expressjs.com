<h3 id='app.use'>app.use([path,] function [, function...])</h3>

Monta as funções do [middleware](/{{ page.lang }}/guide/using-middleware.html) no caminho `path`. Quando `path` não for especificado, o valor padrão é de "/".

<div class="doc-box doc-info" markdown="1">
  A rota irá corresponder com qualquer caminho que seguir imediatamente com "<code>/</code>".
  Por exemplo: <code>app.use('/apple', ...)</code> irá corresponder com "/apple", "/apple/images",
  "/apple/images/news", e assim por diante. 
</div>

<div class="doc-box doc-info" markdown="1">
`req.originalUrl` em um *middleware* é a combinação de `req.baseUrl` e `req.path`, como mostrado no exemplo a seguir:

~~~js
app.use('/admin', function(req, res, next) {
  // GET 'http://www.exemplo.com/admin/new'
  console.log(req.originalUrl); // '/admin/new'
  console.log(req.baseUrl); // '/admin'
  console.log(req.path); // '/new'
  next();
});
~~~
</div>

A montagem de um *middleware* em um caminho 'path', fará com que a função 
*middleware* seja executada sempre que o caminho base da requisição corresponder 
com o caminho 'path'.

Como o padrão de `path` é "/", os *middlewares* montados sem um caminho 
específico serão executados em cada requisição do aplicativo.

~~~js
// esta middleware será executada em cada requisição do aplicativo
app.use(function (req, res, next) {
  console.log('Hora: %d', Date.now());
  next();
})
~~~

As funções *middlewares* são executadas sequencialmente portanto, a ordem 
de inclusão de cada uma é importante. 

~~~js
// esta middleware não irá permitir que a requisição vá além daqui.
app.use(function(req, res, next) {
  res.send('Olá mundo!');
})

// requisições nunca atingirão esta rota
app.get('/', function (req, res) {
  res.send('Bem vindo');
})
~~~
`path` pode ser uma *string* representando a rota, uma *string pattern*, 
uma expressão regular que irá combinar com as rotas, ou até mesmo uma 
*array* de combinações.


<div class="doc-box doc-notice" markdown="1">
Os *middlewares* abaixo são simples exemplos:
</div>

<div class="table-scroller">
<table class="doctable" border="1">

  <thead>
    <tr>
      <th> Tipo </th>
      <th> Exemplo </th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td>Path</td>
      <td>
        <pre><code class="language-js">// irá combinar com rotas iniciadas em /abcd
app.use('/abcd', function (req, res, next) {
  next();
})</code></pre>
      </td>
    </tr>

    <tr>
      <td>Path Pattern</td>
      <td>
        <pre><code class="language-js">// irá combinar com rotas iniciadas em /abcd e /abd
app.use('/abc?d', function (req, res, next) {
  next();
})

// irá combinar com rotas iniciadas em /abcd, /abbcd, /abbbbbcd e assim por diante
app.use('/ab+cd', function (req, res, next) {
  next();
})

// irá combinar com rotar iniciadas em /abcd, /abxcd, /abFOOcd, /abbArcd e assim por diante
app.use('/ab\*cd', function (req, res, next) {
  next();
})

// irá combinar com as rotas iniciadas em /ad e /abcd
app.use('/a(bc)?d', function (req, res, next) {
  next();
})</code></pre>
      </td>
    </tr>

    <tr>
      <td>Regular Expression</td>
      <td>
        <pre><code class="language-js">// irá combinar com rotas iniciadas em /abc e /xyz
app.use(/\/abc|\/xyz/, function (req, res, next) {
  next();
})</code></pre>
      </td>
    </tr>

    <tr>
      <td>Array</td>
      <td>
        <pre><code class="language-js">// irá combinar com rotas iniciadas em /abcd, /xyza, /lmn, e /pqr
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res, next) {
  next();
})</code></pre>
      </td>
    </tr>

  </tbody>

</table>
</div>

`function` pode ser uma função *middleware*, uma série de funções *middlewares*,
uma *array* de funções *middlewares*, ou uma combinação de todas elas.
Desde que [router](#router) e [app](#application) implementem a interface 
*middleware*, você pode utiliza-las como faria em qualquer outra função 
*middleware*.

<table class="doctable" border="1">

  <thead>
    <tr>
      <th>Uso</th>
      <th>Exemplo</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td>Middleware Única</td>
      <td>Você pode definir e montar uma middleware localmente.
<pre><code class="language-js">app.use(function (req, res, next) {
  next();
})
</code></pre>
Uma *router* é uma *middleware* válida.

<pre><code class="language-js">var router = express.Router();
router.get('/', function (req, res, next) {
  next();
})
app.use(router);
</code></pre>

Um aplicativo Express é uma *middleware* válida.
<pre><code class="language-js">var subApp = express();
subApp.get('/', function (req, res, next) {
  next();
})
app.use(subApp);
</code></pre>
      </td>
    </tr>

    <tr>
      <td>Série de Middleware</td>
      <td>
      Você pode especificar mais de uma função middleware em uma mesma rota.
<pre><code class="language-js">var r1 = express.Router();
r1.get('/', function (req, res, next) {
  next();
})

var r2 = express.Router();
r2.get('/', function (req, res, next) {
  next();
})

app.use(r1, r2);
</code></pre>
      </td>
    </tr>

    <tr>
      <td>Array</td>
      <td>
      Use uma array para agrupar logicamente *middlewares*.
      Se você passar uma array de middleware como primeiro ou único 
      parâmetro middleware, você deverá especificar a rota montada.
<pre><code class="language-js">var r1 = express.Router();
r1.get('/', function (req, res, next) {
  next();
})

var r2 = express.Router();
r2.get('/', function (req, res, next) {
  next();
})

app.use('/', [r1, r2]);
</code></pre>
      </td>
    </tr>

    <tr>
      <td>Combinação</td>
      <td>
      Você pode combinar todas as formas acima ao montar a middleware.
<pre><code class="language-js">function mw1(req, res, next) { next(); }
function mw2(req, res, next) { next(); }

var r1 = express.Router();
r1.get('/', function (req, res, next) { next(); });

var r2 = express.Router();
r2.get('/', function (req, res, next) { next(); });

var subApp = express();
subApp.get('/', function (req, res, next) { next(); });

app.use(mw1, [mw2, r1, r2], subApp);
</code></pre>
      </td>
    </tr>

  </tbody>

</table>

Segue alguns exemplos de utilização do *middleware* [express.static](/{{ page.lang }}/guide/using-middleware.html#middleware.built-in)
do aplicativo *Express*.

Serve conteúdo estático para o aplicativo a partir do diretório "public" da aplicação:

~~~js
// GET /style.css etc
app.use(express.static(__dirname + '/public'));
~~~

Monta o *middleware* em "/static" para servir conteúdo estático apenas para requisições com rotas iniciadas em "/static":

~~~js
// GET /static/style.css etc.
app.use('/static', express.static(__dirname + '/public'));
~~~

Desabilite o *logging* para requisições de conteúdos estáticos carregando o *logger* depois de seu *middleware*.

~~~js
app.use(express.static(__dirname + '/public'));
app.use(logger());
~~~

Serve arquivos estáticos a partir de diversos diretórios, mas atribui a procedência de "./public" acima dos outros:

~~~js
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
~~~
