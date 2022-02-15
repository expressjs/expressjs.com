---
layout: page
title: Express ile şablon motorları kullanmak
menu: guide
lang: tr
redirect_from: "/guide/using-template-engines.html"
---
# Express ile şablon motorları kullanmak

_Şablon motoru_, uygulamanızda statik şablon dosyaları kullanmanızı sağlar. Çalışma zamanında, şablon motoru bir şablon dosyasındaki değişkenleri alıp gerçek değerleyler değiştirir, ve şablonu bir HTML dosyasına dönüştürüp istemciye gönderir. Bu yaklaşım bir HTML sayfasını tasarlamayı kolaylaştırır.

Express ile çalışan bazı popüler şablon motorları: [Pug](https://pugjs.org/api/getting-started.html), [Mustache](https://www.npmjs.com/package/mustache), ve [EJS](https://www.npmjs.com/package/ejs). [Express uygulama üreteci (generator)](/{{ page.lang }}/starter/generator.html) varsayılan olarak [Jade](https://www.npmjs.com/package/jade) kullanıyor, ancak aynı zamanda diğerlerini de destekler.

Express ile kullanabileceğiniz şablon motorları listesi için bakınız [Şablon Motorları (Express wiki)](https://github.com/expressjs/express/wiki#template-engines).
Ayrıca bakınız: [JavaScript Şablonlama Motorlarını Karşılaştırma:: Jade, Mustache, Dust ve Daha fazla](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/).

<div class="doc-box doc-notice" markdown="1">
**Not**: Jade, [Pug](https://www.npmjs.com/package/pug) olarak değiştirildi. Uygulamanızda Jade kullanmaya devam edebilirsiniz, ve problem olmadan çalışacaktır. Ancak şablon motorunun en son güncellemelerini almak istiyorsanız, uygulamanızda Jade'i Pug ile değiştirmelisiniz.
</div>

Şablon dosyalarını işlemek için, aşağıdaki [uygulama ayarları özelliklerini](/{{ page.lang }}/4x/api.html#app.set) ayarlayın, üretici (generator) tarafından yaratılan varsayılan uygulamada `app.js` dosyasında ayarlayın:

* `views`, şablon dosyalarının bulunduğu dizindir. Örnek: `app.set('views', './views')`.
Bu varsayılan olarak uygulamanın kök dizindeki `views` dizinine denk gelir.

* `view engine`, kullanılacak şablon motorudur. Örnek olarak, Pug şablon motorunu kullanmak için: `app.set('view engine', 'pug')`.

Daha sonra ise, ilgili şablon motorunun npm paketini yükleyin; örneğin Pug yüklemek için:

```console
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
Jade ve Pug gibi Express-uyumlu şablon motorları, şablon kodunu işlemek için `res.render()` tarafından çağrılan `__express(filePath, options, callback)` isimli bir fonksiyon dışa aktarır.

Bazı şablon motorları bu anlayışı takip etmez. [Consolidate.js](https://www.npmjs.org/package/consolidate) kütüphanesi bu anlayışı bütün popüler Node.js şablon motorlarını eşleyerek (mapping) takip eder, ve dolayısıyla Express içinde sorunsuz çalışır.
</div>

Görünüm motoru ayarlandıktan sonra, uygulamanızda motoru tanımlamanıza veya şablon motoru modülünü yüklemenize gerek yok; Aşağıda gösterildiği gibi (yukarıdaki örnek için) Express, modülü kendi içinde yükler.

```js
app.set('view engine', 'pug')
```

Aşağıdaki içerikle, `views` dizininde `index.pug` adlı bir Pug şablon dosyası yarat:

```pug
html
  head
    title= title
  body
    h1= message
```

Ardından, `index.pug` dosyasını işlemek için bir rota yaratın. `view engine` özelliği ayarlanmadıysa, `view` dosyasının uzantısını belirtmelisiniz. Aksi takdirde belirtmenize gerek yok.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

Ana sayfaya bir istek yaptığınızda, `index.pug` dosyası HTML olarak gösterilecek.

Not: Görünüm motoru önbelleği şablonun çıktısını önbelleğine almaz, sadece şablonun temelini alır. Önbellek açık olsa bile, görünüm her istekle beraber yeniden işlenir.

Şablon motorlarının Express'te nasıl çalıştıkları ile ilgili daha fazla bilgi için bakınız: ["Express için şablon motorları geliştirme"](/{{ page.lang }}/advanced/developing-template-engines.html).
