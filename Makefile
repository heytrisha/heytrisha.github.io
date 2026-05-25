.PHONY: help install dev build preview clean

help:
	@echo "Available targets:"
	@echo "  make install    Install dependencies"
	@echo "  make dev        Start local dev server"
	@echo "  make build      Build for production"
	@echo "  make build-staging  Build with staging base path"
	@echo "  make preview    Preview production build locally"
	@echo "  make clean      Remove dist/ and .astro/"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

build-staging:
	BASE_PATH=/staging npm run build

preview:
	npm run preview

clean:
	rm -rf dist/ .astro/
