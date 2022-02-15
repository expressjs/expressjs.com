---
layout: page
title: Express uygulamalarında kullanılacak ara yazılım yazmak
menu: guide
lang: tr
redirect_from: "/guide/writing-middleware.html"
---
# Express uygulamalarında kullanılacak ara yazılım yazmak

<h2>Genel bakış</h2>

_Ara yazılım_ fonksiyonları uygulamanın istek-yanıt döngüsünde (`req`) [istek objesi](/{{ page.lang }}/4x/api.html#req), (`res`) [yanıt objesi](/{{ page.lang }}/4x/api.html#res), ve `next` metoduna sahip fonksiyonlardır. Express yönlendiricisinde bir fonksiyon olan `next`çağrıldığında şimdiki ara yazılımın ardından gelen ara yazılımı çalıştırır.

Ara yazılım fonksiyonları aşağıdaki görevleri yerine getirebilir:

* Herhangi bir kodu çalıştırma.
* İstek ve yanıt objelerine değişiklik yapma.
* İstek-yanıt döngüsünü sonlandırma.
* Yığındaki bir sonraki ara yazılımı çağırma.

Eğer şimdiki ara yazılım fonksiyonu istek-yanıt döngüsünü sonlandırmazsa, bir sonraki ara yazılım fonksiyonuna kontrolü vermek için `next` fonksiyounu çağrılmalı. Aksi takdirde, istek havada kalır.

Aşağıdaki şekil bir ara yazılım fonksiyon çağrısının öğelerini gösterir:

<table id="mw-fig">
<tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">Ara yazılım fonsiyonunu uyglandığı HTTP metodu.</div>

<div class="callout" id="callout2">Ara yazılım fonksiyonunun uygulandığı yol (rota).</div>

<div class="callout" id="callout3">Ara yazılım fonksiyonu.</div>

<div class="callout" id="callout4">Ara yazılım için geri çağırma argümanı, ortak anlayışa göre "next" olarak adlandırıldı.</div>

<div class="callout" id="callout5">Ara yazılım fonksiyonuna HTTP <a href="/{{ page.lang }}/4x/api.html#res">yanıtı</a> argümanı, ortak anlayışa göre "res" olarak adlandırıldı.</div>

<div class="callout" id="callout6">Ara yazılım fonksiyonuna HTTP <a href="/{{ page.lang }}/4x/api.html#req">isteği</a> argümanı, ortak anlayışa göre "req" olarak adlandırıldı.</div>
</td></tr>
</table>

Express 5 ile başlayarak, Promise döndüren ara yazılım fonksiyonları reddettiklerinde veya hata fırlattıklarında `next(value)` fonksiyonunu çağırırlar. `next`, fırlatılan hata veya ret edilen değer ile çağrılacak.

<h2>Örnek</h2>

Aşağıdaki basit bir "Merhaba Dünya" Ekspres uygulaması örneği. Bu yazının kalanında uygulamaya üç ara yazılım fonksiyonu tanımlanıp eklenecektir: basit bir log mesajı yazdıran `myLogger`, HTTP isteğinin zaman damgasını (timestamp) gösteren `requestTime`, ve gelen çerezleri doğrulayan `validateCookies`.

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Merhaba Dünya!')
})

app.listen(3000)
```

<h3>myLogger ara yazlım fonksiyonu</h3>
İşte "myLogger" adında basit bir ara yazılım fonksiyonu. Uygulamaya gelen bir istek bu fonksiyondan geçtiğinde sadece "LOGGED" yazdırır. Bu ara yazılım fonksiyonu, `myLogger` adında bir değişkene atanmıştır.

```js
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

<div class="doc-box doc-notice" markdown="1">
Yukarıdaki örnekte `next()` çağrısına dikkat edin. Bu fonksiyonu çağırmak, uygulamadaki bir sonraki ara yazılım fonksiyonunu çağırır. `next()` fonskiyonu Express API veya Node.js'in bir parçası değil, ara yazılım fonksiyonuna geçilen üçüncü argümandır. `next()` fonksiyonu herhangi bir şekilde adlandırılabilir, ancak orta anlayışa göre her zaman "next" olarak adlandırıldı. Karışıklıktan kaçınmak için her zaman bu şekilde kullanın.
</div>

Ara yazılım fonksiyonunu yüklemek için, ara yazılım fonksiyonunu belirterek `app.use()` metodunu çağırın.
Örneğin, aşağıdaki kod (/) kök yoluna yönlendirme yapılmadan önce `myLogger` ara yazılım fonksiyonunu yükler.

```js
const express = require('express')
const app = express()

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

Uygulama ne zaman bir istek aldığında, "LOGGED" mesajını terminale yazdırır.

Ara yazılımları yükleme sırası önemlidir: ilk olarak yüklenen ara yazılım fonksiyonları yine ilk olarak çalışacaklardır.

`myLogger` kök yoluna yönlendirme yapıldıktan sonra yüklenirse, istek hiç ulaşmaz ve uygulama "LOGGED" mesajını yazdırmaz, çünkü kök yolu rota işleyicisi istek-yanıt döngüsünü sonlandırır.

`myLogger` ara yazılım fonksiyonu basit bir şekilde bir mesaj yazdırır, ve daha sonra `next()` metodunu çağırarak isteği yığındaki bir sonraki ara yazılım fonksiyonuna geçer.

<h3>requestTime ara yazılım fonksiyonu</h3>

Bir sonraki örnekte, "requestTime" adında bir ara yazılım fonksiyonu yaratıp `requestTime` adında bir özelliği istek objesine ekleyeceğiz.

```js
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

Uygulama şimdi `requestTime` ara yazılım fonksiyonunu kullanıyor. Ayrıca, kök yol rotasının geri çağırma fonksiyonu, ara yazılımın `req` istek objesine eklediği özelliği kullanıyor.

```js
const express = require('express')
const app = express()

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>'
  responseText += `<small>Requested at: ${req.requestTime}</small>`
  res.send(responseText)
})

app.listen(3000)
```

Uygulamanın kök yoluna bir istek yaptığınızda, uygulama şimdi tarayıcıda isteğinizin zaman damgasını yazdırıyor.

<h3>validateCookies ara yazılım fonksiyonu</h3>

Son olarak, gelen çerezleri doğrulayan ve çerezler geçersiz olduğunda 400 yanıtı gönderen bir ara yazılım fonksiyonu yaratacağız.

Harici bir asenkron servisiyle çerezleri doğrulayan bir fonksiyonu örneği.

```js
async function cookieValidator (cookies) {
  try {
    await externallyValidateCookie(cookies.testCookie)
  } catch {
    throw new Error('Geçersiz çerezler')
  }
}
```

Burada `req` objesinden gelen çerezleri ayrıştırmak ve onları bizim `cookieValidator` fonksiyonuna geçmek için [`cookie-parser`](/resources/middleware/cookie-parser.html) ara yazılım fonksiyonunu kullanıyoruz. `validateCookies` ara yazılımı, ret durumunda otomatik olarak bizim hata işleyicisini tetikleyen bir Promise döndürür.

```js
const express = require('express')
const cookieParser = require('cookie-parser')
const cookieValidator = require('./cookieValidator')

const app = express()

async function validateCookies (req, res, next) {
  await cookieValidator(req.cookies)
  next()
}

app.use(cookieParser())

app.use(validateCookies)

// hata işleyicisi
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.listen(3000)
```

<div class="doc-box doc-notice" markdown="1">
`next()` fonksiyonunun `await cookieValidator(req.cookies)` çağrısından sonra çağrıldığına bakınız. Bu, `cookieValidator` çözümlendiğinde yığındaki bir sonraki ara yazılımının çağrılmasını sağlar. `next()` fonksiyonuna `'route'` veya `'router'` karakter dizinleri dışında herhangi bir şey geçerseniz Express şimdiki isteği bir hata olarak değerlendirip arda kalan hata olmayan yönlendirme ve ara yazılım fonksiyonlarını es geçer.
</div>

İstek objesine, yanıt objesine, yığındaki bir sonraki ara yazılım fonksiyonuna, ve bütün Node.js API'sine erişme imkanına sahip olduğunuzdan, ara yazılım fonksiyonlarının imkanları sınırsızdır.

Express ara yazılımı ile ilgili daha fazla bilgi için, bakınız: [Express ara yazılımı kullanmak](/{{ page.lang }}/guide/using-middleware.html).

<h2>Yapılandırılabilir ara yazılım</h2>

Ara yazılımınızın yapılandırılabilir olmasını istiyorsanız, seçenekler objesi veya diğer parametreleri kabul eden ve girdi parametrelerine göre ara yazılım implementasyonunu döndüren bir fonksiyon dışarıya aktarın.

Dosya: `my-middleware.js`

```js
module.exports = function (options) {
  return function (req, res, next) {
    // "options" objesine göre ara yazılım fonksiyonunu yaz
    next()
  }
}
```

Bu ara yazılım şimdi aşağıdaki gibi kullanılabilir.

```js
const mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

Yapılandırılabilir ara yazılım örnekleri için bakınız: [cookie-session](https://github.com/expressjs/cookie-session) ve [compression](https://github.com/expressjs/compression).
