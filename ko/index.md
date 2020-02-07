---
layout: home
title: Express - Node.js 웹 애플리케이션 프레임워크
menu: home
lang: ko
---
<section id="home-content">
  {% include header/header-{{ page.lang }}.html %}
  <div id="overlay"></div>
  <div id="homepage-leftpane" class="pane">
    <section id="description">
        <div class="express"><a href="/">Express</a><a href="changelog/4x.html#{{ site.data.express.current_version }}" id="express-version">{{ site.data.express.current_version }}</a></div>
        <span class="description"><a href='http://nodejs.org'>Node.js</a>를 위한 빠르고 개방적인 간결한 웹 프레임워크</span>
    </section>
    <div id="install-command">$ npm install express --save</div>
  </div>
</section>
<!--
<section id="announcements">
  {% include announcement/announcement-{{ page.lang }}.md %}
</section>
-->

<section id="intro">

  <div id="boxes" class="clearfix">
    <div id="web-applications">
      <h3>웹 애플리케이션</h3> Express는 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하는 간결하고 유연한 Node.js 웹 애플리케이션 프레임워크입니다.
    </div>

    <div id="apis">
      <h3>API</h3> 자유롭게 활용할 수 있는 수많은 HTTP 유틸리티 메소드 및 미들웨어를 통해 쉽고 빠르게 강력한 API를 작성할 수 있습니다.
    </div>

    <div id="performance">
      <h3>성능</h3> Express는 기본적인 웹 애플리케이션 기능으로 구성된 얇은 계층을 제공하여, 여러분이 알고 있고 선호하는 Node.js 기능을 모호하게 만들지 않습니다.
    </div>

    <div id="frameworks">
      <h3>Frameworks</h3> <a href="resources/frameworks.html">많은 유명한 프레임워크들이</a> Express를 기반으로 하고 있습니다.
    </div>
  </div>

</section>
