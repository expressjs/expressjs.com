---
layout: page
title: Express 5로의 마이그레이션
description: A comprehensive guide to migrating your Express.js applications from version 4 to 5, detailing breaking changes, deprecated methods, and new improvements.
menu: guide
redirect_from: "  "
---

# Express 5로의 이전

<h2 id="overview">개요</h2>

Express 5는 Express 4와 크게 다르지 않으며, API에 대한 변경은 3.0에서 4.0으로의 변경만큼 크지 않습니다. 기본적인 API는 동일하게 유지되지만, 근본적인 변경사항이 존재합니다. 즉, Express 5를 사용하기 위해 기존 Express 4 프로그램을 업데이트하면 기존 Express 4 프로그램은 작동하지 않을 수 있습니다.

To install this version, you need to have a Node.js version 18 or higher. Then, execute the following command in your application directory:

```sh
npm install "express@5"
```

이후 자동화된 테스트를 실행하여 실패하는 항목을 확인하고, 아래에 나열된 업데이트에 따라 문제를 수정할 수 있습니다. 테스트 실패 항목을 처리한 후에는 앱을 실행하여 어떠한 오류가 발생하는지 확인하십시오. 지원되지 않는 메소드나 특성을 앱이 사용하는 경우에는 이를 곧바로 확인할 수 있습니다.

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

<h2 id="changes">Express 5에서의 변경사항</h2>

**제거된 메소드 및 특성**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">복수형의 메소드 이름</a></li>
  <li><a href="#leading">app.param(name, fn)에 대한 이름(name) 인수의 첫머리 콜론</a></li>
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

**개선된 항목**

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

**변경된 항목**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
  <li><a href="#brotli-support">Brotli encoding support</a></li>
</ul>

## 제거된 메소드 및 특성

앱에서 이러한 메소드 또는 특성 중 어느 하나라도 사용한다면 앱에서 충돌이 발생합니다. 따라서 버전 5로 업데이트한 후에는 앱을 변경해야 합니다.

<h3 id="app.del">app.del()</h3>

Express 5는 `app.del()` 함수를 더 이상 지원하지 않습니다. 이 함수를 사용하면 오류에 대한 예외 처리(throw)가 발생합니다. HTTP DELETE 라우트를 등록하려면 `app.delete()` 함수를 대신 사용하십시오.

`delete`는 JavaScript의 예약된 키워드이므로, 처음에는 `delete` 대신 `del`이 사용되었습니다. 그러나, ECMAScript 6을 기준으로, `delete` 및 다른 예약된 키워드를 정식 특성 이름으로 사용할 수 있게 되었습니다.

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

`app.param(fn)` 시그니처는 `app.param(name, fn)` 함수의 작동을 수정하는 데 사용되었습니다. 이 시그니처는 v4.11.0 이후 더 이상 사용되지 않았으며 Express 5에서는 전혀 지원되지 않습니다.

<h3 id="plural">복수형의 메소드 이름</h3>

다음과 같은 메소드 이름은 이제 복수형이 되었습니다. Express 4에서는 구버전의 메소드를 사용하면 사용 중단 경고가 표시되었습니다. Express 5는 구버전의 메소드를 전혀 지원하지 않습니다.

`req.acceptsLanguage()`는 `req.acceptsLanguages()`로 대체되었습니다.

`req.acceptsCharset()`는 `req.acceptsCharsets()`로 대체되었습니다.

`req.acceptsEncoding()`은 `req.acceptsEncodings()`로 대체되었습니다.

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

<h3 id="leading">app.param(name, fn)에 대한 이름(name)의 첫머리 콜론(:)</h3>

`app.param(name, fn)` 함수의 이름(name)의 첫머리 콜론 문자(:)는 Express 3의 잔존물이며, 하위 호환성을 위해 Express 4에서는 첫머리 콜론을 지원하면서 사용 중단 알림을 표시했습니다. Express 5는 아무런 메시지 표시 없이 첫머리 콜론을 무시하며, 콜론을 이용한 접두부가 없는 이름 매개변수를 사용합니다.

[app.param](/{{ page.lang }}/4x/api.html#app.param)에 대한 Express 4 문서에는 첫머리 콜론이 언급되어 있지 않으므로, 이 문서를 따라 앱을 작성한 경우에는 이 변경사항이 코드에 영향을 미치지 않을 것입니다.

<h3 id="req.param">req.param(name)</h3>

양식 데이터 검색을 위한 이 메소드는 혼란과 위험을 발생시킬 수 있으므로 제거되었습니다. 이제는 `req.params`, `req.body` 또는 `req.query` 오브젝트에서 제출된 매개변수 이름을 구체적으로 확인해야 합니다.

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

Express 5는 `res.json(obj, status)` 시그니처를 더 이상 지원하지 않습니다. 대신, 상태를 설정한 후 이를 `res.status(status).json(obj)`과 같은 `res.json()` 메소드에 체인해야 합니다.

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

Express 5는 `res.jsonp(obj, status)` 시그니처를 더 이상 지원하지 않습니다. 대신, 상태를 설정한 후 이를 `res.status(status).jsonp(obj)`와 같은 `res.jsonp()` 메소드에 체인해야 합니다.

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

Express 5는 `res.send(obj, status)` 시그니처를 더 이상 지원하지 않습니다. 대신, 상태를 설정한 후 이를 `res.status(status).send(obj)`와 같은 `res.send()` 메소드에 체인해야 합니다.

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

Express 5 no longer supports the signature `res.send(obj, status)`. Instead, set the status and then chain it to the `res.send()` method like this: `res.status(status).send(obj)`.

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

Express 5는 \*`status`\*가 숫자인 <code>res.send(<em>status</em>)</code> 시그니처를 더 이상 지원하지 않습니다. 대신, HTTP 응답 헤더 상태 코드를 설정하고 해당 코드의 텍스트 버전("Not Found", "Internal Server Error" 등)을 전송하는 `res.sendStatus(statusCode)` 함수를 사용해야 합니다.
`res.send()` 함수를 이용해 숫자를 전송해야 하는 경우, Express가 그 숫자를 지원되지 않는 구버전 시그니처 사용 시도로 해석하지 않도록 숫자의 앞뒤에 따옴표를 추가하여 숫자를 문자열로 변환하십시오.

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

Express 5에서 `res.sendfile()` 함수는 낙타 대문자(camel-cased) 버전인 `res.sendFile()`로 대체되었습니다.

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

The `router.param(fn)` signature was used for modifying the behavior of the `router.param(name, fn)` function. 이 시그니처는 v4.11.0 이후 더 이상 사용되지 않았으며 Express 5에서는 전혀 지원되지 않습니다.

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

## 변경된 항목

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

- Regexp characters are not supported. 예를 들면 다음과 같습니다.

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
예를 들면 다음과 같습니다.

```js
const server = app.listen(8080, '0.0.0.0', (error) => {
  if (error) {
    throw error // e.g. EADDRINUSE
  }
  console.log(`Listening on ${JSON.stringify(server.address())}`)
})
```

<h3 id="app.router">app.router</h3>

Express 4에서 제거되었던 `app.router` 오브젝트가 Express 5에 되돌아왔습니다. Express 3에서는 앱이 이 오브젝트를 명시적으로 로드해야 했던 것과 달리, 새 버전에서 이 오브젝트는 단순히 기본 Express 라우터에 대한 참조의 역할을 합니다.

<h3 id="req.body">req.body</h3> 

The `req.body` property returns `undefined` when the body has not been parsed. In Express 4, it returns `{}` by default.

<h3 id="req.host">req.host</h3>

Express 4에서, 포트 번호가 존재하는 경우 `req.host` 함수는 포트 번호를 올바르지 않게 제거했습니다. Express 5에서는 포트 번호가 유지됩니다.

<h3 id="req.query">req.query</h3>

The `req.query` property is no longer a writable property and is instead a getter. The default query parser has been changed from "extended" to "simple".

<h3 id="res.clearCookie">res.clearCookie</h3>

The `res.clearCookie` method ignores the `maxAge` and `expires` options provided by the user.

<h3 id="res.status">res.status</h3>

The `res.status` method only accepts integers in the range of `100` to `999`, following the behavior defined by Node.js, and it returns an error when the status code is not an integer.

<h3 id="res.query">res.vary</h3>

The `res.vary` throws an error when the `field` argument is missing. In Express 4, if the argument was omitted, it gave a warning in the console

## 개선된 항목

<h3 id="res.render">res.render()</h3>

이 메소드는 이제 모든 보기 엔진에 대해 비동기식 작동을 적용하며, 동기식 구현을 갖는 보기 엔진 및 권장되는 인터페이스를 위반하는 보기 엔진에 의한 버그의 발생을 방지합니다.

<h3 id="brotli-support">Brotli encoding support</h3>

Express 5 supports Brotli encoding for requests received from clients that support it.
