---
layout: page
title: Mejores prácticas de seguridad para Express en producción
description: Discover crucial security best practices for Express apps in production, including using TLS, input validation, secure cookies, and preventing vulnerabilities.
menu: advanced
order: 3
redirect_from: "  "
---

# Production Best Practices: Security

## Overview

El término _"producción"_ hace referencia a la etapa del ciclo de vida del software donde una aplicación o una API tiene disponibilidad general para sus consumidores o usuarios finales. Por su parte, en la etapa de _"desarrollo"_, todavía estás escribiendo y probando activamente el código, y la aplicación no está abierta para el acceso externo. Los correspondientes entornos del sistema se conocen como los entornos de _producción_ y _desarrollo_, respectivamente.

Los entornos de desarrollo y producción se configuran normalmente de forma diferente y tiene requisitos también muy diferentes. Lo que funciona en el desarrollo puede que no sea aceptable en la producción. Por ejemplo, en un entorno de desarrollo, puede que desee el registro detallado de errores a efecto de depuración, mientras que el mismo comportamiento puede suponer un problema de seguridad en un entorno de producción. De la misma forma, en el desarrollo, no es necesario preocuparse por la escalabilidad, la fiabilidad y el rendimiento, mientras que estos son clave en la producción.

{% capture security-note %}

If you believe you have discovered a security vulnerability in Express, please see
[Security Policies and Procedures](/en/resources/contributing.html#security-policies-and-procedures).

{% endcapture %}

{% include admonitions/note.html content=security-note %}

Security best practices for Express applications in production include:

- [Production Best Practices: Security](#production-best-practices-security)
  - [Overview](#overview)
  - [Don't use deprecated or vulnerable versions of Express](#dont-use-deprecated-or-vulnerable-versions-of-express)
  - [Utilizar TLS](#utilizar-tls)
  - [Do not trust user input](#do-not-trust-user-input)
    - [Prevent open redirects](#prevent-open-redirects)
  - [Utilizar Helmet](#utilizar-helmet)
  - [Reduce fingerprinting](#reduce-fingerprinting)
  - [Utilizar cookies de forma segura](#utilizar-cookies-de-forma-segura)
    - [noCache](https://github.com/helmetjs/nocache) establece cabeceras `Cache-Control` y Pragma para inhabilitar el almacenamiento en memoria caché del lado de cliente.
    - [ieNoOpen](https://github.com/helmetjs/ienoopen) establece `X-Download-Options` para IE8+.
  - [Prevenir ataques de fuerza bruta a la autenticación](#prevenir-ataques-de-fuerza-bruta-a-la-autenticación)
  - [Asegurarse de que las dependencias sean seguras](#asegurarse-de-que-las-dependencias-sean-seguras)
    - [Evitar otras vulnerabilidades conocidas](#evitar-otras-vulnerabilidades-conocidas)
  - [Consideraciones adicionales](#consideraciones-adicionales)

## No utilizar versiones en desuso o vulnerables de Express

Express 2.x y 3.x ya no se mantienen. Los problemas de seguridad y rendimiento en estas versiones no se solucionarán. No las utilice. Si no ha cambiado todavía a la versión 4, siga la [guía de migración](/{{ page.lang }}/guide/migrating-4.html).

Asimismo, asegúrese de que no está utilizando ninguna de las versiones vulnerables de Express que se listan en la [página Actualizaciones de seguridad](/{{ page.lang }}/advanced/security-updates.html). Si las utiliza, actualícese a uno de los releases estables, preferiblemente el más reciente.

## Utilizar TLS

Si la aplicación maneja o transmite datos confidenciales, utilice [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) para proteger la conexión y los datos. Esta tecnología cifra los datos antes de enviarlos desde el cliente al servidor, lo que evita algunos de los ataques de pirateo más comunes (y sencillos). Aunque las solicitudes Ajax y POST no sean obvias visiblemente y parezca que están "ocultas" en los navegadores, su tráfico de red es vulnerable para los [rastreos de paquetes](https://en.wikipedia.org/wiki/Packet_analyzer) y los [ataques de intermediarios](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Es posible que esté familiarizado con el cifrado SSL (Secure Socket Layer). [TLS es simplemente el siguiente paso después de SSL](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515\(v=vs.85\).aspx). Es decir, si antes utilizaba SSL, se recomienda actualizar a TLS. En general, se recomienda Nginx para manejar TLS. Encontrará una buena referencia para configurar TLS en Nginx (y otros servidores) en [la wiki de Mozilla Recommended Server Configurations](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

Asimismo, una herramienta muy útil para obtener un certificado de TLS gratis es [Let's Encrypt](https://letsencrypt.org/about/), una entidad emisora de certificados (CA) abierta, automatizada y gratuita proporcionada por [Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/).

## Do not trust user input

For web applications, one of the most critical security requirements is proper user input validation and handling. This comes in many forms and we will not cover all of them here.
Ultimately, the responsibility for validating and correctly handling the types of user input your application accepts is yours.

### Prevent open redirects

An example of potentially dangerous user input is an _open redirect_, where an application accepts a URL as user input (often in the URL query, for example `?url=https://example.com`) and uses `res.redirect` to set the `location` header and
return a 3xx status.

An application must validate that it supports redirecting to the incoming URL to avoid sending users to malicious links such as phishing websites, among other risks.

Here is an example of checking URLs before using `res.redirect` or `res.location`:

```js
app.use((req, res) => {
  try {
    if (new Url(req.query.url).host !== 'example.com') {
      return res.status(400).end(`Unsupported redirect to host: ${req.query.url}`)
    }
  } catch (e) {
    return res.status(400).end(`Invalid url: ${req.query.url}`)
  }
  res.redirect(req.query.url)
})
```

## Utilizar Helmet

[Helmet](https://www.npmjs.com/package/helmet) ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas mediante el establecimiento correcto de cabeceras HTTP.

Helmet is a middleware function that sets security-related HTTP response headers. Helmet sets the following headers by default:

- `Content-Security-Policy`: A powerful allow-list of what can happen on your page which mitigates many attacks
- `Cross-Origin-Opener-Policy`: Helps process-isolate your page
- `Cross-Origin-Resource-Policy`: Blocks others from loading your resources cross-origin
- `Origin-Agent-Cluster`: Changes process isolation to be origin-based
- `Referrer-Policy`: Controls the [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header
- `Strict-Transport-Security`: Tells browsers to prefer HTTPS
- `X-Content-Type-Options`: Avoids [MIME sniffing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#mime_sniffing)
- `X-DNS-Prefetch-Control`: Controls DNS prefetching
- `X-Download-Options`: Forces downloads to be saved (Internet Explorer only)
- `X-Frame-Options`: Legacy header that mitigates [Clickjacking](https://en.wikipedia.org/wiki/Clickjacking) attacks
- `X-Permitted-Cross-Domain-Policies`: Controls cross-domain behavior for Adobe products, like Acrobat
- `X-Powered-By`: Info about the web server. Removed because it could be used in simple attacks
- `X-XSS-Protection`: Legacy header that tries to mitigate [XSS attacks](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting), but makes things worse, so Helmet disables it

Each header can be configured or disabled. To read more about it please go to [its documentation website][helmet].

Instale Helmet como cualquier otro módulo:

```bash
$ npm install helmet
```

A continuación, utilícelo en el código:

```js
// ...

const helmet = require('helmet')
app.use(helmet())

// ...
```

## Reduce fingerprinting

It can help to provide an extra layer of security to reduce the ability of attackers to determine
the software that a server uses, known as "fingerprinting." Though not a security issue itself,
reducing the ability to fingerprint an application improves its overall security posture.
Server software can be fingerprinted by quirks in how it responds to specific requests, for example in
the HTTP response headers.

Por lo tanto, se recomienda desactivar la cabecera con el método `app.disable()`:

```js
app.disable('x-powered-by')
```

{% capture powered-advisory %}

Disabling the `X-Powered-By header` does not prevent
a sophisticated attacker from determining that an app is running Express. It may
discourage a casual exploit, but there are other ways to determine an app is running
Express.

{% endcapture %}

{% include admonitions/note.html content=powered-advisory %}

Express also sends its own formatted "404 Not Found" messages and formatter error
response messages. These can be changed by
[adding your own not found handler](/en/starter/faq.html#how-do-i-handle-404-responses)
and
[writing your own error handler](/en/guide/error-handling.html#writing-error-handlers):

```js
// last app.use calls right before app.listen():

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

## Establecer las opciones de seguridad de las cookies

Para garantizar que las cookies no abran la aplicación para ataques, no utilice el nombre de cookie de sesión predeterminado y establezca las opciones de seguridad de las cookies correctamente.

Hay dos módulos de sesión de cookies de middleware principales:

- [express-session](https://www.npmjs.com/package/express-session), que sustituye el middleware `express.session` incorporado en Express 3.x.
- [cookie-session](https://www.npmjs.com/package/cookie-session), que sustituye el middleware `express.cookieSession` incorporado en Express 3.x.

La principal diferencia entre los dos módulos es cómo guardan los datos de sesión de las cookies. El middleware [express-session](https://www.npmjs.com/package/express-session) almacena los datos de sesión en el servidor; sólo guarda el ID de sesión en la propia cookie, no los datos de sesión. De forma predeterminada, utiliza el almacenamiento en memoria y no está diseñado para un entorno de producción. En la producción, deberá configurar un almacenamiento de sesión escalable; consulte la lista de [almacenes de sesión compatibles](https://github.com/expressjs/session#compatible-session-stores).

Por su parte, el middleware [cookie-session](https://www.npmjs.com/package/cookie-session) implementa un almacenamiento basado en cookies: serializa la sesión completa en la cookie, en lugar de sólo una clave de sesión. Utilícelo sólo cuando los datos de sesión sean relativamente pequeños y fácilmente codificables como valores primitivos (en lugar de objetos). Aunque se supone que los navegadores pueden dar soporte a 4096 bytes por cookie como mínimo, para no exceder el límite, no supere un tamaño de 4093 bytes por dominio. Asimismo, asegúrese de que los datos de la cookie estén visibles para el cliente, para que si se deben proteger u ocultar por cualquier motivo, se utilice mejor la opción express-session.

### No utilizar el nombre de cookie de sesión predeterminado

Si utiliza el nombre de cookie de sesión predeterminado, la aplicación puede quedar abierta a los ataques. El problema de seguridad que supone es similar a `X-Powered-By`: un posible atacante puede utilizarlo para firmar digitalmente el servidor y dirigir los ataques en consecuencia.

Para evitar este problema, utilice nombres de cookie genéricos, por ejemplo, con el middleware [express-session](https://www.npmjs.com/package/express-session):

```js
const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))
```

### Utilizar cookies de forma segura

Establezca las siguientes opciones de cookies para mejorar la seguridad:

- `secure` - Garantiza que el navegador sólo envíe la cookie a través de HTTPS.
- `httpOnly` - Garantiza que la cookie sólo se envíe a través de HTTP(S), no a través de JavaScript de cliente, para la protección contra ataques de scripts entre sitios.
- `domain` - Indica el dominio de la cookie; utilícelo para compararlo con el dominio del servidor donde se está solicitando el URL. Si coinciden, compruebe el atributo de vía de acceso a continuación.
- `path` - Indica la vía de acceso de la cookie; utilícela para compararla con la vía de acceso de la solicitud. Si esta y el dominio coinciden, envíe la cookie en la solicitud.
- `expires` - Se utiliza para establecer la fecha de caducidad de las cookies persistentes.

A continuación, se muestra un ejemplo de uso del middleware [cookie-session](https://www.npmjs.com/package/cookie-session):

```js
const session = require('cookie-session')
const express = require('express')
const app = express()

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  }
}))
```

## Prevenir ataques de fuerza bruta a la autenticación

Asegurate de que los puntos finales del inicio de sesión están protegidos para convertir los datos privados más seguros.

Una simple y potente técnica es bloquear intentos de autorización usando dos métricas:

1. Según el número de intentos fallidos consecutivos por el mismo nombre de usuario y dirección IP.
2. Según el número fallido de intentos desde una dirección IP a lo largo de un cierto período de tiempo. Por ejemplo, bloquear una dirección IP si realiza 100 intentos fallidos en un día.

El paquete [rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible) ofrece herramientas para realizar esta técnica de forma fácil y rápida. Aquí puedes encontrar un [ejemplo de protección de fuerza bruta en la documentación](https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#login-endpoint-protection).

## Asegurarse de que las dependencias sean seguras

El uso de npm para gestionar las dependencias de la aplicación es muy útil y cómodo. No obstante, los paquetes que utiliza pueden contener vulnerabilidades de seguridad críticas que también pueden afectar a la aplicación. La seguridad de la aplicación sólo es tan fuerte como el "enlace más débil" de las dependencias.

Since npm@6, npm automatically reviews every install request. También puedes utilizar 'npm audit' para analizar tu árbol de dependencias.

```bash
$ npm audit
```

Si quieres mantener más seguro, considera [Snyk](https://snyk.io/).

Snyk ofrece tanto [herramienta de línea de comandos](https://www.npmjs.com/package/snyk) como una [integración de Github](https://snyk.io/docs/github) que comprueba tu aplicación contra [la base de datos de código abierto sobre vulnerabilidades de Snyk](https://snyk.io/vuln/) por cualquier vulnerabilidad conocida en tus dependencias. Instala la interfaz de línea de comandos:

```bash
$ npm install -g snyk
$ cd your-app
```

Usa este comando para comprobar tu aplicación contra vulnerabilidades:

```bash
$ snyk test
```

### Avoid other known vulnerabilities

Esté atento a las advertencias de [Node Security Project](https://npmjs.com/advisories) que puedan afectar a Express u otros módulos que utilice la aplicación. En general, Node Security Project es un excelente recurso de herramientas e información sobre la seguridad de Node.

Por último, las aplicaciones de Express, como cualquier otra aplicación web, son vulnerables a una amplia variedad de ataques basados en web. Familiarícese con las [vulnerabilidades web](https://www.owasp.org/www-project-top-ten/) conocidas y tome precauciones para evitarlas.

## Additional considerations

A continuación, se muestran algunas recomendaciones para la excelente lista de comprobación [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/). Consulte el post de este blog para ver todos los detalles de estas recomendaciones:

- Filtre y sanee siempre la entrada de usuario para protegerse contra los ataques de scripts entre sitios (XSS) e inyección de mandatos.
- Defiéndase contra los ataques de inyección de SQL utilizando consultas parametrizadas o sentencias preparadas.
- Utilice la herramienta [sqlmap](http://sqlmap.org/) de código abierto para detectar vulnerabilidades de inyección de SQL en la aplicación.
- Utilice las herramientas [nmap](https://nmap.org/) y [sslyze](https://github.com/nabla-c0d3/sslyze) para probar la configuración de los cifrados SSL, las claves y la renegociación, así como la validez del certificado.
- Utilice [safe-regex](https://www.npmjs.com/package/safe-regex) para asegurarse de que las expresiones regulares no sean susceptibles de ataques de [denegación de servicio de expresiones regulares](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS).

[helmet]: <Si utiliza `helmet.js`, lo hace automáticamente.>