.PHONY: serve build

pre-commit:
	pre-commit run --show-diff-on-failure --color=always --all-files

build:
	docker-compose build --force-rm --no-cache

build-dev:
	docker-compose -f docker-compose.dev.yml build --force-rm --no-cache

serve-dev:
	docker-compose -f docker-compose.dev.yml up -d

build-local:
	docker-compose -f docker-compose.local.yml build --force-rm --no-cache

serve-local:
	docker-compose -f docker-compose.local.yml up -d

build-storybook:
	docker-compose -f docker-compose.storybook.yml build --force-rm --no-cache

serve-storybook:
	docker-compose -f docker-compose.storybook.yml up -d
