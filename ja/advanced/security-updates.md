---
layout: page
title: Express のセキュリティー更新
menu: advanced
lang: ja
---

# セキュリティー更新

<div class="doc-box doc-notice" markdown="1">

Node.js の脆弱性は Express に直接影響を与えます。そのため、[Node.js の脆弱性の監視を続けて](http://blog.nodejs.org/vulnerability/)、必ず、安定した最新バージョンの Node.js を使用してください。

</div>

次のリストに、示されているバージョンの更新で修正された Express の脆弱性を列挙します。

**注意**: Expressでセキュリティ上の脆弱性を発見したと思われる場合は、[セキュリティポリシーと手順](/{{page.lang}}/resources/contributing.html#security-policies-and-procedures)を参照してください。

## 4.x

  * 4.16.0
    * 依存関係`forwarded`は、[脆弱性](https://npmjs.com/advisories/527)に対処するために更新されました。これは、`req.host`、`req.hostname`、`req.ip`、`req.ips`、`req.protocol`のAPIが使用されている場合、アプリケーションに影響を与える可能性があります。
    * 依存関係`mime`は[脆弱性](https://npmjs.com/advisories/535)に対処するために更新されましたが、この問題はExpressには影響しません。
    * 依存関係`send`が更新され、[Node.js 8.5.0の脆弱性](https://nodejs.org/en/blog/vulnerability/september-2017-path-validation/)に対する保護が提供されています。これは特定のNode.jsバージョン8.5.0でExpressを実行する場合にのみ影響します。
  * 4.15.5
    * 依存関係`debug`は[脆弱性](https://snyk.io/vuln/npm:debug:20170905)に対処するために更新されましたが、この問題はExpressには影響しません。
    * 依存関係`fresh`は、[脆弱性](https://npmjs.com/advisories/526)に対処するために更新されました。これは、次のAPIが使用されている場合、アプリケーションに影響します：`express.static`、`req.fresh`、`res.json`、`res.jsonp`、`res.send`、`res.sendfile`、`res.sendFile`、`res.sendStatus`
  * 4.15.3
    * 依存関係`ms`は、[脆弱性](https://snyk.io/vuln/npm:ms:20170412)に対処するために更新されました。`express.static`、`res.sendfile`、および`res.sendFile`のAPIで、信頼できない文字列が入力され`maxAge`オプションに渡されると、アプリケーションに影響を与える可能性があります。
  * 4.15.2
    * 依存関係`qs`は[脆弱性](https://snyk.io/vuln/npm:qs:20170213)に対処するために更新されましたが、この問題はExpressには影響しません。4.15.2へのアップデートは良い習慣ですが、この脆弱性に対処する必要はありません。
  * 4.11.1
    * `express.static`、`res.sendfile`、および `res.sendFile` のルート・パス開示の脆弱性を修正しました。
  * 4.10.7
    * `express.static` のオープン・リダイレクトの脆弱性を修正しました ([アドバイザリー](https://npmjs.com/advisories/35)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164))。
  * 4.8.8
    * `express.static` のディレクトリー・トラバーサルの脆弱性を修正しました ([アドバイザリー](http://npmjs.com/advisories/32)、[CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394))。
  * 4.8.4
    * Node.js 0.10 は、特定の状況で `fd` をリークして、`express.static` および `res.sendfile` に影響を及ぼす可能性があります。悪意ある要求によって `fd` がリークされ、最終的に `EMFILE` エラーが発生したり、サーバーが応答しなくなったりする可能性があります。
  * 4.8.0
    * クエリストリングに極めて多数の索引が含まれる疎な配列により、プロセスがメモリー不足になり、サーバーが異常終了する可能性があります。
    * 過度にネストされたクエリストリング・オブジェクトにより、プロセスがサーバーをブロックして、サーバーが一時的に応答できなくなる可能性があります。

## 3.x

  <div class="doc-box doc-warn" markdown="1">

  **Express 3.x はもうメンテナンスされていません**

  3.xの既知および未知のセキュリティ問題は、最終更新（2015年8月1日）以降は対処されていません。3.x系を使用することは安全であると見なされるべきではありません。

  </div>

  * 3.19.1
    * `express.static`、`res.sendfile`、および `res.sendFile` のルート・パス開示の脆弱性を修正しました。
  * 3.19.0
    * `express.static` のオープン・リダイレクトの脆弱性を修正しました ([アドバイザリー](https://npmjs.com/advisories/35)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164))。
  * 3.16.10
    * `express.static` のディレクトリー・トラバーサルの脆弱性を修正しました。
  * 3.16.6
    * Node.js 0.10 は、特定の状況で `fd` をリークして、`express.static` および `res.sendfile` に影響を及ぼす可能性があります。悪意ある要求によって `fd` がリークされ、最終的に `EMFILE` エラーが発生したり、サーバーが応答しなくなったりする可能性があります。
  * 3.16.0
    * クエリストリングに極めて多数の索引が含まれる疎配列により、プロセスがメモリー不足になり、サーバーが異常終了する可能性があります。
    * 過度にネストされたクエリストリング・オブジェクトにより、プロセスがサーバーをブロックして、サーバーが一時的に応答できなくなる可能性があります。
  * 3.3.0
    * サポートされていないメソッドのオーバーライドの 404 応答は、クロスサイト・スクリプティングの攻撃を受ける可能性がありました。
