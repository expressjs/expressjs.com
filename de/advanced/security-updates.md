---
layout: page
title: Express-Sicherheitsupdates
menu: advanced
lang: de
---

# Sicherheitsupdates

<div class="doc-box doc-notice" markdown="1">
Schwachstellen bei Node.js wirken sich direkt auf Express aus. Daher sollten Sie [ein Auge auf Schwachstellen bei Node.js haben](http://blog.nodejs.org/vulnerability/) und sicherstellen, dass Sie die aktuelle stabile Version von Node.js haben.
</div>

Die folgende Liste enthält die Express-Schwachstellen, die im angegebenen Versionsupdate behoben wurden.

## 4.x

  * 4.11.1
    * Offenlegungsgefahr beim Rootpfad in `express.static`, `res.sendfile` und `res.sendFile` behoben.
  * 4.10.7
    * Offene Umadressierungsschwachstelle in `express.static` ([Empfehlung](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)) behoben.
  * 4.8.8
    * Schwachstellen durch Directory-Traversal-Technik in `express.static` ([Empfehlung](http://npmjs.com/advisories/32) , [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)) behoben.
  * 4.8.4
    * Node.js 0.10 kann in bestimmten Situationen Lecks bei `fd` aufweisen, die sich auf `express.static` und `res.sendfile` auswirken. Böswillige Anforderungen können zu Lecks bei `fd` führen und letztendlich `EMFILE`-Fehler nach sich ziehen und bewirken, dass Server nicht antworten.
  * 4.8.0
    * Sparse-Arrays mit extrem hohen Indizes in der Abfragezeichenfolge können bewirken, dass für die Prozessausführung nicht genügend Arbeitsspeicher zur Verfügung steht und es zu einem Serverabsturz kommt.
    * Extrem verschachtelte Abfragezeichenfolgenobjekte können bewirken, dass der Prozess blockiert und der Server dadurch vorübergehend nicht antwortet.

## 3.x

  * 3.19.1
    * Offenlegungsgefahr beim Rootpfad in `express.static`, `res.sendfile` und `res.sendFile` behoben.
  * 3.19.0
    * Offene Umadressierungsschwachstelle in `express.static` ([Empfehlung](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)) behoben.
  * 3.16.10
    * Schwachstellen durch Directory-Traversal-Technik in `express.static` behoben.
  * 3.16.6
    * Node.js 0.10 kann in bestimmten Situationen Lecks bei `fd` aufweisen, die sich auf `express.static` und `res.sendfile` auswirken. Böswillige Anforderungen können zu Lecks bei `fd` führen und letztendlich `EMFILE`-Fehler nach sich ziehen und bewirken, dass Server nicht antworten.
  * 3.16.0
    * Sparse-Arrays mit extrem hohen Indizes in der Abfragezeichenfolge können bewirken, dass für die Prozessausführung nicht genügend Arbeitsspeicher zur Verfügung steht und es zu einem Serverabsturz kommt.
    * Extrem verschachtelte Abfragezeichenfolgenobjekte können bewirken, dass der Prozess blockiert und der Server dadurch vorübergehend nicht antwortet.
  * 3.3.0
    * Die Antwort 404 bei einem nicht unterstützten Überschreibungsversuch war anfällig gegen Cross-Site Scripting-Attacken.
