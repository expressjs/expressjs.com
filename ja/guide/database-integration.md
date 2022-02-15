---
layout: page
title: Express でのデータベースの統合
menu: guide
lang: ja
---

# データベースの統合

データベースを Express アプリケーションに接続できるようにするには、単にデータベースに適切な Node.js ドライバーをアプリケーションにロードするだけですみます。本書では、データベース・システム用の最も一般的な Node.js モジュールを Express アプリケーションに追加して使用する方法について簡単に説明します。

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
* [ElasticSearch](#elasticsearch)

<div class="doc-box doc-notice" markdown="1">

上記は、使用可能な多数のデータベース・ドライバーの一部です。その他のオプションについては、[npm](https://www.npmjs.com/) サイトで検索してください。

</div>

## Cassandra

**モジュール**: [cassandra-driver](https://github.com/datastax/nodejs-driver)

**インストール**

```console
$ npm install cassandra-driver
```

### 例

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

### インストール

```console
$ npm install couchbase
```

### 例

```js
const couchbase = require('couchbase')
const bucket = (new couchbase.Cluster('http://localhost:8091')).openBucket('bucketName')

// add a document to a bucket
bucket.insert('document-key', { name: 'Matt', shoeSize: 13 }, (err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})

// get all documents with shoe size 13
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

**モジュール**: [nano](https://github.com/dscape/nano)

**インストール**

```console
$ npm install nano
```

### 例

```js
const nano = require('nano')('http://localhost:5984')
nano.db.create('books')
const books = nano.db.use('books')

// Insert a book document in the books database
books.insert({ name: 'The Art of war' }, null, (err, body) => {
  if (err) {
    console.log(err)
  } else {
    console.log(body)
  }
})

// Get a list of all books
books.list((err, body) => {
  if (err) {
    console.log(err)
  } else {
    console.log(body.rows)
  }
})
```

## LevelDB

**モジュール**: [levelup](https://github.com/rvagg/node-levelup)

### インストール

```console
$ npm install level levelup leveldown
```

### 例

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

**モジュール**: [mysql](https://github.com/felixge/node-mysql/)

### インストール

```console
$ npm install mysql
```

### 例

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

**モジュール**: [mongodb](https://github.com/mongodb/node-mongodb-native)

**インストール**

```console
$ npm install mongodb
```

### 例 (v2.*)

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

### 例 (v3.*)

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

MongoDB 用のオブジェクト・モデル・ドライバーが必要な場合は、[Mongoose](https://github.com/LearnBoost/mongoose) を参照してください。

## Neo4j

**モジュール**: [apoc](https://github.com/hacksparrow/apoc)

### インストール

```console
$ npm install apoc
```

### 例

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

**モジュール**: [oracledb](https://github.com/oracle/node-oracledb)

### インストール

 NOTE: [See installation prerequisites](https://github.com/oracle/node-oracledb#-installation).

```console
$ npm install oracledb
```

### 例

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

## PostgreSQL

**モジュール**: [pg-promise](https://github.com/vitaly-t/pg-promise)

### インストール

```console
$ npm install pg-promise
```

### 例

```js
const pgp = require('pg-promise')(/* options */)
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

**モジュール**: [redis](https://github.com/mranney/node_redis)

### インストール

```console
$ npm install redis
```

### 例

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

**モジュール**: [tedious](https://github.com/tediousjs/tedious)

### インストール

```console
$ npm install tedious
```

### 例

```js
const Connection = require('tedious').Connection
const Request = require('tedious').Request

const config = {
  userName: 'your_username', // update me
  password: 'your_password', // update me
  server: 'localhost'
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

**モジュール**: [sqlite3](https://github.com/mapbox/node-sqlite3)

### インストール

```console
$ npm install sqlite3
```

### 例

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

## ElasticSearch

**モジュール**: [elasticsearch](https://github.com/elastic/elasticsearch-js)

### インストール

```console
$ npm install elasticsearch
```

### 例

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
