<h3 id='req.originalUrl'>req.originalUrl</h3>

<div class="doc-box doc-notice" markdown="1">
`req.url` não é uma propriedade nativa do Express, ela é uma herança do Node [http module](https://nodejs.org/api/http.html#http_message_url).
</div>

Esta propriedade é muito parecida com a `req.url` do Node; no entanto, mantém a URL da requisição original,
o que lhe permite reescrever `req.url` livremente para fins de roteamento interno. Por exemplo,
o recurso de "montagem" de [app.use ()] (# app.use) irá reescrever `req.url` para retirar o ponto de montagem.

~~~js
// GET /search?q=something
req.originalUrl
// => "/search?q=something"
~~~
