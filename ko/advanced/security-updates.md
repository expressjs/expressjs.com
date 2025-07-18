---
layout: page
title: Express 보안 업데이트
description: |-
  Express.js의 최신 보안 업데이트와 패치 사항을 확인합니다. 
  각 버전에 대한 상세한 취약점 목록을 포함하여, 애플리케이션의 보안을 유지하는 데 도움이 됩니다.
menu: advanced
redirect_from: "  "
---

# 보안 업데이트

<div class="doc-box doc-notice" markdown="1">
Node.js 취약성은 Express에 직접 영향을 미칩니다. 따라서 [Node.js 취약성을 항상 주시해야 하며](https://nodejs.org
/en/blog/vulnerability/), 반드시 안정적인 최신 버전의 Node.js를 사용해야 합니다.
</div>

아래의 목록에는 지정된 버전 업데이트에서 수정된 Express 취약성이 열거되어 있습니다.

{% capture security-policy %} Express에서 보안 취약점을 발견했다고 생각되면, [보안 정책 및 절차](/{{page.lang}}/resources/contributing.html#security-policies-and-procedures)를 참고해 주시기 바랍니다.
{% endcapture %}

{% include admonitions/note.html content=security-policy %}

## 4.x

- 4.21.2
  - `path-to-regexp` 모듈이 [보안 취약점](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-rhx6-c78j-4q9w)을 해결하기 위해 업데이트되었습니다.
- 4.21.1
  - `cookie` 모듈이 [보안 취약점](https://github.com/jshttp/cookie/security/advisories/GHSA-pxg6-pf52-xh8x)을 해결하기 위해 업데이트되었습니다. 이 취약점은 `res.cookie`를 사용하는 애플리케이션에 영향을 줄 수 있습니다.
- 4.20.0
  - `res.redirect`에서 발생할 수 있는 XSS 취약점이 수정되었습니다 ([권고문](https://github.com/expressjs/express/security/advisories/GHSA-qw6h-vgh9-j6wx), [CVE-2024-43796](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-43796)).
  - `serve-static` 모듈이 [보안 취약점](https://github.com/advisories/GHSA-cm22-4g7w-348p)을 해결하기 위해 업데이트되었습니다.
  - `send` 모듈이 [보안 취약점](https://github.com/advisories/GHSA-m6fv-jmcg-4jfg)을 해결하기 위해 업데이트되었습니다.
  - `path-to-regexp` 모듈이 [보안 취약점](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-9wv6-86v2-598j)을 해결하기 위해 추가로 업데이트되었습니다.
  - `body-parser` 모듈이 [보안 취약점](https://github.com/advisories/GHSA-qwcr-r2fm-qrc7)을 해결하기 위해 업데이트되었습니다 이 취약점은 URL 인코딩이 활성화된 경우 애플리케이션에 영향을 줄 수 있습니다.
- 4.19.0, 4.19.1
  - `res.location` 및 `res.redirect`에서 발생할 수 있는 오픈 리디렉션(Open Redirect) 취약점이 수정되었습니다 ([권고문](https://github.com/expressjs/express/security/advisories/GHSA-rv95-896h-c2vc) [CVE-2024-29041](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-29041))
- 4.17.3
  - `qs` 모듈이 [보안 취약점](https://github.com/advisories/GHSA-hrpp-h998-j3pp)을 해결하기 위해 업데이트되었습니다. 이 취약점은 `req.query`, `req.body`, `req.param` API 사용 시 애플리케이션에 영향을 줄 수 있습니다.
- 4.16.0
  - 의존성 `forwarded`가 [발견된 취약점](https://npmjs.com/advisories/527)에 따라 업데이트되었습니다. `req.host`, `req.hostname`, `req.ip`, `req.ips`, `req.protocol`을 사용하는 애플리케이션에 영향을 끼칠 수 있습니다.
  - 의존성 `mime`이 [발견된 취약점](https://npmjs.com/advisories/535)에 따라 업데이트되었으나, Express에 영향을 끼치지는 않습니다.
  - 의존성 `send`가 [Node.js 8.5.0의 취약점](https://nodejs.org/en/blog/vulnerability/september-2017-path-validation/)에 대응하기 위해 업데이트되었습니다. Node.js 버전 8.5.0에서 실행되는 Express에만 영향을 끼칩니다.
- 4.15.5
  - 의존성 `debug`가 [발견된 취약점](https://snyk.io/vuln/npm:debug:20170905)에 따라 업데이트되었으나, Express에 영향을 끼치지는 않습니다.
  - 의존성 `fresh`가 [발견된 취약점](https://npmjs.com/advisories/526)에 따라 업데이트되었습니다. `express.static`, `req.fresh`, `res.json`, `res.jsonp`, `res.send`, `res.sendfile` `res.sendFile`, `res.sendStatus`를 사용하고 있는 애플리케이션에 영향을 끼칩니다.
- 4.15.3
  - 의존성 `ms`가 [발견된 취약점](https://snyk.io/vuln/npm:ms:20170412)에 따라 업데이트되었습니다. 애플리케이션이 `express.static`, `res.sendfile`, `res.sendFile`의 `maxAge` 옵션에 Untrusted 문자열을 입력받고 있으면 영향을 끼칠 수 있습니다.
- 4.15.2
  - 의존성 `qs`가 [발견된 취약점](https://snyk.io/vuln/npm:qs:20170213)에 따라 업데이트되었으나, Express에 영향을 끼치지는 않습니다. 4.15.2로 업데이트하는 것을 권장하나, 취약점을 막는 업데이트는 아닙니다..
- 4.11.1
  - `express.static`, `res.sendfile` 및 `res.sendFile`의 루트 경로 노출 취약성을 수정했습니다.
- 4.10.7
  - `express.static`의 개방된 경로 재지정 취약성을 수정했습니다([보안 권고문](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
- 4.8.8
  - `express.static`의 디렉토리 조회 취약성을 수정했습니다([보안 권고문](http://npmjs.com/advisories/32), [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)).
- 4.8.4
  - Node.js 0.10 이용 시, 특정한 상황에서 `fd` 누수가 발생할 수 있으며, 이는 `express.static` 및 `res.sendfile`에 영향을 미칩니다. 악성 요청은 `fd` 누수를 발생시킬 수 있으며, 결국 `EMFILE` 오류와 서버 무응답을 초래할 수 있습니다.
- 4.8.0
  - 조회 문자열에서 극단적으로 높은 인덱스를 갖는 스파스 배열은 프로세스가 메모리 부족을 발생시키고 서버에서 충돌이 발생하도록 하는 원인이 될 수 있습니다.
  - 극단적인 수준으로 중첩된 조회 문자열 오브젝트는 프로세스가 서버를 차단하고 일시적으로 서버를 무응답 상태로 만드는 원인이 될 수 있습니다.

## 3.x

  <div class="doc-box doc-warn" markdown="1">
  **Express 3.x은 더 이상 유지보수되지 않습니다.**

3.x의 알려진 또는 알려지지 않은 보안 및 성능 문제는 마지막 업데이트(2015년 8월 1일) 이후로 처리되지 않고 있습니다. 최신 버전의 Express를 사용할 것을 강력히 권장합니다.

버전 3.x 이상으로 업그레이드할 수 없는 경우, [상업적 지원 옵션](/{{ page.lang }}/support#commercial-support-options)을 고려해주시기 바랍니다.

  </div>

- 3.19.1
  - `express.static`, `res.sendfile` 및 `res.sendFile`의 루트 경로 노출 취약성을 수정했습니다.
- 3.19.0
  - `express.static`의 개방된 경로 재지정 취약성을 수정했습니다([보안 권고문](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
- 3.16.10
  - `express.static`의 디렉토리 조회 취약성을 수정했습니다.
- 3.16.6
  - Node.js 0.10 이용 시, 특정한 상황에서 `fd` 누수가 발생할 수 있으며, 이는 `express.static` 및 `res.sendfile`에 영향을 미칩니다. 악성 요청은 `fd` 누수를 발생시킬 수 있으며, 결국 `EMFILE` 오류와 서버 무응답을 초래할 수 있습니다.
- 3.16.0
  - 조회 문자열에서 극단적으로 높은 인덱스를 갖는 스파스 배열은 프로세스가 메모리 부족을 발생시키고 서버에서 충돌이 발생하도록 하는 원인이 될 수 있습니다.
  - 극단적인 수준으로 중첩된 조회 문자열 오브젝트는 프로세스가 서버를 차단하고 일시적으로 서버를 무응답 상태로 만드는 원인이 될 수 있습니다.
- 3.3.0
  - 지원되지 않는 메소드 대체 시도의 404 응답은 XSS(Cross-site scripting) 공격을 받기 쉬웠습니다.