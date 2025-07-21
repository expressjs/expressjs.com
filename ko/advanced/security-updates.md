---
layout: page
title: Express 보안 업데이트
description: Review the latest security updates and patches for Express.js, including detailed vulnerability lists for different versions to help maintain a secure application.
menu: advanced
redirect_from: "  "
---

# 보안 업데이트

<div class="doc-box doc-notice" markdown="1">
Node.js 취약성은 Express에 직접 영향을 미칩니다. 따라서 [Node.js 취약성을 항상 주시해야 하며](https://nodejs.org
/en/blog/vulnerability/), 반드시 안정적인 최신 버전의 Node.js를 사용해야 합니다.
</div>

아래의 목록에는 지정된 버전 업데이트에서 수정된 Express 취약성이 열거되어 있습니다.

{% capture security-policy %}
If you believe you have discovered a security vulnerability in Express, please see
[Security Policies and Procedures](/{{page.lang}}/resources/contributing.html#security-policies-and-procedures).
{% endcapture %}

{% include admonitions/note.html content=security-policy %}

## 4.x

- 4.21.2
  - The dependency `path-to-regexp` has been updated to address a [vulnerability](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-rhx6-c78j-4q9w).
- 4.21.1
  - The dependency `cookie` has been updated to address a [vulnerability](https://github.com/jshttp/cookie/security/advisories/GHSA-pxg6-pf52-xh8x), This may affect your application if you use `res.cookie`.
- 4.20.0
  - Fixed XSS vulnerability in `res.redirect` ([advisory](https://github.com/expressjs/express/security/advisories/GHSA-qw6h-vgh9-j6wx), [CVE-2024-43796](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-43796)).
  - The dependency `serve-static` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-cm22-4g7w-348p).
  - The dependency `send` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-m6fv-jmcg-4jfg).
  - The dependency `path-to-regexp` has been updated to address a [vulnerability](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-9wv6-86v2-598j).
  - The dependency `body-parser` has been updated to addres a [vulnerability](https://github.com/advisories/GHSA-qwcr-r2fm-qrc7), This may affect your application if you had url enconding activated.
- 4.19.0, 4.19.1
  - Fixed open redirect vulnerability in `res.location` and `res.redirect` ([advisory](https://github.com/expressjs/express/security/advisories/GHSA-rv95-896h-c2vc), [CVE-2024-29041](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-29041)).
- 4.17.3
  - The dependency `qs` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-hrpp-h998-j3pp). This may affect your application if the following APIs are used: `req.query`, `req.body`, `req.param`.
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

If you are unable to upgrade past 3.x, please consider [Commercial Support Options](/{{ page.lang }}/support#commercial-support-options).

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