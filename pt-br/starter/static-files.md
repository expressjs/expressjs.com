---
layout: page
title: Entregando arquivos estáticos no Express
description: Understand how to serve static files like images, CSS, and JavaScript in Express.js applications using the built-in 'static' middleware.
menu: starter
lang: pt-br
redirect_from: /starter/static-files.html
---

# Entregando arquivos estáticos no Express

Para entregar arquivos estáticos como imagens, arquivos CSS, e
arquivos JavaScript, use a função de middleware `express.static`
integrada no Express.

The function signature is:

```js
express.static(root, [options])
```

The `root` argument specifies the root directory from which to serve static assets.
For more information on the `options` argument, see [express.static](/{{page.lang}}/4x/api.html#express.static).

Por exemplo, use o código a seguir
para entregar imagens, arquivos CSS, e arquivos JavaScript em um
diretório chamado `public`:

```js
app.use(express.static('public'))
```

Agora, é possível carregar os arquivos que estão no diretório `public`:

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
O Express consulta os arquivos em relação ao diretório estático, para
que o nome do diretório estático não faça parte da URL.
</div>

Para usar vários diretórios de ativos estáticos, chame a função
de middleware `express.static` várias vezes:

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

O Express consulta os arquivos na ordem em que você configurar
os diretórios estáticos com a função de middleware
`express.static`.

{% capture alert_content %}
For best results, [use a reverse proxy](/{{page.lang}}/advanced/best-practice-performance.html#use-a-reverse-proxy) cache to improve performance of serving static assets.
{% endcapture %}
{% include admonitions/note.html content=alert_content %}

Para criar um prefixo de caminho virtual (onde o caminho não
existe realmente no sistema de arquivos) para arquivos que são
entregues pela função `express.static`,
[especifique um caminho de montagem](/{{ page.lang }}/4x/api.html#app.use) para o
diretório estático, como mostrado abaixo:

```js
app.use('/static', express.static('public'))
```

Agora, é possível carregar os arquivos que estão no diretório
`public` a partir do prefixo do caminho `/static`.

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

Entretanto, o caminho fornecido para a função
`express.static` é relativa ao diretório a partir do
qual você inicia o seu `node` de processo. Se você
executar o aplicativo express a partir de outro diretório, é mais
seguro utilizar o caminho absoluto do diretório para o qual deseja
entregar.

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

For more details about the `serve-static` function and its options, see  [serve-static](/resources/middleware/serve-static.html).

### [Previous: Basic Routing ](/{{ page.lang }}/starter/basic-routing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: More examples ](/{{ page.lang }}/starter/examples.html)
