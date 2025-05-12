---
layout: page
title: Express Təhlükəsizlik Yeniləmələri
menu: advanced
lang: az
description: Review the latest security updates and patches for Express.js, including
  detailed vulnerability lists for different versions to help maintain a secure application.
---
<div id="page-doc" markdown="1">

# Təhlükəsizlik yeniləmələri

<div class="doc-box doc-notice" markdown="1">
Node.js zəiflikləri birbaşa Express-ə təsir edir. Buna görə də [Node.js zəifliklərini izləyin](https://nodejs.org
/en/blog/vulnerability/) və ən son sabit Node.js versiyasından istifadə etdiyinizə əmin olun.
</div>

Aşağıdakı siyahıda göstərilən versiya yeniləmələrində düzəldilmiş Express zəiflikləri sadalanır.

**QEYD**: Əgər Express-də təhlükəsizlik zəifliyi aşkar etdiyinizi düşünürsünüzsə, zəhmət olmasa
[Təhlükəsizlik Siyasəti və Prosedurlarına](https://github.com/expressjs/express/blob/master/Security.md) baxın.

## 4.x

  * 4.15.2
    * `qs` asılılığı [zəifliyi](https://snyk.io/vuln/npm:qs:20170213) aradan qaldırmaq üçün yenilənib, lakin bu məsələ Express-ə təsir etmir. 4.15.2-yə yenilənmək yaxşı təcrübədir, lakin zəifliyi aradan qaldırmaq üçün zəruri deyil.
  * 4.11.1
    * `express.static`, `res.sendfile` və `res.sendFile` funksiyalarında kök yolunun açıqlanması zəifliyi düzəldildi
  * 4.10.7
    * `express.static` funksiyasında açıq yönləndirmə zəifliyi düzəldildi ([məsləhət](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 4.8.8
    * `express.static` funksiyasında kataloq səviyyəsində keçid zəiflikləri düzəldildi ([məsləhət](http://npmjs.com/advisories/32) , [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)).
  * 4.8.4
    * Node.js 0.10 bəzi hallarda `fd` sızıntısına səbəb ola bilər ki, bu da `express.static` və `res.sendfile` funksiyalarına təsir edir. Zərərli sorğular `fd` sızıntısına və nəticədə `EMFILE` xətası və serverin cavab verməməsinə səbəb ola bilər.
  * 4.8.0
    * Sorğu sətrində çox yüksək indeksli seyrək massivlər prosesin yaddaşının tükənməsinə və serverin çökməsinə səbəb ola bilər.
    * Çox dərin yerləşdirilmiş sorğu sətir obyektləri prosesin bloklanmasına və serverin müvəqqəti cavabsız qalmasına səbəb ola bilər.

## 3.x

  <div class="doc-box doc-warn" markdown="1">
  **Express 3.x DƏSTƏK MÜDDƏTİNİN SONUNA ÇATMIŞDIR VƏ ARTIQ SAXLANILMIR**

  3.x versiyasında məlum və məlum olmayan təhlükəsizlik və performans problemləri son yeniləmədən (1 Avqust 2015) bəri həll olunmayıb. Son Express versiyasından istifadə etmək şiddətlə tövsiyə olunur.

  Əgər 3.x-dən daha yeni versiyaya keçmək mümkün deyilsə, zəhmət olmasa [Kommersiya Dəstək Seçimlərinə](/{{ page.lang }}/support#commercial-support-options) baxın.
  </div>

  * 3.19.1
    * `express.static`, `res.sendfile` və `res.sendFile` funksiyalarında kök yolunun açıqlanması zəifliyi düzəldildi
  * 3.19.0
    * `express.static` funksiyasında açıq yönləndirmə zəifliyi düzəldildi ([məsləhət](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 3.16.10
    * `express.static` funksiyasında kataloq səviyyəsində keçid zəiflikləri düzəldildi.
  * 3.16.6
    * Node.js 0.10 bəzi hallarda `fd` sızıntısına səbəb ola bilər ki, bu da `express.static` və `res.sendfile` funksiyalarına təsir edir. Zərərli sorğular `fd` sızıntısına və nəticədə `EMFILE` xətası və serverin cavab verməməsinə səbəb ola bilər.
  * 3.16.0
    * Sorğu sətrində çox yüksək indeksli seyrək massivlər prosesin yaddaşının tükənməsinə və serverin çökməsinə səbəb ola bilər.
    * Çox dərin yerləşdirilmiş sorğu sətir obyektləri prosesin bloklanmasına və serverin müvəqqəti cavabsız qalmasına səbəb ola bilər.
  * 3.3.0
    * Dəstəklənməyən metod dəyişdirmə cəhdində 404 cavabı cross-site scripting hücumlarına qarşı həssas idi.
</div>
