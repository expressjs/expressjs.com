---
layout: page
title: Express हाल्ने (इस्थापाना गर्ने) ।
menu: starter
lang: ne
---

# हाल्ने (इस्थापना गर्ने)

तपाईले [Node.js](https://nodejs.org/) हाल्नुपर्ने हुन्छ, एदी हाल्नुभएको छैन भने पहिला हाल्नुहोस् र मात्र अगी बढ्नुहोस्। सबैभन्दा पहिले आफुले बनाउन लागेको अप्को लागि एउटा directory (फोल्डर) बनाउनुहोस। तेस्लाई तपाइले अब आफ्नो कामगर्ने directory का रुप मा पर्योग गर्नुपर्ने हुन्छ।

```console
$ mkdir myapp
$ cd myapp
```

आफ्नो कन्सोलमा `npm init` को पर्योग ले नया Application को `package.json` फाइल बनाउनु होस् ।
`package.json`ले कसरि काम गर्छ थाहा पाउनको लागी यो हेर्नुहोस् [NPMको package.jsonको बारेमा](https://docs.npmjs.com/files/package.json)।

```console
$ npm init -y
```

यो कमाण्डले सबै जानकारी जस्ताको तेस्तै राखेर तपाईको आप्प बानाउछ तर तपाइले आफ्नो आप्पको बारेमा आफै जानकारी दिनु खोज्नुभएको छ भने निम्न कमाण्ड को पर्योग गर्नुहोस र सोधेअनुरुप जानकारी दिनुहोस् ।

```console
$ npm init
```

```
entry point: (index.js)
```

यो `Entry point` भन्ने मा तपाइले `index.js` वा कुनै अरु नाम दिन सक्नु हुन्छ तर तपाइले सबै जानकारी जस्ताको तेस्तै राख्ने कमाण्ड दिएकोभए `index.js`नै हुनेछ। अब Express हालौ, तेस्कालागि तपाईले निम्न कमाण्ड हान्नु पर्ने हुन्छ.

```console
$ npm install express
```

एसले Expressलाइ dependencies listमा हालिदिन्छ तर Expressलाइ केहि समाएको लागि मात्र हाल्न निम्न कमाण्डको पर्योग गर्नुहोस्:

```console
$ npm install express --no-save
```

<div class="doc-box doc-info" markdown="1">
NPM ५.० भन्दा माथिको ले `dependencies`मा `module` आफै हलिदीनछ तर तेस अगीकामा भने `--save` को पर्योग गर्नुपर्ने हुन्छ र तेस्पचात `npm install`को पर्योग गर्नुपर्ने हुन्छ।
</div>

### [Next: उदाहरण Hello World एप ](/{{ page.lang }}/starter/hello-world.html)
