---
layout: page
title: Express 용어집
menu: resources
lang: ko
---

# 용어집

### 라우터(router)

API 참조의 [라우터](/{{ page.lang }}/4x/api.html#router)를 참조하십시오.

### 라우트(route)

자원을 식별하는 URL의 일부입니다.  예를 들면, `http://foo.com/products/id`에서 "/products/id"가 라우트입니다.

### 미들웨어(middleware)

최종 요청 핸들러 이전의 Express 라우팅 계층에 의해 호출되는 함수이며, 따라서 원시 요청과 의도된 최종 라우트 사이의 미들웨어에 위치합니다.  미들웨어와 관련된 용어의 몇 가지 요점은 다음과 같습니다.

  * `var foo = require('middleware')`는 Node.js 모듈을 *요구* 또는 *사용*하는 것으로 일컬어집니다. 이후 `var mw = foo()` 명령문은 일반적으로 미들웨어를 리턴합니다.
  * `app.use(mw)`는 *미들웨어를 전역 처리 스택에 추가*하는 것으로 일컬어집니다.
  * `app.get('/foo', mw, function (req, res) { ... })`는 *미들웨어를 "GET /foo" 처리 스택에 추가*하는 것으로 일컬어집니다.

### 애플리케이션(application)

일반적으로, 특정한 목적의 연산을 수행하도록 설계된 하나 이상의 프로그램입니다.  Express의 컨텍스트에서는, Node.js 플랫폼에서 실행되며 Express API를 사용하는 프로그램을 말합니다.  또한 [앱 오브젝트](/{{ page.lang }}/api.html#express)를 지칭할 수도 있습니다.

### 오픈 소스(open-source, open source)

영문에서 형용사로 사용될 때는 하이픈이 사용됩니다. (예: "이 소프트웨어는 오픈 소스 소프트웨어입니다" [Wikipedia의 Open-source software](http://en.wikipedia.org/wiki/Open-source_software)를 참조하십시오.) 참고로 영문에서 이 용어에 하이픈이 사용되지 않는 경우가 흔하지만, 여기서는 합성 형용사에 하이픈을 추가하는 표준 영문 규칙을 사용합니다.

### 요청(request)

HTTP 요청입니다.  클라이언트는 HTTP 요청 메시지를 서버에 제출하며, 서버는 응답을 리턴합니다.  요청은 여러 [요청 메소드](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) 중 하나를 사용해야 합니다(예: GET, POST 등).

### 응답(response)

HTTP 응답입니다. 서버는 HTTP 응답 메시지를 클라이언트에 리턴합니다. 응답에는 요청에 대한 완료 상태 정보가 포함되어 있으며 응답 메시지 본문에는 요청된 컨텐츠가 포함되어 있을 수도 있습니다.

### API

애플리케이션 프로그래밍 인터페이스(Application Programming Interface)입니다.  이 용어를 최초로 사용할 때는 약어를 풀어서 기재하십시오.

### Express

Node.js 애플리케이션을 위한 빠르고 개방적인 간결한 웹 프레임워크입니다.  일반적으로 "Express.js"보다 "Express"가 선호되지만, "Express.js"도 허용됩니다.

### libuv

비동기식 I/O에 초점을 둔 멀티플랫폼 지원 라이브러리이며, 주로 Node.js에 의해 사용되도록 개발됩니다.

### Node.js

확장 가능한 네트워크 애플리케이션을 개발하는 데 사용되는 소프트웨어 플랫폼입니다. Node.js는 JavaScript를 스크립팅 언어로 사용하며, 방해하지 않는 I/O 및 단일 스레드 이벤트 루프를 통해 높은 처리량을 달성합니다.  [nodejs.org](http://nodejs.org/)를 참조하십시오. **활용 참고**: 최초에는 "Node.js"였으며 이후 "Node"가 되었습니다.
