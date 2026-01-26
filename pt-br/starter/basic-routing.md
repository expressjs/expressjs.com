---
layout: page
title: Roteamento básico no Express
description: Aprenda os fundamentos do roteamento em aplicações Express.js, incluindo como definir rotas, lidar com métodos HTTP e criar manipuladores de rotas para seu servidor web.
menu: starter
order: 4
redirect_from: "  "
---

# Roteamento Básico

O _Roteamento_ refere-se à determinação de como um
aplicativo responde a uma solicitação do cliente por um endpoint
específico, que é uma URI (ou caminho) e um método de solicitação HTTP
específico (GET, POST, e assim por diante).

Cada rota pode ter uma ou mais funções de manipulação, que são
executadas quando a rota é correspondida.

A definição de rotas aceita a seguinte estrutura:

```js
app.METHOD(PATH, HANDLER)
```

Onde:

- `app` é uma instância do `express`.
- `METHOD` é um [método de solicitação HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods), em minúsculas.
- `PATH` é um caminho no servidor.
- `HANDLER` é a função executada quando a rota é correspondida.

<div class="doc-box doc-notice" markdown="1">
Este tutorial assume que uma instância de `express`
chamada `app` está criada e o servidor está em
execução. Caso não tenha familiaridade com a criação e inicialização
de um aplicativo, consulte o [exemplo Hello world](/{{ page.lang }}/starter/hello-world.html).
</div>

Os seguintes exemplos ilustram a definição de rotas simples.

Responda com `Hello World!` na página inicial:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

Responder a uma solicitação POST na rota raiz (`/`) com a página inicial do aplicativo:

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

Responder a uma solicitação PUT para a rota `/user`:

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

Responder a uma solicitação DELETE para a rota `/user`:

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

Para obter mais detalhes sobre roteamento, consulte o [guia de roteamento](/{{ page.lang }}/guide/routing.html).

