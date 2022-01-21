---
layout: page
title: Express "Hello World" 예제
menu: starter
lang: ko
---

# Hello world 예제

<div class="doc-box doc-info" markdown="1">
기본적으로 이 앱은 여러분이 작성할 수 있는 가장 간단한 Express 앱일 것입니다. 이 앱은 하나의 파일로 된 앱이며 [Express 생성기](/{{ page.lang }}/starter/generator.html)를 통해 얻게 되는 앱과는 같지 *않습니다*. (이 예제와 달리 Express 생성기를 통해 얻게 되는 앱은 다양한 목적을 위한 여러 JavaScript 파일, Jade 템플리트 및 하위 디렉토리를 포함하는 전체 앱에 대한 스캐폴딩을 작성합니다.)
</div>

먼저, `myapp`이라는 이름의 디렉토리를 작성한 후 이 디렉토리로 이동하여 `npm init`를 실행하십시오. 이후 [설치 안내서](/{{ page.lang }}/starter/installing.html)에 따라 `express`를 종속 항목으로서 설치하십시오.

`myapp` 디렉토리에 `app.js`라는 이름의 파일을 작성한 후 다음과 같은 코드를 추가하십시오.

<pre>
<code class="language-javascript" translate="no">
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
</code></pre>

앱은 서버를 시작하며 3000번 포트에서 연결을 청취합니다. 앱은 루트 URL(`/`) 또는 *라우트*에
대한 요청에 "Hello World!"로 응답합니다. 다른 모든 경로에 대해서는 **404 Not Found**로 응답합니다.

<div class="doc-box doc-notice" markdown="1">
`req`(요청) 및 `res`(응답)는 Node가 제공하는 동일한 오브젝트이며, 따라서
`req.pipe()`, `req.on('data', callback)` 그리고 Express의 관여가 필요 없는 다른 모든 항목을 호출할 수 있습니다.
</div>

다음의 명령을 이용하여 앱을 실행하십시오.

```console
$ node app.js
```

이후 브라우저에서 [http://localhost:3000/](http://localhost:3000/)을 로드하여 결과물을 확인하십시오.

