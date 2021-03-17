---
layout: page
title: Atualizações de segurança do Express
menu: advanced
lang: pt-br
---

# Atualizações de segurança

<div class="doc-box doc-notice" markdown="1">
As vulnerabilidades do Node.js afetam diretamente o Express. Portanto
[fique atento às
vulnerabilidades do Node.js](http://blog.nodejs.org/vulnerability/) e certifique-se de que você está
usando a versão estável mais recente do Node.js.
</div>

A lista abaixo enumera as vulnerabilidades do Express que foram
corrigidas na versão da atualização especificadas.

## 4.x

  * 4.11.1
    * Corrigida a vulnerabilidade de divulgação do caminho
raiz no `express.static`, `res.sendfile`, e `res.sendFile`
  * 4.10.7
    * Corrigida a vulnerabilidade de redirecionamento aberto
no `express.static` ([recomendação](https://npmjs.com/advisories/35),
[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 4.8.8
    * Corrigida a vulnerabilidade de travessia de diretório no `express.static` ([recomendação](http://npmjs.com/advisories/32), [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)).
  * 4.8.4
    * O Node.js 0.10 pode vazar os `fd`s em certas situações que afetam o `express.static` e o
`res.sendfile`. Solicitações maliciosas podem causar os `fd`s a vazar e eventualmente levar a erros
de `EMFILE` e servidores sem capacidade de resposta.
  * 4.8.0
    * Matrizes esparsas que possuem índices extremamente altos na sequência de consulta podem fazer com que o processo sofra um
esgotamento de memória e derrubar o servidor.
    * Objetos de sequência de consulta extremamente aninhados podem fazer com que o processo fique bloqueado e o servidor
temporariamente não responsivo.


## 3.x

  * 3.19.1
    * Corrigida a vulnerabilidade de divulgação do caminho raiz no `express.static`,
`res.sendfile`, e `res.sendFile`
  * 3.19.0
    * Corrigida a vulnerabilidade de redirecionamento aberto no `express.static` ([recomendação](https://npmjs.com/advisories/35),
[CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 3.16.10
    * Corrigida a vulnerabilidade de travessia de diretório no `express.static`.
  * 3.16.6
    * O Node.js 0.10 pode vazar os `fd`s em certas situações que afetam o `express.static` e o
`res.sendfile`. Solicitações maliciosas podem causar os `fd`s a vazar e eventualmente levar a erros de
`EMFILE` e servidores sem capacidade de resposta.
  * 3.16.0
    * Matrizes esparsas que possuem índices extremamente altos na sequência de consulta podem fazer com que o processo sofra um
esgotamento de memória e derrubar o servidor.
    * Objetos de sequência de consulta extremamente aninhados podem fazer com que o processo fique bloqueado e o servidor
temporariamente não responsivo.
  * 3.3.0
    * A resposta 404 de uma tentativa de substituição de um método não suportado era suscetível a ataques de cross-site scripting.
