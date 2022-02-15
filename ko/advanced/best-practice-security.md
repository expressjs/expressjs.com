---
layout: page
title: 프로덕션 환경의 Express를 위한 보안 우수 사례
menu: advanced
lang: ko
---

# 프로덕션 우수 사례: 보안

## 개요

__"프로덕션 (production)"__ 이라는 용어는 소프트웨어 라이프사이클 중 애플리케이션 또는 API가 최종 사용자 또는 소비자에게 정식으로 제공되는 단계를 말합니다. 이와 반대로 *"개발(development)"* 단계에서는 아직 코드가 활발하게 작성 및 테스트되며 애플리케이션은 외부 액세스에 개방되지 않습니다. 이에 대응하는 시스템 환경은 각각 *프로덕션* 환경 및 *개발* 환경이라고 부릅니다.

개발 환경 및 프로덕션 환경은 일반적으로 서로 다르게 설정되며 두 환경의 요구사항은 크게 다릅니다. 개발 환경에서는 좋은 것일지라도 프로덕션 환경에서는 허용되지 않을 수도 있습니다. 예를 들면, 개발 환경에서는 디버깅을 위해 상세한 오류 로깅이 선호될 수 있지만, 이러한 행동은 프로덕션 환경에서 보안 우려사항이 될 수 있습니다. 그리고 개발 환경에서는 확장성, 신뢰성 및 성능에 대해 걱정할 필요가 없지만, 이러한 요인들은 프로덕션 환경에서 매우 중요해집니다.

{% include note.html content="Express의 보안 취약점을 발견하신것 같다면,
[Security Policies and Procedures](/en/resources/contributing.html#security-policies-and-procedures)를 따라주십시오.
" %}

이 문서에서는 프로덕션 환경에 배치된 Express 애플리케이션을 위한 몇 가지 보안 우수 사례에 대해 논의합니다.

- [더 이상 사용되지 않거나 취약성이 있는 버전의 Express 사용 중지](#dont-use-deprecated-or-vulnerable-versions-of-express)
- [TLS 사용](#use-tls)
- [Helmet 사용](#use-helmet)
- [쿠키를 안전하게 사용](#use-cookies-securely)
- [인증 체계에 대한 브루스 포트 공격 방지](#prevent-brute-force-attacks-against-authorization)
- [종속 항목이 안전한지 확인](#ensure-your-dependencies-are-secure)
- [그 외의 알려져 있는 취약점 회피](#avoid-other-known-vulnerabilities)
- [추가적인 고려사항](#additional-considerations)

<a name="dont-use-deprecated-or-vulnerable-versions-of-express"></a>
## 더 이상 사용되지 않거나 취약성이 있는 버전의 Express를 사용 중지

Express 2.x 및 3.x에 대한 유지보수는 더 이상 이루어지지 않습니다. 이러한 버전에서의 보안 및 성능 문제는 수정되지 않습니다. 이러한 버전은 사용하지 마십시오!  아직 버전 4로 이전하지 않은 경우에는 [마이그레이션 안내서](/{{ page.lang }}/guide/migrating-4.html)를 따르십시오.

또한 [보안 업데이트 페이지](/{{ page.lang }}/advanced/security-updates.html)의 목록에 포함된 취약성 있는 Express 버전을 사용하고 있지 않은지 확인하십시오. 취약성 있는 Express 버전을 사용하고 있는 경우에는 안정적인 릴리스 중 하나로 업데이트해야 하며, 가능하면 최신 버전으로 업데이트하는 것이 좋습니다.


<a name="use-tls"></a>
## TLS 사용

앱이 민감한 데이터를 다루거나 전송하는 경우에는 [전송 계층 보안](https://en.wikipedia.org/wiki/Transport_Layer_Security)(TLS)을 사용하여 연결 및 데이터를 보호하십시오. 이 기술은 데이터를 클라이언트로부터 서버로 전송하기 전에 데이터를 암호화하며, 따라서 몇 가지 일반적인(그리고 쉬운) 해킹을 방지합니다. Ajax 및 POST 요청은 브라우저에서 분명하게 보이지 않고 "숨겨진" 것처럼 보일 수도 있지만, 이러한 요청의 트래픽은 [패킷 가로채기](https://en.wikipedia.org/wiki/Packet_analyzer) 및 [중간자 공격](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)에 취약합니다.

여러분은 SSL(Secure Socket Layer) 암호화에 익숙할 것입니다. [TLS는 단순히 SSL이 다음 단계로 발전된 형태입니다](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx). 즉, 이전에 SSL을 사용했다면 TLS로의 업그레이드를 고려해야 합니다.  일반적으로 TLS의 처리를 위해서는 Nginx를 권장합니다.  Nginx(및 기타 서버)에서 TLS를 구성하는 방법에 대한 좋은 참조 자료를 확인하려면 [Recommended Server Configurations(Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations)를 참조하십시오.

또한 무료 TLS 인증서를 얻기 위한 편리한 도구 중 하나는 [Internet Security Research Group(ISRG)](https://letsencrypt.org/isrg/)이 제공하는 무료의 자동 개방형 인증 기관(CA)인 [Let's Encrypt](https://letsencrypt.org/about/)입니다.

<a name="use-helmet"></a>
## Helmet 사용

[Helmet](https://www.npmjs.com/package/helmet)을 이용하면 HTTP 헤더를 적절히 설정하여 몇 가지 잘 알려진 웹 취약성으로부터 앱을 보호할 수 있습니다.

사실 Helmet은 보안 관련 HTTP 헤더를 설정하는 다음과 같은 더 작은 크기의 미들웨어 함수 9개의 모음입니다.

* [csp](https://github.com/helmetjs/csp)는 `Content-Security-Policy` 헤더를 설정하여 XSS(Cross-site scripting) 공격 및 기타 교차 사이트 인젝션을 예방합니다.
* [hidePoweredBy](https://github.com/helmetjs/hide-powered-by)는 `X-Powered-By` 헤더를 제거합니다.
* [hsts](https://github.com/helmetjs/hsts)는 서버에 대한 안전한(SSL/TLS를 통한 HTTP) 연결을 적용하는 `Strict-Transport-Security` 헤더를 설정합니다.
* [ieNoOpen](https://github.com/helmetjs/ienoopen)은 IE8 이상에 대해 `X-Download-Options`를 설정합니다.
* [noCache](https://github.com/helmetjs/nocache)는 `Cache-Control` 및 Pragma 헤더를 설정하여 클라이언트 측에서 캐싱을 사용하지 않도록 합니다.
* [noSniff](https://github.com/helmetjs/dont-sniff-mimetype)는 `X-Content-Type-Options` 를 설정하여, 선언된 콘텐츠 유형으로부터 벗어난 응답에 대한 브라우저의 MIME 가로채기를 방지합니다.
* [frameguard](https://github.com/helmetjs/frameguard)는 `X-Frame-Options` 헤더를 설정하여 [clickjacking](https://www.owasp.org/index.php/Clickjacking)에 대한 보호를 제공합니다.
* [xssFilter](https://github.com/helmetjs/x-xss-protection)는 `X-XSS-Protection`을 설정하여 대부분의 최신 웹 브라우저에서 XSS(Cross-site scripting) 필터를 사용하도록 합니다.

다른 모든 모듈처럼 Helmet은 다음과 같이 설치할 수 있습니다.

```console
$ npm install --save helmet
```

이후 코드에서 Helmet을 사용하는 방법은 다음과 같습니다.

```js
// ...

const helmet = require('helmet')
app.use(helmet())

// ...
```

### 적어도 X-Powered-By 헤더는 사용하지 않도록 설정

Helmet의 사용을 원치 않는 경우에는 적어도 `X-Powered-By` 헤더를 사용하지 마십시오.  공격자는 이 헤더(기본적으로 사용하도록 설정되어 있음)를 이용해 Express를 실행하는 앱을 발견한 후 특정한 대상에 대한 공격을 실행할 수 있습니다.

따라서 우수 사례는 다음과 같이 `app.disable()` 메소드를 이용해 이 헤더를 끄는 것입니다.


```js
app.disable('x-powered-by')
```

`helmet.js`를 사용하는 경우에는 사용자를 대신하여 `helmet.js`가 위의 작업을 실행합니다.

{% include note.html content="`X-Powered-By header`를 비활성화하는 행위는 고수준의 공격자가 앱이 Express를 사용하고 있는지 확인하는 걸 막을 수 없습니다. 일반적인 취약점은 막을지 모르지만, 앱이 Express를 사용하고 있는지 알아내는 다른 방법은 많이 있습니다. "%}

<a name="use-cookies-securely"></a>
## 쿠키를 안전하게 사용

쿠키로 인해 앱이 악용에 노출되지 않도록 하기 위해 기본 세션 쿠키 이름을 사용하지 말고 쿠키 보안 옵션을 적절히 설정하십시오.

두 개의 기본 미들웨어 쿠키 세션 모듈은 다음과 같습니다.

* [express-session](https://www.npmjs.com/package/express-session)(Express 3.x에서 기본 제공되는 `express.session` 미들웨어 대체).
* [cookie-session](https://www.npmjs.com/package/cookie-session)(Express 3.x에서 기본 제공되는 `express.cookieSession` 미들웨어 대체).

이 두 모듈의 주요 차이점은 쿠키 세션 데이터를 저장하는 방식입니다.  [express-session](https://www.npmjs.com/package/express-session) 미들웨어는 세션 데이터를 서버에 저장하며, 쿠키 자체에는 세션 데이터가 아니라 세션 ID만 저장됩니다.  기본적으로 express-session은 인메모리 스토리지를 이용하며, 프로덕션 환경용으로 설계되지 않았습니다.  프로덕션 환경에서는 확장 가능한 session-store를 설정해야 합니다. [호환 가능한 세션 스토어](https://github.com/expressjs/session#compatible-session-stores)의 목록을 참조하십시오.

이와 반대로 [cookie-session](https://www.npmjs.com/package/cookie-session) 미들웨어는 쿠키 기반의 스토리지를 구현하며, 하나의 세션 키가 아니라 세션 전체를 쿠키에 직렬화합니다.  cookie-session은 세션 데이터의 크기가 상대적으로 작으며 (오브젝트가 아닌) 원시 값으로 쉽게 인코딩 가능할 때에만 사용하십시오.  브라우저는 하나의 쿠키당 4,096바이트 이상을 지원하도록 되어 있지만, 한계를 초과하지 않도록 보장하려면 하나의 도메인당 4,093바이트의 크기를 초과하지 마십시오.  또한, 클라이언트에서 쿠키 데이터를 볼 수 있으므로, 쿠키 데이터를 안전하게 또는 모호하게 유지해야 할 이유가 있는 경우에는 express-session을 선택하는 것이 더 나을 수 있습니다.

###  기본 세션 쿠키 이름을 사용하지 않음

기본 세션 쿠키 이름을 사용하면 앱을 공격에 노출시킬 수 있습니다.  이로 인해 제기되는 보안 문제는 `X-Powered-By`와 유사하며, 잠재적인 공격자는 이를 이용해 서버의 지문을 채취한 후 이에 따라 공격 대상을 설정할 수 있습니다.

이러한 문제점을 피하려면 일반적인 쿠키 이름을 사용하십시오. 예를 들면 [express-session](https://www.npmjs.com/package/express-session) 미들웨어를 이용해 다음과 같이 하십시오.

```js
const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))
```

### 쿠키 보안 옵션 설정

다음과 같은 쿠키 옵션을 설정하여 보안을 강화하십시오.

* `secure` - 브라우저가 HTTPS를 통해서만 쿠키를 전송하도록 합니다.
* `httpOnly` - 쿠키가 클라이언트 JavaScript가 아닌 HTTP(S)를 통해서만 전송되도록 하며, 이를 통해 XSS(Cross-site scripting) 공격으로부터 보호할 수 있습니다.
* `domain` - 쿠키의 도메인을 표시합니다. URL이 요청되고 있는 서버의 도메인에 대해 비교할 때 사용하십시오. 두 도메인이 일치하는 경우에는 그 다음으로 경로 속성을 확인하십시오.
* `path` - 쿠키의 경로를 표시합니다. 요청 경로에 대해 비교할 때 사용하십시오. 이 경로와 도메인이 일치하는 경우에는 요청되고 있는 쿠키를 전송하십시오.
* `expires` - 지속적 쿠키에 대한 만기 날짜를 설정하는 데 사용됩니다.

다음에는 [cookie-session](https://www.npmjs.com/package/cookie-session) 미들웨어를 사용한 예가 표시되어 있습니다.

```js
const session = require('cookie-session')
const express = require('express')
const app = express()

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  }
}))
```

<a name="ensure-your-dependencies-are-secure"></a>
## 종속 항목이 안전한지 확인

npm을 이용해 애플리케이션의 종속 항목을 관리하는 것은 강력하면서도 편리합니다.  그러나 사용 중인 패키지에는 애플리케이션에 영향을 미칠 수 있는 치명적인 보안 취약성이 포함되어 있을 수도 있습니다.  앱의 보안성은 종속 항목 내의 "가장 약한 링크"의 보안성에 따라 결정됩니다.

npm@6부터 npm은 자동으로 모든 설치 요청을 검사합니다. 또한 `npm audit`을 이용해 여러분의 의존성 트리를 검사할 수 있습니다.

```console
$ npm audit
```

더 강한 보안을 원한다면, [Snyk](https://snyk.io/)를 사용하십시오.

Snyk offers both a [command-line tool](https://www.npmjs.com/package/snyk) and a [Github 통합](https://snyk.io/docs/github) that checks your application against [Snyk's open source vulnerability database](https://snyk.io/vuln/) for any known vulnerabilities in your dependencies. Install the CLI as follows:
Sync는 [커맨드라인 도구](https://www.npmjs.com/package/snyk)와 [Snyk's open source vulnerability database](https://snyk.io/vuln/)에 있는 여러분의 의존성들의 알려진 취약성에 대한 검사를 실행하는 [Github integration](https://snyk.io/docs/github)을 제공합니다. 아래 커맨드로 설치합니다.

```console
$ npm install -g snyk
$ cd your-app
```

아래 명령으로 애플리케이션의 취약점을 검사합니다.

```console
$ snyk test
```

Use this command to open a wizard that walks you through the process of applying updates or patches to fix the vulnerabilities that were found:
아래 명령으로 찾은 취약점을 고치는 패치나 업데이트를 받는 설치 마법사를 실행합니다.

```console
$ snyk wizard
```

<a name="avoid-other-known-vulnerabilities"></a>
## 그 외의 알려져 있는 취약점 회피

Express에, 또는 앱에 사용되는 다른 모듈에 영향을 미칠 수 있는 [Node Security Project](https://npmjs.com/advisories)의 보안 권고문에 항상 주의를 기울이십시오.  일반적으로 Node Security Project는 Node의 보안과 관련된 지식 및 도구에 대한 훌륭한 자원입니다.

마지막으로, 다른 모든 웹 앱과 마찬가지로 Express 앱은 다양한 웹 기반 공격에 취약할 수 있습니다. 알려져 있는 [웹 취약성](https://www.owasp.org/index.php/Top_10_2013-Top_10)을 숙지한 후 이러한 취약성을 피하기 위한 예방 조치를 취하십시오.

<a name="additional-considerations"></a>
## 추가적인 고려사항

유용한 [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)에서 발췌한 몇 가지 추가적인 권장사항은 다음과 같습니다. 아래의 권장사항에 대한 모든 상세 정보를 확인하려면 해당 블로그 게시물을 참조하십시오.

* [csurf](https://www.npmjs.com/package/csurf) 미들웨어를 이용하여 교차 사이트 요청 위조(CSRF)로부터 보호하십시오.
* 항상 사용자 입력을 필터링하고 사용자 입력에서 민감한 데이터를 제거하여 XSS(Cross-site scripting) 및 명령 인젝션 공격으로부터 보호하십시오.
* 매개변수화된 조회 또는 준비된 명령문을 이용하여 SQL 인젝션 공격으로부터 방어하십시오.
* 오픈 소스 방식의 [sqlmap](http://sqlmap.org/) 도구를 이용하여 앱 내의 SQL 인젝션 취약성을 발견하십시오.
* [nmap](https://nmap.org/) 및 [sslyze](https://github.com/nabla-c0d3/sslyze) 도구를 이용하여 SSL 암호, 키 및 재협상의 구성, 그리고 인증서의 유효성을 테스트하십시오.
* [safe-regex](https://www.npmjs.com/package/safe-regex)를 이용하여 정규식이 [정규식 서비스 거부](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS) 공격을 쉽게 받지 않도록 하십시오.
