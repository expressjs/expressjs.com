
```markdown
---
layout: page
title: X-Trust Human Presence Middleware
menu: advanced
lang: en
---

# X-Trust Human Presence Middleware

[X-Trust](https://github.com/htl-syterme/htl-core) is an open standard that proves a human is behind an HTTP request — without KYC, without captchas, without collecting personal data.

## Installation

```bash
npm install @htl-syterme/htl-core
```

## Usage

```js
const { requireTrust } = require('@htl-syterme/htl-core')

app.post('/api/chat', async (req, res) => {
  const { trusted, score } = await requireTrust(req, process.env.HTL_SECRET)

  req.trust = { trusted, score } // annotate, never block

  // your logic here
  res.json({ response: 'ok', human: trusted, score })
})
```

## How it works

The client SDK measures keystroke timing and touch entropy, generates a score between 0 and 1, signs it with HMAC-SHA256, and attaches it as an `X-Trust` header. The server verifies the signature. Tokens expire in 120 seconds.

OSS spec: [github.com/htl-syterme/htl-core](https://github.com/htl-syterme/htl-core)
```
