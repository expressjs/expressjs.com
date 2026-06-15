---
title: 健康チェックと優雅な閉鎖
description: Expressアプリケーションでヘルスチェックと優雅なシャットダウンを実装して、信頼性を高め、デプロイメントを管理し、Kubernetesのようなロードバランサと統合する方法を学びます。
---

## 優雅な停止

アプリケーションの新しいバージョンをデプロイする場合は、以前のバージョンを置き換える必要があります。 使用しているプロセスマネージャーは、最初にアプリケーションにSIGTERM信号を送信し、それが終了することを通知します。 アプリケーションがこのシグナルを取得したら、新しいリクエストの受け付けを停止し、継続中のリクエストをすべて終了する必要があります。 データベース接続とファイルロックを含む、使用するリソースをクリーンアップし、終了します。

### 例

```js
const server = app.listen(port);

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
```

## 健康チェック

ロードバランサは、ヘルスチェックを使用して、アプリケーションインスタンスが健全かどうかを判断し、リクエストを受け入れることができます。 For example, [Kubernetes has two health checks](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes//):

- `liveness` コンテナを再起動するタイミングを決定します。
- コンテナがいつトラフィックを受け入れる準備ができているかを決める準備が整います。 ポッドの準備ができていない場合は、サービスロードバランサーから取り外されます。
