---
layout: page
title: Express hinter Proxys
menu: guide
lang: de
---

# Express hinter Proxys

Bei der Ausführung einer Express-Anwendung hinter einem Proxy legen Sie die Anwendungsvariable `trust proxy` (mithilfe von [app.set()](/{{ page.lang }}/4x/api.html#app.set)) auf einen der in der folgenden Tabelle enthaltenen Werte fest:

<div class="doc-box doc-info" markdown="1">
Auch wenn die Anwendungsausführung nicht fehlschlägt, wenn die Anwendungsvariable `trust proxy` nicht festgelegt wurde, wird die IP-Adresse des Proxys nicht ordnungsgemäß als Client-IP-Adresse eingetragen, es sei denn, `trust proxy` wurde konfiguriert.
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Typ</th><th>Wert</th></tr></thead>
  <tbody>
    <tr>
      <td>Boolesch</td>
<td markdown="1">
Wenn `true` angegeben wird, wird die IP-Adresse des Clients als der äußerst rechte Eintrag im Header `X-Forwarded-*` interpretiert.
Wenn `false` angegeben wird, wird die Anwendung als direkte Verbindung zum Internet gesehen. Die IP-Adresse des Clients wird dann von `req.connection.remoteAddress` abgeleitet. Dies ist die Standardeinstellung.
</td>
    </tr>
    <tr>
      <td>IP-Adressen</td>
<td markdown="1">
Eine einzelne IP-Adresse, ein Teilnetz oder ein Array von IP-Adressen und Teilnetzen, denen vertraut werden kann. Die folgende Liste zeigt die vorkonfigurierten Teilnetznamen:
* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`.

Sie können IP-Adressen wie folgt festlegen:

<pre>
<code class="language-js" translate="no">app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code>
</pre>

Sobald die Werte angegeben wurden, werden die betreffenden IP-Adressen und Teilnetze aus dem Adressfeststellungsprozess ausgeschlossen. Die nicht vertrauenswürdige IP-Adresse, die am nächsten zum Anwendungsserver liegt, wird als IP-Adresse des Clients festgelegt.
</td>
    </tr>
    <tr>
      <td>Zahl</td>
<td markdown="1">
Dem `n`-ten Hop vom Proxy-Server soll als Client vertraut werden.
</td>
    </tr>
    <tr>
      <td>Funktion</td>
<td markdown="1">
Individuell angepasste, vertrauenswürdige Implementierung. Dies sollten Sie nur verwenden, wenn Sie genau wissen, was Sie tun. <pre>
<code class="language-js" translate="no">app.set('trust proxy', function (ip) {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
  else return false;
});</code>
</pre>
</td>
    </tr>
  </tbody>
</table>

Die Festlegung eines anderen `trust proxy`-Werts als `false` resultiert in drei wichtigen Änderungen:

<ul>
  <li markdown="1">Der Wert für [req.hostname](/{{ page.lang }}/api.html#req.hostname) wird vom Wert abgeleitet, der im Header `X-Forwarded-Host` festgelegt wurde. Dieser Wert kann vom Client oder Proxy festgelegt werden.
</li>
  <li markdown="1">`X-Forwarded-Proto` kann vom Reverse Proxy festgelegt werden, um der Anwendung mitzuteilen, ob es sich um `https` oder `http` oder sogar um einen ungültigen Namen handelt. Dieser Wert wird durch [req.protocol](/{{ page.lang }}/api.html#req.protocol) abgebildet.
  </li>
  <li markdown="1">Als Werte für [req.ip](/{{ page.lang }}/api.html#req.ip) und [req.ips](/{{ page.lang }}/api.html#req.ips) wird die Liste der Adressen aus `X-Forwarded-For` herangezogen.
  </li>
</ul>

Die Einstellung für `trust proxy` wird mithilfe des [proxy-addr](https://www.npmjs.com/package/proxy-addr)-Pakets implementiert. Weitere Informationen finden Sie in der zugehörigen Dokumentation.
