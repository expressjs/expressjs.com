<h3 id='req.params'>req.params</h3>

Um objeto contendo as propriedades mapeadas para a rota nomeada "parameters". Por exemplo, caso você passua a rota `/user/:name`, então a propriedade "name" estará disponível como `req.params.name`. O padrão desse objeto é `{}`.

~~~js
// GET /user/tj
req.params.name
// => "tj"
~~~

Quando você utiliza expressões regulares para a definição da rota, grupos de captura são fornecidos no array usando `req.params[n]`, onde `n`
é o <i>enésimo</i> grupo de captura. Essa regra é aplicada a correspondencias não nomeadas de caracteres-curinga nas definições das
rotas tais como `/file/*`:

~~~js
// GET /file/javascripts/jquery.js
req.params[0]
// => "javascripts/jquery.js"
~~~
