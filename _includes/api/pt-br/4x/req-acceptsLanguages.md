<h3 id='req.acceptsLanguages'>req.acceptsLanguages(lang [, ...])</h3>

Retorna a primeira linguagem aceita da lista de linguagens especificadas,
baseado no campo do cabeçalho HTTP `Accept-Language` da requisição.
Caso nenhuma das linguagens especificadas seja aceita, retorna `false`.

Para mais informações ou em caso de problemas veja [accepts](https://github.com/expressjs/accepts).
