---
layout: page
title: Exemplo "Hello World" do Express
description: Get started with Express.js by building a simple 'Hello World' application, demonstrating the basic setup and server creation for beginners.
menu: starter
lang: pt-br
redirect_from: /starter/hello-world.html
---

# Exemplo Hello World

<div class="doc-box doc-info" markdown="1">
Este é essencialmente o aplicativo mais simples do Express que é possível criar. Ele
é um aplicativo de arquivo único &mdash; *não* é o que você iria obter usando o [Gerador Express](/{{ page.lang }}/starter/generator.html),
que cria a estrutura para um aplicativo completo com inúmeros arquivos JavaScript, modelos Jade, e subdiretórios para vários
propósitos.
</div>

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

O aplicativo inicia um servidor e escuta a porta 3000 por
conexões. O aplicativo responde com "Hello World!" à solicitações
para a URL raiz (`/`) ou _rota_. Para
todos os outros caminhos, ele irá responder com um **404 Não Encontrado**.

### Running Locally

Primeiro crie um diretório chamado `myapp`,
mude para ele e execute o `npm init`. Em seguida
instale o `express` como uma dependência, de acordo com o [guia de instalação](/{{ page.lang }}/starter/installing.html).

No diretório `myapp`, crie um arquivo chamado `app.js` e inclua o seguinte código:

<div class="doc-box doc-notice" markdown="1">
O `req` (solicitação) e `res`
(resposta) são os mesmos objetos que o Node fornece, para que seja
possível chamar o `req.pipe()`,
`req.on('data', callback)`, e qualquer outra coisa
que desejaria fazer sem o envolvimento do Express.
</div>

Execute o aplicativo com o seguinte comando:

```bash
$ node app.js
```

Em seguida, carregue [http://localhost:3000/](http://localhost:3000/) em
um navegador para visualizar a saída

### [Previous: Installing ](/{{ page.lang }}/starter/installing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Express Generator ](/{{ page.lang }}/starter/generator.html)
