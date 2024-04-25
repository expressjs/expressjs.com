---
layout: page
title: Express behind proxies
menu: guide
lang: en
redirect_from: "/guide/behind-proxies.html"
---
# Express behind proxies

When running an Express app behind a reverse proxy, some of the Express APIs may return different values than expected. In order to adjust for this, the `trust proxy` application setting may be used to expose information provided by the reverse proxy in the Express APIs. The most common issue is express APIs that expose the client's IP address may instead show an internal IP address of the reverse proxy.

<div class="doc-box doc-info" markdown="1">
When configuring the `trust proxy` setting, it is important to understand the exact setup of the reverse proxy. Since this setting will trust values provided in the request, it is important that the combination of the setting in Express matches how the reverse proxy operates.
</div>

The application setting `trust proxy` may be set to one of the values listed in the following table.

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Type</th><th>Value</th></tr></thead>
  <tbody>
    <tr>
      <td>Boolean</td>
<td markdown="1">
If `true`, the client's IP address is understood as the left-most entry in the `X-Forwarded-For` header.

If `false`, the app is understood as directly facing the client and the client's IP address is derived from `req.socket.remoteAddress`. This is the default setting.

<div class="doc-box doc-warn" markdown="1">
When setting to `true`, it is important to ensure that the last reverse proxy trusted is removing/overwriting all of the following HTTP headers: `X-Forwarded-For`, `X-Forwarded-Host`, and `X-Forwarded-Proto`, otherwise it may be possible for the client to provide any value.
</div>
</td>
    </tr>
    <tr>
      <td>IP addresses</td>
<td markdown="1">
An IP address, subnet, or an array of IP addresses and subnets to trust as being a reverse proxy. The following list shows the pre-configured subnet names:

* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

You can set IP addresses in any of the following ways:

```js
app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array
```

When specified, the IP addresses or the subnets are excluded from the address determination process, and the untrusted IP address nearest to the application server is determined as the client's IP address. This works by checking if `req.socket.remoteAddress` is trusted. If so, then each address in `X-Forwarded-For` is checked from right to left until the first non-trusted address.
</td>
    </tr>
    <tr>
      <td>Number</td>
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
  <li markdown="1">The value of [req.hostname](/{{ page.lang }}/api.html#req.hostname) is derived from the value set in the `X-Forwarded-Host` header, which can be set by the client or by the proxy.
  </li>
  <li markdown="1">`X-Forwarded-Proto` can be set by the reverse proxy to tell the app whether it is `https` or  `http` or even an invalid name. This value is reflected by [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">The [req.ip](/{{ page.lang }}/api.html#req.ip) and [req.ips](/{{ page.lang }}/api.html#req.ips) values are populated based on the socket address and `X-Forwarded-For` header, starting at the first untrusted address.
  </li>
</ul>

The `trust proxy` setting is implemented using the [proxy-addr](https://www.npmjs.com/package/proxy-addr) package. For more information, see its documentation.
