---
layout: page
title: Express veritabanı integrasyonu
menu: guide
lang: tr
redirect_from: "/guide/database-integration.html"
---
# Veritabanı integrasyonu

Veritabanlarını Express uygulamalarına bağlama kabiliyeti eklemek, uygulamanızdaki veritabanı için uygun bir Node.js sürücüsünü yükleyerek yapılabilecek kadar kolaydır. Bu döküman, Express uygulamanıza veritabanı sistemleri için bazı popüler Node.js modüllerinin nasıl eklendiğini ve kullanıldığını kısaca anlatır:

* [Cassandra](#cassandra)
* [Couchbase](#couchbase)
* [CouchDB](#couchdb)
* [LevelDB](#leveldb)
* [MySQL](#mysql)
* [MongoDB](#mongodb)
* [Neo4j](#neo4j)
* [Oracle](#oracle)
* [PostgreSQL](#postgresql)
* [Redis](#redis)
* [SQL Server](#sql-server)
* [SQLite](#sqlite)
* [Elasticsearch](#elasticsearch)

<div class="doc-box doc-notice" markdown="1">
Bu veritabanı sürücüleri mevcut olanların çoğunun arasındadır. Diğer seçenekler için, [npm](https://www.npmjs.com/) sitesinde arayınız.
</div>

## Cassandra

**Module**: [cassandra-driver](https://github.com/datastax/nodejs-driver)

### Yükleme

```sh
$ npm install cassandra-driver
```

### Örnek

```js
var cassandra = require('cassandra-driver')
var client = new cassandra.Client({ contactPoints: ['localhost'] })

client.execute('select key from system.local', function (err, result) {
  if (err) throw err
  console.log(result.rows[0])
})
```

## Couchbase

**Module**: [couchnode](https://github.com/couchbase/couchnode)

### Yükleme

```sh
$ npm install couchbase
```

### Örnek

```js
var couchbase = require('couchbase')
var bucket = (new couchbase.Cluster('http://localhost:8091')).openBucket('bucketName')

// bir dökümanı bir kovaya ekle
bucket.insert('document-key', { name: 'Matt', shoeSize: 13 }, function (err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})

// "shoe" alanının değeri 13 olan bütün dökümanları getir
var n1ql = 'SELECT d.* FROM `bucketName` d WHERE shoeSize = $1'
var query = N1qlQuery.fromString(n1ql)
bucket.query(query, [13], function (err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})
```

## CouchDB

**Module**: [nano](https://github.com/dscape/nano)

### Yükleme

```sh
$ npm install nano
```

### Örnek

```js
var nano = require('nano')('http://localhost:5984')
nano.db.create('books')
var books = nano.db.use('books')

// books veritabanına bir kitap ekle
books.insert({ name: 'The Art of war' }, null, function (err, body) {
  if (err) {
    console.log(err)
  } else {
    console.log(body)
  }
})

// bütün kitapların bir listesini getir
books.list(function (err, body) {
  if (err) {
    console.log(err)
  } else {
    console.log(body.rows)
  }
})
```

## LevelDB

**Module**: [levelup](https://github.com/rvagg/node-levelup)

### Yükleme

```sh
$ npm install level levelup leveldown
```

### Örnek

```js
var levelup = require('levelup')
var db = levelup('./mydb')

db.put('name', 'LevelUP', function (err) {
  if (err) return console.log('Ooops!', err)

  db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err)

    console.log('name=' + value)
  })
})
```

## MySQL

**Module**: [mysql](https://github.com/felixge/node-mysql/)

### Yükleme

```sh
$ npm install mysql
```

### Örnek

```js
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'dbuser',
  password: 's3kreee7',
  database: 'my_db'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()
```

## MongoDB

**Module**: [mongodb](https://github.com/mongodb/node-mongodb-native)

### Yükleme

```sh
$ npm install mongodb
```

### Örnek (v2.*)

```js
var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', function (err, db) {
  if (err) throw err

  db.collection('mammals').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})
```

### Örnek (v3.*)

```js
var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {
  if (err) throw err

  var db = client.db('animals')

  db.collection('mammals').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})
```

MongoDB için bir nesne model sürücüsü istiyorsanız, bakınız [Mongoose](https://github.com/LearnBoost/mongoose).

## Neo4j

**Module**: [apoc](https://github.com/hacksparrow/apoc)

### Yükleme

```sh
$ npm install apoc
```

### Örnek

```js
var apoc = require('apoc')

apoc.query('match (n) return n').exec().then(
  function (response) {
    console.log(response)
  },
  function (fail) {
    console.log(fail)
  }
)
```

## Oracle

**Module**: [oracledb](https://github.com/oracle/node-oracledb)

### Yükleme

 NOTE: [Yükleme önkoşulları için bakınız](https://github.com/oracle/node-oracledb#-installation).

```sh
$ npm install oracledb
```

### Örnek

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
    if (conn) { // conn görevi çalıştı, kapatılmalı
      await conn.close()
    }
  }
}

getEmployee(101)
```

## PostgreSQL

**Module**: [pg-promise](https://github.com/vitaly-t/pg-promise)

### Yükleme

```sh
$ npm install pg-promise
```

### Örnek

```js
var pgp = require('pg-promise')(/* seçenekler */)
var db = pgp('postgres://username:password@host:port/database')

db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })
```

## Redis

**Module**: [redis](https://github.com/mranney/node_redis)

### Yükleme

```sh
$ npm install redis
```

### Örnek

```js
var redis = require('redis')
var client = redis.createClient()

client.on('error', function (err) {
  console.log('Error ' + err)
})

client.set('string key', 'string val', redis.print)
client.hset('hash key', 'hashtest 1', 'some value', redis.print)
client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print)

client.hkeys('hash key', function (err, replies) {
  console.log(replies.length + ' replies:')

  replies.forEach(function (reply, i) {
    console.log('    ' + i + ': ' + reply)
  })

  client.quit()
})
```

## SQL Server

**Module**: [tedious](https://github.com/tediousjs/tedious)

### Yükleme

```sh
$ npm install tedious
```

### Örnek

```js
var Connection = require('tedious').Connection
var Request = require('tedious').Request

var config = {
  server: 'localhost',
  authentication: {
    type: 'default',
    options: {
      userName: 'your_username', // güncelle
      password: 'your_password' // güncelle
    }
  }
}

var connection = new Connection(config)

connection.on('connect', function (err) {
  if (err) {
    console.log(err)
  } else {
    executeStatement()
  }
})

function executeStatement () {
  request = new Request("select 123, 'hello world'", function (err, rowCount) {
    if (err) {
      console.log(err)
    } else {
      console.log(rowCount + ' rows')
    }
    connection.close()
  })

  request.on('row', function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log('NULL')
      } else {
        console.log(column.value)
      }
    })
  })

  connection.execSql(request)
}
```

## SQLite

**Module**: [sqlite3](https://github.com/mapbox/node-sqlite3)

### Yükleme

```sh
$ npm install sqlite3
```

### Örnek

```js
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

db.serialize(function () {
  db.run('CREATE TABLE lorem (info TEXT)')
  var stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  for (var i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
    console.log(row.id + ': ' + row.info)
  })
})

db.close()
```

## Elasticsearch

**Module**: [elasticsearch](https://github.com/elastic/elasticsearch-js)

### Yükleme

```sh
$ npm install elasticsearch
```

### Örnek

```js
var elasticsearch = require('elasticsearch')
var client = elasticsearch.Client({
  host: 'localhost:9200'
})

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
}).then(function (response) {
  var hits = response.hits.hits
}, function (error) {
  console.trace(error.message)
})
```