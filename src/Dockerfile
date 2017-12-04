FROM node:alpine
MAINTAINER afterloe <lm6289511@gmail.com>

ENV \
    PROJECT_DIR="/opt/sensor"

VOLUME ${PROJECT_DIR}/config
ADD . ${PROJECT_DIR}

WORKDIR ${PROJECT_DIR}

RUN \
    rm -rf *.tar.gz && \
    rm -rf Dockerfile && \
    npm install --production --registry=https://registry.npm.taobao.org && \
    rm -rf package-lock.json package.json

CMD node ./Launch.js