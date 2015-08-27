---
layout: page
title: Integração com banco de dados
menu: guide
lang: pt_BR
---

# Integração com bancos de dados Database
Adicionar capacidade de conectividade com banco de dados para aplicações Express é apenas uma questão de carregar um driver Node.js apropriado para o banco de dados em seu aplicativo. Este documento explica resumidamente como adicionar e usar alguns dos módulos mais populares do Node para sistemas de banco de dados em seu aplicativo Express:

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
Estes adaptadores para banco de dados, estão entre os muitos que estão disponíveis.  Para outras opções,
 faça uma busca no site do [npm](https://www.npmjs.com/).
</div>

<a name="cassandra"></a>

## Cassandra

**Módulo**: [cassandra-driver](https://github.com/datastax/nodejs-driver)  
**Instalação**

~~~sh
$ npm install cassandra-driver
~~~

**Exemplo**

~~~js
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['localhost']});

client.execute('select key from system.local', function(err, result) {
  if (err) throw err;
  console.log(result.rows[0]);
});
~~~

<a name="couchdb"></a>

## CouchDB

**Módulo**: [nano](https://github.com/dscape/nano)  
**Instalação**

~~~sh
$ npm install nano
~~~

**Exemplo**

~~~js
var nano = require('nano')('http://localhost:5984');
nano.db.create('books');
var books = nano.db.use('books');

//Insere um documento book no banco de dados books
books.insert({name: 'The Art of war'}, null, function(err, body) {
  if (!err){
    console.log(body);
  }
});

//Obtêm a lista de todos os livros
books.list(function(err, body){
  console.log(body.rows);
}
~~~

<a name="leveldb"></a>

## LevelDB

**Módulo**: [levelup](https://github.com/rvagg/node-levelup)  
**Instalação**

~~~sh
$ npm install level levelup leveldown
~~~

**Examplo**

~~~js
var levelup = require('levelup');
var db = levelup('./mydb');

db.put('name', 'LevelUP', function (err) {

  if (err) return console.log('Ooops!', err);
  db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err);
    console.log('name=' + value)
  });

});
~~~

<a name="mysql"></a>

## MySQL

**Módulo**: [mysql](https://github.com/felixge/node-mysql/)  
**Instalação**

~~~sh
$ npm install mysql
~~~

**Examplo**

~~~js
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
~~~

<a name="mongo"></a>

## MongoDB

**Módulo**: [mongoskin](https://github.com/kissjs/node-mongoskin)  
**Instalação**

~~~sh
$ npm install mongoskin
~~~

**Examplo**

~~~js
var db = require('mongoskin').db('localhost:27017/animals');

db.collection('mamals').find().toArray(function(err, result) {
  if (err) throw err;
  console.log(result);
});
~~~
Se você deseja um adaptador de modelo orientado a objetos, verifique [[Mongoose](https://github.com/LearnBoost/mongoose).

<a name="neo4j"></a>

## Neo4j

**Módulo**: [apoc](https://github.com/hacksparrow/apoc)  
**Instalação**

~~~sh
$ npm install apoc
~~~

**Exemplo**

~~~js
var apoc = require('apoc');

apoc.query('match (n) return n').exec().then(
  function (response) {
    console.log(response);
  },
  function (fail) {
    console.log(fail);
  }
);
~~~

<a name="postgres"></a>

## PostgreSQL

**Módulo**: [pg](https://github.com/brianc/node-postgres)  
**Instalação**

~~~sh
$ npm install pg
~~~

**Exemplo**

~~~js
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
~~~

<a name="redis"></a>

## Redis

**Módulo**: [redis](https://github.com/mranney/node_redis)  
**Instalação**

~~~sh
$ npm install redis
~~~

**Exemplo**

~~~js
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
~~~

<a name="sqlite"></a>

## SQLite

**Módulo**: [sqlite3](https://github.com/mapbox/node-sqlite3)  
**Instalação**

~~~sh
$ npm install sqlite3
~~~

**Exemplo**

~~~js
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
~~~

<a name="elasticsearch"></a>

## ElasticSearch

**Módulo**: [elasticsearch](https://github.com/elastic/elasticsearch-js)  
**Instalação**

~~~sh
$ npm install elasticsearch
~~~

**Exemplo**

~~~js
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
~~~
