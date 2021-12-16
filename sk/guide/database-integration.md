---
layout: page
title: Integrácia Express s databázou
menu: guide
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Integrácia s databázou

Pridanie schopnosti pripojenia Express aplikácie na databázu je len otázkou načítania správneho Node.js drivera. Tento dokument v stručnosti popisuje možnosti pridania a použitia niektorých z obľúbených Node.js modulov pre pripojenie sa vašej Express aplikácie na databázu:

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
Tieto databázové drivery predstavujú len časť z mnoha ďalších, ktoré sú dostupné. Nájdete ich na [npm](https://www.npmjs.com/) stránke.
</div>

<a name="cassandra"></a>

## Cassandra

**Modul**: [cassandra-driver](https://github.com/datastax/nodejs-driver)
**Inštalácia**

```console
$ npm install cassandra-driver
```

**Príklad**

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

**Modul**: [nano](https://github.com/dscape/nano)
**Inštalácia**

```console
$ npm install nano
```

**Príklad**

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

**Modul**: [levelup](https://github.com/rvagg/node-levelup)
**Inštalácia**

```console
$ npm install level levelup leveldown
```

**Príklad**

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

**Modul**: [mysql](https://github.com/felixge/node-mysql/)
**Inštalácia**

```console
$ npm install mysql
```

**Príklad**

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

**Modul**: [mongodb](https://github.com/mongodb/node-mongodb-native)
**Inštalácia**

```console
$ npm install mongodb
```

**Príklad**

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

If you want an object model driver for MongoDB, look at [Mongoose](https://github.com/LearnBoost/mongoose).

<a name="neo4j"></a>

## Neo4j

**Modul**: [apoc](https://github.com/hacksparrow/apoc)
**Inštalácia**

```console
$ npm install apoc
```

**Príklad**

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

**Modul**: [pg-promise](https://github.com/vitaly-t/pg-promise)
**Inštalácia**

```console
$ npm install pg-promise
```

**Príklad**

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

**Modul**: [redis](https://github.com/mranney/node_redis)
**Inštalácia**

```console
$ npm install redis
```

**Príklad**

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

**Modul**: [sqlite3](https://github.com/mapbox/node-sqlite3)
**Inštalácia**

```console
$ npm install sqlite3
```

**Príklad**

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

**Modul**: [elasticsearch](https://github.com/elastic/elasticsearch-js)
**Inštalácia**

```console
$ npm install elasticsearch
```

**Príklad**

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
