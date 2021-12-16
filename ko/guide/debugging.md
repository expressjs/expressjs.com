---
layout: page
title: Express 디버깅
menu: guide
lang: ko
---

# Express 디버깅

Express는 내부적으로 [debug](https://www.npmjs.com/package/debug) 모듈을
사용하여 라우트 일치, 사용 중인 미들웨어 함수, 애플리케이션 모드, 그리고 요청-응답 주기의
플로우에 대한 정보를 로그합니다.

<div class="doc-box doc-info" markdown="1">
`debug`는 `console.log`의 보강된 버전과도 같지만, `console.log`와는 달리
프로덕션 코드에서 `debug` 로그를 주석 처리할 필요가 없습니다. 로깅은 기본적으로 꺼져 있으며, `DEBUG` 환경 변수를 사용하여 조건부로 켤 수 있습니다.
</div>

Express에서 사용되는 모든 내부 로그를 확인하려면, 앱을 실행할 때 `DEBUG` 환경 변수를
`express:*`로 설정하십시오.

```console
$ DEBUG=express:* node index.js
```

Windows에서는 다음과 같은 명령을 사용하십시오.

```console
> set DEBUG=express:* & node index.js
```

[Express 생성기](/{{ page.lang }}/starter/generator.html)가 생성한 기본 앱에 대해 이 명령을 실행하면 다음과 같이 인쇄됩니다.

```console
$ DEBUG=express:* node ./bin/www
  express:router:route new / +0ms
  express:router:layer new / +1ms
  express:router:route get / +1ms
  express:router:layer new / +0ms
  express:router:route new / +1ms
  express:router:layer new / +0ms
  express:router:route get / +0ms
  express:router:layer new / +0ms
  express:application compile etag weak +1ms
  express:application compile query parser extended +0ms
  express:application compile trust proxy false +0ms
  express:application booting in development mode +1ms
  express:router use / query +0ms
  express:router:layer new / +0ms
  express:router use / expressInit +0ms
  express:router:layer new / +0ms
  express:router use / favicon +1ms
  express:router:layer new / +0ms
  express:router use / logger +0ms
  express:router:layer new / +0ms
  express:router use / jsonParser +0ms
  express:router:layer new / +1ms
  express:router use / urlencodedParser +0ms
  express:router:layer new / +0ms
  express:router use / cookieParser +0ms
  express:router:layer new / +0ms
  express:router use / stylus +90ms
  express:router:layer new / +0ms
  express:router use / serveStatic +0ms
  express:router:layer new / +0ms
  express:router use / router +0ms
  express:router:layer new / +1ms
  express:router use /users router +0ms
  express:router:layer new /users +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
```

이후 앱에 대한 요청이 이루어지면, Express 코드에 지정된 로그를 확인할 수 있습니다.

```console
  express:router dispatching GET / +4h
  express:router query  : / +2ms
  express:router expressInit  : / +0ms
  express:router favicon  : / +0ms
  express:router logger  : / +1ms
  express:router jsonParser  : / +0ms
  express:router urlencodedParser  : / +1ms
  express:router cookieParser  : / +0ms
  express:router stylus  : / +0ms
  express:router serveStatic  : / +2ms
  express:router router  : / +2ms
  express:router dispatching GET / +1ms
  express:view lookup "index.pug" +338ms
  express:view stat "/projects/example/views/index.pug" +0ms
  express:view render "/projects/example/views/index.pug" +1ms
```

라우터 구현의 로그만 확인하려면 `DEBUG`의 값을 `express:router`로 설정하십시오. 마찬가지로, 애플리케이션 구현의 로그만 확인하려면 `DEBUG`의 값을 `express:application`으로 설정하십시오. 나머지도 이와 같습니다.

## `express`를 통해 생성된 애플케이션

`express` 명령을 통해 생성된 애플리케이션 또한 `debug` 모듈을 사용하며, 이러한 애플리케이션의 디버그 네임스페이스의 범위는 애플리케이션의 이름으로 한정됩니다.

예를 들어 `$ express sample-app`을 통해 앱을 생성하는 경우에는 다음과 같은 명령을 통해 디버그 명령문을 사용할 수 있습니다.

```console
$ DEBUG=sample-app:* node ./bin/www
```

다음과 같이 쉼표로 구분된 이름 목록을 지정하면 2개 이상의 디버그 네임스페이스를 지정할 수 있습니다.

```console
$ DEBUG=http,mail,express:* node index.js
```

`debug`에 대한 자세한 정보는 [debug](https://www.npmjs.com/package/debug)를 참조하십시오.
