---
layout: page
title: Express basic routing
menu: starter
lang: th
---

# เส้นทางเบื้องต้น

_เส้นทาง (Routing)_ เป็นการกำหนดการอ้างอิงว่าแอปพลิเคชันจะตอบสนองต่อคำร้องขอของเครื่องลูกข่ายที่มายังปลายทาง (endpoint) โดยเฉพาะได้อย่างไร ซึ่งเป็น URI (หรือ path) และวิธีการร้องขอ HTTP (GET, POST, และ อื่นๆ)

แต่ละเส้นทางสามารถมีได้มากกว่าหนึ่งฟังชันส์จัดการ (handler function) ซึ่งสามารถดำเนินการเมื่อเส้นทางถูกจับคู่

การกำหนดเส้นทางใช้โครงสร้างดังนี้:

```js
app.METHOD(PATH, HANDLER)
```

เมื่อ:

- `app` เป็นอินสแตนซ์ของ `express`.
- `METHOD` เป็น [HTTP request method](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), เป็นตัวพิมพ์เล็ก.
- `PATH` เป็นเส้นทางบนเซิร์ฟเวอร์.
- `HANDLER` เป็นฟังชันส์ที่กระทำเมื่อเส้นทางถูกจับคู่.

<div class="doc-box doc-notice" markdown="1">
การสอนนี้จะสมมติว่าอินสแตนซ์ของ `express` ชื่อว่า `app` จะถูกสร้างขึ้นเมื่อรันเซิร์ฟเวอร์ ถ้าไม่คุ้นเคยกับการสร้าง app และโครงสร้างของมัน ดูเพิ่มเติมได้ที่ [ตัวอย่าง Hello world](/{{ page.lang }}/starter/hello-world.html)
</div>

ตัวอย่างดังต่อไปนี้จะแสดงให้เห็นการกำหนดเส้นทางอย่างง่าย

ตอบสนองด้วยข้อความ `Hello World!` บนเพจหลัก:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

ตอบสนองต่อการร้องขอด้วยวิธี POST บนเส้นทาง root (`/`) บนเพจหลักของแอปพลิเคชัน:

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

ตอบสนองต่อการร้องขอด้วยวิธี PUT บนเส้นทาง `/user`:

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

ตอบสนองต่อการร้องขอด้วยวิธี DELETE บนเส้นทาง `/user`:

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```
สำหรับข้อมูลเพิ่มเติมเกี่ยวกับการกำหนดเส้นทาง ดูได้ที่ [คำแนะนำการกำหนดเส้นทาง](/{{ page.lang }}/guide/routing.html)
