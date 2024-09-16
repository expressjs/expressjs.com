---
layout: home
title: Express - framework de aplicativo da web Node.js
menu: home
lang: pt-br
---
<section id="home-content">
  {% include header/header-{{ page.lang }}.html %}
  <div id="overlay"></div>
  <div id="homepage-leftpane" class="pane">
    <section id="description">
         <div class="express"><a href="/">Express</a><a href="{{ page.lang }}/changelog/4x.html#{{ site.data.express.current_version }}" id="express-version">{{ site.data.express.current_version }}</a></div>
        <span class="description">Framework web rápido, flexível e minimalista para <a href='https://nodejs.org/en/'>Node.js</a></span>
    </section>
    <div id="install-command">$ npm install express --save</div>
  </div>
</section>
<section id="announcements">
  {% include announcement/announcement-pt-br.md %}
</section>

<section id="intro">

  <div id="boxes" class="clearfix">
      <div id="web-applications">
          <h3>Aplicativos da Web</h3> O Express é um framework para aplicativo da web do Node.js mínimo e flexível que fornece um conjunto robusto de recursos para aplicativos web e móveis.
      </div>

      <div id="apis">
          <h3>APIs</h3> Com uma infinidade de métodos utilitários HTTP e middleware à sua disposição, criar uma API robusta é rápido e fácil.
      </div>

      <div id="performance">
          <h3>Desempenho</h3> O Express fornece uma camada fina de recursos fundamentais para aplicativos da web, sem obscurecer os recursos do Node.js que você conhece e ama.
      </div>

    <div id="middleware">
      <h3>Middleware</h3>
      Express é uma estrutura de roteamento leve e flexível com recursos básicos e mínimos que devem ser 
      aumentados por meio do uso do módulo Express <a href="{{ page.lang }}/resources/middleware.html">middleware</a>.
    </div>
  </div>

</section>
