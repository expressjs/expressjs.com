GREEN := \033[1;32m
BLUE := \033[1;34m
RESET := \033[0m

# The directory of this file
DIR := $(shell echo $(shell cd "$(shell dirname "${BASH_SOURCE[0]}" )" && pwd ))

# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "${GREEN}%-30s${RESET} %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

serve: ## Local server
	@echo "${BLUE}Starting expressjs.com at http://localhost:4000${RESET}"
	docker run -p 4000:4000 -p 35729:35729 -v $(DIR):/usr/src/app expressjs.com bundle exec jekyll serve --host 0.0.0.0

build: ## Build site
	@echo "${BLUE}Building site...${RESET}"
	docker build -t expressjs.com .

clean: ## Clean up
	@echo "${BLUE}Clean up...${RESET}"
	docker rmi expressjs.com
