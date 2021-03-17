---
layout: page
title: Express security updates
menu: advanced
lang: uz
---

# Security updates

<div class="doc-box doc-notice" markdown="1">
Node.js vulnerabilities directly affect Express. Therefore [keep a watch on Node vulnerabilities](http://blog.nodejs.org/vulnerability/) and make sure you are using the latest stable version of Node.
</div>

The list below enumerates the Express vulnerabilities that were fixed in the specified version update.

## 4.x

  * 4.11.1
    * Fixed root path disclosure vulnerability in express.static, res.sendfile, and res.sendFile
  * 4.10.7
    * Fixed open redirect vulnerability in express.static (advisory (https://npmjs.com/advisories/35), CVE-2015-1164 (http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164))
  * 4.8.8
    * Fixed directory traversal vulnerabilities in `express.static` ([advisory](http://npmjs.com/advisories/32) , [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394))
  * 4.8.4
    * Node.js 0.10 can leak `fd`s in certain situations that affect `express.static` and `res.sendfile`. Malicious requests could cause `fd`s to leak and eventually leak to `EMFILE` errors and server unresponsiveness.
  * 4.8.0
    * Sparse arrays with extremely high indexes in query string could cause the process to run out of memory and crash the server.
    * Extremely nested query string objects could cause the process to block and make the server unresponsive temporarily.

## 3.x

  * 3.19.1
    * Fixed root path disclosure vulnerability in express.static, res.sendfile, and res.sendFile
  * 3.19.0
    * Fixed open redirect vulnerability in express.static (advisory (https://npmjs.com/advisories/35), CVE-2015-1164 (http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164))
  * 3.16.10
    * Fixed directory traversal vulnerabilities in `express.static`.
  * 3.16.6
    * Node.js 0.10 can leak `fd`s in certain situations that affect `express.static` and `res.sendfile`. Malicious requests could cause `fd`s to leak and eventually leak to `EMFILE` errors and server unresponsiveness.
  * 3.16.0
    * Sparse arrays with extremely high indexes in query string could cause the process to run out of memory and crash the server.
    * Extremely nested query string objects could cause the process to block and make the server unresponsive temporarily.
  * 3.3.0
    * The 404 response of an unsupported method override attempt was susceptible to cross-site scripting attacks.
