<h2>Aplicativo Express</h2>

O objeto`app` convensionalmente é o aplicativo Express.
Para criar este objeto chamamos a função de alto nível `express()`, que é exportada pelo módulo Express:

~~~js
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
~~~

O objeto `app` possui métodos para:
* Roteamento de requisições HTTP; veja por exemplo, [app.METHOD](#app.METHOD) e [app.param](#app.param).
* Configuração de middlewares; veja [app.route](#app.route).
* Renderização de views HTML; veja [app.render](#app.render).
* Definição de template engine; veja [app.engine](#app.engine).


O `app` também tem configurações (propriedades) que afetam o comportamento do aplicativo;
para mais informações, consulte [Application settings](#app.settings.table).

<h3 id='app.properties'>Propriedades (Properties)</h3>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-locals.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-mountpath.md %}
</section>

<h3 id='app.events'>Eventos (Events)</h3>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-onmount.md %}
</section>

<h3 id='app.methods'>Métodos (Methods)</h3>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-all.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-delete-method.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-disable.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-disabled.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-enable.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-enabled.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-engine.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-get.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-get-method.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-listen.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-METHOD.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-param.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-path.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-post-method.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-put-method.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-render.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-route.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-set.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/app-use.md %}
</section>
