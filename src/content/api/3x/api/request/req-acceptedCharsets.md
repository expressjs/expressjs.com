---
title: req.acceptedCharsets
description: Return an array of Accepted charsets ordered from highest quality to lowest.
---

# req.acceptedCharsets

Return an array of Accepted charsets ordered from highest quality to lowest.

```
Accept-Charset: iso-8859-5;q=.2, unicode-1-1;q=0.8
// => ['unicode-1-1', 'iso-8859-5']
```
