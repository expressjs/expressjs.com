---
layout: page
title: Express con i proxy
description: Learn how to configure Express.js applications to work correctly behind reverse proxies, including using the trust proxy setting to handle client IP addresses.
menu: guide
lang: it
redirect_from: /guide/behind-proxies.html
---

# Express con i proxy

When running an Express app behind a reverse proxy, some of the Express APIs may return different values than expected. In order to adjust for this, the `trust proxy` application setting may be used to expose information provided by the reverse proxy in the Express APIs. The most common issue is express APIs that expose the client's IP address may instead show an internal IP address of the reverse proxy.

<div class="doc-box doc-info" markdown="1">
When configuring the `trust proxy` setting, it is important to understand the exact setup of the reverse proxy. Since this setting will trust values provided in the request, it is important that the combination of the setting in Express matches how the reverse proxy operates.
</div>

Quando si esegue un'applicazione Express con un proxy, impostare (utilizzando [app.set()](/{{ page.lang }}/4x/api.html#app.set)) la variabile dell'applicazione `trust proxy` su uno dei valori elencati nella seguente tabella.

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Tipo</th><th>Valore</th></tr></thead>
  <tbody>
    <tr>
      <td>Booleano</td>
<td markdown="1">
Se impostato su `true`, l'indirizzo IP del client viene considerato come la voce a sinistra dell'intestazione `X-Forwarded-*`.

Se impostato su `false`, significa che l'applicazione abbia una connessione diretta a Internet e l'indirizzo IP del client sia arrivato da `req.connection.remoteAddress`. Questa è l'impostazione predefinita.

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

È possibile impostare gli indirizzi IP in uno dei seguenti modi:

```js
app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array
```

Quando specificati, gli indirizzi IP o le subnet vengono esclusi dal processo di determinazione dell'indirizzo e l'indirizzo IP non attendibile più vicino al server delle applicazioni viene considerato come indirizzo IP del client. This works by checking if `req.socket.remoteAddress` is trusted. If so, then each address in `X-Forwarded-For` is checked from right to left until the first non-trusted address.

</td>
    </tr>
    <tr>
      <td>Numero</td>
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
  <li markdown="1">Il valore di [req.hostname](/{{ page.lang }}/api.html#req.hostname) viene rilevato dalla serie di valori nell'intestazione `X-Forwarded-Host`, la quale può essere impostata dal client o dal proxy.
  </li>
  <li markdown="1">`X-Forwarded-Proto` può essere impostata dal proxy inverso per far capire all'applicazione se si tratta di `https` o `http` oppure di un nome non valido. Questo valore viene riportato da [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">I valori [req.ip](/{{ page.lang }}/api.html#req.ip) e [req.ips](/{{ page.lang }}/api.html#req.ips) vengono popolati con l'elenco di indirizzi da `X-Forwarded-For`.
  </li>
</ul>

L'impostazione `trust proxy` viene implementata utilizzando il pacchetto [proxy-addr](https://www.npmjs.com/package/proxy-addr). Per ulteriori informazioni, consultare la relativa documentazione.
