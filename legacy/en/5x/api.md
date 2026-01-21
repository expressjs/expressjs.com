---
layout: api
version: 5x
title: Express 5.x - API Reference
description: Access the API reference for Express.js 5.x, detailing all modules, methods, and properties for building web applications with this latest version.
menu: api
redirect_from: "/5x/api.html"
---
<div id="api-doc" markdown="1">

  <h1>5.x API</h1>

  {% capture node-version %}

  Express 5.0 requires Node.js 18 or higher.

  {% endcapture %}

  {% include admonitions/note.html content=node-version %}

  <a id='express' class='h2'></a>
  {% include api/en/5x/express.md %}
  <a id='app' class='h2'></a>
  {% include api/en/5x/app.md %}
  <a id='req' class='h2'></a>
  {% include api/en/5x/req.md %}
  <a id='res' class='h2'></a>
  {% include api/en/5x/res.md %}
  <a id='router' class='h2'></a>
  {% include api/en/5x/router.md %}

</div>
