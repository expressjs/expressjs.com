---
layout: page
title: Manejo de errores de Express
menu: guide
lang: es
---

# Manejo de errores

Defina las funciones de middleware de manejo de errores de la misma forma que otras funciones de middleware, excepto que las funciones de manejo de errores tienen cuatro argumentos en lugar de tres: `(err, req, res, next)`. Por ejemplo:

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

El middleware de manejo de errores se define al final, después de otras llamadas de rutas y `app.use()`; por ejemplo:

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
</code>
</pre>

Las respuestas desde una función de middleware pueden estar en el formato que prefiera, por ejemplo, una página de errores HTML, un mensaje simple o una serie JSON.

A efectos de la organización (y de infraestructura de nivel superior), puede definir varias funciones de middleware de manejo de errores, de la misma forma que con las funciones de middleware normales. Por ejemplo, si desea definir un manejador de errores para las solicitudes realizadas utilizando `XHR`, y las que no lo tienen, puede utilizar los siguientes mandatos:

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
</code>
</pre>

En este ejemplo, los `logErrors` genéricos pueden escribir información de solicitudes y errores en `stderr`, por ejemplo:

<pre>
<code class="language-javascript" translate="no">
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
</code>
</pre>

También en este ejemplo, `clientErrorHandler` se define de la siguiente manera; en este caso, el error se pasa de forma explícita al siguiente:

<pre>
<code class="language-javascript" translate="no">
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
</code>
</pre>

La función que detecta todos los errores de `errorHandler` puede implementarse de la siguiente manera:

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>

Si pasa cualquier valor a la función `next()` (excepto la serie `'route'`), Express considera que la solicitud actual tiene un error y omitirá las restantes funciones de middleware y direccionamiento que no son de manejo de errores. Si desea manejar ese error de alguna manera, deberá crear una ruta de manejo de errores como se describe en la siguiente sección.

Si tiene un manejador de rutas con varias funciones de devolución de llamada, puede utilizar el parámetro `route` para omitir el siguiente manejador de rutas.  Por ejemplo:

<pre>
<code class="language-javascript" translate="no">
app.get('/a_route_behind_paywall',
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) {

      // continue handling this request
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });
</code>
</pre>

En este ejemplo, se omitirá el manejador `getPaidContent`, pero los restantes manejadores en `app` para `/a_route_behind_paywall` continuarán ejecutándose.

<div class="doc-box doc-info" markdown="1">
Las llamadas a `next()` y `next(err)` indican que el manejador actual está completo y en qué estado.  `next(err)` omitirá los demás manejadores de la cadena, excepto los que se hayan configurado para manejar errores como se ha descrito anteriormente.
</div>

## El manejador de errores predeterminado

Express se suministra con un manejador de errores incorporado, que se encarga de los errores que aparecen en la aplicación. Esta función de middleware de manejo de errores predeterminada se añade al final de la pila de funciones de middleware.

Si pasa un error a `next()` y no lo maneja en el manejador de errores, lo manejará el manejador de errores incorporado; el error se escribirá en el cliente con el seguimiento de la pila. El seguimiento de la pila no se incluye en el entorno de producción.

<div class="doc-box doc-info" markdown="1">
Establezca la variable de entorno `NODE_ENV` en `production`, para ejecutar la aplicación en modalidad de producción.
</div>

Si invoca `next()` con un error después de haber empezado a escribir la respuesta (por ejemplo, si encuentra un error mientras se envía la respuesta en modalidad continua al cliente), el manejador de errores predeterminado de Express cierra la conexión y falla la solicitud.

Por lo tanto, cuando añade un manejador de errores personalizado, se recomienda delegar en los mecanismos de manejo de errores predeterminados de Express, cuando las cabeceras ya se han enviado al cliente:

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>
