---
layout: page
title: Escritura de middleware para su uso en aplicaciones Express
menu: guide
lang: es
---

# Escritura de middleware para su uso en aplicaciones Express

<h2>Visión general</h2>

Las funciones de *middleware* son funciones que tienen acceso al [objeto de solicitud](/{{ page.lang }}/4x/api.html#req) (`req`), al [objeto de respuesta](/{{ page.lang }}/4x/api.html#res) (`res`) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada `next`.

Las funciones de middleware pueden realizar las siguientes tareas:

* Ejecutar cualquier código.
* Realizar cambios en la solicitud y los objetos de respuesta.
* Finalizar el ciclo de solicitud/respuestas.
* Invocar el siguiente middleware en la pila.

Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar `next()` para pasar el control a la siguiente función de middleware. De lo contrario, la solicitud quedará colgada.

El siguiente ejemplo muestra los elementos de una llamada a función de middleware:

<table id="mw-fig">
<tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">Método HTTP para el que se aplica la función de middleware.</div>

<div class="callout" id="callout2">Vía de acceso (ruta) para la que se aplica la función de middleware.</div>

<div class="callout" id="callout3">La función de middleware.</div>

<div class="callout" id="callout4">Argumento de devolución de llamada a la función de middleware, denominado "next" por convención.</div>

<div class="callout" id="callout5">Argumento de <a href="../4x/api.html#res">respuesta</a> HTTP a la función de middleware, denominado "res" por convención.</div>

<div class="callout" id="callout6">Argumento de <a href="../4x/api.html#req">solicitud</a> HTTP a la función de middleware, denominado "req" por convención.</div>
</td></tr>
</table> 

A continuación, se muestra un ejemplo de una aplicación Express simple, "Hello World", para la que definirá dos funciones de middleware:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

<h2>Desarrollo</h2>

Este es un ejemplo simple de una función de middleware denominada "myLogger". Esta función simplemente imprime "LOGGED" cuando una solicitud de la aplicación pasa por ella. La función de middleware se asigna a una variable denominada `myLogger`.

<pre>
<code class="language-javascript" translate="no">
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
</code>
</pre>

<div class="doc-box doc-notice" markdown="1">
Observe la llamada anterior a `next()`.  La llamada a esta función invoca la siguiente función de middleware en la aplicación.
La función `next()` no forma parte de la API de Express o Node.js, pero es el tercer argumento que se pasa a la función de middleware.  La función `next()` puede tener cualquier nombre, pero por convención siempre se denomina "next". Para evitar confusiones, utilice siempre esta convención.
</div>

Para cargar la función de middleware, llame a `app.use()`, especificando la función de middleware.
Por ejemplo, el siguiente código carga la función de middleware `myLogger` antes de la ruta a la vía de acceso raíz (/).

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

Cada vez que la aplicación recibe una solicitud, imprime el mensaje "LOGGED" en el terminal.

El orden de carga del middleware es importante: las funciones de middleware que se cargan primero también se ejecutan primero.

Si `myLogger` se carga después de la ruta a la vía de acceso raíz, la solicitud nunca la alcanza y la aplicación no imprime "LOGGED", ya que el manejador de rutas de la vía de acceso raíz determina el ciclo de solicitud/respuestas.

La función de middleware `myLogger` simplemente imprime un mensaje y, a continuación, pasa la solicitud a la siguiente función de middleware de la pila llamando a la función `next()`.

El siguiente ejemplo añade una propiedad denominada `requestTime` al objeto de solicitud. Llamaremos a esta función de middleware "requestTime".

<pre>
<code class="language-javascript" translate="no">
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
</code>
</pre>

La aplicación ahora utiliza la función de middleware `requestTime`. Asimismo, la función de devolución de llamada de la ruta de vía de acceso raíz utiliza la propiedad que la función de middleware añade a `req` (el objeto de solicitud).

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.listen(3000);
</code>
</pre>

Cuando realiza una solicitud a la raíz de la aplicación, la aplicación ahora muestra la indicación de fecha y hora de la solicitud en el navegador.

Como tiene acceso al objeto de solicitud, el objeto de respuesta, la siguiente función de middleware de la pila y toda la API de Node.js, las posibilidades con las funciones de middleware son ilimitadas.

Para obtener más información sobre el middleware de Express, consulte: [Utilización del middleware de Express](/{{ page.lang }}/guide/using-middleware.html).
