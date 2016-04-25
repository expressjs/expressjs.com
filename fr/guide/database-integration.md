---
layout: page
title: Express database integration
menu: guide
lang: fr
---

# Intégration de bases de données

L'ajout de la fonctionnalité permettant de connecter des bases de données aux applications Express consiste simplement à charger un pilote Node.js approprié pour les bases de données de votre application. Ce document explique brièvement comment ajouter et utiliser dans votre application Express certains des modules Node.js les plus populaires pour les systèmes de base de données :

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
Ces pilotes de base de données ne sont qu'une partie de ceux disponibles.  Pour d'autres options,
consultez le site [npm](https://www.npmjs.com/).
</div>

<a name="cassandra"></a>

## Cassandra

**Module** : [cassandra-driver](https://github.com/datastax/nodejs-driver)
**Installation**

```sh
$ npm install cassandra-driver
```

**Exemple**

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

**Module** : [nano](https://github.com/dscape/nano)
**Installation**

```sh
$ npm install nano
```

**Exemple**

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

**Module** : [levelup](https://github.com/rvagg/node-levelup)
**Installation**

```sh
$ npm install level levelup leveldown
```

**Exemple**

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

**Module** : [mysql](https://github.com/felixge/node-mysql/)
**Installation**

```sh
$ npm install mysql
```

**Exemple**

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

**Module** : [mongodb](https://github.com/mongodb/node-mongodb-native)
**Installation**

```sh
$ npm install mongodb
```

**Exemple**

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

Si vous voulez un pilote de modèle d'objet pour MongoDB, recherchez [Mongoose](https://github.com/LearnBoost/mongoose).

<a name="neo4j"></a>

## Neo4j

**Module** : [apoc](https://github.com/hacksparrow/apoc)
**Installation**

```sh
$ npm install apoc
```

**Exemple**

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

**Module** : [pg-promise](https://github.com/vitaly-t/pg-promise)
**Installation**

```sh
$ npm install pg-promise
```

**Exemple**

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

**Module** : [redis](https://github.com/mranney/node_redis)
**Installation**

```sh
$ npm install redis
```

**Exemple**

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

**Module** : [sqlite3](https://github.com/mapbox/node-sqlite3)
**Installation**

```sh
$ npm install sqlite3
```

**Exemple**

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

**Module** : [elasticsearch](https://github.com/elastic/elasticsearch-js)
**Installation**

```sh
$ npm install elasticsearch
```

**Exemple**

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
