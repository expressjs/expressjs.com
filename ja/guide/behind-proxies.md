---
layout: page
title: プロキシーの背後の Express
menu: guide
lang: ja
---

# プロキシーの背後の Express

Express アプリケーションをプロキシーの背後で実行する場合、([app.set()](/{{ page.lang }}/4x/api.html#app.set) を使用して) アプリケーション変数 `trust proxy` を次の表にリストされているいずれかの値に設定します。

<div class="doc-box doc-info" markdown="1">

アプリケーション変数 `trust proxy` が設定されていない場合でもアプリケーションの実行は失敗しませんが、`trust proxy` が構成されていない限り、プロキシーの IP アドレスを誤ってクライアント IP アドレスとして登録します。

</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>型</th><th>値</th></tr></thead>
  <tbody>
    <tr>
      <td>真偽値</td>
<td markdown="1">

`true` の場合、クライアントの IP アドレスは、`X-Forwarded-*` ヘッダーの左端の項目として理解されます。

`false` の場合、アプリケーションはインターネットに直接接続されているものとして理解され、クライアントの IP アドレスは `req.connection.remoteAddress` から導き出されます。これはデフォルトの設定値です。

</td>
    </tr>
    <tr>
      <td>IP アドレス</td>
<td markdown="1">

信頼される IP アドレス、サブネット、または IP アドレスとサブネットの配列。次のリストに、事前構成されたサブネット名を示します。

* loopback - `127.0.0.1/8`、`::1/128`
* linklocal - `169.254.0.0/16`、`fe80::/10`
* uniquelocal - `10.0.0.0/8`、`172.16.0.0/12`、`192.168.0.0/16`、`fc00::/7`

以下のどの方法でも IP アドレスを設定できます。

```js
app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array
```

IP アドレスまたはサブネットは、指定されると、アドレス決定プロセスから除外されます。アプリケーション・サーバーに最も近い信頼できない IP アドレスがクライアントの IP アドレスに決定されます。
</td>
    </tr>
    <tr>
      <td>数字</td>
<td markdown="1">

プロキシー・サーバーから `n` 番目のホップをクライアントとして信頼します。

</td>
    </tr>
    <tr>
      <td>関数</td>
<td markdown="1">
カスタムの信頼実装。実行内容を理解している場合にのみ、これを使用してください。

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
  <li markdown="1">

  [req.hostname](/{{ page.lang }}/api.html#req.hostname) の値は、クライアントまたはプロキシーが設定できる `X-Forwarded-Host` ヘッダーに設定された値から導き出されます。
  </li>
  <li markdown="1">

  `X-Forwarded-Proto` は、`https` と `http` のどちらであるか、または無効な名前であるかをアプリケーションに通知するためにリバース・プロキシーによって設定できます。この値は、[req.protocol](/{{ page.lang }}/api.html#req.protocol) に反映されます。
  </li>
  <li markdown="1">
  
  [req.ip](/{{ page.lang }}/api.html#req.ip) および [req.ips](/{{ page.lang }}/api.html#req.ips) の値は、`X-Forwarded-For` のアドレス・リストから取り込まれます。
  </li>
</ul>

`trust proxy` 設定は、[proxy-addr](https://www.npmjs.com/package/proxy-addr) パッケージを使用して実装されます。詳細については、資料を参照してください。

