# Security updates

<div class="doc-box doc-warn">
Node.js vulnerabilities directy affect Express. Therefore [keep a watch on Node vulnerabilities](http://blog.nodejs.org/vulnerability/) and make sure you are using the latest stable version of Node.
</div>

## 4.x

  * 4.8.8
    * deps: send@0.8.5
      - Fix a path traversal issue when using `root`
      - Fix malicious path detection for empty string path
  * 4.8.4
    * deps: send@0.8.2
      - Work around `fd` leak in Node.js 0.10 for `fs.ReadStream`
  * 4.8.0
    * deps: qs@1.0.2
      - denial of service fix
  * 4.7.0 
    * deps: send@0.7.0
      - Add `dotfiles` option
  * 4.6.0
    * add explicit "Rosetta Flash JSONP abuse" protection
      - previous versions are not vulnerable; this is just explicit protection

## 3.x

  * 3.16.10
    * deps: send@0.8.5
      - Fix a path traversal issue when using `root`
      - Fix malicious path detection for empty string path
  * 3.16.6
    * deps: send@0.8.2
      - Work around `fd` leak in Node.js 0.10 for `fs.ReadStream`
  * 3.16.0
    * deps: connect@2.25.0
      - deps: qs@1.0.2
        - denial of service fix
  * 3.15.0
    * deps: send@0.7.0
      - Add `dotfiles` option
  * 3.14.0
    * add explicit "Rosetta Flash JSONP abuse" protection
      - previous versions are not vulnerable; this is just explicit protection
  * 3.11.0
    * deps: connect@2.20.2
      - fixed `express.bodyParser` temporary files "issue"
  * 3.3.0
    * fix method-override middleware abuse
