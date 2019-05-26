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

```sh
$ npm install cassandra-driver
```

### 例

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

### インストール

```sh
$ npm install couchbase
```

### 例

```js
var couchbase = require('couchbase')
var bucket = (new couchbase.Cluster('http://localhost:8091')).openBucket('bucketName')

// add a document to a bucket
bucket.insert('document-key', { name: 'Matt', shoeSize: 13 }, function (err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})

// get all documents with shoe size 13
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

**モジュール**: [nano](https://github.com/dscape/nano)

**インストール**

```sh
$ npm install nano
```

### 例

```js
var nano = require('nano')('http://localhost:5984')
nano.db.create('books')
var books = nano.db.use('books')

// Insert a book document in the books database
books.insert({ name: 'The Art of war' }, null, function (err, body) {
  if (err) {
    console.log(err)
  } else {
    console.log(body)
  }
})

// Get a list of all books
books.list(function (err, body) {
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

```sh
$ npm install level levelup leveldown
```

### 例

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

**モジュール**: [mysql](https://github.com/felixge/node-mysql/)

### インストール

```sh
$ npm install mysql
```

### 例

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

**モジュール**: [mongodb](https://github.com/mongodb/node-mongodb-native)

**インストール**

```sh
$ npm install mongodb
```

### 例 (v2.*)

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

### 例 (v3.*)

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

MongoDB 用のオブジェクト・モデル・ドライバーが必要な場合は、[Mongoose](https://github.com/LearnBoost/mongoose) を参照してください。

## Neo4j

**モジュール**: [apoc](https://github.com/hacksparrow/apoc)

### インストール

```sh
$ npm install apoc
```

### 例

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

**モジュール**: [oracledb](https://github.com/oracle/node-oracledb)

### インストール

 NOTE: [See installation prerequisites](https://github.com/oracle/node-oracledb#-installation).

```sh
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

```sh
$ npm install pg-promise
```

### 例

```js
var pgp = require('pg-promise')(/* options */)
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

**モジュール**: [redis](https://github.com/mranney/node_redis)

### インストール

```sh
$ npm install redis
```

### 例

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

**モジュール**: [tedious](https://github.com/tediousjs/tedious)

### インストール

```sh
$ npm install tedious
```

### 例

```js
var Connection = require('tedious').Connection
var Request = require('tedious').Request

var config = {
  userName: 'your_username', // update me
  password: 'your_password', // update me
  server: 'localhost'
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

**モジュール**: [sqlite3](https://github.com/mapbox/node-sqlite3)

### インストール

```sh
$ npm install sqlite3
```

### 例

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

## ElasticSearch

**モジュール**: [elasticsearch](https://github.com/elastic/elasticsearch-js)

### インストール

```sh
$ npm install elasticsearch
```

### 例

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
