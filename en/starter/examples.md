---
layout: page
title: Express examples
menu: starter
lang: en
redirect_from: "/starter/examples.html"
---

{% capture examples %}{% include readmes/express-master/examples.md %}{% endcapture %}
{{ examples | replace: "](.", "](https://github.com/expressjs/express/tree/master/examples" }}

The following list contains some ready-to-run examples that show how to use Express with a **SQL database** using [Prisma](https://github.com/prisma/prisma) as an ORM:

- [fullstack](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-express): Fullstack app with Next.js
- [express-graphql](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-express): GraphQL API with `express-graphql`
- [rest-api-ts](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express): REST API with Express in TypeScript
- [rest-api-js](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-express): REST API with Express in JavaScript


###  [Previous: Static Files ](/{{ page.lang }}/starter/static-files.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: FAQ ](/{{ page.lang }}/starter/faq.html)
