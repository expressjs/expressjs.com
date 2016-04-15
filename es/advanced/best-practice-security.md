---
layout: page
title: Mejores prácticas de seguridad para Express en producción
menu: advanced
lang: es
---

# Mejores prácticas de producción: seguridad

## Visión general

El término *"producción"* hace referencia a la etapa del ciclo de vida del software donde una aplicación o una API tiene disponibilidad general para sus consumidores o usuarios finales. Por su parte, en la etapa de *"desarrollo"*, todavía está escribiendo y probando activamente el código, y la aplicación no está abierta para el acceso externo. Los entornos del sistema correspondientes se conocen como los entornos de *producción* y *desarrollo*, respectivamente.

Los entornos de desarrollo y producción se configuran normalmente de forma diferente y tiene requisitos también muy diferentes. Lo que funciona en el desarrollo puede que no sea aceptable en la producción. Por ejemplo, en un entorno de desarrollo, puede que desee el registro detallado de errores a efecto de depuración, mientras que el mismo comportamiento puede suponer un problema de seguridad en un entorno de producción. De la misma forma, en el desarrollo, no es necesario preocuparse por la escalabilidad, la fiabilidad y el rendimiento, mientras que estos son clave en la producción.

En este artículo se describen las mejores prácticas de seguridad para las aplicaciones Express desplegadas en producción.

## No utilizar versiones en desuso o vulnerables de Express

Express 2.x y 3.x ya no se mantienen. Los problemas de seguridad y rendimiento en estas versiones no se solucionarán. No las utilice.  Si no ha cambiado todavía a la versión 4, siga la [guía de migración](/{{ page.lang }}/guide/migrating-4.html).

Asimismo, asegúrese de que no está utilizando ninguna de las versiones vulnerables de Express que se listan en la [página Actualizaciones de seguridad](/{{ page.lang }}/advanced/security-updates.html). Si las utiliza, actualícese a uno de los releases estables, preferiblemente el más reciente.

## Utilizar TLS

Si la aplicación maneja o transmite datos confidenciales, utilice [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) para proteger la conexión y los datos. Esta tecnología cifra los datos antes de enviarlos desde el cliente al servidor, lo que evita algunos de los ataques de pirateo más comunes (y sencillos). Aunque las solicitudes Ajax y POST no sean obvias visiblemente y parezca que están "ocultas" en los navegadores, su tráfico de red es vulnerable para los [rastreos de paquetes](https://en.wikipedia.org/wiki/Packet_analyzer) y los [ataques de intermediarios](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Es posible que esté familiarizado con el cifrado SSL (Secure Socket Layer). [TLS es simplemente el siguiente paso después de SSL](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx). Es decir, si antes utilizaba SSL, se recomienda actualizar a TLS.  En general, se recomienda Nginx para manejar TLS.  Encontrará una buena referencia para configurar TLS en Nginx (y otros servidores) en [la wiki de Mozilla Recommended Server Configurations](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

Asimismo, una herramienta muy útil para obtener un certificado de TLS gratis es [Let's Encrypt](https://letsencrypt.org/about/), una entidad emisora de certificados (CA) abierta, automatizada y gratuita proporcionada por [Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/).

## Utilizar Helmet

[Helmet](https://www.npmjs.com/package/helmet) ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas mediante el establecimiento correcto de cabeceras HTTP.

Helmet es realmente una colección de nueve funciones de middleware más paquetes que establecen cabeceras HTTP relacionadas con la seguridad:

* [csp](https://github.com/helmetjs/csp) establece la cabecera `Content-Security-Policy` para evitar ataques de scripts entre sitios y otras inyecciones entre sitios.
* [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) elimina la cabecera `X-Powered-By`.
* [hpkp](https://github.com/helmetjs/hpkp) añade cabeceras [Public Key Pinning](https://developer.mozilla.org/en-US/docs/Web/Security/Public_Key_Pinning) para evitar ataques de intermediarios con certificados falsos.
* [hsts](https://github.com/helmetjs/hsts) establece la cabecera `Strict-Transport-Security` que fuerza conexiones seguras (HTTP sobre SSL/TLS) con el servidor.
* [ieNoOpen](https://github.com/helmetjs/ienoopen) establece `X-Download-Options` para IE8+.
* [noCache](https://github.com/helmetjs/nocache) establece cabeceras `Cache-Control` y Pragma para inhabilitar el almacenamiento en memoria caché del lado de cliente.
* [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) establece `X-Content-Type-Options` para evitar que los navegadores rastreen mediante MIME una respuesta del tipo de contenido declarado.
* [frameguard](https://github.com/helmetjs/frameguard) establece la cabecera `X-Frame-Options` para proporcionar protección contra el [clickjacking](https://www.owasp.org/index.php/Clickjacking).
* [xssFilter](https://github.com/helmetjs/x-xss-protection) establece `X-XSS-Protection` para habilitar el filtro de scripts entre sitios (XSS) en los navegadores web más recientes.

Instale Helmet como cualquier otro módulo:

<pre>
<code class="language-sh" translate="no">
$ npm install --save helmet
</code>
</pre>

A continuación, utilícelo en el código:

<pre>
<code class="language-javascript" translate="no">
...
var helmet = require('helmet');
app.use(helmet());
...
</code>
</pre>

### Como mínimo, inhabilitar la cabecera X-Powered-By

Si no desea utilizar Helmet, como mínimo, inhabilite la cabecera `X-Powered-By`.  Los atacantes pueden utilizar esta cabecera (que está habilitada de forma predeterminada) para detectar las aplicaciones que ejecutan Express e iniciar ataques con destinos específicos.

Por lo tanto, se recomienda desactivar la cabecera con el método `app.disable()`:

<pre>
<code class="language-javascript" translate="no">
app.disable('x-powered-by');
</code>
</pre>

Si utiliza `helmet.js`, lo hace automáticamente.

## Utilizar cookies de forma segura

Para garantizar que las cookies no abran la aplicación para ataques, no utilice el nombre de cookie de sesión predeterminado y establezca las opciones de seguridad de las cookies correctamente.

Hay dos módulos de sesión de cookies de middleware principales:

* [express-session](https://www.npmjs.com/package/express-session), que sustituye el middleware `express.session` incorporado en Express 3.x.
* [cookie-session](https://www.npmjs.com/package/cookie-session), que sustituye el middleware `express.cookieSession` incorporado en Express 3.x.

La principal diferencia entre los dos módulos es cómo guardan los datos de sesión de las cookies.  El middleware [express-session](https://www.npmjs.com/package/express-session) almacena los datos de sesión en el servidor; sólo guarda el ID de sesión en la propia cookie, no los datos de sesión.  De forma predeterminada, utiliza el almacenamiento en memoria y no está diseñado para un entorno de producción.  En la producción, deberá configurar un almacenamiento de sesión escalable; consulte la lista de [almacenes de sesión compatibles](https://github.com/expressjs/session#compatible-session-stores).

Por su parte, el middleware [cookie-session](https://www.npmjs.com/package/cookie-session) implementa un almacenamiento basado en cookies: serializa la sesión completa en la cookie, en lugar de sólo una clave de sesión.  Utilícelo sólo cuando los datos de sesión sean relativamente pequeños y fácilmente codificables como valores primitivos (en lugar de objetos).  Aunque se supone que los navegadores pueden dar soporte a 4096 bytes por cookie como mínimo, para no exceder el límite, no supere un tamaño de 4093 bytes por dominio.  Asimismo, asegúrese de que los datos de la cookie estén visibles para el cliente, para que si se deben proteger u ocultar por cualquier motivo, se utilice mejor la opción express-session.

### No utilizar el nombre de cookie de sesión predeterminado

Si utiliza el nombre de cookie de sesión predeterminado, la aplicación puede quedar abierta a los ataques.  El problema de seguridad que supone es similar a `X-Powered-By`: un posible atacante puede utilizarlo para firmar digitalmente el servidor y dirigir los ataques en consecuencia.

Para evitar este problema, utilice nombres de cookie genéricos, por ejemplo, con el middleware [express-session](https://www.npmjs.com/package/express-session):

<pre>
<code class="language-javascript" translate="no">
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : 's3Cur3',
   name : 'sessionId',
  })
);
</code>
</pre>

### Establecer las opciones de seguridad de las cookies

Establezca las siguientes opciones de cookies para mejorar la seguridad:

* `secure` - Garantiza que el navegador sólo envíe la cookie a través de HTTPS.
* `httpOnly` - Garantiza que la cookie sólo se envíe a través de HTTP(S), no a través de JavaScript de cliente, para la protección contra ataques de scripts entre sitios.
* `domain` - Indica el dominio de la cookie; utilícelo para compararlo con el dominio del servidor donde se está solicitando el URL. Si coinciden, compruebe el atributo de vía de acceso a continuación.
* `path` - Indica la vía de acceso de la cookie; utilícela para compararla con la vía de acceso de la solicitud. Si esta y el dominio coinciden, envíe la cookie en la solicitud.
* `expires` - Se utiliza para establecer la fecha de caducidad de las cookies persistentes.

A continuación, se muestra un ejemplo de uso del middleware [cookie-session](https://www.npmjs.com/package/cookie-session):

<pre>
<code class="language-javascript" translate="no">
var session = require('cookie-session');
var express = require('express');
var app = express();

var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            domain: 'example.com',
            path: 'foo/bar',
            expires: expiryDate
          }
  })
);
</code>
</pre>

## Asegurarse de que las dependencias sean seguras

El uso de npm para gestionar las dependencias de la aplicación es muy útil y cómodo.  No obstante, los paquetes que utiliza pueden contener vulnerabilidades de seguridad críticas que también pueden afectar a la aplicación.  La seguridad de la aplicación sólo es tan fuerte como el "enlace más débil" de las dependencias.

Utilice una o las dos herramientas siguientes para garantizar la seguridad de los paquetes de terceros que utiliza: [nsp](https://www.npmjs.com/package/nsp) y [requireSafe](https://requiresafe.com/).  Las dos herramientas hacen prácticamente lo mismo.

[nsp](https://www.npmjs.com/package/nsp) es una herramienta de línea de mandatos que comprueba la base de datos de vulnerabilidades de [Node Security Project](https://nodesecurity.io/) para determinar si la aplicación utiliza paquetes con vulnerabilidades conocidas. Instálela de la siguiente manera:

<pre>
<code class="language-sh" translate="no">
$ npm i nsp -g
</code>
</pre>

Utilice este mandato para enviar el archivo `npm-shrinkwrap.json` para su validación a [nodesecurity.io](https://nodesecurity.io/):

<pre>
<code class="language-sh" translate="no">
$ nsp audit-shrinkwrap
</code>
</pre>

Utilice este mandato para enviar el archivo `package.json` para su validación a [nodesecurity.io](https://nodesecurity.io/):

<pre>
<code class="language-sh" translate="no">
$ nsp audit-package
</code>
</pre>

[requireSafe](https://requiresafe.com/) se utiliza de la siguiente manera para auditar los módulos de Node:

<pre>
<code class="language-sh" translate="no">
$ npm install -g requiresafe
$ cd your-app
$ requiresafe check
</code>
</pre>

## Consideraciones adicionales

A continuación, se muestran algunas recomendaciones para la excelente lista de comprobación [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/).  Consulte el post de este blog para ver todos los detalles de estas recomendaciones:

* Implemente el límite de velocidad para evitar ataques de fuerza bruta contra la autenticación.  Una forma de hacerlo es utilizar [StrongLoop API Gateway](https://strongloop.com/node-js/api-gateway/) para forzar una política de limitación de velocidad.  También puede utilizar middleware como [express-limiter](https://www.npmjs.com/package/express-limiter), aunque para ello deberá modificar el código de alguna forma.
* Utilice el middleware [csurf](https://www.npmjs.com/package/csurf) para protegerse contra la falsificación de solicitudes entre sitios (CSRF).
* Filtre y sanee siempre la entrada de usuario para protegerse contra los ataques de scripts entre sitios (XSS) e inyección de mandatos.
* Defiéndase contra los ataques de inyección de SQL utilizando consultas parametrizadas o sentencias preparadas.
* Utilice la herramienta [sqlmap](http://sqlmap.org/) de código abierto para detectar vulnerabilidades de inyección de SQL en la aplicación.
* Utilice las herramientas [nmap](https://nmap.org/) y [sslyze](https://github.com/nabla-c0d3/sslyze) para probar la configuración de los cifrados SSL, las claves y la renegociación, así como la validez del certificado.
* Utilice [safe-regex](https://www.npmjs.com/package/safe-regex) para asegurarse de que las expresiones regulares no sean susceptibles de ataques de [denegación de servicio de expresiones regulares](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS).

## Evitar otras vulnerabilidades conocidas

Esté atento a las advertencias de [Node Security Project](https://nodesecurity.io/advisories) que puedan afectar a Express u otros módulos que utilice la aplicación.  En general, Node Security Project es un excelente recurso de herramientas e información sobre la seguridad de Node.

Por último, las aplicaciones de Express, como cualquier otra aplicación web, son vulnerables a una amplia variedad de ataques basados en web. Familiarícese con las [vulnerabilidades web](https://www.owasp.org/index.php/Top_10_2013-Top_10) conocidas y tome precauciones para evitarlas.
