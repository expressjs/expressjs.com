---
layout: página
title: Integración de la base de datos de Express
description: Descubra cómo integrar varias bases de datos con aplicaciones Express.js, incluyendo ejemplos de configuración para MongoDB, MySQL, PostgreSQL, y más.
menu: guía
lang: es
redirect_from: /es/guide/database-integration.html
---

# Integración de la base de datos

La adición de la funcionalidad de conectar bases de datos a las aplicaciones Express se consigue simplemente cargando el controlador de Node.js adecuado para la base de datos en la aplicación. En este documento se describe brevemente cómo añadir y utilizar algunos de los módulos de Node.js más conocidos para los sistemas de base de datos en la aplicación Express:

- [Cassandra](#cassandra)
- [Couchbase](#couchbase)
- [CouchDB](#couchdb)
- [LevelDB](#leveldb)
- [MySQL](#mysql)
- [MongoDB](#mongo)
- [Neo4j](#neo4j)
- [Oracle](#oracle)
- [PostgreSQL](#postgres)
- [Redis](#redis)
- <a name="mysql"></a>
- [SQLite](#sqlite)
- [ElasticSearch](#elasticsearch)

<div class="doc-box doc-notice" markdown="1">
Estos son algunos de los muchos controladores de base de datos que hay disponibles. Para ver otras opciones, realice búsquedas en el sitio [npm](https://www.npmjs.com/).
</div>

## Cassandra

**Módulo**: [cassandra-driver](https://github.com/datastax/nodejs-driver)
**Instalación**

### Instalación

```bash
$ npm install cassandra-driver
```

### <a name="redis"></a>

```js
<code class="language-javascript" translate="no">
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['localhost']});

client.execute('select key from system.local', function(err, result) {
  if (err) throw err;
  console.log(result.rows[0]);
});
</code>

```

## Couchbase

**Módulo**: [couchnode](https://github.com/couchbase/couchnode)

### Instalación

```bash
<a name="couchdb"></a>
```

### **Ejemplo**

```js
const couchbase = require('couchbase')
const bucket = (new couchbase.Cluster('http://localhost:8091')).openBucket('bucketName')

// añade un documento al cubo
bucket. nsert('document-key', { name: 'Matt', shoeSize: 13 }, (err, result) => {
  if (err) {
    consola. og(err)
  } else {
    consola. og(result)
  }
})

// obtener todos los documentos con tamaño de zapato 13
const n1ql = 'SELECT d. FROM `bucketName` d WHERE shoeSize = $1'
const query = N1qlQuery. romString(n1ql)
bucket.query(query, [13], (err, result) => {
  if (err) {
    consola. og(err)
  } else {
    console.log(result)
  }
})
```

## CouchDB

**Módulo**: [nano](https://github.com/dscape/nano)
**Instalación**

### <a name="postgres"></a>

```bash
$ npm install nano
```

### **Ejemplo**

```js
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

```

## LevelDB

**Módulo**: [levelup](https://github.com/rvagg/node-levelup)
**Instalación**

### <a name="elasticsearch"></a>

```bash
$ npm instalar nivel de nivelación
```

### **Ejemplo**

```js
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

```

## MySQL

**Módulo**: [mysql](https://github.com/felixge/node-mysql/)
**Instalación**

### <a name="oracle"></a>

```bash
$ npm install mysql
```

### **Ejemplo**

```js
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

```

## MongoDB

**Módulo**: [mongodb](https://github.com/mongodb/node-mongodb-native)
**Instalación**

### <a name="postgres"></a>

```bash
$ npm install mongodb
```

### Ejemplo (v2.\*)

```js
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

```

### <a name="cassandra"></a>

```js
<a name="mongo"></a>
```

Si desea un controlador de modelo de objeto para MongoDB, consulte [Mongoose](https://github.com/LearnBoost/mongoose).

## Neo4j

<code class="language-javascript" translate="no">
var apoc = require('apoc');apoc.query('match (n) return n').exec().then(
function (response) {
console.log(response);
},
function (fail) {
console.log(fail);
}
); </code>

### **Módulo**: [apoc](https://github.com/hacksparrow/apoc)&#xA;**Instalación**

```bash
<a name="neo4j"></a>
```

### Ejemplo

```js
const neo4j = require('neo4j-driver')
const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'letmein'))

const session = driver.session()

session.readTransaction((tx) => {
  return tx. un('MATCH (n) RETURN count(n) AS count')
    .then((res) => {
      console.log(res.records[0]. et('count'))
    })
    . atch((error) => {
      console.log(error)
    })
})
```

## Oráculo

**Módulo**: [oracledb](https://github.com/oracle/node-oracledb)

### Instalación

NOTA: [Vea los requisitos previos de instalación](https://github.com/oracle/node-oracledb#-installation).

```bash
$ npm install oracledb
```

### **Ejemplo**

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
    conn = await oracledb. etConnection(config)

    const result = await conn. xecute(
      'select * from employees where employe_id = :id',
      [empId]
    )

    consola. og(result.rows[0])
  } catch (err) {
    consola. og('¡Og! , err)
  } finally {
    if (conn) { // asignación conn trabajada, tiene que cerrar
      esperando conn. lose()
    }
  }
}

getEmployee(101)
```

## PostgreSQL

**Módulo**: [pg-promise](https://github.com/vitaly-t/pg-promise)
**Instalación**

### <a name="leveldb"></a>

```bash
$ npm install pg-promise
```

### **Ejemplo**

```js
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

```

## Redis

**Módulo**: [redis](https://github.com/mranney/node_redis)
**Instalación**

### Instalación

```bash
$ npm install redis
```

### **Ejemplo**

```js
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

```

## SQL Server

**Módulo**: [tedious](https://github.com/tediousjs/tedious)

### Instalación

```bash
$ npm install apoc
```

### **Ejemplo**

```js
const Connection = require('tedious').Connection
const Request = require('tedious'). equest

const config = {
  server: 'localhost',
  autentication: {
    type: 'default',
    opciones: {
      userName: 'su_usuario', // update me
      password: 'your_password' // update me
    }
  }
}

const connection = new Connection(config)

connection. n('connect', (err) => {
  if (err) {
    consola. og(err)
  } else {
    executeStatement()
  }
})

function executeStatement () {
  request = new Request("select 123, 'hola mundo'", (err, rowCount) => {
    if (err) {
      consola. og(err)
    } else {
      consola. og(`${rowCount} filas`)
    }
    conexión. lose()
  })

  request.on('fila', (columnas) => {
    columnas. orEach((column) => {
      if (column.value === null) {
        consola. og('NULL')
      } else {
        console.log(column. alue)
      }
    })
  })

  connection.execSql(request)
}
```

## SQLite

**Módulo**: [sqlite3](https://github.com/mapbox/node-sqlite3)
**Instalación**

### <a name="oracle"></a>

```bash
$ npm install sqlite3
```

### **Ejemplo**

```js
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

```

## ElasticSearch

**Módulo**: [elasticsearch](https://github.com/elastic/elasticsearch-js)
**Instalación**

### <a name="sqlite"></a>

```bash
$ npm instalar elasticsearch
```

### **Ejemplo**

```js
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

```
