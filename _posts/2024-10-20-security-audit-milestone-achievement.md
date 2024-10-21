---
title: "Express.js Security Audit: A Milestone Achievement"
tags: security, audit, releases
author: Express Technical Committee
description: Celebrating the successful completion of the Express.js security audit conducted by Ada Logics and facilitated by OSTIF.
---


We are thrilled to announce the successful completion of a comprehensive security audit for Express.js, conducted by [Ada Logics](https://adalogics.com/) and facilitated by [OSTIF](https://ostif.org/). This extensive review of our framework and its core components marks a significant milestone in our commitment to ensuring the security and reliability of Express.js for our community.

## A Collaborative Effort

This audit was made possible through the collaboration between [the Express Security Working Group](https://github.com/expressjs/security-wg), Ada Logics, OSTIF, and the [OpenJS Foundation](https://openjsf.org/). Our focus was on thoroughly evaluating the Express.js codebase, including its dependencies and core libraries. The primary goal was to identify any potential security vulnerabilities and to strengthen the overall security posture of the framework.

### Key Highlights of the Audit

- **Audit Duration**: Conducted in April and May 2024.
- **Scope**: Core Express.js codebase and critical dependencies, such as `body-parser`, `basic-auth-connect`, `serve-static`, and more.
- **Findings**: A total of 5 security vulnerabilities were identified, all of which have been addressed and patched.
- **Severity**: Issues ranged from moderate to high severity, impacting components like `res.redirect` and `serve-static`.

## A Closer Look at the Findings

The audit identified several vulnerabilities, including potential Cross-Site Scripting (XSS) risks and a Denial of Service (DoS) vulnerability in the `body-parser` middleware. Here are the key CVEs reported:

- **CVE-2024-43796**: XSS in `res.redirect`—fixed in versions >= 4.20.0 and >= 5.0.0.
- **CVE-2024-45590**: DoS in `body-parser`—patched in version >= 1.20.3.
- **CVE-2024-47178**: Timing vulnerability in `basic-auth-connect`—patched in version >= 1.1.0.
- **CVE-2024-43799**: XSS in the `send` utility module—patched in version >= 0.19.0.
- **CVE-2024-43800**: XSS in `serve-static`—fixed in versions >= 1.16.0 and >= 2.1.0.

Each of these vulnerabilities was promptly addressed by our dedicated [security triage team](https://github.com/expressjs/security-wg?tab=readme-ov-file#security-triage-team), ensuring that users remain protected against known threats.

For full details on the audit results, you can access the [official audit report here](https://ostif.org/wp-content/uploads/2024/10/expressjs-2024-security-audit-report.pdf).

## A Commitment to Transparency and Security

At Express, security is a top priority, and we believe in the importance of transparency when it comes to vulnerabilities and their resolution. This audit not only highlights our proactive approach but also reinforces our ongoing commitment to building a secure web framework for all.

We strongly recommend all users update to the latest versions of the affected packages to benefit from the recent security fixes. For more information on the patches and how to upgrade, please refer to our [September 2024 Security Release announcement](https://expressjs.com/2024/09/29/security-releases.html).

## A Word of Thanks

This audit would not have been possible without the efforts and expertise of many individuals and organizations. We want to extend our gratitude to:

- The team at Ada Logics for their diligent review and insights.
- OSTIF for their coordination and support throughout the audit process.
- The OpenJS Foundation for sponsoring this important initiative.
- Our Express.js community, who continue to support and trust us with their projects.
- [Jordan Harband](https://github.com/ljharb) for his amazing support while we needed changes in [qs](https://www.npmjs.com/package/qs).


Together, we’ve made Express.js stronger, more resilient, and ready for the challenges ahead. We look forward to continuing to serve our community with a focus on excellence and security.

Thank you for being a part of this journey with us!
