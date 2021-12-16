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
* [Oracle](#oracle)
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

```console
$ npm install cassandra-driver
```

**Exemple**

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

**Module** : [nano](https://github.com/dscape/nano)
**Installation**

```console
$ npm install nano
```

**Exemple**

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

**Module** : [levelup](https://github.com/rvagg/node-levelup)
**Installation**

```console
$ npm install level levelup leveldown
```

**Exemple**

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

**Module** : [mysql](https://github.com/felixge/node-mysql/)
**Installation**

```console
$ npm install mysql
```

**Exemple**

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

**Module** : [mongodb](https://github.com/mongodb/node-mongodb-native)
**Installation**

```console
$ npm install mongodb
```

**Exemple**

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

Si vous voulez un pilote de modèle d'objet pour MongoDB, recherchez [Mongoose](https://github.com/LearnBoost/mongoose).

<a name="neo4j"></a>

## Neo4j

**Module** : [apoc](https://github.com/hacksparrow/apoc)
**Installation**

```console
$ npm install apoc
```

**Exemple**

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

<a name="oracle"></a>

## Oracle

**Module**: [oracledb](https://github.com/oracle/node-oracledb)

### Installation

 Remarque: [Voir les conditions préalables à l'installation](https://github.com/oracle/node-oracledb#-installation).

```console
$ npm install oracledb
```

### Exemple

```js
const oracledb = require('oracledb')
const config = {
  user: '<your db user>',
  password: '<your db password>',
  connectString: 'localhost:1521/orcl'
}

async function getEmployee (empId) {
  let conn

  try {
    conn = await oracledb.getConnection(config)

    const result = await conn.execute(
      'select * from employees where employee_id = :id',
      [empId]
    )

    console.log(result.rows[0])
  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}

getEmployee(101)
```

<a name="postgres"></a>

## PostgreSQL

**Module** : [pg-promise](https://github.com/vitaly-t/pg-promise)
**Installation**

```console
$ npm install pg-promise
```

**Exemple**

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

**Module** : [redis](https://github.com/mranney/node_redis)
**Installation**

```console
$ npm install redis
```

**Exemple**

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

**Module** : [sqlite3](https://github.com/mapbox/node-sqlite3)
**Installation**

```console
$ npm install sqlite3
```

**Exemple**

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

**Module** : [elasticsearch](https://github.com/elastic/elasticsearch-js)
**Installation**

```console
$ npm install elasticsearch
```

**Exemple**

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
