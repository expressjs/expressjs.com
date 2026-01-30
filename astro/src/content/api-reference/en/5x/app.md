<h2 id="app">Application</h2>

The `app` object conventionally denotes the Express application.
Create it by calling the top-level `express()` function exported by the Express module:

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000)
```

The `app` object has methods for

* Routing HTTP requests; see for example, [app.METHOD](#app.METHOD) and [app.param](#app.param).
* Configuring middleware; see [app.route](#app.route).
* Rendering HTML views; see [app.render](#app.render).
* Registering a template engine; see [app.engine](#app.engine).

It also has settings (properties) that affect how the application behaves;
for more information, see [Application settings](#app.settings.table).

<div class="doc-box doc-info" markdown="1">
The Express application object can be referred from the [request object](#req) and the [response object](#res) as `req.app`, and `res.app`, respectively.
</div>

<h3 id='app.properties'>Properties</h3>

<section markdown="1">
  {% include api/en/5x/app-locals.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-mountpath.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-router.md %}
</section>

<h3 id='app.events'>Events</h3>

<section markdown="1">
  {% include api/en/5x/app-onmount.md %}
</section>

<h3 id='app.methods'>Methods</h3>

<section markdown="1">
  {% include api/en/5x/app-all.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-delete-method.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-disable.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-disabled.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-enable.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-enabled.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-engine.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-get.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-get-method.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-listen.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-METHOD.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-param.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-path.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-post-method.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-put-method.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-render.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-route.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-set.md %}
</section>

<section markdown="1">
  {% include api/en/5x/app-use.md %}
</section>
