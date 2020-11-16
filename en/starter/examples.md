---
layout: page
title: Express examples
menu: starter
lang: en
redirect_from: "/starter/examples.html"
---

{% capture examples %}{% include readmes/express-master/examples.md %}{% endcapture %}
{{ examples | replace: "](.", "](https://github.com/expressjs/express/tree/master/examples" }}

## Additional examples

These are some additional examples with more extensive integrations.

{% include community-caveat.html %}

- [prisma-express-graphql](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-express) - GraphQL API with `express-graphql` using [Prisma](https://www.npmjs.com/package/prisma) as an ORM
- [prisma-fullstack](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-express) - Fullstack app with Next.js using [Prisma](https://www.npmjs.com/package/prisma) as an ORM
- [prisma-rest-api-js](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-express) - REST API with Express in JavaScript using [Prisma](https://www.npmjs.com/package/prisma) as an ORM
- [prisma-rest-api-ts](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express) - REST API with Express in TypeScript using [Prisma](https://www.npmjs.com/package/prisma) as an ORM


###  [Previous: Static Files ](/{{ page.lang }}/starter/static-files.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: FAQ ](/{{ page.lang }}/starter/faq.html)
