---
layout: page
title: Интеграция Express с базами данных
menu: guide
lang: ru
---

# Интеграция с базами данных

Для того чтобы добавить функциональную возможность подключения базы данных к приложению Express, необходимо всего лишь загрузить в ваше приложение драйвер Node.js для соответствующей базы данных. В настоящем документе кратко описан способ добавления и использования в приложении Express некоторых наиболее популярных моделей Node.js для систем баз данных:

* [Cassandra](#cassandra)
* [CouchDB](#couchdb)
* [LevelDB](#leveldb)
* [MySQL](#mysql)
* [MongoDB](#mongo)
* [Neo4j](#neo4j)
* [PostgreSQL](#postgres)
* [Redis](#redis)
* [SQLite](#sqlite)
* [ElasticSearch](#elasticsearch)

<div class="doc-box doc-notice" markdown="1">
Это неполный список доступных драйверов баз данных.  С другими вариантами можно ознакомиться на сайте [npm](https://www.npmjs.com/).
</div>

<a name="cassandra"></a>

## Cassandra

**Модуль**: [cassandra-driver](https://github.com/datastax/nodejs-driver) -
**Установка**

```sh
$ npm install cassandra-driver
```

**Пример**

```js
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['localhost']});

client.execute('select key from system.local', function(err, result) {
  if (err) throw err;
  console.log(result.rows[0]);
});
```

<a name="couchdb"></a>

## CouchDB

**Модуль**: [nano](https://github.com/dscape/nano) -
**Установка**

```sh
$ npm install nano
```

**Пример**

```js
var nano = require('nano')('http://localhost:5984');
nano.db.create('books');
var books = nano.db.use('books');

//Insert a book document in the books database
books.insert({name: 'The Art of war'}, null, function(err, body) {
  if (!err){
    console.log(body);
  }
});

//Get a list of all books
books.list(function(err, body){
  console.log(body.rows);
});
```

<a name="leveldb"></a>

## LevelDB

**Модуль**: [levelup](https://github.com/rvagg/node-levelup) -
**Установка**

```sh
$ npm install level levelup leveldown
```

**Пример**

```js
var levelup = require('levelup');
var db = levelup('./mydb');

db.put('name', 'LevelUP', function (err) {

  if (err) return console.log('Ooops!', err);
  db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err);
    console.log('name=' + value);
  });

});
```

<a name="mysql"></a>

## MySQL

**Модуль**: [mysql](https://github.com/felixge/node-mysql/) -
**Установка**

```sh
$ npm install mysql
```

**Пример**

```js
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 's3kreee7'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();
```

<a name="mongo"></a>

## MongoDB

**Модуль**: [mongodb](https://github.com/mongodb/node-mongodb-native) -
**Установка**

```sh
$ npm install mongodb
```

**Пример**

```js
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
  if (err) {
    throw err;
  }
  db.collection('mammals').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
});
```

Если вам необходим драйвер объектной модели для MongoDB, его можно найти на странице [Mongoose](https://github.com/LearnBoost/mongoose).

<a name="neo4j"></a>

## Neo4j

**Модуль**: [apoc](https://github.com/hacksparrow/apoc) -
**Установка**

```sh
$ npm install apoc
```

**Пример**

```js
var apoc = require('apoc');

apoc.query('match (n) return n').exec().then(
  function (response) {
    console.log(response);
  },
  function (fail) {
    console.log(fail);
  }
);
```

<a name="postgres"></a>

## PostgreSQL

**Модуль**: [pg-promise](https://github.com/vitaly-t/pg-promise) -
**Установка**

```sh
$ npm install pg-promise
```

**Пример**

```js
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://username:password@host:port/database");

db.one("SELECT $1 AS value", 123)
    .then(function (data) {
        console.log("DATA:", data.value);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
```

<a name="redis"></a>

## Redis

**Модуль**: [redis](https://github.com/mranney/node_redis) -
**Установка**

```sh
$ npm install redis
```

**Пример**

```js
var client = require('redis').createClient();

client.on('error', function (err) {
  console.log('Error ' + err);
});

client.set('string key', 'string val', redis.print);
client.hset('hash key', 'hashtest 1', 'some value', redis.print);
client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print);

client.hkeys('hash key', function (err, replies) {

  console.log(replies.length + ' replies:');
  replies.forEach(function (reply, i) {
    console.log('    ' + i + ': ' + reply);
  });

  client.quit();

});
```

<a name="sqlite"></a>

## SQLite

**Модуль**: [sqlite3](https://github.com/mapbox/node-sqlite3) -
**Установка**

```sh
$ npm install sqlite3
```

**Пример**

```js
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {

  db.run('CREATE TABLE lorem (info TEXT)');
  var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

  for (var i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i);
  }

  stmt.finalize();

  db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
    console.log(row.id + ': ' + row.info);
  });
});

db.close();
```

<a name="elasticsearch"></a>

## ElasticSearch

**Модуль**: [elasticsearch](https://github.com/elastic/elasticsearch-js) -
**Установка**

```sh
$ npm install elasticsearch
```

**Пример**

```js
var elasticsearch = require('elasticsearch');
var client = elasticsearch.Client({
  host: 'localhost:9200'
});

client.search({
  index: 'books',
  type: 'book',
  body: {
    query: {
      multi_match: {
        query: 'express js',
        fields: ['title', 'description']
      }
    }
  }
}).then(function(response) {
  var hits = response.hits.hits;
}, function(error) {
  console.trace(error.message);
});
```
