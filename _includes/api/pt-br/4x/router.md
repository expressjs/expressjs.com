<h2>Router</h2>

<section markdown="1">
Um objeto `router` é uma instância isolada de middleware e rotas. Você pode considerar isso como uma "mini aplicação", capaz somente de processar middlewares e funções de roteamento. Toda aplicação Express tem um app router embutido.

Um router se comporta como o próprio middleware, assim você pode utilizá-lo como um argumento para [app.use()](#app.use) ou como argumento de outro método  [use()](#router.use) da rota.

O objeto de alto nível `express` tem uma função `Router()` que cria um novo objeto `router`.



{% include api/{{ page.lang }}/4x/router-Router.md %}
</section>

<h3 id='router.methods'>Methods</h3>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/router-all.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/router-METHOD.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/router-param.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/router-route.md %}
</section>

<section markdown="1">
  {% include api/{{ page.lang }}/4x/router-use.md %}
</section>
