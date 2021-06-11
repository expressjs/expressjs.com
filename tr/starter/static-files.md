---
layout: page
title: Express ile statik dosyalar
menu: starter
lang: tr
---
# Express ile statik dosyaları sunmak

Görseller, CSS dosyaları ve JavaScript dosyaları gibi statik dosyaları sunmak için, Express'te bulunan `express.static` ara katmanını kullanın.

Fonksiyonun yapısı şu şekildedir:

```js
express.static(root, [options])
```

`root` argümanı statik dosyaların bulunduğu ana dizine karşılık gelir. 
`options` argümanı hakkında detaylı bilgi için, [express.static](/{{page.lang}}/4x/api.html#express.static) sayfasını ziyaret edin.

Örneğin, `public` dizininde bulunan görselleri, CSS dosyalarını ve JavaScript dosyalarını sunmak için bunu kullanın:

```js
app.use(express.static('public'))
```

Artık `public` dizininde bulunan statik dosyaları görebilirsiniz:

```plain-text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express statik dosyaların yerlerine ana dizine bağlı olarak bakar. Bu yüzden statik dosyaları barındıran ana dizin URL'de bulunmaz.
</div>

Birden fazla statik dosya dizini kullanmak için `express.static` fonksiyonun birden fazla kullanabilirsiniz.

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express statik dosyalara `express.static` ile tanımladığınız sırayla bakar.

<div class="doc-box doc-info" markdown="1">NOT: En iyi sonuç için, statik dosyaları sunarken performansı artırmak için [reverse proxy](/{{page.lang}}/advanced/ önbelleği kullanın.
</div>

`express.static` ile sunulan dosyalar için sanal bir yol (statik dizinin aslında gerçekte bulunmadığı) yaratmak için, statik dizine aşağıdaki gibi bir [path tanımlayın](/{{ page.lang }}/4x/api.html#app.use).


```js
app.use('/static', express.static('public'))
```

Artık `public` dizinindeki dosyalara `/static` önekiyle ulaşabilirsiniz.

```plain-text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

`express.static` fonksiyonu ile tanımladığınız yollar `node` processini çalıştırdığınız dizine bağlıdır. Bu yüzden, eğer express uygulamasını başka bir dizinden çalıştırıyorsanız, statik dizini tam adres olarak tanımlamanız daha güvenli olur.

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

`serve-static` hakkında daha fazla bilgi almak için, [serve-static](/resources/middleware/serve-static.html) sayfasına göz atın.

### [Önceki: Basit Yol Atama ](/{{ page.lang }}/starter/basic-routing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Sonraki: Sıkça Sorulan Sorular ](/{{ page.lang }}/starter/faq.html)
