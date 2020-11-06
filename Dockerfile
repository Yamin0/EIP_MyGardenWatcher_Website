FROM node:10
WORKDIR .
COPY package.json .
RUN yarn install
COPY . .

RUN yarn build
