---
layout: home
title: Express - Node.js web application framework
description: "Express is a fast, unopinionated, minimalist web framework for Node.js, providing a robust set of features for web and mobile applications."
menu: home
lang: en
redirect_from: "/en/index.html"
---
<section id="home-content">
  {% include header.html %}
  <div id="overlay"></div>
  <div id="homepage-leftpane" class="pane">
    <section id="description">
        <div class="express"><a href="/">Express</a><a href="{{ page.lang }}/changelog/4x.html#{{ site.data.express.current_version }}" id="express-version">{{ site.data.express.current_version }}</a></div>
        <h1 class="description">Fast, unopinionated, minimalist web framework for <a href='https://nodejs.org/en/'>Node.js</a></h1>
    </section>
    <div id="install-command">$ npm install express --save</div>
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
      <h2>Web Applications</h2> Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
    </div>

    <div id="apis">
      <h2>APIs</h2> With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.
    </div>

    <div id="performance">
      <h2>Performance</h2> Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.
    </div>

    <div id="middleware">
      <h2>Middleware</h2> 
      Express is a lightweight and flexible routing framework with minimal core features 
      meant to be augmented through the use of Express <a href="{{ page.lang }}/resources/middleware.html">middleware</a> modules.
    </div>
  </div>

</section>
