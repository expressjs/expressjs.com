---
layout: page
title: Migrando para o Express 4
menu: guide
lang: pt-br
---

# Migrando para o Express 4

<h2 id="overview">Visão Geral</h2>

Express 4 é uma alteração de ruptura do Express 3. Isso significa que um aplicativo Express 3 existente não irá funcionar
se você atualizar a versão do Express nas suas dependências.

Este artigo cobre:

<ul class="doclist">
  <li><a href="#changes">Mudanças no Express 4.</a></li>
  <li><a href="#example-migration">Um exemplo</a> de migração de um aplicativo do Express 3 para o Express 4.</li>
  <li><a href="#app-gen">Fazendo o upgrade para o gerador de aplicativos do Express 4.</a></li>
</ul>

<h2 id="changes">Mudanças no Express 4</h2>

Existem várias mudanças significativas no Express 4:

<ul class="doclist">
  <li><a href="#core-changes">Mudanças no núcleo e sistemas middleware do Express.</a> As
dependências no Connect e middlewares integrados foram removidos, de forma que você mesmo deve incluir os middlewares.
  </li>
  <li><a href="#routing">Mudanças no sistema de roteamento.</a></li>
  <li><a href="#other-changes">Várias outras mudanças.</a></li>
</ul>

Consulte também:

* [Novos recursos no 4.x.](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [Migrando do 3.x para o 4.x.](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Mudanças no núcleo e sistemas middleware do Express
</h3>

O Express 4 não depende mais do Connect, e remove todos os
middlewares integrados do seu núcleo, exceto pela função
`express.static`. Isso significa que o
Express é agora um framework web de middleware e roteamento
independente, e que o versionamento e as liberações do Express não
são mais afetadas por atualizações nos middlewares.

Sem os middlewares integrados, você deve incluir explicitamente todos os middlewares necessários para a execução do seu aplicativo. Simplesmente siga esses passos:

1. Instale o módulo: `npm install --save <module-name>`
2. No seu aplicativo, solicite o módulo: `require('module-name')`
3. Use o módulo de acordo com sua documentação: `app.use( ... )`

A tabela a seguir lista os middlewares do Express 3 e suas contrapartes no Express 4.

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

Aqui está a [lista completa](https://github.com/senchalabs/connect#middleware) de middlewares do Express 4.

Na maioria dos casos, é possível simplesmente substituir a antiga versão 3 do middleware pela sua contraparte do Express4. Para obter detalhes, consulte a documentação do módulo no GitHub.

<h4 id="app-use">O <code>app.use</code> aceita parâmetros</h4>

Na versão 4 é possível utilizar uma variável de parâmetro para
definir o caminho onde as funções do middleware estão carregadas, e
em seguida ler o valor do parâmetro a partir do manipulador de rota.
Por exemplo:

<pre>
<code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
});
</code>
</pre>
<h3 id="routing">
O sistema de roteamento
</h3>

Os aplicativos agora carregam implicitamente middlewares de
roteamento, para que não seja mais necessário se preocupar com a
ordem em que os middlewares são carregados no que diz respeito ao
middleware `router`.

A forma como as rotas são definidas são as mesmas, mas  o
sistema de roteamento possui dois novos recursos para ajudá-lo a
organizar suas rotas:

{: .doclist }
* Um novo método, `app.route()`, para criar
manipuladores de rotas encadeáveis para um caminho de rota.
* Uma nova classe, `express.Router`, para
criar manipuladores de rotas modulares montáveis

<h4 id="app-route">O método <code>app.route()</code></h4>

O novo método `app.route()` permite que sejam
criados manipuladores de rotas encadeáveis para um caminho de rota. Como o caminho é especificado em uma localização única, criar rotas
modulares é útil, já que reduz redundâncias e erros tipográficos. Para
obter mais informações sobre rotas, consulte a [`documentação do Router()` ](/{{ page.lang }}/4x/api.html#router).

Aqui está um exemplo de manipuladores de rotas encadeáveis que
são definidos usando a função `app.route()`.

<pre>
<code class="language-javascript" translate="no">
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
</code>
</pre>

<h4 id="express-router">classe <code>express.Router</code></h4>

O outro recurso que ajuda na organização das rotas é uma nova
classe, `express.Router`, que pode ser usada para
criar manipuladores de rotas modulares montáveis. Uma instância de `Router` é um middleware e sistema
de roteamento completo; por essa razão ela é frequentemente referida
como um "mini-aplicativo"

O seguinte exemplo cria um roteador como um módulo, carrega o
middleware nele, define algumas rotas, e monta-o em um caminho no
aplicativo principal.

Por exemplo, cria um arquivo roteador chamado
`birds.js` no diretório do aplicativo, com o
conteúdo a seguir:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
</code>
</pre>

Em seguida, carregue o módulo roteador no aplicativo:

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

O aplicativo será agora capaz de manipular solicitações aos
caminhos `/birds` e `/birds/about`,
e irá chamar o middleware `timeLog`
que é específico para a rota.

<h3 id="other-changes">
Outras mudanças
</h3>

A seguinte tabela lista outras pequenas, porém importantes, mudanças no Express 4:

<table class="doctable" border="1">
<tr>
<th>Objeto</th>
<th>Descrição</th>
</tr>
<tr>
<td>Node.js</td>
<td>O Express 4 requer o Node.js 0.10.x ou posterior e descartou o
suporte ao Node.js 0.8.x.</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
O módulo `http` não é mais necessário, a não ser
que você precise trabalhar diretamente com ele (socket.io/SPDY/HTTPS). O
aplicativo pode ser iniciado usando a função `app.listen()`.
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
A função `app.configure()` foi removida.  Use a função `process.env.NODE_ENV` ou
`app.get('env')` para detectar o ambiente e
configurar o aplicativo de acordo com ele.
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
A propriedade de aplicativo `json spaces` está
desativada por padrão no Express 4.
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
Use `req.accepts()`, `req.acceptsEncodings()`,
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
Era uma matriz; agora é um objeto.
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
Mudado para `res.headersSent`.
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
A funcionalidade é agora limitada a configurar o valor básico do
cookie. Use `res.cookie()` para funcionalidades
adicionais.
</td>
</tr>
</table>

<h2 id="example-migration">Exemplo de migração de aplicativo</h2>

Aqui está um eemplo de migração de um aplicativo Express 3 para
o Express 4.
Os arquivos de interesse são `app.js` e `package.json`.

<h3 id="">
Aplicativo da Versão 3
</h3>

<h4 id=""><code>app.js</code></h4>

Considere um aplicativo do Express v.3 com o seguinte arquivo `app.js`:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
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
</code>
</pre>

<h4 id=""><code>package.json</code></h4>

O arquivo `package.json` que acompanha a
versão 3 pode parecer com algo assim:

<pre>
<code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.12.0",
    "pug": "*"
  }
}
</code>
</pre>

<h3 id="">
Processo
</h3>

Comece o processo de migração instalando os middlewares
necessários para o aplicativo Express 4 e atualizando o Express e o
Pug para as suas respectivas versões mais recentes com o seguinte
comando:

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

Faça as seguintes alterações no `app.js`:

1. As funções de middleware integradas do Express `express.favicon`,
    `express.logger`, `express.methodOverride`,
    `express.session`, `express.bodyParser` e
    `express.errorHandler` não estão mais disponíveis no objeto `express`.  É
preciso instalar manualmente as alternativas e carregá-las no aplicativo.

2. Não é mais necessário carregar a função `app.router`.
    Ela não é um objeto válido para aplicativos Express 4, portanto
remova o código do `app.use(app.router);`.

3. Certifique-se deque as funções de middleware sejam carregadas na ordem correta - carregar a
`errorHandler` após carregar as rotas de aplicativo.

<h3 id="">Aplicativo da Versão 4</h3>

<h4 id=""><code>package.json</code></h4>

A execução do comando `npm` acima irá
atualizar o `package.json` como a seguir:

<pre>
<code class="language-javascript" translate="no">
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
    "pug": "^2.0.0-beta6",
    "method-override": "^2.1.2",
    "morgan": "^1.2.2",
    "multer": "^0.1.3",
    "serve-favicon": "^2.0.1"
  }
}
</code>
</pre>

<h4 id=""><code>app.js</code></h4>

Em seguida, remova o código inválido, carregue o middleware
necessário e faça outras alterações conforme necessárias. O arquivo `app.js` irá parecer com isso:

<pre>
<code class="language-javascript" translate="no">
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
app.set('view engine', 'pug');
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
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
A não ser que precise trabalhar diretamente com
o módulo `http` (socket.io/SPDY/HTTPS),
carregá-lo não é necessário, e o aplicativo pode ser iniciado
simplesmente desta forma:
<pre>
<code class="language-js" translate="no">app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});</code>
</pre>
</div>

<h3 id="">Execute o aplicativo</h3>

O processo de migração está concluído, e o aplicativo é agora
um aplicativo Express 4. Para confirmar, inicie o aplicativo usando o
seguinte comando:

```console
$ node .
```

Carregue [http://localhost:3000](http://localhost:3000)
  e veja a página inicial sendo renderizada pelo Express 4.

<h2 id="app-gen">Fazendo o upgrade para o gerador de aplicativos do
Express 4</h2>

A ferramenta de linha de comandos para gerar um aplicativo
Express ainda é a `express`, mas para fazer o
upgrade para a nova versão , é preciso desinstalar o gerador de
aplicativos Express 3 e, em seguida, instalar o novo `express-generator`.

<h3 id="">Instalação </h3>

Se já tiver o gerador de aplicativos do Express 3 instalado no
seu sistema, é preciso desinstalá-lo:

```console
$ npm uninstall -g express
```

Dependendo de como os seus privilégios de arquivos e diretórios estão
configurados, pode ser necessário executar este comando com `sudo`.

Agora instale o novo gerador:

```console
$ npm install -g express-generator
```

Dependendo de como os seus privilégios de arquivos e diretórios
estão configurados, pode ser necessário executar este comando com
`sudo`.

Agora o comando `express` no seu sistema está
atualizado para o gerador do Express 4.

<h3 id="">Mudanças no gerador de aplicativos </h3>

As opções e o uso do comando permanecem em grande parte as
mesmas, com as seguintes exceções:

{: .doclist }
* Foi removida a opção `--sessions`.
* Foi removida a opção `--jshtml`.
* Foi incluída a opção `--hogan` para
suportar o [Hogan.js](http://twitter.github.io/hogan.js/).

<h3 id="">Exemplo</h3>

Execute o seguinte comando para criar um aplicativo do Express 4:

```console
$ express app4
```

Se olhar o conteúdo do arquivo `app4/app.js`,
você verá que todas as funções de middleware (exceto
`express.static`) que são requeridas pelo aplicativo
estão a carregadas como módulos independentes, e o middleware de
`router` não está mais explicitamente carregado no
aplicativo.

Você irá também notar que o arquivo `app.js` é
agora um módulo do Node.js, ao invés do aplicativo independente
gerado pelo antigo gerador.

Após instalar as dependências, inicie o aplicativo usando o
seguinte comando:

```console
$ npm start
```

Se olhar o script de inicialização npm no arquivo
`package.json`, você irá notar que o comando real
que inicia o aplicativo é o `node ./bin/www`, que
antes era `node app.js` no Express 3.

Como o arquivo `app.js` que foi gerado pelo
gerador do Express 4 é agora um módulo do Node.js, ele não pode mais
ser iniciado independentemente como um aplicativo
(a não ser que modifique o código). O módulo deve ser carregado em um
arquivo Node.js e iniciado através do arquivo Node.js. O arquivo
Node.js é `./bin/www`
neste caso.

Nem o diretório `bin` e nem o arquivo sem
extensão `www` são obrigatórios para a criação ou
inicialização de um aplicativo Express. Eles são apenas sugestões
feitas pelo gerador, portanto fique a vontade para modificá-los para
adequá-los às suas necessidades.

Se livre do diretório `www` e mantenha as
coisas "da maneira do Express 3", exclua a linha que diz
`module.exports = app;` no final do arquivo
`app.js`, em seguida cole o seguinte código em seu
lugar:

<pre>
<code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code>
</pre>

Assegure-se de carregar o módulo `debug` em
cima do arquivo `app.js` usando o seguinte código:

<pre>
<code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code>
</pre>

Em seguida, mude o `"start": "node ./bin/www"`
no arquivo `package.json` para `"start": "node
app.js"`.

Você agora moveu a funcionalidade do
`./bin/www` de volta para o
`app.js`.  Esta mudança não é recomendada, mas o
exercício ajuda você a entender como o arquivo
`./bin/www` funciona, e porque o arquivo
`app.js` não é mais iniciado por conta própria.
