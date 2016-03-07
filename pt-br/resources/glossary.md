---
layout: page
title: Glossário do Express
menu: resources
lang: pt-br
---

# Glossário

<div class="doc-box doc-warn">Este é atualmente um rascunho de trabalho</div>

### aplicativo

Em geral, um ou mais programas que são designados a executar
operações com um propósito específico.  No contexto do Express, um
programa que usa a API do Express executando na plataforma.  Pode
também se referir a um [objeto app](/{{ page.lang }}/api.html#express).

### API

Interface de programação de aplicativos.  Especifique o significado da abreviação no seu primeiro uso.

### Express

Uma estrutura web rápida, flexível e minimalista para aplicativos Node.js.  Em
geral, "Express" é preferido a "Express.js," apesar de que o último ser aceitável.

### libuv

Uma biblioteca de suporte multiplataforma que foca em E/S
assíncrona, primeiramente desenvolvida para uso pelo Node.js.

### middleware

Uma função que é chamada pela camada de roteamento do Express
antes do manipulador final da solicitação, e assim ficando no meio,
entre uma solicitação bruta a rota final desejada.  Alguns poucos
pontos de refinamento da terminologia envolvendo middleware:

  * `var foo = require('middleware')` é
chamado *requerendo* ou *usando* um módulo
do Node.js. Então a instrução `var mw = foo()`
tipicamente retorna o middleware.
  * `app.use(mw)` é chamado *incluindo
o middleware na pilha global de processamento*.
  * `app.get('/foo', mw, function (req, res) { ... })`
é chamado *incluindo o  middleware para a pilha de
processamento do "GET /foo" *.

### Node.js

Uma plataforma de software que é usada para construir aplicativos de rede escaláveis. O Node.js usa o JavaScript como
linguagem de script, e alcança rendimentos altos através de E/S não
bloqueante e um loop de eventos de thread única.  Consulte [nodejs.org](http://nodejs.org/). **Nota
de uso**: Inicialmente, "Node.js," posteriormente "Node".

### open-source, open source

Quando usado como adjetivo, colocar o hífen; por exemplo "Este
é um software open-source". Consulte
[Software
Open-source na Wikipedia](http://en.wikipedia.org/wiki/Open-source_software). Nota: Apesar de ser comum não
colocar o hífen neste termo, estamos usando as regras padrões do
Inglês para colocar o hífen em adjetivos compostos.

### resposta

Uma resposta HTTP. Um servidor retorna uma mensagem de resposta
HTTP para o cliente. A resposta contém informações do status de
conclusão sobre a solicitação e pode também conter conteúdo da
solicitação no corpo da mensagem.

### rota

Parte de uma URL que identifica um recurso.  Por exemplo, em
`http://foo.com/products/id`, "/products/id" é a
rota.

### roteador

Consulte [roteador](/{{ page.lang }}/4x/api.html#router) na referência da API.

### solicitação

Uma solicitação HTTP.  Um cliente envia uma mensagem HTTP para
um servidor, que retorna uma resposta.  A solicitação deve usar um dos
vários
[métodos
de solicitação](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) como GET, POST, e assim por diante.
