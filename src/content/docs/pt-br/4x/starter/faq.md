---
title: Perguntas Frequentes
description: Encontre respostas para perguntas frequentes sobre Express.js, incluindo tópicos sobre a estrutura do aplicativo, modelos, autenticação, mecanismos de modelo, tratamento de erros e muito mais.
---

## Como eu devo estruturar meu aplicativo?

Não há uma resposta definitiva a esta questão. A resposta depende
da escala do seu aplicativo e da equipe que está envolvida. Para ser o mais flexível possível,
flexível, Express não faz suposições em termos de estrutura.

Rotas e outras lógicas específicas do aplicativo podem viver em quantos arquivos
você quiser, em qualquer estrutura de diretório que preferir. Veja os seguintes exemplos
de inspiração:

- [Lista de rotas](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
- [Mapa de rotas](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

Além disso, existem extensões para o Express, que simplificam alguns desses padrões:

- [Roteamento de recursos](https://github.com/expressjs/express-resource)

## Como faço para definir modelos?

Expresso não tem noção de um banco de dados. Este conceito é
deixado para módulos de Nó de terceiros, permitindo a você
interface com quase qualquer banco de dados.

Veja [LoopBack](http://loopback.io) para um framework baseado em Express que é centralizado em torno de modelos.

## Como posso autenticar os usuários?

Authentication is another opinionated area that Express does not
venture into. Você pode usar qualquer esquema de autenticação desejado.
Para um esquema simples de nome de usuário/senha, consulte [este exemplo](https://github.com/expressjs/express/tree/master/examples/auth).

## Quais mecanismos de template suporta o Expresso?

Expresso suporta qualquer mecanismo de modelos que esteja em conformidade com a assinatura `(caminho, moradores, callback)`.
Para normalizar interfaces do motor de modelos e cache de cache, veja o projeto
[consolidate.js](https://github.com/visionmedia/consolidate.js)
para suporte. Motores de modelos não listados ainda podem suportar a assinatura Express.

Para obter mais informações, consulte [Usando mecanismos de modelo com Express](/guide/using-template-engines).

## Como lidamos com 404 respostas?

Em Express, respostas 404 não são resultado de um erro, então
o middleware de erro não as capturará. This behavior is
because a 404 response simply indicates the absence of additional work to do;
in other words, Express has executed all middleware functions and routes,
and found that none of them responded. All you need to
do is add a middleware function at the very bottom of the stack (below all other functions)
to handle a 404 response:

```js
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
```

Adicione rotas dinamicamente em tempo de execução em uma instância de `express.Router()`
para que as rotas não sejam substituídas por uma função middleware.

## Como faço para configurar um manipulador de erro?

Você define o middleware com erros de manipulação da mesma forma que outros middleware,
exceto com quatro argumentos em vez de três; especificamente com a assinatura `(err, req, res, próxima)`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

Para obter mais informações, consulte [Manipulação de erro](/guide/error-handling).

## Como faço para tornar HTML simples?

Você não! Não há necessidade de "render" HTML com a função `res.render()`.
Se você tiver um arquivo específico, use a função `res.sendFile()`.
Se você estiver servindo muitos assets de um diretório, use a função `express.static()`
middleware.

## Qual versão do Node.js requer o Expresso?

- [Expresso 4.x](/api) requer Node.js 0.10 ou superior.
- [Express 5.x](/5x/api) requer Node.js 18 ou superior.
