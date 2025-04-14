---
layout: page
title: 実稼働環境における Express のセキュリティーに関するベスト・プラクティス
description: Discover crucial security best practices for Express apps in production, including using TLS, input validation, secure cookies, and preventing vulnerabilities.
menu: advanced
lang: ja
redirect_from: /advanced/best-practice-security.html
---

# 実稼働環境におけるベスト・プラクティス: セキュリティー

## 概説

The term _"production"_ refers to the stage in the software lifecycle when an application or API is generally available to its end-users or consumers. In contrast, in the _"development"_ stage, you're still actively writing and testing code, and the application is not open to external access. The corresponding system environments are known as _production_ and _development_ environments, respectively.

Development and production environments are usually set up differently and have vastly different requirements. What's fine in development may not be acceptable in production. For example, in a development environment you may want verbose logging of errors for debugging, while the same behavior can become a security concern in a production environment. And in development, you don't need to worry about scalability, reliability, and performance, while those concerns become critical in production.

{% include admonitions/note.html content="If you believe you have discovered a security vulnerability in Express, please see [Security Policies and Procedures](/en/resources/contributing.html#security-policies-and-procedures)."
%}

本番環境でのExpressアプリケーションのセキュリティのベスト・プラクティスは次のとおりです。

- [Production Best Practices: Security](#production-best-practices-security)
  - [Overview](#overview)
  - [Don't use deprecated or vulnerable versions of Express](#dont-use-deprecated-or-vulnerable-versions-of-express)
  - [TLS を使用する](#use-tls)
  - [Do not trust user input](#do-not-trust-user-input)
    - [Prevent open redirects](#prevent-open-redirects)
  - [Helmet を使用する](#use-helmet)
  - [Reduce fingerprinting](#reduce-fingerprinting)
  - [Cookie をセキュアに使用する](#use-cookies-securely)
    - 対照的に、[cookie-session](https://www.npmjs.com/package/cookie-session) ミドルウェアは、Cookie が支持するストレージを実装します。セッション・キーだけでなく、セッション全体を Cookie に対して直列化します。これは、セッション・データが比較的小規模で、(オブジェクトではなく) プリミティブ値として容易にエンコードできる場合にのみ使用してください。ブラウザーは Cookie 当たり最小 4096 バイトをサポートすることが想定されますが、その制限を必ず超えないようにするために、ドメイン当たり 4093 バイトのサイズを超えないようにしてください。また、Cookie データがクライアントに対して可視になることに注意してください。何らかの理由でデータを保護したり覆い隠したりする必要がある場合は、express-session を使用することをお勧めします。
    - デフォルトのセッション Cookie 名を使用すると、アプリケーションが攻撃を受けやすくなります。提起されているセキュリティー問題は `X-Powered-By` と似ています。潜在的なアタッカーがこれを使用して、サーバーに対して指紋認証し、攻撃の標的にする可能性があります。
  - [Prevent brute-force attacks against authorization](#prevent-brute-force-attacks-against-authorization)
  - [依存関係がセキュアであることを確認する](#ensure-your-dependencies-are-secure)
    - [その他の既知の脆弱性を回避する](#avoid-other-known-vulnerabilities)
  - [その他の考慮事項](#additional-considerations)

## 非推奨バージョンや脆弱なバージョンの Express を使用しない

Express 2.x and 3.x are no longer maintained. Security and performance issues in these versions won't be fixed. Do not use them! If you haven't moved to version 4, follow the [migration guide](/{{ page.lang }}/guide/migrating-4.html) or consider [Commercial Support Options](/{{ page.lang }}/support#commercial-support-options).

また、[セキュリティー更新ページ](/{{ page.lang }}/advanced/security-updates.html)にリストされている脆弱な Express バージョンを使用していないことを確認してください。使用している場合は、安定しているリリース (最新を推奨します) に更新してください。 If you are, update to one of the stable releases, preferably the latest.

## TLS を使用する

If your app deals with or transmits sensitive data, use [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) to secure the connection and the data. This technology encrypts data before it is sent from the client to the server, thus preventing some common (and easy) hacks. Although Ajax and POST requests might not be visibly obvious and seem "hidden" in browsers, their network traffic is vulnerable to [packet sniffing](https://en.wikipedia.org/wiki/Packet_analyzer) and [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

You may be familiar with Secure Socket Layer (SSL) encryption. Secure Socket Layer (SSL) 暗号化については理解されていると思います。[TLS は、単に SSL が進化したものです](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515\(v=vs.85\).aspx)。つまり、以前に SSL を使用していた場合は、TLS へのアップグレードを検討してください。一般に、TLS を処理するために Nginx を使用することをお勧めします。Nginx (およびその他のサーバー) で TLS を構成するための解説については、[Recommended Server Configurations (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations) を参照してください。 In other words, if you were using SSL before, consider upgrading to TLS. In general, we recommend Nginx to handle TLS. For a good reference to configure TLS on Nginx (and other servers), see [Recommended Server Configurations (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

また、[Let's Encrypt](https://letsencrypt.org/about/) は、無料の TLS 証明書を取得するための便利なツールです。このツールは、[Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/) が提供する、無料の自動的かつオープンな認証局 (CA) です。

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

## Helmet を使用する

[Helmet](https://www.npmjs.com/package/helmet) は、HTTP ヘッダーを適切に設定することによって、いくつかの既知の Web の脆弱性からアプリケーションを保護します。

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

その他のモジュールと同様に Helmet をインストールします。

```bash
$ npm install helmet
```

次に、コードで使用します。

```js
// ...

const helmet = require('helmet')
app.use(helmet())

// ...
```

## Reduce fingerprinting

It can help to provide an extra layer of security to reduce the ability of attackers to determine
the software that a server uses, known as "fingerprinting." Though not a security issue itself,
reducing the ability to fingerprint an application improves its overall security posture.
Server software can be fingerprinted by quirks in how it responds to specific requests, for example in
the HTTP response headers.

そのため、`app.disable()` メソッドを使用してこのヘッダーをオフにすることがベスト・プラクティスです。

```js
app.disable('x-powered-by')
```

{% include admonitions/note.html content="Disabling the `X-Powered-By header` does not prevent a sophisticated attacker from determining that an app is running Express. It may discourage a casual exploit, but there are other ways to determine an app is running Express. "%}

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

## Cookie をセキュアに使用する

Cookie を介してアプリケーションが悪用されないように、デフォルトの セッション Cookie 名を使用しないでください。また、Cookie のセキュリティー・オプションを適切に設定してください。

主なミドルウェア Cookie セッション・モジュールが 2 つあります。

- [express-session](https://www.npmjs.com/package/express-session) は、Express 3.x に組み込まれていた `express.session` ミドルウェアに取って代わります。
- [cookie-session](https://www.npmjs.com/package/cookie-session) は、Express 3.x に組み込まれていた `express.cookieSession` ミドルウェアに取って代わります。

The main difference between these two modules is how they save cookie session data. これらの 2 つのモジュールの主な違いは、Cookie セッション・データの保存方法です。[express-session](https://www.npmjs.com/package/express-session) ミドルウェアは、セッション・データをサーバーに保管します。セッション・データではなく、Cookie 自体の中にあるセッション ID のみを保存します。デフォルトで、メモリー内のストレージを使用し、実稼働環境向けには設計されていません。実稼働環境では、スケーラブルなセッション・ストアをセットアップする必要があります。[互換性のあるセッション・ストア](https://github.com/expressjs/session#compatible-session-stores)のリストを参照してください。 By default, it uses in-memory storage and is not designed for a production environment. In production, you'll need to set up a scalable session-store; see the list of [compatible session stores](https://github.com/expressjs/session#compatible-session-stores).

In contrast, [cookie-session](https://www.npmjs.com/package/cookie-session) middleware implements cookie-backed storage: it serializes the entire session to the cookie, rather than just a session key. Only use it when session data is relatively small and easily encoded as primitive values (rather than objects). Although browsers are supposed to support at least 4096 bytes per cookie, to ensure you don't exceed the limit, don't exceed a size of 4093 bytes per domain. Also, be aware that the cookie data will be visible to the client, so if there is any reason to keep it secure or obscure, then `express-session` may be a better choice.

### デフォルトのセッション Cookie 名を使用しない

Using the default session cookie name can open your app to attacks. The security issue posed is similar to `X-Powered-By`: a potential attacker can use it to fingerprint the server and target attacks accordingly.

この問題を回避するには、汎用な Cookie 名を使用します。例えば、[express-session](https://www.npmjs.com/package/express-session) ミドルウェアを使用します。

```js
const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))
```

### Cookie のセキュリティー・オプションを設定する

セキュリティーを強化するために、以下の Cookie オプションを設定します。

- `secure` - ブラウザーが確実に HTTPS のみを介して Cookie を送信するようにします。
- `httpOnly` - Cookie がクライアント JavaScript ではなく、HTTP(S) のみを介して送信されるようにして、クロスサイト・スクリプティング攻撃から保護します。
- `domain` - Cookie のドメインを指定します。URL が要求されているサーバーのドメインとの比較に使用します。一致する場合は、次にパス属性を確認します。 If they match, then check the path attribute next.
- `path` - Cookie のパスを指定します。要求パスとの比較に使用します。このパスがドメインと一致する場合は、要求の Cookie を送信します。 If this and domain match, then send the cookie in the request.
- `expires` - 永続的な Cookie の有効期限を設定するために使用します。

次に、[cookie-session](https://www.npmjs.com/package/cookie-session) ミドルウェアの使用例を示します。

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
}))
```

## Prevent brute-force attacks against authorization

Make sure login endpoints are protected to make private data more secure.

A simple and powerful technique is to block authorization attempts using two metrics:

1. The number of consecutive failed attempts by the same user name and IP address.
2. The number of failed attempts from an IP address over some long period of time. For example, block an IP address if it makes 100 failed attempts in one day.

[rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible) package provides tools to make this technique easy and fast. You can find [an example of brute-force protection in the documentation](https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#login-endpoint-protection)

## 依存関係がセキュアであることを確認する

npm を使用したアプリケーションの依存関係の管理は、強力で便利な方法です。ただし、使用するパッケージに、アプリケーションにも影響を与える可能性がある重大なセキュリティーの脆弱性が含まれている可能性があります。アプリケーションのセキュリティーの強さは、依存関係の中で「最も弱いリンク」程度でしかありません。 But the packages that you use may contain critical security vulnerabilities that could also affect your application. The security of your app is only as strong as the "weakest link" in your dependencies.

Since npm@6, npm automatically reviews every install request. npm@6以降、npmはすべてのインストール要求を自動的に確認します。また、'npm audit'を使用して依存関係ツリーを分析することもできます。

```bash
$ npm audit
```

よりセキュアな状態を保ちたい場合は、[Snyk](https://snyk.io/)を検討してください。

Snykは、[Snykのオープンソース脆弱性データベース](https://snyk.io/vuln/)に対して、依存関係の既知の脆弱性に対するアプリケーションをチェックする[コマンドラインツール](https://www.npmjs.com/package/snyk)と[Github integration](https://snyk.io/docs/github)を提供しています。 次のようにCLIをインストールします。 Install the CLI as follows:

```bash
$ npm install -g snyk
$ cd your-app
```

このコマンドを使用して、アプリケーションの脆弱性をテストします。

```bash
$ snyk test
```

### その他の既知の脆弱性を回避する

アプリケーションで使用する Express やその他のモジュールに影響を与える可能性がある [Node Security Project](https://npmjs.com/advisories) のアドバイザリーに常に注意してください。一般に、Node Security Project は、Node のセキュリティーに関する知識とツールの優れたリソースです。 In general, these databases are excellent resources for knowledge and tools about Node security.

最後に、Express アプリケーションは、その他の Web アプリケーションと同様、さまざまな Web ベースの攻撃に対して脆弱になりえます。既知の [Web の脆弱性](https://www.owasp.org/www-project-top-ten/)をよく理解して、それらを回避するための予防措置を取ってください。 Familiarize yourself with known [web vulnerabilities](https://www.owasp.org/www-project-top-ten/) and take precautions to avoid them.

## その他の考慮事項

次に、優れた [Node.js セキュリティー・チェックリスト](https://blog.risingstack.com/node-js-security-checklist/)に記載されているその他の推奨事項をリストします。これらの推奨事項の詳細については、ブログの投稿を参照してください。 Refer to that blog post for all the details on these recommendations:

- クロスサイト・スクリプティング (XSS) とコマンド・インジェクション攻撃から保護するために、必ず、ユーザー入力のフィルタリングとサニタイズを実行してください。
- パラメーター化照会または作成済みステートメントを使用して、SQL インジェクション攻撃に対して防衛してください。
- オープン・ソースの [sqlmap](http://sqlmap.org/) ツールを使用して、アプリケーションの SQL インジェクションに対する脆弱性を検出してください。
- [nmap](https://nmap.org/) ツールと [sslyze](https://github.com/nabla-c0d3/sslyze) ツールを使用して、SSL 暗号、鍵、再交渉の構成のほか、証明書の妥当性をテストしてください。
- [safe-regex](https://www.npmjs.com/package/safe-regex) を使用して、使用している正規表現が[正規表現サービス妨害](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS)攻撃を受けやすくなっていないことを確認してください。

[helmet]: <`helmet.js` を使用する場合は、この操作が自動的に実行されます。>