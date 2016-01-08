---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Express でのエラー処理
menu: guide
lang: ja
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# エラー処理

エラー処理ミドルウェア関数は、その他のミドルウェア関数と同じ方法で定義しますが、エラー処理関数の引数が 3 つではなく、4 つ `(err、req、res、next)` であることが例外です。次に例を示します。

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

エラー処理ミドルウェアは、その他の `app.use()` およびルート呼び出しの後で最後に定義します。次に例を示します。

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
</code>
</pre>

ミドルウェア関数の中からの応答は、HTML エラー・ページ、単純なメッセージ、または JSON ストリングなど、任意の形式にすることができます。

組織的な (および高水準フレームワークの) 目的で、通常のミドルウェア関数と同じように、複数のエラー処理のミドルウェア関数を定義できます。例えば、`XHR` を使用する要求と、使用しない要求のためのエラー・ハンドラーを定義するには、以下のコマンドを使用します。

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
</code>
</pre>

この例では、汎用の `logErrors` が要求とエラーの情報を `stderr` に書き込む可能性があります。次に例を示します。

<pre>
<code class="language-javascript" translate="no">
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
</code>
</pre>

また、この例では、`clientErrorHandler` は次のように定義されます。この場合、エラーは明示的に次のエラーに渡されます。

<pre>
<code class="language-javascript" translate="no">
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
</code>
</pre>

「catch-all」`errorHandler` 関数は、次のように実装されます。

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>

`next()` 関数に (ストリング `'route'` を除く) 何らかを渡すと、Express は、現在の要求でエラーが発生したと想定して、エラーが発生していない残りのすべての処理のルーティングとミドルウェア関数をスキップします。そのエラーを何らかの方法で渡す場合は、次のセクションで説明するようにエラー処理ルートを作成する必要があります。

複数のコールバック関数を使用するルート・ハンドラーがある場合、`route` パラメーターを使用して、次のルート・ハンドラーまでスキップできます。次に例を示します。

<pre>
<code class="language-javascript" translate="no">
app.get('/a_route_behind_paywall',
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) {

      // continue handling this request
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });
</code>
</pre>

この例では、`getPaidContent` ハンドラーはスキップされますが、`/a_route_behind_paywall` の `app` にある残りのハンドラーはすべて引き続き実行されます。

<div class="doc-box doc-info" markdown="1">
`next()` および `next(err)` の呼び出しは、現在のハンドラーが完了したことと、その状態を示します。`next(err)` は、上記のようにエラーを処理するようにセットアップされたハンドラーを除き、チェーン内の残りのハンドラーをすべてスキップします。
</div>

## デフォルトのエラー・ハンドラー

Express には、アプリケーションで発生する可能性があるすべてのエラーを処理するエラー・ハンドラーが標準装備されています。このデフォルトのエラー処理ミドルウェア関数は、ミドルウェア関数スタックの最後に追加されます。

エラーを `next()` に渡して、エラー・ハンドラーで処理しない場合、そのエラーは標準装備のエラー・ハンドラーによって処理されます。エラーはスタック・トレースと共にクライアントに書き込まれます。スタック・トレースは実稼働環境には組み込まれません。

<div class="doc-box doc-info" markdown="1">
アプリケーションを実動モードで実行するには、環境変数 `NODE_ENV` を `production` に設定します。
</div>

応答の作成を開始した後に `next()` を呼び出してエラーが発生した場合 (例えば、クライアントへの応答のストリーミング中にエラーが発生した場合)、Express のデフォルトのエラー・ハンドラーは接続をクローズして、要求を失敗にします。

そのため、カスタムのエラー・ハンドラーを追加する際、ヘッダーが常にクライアントに送信されていた場合には、Express のデフォルトのエラー処理メカニズムに委任することができます。

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>
