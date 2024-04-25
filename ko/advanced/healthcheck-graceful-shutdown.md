---
layout: page
title: 상태 검사와 우아한 종료
menu: advanced
lang: ko
---

# 상태 확인와 정상 종료

## 정상 종료

애플리케이션의 새 버전을 배포할 때, 이전 버전을 교체해야 합니다. 여러분이 사용하는 프로세스 매니저 는 애플리케어션에 SIGTERM 신호를 보내 종료를 통보할 것입니다. 애플리케이션이 신호를 받으면, 신규 요청을 받는걸 중단하고, 진행중인 요청을 끝내고, DB 연결이나 파일 사용을 포함한 사용한 리소스를 정리할 것입니다.

## 상태 확인

A load balancer uses health checks to determine if an application instance is healthy and can accept requests. For example, [Kubernetes has two health checks](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/):
로드 밸런서는 상태 확인을 애플리케이션이 장상 작동하고 요청을 받을 수 있는지 판단하는데 사용합니다. 예시로, [Kubernetes는 2개의 상태 확인을 가지고 있습니다.](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/)

* `liveness`: 언제 컨테이너를 재시작할지 결정합니다.
* `readiness`: 컨테이너가 트래픽을 받기 시작할 준비가 되었는지 결정합니다. 컨테이너가 준비되지 않았다면, 서비스 로드 밸런서들에게서 제거됩니다.

