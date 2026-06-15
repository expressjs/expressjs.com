---
title: '生産のベストプラクティス：性能と信頼性'
description: 実稼働中の Express アプリケーションのパフォーマンスと信頼性のベストプラクティスをご覧ください。最適なパフォーマンスを得るためのコードの最適化と環境設定を網羅しています。
---

この記事では、本番環境にデプロイされた Express アプリケーションのパフォーマンスと信頼性のベストプラクティスについて説明します。

このトピックは、伝統的な開発と運営の両方にまたがる"devops"の世界にはっきりと当てはまります。 したがって、情報は以下の2つに分かれています。

- コード内で行うべきこと（開発部分）：
  - [Use gzip compression](#use-gzip-compression)
  - [Don't use synchronous functions](#dont-use-synchronous-functions)
  - [Do logging correctly](#do-logging-correctly)
  - [Handle exceptions properly](#handle-exceptions-properly)
- あなたの環境/セットアップで行うべきこと（オプスパート）：
  - [NODE_ENV を "production"に設定] (#set-node_env-to-production)
  - [Ensure your app automatically restarts](#ensure-your-app-automatically-restarts)
  - [Run your app in a cluster](#run-your-app-in-a-cluster)
  - [Cache request results](#cache-request-results)
  - [Use a load balancer](#use-a-load-balancer)
  - [Use a reverse proxy](#use-a-reverse-proxy)

## コード内でやるべきこと

コードでアプリケーションのパフォーマンスを向上させるためにできることをいくつか紹介します。

- [Use gzip compression](#use-gzip-compression)
- [Don't use synchronous functions](#dont-use-synchronous-functions)
- [Do logging correctly](#do-logging-correctly)
- [Handle exceptions properly](#handle-exceptions-properly)

### gzip 圧縮を使用する

Gzip 圧縮は応答本体のサイズを大幅に減らすことができるので、ウェブアプリの速度を向上させます。 エクスプレスアプリでgzip圧縮用の [compression](https://www.npmjs.com/package/compression) ミドルウェアを使用してください。 例:

```js
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());
```

For a high-traffic website in production, the best way to put compression in place is to implement it at a reverse proxy level (see [Use a reverse proxy](#use-a-reverse-proxy)). その場合、圧縮ミドルウェアを使用する必要はありません。 For details on enabling gzip compression in Nginx, see [Module ngx_http_gzip_module](https://nginx.org/en/docs/http/ngx_http_gzip_module.html) in the Nginx documentation.

### 同期関数を使用しない

同期関数とメソッドは、実行中のプロセスを返すまで結びつけます。 同期関数への単一の呼び出しは、数マイクロ秒またはミリ秒で戻る可能性があります。 しかし、交通量の多いウェブサイトでは、これらの呼び出しはアプリのパフォーマンスを向上させ、削減します。 生産での使用を避けます。

Node と多くのモジュールは同期バージョンと非同期バージョンの関数を提供しますが、本番環境では常に非同期バージョンを使用します。 同期関数を正当化できる唯一の時間は、最初の起動時です。

`--trace-sync-io` コマンドラインフラグを使用すると、アプリケーションが同期 API を使用するたびに警告とスタックトレースを表示できます。 もちろん、本番環境では使用したくないのではなく、コードが本番環境で使用できるようにしてください。 See the [node command-line options documentation](https://nodejs.org/api/cli.html#trace-sync-io) for more information.

### 正しくログを行う

一般的に、アプリからログを記録するには、次の2つの理由があります。デバッグとアプリアクティビティのロギング(基本的には他のすべて)です。 `console.log()` または `console.error()` を使って、ターミナルにログメッセージを出力するのが一般的です。 But [these functions are synchronous](https://nodejs.org/api/console.html#console) when the destination is a terminal or a file, so they are not suitable for production, unless you pipe the output to another program.

#### デバッグ用

デバッグの目的でログを記録する場合は、 `console.log()` の代わりに、 [debug](https://www.npmjs.com/package/debug) のような特別なデバッグモジュールを使用してください。 このモジュールにより、DEBUG 環境変数を使用して `console.error()` に送信されるデバッグメッセージを制御することができます。 アプリケーションを純粋に非同期に保つために、`console.error()`を別のプログラムにパイプします。 しかし、実際に本番環境でデバッグするつもりはありませんね。

#### アプリのアクティビティ用

アプリのアクティビティを記録している場合 (トラフィックや API コールのトラッキングなど)、コンソールを使用する代わりに。 og()\`は、 [Pino](https://www.npmjs.com/package/pino)のようなロギングライブラリを使用します。これは利用可能な最速かつ最も効率的なオプションです。

### 例外を適切に処理する

ノードアプリは、キャッチされていない例外に遭遇するとクラッシュします。 例外を処理せず、適切なアクションを実行すると、Express アプリがクラッシュしてオフラインになります。 If you follow the advice in [Ensure your app automatically restarts](#ensure-your-app-automatically-restarts) below, then your app will recover from a crash. 幸いなことに、Expressアプリは通常、短い起動時間を持っています。 それにもかかわらず、あなたは最初の場所でクラッシュを避けたいし、それを行うには、適切な例外を処理する必要があります。

すべての例外を確実に処理するには、以下の手法を使用します。

- [Use try-catch](#use-try-catch)
- [Use promises](#use-promises)

これらのトピックに取り組む前に、Node/Express エラー処理の基本的な理解を持っている必要があります。すなわち、error-first コールバックの使用、およびミドルウェアのエラーの伝播です。 ノードは、非同期関数からエラーを返すために "error-first callback" 規則を使用します。 コールバック関数の最初のパラメータがエラーオブジェクトであり、続くパラメータの結果データが続きます。 エラーがないことを示すには、最初のパラメータとして null を指定します。 コールバック関数は、エラーを有意義に処理するために、error-first コールバック規約に従わなければなりません。 Express では、next() 関数を使用してミドルウェアチェーンを通じてエラーを伝播させるのがベストプラクティスです。

エラー処理の基礎については、以下を参照してください。

- [Error Handling in Node.js](https://web.archive.org/web/20210619211351/https://www.joyent.com/node-js/production/design/errors)

#### Try-catchを使用

Try-catch は同期コードで例外をキャッチするために使用できる JavaScript 言語構造です。 例えば、以下のように JSON 解析エラーを処理するには、try-catch を使用します。

ここでは、プロセスクラッシュの可能性がある例外を処理するために try-catch を使用した例を示します。
このミドルウェア関数は、JSONオブジェクトである"params"という名前のクエリフィールドパラメータを受け取ります。

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params;
    try {
      const jsonObj = JSON.parse(jsonStr);
      res.send('Success');
    } catch (e) {
      res.status(400).send('Invalid JSON string');
    }
  });
});
```

しかし、try-catch は同期コードでのみ動作します。 Node プラットフォームは主に (特に本番環境では) 非同期であるため、try-catch は多くの例外をキャッチしません。

#### Promiseの使用

`async` 関数内でエラーがスローされた場合、または `async` 関数内で rejected Promise が待機されます。 これらのエラーは、`next(err)`を呼び出すかのようにエラーハンドラに渡されます。

```js
app.get('/', async (req, res, next) => {
  const data = await userData(); // If this promise fails, it will automatically call `next(err)` to handle the error.

  res.send(data);
});

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message });
});
```

また、ミドルウェアに非同期関数を使用することもできますし、promiseが失敗した場合にルーターがエラーを処理します。例えば:

```js
app.use(async (req, res, next) => {
  req.locals.user = await getUser(req);

  next(); // This will be called if the promise does not throw an error.
});
```

ベストプラクティスは、できるだけサイトに近いエラーを処理することです。 これはルータで処理されていますが ミドルウェアでエラーをキャッチし、別々のエラー処理ミドルウェアに頼らずに処理するのが最善です。

#### 何をしないか

`unchaughtException`をリッスンするのは\_しないでください。 イベントループに戻るまで例外が発生した場合に発生します。 `uncaughtException` に対してイベントリスナーを追加すると、例外に遭遇するプロセスのデフォルトの動作が変更されます。 例外にもかかわらずこのプロセスは続けられます これはアプリがクラッシュするのを防ぐ良い方法に思えるかもしれません。 しかし、未取得の例外が危険な方法であり、推奨されていない場合、アプリを実行し続けます。 プロセスの状態は信頼できず予測不能になるからです

Additionally, using `uncaughtException` is officially recognized as [crude](https://nodejs.org/api/process.html#event-uncaughtexception). ですから、 `unchaughtException` を聴くのは悪い考えです。 このため、複数のプロセスやスーパーバイザのようなものをお勧めします。クラッシュと再起動は、多くの場合、エラーから回復する最も信頼性の高い方法です。

We also don't recommend using [domains](https://nodejs.org/api/domain.html). これは一般的に問題を解決せず、非推奨のモジュールです。

## 環境/設定

以下は、アプリのパフォーマンスを向上させるためにシステム環境でできるいくつかのことです。

- [NODE_ENV を "production"に設定] (#set-node_env-to-production)
- [Ensure your app automatically restarts](#ensure-your-app-automatically-restarts)
- [Run your app in a cluster](#run-your-app-in-a-cluster)
- [Cache request results](#cache-request-results)
- [Use a load balancer](#use-a-load-balancer)
- [Use a reverse proxy](#use-a-reverse-proxy)

### NODE_ENV を "production" に設定

NODE_ENV 環境変数は、アプリケーションが実行されている環境 (通常は開発または実装) を指定します。 パフォーマンスを向上させるためにできる最も簡単なことの一つは、NODE_ENV を `production` に設定することです。

NODE_ENV を "production" に設定すると Express:

- ビューテンプレートのキャッシュ。
- CSS 拡張機能から生成された CSS ファイルをキャッシュします。
- あまり冗長なエラーメッセージを生成します。

[Tests indicate](https://web.archive.org/web/20250814011110/https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) that just doing this can improve app performance by a factor of three!

環境固有のコードを書く必要がある場合は、 `process.env.NODE_ENV` でNODE_ENVの値を確認できます。 環境変数の値をチェックするとパフォーマンスペナルティが発生するため、慎重に行う必要があります。

開発では、通常、 `export` または `.bash_profile` ファイルを使用して、対話型シェルで環境変数を設定します。 しかし、一般的には、本番サーバーでそれを行うべきではありません。代わりに、OS の init システム (systemd) を使用します。 次のセクションでは、init システム一般の使用法についての詳細を説明します。 しかし、`NODE_ENV`を設定することはパフォーマンスにとってとても重要です(そして実行しやすいので、ここでハイライトされています)。

systemdでは、ユニットファイルの中で`Environment`ディレクティブを使用します。 例:

```sh

Environment=NODE_ENV=production
```

詳細については、[systemd 単位で環境変数を使用する](https://www.flatcar.org/docs/latest/setup/systemd/environment-variables/)を参照してください。

### アプリが自動的に再起動することを確認します

本番環境では、アプリケーションをオフラインにしたくありません。 つまり、アプリがクラッシュした場合とサーバー自体がクラッシュした場合の両方が再起動することを確認する必要があります。 これらのイベントのどちらも発生しないことを願っていますが、現実的には両方のイベントを次のように説明する必要があります。

- プロセス・マネージャーを使用して、クラッシュしたときにアプリ(およびノード)を再起動します。
- OS がクラッシュしたときに、OS が提供する init システムを使用して、プロセス マネージャを再起動します。 プロセス管理者なしで init システムを使用することもできます。

ノードアプリケーションは、キャッチされていない例外が発生した場合にクラッシュします。 The foremost thing you need to do is to ensure your app is well-tested and handles all exceptions (see [handle exceptions properly](#handle-exceptions-properly) for details). しかし、フェイルセーフとして、アプリがクラッシュしたときに自動的に再起動するようにメカニズムを導入します。

#### プロセス管理者を使用する

開発では、コマンドラインから `node server.js` などでアプリを起動しました。 しかし、生産でこれを行うことは災害のレシピです。 アプリがクラッシュすると、再起動するまでオフラインになります。 クラッシュした場合にアプリを再起動させるには、プロセスマネージャーを使用します。 プロセス マネージャは、デプロイを容易にし、高可用性を提供し、実行時にアプリケーションを管理することができるアプリケーションの「コンテナ」です。

クラッシュ時にアプリを再起動することに加え、プロセスマネージャーは以下を可能にします:

- ランタイムのパフォーマンスとリソース消費に関する洞察を得ます。
- パフォーマンスを向上させるために動的に設定を変更します。
- 制御クラスタリング (pm2)

歴史的には、 [PM2](https://github.com/Unitech/pm2) のような Node.js プロセス管理者を使用することが一般的でした。 これを行いたい場合は、ドキュメントを参照してください。 ただし、プロセス管理に init システムを使用することをお勧めします。

#### init システムを使用します

信頼性の次の層は、サーバーの再起動時にアプリが再起動することを確認することです。 システムはまださまざまな理由でダウンすることができます。 サーバーがクラッシュした場合にアプリが再起動するようにするには、OS に組み込まれた init システムを使用します。 今日使用されている主な init システムは [systemd](https://wiki.debian.org/systemd) です。

Express アプリで init システムを使用するには、次の 2 つの方法があります。

- プロセス・マネージャーでアプリを実行し、init システムを使用したサービスとしてプロセス・マネージャをインストールします。 アプリがクラッシュしたときにプロセスマネージャーがアプリを再起動し、OS の再起動時に init システムがプロセスマネージャーを再起動します。 これは推奨されるアプローチです。
- init システムを使用して、アプリケーションを直接実行します。 これはいくらか簡単ですが、プロセスマネージャーを使用することの追加の利点を得ることはありません。

##### Systemd

SystemdはLinuxシステムとサービスマネージャーです。 ほとんどの主要な Linux ディストリビューションでは、systemd をデフォルトの init システムとして採用しています。

systemd サービスの設定ファイルは *unit file*と呼ばれ、ファイル名は `.service` で終わります。 Nodeアプリケーションを直接管理するためのユニットファイルの例を示します。 `<angle brackets>`で囲まれたシステムとアプリの値を置き換えます。

```sh
[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node </projects/myapp/index.js>
WorkingDirectory=</projects/myapp>

User=nobody
Group=nogroup


Environment=NODE_ENV=production


LimitNOFILE=infinity


LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```

For more information on systemd, see the [systemd reference (man page)](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html).

### クラスターでアプリを実行

マルチコアシステムでは、プロセスのクラスタを起動することで、Node アプリケーションのパフォーマンスを何度も向上させることができます。 クラスタはアプリケーションの複数のインスタンスを実行し、理想的には各 CPU コアで 1 つのインスタンスを実行し、負荷とタスクをインスタンス間で分配します。

![Balancing between application instances using the cluster API](/images/clustering.png)

重要: アプリケーション・インスタンスは別々のプロセスとして実行されるため、同じメモリ・スペースは共有されません。 つまり、オブジェクトはアプリの各インスタンスに対してローカルです。 したがって、アプリケーションコードで状態を維持することはできません。 However, you can use an in-memory datastore like [Redis](https://redis.io/) to store session-related data and state. この注意は、基本的には全ての形態の水平スケーリングに適用され、複数のプロセスまたは複数の物理サーバーでのクラスタリングに適用されます。

クラスター化されたアプリケーションでは、ワーカープロセスは他のプロセスに影響を与えることなく個別にクラッシュする可能性があります。 パフォーマンス上の利点とは別に、アプリケーションプロセスのクラスタを実行するもう一つの理由は、障害の分離です。 ワーカープロセスがクラッシュするたびに、常にイベントをログに記録し、cluster.fork() を使用して新しいプロセスを生成するようにしてください。

#### ノードのクラスタモジュールの使用

Clustering is made possible with Node's [cluster module](https://nodejs.org/api/cluster.html). これにより、マスタープロセスはワーカープロセスを生成し、ワーカー間の受信接続を分配することができます。

#### PM2の使用

PM2を使用してアプリケーションをデプロイする場合は、*without*アプリケーションコードを変更するクラスタリングを利用できます。 [application is stateless](https://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps) を最初に確認してください。 つまり、プロセスにローカルデータは保存されません(セッション、WebSocket接続など)。

PM2を使用してアプリケーションを実行する場合、**クラスタモード**を有効にして、選択した複数のインスタンスを使用してクラスタで実行できます。 例えば、マシン上の利用可能なCPU数と一致するなど。 `pm2`コマンドラインツールを使って、クラスタ内のプロセス数を手動で変更できます。

クラスタモードを有効にするには、以下のようにアプリケーションを起動します。

```bash

$ pm2 start npm --name my-app -i 4 -- start

$ pm2 start npm --name my-app -i max -- start
```

これは PM2 プロセス ファイル (`ecosystem.config ) 内で設定することもできます。 `exec_mode`を`cluster`に、`instances\`を開始するワーカーの数に設定します。

一度実行すると、アプリケーションは次のようにスケーリングできます。

```bash

$ pm2 scale my-app +3

$ pm2 scale my-app 2
```

For more information on clustering with PM2, see [Cluster Mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/) in the PM2 documentation.

### キャッシュリクエストの結果

本番環境のパフォーマンスを向上させるもう一つの戦略は、リクエストの結果をキャッシュすることです。 アプリが同じリクエストを繰り返し処理しないようにします。

Use a caching server like [Varnish](https://www.varnish.org/) or [Nginx](https://blog.nginx.org/blog/nginx-caching-guide) (see also [Nginx Caching](https://serversforhackers.com/c/nginx-caching)) to greatly improve the speed and performance of your app.

### ロードバランサーを使用

どんなに最適化されたアプリであっても、1つのインスタンスは限られた負荷とトラフィックしか処理できません。 アプリを拡張する方法の1つは、アプリの複数のインスタンスを実行し、ロードバランサを介してトラフィックを分散することです。 ロードバランサを設定すると、アプリのパフォーマンスと速度が向上し、1つのインスタンスでより多くのスケールが可能になります。

ロードバランサは通常、複数のアプリケーションインスタンスとサーバーとの間でトラフィックをオーケストレーションするリバースプロキシです。 You can easily set up a load balancer for your app by using [Nginx](https://nginx.org/en/docs/http/load_balancing.html) or [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

ロードバランシングでは、特定のセッション ID に関連付けられているリクエストがそれらを起動したプロセスに接続されていることを確認する必要があります。 これは*session affinity*または*sticky sessions*として知られています。 そして、セッションデータにRedisなどのデータストアを使用するために上記の提案によって対処される場合があります(アプリケーションによって異なります)。 For a discussion, see [Using multiple nodes](https://socket.io/docs/v4/using-multiple-nodes/).

### リバースプロキシを使用

リバースプロキシは Web アプリの前にあり、リクエストをアプリに指示するのとは別に、リクエストに対するサポート操作を行います。 これは、エラーページ、圧縮、キャッシュ、ファイルの提供、および他の間の負荷分散を処理することができます。

アプリケーション状態の知識を必要としないタスクをリバースプロキシに引き渡すと、Express を解放して専用のアプリケーションタスクを実行できます。 For this reason, it is recommended to run Express behind a reverse proxy like [Nginx](https://nginx.org/) or [HAProxy](https://www.haproxy.org/) in production.
