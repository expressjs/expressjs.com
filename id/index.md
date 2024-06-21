---
layout: home
title: Express - Kerangka kerja aplikasi web Node.js
menu: home
lang: id
---
<section id="home-content">
  {% include header/header-{{ page.lang }}.html %}
  <div id="overlay"></div>
  <div id="homepage-leftpane" class="pane">
    <section id="description">
        <div class="express"><a href="/">Express</a><a href="{{ page.lang }}/changelog/4x.html#{{ site.data.express.current_version }}" id="express-version">{{ site.data.express.current_version }}</a></div>
        <span class="description">Kerangka web yang cepat, tidak beropini, dan minimalis untuk <a href='https://nodejs.org/en/'>Node.js</a></span>
    </section>
    <div id="install-command">$ npm install express --save</div>
  </div>
  <div id="homepage-rightpane" class="pane">
    <iframe src="https://www.youtube.com/embed/HxGt_3F0ULg" frameborder="0" allowfullscreen></iframe>
  </div>
</section>

<section id="announcements">
  {% include announcement/announcement-{{ page.lang }}.md %}
</section>

<section id="intro">

  <div id="boxes" class="clearfix">
    <div id="web-applications">
      <h3>Aplikasi Web</h3> Express adalah kerangka kerja aplikasi web Node.js yang minimalis dan fleksibel serta menyediakan serangkaian fitur tangguh untuk pembuatan aplikasi web dan seluler.
    </div>

    <div id="apis">
      <h3>APIs</h3> dengan segudang metode untuk utilitas HTTP dan middleware yang sesuai dengan keinginan Anda, maka membuat API yang kuat dapat dilakukan dengan cepat dan mudah.
    </div>

    <div id="performance">
      <h3>Kinerja</h3> Express menyediakan selapis tipis fitur dasar aplikasi web, tanpa mengaburkan fitur Node.js yang Anda kenal dan sukai.
    </div>

    <div id="middleware">
      <h3>Middleware</h3>
      Express memiliki kerangka perutean yang ringan dan fleksibel dengan fitur inti yang minimalis
      hal ini dimaksudkan dapat ditingkatkan melalui penggunaan modul dari Express <a href="{{ page.lang }}/resources/middleware.html">middleware</a>.
    </div>

  </div>

</section>
