---
layout: page
title: Express database integration
menu: guide
lang: tr
---
<div id="page-doc" markdown="1">
# Database integration

Adding the capability to connect databases to Express apps is just a matter of loading an appropriate Node.js driver for the database in your app. This document briefly explains how to add and use some of the most popular Node.js modules for database systems in your Express app:

* [Cassandra](#cassandra)
* [Couchbase](#couchbase)
* [CouchDB](#couchdb)
* [LevelDB](#leveldb)
* [MySQL](#mysql)
* [MongoDB](#mongo)
* [Neo4j](#neo4j)
* [PostgreSQL](#postgres)
* [Redis](#redis)
* [SQL Server](#mssql)
* [SQLite](#sqlite)
* [ElasticSearch](#elasticsearch)

<div class="doc-box doc-notice" markdown="1">
These database drivers are among many that are available.  For other options,
search on the [npm](https://www.npmjs.com/) site.
</div>

<a name="cassandra"></a>

## Cassandra

**Module**: [cassandra-driver](https://github.com/datastax/nodejs-driver)
**Installation**

```sh
$ npm install cassandra-driver
```

**Example**

```js
var cassandra = require('cassandra-driver')
var client = new cassandra.Client({ contactPoints: ['localhost'] })

client.execute('select key from system.local', function (err, result) {
  if (err) throw err
  console.log(result.rows[0])
})
```

<a name="couchbase"></a>

## Couchbase

**Module**: [couchnode](https://github.com/couchbase/couchnode)
**Installation**

```sh
$ npm install couchbase
```

**Example**

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

<a name="couchdb"></a>

## CouchDB

**Module**: [nano](https://github.com/dscape/nano)
**Installation**

```sh
$ npm install nano
```

**Example**

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

<a name="leveldb"></a>

## LevelDB

**Module**: [levelup](https://github.com/rvagg/node-levelup)
**Installation**

```sh
$ npm install level levelup leveldown
```

**Example**

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

<a name="mysql"></a>

## MySQL

**Module**: [mysql](https://github.com/felixge/node-mysql/)
**Installation**

```sh
$ npm install mysql
```

**Example**

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

<a name="mongo"></a>

## MongoDB

**Module**: [mongodb](https://github.com/mongodb/node-mongodb-native)
**Installation**

```sh
$ npm install mongodb
```

**Example**

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

If you want an object model driver for MongoDB, look at [Mongoose](https://github.com/LearnBoost/mongoose).

<a name="neo4j"></a>

## Neo4j

**Module**: [apoc](https://github.com/hacksparrow/apoc)
**Installation**

```sh
$ npm install apoc
```

**Example**

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

<a name="postgres"></a>

## PostgreSQL

**Module**: [pg-promise](https://github.com/vitaly-t/pg-promise)
**Installation**

```sh
$ npm install pg-promise
```

**Example**

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

<a name="redis"></a>

## Redis

**Module**: [redis](https://github.com/mranney/node_redis)
**Installation**

```sh
$ npm install redis
```

**Example**

```js
var client = require('redis').createClient()

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

<a name="mssql"></a>

## SQL Server

**Module**: [tedious](https://github.com/tediousjs/tedious)
**Installation**

```sh
$ npm install tedious
```

**Example**

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

<a name="sqlite"></a>

## SQLite

**Module**: [sqlite3](https://github.com/mapbox/node-sqlite3)
**Installation**

```sh
$ npm install sqlite3
```

**Example**

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

<a name="elasticsearch"></a>

## ElasticSearch

**Module**: [elasticsearch](https://github.com/elastic/elasticsearch-js)
**Installation**

```sh
$ npm install elasticsearch
```

**Example**

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
</div>
