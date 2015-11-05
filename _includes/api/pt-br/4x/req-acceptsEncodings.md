<h3 id='req.acceptsEncodings'>req.acceptsEncodings(encoding [, ...])</h3>

Retorna o primeiro encoding aceito dentre os encodings especificados,
baseado no campo do cabeçalho HTTP `Accept-Encoding` da requisição.
Caso nenhum dos encondings especificados seja aceito, retorna `false`

Para mais informações ou em caso de problemas veja [accepts](https://github.com/expressjs/accepts).
