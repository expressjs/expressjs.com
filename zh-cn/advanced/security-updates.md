---
layout: page
title: Express 安全性更新
description: Review the latest security updates and patches for Express.js, including detailed vulnerability lists for different versions to help maintain a secure application.
menu: advanced
order: 2
redirect_from: "  "
---

# 安全更新

<div class="doc-box doc-notice" markdown="1">
Node.js vulnerabilities directly affect Express. 
Node.js 漏洞直接影响 Express。因此，请[监视 Node.js 漏洞](https://nodejs.org
/en/blog/vulnerability/)并确保使用最新稳定版的 Node.js。

</div>

以下列举了在指定版本更新中修复的 Express 漏洞。

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
  - The dependency `forwarded` has been updated to address a [vulnerability](https://npmjs.com/advisories/527). This may affect your application if the following APIs are used: `req.host`, `req.hostname`, `req.ip`, `req.ips`, `req.protocol`.
  - The dependency `mime` has been updated to address a [vulnerability](https://npmjs.com/advisories/535), but this issue does not impact Express.
  - The dependency `send` has been updated to provide a protection against a [Node.js 8.5.0 vulnerability](https://nodejs.org/en/blog/vulnerability/september-2017-path-validation/). This only impacts running Express on the specific Node.js version 8.5.0.
- 4.15.5
  - The dependency `debug` has been updated to address a [vulnerability](https://snyk.io/vuln/npm:debug:20170905), but this issue does not impact Express.
  - The dependency `fresh` has been updated to address a [vulnerability](https://npmjs.com/advisories/526). This will affect your application if the following APIs are used: `express.static`, `req.fresh`, `res.json`, `res.jsonp`, `res.send`, `res.sendfile` `res.sendFile`, `res.sendStatus`.
- 4.15.3
  - The dependency `ms` has been updated to address a [vulnerability](https://snyk.io/vuln/npm:ms:20170412). This may affect your application if untrusted string input is passed to the `maxAge` option in the following APIs: `express.static`, `res.sendfile`, and `res.sendFile`.
- 4.15.2
  - The dependency `qs` has been updated to address a [vulnerability](https://snyk.io/vuln/npm:qs:20170213), but this issue does not impact Express. Updating to 4.15.2 is a good practice, but not required to address the vulnerability.
- 4.11.1
  - 修复了 `express.static`、`res.sendfile` 和 `res.sendFile` 中的根路径披露漏洞
- 4.10.7
  - 在 `express.static`（[公告](https://npmjs.com/advisories/35)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)）中修复了开放重定向漏洞。
- 4.8.8
  - 在 `express.static`（[公告](http://npmjs.com/advisories/32)、[CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)）中修复了目录遍历漏洞。
- 4.8.4
  - Node.js 0.10 在某些情况下可能会泄漏 `fd`，这会影响 `express.static` 和 `res.sendfile`。恶意请求会导致 `fd` 泄漏并最终导致 `EMFILE` 错误和服务器无响应。 Malicious requests could cause `fd`s to leak and eventually lead to `EMFILE` errors and server unresponsiveness.
- 4.8.0
  - 查询字符串中具有极高数量索引的稀疏数组会导致进程耗尽内存并使服务器崩溃。
  - 极端嵌套查询字符串对象会导致进程阻塞并使服务器暂时无响应。

## 3.x

  <div class="doc-box doc-warn" markdown="1">
  **Express 3.x 不再受到维护**

Known and unknown security and performance issues in 3.x have not been addressed since the last update (1 August, 2015). It is highly recommended to use the latest version of Express.

If you are unable to upgrade past 3.x, please consider [Commercial Support Options](/{{ page.lang }}/support#commercial-support-options).

  </div>

- 3.19.1
  - 修复了 `express.static`、`res.sendfile` 和 `res.sendFile` 中的根路径披露漏洞
- 3.19.0
  - 在 `express.static`（[公告](https://npmjs.com/advisories/35)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)）中修复了开放重定向漏洞。
- 3.16.10
  - 在 `express.static` 中修复了目录遍历漏洞。
- 3.16.6
  - Node.js 0.10 在某些情况下可能会泄漏 `fd`，这会影响 `express.static` 和 `res.sendfile`。恶意请求会导致 `fd` 泄漏并最终导致 `EMFILE` 错误和服务器无响应。 Malicious requests could cause `fd`s to leak and eventually lead to `EMFILE` errors and server unresponsiveness.
- 3.16.0
  - 查询字符串中具有极高数量索引的稀疏数组会导致进程耗尽内存并使服务器崩溃。
  - 极端嵌套查询字符串对象会导致进程阻塞并使服务器暂时无响应。
- 3.3.0
  - 不受支持的方法覆盖尝试的 404 响应易于受到跨站点脚本编制攻击。