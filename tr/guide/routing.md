---
layout: page
title: Express yönlendirmesi
menu: guide
lang: tr
---
<div id="page-doc" markdown="1">
# Yönlendirme

_Routing_ uygulama bitiş noktalarının tanımını (URI'ler) ve istemci isteklerine nasıl yanıt verdiklerini ifade eder.
Yönlendirme'ye giriş için, [Temel yönlendirme] sayfasına bakınız.(/{{ page.lang }}/starter/basic-routing.html).

HTTP metod isimlerine karşılık gelen Express `app` objesinin metodlarını kullanarak yönlendirmeleri tanımlayabilirsiniz; örneğin, GET isteklerini işlemek için `app.get()` ve POST isteklerini işlemek için de `app.post()` kullanmak gibi. Tam liste için bakınız [app.METHOD](/{{ page.lang }}/4x/api.html#app.METHOD). Bütün HTTP metodlarını işlemek için [app.all()](/{{ page.lang }}/4x/api.html#app.all), ve geri çağırma fonksiyonu olarak da ara yazılım tanımlamak için [app.use()](/{{ page.lang }}/4x/api.html#app.use) kullanabilirsiniz (Daha fazla detay için bakınız [Ara yazılım kullanmak](/{{ page.lang }}/guide/using-middleware.html)).

Bu yönlendirme metodları, uygulamanın belirtilen bir rotaya (bitiş noktası) ve HTTP metoduna aldığı isteklerde çağrılan bir geri çağırma fonksiyonu belirtirler (bazen "işleyici fonksiyonlar" olarak isimlendirilirler). Başka bir deyişle, uygulama, belirtilen rota(lar) ve metod(lar) ile eşleşen istekleri "dinler", ve bir eşleşme algıladığında, ilgili geri çağırma fonksiyonunu çağırır.

Aslında yönlendirme metodları birden fazla geri çağırma fonksiyonunu argüman olarak alabilir. Birden fazla geri çağırma fonksiyonu olduğunda, bir sonraki fonksiyona kontrolü vermek için geri çağırma fonksiyonuna `next`' argümanını verip, geri çağırma fonksiyonunun içinde `next()` metodunu çağırmak önemlidir.

Aşağıdaki kod çok temel bir rota örneğidir.

```js
const express = require('express')
const app = express()

// anasayfaya bir GET isteği yapıldığında "merhaba dünya" ile yanıt verir
app.get('/', (req, res) => {
  res.send('merhaba dünya')
})
```

<h2 id="route-methods">Rota metodları</h2>

Bir rota metodu, HTTP metodlarının birinden türetilir ve `express` sınıfının bir örneğine eklenir.

Aşağıdaki kod uygulamanın köküne GET ve POST metodları için tanımlanan rotalara bir örnektir.

```js
// GET metodu rotası
app.get('/', (req, res) => {
  res.send('anasayfaya GET isteği')
})

// POST metodu rotası
app.post('/', (req, res) => {
  res.send('anasayfaya POST isteği')
})
```

Express, HTTP metodlarına karşılık gelen bu yönlendirme metodlarını destekler: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search`, ve `connect`.

<div class="doc-box doc-info" markdown="1">
Geçersiz JavaScript değişken adlarına denk gelen metodları yönlendirmek için köşeli parantez notasyonunu kullanınız. Örneğin,
`app['m-search']('/', function ...`
</div>

Hiçbir HTTP metodundan türemeyen özel bir yönlendirme metodu olan `app.all()` mevcut. bu metod, tüm istek metodları için bir yolda ara katman yazılım(middleware) fonksiyonlarını yüklemek için kullanılır.

Bir sonraki örnekte, "/secret" rotasına yapılan isteklerde, GET, POST, PUT, DELETE veya [http modülü](https://nodejs.org/api/http.html#http_http_methods)'nde desteklenen herhangi bir HTTP istek metodu farketmeksizin bu işleyici çalıştırılacak.

```js
app.all('/secret', (req, res, next) => {
  console.log('Gizli bölümlere erişiliyor...')
  next() // bir sonraki işleyiciye kontrolü verir
})
```

<h2 id="route-paths">Rota yolları</h2>

Rota yolları, bir istek metoduyla birlikte, isteklerin yapılabileceği bitiş noktalarını tanımlar. Rota yolları karakter dizini, karakter dizin modeli veya düzenli ifadeler(reqular expression) olabilir.

`?`, `+`, `*`, ve `()` karakterleri düzenli ifade karşılıklarının alt kümeleridir. Tire (`-`) ve nokta (`.`) karakter-dizisi tabanlı yollar tarafından oldukları gibi değerlendirilir.

Eğer dolar karakterini (`$`) bir karakter dizini yolunda kullanma ihtiyacınız olursa, `([` ve `])` karakterlerinin içinde kullanınız. Örneğin, "`/data/$book`" istekleri için dizin yolu bu şekilde olur: "`/data/([\$])book`".

<div class="doc-box doc-info" markdown="1">
  Express, rota yollarını eşleştirmek için [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) kullanır; rota tanımlamadaki bütün olasılıkları öğrenmek için path-to-regexp dökümantasyonuna bakınız. Basit Express rotalarını test etmek için [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) kullanışlı bir araçtır, ancak bu araç model eşleştirmeyi desteklememektedir.
</div>

<div class="doc-box doc-warn" markdown="1">
Sorgu dizeleri rota yolunun bir parçası değillerdir.
</div>

Karakter dizininlerine dayalı bazı rota yolları örnekleri.

Bu rota yolu, istekleri kök rotaya eşleştirecek, `/`.

```js
app.get('/', (req, res) => {
  res.send('root')
})
```

Bu rota yolu istekleri `/about` ile eşleştirecek

```js
app.get('/about', (req, res) => {
  res.send('about')
})
```

Bu rota yolu istekleri `/random.text` ile eşleştirecek

```js
app.get('/random.text', (req, res) => {
  res.send('random.text')
})
```

Aşağıda, dizin modellerine dayalı rota yollarının bazı örnekleri verilmiştir.

Bu rota yolu, `acd` ve `abcd` ile eşleşecek.

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```

Bu rota yolu, `abcd`, `abbcd`, `abbbcd` vb. ile eşleşecek.

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```

Bu rota yolu, `abcd`, `abxcd`, `abRANDOMcd`, `ab123cd` vb. ile eşleşecek.

```js
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})
```

Bu rota yolu, `/abe` ve `/abcde` ile eşleşecek.

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
```

Düzenli ifadelere dayalı rota yolları örnekleri:

Bu rota yolu, rota isminde "a" karakteri olan herhangi bir şey ile eşleşecek.

```js
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```

Bu rota yolu `butterfly` ve `dragonfly` ile eşleşir, ancak `butterflyman`, `dragonflyman` vb. ile değil.

```js
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
```

<h3 id="route-parameters">Rota parametreleri</h3>

Rota parametreleri, URL'deki konumlarında belirtilen değerleri yakalamak için kullanılan adlandırılmış URL bölümleridir. Yakalanan değerler, yolda belirtilen rota parameterlerinin ilgili isimlerini alarak `req.params` objesinde tutulur.

```
Rota yolu: /users/:userId/books/:bookId
İStek URL'i: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

Parametreli rota tanımlamak için, aşağıda gösterildiği gibi rota parametrelerini rotanın yolunda belirtmeniz yeterlidir.

```js
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
```

<div class="doc-box doc-notice" markdown="1">
Rota parametrelerinin isimleri sadece "kelime karakterleri" içermelidir ([A-Za-z0-9_]).
</div>

Tire (`-`) ve nokta (`.`) oldukları gibi değerlendirildikleri için, kullanışlı amaçlar için rota parametrelerinde kullanılabilirler.

```
Rota yolu: /flights/:from-:to
İtek URL'i: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```

```
Rota yolu: /plantae/:genus.:species
İstek URL'i: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

Bir rota parametresiyle eşleşen dizin üzerinde daha fazla kontrole sahip olmak için, parantez içinde (`()`) düzenli ifade ekleyebilirsiniz:

```
Rota yolu: /user/:userId(\d+)
İstek URL'i: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

<div class="doc-box doc-warn" markdown="1">
Düzenli ifadeler genellikle tam bir dizenin parçaları oldukları için, <code>\</code> karakterlerinden ek olarak ters eğik çizgi ile kaçtığınızdan emin olun, örneğin <code>\\d+</code>.
</div>

<div class="doc-box doc-warn" markdown="1">
Express 4.x'te, <a href="https://github.com/expressjs/express/issues/2495">düzenli ifadelerdeki <code>*</code> karakteri normal durumlardaki gibi değerlendirilmiyor</a>. Geçici çözüm olarak, <code>*</code> karakteri yerine<code>{0,}</code> karakterini kullanınız. Bu muhtemelen Express 5'te düzeltilecektir.
</div>

<h2 id="route-handlers">Rota işleyicileri</h2>

Bir isteği işlemek için, [ara-katman](/{{ page.lang }}/guide/using-middleware.html) gibi davranan birden fazla geri çağırma fonksiyonu sağlayabilirsiniz. Bunun tek istisnası, bu geri çağırmalar, arda kalan rota metodlarını atlatmak için `next('route')` metodunu çağırabilir. Bir rotaya ön koşullar uygulamak için bu mekanizmayı kullanabilirsiniz, ve sonra geçerli rotaya devam etmek için bir neden yoksa kontrolü sonraki rotalara aktarabilirsiniz.


Rota işleyicileri, aşağıdaki örneklerde gösterildiği gibi bir fonksiyon, fonksiyonlar dizisi veya her ikisinin birleşimi biçiminde olabilir.

Bir geri çağırma fonksiyonu, bir rotayı işleyebilir. Örneğin:

```js
app.get('/example/a', (req, res) => {
  res.send('A\'dan merhaba')
})
```

Birden fazla geri çağırma fonksiyonu bir rotayı işleyebilir (`next` objesini belirttiğinizden emin olun). Örneğin:

```js
app.get('/example/b', (req, res, next) => {
  console.log('yanıt bir sonraki fonksiyon tarafından gönderilecek')
  next()
}, (req, res) => {
  res.send('B\'den merhaba')
})
```
Geri çağırma fonksiyonları dizini bir rotayı işleyebilir. Örneğin:

```js
const cb0 = function (req, res, next) {
  console.log('Geri çağırma 0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('Geri çağırma 1')
  next()
}

const cb2 = function (req, res) {
  res.send('C\'den merhaba')
}

app.get('/example/c', [cb0, cb1, cb2])
```

Bağımsız fonksiyonlar ve fonksiyon dizilerinin bir kombinasyonu bir rotayı işleyebilir. Örneğin:

```js
const cb0 = function (req, res, next) {
  console.log('Geri çağırma 0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('Geri çağırma 1')
  next()
}

app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('yanıt bir sonraki fonksiyon tarafından gönderilecek')
  next()
}, (req, res) => {
  res.send('D\'den merhaba')
})
```

<h2 id="response-methods">Yanıt metodları</h2>

Aşağıdaki tabloda yanıt nesnesindeki (`res`) metodlar istemciye yanıt gönderebilir ve istek-yanıt döngüsünü sonlandırabilir. Bu metodlardan hiçbiri bir rota işleyiciden çağrılmazsa, istemci isteği asılı kalır.

| Metod                | Açıklama
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)   | Bir dosyanın indirilmesini iste.
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)        | Yanıt sürecini sonlandır.
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)       | JSON yanıtı gönder.
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)      | JSONP destekli bir JSON yanıtı gönder
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)   | Bir isteği yeniden yönlendir.
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)     | Bir görünüm şablonu görüntüle.
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)       | Çeşitli tiplerde yanıt gönder.
| [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile)     | Dosyayı sekizli akış olarak gönder.
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Yanıt durum kodunu ayarla ve karakter dize temsilini yanıt gövdesi olarak gönder.

<h2 id="app-route">app.route()</h2>

Bir rota yolu için `app.route()` kullanarak zincirlenebilir rota işleyicileri oluşturabilirsiniz.
Yol tek bir konumda belirtildiğinden, fazlalık ve yazım hatalarını azaltmak için modüler rotalar oluşturmak yararlıdır. Rotalar hakkında daha fazla bilgi için, bakınız: [Router() dökümantasyonu](/{{ page.lang }}/4x/api.html#router).

Burada `app.route()` kullanılarak tanımlanan zincirleme rota işleyicilerine bir örnek verilmiştir.

```js
app.route('/book')
  .get((req, res) => {
    res.send('Rastgele bir kitap getir')
  })
  .post((req, res) => {
    res.send('Bir kitap ekle')
  })
  .put((req, res) => {
    res.send('Kitabı güncelle')
  })
```

<h2 id="express-router">express.Router</h2>

Modüler, monte edilebilir rota işleyicileri oluşturmak için `express.Router` sınıfını kullanın. Bir `Router` sınıfı örneği tam bir ara katman yazılım ve yönlendirme sistemidir; bu nedenle, sıklıkla "mini-uygulama" olarak bilinir.

Aşağıdaki örnek, bir yönlendiriciyi modül olarak oluşturur, içine bir ara katman yazılımı fonksiyonu yükler, bazı rotaları tanımlar ve yönlendirici modülünü ana uygulamadaki bir yola bağlar.

Uygulama dizininde aşağıdaki içeriğe sahip `birds.js` adlı bir yönlendirici dosyası oluşturun:

```js
const express = require('express')
const router = express.Router()

// bu yönlendiriciye özel ara katman yazılım
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// anasayfa rotası tanımla
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
```

Daha sonra, yönlendirici modülünü uygulamada yükle:

```js
const birds = require('./birds')

// ...

app.use('/birds', birds)
```

Uygulama artık `/birds` ve `/birds/about` isteklerini işleyebileceği gibi, rotaya özgü `timeLog` ara katman yazılımı fonksiyonunu da çağırabilecektir.
</div>
