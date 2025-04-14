---
layout: page
title: Pergunta mais Frequentes do Express
description: Find answers to frequently asked questions about Express.js, including topics on application structure, models, authentication, template engines, error handling, and more.
menu: starter
lang: pt-br
redirect_from: /starter/faq.html
---

# Perguntas mais frequentes

## Como eu devo estruturar meu aplicativo?

Não existe uma resposta definitiva para esta questão. A
resposta depende da escala do seu aplicativo e o time que está
envolvido. Para ser o mais flexível possível, o Express não faz
suposições em termos de estrutura.

Rotas e outras lógicas específicas do aplicativo podem ficar em
quantos arquivos quiser, em qualquer estrutura de diretórios que
preferir. Visualize os seguintes exemplos para obter inspiração:

- [Listagens de rota](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
- [Mapa de rota](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [Controladores com estilo MVC](https://github.com/expressjs/express/tree/master/examples/mvc)

Além disso, existem extensões de terceiros para o Express, que
simplificam alguns desses padrões:

- [Resourceful routing](https://github.com/expressjs/express-resource)

## Como eu defino modelos?

O Express não tem noção de banco de dados. Este conceito é
deixado para módulos do Node de terceiros, permitindo que você faça
a interface com praticamente qualquer banco de dados.

Consulte [LoopBack](http://loopback.io) para
uma estrutura baseada no Express que é centrada em modelos.

## Como posso autenticar usuários?

Autenticação é outra área muito opinada que o Express não
se arrisca a entrar. Você pode usar qualquer esquema que desejar.
Para um esquema simples com nome de usuário / senha, consulte
este
exemplo.

## Quais mecanismos de modelo o Express suporta?

O Express suporta qualquer mecanismo de modelo que esteja em
conformidade com a assinatura `(path, locals,
callback)`.
Para normalizar interfaces e o armazenamento em
cache de mecanismo de modelo, consulte o projeto
[consolidate.js](https://github.com/visionmedia/consolidate.js)
para obter suporte. Mecanismos de modelo não listados podem ainda
assim suportar a assinatura do Express.

[Roteamento engenhoso](https://github.com/expressjs/express-resource)

## Como manipulo respostas 404?

No Express, respostas 404 não são o resultado de um erro,
portanto o middleware manipulador de erros não irá capturá-las. Este comportamento é porque uma resposta 404 simplesmente indicam a
ausência de trabalho adicional para fazer; em outras palavras, o
Express executou todas as funções de middleware e rotas, e descobriu
que nenhuma delas respondeu. Tudo que você precisa fazer é incluir
uma função de middleware no final da pilha (abaixo de todas as outras
funções) para manipular uma resposta 404:

```js
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})
```

Add routes dynamically at runtime on an instance of `express.Router()`
so the routes are not superseded by a middleware function.

## Como configuro um manipulador de erros?

Você define middlewares de manipulação de erros da mesma forma
que outros middlewares, exceto que com quatro argumentos ao invés de
três; especificamente com a assinatura `(err, req, res, next)`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Para obter mais informações, consulte [Manipulação de erros](/{{ page.lang }}/guide/error-handling.html).

## Como renderizar um HTML simples?

Você não faz! Não há necessidade de se "renderizar" HTML com a
função `res.render()`.
se você tiver um arquivo
específico, use a função `res.sendFile()`.
Se estiver entregando muitos ativos a partir de um diretório, use a
função de middleware `express.static()`.

## What version of Node.js does Express require?

- [Express 4.x](/{{ page.lang }}/4x/api.html) requires Node.js 0.10 or higher.
- [Express 5.x](/{{ page.lang }}/5x/api.html) requires Node.js 18 or higher.

### [Previous: More examples ](/{{ page.lang }}/starter/examples.html)
