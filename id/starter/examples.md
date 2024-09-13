---
layout: page
title: Contoh Penggunaan Express
menu: starter
lang: id
---

{% capture examples %}{% include readmes/express-master/examples.md %}{% endcapture %}
{{ examples | replace: "](.", "](https://github.com/expressjs/express/tree/master/examples" }}

## Contoh tambahan

Ini adalah beberapa contoh tambahan penggunaan Express dengan integrasi yang lebih luas.

{% include community-caveat.html %}

- [prisma-express-graphql](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-express) - GraphQL API dengan `express-graphql` menggunakan [Prisma](https://www.npmjs.com/package/prisma) sebagai ORM
- [prisma-fullstack](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-express) - Aplikasi fullstack dengan Next.js menggunakan [Prisma](https://www.npmjs.com/package/prisma) sebagai ORM
- [prisma-rest-api-js](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-express) - REST API dengan Express dalam JavaScript menggunakan [Prisma](https://www.npmjs.com/package/prisma) sebagai ORM
- [prisma-rest-api-ts](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express) - REST API dengan Express dalam TypeScript menggunakan [Prisma](https://www.npmjs.com/package/prisma) sebagai ORM


###  [Previous: Static Files ](/{{ page.lang }}/starter/static-files.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: FAQ ](/{{ page.lang }}/starter/faq.html)
