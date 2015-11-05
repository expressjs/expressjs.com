<h3 id='app.param'>app.param([name], callback)</h3>

Adiciona `callback triggers` (acionadores de callback) para parâmetros da rota, onde `name` é o nome de um parâmetro ou um array de nomes de parâmetros, e `callback` é a função callback. Os parâmetros da função callback são os objeto `request`, o próximo `middleware` e o valor do parâmetro, nesta ordem.

Se `name` é um array, o `callback trigger` é registrado para cada parâmetro declarado no array, na ordem em que eles foram declarados. Além disso para cada parâmetro declarado, com exceção do último, uma chamada para `next` dentro do callback, chamará o callback para o próximo parâmetro declarado. Para o último parâmetro, uma chamada para `next` chamara o próximo middleware da rota que está sendo processada, como aconteceria caso `name` não fosse um array e sim uma string.

Por exemplo, quando `:user` está presente em um path da rota, você pode controlar o automaticamente a lógica de carregamento do usuário fornecendo uma `req.user` para a rota ou fazer validações nos parâmetos de entrada.

~~~js
app.param('user', function(req, res, next, id) {

  // Tenta pegar os detalhes do usuário e adicioná-los ao objeto `request`
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

Os parâmetros de funções callbacks são locais para o `router` em que são definidos. Eles não herdam de apps montadas ou `routers`. Consequentemente, parâmetros de callbacks definidos em `app` serão acionados somente por parâmetros definidos nos `routes` de `app`.

Todos os parâmetros de callbacks serão chamados antes de qualquer `handler` de qualquer rota em que o parâmetro ocorre, e serão chamados somente uma vez no ciclo de requisição e resposta, mesmo que o parâmetro esteja combinado em múltiplas rotas, como mostra o exemplo seguinte:


~~~js
app.param('id', function (req, res, next, id) {
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

Em `GET /user/42`, será impresso o seguinte:

~~~
CALLED ONLY ONCE
although this matches
and this matches too
~~~

~~~js
app.param(['id', 'page'], function (req, res, next, value) {
  console.log('CALLED ONLY ONCE with', value);
  next();
})

app.get('/user/:id/:page', function (req, res, next) {
  console.log('although this matches');
  next();
});

app.get('/user/:id/:page', function (req, res) {
  console.log('and this matches too');
  res.end();
});
~~~

Em `GET /user/42/3`, será impresso o seguinte:

~~~
CALLED ONLY ONCE with 42
CALLED ONLY ONCE with 3
although this matches
and this matches too
~~~

<div class="doc-box doc-warn" markdown="1">

A próxima seção descreve `app.param(callback)`, que está obsoleto a partir da versão 4.11.0.

</div>

O comportamento do método `app.param(name, callback)` pode ser totalmente alterado passando-se somente uma função para `app.param()`. Esta função é uma implementação personalizada de como `app.param(name, callback)`  deve se comportar - aceita dois parâmetros e deve retornar um middleware.

O primeiro parâmetro desta função é o nome do parâmetro da URL que deve ser capturado, o segundo parâmetro pode ser qualquer objeto JavaScript que pode ser utilizado para retornar uma implementação de middleware.


O middleware retornado decide o que acontece quando o parâmetro de URL é capturado.

Nesse exemplo, a assinatura de `app.param(name,callback)` é modificada para `app.param(name, accessId)`.  Em vez de aceitar um nome e um callback, agora `app.param()` aceitará um nome e um número.

~~~js
var express = require('express');
var app = express();

// personalizando o comportamento de app.param()
app.param(function(param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

// usando a app.param() pesonalizada.
app.param('id', 1337);

// rota para acionar a captura
app.get('/user/:id', function (req, res) {
  res.send('OK');
})

app.listen(3000, function () {
  console.log('Ready');
})
~~~

Nesse exemplo, a assinatura `app.param(name, callback)` continua a mesma, mas em vez de um callback middleware, foi definida uma função personalizada de verificação de tipo de dado para validar os dados de user id.


~~~js
app.param(function(param, validator) {
  return function (req, res, next, val) {
    if (validator(val)) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
})

app.param('id', function (candidate) {
  return !isNaN(parseFloat(candidate)) && isFinite(candidate);
});
~~~

<div class="doc-box doc-info" markdown="1">
O caracter '`.`' não pode ser usado para capturar um caracter em suas expressões regulares. Por exemplo você não pode usar `'/user-.+/'` para capturar `'users-gami'`, em vez disto utilize  `[\\s\\S]` ou `[\\w\\W]` (como em `'/user-[\\s\\S]+/'`).

Exemplos:

<pre><code class="language-js">//captura '1-a_6' mas não '543-azser-sder'
router.get('/[0-9]+-[[\\w]]*', function); 

//captura '1-a_6' e '543-az(ser"-sder' mas não '5-a s'
router.get('/[0-9]+-[[\\S]]*', function); 

//captura tudo (equivalent a '.*')
router.get('[[\\s\\S]]*', function); 
</code></pre>

</div>
