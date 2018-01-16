---
layout: page
title: Express detrás de proxies
menu: guide
lang: es
---

# Express detrás de proxies

Cuando ejecute una aplicación Express detrás de un proxy, establezca (utilizando [app.set()](/{{ page.lang }}/4x/api.html#app.set)) la variable de aplicación `trust proxy` en uno de los valores de la siguiente tabla.

<div class="doc-box doc-info" markdown="1">
Aunque la aplicación no dejará de ejecutarse si no se establece la variable de aplicación `trust proxy`, registrará incorrectamente la dirección IP del proxy como la dirección IP del cliente, a menos que se configure `trust proxy`.
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Tipo</th><th>Valor</th></tr></thead>
  <tbody>
    <tr>
      <td>Booleano</td>
<td markdown="1">
Si es `true`, la dirección IP del cliente se entiende como la entrada más a la izquierda en la cabecera `X-Forwarded-*`.

Si es `false`, la aplicación se entiende como orientada directamente a Internet, y la dirección IP del cliente se obtiene de `req.connection.remoteAddress`. Este es el valor predeterminado.
</td>
    </tr>
    <tr>
      <td>Direcciones IP</td>
<td markdown="1">
Una dirección IP, una subred o una matriz de direcciones IP y subredes de confianza. La siguiente lista muestra los nombres de subred preconfigurados:

* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

Puede establecer direcciones IP de varias formas:

<pre>
<code class="language-js" translate="no">app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code>
</pre>

Cuando se especifican, las direcciones IP o las subredes se excluyen del proceso de determinación de direcciones, y la dirección IP no de confianza más próxima al servidor de aplicaciones se establece como la dirección IP del cliente.
</td>
    </tr>
    <tr>
      <td>Número</td>
<td markdown="1">
Confíe en la porción `n` entre el origen y el destino del servidor proxy accesible externamente como el cliente.
</td>
    </tr>
    <tr>
      <td>Función</td>
<td markdown="1">
Implementación de confianza personalizada. Utilícela sólo si sabe lo que está haciendo.
<pre>
<code class="language-js" translate="no">app.set('trust proxy', function (ip) {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
  else return false;
});</code>
</pre>
</td>
    </tr>
  </tbody>
</table>

Si establece un valor de `trust proxy` distinto de `false`, se producen tres cambios importantes:

<ul>
  <li markdown="1">El valor de [req.hostname](/{{ page.lang }}/api.html#req.hostname) se obtiene del valor definido en la cabecera `X-Forwarded-Host`, que puede estar establecido por el cliente o el proxy.
  </li>
  <li markdown="1">El proxy inverso puede establecer `X-Forwarded-Proto` para indicar a la aplicación si es `https`, `http` o incluso un nombre no válido. [req.protocol](/{{ page.lang }}/api.html#req.protocol) refleja este valor.
  </li>
  <li markdown="1">Los valores [req.ip](/{{ page.lang }}/api.html#req.ip) y [req.ips](/{{ page.lang }}/api.html#req.ips) se rellenan con la lista de direcciones de `X-Forwarded-For`.
  </li>
</ul>

El valor `trust proxy` se implementa utilizando el paquete [proxy-addr](https://www.npmjs.com/package/proxy-addr). Para obtener más información, consulte su documentación.
