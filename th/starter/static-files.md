---
layout: page
title: Serving static files in Express
menu: starter
lang: th
---

# ให้บริการไฟล์คงที่ใน Express

เพื่อให้บริการไฟล์แบบคงที่อย่างเช่น ไฟล์รูปภาพ, ไฟล์ CSS, และไฟล์ JavaScript ใช้ฟังก์ชันของมิดเดิลแวร์ในตัว `express.static` ใน Express


โครงสร้างของฟังก์ชันคือ:

```js
express.static(root, [options])
```

อาร์กิวเมนต์ `root` เป็นตัวกำหนดไดเรกเทอรีฐานราก ซึ่งให้บริการสินทรัพย์คงที่ (static assets)
สำหรับข้อมูลเพิ่มเติมของอาร์กิวเมนต์ `options` ดูได้ที่ [express.static](/{{page.lang}}/4x/api.html#express.static)

ตัวอย่างเช่น การใช้งานโค้ดข้างล่างนี้เพื่อให้บริการ ไฟล์รูปภาพ, ไฟล์ CSS, และไฟล์ JavaScript ในไดเรกเทอรีชื่อว่า `public`:

```js
app.use(express.static('public'))
```
ตอนนี้คุณสามารถโหลดไฟล์ที่อยู่ในไดเรกเทอรี `public` ได้ดังนี้:

```plain-text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express จะมองหาไฟล์ที่เกี่ยวข้องกับไดเรกเทอรีคงที่ ดังนั้นชื่อของไดเรกเทอรีคงที่จะต้องไม่เป็นส่วนหนึ่งของ URL
</div>

เพื่อใช้สินทรัพย์คงที่หลายไดเรกเทอรี สามารถเรียกใช้มิดเดิลแวร์ฟังก์ชัน `express.static` ได้หลายครั้ง:

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express จะมองหาไฟล์ตามลำดับตามที่คุณตั้งค่าไดเรกเทอรี่คงที่ด้วยมิดเดิลแวร์ฟังก์ชัน `express.static`

<div class="doc-box doc-info" markdown="1">**หมายเหตุ:** สำหรับผลที่ดีที่สุด, [ใช้พร็อกซี่ย้อนกลับ](/{{page.lang}}/advanced/best-practice-performance.html#use-a-reverse-proxy) แคซเพื่อเพิ่มประสิทธิภาพของการใช้บริการสินทรัพย์ไฟล์คงที่
</div>

เพื่อสร้างคำนำหน้าเส้นทางเสมือน (ที่ซึ่งเส้นทางไม่สามารถมายังที่อยู่ของไฟล์จริงในระบบได้) สำหรับไฟล์ที่ให้บริการโดยฟังก์ชัน `express.static` [ระบุเส้นทาง](/{{ page.lang }}/4x/api.html#app.use) สำหรับไดเรทเทอรีคงที่ ดังนี้:

```js
app.use('/static', express.static('public'))
```

ตอนนี้คุณสามารถโหลดไฟล์ที่อยู่ในไดเรกเทอรี `public` จากคำนำหน้าเส้นทาง `/static`

```plain-text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

อย่างไรก็ตาม เส้นทางที่คุณให้ไว้ในฟังก์ชัน `express.static` มีความสัมพันธ์กับไดเรกเทอรีจากที่ซึ่งคุณการบวนการรัน `node` ของคุณ ถ้าคุณรัน app จากไดเรกเทอรีอื่น มันจะปลอดภัยกว่าถ้าใช้เส้นทางจริงของไดเรกเทอรีที่คุณต้องการบริการไฟล์คงที่:

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับฟังก์ชัน `serve-static` และตัวเลือก ดูได้ที่ [serve-static](/resources/middleware/serve-static.html)
