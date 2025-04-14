---
layout: page
title: Express에서 정적 파일 제공
description: Understand how to serve static files like images, CSS, and JavaScript in Express.js applications using the built-in 'static' middleware.
menu: starter
lang: ko
redirect_from: /starter/static-files.html
---

# Express에서 정적 파일 제공

이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 `express.static`을 사용하십시오.

The function signature is:

```js
express.static(root, [options])
```

The `root` argument specifies the root directory from which to serve static assets.
For more information on the `options` argument, see [express.static](/{{page.lang}}/4x/api.html#express.static).

예를 들면, 다음과 같은 코드를 이용하여 `public`이라는 이름의 디렉토리에 포함된 이미지, CSS 파일 및 JavaScript 파일을 제공하십시오.

```js
app.use(express.static('public'))
```

이제 다음과 같이 `public` 디렉토리에 포함된 파일을 로드할 수 있습니다.

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express는 정적 디렉토리에 대해 상대적으로 파일을 검색하며, 따라서 정적 디렉토리의 이름은 URL의 일부가 아닙니다.
</div>

여러 개의 정적 자산 디렉토리를 이용하려면 다음과 같이 `express.static` 미들웨어 함수를 여러 번 호출하십시오.

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express는 `express.static` 미들웨어 함수를 이용해 정적 디렉토리를 설정한 순서대로 파일을 검색합니다.

{% capture alert_content %}
For best results, [use a reverse proxy](/{{page.lang}}/advanced/best-practice-performance.html#use-a-reverse-proxy) cache to improve performance of serving static assets.
{% endcapture %}
{% include admonitions/note.html content=alert_content %}

`express.static` 함수를 통해 제공되는 파일에 대한 가상 경로 접두부(파일 시스템 내에 해당 경로가 실제로 존재하지 않는 경우)를 작성하려면, 아래에 표시된 것과 같이 정적 디렉토리에 대한 [마운트 경로를 지정](/{{ page.lang }}/4x/api.html#app.use)하십시오.

```js
app.use('/static', express.static('public'))
```

이제 `/static` 경로 접두부를 통해 `public` 디렉토리에 포함된 파일을 로드할 수 있습니다.

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

그러나 `express.static` 함수에 제공되는 경로는 `node` 프로세스가 실행되는 디렉토리에 대해 상대적입니다. Express 앱을 다른 디렉토리에서 실행하는 경우에는 다음과 같이 제공하기 원하는 디렉토리의 절대 경로를 사용하는 것이 더 안전합니다.

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

For more details about the `serve-static` function and its options, see  [serve-static](/resources/middleware/serve-static.html).

### [Previous: Basic Routing ](/{{ page.lang }}/starter/basic-routing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: More examples ](/{{ page.lang }}/starter/examples.html)
