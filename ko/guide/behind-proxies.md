---
layout: page
title: 프록시 환경에서 Express 사용
menu: guide
lang: ko
---

# 프록시 환경에서 Express 사용

프록시 뒤에서 Express 앱을 실행할 때는, ([app.set()](/{{ page.lang }}/4x/api.html#app.set)을 이용하여) 애플리케이션 변수 `trust proxy`를 다음 표에 나열된 값 중 하나로 설정하십시오.

<div class="doc-box doc-info" markdown="1">
애플리케이션 변수 `trust proxy`가 설정되지 않아도 앱은 실행되지만, `trust proxy`가 구성되지 않으면 프록시의 IP 주소가 클라이언트 IP 주소로 잘못 등록됩니다.
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>유형</th><th>값</th></tr></thead>
  <tbody>
    <tr>
      <td>부울</td>
<td markdown="1">
`true`인 경우, 클라이언트의 IP 주소는 `X-Forwarded-*` 내의 가장 왼쪽 입력 항목인 것으로 인식됩니다.

`false`인 경우, 앱이 직접 인터넷에 연결되는 것으로 인식되며 클라이언트의 IP 주소는 `req.connection.remoteAddress`로부터 도출됩니다. 이 설정이 기본 설정입니다.
</td>
    </tr>
    <tr>
      <td>IP 주소</td>
<td markdown="1">
신뢰할 IP 주소나 서브넷, 또는 IP 주소 및 서브넷의 배열입니다. 아래의 목록에는 사전에 구성된 서브넷 이름이 표시되어 있습니다.

* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

다음의 방법 중 하나로 IP 주소를 설정할 수 있습니다.

<pre>
<code class="language-js" translate="no">app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code>
</pre>

IP 주소 또는 서브넷이 지정되는 경우, 해당 IP 주소 또는 서브넷은 주소 결정 프로세스에서 제외되며, 신뢰할 수 있는 것으로 지정되지 않은 IP 주소 중 애플리케이션 서버에서 가장 가까운 IP 주소가 클라이언트의 IP 주소로 결정됩니다.
</td>
    </tr>
    <tr>
      <td>숫자</td>
<td markdown="1">
가장 앞의 프록시 서버로부터 `n`번 째 홉을 클라이언트로서 신뢰합니다.
</td>
    </tr>
    <tr>
      <td>함수</td>
<td markdown="1">
사용자 정의 신뢰 구현입니다. 이 방법을 올바르게 숙지하고 있는 경우에만 이 방법을 사용하십시오.
<pre>
<code class="language-js" translate="no">app.set('trust proxy', function (ip) {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
  else return false;
});</code>
</pre>
</td>
    </tr>
  </tbody>
</table>

`trust proxy` 값을 `false` 이외의 값으로 설정하면 다음과 같은 세 가지의 중요한 변화가 발생합니다.

<ul>
  <li markdown="1">[req.hostname](/{{ page.lang }}/api.html#req.hostname)의 값은 `X-Forwarded-Host` 헤더에 설정된 값으로부터 도출되며, 이 값은 클라이언트 또는 프록시에 의해 설정될 수 있습니다.
  </li>
  <li markdown="1">`https`인지, `http`인지, 또는 잘못된 이름인지의 여부를 앱에 알리기 위하여 역방향 프록시가 `X-Forwarded-Proto`를 설정할 수 있습니다. 이 값에는 [req.protocol](/{{ page.lang }}/api.html#req.protocol)이 반영됩니다.
  </li>
  <li markdown="1">[req.ip](/{{ page.lang }}/api.html#req.ip) 값 및 [req.ips](/{{ page.lang }}/api.html#req.ips) 값에는 `X-Forwarded-For`의 주소 목록이 입력됩니다.
  </li>
</ul>

`trust proxy` 설정은 [proxy-addr](https://www.npmjs.com/package/proxy-addr) 패키지를 이용해 구현됩니다. 자세한 정보는 해당 문서를 참조하십시오.
