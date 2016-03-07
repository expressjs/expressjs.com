---
layout: page
title: Промежуточные обработчики в Express
menu: resources
lang: ru
---

# Промежуточные обработчики сторонних поставщиков ПО

Ниже представлен список некоторых модулей Express:

  - [body-parser](https://github.com/expressjs/body-parser): ранее `express.bodyParser`, `json` и `urlencoded`.
  См. также:
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression):  ранее `express.compress`
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus): Модули промежуточных обработчиков Connect/Express для оптимального предоставления файлов изображений. Преобразует изображения в `.webp` или  `.jxr`, если это возможно.
  - [connect-timeout](https://github.com/expressjs/timeout): ранее `express.timeout`
  - [cookie-parser](https://github.com/expressjs/cookie-parser): ранее `express.cookieParser`
  - [cookie-session](https://github.com/expressjs/cookie-session): ранее `express.cookieSession`
  - [csurf](https://github.com/expressjs/csurf): ранее `express.csrf`
  - [errorhandler](https://github.com/expressjs/errorhandler): ранее `express.errorHandler`
  - [express-debug](https://github.com/devoidfury/express-debug): простой инструмент разработки, предназначенный для добавления вкладки с информацией о переменных шаблона (локалях), текущем сеансе, полезных данных запроса и т.д. для приложения.
  - [express-partial-response](https://github.com/nemtsov/express-partial-response): Модуль промежуточного обработчика Express для отфильтровывания частей ответов JSON на основе строки запроса `fields`; используется Частичный ответ API Google.
  - [express-session](https://github.com/expressjs/session): ранее `express.session`
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn): Модуль промежуточного обработчика Express для использования CDN для статических ресурсов, с поддержкой нескольких хостов (например: cdn1.host.com, cdn2.host.com).
  - [express-slash](https://github.com/ericf/express-slash): Модуль промежуточного обработчика Express для тех пользователей, которые строго следят за символами наклонной косой черты в конце строки.
  - [express-stormpath](https://github.com/stormpath/stormpath-express): Модуль промежуточного обработчика Express для хранения имен пользователей, аутентификации, авторизации, SSO и защиты данных.
  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize): Модуль промежуточного обработчика для перенаправления запросов HTTP, содержащих символы в верхнем регистре, в традиционный формат нижнего регистра.
  - [helmet](https://github.com/helmetjs/helmet): Модуль для обеспечения защиты приложений путем настройки различных заголовков HTTP.
  - [join-io](https://github.com/coderaiser/join-io "join-io"): Модуль для оперативного объединения файлов с целью сокращения числа запросов.
  - [method-override](https://github.com/expressjs/method-override): ранее `express.methodOverride`
  - [morgan](https://github.com/expressjs/morgan): ранее `logger`
  - [passport](https://github.com/jaredhanson/passport): Модуль промежуточного обработчика Express для аутентификации.
  - [response-time](https://github.com/expressjs/response-time): ранее `express.responseTime`
  - [serve-favicon](https://github.com/expressjs/serve-favicon): ранее `express.favicon`
  - [serve-index](https://github.com/expressjs/serve-index): ранее `express.directory`
  - [serve-static](https://github.com/expressjs/serve-static): Модуль для предоставления статического содержимого.
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry): URL с идентификационными метками или заголовки кеширования для статических ресурсов, включая поддержку одного или нескольких внешних доменов.
  - [vhost](https://github.com/expressjs/vhost): ранее `express.vhost`
  - [view-helpers](https://github.com/madhums/node-view-helpers): Модуль промежуточного обработчика Express, предоставляющий общие вспомогательные методы для представлений.
  - [sriracha-admin](https://github.com/hdngr/siracha): Модуль промежуточного обработчика Express, в динамическом режиме генерирующий административный сайт для Mongoose.

Некоторые модули промежуточных обработчиков, ранее входившие в состав Connect, больше не поддерживаются командой разработчиков Connect/Express. Эти модули заменяются альтернативными, либо вместо них предоставляются усовершенствованные модули. Воспользуйтесь одним из перечисленных ниже альтернативных вариантов:

  - express.cookieParser
    - [cookies](https://github.com/jed/cookies) и [keygrip](https://github.com/jed/keygrip)
  - express.limit
    - [raw-body](https://github.com/stream-utils/raw-body)
  - express.multipart
    - [connect-busboy](https://github.com/mscdex/connect-busboy)
    - [multer](https://github.com/expressjs/multer)
    - [connect-multiparty](https://github.com/superjoe30/connect-multiparty)
  - express.query
    - [qs](https://github.com/visionmedia/node-querystring)
  - express.staticCache
    - [st](https://github.com/isaacs/st)
    - [connect-static](https://github.com/andrewrk/connect-static)

Другие модули промежуточных обработчиков описаны в разделах:

 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
