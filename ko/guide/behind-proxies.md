---
layout: page
title: 프록시 환경에서 Express 사용
description: Learn how to configure Express.js applications to work correctly behind reverse proxies, including using the trust proxy setting to handle client IP addresses.
menu: guide
lang: ko
redirect_from: /guide/behind-proxies.html
---

# 프록시 환경에서 Express 사용

When running an Express app behind a reverse proxy, some of the Express APIs may return different values than expected. In order to adjust for this, the `trust proxy` application setting may be used to expose information provided by the reverse proxy in the Express APIs. The most common issue is express APIs that expose the client's IP address may instead show an internal IP address of the reverse proxy.

<div class="doc-box doc-info" markdown="1">
When configuring the `trust proxy` setting, it is important to understand the exact setup of the reverse proxy. Since this setting will trust values provided in the request, it is important that the combination of the setting in Express matches how the reverse proxy operates.
</div>

프록시 뒤에서 Express 앱을 실행할 때는, ([app.set()](/{{ page.lang }}/4x/api.html#app.set)을 이용하여) 애플리케이션 변수 `trust proxy`를 다음 표에 나열된 값 중 하나로 설정하십시오.

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>유형</th><th>값</th></tr></thead>
  <tbody>
    <tr>
      <td>부울</td>
<td markdown="1">
`true`인 경우, 클라이언트의 IP 주소는 `X-Forwarded-*` 내의 가장 왼쪽 입력 항목인 것으로 인식됩니다.

`false`인 경우, 앱이 직접 인터넷에 연결되는 것으로 인식되며 클라이언트의 IP 주소는 `req.connection.remoteAddress`로부터 도출됩니다. 이 설정이 기본 설정입니다.

<div class="doc-box doc-warn" markdown="1">
When setting to `true`, it is important to ensure that the last reverse proxy trusted is removing/overwriting all of the following HTTP headers: `X-Forwarded-For`, `X-Forwarded-Host`, and `X-Forwarded-Proto`, otherwise it may be possible for the client to provide any value.
</div>
</td>
    </tr>
    <tr>
      <td>IP addresses</td>
<td markdown="1">
An IP address, subnet, or an array of IP addresses and subnets to trust as being a reverse proxy. The following list shows the pre-configured subnet names:

- loopback - `127.0.0.1/8`, `::1/128`
- linklocal - `169.254.0.0/16`, `fe80::/10`
- uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

다음의 방법 중 하나로 IP 주소를 설정할 수 있습니다.

```js
app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array
```

IP 주소 또는 서브넷이 지정되는 경우, 해당 IP 주소 또는 서브넷은 주소 결정 프로세스에서 제외되며, 신뢰할 수 있는 것으로 지정되지 않은 IP 주소 중 애플리케이션 서버에서 가장 가까운 IP 주소가 클라이언트의 IP 주소로 결정됩니다. This works by checking if `req.socket.remoteAddress` is trusted. If so, then each address in `X-Forwarded-For` is checked from right to left until the first non-trusted address.

</td>
    </tr>
    <tr>
      <td>숫자</td>
<td markdown="1">
Use the address that is at most `n` number of hops away from the Express application. `req.socket.remoteAddress` is the first hop, and the rest are looked for in the `X-Forwarded-For` header from right to left. A value of `0` means that the first untrusted address would be `req.socket.remoteAddress`, i.e. there is no reverse proxy.

<div class="doc-box doc-warn" markdown="1">
When using this setting, it is important to ensure there are not multiple, different-length paths to the Express application such that the client can be less than the configured number of hops away, otherwise it may be possible for the client to provide any value.
</div>
</td>
    </tr>
    <tr>
      <td>Function</td>
<td markdown="1">
Custom trust implementation.

```js
app.set('trust proxy', (ip) => {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true // trusted IPs
  else return false
})
```

</td>
    </tr>
  </tbody>
</table>

Enabling `trust proxy` will have the following impact:

<ul>
  <li markdown="1">[req.hostname](/{{ page.lang }}/api.html#req.hostname)의 값은 `X-Forwarded-Host` 헤더에 설정된 값으로부터 도출되며, 이 값은 클라이언트 또는 프록시에 의해 설정될 수 있습니다.
  </li>
  <li markdown="1">`https`인지, `http`인지, 또는 잘못된 이름인지의 여부를 앱에 알리기 위하여 역방향 프록시가 `X-Forwarded-Proto`를 설정할 수 있습니다. 이 값에는 [req.protocol](/{{ page.lang }}/api.html#req.protocol)이 반영됩니다.
  </li>
  <li markdown="1">[req.ip](/{{ page.lang }}/api.html#req.ip) 값 및 [req.ips](/{{ page.lang }}/api.html#req.ips) 값에는 `X-Forwarded-For`의 주소 목록이 입력됩니다.
  </li>
</ul>

`trust proxy` 설정은 [proxy-addr](https://www.npmjs.com/package/proxy-addr) 패키지를 이용해 구현됩니다. 자세한 정보는 해당 문서를 참조하십시오.
