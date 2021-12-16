---
layout: page
title: Express 데이터베이스 통합
menu: guide
lang: ko
---

# 데이터베이스 통합

데이터베이스를 Express 앱에 연결하는 기능을 추가하려면 앱에 포함된 데이터베이스를 위한 적절한 Node.js 드라이버를 로드해야 합니다. 이 문서에서는 Express 앱의 데이터베이스 시스템에 가장 널리 이용되고 있는 Node.js 모듈 중 다음과 같은 몇 개의 모듈을 추가 및 사용하는 방법을 설명합니다.

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
위의 데이터베이스 드라이버는 사용 가능한 여러 데이터베이스 드라이버 중 일부입니다.  다른 옵션을 확인하려면,
[npm](https://www.npmjs.com/) 사이트에서 검색하십시오.
</div>

<a name="cassandra"></a>

## Cassandra

**모듈**: [cassandra-driver](https://github.com/datastax/nodejs-driver)
**설치**

```console
$ npm install cassandra-driver
```

**예제**

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

**모듈**: [nano](https://github.com/dscape/nano)
**설치**

```console
$ npm install nano
```

**예제**

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
});
</code>
</pre>

<a name="leveldb"></a>

## LevelDB

**모듈**: [levelup](https://github.com/rvagg/node-levelup)
**설치**

```console
$ npm install level levelup leveldown
```

**예제**

<pre>
<code class="language-javascript" translate="no">
var levelup = require('levelup');
var db = levelup('./mydb');

db.put('name', 'LevelUP', function (err) {

  if (err) return console.log('Ooops!', err);
  db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err);
    console.log('name=' + value);
  });

});
</code>
</pre>

<a name="mysql"></a>

## MySQL

**모듈**: [mysql](https://github.com/felixge/node-mysql/)
**설치**

```console
$ npm install mysql
```

**예제**

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

**모듈**: [mongodb](https://github.com/mongodb/node-mongodb-native)
**설치**

```console
$ npm install mongodb
```

**예제**

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

MongoDB용 오브젝트 모델 드라이버가 필요한 경우에는 [Mongoose](https://github.com/LearnBoost/mongoose)를 확인하십시오.

<a name="neo4j"></a>

## Neo4j

**모듈**: [apoc](https://github.com/hacksparrow/apoc)
**설치**

```console
$ npm install apoc
```

**예제**

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

**모듈**: [pg-promise](https://github.com/vitaly-t/pg-promise)
**설치**

```console
$ npm install pg-promise
```

**예제**

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

**모듈**: [redis](https://github.com/mranney/node_redis)
**설치**

```console
$ npm install redis
```

**예제**

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

**모듈**: [sqlite3](https://github.com/mapbox/node-sqlite3)
**설치**

```console
$ npm install sqlite3
```

**예제**

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

**모듈**: [elasticsearch](https://github.com/elastic/elasticsearch-js)
**설치**

```console
$ npm install elasticsearch
```

**예제**

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
