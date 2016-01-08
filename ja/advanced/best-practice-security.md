---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: 実稼働環境における Express のセキュリティーに関するベスト・プラクティス
menu: advanced
lang: ja
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# 実稼働環境におけるベスト・プラクティス: セキュリティー

## 概説

「*実稼働*」という用語は、ソフトウェアのライフサイクルにおいて、アプリケーションや API をエンド・ユーザーまたはコンシューマーが広く使用できる段階を指します。対照的に、「*開発*」段階では、まだコードの作成とテストを積極的に行っていて、アプリケーションへの外部アクセスは不可能です。対応するシステム環境は、それぞれ*実稼働* 環境と*開発* 環境と呼ばれています。

開発環境と実稼働環境は通常、別々にセットアップされ、それぞれの要件は大きく異なっています。開発環境では許可されることが、実稼働環境では許可されないことがあります。例えば、開発環境では、デバッグのためにエラーの詳細なロギングを実行できますが、同じ動作が実稼働環境ではセキュリティー上の問題となります。開発環境では、スケーラビリティー、信頼性、パフォーマンスについて心配する必要はありませんが、それらは実稼働環境では重大な問題となります。

この記事では、実稼働環境にデプロイされた Express アプリケーションのセキュリティーに関するベスト・プラクティスについて説明します。

## 非推奨バージョンや脆弱なバージョンの Express を使用しない

Express 2.x および 3.x は保守されなくなりました。これらのバージョンにおけるセキュリティーとパフォーマンスの問題は修正されません。これらのバージョンを決して使用しないでください。まだバージョン 4 に移行していない場合は、[マイグレーション・ガイド](/{{ page.lang }}/guide/migrating-4.html)に従ってください。

また、[セキュリティー更新ページ](/{{ page.lang }}/advanced/security-updates.html)にリストされている脆弱な Express バージョンを使用していないことを確認してください。使用している場合は、安定しているリリース (最新を推奨します) に更新してください。

## TLS を使用する

アプリケーションが機密データを処理または送信する場合は、[Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) を使用して、接続とデータを保護してください。このテクノロジーは、データをクライアントからサーバーへの送信前に暗号化するため、一般的 (容易) なハッキングを防止します。Ajax と POST 要求は明白ではなく、ブラウザーに対して「非表示」になっているように見えますが、そのネットワーク・トラフィックは、[パケットのスニッフィング](https://en.wikipedia.org/wiki/Packet_analyzer)と[中間者攻撃](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)に対して脆弱です。

Secure Socket Layer (SSL) 暗号化については理解されていると思います。[TLS は、単に SSL が進化したものです](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx)。つまり、以前に SSL を使用していた場合は、TLS へのアップグレードを検討してください。一般に、TLS を処理するために Nginx を使用することをお勧めします。Nginx (およびその他のサーバー) で TLS を構成するための解説については、[Recommended Server Configurations (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations) を参照してください。

また、[Let's Encrypt](https://letsencrypt.org/about/) は、無料の TLS 証明書を取得するための便利なツールです。このツールは、[Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/) が提供する、無料の自動的かつオープンな認証局 (CA) です。

## Helmet を使用する

[Helmet](https://www.npmjs.com/package/helmet) は、HTTP ヘッダーを適切に設定することによって、いくつかの既知の Web の脆弱性からアプリケーションを保護します。

Helmet は、実際には、セキュリティー関連の HTTP ヘッダーを設定する 9 個の小さなミドルウェア関数の単なる集合です。

* [csp](https://github.com/helmetjs/csp) は、クロスサイト・スクリプティング攻撃やその他のクロスサイト・インジェクションを防止するために `Content-Security-Policy` ヘッダーを設定します。
* [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) は、`X-Powered-By` ヘッダーを削除します。
* [hpkp](https://github.com/helmetjs/hpkp) は、偽の証明書による中間者攻撃を防止するために [Public Key Pinning](https://developer.mozilla.org/en-US/docs/Web/Security/Public_Key_Pinning) ヘッダーを追加します。
* [hsts](https://github.com/helmetjs/hsts) は、サーバーへのセキュア (SSL/TLS を介して HTTP) 接続を適用する `Strict-Transport-Security` ヘッダーを設定します。
* [ieNoOpen](https://github.com/helmetjs/ienoopen) は、IE8+ の `X-Download-Options` を設定します。
* [noCache](https://github.com/helmetjs/nocache) は、クライアント側のキャッシュを無効にするために `Cache-Control` ヘッダーと Pragma ヘッダーを設定します。
* [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) は、宣言されているコンテンツの種類からの応答をブラウザーが MIME スニッフィングしないように、`X-Content-Type-Options` を設定します。
* [frameguard](https://github.com/helmetjs/frameguard) は、[クリックジャッキング](https://www.owasp.org/index.php/Clickjacking)保護を有効にするために `X-Frame-Options` ヘッダーを設定します。
* [xssFilter](https://github.com/helmetjs/x-xss-protection) は、最新の Web ブラウザーでクロスサイト・スクリプティング (XSS) フィルターを有効にするために `X-XSS-Protection` を設定します。

その他のモジュールと同様に Helmet をインストールします。

<pre>
<code class="language-sh" translate="no">
$ npm install --save helmet
</code>
</pre>

次に、コードで使用します。

<pre>
<code class="language-javascript" translate="no">
...
var helmet = require('helmet');
app.use(helmet());
...
</code>
</pre>

### 少なくとも X-Powered-By ヘッダーを無効にする

Helmet を使用しない場合は、少なくとも `X-Powered-By` ヘッダーを無効にしてください。アタッカーが、(デフォルトで有効になっている) このヘッダーを使用して、Express を実行しているアプリケーションを検出し、具体的に対象を絞った攻撃を開始する可能性があります。

そのため、`app.disable()` メソッドを使用してこのヘッダーをオフにすることがベスト・プラクティスです。

<pre>
<code class="language-javascript" translate="no">
app.disable('x-powered-by');
</code>
</pre>

`helmet.js` を使用する場合は、この操作が自動的に実行されます。

## Cookie をセキュアに使用する

Cookie を介してアプリケーションが悪用されないように、デフォルトの セッション Cookie 名を使用しないでください。また、Cookie のセキュリティー・オプションを適切に設定してください。

主なミドルウェア Cookie セッション・モジュールが 2 つあります。

* [express-session](https://www.npmjs.com/package/express-session) は、Express 3.x に組み込まれていた `express.session` ミドルウェアに取って代わります。
* [cookie-session](https://www.npmjs.com/package/cookie-session) は、Express 3.x に組み込まれていた `express.cookieSession` ミドルウェアに取って代わります。

これらの 2 つのモジュールの主な違いは、Cookie セッション・データの保存方法です。[express-session](https://www.npmjs.com/package/express-session) ミドルウェアは、セッション・データをサーバーに保管します。セッション・データではなく、Cookie 自体の中にあるセッション ID のみを保存します。デフォルトで、メモリー内のストレージを使用し、実稼働環境向けには設計されていません。実稼働環境では、スケーラブルなセッション・ストアをセットアップする必要があります。[互換性のあるセッション・ストア](https://github.com/expressjs/session#compatible-session-stores)のリストを参照してください。

対照的に、[cookie-session](https://www.npmjs.com/package/cookie-session) ミドルウェアは、Cookie が支持するストレージを実装します。セッション・キーだけでなく、セッション全体を Cookie に対して直列化します。これは、セッション・データが比較的小規模で、(オブジェクトではなく) プリミティブ値として容易にエンコードできる場合にのみ使用してください。ブラウザーは Cookie 当たり最小 4096 バイトをサポートすることが想定されますが、その制限を必ず超えないようにするために、ドメイン当たり 4093 バイトのサイズを超えないようにしてください。また、Cookie データがクライアントに対して可視になることに注意してください。何らかの理由でデータを保護したり覆い隠したりする必要がある場合は、express-session を使用することをお勧めします。

### デフォルトのセッション Cookie 名を使用しない

デフォルトのセッション Cookie 名を使用すると、アプリケーションが攻撃を受けやすくなります。提起されているセキュリティー問題は `X-Powered-By` と似ています。潜在的なアタッカーがこれを使用して、サーバーに対して指紋認証し、攻撃の標的にする可能性があります。

この問題を回避するには、汎用 Cookie 名を使用します。例えば、[express-session](https://www.npmjs.com/package/express-session) ミドルウェアを使用します。

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

### Cookie のセキュリティー・オプションを設定する

セキュリティーを強化するために、以下の Cookie オプションを設定します。

* `secure` - ブラウザーが確実に HTTPS のみを介して Cookie を送信するようにします。
* `httpOnly` - Cookie がクライアント JavaScript ではなく、HTTP(S) のみを介して送信されるようにして、クロスサイト・スクリプティング攻撃から保護します。
* `domain` - Cookie のドメインを指定します。URL が要求されているサーバーのドメインとの比較に使用します。一致する場合は、次にパス属性を確認します。
* `path` - Cookie のパスを指定します。要求パスとの比較に使用します。このパスがドメインと一致する場合は、要求の Cookie を送信します。
* `expires` - 永続的な Cookie の有効期限を設定するために使用します。

次に、[cookie-session](https://www.npmjs.com/package/cookie-session) ミドルウェアの使用例を示します。

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

## 依存関係がセキュアであることを確認する

npm を使用したアプリケーションの依存関係の管理は、強力で便利な方法です。ただし、使用するパッケージに、アプリケーションにも影響を与える可能性がある重大なセキュリティーの脆弱性が含まれている可能性があります。アプリケーションのセキュリティーの強さは、依存関係の中で「最も弱いリンク」程度でしかありません。

[nsp](https://www.npmjs.com/package/nsp) と [requireSafe](https://requiresafe.com/) という 2 つのツールの一方または両方を使用して、使用するサード・パーティー・パッケージのセキュリティーを確保します。これらの 2 つのツールが実行する処理は大体同じです。

[nsp](https://www.npmjs.com/package/nsp) は、[Node Security Project](https://nodesecurity.io/) の脆弱性データベースを確認して、アプリケーションが既知の脆弱性を持つパッケージを使用しているかどうかを判別するコマンド・ライン・ツールです。次のようにしてインストールします。

<pre>
<code class="language-sh" translate="no">
$ npm i nsp -g
</code>
</pre>

このコマンドを使用して、`npm-shrinkwrap.json` ファイルを検証のために [nodesecurity.io](https://nodesecurity.io/) に送信します。

<pre>
<code class="language-sh" translate="no">
$ nsp audit-shrinkwrap
</code>
</pre>

このコマンドを使用して、`package.json` ファイルを検証のために [nodesecurity.io](https://nodesecurity.io/) に送信します。

<pre>
<code class="language-sh" translate="no">
$ nsp audit-package
</code>
</pre>

次に、Node モジュールを監査するための [requireSafe](https://requiresafe.com/) の使用例を示します。

<pre>
<code class="language-sh" translate="no">
$ npm install -g requiresafe
$ cd your-app
$ requiresafe check
</code>
</pre>

## その他の考慮事項

次に、優れた [Node.js セキュリティー・チェックリスト](https://blog.risingstack.com/node-js-security-checklist/)に記載されているその他の推奨事項をリストします。これらの推奨事項の詳細については、ブログ投稿を参照してください。

* 認証に対する総当たり攻撃を防止するために、回数制限を実装してください。そのための 1 つの方法では、[StrongLoop API Gateway](https://strongloop.com/node-js/api-gateway/) を使用して回数制限ポリシーを適用します。あるいは、[express-limiter](https://www.npmjs.com/package/express-limiter) などのミドルウェアを使用できますが、そのためにはコードを若干変更する必要があります。
* クロスサイト・リクエスト・フォージェリー (CSRF) から保護するために、[csurf](https://www.npmjs.com/package/csurf) ミドルウェアを使用してください。
* クロスサイト・スクリプティング (XSS) とコマンド・インジェクション攻撃から保護するために、必ず、ユーザー入力のフィルタリングとサニタイズを実行してください。
* パラメーター化照会または作成済みステートメントを使用して、SQL インジェクション攻撃に対して防衛してください。
* オープン・ソースの [sqlmap](http://sqlmap.org/) ツールを使用して、アプリケーションの SQL インジェクションに対する脆弱性を検出してください。
* [nmap](https://nmap.org/) ツールと [sslyze](https://github.com/nabla-c0d3/sslyze) ツールを使用して、SSL 暗号、鍵、再交渉の構成のほか、証明書の妥当性をテストしてください。
* [safe-regex](https://www.npmjs.com/package/safe-regex) を使用して、使用している正規表現が[正規表現サービス妨害](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS)攻撃を受けやすくなっていないことを確認してください。

## その他の既知の脆弱性を回避する

アプリケーションで使用する Express やその他のモジュールに影響を与える可能性がある [Node Security Project](https://nodesecurity.io/advisories) のアドバイザリーに常に注意してください。一般に、Node Security Project は、Node のセキュリティーに関する知識とツールの優れたリソースです。

最後に、Express アプリケーションは、その他の Web アプリケーションと同様、さまざまな Web ベースの攻撃に対して脆弱になりえます。既知の [Web の脆弱性](https://www.owasp.org/index.php/Top_10_2013-Top_10)をよく理解して、それらを回避するための予防措置を取ってください。
