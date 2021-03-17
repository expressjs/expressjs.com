---
layout: page
title: Express 安全更新
menu: advanced
lang: zh-tw
---

# 安全更新

<div class="doc-box doc-notice" markdown="1">
Node.js 的漏洞會直接影響 Express。因此，請[隨時監看 Node.js 漏洞](http://blog.nodejs.org/vulnerability/)，並確保您所用的是最新的 Node.js 穩定版本。
</div>

以下列舉已在指定的版本更新中修正的 Express 漏洞。

## 4.x

  * 4.11.1
    * 已修正 `express.static`、`res.sendfile` 和 `res.sendFile` 中的根路徑揭露漏洞
  * 4.10.7
    * 已修正 `express.static`（[諮詢](https://npmjs.com/advisories/35)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)）中的開放重新導向漏洞。
  * 4.8.8
    * 已修正 `express.static`（[諮詢](http://npmjs.com/advisories/32)、[CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)）中的目錄遍訪漏洞。
  * 4.8.4
    * 在某些情況下，Node.js 0.10 可能洩漏 `fd`，而影響 `express.static` 和 `res.sendfile`。惡意的要求可能造成 `fd` 洩漏，最後導致 `EMFILE` 錯誤和伺服器無回應。
  * 4.8.0
    * 如果稀疏陣列在查詢字串中的索引過多，可能導致程序耗盡記憶體，而使伺服器當機。
    * 巢狀過深的查詢字串物件可能造成程序封鎖，使伺服器暫時沒有回應。

## 3.x

  * 3.19.1
    * 已修正 `express.static`、`res.sendfile` 和 `res.sendFile` 中的根路徑揭露漏洞
  * 3.19.0
    * 已修正 `express.static`（[諮詢](https://npmjs.com/advisories/35)、[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)）中的開放重新導向漏洞。
  * 3.16.10
    * 已修正 `express.static` 中的目錄遍訪漏洞。
  * 3.16.6
    * 在某些情況下，Node.js 0.10 可能洩漏 `fd`，而影響 `express.static` 和 `res.sendfile`。惡意的要求可能造成 `fd` 洩漏，最後導致 `EMFILE` 錯誤和伺服器無回應。
  * 3.16.0
    * 如果稀疏陣列在查詢字串中的索引過多，可能導致程序耗盡記憶體，而使伺服器當機。
    * 巢狀過深的查詢字串物件可能造成程序封鎖，使伺服器暫時沒有回應。
  * 3.3.0
    * 404 回應（試圖進行不支援的方法置換）容易受到跨網站 Scripting 攻擊。
