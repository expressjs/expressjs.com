---
layout: page
title: Express 安全性更新
menu: advanced
lang: zh-cn
---

# 安全更新

<div class="doc-box doc-notice" markdown="1">
Node.js 漏洞直接影响 Express。因此，请[监视 Node.js 漏洞](http://blog.nodejs.org/vulnerability/)并确保使用最新稳定版的 Node.js。
</div>

以下列举了在指定版本更新中修复的 Express 漏洞。

## 4.x

  * 4.11.1
    * 修复了 `express.static`、`res.sendfile` 和 `res.sendFile` 中的根路径披露漏洞
  * 4.10.7
    * 在 `express.static`（[公告](https://npmjs.com/advisories/35)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)）中修复了开放重定向漏洞。
  * 4.8.8
    * 在 `express.static`（[公告](http://npmjs.com/advisories/32)、[CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)）中修复了目录遍历漏洞。
  * 4.8.4
    * Node.js 0.10 在某些情况下可能会泄漏 `fd`，这会影响 `express.static` 和 `res.sendfile`。恶意请求会导致 `fd` 泄漏并最终导致 `EMFILE` 错误和服务器无响应。
  * 4.8.0
    * 查询字符串中具有极高数量索引的稀疏数组会导致进程耗尽内存并使服务器崩溃。
    * 极端嵌套查询字符串对象会导致进程阻塞并使服务器暂时无响应。

## 3.x

  * 3.19.1
    * 修复了 `express.static`、`res.sendfile` 和 `res.sendFile` 中的根路径披露漏洞
  * 3.19.0
    * 在 `express.static`（[公告](https://npmjs.com/advisories/35)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)）中修复了开放重定向漏洞。
  * 3.16.10
    * 在 `express.static` 中修复了目录遍历漏洞。
  * 3.16.6
    * Node.js 0.10 在某些情况下可能会泄漏 `fd`，这会影响 `express.static` 和 `res.sendfile`。恶意请求会导致 `fd` 泄漏并最终导致 `EMFILE` 错误和服务器无响应。
  * 3.16.0
    * 查询字符串中具有极高数量索引的稀疏数组会导致进程耗尽内存并使服务器崩溃。
    * 极端嵌套查询字符串对象会导致进程阻塞并使服务器暂时无响应。
  * 3.3.0
    * 不受支持的方法覆盖尝试的 404 响应易于受到跨站点脚本编制攻击。
