<h3 id='req.query'>req.query</h3>

Um objeto contendo uma propriedade para cada parâmetro string de consulta na rota.
Se não houver string de consulta, será um objeto vazio, `{}`.

~~~js
// GET /search?q=tobi+ferret
req.query.q
// => "tobi ferret"

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"

req.query.shoe.color
// => "blue"

req.query.shoe.type
// => "converse"
~~~
