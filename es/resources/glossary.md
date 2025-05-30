---
layout: page
title: Glosario de Express
description: A comprehensive glossary of terms related to Express.js, Node.js, middleware, routing, and other key concepts to help you understand and use Express effectively.
menu: resources
lang: es
redirect_from: "  "
---

# Glosario

### application

En general, uno o varios programas diseñados para realizar operaciones para un determinado propósito.  En el contexto de Express, un programa que utiliza la API de Express que se ejecuta en la plataforma Node.js.  También puede hacer referencia a un [objeto de aplicación](/{{ page.lang }}/api.html#express).

### API

Application programming interface. Explique la abreviatura la primera vez que la utilice.

### Express

Una infraestructura web rápida, minimalista y flexible para las aplicaciones Node.js. En general, se prefiere "Express" a "Express.js", aunque esta también se acepta.

### libuv

Una biblioteca de soporte multiplataforma que se centra en la E/S asíncrona, desarrollada principalmente para su uso en Node.js.

### middleware

Una función invocada por la capa de direccionamiento de Express antes del manejador de la última solicitud, por lo que se sitúa en medio de una solicitud sin formato y la última ruta prevista. Algunos puntos delicados de terminología relacionados con el middleware:

- `var foo = require('middleware')` significa que _requiere_ o _utiliza_ un módulo Node.js. A continuación, la sentencia `var mw = foo()` normalmente devuelve el middleware.
- `app.use(mw)` significa que _se añade el middleware a la pila de procesos global_.
- `app.get('/foo', mw, function (req, res) { ... })` significa que _se añade el middleware a la pila de procesos "GET /foo"_.

### Node.js

Una plataforma de software que se utiliza para crear aplicaciones de red escalables. Node.js utiliza JavaScript como lenguaje de script y consigue un elevado rendimiento mediante E/S sin bloqueo y un bucle de sucesos de una sola hebra. Consulte [nodejs.org](http://nodejs.org/). **Nota de uso**: inicialmente, "Node.js", posteriormente "Node".

### Consulte [Open source software en la Wikipedia](http://en.wikipedia.org/wiki/Open-source_software).

When used as an adjective, hyphenate; for example: "This is open-source software." See [Open-source software on Wikipedia](http://en.wikipedia.org/wiki/Open-source_software).

{% capture english-rules %}

Although it is common not to hyphenate this term, we are using the standard English rules for hyphenating a compound adjective.

{% endcapture %}

{% include admonitions/note.html content=english-rules %}

### request

Una solicitud HTTP. Un cliente envía un mensaje de solicitud HTTP a un servidor, que devuelve una respuesta.  La solicitud debe utilizar uno de los [métodos de solicitud](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) como, por ejemplo, GET, POST, etc.

### response

An HTTP response. A server returns an HTTP response message to the client. La respuesta contiene información de estado de finalización sobre la solicitud y también puede contener contenido de la solicitud en el cuerpo del mensaje.

### route

Parte de un URL que identifica un recurso. For example, in `http://foo.com/products/id`, "/products/id" is the route.

### router

Consulte [direccionador](/{{ page.lang }}/4x/api.html#router) en la referencia de API.
