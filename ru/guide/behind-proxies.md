---
layout: page
title: Express за прокси
menu: guide
lang: ru
---

# Express за прокси

При запуске приложения Express за прокси-сервером, необходимо указать (с помощью [app.set()](/{{ page.lang }}/4x/api.html#app.set)) для переменной приложения `trust proxy` одно из значений, приведенных в таблице ниже.

<div class="doc-box doc-info" markdown="1">
Хотя приложение будет запущено и без указания значения переменной приложения `trust proxy`, отсутствие заданного значения `trust proxy` приведет к некорректной регистрации IP-адреса прокси в качестве клиентского IP-адреса.
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Тип</th><th>Значение</th></tr></thead>
  <tbody>
    <tr>
      <td>Булевский</td>
<td markdown="1">
Если указано значение `true`, клиентским IP-адресом считается первая слева запись в заголовке `X-Forwarded-*`.

Если указано значение `false`, приложение считается имеющим прямой выход в Интернет, и IP-адрес клиента будет производным от `req.connection.remoteAddress`. Это значение используется по умолчанию.
</td>
    </tr>
    <tr>
      <td>IP-адреса</td>
<td markdown="1">
IP-адрес, подсеть или массив IP-адресов и подсетей, считающихся надежными. В приведенном ниже списке перечислены предварительно заданные имена подсетей:

* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

IP-адреса можно задать любым из указанных ниже способов:

<pre>
<code class="language-js" translate="no">app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code>
</pre>

Если IP-адреса или подсети указаны, они исключаются из процесса определения адреса, и незащищенный IP-адрес, ближайший к серверу приложений, будет определен как IP-адрес клиента.
</td>
    </tr>
    <tr>
      <td>Число</td>
<td markdown="1">
Считать защищенным `n`-й элемент пути от прокси-сервера со стороны клиента, в качестве клиента.
</td>
    </tr>
    <tr>
      <td>Функция</td>
<td markdown="1">
Реализация нестандартного механизма защиты. Используйте этот метод, только если вы уверены в своих знаниях.
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

Установка значения, отличного от `false`, для `trust proxy` ведет к трем существенным изменениям:

<ul>
  <li markdown="1">Значение [req.hostname](/{{ page.lang }}/api.html#req.hostname) является производным от значения, указанного в заголовке `X-Forwarded-Host`, который может быть задан клиентом или прокси.
  </li>
  <li markdown="1">Заголовок `X-Forwarded-Proto` может быть задан обратным прокси-сервером и указывает приложению на использование протокола `https`, или  `http`, или даже недопустимого имени. Это значение отражается в [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">Значения [req.ip](/{{ page.lang }}/api.html#req.ip) и [req.ips](/{{ page.lang }}/api.html#req.ips) заполняются собой списком адресов, взятых из `X-Forwarded-For`.
  </li>
</ul>

Параметр `trust proxy` реализуется с помощью пакета [proxy-addr](https://www.npmjs.com/package/proxy-addr). Дополнительная информация приведена в документации к нему.
