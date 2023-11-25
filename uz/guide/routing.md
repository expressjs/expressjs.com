---
layout: page
title: Express routerlar
menu: guide
lang: uz
---

# Routing

*Marshrutlash* dasturning so'nggi nuqtalari (URI) mijoz so'rovlariga qanday javob berishini anglatadi. Marshrutlash bilan tanishish uchun [Asosiy marshrutlash-](https://expressjs.com/en/starter/basic-routing.html) ga qarang .

`app` HTTP usullariga mos keladigan Express ob'ektining usullaridan foydalanib marshrutlashni aniqlaysiz ; masalan, `app.get() `GET so'rovlarini boshqarish va `app.post` POST so'rovlarini bajarish uchun. Toʻliq roʻyxat uchun [app.METHOD](https://expressjs.com/en/4x/api.html#app.METHOD) ga qarang . [Shuningdek, siz barcha HTTP usullarini boshqarish uchun app.all()](https://expressjs.com/en/4x/api.html#app.all) dan va qayta qo'ng'iroq qilish funksiyasi sifatida o'rta dasturni belgilash uchun [app.use() dan](https://expressjs.com/en/4x/api.html#app.use) foydalanishingiz mumkin (batafsil ma'lumot uchun [o`rta dasturdan foydalanishga](https://expressjs.com/en/guide/using-middleware.html) qarang ).

Ushbu marshrutlash usullari ilova belgilangan marshrutga (so'nggi nuqta) va HTTP usuliga so'rovni qabul qilganda chaqiriladigan qayta qo'ng'iroq qilish funktsiyasini (ba'zan "ishlab chiqaruvchi funktsiyalari" deb ataladi) belgilaydi. Boshqacha qilib aytganda, dastur belgilangan marshrut(lar) va usul(lar)ga mos keladigan so‘rovlarni “tinglaydi”va moslikni aniqlaganida, belgilangan qayta qo‘ng‘iroq funksiyasini chaqiradi.

Aslida, marshrutlash usullari argument sifatida bir nechta qayta qo'ng'iroq qilish funksiyasiga ega bo'lishi mumkin. `next` Bir nechta qayta qo'ng'iroq qilish funktsiyalari bilan, qayta qo'ng'iroq qilish funktsiyasiga argument sifatida taqdim etish va keyin `next()` boshqaruvni keyingi qayta qo'ng'iroqqa o'tkazish uchun funktsiya tanasi ichida qo'ng'iroq qilish muhimdir .

Quyidagi kod juda oddiy marshrutning namunasidir.

```javascript
const express = require("express");
const app = express();

// Bosh sahifaga GET so'rovi yuborilganda "salom dunyo" deb javob bering
app.get("/", (req, res) => {
  res.send("salom dunyo");
});
```

## Yo'nalish usullari

Marshrut usuli HTTP usullaridan biridan olinadi va sinfning namunasiga biriktiriladi `express`.

Quyidagi kod GET va POST usullari uchun ilova ildiziga aniqlangan marshrutlarga misoldir.

```javascript
// GET mashrut metodi
app.get("/", (req, res) => {
  res.send("Bosh sahifaga GET so'rovi");
});

// POST mashrut metodi
app.post("/", (req, res) => {
  res.send("Bosh sahifaga POST so'rovi");
});
```

Express barcha HTTP so'rov usullariga mos keladigan usullarni qo'llab-quvvatlaydi: `get`, `post`, va hokazo. Toʻliq roʻyxat uchun [app.METHOD](https://expressjs.com/en/4x/api.html#app.METHOD) ga qarang .

Barcha `app.all()` HTTP so'rov usullari uchun yo'lda o'rta dastur funktsiyalarini yuklash uchun ishlatiladigan maxsus marshrutlash usuli mavjud . Misol uchun, quyidagi ishlov beruvchi GET, POST, PUT, DELETE yoki [http modulida](https://nodejs.org/api/http.html#http_http_methods) qo'llab-quvvatlanadigan boshqa HTTP so'rov usullaridan foydalangan holda "/secret" marshrutiga so'rovlar uchun bajariladi .

```javascript
app.all("/secret", (req, res, next) => {
  console.log("Accessing the secret section ...");
  next(); // pass control to the next handler
});
```

## Marshrut yo'llari

Marshrut yo'llari so'rov usuli bilan birgalikda so'rovlar amalga oshirilishi mumkin bo'lgan so'nggi nuqtalarni belgilaydi. Marshrut yo'llari qatorlar, satr naqshlari yoki muntazam ifodalar bo'lishi mumkin.

`?`, `+`, `*`va belgilari `()`ularning muntazam ifodadoshlarining kichik to'plamidir. Defis ( `-`) va nuqta ( `.`) satrga asoslangan yo'llar bilan tom ma'noda talqin qilinadi.

`$`Agar yo'l qatorida dollar belgisidan ( ) foydalanish kerak bo'lsa , uni `([`va ichida qochib qo'ying `])`. Masalan, “ `/data/$book`” dagi so‘rovlar uchun yo‘l qatori “ ” bo‘ladi `/data/([\$])book`.

Ekspress marshrut yo'llarini moslashtirish uchun [path-to-regexp dan foydalanadi; ](https://www.npmjs.com/package/path-to-regexp)marshrut yo'llarini aniqlashning barcha imkoniyatlari uchun yo'l-regexp hujjatlariga qarang. [Ekspres marshrutni sinovdan o&#39;tkazuvchi](http://forbeslindesay.github.io/express-route-tester/) - bu asosiy ekspress marshrutlarni sinab ko'rish uchun qulay vosita, garchi u naqsh mosligini qo'llab-quvvatlamaydi.

So'rov satrlari marshrut yo'lining bir qismi emas.

Satrlarga asoslangan marshrut yo'llarining ba'zi misollari.

Ushbu marshrut yo'li so'rovlarga asosiy marshrutga mos keladi, `/`.

```javascript
app.get("/", (req, res) => {
  res.send("root");
});
```

Bu marshrut yoʻli soʻrovlarga mos keladi `/about`.

```javascript
app.get("/about", (req, res) => {
  res.send("about");
});
```

Bu marshrut yoʻli soʻrovlarga mos keladi `/random.text`.

```javascript
app.get("/random.text", (req, res) => {
  res.send("random.text");
});
```

Bu erda qator naqshlari asosida marshrut yo'llarining ba'zi misollari keltirilgan.

Bu marshrut yo'li mos keladi `acd`va `abcd`.

```javascript
app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});
```

Bu marshrut yo'li mos keladi `abcd`, `abbcd`, `abbbcd`, va hokazo.

```javascript
app.get("/ab+cd", (req, res) => {
  res.send("ab+cd");
});
```

Bu marshrut yo'li mos keladi `abcd`, `abxcd`, `abRANDOMcd`, `ab123cd`, va hokazo.

```javascript
app.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});
```

Bu marshrut yo'li mos keladi `/abe`va `/abcde`.

```javascript
app.get("/ab(cd)?e", (req, res) => {
  res.send("ab(cd)?e");
});
```

Muntazam iboralarga asoslangan marshrut yo'llariga misollar:

Ushbu marshrut yo'li "a" belgisi bo'lgan har qanday narsaga mos keladi.

```javascript
app.get(/a/, (req, res) => {
  res.send("/a/");
});
```

Bu marshrut yo'li mos keladi `butterfly`va `dragonfly`, lekin `butterflyman`, `dragonflyman`, va hokazo.

```javascript
app.get(/.*fly$/, (req, res) => {
  res.send("/.*fly$/");
});
```

### Yo'nalish parametrlari

Marshrut parametrlari URL segmentlari deb ataladi, ular URL manzilidagi o'z pozitsiyasida ko'rsatilgan qiymatlarni olish uchun ishlatiladi. Qabul qilingan qiymatlar ob'ektda to'ldiriladi `req.params`, marshrut parametri nomi ularning tegishli kalitlari sifatida yo'lda ko'rsatilgan.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

Marshrut parametrlari bilan marshrutlarni belgilash uchun quyida ko'rsatilgandek marshrut yo'lidagi marshrut parametrlarini belgilang.

```javascript
app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});
```

Marshrut parametrlarining nomi "so'z belgilaridan" iborat bo'lishi kerak ([A-Za-z0-9_]).

Defis ( `-`) va nuqta ( `.`) so'zma-so'z talqin qilinganligi sababli, ular foydali maqsadlarda marshrut parametrlari bilan birga ishlatilishi mumkin.

```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```

```
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

Marshrut parametri bilan mos kelishi mumkin bo'lgan aniq satr ustidan ko'proq nazoratga ega bo'lish uchun qavslar ( ) ichiga muntazam ifoda qo'shishingiz mumkin `()`:

```
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

Muntazam ifoda odatda tom ma'nodagi satrning bir qismi bo'lganligi sababli, qo'shimcha teskari chiziqli har qanday belgilardan qochishni unutmang `\`, masalan `\\d+`.

Express 4.x da muntazam iboralardagi [belgi `*`odatdagidek talqin etilmaydi](https://github.com/expressjs/express/issues/2495) . Vaqtinchalik yechim sifatida `{0,}`o'rniga foydalaning `*`. Bu, ehtimol, Express 5 da tuzatiladi.

## Marshrut boshqaruvchilari

Siz so'rovni bajarish uchun [o&#39;rta dastur](https://expressjs.com/en/guide/using-middleware.html) kabi ishlaydigan bir nechta qayta qo'ng'iroq funksiyalarini taqdim etishingiz mumkin . Faqatgina istisno shundaki, bu qayta qo'ng'iroqlar `next('route')`qolgan marshrut qo'ng'iroqlarini chetlab o'tish uchun chaqirilishi mumkin. Siz ushbu mexanizmdan marshrutga oldindan shartlar qo'yish uchun foydalanishingiz mumkin, so'ngra joriy marshrutni davom ettirish uchun hech qanday sabab bo'lmasa, keyingi yo'nalishlarga boshqaruvni o'tkazishingiz mumkin.

Marshrut ishlov beruvchilari quyidagi misollarda ko'rsatilganidek, funksiya, funksiyalar massivi yoki ikkalasining kombinatsiyasi shaklida bo'lishi mumkin.

Bitta qayta qo'ng'iroq qilish funktsiyasi marshrutni boshqarishi mumkin. Masalan:

```javascript
app.get("/example/a", (req, res) => {
  res.send("A dan salom!");
});
```

Bir nechta qayta qo'ng'iroq qilish funksiyasi marshrutni boshqarishi mumkin (ob'ektni ko'rsatganingizga ishonch hosil qiling `next`). Masalan:

```javascript
app.get(
  "/example/b",
  (req, res, next) => {
    console.log("javob keyingi funksiya tomonidan yuboriladi ...");
    next();
  },
  (req, res) => {
    res.send("Hello from B!");
  }
);
```

Qayta qo'ng'iroq qilish funktsiyalari qatori marshrutni boshqarishi mumkin. Masalan:

```javascript
const cb0 = function (req, res, next) {
  console.log("CB0");
  next();
};

const cb1 = function (req, res, next) {
  console.log("CB1");
  next();
};

const cb2 = function (req, res) {
  res.send("C dan salom!");
};

app.get("/example/c", [cb0, cb1, cb2]);
```

Mustaqil funksiyalar va funksiyalar massivlarining kombinatsiyasi marshrutni boshqarishi mumkin. Masalan:

```javascript
const cb0 = function (req, res, next) {
  console.log("CB0");
  next();
};

const cb1 = function (req, res, next) {
  console.log("CB1");
  next();
};

app.get(
  "/example/d",
  [cb0, cb1],
  (req, res, next) => {
    console.log("the response will be sent by the next function ...");
    next();
  },
  (req, res) => {
    res.send("Hello from D!");
  }
);
```

## Javob berish usullari

Quyidagi jadvaldagi javob ob'ektidagi usullar ( `res`) mijozga javob yuborishi va so'rov-javob aylanishini tugatishi mumkin. Agar ushbu usullarning hech biri marshrutni ishlov beruvchidan chaqirilmasa, mijoz so'rovi osilib qoladi.

| Usul                                                                    | Tavsif                                                                                  |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [res.download()](https://expressjs.com/en/4x/api.html#res.download)     | Yuklab olinadigan faylni taklif qiling.                                                 |
| [res.end()](https://expressjs.com/en/4x/api.html#res.end)               | Javob berish jarayonini tugating.                                                       |
| [res.json()](https://expressjs.com/en/4x/api.html#res.json)             | JSON javobini yuboring.                                                                 |
| [res.jsonp()](https://expressjs.com/en/4x/api.html#res.jsonp)           | JSONP yordami bilan JSON javobini yuboring.                                             |
| [res.redirect()](https://expressjs.com/en/4x/api.html#res.redirect)     | So'rovni qayta yo'naltirish.                                                            |
| [res.render()](https://expressjs.com/en/4x/api.html#res.render)         | Ko'rinish shablonini ko'rsatish.                                                        |
| [res.send()](https://expressjs.com/en/4x/api.html#res.send)             | Har xil turdagi javoblarni yuboring.                                                    |
| [res.sendFile()](https://expressjs.com/en/4x/api.html#res.sendFile)     | Faylni oktet oqimi sifatida yuboring.                                                   |
| [res.sendStatus()](https://expressjs.com/en/4x/api.html#res.sendStatus) | Javob holati kodini o'rnating va uning string tasvirini javob tanasi sifatida yuboring. |

## app.route()

dan foydalanib, marshrut yo'li uchun zanjirli marshrut ishlov beruvchilarini yaratishingiz mumkin `app.route()`. Yo'l bitta joyda ko'rsatilganligi sababli, modulli marshrutlarni yaratish ortiqcha va matn terish xatolarini kamaytirish kabi foydalidir. Marshrutlar haqida qo'shimcha ma'lumot olish uchun qarang: [Router() hujjatlari](https://expressjs.com/en/4x/api.html#router) .

Bu yerda yordamida aniqlangan zanjirli marshrut ishlovchilari misoli keltirilgan `app.route()`.

```javascript
app
  .route("/book")
  .get((req, res) => {
    res.send("Tasodifiy kitobni olish");
  })
  .post((req, res) => {
    res.send("Kitob qo'shish");
  })
  .put((req, res) => {
    res.send("Kitobni yangilash");
  });
```

## express.Router

`express.Router` Modulli, o'rnatilishi mumkin bo'lgan marshrut ishlov beruvchilarini yaratish uchun sinfdan foydalaning . Misol `Router `to'liq o'rta dastur va marshrutlash tizimidir; shu sababli, u ko'pincha "mini-ilova" deb ataladi.

Quyidagi misol routerni modul sifatida yaratadi, unda o'rta dastur funksiyasini yuklaydi, ba'zi marshrutlarni belgilaydi va yo'riqnoma modulini asosiy ilovadagi yo'lga o'rnatadi.

`birds.js `Ilovalar katalogida quyidagi tarkibga ega router faylini yarating :

```javascript
const express = require("express");
const router = express.Router();

// ushbu routerga xos bo'lgan o'rta dastur
router.use((req, res, next) => {
  console.log("Vaqt: ", Date.now());
  next();
});
// bosh sahifa yo'nalishini belgilang
router.get("/", (req, res) => {
  res.send("Qushlar uy sahifasi");
});
// haqida sahifa yo'nalishi belgilang
router.get("/about", (req, res) => {
  res.send("Qushlar haqida");
});

module.exports = router;
```

Keyin dasturga marshrutizator modulini yuklang:

```javascript
const birds = require("./birds");

// ...

app.use("/birds", birds);
```

`/birds `Ilova endi va ga so'rovlarni bajarishi `/birds/about`, shuningdek, `timeLog `marshrutga xos bo'lgan o'rta dastur funksiyasini chaqirishi mumkin bo'ladi .
