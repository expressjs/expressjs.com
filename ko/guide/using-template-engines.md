---
layout: page
title: Express와 함께 템플리트 엔진 사용
description: Discover how to integrate and use template engines like Pug, Handlebars, and EJS with Express.js to render dynamic HTML pages efficiently.
menu: guide
lang: ko
redirect_from: /guide/using-template-engines.html
---

# Express와 함께 템플리트 엔진을 사용

A _template engine_ enables you to use static template files in your application. At runtime, the template engine replaces
variables in a template file with actual values, and transforms the template into an HTML file sent to the client.
This approach makes it easier to design an HTML page.

The [Express application generator](/{{ page.lang }}/starter/generator.html) uses [Pug](https://pugjs.org/api/getting-started.html) as its default, but it also supports [Handlebars](https://www.npmjs.com/package/handlebars), and [EJS](https://www.npmjs.com/package/ejs), among others.

To render template files, set the following [application setting properties](/{{ page.lang }}/4x/api.html#app.set), in the default `app.js` created by the generator:

- `views`, 템플리트가 있는 디렉토리. 예: `app.set('views', './views')`
  This defaults to the `views` directory in the application root directory.
- `view engine`, 사용할 템플리트 엔진. 예: `app.set('view engine', 'pug')`

이후 그에 맞는 템플리트 엔진 npm 패키지를 다음과 같이 설치하십시오.

```bash
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
Express와 호환되는 템플리트 엔진(예: Pug)은 `__express(filePath, options, callback)`라는 이름의 함수를 내보내며, 이 함수는 `res.render()` 함수에 의해 호출되어 템플리트 코드를 렌더링합니다.

일부 템플리트 엔진은 이러한 방식을 따르지 않습니다. [Consolidate.js](https://www.npmjs.org/package/consolidate) 라이브러리는 널리 이용되고 있는 모든 Node.js 템플리트 엔진을 맵핑함으로써 이러한 방식을 따르므로 Express 내에서 완벽하게 작동합니다.

</div>

보기 엔진을 설정한 후에는 앱에서 엔진을 지정하거나 템플리트 엔진 모듈을 로드할 필요가 없으며, Express는 아래에 표시된 것과 같이 내부적으로 모듈을 로드합니다(위의 예에 대한 코드).

```js
app.set('view engine', 'pug')
```

다음의 내용이 입력된 `index.pug`라는 이름의 Pug 템플리트를 `views` 디렉토리에 작성하십시오.

```pug
html
  head
    title= title
  body
    h1= message
```

이후 `index.pug` 파일을 렌더링할 라우트를 작성하십시오. `view engine` 특성이 설정되어 있지 않은 경우에는 `view` 파일의 확장자를 지정해야 합니다. 해당 특성이 설정되어 있는 경우에는 확장자를 생략할 수 있습니다.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

홈 페이지에 대한 요청을 실행할 때, `index.pug` 파일은 HTML 형식으로 렌더링됩니다.

The view engine cache does not cache the contents of the template's output, only the underlying template itself. The view is still re-rendered with every request even when the cache is on.
