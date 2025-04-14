---
layout: page
title: Serveurs proxy derrière Express
description: Learn how to configure Express.js applications to work correctly behind reverse proxies, including using the trust proxy setting to handle client IP addresses.
menu: guide
lang: fr
redirect_from: /guide/behind-proxies.html
---

# Express derrière proxys

When running an Express app behind a reverse proxy, some of the Express APIs may return different values than expected. In order to adjust for this, the `trust proxy` application setting may be used to expose information provided by the reverse proxy in the Express APIs. The most common issue is express APIs that expose the client's IP address may instead show an internal IP address of the reverse proxy.

<div class="doc-box doc-info" markdown="1">
When configuring the `trust proxy` setting, it is important to understand the exact setup of the reverse proxy. Since this setting will trust values provided in the request, it is important that the combination of the setting in Express matches how the reverse proxy operates.
</div>

The application setting `trust proxy` may be set to one of the values listed in the following table.

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Type</th><th>Valeur</th></tr></thead>
  <tbody>
    <tr>
      <td>Booléen</td>
<td markdown="1">Si la valeur est `true`, l'adresse IP du client est interprétée comme étant l'entrée la plus à gauche dans l'en-tête `X-Forwarded-*`.

Si la valeur est `false`, l'application est interprétée comme étant directement accessible sur Internet et l'adresse IP du client est dérivée de `req.connection.remoteAddress`. Il s'agit du paramètre par défaut.

<div class="doc-box doc-warn" markdown="1">
When setting to `true`, it is important to ensure that the last reverse proxy trusted is removing/overwriting all of the following HTTP headers: `X-Forwarded-For`, `X-Forwarded-Host`, and `X-Forwarded-Proto`, otherwise it may be possible for the client to provide any value.
</div>
</td>
    </tr>
    <tr>
      <td>IP addresses</td>
<td markdown="1">
An IP address, subnet, or an array of IP addresses and subnets to trust as being a reverse proxy. The following list shows the pre-configured subnet names:

- loopback - `127.0.0.1/8`, `::1/128`
- linklocal - `169.254.0.0/16`, `fe80::/10`
- uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

Vous pouvez définir les adresses IP de l'une des manières suivantes :

```js
app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array
```

S'ils sont spécifiés, les sous-réseaux ou les adresses IP sont exclus du processus d'identification d'adresse, et l'adresse IP sans confiance la plus proche du serveur d'applications est identifiée comme étant l'adresse IP du client. This works by checking if `req.socket.remoteAddress` is trusted. If so, then each address in `X-Forwarded-For` is checked from right to left until the first non-trusted address.

</td>
    </tr>
    <tr>
      <td>Numérique</td>
<td markdown="1">
Use the address that is at most `n` number of hops away from the Express application. `req.socket.remoteAddress` is the first hop, and the rest are looked for in the `X-Forwarded-For` header from right to left. A value of `0` means that the first untrusted address would be `req.socket.remoteAddress`, i.e. there is no reverse proxy.

<div class="doc-box doc-warn" markdown="1">
When using this setting, it is important to ensure there are not multiple, different-length paths to the Express application such that the client can be less than the configured number of hops away, otherwise it may be possible for the client to provide any value.
</div>
</td>
    </tr>
    <tr>
      <td>Function</td>
<td markdown="1">
Custom trust implementation.

```js
app.set('trust proxy', (ip) => {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true // trusted IPs
  else return false
})
```

</td>
    </tr>
  </tbody>
</table>

Enabling `trust proxy` will have the following impact:

<ul>
  <li markdown="1">La valeur de [req.hostname](/{{ page.lang }}/api.html#req.hostname) est dérivée de l'ensemble de valeurs indiqué dans l'en-tête `X-Forwarded-Host`, qui peut être défini par le client ou par le proxy.
  </li>
  <li markdown="1">`X-Forwarded-Proto` peut être défini par le proxy inverse pour indiquer à l'application s'il s'agit de `https` ou de `http`, voire d'un nom non valide. Cette valeur est reflétée par [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">Les valeurs [req.ip](/{{ page.lang }}/api.html#req.ip) et [req.ips](/{{ page.lang }}/api.html#req.ips) sont renseignées avec la liste des adresses provenant de `X-Forwarded-For`.
  </li>
</ul>

Le paramètre `trust proxy` est implémenté à l'aide du package [proxy-addr](https://www.npmjs.com/package/proxy-addr). Pour plus d'informations, consultez la documentation associée.
