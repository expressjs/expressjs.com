---
layout: page
title: Express 기본 라우팅
menu: starter
lang: ko
---

# 기본 라우팅

*라우팅*은 URI(또는 경로) 및 특정한 HTTP 요청 메소드(GET, POST 등)인 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것을 말합니다.

각 라우트는 하나 이상의 핸들러 함수를 가질 수 있으며, 이러한 함수는 라우트가 일치할 때 실행됩니다.

라우트 정의에는 다음과 같은 구조가 필요합니다.
<pre>
<code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code>
</pre>

여기서,

- `app`은 `express`의 인스턴스입니다.
- `METHOD`는 [HTTP 요청 메소드](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)입니다.
- `PATH`는 서버에서의 경로입니다.
- `HANDLER`는 라우트가 일치할 때 실행되는 함수입니다.

<div class="doc-box doc-notice" markdown="1">
이 학습서에서는 `app`이라는 이름의 `express` 인스턴스가 작성되며 서버가 실행 중인 것으로 가정합니다. 앱의 작성 및 시작에 익숙하지 않은 경우에는 [Hello world 예제](/{{ page.lang }}/starter/hello-world.html)를 참조하십시오.
</div>

다음 예에서는 간단한 라우트의 정의를 설명합니다.

홈 페이지에서 `Hello World!`로 응답:

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code>
</pre>

애플리케이션의 홈 페이지인 루트 라우트(`/`)에서 POST 요청에 응답:

<pre>
<code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
</code>
</pre>

`/user` 라우트에 대한 PUT 요청에 응답:

<pre>
<code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
</code>
</pre>

`/user` 라우트에 대한 DELETE 요청에 응답:

<pre>
<code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
</code>
</pre>

라우팅에 대한 자세한 내용을 확인하려면 [라우팅 안내서](/{{ page.lang }}/guide/routing.html)를 참조하십시오.
