---
layout: page
title: Express позаду проксі
menu: guide
lang: uk
---

# Express позаду проксі

When running an Express app behind a proxy, set (by using [app.set()](/{{ page.lang }}/4x/api.html#app.set)) the application variable `trust proxy` to one of the values listed in the following table.

<div class="doc-box doc-info" markdown="1">
Although the app will not fail to run if the application variable `trust proxy` is not set, it will incorrectly register the proxy's IP address as the client IP address unless `trust proxy` is configured.
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Type</th><th>Value</th></tr></thead>
  <tbody>
    <tr>
      <td>Boolean</td>
<td markdown="1">
If `true`, the client's IP address is understood as the left-most entry in the `X-Forwarded-*` header.

If `false`, the app is understood as directly facing the Internet and the client's IP address is derived from `req.connection.remoteAddress`. This is the default setting.
</td>
    </tr>
    <tr>
      <td>IP addresses</td>
<td markdown="1">
An IP address, subnet, or an array of IP addresses and subnets to trust. The following list shows the pre-configured subnet names:

* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

You can set IP addresses in any of the following ways:

<pre><code class="language-js" translate="no">app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code></pre>

When specified, the IP addresses or the subnets are excluded from the address determination process, and the untrusted IP address nearest to the application server is determined as the client's IP address.
</td>
    </tr>
    <tr>
      <td>Number</td>
<td markdown="1">
Trust the `n`th hop from the front-facing proxy server as the client.
</td>
    </tr>
    <tr>
      <td>Function</td>
<td markdown="1">
Custom trust implementation. Use this only if you know what you are doing.
<pre><code class="language-js" translate="no">app.set('trust proxy', function (ip) {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
  else return false;
});</code></pre>
</td>
    </tr>
  </tbody>
</table>

Setting a non-`false` `trust proxy` value results in three important changes:

<ul>
  <li markdown="1">The value of [req.hostname](/{{ page.lang }}/api.html#req.hostname) is derived from the value set in the `X-Forwarded-Host` header, which can be set by the client or by the proxy.
  </li>
  <li markdown="1">`X-Forwarded-Proto` can be set by the reverse proxy to tell the app whether it is `https` or  `http` or even an invalid name. This value is reflected by [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">The [req.ip](/{{ page.lang }}/api.html#req.ip) and [req.ips](/{{ page.lang }}/api.html#req.ips) values are populated with the list of addresses from `X-Forwarded-For`.
  </li>
</ul>

The `trust proxy` setting is implemented using the [proxy-addr](https://www.npmjs.com/package/proxy-addr) package. For more information, see its documentation.
