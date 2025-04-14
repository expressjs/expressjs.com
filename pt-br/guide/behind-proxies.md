---
layout: page
title: Express atrás de proxies
description: Learn how to configure Express.js applications to work correctly behind reverse proxies, including using the trust proxy setting to handle client IP addresses.
menu: guide
lang: pt-br
redirect_from: /guide/behind-proxies.html
---

# Express atrás de proxies

When running an Express app behind a reverse proxy, some of the Express APIs may return different values than expected. In order to adjust for this, the `trust proxy` application setting may be used to expose information provided by the reverse proxy in the Express APIs. The most common issue is express APIs that expose the client's IP address may instead show an internal IP address of the reverse proxy.

<div class="doc-box doc-info" markdown="1">
When configuring the `trust proxy` setting, it is important to understand the exact setup of the reverse proxy. Since this setting will trust values provided in the request, it is important that the combination of the setting in Express matches how the reverse proxy operates.
</div>

Ao executar um aplicativo do Express atrás de um proxy,
configure (usando [app.set()](/{{ page.lang }}/4x/api.html#app.set)) a variável do
aplicativo `trust proxy` para um dos valores
listados na seguinte tabela.

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Tipo</th><th>Valor</th></tr></thead>
  <tbody>
    <tr>
      <td>Booleano</td>
<td markdown="1">
Se `true`, o endereço de IP do cliente será
compreendido como a entrada mais a esquerda no cabeçalho `X-Forwarded-*`.

Se `false`, o aplicativo é compreendido como
exposto diretamente à Internet e o endereço de IP do cliente é
derivado a partir do `req.connection.remoteAddress`. Esta
é a configuração padrão.

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

É possível configurar endereços de IP de qualquer uma das
formas a seguir:

```js
app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array
```

Quando especificados, os endereços de IP ou sub-redes são
excluídos do processo de determinação de endereço, e o endereço de
IP não confiável mais próximos do servidor de aplicativos é
determinado como o endereço de IP do cliente. This works by checking if `req.socket.remoteAddress` is trusted. If so, then each address in `X-Forwarded-For` is checked from right to left until the first non-trusted address.

</td>
    </tr>
    <tr>
      <td>Número</td>
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
  <li markdown="1">O valor de [req.hostname](/{{ page.lang }}/api.html#req.hostname) é
derivado do valor configurado no cabeçalho
`X-Forwarded-Host`, que pode ser configurado pelo
cliente ou pelo proxy.
  </li>
  <li markdown="1">`X-Forwarded-Proto` pode ser
configurado pelo proxy reverso para dizer ao aplicativo se ele é
`https` ou `http` ou até um nome
inválido. Este valor é refletido pelo [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">Os valores [req.ip](/{{ page.lang }}/api.html#req.ip) e
[req.ips](/{{ page.lang }}/api.html#req.ips) são populados com a lista de
endereços do `X-Forwarded-For`.
  </li>
</ul>

A configuração do `trust proxy` é
implementada usando o pacote
[proxy-addr](https://www.npmjs.com/package/proxy-addr). Para
obter mais informações, consulte a documentação.
