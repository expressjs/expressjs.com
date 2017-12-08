---
layout: home
title: Express - Node.js Web Uygulama Çatısı
menu: home
lang: tr
---
<section id="home-content">
  {% include header/header-{{ page.lang }}.html %}
  <div id="overlay"></div>
  <div id="homepage-leftpane" class="pane">
    <section id="description">
        <div class="express"><a href="/">Express</a><a href="{{ page.lang }}/changelog/4x.html#{{ site.data.express.current_version }}" id="express-version">{{ site.data.express.current_version }}</a></div>
        <span class="description"><a href='https://nodejs.org/en/'>Node.js</a> için hızlı, kolay, sade web çatısı</span>
    </section>
    <div id="install-command">$ npm install express --save</div>
  </div>
  <div id="homepage-rightpane" class="pane">
    <iframe src="https://www.youtube.com/embed/HxGt_3F0ULg" frameborder="0" allowfullscreen></iframe>
  </div>
</section>

<section id="intro">

  <div id="boxes" class="clearfix">
    <div id="web-applications">
      <h3>Web Uygulamaları</h3>
	  Express, Web ve Mobil uygulamalar için sağlam özellikler sağlayan sade ve esnek bir Node.js web uygulama çatısıdır.
    </div>

    <div id="apis">
      <h3>API'ler</h3> 
	  Sınırsız HTTP yardımcı araç ve katmanlar sayesinde sağlam bir API oluşturmak hızlı ve kolaydır.
    </div>

    <div id="performance">
      <h3>Performans</h3> Express, bildiğiniz ve sevdiğiniz Node.js özelliklerini gizlemeden ince bir temel web uygulaması özellikleri katmanı sağlar.	  
    </div>

    <div id="frameworks">
      <h3>Çatılar</h3> Birçok <a href="resources/frameworks.html">popüler çatı</a> Express tabanlıdır.
    </div>
  </div>

</section>

<section id="announcements">
  {% include announcement/announcement-{{ page.lang }}.md %}
</section>
