---
layout: page
title: Contoh Penggunaan Express
menu: starter
lang: id
description:
  Explore a collection of Express.js application examples covering various
  use cases, integrations, and advanced configurations to help you learn and build
  your projects.
---

{% capture examples %}{% include readmes/express-master/examples.md %}{% endcapture %}
{{ examples | replace: "](.", "](https://github.com/expressjs/express/tree/master/examples" }}

## Contoh tambahan

Ini adalah beberapa contoh tambahan penggunaan Express dengan integrasi yang lebih luas.

{% include community-caveat.html %}

- [prisma-fullstack](https://github.com/prisma/prisma-examples/tree/latest/pulse/fullstack-simple-chat) - Aplikasi fullstack dengan Next.js menggunakan [Prisma](https://www.npmjs.com/package/prisma) sebagai ORM
- [prisma-rest-api-ts](https://github.com/prisma/prisma-examples/tree/latest/orm/express) - REST API dengan Express dalam TypeScript menggunakan [Prisma](https://www.npmjs.com/package/prisma) sebagai ORM

### [Previous: Static Files ](/{{ page.lang }}/starter/static-files.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: FAQ ](/{{ page.lang }}/starter/faq.html)
