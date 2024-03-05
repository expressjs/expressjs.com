---
layout: page
title: Roteamento no Express
menu: guide
lang: pt-br
---

# Roteamento

O _Roteamento_ refere-se a como os _endpoints_ de uma aplicação (URIs) respondem às requisições do cliente.
Para uma introdução ao roteamento, consulte [Roteamento básico](/{{ page.lang }}/starter/basic-routing.html).

Rotas são definidas utilizando métodos do objeto `app` do Express que correspondem aos métodos HTTP;
por exemplo, `app.get()` para lidar com requisições GET e `app.post()` para requisições POST. 
Para a lista completa, veja [app.METHOD](/{{ page.lang }}/4x/api.html#app.METHOD). 
Você também pode utilizar [app.all()](/{{ page.lang }}/4x/api.html#app.all) para lidar com todos os métodos HTTP
e [app.use()](/{{ page.lang }}/4x/api.html#app.use) para especificar middleware como funções _callback_ 
(Veja [Usando middlewares](/{{ page.lang }}/guide/using-middleware.html) para mais detalhes).

Esses métodos de roteamento especificam uma função _callback_ a ser chamada quando a aplicação 
recebe uma requisição à rota e método HTTP especificados. Em outras palavras, a aplicação "escuta" 
requisições que se encaixam nas rotas e métodos especificados e, quando há alguma correspondência, 
chama a função _callback_ especificada.

Na realidade, métodos de roteamento podem possuir mais de uma função _callback_ como argumento. 
Com múltiplas funções, é importante passar `next` como argumento da função e chamar `next()` para passar o controle para a próxima.

O código a seguir é um exemplo de uma rota muito básica.

```js
const express = require('express')
const app = express()

// Responde com 'hello world' quando uma requisição é feita à homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
```

<h2 id="route-methods">Métodos de roteamento</h2>

Um método de roteamento é derivado a partir de um dos métodos
HTTP, e é anexado a uma instância da classe `express`.

o código a seguir é um exemplo de rotas para a raiz do
aplicativo que estão definidas para os
métodos GET e POST.

```js
// rota do método GET
app.get('/', (req, res) => {
  res.send('requisição GET à homepage')
})

// rota do método POST
app.post('/', (req, res) => {
  res.send('requisição POST à homepage')
})
```

O Express suporta métodos que correspondem a todos os métodos de requisição HTTP: `get`, `post`, etc.
Pra uma lista completa, veja [app.METHOD](/{{ page.lang }}/4x/api.html#app.METHOD).

Existe um método de roteamento especial,
`app.all()`, que não é derivado de nenhum método
HTTP. Este método é usado para carregar funções de middleware em um
caminho para todos os métodos de solicitação.

No exemplo a seguir, o manipulador irá ser executado para
solicitações para "/secret" se você estiver usando GET, POST, PUT,
DELETE, ou qualquer outro método de solicitação HTTP que é suportado
no [módulo
http](https://nodejs.org/api/http.html#http_http_methods).

```js
app.all('/secreto', (req, res, next) => {
  console.log('Acessando a área secreta ...')
  next() // passa o controle pro próximo manipulador
})
```

<h2 id="route-paths">Caminhos de rota</h2>

Caminhos de rota, em combinação com os métodos de solicitação,
definem os terminais em que as solicitações podem ser feitas. Caminhos
de rota podem ser sequências de caracteres, padrões de sequência, ou
expressões regulares.

<div class="doc-box doc-info" markdown="1">
  O Express usa o [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) para verificar a correspondência de caminhos de rota; consulte a
documentação do path-to-regexp para obter todas as possibilidades nas definições de caminhos de rota. O [Express
Route Tester](http://forbeslindesay.github.io/express-route-tester/) é uma ferramenta útil para testar rotas básicas do Express, apesar de não suportar a correspondência de padrões.
</div>

<div class="doc-box doc-warn" markdown="1">
Sequências de consulta não fazem parte dos caminhos de rota.
</div>

Aqui estão alguns exemplos de caminhos de rota baseados em sequências de caracteres

Este caminho de rota corresponde a solicitações à rota raiz, `/`.

```js
app.get('/', (req, res) => {
  res.send('raiz')
})
```

Este caminho de rota irá corresponder a solicitações ao `/ajuda`.

```js
app.get('/ajuda', (req, res) => {
  res.send('ajuda')
})
```

Este caminho de rota irá corresponder a solicitações ao `/qualquer.texto`.

```js
app.get('/qualquer.texto', (req, res) => {
  res.send('qualquer.texto')
})
```

Aqui estão alguns exemplos de caminhos de rota baseados em padrões de sequência

Este caminho de rota irá corresponder ao `acd` e `abcd`.

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```

Este caminho de rota irá corresponder ao `abcd`, `abbcd`, `abbbcd`, e assim por diante.

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```

Este caminho de rota irá corresponder ao `abcd`, `abxcd`, `abRANDOMcd`, `ab123cd`, e assim por diante.

```js
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})
```

Este caminho de rota irá corresponder ao `/abe` e `/abcde`.

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
```

<div class="doc-box doc-info" markdown="1">
Os caracteres ?, +, *, e () são subconjuntos de suas contrapartes em
expressões regulares. O hífen (-) e o ponto (.) são interpretados
literalmente por caminhos baseados em sequências de caracteres.
</div>

Exemplos de caminhos de rota baseados em expressões regulares:

Este caminho de rota irá corresponder a qualquer coisa com um
"a" no nome.

```js
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```

Este caminho de rota irá corresponder a `butterfly` e
`dragonfly`, mas não a `butterflyman`,
`dragonfly man`, e assim por diante.

```js
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
```

<h2 id="route-handlers">Manipuladores de rota</h2>

É possível fornecer várias funções _callback_
que se comportam como [middleware](/{{ page.lang }}/guide/using-middleware.html) para
manipular uma solicitação. A única exceção é que estes _callbacks_ podem chamar `next('route')` para efetuar um
bypass nos _callbacks_ restantes. É possível usar
este mecanismo para impor pré-condições em uma rota, e em seguida
passar o controle para rotas subsequentes se não houveram razões para
continuar com a rota atual.

Manipuladores de rota podem estar na forma de uma função, uma
matriz de funções, ou combinações de ambas, como mostrado nos
seguintes exemplos.

Uma única função _callback_ pode manipular uma rota.  Por exemplo:

```js
app.get('/exemplo/a', (req, res) => {
  res.send('A diz olá!')
})
```

Mais de uma função _callback_ pode manipular uma
rota (certifique-se de especificar o objeto `next`). Por exemplo:

```js
app.get('/exemplo/b', (req, res, next) => {
  console.log('a resposta será enviada para a próxima função ...')
  next()
}, (req, res) => {
  res.send('B diz olá!')
})
```

Uma matriz de funções _callback_ podem manipular uma
rota.  Por exemplo:

```js
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}
const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}
const cb2 = function (req, res) {
  res.send('C diz olá!')
}
app.get('/exemplo/c', [cb0, cb1, cb2])
```

Uma combinação de funções independentes e matrizes de funções
podem manipular uma rota.  Por exemplo:

```js
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}
const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}
app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('a resposta será enviada pela próxima função ...')
  next()
}, (req, res) => {
  res.send('D diz olá!')
})
```

<h2 id="response-methods">Métodos de resposta</h2>

Os métodos do objeto de resposta (`res`) na
seguinte tabela  podem enviar uma resposta ao cliente, e finalizar o
ciclo solicitação-resposta. Se nenhum destes métodos forem chamados a
partir de um manipulador de rota, a solicitação do cliente será
deixada em suspenso.

| Método               | Descrição
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)   | Solicita que seja efetuado o download de um arquivo
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)        | Termina o processo de resposta.
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)       | Envia uma resposta JSON.
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)      | Envia uma resposta JSON com suporta ao JSONP.
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)   | Redireciona uma solicitação.
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)     | Renderiza um modelo de visualização.
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)       | Envia uma resposta de vários tipos.
| [res.sendFile](/{{ page.lang }}/4x/api.html#res.sendFile)     | Envia um arquivo como um fluxo de octeto.
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Configura o código do status de resposta e envia a sua representação em sequência de caracteres como o corpo de resposta.

<h2 id="app-route">app.route()</h2>

É possível criar manipuladores de rota encadeáveis para um caminho de rota usando o `app.route()`.
Como o caminho é especificado em uma localização única, criar rotas modulares é útil, já que reduz redundâncias e erros tipográficos. Para obter mais informações sobre rotas, consulte: [documentação do Router()](/{{ page.lang }}/4x/api.html#router).

Aqui está um exemplo de manipuladores de rotas encadeáveis que são definidos usando `app.route()`.

```js
app.route('/livro')
  .get((req, res) => {
    res.send('Retorna um livro aleatório')
  })
  .post((req, res) => {
    res.send('Adiciona um livro')
  })
  .put((req, res) => {
    res.send('Atualiza o livro')
  })
```

<h2 id="express-router">express.Router</h2>

Use a classe `express.Router` para criar
manipuladores de rota modulares e montáveis. Uma instância de
`Router` é um middleware e sistema de roteamento
completo; por essa razão, ela é frequentemente referida como um
"mini-aplicativo"

O seguinte exemplo cria um roteador como um módulo, carrega uma
função de middleware nele, define algumas rotas, e monta o módulo
router em um caminho no aplicativo principal.

Crie um arquivo de roteador com um arquivo chamado
`passaros.js` no diretório do aplicativo, com o
seguinte conteúdo:

```js
const express = require('express')
const router = express.Router()
// middleware específico para este roteador
router.use((req, res, next) => {
  console.log('Horário: ', Date.now())
  next()
})
// define a rota da homepage
router.get('/', (req, res) => {
  res.send('Homepage de pássaros')
})
// define a rota 'ajuda'
router.get('/ajuda', (req, res) => {
  res.send('Ajuda sobre pássaros')
})
module.exports = router
```

Em seguida, carregue o módulo roteador no aplicativo:

```js
const passaros = require('./passaros')
// ...
app.use('/passaros', passaros)
```

O aplicativo será agora capaz de manipular solicitações aos
caminhos `/passaros` e `/passaros/ajuda`,
assim como chamar a função de middleware `timeLog` que
é específica para a rota.
