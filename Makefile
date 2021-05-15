MAKE_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

.DEFAULT_GOAL := dev

.PHONY : install dev audits deploy serve version build deploy clean

install:
	yarn install

dev: install
	yarn start

clean:
	rm -rf ./node_modules
	rm -rf ./out
	rm -rf ./dev
	rm -rf ./*lock*

build:
	yarn run build

serve: build
	serve $(MAKE_DIR)/out