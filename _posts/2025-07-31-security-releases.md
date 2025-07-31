---
title: July 2025 Security Releases
description: Security releases for Multer and On-headers has been published. We recommend that all users upgrade as soon as possible.
tags: security vulnerabilities
authors:
  - name: Ulises Gascón
    github: UlisesGascon
---

The Express team has released a new patch version of [Multer](https://www.npmjs.com/package/multer) addressing a high-severity security vulnerability. Also a new minor version of [on-headers](https://www.npmjs.com/package/on-headers) addressing a low-severity security vulnerability


{% include admonitions/warning.html 
content="We recommend upgrading to the latest version of Multer and On-headers immediately to secure your applications."
%}

The following vulnerabilities have been addressed:

- [High severity vulnerability CVE-2025-7338 in Multer middleware](#high-severity-vulnerability-cve-2025-7338-in-multer-middleware)
- [Low severity vulnerability CVE-2025-7339 in On-header middleware](#low-severity-vulnerability-cve-2025-7339-in-on-header-middleware)

## High severity vulnerability CVE-2025-7338 in Multer middleware

**[Multer](https://www.npmjs.com/package/multer) versions `>=1.4.4-lts.1` and `<2.0.2` are vulnerable to denial of service ia unhandled exception from malformed request.**

This request causes an unhandled exception, leading to a crash of the process.

**Affected versions**: `>=1.4.4-lts.1, <2.0.2`  
**Patched version**: `>=2.0.2`

For more details, see [GHSA-fjgf-rc76-4x9p](https://github.com/expressjs/multer/security/advisories/GHSA-fjgf-rc76-4x9p).

## Low severity vulnerability CVE-2025-7339 in On-header middleware

**[On-headers](https://www.npmjs.com/package/on-headers) versions `<1.1.0` is vulnerable to http response header manipulation**

A bug in on-headers versions `<1.1.0` may result in response headers being inadvertently modified when an array is passed to `response.writeHead()`

**Affected versions**: `<1.1.0`  
**Patched version**: `>=1.1.0`

For more details, see [GHSA-76c9-3jph-rj3q](https://github.com/jshttp/on-headers/security/advisories/GHSA-76c9-3jph-rj3q).

---

We recommend upgrading to the latest version of Multer and On-headers immediately to secure your applications.
