# Database integration

Adding database connectivity capability to Express apps is just a matter of loading an appropriate Node.js driver for the database in your app. This document briefly explains how to add and use some of the most popular Node modules for database systems in your Express app:

* [DB2 for i](#DB2fori)
* [LevelDB](#leveldb)
* [MySQL](#mysql)
* [MongoDB](#mongo)
* [Neo4j](#neo4j)
* [PostgreSQL](#postgres)
* [Redis](#redis)
* [SQLite](#sqlite)

<div class="doc-box doc-notice">These database drivers are among many that are available.  For other options,
search on the [npm](https://www.npmjs.com/) site.</div>

<a name="leveldb"></a>
## LevelDB

**Node module**: [levelup](https://github.com/rvagg/node-levelup)  
**Installation**: `$ npm install level`  
**Example**

```js
var levelup = require('levelup');
var db = levelup('./mydb');

db.put('name', 'LevelUP', function (err) {

  if (err) return console.log('Ooops!', err);
  db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err);
    console.log('name=' + value)
  });

});
```

<a name="mysql"></a>
## MySQL

**Node module**: [mysql](https://github.com/felixge/node-mysql/)  
**Installation**: `$ npm install mysql`  
**Example**

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

**Node module**: [mongoskin](https://github.com/kissjs/node-mongoskin)  
**Installation**: `$ npm install mongoskin`  
**Example**

```js
var db = require('mongoskin').db('localhost:27017/animals');

db.collection('mamals').find().toArray(function(err, result) {
  if (err) throw err;
  console.log(result);
});
```

If you want a object model driver for MongoDB, checkout [Mongoose](https://github.com/LearnBoost/mongoose).

<a name="neo4j"></a>
## Neo4j

**Node module**: [apoc](https://github.com/hacksparrow/apoc)  
**Installation**: `$ npm install apoc`  
**Example**

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

**Node module**: [pg](https://github.com/brianc/node-postgres)  
**Installation**: `$ npm install pg`  
**Example**

```js
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
```

<a name="redis"></a>
## Redis

**Node module**: [redis](https://github.com/mranney/node_redis)  
**Installation**: `$ npm install redis`  
**Example**

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

**Node module**: [sqlite3](https://github.com/mapbox/node-sqlite3)  
**Installation**: `$ npm install sqlite3`  
**Example**

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

## DB2fori
**NOTE:** [DB2 for i](http://www-03.ibm.com/systems/power/software/i/db2/) is much different than DB2 on LUW (Linux/Unix/Windows) as it is integreated into the operating system.  That and the fact that Node.js support on IBM i is very new (Dec 2014) there isn't a normal-to-Node.js way to install the Node.js module.

**Node module**: Install licensed program 5733OPS

**Installation**: [instructions](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/IBM%20i%20Technology%20Updates/page/Node.js)  

**Example**

```js
var db = require('/QOpenSys/QIBM/ProdData/Node/os400/db2i/lib/db2')

db.init()
db.conn("*LOCAL")
db.exec("SELECT LSTNAM, STATE FROM QIWS.QCUSTCDT", function(results) {
  console.log(results);
});
db.close(); 
```

<!-- ## Riak

## Cassandra

## CouchDB -->
