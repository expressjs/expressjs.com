---
layout: page
title: Express security aktualizácie
menu: advanced
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Security aktualizácie

<div class="doc-box doc-notice" markdown="1">
Vulnereabilita (zraniteĺnosť) Node.js priamo ovplyvňuje Express. Preto [sledujte vulnereabilitu Node.js](http://blog.nodejs.org/vulnerability/) a uistite sa, že používate poslednú stable verziu Node.js.
</div>

Zoznam nižšie obsahuje objavené a opravené vulnereability Express-u v špecifických verziách updatov.

**POZN.**: Ak si myslíte, že ste objavili security vulnerabilitu Express-u, prosím pozrite si
[Security Policies and Procedures](https://github.com/expressjs/express/blob/master/Security.md).

## 4.x

  * 4.11.1
    * Opravená vulnereabilita sprístupnenia root path-u v `express.static`, `res.sendfile` a `res.sendFile`
  * 4.10.7
    * Opravená open redirect vulnereabilita v `express.static` ([advisory](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 4.8.8
    * Opravená directory traversal vulnerabilita v `express.static` ([advisory](http://npmjs.com/advisories/32) , [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)).
  * 4.8.4
    * Node.js 0.10 obsahuje leak `file descriptorov` čo v určitých situáciách ovplyvňuje `express.static` a `res.sendfile`. Malicious (škodlivé) requesty môžu spôsobiť leakovanie `file descriptorov` a môžu eventuálne viesť k `EMFILE` errorom a neresponzívnosti servera.
  * 4.8.0
    * Sparse polia s extrémne vysokými indexami v query stringoch môžu spôsobiť, že pre realizáciu procesu nie je dostatok pamäte a následne crash servera.
    * Extrémne vnorené query string objekty môžu spôsobiť zablokovanie procesu a dočasnú neresponzívnosť servera.

## 3.x

  <div class="doc-box doc-warn" markdown="1">
  **Express 3.x UŽ NIE JE VIAC UDRŽIAVANÝ**

  Známe aj neznáme security problémy v 3.x už neboli viac riešené od poslednej aktualizácie (1 August, 2015). Používanie verzie 3.x by nemalo byť považované za bezpečné.
  </div>

  * 3.19.1
    * Opravená vulnereabilita sprístupnenia root path-u v `express.static`, `res.sendfile`, and `res.sendFile`
  * 3.19.0
    * Opravená open redirect vulnereabilita v `express.static` ([advisory](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 3.16.10
    * Opravená directory traversal vulnerabilita v `express.static`.
  * 3.16.6
    * Node.js 0.10 obsahuje leak `file descriptorov` čo v určitých situáciách ovplyvňuje `express.static` a `res.sendfile`. Malicious (škodlivé) requesty môžu spôsobiť leakovanie `file descriptorov` a môžu eventuálne viesť k `EMFILE` errorom a neresponzívnosti servera.
  * 3.16.0
    * Sparse polia s extrémne vysokými indexami v query stringoch môžu spôsobiť, že pre realizáciu procesu nie je dostatok pamäte a následne crash servera.
    * Extrémne vnorené query string objekty môžu spôsobiť zablokovanie procesu a dočasnú neresponzívnosť servera.
  * 3.3.0
    * Odpoveď 404-ka na pokus o nepodporovaný method override bola náchylná na cross-site scripting útok.
