---
layout: page
title: Express 4 への移行
menu: guide
lang: ja
---

# Express 4 への移行

<h2 id="overview">概説</h2>

Express 4 では、Express 3 とは互換性の _ない_ 変更が行われています。つまり、依存関係にある Express のバージョンを更新すると、既存の Express 3 アプリケーションは機能しません。

この記事では以下の内容を扱います。

<ul class="doclist">
  <li><a href="#changes">Express 4 における変更点</a></li>
  <li>Express 3 アプリケーションを Express 4 に移行する<a href="#example-migration">例</a></li>
  <li><a href="#app-gen">Express 4 アプリケーション・ジェネレーターへのアップグレード</a></li>
</ul>

<h2 id="changes">Express 4 における変更点</h2>

Express 4 では、いくつかの大きな変更が行われています。

<ul class="doclist">
  <li><a href="#core-changes">Express コアおよびミドルウェア・システムの変更。</a>Connect と標準装備ミドルウェアに対する依存関係が削除されたため、ユーザーが自分でミドルウェアを追加する必要があります。</li>
  <li><a href="#routing">ルーティング・システムの変更。</a></li>
  <li><a href="#other-changes">その他の各種変更。</a></li>
</ul>

以下も参照してください。

* [4.x の新機能](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [3.x から 4.x への移行](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Express コアおよびミドルウェア・システムの変更
</h3>

Express 4 は、Connect に依存しなくなり、`express.static` 関数を除くすべての標準装備ミドルウェアをコアから削除しました。つまり、Express は独立したルーティングおよびミドルウェアの Web フレームワークになり、Express のバージョン管理とリリースはミドルウェア更新の影響を受けません。

標準装備ミドルウェアがないため、アプリケーションの実行に必要なすべてのミドルウェアを明示的に追加する必要があります。そのためには、単に以下のステップを実行してください。

1. モジュールをインストールします。`npm install --save <module-name>`
2. アプリケーションでモジュールを要求します。`require('module-name')`
3. モジュールの資料に従ってモジュールを使用します。`app.use( ... )`

次の表に、Express 3 のミドルウェアと、それぞれに対応する Express 4 のミドルウェアをリストします。

<table class="doctable" border="1">
<tr><th>Express 3</th><th>Express 4</th></tr>
<tr><td><code>express.bodyParser</code></td>
<td><a href="https://github.com/expressjs/body-parser">body-parser</a> +
<a href="https://github.com/expressjs/multer">multer</a></td></tr>
<tr><td><code>express.compress</code></td>
<td><a href="https://github.com/expressjs/compression">compression</a></td></tr>
<tr><td><code>express.cookieSession</code></td>
<td><a href="https://github.com/expressjs/cookie-session">cookie-session</a></td></tr>
<tr><td><code>express.cookieParser</code></td>
<td><a href="https://github.com/expressjs/cookie-parser">cookie-parser</a></td></tr>
<tr><td><code>express.logger</code></td>
<td><a href="https://github.com/expressjs/morgan">morgan</a></td></tr>
<tr><td><code>express.session</code></td>
<td><a href="https://github.com/expressjs/session">express-session</a></td></tr>
<tr><td><code>express.favicon</code></td>
<td><a href="https://github.com/expressjs/serve-favicon">serve-favicon</a></td></tr>
<tr><td><code>express.responseTime</code></td>
<td><a href="https://github.com/expressjs/response-time">response-time</a></td></tr>
<tr><td><code>express.errorHandler</code></td>
<td><a href="https://github.com/expressjs/errorhandler">errorhandler</a></td></tr>
<tr><td><code>express.methodOverride</code></td>
<td><a href="https://github.com/expressjs/method-override">method-override</a></td></tr>
<tr><td><code>express.timeout</code></td>
<td><a href="https://github.com/expressjs/timeout">connect-timeout</a></td></tr>
<tr><td><code>express.vhost</code></td>
<td><a href="https://github.com/expressjs/vhost">vhost</a></td></tr>
<tr><td><code>express.csrf</code></td>
<td><a href="https://github.com/expressjs/csurf">csurf</a></td></tr>
<tr><td><code>express.directory</code></td>
<td><a href="https://github.com/expressjs/serve-index">serve-index</a></td></tr>
<tr><td><code>express.static</code></td>
<td><a href="https://github.com/expressjs/serve-static">serve-static</a></td></tr>
</table>

Express 4 のミドルウェアの完全なリストは、[ここ](https://github.com/senchalabs/connect#middleware)を参照してください。

ほとんどの場合、旧バージョン 3 のミドルウェアを単に Express 4 のミドルウェアに置き換えるだけですみます。詳細については、GitHub でモジュールの資料を参照してください。

<h4 id="app-use"><code>app.use</code> がパラメーターを受け入れます</h4>

バージョン 4 では、変数パラメーターを使用して、ミドルウェア関数がロードされるパスを定義し、ルート・ハンドラーからパラメーターの値を読み取ることができます。
次に例を示します。

```js
app.use('/book/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
})
```
<h3 id="routing">
ルーティング・システム
</h3>

アプリケーションがルーティング・ミドルウェアを暗黙的にロードするようになったため、`router` ミドルウェアに関してミドルウェアがロードされる順序を考慮する必要がなくなりました。

ルートの定義方法は変わりませんが、ルーティング・システムには、ルートの編成に役立つ 2 つの新機能があります。

{: .doclist }
* 新しいメソッド `app.route()` は、ルート・パスのチェーン可能なルート・ハンドラーを作成します。
* 新しいクラス `express.Router` は、モジュール式のマウント可能なルート・ハンドラーを作成します。

<h4 id="app-route"><code>app.route()</code> メソッド</h4>

新しい `app.route()` メソッドを使用すると、ルート・パスのチェーン可能なルート・ハンドラーを作成できます。パスは単一の場所で指定されるため、モジュール式のルートを作成すると、便利であるほか、冗長性とタイプミスを減らすことができます。ルートについて詳しくは、[`Router()` 資料](/{{ page.lang }}/4x/api.html#router)を参照してください。

次に、`app.route()` 関数を使用して定義された、チェーニングされたルート・ハンドラーの例を示します。

```js
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })
```

<h4 id="express-router"><code>express.Router</code> クラス</h4>

ルートの編成に役立つもう 1 つの機能は、新しいクラス `express.Router` です。これを使用すると、モジュール式のマウント可能なルート・ハンドラーを作成できます。`Router` インスタンスは、完全なミドルウェアおよびルーティング・システムです。そのため、よく「ミニアプリケーション」と呼ばれます。

次の例では、ルーターをモジュールとして作成し、その中にミドルウェアをロードして、いくつかのルートを定義し、それをメインアプリケーションのパスにマウントします。

例えば、アプリケーション・ディレクトリーに次の内容で `birds.js` というルーター・ファイルを作成します。

```js
var express = require('express')
var router = express.Router()

// middleware specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
```

次に、ルーター・モジュールをアプリケーションにロードします。

```js
var birds = require('./birds')

// ...

app.use('/birds', birds)
```

これで、アプリケーションは、`/birds` および `/birds/about` のパスに対する要求を処理できるようになり、ルートに固有の `timeLog` ミドルウェアを呼び出します。

<h3 id="other-changes">
その他の変更点
</h3>

次の表に、Express 4 におけるその他の小規模ながらも重要な変更点をリストします。

<table class="doctable" border="1">
<tr>
<th>オブジェクト</th>
<th>説明</th>
</tr>
<tr>
<td>Node.js</td>
<td>Express 4 には、Node.js 0.10.x 以降が必要です。Node.js 0.8.x に対するサポートは除去されました。</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
`http` モジュールは、このモジュールを直接処理する必要がある場合を除き、不要になりました (socket.io/SPDY/HTTPS)。アプリケーションは、`app.listen()` 関数を使用して開始できます。
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
`app.configure()` 関数は削除されました。環境を検出して、アプリケーションを適宜に構成するには、`process.env.NODE_ENV` 関数または `app.get('env')` 関数を使用してください。
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
`json spaces` アプリケーション・プロパティーは、Express 4 ではデフォルトで無効になっています。
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
`req.accepts()`、`req.acceptsEncodings()`、`req.acceptsCharsets()`、および `req.acceptsLanguages()` を使用してください。
</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
相対 URL を解決しなくなりました。
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
以前は配列でしたが、現在ではオブジェクトになりました。
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
以前は関数でしたが、現在ではオブジェクトになりました。
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
`res.headersSent` に変更されました。
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
今後は `app.mountpath` として使用できます。
</td>
</tr>
<tr>
<td markdown="1">
`res.on('header')`
</td>
<td markdown="1">
削除されました。
</td>
</tr>
<tr>
<td markdown="1">
`res.charset`
</td>
<td markdown="1">
削除されました。
</td>
</tr>
<tr>
<td markdown="1">
`res.setHeader('Set-Cookie', val)`
</td>
<td markdown="1">
機能が基本的な Cookie 値の設定に限定されるようになりました。機能を追加するには、`res.cookie()` を使用してください。
</td>
</tr>
</table>

<h2 id="example-migration">移行の例</h2>

次に、Express 3 アプリケーションを Express 4 に移行する例を示します。
使用しているファイルは、`app.js` および `package.json` です。

<h3 id="">
バージョン 3 アプリケーション
</h3>

<h4 id=""><code>app.js</code></h4>

次の `app.js` ファイルを使用する Express v.3 アプリケーションがあるとします。

```js
var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var http = require('http')
var path = require('path')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.methodOverride())
app.use(express.session({ secret: 'your secret here' }))
app.use(express.bodyParser())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/users', user.list)

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})
```

<h4 id=""><code>package.json</code></h4>

付随するバージョン 3 の `package.json` ファイルの内容は次のようになります。

```json
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.12.0",
    "pug": "*"
  }
}
```

<h3 id="">
プロセス
</h3>

移行プロセスを開始するには、次のコマンドを使用して、Express 4 アプリケーションに必要なミドルウェアをインストールし、Express と Pug をそれぞれの最新バージョンに更新します。

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

`app.js` に以下の変更を加えます。

1. 標準装備の Express ミドルウェア関数 `express.favicon`、`express.logger`、`express.methodOverride`、`express.session`、`express.bodyParser`、および `express.errorHandler` は `express` オブジェクトで使用できなくなりました。代わりの関数を手動でインストールして、アプリケーションにロードする必要があります。

2. `app.router` 関数をロードする必要がなくなりました。この関数は有効な Express 4 アプリケーション・オブジェクトではないため、`app.use(app.router);` コードを削除してください。

3. ミドルウェア関数が正しい順序でロードされていることを確認してください。つまり、アプリケーション・ルートをロードした後で `errorHandler` をロードしてください。

<h3 id="">バージョン 4 アプリケーション</h3>

<h4 id=""><code>package.json</code></h4>

上記の `npm` コマンドを実行すると、`package.json` が次のように更新されます。

```json
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "body-parser": "^1.5.2",
    "errorhandler": "^1.1.1",
    "express": "^4.8.0",
    "express-session": "^1.7.2",
    "pug": "^2.0.0",
    "method-override": "^2.1.2",
    "morgan": "^1.2.2",
    "multer": "^0.1.3",
    "serve-favicon": "^2.0.1"
  }
}
```

<h4 id=""><code>app.js</code></h4>

次に、無効なコードを削除して、必要なミドルウェアをロードし、必要に応じてその他の変更を行います。`app.js` ファイルの内容は次のようになります。

```js
var http = require('http')
var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var path = require('path')

var favicon = require('serve-favicon')
var logger = require('morgan')
var methodOverride = require('method-override')
var session = require('express-session')
var bodyParser = require('body-parser')
var multer = require('multer')
var errorHandler = require('errorhandler')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))
app.use(logger('dev'))
app.use(methodOverride())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', routes.index)
app.get('/users', user.list)

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

var server = http.createServer(app)
server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})
```

<div class="doc-box doc-info" markdown="1">

`http` モジュール (socket.io/SPDY/HTTPS) を直接処理する必要がある場合を除き、このモジュールをロードする必要はありません。次のようにして、アプリケーションを簡単に開始できます。

```js
app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})
```

<h3 id="">アプリケーションの実行</h3>

これで移行プロセスは完了して、アプリケーションは Express 4 アプリケーションになりました。確認するには、次のコマンドを使用してアプリケーションを開始します。

```console
$ node .
```

[http://localhost:3000](http://localhost:3000) をロードして、Express 4 によってレンダリングされるホーム・ページを確認します。

<h2 id="app-gen">Express 4 アプリケーション・ジェネレーターへのアップグレード</h2>

Express アプリケーションを生成するためのコマンド・ライン・ツールは引き続き `express` ですが、新規バージョンにアップグレードするには、Express 3 アプリケーション・ジェネレーターをアンインストールしてから、新しい `express-generator` をインストールする必要があります。

<h3 id="">インストール</h3>

システムに Express 3 アプリケーション・ジェネレーターがインストールされている場合は、次のようにしてアンインストールする必要があります。

```console
$ npm uninstall -g express
```

ファイルおよびディレクトリーの特権が構成されている方法によっては、このコマンドを `sudo` で実行することが必要になる場合があります。

次に、新しいジェネレーターをインストールします。

```console
$ npm install -g express-generator
```

ファイルおよびディレクトリーの特権が構成されている方法によっては、このコマンドを `sudo` で実行することが必要になる場合があります。

これで、システム上の `express` コマンドは Express 4 ジェネレーターに更新されました。

<h3 id="">アプリケーション・ジェネレーターの変更</h3>

コマンドのオプションと使用法の大部分は以前と同じですが、以下の例外があります。

{: .doclist }
* `--sessions` オプションを削除しました。
* `--jshtml` オプションを削除しました。
* [Hogan.js](http://twitter.github.io/hogan.js/) をサポートするために `--hogan` オプションを追加しました。

<h3 id="">例</h3>

次のコマンドを実行して、Express 4 アプリケーションを作成します。

```console
$ express app4
```

`app4/app.js` ファイルの内容を見ると、アプリケーションに必要な (`express.static` を除く) すべてのミドルウェア関数が独立したモジュールとしてロードされており、`router` ミドルウェアがアプリケーションに明示的にロードされなくなったことが分かります。

また、`app.js` ファイルが Node.js モジュールになったことも分かります。対照的に以前はジェネレーターによって生成されるスタンドアロン・モジュールでした。

依存関係をインストールした後、次のコマンドを使用してアプリケーションを開始します。

```console
$ npm start
```

`package.json` ファイルで npm start スクリプトを見ると、アプリケーションを開始する実際のコマンドは `node ./bin/www` であることが分かります。これは、Express 3 では `node app.js` でした。

Express 4 ジェネレーターによって生成される `app.js` ファイルが Node.js モジュールになったため、(コードを変更しない限り) アプリケーションとして単独では開始できなくなりました。モジュールを Node.js ファイルにロードして、Node.js ファイルから開始する必要があります。この場合、Node.js ファイルは `./bin/www` です。

Express アプリケーションの作成またはアプリケーションの開始のために、`bin` ディレクトリーも、拡張子のない `www` ファイルも必須ではありません。これらは単にジェネレーターが推奨するものであるため、ニーズに合わせて自由に変更してください。

`www` ディレクトリーを削除して、処理を「Express 3 の方法」で実行するには、`app.js` ファイルの最後にある `module.exports = app;` という行を削除して、その場所に以下のコードを貼り付けます。

```js
app.set('port', process.env.PORT || 3000)

var server = app.listen(app.get('port'), () => {
  debug('Express server listening on port ' + server.address().port)
})
```

次のコードを使用して `debug` モジュールを `app.js` ファイルの先頭にロードしたことを確認します。

```js
var debug = require('debug')('app4')
```

次に、`package.json` ファイル内の `"start": "node ./bin/www"` を `"start": "node app.js"` に変更します。

これで、`./bin/www` の機能を `app.js` に戻しました。この変更は推奨されるものではありませんが、この演習により、`./bin/www` ファイルの仕組みと、`app.js` ファイルが単独で開始されなくなった理由を理解できます。
