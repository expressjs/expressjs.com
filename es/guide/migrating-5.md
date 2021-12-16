---
layout: page
title: Migración a Express 5
menu: guide
lang: es
---

# Migración a Express 5

<h2 id="overview">Visión general</h2>

Express 5.0 continúa en la etapa del release alfa, pero hay una vista previa de los cambios que habrá en el release y cómo migrar la aplicación Express 4 a Express 5.

Express 5 no es muy diferente de Express 4: los cambios en la API no son tan significativos como los de la migración de 3.0 a 4.0.  Aunque la API básica permanece igual, continúa habiendo cambios que rompen el código existente; es decir, un programa de Express 4 existente no funcionará si lo actualiza para que utilice Express 5.

Para instalar el release alpha más reciente y obtener una vista previa de Express 5, especifique el siguiente mandato en el directorio raíz de la aplicación:

```console
$ npm install express@5.0.0-alpha.2 --save
```

A continuación, puede ejecutar las pruebas automatizadas para ver qué falla y solucionar los problemas según las actualizaciones siguientes. Después de solucionar los errores de las pruebas, ejecute la aplicación para ver qué errores se producen. Verá rápidamente si la aplicación utiliza métodos o propiedades que no están soportados.

<h2 id="changes">Cambios en Express 5</h2>

A continuación, se muestra la lista de cambios (a partir del release alpha 2) que le afectarán como usuario de Express.
Consulte la [Pull request](https://github.com/expressjs/express/pull/2237) para ver una lista de todas las características planificadas.

**Métodos y propiedades eliminados**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Nombres de métodos pluralizados</a></li>
  <li><a href="#leading">Dos puntos delanteros en el argumento de nombre en app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**Modificados**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**Mejoras**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>Métodos y propiedades eliminados</h3>

Si utiliza cualquiera de estos métodos o propiedades en la aplicación, se bloqueará. Por lo tanto, deberá cambiar la aplicación después de actualizar a la versión 5.

<h4 id="app.del">app.del()</h4>

Express 5 ya no da soporte a la función `app.del()`. Si utiliza esta función, se genera un error. Para registrar las rutas HTTP DELETE, utilice la función `app.delete()` en su lugar.

Inicialmente, se utilizaba `del` en lugar de `delete`, porque `delete` es una palabra clave reservada en JavaScript. No obstante, a partir de ECMAScript 6, `delete` y otras palabras clave reservadas pueden utilizarse correctamente como nombres de propiedad. Puede leer aquí la discusión que llevó a descartar la función `app.del`.

<h4 id="app.param">app.param(fn)</h4>

La firma `app.param(fn)` se utilizaba para modificar el comportamiento de la función `app.param(name, fn)`. Está en desuso desde v4.11.0 y Express 5 ya no le da soporte.

<h4 id="plural">Nombres de métodos pluralizados</h4>

Los siguientes nombres de métodos se han pluralizado. En Express 4, el uso de los métodos antiguos daba como resultado un aviso de obsolescencia.  Express 5 ya no les da soporte:

`req.acceptsCharset()` se ha sustituido por `req.acceptsCharsets()`.

`req.acceptsEncoding()` se ha sustituido por `req.acceptsEncodings()`.

`req.acceptsLanguage()` se ha sustituido por `req.acceptsLanguages()`.

<h4 id="leading">Dos puntos (:) delanteros en el nombre de app.param(name, fn)</h4>

El carácter de dos puntos (:) delanteros en el nombre de la función `app.param(name, fn)` es un remanente de Express 3 y, a efectos de retrocompatibilidad, Express 4 le daba soporte con un aviso de obsolescencia. Express 5 lo ignorará de forma silenciosa y utilizará el parámetro de nombre sin añadir el prefijo de dos puntos.

Esto no afectará al código si sigue la documentación de Express 4 de [app.param](/{{ page.lang }}/4x/api.html#app.param), ya que no hace ninguna referencia a los dos puntos delanteros.

<h4 id="req.param">req.param(name)</h4>

Este método potencialmente confuso y peligroso de recuperar datos de formulario se ha eliminado. No necesitará buscar específicamente el nombre de parámetro enviado en el objeto `req.params`, `req.body` o `req.query`.

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 ya no da soporte a la firma `res.json(obj, status)`. En su lugar, establezca el estado y encadénelo al método `res.json()` de la siguiente manera: `res.status(status).json(obj)`.

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 ya no da soporte a la firma `res.jsonp(obj, status)`. En su lugar, establezca el estado y encadénelo al método `res.jsonp()` de la siguiente manera: `res.status(status).jsonp(obj)`.

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 ya no da soporte a la firma `res.send(obj, status)`. En su lugar, establezca el estado y encadénelo al método `res.send()` de la siguiente manera: `res.status(status).send(obj)`.

<h4 id="res.send.status">res.send(status)</h4>

Express 5 ya no da soporte a la firma <code>res.send(<em>status</em>)</code>, donde *`status`* es un número. En su lugar, utilice la función `res.sendStatus(statusCode)`, que establece el código de estado de la cabecera de respuesta HTTP y envía la versión de texto del código: "Not Found", "Internal Server Error", etc.
Si necesita enviar un número utilizando la función `res.send()`, escríbalo entre comillas para convertirlo en una serie, para que Express no lo interprete como un intento de utilizar la firma antigua no soportada.

<h4 id="res.sendfile">res.sendfile()</h4>

La función `res.sendfile()` se ha sustituido por una versión de la función `res.sendFile()` con cada palabra en mayúscula en Express 5.

<h3>Modificados</h3>

<h4 id="app.router">app.router</h4>

El objeto `app.router`, que se ha eliminado en Express 4, ha vuelto en Express 5. En la nueva versión, este objeto es sólo una referencia al direccionador de Express base, a diferencia de en Express 3, donde una aplicación debía cargarlo explícitamente.

<h4 id="req.host">req.host</h4>

En Express 4, la función `req.host` fragmentaba incorrectamente el número de puerto si estaba presente. En Express 5, el número de puerto se mantiene.

<h4 id="req.query">req.query</h4>

De Express 4.7 y Express 5 en adelante, la opción de analizador de consultas puede aceptar `false` para inhabilitar el análisis de series de consulta si desea utilizar su propia función para la lógica de análisis de series de consulta.

<h3>Mejoras</h3>

<h4 id="res.render">res.render()</h4>

Este método ahora impone un comportamiento asíncrono para todos los motores de vistas, lo que evita los errores provocados por los motores de vistas que tenían una implementación síncrona e incumplían la interfaz recomendada.
