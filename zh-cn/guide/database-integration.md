---
layout: page
title: Express 数据库集成
menu: guide
lang: zh-cn
---

# 数据库集成

要将数据库连接到 Express 应用程序，只需在该应用程序中为数据库装入相应的 Node.js 驱动程序。本文档简要说明如何在 Express 应用程序中为数据库系统添加和使用某些最流行的 Node.js 模块：

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
这些数据库驱动程序是众多可用数据库驱动程序的一部分。要了解其他选项，请在 [npm](https://www.npmjs.com/) 站点上搜索。
</div>

<a name="cassandra"></a>

## Cassandra

**模块**：[cassandra-driver](https://github.com/datastax/nodejs-driver)
**安装**

<pre>
<code class="language-sh" translate="no">
$ npm install cassandra-driver
</code>
</pre>

**示例**

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

**模块**：[nano](https://github.com/dscape/nano)
**安装**

<pre>
<code class="language-sh" translate="no">
$ npm install nano
</code>
</pre>

**示例**

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

**模块**：[levelup](https://github.com/rvagg/node-levelup)
**安装**

<pre>
<code class="language-sh" translate="no">
$ npm install level levelup leveldown
</code>
</pre>

**示例**

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

**模块**：[mysql](https://github.com/felixge/node-mysql/)
**安装**

<pre>
<code class="language-sh" translate="no">
$ npm install mysql
</code>
</pre>

**示例**

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

**模块**：[mongodb](https://github.com/mongodb/node-mongodb-native)
**安装**

<pre>
<code class="language-sh" translate="no">
$ npm install mongodb
</code>
</pre>

**示例**

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

如果您需要 MongoDB 的对象模型驱动程序，请查看 [Mongoose](https://github.com/LearnBoost/mongoose)。

<a name="neo4j"></a>

## Neo4j

**模块**：[apoc](https://github.com/hacksparrow/apoc)
**安装**

<pre>
<code class="language-sh" translate="no">
$ npm install apoc
</code>
</pre>

**示例**

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

**模块**：[pg](https://github.com/brianc/node-postgres)
**安装**

<pre>
<code class="language-sh" translate="no">
$ npm install pg
</code>
</pre>

**示例**

<pre>
<code class="language-javascript" translate="no">
var pg = require('pg');
var conString = "postgres://username:password@localhost/database";

pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    done();
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
  });

});
</code>
</pre>

<a name="redis"></a>

## Redis

**模块**：[redis](https://github.com/mranney/node_redis)
**安装**

<pre>
<code class="language-sh" translate="no">
$ npm install redis
</code>
</pre>

**示例**

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

**模块**：[sqlite3](https://github.com/mapbox/node-sqlite3)
**安装**

<pre>
<code class="language-sh" translate="no">
$ npm install sqlite3
</code>
</pre>

**示例**

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

**模块**：[elasticsearch](https://github.com/elastic/elasticsearch-js)
**安装**

<pre>
<code class="language-sh" translate="no">
$ npm install elasticsearch
</code>
</pre>

**示例**

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
