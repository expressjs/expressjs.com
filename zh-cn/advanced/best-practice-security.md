---
layout: page
title: 生产环境中 Express 的安全最佳实践
description: Discover crucial security best practices for Express apps in production, including using TLS, input validation, secure cookies, and preventing vulnerabilities.
menu: advanced
lang: en
redirect_from: /advanced/best-practice-security.html
---

# 生产环境最佳实践：安全

## 概述

术语\*“生产”_表示软件生命周期中应用程序或 API 可供最终用户或使用者正常使用的阶段。而在_“开发”_阶段中，您仍然积极编写和测试代码，应用程序并未对外部开发访问。对应的系统环境分别被称为_生产_和_开发\*环境。 In contrast, in the _"development"_ stage, you're still actively writing and testing code, and the application is not open to external access. The corresponding system environments are known as _production_ and _development_ environments, respectively.

Development and production environments are usually set up differently and have vastly different requirements. What's fine in development may not be acceptable in production. For example, in a development environment you may want verbose logging of errors for debugging, while the same behavior can become a security concern in a production environment. And in development, you don't need to worry about scalability, reliability, and performance, while those concerns become critical in production.

{% include admonitions/note.html content="If you believe you have discovered a security vulnerability in Express, please see
[Security Policies and Procedures](/en/resources/contributing.html#security-policies-and-procedures).
" %}

本文讨论了部署到生产环境的 Express 应用程序的一些安全最佳实践。

- [Production Best Practices: Security](#production-best-practices-security)
  - [Overview](#overview)
  - [Don't use deprecated or vulnerable versions of Express](#dont-use-deprecated-or-vulnerable-versions-of-express)
  - [hsts](https://github.com/helmetjs/hsts) 用于设置 `Strict-Transport-Security` 头，实施安全的服务器连接 (HTTP over SSL/TLS)。
  - [Do not trust user input](#do-not-trust-user-input)
    - [Prevent open redirects](#prevent-open-redirects)
  - [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) 用于移除 `X-Powered-By` 头。
  - [Reduce fingerprinting](#reduce-fingerprinting)
  - `domain` - 表示 cookie 的域；用于和请求 URL 的服务器的域进行比较。如果匹配，那么接下来检查路径属性。
    - 相反，[cookie-session](https://www.npmjs.com/package/cookie-session) 中间件实现 cookie 支持的存储：它将整个会话序列化到 cookie 中，而不只是会话键。仅当会话数据相对较小，且易于编码为原语值（而不是对象）时，才使用此中间件。尽管假设浏览器支持每个 cookie 至少 4096 字节以确保不会超过限制，但是每个域的大小不会超过 4093 字节。另外请注意，客户机可以访问 cookie 数据，所以，如果有任何理由将其保持安全或隐藏状态，那么 express-session 可能是更好的选择。
    - 使用缺省会话 cookie 名称会使应用程序对攻击敞开大门。`X-Powered-By` 之类的值会造成问题：潜在攻击者可以利用这样的值对服务器采集“指纹”，并相应地确定攻击目标。
  - [Prevent brute-force attacks against authorization](#prevent-brute-force-attacks-against-authorization)
  - [Ensure your dependencies are secure](#ensure-your-dependencies-are-secure)
    - 最后说明一点，和任何其他 Web 应用程序一样，Express 应用程序也容易受到各种基于 Web 的攻击。请熟悉已知的 [Web 漏洞](https://www.owasp.org/www-project-top-ten/)并采取相应的预防措施。
  - [Additional considerations](#additional-considerations)

## 请勿使用不推荐或者存在漏洞的 Express 版本

Express 2.x and 3.x are no longer maintained. Security and performance issues in these versions won't be fixed. Do not use them! If you haven't moved to version 4, follow the [migration guide](/{{ page.lang }}/guide/migrating-4.html) or consider [Commercial Support Options](/{{ page.lang }}/support#commercial-support-options).

Also ensure you are not using any of the vulnerable Express versions listed on the [Security updates page](/{{ page.lang }}/advanced/security-updates.html). If you are, update to one of the stable releases, preferably the latest.

## 使用 TLS

If your app deals with or transmits sensitive data, use [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) to secure the connection and the data. This technology encrypts data before it is sent from the client to the server, thus preventing some common (and easy) hacks. Although Ajax and POST requests might not be visibly obvious and seem "hidden" in browsers, their network traffic is vulnerable to [packet sniffing](https://en.wikipedia.org/wiki/Packet_analyzer) and [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

You may be familiar with Secure Socket Layer (SSL) encryption. [TLS is simply the next progression of SSL](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515\(v=vs.85\).aspx). In other words, if you were using SSL before, consider upgrading to TLS. In general, we recommend Nginx to handle TLS. For a good reference to configure TLS on Nginx (and other servers), see [Recommended Server Configurations (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

此外，可以使用一种方便的 [Let's Encrypt](https://letsencrypt.org/about/) 工具来获取免费的 TLS 证书，这是由[因特网安全研究组 (ISRG)](https://letsencrypt.org/isrg/) 提供的免费、自动化的开放式认证中心 (CA)。

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

[Helmet](https://www.npmjs.com/package/helmet) 通过适当地设置 HTTP 头，帮助您保护应用程序避免一些众所周知的 Web 漏洞。

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

像安装其他模块一样安装 Helmet：

```bash
$ npm install helmet
```

然后将其用于您的代码：

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

如果不希望使用 Helmet，那么至少应禁用 `X-Powered-By` 头。攻击者可能会使用该头（缺省情况下已启用）来检测运行 Express 的应用程序，然后发动针对特定目标的攻击。 It may
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

## 安全地使用 cookie

要确保 cookie 不会打开应用程序使其暴露在风险之中，请勿使用缺省会话 cookie 名称并相应地设置 cookie 安全选项。

有两个主要的中间件 cookie 会话模块：

- [express-session](https://www.npmjs.com/package/express-session)，用于替换 Express 3.x 内置的 `express.session` 中间件。
- [cookie-session](https://www.npmjs.com/package/cookie-session)，用于替换 Express 3.x 内置的 `express.cookieSession` 中间件。

The main difference between these two modules is how they save cookie session data. 这两个模块之间的主要差异是它们保存 cookie 会话数据的方式。[express-session](https://www.npmjs.com/package/express-session) 中间件将会话数据存储在服务器上；它仅将会话标识（而非会话数据）保存在 cookie 中。缺省情况下，它使用内存中存储，并不旨在用于生产环境。在生产环境中，需要设置可扩展的会话存储；请参阅[兼容的会话存储](https://github.com/expressjs/session#compatible-session-stores)列表。 By default, it uses in-memory storage and is not designed for a production environment. In production, you'll need to set up a scalable session-store; see the list of [compatible session stores](https://github.com/expressjs/session#compatible-session-stores).

In contrast, [cookie-session](https://www.npmjs.com/package/cookie-session) middleware implements cookie-backed storage: it serializes the entire session to the cookie, rather than just a session key. Only use it when session data is relatively small and easily encoded as primitive values (rather than objects). Although browsers are supposed to support at least 4096 bytes per cookie, to ensure you don't exceed the limit, don't exceed a size of 4093 bytes per domain. Also, be aware that the cookie data will be visible to the client, so if there is any reason to keep it secure or obscure, then `express-session` may be a better choice.

### 请勿使用缺省会话 cookie 名称

Using the default session cookie name can open your app to attacks. The security issue posed is similar to `X-Powered-By`: a potential attacker can use it to fingerprint the server and target attacks accordingly.

为避免此问题，请使用通用 cookie 名称；例如，使用 [express-session](https://www.npmjs.com/package/express-session) 中间件：

```js
const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
})
)
```

### 设置 cookie 安全性选项

设置以下 cookie 选项来增强安全性：

- `secure` - 确保浏览器只通过 HTTPS 发送 cookie。
- `httpOnly` - 确保 cookie 只通过 HTTP(S)（而不是客户机 JavaScript）发送，这有助于防御跨站点脚本编制攻击。
- `domain` - indicates the domain of the cookie; use it to compare against the domain of the server in which the URL is being requested. If they match, then check the path attribute next.
- `path` - 表示 cookie 的路径；用于和请求路径进行比较。如果路径和域都匹配，那么在请求中发送 cookie。 If this and domain match, then send the cookie in the request.
- `expires` - 用于为持久性 cookie 设置到期日期。

以下是使用 [cookie-session](https://www.npmjs.com/package/cookie-session) 中间件的示例：

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

关注 [Node 安全项目](https://npmjs.com/advisories)公告，这可能会影响 Express 或应用程序使用的其他模块。一般而言，Node 安全项目是有关 Node 安全性的知识和工具的出色资源。 In general, these databases are excellent resources for knowledge and tools about Node security.

Finally, Express apps&mdash;like any other web apps&mdash;can be vulnerable to a variety of web-based attacks. Familiarize yourself with known [web vulnerabilities](https://www.owasp.org/www-project-top-ten/) and take precautions to avoid them.

## 其他注意事项

以下是来自非常出色的 [Node.js 安全核对表](https://blog.risingstack.com/node-js-security-checklist/)的一些进一步建议。请参阅此博客帖子以了解关于这些建议的所有详细信息： Refer to that blog post for all the details on these recommendations:

- 始终过滤和净化用户输入，防御跨站点脚本编制 (XSS) 和命令注入攻击。
- 使用参数化查询或预编译的语句来防御 SQL 注入攻击。
- 使用开源的 [sqlmap](http://sqlmap.org/) 工具来检测应用程序中的 SQL 注入漏洞。
- 使用 [nmap](https://nmap.org/) 和 [sslyze](https://github.com/nabla-c0d3/sslyze) 工具来测试 SSL 密码、密钥和重新协商的配置以及证书的有效性。
- 使用 [safe-regex](https://www.npmjs.com/package/safe-regex) 来确保正则表达式不易受到[正则表达式拒绝服务](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS)攻击。

[helmet]: <如果使用 `helmet.js`，它会为您执行此功能。>