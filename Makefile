
JADE = ./node_modules/.bin/jade

HTML = index.html \
	api.html \
	guide.html \
	applications.html \
	community.html \
	faq.html \
	3x/api.html \
	4x/api.html \
	migrating-4.html \
  resources/books.html 

docs: $(HTML)

4x/api.html: 4x/api.jade 4x/en/api/*.jade includes/*.jade
	$(JADE) --path $< < $< > $@

%.html: %.jade includes/*.jade en/guide/*.jade resources/*.jade
	$(JADE) --path $< < $< > $@

clean:
	rm -f *.html 3x/*.html 4x/*.html

.PHONY: docs clean
