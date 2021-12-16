---
layout: page
title: Express 5 への移行
menu: guide
lang: ja
---

# Express 5 への移行

<h2 id="overview">概説</h2>

Express 5.0 は、まだアルファ・リリースの段階ですが、ここでは本リリースにおける変更のプレビューを示し、Express 4 アプリケーションを Express 5 に移行する方法を説明します。

Express 5 は Express 4 とあまり変わりません。API の変更は、3.0 から 4.0 への変更ほど大きいものではありません。基本的な API は同じままですが、それでも互換性のない変更が行われています。つまり、Express 5 を使用するように既存の Express 4 を更新すると、機能しなくなる可能性があります。

最新のアルファをインストールして Express 5 をプレビューするには、アプリケーションのルート・ディレクトリーで次のコマンドを入力します。

```console
$ npm install express@>=5.0.0-alpha.1 --save
```

その後、自動テストを実行して、どの機能が失敗するかを確認し、下記の更新に従って問題を修正することができます。テストの失敗に対応した後、アプリケーションを実行して、どのようなエラーが発生するかを確認します。サポートされていないメソッドまたはプロパティーをアプリケーションが使用している場合は、すぐに判明します。

<h2 id="changes">Express 5 における変更点</h2>

次に、Express のユーザーに影響を与える (アルファ 2 リリースの時点での) 変更のリストを示します。
予定されているすべての機能のリストについては、[プル要求](https://github.com/expressjs/express/pull/2237)を参照してください。

**削除されたメソッドとプロパティー**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">メソッド名の複数化</a></li>
  <li><a href="#leading">app.param(name, fn) の name 引数の先頭コロン</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**変更**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**改善**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>削除されたメソッドとプロパティー</h3>

アプリケーションで以下のいずれかのメソッドまたはプロパティーを使用すると、異常終了します。そのため、バージョン 5 に更新した後で、アプリケーションを変更する必要があります。

<h4 id="app.del">app.del()</h4>

Express 5 は、`app.del()` 関数をサポートしなくなりました。この関数を使用すると、エラーがスローされます。HTTP DELETE ルートを登録するには、代わりに `app.delete()` 関数を使用してください。

最初は `del` が `delete` の代わりに使用されていました。`delete` は、JavaScript で予約されているキーワードであるためです。しかし、ECMAScript 6 以降では、`delete` およびその他の予約済みキーワードを正式にプロパティー名として使用できます。ここで、`app.del` 関数の非推奨につながった議論を読むことができます。

<h4 id="app.param">app.param(fn)</h4>

`app.param(fn)` シグニチャーは、`app.param(name, fn)` 関数の動作を変更するために使用されていました。v4.11.0 以降では非推奨になったため、Express 5 は完全にサポートしなくなりました。

<h4 id="plural">メソッド名の複数化</h4>

以下のメソッド名は複数形になりました。Express 4 では、以前のメソッドを使用すると、非推奨の警告が出されていました。Express 5 では、完全にサポートされなくなりました。

`req.acceptsCharset()` は `req.acceptsCharsets()` に置き換えられます。

`req.acceptsEncoding()` は `req.acceptsEncodings()` に置き換えられます。

`req.acceptsLanguage()` は `req.acceptsLanguages()` に置き換えられます。

<h4 id="leading">app.param(name, fn) の name の先頭コロン (:)</h4>

`app.param(name, fn)` 関数の name の先頭コロン文字 (:) は、Express 3 の残余物であり、Express 4 では後方互換性のためにサポートされていましたが、非推奨の通知が出されてました。Express 5 では、サイレントに無視して、先頭にコロンを付けない name パラメーターを使用します。

[app.param](/{{ page.lang }}/4x/api.html#app.param) に関する Express 4 の資料では、先頭のコロンについて言及していないため、この資料に従う場合には、コードに影響は及ばないはずです。

<h4 id="req.param">req.param(name)</h4>

この混乱を招く可能性がある危険なメソッドは、フォーム・データを取得するためのものでしたが、削除されました。今後は、実行依頼されたパラメーター名を `req.params`、`req.body`、または `req.query` オブジェクトで具体的に見つける必要があります。

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 は、シグニチャー `res.json(obj, status)` をサポートしなくなりました。代わりに、状況を設定してから、`res.status(status).json(obj)` のように `res.json()` メソッドにチェーニングします。

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 は、シグニチャー `res.jsonp(obj, status)` をサポートしなくなりました。代わりに、状況を設定してから、`res.status(status).jsonp(obj)` のように `res.jsonp()` メソッドにチェーニングします。

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 は、シグニチャー `res.send(obj, status)` をサポートしなくなりました。代わりに、状況を設定してから、`res.status(status).send(obj)` のように `res.send()` メソッドにチェーニングします。

<h4 id="res.send.status">res.send(status)</h4>

Express 5 は、シグニチャー <code>res.send(<em>status</em>)</code> をサポートしなくなりました。ここで、*`status`* は数値です。代わりに、`res.sendStatus(statusCode)` 関数を使用します。この関数は、HTTP 応答ヘッダーの状況コードを設定して、コードのテキスト版 (「Not Found」、「Internal Server Error」など) を送信します。
`res.send()` 関数を使用して数値を送信する必要がある場合は、数値を引用してストリングに変換し、Express によって、サポートされない以前のシグニチャーを使用しようとしていると解釈されないようにします。

<h4 id="res.sendfile">res.sendfile()</h4>

`res.sendfile()` 関数は、Express 5 ではキャメルケース版の `res.sendFile()` に置き換えられます。

<h3>変更</h3>

<h4 id="app.router">app.router</h4>

`app.router` オブジェクトは、Express 4 で削除されましたが、Express 5 で復帰しました。アプリケーションが明示的にロードする必要があった Express 3 とは異なり、新しいバージョンでは、このオブジェクトは基本の Express ルーターの単なる参照です。

<h4 id="req.host">req.host</h4>

Express 4 では、`req.host` 関数は、ポート番号が存在する場合に、ポート番号を誤って削除していました。Express 5 では、ポート番号は維持されます。

<h4 id="req.query">req.query</h4>

Express 4.7 および Express 5 以降では、照会ストリング解析ロジックで独自の関数を使用する場合に、照会パーサー・オプションは `false` を受け入れて、照会ストリングの解析を無効にすることができます。

<h3>改善</h3>

<h4 id="res.render">res.render()</h4>

このメソッドは、すべてのビュー・エンジンに非同期動作を適用するようになり、同期実装を使用して推奨インターフェースに違反していたビュー・エンジンに起因するバグを回避します。
