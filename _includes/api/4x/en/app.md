<h2>Application</h2>

The `app` object conventially denotes the Express application.
Create it by calling the top-level `express()` function exported by the Express module:

```js
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
```

The `app` object has a methods for
* Routing HTTP requests; see for example, [app.METHOD](#app.METHOD) and [app.param](#app.param).
* Configuring middlewware; see [app.route](#app.route).
* Rendering HTML views; see [app.render](#app.render).
* Registering a template engine; see [app.engine](#app.engine).

It also has settings (properties) that affect how the application behaves;
for more information, see [Application settings](#app.settings.table).

<h3 id='app.properties'>Properties</h3>

<section>
  {% include api/4x/en/app-locals.md %}
</section>

<section>
  {% include api/4x/en/app-mountpath.md %}
</section>

<h3 id='app.events'>Events</h3>

<section>
  {% include api/4x/en/app-onmount.md %}
</section>

<h3 id='app.methods'>Methods</h3>

<section>
  {% include api/4x/en/app-all.md %}
</section>

<section>
  {% include api/4x/en/app-delete-method.md %}
</section>

<section>
  {% include api/4x/en/app-disable.md %}
</section>

<section>
  {% include api/4x/en/app-disabled.md %}
</section>

<section>
  {% include api/4x/en/app-enable.md %}
</section>

<section>
  {% include api/4x/en/app-enabled.md %}
</section>

<section>
  {% include api/4x/en/app-engine.md %}
</section>

<section>
  {% include api/4x/en/app-get.md %}
</section>

<section>
  {% include api/4x/en/app-get-method.md %}
</section>

<section>
  {% include api/4x/en/app-listen.md %}
</section>

<section>
  {% include api/4x/en/app-METHOD.md %}
</section>

<section>
  {% include api/4x/en/app-param.md %}
</section>

<section>
  {% include api/4x/en/app-path.md %}
</section>

<section>
  {% include api/4x/en/app-post-method.md %}
</section>

<section>
  {% include api/4x/en/app-put-method.md %}
</section>

<section>
  {% include api/4x/en/app-render.md %}
</section>

<section>
  {% include api/4x/en/app-route.md %}
</section>

<section>
  {% include api/4x/en/app-set.md %}
</section>

<section>
  {% include api/4x/en/app-use.md %}
</section>

