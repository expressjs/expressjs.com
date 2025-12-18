---
layout: home
title: Express - Node.js framework para aplicações web
description: "Express é  rápido, sem opinião e minimalista para Node.js, fornecendo um conjunto robusto de recursos para aplicativos web e móveis."
menu: home
redirect_from: "  "
---

<section id="home-content">
  <div id="homepage-leftpane" class="pane">
    <section id="description">
        <div class="express"><span>Express</span><a href="{{ page.lang }}/changelog/#{{ site.data.express.current_version }}" id="express-version">{{ site.data.express.current_version }}</a></div>
        <h1 class="description">Uma estrutura web rápida, flexível e minimalista para aplicativos Node.js</h1>
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
</section>
{% endif %}

<section id="intro">
  <div id="boxes" class="clearfix">
    <div id="web-applications">
      <h2>Aplicações Web</h2> Express é um framework para aplicativos web Node.js, mínimo e flexível que fornece um conjunto robusto de recursos para aplicativos web e móveis.
    </div>
    <div id="apis">
      <h2>APIs</h2>Com uma infinidade de métodos utilitários HTTP e middleware à sua disposição, criar uma API robusta é rápido e fácil.</div>
    <div id="performance">
      <h2>Desempenho</h2> Express fornece uma fina camada de recursos fundamentais de aplicativos web, sem obscurecer recursos de Node.js que você conhece e ama.
    </div>
    <div id="middleware">
      <h2>Middleware</h2> 
      Express é uma framework de roteamento leve e flexível com recursos centrais mínimos 
      destinados a ser aumentada através do uso de módulos Express <a href="{{ page.lang }}/resources/middleware.html">middleware</a> . 
    </div>
  </div>
</section>
