---
layout: page
title: Express 5 への移行
description: A comprehensive guide to migrating your Express.js applications from version 4 to 5, detailing breaking changes, deprecated methods, and new improvements.
menu: guide
redirect_from: "  "
---

# Express 5 への移行

<h2 id="overview">概説</h2>

Express 5 は Express 4 とあまり変わりません。API の変更は、3.0 から 4.0 への変更ほど大きいものではありません。基本的な API は同じままですが、それでも互換性のない変更が行われています。つまり、Express 5 を使用するように既存の Express 4 を更新すると、機能しなくなる可能性があります。 Therefore, an application built with Express 4 might not work if you update it to use Express 5.

To install this version, you need to have a Node.js version 18 or higher. Then, execute the following command in your application directory:

```sh
npm install "express@5"
```

その後、自動テストを実行して、どの機能が失敗するかを確認し、下記の更新に従って問題を修正することができます。テストの失敗に対応した後、アプリケーションを実行して、どのようなエラーが発生するかを確認します。サポートされていないメソッドまたはプロパティーをアプリケーションが使用している場合は、すぐに判明します。 After addressing test failures, run your app to see what errors occur. You'll find out right away if the app uses any methods or properties that are not supported.

## Express 5 Codemods

To help you migrate your express server, we have created a set of codemods that will help you automatically update your code to the latest version of Express.

Run the following command for run all the codemods available:

```sh
npx @expressjs/codemod upgrade
```

If you want to run a specific codemod, you can run the following command:

```sh
npx @expressjs/codemod name-of-the-codemod
```

You can find the list of available codemods [here](https://github.com/expressjs/codemod?tab=readme-ov-file#available-codemods).

<h2 id="changes">Express 5 における変更点</h2>

**削除されたメソッドとプロパティー**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">メソッド名の複数化</a></li>
  <li><a href="#leading">app.param(name, fn) の name 引数の先頭コロン</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#magic-redirect">res.redirect('back') and res.location('back')</a></li>
  <li><a href="#res.redirect">res.redirect(url, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
  <li><a href="#router.param">router.param(fn)</a></li>
  <li><a href="#express.static.mime">express.static.mime</a></li>
  <li><a href="#express:router-debug-logs">express:router debug logs</a></li>
</ul>

**改善**

<ul class="doclist">
  <li><a href="#path-syntax">Path route matching syntax</a></li>
  <li><a href="#rejected-promises">Rejected promises handled from middleware and handlers</a></li>
  <li><a href="#express.urlencoded">express.urlencoded</a></li>
  <li><a href="#express.static.dotfiles">express.static dotfiles</a></li>
  <li><a href="#app.listen">app.listen</a></li>
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.body">req.body</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
  <li><a href="#res.clearCookie">res.clearCookie</a></li>
  <li><a href="#res.status">res.status</a></li>
  <li><a href="#res.vary">res.vary</a></li>
</ul>

**変更**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
  <li><a href="#brotli-support">Brotli encoding support</a></li>
</ul>

## 削除されたメソッドとプロパティー

If you use any of these methods or properties in your app, it will crash. アプリケーションで以下のいずれかのメソッドまたはプロパティーを使用すると、異常終了します。そのため、バージョン 5 に更新した後で、アプリケーションを変更する必要があります。

<h3 id="app.del">app.del()</h3>

Express 5 は、`app.del()` 関数をサポートしなくなりました。この関数を使用すると、エラーがスローされます。HTTP DELETE ルートを登録するには、代わりに `app.delete()` 関数を使用してください。 If you use this function, an error is thrown. For registering HTTP DELETE routes, use the `app.delete()` function instead.

最初は `del` が `delete` の代わりに使用されていました。`delete` は、JavaScript で予約されているキーワードであるためです。しかし、ECMAScript 6 以降では、`delete` およびその他の予約済みキーワードを正式にプロパティー名として使用できます。ここで、`app.del` 関数の非推奨につながった議論を読むことができます。 However, as of ECMAScript 6, `delete` and other reserved keywords can legally be used as property names.

{% capture codemod-deprecated-signatures %}
You can replace the deprecated signatures with the following command:

```plain-text
npx @expressjs/codemod v4-deprecated-signatures
```

{% endcapture %}

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.del('/user/:id', (req, res) => {
  res.send(`DELETE /user/${req.params.id}`)
})

// v5
app.delete('/user/:id', (req, res) => {
  res.send(`DELETE /user/${req.params.id}`)
})
```

<h3 id="app.param">app.param(fn)</h3>

`app.param(fn)` シグニチャーは、`app.param(name, fn)` 関数の動作を変更するために使用されていました。v4.11.0 以降では非推奨になったため、Express 5 は完全にサポートしなくなりました。 It has been deprecated since v4.11.0, and Express 5 no longer supports it at all.

<h3 id="plural">メソッド名の複数化</h3>

The following method names have been pluralized. In Express 4, using the old methods resulted in a deprecation warning. Express 5 no longer supports them at all:

`req.acceptsLanguage()` は `req.acceptsLanguages()` に置き換えられます。

`req.acceptsCharset()` は `req.acceptsCharsets()` に置き換えられます。

`req.acceptsEncoding()` は `req.acceptsEncodings()` に置き換えられます。

{% capture codemod-pluralized-methods %}
You can replace the deprecated signatures with the following command:

```plain-text
npx @expressjs/codemod pluralized-methods
```

{% endcapture %}

{% include admonitions/note.html content=codemod-pluralized-methods %}

```js
// v4
app.all('/', (req, res) => {
  req.acceptsCharset('utf-8')
  req.acceptsEncoding('br')
  req.acceptsLanguage('en')

  // ...
})

// v5
app.all('/', (req, res) => {
  req.acceptsCharsets('utf-8')
  req.acceptsEncodings('br')
  req.acceptsLanguages('en')

  // ...
})
```

<h3 id="leading">app.param(name, fn) の name の先頭コロン (:)</h3>

`app.param(name, fn)` 関数の name の先頭コロン文字 (:) は、Express 3 の残余物であり、Express 4 では後方互換性のためにサポートされていましたが、非推奨の通知が出されてました。Express 5 では、サイレントに無視して、先頭にコロンを付けない name パラメーターを使用します。 Express 5 will silently ignore it and use the name parameter without prefixing it with a colon.

[app.param](/{{ page.lang }}/4x/api.html#app.param) に関する Express 4 の資料では、先頭のコロンについて言及していないため、この資料に従う場合には、コードに影響は及ばないはずです。

<h3 id="req.param">req.param(name)</h3>

This potentially confusing and dangerous method of retrieving form data has been removed. この混乱を招く可能性がある危険なメソッドは、フォーム・データを取得するためのものでしたが、削除されました。今後は、実行依頼されたパラメーター名を `req.params`、`req.body`、または `req.query` オブジェクトで具体的に見つける必要があります。

{% capture codemod-req-param %}
You can replace the deprecated signatures with the following command:

```plain-text
npx @expressjs/codemod req-param
```

{% endcapture %}

{% include admonitions/note.html content=codemod-req-param %}

```js
// v4
app.post('/user', (req, res) => {
  const id = req.param('id')
  const body = req.param('body')
  const query = req.param('query')

  // ...
})

// v5
app.post('/user', (req, res) => {
  const id = req.params.id
  const body = req.body
  const query = req.query

  // ...
})
```

<h3 id="res.json">res.json(obj, status)</h3>

Express 5 は、シグニチャー `res.json(obj, status)` をサポートしなくなりました。代わりに、状況を設定してから、`res.status(status).json(obj)` のように `res.json()` メソッドにチェーニングします。 Instead, set the status and then chain it to the `res.json()` method like this: `res.status(status).json(obj)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.post('/user', (req, res) => {
  res.json({ name: 'Ruben' }, 201)
})

// v5
app.post('/user', (req, res) => {
  res.status(201).json({ name: 'Ruben' })
})
```

<h3 id="res.jsonp">res.jsonp(obj, status)</h3>

Express 5 は、シグニチャー `res.jsonp(obj, status)` をサポートしなくなりました。代わりに、状況を設定してから、`res.status(status).jsonp(obj)` のように `res.jsonp()` メソッドにチェーニングします。 Instead, set the status and then chain it to the `res.jsonp()` method like this: `res.status(status).jsonp(obj)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.post('/user', (req, res) => {
  res.jsonp({ name: 'Ruben' }, 201)
})

// v5
app.post('/user', (req, res) => {
  res.status(201).jsonp({ name: 'Ruben' })
})
```

<h3 id="res.redirect">res.redirect(url, status)</h3>

Express 5 no longer supports the signature `res.redirect(url, status)`. Instead, use the following signature: `res.redirect(status, url)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.get('/user', (req, res) => {
  res.redirect('/users', 301)
})

// v5
app.get('/user', (req, res) => {
  res.redirect(301, '/users')
})
```

<h3 id="magic-redirect">res.redirect('back') and res.location('back')</h3>

Express 5 no longer supports the magic string `back` in the `res.redirect()` and `res.location()` methods. Instead, use the `req.get('Referrer') || '/'` value to redirect back to the previous page. In Express 4, the res.`redirect('back')` and `res.location('back')` methods were deprecated.

{% capture codemod-magic-redirect %}
You can replace the deprecated signatures with the following command:

```plain-text
npx @expressjs/codemod magic-redirect
```

{% endcapture %}

{% include admonitions/note.html content=codemod-magic-redirect %}

```js
// v4
app.get('/user', (req, res) => {
  res.redirect('back')
})

// v5
app.get('/user', (req, res) => {
  res.redirect(req.get('Referrer') || '/')
})
```

<h3 id="res.send.body">res.send(body, status)</h3>

Express 5 は、シグニチャー `res.send(obj, status)` をサポートしなくなりました。代わりに、状況を設定してから、`res.status(status).send(obj)` のように `res.send()` メソッドにチェーニングします。 Instead, set the status and then chain it to the `res.send()` method like this: `res.status(status).send(obj)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.get('/user', (req, res) => {
  res.send({ name: 'Ruben' }, 200)
})

// v5
app.get('/user', (req, res) => {
  res.status(200).send({ name: 'Ruben' })
})
```

<h3 id="res.send.status">res.send(status)</h3>

Express 5 no longer supports the signature `res.send(status)`, where `status` is a number. Instead, use the `res.sendStatus(statusCode)` function, which sets the HTTP response header status code and sends the text version of the code: "Not Found", "Internal Server Error", and so on.
If you need to send a number by using the `res.send()` function, quote the number to convert it to a string, so that Express does not interpret it as an attempt to use the unsupported old signature.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.get('/user', (req, res) => {
  res.send(200)
})

// v5
app.get('/user', (req, res) => {
  res.sendStatus(200)
})
```

<h3 id="res.sendfile">res.sendfile()</h3>

`res.sendfile()` 関数は、Express 5 ではキャメルケース版の `res.sendFile()` に置き換えられます。

**Note:** In Express 5, `res.sendFile()` uses the `mime-types` package for MIME type detection, which returns different Content-Type values than Express 4 for several common file types:

- JavaScript files (.js): now "text/javascript" instead of "application/javascript"
- JSON files (.json): now "application/json" instead of "text/json"
- CSS files (.css): now "text/css" instead of "text/plain"
- XML files (.xml): now "application/xml" instead of "text/xml"
- Font files (.woff): now "font/woff" instead of "application/font-woff"
- SVG files (.svg): now "image/svg+xml" instead of "application/svg+xml"

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.get('/user', (req, res) => {
  res.sendfile('/path/to/file')
})

// v5
app.get('/user', (req, res) => {
  res.sendFile('/path/to/file')
})
```

<h3 id="router.param">router.param(fn)</h3>

The `router.param(fn)` signature was used for modifying the behavior of the `router.param(name, fn)` function. It has been deprecated since v4.11.0, and Express 5 no longer supports it at all.

<h3 id="express.static.mime">express.static.mime</h3>

In Express 5, `mime` is no longer an exported property of the `static` field.
Use the [`mime-types` package](https://github.com/jshttp/mime-types) to work with MIME type values.

**Important:** This change affects not only direct usage of `express.static.mime` but also other Express methods that rely on MIME type detection, such as `res.sendFile()`. The following MIME types have changed from Express 4:

- JavaScript files (.js): now served as "text/javascript" instead of "application/javascript"
- JSON files (.json): now served as "application/json" instead of "text/json"
- CSS files (.css): now served as "text/css" instead of "text/plain"
- HTML files (.html): now served as "text/html; charset=utf-8" instead of just "text/html"
- XML files (.xml): now served as "application/xml" instead of "text/xml"
- Font files (.woff): now served as "font/woff" instead of "application/font-woff"

```js
// v4
express.static.mime.lookup('json')

// v5
const mime = require('mime-types')
mime.lookup('json')
```

<h3 id="express:router-debug-logs">express:router debug logs</h3>

In Express 5, router handling logic is performed by a dependency. Therefore, the
debug logs for the router are no longer available under the `express:` namespace.
In v4, the logs were available under the namespaces `express:router`, `express:router:layer`,
and `express:router:route`. All of these were included under the namespace `express:*`.
In v5.1+, the logs are available under the namespaces `router`, `router:layer`, and `router:route`.
The logs from `router:layer` and `router:route` are included in the namespace `router:*`.
To achieve the same detail of debug logging when using `express:*` in v4, use a conjunction of
`express:*`, `router`, and `router:*`.

```sh
# v4
DEBUG=express:* node index.js

# v5
DEBUG=express:*,router,router:* node index.js
```

## 変更

<h3 id="path-syntax">Path route matching syntax</h3>

Path route matching syntax is when a string is supplied as the first parameter to the `app.all()`, `app.use()`, `app.METHOD()`, `router.all()`, `router.METHOD()`, and `router.use()` APIs. The following changes have been made to how the path string is matched to an incoming request:

- The wildcard `*` must have a name, matching the behavior of parameters `:`, use `/*splat` instead of `/*`

```js
// v4
app.get('/*', async (req, res) => {
  res.send('ok')
})

// v5
app.get('/*splat', async (req, res) => {
  res.send('ok')
})
```

{% capture note_wildcard %}
`*splat` matches any path without the root path. If you need to match the root path as well `/`, you can use `/{*splat}`, wrapping the wildcard in braces.

```js
// v5
app.get('/{*splat}', async (req, res) => {
  res.send('ok')
})
```

{% endcapture %}
{% include admonitions/note.html content=note_wildcard %}

- The optional character `?` is no longer supported, use braces instead.

```js
// v4
app.get('/:file.:ext?', async (req, res) => {
  res.send('ok')
})

// v5
app.get('/:file{.:ext}', async (req, res) => {
  res.send('ok')
})
```

- Regexp characters are not supported. For example:

```js
app.get('/[discussion|page]/:slug', async (req, res) => {
  res.status(200).send('ok')
})
```

should be changed to:

```js
app.get(['/discussion/:slug', '/page/:slug'], async (req, res) => {
  res.status(200).send('ok')
})
```

- Some characters have been reserved to avoid confusion during upgrade (`()[]?+!`), use `\` to escape them.
- Parameter names now support valid JavaScript identifiers, or quoted like `:"this"`.

<h3 id="rejected-promises">Rejected promises handled from middleware and handlers</h3>

Request middleware and handlers that return rejected promises are now handled by forwarding the rejected value as an `Error` to the error handling middleware. This means that using `async` functions as middleware and handlers are easier than ever. When an error is thrown in an `async` function or a rejected promise is `await`ed inside an async function, those errors will be passed to the error handler as if calling `next(err)`.

Details of how Express handles errors is covered in the [error handling documentation](/en/guide/error-handling.html).

<h3 id="express.urlencoded">express.urlencoded</h3>

The `express.urlencoded` method makes the `extended` option `false` by default.

<h3 id="express.static.dotfiles">express.static dotfiles</h3>

In Express 5, the `express.static` middleware's `dotfiles` option now defaults to `"ignore"`. This is a change from Express 4, where dotfiles were served by default. As a result, files inside a directory that starts with a dot (`.`), such as `.well-known`, will no longer be accessible and will return a **404 Not Found** error. This can break functionality that depends on serving dot-directories, such as Android App Links, and Apple Universal Links.

Example of breaking code:

```js
// v4
app.use(express.static('public'))
```

After migrating to Express 5, a request to `/.well-known/assetlinks.json` will result in a **404 Not Found**.

To fix this, serve specific dot-directories explicitly using the `dotfiles: "allow"` option:

```js
// v5
app.use('/.well-known', express.static('public/.well-known', { dotfiles: 'allow' }))
app.use(express.static('public'))
```

This approach allows you to safely serve only the intended dot-directories while keeping the default secure behavior for other dotfiles, which remain inaccessible.

<h3 id="app.listen">app.listen</h3>

In Express 5, the `app.listen` method will invoke the user-provided callback function (if provided) when the server receives an error event. In Express 4, such errors would be thrown. This change shifts error-handling responsibility to the callback function in Express 5. If there is an error, it will be passed to the callback as an argument.
For example:

```js
const server = app.listen(8080, '0.0.0.0', (error) => {
  if (error) {
    throw error // e.g. EADDRINUSE
  }
  console.log(`Listening on ${JSON.stringify(server.address())}`)
})
```

<h3 id="app.router">app.router</h3>

`app.router` オブジェクトは、Express 4 で削除されましたが、Express 5 で復帰しました。アプリケーションが明示的にロードする必要があった Express 3 とは異なり、新しいバージョンでは、このオブジェクトは基本の Express ルーターの単なる参照です。 In the new version, this object is a just a reference to the base Express router, unlike in Express 3, where an app had to explicitly load it.

<h3 id="req.body">req.body</h3> 

The `req.body` property returns `undefined` when the body has not been parsed. In Express 4, it returns `{}` by default.

<h3 id="req.host">req.host</h3>

Express 4 では、`req.host` 関数は、ポート番号が存在する場合に、ポート番号を誤って削除していました。Express 5 では、ポート番号は維持されます。 In Express 5, the port number is maintained.

<h3 id="req.query">req.query</h3>

The `req.query` property is no longer a writable property and is instead a getter. The default query parser has been changed from "extended" to "simple".

<h3 id="res.clearCookie">res.clearCookie</h3>

The `res.clearCookie` method ignores the `maxAge` and `expires` options provided by the user.

<h3 id="res.status">res.status</h3>

The `res.status` method only accepts integers in the range of `100` to `999`, following the behavior defined by Node.js, and it returns an error when the status code is not an integer.

<h3 id="res.query">res.vary</h3>

The `res.vary` throws an error when the `field` argument is missing. In Express 4, if the argument was omitted, it gave a warning in the console

## 改善

<h3 id="res.render">res.render()</h3>

このメソッドは、すべてのビュー・エンジンに非同期動作を適用するようになり、同期実装を使用して推奨インターフェースに違反していたビュー・エンジンに起因するバグを回避します。

<h3 id="brotli-support">Brotli encoding support</h3>

Express 5 supports Brotli encoding for requests received from clients that support it.
