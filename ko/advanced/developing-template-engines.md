---
layout: page
title: Express용 템플릿 엔진 개발
menu: advanced
lang: ko
---

# Express용 템플릿 엔진 개발

`app.engine(ext, callback)` 메소드를 사용하면 자신만의 템플릿 엔진을 작성할 수 있습니다. `ext`는 파일 확장자를 나타내며, `callback`은 파일의 위치, 옵션 오브젝트 및 콜백 함수 등의 항목을 매개변수로 수락하는 템플릿 엔진 함수입니다.

다음의 코드는 `.ntl` 파일을 렌더링하기 위한 매우 간단한 템플릿 엔진을 구현하는 예입니다.

```js
const fs = require('fs') // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => { // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple template engine
    const rendered = content.toString().replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`)
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'ntl') // register the template engine
```

앱은 이제 `.ntl` 파일을 렌더링할 수 있습니다. 다음의 내용이 입력된 `index.ntl`이라는 이름의 파일을 `views` 디렉토리에 작성하십시오.

```text
#title#
#message#
```
이후 앱에 다음과 같은 라우트를 작성하십시오.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```
홈 페이지에 대한 요청을 실행할 때 `index.ntl`은 HTML로 렌더링됩니다.
