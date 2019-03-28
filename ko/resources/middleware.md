---
layout: page
title: Express 미들웨어
menu: resources
lang: ko
redirect_from: "/resources/middleware.html"
module: mw-home
---

## Express 미들웨어

목록에 적힌 Express 미들웨어 모듈들은 [Expressjs 팀](https://github.com/orgs/expressjs/people)이 유지보수합니다.

| 미들웨어 모듈 | 설명 | 내장 함수 (Express 3)|
|---------------------------|---------------------|----------------------|
| [body-parser](/{{page.lang}}/resources/middleware/body-parser.html) | HTTP 요청 body를 파싱합니다. [body](https://github.com/raynos/body), [co-body](https://github.com/visionmedia/co-body), 그리고 [raw-body](https://github.com/stream-utils/raw-body)도 참고하세요. | express.bodyParser |
| [compression](/{{page.lang}}/resources/middleware/compression.html) | HTTP 요청들을 압축합니다. | express.compress |
| [connect-rid](/{{page.lang}}/resources/middleware/connect-rid.html) | 고유한 요청 ID를 생성합니다. | 없음 |
| [cookie-parser](/{{page.lang}}/resources/middleware/cookie-parser.html) | 쿠키 헤더를 파싱하고 `req.cookies`에 할당합니다. [cookies](https://github.com/jed/cookies)와 [keygrip](https://github.com/jed/keygrip)도 참고하세요. | express.cookieParser|
| [cookie-session](/{{page.lang}}/resources/middleware/cookie-session.html) | 쿠키 기반의 세션을 만듭니다.| express.cookieSession |
| [cors](/{{page.lang}}/resources/middleware/cors.html) | 다양한 옵션들을 이용하여 Cross-origin resource sharing (CORS)를 활성화합니다. | 없음 |
| [csurf](/{{page.lang}}/resources/middleware/csurf.html) | CSRF 취약점을 방어합니다.|express.csrf |
| [errorhandler](/{{page.lang}}/resources/middleware/errorhandler.html) | 개발 중에 발생하는 에러를 핸들링하고 디버깅합니다. |express.errorHandler |
| [method-override](/{{page.lang}}/resources/middleware/method-override.html) |헤더를 이용해 HTTP method를 덮어씁니다. |express.methodOverride |
| [morgan](/{{page.lang}}/resources/middleware/morgan.html) | HTTP 요청 로그를 남깁니다. | express.logger |
| [multer](/{{page.lang}}/resources/middleware/multer.html) | multi-part 폼 데이터를 처리합니다. | express.bodyParser |
| [response-time](/{{page.lang}}/resources/middleware/response-time.html) | 응답 시간을 기록합니다. |express.responseTime |
| [serve-favicon](/{{page.lang}}/resources/middleware/serve-favicon.html) | 파비콘을 제공합니다. |express.favicon |
| [serve-index](/{{page.lang}}/resources/middleware/serve-index.html) | 주어진 경로의 디렉토리 리스트를 제공합니다.| express.directory |
| [serve-static](/{{page.lang}}/resources/middleware/serve-static.html) | 정적 파일을 제공합니다. |express.static |
| [session](/{{page.lang}}/resources/middleware/session.html) | 서버 기반의 세션을 만듭니다 (개발 전용). | express.session |
| [timeout](/{{page.lang}}/resources/middleware/timeout.html) | HTTP 요청 처리를 위해 timeout을 만듭니다..|express.timeout |
| [vhost](/{{page.lang}}/resources/middleware/vhost.html) |가상 도메인을 만듭니다.|express.vhost|

## 추가 미들웨어 모듈

몇몇 유명한 외부 미들웨어 모듈들입니다.

{% include community-caveat.html %}

|미들웨어&nbsp;모듈 | 설명 |
|---------------------------|---------------------|
| [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus) | 이미지 제공을 최적화힙니다. 할 수 있다면 이미지를 `.webp`나 `.jxr`로 바꿉니다.|
| [express-debug](https://github.com/devoidfury/express-debug) | 템플릿 변수 (지역), 현재 세션, 기타 등등에 대한 정보를 제공하는 개발 도구입니다.|
| [express-partial-response](https://github.com/nemtsov/express-partial-response) | Filters out parts of JSON responses based on the `fields` query-string; Google API의 Partial Response를 활용합니다.|
| [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn) | Use a CDN for static assets, with multiple host support.|
| [express-slash](https://github.com/ericf/express-slash) | Handles routes with and without trailing slashes.|
| [express-stormpath](https://github.com/stormpath/stormpath-express) | User storage, authentication, authorization, SSO, and data security.|
| [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize) | Redirects HTTP requests containing uppercase to a canonical lowercase form.|
| [helmet](https://github.com/helmetjs/helmet) |Helps secure your apps by setting various HTTP headers.|
| [join-io](https://github.com/coderaiser/join-io) | Joins files on the fly to reduce the requests count.|
| [passport](https://github.com/jaredhanson/passport) | Authentication using "strategies" such as OAuth, OpenID and many others.  See [http://passportjs.org/](http://passportjs.org/) for more information.|
| [static-expiry](https://github.com/paulwalker/connect-static-expiry) | Fingerprint URLs or caching headers for static assets.|
| [view-helpers](https://github.com/madhums/node-view-helpers) | Common helper methods for views.|
| [sriracha-admin](https://github.com/hdngr/siracha) | Dynamically generate an admin site for Mongoose. |

For more middleware modules, see [http-framework](https://github.com/Raynos/http-framework#modules).
