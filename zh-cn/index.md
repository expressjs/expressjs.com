---
layout: home
title: Express - Node.js web application framework
description: "Express 是一个基于 Node.js 的快速、开放、极简的 Web 框架，为 Web 和移动应用程序提供了一套强大的功能特性。"
menu: home
lang: zh
redirect_from: "  "
---

<section id="home-content">
  <div id="homepage-leftpane" class="pane">
    <section id="description">
        <div class="express"><a href="/">Express</a><a href="{{ page.lang }}/changelog/4x.html#{{ site.data.express.current_version }}" id="express-version">{{ site.data.express.current_version }}</a></div>
        <h1 class="description">基于 <a href='https://nodejs.org/en/'>Node.js</a> 的快速、灵活、极简的 Web 框架</h1>
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
      <h2>Web 应用</h2> Express 是一个简洁而灵活的 Node.js Web 应用框架，为 Web 及移动应用提供了一套强大的功能集。
    </div>
    <div id="apis">
      <h2>接口</h2> 借助丰富的 HTTP 工具方法和中间件支持，您能够快速轻松地构建健壮的 API 接口。
    </div>
    <div id="performance">
      <h2>性能</h2> Express 在保留您熟悉且喜爱的 Node.js 特性的同时，提供了一层精简的核心 Web 应用功能。
    </div>
    <div id="middleware">
      <h2>中间件</h2> 
      Express 是一款轻量灵活的路由框架，其核心功能精简高效，开发者可通过Express<a href="{{ page.lang }}/resources/middleware.html">中间件</a>模块灵活扩展功能。
    </div>
  </div>
</section>
