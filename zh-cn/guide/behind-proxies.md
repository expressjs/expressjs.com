---
layout: page
title: 代理背后的 Express
menu: guide
lang: zh-cn
---

# 代理背后的 Express

在代理背后运行 Express 应用程序时，可使用 [app.set()](/{{ page.lang }}/4x/api.html#app.set) 将应用程序变量 `trust proxy` 设置为下表中所列的某个值。

<div class="doc-box doc-info" markdown="1">
尽管不设置应用程序变量 `trust proxy` 该应用程序也不会运行失败，但是它会误将代理的 IP 地址注册为客户机 IP 地址（除非配置了 `trust proxy`）。
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>类型</th><th>值</th></tr></thead>
  <tbody>
    <tr>
      <td>布尔</td>
<td markdown="1">
如果为 `true`，那么客户机的 IP 地址将用作 `X-Forwarded-*` 头中最左侧的条目。
如果为 `false`，那么该应用程序将被视为直接面对因特网，而客户机的 IP 地址则派生自 `req.connection.remoteAddress`。这是缺省设置。
</td>
    </tr>
    <tr>
      <td>IP 地址</td>
<td markdown="1">
要信任的 IP 地址、子网或者一组 IP 地址与子网。以下列表显示预先配置的子网名称：
* loopback - `127.0.0.1/8` 或 `::1/128`
* linklocal - `169.254.0.0/16` 或 `fe80::/10`
* uniquelocal - `10.0.0.0/8`、`172.16.0.0/12`、`192.168.0.0/16` 或 `fc00::/7`

您可以按以下某种方法设置 IP 地址：

<pre>
<code class="language-js" translate="no">app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code>
</pre>

如果指定 IP 地址或子网，那么会在地址确定过程中排除这些项，而将最接近应用程序服务器的不受信任的 IP 地址确定为客户机的 IP 地址。
</td>
    </tr>
    <tr>
      <td>数字</td>
<td markdown="1">
信任来自正面代理服务器的第 `n` 个中继段，以此作为客户机。
</td>
    </tr>
    <tr>
      <td>函数</td>
<td markdown="1">
定制信任实现。仅当您知道自己要做什么时，方可使用该选项。
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

设置非 `false` `trust proxy` 值会导致三个重大变化：

<ul>
  <li markdown="1">[req.hostname](/{{ page.lang }}/api.html#req.hostname) 的值派生自 `X-Forwarded-Host` 头中设置的值（可以由客户机或代理设置此值）。
  </li>
  <li markdown="1">`X-Forwarded-Proto` 可以由逆向代理设置，以告知应用程序：它是 `https` 还是 `http`，或者甚至是无效名称。该值由 [req.protocol](/{{ page.lang }}/api.html#req.protocol) 反映。
  </li>
  <li markdown="1">[req.ip](/{{ page.lang }}/api.html#req.ip) 和 [req.ips](/{{ page.lang }}/api.html#req.ips) 值由 `X-Forwarded-For` 的地址列表填充。
  </li>
</ul>

`trust proxy` 设置由使用 [proxy-addr](https://www.npmjs.com/package/proxy-addr) 包实现。有关更多信息，请参阅其文档。
