---
layout: post
title: "Spring Cleaning in Express.js: Deprecations and the Path Ahead"
tags: news
authors:
  - name: Express Technical Committee
    github: expressjs
description: As part of a broader effort to modernize and streamline Express.js, we’ve deprecated several outdated packages including csurf, connect-multiparty, and path-match. Learn why we made these changes and what it means for the future of the framework.
---

As Express.js continues to power web applications across the world, it's important that we maintain a clean, reliable, and modern codebase. In that spirit, we've done a bit of spring cleaning.

Over the past few weeks, we've evaluated legacy packages within the Express.js ecosystem — some of which have become outdated, unmaintained, or misaligned with modern best practices. As a result, we’ve officially deprecated several of them.

## 🚨 Packages Deprecated

Here are the key packages we’ve deprecated:

- [`csurf`](https://www.npmjs.com/package/csurf): A CSRF middleware that’s long been difficult to maintain and is better handled today through frameworks or custom implementations that align with your architecture.
- [`connect-multiparty`](https://www.npmjs.com/package/connect-multiparty): A multipart form-data parser that relies on deprecated libraries and hasn’t aged well.
- [`path-match`](https://www.npmjs.com/package/path-match): A route-matching utility that has been superseded by more modern and maintained alternatives.

Each of these packages was originally created to solve real problems—but time has moved on, and the ecosystem has evolved.

## 🤔 Why This Matters

Maintaining deprecated or inactive dependencies introduces technical debt and security risk. By formally deprecating these packages, we:

- Encourage developers to adopt better-maintained and more secure solutions.
- Reduce confusion around which tools are actively supported by Express.
- Focus our efforts on modernizing the core and surrounding ecosystem.

## 🗂️ What You Should Do

If your application depends on any of these packages, now is a great time to look for alternatives. For instance:

- Consider finding a modern CSRF protection strategy on [npm](https://www.npmjs.com/search?q=csurf) that aligns with your specific needs.
- Use up-to-date multipart parsers like [`multer`](https://www.npmjs.com/package/multer).
- Replace path-match logic with standard [`path-to-regexp`](https://www.npmjs.com/package/path-to-regexp).

## 📘 What's Next

We're not stopping here. This cleanup is part of a broader effort to streamline Express.js, prepare for the future, and clarify what is and isn’t officially supported.

👉 A full discussion of these changes can be found [expressjs/discussions#134](https://github.com/expressjs/discussions/issues/134).  

📢 Stay tuned—we'll continue to post updates and insights as we modernize the Express ecosystem.

💚Thanks to the community for your continued trust and support.
