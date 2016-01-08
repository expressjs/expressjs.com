<h3 id='router.param'>router.param(name, callback)</h3>

Adiciona gatilhos de callback para os parametros da rota, onde `name` é o nome do parametro e `callback` é a função de callback. Os parametros
da função de callback são o objeto da requisição, o objeto de resposta, o próximo middleware, e o valor do parâmetro, nessa ordem. Embora `name`
seja tecnicamente opcional, utilizar esse método sem ele ele é deprecated desde Express v4.11.0 (veja abaixo).

<div class="doc-box doc-info" markdown="1">
Diferente de `app.param()`, `router.param()`não aceita um array de parametros de rota.
</div>

Por exemplo, quando `:user` está presente em um path da rota, você pode mapear a lógica de mapeamento para fornecer automaticamente `req.user`
para a rota, ou realizar validações no parametro de entrada.

~~~js
router.param('user', function(req, res, next, id) {

  // tenta buscar os detalhes do usuário do modelo User e o anexa no objeto da requisição
  User.find(id, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});
~~~

Funções de callback de parâmentros são locais ao roteador ao qual foram definidas. Elas não são herdadas por apps montados ou roteadores.
Consequentemente, parâmentros de callback definidos no `router` serão desencadeados somente por paramtros de rota definidos nas rotas do `router`.

Um paramentro de callback será chamado somente uma vez em um ciclo de requisição-resposta, mesmo se o parametro coincide com multiplas rotas,
como mostrado nos seguintes exemplos.

~~~js
router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
})

app.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

app.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
~~~

Em `GET /user/42`, o seguinte é impresso:

~~~
CALLED ONLY ONCE
although this matches
and this matches too
~~~

~~~js
app.get('/user/:id/:page', function (req, res, next) {
  console.log('although this matches');
  next();
});

app.get('/user/:id/:page', function (req, res) {
  console.log('and this matches too');
  res.end();
});
~~~

Em `GET /user/42/3`, o seguinte é impresso:

~~~
although this matches
and this matches too
~~~

<div class="doc-box doc-warn" markdown="1">
A seção seguinte descreve `router.param(callback)`, que está deprecated desde v4.11.0.
</div>

O comportamento do método `router.param(name, callback)` pode ser alterado completamente aravés da passagem de apenas uma função
para o `router.param()`. Essa função é uma implementação personalizada de como `router.param(name, callback)` deve se comportar - ela aceita
dois parâmetros e deve retornar um middleware.

O primeiro parametro dessa função é o nome d parâmetro da URL que deve ser capturado, o segundo parâmetro pode ser qualquer objeto JavaScript suscetível
a utilização para o retorno da implementação do middleware.

O middleware retornado pela função decide o comportamento do que acontece quando o parâmetro da URL é capturado.

Nesse exemplo, a assinatura `router.param(name, callback)` é modificada para `router.param(name, accessId)`. Ao invés de aceitar o nome e o callback,
`router.param()` passará a aceitar nome e número.

~~~js
var express = require('express');
var app = express();
var router = express.Router();

// personalizando o comportamento de router.param()
router.param(function(param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

// utilizando o router.param() personalizado
router.param('id', 1337);

// roteando para desencadear a captura
router.get('/user/:id', function (req, res) {
  res.send('OK');
})

app.use(router);

app.listen(3000, function () {
  console.log('Ready');
})
~~~

Nesse exemplo, a assinatura `router.param(name, callback)` se mantém a mesma, mas ao invés de um middleware callback, uma função de verificação personalizada de dados foi definida para validar o tipo de dado do id do usuário.

~~~js
router.param(function(param, validator) {
  return function (req, res, next, val) {
    if (validator(val)) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
})

router.param('id', function (candidate) {
  return !isNaN(parseFloat(candidate)) && isFinite(candidate);
});
~~~
