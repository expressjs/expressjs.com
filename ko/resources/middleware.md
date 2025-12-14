---
layout: middleware
title: Express 미들웨어
description: Explore a list of Express.js middleware modules maintained by the Express team and the community, including built-in middleware and popular third-party modules.
menu: resources
order: 3
redirect_from: "  "
module: mw-home
---

## Express 미들웨어

목록에 적힌 Express 미들웨어 모듈들은 [Expressjs 팀](https://github.com/orgs/expressjs/people)이 유지보수합니다.

| 미들웨어 모듈                                                                     | 설명                                                                                                                    |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [body-parser](/{{page.lang}}/resources/middleware/body-parser.html)         | HTTP 요청 body를 파싱합니다.                                                                                  |
| [compression](/{{page.lang}}/resources/middleware/compression.html)         | HTTP 요청들을 압축합니다.                                                                                      |
| [connect-rid](/{{page.lang}}/resources/middleware/connect-rid.html)         | 고유한 요청 ID를 생성합니다.                                                                                     |
| [cookie-parser](/{{page.lang}}/resources/middleware/cookie-parser.html)     | 쿠키 헤더를 파싱하고 `req.cookies`에 할당합니다. See also [cookies](https://github.com/jed/cookies). |
| [cookie-session](/{{page.lang}}/resources/middleware/cookie-session.html)   | 쿠키 기반의 세션을 만듭니다.                                                                                      |
| [cors](/{{page.lang}}/resources/middleware/cors.html)                       | 다양한 옵션들을 이용하여 Cross-origin resource sharing (CORS)를 활성화합니다.                        |
| [errorhandler](/{{page.lang}}/resources/middleware/errorhandler.html)       | 개발 중에 발생하는 에러를 핸들링하고 디버깅합니다.                                                                          |
| [method-override](/{{page.lang}}/resources/middleware/method-override.html) | 헤더를 이용해 HTTP method를 덮어씁니다.                                                                           |
| [morgan](/{{page.lang}}/resources/middleware/morgan.html)                   | HTTP 요청 로그를 남깁니다.                                                                                     |
| [multer](/{{page.lang}}/resources/middleware/multer.html)                   | multi-part 폼 데이터를 처리합니다.                                                                              |
| [response-time](/{{page.lang}}/resources/middleware/response-time.html)     | 응답 시간을 기록합니다.                                                                                         |
| [serve-favicon](/{{page.lang}}/resources/middleware/serve-favicon.html)     | Serve a favicon.                                                                                      |
| [serve-index](/{{page.lang}}/resources/middleware/serve-index.html)         | 주어진 경로의 디렉토리 리스트를 제공합니다.                                                                              |
| [serve-static](/{{page.lang}}/resources/middleware/serve-static.html)       | 정적 파일을 제공합니다.                                                                                         |
| [session](/{{page.lang}}/resources/middleware/session.html)                 | 서버 기반의 세션을 만듭니다 (개발 전용).                                                           |
| [timeout](/{{page.lang}}/resources/middleware/timeout.html)                 | Set a timeout perioHTTP request processing.                                                           |
| [vhost](/{{page.lang}}/resources/middleware/vhost.html)                     | 가상 도메인을 만듭니다.                                                                                         |

## 추가 미들웨어 모듈

These are some additional popular middleware modules.

{% include community-caveat.html %}

| 미들웨어 모듈                                             | 설명                                                                                                                                                        |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [helmet](https://github.com/helmetjs/helmet)        | 다양한 HTTP 헤더를 설정해 앱이 안전하게 도와줍니다.                                                                                                           |
| [passport](https://github.com/jaredhanson/passport) | OAuth, OpenID 같은 방법들을 사용하는 인증 체계입니다.  See [passportjs.org](https://passportjs.org/) for more information. |
