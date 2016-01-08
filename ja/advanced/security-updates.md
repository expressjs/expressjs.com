---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Express のセキュリティー更新
menu: advanced
lang: ja
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# セキュリティー更新

<div class="doc-box doc-notice" markdown="1">
Node.js の脆弱性は Express に直接影響を与えます。そのため、[Node.js の脆弱性の監視を続けて](http://blog.nodejs.org/vulnerability/)、必ず、安定した最新バージョンの Node.js を使用してください。
</div>

次のリストに、示されているバージョンの更新で修正された Express の脆弱性を列挙します。

## 4.x

  * 4.11.1
    * `express.static`、`res.sendfile`、および `res.sendFile` のルート・パス開示の脆弱性を修正しました。
  * 4.10.7
    * `express.static` のオープン・リダイレクトの脆弱性を修正しました ([アドバイザリー](https://nodesecurity.io/advisories/serve-static-open-redirect)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164))。
  * 4.8.8
    * `express.static` のディレクトリー・トラバーサルの脆弱性を修正しました ([アドバイザリー](http://nodesecurity.io/advisories/send-directory-traversal)、[CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394))。
  * 4.8.4
    * Node.js 0.10 は、特定の状況で `fd` をリークして、`express.static` および `res.sendfile` に影響を及ぼす可能性があります。悪意ある要求によって `fd` がリークされ、最終的に `EMFILE` エラーが発生したり、サーバーが応答しなくなったりする可能性があります。
  * 4.8.0
    * 照会ストリングに極めて多数の索引が含まれる疎配列により、プロセスがメモリー不足になり、サーバーが異常終了する可能性があります。
    * 過度にネストされた照会ストリング・オブジェクトにより、プロセスがサーバーをブロックして、サーバーが一時的に応答できなくなる可能性があります。

## 3.x

  * 3.19.1
    * `express.static`、`res.sendfile`、および `res.sendFile` のルート・パス開示の脆弱性を修正しました。
  * 3.19.0
    * `express.static` のオープン・リダイレクトの脆弱性を修正しました ([アドバイザリー](https://nodesecurity.io/advisories/serve-static-open-redirect)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164))。
  * 3.16.10
    * `express.static` のディレクトリー・トラバーサルの脆弱性を修正しました。
  * 3.16.6
    * Node.js 0.10 は、特定の状況で `fd` をリークして、`express.static` および `res.sendfile` に影響を及ぼす可能性があります。悪意ある要求によって `fd` がリークされ、最終的に `EMFILE` エラーが発生したり、サーバーが応答しなくなったりする可能性があります。
  * 3.16.0
    * 照会ストリングに極めて多数の索引が含まれる疎配列により、プロセスがメモリー不足になり、サーバーが異常終了する可能性があります。
    * 過度にネストされた照会ストリング・オブジェクトにより、プロセスがサーバーをブロックして、サーバーが一時的に応答できなくなる可能性があります。
  * 3.3.0
    * サポートされていないメソッドのオーバーライドの試行の 404 応答は、クロスサイト・スクリプティングの攻撃を受ける可能性がありました。
