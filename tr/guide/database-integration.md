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

```console
$ npm install cassandra-driver
```

### Örnek

```js
const cassandra = require('cassandra-driver')
const client = new cassandra.Client({ contactPoints: ['localhost'] })

client.execute('select key from system.local', (err, result) => {
  if (err) throw err
  console.log(result.rows[0])
})
```

## Couchbase

**Module**: [couchnode](https://github.com/couchbase/couchnode)

### Yükleme

```console
$ npm install couchbase
```

### Örnek

```js
const couchbase = require('couchbase')
const bucket = (new couchbase.Cluster('http://localhost:8091')).openBucket('bucketName')

// bir dökümanı bir kovaya ekle
bucket.insert('document-key', { name: 'Matt', shoeSize: 13 }, (err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})

// "shoe" alanının değeri 13 olan bütün dökümanları getir
const n1ql = 'SELECT d.* FROM `bucketName` d WHERE shoeSize = $1'
const query = N1qlQuery.fromString(n1ql)
bucket.query(query, [13], (err, result) => {
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

```console
$ npm install nano
```

### Örnek

```js
const nano = require('nano')('http://localhost:5984')
nano.db.create('books')
const books = nano.db.use('books')

// books veritabanına bir kitap ekle
books.insert({ name: 'The Art of war' }, null, (err, body) => {
  if (err) {
    console.log(err)
  } else {
    console.log(body)
  }
})

// bütün kitapların bir listesini getir
books.list((err, body) => {
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

```console
$ npm install level levelup leveldown
```

### Örnek

```js
const levelup = require('levelup')
const db = levelup('./mydb')

db.put('name', 'LevelUP', (err) => {
  if (err) return console.log('Ooops!', err)

  db.get('name', (err, value) => {
    if (err) return console.log('Ooops!', err)

    console.log(`name=${value}`)
  })
})
```

## MySQL

**Module**: [mysql](https://github.com/felixge/node-mysql/)

### Yükleme

```console
$ npm install mysql
```

### Örnek

```js
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'dbuser',
  password: 's3kreee7',
  database: 'my_db'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()
```

## MongoDB

**Module**: [mongodb](https://github.com/mongodb/node-mongodb-native)

### Yükleme

```console
$ npm install mongodb
```

### Örnek (v2.*)

```js
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', (err, db) => {
  if (err) throw err

  db.collection('mammals').find().toArray((err, result) => {
    if (err) throw err

    console.log(result)
  })
})
```

### Örnek (v3.*)

```js
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', (err, client) => {
  if (err) throw err

  const db = client.db('animals')

  db.collection('mammals').find().toArray((err, result) => {
    if (err) throw err

    console.log(result)
  })
})
```

MongoDB için bir nesne model sürücüsü istiyorsanız, bakınız [Mongoose](https://github.com/LearnBoost/mongoose).

## Neo4j

**Module**: [apoc](https://github.com/hacksparrow/apoc)

### Yükleme

```console
$ npm install apoc
```

### Örnek

```js
const apoc = require('apoc')

apoc.query('match (n) return n').exec().then(
  (response) => {
    console.log(response)
  },
  (fail) => {
    console.log(fail)
  }
)
```

## Oracle

**Module**: [oracledb](https://github.com/oracle/node-oracledb)

### Yükleme

 NOTE: [Yükleme önkoşulları için bakınız](https://github.com/oracle/node-oracledb#-installation).

```console
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

```console
$ npm install pg-promise
```

### Örnek

```js
const pgp = require('pg-promise')(/* seçenekler */)
const db = pgp('postgres://username:password@host:port/database')

db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
```

## Redis

**Module**: [redis](https://github.com/mranney/node_redis)

### Yükleme

```console
$ npm install redis
```

### Örnek

```js
const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => {
  console.log(`Error ${err}`)
})

client.set('string key', 'string val', redis.print)
client.hset('hash key', 'hashtest 1', 'some value', redis.print)
client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print)

client.hkeys('hash key', (err, replies) => {
  console.log(`${replies.length} replies:`)

  replies.forEach((reply, i) => {
    console.log(`    ${i}: ${reply}`)
  })

  client.quit()
})
```

## SQL Server

**Module**: [tedious](https://github.com/tediousjs/tedious)

### Yükleme

```console
$ npm install tedious
```

### Örnek

```js
const Connection = require('tedious').Connection
const Request = require('tedious').Request

const config = {
  server: 'localhost',
  authentication: {
    type: 'default',
    options: {
      userName: 'your_username', // güncelle
      password: 'your_password' // güncelle
    }
  }
}

const connection = new Connection(config)

connection.on('connect', (err) => {
  if (err) {
    console.log(err)
  } else {
    executeStatement()
  }
})

function executeStatement () {
  request = new Request("select 123, 'hello world'", (err, rowCount) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`${rowCount} rows`)
    }
    connection.close()
  })

  request.on('row', (columns) => {
    columns.forEach((column) => {
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

```console
$ npm install sqlite3
```

### Örnek

```js
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

db.serialize(() => {
  db.run('CREATE TABLE lorem (info TEXT)')
  const stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  for (let i = 0; i < 10; i++) {
    stmt.run(`Ipsum ${i}`)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(`${row.id}: ${row.info}`)
  })
})

db.close()
```

## Elasticsearch

**Module**: [elasticsearch](https://github.com/elastic/elasticsearch-js)

### Yükleme

```console
$ npm install elasticsearch
```

### Örnek

```js
const elasticsearch = require('elasticsearch')
const client = elasticsearch.Client({
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
}).then((response) => {
  const hits = response.hits.hits
}, (error) => {
  console.trace(error.message)
})
```