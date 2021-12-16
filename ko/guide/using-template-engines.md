---
layout: page
title: Express와 함께 템플리트 엔진 사용
menu: guide
lang: ko
---

# Express와 함께 템플리트 엔진을 사용

Express가 템플리트를 렌더링하려면 다음과 같은 애플리케이션 설정이 필요합니다.

* `views`, 템플리트가 있는 디렉토리. 예: `app.set('views', './views')`
* `view engine`, 사용할 템플리트 엔진. 예: `app.set('view engine', 'pug')`

이후 그에 맞는 템플리트 엔진 npm 패키지를 다음과 같이 설치하십시오.

```console
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
Express와 호환되는 템플리트 엔진(예: Pug)은 `__express(filePath, options, callback)`라는 이름의 함수를 내보내며, 이 함수는 `res.render()` 함수에 의해 호출되어 템플리트 코드를 렌더링합니다.

일부 템플리트 엔진은 이러한 방식을 따르지 않습니다. [Consolidate.js](https://www.npmjs.org/package/consolidate) 라이브러리는 널리 이용되고 있는 모든 Node.js 템플리트 엔진을 맵핑함으로써 이러한 방식을 따르므로 Express 내에서 완벽하게 작동합니다.
</div>

보기 엔진을 설정한 후에는 앱에서 엔진을 지정하거나 템플리트 엔진 모듈을 로드할 필요가 없으며, Express는 아래에 표시된 것과 같이 내부적으로 모듈을 로드합니다(위의 예에 대한 코드).

<pre>
<code class="language-javascript" translate="no">
app.set('view engine', 'pug');
</code>
</pre>

다음의 내용이 입력된 `index.pug`라는 이름의 Pug 템플리트를 `views` 디렉토리에 작성하십시오.

<pre>
<code class="language-javascript" translate="no">
html
  head
    title= title
  body
    h1= message
</code>
</pre>

이후 `index.pug` 파일을 렌더링할 라우트를 작성하십시오. `view engine` 특성이 설정되어 있지 않은 경우에는 `view` 파일의 확장자를 지정해야 합니다. 해당 특성이 설정되어 있는 경우에는 확장자를 생략할 수 있습니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>

홈 페이지에 대한 요청을 실행할 때, `index.pug` 파일은 HTML 형식으로 렌더링됩니다.

Express에서 템플리트 엔진이 작동하는 방식에 대한 자세한 내용을 확인하려면 ["Express용 템플리트 엔진 개발"](/{{ page.lang }}/advanced/developing-template-engines.html)을 참조하십시오.
