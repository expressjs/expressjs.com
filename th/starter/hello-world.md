---
layout: page
title: Express "Hello World" example
menu: starter
lang: th
---

# ตัวอย่าง Hello world

<div class="doc-box doc-info" markdown="1">
โค้ดด้านล่างนี้เป็นแอปพลิเคชัน Express จำเป็นแบบง่ายที่สุดที่คุณสามารถสร้างขึ้นได้ โดยเป็นไฟล์ app ไฟล์เดียว &mdash; _ไม่ใช้_ โค้ดที่ได้จาก [Express generator](/{{ page.lang }}/starter/generator.html) ที่สร้างโครงสร้างเริ่มต้นสำหรับแอปพลิเคชันตัวเต็มที่มีไฟล์ JavaScript มากมาย และไดเรทอรีย่อยสำหรับวัตถุประสงค์ต่างๆ
</div>

<script src="https://embed.runkit.com" data-element-id="hello-example" data-mode="endpoint" async defer></script>
<div id="hello-example"><pre><code class="language-js">
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
</code></pre></div>

app นี้จะเริ่มต้นเซิร์ฟเวอร์และเฝ้าตรวจสอบ (listen) การเชื่อมต่อที่พอร์ต 3000 โดยที่ app จะตอบสนองด้วงคำว่า "Hello World!" สำหรับการร้องขอ
มายัง root URL (`/`) หรือ _route_ แต่สำหรับ path อื่นๆ app จะตอบสนองด้วย **404 Not Found**

ตัวอย่างด้านบนเป็นเซิร์ฟเวอร์ที่ทำงานได้จริง โดยกดไปที่ลิงค์ URL ที่แสดงอยู่จะเปิดหน้าเว็บใหม่และตอบสนองคำร้องขอของคุณอย่างทันที และสิ่งที่คุณแก้ไขจะเปลี่ยนแปลงที่หน้าเว็บ เพียงกดไปที่ลิงค์อีกครั้ง ได้รับการสนับสนุนจาก [RunKit](https://runkit.com) ซึ่งให้การเชื่อมต่อ interactive JavaScript playground สำหรับสิ่งแวดล้อมที่สมบูรณ์ของ Node บนเว็บเบราว์เซอร์ คำสั่งด้านล้างสำหรับรัน app เดียวกันบนเครื่องของคุณ

<div class="doc-box doc-info" markdown="1">
RunKit เป็นบริการของบริษัทอื่นที่ไม่ใช้หน่วยงานของโครงการ Express
</div>

### รันบนเครื่องของคุณ

เริ่มต้นด้วยการสร้างไดเรกทอรีชื่อว่า `myapp` เปลี่ยนไปที่ไดเรกทอรีที่สร้างขึ้นแล้วใสคำสั่ง `npm init` แล้วติดตั้ง `express` และ dependency ต่างๆ ดัง[ขั้นตอนการติดตั้ง](/{{ page.lang }}/starter/installing.html)

ในไดเรกทอรี `myapp` สร้างไฟล์ `app.js` ขึ้นมาและคัดลอกโค้ดจากตัวอย่างข้างบนมากใส่ในไฟล์

<div class="doc-box doc-notice" markdown="1">
`req` (คำร้องขอ) และ `res` (คำตอบสนอง) เป็นอ็อบเจกต์เดียวกันที่จัดให้โดย Node ซึ่งคุณสมารถเรียกใช้ `req.pip()` `req.on('data', callback)` และอื่นๆ โดยไม่ต้องเรียกใช้ Express
</div>

รัน app ด้วยคำสั่งนี้:

```console
$ node app.js
```

แล้วโหลด `http://localhost:3000/` ในเว็บเบราว์เซอร์เพื่อดูผลลัพธ์
