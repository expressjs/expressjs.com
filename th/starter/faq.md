---
layout: page
title: Express FAQ
menu: starter
lang: th
---

# คำถามที่พบบ่อย

## โครงสร้างแอปพลิเคชันของผมควรจะเป็นอย่าไร?

ไม่มีการกำหนดนิยามของคำตอบสำหรับคำถามนี้ คำตอบขึ้นอยู่กับว่าขนาดของแอปพลิเคชันเท่าใด
และทีมงานที่ร่วมทำงานด้วยมีจำนวนขนาดไหน เพื่อที่จะทำงานคล่องตัวที่สุด Express ไม่มีข้อบังคับของโครงสร้าง

เส้นทางและตรรกะเฉพาะแอปพลิเคชัน (application-specific) อื่นๆ สามารถทำงานในหลากหลายไฟล์ที่คุณต้องการ
ในหลายๆ ไดเรกเทอรีที่คุณต้องการ สามารถดูตัวอย่างด้านล่างนี้เพื่อเป็นแนวทาง:

* [Route listings](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
* [Route map](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

ยังมีแหล่งตัวอย่างอื่นๆ สำหรับ Express ซึ่งทำให้ง่ายโดยใช้รูปแบบ:

* [Resourceful routing](https://github.com/expressjs/express-resource)

## จะกำหมดโมเกลอย่างไร?

Express ไม่มีความคิดของฐานข้อมูล แนวคิดนี้อยู่ในโมดูลอื่นของ Node ที่จะทำให้คุณติดต่อกับหลากหลายฐานข้อมูล

ดู [LoopBack](http://loopback.io) for an Express-based framework that is centered around models.

## จะพิสูจน์ตัวตนของผู้ใช้งานได้อย่างไร?

การพิสูจน์ตัวตนของผู้ใช้งานเป็นอีกส่วนหนี่งที่ Express ไม่ได้เข้าร่วม คุณอาจใช้รูปแบบพิสูจน์ตัวตนของผู้ใช้งานที่คุณต้องการ
สำหรับตัวอย่างที่ง่ายที่สุดคือรูปแบบ username / password, ดู [ตัวอย่างนี้](https://github.com/expressjs/express/tree/master/examples/auth)


## template engines ไหนบ้างที่ Express รองรับ?

Express รองรับทุก template engine ที่สอดคล้องกับ `(path, locals, callback)`
เพื่อสร้างอินเทอร์เฟสสำหรับ template engine และการเคช ดูที่ [consolidate.js](https://github.com/visionmedia/consolidate.js)
โครงการที่รองรับ ที่ไม่อยู่ในรายการ template engines อาจยังคงรองรับโดย Express

สำหรับข้อมูลเพิ่มเติม, ดูที่ [การใช้ template engine กับ Express](/{{page.lang}}/guide/using-template-engines.html)

## จะจัดการกับการตอบสนอง 404 ได้อย่างไร?

ใน Express, การตอบสนอง 404 ไม่ใช้ผลของความผิดพลาด ดังนั้น 
มิดเดิลแวร์ที่จัดการกับความผิดพลาด (error-handler) จะไม่ตรวจจับมัน พฤติกรรมเป็นแบบนี้
เพราะว่าการตอบสนอง 404 เป็นการบ่งชี้ว่ามีสิ่งผิดปรกติเกิดขึ้นอาจจะต้อมีสิ่งเพิ่มเติมมาจัดการ
ในงานอื่นๆ Express จะดำเนินการฟังก์ชันมิดเดิลแวร์และเส้นทางทั้งหมด และพบว่าไม่มีอะไรที่จะตอบสนอง
สิ่งที่คุณต้องทำคือเพิ่มฟังก์ชันมิดเดิลแวร์ที่ด้านล่างสุดเพื่อจัดการกับการตอบสนอง 404:

```js
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})
```

## จะตั้งค่าจัดการความผิดพลาดได้อย่างไร?

กำหนดมิดเดิลแวร์จัดการความผิดพลาด (error-handler) เช่นเดียวกับมิดเดิลแวร์อื่น ยกเว้นอาร์กิวเมนต์ 4 ตัวแทนที่จะเป็น 3 ตัว
ดังนี้ `(err, req, res, next)`

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

สำหรับข้อมูลเพิ่มเติม, ดูที่ [Error handling](/{{ page.lang }}/guide/error-handling.html).

## จะสร้าง HTML ธรรมดาได้อย่างไร?

คุณไม่ต้อง! ไม่จำเป็นต้องสร้าง HTML ด้วยฟังก์ชัน `res.render()` 
ถ้าคุณมีไฟล์เฉพาะ ใช้ฟังก์ชัน `res.sendFile()` ถ้าคุณต้องการบริการหลายสินทรัพย์จากไดเรกเทอรี ใช้ฟังก์ชันมิดเดิลแวร์ `express.static()`
