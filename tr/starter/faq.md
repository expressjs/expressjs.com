---
layout: page
title: Express Sıkça Sorulan Sorular
menu: starter
lang: tr
---
# Sıkça Sorulan Sorular

## Uygulamamın yapısı nasıl olmalı?

Bu soruya verilebilecek kesin bir cevap yoktur. Cevap, uygulamanızın boyutuna ve uygulamaya dahil ekibe göre değişir. En üst seviyede esneklik için Express uygulama yapısı için herhangi bir varsayım yapmaz.

Yollar ve diğer uygulamaya özel mantık istediğiniz yapıda, istediğiniz kadar dosyanın içinde barınabilir. Örnek olarak şunlara göz atabilirsiniz:

* [Route listings](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
* [Route map](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

Ayrıca, bu dizaynlardan bazılarını basitleştiren, üçüncü parti bir Express uzantısı bulunmaktadır:

* [Resourceful routing](https://github.com/expressjs/express-resource)

## Nasıl model tanımlarım?

Express'te veritabanı kavramı bulunmamaktadır. Bu konsept diğer üçüncü parti modüllerine bırakılmıştır, bu sayede neredeyse herhangi bir veritabanına bağlantı sağlayabilirsiniz.

Model üzerine Express tabanlı bir framework için [LoopBack](http://loopback.io) adresini ziyaret edin.

## Kimlik doğrulamasını nasıl sağlarım?

Kimlik doğrulama Express'in bulundurmayı tercih etmediği başka bir konu. İstediğiniz herhangi bir kimlik doğrulama planını kullanabilirsiniz. Basit kullanıcı adı / şifre planı için [bu örneğe](https://github.com/expressjs/express/tree/master/examples/auth) göz atın.

## Express hangi görünüm (view) motorlarını destekliyor?

Express `(path, locals, callback)` kalıbını sağlayan herhangi bir görünüm motorunu destekler. Şablon motoru arayüzlerini ve önbelleklemeyi normalleştirmek için, [consolidate.js](https://github.com/visionmedia/consolidate.js)'e göz atın. Listelenmeyen görünüm motorları da Express'in yapısına uygun olabilir.

Daha fazla bilgi için, [Express ile görünüm motorlarını kullanmak](/{{page.lang}}/guide/using-template-engines.html).

## 404 cevapları ile nasıl başa çıkarım?

Express'te 404 cevapları bir hatanın sonucu olarak ortaya çıkmaz, bu yüzden hata işleyici ara katman bunları yakalamaz. Bunun sebebi 404 cevabı sadece yapılacak ekstra işin eksik olduğunu belirtir; başka bir sözle, Express tüm ara katman fonksiyonlarını ve yolları çalıştırdı, ve bunların hiçbirinin cevap döndürmediğini fark etti. Tek yapmanız gereken, bu yığının (tüm fonksiyonların) en sonuna 404'ü işleyen bir ara katman fonksiyonu yazmak:

```js
app.use((req, res, next) => {
  res.status(404).send('Üzgünüm, dosyayı bulamadım!')
})
```

Yolları dinamik olarak `express.Router()`'ın bir örneği üzerine tanımlayın, böylece tanımlarınızın yerine ara katman fonksiyonları geçmez.

## Hata işleyici fonksiyonları nasıl kullanabilirim?

Hata ile ilgili ara katman fonksiyonları da tıpkı diğer ara katman fonksiyonları gibi tanımlanır. Aradaki tek fark üç argüman yerine şu şekilde dört argüman kullanılmasıdır `(err, req, res, next)`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Bir hata oluştu!')
})
```

Daha fazla bilgi için, [Hata işleme](/{{ page.lang }}/guide/error-handling.html).

## Yalın HTML dosyalarını nasıl işlerim?

Yalın HTML için `res.render()` fonksiyonun kullanmak zorunda değilsiniz. Eğer dosyanız belirli ise, `res.sendFile()` fonksiyonunu kullanın. Eğer bir dizinden birden çok içerik sunuyorsanız, `express.static()` ara katman fonksiyonunu kullanın.

###  [Önceki: Statik Dosyalar ](/{{ page.lang }}/starter/static-files.html)
