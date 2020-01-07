FROM node:10
WORKDIR ./
RUN yarn install
RUN yarn build

COPY ./build/ /var/www/html
