---
layout: page
title: Proxy arkasında Express
menu: guide
lang: tr
redirect_from: "/guide/behind-proxies.html"
---
# Proxy arkasında Express

Bir proxy'nin arkasında bir Express uygulaması koşulduğunda, ([app.set()](/{{ page.lang }}/4x/api.html#app.set) kullanarak) `trust proxy` uygulama değişkenine aşağıdaki tabloda listelenen değerlerden birini verin.

<div class="doc-box doc-info" markdown="1">
`trust proxy` uygulama değişkeni ayarlanmadığında uygulama başarısız olmayacağına rağmen, `trust proxy` ayarlanmadıkça istemci IP adresini proxy IP adresiyle hatalı olarak kaydedecektir.
</div>

<table class="doctable" border="1" markdown="1">
  <thead><tr><th>Tip</th><th>Değer</th></tr></thead>
  <tbody>
    <tr>
      <td>Boolean</td>
<td markdown="1">
`true` olduğunda, istemci IP adresi `X-Forwarded-*` başlığında en soldaki giriş olarak değerlendirilir.

`false` olduğunda, uygulama direkt olarak Internete dönük olacak ve istemci IP adresi ise `req.connection.remoteAddress` alanından alınmış olacak. Bu varsayılan ayardır.
</td>
    </tr>
    <tr>
      <td>IP adresleri</td>
<td markdown="1">
Güvenilecek bir IP adresi, alt ağ, veya bir IP adresleri ve alt ağlar dizisi. Aşağıdaki liste önceden yapılandırılmış alt ağlar isimlerini gösteriyor:

* loopback - `127.0.0.1/8`, `::1/128`
* linklocal - `169.254.0.0/16`, `fe80::/10`
* uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

IP adreslerini aşağıdaki yöntemlerden herhangi biriyle ayarlayabilirsiniz:

```js
app.set('trust proxy', 'loopback') // tek bir alt ağ tanımla
app.set('trust proxy', 'loopback, 123.123.123.123') // bir adres ve bir alt ağ tanımla
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // birden çok alt ağları CVS olarak tanımla
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // bir dizi olarak birden çok alt ağ tanımla
```

Belirtildiğinde, IP adresleri veya alt ağlar adres belirleme işleminin dışında bırakılır ve uygulama sunucusuna en yakın güvenilmeyen IP adresi, istemcinin IP adresi olarak belirlenir.

</td>
    </tr>
    <tr>
      <td>Sayı</td>
<td markdown="1">
İstemci olarak ön proxy sunucusundan `n`'ci atlayışına güvenin.
</td>
    </tr>
    <tr>
      <td>Fonksiyon</td>
<td markdown="1">
Özel güven implementasyonu. Bunu sadece ne yaptığınızı biliyorsanız kullanın.


```js
app.set('trust proxy', (ip) => {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true // güvenilen IP'ler
  else return false
})
```
</td>
    </tr>
  </tbody>
</table>

`trust proxy` ayarını etkinleştirmenin etkileri aşağıdaki gibidir:

<ul>
  <li markdown="1">[req.hostname](/{{ page.lang }}/api.html#req.hostname) alanının değeri, istemci veya proxy tarafından ayarlanabilen `X-Forwarded-Host` başlığındaki değerler kümesinden alınacak.
  </li>
  <li markdown="1">`X-Forwarded-Proto` değeri; `https`, `http` veya geçersiz bir ad olduğunu uygulamaya belirtmesi için ters proxy tarafından ayarlanabilir. Bu değer, [req.protocol](/{{ page.lang }}/api.html#req.protocol) tarafından yansıtılır.
  </li>
  <li markdown="1">[req.ip](/{{ page.lang }}/api.html#req.ip) ve [req.ips](/{{ page.lang }}/api.html#req.ips) alanlarının değerleri, `X-Forwarded-For` başlığındaki adres listesi ile doldurulur.
  </li>
</ul>

`trust proxy` ayarı [proxy-addr](https://www.npmjs.com/package/proxy-addr) paketi kullanılarak uygulanmıştır. Daha fazla bilgi için, dökümantasyonuna bakınız.
