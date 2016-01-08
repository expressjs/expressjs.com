---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Express 앱용 프로세스 관리자
menu: advanced
lang: ko
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Express 앱용 프로세스 관리자

프로덕션 환경을 위한 Express를 실행할 때 *프로세스 관리자*를 사용하면 다음과 같은 태스크를 달성하는 데 도움이 됩니다.

- 앱에서 충돌이 발생할 경우 앱을 자동으로 다시 시작.
- 런타임 성능 및 자원 소비에 대한 통찰력을 획득.
- 성능 향상을 위해 설정을 동적으로 수정.
- 클러스터링을 제어.

프로세스 관리자는 애플리케이션 서버와 약간 비슷합니다. 프로세스 관리자는 애플리케이션을 위한 "컨테이너"이며, 배치 작업을 용이하게 하고,
높은 가용성을 제공하고, 런타임 시에 애플리케이션을 관리할 수 있도록 합니다.

가장 널리 사용되는 Express 및 기타 Node.js 애플리케이션용 프로세스 관리자는 다음과 같습니다.

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)


이 세 가지 도구 중 어느 것을 사용해도 큰 도움이 될 수 있지만, StrongLoop Process Manager는 Node.js 애플리케이션 라이프사이클 전체를 처리하는 포괄적인 런타임 및 배치 솔루션과 프로덕션의 이전과 이후의 모든 단계에 대한 툴링을 통합 인터페이스를 통해 제공하는 유일한 도구입니다.

아래에서는 이 세 가지 도구를 각각 간략히 살펴보겠습니다.
이 도구들에 대한 상세한 비교를 확인하려면 [http://strong-pm.io/compare/](http://strong-pm.io/compare/)를 참조하십시오.

## <a id="sl">StrongLoop Process Manager</a>

StrongLoop Process Manager(StrongLoop PM)는 Node.js 애플리케이션용 프로덕션 프로세스 관리자입니다. StrongLoop PM에는 기본 제공 로드 밸런싱, 모니터링, 멀티호스트 배치 및 그래픽 콘솔이 포함되어 있습니다.
StrongLoop PM은 다음과 같은 태스크에 사용할 수 있습니다.

- Node.js 애플리케이션을 빌드 및 패키징한 후 로컬 또는 원격 시스템에 배치.
- CPU 프로파일 및 힙 스냅샷을 확인하여 성능을 최적화하고 메모리 누수를 진단.
- 프로세스 및 클러스터를 항상 작동 상태로 유지.
- 애플리케이션에 대한 성능 지표를 확인.
- Nginx 통합을 통해 멀티호스트 배치를 쉽게 관리.
- 여러 StrongLoop PM을 분산형 마이크로서비스 런타임으로 통합한 후 Arc를 통해 관리.

`slc`라는 강력한 명령행 인터페이스 도구 또는 Arc라는 그래픽 도구를 이용해 StrongLoop PM에 대한 작업을 실행할 수 있습니다. Arc는 오픈 소스 방식이며, StrongLoop에서 전문적인 지원을 제공합니다.

자세한 정보는 [http://strong-pm.io/](http://strong-pm.io/)를 참조하십시오.

전체 문서:

- [Operating Node apps(StrongLoop 문서)](http://docs.strongloop.com/display/SLC)
- [Using StrongLoop Process Manager](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### 설치
<pre>
<code class="language-sh" translate="no">
$ [sudo] npm install -g strongloop
</code>
</pre>

### 기본적인 사용
<pre>
<code class="language-sh" translate="no">
$ cd my-app
$ slc start
</code>
</pre>

Process Manager 및 배치된 모든 앱의 상태를 확인:

<pre>
<code class="language-sh" translate="no">
$ slc ctl
Service ID: 1
Service Name: my-app
Environment variables:
  No environment variables defined
Instances:
    Version  Agent version  Cluster size
     4.1.13      1.5.14           4
Processes:
        ID      PID   WID  Listening Ports  Tracking objects?  CPU profiling?
    1.1.57692  57692   0
    1.1.57693  57693   1     0.0.0.0:3001
    1.1.57694  57694   2     0.0.0.0:3001
    1.1.57695  57695   3     0.0.0.0:3001
    1.1.57696  57696   4     0.0.0.0:3001
</code>
</pre>

관리 중인 모든 앱(서비스)의 목록을 표시:

<pre>
<code class="language-sh" translate="no">
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
</code>
</pre>

앱을 중지:

<pre>
<code class="language-sh" translate="no">
$ slc ctl stop my-app
</code>
</pre>

앱을 다시 시작:

<pre>
<code class="language-sh" translate="no">
$ slc ctl restart my-app
</code>
</pre>

또한 작업자 프로세스에게 기존의 연결을 닫은 후 현재의 애플리케이션을 다시 시작할 수 있는 유예 기간을 제공하는 "소프트 다시 시작"을 다음과 같이 구현할 수 있습니다.

<pre>
<code class="language-sh" translate="no">
$ slc ctl soft-restart my-app
</code>
</pre>

관리 대상에서 앱을 제거:

<pre>
<code class="language-sh" translate="no">
$ slc ctl remove my-app
</code>
</pre>

## <a id="pm2">PM2</a>

PM2는 Node.js 애플리케이션용 프로덕션 프로세스 관리자이며, 여기에는 기본 제공 로드 밸런서가 포함되어 있습니다. PM2를 이용하면 앱을 항상 작동 상태로 유지하고, 시스템 가동 중단 없이 앱을 다시 로드할 수 있으며, 일반적인 시스템 관리 태스크를 쉽게 처리할 수 있습니다.  또한 PM2를 이용하면 애플리케이션 로깅, 모니터링 및 클러스터링을 관리할 수 있습니다.

자세한 정보는 [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2)를 참조하십시오.

### 설치

<pre>
<code class="language-sh" translate="no">
$ [sudo] npm install pm2 -g
</code>
</pre>

### 기본적인 사용

`pm2` 명령을 이용해 앱을 시작할 때는 앱의 경로를 지정해야 합니다. 그러나 앱을 중지하거나, 다시 시작하거나, 삭제할 때는 앱의 이름 또는 ID만 지정할 수 있습니다.

<pre>
<code class="language-sh" translate="no">
$ pm2 start app.js
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use the `pm2 show <id|name>` command to get more details about an app.
</code>
</pre>

`pm2` 명령을 이용해 앱을 시작할 때, 앱은 즉시 백그라운드로 보내집니다. 다양한 `pm2` 명령을 이용하면 명령행을 통해 백그라운드 앱을 제어할 수 있습니다.

`pm2` 명령을 이용해 앱을 시작하면, 앱은 PM2의 프로세스 목록에 ID와 함께 등록됩니다. 따라서 시스템의 서로 다른 디렉토리에 있는 동일한 이름의 앱을 각 앱의 ID를 이용해 관리할 수 있습니다.

동일한 이름의 앱이 2개 이상 실행되고 있는 경우, `pm2` 명령은 동일한 이름의 앱 모두에 영향을 미친다는 점을 참고하십시오. 그러므로 개개의 앱을 관리하려면 이름 대신 ID를 사용하십시오.

실행 중인 모든 프로세스의 목록을 표시:

<pre>
<code class="language-sh" translate="no">
$ pm2 list
</code>
</pre>

앱을 중지:

<pre>
<code class="language-sh" translate="no">
$ pm2 stop 0
</code>
</pre>

앱을 다시 시작:

<pre>
<code class="language-sh" translate="no">
$ pm2 restart 0
</code>
</pre>

앱에 대한 상세 정보를 확인:

<pre>
<code class="language-sh" translate="no">
$ pm2 show 0
</code>
</pre>

PM2의 레지스트리에서 앱을 제거:

<pre>
<code class="language-sh" translate="no">
$ pm2 delete 0
</code>
</pre>


## <a id="forever">Forever</a>

Forever는 주어진 스크립트가 지속적으로(영원히) 실행되도록 하는 간단한 명령행 인터페이스 도구입니다. Forever는 간단한 인터페이스를 갖추고 있으므로 소규모 배치의 Node.js 앱 및 스크립트를 실행하는 데 가장 적합합니다.

자세한 정보는 [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever)를 참조하십시오.

### 설치

<pre>
<code class="language-sh" translate="no">
$ [sudo] npm install forever -g
</code>
</pre>

### 기본적인 사용

스크립트를 시작하려면 `forever start` 명령을 이용해 해당 스크립트의 경로를 다음과 같이 지정하십시오.

<pre>
<code class="language-sh" translate="no">
$ forever start script.js
</code>
</pre>

이 명령은 디먼 모드에서(백그라운드에서) 해당 스크립트를 실행합니다.

터미널에 연결되도록 스크립트를 실행하려면 다음과 같이 `start`를 생략하십시오.

<pre>
<code class="language-sh" translate="no">
$ forever script.js
</code>
</pre>

로깅 옵션인 `-l`, `-o` 및 `-e`를 이용해 Forever 도구 및 스크립트의 출력을 로깅하는 것은 좋은 생각이며, 아래에는 이에 대한 예가 표시되어 있습니다.

<pre>
<code class="language-sh" translate="no">
$ forever start -l forever.log -o out.log -e err.log script.js
</code>
</pre>

Forever를 통해 시작된 스크립트의 목록을 확인:

<pre>
<code class="language-sh" translate="no">
$ forever list
</code>
</pre>

Forever를 통해 시작된 스크립트를 중지하려면 `forever stop` 명령을 이용해 프로세스 인덱스를 지정하십시오(인덱스는 `forever list` 명령을 통해 표시되는 목록을 참조).

<pre>
<code class="language-sh" translate="no">
$ forever stop 1
</code>
</pre>

대안적으로, 다음과 같이 파일의 경로를 지정할 수 있습니다.

<pre>
<code class="language-sh" translate="no">
$ forever stop script.js
</code>
</pre>

Forever를 통해 시작된 모든 스크립트를 중지:

<pre>
<code class="language-sh" translate="no">
$ forever stopall
</code>
</pre>

Forever에는 더 많은 옵션이 있으며 프로그래밍 방식의 API 또한 제공합니다.
