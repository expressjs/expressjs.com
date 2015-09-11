---
layout: page
title: Tratamento de erros no Express
menu: guide
lang: pt-br
---

# Tratamento de erros

Definimos middlewares de tratamento de erros (middlweares do tipo error-handling) da mesma forma como fazemos com outros middlewares, a diferença é que para este tipo precisamos fornecer quatro argumentos em vez de três; a assinatura deve ficar `(err, req, res, next)`. Por exemplo:

~~~js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
~~~

Definimos middleware de tratamento de erros por último; depois de outros `app.use()` e chamadas de rotas. Por exemplo:

~~~js
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
~~~

As respostas dos middlewares são completamente arbitrárias. Isso significa que podemos responder com uma página de erro em HTML, uma mensagem de texto, uma string JSON, ou qualquer outra coisa que quisermos.

Para fins de organização (e um framework de nível mais elevado) podemos definir vários middlewares de tratamento de erro, como faríamos com outros tipos de middlewares. Por exemplo, se quisermos tratar error para requisições feita por XHR, ou não, poderíamos fazer o seguinte:

~~~js
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
~~~

Onde o middleware mais genérico, `logErrors`, pode escrever requisições e informações de erro para `stderr`, `loggly`, ou serviços semelhantes:

~~~js
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
~~~

Onde definimos `clientErrorHandler` como a sequir (note que o erro é explicitamente repassado para o `next`):

~~~js
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}
~~~

O próximo `errorHandler` é um "pega tudo" e pode ser implementado da sequinte forma:

~~~js
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
~~~

Se passarmos qualquer coisa para a função `next()` (exceto a string `'route'`) o Express irá considerar que a requisição tem erro e pulará qualquer função middleware restante que não seja do tipo `error-handling`. Se quisermos lidar com essa requisição de alguma outra forma, precisaremos criar uma rota de tratamento de erro como a que veremos na próxima seção.

Se tivermos uma rota tratada com múltiplas funções callback, precisaremos usar o parâmetro 'route' se quisermos pular para o próximo 'handler'. Por exemplo:

~~~js
app.get('/a_route_behind_paywall', 
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) { 
    
      // continua o tratamento desta requisição 
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });
~~~ 

Neste exemplo o handler `getPaidContent` será saltado, mas qualquer outro handler em `app` para a requisição `/a_route_behind_paywall` continuará a ser executado.

<div class="doc-box doc-info" markdown="1">
Chamadas para `next()` ou `next(err)` indicam que o manipulador (handler) atual está completo e em que estado. `next(err)` pulará todos os handlers restantes na sequência, exceto aqueles foram definidos como handlers de erros como descrito acima.
</div>

## O Handler de erros padrão (Default Error Handler)

O Express vem com um handler de erro embutido, que cuida de todos os erros que podem ser encontradas no aplicativo. Este middleware padrão de tratamento de erro é adicionado ao final da pilha de middlewares.

Se passarmos um erro para `next()` e não tivermos nenhum handler de erro para lidar com isso, este erro será tratado pelo middlware padrão de tratamento de erros (default error handler) embutido no Express - o erro será escrito para o cliente stack trace (rastreamento de pilha). O stack trace não está incluído no ambiente de produção.

<div class="doc-box doc-info" markdown="1">
Para rodar o app em modo de produção, defina o valor da variável de ambiente `NODE_ENV` para "production".
</div>

Se chamarmos `next()` com um erro depois de já ter iniciado a escrita da resposta, por exemplo se encontramos um erro enquanto estamos enviando a resposta para o cliente, o handler de erro padrão do Express fechará a conexão, fazendo com que seja considerado que houve falha na requisição.


Então quando adicionamos um handler de erro personalizado, é bom delegarmos o tratamento de erros para o handler de erro padrão do Express quando os cabecalhos `headers` já foram enviados para o cliente.

~~~js
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
~~~
