---
layout: page
title: 位於 Proxy 背後的 Express
menu: guide
lang: zh-tw
---

# 位於 Proxy 背後的 Express

當 Express 應用程式是在 Proxy 背後執行時，請使用 [app.set()](/{{ page.lang }}/4x/api.html#app.set)，將 `trust proxy` 應用程式變數設為下表列出的其中一值。

<div class="doc-box doc-info" markdown="1">
雖然未設定 `trust proxy` 應用程式變數時，應用程式並不會無法執行，但除非配置 `trust proxy`，否則，它會將 Proxy 的 IP 位址登錄成錯誤的用戶端 IP 位址。
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>類型</th><th>值</th></tr></thead>
  <tbody>
    <tr>
      <td>布林</td>
<td markdown="1">
若為 `true`，會將用戶端的 IP 位址視為 `X-Forwarded-*` 標頭中的最左側項目。

若為 `false`，會將應用程式視為直接面對網際網路，且用戶端的 IP 位址衍生自 `req.connection.remoteAddress`。這是預設值。
</td>
    </tr>
    <tr>
      <td>IP 位址</td>
<td markdown="1">
要信任的 IP 位址、子網路，或是 IP 位址與子網路陣列。下列清單顯示預先配置的子網路名稱：

* loopback - `127.0.0.1/8`、`::1/128`
* linklocal - `169.254.0.0/16`、`fe80::/10`
* uniquelocal - `10.0.0.0/8`、`172.16.0.0/12`、`192.168.0.0/16`、`fc00::/7`

您可以採下列任何方式來設定 IP 位址：

<pre>
<code class="language-js" translate="no">app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code>
</pre>

若有指定，位址判定程序中會排除 IP 位址或子網路，且會將最接近應用程式伺服器的未授信 IP 位址判斷為用戶端的 IP 位址。
</td>
    </tr>
    <tr>
      <td>號碼</td>
<td markdown="1">
信任來自正面 Proxy 伺服器的第 `n` 個躍點就是用戶端。
</td>
    </tr>
    <tr>
      <td>函數</td>
<td markdown="1">
自訂信任實作。只有在您清楚自己要做什麼時，才能使用此項。
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

如果設定 `false` `trust proxy` 以外的值，會造成三項重要的變更：

<ul>
  <li markdown="1">[req.hostname](/{{ page.lang }}/api.html#req.hostname) 值會衍生自 `X-Forwarded-Host` 標頭中所設定的值，且該值可能由用戶端或 Proxy 所設定。
  </li>
  <li markdown="1">反向 Proxy 可能設定 `X-Forwarded-Proto`，以告知應用程式它是 `https` 或 `http` 或甚至是無效的名稱。[req.protocol](/{{ page.lang }}/api.html#req.protocol) 會反映此值。
  </li>
  <li markdown="1">[req.ip](/{{ page.lang }}/api.html#req.ip) 和 [req.ips](/{{ page.lang }}/api.html#req.ips) 值中會移入 `X-Forwarded-For` 中的位址清單。
  </li>
</ul>

會使用 [proxy-addr](https://www.npmjs.com/package/proxy-addr) 套件來實作 `trust proxy` 設定。如需相關資訊，請參閱其說明文件。
