---
title: November 2025 Security Releases
description: Security release for body-parser has been published. We recommend that all users upgrade as soon as possible.
tags: security vulnerabilities
authors:
  - name: Ulises Gascón
    github: UlisesGascon
---

The Express team has released a new patch version of [body-parser](https://www.npmjs.com/package/body-parser) addressing a moderate-severity security vulnerability.


{% include admonitions/warning.html 
content="We recommend upgrading to the latest version of body-parser to secure your applications."
%}

The following vulnerabilities have been addressed:

- [Moderate severity vulnerability CVE-2025-13466 in body-parser middleware](#moderate-severity-vulnerability-cve-2025-13466-in-body-parser-middleware)

## Moderate severity vulnerability CVE-2025-13466 in Body-parser middleware

**[body-parser](https://www.npmjs.com/package/body-parser) version `2.2.0` is vulnerable to denial of service when url encoding is used**

body-parser 2.2.0 is vulnerable to denial of service due to inefficient handling of URL-encoded bodies with very large numbers of parameters. An attacker can send payloads containing thousands of parameters within the default 100KB request size limit, causing elevated CPU and memory usage. This can lead to service slowdown or partial outages under sustained malicious traffic.

**Affected versions**: `2.2.0`  
**Patched version**: `>= 2.2.1`

For more details, see [GHSA-wqch-xfxh-vrr4](https://github.com/expressjs/body-parser/security/advisories/GHSA-wqch-xfxh-vrr4).

---

We recommend upgrading to the latest version of body-parser immediately to secure your applications.
