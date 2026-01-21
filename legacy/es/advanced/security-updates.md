---
layout: page
title: Actualizaciones de seguridad de Express
description: Review the latest security updates and patches for Express.js, including detailed vulnerability lists for different versions to help maintain a secure application.
menu: advanced
order: 2
redirect_from: "  "
---

# Actualizaciones de seguridad

<div class="doc-box doc-notice" markdown="1">
Node.js vulnerabilities directly affect Express. Por lo tanto, [vigile las vulnerabilidades de Node.js](https://nodejs.org
/en/blog/vulnerability/) y asegúrese de utilizar la versión estable más reciente de Node.js.
</div>

En la lista siguiente se muestran las vulnerabilidades de Express que se han solucionado en la actualización de versión especificada.

{% capture security-policy %}
If you believe you have discovered a security vulnerability in Express, please see
[Security Policies and Procedures](/{{page.lang}}/resources/contributing.html#security-policies-and-procedures).
{% endcapture %}

{% include admonitions/note.html content=security-policy %}

## 4.x

- 4.21.2
  - The dependency `path-to-regexp` has been updated to address a [vulnerability](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-rhx6-c78j-4q9w).
- 4.21.1
  - The dependency `cookie` has been updated to address a [vulnerability](https://github.com/jshttp/cookie/security/advisories/GHSA-pxg6-pf52-xh8x), This may affect your application if you use `res.cookie`.
- 4.20.0
  - Fixed XSS vulnerability in `res.redirect` ([advisory](https://github.com/expressjs/express/security/advisories/GHSA-qw6h-vgh9-j6wx), [CVE-2024-43796](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-43796)).
  - The dependency `serve-static` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-cm22-4g7w-348p).
  - The dependency `send` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-m6fv-jmcg-4jfg).
  - The dependency `path-to-regexp` has been updated to address a [vulnerability](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-9wv6-86v2-598j).
  - The dependency `body-parser` has been updated to addres a [vulnerability](https://github.com/advisories/GHSA-qwcr-r2fm-qrc7), This may affect your application if you had url enconding activated.
- 4.19.0, 4.19.1
  - Fixed open redirect vulnerability in `res.location` and `res.redirect` ([advisory](https://github.com/expressjs/express/security/advisories/GHSA-rv95-896h-c2vc), [CVE-2024-29041](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-29041)).
- 4.17.3
  - The dependency `qs` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-hrpp-h998-j3pp). This may affect your application if the following APIs are used: `req.query`, `req.body`, `req.param`.
- 4.16.0
  - The dependency `forwarded` has been updated to address a [vulnerability](https://npmjs.com/advisories/527). This may affect your application if the following APIs are used: `req.host`, `req.hostname`, `req.ip`, `req.ips`, `req.protocol`.
  - The dependency `mime` has been updated to address a [vulnerability](https://npmjs.com/advisories/535), but this issue does not impact Express.
  - The dependency `send` has been updated to provide a protection against a [Node.js 8.5.0 vulnerability](https://nodejs.org/en/blog/vulnerability/september-2017-path-validation/). This only impacts running Express on the specific Node.js version 8.5.0.
- 4.15.5
  - The dependency `debug` has been updated to address a [vulnerability](https://snyk.io/vuln/npm:debug:20170905), but this issue does not impact Express.
  - The dependency `fresh` has been updated to address a [vulnerability](https://npmjs.com/advisories/526). This will affect your application if the following APIs are used: `express.static`, `req.fresh`, `res.json`, `res.jsonp`, `res.send`, `res.sendfile` `res.sendFile`, `res.sendStatus`.
- 4.15.3
  - The dependency `ms` has been updated to address a [vulnerability](https://snyk.io/vuln/npm:ms:20170412). This may affect your application if untrusted string input is passed to the `maxAge` option in the following APIs: `express.static`, `res.sendfile`, and `res.sendFile`.
- 4.15.2
  - The dependency `qs` has been updated to address a [vulnerability](https://snyk.io/vuln/npm:qs:20170213), but this issue does not impact Express. Updating to 4.15.2 is a good practice, but not required to address the vulnerability.
- 4.11.1
  - Se ha solucionado la vulnerabilidad de divulgación de vía de acceso raíz en `express.static`, `res.sendfile` y `res.sendFile`
- 4.10.7
  - Se ha solucionado la vulnerabilidad de Open Redirect en `express.static` ([anuncio](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
- 4.8.8
  - Se han solucionado las vulnerabilidades de cruce de directorios en `express.static` ([anuncio](http://npmjs.com/advisories/32) , [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)).
- 4.8.4
  - Node.js 0.10 puede tener fugas de `fd` en determinadas situaciones que afectan a `express.static` y `res.sendfile`. Las solicitudes maliciosas pueden provocar la fuga de `fd` y, en última instancia, generar errores `EMFILE` y anular la capacidad de respuesta del servidor.
- 4.8.0
  - Las matrices dispersas que tienen índices extremadamente altos en la serie de consulta pueden hacer que el proceso se quede sin memoria y se bloquee el servidor.
  - Los objetos de serie de consulta extremadamente anidados pueden hacer que se bloquee el proceso y anular la capacidad de respuesta del servidor temporalmente.

## 3.x

  <div class="doc-box doc-warn" markdown="1">
  **Express 3.x YA NO SE MANTIENE**

Los problemas de rendimiento y seguridad conocidos y desconocidos en 3.x no se han solucionado desde la última actualización (1 de agosto de 2015). Se recomienda especialmente utilizar la última versión de Express.

If you are unable to upgrade past 3.x, please consider [Commercial Support Options](/{{ page.lang }}/support#commercial-support-options).

  </div>

- 3.19.1
  - Se ha solucionado la vulnerabilidad de divulgación de vía de acceso raíz en `express.static`, `res.sendfile` y `res.sendFile`
- 3.19.0
  - Se ha solucionado la vulnerabilidad de Open Redirect en `express.static` ([anuncio](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
- 3.16.10
  - Se han solucionado las vulnerabilidades de cruce de directorios en `express.static`.
- 3.16.6
  - Node.js 0.10 puede tener fugas de `fd` en determinadas situaciones que afectan a `express.static` y `res.sendfile`. Las solicitudes maliciosas pueden provocar la fuga de `fd` y, en última instancia, generar errores `EMFILE` y anular la capacidad de respuesta del servidor.
- 3.16.0
  - Las matrices dispersas que tienen índices extremadamente altos en la serie de consulta pueden hacer que el proceso se quede sin memoria y se bloquee el servidor.
  - Los objetos de serie de consulta extremadamente anidados pueden hacer que se bloquee el proceso y anular la capacidad de respuesta del servidor temporalmente.
- 3.3.0
  - La respuesta 404 de un intento de alteración temporal de método no soportado era susceptible de ataques de scripts entre sitios.