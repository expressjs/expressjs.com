---
layout: page
title: Express 資料庫整合
menu: guide
lang: zh-tw
---

# 資料庫整合

如果要在 Express 應用程式中新增連接資料庫的功能，只需在您的應用程式中載入資料庫的適當 Node.js 驅動程式即可。本文件簡要說明如何在您的 Express 應用程式中新增和使用一些最常用的 Node.js 資料庫系統模組。

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
這些資料庫驅動程式只是眾多可用驅動程式中的一部分。如需其他選項，請在 [npm](https://www.npmjs.com/) 網站中搜尋。
</div>

<a name="cassandra"></a>

## Cassandra

**模組**：[cassandra-driver](https://github.com/datastax/nodejs-driver)
**安裝**

```console
$ npm install cassandra-driver
```

**範例**

<pre>
<code class="language-javascript" translate="no">
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['localhost']});

client.execute('select key from system.local', function(err, result) {
  if (err) throw err;
  console.log(result.rows[0]);
});
</code>
</pre>

<a name="couchdb"></a>

## CouchDB

**模組**：[nano](https://github.com/dscape/nano)
**安裝**

```console
$ npm install nano
```

**範例**

<pre>
<code class="language-javascript" translate="no">
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
}
</code>
</pre>

<a name="leveldb"></a>

## LevelDB

**模組**：[levelup](https://github.com/rvagg/node-levelup)
**安裝**

```console
$ npm install level levelup leveldown
```

**範例**

<pre>
<code class="language-javascript" translate="no">
var levelup = require('levelup');
var db = levelup('./mydb');

db.put('name', 'LevelUP', function (err) {

  if (err) return console.log('Ooops!', err);
  db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err);
    console.log('name=' + value)
  });

});
</code>
</pre>

<a name="mysql"></a>

## MySQL

**模組**：[mysql](https://github.com/felixge/node-mysql/)
**安裝**

```console
$ npm install mysql
```

**範例**

<pre>
<code class="language-javascript" translate="no">
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
</code>
</pre>

<a name="mongo"></a>

## MongoDB

**模組**：[mongodb](https://github.com/mongodb/node-mongodb-native)
**安裝**

```console
$ npm install mongodb
```

**範例**

<pre>
<code class="language-javascript" translate="no">
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
</code>
</pre>

如果您需要 MongoDB 物件模型驅動程式，請查看 [Mongoose](https://github.com/LearnBoost/mongoose)。

<a name="neo4j"></a>

## Neo4j

**模組**：[apoc](https://github.com/hacksparrow/apoc)
**安裝**

```console
$ npm install apoc
```

**範例**

<pre>
<code class="language-javascript" translate="no">
var apoc = require('apoc');

apoc.query('match (n) return n').exec().then(
  function (response) {
    console.log(response);
  },
  function (fail) {
    console.log(fail);
  }
);
</code>
</pre>

<a name="postgres"></a>

## PostgreSQL

**模組**：[pg-promise](https://github.com/vitaly-t/pg-promise)
**安裝**

```console
$ npm install pg-promise
```

**範例**

<pre>
<code class="language-javascript" translate="no">
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://username:password@host:port/database");

db.one("SELECT $1 AS value", 123)
    .then(function (data) {
        console.log("DATA:", data.value);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
</code>
</pre>

<a name="redis"></a>

## Redis

**模組**：[redis](https://github.com/mranney/node_redis)
**安裝**

```console
$ npm install redis
```

**範例**

<pre>
<code class="language-javascript" translate="no">
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
</code>
</pre>

<a name="sqlite"></a>

## SQLite

**模組**：[sqlite3](https://github.com/mapbox/node-sqlite3)
**安裝**

```console
$ npm install sqlite3
```

**範例**

<pre>
<code class="language-javascript" translate="no">
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
</code>
</pre>

<a name="elasticsearch"></a>

## ElasticSearch

**模組**：[elasticsearch](https://github.com/elastic/elasticsearch-js)
**安裝**

```console
$ npm install elasticsearch
```

**範例**

<pre>
<code class="language-javascript" translate="no">
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
</code>
</pre>
