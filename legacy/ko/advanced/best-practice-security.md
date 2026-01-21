---
layout: page
title: 프로덕션 환경의 Express를 위한 보안 우수 사례
description: Express 애플리케이션을 프로덕션 환경에서 운영할 때 반드시 지켜야 할 중요한 보안 모범 사례를 알아봅니다. 여기에는 TLS 사용, 입력값 검증, 보안 쿠키 설정, 그리고 다양한 취약점 예방 방법이 포함됩니다.
menu: advanced
order: 3
redirect_from: "  "
---

# 프로덕션 우수 사례: 보안

## 개요

**"프로덕션 (production)"** 이라는 용어는 소프트웨어 라이프사이클 중 애플리케이션 또는 API가 최종 사용자 또는 소비자에게 정식으로 제공되는 단계를 말합니다. 이와 반대로 _"개발(development)"_ 단계에서는 아직 코드가 활발하게 작성 및 테스트되며 애플리케이션은 외부 액세스에 개방되지 않습니다. 이에 대응하는 시스템 환경은 각각 _프로덕션_ 환경 및 _개발_ 환경이라고 부릅니다.

개발 환경 및 프로덕션 환경은 일반적으로 서로 다르게 설정되며 두 환경의 요구사항은 크게 다릅니다. 개발 환경에서는 좋은 것일지라도 프로덕션 환경에서는 허용되지 않을 수도 있습니다. 예를 들면, 개발 환경에서는 디버깅을 위해 상세한 오류 로깅이 선호될 수 있지만, 이러한 행동은 프로덕션 환경에서 보안 우려사항이 될 수 있습니다. 그리고 개발 환경에서는 확장성, 신뢰성 및 성능에 대해 걱정할 필요가 없지만, 이러한 요인들은 프로덕션 환경에서 매우 중요해집니다.

{% capture security-note %}

만약 Express에서 보안 취약점을 발견하셨다면, [보안 정책 및 절차](/en/resources/contributing.html#security-policies-and-procedures)를 참고하시기 바랍니다.

{% endcapture %}

{% include admonitions/note.html content=security-note %}

이 문서에서는 프로덕션 환경에 배치된 Express 애플리케이션을 위한 몇 가지 보안 우수 사례에 대해 논의합니다.

- [프로덕션 모범 사례: 보안](#production-best-practices-security)
  - [개요](#overview)
  - [Express의 사용 중단되었거나 취약한 버전을 사용하지 않습니다](#dont-use-deprecated-or-vulnerable-versions-of-express)
  - [TLS 사용](#use-tls)
  - [사용자 입력을 신뢰하지 않습니다](#do-not-trust-user-input)
    - [오픈 리다이렉트를 방지합니다](#prevent-open-redirects)
  - [Helmet 사용](#use-helmet)
  - [지문 인식 감소](#reduce-fingerprinting)
  - [쿠키를 안전하게 사용](#use-cookies-securely)
    - <a name="use-cookies-securely"></a>
    - [ieNoOpen](https://github.com/helmetjs/ienoopen)은 IE8 이상에 대해 `X-Download-Options`를 설정합니다.
  - [인증 체계에 대한 브루스 포트 공격 방지](#prevent-brute-force-attacks-against-authorization)
  - [종속 항목이 안전한지 확인](#ensure-your-dependencies-are-secure)
    - [그 외의 알려져 있는 취약점 회피](#avoid-other-known-vulnerabilities)
  - [추가적인 고려사항](#additional-considerations)

## 더 이상 사용되지 않거나 취약성이 있는 버전의 Express를 사용 중지

Express 2.x 및 3.x에 대한 유지보수는 더 이상 이루어지지 않습니다. 이러한 버전에서의 보안 및 성능 문제는 수정되지 않습니다. 이러한 버전은 사용하지 마십시오! 아직 버전 4로 이전하지 않은 경우에는 [마이그레이션 안내서](/{{ page.lang }}/guide/migrating-4.html)를 따르십시오.

또한 [보안 업데이트 페이지](/{{ page.lang }}/advanced/security-updates.html)의 목록에 포함된 취약성 있는 Express 버전을 사용하고 있지 않은지 확인하십시오. 취약성 있는 Express 버전을 사용하고 있는 경우에는 안정적인 릴리스 중 하나로 업데이트해야 하며, 가능하면 최신 버전으로 업데이트하는 것이 좋습니다.

## TLS 사용

앱이 민감한 데이터를 다루거나 전송하는 경우에는 [전송 계층 보안](https://en.wikipedia.org/wiki/Transport_Layer_Security)(TLS)을 사용하여 연결 및 데이터를 보호하십시오. 이 기술은 데이터를 클라이언트로부터 서버로 전송하기 전에 데이터를 암호화하며, 따라서 몇 가지 일반적인(그리고 쉬운) 해킹을 방지합니다. Ajax 및 POST 요청은 브라우저에서 분명하게 보이지 않고 "숨겨진" 것처럼 보일 수도 있지만, 이러한 요청의 트래픽은 [패킷 가로채기](https://en.wikipedia.org/wiki/Packet_analyzer) 및 [중간자 공격](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)에 취약합니다.

여러분은 SSL(Secure Socket Layer) 암호화에 익숙할 것입니다. [TLS는 단순히 SSL이 다음 단계로 발전된 형태입니다](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515\(v=vs.85\).aspx). 즉, 이전에 SSL을 사용했다면 TLS로의 업그레이드를 고려해야 합니다. 일반적으로 TLS의 처리를 위해서는 Nginx를 권장합니다. Nginx(및 기타 서버)에서 TLS를 구성하는 방법에 대한 좋은 참조 자료를 확인하려면 [Recommended Server Configurations(Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations)를 참조하십시오.

또한 무료 TLS 인증서를 얻기 위한 편리한 도구 중 하나는 [Internet Security Research Group(ISRG)](https://letsencrypt.org/isrg/)이 제공하는 무료의 자동 개방형 인증 기관(CA)인 [Let's Encrypt](https://letsencrypt.org/about/)입니다.

## 사용자 입력을 신뢰하지 않습니다

웹 애플리케이션에서 가장 중요한 보안 요구 사항 중 하나는 적절한 사용자 입력 검증 및 처리를 수행하는 것입니다. 이는 여러 형태로 나타나며, 이 문서에서는 모든 경우를 다루지 않습니다.
궁극적으로 애플리케이션이 수용하는 사용자 입력 유형을 검증하고 올바르게 처리하는 책임은 개발자에게 있습니다.

### 오픈 리다이렉트 방지

잠재적으로 위험한 사용자 입력의 예로 오픈 리다이렉트가 있습니다. 이는 애플리케이션이 URL을 사용자 입력으로 받아들여 (예: `?url=https://example.com` 쿼리 문자열)  
`res.redirect`를 사용해 `location` 헤더를 설정하고 3xx 상태 코드를 반환하는 경우입니다.

애플리케이션은 악성 링크(예: 피싱 사이트) 로 사용자를 유도하는 위험을 방지하기 위해, 들어오는 URL에 대해 리다이렉트를 허용하는지 반드시 검증해야 합니다.

아래는 `res.redirect` 또는 `res.location`을 사용하기 전에 URL을 검증하는 예시입니다.

```js
app.use((req, res) => {
  try {
    if (new Url(req.query.url).host !== 'example.com') {
      return res.status(400).end(`Unsupported redirect to host: ${req.query.url}`)
    }
  } catch (e) {
    return res.status(400).end(`Invalid url: ${req.query.url}`)
  }
  res.redirect(req.query.url)
})
```

## Helmet 사용

[Helmet](https://www.npmjs.com/package/helmet)을 이용하면 HTTP 헤더를 적절히 설정하여 몇 가지 잘 알려진 웹 취약성으로부터 앱을 보호할 수 있습니다.

Helmet은 보안 관련 HTTP 응답 헤더를 설정하는 미들웨어 함수입니다. Helmet은 기본적으로 다음 헤더들을 설정합니다.

- `Content-Security-Policy`: 페이지에서 허용되는 콘텐츠를 강력하게 지정하여 여러 공격을 완화합니다.
- `Cross-Origin-Opener-Policy`: 페이지의 프로세스 격리를 돕습니다.
- `Cross-Origin-Resource-Policy`: 다른 출처가 리소스를 크로스 오리진으로 로드하는 것을 차단합니다.
- `Origin-Agent-Cluster`: 프로세스 격리를 출처(origin) 단위로 변경합니다.
- `Referrer-Policy`: [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) 헤더를 제어합니다.
- `Strict-Transport-Security`: 브라우저에 HTTPS를 우선 사용하도록 지시합니다.
- `X-Content-Type-Options`: [MIME 스니핑](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#mime_sniffing)을 방지합니다.
- `X-DNS-Prefetch-Control`: DNS 프리페칭 제어를 담당합니다.
- `X-Download-Options`: 다운로드를 저장하도록 강제합니다 (인터넷 익스플로러 전용)
- `X-Frame-Options`: [클릭재킹](https://en.wikipedia.org/wiki/Clickjacking) 공격을 완화하기 위한 레거시 헤더입니다.
- `X-Permitted-Cross-Domain-Policies`: Acrobat과 같은 Adobe 제품의 크로스 도메인 동작을 제어합니다.
- `X-Powered-By`: 웹 서버 정보에 관한 헤더입니다. 해당 헤더는 단순 공격에 악용될 수 있어 제거되었습니다
- `X-XSS-Protection`: [XSS 공격](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)을 완화하려 했던 레거시 헤더이나, 오히려 문제를 악화시키기 때문에 Helmet에서는 비활성화합니다

각 헤더는 필요에 따라 설정하거나 비활성화할 수 있습니다. 자세한 내용은 [Helmet 공식 문서를][helmet] 참고하시기 바랍니다.

다른 모든 모듈처럼 Helmet은 다음과 같이 설치할 수 있습니다.

```bash
$ npm install helmet
```

코드에서 Helmet을 사용하는 방법은 문서를 참고하세요

```js
// ...

const helmet = require('helmet')
app.use(helmet())

// ...
```

## 지문 인식(Fingerprinting) 감소

서버가 사용하는 소프트웨어를 공격자가 식별하는 능력을 줄이는 것은 추가적인 보안 계층을 제공할 수 있습니다. 이를 ‘지문 인식(fingerprinting)’이라 합니다. 비록 지문 인식 자체가 직접적인 보안 문제는 아니지만, 이를 줄임으로써 전체적인 보안 수준이 향상됩니다.
서버 소프트웨어는 특정 요청에 대한 응답 방식, 예를 들어 HTTP 응답 헤더 등에서 특이점을 통해 식별될 수 있습니다.

따라서 우수 사례는 다음과 같이 `app.disable()` 메소드를 이용해 이 헤더를 끄는 것입니다.

```js
app.disable('x-powered-by')
```

{% capture powered-advisory %}

`X-Powered-By` 헤더를 비활성화하는 것만으로는 숙련된 공격자가 Express를 사용하는 앱임을 완전히 차단할 수 없습니다. 이는 단순한 공격 시도를 막는 데는 도움이 되지만, 앱이 Express로 작동함을 식별할 수 있는 다른 방법도 존재합니다.

{% endcapture %}

{% include admonitions/note.html content=powered-advisory %}

Express는 자체 포맷의 "404 Not Found" 메시지와 포맷터 오류 응답 메시지도 전송합니다. 이러한 응답은  
[사용자 정의 404 핸들러 추가](/en/starter/faq.html#how-do-i-handle-404-responses) 및  
[사용자 정의 에러 핸들러 작성](/en/guide/error-handling.html#writing-error-handlers)을 통해 변경할 수 있습니다.

```js
// last app.use calls right before app.listen():

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

## 쿠키를 안전하게 사용

쿠키로 인해 앱이 악용에 노출되지 않도록 하기 위해 기본 세션 쿠키 이름을 사용하지 말고 쿠키 보안 옵션을 적절히 설정하십시오.

두 개의 기본 미들웨어 쿠키 세션 모듈은 다음과 같습니다.

- [express-session](https://www.npmjs.com/package/express-session)(Express 3.x에서 기본 제공되는 `express.session` 미들웨어 대체).
- [cookie-session](https://www.npmjs.com/package/cookie-session)(Express 3.x에서 기본 제공되는 `express.cookieSession` 미들웨어 대체).

이 두 모듈의 주요 차이점은 쿠키 세션 데이터를 저장하는 방식입니다. [express-session](https://www.npmjs.com/package/express-session) 미들웨어는 세션 데이터를 서버에 저장하며, 쿠키 자체에는 세션 데이터가 아니라 세션 ID만 저장됩니다. 기본적으로 express-session은 인메모리 스토리지를 이용하며, 프로덕션 환경용으로 설계되지 않았습니다. 프로덕션 환경에서는 확장 가능한 session-store를 설정해야 합니다. [호환 가능한 세션 스토어](https://github.com/expressjs/session#compatible-session-stores)의 목록을 참조하십시오.

이와 반대로 [cookie-session](https://www.npmjs.com/package/cookie-session) 미들웨어는 쿠키 기반의 스토리지를 구현하며, 하나의 세션 키가 아니라 세션 전체를 쿠키에 직렬화합니다. cookie-session은 세션 데이터의 크기가 상대적으로 작으며 (오브젝트가 아닌) 원시 값으로 쉽게 인코딩 가능할 때에만 사용하십시오. 브라우저는 하나의 쿠키당 4,096바이트 이상을 지원하도록 되어 있지만, 한계를 초과하지 않도록 보장하려면 하나의 도메인당 4,093바이트의 크기를 초과하지 마십시오. 또한, 클라이언트에서 쿠키 데이터를 볼 수 있으므로, 쿠키 데이터를 안전하게 또는 모호하게 유지해야 할 이유가 있는 경우에는 express-session을 선택하는 것이 더 나을 수 있습니다.

### 기본 세션 쿠키 이름을 사용하지 않음

기본 세션 쿠키 이름을 사용하면 앱을 공격에 노출시킬 수 있습니다. 이로 인해 제기되는 보안 문제는 `X-Powered-By`와 유사하며, 잠재적인 공격자는 이를 이용해 서버의 지문을 채취한 후 이에 따라 공격 대상을 설정할 수 있습니다.

다음에는 [cookie-session](https://www.npmjs.com/package/cookie-session) 미들웨어를 사용한 예가 표시되어 있습니다.

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

- `secure` - 브라우저가 HTTPS를 통해서만 쿠키를 전송하도록 합니다.
- `httpOnly` - 쿠키가 클라이언트 JavaScript가 아닌 HTTP(S)를 통해서만 전송되도록 하며, 이를 통해 XSS(Cross-site scripting) 공격으로부터 보호할 수 있습니다.
- `domain` - 쿠키의 도메인을 표시합니다. URL이 요청되고 있는 서버의 도메인에 대해 비교할 때 사용하십시오. 두 도메인이 일치하는 경우에는 그 다음으로 경로 속성을 확인하십시오.
- `path` - 쿠키의 경로를 표시합니다. 요청 경로에 대해 비교할 때 사용하십시오. 이 경로와 도메인이 일치하는 경우에는 요청되고 있는 쿠키를 전송하십시오.
- `expires` - 지속적 쿠키에 대한 만기 날짜를 설정하는 데 사용됩니다.

[noCache](https://github.com/helmetjs/nocache)는 `Cache-Control` 및 Pragma 헤더를 설정하여 클라이언트 측에서 캐싱을 사용하지 않도록 합니다.

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

## 인증에 대한 무차별 대입 공격(Brute-force) 방지

로그인 엔드포인트를 보호하여 개인정보를 안전하게 유지해야 합니다.

간단하면서도 효과적인 방법 중 하나는 다음 두 가지 기준으로 인증 시도를 차단하는 것입니다:

1. .
2. IP 주소로부터의 오랜 시간 동안의 실패 시도 횟수입니다. 예를 들어, 하루 동안 100번의 실패 시도를 한 경우 해당 IP 주소를 차단할 수 있습니다.

[rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible) 패키지는 이 기술을 쉽고 빠르게 구현할 수 있는 도구들을 제공합니다. [문서에서 brute-force 방지 예제](https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#login-endpoint-protection)를 참고할 수 있습니다.

## 종속 항목이 안전한지 확인

npm을 이용해 애플리케이션의 종속 항목을 관리하는 것은 강력하면서도 편리합니다. 그러나 사용 중인 패키지에는 애플리케이션에 영향을 미칠 수 있는 치명적인 보안 취약성이 포함되어 있을 수도 있습니다. 앱의 보안성은 종속 항목 내의 "가장 약한 링크"의 보안성에 따라 결정됩니다.

npm@6부터 npm은 자동으로 모든 설치 요청을 검사합니다. 또한 `npm audit`을 이용해 여러분의 의존성 트리를 검사할 수 있습니다.

```bash
$ npm audit
```

더 강한 보안을 원한다면, [Snyk](https://snyk.io/)를 사용하십시오.

Snyk offers both a [command-line tool](https://www.npmjs.com/package/snyk) and a [Github 통합](https://snyk.io/docs/github) that checks your application against [Snyk's open source vulnerability database](https://snyk.io/vuln/) for any known vulnerabilities in your dependencies. 다음과 같이 CLI을 설치합니다:

```bash
$ npm install -g snyk
$ cd your-app
```

아래 명령으로 애플리케이션의 취약점을 검사합니다.

```bash
$ snyk test
```

### 그 외의 알려져 있는 취약점 회피

Express에, 또는 앱에 사용되는 다른 모듈에 영향을 미칠 수 있는 [Node Security Project](https://npmjs.com/advisories)의 보안 권고문에 항상 주의를 기울이십시오. 일반적으로 Node Security Project는 Node의 보안과 관련된 지식 및 도구에 대한 훌륭한 자원입니다.

마지막으로, 다른 모든 웹 앱과 마찬가지로 Express 앱은 다양한 웹 기반 공격에 취약할 수 있습니다. 알려져 있는 [웹 취약성](https://www.owasp.org/www-project-top-ten/)을 숙지한 후 이러한 취약성을 피하기 위한 예방 조치를 취하십시오.

## 추가적인 고려사항

유용한 [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)에서 발췌한 몇 가지 추가적인 권장사항은 다음과 같습니다. 아래의 권장사항에 대한 모든 상세 정보를 확인하려면 해당 블로그 게시물을 참조하십시오.

- 항상 사용자 입력을 필터링하고 사용자 입력에서 민감한 데이터를 제거하여 XSS(Cross-site scripting) 및 명령 인젝션 공격으로부터 보호하십시오.
- 매개변수화된 조회 또는 준비된 명령문을 이용하여 SQL 인젝션 공격으로부터 방어하십시오.
- 오픈 소스 방식의 [sqlmap](http://sqlmap.org/) 도구를 이용하여 앱 내의 SQL 인젝션 취약성을 발견하십시오.
- [nmap](https://nmap.org/) 및 [sslyze](https://github.com/nabla-c0d3/sslyze) 도구를 이용하여 SSL 암호, 키 및 재협상의 구성, 그리고 인증서의 유효성을 테스트하십시오.
- [safe-regex](https://www.npmjs.com/package/safe-regex)를 이용하여 정규식이 [정규식 서비스 거부](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS) 공격을 쉽게 받지 않도록 하십시오.

[helmet]: https://helmetjs.github.io/