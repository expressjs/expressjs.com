---
layout: page
title: 프로덕션 환경에서의 Express 사용을 위한 성능 우수 사례
description: Express 애플리케이션의 프로덕션 환경에서 성능과 안정성을 최적화하기 위한 모범 사례를 알아봅니다. 여기에는 코드 최적화와 최적의 성능을 위한 환경 설정이 포함됩니다.
menu: advanced
lang: ko
redirect_from: "  "
---

# 프로덕션 우수 사례: 성능 및 신뢰성

이 문서에서는 프로덕션 환경에 배치된 Express 애플리케이션을 위한 성능 및 신뢰성 관련 우수 사례에 대해 논의합니다.

이 주제는 명백하게 "DevOps" 분야로 구분할 수 있으며 종래의 개발 및 운영 모두를 다룹니다. 따라서, 정보는 다음과 같은 두 개의 파트로 나뉘어 있습니다.

- [코드에서 수행할 항목](#code) (개발 파트):
  - [gzip 압축 사용](#use-gzip-compression)
  - [동기식 함수 사용하지 않기](#dont-use-synchronous-functions)
  - [정확한 로깅](#do-logging-correctly)
  - [올바른 예외 처리](#exceptions)
- [환경/설정에서 수행할 항목](#env) (운영 파트):
  - [NODE_ENV를 "production"으로 설정](#set-node_env-to-production)
  - [앱이 자동으로 다시 시작되도록 보장](#ensure-your-app-automatically-restarts)
  - [앱을 클러스터에서 실행](#run-your-app-in-a-cluster)
  - [요청 결과를 캐싱](#cache-request-results)
  - [로드 밸런서 사용](#use-a-load-balancer)
  - [역방향 프록시 사용](#proxy)

## Things to do in your code {#in-code}

애플리케이션의 성능을 향상시키기 위해서 코드를 통해 할 수 있는 몇 가지는 다음과 같습니다.

- [gzip 압축 사용](#use-gzip-compression)
- [동기식 함수 사용하지 않기](#dont-use-synchronous-functions)
- [정확한 로깅](#do-logging-correctly)
- [올바른 예외 처리](#exceptions)

### gzip 압축 사용

Gzip 압축을 사용하면 응답 본문의 크기를 크게 줄일 수 있으며, 따라서 웹 앱의 속도를 높일 수 있습니다. Express 앱에서 gzip 압축을 사용하려면 [compression](https://www.npmjs.com/package/compression) 미들웨어를 사용하십시오. 예를 들면 다음과 같습니다.

```js
const compression = require('compression')
const express = require('express')
const app = express()

app.use(compression())
```

많은 트래픽이 발생하는 프로덕션 환경의 웹사이트의 경우, 압축을 실행하는 가장 좋은 방법은 역방향 프록시 레벨에서 압축을 구현하는 것입니다([역방향 프록시 사용](#proxy) 참조). 그러한 경우에는 compression 미들웨어를 사용할 필요가 없습니다. Nginx에서 gzip 압축을 사용하는 방법에 대한 자세한 내용은 Nginx 문서의 [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html)을 참조하십시오.

### 동기식 함수 사용하지 않기

동기식 함수 및 메소드는 리턴될 때까지 실행 프로세스를 묶어 둡니다. 동기식 함수에 대한 한 건의 호출은 몇 마이크로초 또는 밀리초 내에 리턴될 수도 있지만, 많은 트래픽이 발생하는 웹사이트에서 이러한 동기식 호출들이 합산되면 앱의 성능이 낮아집니다. 프로덕션 환경에서는 동기식 함수의 사용을 피하십시오.

Node 및 다수의 모듈은 동기식 및 비동기식 버전의 함수를 제공하지만, 프로덕션 환경에서는 항상 비동기식 버전을 사용하십시오. 동기식 함수의 사용이 정당화되는 유일한 경우는 초기 시작 시에 사용되는 경우입니다.

애플리케이션이 동기 API를 사용할 때마다 경고 메시지와 스택 트레이스를 출력하려면 --trace-sync-io 명령줄 플래그를 사용할 수 있습니다. 물론, 프로덕션 환경에서 이러한 플래그를 실제로 사용해서는 안 되며, 이는 코드가 프로덕션 환경에서 사용될 준비가 되었다는 것을 보장하기 위한 것입니다. 자세한 정보는 [node 커맨드라인 옵션 문서](https://nodejs.org/api/cli.html#cli_trace_sync_io)를 참조하십시오.

### Do logging correctly

일반적으로 앱은 디버깅 그리고 앱 활동 로깅(사실상 디버깅 이외의 모든 것)이라는 두 가지 이유로 인해 로깅을 실행합니다. `console.log()` 또는 `console.err()`을 사용하여 터미널에 로그 메시지를 출력하는 것이 일반적인 개발 작업 방식입니다. 단, [이 함수들은](https://nodejs.org/api/console.html#console) 출력 대상이 터미널이나 파일일 경우 동기적으로 동작하므로, 출력 결과를 다른 프로그램으로 파이프하지 않는 이상 프로덕션 환경에서는 적합하지 않습니다.

#### For debugging

디버깅을 위해 로깅하는 경우에는 `console.log()`를 사용하는 대신 [debug](https://www.npmjs.com/package/debug)와 같은 특별한 디버깅 모듈을 사용하십시오. 이러한 모듈을 이용하면 DEBUG 환경 변수를 사용하여 디버그 메시지 발생 시 어떠한 디버그 메시지가 `console.err()`로 전송되는지 제어할 수 있습니다. 앱을 순수한 비동기식으로 유지하려면 `console.err()`을 다른 프로그램으로 전송해야 합니다. 그러나 아마도 프로덕션 단계에서 디버그를 수행할 필요는 없을 것입니다.

#### For app activity

If you're logging app activity (for example, tracking traffic or API calls), instead of using `console.log()`, use a logging library like [Pino](https://www.npmjs.com/package/pino), which is the fastest and most efficient option available.

### 올바른 예외 처리

Node 앱은 처리되지 않은 예외가 발생할 때 충돌이 발생합니다. 예외를 처리하지 않고 적절한 조치를 취하지 않으면 Express 앱에서 충돌이 발생하고 오프라인 상태가 됩니다. 아래의 [앱이 자동으로 다시 시작되도록 보장](#restart)의 조언을 따르면 앱은 충돌에서부터 복원될 것입니다. 다행히 Express 앱의 일반적인 시작 시간은 짧습니다. 그럼에도 불구하고, 먼저 앱의 충돌을 피하는 것이 중요하며, 이를 위해서는 예외를 올바르게 처리해야 합니다.

모든 예외를 처리하도록 보장하려면 다음의 기법을 사용하십시오.

- [try-catch 사용](#try-catch)
- [프로미스 사용](#promises)

이 주제에 대해 자세히 살펴보기 전에 먼저 Node/Express의 오류 처리, 즉 오류 우선(error-first) 콜백의 사용 및 미들웨어를 통한 오류의 전파에 대한 기본적인 사항을 이해해야 합니다. Node는 비동기식 함수로부터 오류를 리턴하기 위해 "오류 우선 콜백" 방식을 사용하며, 여기서 콜백 함수의 첫 번째 매개변수는 오류 오브젝트이고 그 후속 매개변수에 결과 데이터가 뒤따릅니다. 오류가 없음을 나타낼 때는 첫 번째 매개변수로 널(null)을 전달합니다. 의미 있는 방식으로 오류를 처리하려면 콜백 함수는 이에 맞게 오류 우선 콜백 방식을 따라야 합니다. 그리고 Express에서의 우수 사례는 next() 함수를 사용하여 미들웨어 체인을 통해 오류를 전파하는 것입니다.

오류 처리의 기본사항 대한 자세한 내용은 다음을 참조하십시오.

- [Error Handling in Node.js](https://www.tritondatacenter.com/node-js/production/design/errors)

#### try-catch 사용

Try-catch는 동기식 코드에서 예외를 처리하는 데 사용할 수 있는 JavaScript 언어 구조체입니다. 예를 들면, try-catch를 사용하여 아래와 같이 JSON 구문 분석 오류를 처리할 수 있습니다.

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

#### 프로미스 사용

When an error is thrown in an `async` function or a rejected promise is awaited inside an `async` function, those errors will be passed to the error handler as if calling `next(err)`

```js
app.get('/', async (req, res, next) => {
  const data = await userData() // If this promise fails, it will automatically call `next(err)` to handle the error.

  res.send(data)
})

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message })
})
```

Also, you can use asynchronous functions for your middleware, and the router will handle errors if the promise fails, for example:

```js
app.use(async (req, res, next) => {
  req.locals.user = await getUser(req)

  next() // This will be called if the promise does not throw an error.
})
```

Best practice is to handle errors as close to the site as possible. So while this is now handled in the router, it’s best to catch the error in the middleware and handle it without relying on separate error-handling middleware.

#### What not to do

수행하지 _않아야_ 할 한 가지 항목은 예외가 이벤트 루프에까지 발생할 때 생성되는 `uncaughtException` 이벤트를 청취하는 것입니다. `uncaughtException`에 대한 이벤트 리스너를 추가하면 예외가 발생하는 프로세스의 기본 작동을 변경할 수 있으며, 해당 프로세스는 예외가 발생하더라도 계속하여 실행될 것입니다. 이러한 방법은 앱에서 충돌이 발생하는 것을 방지하는 좋은 방법인 것처럼 보일 수 있지만, 처리되지 않은 예외가 발생한 후에도 앱이 계속하여 실행되면 프로세스가 불안정하고 예측할 수 없는 상태가 되므로 이러한 방법은 위험한 작업 방식이며 권장되지 않습니다.

또한 `uncaughtException`을 사용하는 것은 [세련되지 못한 방식](https://nodejs.org/api/process.html#process_event_uncaughtexception)인 것으로 공식적으로 인식되고 있으며, 코어로부터 이러한 방식을 제거하는 방법이 [제안](https://github.com/nodejs/node-v0.x-archive/issues/2582)되어 있습니다. 따라서 `uncaughtException`을 청취하는 것은 좋은 생각이 아닙니다. 따라서 여러 프로세스 및 수퍼바이저의 사용 등을 권장하며, 오류로부터 복구되는 가장 안정적인 방법은 충돌이 발생한 후 다시 시작하는 것인 경우가 많습니다.

[도메인](https://nodejs.org/api/domain.html)의 사용 또한 권장하지 않습니다. 일반적으로 도메인은 문제를 해결하지 못하며, 더 이상 사용되지 않는 모듈입니다.

## 환경/설정에서 수행할 항목

앱의 성능을 향상시키기 위해서 시스템 환경에서 할 수 있는 몇 가지는 다음과 같습니다.

- [NODE_ENV를 "production"으로 설정](#set-node_env-to-production)
- [앱이 자동으로 다시 시작되도록 보장](#ensure-your-app-automatically-restarts)
- [앱을 클러스터에서 실행](#run-your-app-in-a-cluster)
- [요청 결과를 캐싱](#cache-request-results)
- [로드 밸런서 사용](#use-a-load-balancer)
- [역방향 프록시 사용](#proxy)

### NODE_ENV를 "production"으로 설정

NODE_ENV 환경 변수는 애플리케이션이 실행되는 환경(일반적으로 개발 환경 또는 프로덕션 환경)을 지정합니다. One of the simplest things you can do to improve performance is to set NODE_ENV to `production`.

NODE_ENV를 "production"으로 설정하면 Express는 다음과 같이 동작합니다.

- 보기 템플리트를 캐싱.
- CSS 확장기능을 통해 생성된 CSS 파일을 캐싱.
- 더 간결한 오류 메시지를 생성.

[Tests indicate](https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) that just doing this can improve app performance by a factor of three!

특정한 환경을 위한 코드를 작성하는 경우, `process.env.NODE_ENV`를 통해 NODE_ENV의 값을 확인할 수 있습니다. 환경 변수의 값을 확인하는 작업은 성능 저하를 유발하므로 이러한 작업은 낮은 빈도로 실행해야 한다는 점에 주의하십시오.

일반적으로 개발 시에는, 예를 들면 `export` 또는 `.bash_profile` 파일을 이용하여 대화식 쉘에서 환경 변수를 설정할 수 있습니다. But in general, you shouldn't do that on a production server; instead, use your OS's init system (systemd). 다음 섹션에서 일반적인 init 시스템의 사용에 대한 자세한 내용을 확인할 수 있지만, NODE_ENV를 설정하는 것은 성능에 매우 중요하므로(또한 쉽게 실행할 수 있으므로) NODE_ENV의 설정을 여기서 강조합니다.

systemd를 이용하는 경우, 유닛 파일에 `Environment` 지시문을 사용하십시오. 예를 들면 다음과 같습니다.

```sh
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
```

For more information, see [Using Environment Variables In systemd Units](https://www.flatcar.org/docs/latest/setup/systemd/environment-variables/).

### 앱이 자동으로 다시 시작되도록 보장

프로덕션 환경에서 애플리케이션이 오프라인 상태가 되어서는 절대로 안 됩니다. 따라서 앱에서 충돌이 발생하거나 서버 자체에서 충돌이 발생하는 경우 모두 앱이 다시 시작되도록 해야 합니다. 이러한 일 중 어느 하나라도 발생하지 않는 것이 바람직하지만, 현실적으로는 다음과 같은 방법을 통해 이 두 가지 만일의 사태를 처리해야 합니다.

- 앱에서 충돌이 발생하는 경우 프로세스 관리자를 사용하여 앱(및 Node)을 다시 시작.
- OS에서 충돌이 발생하는 경우 해당 OS에서 제공하는 init 시스템을 사용하여 프로세스 관리자를 다시 시작. 프로세스 관리자 없이도 init 시스템을 사용할 수 있습니다.

처리되지 않은 예외가 발생하는 경우 Node 애플리케이션에서 충돌이 발생합니다. 가장 먼저 해야 할 일은 앱의 테스트가 잘 이루어지도록 하고 앱이 모든 예외를 처리하도록 하는 것입니다(자세한 내용은 [올바른 예외 처리](#exceptions)를 참조). 그러나 하나의 안전 장치로서, 앱에서 충돌이 발생하는 경우에 앱이 자동으로 다시 시작되도록 하는 메커니즘을 실행하십시오.

#### 프로세스 관리자 사용

개발 시에는 단순히 명령행에서 `node server.js` 또는 이와 유사한 명령을 실행하여 앱을 시작했습니다. 그러나 프로덕션 환경에서 이러한 방식으로 앱을 실행하는 것은 매우 위험합니다. 앱에서 충돌이 발생하면 앱은 다시 시작될 때까지 오프라인 상태가 됩니다. 앱에서 충돌이 발생할 때 앱이 다시 시작되도록 하려면 프로세스 관리자를 사용하십시오. 프로세스 관리자는 애플리케이션을 위한 "컨테이너"이며, 배치 작업을 용이하게 하고, 높은 가용성을 제공하고, 런타임 시에 애플리케이션을 관리할 수 있도록 합니다.

앱에서 충돌이 발생할 때 앱이 다시 시작되도록 하는 것 이외에도, 프로세스 관리자를 통해 다음을 실행할 수 있습니다.

- 런타임 성능 및 자원 소비에 대한 통찰력을 획득.
- 성능 향상을 위해 설정을 동적으로 수정.
- Control clustering (pm2).

Historically, it was popular to use a Node.js process manager like [PM2](https://github.com/Unitech/pm2). See their documentation if you wish to do this. However, we recommend using your init system for process management.

#### init 시스템 사용

신뢰성의 다음 단계는 서버가 다시 시작될 때 애플리케이션이 다시 시작되도록 하는 것입니다. 시스템은 여전히 여러 이유로 작동이 중단될 수 있습니다. 서버에서 충돌이 발생할 때 앱이 다시 시작되도록 하려면 OS에 내장된 init 시스템을 사용하십시오. The main init system in use today is [systemd](https://wiki.debian.org/systemd).

Express 앱에 init 시스템을 사용하는 데에는 다음과 같은 두 가지 방법이 있습니다.

- 프로세스 관리자에서 앱을 실행한 후, init 시스템을 통해 프로세스 관리자를 서비스로서 설치하십시오. 프로세스 관리자는 앱에서 충돌이 발생할 때 앱을 자동으로 시작하고, init 시스템은 OS가 다시 시작될 때 프로세스 관리자를 다시 시작할 것입니다. 이러한 접근법은 권장되는 접근법입니다.
- init 시스템을 통해 직접 앱(및 Node)을 실행하십시오. 이 방법은 조금 더 간편하지만, 프로세스 관리자의 사용을 통한 추가적인 이점을 얻을 수 없습니다.

##### Systemd

Systemd는 Linux용 시스템 및 서비스 관리자입니다. 대부분의 주요 Linux 배포판은 systemd를 기본 init 시스템으로 도입했습니다.

systemd 서비스 구성 파일은 \*유닛 파일(unit file)\*로 불리며, 파일 이름이 .service로 끝납니다. Here's an example unit file to manage a Node app directly. Replace the values enclosed in `<angle brackets>` for your system and app:

```sh
[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node </projects/myapp/index.js>
WorkingDirectory=</projects/myapp>

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

### 앱을 클러스터에서 실행

멀티코어 시스템에서는 프로세스 클러스터를 실행하여 Node 앱의 성능을 여러 배 높일 수 있습니다. 클러스터는 해당 앱의 인스턴스를 여러 개 실행하여(이상적인 경우 각 CPU 코어에서 하나의 인스턴스를 실행) 인스턴스들 사이에서 로드 및 태스크를 분배합니다.

![Balancing between application instances using the cluster API](/images/clustering.png)

중요: 앱 인스턴스들은 별도의 프로세스로서 실행되므로 이러한 인스턴스들은 동일한 메모리 공간을 공유하지 않습니다. 즉, 오브젝트는 해당 앱의 각 인스턴스에 대한 로컬 오브젝트입니다. 따라서 애플리케이션 코드 내의 상태를 유지보수할 수 없습니다. 그러나 [Redis](http://redis.io/)와 같은 인메모리 데이터 저장소를 사용하면 세션과 관련된 데이터 및 상태를 저장할 수 있습니다. 이러한 주의사항은 기본적으로 여러 프로세스를 이용한 클러스터링 또는 여러 대의 실제 서버를 이용한 클러스터링 등 모든 형태의 수평적 확장에 적용됩니다.

클러스터화된 앱에서 작업자 프로세스는 나머지 프로세스에 영향을 미치지 않으면서 개별적으로 충돌이 발생할 수 있습니다. 성능상의 이점 이외에도, 실패 격리는 앱 프로세스 클러스터를 실행해야 하는 또 다른 이유가 됩니다. 한 작업자 프로세스에서 충돌이 발생할 때마다, 항상 반드시 해당 이벤트를 로깅하고 cluster.fork()를 이용해 새로운 프로세스를 복제생성하십시오.

#### Node의 cluster 모듈 사용

Clustering is made possible with Node's [cluster module](https://nodejs.org/api/cluster.html). 이러한 클러스터링을 통해 마스터 프로세스는 여러 작업자 프로세스를 복제생성하고, 수신되는 연결을 여러 작업자 사이에서 분배할 수 있습니다.

#### PM2 사용

애플리케이션을 PM2에 배치하면, 애플리케이션 코드를 수정하지 _않고도_ 클러스터링을 활용할 수 있습니다. You should ensure your [application is stateless](https://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps) first, meaning no local data is stored in the process (such as sessions, websocket connections and the like).

PM2로 애플리케이션을 실행하고 있을 때, 특정한 수의 인스턴스에 실행하는 **클러스터 모드**를 켤 수 있습니다. 머신의 가용 CPU 수같은 것들이 특정한 수입니다. 애플리케이션을 끌 필요 없이 `pm2` 커맨드라인 명령을 이용해 클러스터에 있는 프로세스의 수를 직접 바꿀 수도 있습니다.

아래와 같은 방법으로 클러스터 모드를 킵니다.

```bash
# Start 4 worker processes
$ pm2 start npm --name my-app -i 4 -- start
# Auto-detect number of available CPUs and start that many worker processes
$ pm2 start npm --name my-app -i max -- start
```

이 수는 PM2 프로세스 파일 (`ecosystem.config.js`나 그와 유사한 파일) 안의 `exec_mode`를 `cluster`나 `instances`를 설정해서 수정될 수 있습니다.

실행이 시작되면, `app`으로 이름지어진 애플리케이션을 아래와 같은 방법으로 스케일링 할 수 있습니다.

```bash
# Add 3 more workers
$ pm2 scale my-app +3
# Scale to a specific number of workers
$ pm2 scale my-app 2
```

PM2의 클러스터링에 관한 추가 정보는 PM2 문서의 [Cluster Mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/)를 참고해주세요.

### 요청 결과를 캐싱

프로덕션 환경 내에서의 성능을 향상시키기 위한 또 다른 전략은 요청의 결과를 캐싱하여 앱이 동일한 요청을 반복적으로 제공하는 작업을 반복하지 않도록 하는 것입니다.

Use a caching server like [Varnish](https://www.varnish-cache.org/) or [Nginx](https://blog.nginx.org/blog/nginx-caching-guide) (see also [Nginx Caching](https://serversforhackers.com/nginx-caching/)) to greatly improve the speed and performance of your app.

### 로드 밸런서 사용

앱의 최적화 수준에 상관없이, 하나의 인스턴스는 제한된 양의 로드 및 트래픽만을 처리할 수 있습니다. 앱을 확장하는 방법 중 하나는 해당 앱의 인스턴스를 여러 개 실행하고 로드 밸런서를 통해 트래픽을 분배하는 것입니다. 로드 밸런서를 설정하면 앱의 성능 및 속도를 향상시킬 수 있으며, 하나의 인스턴스를 이용할 때보다 훨씬 더 높은 수준으로 확장할 수 있습니다.

로드 밸런서는 일반적으로 여러 애플리케이션 인스턴스 및 서버에 대한 트래픽을 오케스트레이션하는 역방향 프록시입니다. You can easily set up a load balancer for your app by using [Nginx](https://nginx.org/en/docs/http/load_balancing.html) or [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

로드 밸런싱을 이용하는 경우, 특정한 세션 ID와 연관된 요청이 해당 요청을 발생시킨 프로세스에 연결되도록 해야 할 수도 있습니다. 이러한 경우는 _세션 선호도(session affinity)_ 또는 \*스티키 세션(sticky session)\*으로 알려져 있으며, 세션 데이터를 위해 Redis와 같은 데이터 저장소를 사용하는 위의 제안을 통해 처리할 수도 있습니다(애플리케이션에 따라 다름). 토론을 위해서는 [Using multiple nodes](https://socket.io/docs/v4/using-multiple-nodes/)를 참조하십시오.

### 역방향 프록시 사용

역방향 프록시는 웹 앱의 프론트에 위치하며, 요청이 앱으로 전달되도록 할 뿐만 아니라 요청에 대한 지원 연산을 수행합니다. 이는 오류 페이지, 압축, 캐싱, 파일 제공, 로드 밸런싱 및 기타 여러 작업을 처리할 수 있습니다.

애플리케이션 상태를 알아야 할 필요가 없는 태스크를 역방향 프록시로 이양하면 Express는 더 적은 자원을 차지하게 되어 특성화된 애플리케이션 태스크를 수행할 수 있습니다. For this reason, it is recommended to run Express behind a reverse proxy like [Nginx](https://www.nginx.org/) or [HAProxy](https://www.haproxy.org/) in production.
