---
layout: page
title: Glossário
menu: resources
lang: pt-br
---

# Glossário

<div class="doc-box doc-warn">Atualmente este é um rascunho</div>

### application (aplicação)

Em geral, um ou mais programas destinados a realizar operações para uma finalidade específica. No contexto do Express, um programa que utiliza a API Express em execução na plataforma Node.js. Também pode se referir a um [objeto app ](/{{ page.lang }}/api.html#express).

### API

Application programming interfac ou Interface de Programação de Aplicativos. Soletrar como A-P-I.

### Express

Um rápido e minimalista framework de mente aberta para aplicações Node.Js.  Em geral chamado simplesmente de "Express", a nomeclatura "Express.js" também é aceita. 

### libuv

Biblioteca com suporte multi plataforma com foco em I/O assíncrono, primariamente desenvolvida para ser usada pelo Node.Js.


### middleware

Uma função invocada pela camada de roteamento do Express antes do manipulador (handler) final da requisição, situa-se entre a requisição e a rota final pretendida.
A function invoked by the Express routing layer before the final request handler, and thus sits in the middle between a raw request and the final intended route.  Alguns pormenores em torno da terminologia relacionada a middleware:

  * `var foo = require('middleware')` é chamado _requisitando_ or _utilizando_ um módulo Node.Js. Então a declaração `var mw = foo()`  tipicamente retorna um middleware.
  * `app.use(mw)` é chamada _adicionando um middleware à pilha de processamento global_.
  * `app.get('/foo', mw, function (req, res) { ... })` é chamada _adicionando o middware para a pilha de processamento_ de "GET /foo".

### Node.js

Plataforma de software para construir aplicações de rede escalonáveis. Node.Js utiliza o JavaScript como linguagem de script e alcança uma elevada taxa de transferência via I/O não bloqueante e um ciclo de eventos single-threaded. Veja [nodejs.org](http://nodejs.org/). **Nota**: Inicialmente, "Node.js," depois disso "Node".

### open-source, open source

Quando utilizado como adjetivo com hífen; por exemplo "Este é um software open-source." Veja [Open-source software em Wikipedia](http://en.wikipedia.org/wiki/Open-source_software). Nota: Embora seja comum a não hifenização, estamos utilizando o padrão de escrita da língua inglesa para adjetivos compostos.

### request

Uma requisição HTTP. Um cliente envia uma mensagem de requisição HTTP para um servidor, que retornará uma resposta (response). Para isso uma dos métodos de requisição HTTP podem ser utilizados [request methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), como  GET, POST, e outros.

### response

Uma resposta HTTP. Um servidor retorna uma mensagem de resposta HTTP para o cliente. Essa resposta contém informações completas sobre o estado da requisição e pode também conter o conteúdo requisitado no corpo da mensagem.

### route (rota)

Parte de uma URL que identifica um recurso.  Por exemplo, em `http://foo.com/products/id`, "/products/id" é a rota.

### router

Veja [router](http://expressjs.com/api#router) na referência da API.
