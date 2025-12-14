---
layout: page
title: Roteamento básico no Express
description: Learn the fundamentals of routing in Express.js applications, including how to define routes, handle HTTP methods, and create route handlers for your web server.
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
- `METHOD` is an [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods), in lowercase.
- `PATH` é um caminho no servidor.
- `HANDLER` é a função executada quando a rota é correspondida.

<div class="doc-box doc-notice" markdown="1">
Este tutorial assume que uma instância de `express`
chamada `app` está criada e o servidor está em
execução. Caso não tenha familiaridade com a criação e inicialização
de um aplicativo, consulte o [exemplo Hello world](/{{ page.lang }}/starter/hello-world.html).
</div>

Os seguintes exemplos ilustram a definição de rotas simples.

Responder com `Hello World!` na página inicial:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

Respond to a POST request on the root route (`/`), the application's home page:

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

Para obter mais detalhes  sobre roteamento, consulte o [guia de roteamento](/{{ page.lang }}/guide/routing.html).

