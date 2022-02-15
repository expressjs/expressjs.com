---
layout: page
title: 実稼働環境における Express の使用におけるパフォーマンスに関するベスト・プラクティス
menu: advanced
lang: ja
---

# 実稼働環境におけるベスト・プラクティス: パフォーマンスと信頼性

## 概説

この記事では、実稼働環境にデプロイされた Express アプリケーションのパフォーマンスと信頼性に関するベスト・プラクティスについて説明します。

このトピックは、従来型の開発と運用の両方にわたる「DevOps」の世界に明確に分類されます。したがって、情報は次の 2 つの部分に分かれています。

* コードで実行する処理 (開発部分)
  * [gzip 圧縮を使用する](#use-gzip-compression)
  * [同期関数を使用しない](#dont-use-synchronous-functions)
  * [ロギングを正確に実行する](#do-logging-correctly)
  * [例外を適切に処理する](#handle-exceptions-properly)
* 環境/セットアップで実行する処理 (運用部分)
  * [Set NODE_ENV to "production"](#set-node_env-to-production)
  * [Ensure your app automatically restarts](#ensure-your-app-automatically-restarts)
  * [Run your app in a cluster](#run-your-app-in-a-cluster)
  * [Cache request results](#cache-request-results)
  * [Use a load balancer](#use-a-load-balancer)
  * [Use a reverse proxy](#use-a-reverse-proxy)

## コードで実行する処理 {#in-code}

以下に、アプリケーションのパフォーマンスを向上させるためにコードで実行できる処理をいくつか挙げます。

* [gzip 圧縮を使用する](#use-gzip-compression)
* [同期関数を使用しない](#dont-use-synchronous-functions)
* [ロギングを正確に実行する](#do-logging-correctly)
* [例外を適切に処理する](#handle-exceptions-properly)

### gzip 圧縮を使用する

Gzip 圧縮により、応答本体のサイズを大幅に縮小できるため、Web アプリケーションの速度が高くなります。Express アプリケーションで gzip 圧縮として [compression](https://www.npmjs.com/package/compression) ミドルウェアを使用してください。次に例を示します。

```js
const compression = require('compression')
const express = require('express')
const app = express()
app.use(compression())
```

トラフィックが多い実稼働環境の Web サイトでは、圧縮を適用する最適な方法は、リバース・プロキシー・レベルで実装することです ([リバース・プロキシーの使用](#proxy)を参照)。その場合は、compression ミドルウェアを使用する必要はありません。Nginx で gzip 圧縮を有効にする方法について詳しくは、Nginx 資料の [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html) を参照してください。

### 同期関数を使用しない

同期の関数とメソッドは、返されるまで実行中のプロセスを結合します。同期関数に対する 1 回の呼び出しは数マイクロ秒から数ミリ秒で返される可能性がありますが、トラフィックが多い Web サイトでは、これらの呼び出しを合計すると、アプリケーションのパフォーマンスが低下します。実稼働環境では、これらを使用しないでください。

ノードおよび多くのモジュールは、同期版と非同期版の関数を提供していますが、実稼働環境では必ず非同期版を使用してください。同期関数を使用しても構わないのは、初期始動時のみです。

Node.js 4.0+ または io.js 2.1.0+ を使用している場合、アプリケーションで同期 API を使用するときに、いつでも `--trace-sync-io` コマンド・ライン・フラグを使用して、警告とスタック・トレースを出力することができます。無論、この機能を実際に実稼働環境で使用することはありませんが、コードを実稼働環境で使用する準備ができていることを確認するために使用できます。詳細については、[io.js 2.1.0 の週次更新](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0)を参照してください。

### ロギングを正確に実行する

一般に、アプリケーションからのロギングを行う理由には、デバッグと、アプリケーション・アクティビティー (基本的にその他すべて) のロギングの 2 つがあります。`console.log()` または `console.err()` を使用してログ・メッセージを端末に出力するのは、開発環境では一般的な手法です。しかし、宛先が端末またはファイルの場合、[これらの関数は同期的](https://nodejs.org/api/console.html#console_console_1)であるため、出力を別のプログラムにパイプ接続しない限り、実稼働環境には向いていません。

#### デバッグ

デバッグの目的でロギングを実行する場合は、`console.log()` を使用するのではなく、[debug](https://www.npmjs.com/package/debug) などの特殊なデバッグ・モジュールを使用します。このモジュールでは、DEBUG 環境変数を使用して、`console.err()` に送信されるデバッグ・メッセージを制御できます。アプリケーションを純粋に非同期的にしておくために、`console.err()` を別のプログラムにパイプ接続することもできます。しかし、実稼働環境ではデバッグを実行することはお勧めしません。

#### アプリケーション・アクティビティー

アプリケーション・アクティビティー (例えば、トラフィックまたは API 呼び出しのトラッキング) のロギングを実行する場合は、`console.log()` を使用するのではなく、[Winston](https://www.npmjs.com/package/winston) や [Bunyan](https://www.npmjs.com/package/bunyan) などのロギング・ライブラリーを使用します。これらの 2 つのライブラリーの詳細な比較については、StrongLoop ブログ投稿の [Comparing Winston and Bunyan Node.js Logging](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/) を参照してください。

### 例外を適切に処理する

Node アプリケーションは、キャッチされていない例外が発生すると、異常終了します。例外を処理せず、適切な処置を取らないと、Express アプリケーションは異常終了してオフラインになります。下記の『[アプリケーションが確実に自動再始動するようにする](#restart)』に記載されているアドバイスに従うと、アプリケーションは異常終了から復旧します。幸い、Express アプリケーションの起動時間は通常短いものです。それでも、異常終了は避けたいものであり、そのためには例外を適切に処理する必要があります。

確実にすべての例外を処理するには、以下の技法を使用します。

* [Try-catch の使用](#try-catch)
* [Promise の使用](#promises)

上記のトピックを読む前に、error-first コールバックの使用と、ミドルウェアへのエラーの伝搬という Node/Express エラー処理の基礎を理解しておく必要があります。Node は、非同期関数からエラーを返すために「error-first コールバック」という規則を使用します。この場合、コールバック関数への最初のパラメーターがエラー・オブジェクトで、その後に続くパラメーターに結果データがあります。エラーがないことを示すには、最初のパラメーターとして `null` を渡します。コールバック関数は、エラーを有意に処理するには、error-first コールバック規則に対応して従う必要があります。Express におけるベスト・プラクティスは、next() 関数を使用して、ミドルウェア・チェーンを介してエラーを伝搬することです。

エラー処理のその他の基礎については、下記を参照してください。

* [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors)
* [Building Robust Node Applications: Error Handling](https://strongloop.com/strongblog/robust-node-applications-error-handling/) (StrongLoop ブログ)

#### 実行してはならないこと

実行しては*ならない* ことの 1 つは、例外がイベント・ループまでたどり着いた場合に生成される `uncaughtException` イベントを listen することです。`uncaughtException` のイベント・リスナーを追加すると、例外が発生したプロセスのデフォルトの動作が変更されます。プロセスは、例外に関係なく実行し続けます。この方法でアプリケーションの異常終了を防止できそうに思えますが、キャッチされていない例外が発生した後にアプリケーションの実行を続けるのは危険な手法であり、お勧めしません。プロセスの状態の信頼性と予測可能性が低くなるためです。

さらに、`uncaughtException` の使用は、正式に[粗雑なもの](https://nodejs.org/api/process.html#process_event_uncaughtexception)として認められており、これをコアから削除するための[提案](https://github.com/nodejs/node-v0.x-archive/issues/2582)が出されています。したがって、`uncaughtException` を listen するのは悪い方法です。この理由から複数のプロセスとスーパーバイザーなどの使用をお勧めしています。異常終了と再始動は、場合によってはエラーから復旧するための最も信頼できる方法となります。

また、[domain](https://nodejs.org/api/domain.html) の使用もお勧めしません。このモジュールは概して問題を解決しないため、推奨されていません。

#### Try-catch の使用

Try-catch は、同期コードで例外をキャッチするために使用できる JavaScript 言語構造体です。Try-catch は、例えば、下記のように JSON 構文解析エラーを処理するために使用します。

[JSHint](http://jshint.com/) または [JSLint](http://www.jslint.com/) などのツールを使用して、[未定義変数の参照エラー](http://www.jshint.com/docs/options/#undef)などの暗黙的な例外を検出します。

次に、プロセスを異常終了させる可能性がある例外を処理するための Try-catch の使用例を示します。
このミドルウェア関数は、JSON オブジェクトである「params」という照会フィールド・パラメーターを受け入れます。

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params
    try {
      const jsonObj = JSON.parse(jsonStr)
      res.send('Success')
    } catch (e) {
      res.status(400).send('Invalid JSON string')
    }
  })
})
```

ただし、Try-catch は同期コードでのみ機能します。Node プラットフォームは主に (特に実稼働環境で) 非同期的であるため、Try-catch は多くの例外をキャッチしません。

#### Promise の使用

Promise は、`then()` を使用する非同期コード・ブロックのすべての例外 (明示的と暗黙的の両方) を処理します。単に、Promise チェーンの最後に `.catch(next)` を追加してください。次に例を示します。

```js
app.get('/', (req, res, next) => {
  // do some sync stuff
  queryDb()
    .then((data) => makeCsv(data)) // handle data
    .then((csv) => { /* handle csv */ })
    .catch(next)
})

app.use((err, req, res, next) => {
  // handle error
})
```

これで、非同期と同期のエラーがすべてエラー・ミドルウェアに伝搬されます。

ただし、注意点が 2 つあります。

1.  すべての非同期コードが Promise を返す必要があります (エミッターを除く)。特定のライブラリーが Promise を返さない場合は、[Bluebird.promisifyAll()](http://bluebirdjs.com/docs/api/promise.promisifyall.html) などのヘルパー関数を使用して基本オブジェクトを変換します。
2.  イベント・エミッター (ストリームなど) により、例外がキャッチされないことがあります。そのため、必ずエラー・イベントを適切に処理してください。次に例を示します。

```js
const wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrap(async (req, res, next) => {
  const company = await getCompanyById(req.query.id)
  const stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```

Promise を使用するエラー処理の詳細については、下記を参照してください。

* [Asynchronous Error Handling in Express with Promises, Generators and ES7](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
* [Promises in Node.js with Q – An Alternative to Callbacks](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/)

## 環境/セットアップで実行する処理

以下に、アプリケーションのパフォーマンスを向上させるためにシステム環境で実行できる処理をいくつか挙げます。

* [NODE_ENV を「production」に設定する](#set-node_env-to-production)
* [アプリケーションが確実に自動再始動するようにする](#ensure-your-app-automatically-restarts)
* [アプリケーションをクラスターで実行する](#run-your-app-in-a-cluster)
* [要求の結果をキャッシュに入れる](#cache-request-results)
* [ロード・バランサーを使用する](#use-a-load-balancer)
* [リバース・プロキシーを使用する](#use-a-reverse-proxy)

### NODE_ENV を「production」に設定する

NODE_ENV 環境変数は、アプリケーションが実行される環境 (通常は開発または実稼働) を指定します。パフォーマンスを向上させるために実行できる最も単純な処理の 1 つは、NODE_ENV を「production」に設定することです。

NODE_ENV を「production」に設定すると、Express は次のようになります。

* ビュー・テンプレートをキャッシュに入れる。
* CSS 拡張から生成された CSS ファイルをキャッシュに入れる。
* 詳細度の低いエラー・メッセージを生成する。

[テスト](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/)により、こうすると、アプリケーション・パフォーマンスが 3 倍も高くなることが示されています。

環境固有のコードを作成する必要がある場合は、`process.env.NODE_ENV` を使用して NODE_ENV の値を確認できます。どの環境変数の値を確認する場合でもパフォーマンスに悪影響が及ぶため、慎重に行ってください。

開発環境では、通常、対話式シェルで環境変数を設定します。例えば、`export` または `.bash_profile` ファイルを使用します。しかし、一般的には実動サーバーではそうしません。代わりに、OS の init システム (systemd または Upstart) を使用します。次のセクションでは、init システムの一般的な使用法について詳しく説明しています。ここで重点的に説明したのは、NODE_ENV の設定がパフォーマンスにとって極めて重要であるため (かつ簡単に実行できるため) です。

Upstart では、ジョブ・ファイルで `env` キーワードを使用します。次に例を示します。

```sh
# /etc/init/env.conf
 env NODE_ENV=production
```

詳細については、[Upstart Intro, Cookbook and Best Practices](http://upstart.ubuntu.com/cookbook/#environment-variables) を参照してください。

systemd では、unit ファイルで `Environment` ディレクティブを使用します。次に例を示します。

```sh
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
```

詳細については、[Using Environment Variables In systemd Units](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html) を参照してください。

### アプリケーションが確実に自動再始動するようにする

実稼働環境では、アプリケーションを絶対にオフラインにしたくありません。つまり、アプリケーションが異常終了した場合も、サーバー自体が異常終了した場合も、アプリケーションが必ず再始動するようにする必要があります。いずれの事態も望ましくないことですが、現実的には以下の対策を通して両方の事態に備えておく必要があります。

* アプリケーション (および Node) が異常終了した場合にプロセス・マネージャーを使用してそれらを再始動する。
* OS の異常終了時に、OS で提供されている init システムを使用してプロセス・マネージャーを再始動する。プロセス・マネージャーがなくても、init システムを使用することは可能です。

Node アプリケーションは、キャッチされていない例外が発生すると、異常終了します。最初に実行する必要があることは、アプリケーションが十分にテストされていて、すべての例外を処理することを確認することです (詳細については、[例外を適切に処理する](#exceptions)を参照)。ただし、フェイルセーフ動作として、アプリケーションが異常終了した場合に確実に自動再始動するためのメカニズムを適用してください。

#### プロセス・マネージャーを使用する

開発環境では、単にコマンド・ラインから `node server.js` などを使用してアプリケーションを開始しています。ただし、この方法を実稼働環境で実行すると、危険を招くことになります。アプリケーションが異常終了した場合、アプリケーションは再始動されるまでオフラインになります。アプリケーションが異常終了した場合に確実に再始動するようにするには、プロセス・マネージャーを使用します。プロセス・マネージャーは、デプロイメントを容易に行えるようにして、高可用性を実現し、アプリケーションを実行時に管理できるようにする、アプリケーションの「コンテナー」です。

アプリケーションを異常終了時に再始動することに加えて、プロセス・マネージャーでは以下が可能になります。

* ランタイム・パフォーマンスとリソース使用量に関するインサイトを得る。
* パフォーマンスを向上させるために設定を動的に変更する。
* クラスタリングを制御する (StrongLoop PM および pm2)。

Node 向けの最も一般的なプロセス・マネージャーは次のとおりです。

* [StrongLoop Process Manager](http://strong-pm.io/)
* [PM2](https://github.com/Unitech/pm2)
* [Forever](https://www.npmjs.com/package/forever)

3 つのプロセス・マネージャーの各機能の比較については、[http://strong-pm.io/compare/](http://strong-pm.io/compare/) を参照してください。3 つすべての詳細な紹介については、[Express アプリケーション用のプロセス・マネージャー](/{{ page.lang }}/advanced/pm.html) を参照してください。

これらのプロセス・マネージャーのいずれかを使用すれば、時々異常終了してもアプリケーションの稼働状態を維持するのに十分です。

ただし、StrongLoop PM には、明確に実動でのデプロイメントを対象とした機能が数多くあります。このツールを関連する StrongLoop ツールとともに使用して、以下を実行できます。

* アプリケーションをローカル側で作成してパッケージし、実動システムのセキュアにデプロイする。
* 何らかの理由で異常終了したアプリケーションを自動的に再始動する。
* クラスターをリモート側で管理する。
* CPU プロファイルとヒープ・スナップショットを表示して、パフォーマンスを最適化し、メモリー・リークを診断する。
* アプリケーションのパフォーマンス・メトリックを表示する。
* Nginx ロード・バランサーの制御が統合された複数のホストに容易に拡張する。

下記で説明するように、init システムを使用して、StrongLoop PM をオペレーティング・システム・サービスとしてインストールすると、システムの再始動時に自動的に再始動します。そのため、アプリケーション・プロセスとクラスターの稼働が永続的に維持されます。

#### init システムの使用

次の信頼性の層は、サーバーの再始動時にアプリケーションが確実に再始動するようにすることです。システムもさまざまな理由でダウンすることがあります。サーバーが異常終了した場合にアプリケーションが確実に再始動するようにするには、OS に組み込まれている init システムを使用します。今日使用されている 2 つの主な init システムは、[systemd](https://wiki.debian.org/systemd) および [Upstart](http://upstart.ubuntu.com/) です。

Express アプリケーションで init システムを使用する方法は 2 つあります。

* プロセス・マネージャーでアプリケーションを実行し、init システムを使用してプロセス・マネージャーをサービスとしてインストールします。アプリケーションが異常終了した場合にプロセス・マネージャーが再始動して、OS の再始動時に init システムがプロセス・マネージャーを再始動します。この方法をお勧めします。
* init システムで直接、アプリケーション (および Node) を実行します。この方法の方が単純ですが、プロセス・マネージャーを使用する場合に得られる利点は得られません。

##### Systemd

Systemd は、Linux システムとサービス・マネージャーです。大半の主要な Linux ディストリビューションでは、Systemd がデフォルトの init システムとして採用されています。

Systemd サービス構成ファイルは、*unit ファイル* という名前で、ファイル名の末尾は .service です。次に、Node アプリケーションを直接管理するための unit ファイルの例を示します (太字のテキストを、ご使用のシステムとアプリケーションの値に置き換えてください)。

```sh
[Unit]
Description=Awesome Express App

[Service]
Type=simple
ExecStart=/usr/local/bin/node /projects/myapp/index.js
WorkingDirectory=/projects/myapp

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity

# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```

Systemd について詳しくは、[systemd の解説 (man ページ)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html) を参照してください。

##### Systemd サービスとしての StrongLoop PM

StrongLoop Process Manager を Systemd サービスとして簡単にインストールできます。インストール後、サーバーが再始動すると、StrongLoop PM が自動的に再始動され、管理対象アプリケーションのすべてが再始動されます。

StrongLoop PM を Systemd サービスとしてインストールするには、次のようにします。

```console
$ sudo sl-pm-install --systemd
```

次に、サービスを開始します。

```console
$ sudo /usr/bin/systemctl start strong-pm
```

詳しくは、[Setting up a production host (StrongLoop 資料)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHEL7+,Ubuntu15.04or15.10) を参照してください。

##### Upstart

Upstart は、多くの Linux ディストリビューションで提供されているシステム・ツールです。システム始動時にタスクとサービスを開始して、シャットダウン時にそれらを停止するほか、監視するために使用されます。Express アプリケーションまたはプロセス・マネージャーをサービスとして構成すると、Upstart が異常終了時に自動的に再始動します。

Upstart サービスは、ファイル名が `.conf` で終わるジョブ構成ファイル (「ジョブ」とも呼ばれます) で定義されます。次の例は、`/projects/myapp/index.js` にあるメインファイルを使用して、「myapp」というアプリケーションの「myapp」というジョブを作成する方法を示しています。

以下の内容で `myapp.conf` というファイルを `/etc/init/` に作成します (太字のテキストを、ご使用のシステムとアプリケーションの値に置き換えてください)。

```sh
# When to start the process
start on runlevel [2345]

# When to stop the process
stop on runlevel [016]

# Increase file descriptor limit to be able to handle more requests
limit nofile 50000 50000

# Use production mode
env NODE_ENV=production

# Run as www-data
setuid www-data
setgid www-data

# Run from inside the app dir
chdir /projects/myapp

# The process to start
exec /usr/local/bin/node /projects/myapp/index.js

# Restart the process if it is down
respawn

# Limit restart attempt to 10 times within 10 seconds
respawn limit 10 10
```

注: このスクリプトには、Ubuntu 12.04-14.10 でサポートされる Upstart 1.4 以降が必要です。

ジョブは、システムの始動時に実行されるように構成されるため、アプリケーションは、オペレーティング・システムと並行して開始され、アプリケーションの異常終了時またはシステムの停止時に自動的に再始動されます。

アプリケーションの自動再始動のほか、Upstart では、以下のコマンドを使用できます。

* `start myapp` – アプリケーションの開始
* `restart myapp` – アプリケーションの再始動
* `stop myapp` – アプリケーションの停止

Upstart について詳しくは、[Upstart Intro, Cookbook and Best Practises](http://upstart.ubuntu.com/cookbook) を参照してください。

##### Upstart サービスとしての StrongLoop PM

StrongLoop Process Manager を Upstart サービスとして簡単にインストールできます。インストール後、サーバーが再始動すると、StrongLoop PM が自動的に再始動され、管理対象アプリケーションのすべてが再始動されます。

StrongLoop PM を Upstart 1.4 サービスとしてインストールするには、次のようにします。

```console
$ sudo sl-pm-install
```

次に、サービスを実行します。

```console
$ sudo /sbin/initctl start strong-pm
```

注: Upstart 1.4 をサポートしないシステムでは、コマンドが若干異なります。詳しくは、[Setting up a production host (StrongLoop 資料)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHELLinux5and6,Ubuntu10.04-.10,11.04-.10) を参照してください。

### アプリケーションをクラスターで実行する

マルチコア・システムでは、プロセスのクラスターを起動することで、Node アプリケーションのパフォーマンスを数倍も向上させることができます。クラスターは、アプリケーションの複数インスタンスを実行して (理想的には CPU コアごとに 1 つのインスタンス)、負荷とタスクをインスタンス間で分散させます。

![クラスター API を使用したアプリケーション・インスタンス間のバランシング](/images/clustering.png)

重要: アプリケーション・インスタンスは別々のインスタンスとして実行されるため、同じメモリー・スペースを共有しません。つまり、オブジェクトは、アプリケーションの各インスタンスに対してローカル側にあります。そのため、アプリケーション・コードの状態を維持できません。ただし、[Redis](http://redis.io/) などのメモリー内のデータ・ストアを使用して、セッション関連のデータと状態を保管できます。この注意点は、複数のプロセスまたは複数の物理サーバーのどちらを使用したクラスタリングでも、基本的にあらゆる形式の水平スケーリングに適用されます。

クラスター・アプリケーションでは、ワーカー・プロセスは、残りのプロセスに影響を与えることなく、個々に異常終了することがあります。パフォーマンス上の利点の他に障害分離は、アプリケーション・プロセスのクラスターを実行するもう 1 つの理由です。ワーカー・プロセスが異常終了するたびに、必ず、イベントをログに記録して、cluster.fork() を使用して新規プロセスを作成してください。

#### Node のクラスター・モジュールの使用

クラスタリングには、Node の[クラスター・モジュール](https://nodejs.org/api/cluster.html.)を使用します。このモジュールにより、マスター・プロセスは、ワーカー・プロセスを作成して、着信接続をワーカー間で分散させることができます。ただし、このモジュールを直接使用するよりも、[node-pm](https://www.npmjs.com/package/node-pm) や [cluster-service](https://www.npmjs.com/package/cluster-service) など、これらの処理を自動的に実行する多くのツールを使用する方がはるかに簡単です。

#### StrongLoop PM の使用

アプリケーションを StrongLoop Process Manager (PM) にデプロイする場合、アプリケーション・コードを変更*せずに*、クラスタリングを利用できます。

StrongLoop Process Manager (PM) は、アプリケーションを実行する際、システム上の CPU コアの数と等しい数のワーカーを使用するクラスターで自動的に実行します。クラスター内のワーカー・プロセスの数は、アプリケーションを停止することなく、slc コマンド・ライン・ツールを使用して手動で変更できます。

例えば、アプリケーションを prod.foo.com にデプロイして、StrongLoop PM がポート 8701 (デフォルト) で listen している場合は、slc を使用してクラスター・サイズを 8 に設定します。

```console
$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8
```

StrongLoop PM を使用したクラスタリングについて詳しくは、StrongLoop 資料の [Clustering](https://docs.strongloop.com/display/SLC/Clustering) を参照してください。

#### PM2 の使用

If you deploy your application with PM2, then you can take advantage of clustering _without_ modifying your application code.  You should ensure your [application is stateless](http://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps) first, meaning no local data is stored in the process (such as sessions, websocket connections and the like).

When running an application with PM2, you can enable **cluster mode** to run it in a cluster with a number of instances of your choosing, such as the matching the number of available CPUs on the machine. You can manually change the number of processes in the cluster using the `pm2` command line tool without stopping the app.

To enable cluster mode, start your application like so:

```console
# Start 4 worker processes
$ pm2 start app.js -i 4
# Auto-detect number of available CPUs and start that many worker processes
$ pm2 start app.js -i max
```

This can also be configured within a PM2 process file (`ecosystem.config.js` or similar) by setting `exec_mode` to `cluster` and `instances` to the number of workers to start.

Once running, a given application with the name `app` can be scaled like so:

```console
# Add 3 more workers
$ pm2 scale app +3
# Scale to a specific number of workers
$ pm2 scale app 2
```

For more information on clustering with PM2, see [Cluster Mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/) in the PM2 documentation.

### 要求の結果をキャッシュに入れる

実稼働環境のパフォーマンスを向上させるもう 1 つの戦略は、アプリケーションが同じ要求に何回も対応するために操作を繰り返すことがないように、要求の結果をキャッシュに入れることです。

[Varnish](https://www.varnish-cache.org/) や [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/) ([Nginx Caching](https://serversforhackers.com/nginx-caching/) も参照) などのキャッシュ・サーバーを使用すると、アプリケーションの速度とパフォーマンスを大幅に向上させることができます。

### ロード・バランサーを使用する

アプリケーションがどれだけ最適化されていても、単一インスタンスは、限られた量の負荷とトラフィックしか処理できません。アプリケーションを拡張する 1 つの方法は、複数インスタンスを実行して、ロード・バランサーを使用してトラフィックを分散させることです。ロード・バランサーをセットアップすると、アプリケーションのパフォーマンスと速度を向上させることができ、単一インスタンスよりも大規模に拡張できます。

ロード・バランサーは通常、複数のアプリケーション・インスタンスやサーバーとの間のトラフィックを調整するリバース・プロキシーです。[Nginx](http://nginx.org/en/docs/http/load_balancing.html) や [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts) を使用して、アプリケーション用にロード・バランサーを簡単にセットアップできます。

ロード・バランシングでは、特定のセッション ID に関連する要求が発信元のプロセスに接続することを確認する必要があります。これは、*セッション・アフィニティー* または*スティッキー・セッション* と呼ばれ、セッション・データに Redis などのデータ・ストアを使用する上記の提案によって対応できます (ご使用のアプリケーションによって異なります)。説明については、[Using multiple nodes](http://socket.io/docs/using-multiple-nodes/) を参照してください。

### リバース・プロキシーを使用する

リバース・プロキシーは、Web アプリケーションの前に配置され、アプリケーションへの要求の転送とは別に、要求に対する補助操作を実行します。特に、エラー・ページ、圧縮、キャッシング、ファイル・サービス提供、ロード・バランシングを処理できます。

アプリケーションの状態を知る必要のないタスクをリバース・プロキシーに引き渡すことで、Express が解放されて、特殊なアプリケーション・タスクを実行できるようになります。この理由から、実稼働環境で Express を [Nginx](https://www.nginx.com/) や [HAProxy](http://www.haproxy.org/) などのリバース・プロキシーの背後で実行することをお勧めします。
