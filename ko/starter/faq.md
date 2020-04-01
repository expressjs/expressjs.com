---
layout: page
title: Express 자주 묻는 질문(FAQ)
menu: starter
lang: ko
---

# 자주 묻는 질문(FAQ)

## 애플리케이션을 어떻게 구조화해야 합니까?

이 질문에는 정확한 답이 없습니다. 그 답은
애플리케이션의 규모 및 참여하는 팀의 규모에 따라 달라질 수 있습니다. 최대한의
유연성을 유지하기 위하여, Express에는 구조에 대한 전제 조건이 없습니다.

라우트 및 기타 애플리케이션 특정 로직은 원하는 많큼 많은 파일에 존재할 수 있으며,
선호하는 모든 디렉토리 구조에 존재할 수 있습니다. 도움을 받으려면
다음의 예를 확인하십시오.

* [Route listings](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
* [Route map](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

또한, 이러한 패턴을 간략화할 수 있는 다음과 같은 Express용 써드파티 확장기능이 존재합니다.

* [Resourceful routing](https://github.com/expressjs/express-resource)

## 모델을 어떻게 정의해야 합니까?

Express에는 데이터베이스의 개념이 없습니다. 이러한 개념은
써드파티 Node 모듈에 따라 달라지며, 따라서 개발자는
거의 모든 데이터베이스를 사용할 수 있습니다.

모델 중심의 Express 기반 프레임워크에 대해서는 [LoopBack](http://loopback.io)을 참조하십시오.

## 어떻게 사용자를 인증할 수 있습니까?

인증은 또 다른 주관적인 영역이며, Express는
이에 관여하지 않습니다.  개발자는 자신이 원하는 어떠한 인증 체계라도 사용할 수 있습니다.
사용자 이름 / 비밀번호 체계에 대해서는 [이 예제](https://github.com/expressjs/express/tree/master/examples/auth)를 참조하십시오.


## Express는 어느 템플리트 엔진을 지원합니까?

Express는 `(path, locals, callback)` 시그니처를 준수하는 모든 템플리트 엔진을 지원합니다.
템플리트 엔진 인터페이스 및 캐싱을 정규화하려면
[consolidate.js](https://github.com/visionmedia/consolidate.js)
프로젝트를 참조하여 지원을 받으십시오. 목록에 포함되지 않은 템플리트 엔진이 Express 시그니처를 지원할 수도 있습니다.

## 404 응답을 어떻게 처리해야 합니까?

Express에서 404 응답은 오류로 인해 발생하는 결과가 아니며, 따라서
오류 핸들러(error-handler) 미들웨어는 이를 파악하지 않습니다. 이렇게 작동하는 이유는
404 응답은 단순히 실행해야 할 추가적인 작업이 없다는 것,
즉 Express는 모든 미들웨어 함수 및 라우트를 실행했으며 이들 중 어느 것도
응답하지 않았다는 것을 나타내기 때문입니다. 이를 처리하려면
다음과 같이 404 응답을 처리하기 위한 미들웨어 함수를 스택의 가장 아래(다른 모든 함수의 아래)에
추가하기만 하면 됩니다.

<pre>
<code class="language-javascript" translate="no">
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
</code>
</pre>

## 오류 핸들러를 어떻게 설정해야 합니까?

오류 처리 미들웨어는 다른 미들웨어와 동일한 방식으로 정의할 수 있지만,
다음과 같이 오류 처리 함수는 3개가 아닌 4개의 인수, 구체적으로 말하면 `(err, req, res, next)` 시그니처를 갖는다는 점이 다릅니다.

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

자세한 정보는 [오류 처리](/{{ page.lang }}/guide/error-handling.html)를 참조하십시오.

## 일반적인 HTML은 어떻게 렌더링해야 합니까?

렌더링할 필요가 없습니다! `res.render()` 함수를 이용해 HTML을 "렌더링"할 필요는 없습니다.
특정한 파일을 렌더링해야 하는 경우에는 `res.sendFile()` 함수를 사용하십시오.
하나의 디렉토리에서 여러 자산을 제공하는 경우에는 `express.static()`
미들웨어 함수를 사용하십시오.
