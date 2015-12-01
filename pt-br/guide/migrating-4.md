---
layout: page
title: Migrando para o Express 4
menu: guide
lang: pt-br
---

# Migrando para o Express 4

<h2 id="overview">Visão geral</h2>

O Express 4 tem mudanças bem significativas em relação ao Express 3. Isso quer dizer que uma app desenvolvida em Express 3 não funcionará se você simplesmente atualizar suas dependência para o Express 4.

Este artigo trata dos seguintes assuntos:

<ul class="doclist">
  <li><a href="#changes">Mudanças do Express 4.</a></li>
  <li><a href="#example-migration">Um exemplo</a> de migração de uma app desenvolvida em Express 3, para o Express 4.</li>
  <li><a href="#app-gen">Atualizando o `app generator` para o Express 4.</a></li>
</ul>

<h2 id="changes">Mudanças do Express 4</h2>

As principais mudanças do Express 4 são:

<ul class="doclist">
  <li><a href="#core-changes">Mudanças no ´core´ do Express e no sistema de middleware: </a>A depedência de Connect e de middlewares embutidos foram removidas. Então você mesmo precisa adicionar os middlewares que vai utilizar.
  </li>
  <li><a href="#routing">Mudanças no sistema de rotas.</a></li>
  <li><a href="#other-changes">Várias outras mudanças.</a></li>
</ul>

Veja também:

* [Novas features do Express 4.x.](https://github.com/strongloop/express/wiki/New-features-in-4.x)
* [Migrando do Express 3.x para 4.x](https://github.com/strongloop/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Mudanças no core do Express e no sistema de middleware.
</h3>

O Express 4 não depende mais de Connect, e removeu todas os middlewares embutidos, exceto `express.static`. Isso quer dizer que agora o Express é um framework de roteamento e middleware, independente; o versionamento e releases do Express não mais afetados por atualizações dos middlewares.

Com a remoção de middlewares embutidos, você precisa adicionar explicitamente todos os middlewares necessários à sua aplicação. Simplesmente siga esses três passos:

1. Instale o módulo: `npm install --save <module-name>`
2. Faça a requisição do módulo na sua app: `require('module-name')`
3. Utilize o módulo conforme a própria documentação do mesmo: `app.use( ... )`

A tabela a seguir lista os middlewares do Express 3 e seus correspondentes no Express 4.

<table class="doctable" border="1">
<tr><th>Express 3</th><th>Express 4</th></tr>
<tr><td><code>express.bodyParser</code></td>
<td><a href="https://github.com/expressjs/body-parser">body-parser</a> +
<a href="https://github.com/expressjs/multer">multer</a></td></tr>
<tr><td><code>express.compress</code></td>
<td><a href="https://github.com/expressjs/compression">compression</a></td></tr>
<tr><td><code>express.cookieSession</code></td>
<td><a href="https://github.com/expressjs/cookie-session">cookie-session</a></td></tr>
<tr><td><code>express.cookieParser</code></td>
<td><a href="https://github.com/expressjs/cookie-parser">cookie-parser</a></td></tr>
<tr><td><code>express.logger</code></td>
<td><a href="https://github.com/expressjs/morgan">morgan</a></td></tr>
<tr><td><code>express.session</code></td>
<td><a href="https://github.com/expressjs/session">express-session</a></td></tr>
<tr><td><code>express.favicon</code></td>
<td><a href="https://github.com/expressjs/serve-favicon">serve-favicon</a></td></tr>
<tr><td><code>express.responseTime</code></td>
<td><a href="https://github.com/expressjs/response-time">response-time</a></td></tr>
<tr><td><code>express.errorHandler</code></td>
<td><a href="https://github.com/expressjs/errorhandler">errorhandler</a></td></tr>
<tr><td><code>express.methodOverride</code></td>
<td><a href="https://github.com/expressjs/method-override">method-override</a></td></tr>
<tr><td><code>express.timeout</code></td>
<td><a href="https://github.com/expressjs/timeout">connect-timeout</a></td></tr>
<tr><td><code>express.vhost</code></td>
<td><a href="https://github.com/expressjs/vhost">vhost</a></td></tr>
<tr><td><code>express.csrf</code></td>
<td><a href="https://github.com/expressjs/csurf">csurf</a></td></tr>
<tr><td><code>express.directory</code></td>
<td><a href="https://github.com/expressjs/serve-index">serve-index</a></td></tr>
<tr><td><code>express.static</code></td>
<td><a href="https://github.com/expressjs/serve-static">serve-static</a></td></tr>
</table>

Aqui está a [lista completa](https://github.com/senchalabs/connect#middleware) de middlewares Express 4.

Na maioria dos casos, você pode simplesmente trocar a antiga versão 3 pelo middleware correspondente no Express 4. Para mais detalhes, veja o documentação dos módulos no GitHub.


<h4 id="app-use"><code>app.use</code>parâmetros aceitos</h4>

Na versão 4 agora você pode carregar middlewares em uma ´path´ com uma variável de parâmetro e ler o valor deste parâmetro a partir do `handler` (manipulador) da rota.
Por exemplo:

<pre><code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
});
</code></pre>
<h3 id="routing">
O sistema de roteamento
</h3>

As aplicações agora carregam implicitamente middlewares de roteamento, então você não precisa mais se preocupar com a ordem de carregamento dos middlewares em relação ao middleware `router`.
O modo como você define rotas não mudou, mas o sistema de roteamento tem agora duas novas funcionalidades para lhe ajudar na organização das suas rotas:


{: .doclist }
* Um novo método, `app.route()`, to create chainable route handlers for a route path. para criar handlers (manipuladores) de rotas encadeados para um ´path´.
* Uma nova classe, `express.Router`, para criar montagens modulares de ´handlers´.

<h4 id="app-route">Método <code>app.route()</code></h4>

O novo método `app.route()` permite criar encadeamentos de manipuladores de rota (route handlers) para um `path` de uma rota.
Como o `path` é especificado em um único local, isto facilita a criação de rotas modulares e reduz a redundância. Para mais informações sobre rotas, veja na [documentação `Router()`](/4x/api.html#router).


Nesse exemplo um encadeamento de handlers é definido para uma rota usando `app.route()`.

<pre><code class="language-javascript" translate="no">
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
</code></pre>

<h4 id="express-router">Classe <code>express.Router</code></h4>

Uma outra funcionalidade para ajudar a organização de rotas é uma nova classe, `expless.Router`, que você pode usar para criar montagens modulares de `route handlers` (manipuladores de rota).
Uma instância de `Router` é um completo middleware e sistema de roteamento; por isso é frequentemente chamado de uma "mini-app".

O exemplo seguinte cria um ´router´ como um módulo, carrega nele um middleware, define algumas rotas, e monta tudo isso em uma `path` na aplicação principal.

Crie no diretório da app um arquivo router chamado `birds.js`, com o seguinte conteúdo:

<pre><code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware específico para esse router.
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define a rota da home page
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define a rota about
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
</code></pre>

Então, carregue o módulo router na app:

<pre><code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code></pre>

Agora a app será capaz de manipular requisições para `/birds` e `birds/about`, além de chamar o middleware `timeLog` específico para a rota.


<h3 id="other-changes">
Outras mudanças
</h3>

A tabela seguinte lista outras pequenas, mas importantes mudanças no Express 4.


<table class="doctable" border="1">
<tr>
<th>Objeto</th>
<th>Descrição</th>
</tr>
<tr>
<td>Node</td>
<td>O Express 4 requer o Node 0.10.x ou posterior e não suporta a versão 0.8.x do Node</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
O módulo `http` não é mais necessário, a menos que você queira trabalhar diretamente com ele (socket.io/SPDY/HTTPS). A aplicação pode ser inicializada usando `app.listen()`.
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
`app.configure()` foi removido.  Utilize
`process.env.NODE_ENV` ou `app.get('env')` para detectar o ambiente e configurar corretamente a app.
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
A propriedade `json spaces` da aplicação, por padrão está desabilitada no Express 4.

</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
Utiliza `req.accepts()`, `req.acceptsEncodings()`,
`req.acceptsCharsets()`, e `req.acceptsLanguages()`.
</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
Não resolve mais URLs relativas.
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
Era um array; agora é um objeto.
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
Era uma função; agora é um objeto.
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
Mudou para `res.headersSent`.
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
Agora disponível como `app.mountpath`.
</td>
</tr>
<tr>
<td markdown="1">
`res.on('header')`
</td>
<td markdown="1">
Removido.
</td>
</tr>
<tr>
<td markdown="1">
`res.charset`
</td>
<td markdown="1">
Removido.
</td>
</tr>
<tr>
<td markdown="1">
`res.setHeader('Set-Cookie', val)`
</td>
<td markdown="1">
Funcionalidade agora está limitada a definir valor básico de cookie. Utilize `res.cookie()` para funcionalidades adicionais.

</td>
</tr>
</table>

<h2 id="example-migration">Exemplo de migração de aplicação</h2>

Aqui está um exemplo de migração de uma applicação Express 3 para Express 4.
Os arquivos de interesse são `app.js` e `package.json`.

<h3 id="">
Version 3 app
</h3>

<h4 id=""><code>app.js</code></h4>

Considere uma aplicação Express 3 com o seguinte arquivo `app.js`:

<pre><code class="language-javascript" translate="no">
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code></pre>

<h4 id=""><code>package.json</code></h4>

No arquivo `package.json` da versão 3 pode aparecer algo como:

<pre><code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.12.0",
    "jade": "*"
  }
}
</code></pre>

<h3 id="">
Processo
</h3>
Inicie o processo de migração instalando os middlewares necessários para a aplicação em Express 4, e atualize o Express e o Jade para suas versões mais novas com o seguinte comando:


<pre><code class="language-sh" translate="no">
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest jade@latest --save
</code></pre>

Faça as seguintes alterações em `app.js`:

1. Os middlewares `express.favicon`,
    `express.logger`, `express.methodOverride`,
    `express.session`, `express.bodyParser` and
    `express.errorHandler` não estão mais embutidos no Express. Você precisa instalá-los manualmente e depois carregá-los na aplicação.
2. Você não precisa mais carregar `app.router`. Isto não é válido em um objeto app do Express 4, então remova `app.use(app.router)`.

3. Certifique-se de que os middlewares sejam carregados na ordem correta - carregue `errorHandler` depois do carregamento das rotas.


<h3 id="">App versão 4</h3>

<h4 id=""><code>package.json</code></h4>

Executando o comando `npm` mostrado anteriormente o arquivo `package.json` será atualizado como a seguir:


<pre><code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "body-parser": "^1.5.2",
    "errorhandler": "^1.1.1",
    "express": "^4.8.0",
    "express-session": "^1.7.2",
    "jade": "^1.5.0",
    "method-override": "^2.1.2",
    "morgan": "^1.2.2",
    "multer": "^0.1.3",
    "serve-favicon": "^2.0.1"
  }
}
</code></pre>

<h4 id=""><code>app.js</code></h4>

Remova os códigos inválidos, carregue os middlewares requeridos, e faça outras alterações que forem necessárias. Então o arquivo `app.js` ficará como isto:

<pre><code class="language-javascript" translate="no">
var http = require('http');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code></pre>


<div class="doc-box doc-info" markdown="1">
A menos que você queira trabalhar diretamente com o módulo `http` (socket.io/SPDY/HTTPS), o carregamento deste não é necessário e a aplicação pode ser inicializada da seguinte maneira:

<pre><code class="language-js">app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});</code></pre>
</div>

<h3 id="">Rodando a app</h3>

Com isso, o processo de migração está completo, e agora a app é uma aplicação Express 4. Para confirmar, inicialize a app com o seguinte comando:

<pre><code class="language-sh" translate="no">
$ node .
</code></pre>

Acesse [http://localhost:3000](http://localhost:3000) e veja a home page renderizada pelo Express 4.

<h2 id="app-gen">Atualização do `generator` para o Express 4</h2>

A ferramenta de linha de comando para gerar aplicações em Express ainda é `express`, mais para atualizar para a versão nova, você precisa desinstalar o a versão antiga e depois instalar a nova.


<h3 id="">Instalação </h3>

Se o gerador de apps Express 3 está instalado no seu sistema, você precisa desinstalá-lo como mostrado a seguir:

<pre><code class="language-sh" translate="no">
$ npm uninstall -g express
</code></pre>
Dependendo das configurações de privilégios dos seus arquivos e diretórios, você precisará rodar esse comando com `sudo`.

Agora instale o novo `generator`:

<pre><code class="language-sh" translate="no">
$ npm install -g express-generator
</code></pre>

Novamente, dependendo das configurações de privilégios dos seus arquivos e diretórios, você precisará rodar o comando acima com `sudo`.

Agora o comando `express` no seu sistema está atualizado para o `generator` do Express 4.

<h3 id="">Mudanças no generator </h3>

A maioria dos comandos e opções são os mesmos, com as seguinte exeções:


{: .doclist }
* A opção  `--sessions` foi removida.
* A opção `--jshtml` foi removida.
* Adicionada a opção `--hogan` para dar suporte a [Hogan.js](http://twitter.github.io/hogan.js/).

<h3 id="">Exemplos</h3>

Execute os seguintes comandos para criar uma aplicação em Express 4:

<pre><code class="language-sh" translate="no">
$ express app4
</code></pre>
Olhando o conteúdo de `app4.js`, você notará que todos os middlewares requeridos para a app (exceto `express.static`), são carregados como módulos independentes e o middleware `router` não é mais carregado explicitamente na app.

Você também notará que o arquivo `app.js` é agora um módulo do Node, comparando com a app independente criada pelo antigo generator.

Após instalar as dependências, inicialize a app usando o seguinte comando:


<pre><code class="language-sh" translate="no">
$ npm start
</code></pre>


Olhando no início do script no arquivo `package.json`, você notará que o comando que inicia o app é `node ./bin/www`, enquanto que no Express 3 era `node app.js`.



Uma vez que o arquivo `app.js` criado pelo generator é agora um módulo Node, ele não pode mais ser inicializado como uma app independente (a não ser que você modifique o código).
O arquivo `app.js` precisa ser carregado e inicializado em um arquivo Node. Neste caso o arquivo Node é `./bin/www`.

Os diretórios `bin`e `www` não são obrigatórios para criação ou incialização de uma app no Express 4. Isto é apenas uma sugestão do generator, mas você pode modificar livremente conforme sua necessidade.


Para se livrar do diretório `www` e manter as coisas como era no Express 3, exclua a linha que contém `module.exports = app;` no fim do arquivo `app.js`, e coloque no lugar o seguinte código:

<pre><code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code></pre>

Certifique-se de carregar o módulo `debug` no topo de `app.js`, com o seguinte código:

<pre><code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code></pre>

Em seguida, altere `"start": "node ./bin/www"` no arquivo `package.json` para `"start": "node app.js"`.

Com isto, você mudou as funcionalides de `./bin/www` de volta para `app.js`. Não que isso seja recomendável, mas o exercício ajuda a entender como `./bin/www` funciona e porque `app.js` não é mais inicializada por contra própria.
