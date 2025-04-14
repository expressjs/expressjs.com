---
layout: page
title: Express hinter Proxys
description: Learn how to configure Express.js applications to work correctly behind reverse proxies, including using the trust proxy setting to handle client IP addresses.
menu: guide
lang: de
redirect_from: /guide/behind-proxies.html
---

# Express hinter Proxys

When running an Express app behind a reverse proxy, some of the Express APIs may return different values than expected. In order to adjust for this, the `trust proxy` application setting may be used to expose information provided by the reverse proxy in the Express APIs. The most common issue is express APIs that expose the client's IP address may instead show an internal IP address of the reverse proxy.

<div class="doc-box doc-info" markdown="1">
When configuring the `trust proxy` setting, it is important to understand the exact setup of the reverse proxy. Since this setting will trust values provided in the request, it is important that the combination of the setting in Express matches how the reverse proxy operates.
</div>

Bei der Ausführung einer Express-Anwendung hinter einem Proxy legen Sie die Anwendungsvariable `trust proxy` (mithilfe von [app.set()](/{{ page.lang }}/4x/api.html#app.set)) auf einen der in der folgenden Tabelle enthaltenen Werte fest:

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Typ</th><th>Wert</th></tr></thead>
  <tbody>
    <tr>
      <td>Boolesch</td>
<td markdown="1">Wenn `true` angegeben wird, wird die IP-Adresse des Clients als der äußerst rechte Eintrag im Header `X-Forwarded-*` interpretiert.

Wenn `false` angegeben wird, wird die Anwendung als direkte Verbindung zum Internet gesehen. Die IP-Adresse des Clients wird dann von `req.connection.remoteAddress` abgeleitet. Dies ist die Standardeinstellung.

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

Sie können IP-Adressen wie folgt festlegen:

```js
app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array
```

Sobald die Werte angegeben wurden, werden die betreffenden IP-Adressen und Teilnetze aus dem Adressfeststellungsprozess ausgeschlossen. Die nicht vertrauenswürdige IP-Adresse, die am nächsten zum Anwendungsserver liegt, wird als IP-Adresse des Clients festgelegt. This works by checking if `req.socket.remoteAddress` is trusted. If so, then each address in `X-Forwarded-For` is checked from right to left until the first non-trusted address.

</td>
    </tr>
    <tr>
      <td>Zahl</td>
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
  <li markdown="1">Der Wert für [req.hostname](/{{ page.lang }}/api.html#req.hostname) wird vom Wert abgeleitet, der im Header `X-Forwarded-Host` festgelegt wurde. Dieser Wert kann vom Client oder Proxy festgelegt werden.</li>
  <li markdown="1">`X-Forwarded-Proto` kann vom Reverse Proxy festgelegt werden, um der Anwendung mitzuteilen, ob es sich um `https` oder `http` oder sogar um einen ungültigen Namen handelt. Dieser Wert wird durch [req.protocol](/{{ page.lang }}/api.html#req.protocol) abgebildet.
  </li>
  <li markdown="1">Als Werte für [req.ip](/{{ page.lang }}/api.html#req.ip) und [req.ips](/{{ page.lang }}/api.html#req.ips) wird die Liste der Adressen aus `X-Forwarded-For` herangezogen.
  </li>
</ul>

Die Einstellung für `trust proxy` wird mithilfe des [proxy-addr](https://www.npmjs.com/package/proxy-addr)-Pakets implementiert. Weitere Informationen finden Sie in der zugehörigen Dokumentation.
