---
layout: api
version: 4x
title: Express 4.x - API Reference
description: Access the API reference for Express.js 4.x, detailing all modules, methods, and properties for building web applications with this version.
menu: api
redirect_from: "/4x/api.html"
---
<div id="api-doc" markdown="1">

  <h1>4.x API</h1>

  {% capture node-version %}

  Express 4.0 requires Node.js 0.10 or higher.

  {% endcapture %}
  
  {% include admonitions/note.html content=node-version %}
  
  <a id='express' class='h2'></a>
  {% include api/en/4x/express.md %}
  <a id='app' class='h2'></a>
  {% include api/en/4x/app.md %}
  <a id='req' class='h2'></a>
  {% include api/en/4x/req.md %}
  <a id='res' class='h2'></a>
  {% include api/en/4x/res.md %}
  <a id='router' class='h2'></a>
  {% include api/en/4x/router.md %}
</div>
