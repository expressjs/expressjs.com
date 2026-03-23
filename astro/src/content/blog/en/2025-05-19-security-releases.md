---
title: May 2025 Security Releases
description: Security release for Multer has been published. We recommend that all users upgrade as soon as possible.
tags: ['security']
authors:
  - name: Ulises Gascón
    github: UlisesGascon
---

The Express team has released a new major version of [Multer](https://www.npmjs.com/package/multer) addressing two high-severity security vulnerabilities. This update improves the reliability and security of handling file uploads in Express applications.

{% include admonitions/warning.html
content="We strongly recommend that you upgrade to Multer v2.0.0 or later as soon as possible."
%}

The following vulnerabilities have been addressed:

- [High severity vulnerability CVE-2025-47935 in Multer middleware](#high-severity-vulnerability-cve-2025-47935-in-multer-middleware)
- [High severity vulnerability CVE-2025-47944 in Multer middleware](#high-severity-vulnerability-cve-2025-47944-in-multer-middleware)

## High severity vulnerability CVE-2025-47935 in Multer middleware

**[Multer](https://www.npmjs.com/package/multer) versions `<2.0.0` are vulnerable to denial of service due to a memory leak caused by improper stream handling.**

When the HTTP request stream emits an error, the internal `busboy` stream is not closed, violating Node.js stream safety guidance.

This leads to unclosed streams accumulating over time, consuming memory and file descriptors. Under sustained or repeated failure conditions, this can result in denial of service, requiring manual server restarts to recover. All users of Multer handling file uploads are potentially impacted.

**Affected versions**: `<2.0.0`  
**Patched version**: `>=2.0.0`

For more details, see [GHSA-44fp-w29j-9vj5](https://github.com/expressjs/multer/security/advisories/GHSA-44fp-w29j-9vj5).

## High severity vulnerability CVE-2025-47944 in Multer middleware

**[Multer](https://www.npmjs.com/package/multer) versions `>=1.4.4-lts.1` and `<2.0.0` are vulnerable to a denial of service via a malformed multipart request.**

A specially crafted request can cause an unhandled exception inside Multer, resulting in a crash of the server process.

**Affected versions**: `>=1.4.4-lts.1` and `<2.0.0`  
**Patched version**: `>=2.0.0`

For more details, see [GHSA-4pg4-qvpc-4q3h](https://github.com/expressjs/multer/security/advisories/GHSA-4pg4-qvpc-4q3h).

---

**Multer v2.0.0** also introduces a breaking change:

- The minimum supported Node.js version is now **10.16.0**.

We recommend upgrading to the latest version of Multer immediately to secure your applications.
