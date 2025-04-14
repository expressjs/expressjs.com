---
layout: page
title: Express 常見問題 (FAQ)
description: Find answers to frequently asked questions about Express.js, including topics on application structure, models, authentication, template engines, error handling, and more.
menu: starter
lang: zh-tw
redirect_from: /starter/faq.html
---

# 常見問題 (FAQ)

## 我該如何建立我的應用程式結構？

There is no definitive answer to this question. The answer depends
on the scale of your application and the team that is involved. To be as
flexible as possible, Express makes no assumptions in terms of structure.

Routes and other application-specific logic can live in as many files
as you wish, in any directory structure you prefer. View the following
examples for inspiration:

- [路由清單](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
- [路由對映](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC 樣式控制器](https://github.com/expressjs/express/tree/master/examples/mvc)

此外，Express 有一些協力廠商延伸，可簡化部分這些型樣：

- [express-resource 路由](https://github.com/expressjs/express-resource)

## 如何定義模型？

Express has no notion of a database. This concept is
left up to third-party Node modules, allowing you to
interface with nearly any database.

請參閱 [LoopBack](http://loopback.io)，取得以模組為中心的 Express 型架構。

## 如何鑑別使用者？

Authentication is another opinionated area that Express does not
venture into. You may use any authentication scheme you wish.
For a simple username / password scheme, see [this example](https://github.com/expressjs/express/tree/master/examples/auth).

## Express 支援哪些範本引擎？

Express 支援符合 `(path, locals, callback)` 簽章的任何範本引擎。若要使範本引擎介面和快取正規化，請參閱 [consolidate.js](https://github.com/visionmedia/consolidate.js) 專案，以取得支援。未列出的範本引擎可能仍支援 Express 簽章。
To normalize template engine interfaces and caching, see the
[consolidate.js](https://github.com/visionmedia/consolidate.js)
project for support. Unlisted template engines might still support the Express signature.

For more information, see [Using template engines with Express](/{{page.lang}}/guide/using-template-engines.html).

## 如何處理 404 回應？

In Express, 404 responses are not the result of an error, so
the error-handler middleware will not capture them. This behavior is
because a 404 response simply indicates the absence of additional work to do;
in other words, Express has executed all middleware functions and routes,
and found that none of them responded. All you need to
do is add a middleware function at the very bottom of the stack (below all other functions)
to handle a 404 response:

```js
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})
```

Add routes dynamically at runtime on an instance of `express.Router()`
so the routes are not superseded by a middleware function.

## 如何設定錯誤處理程式？

錯誤處理中介軟體的定義方式，與其他中介軟體相同，差別在於引數是四個而非三個，具體來說，就是使用 `(err, req, res, next)` 簽章：

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

如需相關資訊，請參閱[錯誤處理](/{{ page.lang }}/guide/error-handling.html)。

## 如何呈現一般 HTML？

You don't! 不需要！不需要用 `res.render()` 函數來「呈現」HTML。如果您有特定的檔案，請使用 `res.sendFile()` 函數。如果您會從目錄提供許多資產，請使用 `express.static()` 中介軟體函數。
If you have a specific file, use the `res.sendFile()` function.
If you are serving many assets from a directory, use the `express.static()`
middleware function.

## What version of Node.js does Express require?

- [Express 4.x](/{{ page.lang }}/4x/api.html) requires Node.js 0.10 or higher.
- [Express 5.x](/{{ page.lang }}/5x/api.html) requires Node.js 18 or higher.

### [Previous: More examples ](/{{ page.lang }}/starter/examples.html)
