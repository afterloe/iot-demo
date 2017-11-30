# create by afterloe <lm6289511@gmail.com>
# on 11-21-2017 14:30

.PHONY: check,mocha-test,build,clean,install,pack
PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash
MODULE := dataCenter link msgFisCenter queue

PROJECT_NAME = $(shell more package.json | grep name | awk -F '"' '{print $$4}')
PROJECT_VERSION = $(shell more package.json | grep version | awk -F '"' '{print $$4}')
TEST_FILES = $(shell find test -name '*.js')

TAR = $(PROJECT_NAME)-$(PROJECT_VERSION).tar.gz

# CI流程 检测代码规范 单元测试 构建 打包成镜像文件 清除临时文件
all: build pack remote clean

# 安装node模块
install:
	npm install --registry=https://registry.npm.taobao.org

# 检测代码规范
check: $(shell find src -name '*.js')
	@jshint $<

# 测试代码规范
mocha-test: $(TEST_FILES)
	@mocha $< --reporter mochawesome

# 清除临时文件
clean: .$(PROJECT_NAME)
	rm -rf .$(PROJECT_NAME)
	rm -rf $(TAR)

# 构建运行包
.ONESHELL:
build: src node_modules
	mkdir .$(PROJECT_NAME)
	cp package.json .$(PROJECT_NAME)
	@babel $< -d .$(PROJECT_NAME)/node_modules
	mv .$(PROJECT_NAME)/node_modules/Launch.js .$(PROJECT_NAME)
	cp -R src/config .$(PROJECT_NAME)

.ONESHELL:
remote: $(TAR)
	scp -P $(PORT) $(TAR) $(USR)@$(HOST):~/

.ONESHELL:
pack: .$(PROJECT_NAME)
	tar -czvf $(TAR) -C $< $(shell ls $<)
