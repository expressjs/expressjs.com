---
layout: page
title: Express のセキュリティー更新
description: Review the latest security updates and patches for Express.js, including detailed vulnerability lists for different versions to help maintain a secure application.
menu: advanced
lang: ja
redirect_from: "  "
---

# セキュリティー更新

<div class="doc-box doc-notice" markdown="1">
Node.js の脆弱性は Express に直接影響を与えます。そのため、[Node.js の脆弱性の監視を続けて](https://nodejs.org
/en/blog/vulnerability/)、必ず、安定した最新バージョンの Node.js を使用してください。 Therefore, [keep a watch on Node.js vulnerabilities](https://nodejs.org/en/blog/vulnerability/) and make sure you are using the latest stable version of Node.js.
</div>

次のリストに、示されているバージョンの更新で修正された Express の脆弱性を列挙します。

{% capture security-policy %}
If you believe you have discovered a security vulnerability in Express, please see
[Security Policies and Procedures](/{{page.lang}}/resources/contributing.html#security-policies-and-procedures).
{% endcapture %}

{% include admonitions/note.html content=security-policy %}

## 4.x

- 4.21.2
  - The dependency `path-to-regexp` has been updated to address a [vulnerability](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-rhx6-c78j-4q9w).
- 4.21.1
  - The dependency `cookie` has been updated to address a [vulnerability](https://github.com/jshttp/cookie/security/advisories/GHSA-pxg6-pf52-xh8x), This may affect your application if you use `res.cookie`.
- 4.20.0
  - Fixed XSS vulnerability in `res.redirect` ([advisory](https://github.com/expressjs/express/security/advisories/GHSA-qw6h-vgh9-j6wx), [CVE-2024-43796](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-43796)).
  - The dependency `serve-static` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-cm22-4g7w-348p).
  - The dependency `send` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-m6fv-jmcg-4jfg).
  - The dependency `path-to-regexp` has been updated to address a [vulnerability](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-9wv6-86v2-598j).
  - The dependency `body-parser` has been updated to addres a [vulnerability](https://github.com/advisories/GHSA-qwcr-r2fm-qrc7), This may affect your application if you had url enconding activated.
- 4.19.0, 4.19.1
  - Fixed open redirect vulnerability in `res.location` and `res.redirect` ([advisory](https://github.com/expressjs/express/security/advisories/GHSA-rv95-896h-c2vc), [CVE-2024-29041](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-29041)).
- 4.17.3
  - The dependency `qs` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-hrpp-h998-j3pp). This may affect your application if the following APIs are used: `req.query`, `req.body`, `req.param`.
- 4.16.0
  - The dependency `forwarded` has been updated to address a [vulnerability](https://npmjs.com/advisories/527). 依存関係`forwarded`は、[脆弱性](https://npmjs.com/advisories/527)に対処するために更新されました。これは、`req.host`、`req.hostname`、`req.ip`、`req.ips`、`req.protocol`のAPIが使用されている場合、アプリケーションに影響を与える可能性があります。
  - 依存関係`mime`は[脆弱性](https://npmjs.com/advisories/535)に対処するために更新されましたが、この問題はExpressには影響しません。
  - 依存関係`send`が更新され、[Node.js 8.5.0の脆弱性](https://nodejs.org/en/blog/vulnerability/september-2017-path-validation/)に対する保護が提供されています。これは特定のNode.jsバージョン8.5.0でExpressを実行する場合にのみ影響します。 This only impacts running Express on the specific Node.js version 8.5.0.
- 4.15.5
  - 依存関係`debug`は[脆弱性](https://snyk.io/vuln/npm:debug:20170905)に対処するために更新されましたが、この問題はExpressには影響しません。
  - The dependency `fresh` has been updated to address a [vulnerability](https://npmjs.com/advisories/526). 依存関係`fresh`は、[脆弱性](https://npmjs.com/advisories/526)に対処するために更新されました。これは、次のAPIが使用されている場合、アプリケーションに影響します：`express.static`、`req.fresh`、`res.json`、`res.jsonp`、`res.send`、`res.sendfile`、`res.sendFile`、`res.sendStatus`
- 4.15.3
  - The dependency `ms` has been updated to address a [vulnerability](https://snyk.io/vuln/npm:ms:20170412). 依存関係`ms`は、[脆弱性](https://snyk.io/vuln/npm:ms:20170412)に対処するために更新されました。`express.static`、`res.sendfile`、および`res.sendFile`のAPIで、信頼できない文字列が入力され`maxAge`オプションに渡されると、アプリケーションに影響を与える可能性があります。
- 4.15.2
  - 依存関係`qs`は[脆弱性](https://snyk.io/vuln/npm:qs:20170213)に対処するために更新されましたが、この問題はExpressには影響しません。4.15.2へのアップデートは良い習慣ですが、この脆弱性に対処する必要はありません。 Updating to 4.15.2 is a good practice, but not required to address the vulnerability.
- 4.11.1
  - `express.static`、`res.sendfile`、および `res.sendFile` のルート・パス開示の脆弱性を修正しました。
- 4.10.7
  - `express.static` のオープン・リダイレクトの脆弱性を修正しました ([アドバイザリー](https://npmjs.com/advisories/35)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164))。
- 4.8.8
  - `express.static` のディレクトリー・トラバーサルの脆弱性を修正しました ([アドバイザリー](http://npmjs.com/advisories/32)、[CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394))。
- 4.8.4
  - Node.js 0.10 は、特定の状況で `fd` をリークして、`express.static` および `res.sendfile` に影響を及ぼす可能性があります。悪意ある要求によって `fd` がリークされ、最終的に `EMFILE` エラーが発生したり、サーバーが応答しなくなったりする可能性があります。 Malicious requests could cause `fd`s to leak and eventually lead to `EMFILE` errors and server unresponsiveness.
- 4.8.0
  - クエリストリングに極めて多数の索引が含まれる疎配列により、プロセスがメモリー不足になり、サーバーが異常終了する可能性があります。
  - 過度にネストされたクエリストリング・オブジェクトにより、プロセスがサーバーをブロックして、サーバーが一時的に応答できなくなる可能性があります。

## 3.x

  <div class="doc-box doc-warn" markdown="1">
  **Express 3.x は保守されなくなりました**

3.xの既知および未知のセキュリティ問題は、最終更新（2015年8月1日）以降は対処されていません。3.x系を使用することは安全であると見なされるべきではありません。 It is highly recommended to use the latest version of Express.

If you are unable to upgrade past 3.x, please consider [Commercial Support Options](/{{ page.lang }}/support#commercial-support-options).

  </div>

- 3.19.1
  - `express.static`、`res.sendfile`、および `res.sendFile` のルート・パス開示の脆弱性を修正しました。
- 3.19.0
  - `express.static` のオープン・リダイレクトの脆弱性を修正しました ([アドバイザリー](https://npmjs.com/advisories/35)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164))。
- 3.16.10
  - `express.static` のディレクトリー・トラバーサルの脆弱性を修正しました。
- 3.16.6
  - Node.js 0.10 は、特定の状況で `fd` をリークして、`express.static` および `res.sendfile` に影響を及ぼす可能性があります。悪意ある要求によって `fd` がリークされ、最終的に `EMFILE` エラーが発生したり、サーバーが応答しなくなったりする可能性があります。 Malicious requests could cause `fd`s to leak and eventually lead to `EMFILE` errors and server unresponsiveness.
- 3.16.0
  - クエリストリングに極めて多数の索引が含まれる疎な配列により、プロセスがメモリー不足になり、サーバーが異常終了する可能性があります。
  - 過度にネストされたクエリストリング・オブジェクトにより、プロセスがサーバーをブロックして、サーバーが一時的に応答できなくなる可能性があります。
- 3.3.0
  - サポートされていないメソッドのオーバーライドの 404 応答は、クロスサイト・スクリプティングの攻撃を受ける可能性がありました。