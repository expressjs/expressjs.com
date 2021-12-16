---
layout: page
title: 상태 검사와 우아한 종료
menu: advanced
lang: ko
---

# 상태 확인와 정상 종료

## 정상 종료

애플리케이션의 새 버전을 배포할 때, 이전 버전을 교체해야 합니다. 여러분이 사용하는 [프로세스 매니저](pm.html)는 애플리케어션에 SIGTERM 신호를 보내 종료를 통보할 것입니다. 애플리케이션이 신호를 받으면, 신규 요청을 받는걸 중단하고, 진행중인 요청을 끝내고, DB 연결이나 파일 사용을 포함한 사용한 리소스를 정리할 것입니다.

## 상태 확인

A load balancer uses health checks to determine if an application instance is healthy and can accept requests. For example, [Kubernetes has two health checks](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/):
로드 밸런서는 상태 확인을 애플리케이션이 장상 작동하고 요청을 받을 수 있는지 판단하는데 사용합니다. 예시로, [Kubernetes는 2개의 상태 확인을 가지고 있습니다.](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/)

* `liveness`: 언제 컨테이너를 재시작할지 결정합니다.
* `readiness`: 컨테이너가 트래픽을 받기 시작할 준비가 되었는지 결정합니다. 컨테이너가 준비되지 않았다면, 서비스 로드 밸런서들에게서 제거됩니다.

## 서드 파티 솔루션

{% include community-caveat.html %}

### Terminus

[Terminus](https://github.com/godaddy/terminus)는 상용구 코드를 쓸 필요를 제거하기 위해 상태 확인 절차와 정상 종료를 추가하는 오픈소스 프로젝트입니다. 먼저 정상 종료를 위한 자원 청소 로직과 상태 확인 로직만 제공하면 됩니다. 그러면 Terminus가 나머지를 처리할겁니다.

아래 명령을 사용해 Terminus를 설치합니다.

```console
$ npm i @godaddy/terminus --save
```

다음은 Terminus를 사용하는 쉬운 예제입니다. 자세한 정보는 <https://github.com/godaddy/terminus> 를 참고하세요.

```js
const http = require('http')
const express = require('express')
const terminus = require('@godaddy/terminus')

const app = express()

app.get('/', (req, res) => {
  res.send('ok')
})

const server = http.createServer(app)

function onSignal () {
  console.log('server is starting cleanup')
  // start cleanup of resource, like databases or file descriptors
}

async function onHealthCheck () {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
}

terminus(server, {
  signal: 'SIGINT',
  healthChecks: {
    '/healthcheck': onHealthCheck
  },
  onSignal
})

server.listen(3000)
```

### Lightship

[Lightship](https://github.com/gajus/lightship)은 애플리케이션에 상태, 준비, 생존 확인을 추가하는 오픈소스 프로젝트입니다. Lightship은 스탠드얼론 HTTP 서비스로 분리된 HTTP 서비스를 구동합니다. 이를 통해 확인 절차들을 공개적으로 노출시키지 않고 할 수 있게 해줍니다.

아래 명령을 사용해 Lightship을 설치합니다.

```console
$ npm install lightship
```

Lightship을 사용하는 쉬운 예제입니다.

```js
const http = require('http')
const express = require('express')
const {
  createLightship
} = require('lightship')

// Lightship will start a HTTP service on port 9000.
const lightship = createLightship()

const app = express()

app.get('/', (req, res) => {
  res.send('ok')
})

app.listen(3000, () => {
  lightship.signalReady()
})

// You can signal that the service is not ready using `lightship.signalNotReady()`.
```

[Lightship 문서](https://github.com/gajus/lightship)에서 [Kubernetes 설정](https://github.com/gajus/lightship#lightship-usage-kubernetes-container-probe-configuration)에 대한 예시와 [Express.js](https://github.com/gajus/lightship#using-with-expressjs)와의 통합 절차에 대한 완전한 예시를 제공합니다.
