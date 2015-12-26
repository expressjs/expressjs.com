---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Express ミドルウェアの使用
menu: guide
lang: ja
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# ミドルウェアの使用

Express は、それ自体では最小限の機能を備えたルーティングとミドルウェアの Web フレームワークです。Express アプリケーションは基本的に一連のミドルウェア関数呼び出しです。

*ミドルウェア* 関数は、[要求オブジェクト](/{{ page.lang }}/4x/api.html#req) (`req`)、[応答オブジェクト](/{{ page.lang }}/4x/api.html#res) (`res`)、およびアプリケーションの要求応答サイクルにおける次のミドルウェア関数に対するアクセス権限を持つ関数です。次のミドルウェア関数は一般的に、`next` という変数で表されます。

ミドルウェア関数は以下のタスクを実行できます。

* 任意のコードを実行する。
* 要求オブジェクトと応答オブジェクトを変更する。
* 要求応答サイクルを終了する。
* スタック内の次のミドルウェア関数を呼び出す。

現在のミドルウェア関数が要求応答サイクルを終了しない場合は、`next()` を呼び出して、次のミドルウェア関数に制御を渡す必要があります。そうしないと、要求はハングしたままになります。

Express アプリケーションは、以下のタイプのミドルウェアを使用できます。

 - [アプリケーション・レベルのミドルウェア](#middleware.application)
 - [ルーター・レベルのミドルウェア](#middleware.router)
 - [エラー処理ミドルウェア](#middleware.error-handling)
 - [標準装備のミドルウェア](#middleware.built-in)
 - [サード・パーティー・ミドルウェア](#middleware.third-party)

アプリケーション・レベルとルーター・レベルのミドルウェアは、オプションのマウント・パスを指定してロードできます。
また、一連のミドルウェア関数を一緒にロードできます。こうすると、マウント・ポイントにミドルウェア・システムのサブスタックが作成されます。

<h2 id='middleware.application'>アプリケーション・レベルのミドルウェア</h2>

`app.use()` 関数と `app.METHOD()` 関数を使用して、アプリケーション・レベルのミドルウェアを [app object](/{{ page.lang }}/4x/api.html#app) のインスタンスにバインドします。ここで、`METHOD` は、ミドルウェア関数が小文字で処理する要求 (GET、PUT、POST など) の HTTP メソッドです。

次の例は、マウント・パスを指定しないミドルウェア関数を示しています。この関数は、アプリケーションが要求を受け取るたびに実行されます。

<pre>
<code class="language-javascript" translate="no">
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
</code>
</pre>

次の例は、`/user/:id` パスにマウントされたミドルウェア関数を示しています。この関数は、`/user/:id` パスに対するすべてのタイプの HTTP 要求で実行されます。

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

次の例は、ルートとそのハンドラー関数 (ミドルウェア・システム) を示しています。この関数は、`/user/:id` パスへの GET 要求を処理します。

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
</code>
</pre>

次に、マウント・パスを指定して、一連のミドルウェア関数をマウント・ポイントにロードする例を示します。
`/user/:id` パスへのすべてのタイプの HTTP 要求に関する要求情報を出力するミドルウェア・サブスタックを示しています。

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

ルート・ハンドラーを使用すると、パスに複数のルートを定義できます。下記の例では、`/user/:id` パスへの GET 要求に 2 つのルートを定義しています。2 番目のルートは、問題を発生させるものではありませんが、最初のルートが要求応答サイクルを終了するため、呼び出されることはありません。

次の例は、`/user/:id` パスへの GET 要求を処理するミドルウェア・サブスタックを示しています。

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
</code>
</pre>

ルーター・ミドルウェア・スタックの残りのミドルウェア関数をスキップするには、`next('route')` を呼び出して、次のルートに制御を渡します。
**注**: `next('route')` は、`app.METHOD()` 関数または `router.METHOD()` 関数を使用してロードされたミドルウェア関数でのみ機能します。

次の例は、`/user/:id` パスへの GET 要求を処理するミドルウェア・サブスタックを示しています。

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
</code>
</pre>

<h2 id='middleware.router'>ルーター・レベルのミドルウェア</h2>

ルーター・レベルのミドルウェアは、`express.Router()` のインスタンスにバインドされる点を除き、アプリケーション・レベルのミドルウェアと同じように動作します。

<pre>
<code class="language-javascript" translate="no">
var router = express.Router();
</code>
</pre>
`router.use()` 関数と `router.METHOD()` 関数を使用して、ルーター・レベルのミドルウェアをロードします。
次のコード例では、ルーター・レベルのミドルウェアを使用して、上記のアプリケーション・レベルのミドルウェアで示されているミドルウェア・システムを複製します。

<pre>
<code class="language-javascript" translate="no">
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
</code>
</pre>

<h2 id='middleware.error-handling'>エラー処理ミドルウェア</h2>

<div class="doc-box doc-notice" markdown="1">
エラー処理ミドルウェアは常に *4 つ* の引数を使用します。エラー処理ミドルウェア関数として識別されるように 4 つの引数を指定する必要があります。`next` オブジェクトは、使用する必要がない場合でも、シグニチャーを維持するために指定する必要があります。指定しないと、`next` オブジェクトは通常のミドルウェアとして解釈され、エラーを処理できなくなります。
</div>

エラー処理ミドルウェア関数は、その他のミドルウェア関数と同じ方法で定義しますが、例外として、シグニチャーで 3 つではなく 4 つの引数 `(err、req、res、next)`) を明示的に指定します。

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

エラー処理ミドルウェアについて詳しくは、[エラー処理](/{{ page.lang }}/guide/error-handling.html)を参照してください。

<h2 id='middleware.built-in'>標準装備のミドルウェア</h2>

バージョン 4.x 以降、Express は [Connect](https://github.com/senchalabs/connect) に依存しなくなりました。`express.static` を例外として、以前に Express に組み込まれていたすべてのミドルウェア関数は個別のモジュールになりました。[ミドルウェア関数のリスト](https://github.com/senchalabs/connect#middleware)を参照してください。

<h4 id='express.static'>express.static(root, [options])</h4>

Express の唯一の標準装備のミドルウェア関数は `express.static` です。この関数は、[serve-static](https://github.com/expressjs/serve-static) に基づいており、Express アプリケーションの静的資産を提供します。

`root` 引数は、静的資産を提供するルート・ディレクトリーを指定します。

オプションの `options` オブジェクトには以下のプロパティーを指定できます。

| プロパティー      | 説明                                                           |   型      | デフォルト         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | ドットファイルを提供するオプション。指定できる値は「allow」、「deny」、および「ignore」です。 | ストリング | 「ignore」 |
| `etag`        | etag 生成を有効または無効にします。  | ブール値 | `true` |
| `extensions`  | ファイル拡張子のフォールバックを設定します。 | 配列 | `[]` |
| `index`       | ディレクトリー索引ファイルを送信します。ディレクトリー索引作成を無効にするには、`false` を設定します。 | 混合 | 「index.html」 |
 `lastModified` | `Last-Modified` ヘッダーを OS のファイルの最終変更日時に設定します。指定できる値は、`true` または `false` です。 | ブール値 | `true` |
| `maxAge`      | Cache-Control ヘッダーの最大経過時間プロパティーをミリ秒単位または [ms 形式](https://www.npmjs.org/package/ms)のストリングで設定します。 | 数字 | 0 |
| `redirect`    | パス名がディレクトリーである場合に、末尾の「/」にリダイレクトします。 | ブール値 | `true` |
| `setHeaders`  | ファイルで使用する HTTP ヘッダーを設定するための関数。 | 関数 |  |

次に、詳細オプションのオブジェクトを指定した `express.static` ミドルウェア関数の使用例を示します。

<pre>
<code class="language-javascript" translate="no">
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
</code>
</pre>

アプリケーションごとに複数の静的ディレクトリーを使用できます。

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
</code>
</pre>

`serve-static` 関数とそのオプションについて詳しくは、[serve-static](https://github.com/expressjs/serve-static) の資料を参照してください。

<h2 id='middleware.third-party'>サード・パーティー・ミドルウェア</h2>

Express アプリケーションに機能を追加するには、サード・パーティー・ミドルウェアを使用します。

必要な機能を提供する Node.js モジュールをインストールして、アプリケーションにアプリケーション・レベルまたはルーター・レベルでロードします。

次の例は、Cookie 解析ミドルウェア関数 `cookie-parser` のインストールおよびロードを示しています。

<pre>
<code class="language-sh" translate="no">
$ npm install cookie-parser
</code>
</pre>

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
</code>
</pre>

Express で一般的に使用されているサード・パーティー・ミドルウェア関数の一部のリストについては、[サード・パーティー・ミドルウェア](../resources/middleware.html)を参照してください。
