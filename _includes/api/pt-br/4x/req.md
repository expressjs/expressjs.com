<h2>Request</h2>

Objeto `req` representa a requisição HTTP e possui propriedades para o query string
da requisição, parametros, corpo, cabeçalhos HTTP, e assim por diante. Nessa documentação e por
convenção, o objeto é sempre referido como `req` (e a resposta HTTP é `res`) mas seu nome atual é determinado
pelos parametros para a função de callback que você está trabalhando.

Por exemplo:

~~~js
app.get('/user/:id', function(req, res){
  res.send('user ' + req.params.id);
});
~~~

Mas você poderia muito bem ter:

~~~js
app.get('/user/:id', function(request, response){
  response.send('user ' + request.params.id);
});
~~~

<h3 id='req.properties'>Properties</h3>

<div class="doc-box doc-notice" markdown="1">
No Express 4, `req.files` não está mais disponível no objeto `req` por padrão. Para acessar os arquivos carregados no objeto `req.files`,
utilize um middleware de multipart-handling como [busboy](https://www.npmjs.com/package/busboy), [multer](https://www.npmjs.com/package/multer), [formidable](https://www.npmjs.com/package/formidable), [multiparty](https://www.npmjs.com/package/multiparty), [connect-multiparty](https://www.npmjs.com/package/connect-multiparty), ou [pez](https://www.npmjs.com/package/pez).
</div>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-app.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-baseUrl.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-body.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-cookies.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-fresh.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-hostname.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-ip.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-ips.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-originalUrl.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-params.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-path.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-protocol.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-query.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-route.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-secure.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-signedCookies.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-stale.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-subdomains.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-xhr.md %}
</section>

<h3 id='req.methods'>Methods</h3>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-accepts.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-acceptsCharsets.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-acceptsEncodings.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-acceptsLanguages.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-get.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-is.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/req-param.md %}
</section>
