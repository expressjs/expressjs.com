# Security updates

<div class="doc-box doc-notice">
Node.js vulnerabilities directy affect Express. Therefore [keep a watch on Node vulnerabilities](http://blog.nodejs.org/vulnerability/) and make sure you are using the latest stable version of Node.
</div>

The list below enumerates the Express vulnerabilities that were fixed in the specified version update.

## 4.x

  * 4.8.8
    * Fixed directory traversal vulnerabilities in `express.static`.
  * 4.8.4
    * Node.js 0.10 can leak `fd`s in certain situations that affect `express.static` and `res.sendfile`. Malicious requests could cause `fd`s to leak and eventually leak to `EMFILE` errors and server unresponsiveness.
  * 4.8.0
    * Sparse arrays with extremely high indexes in query string could cause the process to run out of memory and crash the server.
    * Extremely nested query string objects could cause the process to block and make the server unresponsive temporarily.

## 3.x

  * 3.16.10
    * Fixed directory traversal vulnerabilities in `express.static`.
  * 3.16.6
    * Node.js 0.10 can leak `fd`s in certain situations that affect `express.static` and `res.sendfile`. Malicious requests could cause `fd`s to leak and eventually leak to `EMFILE` errors and server unresponsiveness.
  * 3.16.0
    * Sparse arrays with extremely high indexes in query string could cause the process to run out of memory and crash the server.
    * Extremely nested query string objects could cause the process to block and make the server unresponsive temporarily.
  * 3.3.0
    * The 404 response of an unsupported method override attempt was susceptible to cross-site scripting attacks.
