---
layout: home
title: Express - Node.js Marco de aplicación web
description: "Express es un marco web rápido, sin opinión y minimalista para Node.js, que proporciona un robusto conjunto de características para aplicaciones web y móviles."
menu: home
redirect_from: "  "
---

<section id="home-content">
  <div id="homepage-leftpane" class="pane">
    <section id="description">
        <div class="express"><span>Express</span><a href="{{ page.lang }}/changelog/#{{ site.data.express.current_version }}" id="express-version">{{ site.data.express.current_version }}</a></div>
        <h1 class="description">Marco web rápido, sin opinión y minimalista para <a href='https://nodejs.org/en/'>Node.js</a></h1>
    </section>
    <pre class="install-command"><code>$ npm install express --save</code></pre>
  </div>

  <div id="homepage-rightpane" class="pane" markdown="1">

```javascript
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

  </div>
</section>

{% if site.announcement %}

<section id="announcements">
  {% include announcement.html %}
</section>{% endif %}

<section id="intro">
  <div id="boxes" class="clearfix">
    <div id="web-applications">
      <h2>Aplicaciones web</h2> Express es un minimalista y flexible framework de aplicaciones web de Node.js que provee un conjunto robusto de características para aplicaciones web y móviles</div>
    <div id="apis">
      <h2>APIs</h2> Con una gran cantidad de métodos de utilidad HTTP y middleware a tu disposición, crear una API robusta es rápido y fácil.
    </div>
    <div id="performance">
      <h2>Rendimiento</h2> Express proporciona una capa delgada de características fundamentales de la aplicación web, sin ocultar las características de Node.js que usted conoce y ama.
    </div>
    <div id="middleware">
      <h2>Middleware</h2> 
      Express es un marco de enrutamiento ligero y flexible con las características básicas mínimas 
      destinado a aumentarse mediante el uso de  módulos <a href="{{ page.lang }}/resources/middleware.html">middleware</a>.
    </div>
  </div>
</section>
