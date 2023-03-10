---
layout: page
title: Express glossary
menu: resources
lang: uz
---

# Lug'at

### ilova

Umuman olganda, ma'lum bir maqsad uchun operatsiyalarni bajarish uchun mo'ljallangan bir yoki bir nechta dasturlar. Express kontekstida, Node.js platformasida ishlaydigan Express API ishlatadigan dastur. [Ilova obyektiga](https://expressjs.com/en/api.html#express) ham murojaat qilishi mumkin .

### API

Ilova dasturlash interfeysi. Qisqartma birinchi marta qo'llanganda uni yozing.

### Ekspress

Node.js ilovalari uchun tezkor, noaniq, minimalist veb-ramka. Umuman olganda, "Express.js" dan ko'ra "Express" afzalroq, ammo ikkinchisi maqbuldir.

### libuv

Asinxron kiritish-chiqarishga yoʻnaltirilgan koʻp platformali qoʻllab-quvvatlash kutubxonasi, asosan Node.js tomonidan foydalanish uchun ishlab chiqilgan.

### o'rta dastur

Yakuniy so'rovni qayta ishlovchidan oldin Express marshrutlash qatlami tomonidan chaqiriladigan va shu tariqa xom so'rov va yakuniy mo'ljallangan marshrut o'rtasida joylashgan funksiya. O'rta dasturiy ta'minot atrofidagi terminologiyaning bir nechta nozik nuqtalari:

- `var foo = require('middleware')`Node.js modulini *talab qilish* yoki *ishlatish* deb ataladi . Keyin bayonot `var mw = foo()`odatda o'rta dasturni qaytaradi.
- `app.use(mw)`*o'rta dasturni global ishlov berish stekiga qo'shish* deb ataladi .
- `app.get('/foo', mw, function (req, res) { ... })`*"GET /foo" ishlov berish stekiga o'rta dasturni qo'shish* deb ataladi .

### Node.js

Kengaytiriladigan tarmoq ilovalarini yaratish uchun foydalaniladigan dasturiy platforma. Node.js JavaScript-ni skript tili sifatida ishlatadi va bloklanmaydigan kiritish-chiqarish va bir torli voqea tsikli orqali yuqori o'tkazuvchanlikka erishadi. [nodejs.org](https://nodejs.org/en/) ga qarang . **Foydalanish bo'yicha eslatma** : Dastlab "Node.js", keyin "Node".

### ochiq manba, ochiq manba

Sifat sifatida ishlatilganda, tire; masalan: "Bu ochiq kodli dasturiy ta'minot." [Vikipediyadagi ochiq kodli dasturiy taʼminotga](http://en.wikipedia.org/wiki/Open-source_software) qarang . Eslatma: Garchi bu atamani tire qo'ymaslik odatiy hol bo'lsa-da, biz qo'shma sifatni defislash uchun standart ingliz qoidalaridan foydalanamiz.

### request

HTTP so'rovi. Mijoz serverga HTTP so'rovi xabarini yuboradi, u javob qaytaradi. So'rovda GET, POST va boshqalar kabi bir nechta [so&#39;rov usullaridan birini qo&#39;llash kerak.](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)

### response

HTTP javobi. Server mijozga HTTP javob xabarini qaytaradi. Javobda soʻrov haqidagi yakuniy holat maʼlumotlari mavjud va uning xabar qismida soʻralgan kontent ham boʻlishi mumkin.

### route

Resursni aniqlaydigan URLning bir qismi. Masalan, `http://foo.com/products/id`"/products/id" da marshrut.

### router

API ma'lumotnomasida [marshrutizatorga](https://expressjs.com/en/api.html#router) qarang .
