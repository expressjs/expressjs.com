---
title: Utilidades Expressas
description: Descubra módulos de utilitários relacionados ao Express.js e Node.js, incluindo ferramentas para cookies, proteção CSRF, análise de URLs, roteamento e muito mais para melhorar seus aplicativos.
---

## Funções do utilitário expresso

A organização [pillarjs](https://github.com/pillarjs) do GitHub contém um número de módulos
para funções utilitárias que podem ser úteis em geral.

| Módulos utilitários                                            | Descrição:                                                                                                                                                                   |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cookies](https://www.npmjs.com/package/cookies)               | Obter e definir cookies HTTP(S) que podem ser assinados para evitar manipulação, usando Keygrip. Pode ser usado com a biblioteca HTTP do Node.js ou como Express middleware. |
| [csrf](https://www.npmjs.com/package/csrf)                     | Contém a lógica por trás da criação e verificação de tokens CSRF. Use este módulo para criar um middleware de CSRF personalizado.                                            |
| [finalhandler](https://www.npmjs.com/package/finalhandler)     | Função a invocar como o passo final para responder a requisição HTTP.                                                                                                        |
| [parseurl](https://www.npmjs.com/package/parseurl)             | Analisar uma URL com cache.                                                                                                                                                  |
| [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) | Transforme uma string de caminho estilo Express, como \`\`/user/:name\` em uma expressão regular.                                                                            |
| [resolve-path](https://www.npmjs.com/package/resolve-path)     | Resolve um caminho relativo contra um caminho raiz com validação.                                                                                                            |
| [router](https://www.npmjs.com/package/router)                 | Roteador simples ao estilo de middleware.                                                                                                                                    |
| [send](https://www.npmjs.com/package/send)                     | Biblioteca para streaming de arquivos como uma resposta HTTP, com suporte para respostas parciais (intervalos), negociação condicional-GET e eventos granulares.             |

Para módulos adicionais de baixo nível relacionados à HTTP, consulte [jshttp](https://github.com/jshttp).
