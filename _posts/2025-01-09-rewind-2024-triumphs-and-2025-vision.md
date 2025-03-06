---
title: "A New Chapter for Express.js: Triumphs of 2024 and an ambitious 2025"
tags: news, rewind, 2024
author: Express Technical Committee
description: Explore the transformative journey of Express.js in 2024, marked by governance improvements, the long-awaited release of Express 5.0, and heightened security measures. Look into the ambitious plans for 2025, including performance optimizations, scoped packages, and a bold roadmap for sustained growth in the Node.js ecosystem.
---


As we step into the new year, it’s almost impossible to ignore the unmistakable energy coursing through the Express.js community. The past twelve months have proven both foundational and forward-looking: an era of governance overhauls, technical triumphs, and security enhancements that not only shaped 2024 but also laid the groundwork for what promises to be a transformative 2025. 
In this long-form recap and forecast, we’ll journey through the story of Express.js with its evolution, its hurdles, and the new heights it’s poised to reach.

---

## A Transformative 2024

Few could have predicted just how pivotal 2024 would be for the Express.js project. From the revitalization of its governance structures to the unveiling of long-awaited features, it was a year that solidified the framework’s role as a mainstay in the Node.js ecosystem.

### Governance and Community Milestones

Central to the project’s growth was the [Express Forward Plan](https://github.com/expressjs/discussions/issues/160), devised to ensure strategic alignment and long-term sustainability. This year also saw the introduction of a new generation of Technical Committee (TC) members, each bringing fresh insights and energy to the community. Those members include [Blake Embrey](https://github.com/blakeembrey), [Chris de Almeida](https://github.com/ctcpip), [Jean Burellier](https://github.com/sheplu), [Jon Church](https://github.com/jonchurch), [Linus Unnebäck](https://github.com/LinusU), [Rand McKinney](https://github.com/crandmck), [Ulises Gascón](https://github.com/ulisesgascon), and [Wes Todd](https://github.com/wesleytodd). By defining a clear path and transparent processes, the community was able to collaborate on ambitious updates more cohesively than ever before. A revitalized release process further streamlined how new versions are planned and executed, eliminating much of the guesswork and inconsistent timing that had previously challenged contributors.

In parallel, the [Security Working Group](https://github.com/expressjs/discussions/issues/165) took shape. Express.js, widely recognized for its importance to the broader Node.js landscape, formally introduced a [security triage team](https://github.com/expressjs/security-wg#security-triage-team) dedicated to proactively identifying and resolving vulnerabilities. This forward-thinking approach was bolstered by the adoption of a [Threat Model for Express.js](https://github.com/expressjs/express/pull/5526), underscoring the project’s commitment to robust, future-proof security.

As if these achievements weren’t enough, Express.js proudly reached [Impact Project status](https://github.com/openjs-foundation/cross-project-council/pull/1404) under the OpenJS Foundation. This acknowledgment affirmed the significance of the framework to the JavaScript ecosystem and showcased the community’s tireless efforts in ensuring its enduring relevance.

### Technical Advancements and the Release of Express 5.0

Naturally, 2024 will forever be remembered as the year when Express.js finally introduced its much-anticipated [Express 5.0](https://expressjs.com/2024/10/15/v5-release.html). After more than a decade of community discussions and behind-the-scenes experimentation, this release brought modern features and a future-oriented architecture to the framework, acting as a catalyst for the next chapter of Express.js development.

But the story did not end there. Even before the release of Express 5.0 was fully established, the community had already begun charting the course for [Express 6.0](https://github.com/expressjs/discussions/issues/267), reflecting an unwavering commitment to innovation. Guiding critical decisions throughout 2024 were new [decision framework](https://github.com/expressjs/discussions/issues/285), which helped the Technical Committee tackle pressing matters such as [engine usage](https://github.com/expressjs/discussions/issues/286) and [dependency management](https://github.com/expressjs/discussions/issues/279). Collectively, these measures fostered transparency and agility, ensuring that Express.js continues to evolve in response to the community’s most urgent needs.

### Maintenance, Tooling, and Collaboration

Express.js also deepened its relationship with the Node.js community by re-integrating into the [Node.js CITGM project](https://github.com/expressjs/express/issues/5489). This move ensured broader ecosystem compatibility and provided developers with further validation that they can rely on Express.js as a dependable cornerstone of their Node.js applications.

### A Heightened Security Posture

Above all, 2024 will stand out for Express.js’s vigorous approach to security. In partnership with the [OpenJS Foundation](https://openjsf.org/) and [OSTIF](https://ostif.org/), the project undertook a comprehensive [security audit](https://expressjs.com/2024/10/22/security-audit-milestone-achievement.html) that yielded critical insights and propelled immediate improvements. The sense of proactive vigilance extended to the adoption of the [OSSF Scorecard](https://github.com/expressjs/discussions/issues/162), implemented at an organizational level to keep track of security metrics and maintain focus on ongoing enhancements.

Throughout the year, maintainers rapidly responded to disclosed vulnerabilities such as [CVE-2024-43796](https://github.com/expressjs/express/security/advisories/GHSA-qw6h-vgh9-j6wx), [CVE-2024-45590](https://github.com/expressjs/body-parser/security/advisories/GHSA-qwcr-r2fm-qrc7), and [CVE-2024-47178](https://github.com/expressjs/basic-auth-connect/security/advisories/GHSA-7p89-p6hx-q4fw). Each instance underscored the community’s readiness to defend the framework’s integrity and safeguard its user base. In a further demonstration of long-term commitment, Express.js teamed up with [HeroDevs](https://www.herodevs.com/) to establish [Never-Ending Support (NES)](https://openjsf.org/blog/at-the-openjs-foundation-were-excited-to-announce-), offering an extended maintenance plan that reaffirms Express.js as a reliable foundation for developers now and in the years to come.


---

## A Bold Vision for 2025

While 2024 laid a sturdy bedrock, the Express.js Technical Committee is not resting on its laurels. The newly revealed roadmap for 2025—bolstered by the [Sovereign Tech Fund (STF)](https://www.sovereign.tech/)—embodies a spirit of forward momentum. It promises notable strides in security, performance, and general developer experience, with each initiative building on the insights gained over the past year.

### Automating npm Releases

At the forefront of this plan is the automation of npm releases, an endeavor designed to free maintainers from manual steps and human error. By streamlining the publishing process, the project can achieve faster turnaround times for patches and new features, preserving the stability that developers have come to expect from Express.js. It’s an internal shift with massive external benefits: smoother upgrades, more frequent releases, and a deeper reservoir of confidence for users.

### Introducing Scoped Packages

Express.js will also explore a transition toward scoped packages. By clearly delineating which modules fall under the Express.js umbrella, the maintainers hope to reduce confusion and foster an environment more conducive to organized expansion. As new packages and features are proposed, scoping will make it simpler to track official tools and ensure that community contributions meet consistent quality standards.

### Strengthening Security Reporting and Procedures

Since security remains one of the project’s primary pillars, 2025 will see a significant push to refine how vulnerabilities are reported and managed. Building upon the success of the Security Working Group, the new process will introduce transparent guidelines for reporting potential issues and a consistent triage routine for mitigating them. Additional training for both the Security Triage group and the Technical Committee will further cultivate a shared culture of readiness. Moreover, Express.js is poised to integrate [OSSF Scorecard](https://github.com/expressjs/discussions/issues/162) even more deeply into daily operations, ensuring that both maintainers and users have real-time insights into the project’s health.

### Performance Monitoring and Deep-Level Optimizations

Performance is another focal point. By systematically monitoring the framework’s speed and responsiveness—along with that of its dependencies—the Express.js team aims to pinpoint bottlenecks more rapidly. Over time, insights from these monitoring efforts will drive deeper optimizations in the core Express.js code and its core libraries. These improvements, expected to come to fruition by mid-2026, promise a faster, more scalable framework that can handle the heaviest production workloads with ease.

### Phasing Out Legacy Techniques and Enhancing Documentation

A future of agility and resilience depends on eliminating outdated techniques that invite complexity and fragility. As a result, Express.js will begin phasing out monkey-patching and passthrough APIs that rely too heavily on Node.js internals. This modernization strategy not only reduces technical debt but also ensures that Express.js remains aligned with Node.js updates going forward.

In tandem, the project will make a concerted effort to bolster its security documentation. Through updated guides and best practices, maintainers hope to demystify crucial topics like secure session handling, input validation, and access control. The goal is to arm developers—from novices to seasoned engineers—with the knowledge they need to protect their applications against an ever-evolving threat landscape.

---

## The Road Ahead

As Express.js steps into 2025, it does so with a powerful sense of purpose. The achievements of the past year—culminating in the official release of Express 5.0 and wide-reaching governance enhancements—serve as a sturdy foundation for what’s to come. Yet, the framework’s leadership knows there is always more to build, more to secure, and more to imagine.

Through automated releases, scopes for packages, rigorous security protocols, performance monitoring, and an ongoing effort to modernize core APIs, Express.js is evolving in real-time. And it isn’t just about technology; it’s about forging a collaborative environment where contributors can rely on transparent processes, robust training, and a supportive governance structure.

Whether you’re a seasoned maintainer, an occasional contributor, or a newcomer to this thriving ecosystem, your voice matters. Join the [Express.js GitHub Discussions](https://github.com/expressjs/discussions), attend open meetings, and stay tuned for updates on [Express.js blog](https://expressjs.com/) as we finalize timetables for these initiatives. Each advancement, no matter how technical, flows from a common aspiration: to sustain Express.js as a fast, safe, and influential framework for millions of developers worldwide.
Together, we’ll keep the spirit of 2024 alive—pushing boundaries, refining practices, and laying the path to a future where Express.js remains at the heart of modern web development.

