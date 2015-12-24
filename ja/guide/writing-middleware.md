---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Express アプリケーションで使用するためのミドルウェアの作成
menu: guide
lang: ja
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Express アプリケーションで使用するためのミドルウェアの作成

<h2>概説</h2>

*ミドルウェア* 関数は、[要求オブジェクト](/{{ page.lang }}/4x/api.html#req) (`req`)、[応答オブジェクト](/{{ page.lang }}/4x/api.html#res) (`res`)、およびアプリケーションの要求応答サイクルにおける次のミドルウェア関数に対するアクセス権限を持つ関数です。次のミドルウェア関数は一般的に、`next` という変数で表されます。

ミドルウェア関数は以下のタスクを実行できます。

* 任意のコードを実行する。
* 要求オブジェクトと応答オブジェクトを変更する。
* 要求応答サイクルを終了する。
* スタック内の次のミドルウェアを呼び出す。

現在のミドルウェア関数が要求応答サイクルを終了しない場合は、`next()` を呼び出して、次のミドルウェア関数に制御を渡す必要があります。そうしないと、要求はハングしたままになります。

次の例は、ミドルウェア関数呼び出しの要素を示しています。

<table id="mw-fig">
<tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">ミドルウェア関数が適用される HTTP メソッド。</div>

<div class="callout" id="callout2"> ミドルウェア関数が適用されるパス (ルート)。</div>

<div class="callout" id="callout3">ミドルウェア関数。</div>

<div class="callout" id="callout4">ミドルウェア関数へのコールバック引数 (慣習的に「next」と呼ばれます)。</div>

<div class="callout" id="callout5">ミドルウェア関数への HTTP <a href="../4x/api.html#res">応答</a>引数 (慣習的に「res」と呼ばれます)。</div>

<div class="callout" id="callout6">ミドルウェア関数への HTTP <a href="../4x/api.html#req">要求</a>引数 (慣習的に「req」と呼ばれます)。</div>
</td></tr>
</table>

次に、単純な「Hello World」という Express アプリケーションの例を示します。ここでは、2 つのミドルウェア関数を定義します。

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

<h2>開発</h2>

次に、「myLogger」という単純なミドルウェア関数呼び出しの例を示します。この関数は、アプリケーションへの要求が経過するときに単に「LOGGED」を出力します。ミドルウェア関数は、`myLogger` という変数に割り当てられます。

<pre>
<code class="language-javascript" translate="no">
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
</code>
</pre>

<div class="doc-box doc-notice" markdown="1">
上記の `next()` の呼び出しに注意してください。この関数を呼び出すと、アプリケーション内の次のミドルウェア関数が呼び出されます。
`next()` 関数は、Node.js または Express API の一部ではありませんが、ミドルウェア関数に渡される 3 番目の引数です。`next()` 関数に任意の名前を付けることは可能ですが、慣習的に常に「next」と呼ばれます。混乱を避けるために、常にこの規則に従ってください。
</div>

ミドルウェア関数をロードするには、ミドルウェア関数を指定して `app.use()` を呼び出します。
例えば、次のコードは、ルート・パス (/) へのルートの前に `myLogger` ミドルウェア関数をロードします。

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

アプリケーションは、要求を受け取るたびに、端末にメッセージ「LOGGED」を出力します。

ミドルウェアのロードの順序は重要です。最初にロードされたミドルウェア関数が常に最初に実行されます。

`myLogger` がルート・パスの後にロードされた場合、要求が到達することはなく、アプリケーションは「LOGGED」を出力しません。ルート・パスのルート・ハンドラーが要求応答サイクルを終了するためです。

ミドルウェア関数 `myLogger` は、単にメッセージを出力してから、`next()` 関数を呼び出して、スタック内の次のミドルウェア関数への要求に移ります。

次の例では、`requestTime` というプロパティーを要求オブジェクトに追加します。ここでは、このミドルウェア関数に「requestTime」という名前を付けています。

<pre>
<code class="language-javascript" translate="no">
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
</code>
</pre>

これで、アプリケーションが `requestTime` ミドルウェア関数を使用するようになります。また、ルート・パス・ルートのコールバック関数は、ミドルウェア関数が `req` (要求オブジェクト) に追加するプロパティーを使用します。

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.listen(3000);
</code>
</pre>

アプリケーションのルートに要求すると、アプリケーションは、要求のタイム・スタンプをブラウザーに表示します。

要求オブジェクト、応答オブジェクト、スタック内の次のミドルウェア関数、および Node.js API を利用できるため、ミドルウェア関数が持つ可能性は無限です。

Express ミドルウェアについて詳しくは、[Express ミドルウェアの使用](/{{ page.lang }}/guide/using-middleware.html)を参照してください。
