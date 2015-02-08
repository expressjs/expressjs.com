<h2>Router</h2>

<section>
  A `router` object is an isolated instance of middleware and routes. You can think of it
  as a "mini-application," capable only of performing middleware and routing
  functions. Every Express application has a built-in app router.

  A router behaves like middleware itself, so you can use it as an argument to
  [app.use()](#app.use) or as the argument to another router's  [use()](#router.use) method.

  The top-level `express` object has a `Router()` function that creates a new `router` object.

  {% include api/4x/en/router-Router.md %}

</section>

<h3 id='router.methods'>Methods</h3>

<section>
  {% include api/4x/en/router-all.md %}
</section>

<section>
  {% include api/4x/en/router-METHOD.md %}
</section>

<section>
  {% include api/4x/en/router-param.md %}
</section>

<section>
  {% include api/4x/en/router-route.md %}
</section>

<section>
  {% include api/4x/en/router-use.md %}
</section>
