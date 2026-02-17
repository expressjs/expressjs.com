---
layout: page
title: Express-Sicherheitsupdates
description: Review the latest security updates and patches for Express.js, including detailed vulnerability lists for different versions to help maintain a secure application.
menu: advanced
order: 2
redirect_from: '  '
---

# Sicherheitsupdates

<div class="doc-box doc-notice" markdown="1">
Schwachstellen bei Node.js wirken sich direkt auf Express aus. Daher sollten Sie [ein Auge auf Schwachstellen bei Node.js haben](https://nodejs.org
/en/blog/vulnerability/) und sicherstellen, dass Sie die aktuelle stabile Version von Node.js haben.
</div>

Die folgende Liste enthält die Express-Schwachstellen, die im angegebenen Versionsupdate behoben wurden.

{% capture security-policy %}
If you believe you have discovered a security vulnerability in Express, please see
[Security Policies and Procedures](/{{page.lang}}/resources/contributing.html#security-policies-and-procedures).
{% endcapture %}

{% include admonitions/note.html content=security-policy %}

## 4.x

- 4.21.2
  - The dependency `path-to-regexp` has been updated to address a [vulnerability](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-rhx6-c78j-4q9w).
- 4.21.1
  - The dependency `cookie` has been updated to address a [vulnerability](https://github.com/jshttp/cookie/security/advisories/GHSA-pxg6-pf52-xh8x), This may affect your application if you use `res.cookie`.
- 4.20.0
  - Fixed XSS vulnerability in `res.redirect` ([advisory](https://github.com/expressjs/express/security/advisories/GHSA-qw6h-vgh9-j6wx), [CVE-2024-43796](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-43796)).
  - The dependency `serve-static` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-cm22-4g7w-348p).
  - The dependency `send` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-m6fv-jmcg-4jfg).
  - The dependency `path-to-regexp` has been updated to address a [vulnerability](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-9wv6-86v2-598j).
  - The dependency `body-parser` has been updated to addres a [vulnerability](https://github.com/advisories/GHSA-qwcr-r2fm-qrc7), This may affect your application if you had url enconding activated.
- 4.19.0, 4.19.1
  - Fixed open redirect vulnerability in `res.location` and `res.redirect` ([advisory](https://github.com/expressjs/express/security/advisories/GHSA-rv95-896h-c2vc), [CVE-2024-29041](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-29041)).
- 4.17.3
  - The dependency `qs` has been updated to address a [vulnerability](https://github.com/advisories/GHSA-hrpp-h998-j3pp). This may affect your application if the following APIs are used: `req.query`, `req.body`, `req.param`.
- 4.16.0
  - The dependency `forwarded` has been updated to address a [vulnerability](https://npmjs.com/advisories/527). This may affect your application if the following APIs are used: `req.host`, `req.hostname`, `req.ip`, `req.ips`, `req.protocol`.
  - The dependency `mime` has been updated to address a [vulnerability](https://npmjs.com/advisories/535), but this issue does not impact Express.
  - The dependency `send` has been updated to provide a protection against a [Node.js 8.5.0 vulnerability](https://nodejs.org/en/blog/vulnerability/september-2017-path-validation/). This only impacts running Express on the specific Node.js version 8.5.0.
- 4.15.5
  - The dependency `debug` has been updated to address a [vulnerability](https://snyk.io/vuln/npm:debug:20170905), but this issue does not impact Express.
  - The dependency `fresh` has been updated to address a [vulnerability](https://npmjs.com/advisories/526). This will affect your application if the following APIs are used: `express.static`, `req.fresh`, `res.json`, `res.jsonp`, `res.send`, `res.sendfile` `res.sendFile`, `res.sendStatus`.
- 4.15.3
  - The dependency `ms` has been updated to address a [vulnerability](https://snyk.io/vuln/npm:ms:20170412). This may affect your application if untrusted string input is passed to the `maxAge` option in the following APIs: `express.static`, `res.sendfile`, and `res.sendFile`.
- 4.15.2
  - The dependency `qs` has been updated to address a [vulnerability](https://snyk.io/vuln/npm:qs:20170213), but this issue does not impact Express. Updating to 4.15.2 is a good practice, but not required to address the vulnerability.
- 4.11.1
  - Offenlegungsgefahr beim Rootpfad in `express.static`, `res.sendfile` und `res.sendFile` behoben.
- 4.10.7
  - Offene Umadressierungsschwachstelle in `express.static` ([Empfehlung](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)) behoben.
- 4.8.8
  - Schwachstellen durch Directory-Traversal-Technik in `express.static` ([Empfehlung](http://npmjs.com/advisories/32) , [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)) behoben.
- 4.8.4
  - Node.js 0.10 kann in bestimmten Situationen Lecks bei `fd` aufweisen, die sich auf `express.static` und `res.sendfile` auswirken. Böswillige Anforderungen können zu Lecks bei `fd` führen und letztendlich `EMFILE`-Fehler nach sich ziehen und bewirken, dass Server nicht antworten.
- 4.8.0
  - Sparse-Arrays mit extrem hohen Indizes in der Abfragezeichenfolge können bewirken, dass für die Prozessausführung nicht genügend Arbeitsspeicher zur Verfügung steht und es zu einem Serverabsturz kommt.
  - Extrem verschachtelte Abfragezeichenfolgenobjekte können bewirken, dass der Prozess blockiert und der Server dadurch vorübergehend nicht antwortet.

## 3.x

  <div class="doc-box doc-warn" markdown="1">
  **Express 3.x WIRD NICHT MEHR GEWARTET**

Bekannte und unbekannte Probleme bei Sicherheit und Leistung in 3.x wurden seit dem letzten Update (1. August 2015) noch nicht behoben. Es wird dringend empfohlen, die aktuelle Version von Express zu verwenden.

If you are unable to upgrade past 3.x, please consider [Commercial Support Options](/{{ page.lang }}/support#commercial-support-options).

  </div>

- 3.19.1
  - Offenlegungsgefahr beim Rootpfad in `express.static`, `res.sendfile` und `res.sendFile` behoben.
- 3.19.0
  - Offene Umadressierungsschwachstelle in `express.static` ([Empfehlung](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)) behoben.
- 3.16.10
  - Schwachstellen durch Directory-Traversal-Technik in `express.static` behoben.
- 3.16.6
  - Node.js 0.10 kann in bestimmten Situationen Lecks bei `fd` aufweisen, die sich auf `express.static` und `res.sendfile` auswirken. Böswillige Anforderungen können zu Lecks bei `fd` führen und letztendlich `EMFILE`-Fehler nach sich ziehen und bewirken, dass Server nicht antworten.
- 3.16.0
  - Sparse-Arrays mit extrem hohen Indizes in der Abfragezeichenfolge können bewirken, dass für die Prozessausführung nicht genügend Arbeitsspeicher zur Verfügung steht und es zu einem Serverabsturz kommt.
  - Extrem verschachtelte Abfragezeichenfolgenobjekte können bewirken, dass der Prozess blockiert und der Server dadurch vorübergehend nicht antwortet.
- 3.3.0
  - Die Antwort 404 bei einem nicht unterstützten Überschreibungsversuch war anfällig gegen Cross-Site Scripting-Attacken.
