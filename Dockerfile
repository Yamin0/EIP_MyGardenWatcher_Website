FROM node:12
WORKDIR .
COPY package.json .
RUN yarn install
COPY . .

RUN yarn build
