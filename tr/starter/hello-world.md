---
layout: page
title: Express "Merhaba Dünya" örneği
menu: starter
lang: tr
---

# Merhaba Dünya Örneği

<div class="doc-box doc-info" markdown="1">
Aşağıda verilmiş olan, Express ile oluşturabileceğiniz en basit uygulamadır. Bu, birçok JavaScript dosyası, Jade şablonları ve çeşitli alt dizinler içeren [Express generator](/{{ page.lang }}/starter/generator.html) ile oluşturacağınız projelerin aksine tek dosyadan oluşan bir projedir.
</div>

<script src="https://embed.runkit.com" data-element-id="hello-example" data-mode="endpoint" async defer></script>
<div id="hello-example"><pre><code class="language-js">
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Merhaba Dünya!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
</code></pre></div>

Bu uygulama bir sunucu çalıştırır ve gelen bağlantılar için 3000 portunu dinler. (`/`) kök dizinine gelen isteklere "Hello World!" ile yanıt verir. Bunun haricindeki tüm adreslere, **404 Not Found** hatası verecektir.

Yukarıdaki örnek gerçekten de çalışmakta olan bir sunucudur: Yukarıda verilen adrese tıklayın. Gerçek zamanlı günlüklerle sunucunun bir cevap verdiğini göreceksiniz, ve yukarıda yapacağınız her değişiklik eş zamanlı olarak çalıştırılacaktır. Bu özellik arkada bir Node sistemine bağlı olup, tarayıcınızda bu sisteme bir arayüz sağlayan [RunKit](https://runkit.com) sayesinde bulunmaktadır.


<div class="doc-box doc-info" markdown="1">
RunKit bir üçüncü parti uygulamasıdır ve Express projesi ile bir bağı yoktur.
</div>

### Bilgisayarınızda Çalıştırmak

İlk olarak `myapp` adında bir dizin oluşturun, o dizine geçin ve `npm init` komutunu çalıştırın. Sonra `express`i [bu sayfada](/{{ page.lang }}/starter/installing.html) gösterildiği gibi bir bağımlılık olarak kurun.

`myapp` dizininde `app.js` adında bir dosya oluşturun ve yukarıdaki kodu bu dosyaya kopyalayın.

<div class="doc-box doc-notice" markdown="1">
`req` (request/istek) ve `res` (response/cevap) objeleri Node'da bulunanlar ile birebir aynıdır, bu yüzden
`req.pipe()`, `req.on('data', callback)`, gibi komutları Express dahil olmadan kullanabilirsiniz.
</div>

Uygulamayı aşağıdaki komutla çalıştırın:

```console
$ node app.js
```

Sonucu görmek için sunucunuzda `http://localhost:3000/` adresini ziyaret edin.

###  [Önceki: Kurulum ](/{{ page.lang }}/starter/installing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Sonraki: Express Oluşturucu ](/{{ page.lang }}/starter/generator.html)

