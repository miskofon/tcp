FROM node:10.22-alpine3.9 as builder

RUN mkdir mkdir /usr/webapp
WORKDIR /usr/webapp

COPY package*.json ./

RUN npm install --no-progress --ignore-optional
COPY . .
RUN  npm run build

FROM nginx:alpine

RUN apk add --no-cache \
    bash \
    jq

COPY ./CI/nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /usr/webapp/dist/tweets-list /usr/share/nginx/html
COPY ./CI/config-update.sh /
RUN sed -i -e 's/\r$//' '/config-update.sh' \
    && chmod '+x' '/config-update.sh'

CMD ["/bin/bash", "-c", "/config-update.sh && nginx -g \"daemon off;\""]
