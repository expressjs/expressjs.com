---
title: June 2025 Security Releases
description: Security update for Multer released. All users are encouraged to upgrade.
tags: security vulnerabilities
authors:
  - name: Ulises Gascón
    github: UlisesGascon
---

The Express team has released a new patch version of [Multer](https://www.npmjs.com/package/multer), addressing a high-severity vulnerability that could lead to a Denial of Service (DoS) attack.

{% include admonitions/warning.html 
content="We strongly recommend that all users upgrade to Multer v2.0.1 or later immediately."
%}

This release addresses the following vulnerability:

### High severity vulnerability CVE-2025-48997 in Multer middleware

**[Multer](https://www.npmjs.com/package/multer) versions `>=1.4.4-lts.1` and `<2.0.1` are vulnerable to a Denial of Service (DoS) attack.**

An attacker can trigger this vulnerability by sending an upload request with an empty string as the field name. This malformed request causes an unhandled exception, leading to a crash of the server process.

**Affected versions**: `>=1.4.4-lts.1` and `<2.0.1`  
**Patched version**: `2.0.1`

For more details, see [GHSA-g5hg-p3ph-g8qg](https://github.com/expressjs/multer/security/advisories/GHSA-g5hg-p3ph-g8qg).


