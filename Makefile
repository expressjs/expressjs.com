
JADE = ./node_modules/.bin/jade

HTML = index.html \
	api.html \
	3x/api.html \
	4x/api.html \
  resources/books-blogs.html \
  resources/community.html \
  resources/applications.html \
  resources/middleware.html \
  resources/glossary.html \
  starter/faq.html \
  starter/generator.html \
  starter/hello-world.html \
  starter/installing.html \
  starter/basic-routing.html \
  guide/routing.html \
  guide/error-handling.html \
  guide/debugging.html \
  guide/behind-proxies.html \
  guide/migrating-4.html \
  guide/using-middleware.html \
  guide/using-template-engines.html \
  guide/database-integration.html \
  advanced/security-updates.html \
  advanced/performance.html \
  advanced/developing-template-engines.html

docs: $(HTML)

4x/api.html: 4x/api.jade 4x/en/api/*.jade includes/*.jade
	$(JADE) --path $< < $< > $@

%.html: %.jade includes/*.jade guide/*.jade resources/*.jade advanced/*.jade starter/*.jade
	$(JADE) --path $< < $< > $@

clean:
	rm -f *.html 3x/*.html 4x/*.html guide/*.html resources/*.html advanced/*.html starter/*.html

.PHONY: docs clean
