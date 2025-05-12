---
layout: page
title: Express üçün şablon görüntü mühərriki hazırlanması
menu: advanced
lang: tr
description: Learn how to develop custom template engines for Express.js using app.engine(),
  with examples on creating and integrating your own template rendering logic.
---

<div id="page-doc" markdown="1">
# Express üçün şablon mühərriklərinin hazırlanması

Öz şablon mühərrikinizi yaratmaq üçün `app.engine(ext, callback)` metodundan istifadə edin. `ext` fayl uzantısını, `callback` isə şablon mühərriki funksiyasını ifadə edir. Bu funksiya aşağıdakı parametrləri qəbul edir: faylın yeri, seçimlər obyekti və callback funksiyası.

Aşağıdakı kod `.ntl` fayllarını göstərmək üçün çox sadə bir şablon mühərrikinin nümunəsidir.

```js
const fs = require('fs')
app.engine('ntl', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    const rendered = content.toString().replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`)
    return callback(null, rendered)
  })
})
app.set('views', './views')
app.set('view engine', 'ntl')
````

Tətbiqiniz indi `.ntl` fayllarını göstərə biləcək. `views` qovluğunda aşağıdakı məzmuna malik `index.ntl` adlı fayl yaradın.

```pug
#title#
#message#
```

Sonra tətbiqinizdə aşağıdakı marşrutu (route) yaradın.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Salam!' })
})
```

Ana səhifəyə sorğu göndərdiyiniz zaman `index.ntl` HTML kimi göstəriləcək.

</div>
