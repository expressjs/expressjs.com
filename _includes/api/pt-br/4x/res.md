<h2>Response</h2>

O objeto `res` representa a resposta HTTP que uma app Express envia quando recebe uma requisição HTTP.


Neste documento e por convenção, o objeto de resposta HTTP é sempre referido como `res` (e o objeto de requisição HTTP como `req` ) mas o nome real é determinado pelo parâmetro da função callback em que você está trabalhando.

Por exemplo:

~~~js
app.get('/user/:id', function(req, res){
  res.send('user ' + req.params.id);
});
~~~

Mas você poderia ter:

~~~js
app.get('/user/:id', function(request, response){
  response.send('user ' + request.params.id);
});
~~~

<h3 id='res.properties'>Propriedades</h3>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-app.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-headersSent.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-locals.md %}
</section>

<h3 id='res.methods'>Methods</h3>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-append.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-attachment.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-cookie.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-clearCookie.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-download.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-end.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-format.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-get.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-json.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-jsonp.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-links.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-location.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-redirect.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-render.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-send.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-sendFile.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-sendStatus.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-set.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-status.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-type.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/res-vary.md %}
</section>
