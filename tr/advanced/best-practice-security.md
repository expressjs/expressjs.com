---
layout: page
title: Canlı Ortamda Express için En İyi Güvenlik Pratikleri
menu: advanced
lang: tr
---

# En İyi Canlı Ortam Pratikleri: Güvenlik

## Genel Bakış

_"canlı ortam"_ terimi, bir uygulama veya API'nin genel olarak son kullanıcıları veya tüketicileri için hazır olduğu yazılım yaşam döngüsündeki aşamayı ifade eder. Buna kıyasla, _"geliştirme"_ aşamasında aktif olarak kod yazıyor ve test ediyorsunuz, ve uygulama dış erişime açık değildir. Bunlara karşılık gelen sistem ortamları sırasıyla _canlı ortam (production)_ ve _geliştirme (development)_ ortamları olarak bilinir.

Canlı ve geliştirme ortamları genel olarak farklı şekilde kurulurlar ve çok farklı gereksinimleri vardır. Geliştirme ortamında iyi olan bir şey canlı ortamda kabul edilebilir olmayabilir. Örneğin, geliştirme ortamında hata ayıklama için ayrıntılı hataların loglanmasını isteyebilirsiniz, ancak aynı şey canlı ortamda güvenlik açığı oluşturabilir. Ve geliştirme ortamında ölçeklenebilirlik, güvenilirlik ve performans hakkında endişe etmenize gerek yok iken, bu konular canlı ortamda kritikleşir.

{% include note.html content="Express'te bir güvenlik açığı keşfettiğinizi düşünüyorsanız, lütfen bakınız
[Güvenlik Politikaları ve Prosedürleri](https://github.com/expressjs/express/blob/master/Security.md).
" %}

Canlı ortamdaki Express uygulamaları için en iyi güvenlik pratikleri:

- [Express'in kullanımdan kaldırılmış veya bakımı yapılmayan versiyonlarını kullanmayın](#expressin-kullanımdan-kaldırılmış-veya-bakımı-yapılmayan-versiyonlarını-kullanmayın)
- [TLS kullanın](#tls-kullanın)
- [Helmet kullanın](#helmet-kullanın)
- [Çerezleri güvenli kullanın](#çerezleri-güvenli-kullanın)
- [Otorizasyona karşı yapılan brute-force saldırılarını engelleyin](#otorizasyona-karşı-yapılan-brute-force-saldırılarını-engelleyin)
- [Bağımlılıklarınızın güvende olduğundan emin olun](#bağımlılıklarınızın-güvende-olduğundan-emin-olun)
- [Bilinen diğer güvenlik açıklarından kaçının](#bilinen-diğer-güvenlik-açıklarından-kaçının)
- [Ek hususlar](#ek-hususlar)

## Express'in kullanımdan kaldırılmış veya bakımı yapılmayan versiyonlarını kullanmayın

Express 2.x ve 3.x versiyonlarının bakımı artık yapılmıyor. Bu versiyonlardaki güvenlik ve performans sorunları çözülmeyecek. Bunları kullanmayın! 4. versiyona henüz geçmediyseniz, [taşıma rehberini](/{{ page.lang }}/guide/migrating-4.html) takip edin.

Ayrıca [güvenlik güncellemeleri sayfası](/{{ page.lang }}/advanced/security-updates.html)'nda listelenen bakımı yapılmayan herhangi bir Express versiyonunu kullanmadığınızdan emin olun. Eğer kullanıyorsanız, stabil versiyonlardan birine geçin, tercihen en son versiyona.

## TLS kullanın

Uygulamanız hassas verilerle ilgileniyor veya bunları iletiyorsa, veri ve bağlantıyı güvende tutmak için [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) kullanın. Bu teknoloji, verileri istemciden sunucuya gönderilmeden önce şifreler ve böylelikle bazı yaygın (ve kolay) saldırıları önler. Ajax ve POST istekleri gözle görülür şekilde açık olmayabilir ve tarayıcılarda "gizli" görünebilir, ancak bunların ağ trafiği [packet sniffing](https://en.wikipedia.org/wiki/Packet_analyzer) ve [man-in-the-middle saldırılarına](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) karşı korumasızdır.

Secure Socket Layer (SSL) şifrelemesine aşina olabilirsiniz. [TLS, SSL'nin bir sonraki geçişidir](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx). Bir başka deyişle, daha önce SSL kullanıyorsanız TLS'e yükseltmeyi düşünün. Genel olarak, TLS kullanmak için Nginx öneririz. Nginx'te (ve diğer sunucularda) TLS'yi yapılandırmak için, bakınız [Önerilen Sunucu Yapılandırmaları (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

Ayrıca, [Internet Security Research Group (ISRG)](https://www.abetterinternet.org/) tarafından sunulan ücretsiz, otomatik, ve açık bir sertifika yetkilisi (CA - Certificate Authority) olan [Let's Encrypt](https://letsencrypt.org/about/) ücretsiz bir TLS sertifikası alabileceğiniz araçtır.

## Helmet kullanın

[Helmet](https://www.npmjs.com/package/helmet), HTTP başlıklarını doğru ayarlayarak uygulamanızı bazı iyi bilinen web güvenlik açıklarına karşı koruyabilir.

Helmet aslında güvenlikle ilgili HTTP yanıt başlıklarını ayarlayan, daha küçük ara yazılım (middleware) fonksiyonlarından oluşan bir koleksiyondur:

* [csp](https://github.com/helmetjs/csp) siteler arası (cross-site) komut dosyası çalıştırma saldırılarını ve diğer siteler arası enjeksiyonları önlemeye yardımcı olmak için `Content-Security-Policy` başlığını ayarlar.
* [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) `X-Powered-By` başlığını kaldırır.
* [hsts](https://github.com/helmetjs/hsts) sunucuya güvenli (SSL/TLS üzerinden HTTP) bağlantıları zorunlu kılan `Strict-Transport-Security` başlığını ayarlar.
* [ieNoOpen](https://github.com/helmetjs/ienoopen) IE8+ için `X-Download-Options` başlığını ayarlar.
* [noCache](https://github.com/helmetjs/nocache) istemci-taraflı önbelleğe alma (caching) işlevini devre dışı bırakmak için `Cache-Control` ve Pragma başlıklarını ayarlar.
* [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) tarayıcıların bildirilen içerik türünden farklı, bir sunucu yanıtına MIME-sniffing uygulanmasını önlemek için `X-Content-Type-Options` başlığını ayarlar.
* [frameguard](https://github.com/helmetjs/frameguard) [clickjacking](https://www.owasp.org/index.php/Clickjacking) koruması sağlamak için `X-Frame-Options` başlığını ayarlar.
* [xssFilter](https://github.com/helmetjs/x-xss-protection) siteler arası komut çalıştırma (Cross-site scripting (XSS)) filtresini en yeni tarayıcılarda etkinleştirmek için `X-XSS-Protection` başlığını ayarlar.

Helmet'ı diğer herhangi bir modül gibi kurun:

```console
$ npm install --save helmet
```

Daha sonra kodunuzda kullanmak için:

```js
// ...

const helmet = require('helmet')
app.use(helmet())

// ...
```

### En azından, X-Powered-By başlığını devre dışı bırakın

Eğer Helmet kullanmak istemiyorsanız, o zaman en azından `X-Powered-By` başlığını devre dışı bırakın. Saldırganlar, Express çalıştıran uygulamaları tespit etmek ve ardından özel olarak hedeflenen saldırılar başlatmak için bu başlığı (varsayılan olarak etkindir) kullanabilir.

Bu yüzden, `app.disable()` metodunu kullanarak bu başlığı devre dışı bırakmak en iyi pratiktir:

```js
app.disable('x-powered-by')
```

Eğer `helmet.js` kullanıyorsanız, bunu sizin için halleder.

{% include note.html content="X-Powered-By başlığının devre dışı bırakılması, tecrübeli bir saldırganın bir uygulamanın Express çalıştırdığını belirlemesini önlemez. Bu, sıradan bir istismarı engelleyebilir, ancak bir uygulamanın Express çalıştırdığını belirlemenin başka yolları da var. "%}

## Çerezleri güvenli kullanın

Çerezlerin uygulamanızı istismarlara açmamasını sağlamak için, varsayılan oturum çerez adını kullanmayın ve çerez güvenlik seçeneklerini uygun şekilde ayarlayın.

İki ana ara yazılım çerez oturum modülü var:

* [express-session](https://www.npmjs.com/package/express-session), Express 3.x versiyonlarında yer alan `express-session` yerleşik (built-in) ara yazılımının yerini alır.
* [cookie-session](https://www.npmjs.com/package/cookie-session), Express 3.x versiyonlarında yer alan `express.cookieSession` yerleşik ara yazılımının yerini alır.

Bu iki modülün arasındaki ana fark, çerez oturum verisinin nasıl kaydedildiğidir. [express-session](https://www.npmjs.com/package/express-session) ara yazılımı oturum verisini sunucuda tutar; sadece oturum ID'sini çerezde tutar, oturum verisini değil. Varsayılan olarak, iç-bellek depolamayı kullanır ve canlı ortam için tasarlanmamıştır. Canlı ortamda, ölçeklenebilir bir oturum depolamayı kurmanız gerekecektir; [uyumlu oturum depolarını](https://github.com/expressjs/session#compatible-session-stores)'nı görmek için bakınız.

Buna kıyasla, [cookie-session](https://www.npmjs.com/package/cookie-session) ara yazılımı çerez-destekli depolamayı uygular: sadece bir oturum anahtarı yerine,  tüm oturumu çerezde serileştirir. Bunu yalnızca oturum verileri nispeten küçük olduğunda ve ilkel (primitive) değerler (objeler yerine) olarak kolayca kodlandığında kullanın. Tarayıcıların çerez başına en az 4096 baytı desteklemesine rağmen, limiti aşmamanızdan emin olmak için domain başına 4093 baytı aşmayın. Ayrıca, çerez verilerinin istemciye açık olacağını unutmayın, bu yüzden verilerin güvenli veya gizli olması için herhangi bir neden var ise, express-session daha iyi bir seçenek olabilir.

### Varsayılan oturum çerez adını kullanmayın

Varsayılan oturum çerez adı uygulamanızı saldırılara açık bırakabilir. Ortaya çıkan güvenlik sorunu `X-Powered-By` sorununa benzer: potansiyel bir saldırgan, sunucunun parmak izini almak ve saldırıları buna göre hedeflemek için kullanabilir.

Bu problemi önlemek için, jenerik çerez adlarını kullanın; örnek olarak [express-session](https://www.npmjs.com/package/express-session) ara yazılımının kullanımı:

```js
const session = require('express-session')
app.set('trust proxy', 1)
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))
```

### Çerez güvenlik seçeneklerini ayarlayın

Güvenliği artırmak için aşağıdaki çerez seçeneklerini ayarlayın:

* `secure` - Tarayıcının çerezi yalnızca HTTPS üzerinden göndermesini sağlar.
* `httpOnly` - Çerezin JavaScript istemcisinden değil, yalnızca HTTP(S) üzerinden gönderilmesini sağlar ve böylelikle siteler arası komut dosyası çalıştırma saldırılarına karşı korumaya yardımcı olur.
* `domain` - çerezin alan adını belirtir; URL'nin istendiği sunucunun alan adıyla karşılaştırmak için kullanın. Eğer eşleşiyorsa, ardından yol (path) alanını kontrol edin.
* `path` - çerezin yolunu belirtir; bunu istek yoluyla karşılaştırmak için kullanın. Eğer bu ve alan adı eşleşiyorsa, istekte çerezi gönderebilirsiniz.
* `expires` - kalıcı çerezler için son kullanma tarihini ayarlamak için kullanın.

[cookie-session](https://www.npmjs.com/package/cookie-session) ara yazılımını kullanan bir örnek:

```js
const session = require('cookie-session')
const express = require('express')
const app = express()

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 saat
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  }
}))
```

## Otorizasyona karşı yapılan brute-force saldırılarını engelleyin

Özel verileri daha güvenli hale getirmek için giriş uç noktalarının (endpoint) korunduğundan emin olun.

Basit ve güçlü bir teknik olarak iki ölçüm kullanarak yetkilendirme girişimlerini engellemektir:
1. Birincisi, aynı kullanıcı adı ve IP adresi ile art arda başarısız denemelerin sayısı.
2. İkincisi, uzun bir süre boyunca bir IP adresinden başarısız denemelerin sayısıdır. Örneğin, bir IP adresi bir günde 100 başarısız deneme yaparsa engelleyin.

[rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible) paketi bu tekniği kolay ve hızlıca uygulamak için gerekli araçları sağlar. [brute-force korumasına bir örneği bu dökümantasyonda bulabilirsiniz](https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#login-endpoint-protection).

## Bağımlılıklarınızın güvende olduğundan emin olun

Uygulamanızın bağımlılıklarını yönetmek için npm kullanmak güçlü ve kullanışlıdır. Ancak kullandığınız paketler, uygulamanızı da etkileyebilecek kritik güvenlik açıkları içerebilir.  Uygulamanızın güvenliği, bağımlılıklarınızdaki "en zayıf halka" kadar güçlüdür.

npm@6'dan beri npm otomatik olarak her yükleme isteğini inceler. Ayrıca 'npm audit' komutunu kullanarak bağımlılık ağacınızı analiz edebilirsiniz.

```console
$ npm audit
```

Daha fazla güvenli kalmak istiyorsanız, [Snyk](https://snyk.io/) aracını gözden geçirebilirsiniz.

Bağımlılıklarınızdaki bilinen tüm güvenlik açıkları için [Synk'in açık kaynak güvenlik açığı veritabanı](https://snyk.io/vuln/)'na karşı uygulamanızı kontrol eden bir [komut satırı aracı](https://www.npmjs.com/package/snyk) ve de [Github integrasyonu](https://snyk.io/docs/github) sunar.

```console
$ npm install -g snyk
$ cd your-app
```

Uygulamanızı güvenlik açıklarına karşı test etmek için bu komutu kullanın:

```console
$ snyk test
```

Bulunan güvenlik açıklarını düzeltmek için güncelleme veya yama uygulama sürecinde size yol gösteren bir sihirbazı açmak için bu komutu kullanın:

```console
$ snyk wizard
```

## Bilinen diğer güvenlik açıklarından kaçının

Express'i veya uygulamanızın kullandığı diğer modülleri etkileyen [Snyk](https://snyk.io/vuln/) ve [Node Security Project](https://npmjs.com/advisories) tavsiyelerini takipte kalın. Genel olarak, bu veritabanları Node güvenliği hakkında bilgi ve araçlar için mükemmel kaynaklardır.

Son olarak, Express uygulamaları - diğer web uygulamaları gibi - çeşitli web tabanlı saldırılara karşı savunmasız olabilir. [Web güvenlik açıkları](https://www.owasp.org/index.php/Top_10-2017_Top_10) hakkında kendinizi bilgilendirin ve onlardan kaçınmak için önlemler alın.

## Ek hususlar

İşte mükemmel [Node.js Güvenlik Kontrol Listesi](https://blog.risingstack.com/node-js-security-checklist/)'nden bazı ek öneriler. Bu önerilerle ilgili tüm ayrıntılar için o blog gönderisine bakın:

* Siteler arası istek sahteciliği'ne (CSRF) karşı korumak için [csurf](https://www.npmjs.com/package/csurf) ara yazılımını kullanın.
* Siteler arası komut dosyası oluşturma (XSS) ve komut enjeksiyon saldırılarına karşı korumak için kullanıcı girişini her zaman filtreleyin ve sanitize edin.
* Parametreli sorgular veya hazırlanmış ifadeler kullanarak SQL enjeksiyon saldırılarına karşı savunma yapın.
* Uygulamanızdaki SQL enjeksion güvenlik açıklarını tespit etmek için açık kaynak olan [sqlmap](http://sqlmap.org/) aracını kullanın.
* Sertifikanızın geçerliliğini kontrol etmenin yanında SSL şifrelerinin ve anahtarlarının konfigürasyonunu test etmek için [nmap](https://nmap.org/) ve [sslyze](https://github.com/nabla-c0d3/sslyze) araçlarını kullanın.
* Use [safe-regex](https://www.npmjs.com/package/safe-regex) to ensure your regular expressions are not susceptible to [Regular expression Denial of Service (ReDoS)](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS) attacks.

* RegExp kodlarınızın [Regular expression Denial of Service (ReDoS)](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS) saldırılarına açık olmadığını sağlamak için [safe-regex](https://www.npmjs.com/package/safe-regex) paketini kullanın.
