---
layout: home
title: Express - framework de aplicativo da web Node.js
menu: home
lang: pt-br
description: Express is a fast, unopinionated, minimalist web framework for Node.js,
  providing a robust set of features for web and mobile applications.
---
<section id="home-content">
  {% include header.html %}
  <div id="overlay"></div>
  <div id="homepage-leftpane" class="pane">
    <section id="description">
         <div class="express"><a href="/">Express</a><a href="{{ page.lang }}/changelog/4x.html#{{ site.data.express.current_version }}" id="express-version">{{ site.data.express.current_version }}</a></div>
        <h1 class="description">Framework web rápido, flexível e minimalista para <a href='https://nodejs.org/en/'>Node.js</a></h1>
    </section>
    <div id="install-command">$ npm install express --save</div>
  </div>
  
  <div id="homepage-rightpane" class="pane" markdown="1">

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Olá Mundo!')
})

app.listen(port, () => {
  console.log(`App de exemplo esta rodando na porta ${port}`)
})
```
  </div>
</section>

<section id="intro">

  <div id="boxes" class="clearfix">
      <div id="web-applications">
          <h2>Aplicativos da Web</h2> O Express é um framework para aplicativo da web do Node.js mínimo e flexível que fornece um conjunto robusto de recursos para aplicativos web e móveis.
      </div>

      <div id="apis">
          <h2>APIs</h2> Com uma infinidade de métodos utilitários HTTP e middleware à sua disposição, criar uma API robusta é rápido e fácil.
      </div>

      <div id="performance">
          <h2>Desempenho</h2> O Express fornece uma camada fina de recursos fundamentais para aplicativos da web, sem obscurecer os recursos do Node.js que você conhece e ama.
      </div>

    <div id="middleware">
      <h2>Middleware</h2>
      Express é uma estrutura de roteamento leve e flexível com recursos básicos e mínimos que devem ser 
      aumentados por meio do uso do módulo Express <a href="{{ page.lang }}/resources/middleware.html">middleware</a>.
    </div>
  </div>

</section>