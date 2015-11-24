<h3 id='req.ips'>req.ips</h3>

Quando a configuração [`trust proxy`](/4x/api.html#trust.proxy.options.table) é `true`, essa propriedade contém um array
de endereços IP especificados no cabeçalho "X-Forwarded-For" da requisição.
Caso contrário ela contém um array vazio.

Por exemplo, se "X-Forwarded-For" for "client, proxy1, proxy2", `req.ips` seria
`["client", "proxy1", "proxy2"]`, onde "proxy2" é o downstream mais distante.

Para mais informações sobre a configuração `trust proxy`, veja [app.set](#app.set).
