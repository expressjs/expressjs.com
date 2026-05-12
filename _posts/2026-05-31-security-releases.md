---
title: May 2026 Security Releases
description: Security releases for multiparty have been published. We recommend that all users upgrade as soon as possible.
tags: security vulnerabilities
authors:
  - name: Ulises Gascon
    github: UlisesGascon
---

The Express team has released [multiparty](https://www.npmjs.com/package/multiparty) 4.3.0, addressing three denial of service vulnerabilities in the multipart form parser.

{% include admonitions/warning.html
content="We recommend upgrading to the latest version of multiparty to secure your applications."
%}

The following vulnerabilities have been addressed:

- [CVE-2026-8159 in multiparty utility module (High)](#cve-2026-8159-in-multiparty-utility-module-high)
- [CVE-2026-8161 in multiparty utility module (High)](#cve-2026-8161-in-multiparty-utility-module-high)
- [CVE-2026-8162 in multiparty utility module (High)](#cve-2026-8162-in-multiparty-utility-module-high)

## CVE-2026-8159 in multiparty utility module (High)

**[multiparty](https://www.npmjs.com/package/multiparty) versions `<= 4.2.3` are vulnerable to regular expression denial of service via filename parsing**

A crafted multipart upload with a long header value can cause regex matching in the Content-Disposition filename parser to take seconds, blocking the Node.js event loop. Any service accepting multipart uploads via multiparty is affected. A small header of around 8 KB is sufficient to trigger the vulnerable backtracking.

**Affected versions**: `<= 4.2.3`
**Patched version**: `>= 4.3.0`

For more details, see [GHSA-65x3-rw7q-gx94](https://github.com/pillarjs/multiparty/security/advisories/GHSA-65x3-rw7q-gx94).

## CVE-2026-8161 in multiparty utility module (High)

**[multiparty](https://www.npmjs.com/package/multiparty) versions `<= 4.2.3` are vulnerable to denial of service via prototype pollution leading to an uncaught exception**

A multipart upload with a field name that collides with an inherited Object.prototype property such as `__proto__`, `constructor`, or `toString` causes the parser to invoke `.push()` on the inherited prototype value rather than an array, throwing a TypeError that propagates as an uncaught exception and crashes the process. Any service accepting multipart uploads via multiparty is affected.

**Affected versions**: `<= 4.2.3`
**Patched version**: `>= 4.3.0`

For more details, see [GHSA-qxch-whhj-8956](https://github.com/pillarjs/multiparty/security/advisories/GHSA-qxch-whhj-8956).

## CVE-2026-8162 in multiparty utility module (High)

**[multiparty](https://www.npmjs.com/package/multiparty) versions `<= 4.2.3` are vulnerable to denial of service via an uncaught exception in filename* parameter parsing**

A multipart upload with a Content-Disposition header whose `filename*` parameter contains a malformed percent-encoding causes the parser to invoke `decodeURI` on the value without try/catch. The resulting URIError propagates as an uncaught exception and crashes the process. Any service accepting multipart uploads via multiparty is affected.

**Affected versions**: `<= 4.2.3`
**Patched version**: `>= 4.3.0`

For more details, see [GHSA-xh3c-6gcq-g4rv](https://github.com/pillarjs/multiparty/security/advisories/GHSA-xh3c-6gcq-g4rv).

---

We recommend upgrading to the latest version of multiparty to secure your applications.
