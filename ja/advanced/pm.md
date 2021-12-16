---
layout: page
title: Express アプリケーション用のプロセス・マネージャー
menu: advanced
lang: ja
---

# Express アプリケーション用のプロセス・マネージャー

Express アプリケーションを実動で実行する際、以下のタスクを実行するために*プロセス・マネージャー* を使用すると便利です。

- アプリケーションが異常終了した場合に自動的に再始動する。
- ランタイム・パフォーマンスとリソース使用量に関するインサイトを得る。
- パフォーマンスを向上させるために設定を動的に変更する。
- クラスタリングを制御する。

プロセス・マネージャーは、アプリケーション・サーバーに似ていて、デプロイメントを容易に行えるようにして、高可用性を実現し、アプリケーションを実行時に管理できるようにする、アプリケーションの「コンテナー」です。

Express およびその他の Node.js アプリケーション用の最も一般的なプロセス・マネージャーは次のとおりです。

- [Forever](#forever)
- [PM2](#pm2)
- [StrongLoop Process Manager](#strongloop-process-manager)
- [SystemD](#systemd)


上記の 4 つのツールのいずれを使用しても非常に役立ちますが、StrongLoop Process Manager は、Node.js アプリケーションのライフサイクル全体に対応した包括的な実行時とデプロイメントのソリューションを提供する唯一のツールであり、実動前と実動後のすべてのステップに関するツールを統合インターフェースで提供します。

以下に、これらの各ツールについて簡単に説明します。
詳細な比較については、[http://strong-pm.io/compare/](http://strong-pm.io/compare/) を参照してください。

## Forever

Forever は、特定のスクリプトが確実に継続的 (永続的) に実行されるようにするための単純なコマンド・ライン・インターフェース・ツールです。Forever のインターフェースは単純であるため、Node.js アプリケーションおよびスクリプトの小規模なデプロイメントを実行するのに理想的です。

詳細については、[https://github.com/foreverjs/forever](https://github.com/foreverjs/forever) を参照してください。

### インストール

```console
$ [sudo] npm install forever -g
```

### 基本的な使用法

スクリプトを開始するには、次のように `forever start` コマンドを使用して、スクリプトのパスを指定します。

```console
$ forever start script.js
```

このコマンドは、スクリプトをデーモン・モード (バックグラウンド) で実行します。

端末に接続されるようにスクリプトを実行するには、次のように `start` を省略します。

```console
$ forever script.js
```

次の例に示すように、ロギング・オプション `-l`、`-o`、および `-e` を使用して Forever ツールおよびスクリプトの出力をログに記録することをお勧めします。

```console
$ forever start -l forever.log -o out.log -e err.log script.js
```

Forever によって開始されたスクリプトのリストを表示するには、次のようにします。

```console
$ forever list
```

Forever によって開始されたスクリプトを停止するには、`forever stop` コマンドを使用して、プロセス索引 (`forever list` コマンドによってリストされます) を指定します。

```console
$ forever stop 1
```

あるいは、次のようにファイルのパスを指定します。

```console
$ forever stop script.js
```

Forever によって開始されたすべてのスクリプトを停止するには、次のようにします。

```console
$ forever stopall
```

Forever には、さらに多くのオプションがあり、プログラマチック API もあります。

## PM2

PM2 は、ロード・バランサーが組み込まれた、Node.js アプリケーション用の実動プロセス・マネージャーです。PM2 では、アプリケーションの稼働を永続的に維持して、ダウン時間を発生させずに再ロードすることができ、共通のシステム管理タスクを簡単に実行できます。PM2 では、アプリケーションのロギング、モニター、クラスタリングを管理することもできます。

詳細については、[https://github.com/Unitech/pm2](https://github.com/Unitech/pm2) を参照してください。

### インストール

```console
$ [sudo] npm install pm2 -g
```

### 基本的な使用法

`pm2` コマンドを使用してアプリケーションを開始する場合、アプリケーションのパスを指定する必要があります。ただし、アプリケーションの停止、再始動、または削除を行う場合は、アプリケーションの名前または ID を指定するだけで済みます。

```console
$ pm2 start npm --name my-app -- start
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use the `pm2 show <id|name>` command to get more details about an app.
```

`pm2` コマンドを使用してアプリケーションを開始する場合、アプリケーションは即時にバックグラウンドに送信されます。さまざまな `pm2` コマンドを使用して、コマンド・ラインからバックグラウンド・アプリケーションを制御できます。

`pm2` コマンドを使用してアプリケーションが開始された後、アプリケーションはID を使用して PM2 のプロセス・リストに登録されます。そのため、システム上の別のディレクトリーからID を使用して同じ名前を持つアプリケーションを管理できます。

同じ名前を持つ複数のアプリケーションが実行されている場合、`pm2` コマンドがすべてのアプリケーションに影響を与えることに注意してください。そのため、個々のアプリケーションを管理するには、名前ではなく ID を使用してください。

実行中のプロセスをすべてリストするには、次のようにします。

```console
$ pm2 list
```

アプリケーションを停止するには、次のようにします。

```console
$ pm2 stop 0
```

アプリケーションを再始動するには、次のようにします。

```console
$ pm2 restart 0
```

アプリケーションに関する詳細情報を表示するには、次のようにします。

```console
$ pm2 show 0
```

アプリケーションを PM2 のレジストリーから削除するには、次のようにします。

```console
$ pm2 delete 0
```

## StrongLoop Process Manager

StrongLoop Process Manager (StrongLoop PM) は、Node.js アプリケーション用の実動プロセス・マネージャーです。StrongLoop PM には、ロード・バランシング、モニター、マルチホスト・デプロイメント、およびグラフィカル・コンソールが組み込まれています。
StrongLoop PM は、以下のタスクに使用できます。

- Node.js アプリケーションを作成してパッケージし、ローカル・システムまたはリモート・システムにデプロイする。
- CPU プロファイルとヒープ・スナップショットを表示して、パフォーマンスを最適化し、メモリー・リークを診断する。
- プロセスとクラスターの稼働を永続的に維持する。
- アプリケーションのパフォーマンス・メトリックを表示する。
- Nginx が統合されたマルチホスト・デプロイメントを容易に管理する。
- 複数の StrongLoop PM を、Arc から管理される分散マイクロサービス・ランタイムに統合する。

StrongLoop PM で作業するには、`slc` という強力なコマンド・ライン・インターフェース、または Arc というグラフィカル・ツールを使用します。Arc は、オープン・ソースであり、StrongLoop によって専門的なサポートが提供されます。

詳細については、[http://strong-pm.io/](http://strong-pm.io/) を参照してください。

詳細な説明:

- [Operating Node apps (StrongLoop 資料)](http://docs.strongloop.com/display/SLC)
- [Using StrongLoop Process Manager](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### インストール
```console
$ [sudo] npm install -g strongloop
```

### 基本的な使用法
```console
$ cd my-app
$ slc start
```

プロセス・マネージャーとすべてのデプロイ済みアプリケーションを表示するには、次のようにします。

```console
$ slc ctl
Service ID: 1
Service Name: my-app
Environment variables:
  No environment variables defined
Instances:
    Version  Agent version  Cluster size
     4.1.13      1.5.14           4
Processes:
        ID      PID   WID  Listening Ports  Tracking objects?  CPU profiling?
    1.1.57692  57692   0
    1.1.57693  57693   1     0.0.0.0:3001
    1.1.57694  57694   2     0.0.0.0:3001
    1.1.57695  57695   3     0.0.0.0:3001
    1.1.57696  57696   4     0.0.0.0:3001
```

すべての管理対象アプリケーション (サービス) をリストするには、次のようにします。

```console
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
```

アプリケーションを停止するには、次のようにします。

```console
$ slc ctl stop my-app
```

アプリケーションを再始動するには、次のようにします。

```console
$ slc ctl restart my-app
```

「ソフト再始動」も実行できます。実行するとワーカー・プロセスに既存の接続をクローズするための猶予期間を与えた後で、現行のアプリケーションが再始動されます。

```console
$ slc ctl soft-restart my-app
```

アプリケーションを管理対象から削除するには、次のようにします。

```console
$ slc ctl remove my-app
```
## SystemD

### イントロダクション

SystemDは現代のLinuxディストリビューションにおける、デフォルトのプロセスマネージャです。SystemDに基づいたノードサービスの実行は非常に簡単です。注：このセクションは、[Ralph Slooten(@axllent) のブログ記事](https://www.axllent.org/docs/view/nodejs-service-with-systemd/)に基づいています。

### serviceのセットアップ

Create a file in `/etc/systemd/system/express.service`:

```sh
[Unit]
Description=Express
# Set dependencies to other services (optional)
#After=mongodb.service

[Service]
# Run Grunt before starting the server (optional)
#ExecStartPre=/usr/bin/grunt

# Start the js-file starting the express server
ExecStart=/usr/bin/node server.js
WorkingDirectory=/usr/local/express
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=Express
# Change to a non-root user (optional, but recommended)
#User=<alternate user>
#Group=<alternate group>
# Set environment options
Environment=NODE_ENV=production PORT=8080

[Install]
WantedBy=multi-user.target
```

### serviceの有効化

```console
$ systemctl enable express.service
```

### serviceの起動

```console
$ systemctl start express.service
```

### serviceのステータスのチェック

```console
$ systemctl status express.service
```
