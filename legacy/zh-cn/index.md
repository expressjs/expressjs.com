---
layout: home
title: Express - Node.js web 应用框架
description: "Express 是 Node.js 的一个快速、灵活、极简的Web框架，为网页和移动应用提供了一套强大的功能特性。"
menu: home
redirect_from: "  "
---

<section id="home-content">
  <div id="homepage-leftpane" class="pane">
    <section id="description">
        <div class="express"><span>Express</span><a href="https://github.com/expressjs/express/releases" id="express-version">{{ site.data.express.current_version }}</a></div>
        <h1 class="description">快速、灵活、极简的 <a href='https://nodejs.org/en/'>Node.js</a> Web 框架</h1>
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
      <h2>Web 应用开发</h2> Express 是一个简洁灵活的 Node.js Web 应用框架，为网页和移动应用提供了一套强大的功能特性。
    </div>
    <div id="apis">
      <h2>API 开发</h2> 借助丰富的 HTTP 工具方法和中间件支持，快速构建健壮的 API 接口易如反掌。
    </div>
    <div id="performance">
      <h2>性能表现</h2> Express 提供基础的 Web 应用功能薄层封装，绝不遮蔽您熟悉且喜爱的原生 Node.js 特性。
    </div>
    <div id="middleware">
      <h2>中间件</h2> 
      Express是一个轻量和灵活的路由框架，核心功能最小， 
      将通过使用Express <a href="{{ page.lang }}/resources/middleware.html">中间件</a> 模块来增加。
    </div>
  </div>
</section>
