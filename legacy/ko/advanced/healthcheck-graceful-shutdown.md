---
layout: page
title: 상태 검사와 우아한 종료
description: Express 애플리케이션에서 헬스 체크와 그레이스풀 셧다운(Graceful Shutdown)을 구현하는 방법을 학습합니다. 이 기능은 애플리케이션의 신뢰성을 향상시키고, 배포를 원활하게 관리하며, Kubernetes와 같은 로드 밸런서와의 통합을 지원합니다.
menu: advanced
order: 5
redirect_from: "  "
---

# 상태 검사와 우아한 종료

## 정상 종료

애플리케이션의 새 버전을 배포할 때, 이전 버전을 교체해야 합니다. 여러분이 사용하는 프로세스 매니저 는 애플리케어션에 SIGTERM 신호를 보내 종료를 통보할 것입니다. 애플리케이션이 신호를 받으면, 신규 요청을 받는걸 중단하고, 진행중인 요청을 끝내고, DB 연결이나 파일 사용을 포함한 사용한 리소스를 정리할 것입니다.

### Example

```js
const server = app.listen(port)

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})
```

## Health checks

로드 밸런서는 헬스 체크를 통해 애플리케이션 인스턴스가 정상적으로 작동 중이며 요청을 수락할 수 있는지 판단합니다. For example, [Kubernetes has two health checks](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/):
로드 밸런서는 상태 확인을 애플리케이션이 장상 작동하고 요청을 받을 수 있는지 판단하는데 사용합니다.

- `liveness`: 언제 컨테이너를 재시작할지 결정합니다.
- `readiness`: 컨테이너가 트래픽을 받기 시작할 준비가 되었는지 결정합니다. 컨테이너가 준비되지 않았다면, 서비스 로드 밸런서들에게서 제거됩니다.