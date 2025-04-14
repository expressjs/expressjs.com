---
layout: page
title: 代理背后的 Express
description: Learn how to configure Express.js applications to work correctly behind reverse proxies, including using the trust proxy setting to handle client IP addresses.
menu: guide
lang: en
redirect_from: /guide/behind-proxies.html
---

# 代理背后的 Express

When running an Express app behind a reverse proxy, some of the Express APIs may return different values than expected. In order to adjust for this, the `trust proxy` application setting may be used to expose information provided by the reverse proxy in the Express APIs. The most common issue is express APIs that expose the client's IP address may instead show an internal IP address of the reverse proxy.

<div class="doc-box doc-info" markdown="1">
When configuring the `trust proxy` setting, it is important to understand the exact setup of the reverse proxy. Since this setting will trust values provided in the request, it is important that the combination of the setting in Express matches how the reverse proxy operates.
</div>

在代理背后运行 Express 应用程序时，可使用 [app.set()](/{{ page.lang }}/4x/api.html#app.set) 将应用程序变量 `trust proxy` 设置为下表中所列的某个值。

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>类型</th><th>值</th></tr></thead>
  <tbody>
    <tr>
      <td>布尔</td>
<td markdown="1">
如果为 `true`，那么客户机的 IP 地址将用作 `X-Forwarded-*` 头中最左侧的条目。
如果为 `false`，那么该应用程序将被视为直接面对因特网，而客户机的 IP 地址则派生自 `req.connection.remoteAddress`。这是缺省设置。


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

- loopback - `127.0.0.1/8`, `::1/128`
- linklocal - `169.254.0.0/16`, `fe80::/10`
- uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

您可以按以下某种方法设置 IP 地址：

```js
app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array
```

如果指定 IP 地址或子网，那么会在地址确定过程中排除这些项，而将最接近应用程序服务器的不受信任的 IP 地址确定为客户机的 IP 地址。 This works by checking if `req.socket.remoteAddress` is trusted. If so, then each address in `X-Forwarded-For` is checked from right to left until the first non-trusted address.

</td>
    </tr>
    <tr>
      <td>数字</td>
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
  <li markdown="1">[req.hostname](/{{ page.lang }}/api.html#req.hostname) 的值派生自 `X-Forwarded-Host` 头中设置的值（可以由客户机或代理设置此值）。
  </li>
  <li markdown="1">`X-Forwarded-Proto` 可以由逆向代理设置，以告知应用程序：它是 `https` 还是 `http`，或者甚至是无效名称。该值由 [req.protocol](/{{ page.lang }}/api.html#req.protocol) 反映。
   This value is reflected by [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">[req.ip](/{{ page.lang }}/api.html#req.ip) 和 [req.ips](/{{ page.lang }}/api.html#req.ips) 值由 `X-Forwarded-For` 的地址列表填充。
  </li>
</ul>

`trust proxy` 设置由使用 [proxy-addr](https://www.npmjs.com/package/proxy-addr) 包实现。有关更多信息，请参阅其文档。 For more information, see its documentation.
