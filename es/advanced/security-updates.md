---
layout: page
title: Actualizaciones de seguridad de Express
menu: advanced
lang: es
---

# Actualizaciones de seguridad

<div class="doc-box doc-notice" markdown="1">
Las vulnerabilidades de Node.js afectan directamente a Express. Por lo tanto, [vigile las vulnerabilidades de Node.js](http://blog.nodejs.org/vulnerability/) y asegúrese de utilizar la versión estable más reciente de Node.js.
</div>

En la lista siguiente se muestran las vulnerabilidades de Express que se han solucionado en la actualización de versión especificada.

## 4.x

  * 4.11.1
    * Se ha solucionado la vulnerabilidad de divulgación de vía de acceso raíz en `express.static`, `res.sendfile` y `res.sendFile`
  * 4.10.7
    * Se ha solucionado la vulnerabilidad de Open Redirect en `express.static` ([anuncio](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 4.8.8
    * Se han solucionado las vulnerabilidades de cruce de directorios en `express.static` ([anuncio](http://npmjs.com/advisories/32) , [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)).
  * 4.8.4
    * Node.js 0.10 puede tener fugas de `fd` en determinadas situaciones que afectan a `express.static` y `res.sendfile`. Las solicitudes maliciosas pueden provocar la fuga de `fd` y, en última instancia, generar errores `EMFILE` y anular la capacidad de respuesta del servidor.
  * 4.8.0
    * Las matrices dispersas que tienen índices extremadamente altos en la serie de consulta pueden hacer que el proceso se quede sin memoria y se bloquee el servidor.
    * Los objetos de serie de consulta extremadamente anidados pueden hacer que se bloquee el proceso y anular la capacidad de respuesta del servidor temporalmente.

## 3.x

  * 3.19.1
    * Se ha solucionado la vulnerabilidad de divulgación de vía de acceso raíz en `express.static`, `res.sendfile` y `res.sendFile`
  * 3.19.0
    * Se ha solucionado la vulnerabilidad de Open Redirect en `express.static` ([anuncio](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 3.16.10
    * Se han solucionado las vulnerabilidades de cruce de directorios en `express.static`.
  * 3.16.6
    * Node.js 0.10 puede tener fugas de `fd` en determinadas situaciones que afectan a `express.static` y `res.sendfile`. Las solicitudes maliciosas pueden provocar la fuga de `fd` y, en última instancia, generar errores `EMFILE` y anular la capacidad de respuesta del servidor.
  * 3.16.0
    * Las matrices dispersas que tienen índices extremadamente altos en la serie de consulta pueden hacer que el proceso se quede sin memoria y se bloquee el servidor.
    * Los objetos de serie de consulta extremadamente anidados pueden hacer que se bloquee el proceso y anular la capacidad de respuesta del servidor temporalmente.
  * 3.3.0
    * La respuesta 404 de un intento de alteración temporal de método no soportado era susceptible de ataques de scripts entre sitios.
