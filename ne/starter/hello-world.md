---
layout: page
title: Expressको "Hello World" उदाहरण ।
menu: starter
lang: ne
redirect_from: "/starter/hello-world.html"
---

# उदाहरण Hello World एप

<div class="doc-box doc-info" markdown="1">
तल दिएको Express को सबैभन्दा सजिलो  उदाहरण हो। यो एउटा मात्र फाइल भएको आप्प हो  &mdash;तपाइले [Express generator](/{{ page.lang }}/starter/generator.html), पर्योग गरेर बनाएको जस्तो _हैन_ जसले धेरै JavaScript फाइलहरु, Jade टेम्प्लेटहरु र  धेरै फोल्डरहरु बनाउने गर्दछ.

</div>

<script src="https://embed.runkit.com" data-element-id="hello-example" data-mode="endpoint" async defer></script>
<div id="hello-example"><pre><code class="language-js">
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
res.send('Hello World!')
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
</code></pre></div>

यो एप पोर्ट ३००० मा आउने अनुरोधहरु हेर्छ । पोर्ट ३०००को (`/`) pathमा वा एपको मुख्य लिंकमा आउने सबै अनुरोधलाई यो एपले `Hello World` पठाऊछ र अरु सबैलाइ एसले **404 भेटियन** पठाउछ ।

माथि दिएको सरभर बास्तमा काम गर्ने सरभर हो, माथि दिएको लिंक मा क्लिक गरेर हेर्नुहोस् तपाइले उत्तरका साथमा logपनि देख्नु हुनेछ। यो [RunKit](https://runkit.com), ले चलेको छ जले javascript वातावरण प्रदान गर्दछ जुन Node संग जोडिएको छ र वेब ब्रोउसरमा काम गर्छ।

तल आफ्नो लोकल कम्प्युटर (मेसीनमा) पर्योग गर्ने निर्देशन दियेको छ।

<div class="doc-box doc-info" markdown="1">
RunKit तेस्रो पक्ष्यको सुविधा हो र Express संग संबन्धित छैन।
</div>

### लोकल मेसिनमा चलाउने

पहिले `myapp` नामको एउटा फोल्दर बनाउनु होस्, तेस भित्र जानुहोस् र `npm init` को पर्योग गर्नुहोस्। अब `express` लाई dependency का रुपमा हाल्नुहोस्, यो अनुसार [हाल्ने(इस्थापना)](/{{ page.lang }}/starter/installing.html).

अब `myapp` फोल्दर भित्र , `app.js` नाम गरेको फाईल बनाउनुहोस् र माथि को कोड तेस भित्र राख्नुहोस ।

<div class="doc-box doc-notice" markdown="1">
त्यो `req` (अनुरोध) र `res` (प्रतिक्रिया) भने Node ले जसो दिन्छ तेस्तै Object हो। तेसैले `req.pipe()`, `req.on('data', callback)`, र तेस्तै सबै पर्योग गर्न सक्नु हुन्छ येस्मा Expressले कुनै बाधा पुराउने छैन ।

</div>

निम्न कमाण्ड को पर्यो गरेर एप चलाउनु होस्:

```console
$ node app.js
```

तेस्पछि `http://localhost:3000/` खोलेर हेर्नु होस् ।

### [Previous: Installing ](/{{ page.lang }}/starter/installing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Express Generator ](/{{ page.lang }}/starter/generator.html)
