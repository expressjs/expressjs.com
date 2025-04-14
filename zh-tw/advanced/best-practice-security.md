---
layout: page
title: 正式作業中的 Express 安全最佳作法
description: Discover crucial security best practices for Express apps in production, including using TLS, input validation, secure cookies, and preventing vulnerabilities.
menu: advanced
lang: zh-tw
redirect_from: /advanced/best-practice-security.html
---

# 正式作業最佳作法：安全

## 概觀

The term _"production"_ refers to the stage in the software lifecycle when an application or API is generally available to its end-users or consumers. In contrast, in the _"development"_ stage, you're still actively writing and testing code, and the application is not open to external access. The corresponding system environments are known as _production_ and _development_ environments, respectively.

Development and production environments are usually set up differently and have vastly different requirements. What's fine in development may not be acceptable in production. For example, in a development environment you may want verbose logging of errors for debugging, while the same behavior can become a security concern in a production environment. And in development, you don't need to worry about scalability, reliability, and performance, while those concerns become critical in production.

{% include admonitions/note.html content="If you believe you have discovered a security vulnerability in Express, please see
[Security Policies and Procedures](/en/resources/contributing.html#security-policies-and-procedures).
" %}

Security best practices for Express applications in production include:

- [Production Best Practices: Security](#production-best-practices-security)
  - [Overview](#overview)
  - [Don't use deprecated or vulnerable versions of Express](#dont-use-deprecated-or-vulnerable-versions-of-express)
  - 您可能熟悉 Secure Socket Layer (SSL) 加密。[TLS 就是 SSL 後繼的演進](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515\(v=vs.85\).aspx)。換句話說，如果您之前使用 SSL，請考量升級至 TLS。一般而言，我們建議由 Nginx 來處理 TLS。如需有關在 Nginx（和其他伺服器）上配置 TLS 的適當參考資料，請參閱 [Recommended Server Configurations (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations)。
  - [Do not trust user input](#do-not-trust-user-input)
    - [Prevent open redirects](#prevent-open-redirects)
  - [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) 會移除 `X-Powered-By` 標頭。
  - [Reduce fingerprinting](#reduce-fingerprinting)
  - `domain` - 指出 Cookie 的網域；用來與發出 URL 要求之伺服器的網域相互比較。如果相符，接著會檢查路徑屬性。
    - 相對地，[cookie-session](https://www.npmjs.com/package/cookie-session) 中介軟體會實作以 Cookie 為基礎的儲存體：它會將整個階段作業序列化為 Cookie，而非只是一個階段作業金鑰。只有在階段作業資料相對較小，且易於編碼成基本值（而非物件）時，才使用此項。雖然瀏覽器對於每個 Cookie 理應可以支援至少
      4096 個位元組，為了確保您不會超出限制，對於每一個網域，請勿超過 4093 個位元組大小。此外要留意的是，用戶端可以看見 Cookie 資料，因此，若有任何原因需要保護該資料的安全或加以遮蔽，最好選擇 express-session。
    - 使用預設階段作業 Cookie 名稱可能開放您的應用程式遭受攻擊。引發的安全問題類似於 `X-Powered-By`：潛在的攻擊者可能用它來對伺服器進行指紋辨識，從而發動目標攻擊。
  - [Prevent brute-force attacks against authorization](#prevent-brute-force-attacks-against-authorization)
  - [Ensure your dependencies are secure](#ensure-your-dependencies-are-secure)
    - 最後，如同其他任何的 Web 應用程式，Express 應用程式仍可能遭到各種 Web 型攻擊。請多加熟悉已知的 [Web 漏洞](https://www.owasp.org/www-project-top-ten/)，並採取預防措施，來避免這些攻擊。
  - [Additional considerations](#additional-considerations)

## 請勿使用已淘汰或有漏洞的 Express 版本

Express 2.x and 3.x are no longer maintained. Security and performance issues in these versions won't be fixed. Do not use them! If you haven't moved to version 4, follow the [migration guide](/{{ page.lang }}/guide/migrating-4.html) or consider [Commercial Support Options](/{{ page.lang }}/support#commercial-support-options).

另請確定您沒有使用[「安全更新」頁面](/{{ page.lang }}/advanced/security-updates.html)中列出的任何有漏洞的 Express 版本。若有使用，請更新為其中一個穩定版本，最好是最新版本。 If you are, update to one of the stable releases, preferably the latest.

## 使用 TLS

If your app deals with or transmits sensitive data, use [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) to secure the connection and the data. This technology encrypts data before it is sent from the client to the server, thus preventing some common (and easy) hacks. Although Ajax and POST requests might not be visibly obvious and seem "hidden" in browsers, their network traffic is vulnerable to [packet sniffing](https://en.wikipedia.org/wiki/Packet_analyzer) and [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

You may be familiar with Secure Socket Layer (SSL) encryption. [TLS is simply the next progression of SSL](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515\(v=vs.85\).aspx). In other words, if you were using SSL before, consider upgrading to TLS. In general, we recommend Nginx to handle TLS. For a good reference to configure TLS on Nginx (and other servers), see [Recommended Server Configurations (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

此外，可方便您取得免費 TLS 憑證的工具是 [Let's Encrypt](https://letsencrypt.org/about/)，這是一個免費的自動化開放憑證管理中心 (CA)，由 [Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/) 提供。

## Do not trust user input

For web applications, one of the most critical security requirements is proper user input validation and handling. This comes in many forms and we will not cover all of them here.
Ultimately, the responsibility for validating and correctly handling the types of user input your application accepts is yours.

### Prevent open redirects

An example of potentially dangerous user input is an _open redirect_, where an application accepts a URL as user input (often in the URL query, for example `?url=https://example.com`) and uses `res.redirect` to set the `location` header and
return a 3xx status.

An application must validate that it supports redirecting to the incoming URL to avoid sending users to malicious links such as phishing websites, among other risks.

Here is an example of checking URLs before using `res.redirect` or `res.location`:

```js
app.use((req, res) => {
  try {
    if (new Url(req.query.url).host !== 'example.com') {
      return res.status(400).end(`Unsupported redirect to host: ${req.query.url}`)
    }
  } catch (e) {
    return res.status(400).end(`Invalid url: ${req.query.url}`)
  }
  res.redirect(req.query.url)
})
```

## 使用 Helmet

[Helmet](https://www.npmjs.com/package/helmet) 會適當設定 HTTP 標頭，有助於防範您的應用程式出現已知的 Web 漏洞。

Helmet is a middleware function that sets security-related HTTP response headers. Helmet sets the following headers by default:

- `Content-Security-Policy`: A powerful allow-list of what can happen on your page which mitigates many attacks
- `Cross-Origin-Opener-Policy`: Helps process-isolate your page
- `Cross-Origin-Resource-Policy`: Blocks others from loading your resources cross-origin
- `Origin-Agent-Cluster`: Changes process isolation to be origin-based
- `Referrer-Policy`: Controls the [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header
- `Strict-Transport-Security`: Tells browsers to prefer HTTPS
- `X-Content-Type-Options`: Avoids [MIME sniffing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#mime_sniffing)
- `X-DNS-Prefetch-Control`: Controls DNS prefetching
- `X-Download-Options`: Forces downloads to be saved (Internet Explorer only)
- `X-Frame-Options`: Legacy header that mitigates [Clickjacking](https://en.wikipedia.org/wiki/Clickjacking) attacks
- `X-Permitted-Cross-Domain-Policies`: Controls cross-domain behavior for Adobe products, like Acrobat
- `X-Powered-By`: Info about the web server. Removed because it could be used in simple attacks
- `X-XSS-Protection`: Legacy header that tries to mitigate [XSS attacks](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting), but makes things worse, so Helmet disables it

Each header can be configured or disabled. To read more about it please go to [its documentation website][helmet].

安裝 Helmet 等之類的其他任何模組：

```bash
$ npm install helmet
```

然後在您的程式碼中使用它：

```js
/// ...

const helmet = require('helmet')
app.use(helmet())

/// ...
```

## Reduce fingerprinting

It can help to provide an extra layer of security to reduce the ability of attackers to determine
the software that a server uses, known as "fingerprinting." Though not a security issue itself,
reducing the ability to fingerprint an application improves its overall security posture.
Server software can be fingerprinted by quirks in how it responds to specific requests, for example in
the HTTP response headers.

By default, Express sends the `X-Powered-By` response header that you can
disable using the `app.disable()` method:

```js
app.disable('x-powered-by')
```

{% include admonitions/note.html content="Disabling the `X-Powered-By header` does not prevent
a sophisticated attacker from determining that an app is running Express. It may
discourage a casual exploit, but there are other ways to determine an app is running
Express." %}

Express also sends its own formatted "404 Not Found" messages and formatter error
response messages. These can be changed by
[adding your own not found handler](/en/starter/faq.html#how-do-i-handle-404-responses)
and
[writing your own error handler](/en/guide/error-handling.html#writing-error-handlers):

```js
// last app.use calls right before app.listen():

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

## 安全地使用 Cookie

為了確保 Cookie 不會開啟您的應用程式進行惡意探索，請勿使用預設階段作業 Cookie 名稱，並適當設定 Cookie 安全選項。

以下是兩個主要的中介軟體 Cookie 階段作業模組：

- [express-session](https://www.npmjs.com/package/express-session)，取代了 Express 3.x 內建的 `express.session` 中介軟體。
- [cookie-session](https://www.npmjs.com/package/cookie-session)，取代了 Express 3.x 內建的 `express.cookieSession` 中介軟體。

這兩個模組之間的主要差異是它們儲存 Cookie 階段作業資料的方式。[express-session](https://www.npmjs.com/package/express-session) 中介軟體會將階段作業資料儲存在伺服器上；
它只將階段作業 ID（而非階段作業資料）儲存在 Cookie 本身中。依預設，它使用記憶體內儲存體，且並非設計成用於正式作業環境。在正式作業中，您需要設定可調式階段作業儲存庫；
請參閱[相容的階段作業儲存庫](https://github.com/expressjs/session#compatible-session-stores)清單。 The [express-session](https://www.npmjs.com/package/express-session) middleware stores session data on the server; it only saves the session ID in the cookie itself, not session data. By default, it uses in-memory storage and is not designed for a production environment. In production, you'll need to set up a scalable session-store; see the list of [compatible session stores](https://github.com/expressjs/session#compatible-session-stores).

In contrast, [cookie-session](https://www.npmjs.com/package/cookie-session) middleware implements cookie-backed storage: it serializes the entire session to the cookie, rather than just a session key. Only use it when session data is relatively small and easily encoded as primitive values (rather than objects). Although browsers are supposed to support at least 4096 bytes per cookie, to ensure you don't exceed the limit, don't exceed a size of 4093 bytes per domain. Also, be aware that the cookie data will be visible to the client, so if there is any reason to keep it secure or obscure, then `express-session` may be a better choice.

### 請勿使用預設階段作業 Cookie 名稱

Using the default session cookie name can open your app to attacks. The security issue posed is similar to `X-Powered-By`: a potential attacker can use it to fingerprint the server and target attacks accordingly.

為了避免發生此問題，請使用通用 Cookie 名稱；
例如，使用 [express-session](https://www.npmjs.com/package/express-session) 中介軟體：

```js
const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
})
)
```

### 設定 Cookie 安全選項

設定下列 Cookie 選項來加強安全：

- `secure` - 確保瀏覽器只透過 HTTPS 傳送 Cookie。
- `httpOnly` - 確保只透過 HTTP(S) 傳送 Cookie，而不透過用戶端 JavaScript 傳送，如此有助於防範跨網站 Scripting 攻擊。
- `domain` - indicates the domain of the cookie; use it to compare against the domain of the server in which the URL is being requested. If they match, then check the path attribute next.
- `path` - 指出 Cookie 的路徑；用來與要求路徑相互比較。如果此項與網域相符，則會傳送要求中的 Cookie。 If this and domain match, then send the cookie in the request.
- `expires` - 用來設定持續性 Cookie 的到期日。

下列範例使用 [cookie-session](https://www.npmjs.com/package/cookie-session) 中介軟體：

```js
const session = require('cookie-session')
const express = require('express')
const app = express()

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  }
})
)
```

## Prevent brute-force attacks against authorization

Make sure login endpoints are protected to make private data more secure.

A simple and powerful technique is to block authorization attempts using two metrics:

1. The number of consecutive failed attempts by the same user name and IP address.
2. The number of failed attempts from an IP address over some long period of time. For example, block an IP address if it makes 100 failed attempts in one day.

[rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible) package provides tools to make this technique easy and fast. You can find [an example of brute-force protection in the documentation](https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#login-endpoint-protection)

## Ensure your dependencies are secure

Using npm to manage your application's dependencies is powerful and convenient. But the packages that you use may contain critical security vulnerabilities that could also affect your application. The security of your app is only as strong as the "weakest link" in your dependencies.

Since npm@6, npm automatically reviews every install request. Also, you can use `npm audit` to analyze your dependency tree.

```bash
$ npm audit
```

If you want to stay more secure, consider [Snyk](https://snyk.io/).

Snyk offers both a [command-line tool](https://www.npmjs.com/package/snyk) and a [Github integration](https://snyk.io/docs/github) that checks your application against [Snyk's open source vulnerability database](https://snyk.io/vuln/) for any known vulnerabilities in your dependencies. Install the CLI as follows:

```bash
$ npm install -g snyk
$ cd your-app
```

Use this command to test your application for vulnerabilities:

```bash
$ snyk test
```

### 避免其他已知的漏洞

Keep an eye out for [Node Security Project](https://npmjs.com/advisories) or [Snyk](https://snyk.io/vuln/) advisories that may affect Express or other modules that your app uses. In general, these databases are excellent resources for knowledge and tools about Node security.

Finally, Express apps&mdash;like any other web apps&mdash;can be vulnerable to a variety of web-based attacks. Familiarize yourself with known [web vulnerabilities](https://www.owasp.org/www-project-top-ten/) and take precautions to avoid them.

## 其他注意事項

以下是優異的 [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/) 所提供的進一步建議。如需這些建議的所有詳細資料，請參閱該部落格文章： Refer to that blog post for all the details on these recommendations:

- 一律對使用者輸入進行過濾和消毒，來防範跨網站 Scripting (XSS) 和指令注入攻擊。
- 使用參數化查詢或備妥陳述式，來防禦 SQL 注入攻擊。
- 使用開放程式碼 [sqlmap](http://sqlmap.org/) 工具，來偵測您應用程式中的 SQL 注入漏洞。
- 使用 [nmap](https://nmap.org/) 和 [sslyze](https://github.com/nabla-c0d3/sslyze) 工具，來測試您 SSL 密碼、金鑰和重新協議的配置，以及測試您憑證的有效性。
- 使用 [safe-regex](https://www.npmjs.com/package/safe-regex)，確定您的正規表示式不易受到[正規表示式阻斷服務](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS)攻擊。

[helmet]: <如果您使用 `helmet.js`，自會為您處理此事。>