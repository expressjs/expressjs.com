```markdown
---
layout: page
title: Express 5 ga o'tish
description: Express.js ilovalaringizni 4-versiyadan 5-versiyaga ko'chirish uchun to'liq qo'llanma, buzilgan o'zgarishlar, eskirgan usullar va yangi yaxshilanishlarni batafsil bayon qiladi.
menu: qo'llanma
lang: uz
redirect_from: "/guide/migrating-5.html"
---

# Express 5 ga o'tish

## Umumiy ko'rinish

Express 5 Express 4 dan juda farq qilmaydi; u bir xil asosiy API ni saqlab qolsa ham, hali ham oldingi versiya bilan moslikni buzuvchi o'zgarishlar mavjud. Shuning uchun, Express 4 bilan qurilgan ilova, agar siz uni Express 5 ni ishlatish uchun yangilasangiz, ishlamasligi mumkin.

Ushbu versiyani o'rnatish uchun sizda Node.js 18 yoki undan yuqori versiya bo'lishi kerak. Keyin, ilova katalogingizda quyidagi buyruqni bajaring:

```sh
npm install "express@5"
```

Keyin avtomatlashtirilgan testlaringizni ishga tushirib, nima muvaffaqiyatsiz bo'lganini ko'rishingiz va muammolarni quyida keltirilgan yangilanishlarga muvofiq tuzatishingiz mumkin. Test muvaffaqiyatsizliklarini hal qilgandan so'ng, ilovangizni ishga tushirib, qanday xatolar paydo bo'lishini ko'ring. Ilova qo'llab-quvvatlanmaydigan usullar yoki xususiyatlarni ishlatayotganini darhol bilib olasiz.

## Express 5 Kodemodlari

Express serveringizni ko'chirishga yordam berish uchun biz bir qator kodemodlarni yaratdik, ular kodingizni Express ning eng so'nggi versiyasiga avtomatik ravishda yangilashga yordam beradi.

Barcha mavjud kodemodlarni ishga tushirish uchun quyidagi buyruqni bajaring:

```sh
npx @expressjs/codemod upgrade
```

Agar siz ma'lum bir kodemodni ishga tushirmoqchi bo'lsangiz, quyidagi buyruqni ishlatishingiz mumkin:

```sh
npx @expressjs/codemod kodemod-nomi
```

Mavjud kodemodlar ro'yxatini [bu yerda](https://github.com/expressjs/codemod?tab=readme-ov-file#available-codemods) topishingiz mumkin.

## Express 5 dagi o'zgarishlar

### O'chirilgan usullar va xususiyatlar

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Ko'plik shaklidagi usul nomlari</a></li>
  <li><a href="#leading">app.param(name, fn) da nom argumentida oldingi ikki nuqta</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#magic-redirect">res.redirect('back') va res.location('back')</a></li>  
  <li><a href="#res.redirect">res.redirect(url, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
  <li><a href="#express.static.mime">express.static.mime</a></li>
  <li><a href="#express:router-debug-logs">express:router debug loglari</a></li>
</ul>

### O'zgartirilgan

<ul class="doclist">
  <li><a href="#path-syntax">Yo'l marshrutini moslashtirish sintaksisi</a></li>
  <li><a href="#rejected-promises">Middleware va handlerlardan rad etilgan va'dalar</a></li>
  <li><a href="#express.urlencoded">express.urlencoded</a></li>
  <li><a href="#app.listen">app.listen</a></li>
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.body">req.body</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
  <li><a href="#res.clearCookie">res.clearCookie</a></li>
  <li><a href="#res.status">res.status</a></li>
  <li><a href="#res.vary">res.vary</a></li>
</ul>

### Yaxshilanishlar

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
  <li><a href="#brotli-support">Brotli kodlashni qo'llab-quvvatlash</a></li>
</ul>

### O'chirilgan usullar va xususiyatlar

Agar siz ushbu usullar yoki xususiyatlardan birortasini ilovangizda ishlatsangiz, u ishlamay qoladi. Shuning uchun, 5-versiyaga yangilagandan so'ng, ilovangizni o'zgartirishingiz kerak bo'ladi.

#### app.del()

Express 5 endi `app.del()` funksiyasini qo'llab-quvvatlamaydi. Agar siz ushbu funksiyani ishlatsangiz, xato yuzaga keladi. HTTP DELETE yo'llarini ro'yxatdan o'tkazish uchun uning o'rniga `app.delete()` funksiyasidan foydalaning.

Dastlab, `del` `delete` o'rniga ishlatilgan, chunki `delete` JavaScript da rezervlangan kalit so'zdir. Biroq, ECMAScript 6 dan boshlab, `delete` va boshqa rezervlangan kalit so'zlar xususiyat nomlari sifatida qonuniy ravishda ishlatilishi mumkin.

> **Eslatma:** Siz eskirgan imzolarini quyidagi buyruq bilan almashtirishingiz mumkin:
>
> ```plain-text
> npx @expressjs/codemod v4-deprecated-signatures
> ```

```js
// v4
app.del('/user/:id', (req, res) => {
  res.send(`DELETE /user/${req.params.id}`)
})

// v5
app.delete('/user/:id', (req, res) => {
  res.send(`DELETE /user/${req.params.id}`)
})
```

#### app.param(fn)

`app.param(fn)` imzosi `app.param(name, fn)` funksiyasining xatti-harakatini o'zgartirish uchun ishlatilgan. U v4.11.0 dan beri eskirgan va Express 5 endi uni umuman qo'llab-quvvatlamaydi.

#### Ko'plik shaklidagi usul nomlari

Quyidagi usul nomlari ko'plik shakliga o'tkazildi. Express 4 da eski usullardan foydalanish eskirganlik haqida ogohlantirishga olib kelardi. Express 5 endi ularni umuman qo'llab-quvvatlamaydi:

- `req.acceptsCharset()` `req.acceptsCharsets()` bilan almashtirildi.
- `req.acceptsEncoding()` `req.acceptsEncodings()` bilan almashtirildi.
- `req.acceptsLanguage()` `req.acceptsLanguages()` bilan almashtirildi.

> **Eslatma:** Siz eskirgan imzolarini quyidagi buyruq bilan almashtirishingiz mumkin:
>
> ```plain-text
> npx @expressjs/codemod pluralized-methods
> ```

```js
// v4
app.all('/', (req, res) => {
  req.acceptsCharset('utf-8')
  req.acceptsEncoding('br')
  req.acceptsLanguage('en')

  // ...
})

// v5
app.all('/', (req, res) => {
  req.acceptsCharsets('utf-8')
  req.acceptsEncodings('br')
  req.acceptsLanguages('en')

  // ...
})
```

#### app.param(name, fn) da nom argumentida oldingi ikki nuqta

`app.param(name, fn)` funksiyasida nom uchun oldingi ikki nuqta (:) belgisi Express 3 dan qolgan va orqaga moslik uchun Express 4 uni eskirganlik haqida ogohlantirish bilan qo'llab-quvvatlagan. Express 5 uni jim o'tkazib yuboradi va nom parametrini ikki nuqtasiz ishlatadi.

#### req.param(name)

Bu chalkash va xavfli bo'lishi mumkin bo'lgan forma ma'lumotlarini olish usuli olib tashlandi. Endi siz yuborilgan parametr nomini `req.params`, `req.body` yoki `req.query` ob'ektlarida aniq qidirishingiz kerak bo'ladi.

> **Eslatma:** Siz eskirgan imzolarini quyidagi buyruq bilan almashtirishingiz mumkin:
>
> ```plain-text
> npx @expressjs/codemod req-param
> ```

```js
// v4
app.post('/user', (req, res) => {
  const id = req.param('id')
  const body = req.param('body')
  const query = req.param('query')

  // ...
})

// v5
app.post('/user', (req, res) => {
  const id = req.params.id
  const body = req.body
  const query = req.query

  // ...
})
```

#### res.json(obj, status)

Express 5 endi `res.json(obj, status)` imzosini qo'llab-quvvatlamaydi. Buning o'rniga, statusni o'rnating va keyin uni `res.json()` usuliga zanjirlab qo'ying: `res.status(status).json(obj)`.

> **Eslatma:** Siz eskirgan imzolarini quyidagi buyruq bilan almashtirishingiz mumkin:
>
> ```plain-text
> npx @expressjs/codemod v4-deprecated-signatures
> ```

```js
// v4
app.post('/user', (req, res) => {
  res.json({ name: 'Ruben' }, 201)
})

// v5
app.post('/user', (req, res) => {
  res.status(201).json({ name: 'Ruben' })
})
```

#### res.jsonp(obj, status)

Express 5 endi `res.jsonp(obj, status)` imzosini qo'llab-quvvatlamaydi. Buning o'rniga, statusni o'rnating va keyin uni `res.jsonp()` usuliga zanjirlab qo'ying: `res.status(status).jsonp(obj)`.

> **Eslatma:** Siz eskirgan imzolarini quyidagi buyruq bilan almashtirishingiz mumkin:
>
> ```plain-text
> npx @expressjs/codemod v4-deprecated-signatures
> ```

```js
// v4
app.post('/user', (req, res) => {
  res.jsonp({ name: 'Ruben' }, 201)
})

// v5
app.post('/user', (req, res) => {
  res.status(201).jsonp({ name: 'Ruben' })
})
```

#### res.redirect(url, status)

Express 5 endi `res.redirect(url, status)` imzosini qo'llab-quvvatlamaydi. Buning o'rniga, quyidagi imzoni ishlating: `res.redirect(status, url)`.

> **Eslatma:** Siz eskirgan imzolarini quyidagi buyruq bilan almashtirishingiz mumkin:
>
> ```plain-text
> npx @expressjs/codemod v4-deprecated-signatures
> ```

```js
// v4
app.get('/user', (req, res) => {
  res.redirect('/users', 301)
})

// v5
app.get('/user', (req, res) => {
  res.redirect(301, '/users')
})
```

#### res.redirect('back') va res.location('back')

Express 5 endi `res.redirect()` va `res.location()` usullarida "back" sehrli satrini qo'llab-quvvatlamaydi. Buning o'rniga, oldingi sahifaga qaytish uchun `req.get('Referrer') || '/'` qiymatidan foydalaning.

> **Eslatma:** Siz eskirgan imzolarini quyidagi buyruq bilan almashtirishingiz mumkin:
>
> ```plain-text
> npx @expressjs/codemod magic-redirect
> ```

```js
// v4
app.get('/user', (req, res) => {
  res.redirect('back')
})

// v5
app.get('/user', (req, res) => {
  res.redirect(req.get('Referrer') || '/')
})
```

#### res.send(body, status)

Express 5 endi `res.send(obj, status)` imzosini qo'llab-quvvatlamaydi. Buning o'rniga, statusni o'rnating va keyin uni `res.send()` usuliga zanjirlab qo'ying: `res.status(status).send(obj)`.

> **Eslatma:** Siz eskirgan imzolarini quyidagi buyruq bilan almashtirishingiz mumkin:
>
> ```plain-text
> npx @expressjs/codemod v4-deprecated-signatures
> ```

```js
// v4
app.get('/user', (req, res) => {
  res.send({ name: 'Ruben' }, 200)
})

// v5
app.get('/user', (req, res) => {
  res.status(200).send({ name: 'Ruben' })
})
```

#### res.send(status)

Express 5 endi `res.send(status)` imzosini qo'llab-quvvatlamaydi, bu yerda `status` raqamdir. Buning o'rniga, `res.sendStatus(statusCode)` funksiyasidan foydalaning, u HTTP javob sarlavhasi holat kodini o'rnatadi va kodning matn versiyasini yuboradi: "Topilmadi", "Ichki Server Xatosi" va hokazo.

> **Eslatma:** Siz eskirgan imzolarini quyidagi buyruq bilan almashtirishingiz mumkin:
>
> ```plain-text
> npx @expressjs/codemod v4-deprecated-signatures
> ```

```js
// v4
app.get('/user', (req, res) => {
  res.send(200)
})

// v5
app.get('/user', (req, res) => {
  res.sendStatus(200)
})
```

#### res.sendfile()

`res.sendfile()` funksiyasi Express 5 da kichik harfli versiyasi `res.sendFile()` bilan almashtirildi.

> **Eslatma:** Siz eskirgan imzolarini quyidagi buyruq bilan almashtirishingiz mumkin:
>
> ```plain-text
> npx @expressjs/codemod v4-deprecated-signatures
> ```

```js
// v4
app.get('/user', (req, res) => {
  res.sendfile('/path/to/file')
})

// v5
app.get('/user', (req, res) => {
  res.sendFile('/path/to/file')
})
```

#### express.static.mime

Express 5 da `mime` endi `static` maydonining eksport qilingan xususiyati emas. MIME turi qiymatlari bilan ishlash uchun [`mime-types` paketidan](https://github.com/jshttp/mime-types) foydalaning.

```js
// v4
express.static.mime.lookup('json')

// v5
const mime = require('mime-types')
mime.lookup('json')
```

#### express:router debug loglari

Express 5 da router ishlov berish mantig'i bog'liqlik tomonidan amalga oshiriladi. Shuning uchun, router uchun debug loglari endi `express:` nom maydonida mavjud emas.

```sh
# v4
DEBUG=express:* node index.js

# v5
DEBUG=express:*,router,router:* node index.js
```

### O'zgartirilgan

#### Yo'l marshrutini moslashtirish sintaksisi

Yo'l marshrutini moslashtirish sintaksisi quyidagi o'zgarishlar bilan yangilandi:

- Yovvoyi belgi `*` nomga ega bo'lishi kerak, `/*` o'rniga `/*splat` dan foydalaning:

```js
// v4
app.get('/*', async (req, res) => {
  res.send('ok')
})

// v5
app.get('/*splat', async (req, res) => {
  res.send('ok')
})
```

> **Eslatma:** `*splat` ildiz yo'lidan tashqari har qanday yo'lga mos keladi. Agar ildiz yo'lini ham moslashtirish kerak bo'lsa, `/{*splat}` dan foydalaning:
>
> ```js
> // v5
> app.get('/{*splat}', async (req, res) => {
>   res.send('ok')
> })
> ```

- Ixtiyoriy belgi `?` endi qo'llab-quvvatlanmaydi, uning o'rniga qavslar ishlatiladi:

```js
// v4
app.get('/:file.:ext?', async (req, res) => {
  res.send('ok')
})

// v5
app.get('/:file{.:ext}', async (req, res) => {
  res.send('ok')
})
```

#### Middleware va handlerlardan rad etilgan va'dalar

Rad etilgan va'dalar endi xato ishlov berish middleware ga yo'naltiriladi, bu `async` funksiyalarni ishlatishni osonlashtiradi.

#### express.urlencoded

`express.urlencoded` usuli `extended` opsiyasini sukut bo'yicha `false` qiladi.

#### app.listen

Express 5 da `app.listen` server xato hodisasini olganda qayta chaqirish funksiyasini chaqiradi:

```js
const server = app.listen(8080, '0.0.0.0', (error) => {
  if (error) {
    throw error
  }
  console.log(`Listening on ${JSON.stringify(server.address())}`)
})
```

#### app.router

Express 5 da `app.router` ob'ekti qaytib keldi va asosiy Express routerning havolasi sifatida ishlaydi.

#### req.body

`req.body` tanasi tahlil qilinmaganida `undefined` qaytaradi.

#### req.host

Express 5 da `req.host` port raqamini saqlab qoladi.

#### req.query

`req.query` endi yozilishi mumkin emas va sukut bo'yicha "simple" parser ishlatadi.

#### res.clearCookie

`res.clearCookie` `maxAge` va `expires` opsiyalarini e'tiborsiz qoldiradi.

#### res.status

`res.status` faqat `100` dan `999` gacha bo'lgan butun sonlarni qabul qiladi.

#### res.vary

`res.vary` `field` argumenti etishmayotganda xato yuzaga keladi.

### Yaxshilanishlar

#### res.render()

Bu usul endi barcha ko'rinish dvigatellari uchun asinxron xatti-harakatni majbur qiladi.

#### Brotli kodlashni qo'llab-quvvatlash

Express 5 Brotli kodlashni qo'llab-quvvatlaydi.
