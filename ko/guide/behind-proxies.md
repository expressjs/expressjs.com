---
layout: page
title: 프록시 환경에서 Express 사용
description: Express.js 애플리케이션을 리버스 프록시 뒤에서 올바르게 작동하도록 설정하는 방법을 알아보십시오. 클라이언트 IP 주소를 처리하기 위해 `trust proxy` 설정을 사용하는 것을 포함합니다.
menu: guide
redirect_from: "  "
---

# 프록시 환경에서 Express 사용

Express 앱이 리버스 프록시 뒤에서 실행될 때, 일부 Express API는 예상과 다른 값을 반환할 수 있습니다. 이를 조정하기 위해 `trust proxy` 애플리케이션 설정을 사용하여, Express API에서 리버스 프록시가 제공한 정보를 노출하도록 할 수 있습니다. 가장 흔한 문제는 클라이언트의 IP 주소를 반환하는 Express API가 리버스 프록시의 내부 IP 주소를 대신 보여주는 경우입니다.

<div class="doc-box doc-info" markdown="1">
`trust proxy` 설정을 구성할 때, 리버스 프록시의 정확한 구성 방식을 이해하는 것이 중요합니다. 이 설정은 요청에 포함된 값을 신뢰하게 만들기 때문에, Express의 설정이 리버스 프록시의 동작 방식과 일치해야 합니다.
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

<div class="doc-box doc-warn" markdown="1">`trust proxy`를 `true`로 설정할 경우, 마지막으로 신뢰할 수 있는 리버스 프록시가 다음의 HTTP 헤더들을 제거하거나 덮어쓰는지 반드시 확인해야 합니다: `X-Forwarded-For`, `X-Forwarded-Host`, `X-Forwarded-Proto`. 그렇지 않으면 클라이언트가 임의의 값을 제공하는 것이 가능해질 수 있습니다.</div>
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

IP 주소 또는 서브넷이 지정되는 경우, 해당 IP 주소 또는 서브넷은 주소 결정 프로세스에서 제외되며, 신뢰할 수 있는 것으로 지정되지 않은 IP 주소 중 애플리케이션 서버에서 가장 가까운 IP 주소가 클라이언트의 IP 주소로 결정됩니다. 이 설정은 `req.socket.remoteAddress`가 신뢰된 주소인지 확인하는 방식으로 작동합니다. 신뢰된 경우, `X-Forwarded-For` 헤더에 있는 각 IP 주소를 오른쪽에서 왼쪽으로 검사하며, 처음으로 신뢰되지 않은 주소를 만날 때까지 확인합니다.

</td>
    </tr>
    <tr>
      <td>숫자</td>
<td markdown="1">
Express 애플리케이션으로부터 최대 `n` 홉(hop) 떨어진 위치에 있는 주소를 사용하게 됩니다.
 `req.socket.remoteAddress`는 첫 번째 홉이며, 그 외의 주소들은 `X-Forwarded-For` 헤더에서 오른쪽에서 왼쪽 방향으로 조회됩니다. `0` 값을 설정하면, 첫 번째로 신뢰되지 않은 주소는 `req.socket.remoteAddress`가 되며, 이는 리버스 프록시가 없는 상태를 의미합니다.

<div class="doc-box doc-warn" markdown="1">이 설정을 사용할 때는 Express 애플리케이션까지 도달하는 경로가 하나 이상 존재하지 않도록, 즉 서로 다른 홉 수의 경로가 존재하지 않도록 주의해야 합니다. 그렇지 않으면 클라이언트가 설정된 홉 수보다 가까운 위치에서 접근할 수 있게 되어, 임의의 값을 제공하는 것이 가능해질 수 있습니다.</div>
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

`trust proxy`를 활성화하면 다음과 같은 영향을 미칩니다:

<ul>
  <li markdown="1">[req.hostname](/{{ page.lang }}/api.html#req.hostname)의 값은 `X-Forwarded-Host` 헤더에 설정된 값으로부터 도출되며, 이 값은 클라이언트 또는 프록시에 의해 설정될 수 있습니다.
  </li>
  <li markdown="1">`https`인지, `http`인지, 또는 잘못된 이름인지의 여부를 앱에 알리기 위하여 역방향 프록시가 `X-Forwarded-Proto`를 설정할 수 있습니다. 이 값에는 [req.protocol](/{{ page.lang }}/api.html#req.protocol)이 반영됩니다.
  </li>
  <li markdown="1">[req.ip](/{{ page.lang }}/api.html#req.ip) 값 및 [req.ips](/{{ page.lang }}/api.html#req.ips) 값에는 `X-Forwarded-For`의 주소 목록이 입력됩니다.
  </li>
</ul>

`trust proxy` 설정은 [proxy-addr](https://www.npmjs.com/package/proxy-addr) 패키지를 이용해 구현됩니다. 자세한 정보는 해당 문서를 참조하십시오.
