---
layout: page
title: Express yol atama
menu: starter
lang: tr
---
# Basit yol atama

Yol atama, bir uygulamanın belrili bir adreste belirli bir HTTP methodu ile (GET, POST gibi) gelen isteğe ne şekilde cevap vereceğine karşılık gelir.

Her yol, girilen adres eşleştiğinde bir veya daha fazla fonksiyon tarafından işlenebilir.

Yol tanımları aşağıdaki şekilde yapılanmıştır:

```js
app.METHOD(PATH, HANDLER)
```

Burada:

- `app`, `express`'in bir örneği.
- `METHOD`, [HTTP istek methodu](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), küçük harflerle.
- `PATH`, sunucuda bulunan yol.
- `HANDLER`, adres bu yol ile eşleştiğinde çalıştırılan fonksiyon.

<div class="doc-box doc-notice" markdown="1">
Bu konu `express` ve `app` örneklerinin bulunduğunu ve sunucunun çalıştığını varsayar. Eğer bir uygulama oluşturup çalıştırmak hakkında bir bilginiz yoksa, [Merhaba Dünya örneği](/{{ page.lang }}/starter/hello-world.html) sayfasını ziyaret edin.
</div>

Aşağıdaki örnekler nasıl basit bir şekilde yol tanımlayabileceğinizi gösterir.

Anasayfada `Merhaba Dünya!` ile cevap verin:

```js
app.get('/', (req, res) => {
  res.send('Merhaba Dünya!')
})
```

Kök dizine (`/`) gelen POST isteğine bir cevap verin:

```js
app.post('/', (req, res) => {
  res.send('POST isteği geldi!')
})
```

`/user` yoluna gelen PUT isteği:

```js
app.put('/user', (req, res) => {
  res.send('/user adresinde bir PUT isteği')
})
```

`/user` yoluna gelen DELETE isteği:

```js
app.delete('/user', (req, res) => {
  res.send('/user adresinde bir DELETE isteği')
})
```

Yol atama ile ilgili daha fazla detay için, [yol atama](/{{ page.lang }}/guide/routing.html) sayfasını ziyaret edin.

###  [Previous: Express application generator ](/{{ page.lang }}/starter/generator.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Serving static files in Express ](/{{ page.lang }}/starter/static-files.html)
