---
layout: page
title: Atualizações de segurança do Express
description: Review the latest security updates and patches for Express.js, including detailed vulnerability lists for different versions to help maintain a secure application.
menu: advanced
lang: pt-br
redirect_from: /advanced/security-updates.html
---

# Atualizações de segurança

<div class="doc-box doc-notice" markdown="1">
As vulnerabilidades do Node.js afetam diretamente o Express. Portanto
[fique atento às
vulnerabilidades do Node.js](https://nodejs.org
/en/blog/vulnerability/) e certifique-se de que você está
usando a versão estável mais recente do Node.js.
</div>

A lista abaixo enumera as vulnerabilidades do Express que foram
corrigidas na versão da atualização especificadas.

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
  - Corrigida a vulnerabilidade de divulgação do caminho
    raiz no `express.static`, `res.sendfile`, e `res.sendFile`
- 4.10.7
  - Corrigida a vulnerabilidade de redirecionamento aberto no `express.static` ([recomendação](https://npmjs.com/advisories/35),
    [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
- 4.8.8
  - Corrigida a vulnerabilidade de travessia de diretório no `express.static` ([recomendação](http://npmjs.com/advisories/32), [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)).
- 4.8.4
  - O Node.js 0.10 pode vazar os `fd`s em certas situações que afetam o `express.static` e o
    `res.sendfile`. Solicitações maliciosas podem causar os `fd`s a vazar e eventualmente levar a erros de
    `EMFILE` e servidores sem capacidade de resposta.
- 4.8.0
  - Matrizes esparsas que possuem índices extremamente altos na sequência de consulta podem fazer com que o processo sofra um
    esgotamento de memória e derrubar o servidor.
  - Objetos de sequência de consulta extremamente aninhados podem fazer com que o processo fique bloqueado e o servidor
    temporariamente não responsivo.

## 3.x

  <div class="doc-box doc-warn" markdown="1">
  **Express 3.x IS END-OF-LIFE AND NO LONGER MAINTAINED**

Known and unknown security and performance issues in 3.x have not been addressed since the last update (1 August, 2015). It is highly recommended to use the latest version of Express.

If you are unable to upgrade past 3.x, please consider [Commercial Support Options](/{{ page.lang }}/support#commercial-support-options).

  </div>

- 3.19.1
  - Corrigida a vulnerabilidade de divulgação do caminho
    raiz no `express.static`, `res.sendfile`, e `res.sendFile`
- 3.19.0
  - Corrigida a vulnerabilidade de redirecionamento aberto no `express.static` ([recomendação](https://npmjs.com/advisories/35),
    [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
- 3.16.10
  - Corrigida a vulnerabilidade de travessia de diretório no `express.static`.
- 3.16.6
  - O Node.js 0.10 pode vazar os `fd`s em certas situações que afetam o `express.static` e o
    `res.sendfile`. Solicitações maliciosas podem causar os `fd`s a vazar e eventualmente levar a erros de
    `EMFILE` e servidores sem capacidade de resposta.
- 3.16.0
  - Matrizes esparsas que possuem índices extremamente altos na sequência de consulta podem fazer com que o processo sofra um
    esgotamento de memória e derrubar o servidor.
  - Objetos de sequência de consulta extremamente aninhados podem fazer com que o processo fique bloqueado e o servidor
    temporariamente não responsivo.
- 3.3.0
  - A resposta 404 de uma tentativa de substituição de um método não suportado era suscetível a ataques de cross-site scripting.