---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Express 미들웨어
menu: resources
lang: ko
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# 써드파티 미들웨어

몇 가지 Express 미들웨어 모듈은 다음과 같습니다.

  - [body-parser](https://github.com/expressjs/body-parser): 이전에는 `express.bodyParser`, `json` 및 `urlencoded`였습니다.
  또한 다음을 참조하십시오.
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression):  이전에는 `express.compress`였습니다.
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus): 최적의 이미지 제공을 위한 Connect/Express 미들웨어 모듈입니다. 가능한 경우, 이미지를 `.webp` 또는 `.jxr`로 전환합니다.
  - [connect-timeout](https://github.com/expressjs/timeout): 이전에는 `express.timeout`이었습니다.
  - [cookie-parser](https://github.com/expressjs/cookie-parser): 이전에는 `express.cookieParser`였습니다.
  - [cookie-session](https://github.com/expressjs/cookie-session): 이전에는 `express.cookieSession`이었습니다.
  - [csurf](https://github.com/expressjs/csurf): 이전에는 `express.csrf`였습니다.
  - [errorhandler](https://github.com/expressjs/errorhandler): 이전에는 `express.errorHandler`였습니다.
  - [express-debug](https://github.com/devoidfury/express-debug): 분리된(unbotrusive) 개발 도구이며, 템플리트 변수(locals), 현재 세션 및 유용한 요청 데이터 등에 대한 정보가 포함된 탭을 애플리케이션에 추가합니다.
  - [express-partial-response](https://github.com/nemtsov/express-partial-response): `fields` 조회 문자열을 바탕으로 JSON 응답 부분을 필터링하기 위한 Express 미들웨어 모듈이며, Google API의 Partial Response를 사용합니다.
  - [express-session](https://github.com/expressjs/session): 이전에는 `express.session`이었습니다.
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn): 정적 자산에 대한 CDN을 사용하기 위한 Express 미들웨어 모듈이며, 여러 개의 호스트를 지원합니다(예: cdn1.host.com, cdn2.host.com).
  - [express-slash](https://github.com/ericf/express-slash): 후미의 슬래시에 대해 엄격한 개발자를 위한 Express 미들웨어 모듈입니다.
  - [express-stormpath](https://github.com/stormpath/stormpath-express): 사용자 스토리지, 인증, 권한 부여, SSO 및 데이터 보안을 위한 Express 미들웨어 모듈입니다.
  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize): 대문자가 포함된 HTTP 요청의 경로를 표준적인 소문자 형태로 재지정하기 위한 미들웨어 모듈입니다.
  - [helmet](https://github.com/helmetjs/helmet): 다양한 HTTP 헤더를 설정하여 앱을 보호하기 위한 모듈입니다.
  - [join-io](https://github.com/coderaiser/join-io "join-io"): 즉석에서 파일을 결합하여 요청 횟수를 줄이기 위한 모듈입니다.
  - [method-override](https://github.com/expressjs/method-override): 이전에는 `express.methodOverride`였습니다.
  - [morgan](https://github.com/expressjs/morgan):  이전에는 `logger`였습니다.
  - [passport](https://github.com/jaredhanson/passport): 인증을 위한 Express 미들웨어 모듈입니다.
  - [response-time](https://github.com/expressjs/response-time): 이전에는 `express.responseTime`이었습니다.
  - [serve-favicon](https://github.com/expressjs/serve-favicon): 이전에는 `express.favicon`이었습니다.
  - [serve-index](https://github.com/expressjs/serve-index): 이전에는 `express.directory`였습니다.
  - [serve-static](https://github.com/expressjs/serve-static): 정적 컨텐츠를 제공하기 위한 모듈입니다.
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry): 하나 이상의 외부 도멘인에 대한 지원 등 정적 자산을 위한, 지문이 채취된 URL 또는 캐싱 헤더입니다.
  - [vhost](https://github.com/expressjs/vhost): 이전에는 `express.vhost`였습니다.
  - [view-helpers](https://github.com/madhums/node-view-helpers): 보기에 대한 일반적인 헬퍼 메소드를 제공하는 Express 미들웨어 모듈입니다.
  - [sriracha-admin](https://github.com/hdngr/siracha): Mongoose를 위한 관리 사이트를 동적으로 생성하는 Express 미들웨어 모듈입니다.

Connect/Express 팀은 이전에 Connect와 함께 포함되어 있었던 일부 미들웨어 모듈을 더 이상 지원하지 않습니다. 이러한 모듈은 대안적인 모듈로 대체되었으며, 그렇지 않은 경우에는 더 나은 모듈로 대체해야 합니다. 다음의 대안 중 하나를 사용하십시오.

  - express.cookieParser
    - [cookies](https://github.com/jed/cookies) 및 [keygrip](https://github.com/jed/keygrip)
  - express.limit
    - [raw-body](https://github.com/stream-utils/raw-body)
  - express.multipart
    - [connect-busboy](https://github.com/mscdex/connect-busboy)
    - [multer](https://github.com/expressjs/multer)
    - [connect-multiparty](https://github.com/superjoe30/connect-multiparty)
  - express.query
    - [qs](https://github.com/visionmedia/node-querystring)
  - express.staticCache
    - [st](https://github.com/isaacs/st)
    - [connect-static](https://github.com/andrewrk/connect-static)

추가적인 미들웨어 모듈을 확인하려면 다음을 참조하십시오.

 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
