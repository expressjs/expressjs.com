<h3 id='res.json'>res.json([body])</h3>

Envia uma resposta em formato JSON. Este método é idêntico a `res.send()` com um objeto ou array como parâmetro.
No entanto, você pode utilizá-lo para converter outros valores como `null` e `undefined` para JSON (uma vez que tecnicamente estes valores não são JSONs válidos).

~~~js
res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })
~~~
