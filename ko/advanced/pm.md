---
layout: page
title: Express 앱용 프로세스 관리자
menu: advanced
lang: ko
---

# Express 앱용 프로세스 관리자

{% include community-caveat.html %}

프로덕션 환경을 위한 Express를 실행할 때 *프로세스 관리자*를 사용하면 다음과 같은 태스크를 달성하는 데 도움이 됩니다.

- 앱에서 충돌이 발생할 경우 앱을 자동으로 다시 시작.
- 런타임 성능 및 자원 소비에 대한 통찰력을 획득.
- 성능 향상을 위해 설정을 동적으로 수정.
- 클러스터링을 제어.

프로세스 관리자는 애플리케이션 서버와 약간 비슷합니다. 프로세스 관리자는 애플리케이션을 위한 "컨테이너"이며, 배치 작업을 용이하게 하고,
높은 가용성을 제공하고, 런타임 시에 애플리케이션을 관리할 수 있도록 합니다.

가장 널리 사용되는 Express 및 기타 Node.js 애플리케이션용 프로세스 관리자는 다음과 같습니다.


- **[Forever](https://github.com/foreverjs/forever){: target="_blank"}**: 주어진 스크립트가 지속적으로(영원히) 실행되도록 하는 간단한 명령행 인터페이스 도구입니다. Forever는 간단한 인터페이스를 갖추고 있으므로 소규모 배치의 Node.js 앱 및 스크립트를 실행하는 데 가장 적합합니다.
- **[PM2](https://github.com/Unitech/pm2){: target="_blank"}**: Node.js 애플리케이션용 프로덕션 프로세스 관리자이며, 여기에는 기본 제공 로드 밸런서가 포함되어 있습니다. PM2를 이용하면 앱을 항상 작동 상태로 유지하고, 시스템 가동 중단 없이 앱을 다시 로드할 수 있으며, 일반적인 시스템 관리 태스크를 쉽게 처리할 수 있습니다.  또한 PM2를 이용하면 애플리케이션 로깅, 모니터링 및 클러스터링을 관리할 수 있습니다.
- **[StrongLoop Process Manager (Strong-PM)](http://strong-pm.io/)**: Node.js 애플리케이션용 프로덕션 프로세스 관리자입니다. 기본 제공 로드 밸런싱, 모니터링, 멀티호스트 배치 및 그래픽 콘솔을 제공합니다. 로컬이나 리모트 시스템에 Node.js 애플리케이션을 빌드, 패키징, 배포하기 위한 CLI를 포함하고 있습니다.
- **SystemD**: 모던 리눅스 배포판의 기본 프로세스 매니저입니다. Node.js 애플리케이션을 서비스로 돌리기 간단하게 만들어 줍니다. 추가 정보는 다음을 참고하세요. ["Run node.js service with systemd" by Ralph Slooten (@axllent)](https://www.axllent.org/docs/view/nodejs-service-with-systemd/)
