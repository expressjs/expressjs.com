---
layout: page
title: Express 5로의 마이그레이션
menu: guide
lang: ko
---

# Express 5로의 이전

<h2 id="overview">개요</h2>

Express 5.0은 아직 알파 릴리스 단계에 있지만, 이 문서에서는 릴리스에 포함될 변경사항과 Express 4 앱을 Express 5로 마이그레이션하는 방법을 미리 살펴봅니다.

Express 5는 Express 4와 크게 다르지 않으며, API에 대한 변경은 3.0에서 4.0으로의 변경만큼 크지 않습니다.  기본적인 API는 동일하게 유지되지만, 근본적인 변경사항이 존재합니다. 즉, Express 5를 사용하기 위해 기존 Express 4 프로그램을 업데이트하면 기존 Express 4 프로그램은 작동하지 않을 수 있습니다.

Express 5의 최신 알파 버전을 설치하고 미리보려면, 애플리케이션 루트 디렉토리에서 다음의 명령을 입력하십시오.

```console
$ npm install express@5.0.0-alpha.2 --save
```console

이후 자동화된 테스트를 실행하여 실패하는 항목을 확인하고, 아래에 나열된 업데이트에 따라 문제를 수정할 수 있습니다. 테스트 실패 항목을 처리한 후에는 앱을 실행하여 어떠한 오류가 발생하는지 확인하십시오. 지원되지 않는 메소드나 특성을 앱이 사용하는 경우에는 이를 곧바로 확인할 수 있습니다.

<h2 id="changes">Express 5에서의 변경사항</h2>

아래에는 Express 사용자에게 영향을 미치는 변경사항(알파 2 릴리스 기준)의 목록이 표시되어 있습니다.
계획된 모든 기능의 목록을 확인하려면 [pull request](https://github.com/expressjs/express/pull/2237)를 참조하십시오.

**제거된 메소드 및 특성**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">복수형의 메소드 이름</a></li>
  <li><a href="#leading">app.param(name, fn)에 대한 이름(name) 인수의 첫머리 콜론</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**변경된 항목**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**개선된 항목**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>제거된 메소드 및 특성</h3>

앱에서 이러한 메소드 또는 특성 중 어느 하나라도 사용한다면 앱에서 충돌이 발생합니다. 따라서 버전 5로 업데이트한 후에는 앱을 변경해야 합니다.

<h4 id="app.del">app.del()</h4>

Express 5는 `app.del()` 함수를 더 이상 지원하지 않습니다. 이 함수를 사용하면 오류에 대한 예외 처리(throw)가 발생합니다. HTTP DELETE 라우트를 등록하려면 `app.delete()` 함수를 대신 사용하십시오.

`delete`는 JavaScript의 예약된 키워드이므로, 처음에는 `delete` 대신 `del`이 사용되었습니다. 그러나, ECMAScript 6을 기준으로, `delete` 및 다른 예약된 키워드를 정식 특성 이름으로 사용할 수 있게 되었습니다. `app.del` 함수 사용 중단의 요인이 된 토론을 여기서 읽을 수 있습니다.

<h4 id="app.param">app.param(fn)</h4>

`app.param(fn)` 시그니처는 `app.param(name, fn)` 함수의 작동을 수정하는 데 사용되었습니다. 이 시그니처는 v4.11.0 이후 더 이상 사용되지 않았으며 Express 5에서는 전혀 지원되지 않습니다.

<h4 id="plural">복수형의 메소드 이름</h4>

다음과 같은 메소드 이름은 이제 복수형이 되었습니다. Express 4에서는 구버전의 메소드를 사용하면 사용 중단 경고가 표시되었습니다.  Express 5는 구버전의 메소드를 전혀 지원하지 않습니다.

`req.acceptsCharset()`는 `req.acceptsCharsets()`로 대체되었습니다.

`req.acceptsEncoding()`은 `req.acceptsEncodings()`로 대체되었습니다.

`req.acceptsLanguage()`는 `req.acceptsLanguages()`로 대체되었습니다.

<h4 id="leading">app.param(name, fn)에 대한 이름(name)의 첫머리 콜론(:)</h4>

`app.param(name, fn)` 함수의 이름(name)의 첫머리 콜론 문자(:)는 Express 3의 잔존물이며, 하위 호환성을 위해 Express 4에서는 첫머리 콜론을 지원하면서 사용 중단 알림을 표시했습니다. Express 5는 아무런 메시지 표시 없이 첫머리 콜론을 무시하며, 콜론을 이용한 접두부가 없는 이름 매개변수를 사용합니다.

[app.param](/{{ page.lang }}/4x/api.html#app.param)에 대한 Express 4 문서에는 첫머리 콜론이 언급되어 있지 않으므로, 이 문서를 따라 앱을 작성한 경우에는 이 변경사항이 코드에 영향을 미치지 않을 것입니다.

<h4 id="req.param">req.param(name)</h4>

양식 데이터 검색을 위한 이 메소드는 혼란과 위험을 발생시킬 수 있으므로 제거되었습니다. 이제는 `req.params`, `req.body` 또는 `req.query` 오브젝트에서 제출된 매개변수 이름을 구체적으로 확인해야 합니다.

<h4 id="res.json">res.json(obj, status)</h4>

Express 5는 `res.json(obj, status)` 시그니처를 더 이상 지원하지 않습니다. 대신, 상태를 설정한 후 이를 `res.status(status).json(obj)`과 같은 `res.json()` 메소드에 체인해야 합니다.

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5는 `res.jsonp(obj, status)` 시그니처를 더 이상 지원하지 않습니다. 대신, 상태를 설정한 후 이를 `res.status(status).jsonp(obj)`와 같은 `res.jsonp()` 메소드에 체인해야 합니다.

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5는 `res.send(obj, status)` 시그니처를 더 이상 지원하지 않습니다. 대신, 상태를 설정한 후 이를 `res.status(status).send(obj)`와 같은 `res.send()` 메소드에 체인해야 합니다.

<h4 id="res.send.status">res.send(status)</h4>

Express 5는 *`status`*가 숫자인 <code>res.send(<em>status</em>)</code> 시그니처를 더 이상 지원하지 않습니다. 대신, HTTP 응답 헤더 상태 코드를 설정하고 해당 코드의 텍스트 버전("Not Found", "Internal Server Error" 등)을 전송하는 `res.sendStatus(statusCode)` 함수를 사용해야 합니다.
`res.send()` 함수를 이용해 숫자를 전송해야 하는 경우, Express가 그 숫자를 지원되지 않는 구버전 시그니처 사용 시도로 해석하지 않도록 숫자의 앞뒤에 따옴표를 추가하여 숫자를 문자열로 변환하십시오.

<h4 id="res.sendfile">res.sendfile()</h4>

Express 5에서 `res.sendfile()` 함수는 낙타 대문자(camel-cased) 버전인 `res.sendFile()`로 대체되었습니다.

<h3>변경된 항목</h3>

<h4 id="app.router">app.router</h4>

Express 4에서 제거되었던 `app.router` 오브젝트가 Express 5에 되돌아왔습니다. Express 3에서는 앱이 이 오브젝트를 명시적으로 로드해야 했던 것과 달리, 새 버전에서 이 오브젝트는 단순히 기본 Express 라우터에 대한 참조의 역할을 합니다.

<h4 id="req.host">req.host</h4>

Express 4에서, 포트 번호가 존재하는 경우 `req.host` 함수는 포트 번호를 올바르지 않게 제거했습니다. Express 5에서는 포트 번호가 유지됩니다.

<h4 id="req.query">req.query</h4>

Express 4.7 및 Express 5 버전 이상에서는, 조회 문자열 구문 분석 로직을 위해 자체적인 함수를 사용하기 원할 때 조회 문자열 구문 분석을 사용하지 않도록 하는 `false`를 조회 구문 분석기 옵션으로 사용할 수 있습니다.

<h3>개선된 항목</h3>

<h4 id="res.render">res.render()</h4>

이 메소드는 이제 모든 보기 엔진에 대해 비동기식 작동을 적용하며, 동기식 구현을 갖는 보기 엔진 및 권장되는 인터페이스를 위반하는 보기 엔진에 의한 버그의 발생을 방지합니다.
