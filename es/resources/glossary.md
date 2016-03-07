---
layout: page
title: Glosario de Express
menu: resources
lang: es
---

# Glosario

### API

Interfaz de programación de aplicaciones.  Explique la abreviatura la primera vez que la utilice.

### aplicación

En general, uno o varios programas diseñados para realizar operaciones para un determinado propósito.  En el contexto de Express, un programa que utiliza la API de Express que se ejecuta en la plataforma Node.js.  También puede hacer referencia a un [objeto de aplicación](/{{ page.lang }}/api.html#express).

### código abierto

Consulte [Open source software en la Wikipedia](http://en.wikipedia.org/wiki/Open-source_software).

### direccionador

Consulte [direccionador](/{{ page.lang }}/4x/api.html#router) en la referencia de API.

### Express

Una infraestructura web rápida, minimalista y flexible para las aplicaciones Node.js.  En general, se prefiere "Express" a "Express.js", aunque esta también se acepta.

### libuv

Una biblioteca de soporte multiplataforma que se centra en la E/S asíncrona, desarrollada principalmente para su uso en Node.js.

### middleware

Una función invocada por la capa de direccionamiento de Express antes del manejador de la última solicitud, por lo que se sitúa en medio de una solicitud sin formato y la última ruta prevista.  Algunos puntos delicados de terminología relacionados con el middleware:

  * `var foo = require('middleware')` significa que *requiere* o *utiliza* un módulo Node.js. A continuación, la sentencia `var mw = foo()` normalmente devuelve el middleware.
  * `app.use(mw)` significa que *se añade el middleware a la pila de procesos global*.
  * `app.get('/foo', mw, function (req, res) { ... })` significa que *se añade el middleware a la pila de procesos "GET /foo"*.

### Node.js

Una plataforma de software que se utiliza para crear aplicaciones de red escalables. Node.js utiliza JavaScript como lenguaje de script y consigue un elevado rendimiento mediante E/S sin bloqueo y un bucle de sucesos de una sola hebra.  Consulte [nodejs.org](http://nodejs.org/). **Nota de uso**: inicialmente, "Node.js", posteriormente "Node".

### respuesta

Una respuesta HTTP. Un servidor devuelve un mensaje de respuesta HTTP al cliente. La respuesta contiene información de estado de finalización sobre la solicitud y también puede contener contenido de la solicitud en el cuerpo del mensaje.

### ruta

Parte de un URL que identifica un recurso.  Por ejemplo, en `http://foo.com/products/id`, "/products/id" es la ruta.

### solicitud

Una solicitud HTTP.  Un cliente envía un mensaje de solicitud HTTP a un servidor, que devuelve una respuesta.  La solicitud debe utilizar uno de los [métodos de solicitud](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) como, por ejemplo, GET, POST, etc.
