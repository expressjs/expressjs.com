---
layout: page
title: Express API'yı Ezmek
menu: guide
lang: tr
---
<div id="page-doc" markdown="1">

# Express API'yı Ezmek

Express API istek ve yanıt objelerindeki çeşitli özellik ve metotlardan oluşur. Bunlar prototip tarafından miras alınır. Express API'ın iki uzantı noktası vardır:

1. `express.request` ve `express.response` alanlarındaki global prototipler.
2. `app.request` ve `app.response` alanlarındaki uygulamaya özel prototipler.

Global prototipleri değiştirmek aynı işlemde yüklenilen bütün Express uygulamalarını etkiler. İstenirse, yeni bir uygulama yaratıldıktan sonra sadece uygulamaya özel prototipleri değiştirerek, uygulama bazlı değişiklikler yapılabilir.

## Metotlar

Mevcut metotların davranış ve imzasını özel bir fonksiyon atayarak kendi metotlarınızla mevcutları geçersiz kılabilirsiniz.

Aşağıdaki örnek [res.sendStatus](/4x/api.html#res.sendStatus) metodunun davranışını geçersiz kılmayı gösterir:

```js
app.response.sendStatus = function (statusCode, type, message) {
  // kolaylık için kod kasıtlı olarak basit yapıldı
  return this.contentType(type)
    .status(statusCode)
    .send(message)
}
```

Yukarıdaki implementasyon `res.sendStatus` metodunun orijinal imzasını tamamen değiştiriyor. Şimdi ise bir statü kodu, kodlama tipi, ve istemciye gönderilecek mesajı kabul ediyor.

Geçersiz kılınan metot şimdi bu şekilde kullanılabilir:

```js
res.sendStatus(404, 'application/json', '{"error":"resource not found"}')
```

## Özellikler

Express API özellikleri şunlardan biridir:

1. Atanan özellikler (örnek: `req.baseUrl`, `req.originalUrl`)
2. Alıcı (getter) olarak tanımlananlar (örnek: `req.secure`, `req.ip`)

1 numaralı kategorideki özellikler şimdiki istek-yanıt döngüsü kapsamında `request` ve `response` objelerine dinamik olarak atandıklarından, değiştirilemez ve davranışları geçersiz kılınamaz.

2 numaralı kategoridekiler ise Express API'ın uzantılarının API'ları kullanılarak değiştirilip geçersiz kılınabilir.

Aşağıdaki kod `req.ip` alanının değerinin nasıl türetileceğini yeniden yazar. Şimdi, sadece  `Client-IP` istek başlığının değerini döndürüyor.

```js
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get () { return this.get('Client-IP') }
})
```
</div>
