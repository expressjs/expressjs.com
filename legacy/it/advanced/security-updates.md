---
layout: page
title: Aggiornamenti sulla sicurezza Express
description: Review the latest security updates and patches for Express.js, including detailed vulnerability lists for different versions to help maintain a secure application.
menu: advanced
order: 2
redirect_from: "  "
---

# Aggiornamenti sulla sicurezza

<div class="doc-box doc-notice" markdown="1">
Le vulnerabilità di Node.js influenzano direttamente Express. Pertanto, [verificare sempre le vulnerabilità Node.js](https://nodejs.org
/en/blog/vulnerability/) e assicurarsi di utilizzare l'ultima versione corretta di Node.js.
</div>

L'elenco seguente mostra le vulnerabilità di Express che sono state corrette nell'aggiornamento della versione specificato.

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
  - Risolta la vulnerabilità del rilevamento del percorso root in `express.static`, `res.sendfile` e `res.sendFile`
- 4.10.7
  - Risolta la vulnerabilità del reindirizzamento aperto in `express.static` ([advisory](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
- 4.8.8
  - Risolte le vulnerabilità trasversali della directory in `express.static` ([advisory](http://npmjs.com/advisories/32), [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)).
- 4.8.4
  - Node.js 0.10 può portare alla perdita di `fd` in determinate situazioni che influenzano `express.static` e `res.sendfile`. Le richieste sospette potrebbero causare una perdita di `fd` ed eventualmente il verificarsi di errori `EMFILE` e risposte mancate del server.
- 4.8.0
  - Le matrici sparse che dispongono di indici estremamente elevati nella stringa di query potrebbero causare errori di memoria nel processo e una chiusura anomala del server.
  - Gli oggetti di stringa query molto nidificati potrebbero causare un blocco del processo e una mancata risposta da parte del server.

## 3.x

  <div class="doc-box doc-warn" markdown="1">
  **Express 3.x NON È PIU' SUPPORTATO**

I problemi noti e non noti relativi alla sicurezza presenti in 3.x non sono stati indirizzati dall'ultimo aggiornamento (1 agosto 2015). Si consiglia di utilizzare l'ultima versione di Express.

If you are unable to upgrade past 3.x, please consider [Commercial Support Options](/{{ page.lang }}/support#commercial-support-options).

  </div>

- 3.19.1
  - Risolta la vulnerabilità del rilevamento del percorso root in `express.static`, `res.sendfile` e `res.sendFile`
- 3.19.0
  - Risolta la vulnerabilità del reindirizzamento aperto in `express.static` ([advisory](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
- 3.16.10
  - Risolte le vulnerabilità trasversali della directory in `express.static`.
- 3.16.6
  - Node.js 0.10 può portare alla perdita di `fd` in determinate situazioni che influenzano `express.static` e `res.sendfile`. Le richieste sospette potrebbero causare una perdita di `fd` ed eventualmente il verificarsi di errori `EMFILE` e risposte mancate del server.
- 3.16.0
  - Le matrici sparse che dispongono di indici estremamente elevati nella stringa di query potrebbero causare errori di memoria nel processo e una chiusura anomala del server.
  - Gli oggetti di stringa query molto nidificati potrebbero causare un blocco del processo e una mancata risposta da parte del server.
- 3.3.0
  - La risposta 404 di un metodo non supportato sovrascrive un tentativo suscettibili in precedenza ad attacchi XSS (cross-site scripting).