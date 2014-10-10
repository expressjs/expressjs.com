
JADE = ./node_modules/.bin/jade

HTML = index.html \
	api.html \
	3x/api.html \
	4x/api.html \
  en/resources/books.html \
  en/resources/community.html \
  en/resources/applications.html \
  en/resources/glossary.html \
  en/resources/middleware.html \
  en/starter/faq.html \
  en/starter/generator.html \
  en/starter/hello-world.html \
  en/starter/installing.html \
  en/starter/basic-routing.html \
  en/guide/routing.html \
  en/guide/error-handling.html \
  en/guide/debugging.html \
  en/guide/behind-proxies.html \
  en/guide/migrating-4.html \
  en/guide/using-middleware.html \
  en/guide/using-template-engines.html \
  en/guide/database-integration.html \
  en/advanced/security.html \
  en/advanced/performance.html \
  en/advanced/express-components.html \
  en/advanced/developing-template-engines.html

docs: $(HTML)

4x/api.html: 4x/api.jade 4x/en/api/*.jade includes/*.jade
	$(JADE) --path $< < $< > $@

%.html: %.jade includes/*.jade en/guide/*.jade en/resources/*.jade en/advanced/*.jade en/starter/*.jade
	$(JADE) --path $< < $< > $@

clean:
	rm -f *.html 3x/*.html 4x/*.html en/guide/*.html en/resources/*.html en/advanced/*.html en/starter/*.html

.PHONY: docs clean
