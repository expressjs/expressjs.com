---
layout: page
title: 프로덕션 환경에서의 Express 사용을 위한 성능 우수 사례
menu: advanced
lang: ko
---

# 프로덕션 우수 사례: 성능 및 신뢰성

## 개요

이 문서에서는 프로덕션 환경에 배치된 Express 애플리케이션을 위한 성능 및 신뢰성 관련 우수 사례에 대해 논의합니다.

이 주제는 명백하게 "DevOps" 분야로 구분할 수 있으며 종래의 개발 및 운영 모두를 다룹니다. 따라서, 정보는 다음과 같은 두 개의 파트로 나뉘어 있습니다.


* [코드에서 수행할 항목](#code) (개발 파트):
  * [gzip 압축 사용](#use-gzip-compression)
  * [동기식 함수 사용하지 않기](#dont-use-synchronous-functions)
  * [정확한 로깅](#do-logging-correctly)
  * [올바른 예외 처리](#handle-exceptions-properly)
* [환경/설정에서 수행할 항목](#env) (운영 파트):
  * [NODE_ENV를 "production"으로 설정](#set-node_env-to-production)
  * [앱이 자동으로 다시 시작되도록 보장](#ensure-your-app-automatically-restarts)
  * [앱을 클러스터에서 실행](#run-your-app-in-a-cluster)
  * [요청 결과를 캐싱](#cache-request-results)
  * [로드 밸런서 사용](#use-a-load-balancer)
  * [역방향 프록시 사용](#use-a-reverse-proxy)

<a name="code"></a>

## 코드에서 수행할 항목

애플리케이션의 성능을 향상시키기 위해서 코드를 통해 할 수 있는 몇 가지는 다음과 같습니다.

 * [gzip 압축 사용](#use-gzip-compression)
 * [동기식 함수 사용하지 않기](#dont-use-synchronous-functions)
 * [정확한 로깅](#do-logging-correctly)
 * [올바른 예외 처리](#exceptions)


<a name="use-gzip-compression"></a>
### gzip 압축 사용

Gzip 압축을 사용하면 응답 본문의 크기를 크게 줄일 수 있으며, 따라서 웹 앱의 속도를 높일 수 있습니다. Express 앱에서 gzip 압축을 사용하려면 [compression](https://www.npmjs.com/package/compression) 미들웨어를 사용하십시오. 예를 들면 다음과 같습니다.

```js
const compression = require('compression')
const express = require('express')
const app = express()
app.use(compression())
```

많은 트래픽이 발생하는 프로덕션 환경의 웹사이트의 경우, 압축을 실행하는 가장 좋은 방법은 역방향 프록시 레벨에서 압축을 구현하는 것입니다([역방향 프록시 사용](#proxy) 참조). 그러한 경우에는 compression 미들웨어를 사용할 필요가 없습니다. Nginx에서 gzip 압축을 사용하는 방법에 대한 자세한 내용은 Nginx 문서의 [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html)을 참조하십시오.


<a name="dont-use-synchronous-functions"></a>
### 동기식 함수 사용하지 않기

동기식 함수 및 메소드는 리턴될 때까지 실행 프로세스를 묶어 둡니다. 동기식 함수에 대한 한 건의 호출은 몇 마이크로초 또는 밀리초 내에 리턴될 수도 있지만, 많은 트래픽이 발생하는 웹사이트에서 이러한 동기식 호출들이 합산되면 앱의 성능이 낮아집니다. 프로덕션 환경에서는 동기식 함수의 사용을 피하십시오.

Node 및 다수의 모듈은 동기식 및 비동기식 버전의 함수를 제공하지만, 프로덕션 환경에서는 항상 비동기식 버전을 사용하십시오. 동기식 함수의 사용이 정당화되는 유일한 경우는 초기 시작 시에 사용되는 경우입니다.

Node.js 4.0 이상 또는 io.js 2.1.0 이상을 사용하는 경우, `--trace-sync-io` 명령행 플래그를 사용하면 애플리케이션이 동기식 API를 사용할 때마다 경고 및 스택 추적이 출력되도록 수 있습니다. 물론, 프로덕션 환경에서 이러한 플래그를 실제로 사용해서는 안 되며, 이는 코드가 프로덕션 환경에서 사용될 준비가 되었다는 것을 보장하기 위한 것입니다. 자세한 정보는 [node 커맨드라인 옵션 문서](https://nodejs.org/api/cli.html#cli_trace_sync_io)를 참조하십시오.

<a name="do-logging-correctly"></a>
### 정확한 로깅

일반적으로 앱은 디버깅 그리고 앱 활동 로깅(사실상 디버깅 이외의 모든 것)이라는 두 가지 이유로 인해 로깅을 실행합니다. `console.log()` 또는 `console.err()`을 사용하여 터미널에 로그 메시지를 출력하는 것이 일반적인 개발 작업 방식입니다. 그러나 대상이 터미널 또는 파일인 경우 [이들 함수는 동기식으로 작동하며](https://nodejs.org/api/console.html#console_console_1), 따라서 다른 프로그램으로 출력을 전송하는 경우가 아니라면 이러한 함수는 프로덕션 환경에 적합하지 않습니다.

#### 디버깅을 위한 로깅

디버깅을 위해 로깅하는 경우에는 `console.log()`를 사용하는 대신 [debug](https://www.npmjs.com/package/debug)와 같은 특별한 디버깅 모듈을 사용하십시오. 이러한 모듈을 이용하면 DEBUG 환경 변수를 사용하여 디버그 메시지 발생 시 어떠한 디버그 메시지가 `console.err()`로 전송되는지 제어할 수 있습니다. 앱을 순수한 비동기식으로 유지하려면 `console.err()`을 다른 프로그램으로 전송해야 합니다. 그러나 아마도 프로덕션 단계에서 디버그를 수행할 필요는 없을 것입니다.

#### 앱 활동에 대한 로깅

앱 활동을 로깅하는 경우(예: 트래픽 또는 API 호출을 추적)에는 `console.log()`를 사용하는 대신 [Winston](https://www.npmjs.com/package/winston) 또는 [Bunyan](https://www.npmjs.com/package/bunyan)과 같은 로깅 라이브러리를 사용하십시오. 이 두 라이브러리에 대한 자세한 비교는 StrongLoop 블로그 게시물 [Comparing Winston and Bunyan Node.js Logging](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/)을 참조하십시오.

<a name="exceptions"></a>

### 올바른 예외 처리

Node 앱은 처리되지 않은 예외가 발생할 때 충돌이 발생합니다. 예외를 처리하지 않고 적절한 조치를 취하지 않으면 Express 앱에서 충돌이 발생하고 오프라인 상태가 됩니다. 아래의 [앱이 자동으로 다시 시작되도록 보장](#restart)의 조언을 따르면 앱은 충돌에서부터 복원될 것입니다. 다행히 Express 앱의 일반적인 시작 시간은 짧습니다. 그럼에도 불구하고, 먼저 앱의 충돌을 피하는 것이 중요하며, 이를 위해서는 예외를 올바르게 처리해야 합니다.

모든 예외를 처리하도록 보장하려면 다음의 기법을 사용하십시오.

* [try-catch 사용](#try-catch)
* [프미스 사용](#promises)

이 주제에 대해 자세히 살펴보기 전에 먼저 Node/Express의 오류 처리, 즉 오류 우선(error-first) 콜백의 사용 및 미들웨어를 통한 오류의 전파에 대한 기본적인 사항을 이해해야 합니다. Node는 비동기식 함수로부터 오류를 리턴하기 위해 "오류 우선 콜백" 방식을 사용하며, 여기서 콜백 함수의 첫 번째 매개변수는 오류 오브젝트이고 그 후속 매개변수에 결과 데이터가 뒤따릅니다. 오류가 없음을 나타낼 때는 첫 번째 매개변수로 널(null)을 전달합니다. 의미 있는 방식으로 오류를 처리하려면 콜백 함수는 이에 맞게 오류 우선 콜백 방식을 따라야 합니다. 그리고 Express에서의 우수 사례는 next() 함수를 사용하여 미들웨어 체인을 통해 오류를 전파하는 것입니다.

오류 처리의 기본사항 대한 자세한 내용은 다음을 참조하십시오.

* [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors)
* [Building Robust Node Applications: Error Handling](https://strongloop.com/strongblog/robust-node-applications-error-handling/)(StrongLoop 블로그)

#### 수행하지 않아야 하는 항목

수행하지 *않아야* 할 한 가지 항목은 예외가 이벤트 루프에까지 발생할 때 생성되는 `uncaughtException` 이벤트를 청취하는 것입니다. `uncaughtException`에 대한 이벤트 리스너를 추가하면 예외가 발생하는 프로세스의 기본 작동을 변경할 수 있으며, 해당 프로세스는 예외가 발생하더라도 계속하여 실행될 것입니다. 이러한 방법은 앱에서 충돌이 발생하는 것을 방지하는 좋은 방법인 것처럼 보일 수 있지만, 처리되지 않은 예외가 발생한 후에도 앱이 계속하여 실행되면 프로세스가 불안정하고 예측할 수 없는 상태가 되므로 이러한 방법은 위험한 작업 방식이며 권장되지 않습니다.

또한 `uncaughtException`을 사용하는 것은 [세련되지 못한 방식](https://nodejs.org/api/process.html#process_event_uncaughtexception)인 것으로 공식적으로 인식되고 있으며, 코어로부터 이러한 방식을 제거하는 방법이 [제안](https://github.com/nodejs/node-v0.x-archive/issues/2582)되어 있습니다. 따라서 `uncaughtException`을 청취하는 것은 좋은 생각이 아닙니다. 따라서 여러 프로세스 및 수퍼바이저의 사용 등을 권장하며, 오류로부터 복구되는 가장 안정적인 방법은 충돌이 발생한 후 다시 시작하는 것인 경우가 많습니다.

[도메인](https://nodejs.org/api/domain.html)의 사용 또한 권장하지 않습니다. 일반적으로 도메인은 문제를 해결하지 못하며, 더 이상 사용되지 않는 모듈입니다.

<a name="try-catch"></a>

#### try-catch 사용

Try-catch는 동기식 코드에서 예외를 처리하는 데 사용할 수 있는 JavaScript 언어 구조체입니다. 예를 들면, try-catch를 사용하여 아래와 같이 JSON 구문 분석 오류를 처리할 수 있습니다.

[JSHint](http://jshint.com/) 또는 [JSLint](http://www.jslint.com/)와 같은 도구를 사용하면 [정의되지 않은 변수에 대한 참조 오류](http://www.jshint.com/docs/options/#undef)와 같은 암시적인 예외를 발견하는 데 도움이 됩니다.

아래에는 try-catch를 사용하여 잠재적인 프로세스 충돌 예외를 처리하는 예가 표시되어 있습니다.
이 미들웨어 함수는 JSON 오브젝트이자 "params"라는 이름을 갖는 조회 필드를 수락합니다.

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params
    try {
      const jsonObj = JSON.parse(jsonStr)
      res.send('Success')
    } catch (e) {
      res.status(400).send('Invalid JSON string')
    }
  })
})
```

그러나 try-catch는 동기식 코드에 대해서만 작동합니다. Node 플랫폼은 기본적으로 비동기식이므로(특히, 프로덕션 환경의 경우), try-catch를 통해 많은 예외를 처리할 수는 없을 것입니다.

<a name="promises"></a>

#### 프로미스 사용

`then()`을 사용하는 비동기식 코드 블록 내에서는 프로미스를 통해 모든 예외(명시적 예외 및 암시적 예외 모두)를 처리할 수 있습니다. 프로미스 체인의 끝에 `.catch(next)`만 추가하면 됩니다. 예를 들면 다음과 같습니다.

```js
app.get('/', (req, res, next) => {
  // do some sync stuff
  queryDb()
    .then((data) => makeCsv(data)) // handle data
    .then((csv) => { /* handle csv */ })
    .catch(next)
})

app.use((err, req, res, next) => {
  // handle error
})
```

이제 모든 비동기식 오류 및 동기식 오류는 error 미들웨어로 전파됩니다.

그러나 주의해야 할 사항이 두 가지 있습니다.

1.  모든 비동기식 코드는 프로미스를 리턴해야 합니다(이미터 제외). 특정한 라이브러리가 프로미스를 리턴하지 않는 경우에는 [Bluebird.promisifyAll()](http://bluebirdjs.com/docs/api/promise.promisifyall.html)과 같은 헬퍼 함수를 사용하여 기본 오브젝트를 변환하십시오.
2.  이벤트 이미터(스트림 등)는 여전히 처리되지 않은 예외를 발생시킬 수 있습니다. 따라서 오류 이벤트를 올바르게 처리하고 있는지 확인하십시오. 예를 들면 다음과 같습니다.

```js
const wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrap(async (req, res, next) => {
  const company = await getCompanyById(req.query.id)
  const stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```


`wrap()` 함수는 거부된 프로미스를 캐치해서 에러를 첫번째 인수로 두고 `next()`를 호출합니다. 자세한 정보는 다음을 참조하십시오.
* [Asynchronous Error Handling in Express with Promises, Generators and ES7](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)

프로미스를 사용한 오류 처리에 대한 자세한 정보는 다음을 참조하십시오.
* [Promises in Node.js with Q – An Alternative to Callbacks](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/)

<a name="env"></a>

## 환경/설정에서 수행할 항목

앱의 성능을 향상시키기 위해서 시스템 환경에서 할 수 있는 몇 가지는 다음과 같습니다.

* [NODE_ENV를 "production"으로 설정](#set-node_env-to-production)
* [앱이 자동으로 다시 시작되도록 보장](#ensure-your-app-automatically-restarts)
* [앱을 클러스터에서 실행](#run-your-app-in-a-cluster)
* [요청 결과를 캐싱](#cache-request-results)
* [로드 밸런서 사용](#use-a-load-balancer)
* [역방향 프록시 사용](#proxy)

<a name="set-node_env-to-production"></a>
### NODE_ENV를 "production"으로 설정

NODE_ENV 환경 변수는 애플리케이션이 실행되는 환경(일반적으로 개발 환경 또는 프로덕션 환경)을 지정합니다. 성능을 향상시키기 위해 할 수 있는 가장 간단한 일 중 하나는 NODE_ENV를 "production"으로 설정하는 것입니다.

NODE_ENV를 "production"으로 설정하면 Express는 다음과 같이 동작합니다.

* 보기 템플리트를 캐싱.
* CSS 확장기능을 통해 생성된 CSS 파일을 캐싱.
* 더 간결한 오류 메시지를 생성.

[테스트 결과,](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/) NODE_ENV를 "production"으로 설정하기만 해도 앱 성능이 3배 향상되는 것으로 나타났습니다!

특정한 환경을 위한 코드를 작성하는 경우, `process.env.NODE_ENV`를 통해 NODE_ENV의 값을 확인할 수 있습니다. 환경 변수의 값을 확인하는 작업은 성능 저하를 유발하므로 이러한 작업은 낮은 빈도로 실행해야 한다는 점에 주의하십시오.

일반적으로 개발 시에는, 예를 들면 `export` 또는 `.bash_profile` 파일을 이용하여 대화식 쉘에서 환경 변수를 설정할 수 있습니다. 그러나 일반적으로 프로덕션 서버에서 이러한 방식을 이용해서는 안 되며, 대신 해당 OS의 init 시스템(systemd 또는 Upstart)을 사용해야 합니다. 다음 섹션에서 일반적인 init 시스템의 사용에 대한 자세한 내용을 확인할 수 있지만, NODE_ENV를 설정하는 것은 성능에 매우 중요하므로(또한 쉽게 실행할 수 있으므로) NODE_ENV의 설정을 여기서 강조합니다.

Upstart를 이용하는 경우, 작업 파일에 `env` 키워드를 사용하십시오. 예를 들면 다음과 같습니다.


```sh
# /etc/init/env.conf
 env NODE_ENV=production
```

자세한 정보는 [Upstart Intro, Cookbook and Best Practices](http://upstart.ubuntu.com/cookbook/#environment-variables)를 참조하십시오.

systemd를 이용하는 경우, 유닛 파일에 `Environment` 지시문을 사용하십시오. 예를 들면 다음과 같습니다.

```sh
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
```

자세한 정보는 [Using Environment Variables In systemd Units](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html)를 참조하십시오.

StrongLoop Process Manager를 이용하는 경우에는 [StrongLoop PM을 서비스로 설치할 때 환경 변수를 설정](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-Setenvironmentvariables)할 수도 있습니다.

<a name="ensure-your-app-automatically-restarts"></a>
### 앱이 자동으로 다시 시작되도록 보장

프로덕션 환경에서 애플리케이션이 오프라인 상태가 되어서는 절대로 안 됩니다. 따라서 앱에서 충돌이 발생하거나 서버 자체에서 충돌이 발생하는 경우 모두 앱이 다시 시작되도록 해야 합니다. 이러한 일 중 어느 하나라도 발생하지 않는 것이 바람직하지만, 현실적으로는 다음과 같은 방법을 통해 이 두 가지 만일의 사태를 처리해야 합니다.

* 앱에서 충돌이 발생하는 경우 프로세스 관리자를 사용하여 앱(및 Node)을 다시 시작.
* OS에서 충돌이 발생하는 경우 해당 OS에서 제공하는 init 시스템을 사용하여 프로세스 관리자를 다시 시작. 프로세스 관리자 없이도 init 시스템을 사용할 수 있습니다.

처리되지 않은 예외가 발생하는 경우 Node 애플리케이션에서 충돌이 발생합니다. 가장 먼저 해야 할 일은 앱의 테스트가 잘 이루어지도록 하고 앱이 모든 예외를 처리하도록 하는 것입니다(자세한 내용은 [올바른 예외 처리](#exceptions)를 참조). 그러나 하나의 안전 장치로서, 앱에서 충돌이 발생하는 경우에 앱이 자동으로 다시 시작되도록 하는 메커니즘을 실행하십시오.

#### 프로세스 관리자 사용

개발 시에는 단순히 명령행에서 `node server.js` 또는 이와 유사한 명령을 실행하여 앱을 시작했습니다. 그러나 프로덕션 환경에서 이러한 방식으로 앱을 실행하는 것은 매우 위험합니다. 앱에서 충돌이 발생하면 앱은 다시 시작될 때까지 오프라인 상태가 됩니다. 앱에서 충돌이 발생할 때 앱이 다시 시작되도록 하려면 프로세스 관리자를 사용하십시오. 프로세스 관리자는 애플리케이션을 위한 "컨테이너"이며, 배치 작업을 용이하게 하고, 높은 가용성을 제공하고, 런타임 시에 애플리케이션을 관리할 수 있도록 합니다.

앱에서 충돌이 발생할 때 앱이 다시 시작되도록 하는 것 이외에도, 프로세스 관리자를 통해 다음을 실행할 수 있습니다.

* 런타임 성능 및 자원 소비에 대한 통찰력을 획득.
* 성능 향상을 위해 설정을 동적으로 수정.
* 클러스터링을 제어(StrongLoop PM 및 pm2).

가장 널리 사용되는 Node용 프로세스 관리자는 다음과 같습니다.

* [StrongLoop Process Manager](http://strong-pm.io/)
* [PM2](https://github.com/Unitech/pm2)
* [Forever](https://www.npmjs.com/package/forever)

위 세 개의 프로세스 관리자에 대한 기능별 비교를 확인하려면 [http://strong-pm.io/compare/](http://strong-pm.io/compare/)를 참조하십시오. 세 프로세스 관리자 모두에 대한 자세한 내용은 [Express 앱용 프로세스 관리자](/{{ page.lang }}/advanced/pm.html)를 참조하십시오.

이러한 프로세스 관리자 중 어느 하나를 사용하면, 때때로 앱에서 충돌이 발생하는 경우에도, 충분히 앱이 지속적으로 작동하도록 할 수 있습니다.

그러나 StrongLoop PM은 구체적으로 프로덕션 배치 환경을 대상으로 하는 여러 기능을 갖추고 있습니다. StrongLoop PM 및 관련된 StrongLoop 도구를 사용하면 다음을 실행할 수 있습니다.

* 로컬 환경에서 앱을 빌드 및 패키징한 후 프로덕션 시스템에 안전하게 앱을 배치.
* 어떠한 이유로라도 앱에서 충돌이 발생할 경우 앱을 자동으로 다시 시작.
* 클러스터를 원격으로 관리.
* CPU 프로파일 및 힙 스냅샷을 확인하여 성능을 최적화하고 메모리 누수를 진단.
* 애플리케이션에 대한 성능 지표를 확인.
* Nginx 로드 밸런서에 대한 내장된 제어 기능을 통해 여러 호스트로 쉽게 확장.

아래에 설명된 것과 같이, init 시스템을 이용해 StrongLoop PM을 운영 체제 시스템으로서 설치하면 StrongLoop PM은 시스템이 다시 시작될 때 자동으로 다시 시작됩니다. 따라서 애플리케이션 프로세스 및 클러스터는 항상 작동 상태를 유지할 수 있습니다.

#### init 시스템 사용

신뢰성의 다음 단계는 서버가 다시 시작될 때 애플리케이션이 다시 시작되도록 하는 것입니다. 시스템은 여전히 여러 이유로 작동이 중단될 수 있습니다. 서버에서 충돌이 발생할 때 앱이 다시 시작되도록 하려면 OS에 내장된 init 시스템을 사용하십시오. 현재 사용되고 있는 두 가지 주요 init 시스템은 [systemd](https://wiki.debian.org/systemd) 및 [Upstart](http://upstart.ubuntu.com/)입니다.

Express 앱에 init 시스템을 사용하는 데에는 다음과 같은 두 가지 방법이 있습니다.

* 프로세스 관리자에서 앱을 실행한 후, init 시스템을 통해 프로세스 관리자를 서비스로서 설치하십시오. 프로세스 관리자는 앱에서 충돌이 발생할 때 앱을 자동으로 시작하고, init 시스템은 OS가 다시 시작될 때 프로세스 관리자를 다시 시작할 것입니다. 이러한 접근법은 권장되는 접근법입니다.
* init 시스템을 통해 직접 앱(및 Node)을 실행하십시오. 이 방법은 조금 더 간편하지만, 프로세스 관리자의 사용을 통한 추가적인 이점을 얻을 수 없습니다.

##### Systemd

Systemd는 Linux용 시스템 및 서비스 관리자입니다. 대부분의 주요 Linux 배포판은 systemd를 기본 init 시스템으로 도입했습니다.

systemd 서비스 구성 파일은 *유닛 파일(unit file)*로 불리며, 파일 이름이 .service로 끝납니다. Node 앱을 직접 관리하기 위한 유닛 파일의 예는 다음과 같습니다(굵은체로 표시된 텍스트를 해당 시스템 및 앱에 대한 값으로 바꾸십시오).

```sh
[Unit]
Description=Awesome Express App

[Service]
Type=simple
ExecStart=/usr/local/bin/node /projects/myapp/index.js
WorkingDirectory=/projects/myapp

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity

# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```
systemd에 대한 자세한 정보는 [systemd 참조 자료(man page)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html)를 참조하십시오.

##### systemd의 서비스로서의 StrongLoop PM

StrongLoop Process Manager는 쉽게 systemd의 서비스로서 설치할 수 있습니다. StrongLoop PM을 systemd의 서비스로서 설치한 후 서버가 다시 시작되면 StrongLoop PM이 자동으로 다시 시작되며, 이후 StrongLoop PM이 관리 중인 모든 앱이 다시 시작됩니다.

StrongLoop PM을 systemd의 서비스로서 설치하는 방법은 다음과 같습니다.

```console
$ sudo sl-pm-install --systemd
```

이후 다음과 같이 서비스를 시작하십시오.

```console
$ sudo sl-pm-install --systemd
```

자세한 정보는 [Setting up a production host(StrongLoop 문서)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHEL7+,Ubuntu15.04or15.10)를 참조하십시오.

##### Upstart

Upstart는 시스템 시작 시에 태스크 및 서비스를 시작하고, 시스템 종료 시에 태스크 및 서비스를 중지하고, 태스크 및 서비스를 감시할 수 있는 시스템 도구이며, 여러 Linux 배포판에서 사용할 수 있습니다. Express 앱 또는 프로세스 관리자를 서비스로서 구성하면, Express 앱 또는 프로세스 관리자에서 충돌이 발생할 때 Upstart가 Express 앱 또는 프로세스 관리자를 자동으로 다시 시작할 수 있습니다.

Upstart 서비스는 파일 이름이 `.conf`로 끝나는 작업 구성 파일("작업(job)"으로도 불림)에 정의됩니다. 다음 예는 기본 파일의 위치가 `/projects/myapp/index.js`인 "myapp"이라는 이름의 앱에 대해 "myapp"이라는 이름의 작업을 작성하는 방법을 나타냅니다.

다음의 내용이 입력된 `myapp.conf`라는 이름의 파일을 `/etc/init/`에 작성하십시오(굵은체로 표시된 텍스트를 해당 시스템 및 앱에 대한 값으로 바꾸십시오).

```sh
# When to start the process
start on runlevel [2345]

# When to stop the process
stop on runlevel [016]

# Increase file descriptor limit to be able to handle more requests
limit nofile 50000 50000

# Use production mode
env NODE_ENV=production

# Run as www-data
setuid www-data
setgid www-data

# Run from inside the app dir
chdir /projects/myapp

# The process to start
exec /usr/local/bin/node /projects/myapp/index.js

# Restart the process if it is down
respawn

# Limit restart attempt to 10 times within 10 seconds
respawn limit 10 10
```

참고: 이 스크립트를 실행하려면 Ubuntu 12.04-14.10에서 지원되는 Upstart 1.4 이상이 필요합니다.

이 작업은 시스템이 시작될 때 실행되도록 구성되었으므로 앱은 운영 체제와 함께 시작되며, 앱에서 충돌이 발생하거나 시스템의 작동이 중단되는 경우 앱이 자동으로 다시 시작됩니다.

앱을 자동으로 다시 시작하는 것 이외에도, Upstart를 이용하면 다음과 같은 명령을 사용할 수 있습니다.

* `start myapp` – 앱을 시작
* `restart myapp` – 앱을 다시 시작
* `stop myapp` – 앱을 중지

Upstart에 대한 자세한 정보는 [Upstart Intro, Cookbook and Best Practises](http://upstart.ubuntu.com/cookbook)를 참조하십시오.

##### Upstart의 서비스로서의 StrongLoop PM

StrongLoop Process Manager는 쉽게 Upstart의 서비스로 설치할 수 있습니다. StrongLoop PM을 Upstart의 서비스로 설치한 후 서버가 다시 시작되면 StrongLoop PM이 자동으로 다시 시작되며, 이후 StrongLoop PM이 관리 중인 모든 앱이 다시 시작됩니다.

StrongLoop PM을 Upstart 1.4의 서비스로서 설치하는 방법은 다음과 같습니다.


```console
$ sudo sl-pm-install
```

이후 다음과 같이 서비스를 실행하십시오.


```console
$ sudo /sbin/initctl start strong-pm
```

참고: Upstart 1.4를 지원하지 않는 시스템에서는 약간 다른 명령이 사용됩니다. 자세한 정보는 [Setting up a production host(StrongLoop 문서)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHELLinux5and6,Ubuntu10.04-.10,11.04-.10)를 참조하십시오.


<a name="run-your-app-in-a-cluster"></a>
### 앱을 클러스터에서 실행

멀티코어 시스템에서는 프로세스 클러스터를 실행하여 Node 앱의 성능을 여러 배 높일 수 있습니다. 클러스터는 해당 앱의 인스턴스를 여러 개 실행하여(이상적인 경우 각 CPU 코어에서 하나의 인스턴스를 실행) 인스턴스들 사이에서 로드 및 태스크를 분배합니다.

<!--![클러스터 API를 이용한 애플리케이션 인스턴스들 사이에서의 밸런싱](/images/clustering.png)-->

중요: 앱 인스턴스들은 별도의 프로세스로서 실행되므로 이러한 인스턴스들은 동일한 메모리 공간을 공유하지 않습니다. 즉, 오브젝트는 해당 앱의 각 인스턴스에 대한 로컬 오브젝트입니다. 따라서 애플리케이션 코드 내의 상태를 유지보수할 수 없습니다. 그러나 [Redis](http://redis.io/)와 같은 인메모리 데이터 저장소를 사용하면 세션과 관련된 데이터 및 상태를 저장할 수 있습니다. 이러한 주의사항은 기본적으로 여러 프로세스를 이용한 클러스터링 또는 여러 대의 실제 서버를 이용한 클러스터링 등 모든 형태의 수평적 확장에 적용됩니다.

클러스터화된 앱에서 작업자 프로세스는 나머지 프로세스에 영향을 미치지 않으면서 개별적으로 충돌이 발생할 수 있습니다. 성능상의 이점 이외에도, 실패 격리는 앱 프로세스 클러스터를 실행해야 하는 또 다른 이유가 됩니다. 한 작업자 프로세스에서 충돌이 발생할 때마다, 항상 반드시 해당 이벤트를 로깅하고 cluster.fork()를 이용해 새로운 프로세스를 복제생성하십시오.

#### Node의 cluster 모듈 사용

Node의 [cluster 모듈](https://nodejs.org/docs/latest/api/cluster.html)을 사용하면 클러스터링이 가능합니다. 이러한 클러스터링을 통해 마스터 프로세스는 여러 작업자 프로세스를 복제생성하고, 수신되는 연결을 여러 작업자 사이에서 분배할 수 있습니다. 그러나 이러한 모듈을 직접 사용하는 대신, 이를 자동으로 실행하는 여러 도구 중 하나를 사용하는 것이 훨씬 더 좋습니다. 이러한 도구의 예로는 [node-pm](https://www.npmjs.com/package/node-pm) 또는 [cluster-service](https://www.npmjs.com/package/cluster-service)가 있습니다.

#### StrongLoop PM 사용

애플리케이션을 StrongLoop Process Manager(PM)에 배치하면, 애플리케이션 코드를 수정하지 *않고도* 클러스터링을 활용할 수 있습니다.

StrongLoop Process Manager(PM)가 애플리케이션으로서 실행되면, StrongLoop PM은 시스템의 CPU 코어 수와 같은 수의 작업자를 갖는 클러스터 내에서 자신을 실행합니다. 사용자는 앱을 중지시키지 않고도 slc 명령행 도구를 이용해 수동으로 클러스터 내의 작업자 프로세스의 수를 변경할 수 있습니다.

예를 들어 prod.foo.com에 앱을 배치했으며 StrongLoop PM이 포트 8701(기본값)에서 청취하는 경우를 가정하면, 다음과 같이 slc를 이용해 클러스터의 크기를 8로 설정할 수 있습니다.

```console
$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8
```

StrongLoop PM을 이용한 클러스터링에 대한 자세한 정보는 StrongLoop 문서 내의 [Clustering](https://docs.strongloop.com/display/SLC/Clustering)을 참조하십시오.

#### PM2 사용

애플리케이션을 PM2에 배치하면, 애플리케이션 코드를 수정하지 *않고도* 클러스터링을 활용할 수 있습니다. 먼저 여러분의 [애플리케이션이 stateless인지](http://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps) 확실하게 해야합니다. 어떠한 로컬 데이터도 프로세스에 저장되지 않아야 합니다. (세션이나 웹소켓 같은 것들 말입니다).

PM2로 애플리케이션을 실행하고 있을 때, 특정한 수의 인스턴스에 실행하는 **클러스터 모드**를 켤 수 있습니다. 머신의 가용 CPU 수같은 것들이 특정한 수입니다. 애플리케이션을 끌 필요 없이 `pm2` 커맨드라인 명령을 이용해 클러스터에 있는 프로세스의 수를 직접 바꿀 수도 있습니다.

아래와 같은 방법으로 클러스터 모드를 킵니다.

```console
# Start 4 worker processes
$ pm2 start app.js -i 4
# Auto-detect number of available CPUs and start that many worker processes
$ pm2 start app.js -i max
```

이 수는 PM2 프로세스 파일 (`ecosystem.config.js`나 그와 유사한 파일) 안의 `exec_mode`를 `cluster`나 `instances`를 설정해서 수정될 수 있습니다.

실행이 시작되면, `app`으로 이름지어진 애플리케이션을 아래와 같은 방법으로 스케일링 할 수 있습니다.

```console
# Add 3 more workers
$ pm2 scale app +3
# Scale to a specific number of workers
$ pm2 scale app 2
```

PM2의 클러스터링에 관한 추가 정보는 PM2 문서의 [Cluster Mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/)를 참고해주세요.

<a name="cache-request-results"></a>
### 요청 결과를 캐싱

프로덕션 환경 내에서의 성능을 향상시키기 위한 또 다른 전략은 요청의 결과를 캐싱하여 앱이 동일한 요청을 반복적으로 제공하는 작업을 반복하지 않도록 하는 것입니다.

[Varnish](https://www.varnish-cache.org/) 또는 [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/)([Nginx Caching](https://serversforhackers.com/nginx-caching/) 또한 참조)와 같은 캐싱 서버를 이용하면 앱의 속도 및 성능을 크게 향상시킬 수 있습니다.


<a name="use-a-load-balancer"></a>
### 로드 밸런서 사용

앱의 최적화 수준에 상관없이, 하나의 인스턴스는 제한된 양의 로드 및 트래픽만을 처리할 수 있습니다. 앱을 확장하는 방법 중 하나는 해당 앱의 인스턴스를 여러 개 실행하고 로드 밸런서를 통해 트래픽을 분배하는 것입니다. 로드 밸런서를 설정하면 앱의 성능 및 속도를 향상시킬 수 있으며, 하나의 인스턴스를 이용할 때보다 훨씬 더 높은 수준으로 확장할 수 있습니다.

로드 밸런서는 일반적으로 여러 애플리케이션 인스턴스 및 서버에 대한 트래픽을 오케스트레이션하는 역방향 프록시입니다. [Nginx](http://nginx.org/en/docs/http/load_balancing.html) 또는 [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts)를 이용하면 앱에 대한 로드 밸런서를 쉽게 설정할 수 있습니다.

로드 밸런싱을 이용하는 경우, 특정한 세션 ID와 연관된 요청이 해당 요청을 발생시킨 프로세스에 연결되도록 해야 할 수도 있습니다. 이러한 경우는 *세션 선호도(session affinity)* 또는 *스티키 세션(sticky session)*으로 알려져 있으며, 세션 데이터를 위해 Redis와 같은 데이터 저장소를 사용하는 위의 제안을 통해 처리할 수도 있습니다(애플리케이션에 따라 다름). 토론을 위해서는 [Using multiple nodes](http://socket.io/docs/using-multiple-nodes/)를 참조하십시오.

#### Nginx 로드 밸런서와 함께 StrongLoop PM 사용

[StrongLoop Process Manager](http://strong-pm.io/)는 Nginx Controller와 통합될 수 있으며, 이를 통해 여러 호스트로 이루어진 프로덕션 환경 구성을 쉽게 구성할 수 있습니다. 자세한 정보는 [Scaling to multiple servers](https://docs.strongloop.com/display/SLC/Scaling+to+multiple+servers)(StrongLoop 문서)를 참조하십시오.
<a name="proxy"></a>

### 역방향 프록시 사용

역방향 프록시는 웹 앱의 프론트에 위치하며, 요청이 앱으로 전달되도록 할 뿐만 아니라 요청에 대한 지원 연산을 수행합니다. 이는 오류 페이지, 압축, 캐싱, 파일 제공, 로드 밸런싱 및 기타 여러 작업을 처리할 수 있습니다.

애플리케이션 상태를 알아야 할 필요가 없는 태스크를 역방향 프록시로 이양하면 Express는 더 적은 자원을 차지하게 되어 특성화된 애플리케이션 태스크를 수행할 수 있습니다. 따라서 프로덕션 환경에서는 [Nginx](https://www.nginx.com/) 또는 [HAProxy](http://www.haproxy.org/)와 같은 역방향 프록시 뒤에서 Express를 실행할 것을 권장합니다.
