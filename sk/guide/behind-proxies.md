---
layout: page
title: Express za proxy
menu: guide
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Express za proxy

Ak chcete, aby vaša Express aplikácia bežala za proxy, nastavte (pomocou [app.set()](/{{ page.lang }}/4x/api.html#app.set)) aplikačnú premennú `trust proxy` na jednu z hodnôt z nasledujúcej tabuľky.

<div class="doc-box doc-info" markdown="1">
Aplikácia bude bežať i v prípade, ak aplikačná premenná `trust proxy` nie je nastavená. Aplikácia však nesprávne zaregistruje IP adresu proxy, ako klientskú IP adresu dokým `trust proxy` nebude nastavené.
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Typ</th><th>Hodnota</th></tr></thead>
  <tbody>
    <tr>
      <td>Boolean</td>
<td markdown="1">
Ak je `true`, IP addresa klienta bude chápaná ako left-most entry v `X-Forwarded-*` hlavičke.

Ak je `false`, aplikácia sa chápe, ako priamo vystavená na Internet a klientská IP adresa je odvodená z `req.connection.remoteAddress`. Toto je defaultné nastavenie.
</td>
    </tr>
    <tr>
      <td>IP addresses</td>
<td markdown="1">
IP adresa, subnet, alebo pole IP adries a subnet-ov (podsietí), ktorým má aplikácia dôverovať. Nasledujúci zoznam zobrazuje predkonfigurované názvy subnet-ov:

* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

IP adresy môžete nastaviť ktorýmkoľvek z nasledujúcich spôsobov:

<pre>
<code class="language-js" translate="no">app.set('trust proxy', 'loopback'); // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123'); // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal'); // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']); // specify multiple subnets as an array</code>
</pre>

Pri zadaní IP adresy alebo subnet-ov, sú tieto vylúčené z procesu vyhodnocovania a nedôveryhodná IP adresa najbližsie k aplikačnému serveru je vyhodnotená ako IP adresa klienta.
</td>
    </tr>
    <tr>
      <td>Number</td>
<td markdown="1">
Doveruj n-tému hop-u od front-facing proxy servera ako klient.
</td>
    </tr>
    <tr>
      <td>Function</td>
<td markdown="1">
Vlastná implementácia dôveryhodnosti. Použite to iba v prípade, ak viete čo robíte.
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

Nastavením inej ako `false` hodnoty `trust proxy` implikuje tieto tri dôležité zmeny:

<ul>
  <li markdown="1">Hodnota [req.hostname](/{{ page.lang }}/api.html#req.hostname) je odvodená od hodnoty nastavenej v `X-Forwarded-Host` hlavičke, ktorá môže byť nastavená klientom alebo proxy.
  </li>
  <li markdown="1">Hlavička `X-Forwarded-Proto` môže byť nastavená z reverse proxy aby oznámila aplikácii, či je `https` alebo  `http` prípadne nevalidná hodnota. Táto hodnota reflektuje [req.protocol](/{{ page.lang }}/api.html#req.protocol).
  </li>
  <li markdown="1">Hodnoty [req.ip](/{{ page.lang }}/api.html#req.ip) a [req.ips](/{{ page.lang }}/api.html#req.ips) sú naplnené zoznamom adries z `X-Forwarded-For`.
  </li>
</ul>

Nastavenie `trust proxy` je implementované pomocou [proxy-addr](https://www.npmjs.com/package/proxy-addr) modulu. Pre viac informácií si pozrite jeho dokumentáciu.
