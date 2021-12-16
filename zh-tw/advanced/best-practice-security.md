---
layout: page
title: 正式作業中的 Express 安全最佳作法
menu: advanced
lang: zh-tw
---

# 正式作業最佳作法：安全

## 概觀

「*正式作業*」術語是指軟體生命週期中，應用程式或 API 通用於其一般使用者或消費者的階段。相對地，在「*開發*」階段，您仍在積極撰寫和測試程式碼，且應用程式尚未開放給外部存取。對應的系統環境分別稱為*正式作業*環境和*開發*環境。

開發環境和正式作業環境的設定方式通常不同，且其需求差異頗大。適合用於開發中的，在正式作業中不見得合用。舉例來說，在開發環境中，您可能希望詳細記載錯誤以便除錯，而相同的行為在正式作業環境中卻可能成為安全隱憂。在開發中，您不必擔心可調整性、可靠性和效能，但在正式作業中這些顧慮相形重要。

本文討論部署至正式作業之 Express 應用程式的一些安全最佳作法。

## 請勿使用已淘汰或有漏洞的 Express 版本

Express 2.x 和 3.x 不再維護。不會修正這些版本中的安全與效能問題。請勿使用它們！如果您尚未移至第 4 版，請遵循[移轉手冊](/{{ page.lang }}/guide/migrating-4.html)。

另請確定您沒有使用[「安全更新」頁面](/{{ page.lang }}/advanced/security-updates.html)中列出的任何有漏洞的 Express 版本。若有使用，請更新為其中一個穩定版本，最好是最新版本。

## 使用 TLS

如果您的應用程式會處理或傳輸機密資料，請使用[傳輸層安全](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS)，來保護連線和資料的安全。此技術會在資料從用戶端傳送至伺服器之前，先將資料加密，因此可阻止一些常見（和容易）的駭客攻擊。雖然 Ajax 和 POST 要求不見得明顯可見，且在瀏覽器中似乎是「隱藏的」，其網路資料流量卻容易遭到[封包探查](https://en.wikipedia.org/wiki/Packet_analyzer)和[中間人攻擊](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)。

您可能熟悉 Secure Socket Layer (SSL) 加密。[TLS 就是 SSL 後繼的演進](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx)。換句話說，如果您之前使用 SSL，請考量升級至 TLS。一般而言，我們建議由 Nginx 來處理 TLS。如需有關在 Nginx（和其他伺服器）上配置 TLS 的適當參考資料，請參閱 [Recommended Server Configurations (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations)。

此外，可方便您取得免費 TLS 憑證的工具是 [Let's Encrypt](https://letsencrypt.org/about/)，這是一個免費的自動化開放憑證管理中心 (CA)，由 [Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/) 提供。

## 使用 Helmet

[Helmet](https://www.npmjs.com/package/helmet) 會適當設定 HTTP 標頭，有助於防範您的應用程式出現已知的 Web 漏洞。

Helmet 實際上只由 9 個小型中介軟體函數組成，這些函數會設定安全相關的 HTTP 標頭：

* [csp](https://github.com/helmetjs/csp) 會設定 `Content-Security-Policy` 標頭，以防範跨網站 Scripting 攻擊和其他跨網站注入。
* [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) 會移除 `X-Powered-By` 標頭。
* [hsts](https://github.com/helmetjs/hsts) 會設定 `Strict-Transport-Security` 標頭，以施行安全的 (HTTP over SSL/TLS) 伺服器連線。
* [ieNoOpen](https://github.com/helmetjs/ienoopen) 會設定 `X-Download-Options`（適用於 IE8+）。
* [noCache](https://github.com/helmetjs/nocache) 會設定 `Cache-Control` 和 Pragma 標頭，以停用用戶端快取。
* [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) 會設定 `X-Content-Type-Options`，以阻止瀏覽器對脫離所宣告內容類型的回應進行 MIME 探查。
* [frameguard](https://github.com/helmetjs/frameguard) 會設定 `X-Frame-Options` 標頭，以提供 [clickjacking](https://www.owasp.org/index.php/Clickjacking) 保護。
* [xssFilter](https://github.com/helmetjs/x-xss-protection) 會設定 `X-XSS-Protection`，以便在最新的 Web 瀏覽器中啟用跨網站 Scripting (XSS) 過濾器。

安裝 Helmet 等之類的其他任何模組：

```console
$ npm install --save helmet
```

然後在您的程式碼中使用它：

<pre>
<code class="language-javascript" translate="no">
...
var helmet = require('helmet');
app.use(helmet());
...
</code>
</pre>

### 至少停用 X-Powered-By 標頭

如果您不想使用 Helmet，最起碼請停用 `X-Powered-By` 標頭。攻擊者可能使用這個標頭（依預設，會啟用），來偵測執行 Express 的應用程式，然後啟動特定目標的攻擊。

因此最佳作法是使用 `app.disable()` 方法來關閉標頭：

<pre>
<code class="language-javascript" translate="no">
app.disable('x-powered-by');
</code>
</pre>

如果您使用 `helmet.js`，自會為您處理此事。

## 安全地使用 Cookie

為了確保 Cookie 不會開啟您的應用程式進行惡意探索，請勿使用預設階段作業 Cookie 名稱，並適當設定 Cookie 安全選項。

以下是兩個主要的中介軟體 Cookie 階段作業模組：

* [express-session](https://www.npmjs.com/package/express-session)，取代了 Express 3.x 內建的 `express.session` 中介軟體。
* [cookie-session](https://www.npmjs.com/package/cookie-session)，取代了 Express 3.x 內建的 `express.cookieSession` 中介軟體。

這兩個模組之間的主要差異是它們儲存 Cookie 階段作業資料的方式。[express-session](https://www.npmjs.com/package/express-session) 中介軟體會將階段作業資料儲存在伺服器上；
它只將階段作業 ID（而非階段作業資料）儲存在 Cookie 本身中。依預設，它使用記憶體內儲存體，且並非設計成用於正式作業環境。在正式作業中，您需要設定可調式階段作業儲存庫；
請參閱[相容的階段作業儲存庫](https://github.com/expressjs/session#compatible-session-stores)清單。

相對地，[cookie-session](https://www.npmjs.com/package/cookie-session) 中介軟體會實作以 Cookie 為基礎的儲存體：它會將整個階段作業序列化為 Cookie，而非只是一個階段作業金鑰。只有在階段作業資料相對較小，且易於編碼成基本值（而非物件）時，才使用此項。雖然瀏覽器對於每個 Cookie 理應可以支援至少
4096 個位元組，為了確保您不會超出限制，對於每一個網域，請勿超過 4093 個位元組大小。此外要留意的是，用戶端可以看見 Cookie 資料，因此，若有任何原因需要保護該資料的安全或加以遮蔽，最好選擇 express-session。

### 請勿使用預設階段作業 Cookie 名稱

使用預設階段作業 Cookie 名稱可能開放您的應用程式遭受攻擊。引發的安全問題類似於 `X-Powered-By`：潛在的攻擊者可能用它來對伺服器進行指紋辨識，從而發動目標攻擊。

為了避免發生此問題，請使用通用 Cookie 名稱；
例如，使用 [express-session](https://www.npmjs.com/package/express-session) 中介軟體：

<pre>
<code class="language-javascript" translate="no">
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : 's3Cur3',
   name : 'sessionId',
  })
);
</code>
</pre>

### 設定 Cookie 安全選項

設定下列 Cookie 選項來加強安全：

* `secure` - 確保瀏覽器只透過 HTTPS 傳送 Cookie。
* `httpOnly` - 確保只透過 HTTP(S) 傳送 Cookie，而不透過用戶端 JavaScript 傳送，如此有助於防範跨網站 Scripting 攻擊。
* `domain` - 指出 Cookie 的網域；用來與發出 URL 要求之伺服器的網域相互比較。如果相符，接著會檢查路徑屬性。
* `path` - 指出 Cookie 的路徑；用來與要求路徑相互比較。如果此項與網域相符，則會傳送要求中的 Cookie。
* `expires` - 用來設定持續性 Cookie 的到期日。

下列範例使用 [cookie-session](https://www.npmjs.com/package/cookie-session) 中介軟體：

<pre>
<code class="language-javascript" translate="no">
var session = require('cookie-session');
var express = require('express');
var app = express();

var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            domain: 'example.com',
            path: 'foo/bar',
            expires: expiryDate
          }
  })
);
</code>
</pre>

## 其他注意事項

以下是優異的 [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/) 所提供的進一步建議。如需這些建議的所有詳細資料，請參閱該部落格文章：

* 實作速率限制，以防對鑑別發動強制入侵攻擊。其中一個作法是使用 [StrongLoop API Gateway](https://strongloop.com/node-js/api-gateway/) 來施行速率限制原則。或者，您可以使用 [express-limiter](https://www.npmjs.com/package/express-limiter) 之類的中介軟體，但是如果這樣做，您需要稍微修改程式碼。
* 使用 [csurf](https://www.npmjs.com/package/csurf) 中介軟體，來防範偽造跨網站要求 (CSRF)。
* 一律對使用者輸入進行過濾和消毒，來防範跨網站 Scripting (XSS) 和指令注入攻擊。
* 使用參數化查詢或備妥陳述式，來防禦 SQL 注入攻擊。
* 使用開放程式碼 [sqlmap](http://sqlmap.org/) 工具，來偵測您應用程式中的 SQL 注入漏洞。
* 使用 [nmap](https://nmap.org/) 和 [sslyze](https://github.com/nabla-c0d3/sslyze) 工具，來測試您 SSL 密碼、金鑰和重新協議的配置，以及測試您憑證的有效性。
* 使用 [safe-regex](https://www.npmjs.com/package/safe-regex)，確定您的正規表示式不易受到[正規表示式阻斷服務](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS)攻擊。

## 避免其他已知的漏洞

關注 [Node Security Project](https://npmjs.com/advisories) 中有關可能影響您應用程式所用之 Express 或其他模組的公告。一般而言，Node Security Project 是一個絕佳的資源，它提供 Node 安全的相關知識和工具。

最後，如同其他任何的 Web 應用程式，Express 應用程式仍可能遭到各種 Web 型攻擊。請多加熟悉已知的 [Web 漏洞](https://www.owasp.org/index.php/Top_10_2013-Top_10)，並採取預防措施，來避免這些攻擊。
