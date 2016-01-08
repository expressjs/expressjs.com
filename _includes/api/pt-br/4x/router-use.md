<h3 id='router.use'>router.use([path], [function, ...] function)</h3>

Usa a `function` middleware passada, com um caminho de montagem opcional `path`, que padroniza para "/".

Esse método é similar a [app.use()](#app.use). Um exemplo simples e caso de uso é descrito abaixo.
Veja [app.use()](#app.use) para mais informações.

Um Middleware é como um encanamento, a requisição inicia no primeiro middleware que você definiu
e trabalha por toda a pilha de middleware processando para cada caminho que ele encontra.

~~~js
var express = require('express');
var app = express();
var router = express.Router();

// loger simples para as requisições desse roteador
// todas as requisições para esse roteador irão acertar primeiro esse middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// isso será chamado apenas se o caminho começar com /bar a partir do ponto de montagem
router.use('/bar', function(req, res, next) {
  // ... talvez algum log adicional em /bar ...
  next();
});

// sempre será chamado
router.use(function(req, res, next) {
  res.send('Hello World');
});

app.use('/foo', router);

app.listen(3000);
~~~

O caminho "mount" é desmembrado e _not_ visível à `function` middleware.
O principal efeito dessa característica é que o middleware montado pode operar sem
mudanças no código independentemente do seu "prefix" no nome do caminho.

A ordem em que você define o middleware com `router.use()` é muito impoertante.
Eles são chamados sequencialmente, assim a ordem define a precedência do middleware.
Por exemplo, geralmente um logger é um primeiro middleware que você usaria, então toda
requisição é logada.

~~~js
var logger = require('morgan');

router.use(logger());
router.use(express.static(__dirname + '/public'));
router.use(function(req, res){
  res.send('Hello');
});
~~~

Agora suponha que você queria ignorar requisições de log para arquivos estáticos,
mas continue a logar rotas e middlewares definidos após `logger()`. Você simplesmente
move o `static()` acima:

~~~js
router.use(express.static(__dirname + '/public'));
router.use(logger());
router.use(function(req, res){
  res.send('Hello');
});
~~~

Outro exemplo concreto é servir arquivos de multiplos diretórios, dando precendência
a "./public" sobre os outros:

~~~js
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
~~~

O método `router.use()` também suporta parâmetros nomeados de modo que seus pontos
de montagem para outras rotas podem se beneficiar da precarga utilizando parâmetros nomeados.
