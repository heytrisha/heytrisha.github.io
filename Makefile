.PHONY: help install dev build preview clean lint format format-fix check

help:
	@echo "Available targets:"
	@echo "  make install        Install dependencies"
	@echo "  make dev            Start local dev server"
	@echo "  make build          Build for production"
	@echo "  make build-staging  Build with staging base path"
	@echo "  make preview        Preview production build locally"
	@echo "  make clean          Remove dist/ and .astro/"
	@echo "  make lint           Lint (eslint, no warnings)"
	@echo "  make format         Check formatting (prettier --check)"
	@echo "  make format-fix     Apply formatting (prettier --write)"
	@echo "  make check          Run astro check (type + .astro validation)"

install:
	corepack pnpm install

dev:
	corepack pnpm dev

build:
	corepack pnpm run build

build-staging:
	BASE_PATH=/staging corepack pnpm run build

preview:
	corepack pnpm run preview

clean:
	rm -rf dist/ .astro/

lint:
	corepack pnpm run lint

format:
	corepack pnpm run format

format-fix:
	corepack pnpm run format:fix

check:
	corepack pnpm run check
