---
layout: home
title: Express - Node.js web-dasturlar uchun freymvork
menu: home
lang: uz
---
<section id="home-content">
  {% include header/header-{{ page.lang }}.html %}
  <div id="overlay"></div>
  <div id="homepage-leftpane" class="pane">
    <section id="description">
        <div class="express"><a href="/">Express</a></div>
        <span class="description"> <a href='https://nodejs.org/en/'>Node.js</a> uchun tezkor, moslashuvchan, minimalistik web-freymvork.</span>
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
            <h3>Web dasturlar</h3> Express, Node.jsda web-dasturlarni yaratishda keng ko'lamda yordam beruvchi, minimalistik va moslashuvchan freymvorkdir.
        </div>

        <div id="apis">
            <h3>APIs</h3> Ko'plab HTTP metodlar, oraliq qayta ishlovchi(middleware)lar yordamida, ishonchli tezkor va oson API server yaratish mumkin bo'ladi.
        </div>

        <div id="performance">
            <h3>Ishlab chiqaruvchanlik</h3> Express Nodedagi siz bilgan va sevgan imkoniyatlarni cheklamagan holda web-dasturlardagi eng asosiy imkoniyatlar bilan ta'minlab beradi.
        </div>

 		<div id="frameworks">
          <h3>Freymvorklar</h3> Express asosida yaratilgan ko'plab <a href="resources/frameworks.html">mashxur freymvorklar</a> .
      </div>

    </div>
</section>

<section id="announcements">
	{% include announcement/announcement-{{ page.lang }}.md %}
</section>
