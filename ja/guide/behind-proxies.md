---
layout: page
title: プロキシーの背後の Express
description: Learn how to configure Express.js applications to work correctly behind reverse proxies, including using the trust proxy setting to handle client IP addresses.
menu: guide
lang: ja
redirect_from: /guide/behind-proxies.html
---

# プロキシーの背後の Express

When running an Express app behind a reverse proxy, some of the Express APIs may return different values than expected. In order to adjust for this, the `trust proxy` application setting may be used to expose information provided by the reverse proxy in the Express APIs. The most common issue is express APIs that expose the client's IP address may instead show an internal IP address of the reverse proxy.

<div class="doc-box doc-info" markdown="1">
When configuring the `trust proxy` setting, it is important to understand the exact setup of the reverse proxy. Since this setting will trust values provided in the request, it is important that the combination of the setting in Express matches how the reverse proxy operates.
</div>

The application setting `trust proxy` may be set to one of the values listed in the following table.

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>型</th><th>値</th></tr></thead>
  <tbody>
    <tr>
      <td>Boolean</td>
<td markdown="1">`true` の場合、クライアントの IP アドレスは、`X-Forwarded-*` ヘッダーの左端の項目として理解されます。

`false` の場合、アプリケーションはインターネットに直接接続されているものとして理解され、クライアントの IP アドレスは `req.connection.remoteAddress` から導き出されます。これはデフォルトの設定値です。 This is the default setting.

<div class="doc-box doc-warn" markdown="1">
When setting to `true`, it is important to ensure that the last reverse proxy trusted is removing/overwriting all of the following HTTP headers: `X-Forwarded-For`, `X-Forwarded-Host`, and `X-Forwarded-Proto`, otherwise it may be possible for the client to provide any value.
</div>
</td>
    </tr>
    <tr>
      <td>IP addresses</td>
<td markdown="1">
An IP address, subnet, or an array of IP addresses and subnets to trust as being a reverse proxy. The following list shows the pre-configured subnet names:

- loopback - `127.0.0.1/8`、`::1/128`
- linklocal - `169.254.0.0/16`、`fe80::/10`
- uniquelocal - `10.0.0.0/8`、`172.16.0.0/12`、`192.168.0.0/16`、`fc00::/7`

以下のどの方法でも IP アドレスを設定できます。

```js
app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array
```

IP アドレスまたはサブネットは、指定されると、アドレス決定プロセスから除外されます。アプリケーション・サーバーに最も近い信頼できない IP アドレスがクライアントの IP アドレスに決定されます。 This works by checking if `req.socket.remoteAddress` is trusted. If so, then each address in `X-Forwarded-For` is checked from right to left until the first non-trusted address.

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

`trust proxy`を有効にすると、次の3つの重要な変更が起こります。

<ul>
  <li markdown="1">[req.hostname](/{{ page.lang }}/api.html#req.hostname) の値は、クライアントまたはプロキシーが設定できる `X-Forwarded-Host` ヘッダーに設定された値から導き出されます。</li>
  <li markdown="1">`X-Forwarded-Proto` は、`https` と `http` のどちらであるか、または無効な名前であるかをアプリケーションに通知するためにリバース・プロキシーによって設定できます。この値は、[req.protocol](/{{ page.lang }}/api.html#req.protocol) に反映されます。 This value is reflected by [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">[req.ip](/{{ page.lang }}/api.html#req.ip) および [req.ips](/{{ page.lang }}/api.html#req.ips) の値は、`X-Forwarded-For` のアドレス・リストから取り込まれます。</li>
</ul>

`trust proxy` 設定は、[proxy-addr](https://www.npmjs.com/package/proxy-addr) パッケージを使用して実装されます。詳細については、資料を参照してください。 For more information, see its documentation.
