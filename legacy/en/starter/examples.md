---
layout: page
title: Express examples
description: Explore a collection of Express.js application examples covering various use cases, integrations, and advanced configurations to help you learn and build your projects.
menu: starter
order: 6
redirect_from: "/starter/examples.html"
---

{% capture examples %}{% include readmes/express-master/examples.md %}{% endcapture %}
{{ examples | replace: "](.", "](https://github.com/expressjs/express/tree/master/examples" }}

## Additional examples

These are some additional examples with more extensive integrations.

{% include community-caveat.html %}

- [prisma-fullstack](https://github.com/prisma/prisma-examples/tree/latest/pulse/fullstack-simple-chat) - Fullstack app with Express and Next.js using [Prisma](https://www.npmjs.com/package/prisma) as an ORM
- [prisma-rest-api-ts](https://github.com/prisma/prisma-examples/tree/latest/orm/express) - REST API with Express in TypeScript using [Prisma](https://www.npmjs.com/package/prisma) as an ORM