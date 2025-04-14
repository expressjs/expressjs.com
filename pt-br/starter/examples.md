---
layout: page
title: Exemplos do Express
description: Explore uma coleção de exemplos de aplicações em Express.js cobrindo diversos casos de uso, integrações e configurações avançadas para te ajudar a aprender e construir seus projetos.
menu: starter
lang: pt-br
redirect_from: /starter/examples.html
---

{% capture examples %}{% include readmes/express-master/examples.md %}{% endcapture %}
{{ examples | replace: "](.", "](https://github.com/expressjs/express/tree/master/examples" }}

## Exemplos adicionais

Estes são alguns exemplos adicionais com integrações mais extensas.

{% include community-caveat.html %}

- [prisma-fullstack](https://github.com/prisma/prisma-examples/tree/latest/pulse/fullstack-simple-chat) - Aplicativo Fullstack com Express e Next.js utilizando [Prisma](https://www.npmjs.com/package/prisma) como ORM
- [prisma-rest-api-ts](https://github.com/prisma/prisma-examples/tree/latest/orm/express) - API REST com Express em TypeScript utilizando [Prisma](https://www.npmjs.com/package/prisma) como ORM

### [Anterior: Arquivos Estáticos ](/{{ page.lang }}/starter/static-files.html)&nbsp;&nbsp;&nbsp;&nbsp;[Próximo: Perguntas mais frequentes ](/{{ page.lang }}/starter/faq.html)
