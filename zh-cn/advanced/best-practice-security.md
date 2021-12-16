---
layout: page
title: 生产环境中 Express 的安全最佳实践
menu: advanced
lang: zh-cn
---

# 生产环境最佳实践：安全

## 概述

术语*“生产”*表示软件生命周期中应用程序或 API 可供最终用户或使用者正常使用的阶段。而在*“开发”*阶段中，您仍然积极编写和测试代码，应用程序并未对外部开发访问。对应的系统环境分别被称为*生产*和*开发*环境。

开发和生产环境的设置通常不同，需求也天差地别。在开发环境中没问题的做法在生产环境中可能就无法接受。例如，在开发环境中，可能需要对错误进行详细日志记录以便进行调试，而同一行为在生产环境中可能会成为安全问题。在开发环境中，无需担心可扩展性、可靠性和性能，而这些方面在生产环境中就是关键问题。

本文讨论了部署到生产环境的 Express 应用程序的一些安全最佳实践。

## 请勿使用不推荐或者存在漏洞的 Express 版本

Express 2.x 和 3.x 不再得到维护。不会纠正这些版本中的安全问题和性能问题。请勿使用这些版本！如果您尚未迁移到 V4，请按照[迁移指南](/{{ page.lang }}/guide/migrating-4.html)进行迁移。

还请确保您未使用[安全性更新页面](/{{ page.lang }}/advanced/security-updates.html)中列出的任何存在漏洞的 Express 版本。如果在使用，请更新到某个稳定发行版，首选为最新版本。

## 使用 TLS

如果应用程序处理或传输敏感数据，请使用[传输层安全性](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) 来保护连接和数据。这种技术用于加密数据，然后将其从客户机发送到服务器，以防止某些常见的（而且容易的）黑客攻击。虽然 Ajax 和 POST 请求可能不是很明显，似乎“隐藏”在浏览器中，但是其网络流量很容易受到[包嗅探](https://en.wikipedia.org/wiki/Packet_analyzer)攻击和[中间人攻击](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)。

您可能很熟悉安全套接字层 (SSL) 加密。[TLS 就是下一代的 SSL](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx) 。换言之，如果您以前使用 SSL，请考虑升级到 TLS。一般而言，我们建议使用 Nginx 来处理 TLS。要获取在 Nginx（和其他服务器）上配置 TLS 的优秀参考信息，请参阅 [Recommended Server Configurations](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations) (Mozilla Wiki)。

此外，可以使用一种方便的 [Let's Encrypt](https://letsencrypt.org/about/) 工具来获取免费的 TLS 证书，这是由[因特网安全研究组 (ISRG)](https://letsencrypt.org/isrg/) 提供的免费、自动化的开放式认证中心 (CA)。

## 使用 Helmet

[Helmet](https://www.npmjs.com/package/helmet) 通过适当地设置 HTTP 头，帮助您保护应用程序避免一些众所周知的 Web 漏洞。

Helmet 实际上只使用以下九个较小中间件函数的集合，这些功能用于设置与安全相关的 HTTP 头：

* [csp](https://github.com/helmetjs/csp) 用于设置 `Content-Security-Policy` 头，帮助抵御跨站点脚本编制攻击和其他跨站点注入攻击。
* [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) 用于移除 `X-Powered-By` 头。
* [hsts](https://github.com/helmetjs/hsts) 用于设置 `Strict-Transport-Security` 头，实施安全的服务器连接 (HTTP over SSL/TLS)。
* [ieNoOpen](https://github.com/helmetjs/ienoopen) 用于为 IE8+ 设置 `X-Download-Options`。
* [noCache](https://github.com/helmetjs/nocache) 用于设置 `Cache-Control` 和 Pragma 头，以禁用客户端高速缓存。
* [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) 用于设置 `X-Content-Type-Options`，以防止攻击者以 MIME 方式嗅探浏览器发出的响应中声明的 content-type。
* [frameguard](https://github.com/helmetjs/frameguard) 用于设置 `X-Frame-Options` 头，提供 [clickjacking](https://www.owasp.org/index.php/Clickjacking) 保护。
* [xssFilter](https://github.com/helmetjs/x-xss-protection) 用于设置 `X-XSS-Protection`，在最新的 Web 浏览器中启用跨站点脚本编制 (XSS) 过滤器。

像安装其他模块一样安装 Helmet：

```console
$ npm install --save helmet
```

然后将其用于您的代码：

<pre>
<code class="language-javascript" translate="no">
...
var helmet = require('helmet');
app.use(helmet());
...
</code>
</pre>

### 至少禁用 X-Powered-By 头

如果不希望使用 Helmet，那么至少应禁用 `X-Powered-By` 头。攻击者可能会使用该头（缺省情况下已启用）来检测运行 Express 的应用程序，然后发动针对特定目标的攻击。

所以，最佳实践是使用 `app.disable()` 方法禁用此头：

<pre>
<code class="language-javascript" translate="no">
app.disable('x-powered-by');
</code>
</pre>

如果使用 `helmet.js`，它会为您执行此功能。

## 安全地使用 cookie

要确保 cookie 不会打开应用程序使其暴露在风险之中，请勿使用缺省会话 cookie 名称并相应地设置 cookie 安全选项。

有两个主要的中间件 cookie 会话模块：

* [express-session](https://www.npmjs.com/package/express-session)，用于替换 Express 3.x 内置的 `express.session` 中间件。
* [cookie-session](https://www.npmjs.com/package/cookie-session)，用于替换 Express 3.x 内置的 `express.cookieSession` 中间件。

这两个模块之间的主要差异是它们保存 cookie 会话数据的方式。[express-session](https://www.npmjs.com/package/express-session) 中间件将会话数据存储在服务器上；它仅将会话标识（而非会话数据）保存在 cookie 中。缺省情况下，它使用内存中存储，并不旨在用于生产环境。在生产环境中，需要设置可扩展的会话存储；请参阅[兼容的会话存储](https://github.com/expressjs/session#compatible-session-stores)列表。

相反，[cookie-session](https://www.npmjs.com/package/cookie-session) 中间件实现 cookie 支持的存储：它将整个会话序列化到 cookie 中，而不只是会话键。仅当会话数据相对较小，且易于编码为原语值（而不是对象）时，才使用此中间件。尽管假设浏览器支持每个 cookie 至少 4096 字节以确保不会超过限制，但是每个域的大小不会超过 4093 字节。另外请注意，客户机可以访问 cookie 数据，所以，如果有任何理由将其保持安全或隐藏状态，那么 express-session 可能是更好的选择。

### 请勿使用缺省会话 cookie 名称

使用缺省会话 cookie 名称会使应用程序对攻击敞开大门。`X-Powered-By` 之类的值会造成问题：潜在攻击者可以利用这样的值对服务器采集“指纹”，并相应地确定攻击目标。

为避免此问题，请使用通用 cookie 名称；例如，使用 [express-session](https://www.npmjs.com/package/express-session) 中间件：

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

### 设置 cookie 安全性选项

设置以下 cookie 选项来增强安全性：

* `secure` - 确保浏览器只通过 HTTPS 发送 cookie。
* `httpOnly` - 确保 cookie 只通过 HTTP(S)（而不是客户机 JavaScript）发送，这有助于防御跨站点脚本编制攻击。
* `domain` - 表示 cookie 的域；用于和请求 URL 的服务器的域进行比较。如果匹配，那么接下来检查路径属性。
* `path` - 表示 cookie 的路径；用于和请求路径进行比较。如果路径和域都匹配，那么在请求中发送 cookie。
* `expires` - 用于为持久性 cookie 设置到期日期。

以下是使用 [cookie-session](https://www.npmjs.com/package/cookie-session) 中间件的示例：

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

## 其他注意事项

以下是来自非常出色的 [Node.js 安全核对表](https://blog.risingstack.com/node-js-security-checklist/)的一些进一步建议。请参阅此博客帖子以了解关于这些建议的所有详细信息：

* 实施速率限制，防止针对认证的暴力攻击。实现这一点的一种方式是使用 [StrongLoop API ](https://strongloop.com/node-js/api-gateway/)来强制实施速率限制策略。或者，可以使用诸如 [express-limiter](https://www.npmjs.com/package/express-limiter) 的中间件，但是这样做需要对代码作些修改。
* 使用 [csurf](https://www.npmjs.com/package/csurf) 中间件来防御跨站点请求伪造 (CSRF)。
* 始终过滤和净化用户输入，防御跨站点脚本编制 (XSS) 和命令注入攻击。
* 使用参数化查询或预编译的语句来防御 SQL 注入攻击。
* 使用开源的 [sqlmap](http://sqlmap.org/) 工具来检测应用程序中的 SQL 注入漏洞。
* 使用 [nmap](https://nmap.org/) 和 [sslyze](https://github.com/nabla-c0d3/sslyze) 工具来测试 SSL 密码、密钥和重新协商的配置以及证书的有效性。
* 使用 [safe-regex](https://www.npmjs.com/package/safe-regex) 来确保正则表达式不易受到[正则表达式拒绝服务](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS)攻击。

## 避免其他已知的漏洞

关注 [Node 安全项目](https://npmjs.com/advisories)公告，这可能会影响 Express 或应用程序使用的其他模块。一般而言，Node 安全项目是有关 Node 安全性的知识和工具的出色资源。

最后说明一点，和任何其他 Web 应用程序一样，Express 应用程序也容易受到各种基于 Web 的攻击。请熟悉已知的 [Web 漏洞](https://www.owasp.org/index.php/Top_10_2013-Top_10)并采取相应的预防措施。
