---
layout: home
title: Express - เว็บแอปพลิเคชันเฟรมเวอร์คสำหรับ Node.js
menu: home
lang: th
---
<section id="home-content">
  {% include header/header-{{ page.lang }}.html %}
  <div id="overlay"></div>
  <div id="homepage-leftpane" class="pane">
    <section id="description">
        <div class="express"><a href="/">Express</a><a href="{{ page.lang }}/changelog/4x.html#{{ site.data.express.current_version }}" id="express-version">{{ site.data.express.current_version }}</a></div>
        <span class="description">เว็บแอปพลิเคชันเฟรมเวอร์คที่ รวดเร็ว คล่องตัว และ เรียบง่าย สำหรับ <a href='https://nodejs.org/en/'>Node.js</a></span>
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
      <h3>เว็บแอปพลิเคชัน</h3> Express เป็น Node.js เว็บแอปพลิเคชันเฟรมเวอร์คที่เรียบง่ายและคล่องตัว สำหรับเว็บและแอปพลิเคชันบนมือถือ ที่มีชุดของคุณสมบัติที่สมบูรณ์
    </div>

    <div id="apis">
      <h3>APIs</h3> ด้วยเครืองมือสำหรับ HTTP method ที่นับไม่ถ่วน และ ที่จัดการมิดเดิลแวร์ ให้คุณ ทำให้คุณสามารถสร้าง API ที่สมบูรณ์ได้อย่างง่ายและรวดเร็ว
    </div>

    <div id="performance">
      <h3>ประสิทธิภาพ</h3> Express มีชั้นบางๆ ของคุณลักษณะพื้นฐานของเว็บแอปพลิเคชัน โดยไม่ปิดบังคุณสมบัติของ Node.js ที่คุณคุ้นเคยและชื่นชอบ
    </div>

    <div id="frameworks">
      <h3>เฟรมเวอร์ค</h3> <a href="{{ page.lang }}/resources/frameworks.html">เฟรมเวอร์คยอดนิยมมากยาย</a> ที่มีพื้นฐานจาก Express.
    </div>
  </div>

</section>
