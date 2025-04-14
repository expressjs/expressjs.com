---
layout: página
title: Ejemplos exprés
description: Explore una colección de ejemplos de aplicaciones de Express.js que cubren varios casos de uso, integraciones y configuraciones avanzadas para ayudarle a aprender y construir sus proyectos.
menu: iniciador
lang: es
redirect_from: /starter/examples.html
---

{% capture examples %}{% include readmes/express-master/examples.md %}{% endcapture %}
{{ examples | replace: "](.", "](https://github.com/expressjs/express/tree/master/examples" }}

## Ejemplos adicionales

Estos son algunos ejemplos adicionales con integraciones más amplias.

{% include community-caveat.html %}

- [prisma-fullstack](https://github.com/prisma/prisma-examples/tree/latest/pulse/fullstack-simple-chat) - Aplicación completa con Express y Next.js usando [Prisma](https://www.npmjs.com/package/prisma) como ORM
- [prisma-rest-api-ts](https://github.com/prisma/prisma-examples/tree/latest/orm/express) - API REST con Express en TypeScript usando [Prisma](https://www.npmjs.com/package/prisma) como ORM

### [Anterior: Archivos estáticos](/{{ page.lang }}/starter/static-files.html)&nbsp;&nbsp;&nbsp;&nbsp;[Siguiente: Preguntas frecuentes](/{{ page.lang }}/starter/faq.html)
